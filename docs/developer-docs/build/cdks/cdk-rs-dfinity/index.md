# Introduction to Developing Canisters in Rust

Rust is a powerful and type-sound modern programming language with an active developer community. Because Rust compiles to WebAssembly, it offers a rich development environment for writing dapps to run on the Internet Computer blockchain. To help pave the way for writing dapps in Rust that can be deployed on the Internet Computer blockchain, DFINITY provides the [Rust canister development kit (Rust CDK)](https://github.com/dfinity/cdk-rs) to simplify the process.

The core of Rust CDK is the [`ic-cdk`](https://crates.io/crates/ic-cdk) crate. It provides the core methods that enable Rust programs to interact with the Internet Computer blockchain system API. The [`ic-cdk-macros`](https://crates.io/crates/ic-cdk-macros) crate defines the procedural macros (e.g. `update`, `query`, `import`) that facilitate building operation endpoints and APIs.

There are a few [examples](https://github.com/dfinity/cdk-rs/tree/main/examples) to get you started building Rust Canisters.

Also, it is much easier to use `dfx` instead of setting up the project from scratch. See the [Rust Quickstart](./rust-quickstart.md) for a simple walkthrough.
