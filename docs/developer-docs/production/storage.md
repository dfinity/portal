# Canister storage

## Overview

When developing projects on ICP, there are two primary forms of data storage that your canisters can utilize. The first type of storage is the canister's **heap memory**, sometimes referred to as the canister's *main memory*. Heap memory is **temporary**, and any data stored in a canister's heap memory is cleared whenever the canister is stopped or upgraded. 

The second type of storage available to a canister is **stable memory**. Stable memory is a unique feature of ICP that  defines a separate data store aside from a canister's regular Wasm heap memory data storage. It is a secondary storage type that can be used to store data long-term, since all data stored in stable memory will persist across all canister processes.

## Heap memory

Heap memory refers to a canister's regular Wasm memory. It is not persisted, and does not store data long-term. A canister's heap memory is cleared whenever a canister is stopped or upgraded. Heap memory is used by default for storing things such as variable values, the result of an executed function, or other arguments passed to your canister. 

Heap memory is limited to a maximum of 4GiB of data.

## Stable memory

Stable memory is a feature unique to the Internet Computer Protocol that provides a long-term, persistent data storage option separate from a canister's heap memory. When a canister is stopped or upgraded, the data stored in stable memory is not cleared or removed. The stable memory is preserved throughout the process while any other WebAssembly state is discarded. 

To use stable memory, you must anticipate which portions of the canister's data that you want to persist across upgrades by indicating within the canister code. More information about this can be found in the section below, [Storage handling in different languages](#storage-handling-in-different-languages).

By default, a canister's stable memory is empty. The maximum storage limit for stable memory is 400GiB if the subnet the canister is deployed on can accommodate it. If a canister uses more than 400GiB of stable memory, the canister will trap and become unrecoverable. 

## Storage cost

Storage cost is calculated on the GB of storage used by a canister per second, costing `127_000` cycles on a 13-node subnet and `127_000 / 13 * 34` cycles on a subnet with 34 nodes. In USD, this works out to about $0.431 and $1.127 respectively for storing 1 GB of data for a 30-day month. The cost is the same whether the canister is using heap memory, stable memory, or both. 

You can learn more about storage costs [here](/docs/current/developer-docs/gas-cost).

## Storage handling in different languages

### Motoko storage handling

In Motoko canisters, stable memory can be utilized through the Motoko **stable storage** and **stable variable** features. Stable storage is a Motoko-specific term used to refer Motoko's implementation of stable memory used to persist data across canister upgrades. Stable variables are Motoko defined variables that use the `stable` modifying keyword to indicate that the variable's value should persist across canister upgrades, such as:

```motoko
actor Counter {

  stable var value = 0;

  public func inc() : async Nat {
    value += 1;
    return value;
  };
}
```

To utilize stable memory when upgrading a Motoko canister, the following workflow can be used:

- The canister must be stopped.
- A `pre_upgrade` hook can be executed if one is defined. `pre_upgrade` hooks can be used for functions such as creating a backup of the canister's data. 
- The canister's heap memory is discarded and a new version of the canister's Wasm module is initialized. Data stored in stable memory is made available to the new Wasm module.
- The canister's new code is installed using the `--mode upgrade` flag.
- The canister is started and now runs the newly upgraded code.
- Stable variables are re-loaded as part of a `post_upgrade` hook. Stable memory bytes that stored those variables are overwritten with zeroes to minimize stable memory costs for the canister.

#### Garbage collection

A garbage collection process is an automatic utility that is used to manage the amount of memory used. For heap memory, garbage collection is used to remove unreferenced or dead objects in order to free up otherwise allocated heap memory. 

In Motoko, the default garbage collection process uses a copying approach, which depends on the size of the amount of heap memory currently used. In contrast, an additional garbage collector that uses a marking approach can be selected, which is based on the amount of free heap memory. These garbage collection methods are triggered when there are enough changes made to heap memory since the last round of garbage collection. Garbage collection can be forced to run after every message using the `--force-gc` flag in the project's `dfx.json` file:

```json
  "defaults": {
    "build": {
      "packtool": "",
      "args": "--force-gc"
    }
  },
```

Both of these garbage collectors, however, are unable to collect the entire heap memory pool due to the instruction limit per message on ICP. Since these garbage collectors cannot collect the entire heap memory pool, canisters do not benefit from fully utilizing the entire 4GiB memory pool, as there must be some heap memory space left for the garbage collector to operate.

A beta incremental garbage collection process is available, which uses incremental messages that distributes the garbage collection work across multiple messages when needed. This form of garbage collection allows for the allocation of up to 3x more heap space after it has been run, while consuming less cycles on average. Using this garbage collection service, canisters can benefit from using the entire 4GiB of heap memory, as it can garbage collect the entire heap memory pool. 

The incremental garbage collector can be used by specifying the `--incremental-gc` compiler flag in a project's `dfx.json` file, such as:

```json
{
  "canisters": {
    “my_dapp”: {
       "main": "src/my-dapp.mo",
       "type": "motoko",
       "args" : "--incremental-gc"
    },
  },
}
```

:::info
This garbage collector is still in beta testing and should be used with caution.
:::

You can learn more about the incremental garbage collector [here](https://github.com/dfinity/motoko/pull/3837). 


### Rust storage handling

To utilize stable memory for canisters written in Rust, the crates [ic-stable-memory](https://github.com/seniorjoinu/ic-stable-memory) and [ic-stable-structures](https://github.com/dfinity/stable-structures) can be used. It is recommended to review the documentation for these crates to learn more, or review the tutorial on the stable structures crate [here](https://mmapped.blog/posts/14-stable-structures.html).

As good practice, stable memory should be versioned since the stable memory decoding mechanism may need to guess the data's format in situations where the serialization format or stable data layout of a canister drastically changes. To make this process easier, stable memory should be versioned. This can be as simple as declaring that the first byte of the canister's stable memory will be used to represent the version number.

To utilize stable memory when upgrading a Rust canister, the following workflow can be used:

- The canister must be stopped.
- A `pre_upgrade` hook can be executed if one is defined. `pre_upgrade` hooks can be used for functions such as creating a backup of the canister's data. 
- The canister's heap memory is discarded and a new version of the canister's Wasm module is initialized. Data stored in stable memory is made available to the new Wasm module.
- The canister's new code is installed using the `--mode upgrade` flag.
- The canister is started and now runs the newly upgraded code.
- A `post_upgrade` hook is called on the newly created instance if one is defined. The init function is not executed.



