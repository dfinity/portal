# 11: Stable structures

## Overview

The conventional approach to canister state persistence is to serialize the entire state to stable memory in the `pre_upgrade` hook and decode it back in the `post_upgrade` hook.

This approach is easy to implement and works well for relatively small datasets. Unfortunately, it does not scale well and can render a canister non-upgradable.

Stable structures are designed to use stable memory as the backing store, allowing them to grow to gigabytes in size without the need for `pre_upgrade`/`post_upgrade` hooks.

A [stable structure library](https://github.com/dfinity/stable-structures#readme) exists which aims to simplify managing data structures directly in stable memory and provides example code templates.

Key design principals of stable structures include:
- Compatibility with multi-memory Wasm.
- Backward compatibility.
- No `pre_upgrade` hooks.
- No reallocation.
- Limited blast radius of errors, bugs, or data corruption.
- Increased simplicity. 

For more information about the philosophy behind the design of stable structures, see [Roman's tutorial on stable structures](https://mmapped.blog/posts/14-stable-structures.html).

## Prerequisites 

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

## Available data structures

- [BTreeMap]: A key-value store.
- [Vec]: A growable array.
- [Log]: An append-only list of variable-size entries.
- [Cell]: A serializable value.
- [MinHeap]: A priority queue.


## How stable structures work

Stable structures are able to work directly in stable memory because each data structure manages its own memory. When initializing a stable structure, memory is provided that the data structure can use to store its data.

Here's a basic example:

```rust
use ic_stable_structures::{BTreeMap, DefaultMemoryImpl};
let mut map: BTreeMap<u64, u64, _> = BTreeMap::init(DefaultMemoryImpl::default());

map.insert(1, 2);
assert_eq!(map.get(&1), Some(2));
```

Memories are abstracted with the [Memory] trait, and stable structures can work with any storage backend that implements this trait. This includes stable memory, a vector ([VectorMemory]), or even a flat file ([FileMemory]).

The example above initializes a [BTreeMap] with a [DefaultMemoryImpl], which maps to stable memory when used in a canister and to a [VectorMemory] otherwise.

:::info
Note that **stable structures cannot share memories.** Each memory must belong to only one stable structure.
:::

For example, this fails when run in a canister:


```no_run
use ic_stable_structures::{BTreeMap, DefaultMemoryImpl};
let mut map_1: BTreeMap<u64, u64, _> = BTreeMap::init(DefaultMemoryImpl::default());
let mut map_2: BTreeMap<u64, u64, _> = BTreeMap::init(DefaultMemoryImpl::default());

map_1.insert(1, 2);
map_2.insert(1, 3);
assert_eq!(map_1.get(&1), Some(2)); // This assertion fails.
```

It fails because both `map_1` and `map_2` are using the same stable memory under the hood, and so changes in `map_1` end up changing or corrupting `map_2`.

To address this issue, we make use of the [MemoryManager](memory_manager::MemoryManager), which takes a single memory and creates up to 255 virtual memories for our disposal.
Here's the above failing example, but fixed by using the [MemoryManager](memory_manager::MemoryManager):

```rust
use ic_stable_structures::{
   memory_manager::{MemoryId, MemoryManager},
   BTreeMap, DefaultMemoryImpl,
};
let mem_mgr = MemoryManager::init(DefaultMemoryImpl::default());
let mut map_1: BTreeMap<u64, u64, _> = BTreeMap::init(mem_mgr.get(MemoryId::new(0)));
let mut map_2: BTreeMap<u64, u64, _> = BTreeMap::init(mem_mgr.get(MemoryId::new(1)));

map_1.insert(1, 2);
map_2.insert(1, 3);
assert_eq!(map_1.get(&1), Some(2)); // Succeeds, as expected.
```

## Combined persistence

If your project exclusively relies on stable structures, the memory can expand in size without the requirement of `pre_upgrade`/`post_upgrade` hooks.

However, it's important to note that if you also intend to perform serialization/deserialization of the heap data, utilizing the memory manager becomes necessary. To effectively combine both approaches, refer to the [quick start example](https://github.com/dfinity/stable-structures/tree/main/examples/src/quick_start) for guidance.

## Simple example canister

Here's a fully working canister example that ties everything together.

Dependencies in `Cargo.toml`:

```toml
[dependencies]
ic-cdk = "0.6.8"
ic-cdk-macros = "0.6.8"
ic-stable-structures = "0.5.6"
```

Code in `lib.rs`:

```rust
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use std::cell::RefCell;

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    // The memory manager is used for simulating multiple memories. Given a `MemoryId` it can
    // return a memory that can be used by stable structures.
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    // Initialize a `StableBTreeMap` with `MemoryId(0)`.
    static MAP: RefCell<StableBTreeMap<u128, u128, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        )
    );
}

// Retrieves the value associated with the given key if it exists.
#[ic_cdk_macros::query]
fn get(key: u128) -> Option<u128> {
    MAP.with(|p| p.borrow().get(&key))
}

// Inserts an entry into the map and returns the previous value of the key if it exists.
#[ic_cdk_macros::update]
fn insert(key: u128, value: u128) -> Option<u128> {
    MAP.with(|p| p.borrow_mut().insert(key, value))
}
```

## Advanced example canister

The following is another, more advanced sample of a Rust stable structures canister:

Dependencies in `Cargo.toml`:

```
[dependencies]
candid = "0.8.1"
ic-cdk = "0.6.0"
ic-cdk-macros = "0.6.0"
ic-stable-structures = "0.5.0"
serde = "1.0.136"
```

Code in `lib.rs`:

```rust
use std::{cell::RefCell, ops::Deref};

use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, StableVec};

// This canister uses conflicting stores in stable memory to avoid measuring
// the overhead of the `MemoryManager`.  Only one structure can actually be
// used in any given installation of the canister.
thread_local! {
    pub static STABLE_BTREE_U64: RefCell<StableBTreeMap<u64, u64, DefaultMemoryImpl>> =
      RefCell::new(StableBTreeMap::init(DefaultMemoryImpl::default()));

    pub static STABLE_VEC_U64: RefCell<StableVec<u64, DefaultMemoryImpl>> =
      RefCell::new(StableVec::init(DefaultMemoryImpl::default()).expect("Unable to create Vec memory"));
}

// For each structure we have 4 operations: repeated read, sparse read, repeated
// write, sparse write. Reads operate in query mode, writes/insert in
// update mode.  Sparse operations can be made to roughly touch a new OS page on
// each iteration of the loop.

// BTree Operations

#[ic_cdk_macros::query]
fn query_btree_u64_single_read(count: u32) {
    STABLE_BTREE_U64.with(|map| {
        let map = map.borrow();
        for _ in 0..count {
            map.get(&0).unwrap();
        }
    })
}

#[ic_cdk_macros::query]
fn query_btree_u64_sparse_read(count: u32) {
    STABLE_BTREE_U64.with(|map| {
        let map = map.borrow();
        let length = map.len();
        let step = length / count as u64;
        for i in (0..length).step_by(step as usize) {
            map.get(&i).unwrap();
        }
    })
}

#[ic_cdk_macros::update]
fn update_btree_u64_single_write(count: u32) {
    STABLE_BTREE_U64.with(|map| {
        let mut map = map.borrow_mut();
        for i in 0..count {
            map.insert(0, i as u64).unwrap();
        }
    })
}

#[ic_cdk_macros::update]
fn update_btree_u64_sparse_write(count: u32) {
    STABLE_BTREE_U64.with(|map| {
        let mut map = map.borrow_mut();
        let length = map.len();
        let step = length / count as u64;
        for i in (0..length).step_by(step as usize) {
            map.insert(i, i).unwrap();
        }
    })
}

fn btree_u64_insert(count: u32) {
    STABLE_BTREE_U64.with(|map| {
        let mut map = map.borrow_mut();
        for i in 0..count {
            map.insert(i as u64, 1);
        }
    })
}

#[ic_cdk_macros::update]
fn update_btree_u64_insert(count: u32) {
    btree_u64_insert(count)
}

// Vector Operations

#[ic_cdk_macros::query]
fn query_vec_u64_single_read(count: u32) {
    STABLE_VEC_U64.with(|vec| {
        let vec = vec.borrow();
        for _ in 0..count {
            vec.get(0).unwrap();
        }
    })
}

#[ic_cdk_macros::query]
fn query_vec_u64_sparse_read(count: u32) {
    STABLE_VEC_U64.with(|vec| {
        let vec = vec.borrow();
        let length = vec.len();
        let step = length / count as u64;
        for i in (0..length).step_by(step as usize) {
            vec.get(i).unwrap();
        }
    })
}

#[ic_cdk_macros::update]
fn update_vec_u64_single_write(count: u32) {
    STABLE_VEC_U64.with(|vec| {
        let vec = vec.borrow();
        for i in 0..count {
            vec.set(0, &(i as u64));
        }
    })
}

#[ic_cdk_macros::update]
fn update_vec_u64_sparse_write(count: u32) {
    STABLE_VEC_U64.with(|vec| {
        let vec = vec.borrow();
        let length = vec.len();
        let step = length / count as u64;
        for i in (0..length).step_by(step as usize) {
            vec.set(i, &i);
        }
    })
}

fn vec_u64_insert(count: u32) {
    STABLE_VEC_U64.with(|vec| {
        let vec = vec.borrow();
        for _ in 0..count {
            vec.push(&1).unwrap();
        }
    })
}

#[ic_cdk_macros::update]
fn update_vec_u64_insert(count: u32) {
    vec_u64_insert(count)
}

#[ic_cdk_macros::update]
fn update_empty() {}

#[ic_cdk_macros::query]
fn query_empty() {}

#[ic_cdk_macros::init]
fn init(structure: String, count: u32) {
    match structure.deref() {
        "btree_u64" => btree_u64_insert(count),
        "vec_u64" => vec_u64_insert(count),
        "none" => {}
        _ => panic!("Invalid structure {structure}"),
    }
}

fn main() {}
```

## References

- [Basic example](https://github.com/dfinity/stable-structures/tree/main/examples/src/basic_example) (the example shown above).
- [Advanced example](https://github.com/dfinity/ic/tree/2aa53020f13c68b1f1ef41ef2b8cb54db845683a/rs/rust_canisters/stable_structures) (example shown above).
- [Quick start example](https://github.com/dfinity/stable-structures/tree/main/examples/src/quick_start): Ideal as a template when developing a new canister.
- [Custom types example](https://github.com/dfinity/stable-structures/tree/main/examples/src/custom_types_example): Showcases storing your own custom types.


## Next steps

For the next step, let's dive into [storing and searching records](12-searching-records.md).
