# Generating Candid files for Rust canisters

## Overview

In versions of the Rusk CDK `v0.11.0` and higher, the Candid export workflow has been changed.
You can call the `ic_cdk::export_candid!()` macro to enable the Candid export behavior, then use the [candid-extractor](https://github.com/dfinity/cdk-rs/tree/main/src/candid-extractor) to extract the Candid from the canister's Wasm.

### Preparation

- #### Step 1: Upgrade `ic-cdk` dependency to v0.11.0 or higher:

```toml
# Cargo.toml
[dependencies]
ic-cdk = "0.11.0"
```

- #### Step 2: Install [candid-extractor](https://github.com/dfinity/cdk-rs/tree/main/src/candid-extractor):

```
cargo install candid-extractor
```

With `cargo-binstall` you can install the prebuilt binary without waiting for compilation:

```
cargo binstall candid-extractor
```

### Workflow

- #### Step 1. Call the `export_candid` macro at the end of your `lib.rs` file:

```rust
#[query]
fn hello(name: String) -> String {
    format!("Hello, {}!", name)
}

#[update]
fn world(name: String) -> String {
    format!("World, {}!", name)
}

// Enable Candid export
ic_cdk::export_candid!();
```

- #### Step 2: Compile the Canister Wasm module.

```
cargo build --release --target wasm32-unknown-unknown --package <CANISTER>
```

The Wasm module will be at:

```
target/wasm32-unknown-unknown/release/<CANISTER>.wasm
```

- #### Step 3: Extract candid from the Wasm module and save to a file:

```
candid-extractor target/wasm32-unknown-unknown/release/<CANISTER>.wasm > <CANISTER>.did
```
