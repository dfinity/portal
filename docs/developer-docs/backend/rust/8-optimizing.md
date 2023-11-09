# 8: Optimizing Rust canisters

## Overview
Compiling Rust to Wasm often increases the file size significantly. dfx versions 0.14.0 and newer include a the `wasm-opt` optimization package that can be used to optimize cycle consumption and binary size. 

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

This guide assumes you have an existing canister that you'd like to optimize. To get an existing canister, review the previous documentation pages in this section. 

## Reducing cycle consumption
The first step towards an optimized system is profiling. Start by measuring the number of instructions your endpoints consume.

The `instruction_counter` API will tell you the number of instructions your code has consumed since the last entry point. Instructions are the internal currency of the IC runtime; one IC instruction is the quantum of work that the protocol can do, such as loading a 32-bit integer from a memory address. The protocol assigns an instruction cost equivalent to each Wasm instruction and system call. It also defines all its limits in terms of instructions. For a detailed breakdown of the current instruction and Wasm limitations on the IC, please review [this page](../../production/resource-limits.md).


The following is an example method that can be used to measures the number of instructions:

```rust
#[update]
async fn transfer(from: Account, to: Account, amount: Nat) -> Result<TxId, Error> {
  let start = ic_cdk::api::instruction_counter();
  let tx = apply_transfer(from, to, amount)?;
  let tx_id = archive_transaction(tx).await?;
  // NOTE: the await point above resets the instruction counter.
  let end = ic_cdk::api::instruction_counter();
  record_measurement(end - start);
Ok(tx_id)
}
```

## Using `wasm-opt`

`Wasm-opt` is a general purpose Wasm optimizer package from binaryen that is now available in dfx, versions 0.14.0 and newer. 

`Wasm-opt` can be used to enable canister optimizations through a configuration option in the project's `dfx.json` file, such as:

```
{
  "canisters": {
    "my_canister": {
      "optimize": "cycles"
    }
  }
}
```

## Optimization levels for cycle usage:

Using the `"optimize": "cycles"` option, you can expect a rough estimate of decreased cycles usage for Rust canisters by around 7%. 

The `"optimize": "cycles"` option is the recommended default, as it maps to optimization level 3 in the `wasm-opt` package. 

The optimization levels for cycles usage are as follows:

```
O4
O3 (equivalent to “cycles”)
O2
O1
O0 (performs no optimizations)
```

## Optimization levels for binary size:

To optimize the binary size instead, you can use the `"optimize": "size"` option. By using the size option, binary sizes can be reduced by roughly 16%. 

The optimization levels for binary size are as follows:

```
Oz (equivalent to “size”)
Os
```

Each optimization preserves the Internet Computer specific metadata sections of each canister. Additionally, the name sections in your Wasm module can be preserved by directly invoking `ic-wasm` with the `--keep-name-section` flag.

:::info
Note that in certain cases the optimizations can increase the complexity of certain functions in your Wasm module such that they are rejected by the replica. If you run into this issue, it is recommended to use a less aggressive optimization level such that you do not exceed the complexity limit.
:::

More information on canister optimization and information on `wasm-opt` benchmark testing can be found [on this forum post](https://forum.dfinity.org/t/canister-optimizer-available-in-dfx-0-14-0/21157).

## Next steps

Next, let's take a look at [incrementing a counter.](9-counter.md)
