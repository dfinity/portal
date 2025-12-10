---
title: Wasm-native stable memory
description: "Introducing Wasm-native stable memory"
tags: [New features]
image: /img/blog/dev-blog-wasm-native.jpg
---

# Wasm-native stable memory
Wasm-native stable memory is a performance improvement to the Internet Computer’s stable memory interface, which was recently rolled out to all subnets. It provides a 1.5-2x performance improvement to most stable memory workloads and does so in a completely transparent way.

If you’re already developing canisters that use stable memory, then those canisters will automatically benefit from this performance improvement. If you’re not using stable memory, maybe now’s the time to try it out!

## What is stable memory?

Stable memory is a data store separate from regular Wasm memory. It is accessed using the [stable memory API](/references/ic-interface-spec#system-api-stable-memory) which allows reading/writing arbitrary bytes. Libraries like [`ic-stable-memory`](https://crates.io/crates/ic-stable-memory) and [`ic-stable-structures`](https://crates.io/crates/ic-stable-structures) also make stable memory ergonomic to use.

The main reasons to use stable memory are that:

1. It persists across canister upgrades.
1. It has a capacity over 10x larger than regular Wasm memory.

This means that using stable memory is really the only option when it comes to vertically scaling a dapp (i.e. having a single canister that grows with your dapp).

But the downsides of stable memory are that:

1. It is slower to access than Wasm memory.
2. Data must be serialized when storing in stable memory and deserialized when loaded.

Wasm native stable memory is a significant step in improving the first downside.

## Why is stable memory slower?

Each read from or write to stable memory goes through a system API call, and this call has a significant overhead. It first calls into the Wasmtime runtime, which then invokes code in the replica to copy over data from or to the stable memory. This indirection is needed because the running canister Wasm has no way to directly access the backing store of the stable memory.

The following diagram shows the difference between accessing the main Wasm memory versus stable memory:

![Original stable memory diagram](/img/blog/wasm-native-stable-memory-diagram-old.png)

## How Wasm-native stable memory works

Fortunately, the new [multiple memories](https://github.com/WebAssembly/multi-memory/blob/master/proposals/multi-memory/Overview.md) Wasm feature allows a Wasm module to directly address multiple byte arrays, called “memories” in the Wasm spec. We can use this feature to modify calls to the stable memory APIs to directly read or write from a secondary Wasm memory.

The following diagram shows how stable memory accesses will work under Wasm-native stable memory:

![Wasm-native stable memory diagram](/img/blog/wasm-native-stable-memory-diagram-new.png)

## Performance gains on sample dapp

Here we take an example dapp using the `ic-stable-structures` library and show how its performance improves after the Wasm-native stable change. Let’s start with the [basic example](https://github.com/dfinity/stable-structures/tree/main/examples/src/basic_example) from `ic-stable-structures` repo which implements a key-value store. The dapp starts by setting up a `StableBTreeMap` to store data:

```rust
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
```

We then enhance the basic example by adding an API to bulk insert many key-value pairs:

```rust
#[ic_cdk_macros::update]
fn insert_many(entries: Vec<(u128, u128)>) {
    MAP.with(|p| {
        let mut map = p.borrow_mut();
        for (k, v) in entries.into_iter() {
            map.insert(k, v);
        }
    })
}
```

After deploying this dapp to ICP, we then execute multiple messages that bulk insert many key-value pairs (close to maxing out the ingress message size limit). The following graphs show the execution time for each of these messages.

First, without Wasm-native stable memory:

![Metrics without Wasm-native stable memory](/img/blog/wasm-native-stable-memory-execution-metrics-no-wnsm.png)

Then, with Wasm-native stable memory:

![Metrics with Wasm-native stable memory](/img/blog/wasm-native-stable-memory-execution-metrics-wnsm.png)

We can see that this dapp gets a 1.5x speedup from the Wasm-native stable memory change.

## Production examples

If you’re interested in seeing some architecture of more complicated dapps that are using stable memory, the [Bitcoin canister](https://github.com/dfinity/bitcoin-canister) and the [Internet Identity canister](https://github.com/dfinity/internet-identity/tree/main/src/internet_identity) are good examples.

## Conclusion

Dapps which use stable memory should see 1.5-2x performance improvements for stable memory reads and writes without developers needing to make any changes. So you should consider using stable memory today!
