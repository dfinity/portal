# 5: Writing and deploying canisters

## Overview

In this guide, we'll cover the steps required to write, compile, deploy, and interact with a Rust backend canister. 

This guide will showcase a simple 'Hello, world!' example.

## Prerequisites 

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

## Writing the canister

Open a terminal window on your local computer, if you don’t already have one open.

First, create a new dfx project with the command:

```
dfx new --type rust hello_world
```

By default, the project structure will resemble the following:

```
Cargo.lock
Cargo.toml
dfx.json
package.json
src
├── hello_world_backend
│   ├── Cargo.toml
│   ├── hello_world_backend.did
│   └── src
│       └── lib.rs
└── hello_world_frontend
    ├── assets
    │   ├── favicon.ico
    │   ├── logo2.svg
    │   ├── main.css
    │   └── sample-asset.txt
    └── src
        ├── index.html
        └── index.js
webpack.config.js
```

For more information on project structure and code organization, review the [project organization guide](./2-project-organization.md).

## Writing the `lib.rs` file

We'll be focused on the `src/hello_world_backend/src/lib.rs` file in this step. 

Open the `src/hello_world_backend/src/lib.rs` file in a text editor. Replace the existing content with the following:

```rust
#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello there, {}! This is an example greeting returned from a Rust backend canister!", name)
}
```

Save the file. 

## Writing the `Cargo.toml` file

Open the `src/hello_world_backend/Cargo.toml` file in a text editor. Replace the existing content with the following:

``` toml
[package]
name = "hello_world_backend"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[lib]
crate-type = ["cdylib"]

[dependencies]
candid = "0.8.2"
ic-cdk = "0.7.0"
```

Save the file.

## Deploying the canister to your local execution environment 

## Creating the canister

First, create an empty canister for the canister code to be installed into. To create the canister, run the command:

```
dfx canister create hello_world_backend
```

The output will resemble the following:

```
Creating canister hello_world_backend...
hello_world_backend canister created with canister id: br5f7-7uaaa-aaaaa-qaaca-cai
```

### Building the canister

Next, you need to compile your program into a WebAssembly module that can be deployed on the IC by building the canister. To build the canister, run the command:

```
dfx build hello_world_backend
```

### Installing the canister

Then, install the compiled code into your canister with the command:

```
dfx canister install hello_world_backend
```

### Deploying to the execution environment

To deploy the canister, start the dfx local execution environment with the command:

```
dfx start --clean --background
```

Then, you can deploy the canister with the command:

```
dfx deploy hello_world_backend
```

This command deploys just the `hello_world_backend` canister. To deploy all canisters in the `dfx.json` file, use the command:

```
dfx deploy
```

## Deploying the canister to the IC mainnet

To deploy to the mainnet, you will need a cycles wallet with a balance of cycles. 

To learn more about setting up a cycles wallet, please review the documentation [here](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-mainnet#confirm-your-developer-identity-and-ledger-account). 

Once you have gotten your cycles wallet configured and ready to use, check the status of the IC mainnet to confirm that your local environment can connect to it. You can ping the mainnet with the command:

```
dfx ping ic
```

The output should resemble the following:

```
  {
    "ic_api_version": "0.18.0"  "impl_hash": "d639545e0f38e075ad240fd4ec45d4eeeb11e1f67a52cdd449cd664d825e7fec"  "impl_version": "8dc1a28b4fb9605558c03121811c9af9701a6142"  "replica_health_status": "healthy"  "root_key": [48, 129, 130, 48, 29, 6, 13, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 1, 2, 1, 6, 12, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 2, 1, 3, 97, 0, 129, 76, 14, 110, 199, 31, 171, 88, 59, 8, 189, 129, 55, 60, 37, 92, 60, 55, 27, 46, 132, 134, 60, 152, 164, 241, 224, 139, 116, 35, 93, 20, 251, 93, 156, 12, 213, 70, 217, 104, 95, 145, 58, 12, 11, 44, 197, 52, 21, 131, 191, 75, 67, 146, 228, 103, 219, 150, 214, 91, 155, 180, 203, 113, 113, 18, 248, 71, 46, 13, 90, 77, 20, 80, 95, 253, 116, 132, 176, 18, 145, 9, 28, 95, 135, 185, 136, 131, 70, 63, 152, 9, 26, 11, 170, 174]
  }
```

Then, to deploy the canister to the mainnet, use the command:

```
dfx deploy hello_world_backend --network ic
```

:::info
For all commands that are intended to interact with the mainnet, the `--network ic` flag needs to be used.
:::

## Testing the canister

To test the canister's functionality, call one of the canister's methods directly from the command line. In this example, this canister only has one method, `greet`, so that will be the one tested.

To test this method, make a call to the `greet` method with the command:

```
dfx canister call hello_world_backend greet everyone
```

The output will resemble:

```
("Hello there, everyone! This is an example greeting returned from a Rust backend canister!")
```

You can replace the last input string with any name you'd like, such as:

```
dfx canister call hello_world_backend greet Bob
```

This will return the output:

```
("Hello there, Bob! This is an example greeting returned from a Rust backend canister!")
```

## Interacting with the canister

In addition to testing the canister's functionality, the canister can be interacted with using other `dfx` commands. For example:

To deposit cycles from the wallet into the canister, use the command:

```
dfx canister deposit-cycles [cycles amount] [canister-name]
```

To get the identifier of a canister, use the command:

```
dfx canister id [canister-name]
```

To get a canister's Wasm module hash and its current controllers, use the command:

```
dfx canister info [canister-name]
```

## Next steps

Now that your canister has been written, deployed, and tested, let's take a look at [making inter-canister calls](./6-intercanister.md).
