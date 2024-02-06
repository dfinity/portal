# Introduction to developing canisters in Rust

Rust is a powerful and type-sound modern programming language with an active developer community. Because Rust compiles to WebAssembly, it offers a rich development environment for writing dapps to run on the Internet Computer blockchain. 

## Overview
To help pave the way for writing dapps in Rust that can be deployed on the Internet Computer blockchain, you can use the [IC SDK](/docs/current/developer-docs/getting-started/install/). The IC SDK supports the Rust as well as the Motoko programming language. To create a Rust project using the IC SDK, all one needs to do is add the `--type=rust` flag while creating a new project. For example, here you create a Rust project named `hello_world`:

```bash
dfx new --type=rust hello_world
```

To start a new project see [Rust quick start](4-quickstart.md).

## Architecture

To support Rust development, the IC SDK includes the [Rust canister development kit (Rust CDK)](https://github.com/dfinity/cdk-rs). 

**While using the IC SDK is the typical path for most developers, experienced Rust developers may choose to circumvent IC SDK entirely and use the [Rust CDK](https://github.com/dfinity/cdk-rs) directly. This documentation assumes one is using the IC SDK to build Rust canisters.**

### The Rust CDK consists of the following crates:
- The core of Rust CDK is the [`ic-cdk`](https://crates.io/crates/ic-cdk) crate. It provides the core methods that enable Rust programs to interact with the Internet Computer blockchain system API.

- The [`ic-cdk-macros`](https://crates.io/crates/ic-cdk-macros) crate defines the procedural macros (e.g. `update`, `query`, `import`) that facilitate building operation endpoints and APIs.

- Also, the [`ic-cdk-timers`](https://crates.io/crates/ic-cdk-timers) crate provides an API to schedule multiple and periodic tasks.

There are a few [examples](https://github.com/dfinity/cdk-rs/tree/main/examples) to get you started building Rust Canisters.

