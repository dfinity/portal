# Generating Candid files for Rust canisters

## Overview

In versions of the Rusk CDK `v0.11.0` and higher, the Candid export workflow has been changed. Canisters can use the `ic_cdk::export_candid!()` function to export the canister's Candid file, then use the [candid_extractor](https://github.com/dfinity/cdk-rs/tree/main/src/candid-extractor) to extract the Candid from the canister's Wasm. `candid_extractor` is a CLI tool used to extract Candid definition from the canister's Wasm. 

## Candid generation example

First, import and add the `export_candid` macro at the end of your `lib.rs` file:

```rust
#[query]
fn hello(name: String) -> String {
    format!("Hello, {}!", name)
}
​
#[update]
fn world(name: String) -> String {
    format!("World, {}!", name)
}
​
// Generate did files
​
export_candid!();
```

Then, install the [candid_extractor](https://github.com/dfinity/cdk-rs/tree/main/src/candid-extractor) with cargo:

```
cargo install candid-extractor
```

Add the following script to your project in a file called `did.sh`:

```
#!/usr/bin/env bash
​
function generate_did() {
    local canister=$1
    canister_root="src/$canister"
​
    cargo build --manifest-path="$canister_root/Cargo.toml" \
    --target wasm32-unknown-unknown \
    --release --package "$canister" \
    --features "ic-cdk/wasi"
​
    # Installation https://docs.wasmtime.dev/cli-install.html
    wasmtime "target/wasm32-unknown-unknown/release/$canister.wasm" > "$canister_root/$canister.did"
}

# The list of canisters of your project
CANISTERS=console,observatory,mission_control,satellite
​
for canister in $(echo $CANISTERS | sed "s/,/ /g")
do
  generate_did "$canister"
done
```

Update the variable `CANISTERS` with the name(s) of the canister(s) in your project using a comma separated list.

Then, run the `did.sh` script to generate the Candid files for your project. 

## Troubleshooting

### Duplicate method name error

**Error:** When running the `did.sh` script, you may encounter the error `duplicate method name` or `cannot find function`: 

```
error: duplicate method name del_controllers
   --> src/console/src/lib.rs:232:4
    |
232 | fn del_controllers(DeleteControllersArgs { controllers }: DeleteControllersArgs) {
    |    ^^^^^^^^^^^^^^^

error[E0425]: cannot find function `del_controllers` in this scope
   --> src/console/src/lib.rs:232:4
candid::types::reference::Func
```

**Solution:** This error is caused by not removing the attribute macro `#[candid_method]` from your code. Removing this attribute will result this code. 


**Error:** If your canister uses a streaming strategy, you may run into the following error:

```
failed to run main module `target/wasm32-unknown-unknown/release/satellite.wasm`
​
Caused by:
    0: failed to invoke command default
    1: error while executing at wasm backtrace:
           0: 0x204828 - <unknown>!__rust_start_panic
           1: 0x2047f7 - <unknown>!rust_panic
           2: 0x2047c7 - <unknown>!std::panicking::rust_panic_with_hook::h70a0e195f4db2a29
           3: 0x203d2b - <unknown>!std::panicking::begin_panic_handler::{{closure}}::hdcfc819ce836829e
           4: 0x203c90 - <unknown>!std::sys_common::backtrace::__rust_end_short_backtrace::h53cabafab5b09ada
           5: 0x204432 - <unknown>!rust_begin_unwind
           6: 0x205b2f - <unknown>!core::panicking::panic_fmt::h751be80779d42b53
           7: 0x1dc870 - <unknown>!<candid::types::reference::Func as candid::types::CandidType>::_ty::h5a3086fe78ee70eb
           8: 0x734f4 - <unknown>!candid::types::CandidType::ty::h3629ad9f5296022d
           9: 0x983bd - <unknown>!candid::types::CandidType::ty::h9570a7b7bc1b89e8
          10: 0xace19 - <unknown>!candid::types::CandidType::ty::hba90fc116dda9bd1
          11: 0x95616 - <unknown>!candid::types::CandidType::ty::hee774e983a92def6
          12: 0x607d3 - <unknown>!_start
       note: using the `WASMTIME_BACKTRACE_DETAILS=1` environment variable may show more debugging information
    2: wasm trap: wasm `unreachable` instruction executed

```

**Solution:** This error may be caused by the use of `candid::Func` in the declaration of the streaming strategy, such as:

```
#[derive(CandidType, Deserialize, Clone)]
pub enum StreamingStrategy {
    Callback {
        token: StreamingCallbackToken,
        callback: Func, // <------------- Possible cause of issue
    },
}
```

To solve this error, you can use an example `deffine_function!`, such as:

```
use candid::{define_function, CandidType, Deserialize};
​
define_function!(pub CallbackFunc : () -> () query);
​
#[derive(CandidType, Deserialize, Clone)]
pub enum StreamingStrategy {
    Callback {
        token: StreamingCallbackToken,
        callback: CallbackFunc,
    },
}
```


## Resources

- [Automatic Candid Generation in Rust](https://daviddalbusco.com/blog/automatic-candid-generation-in-rust-exploring-the-ic-cdk-v0-10-0-update/).