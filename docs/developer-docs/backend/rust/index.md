# Introduction to Developing Canisters in Rust

Rust is a powerful and type-sound modern programming language with an active developer community. Because Rust compiles to WebAssembly, it offers a rich development environment for writing dapps to run on the Internet Computer blockchain. 

# Getting Started
To help pave the way for writing dapps in Rust that can be deployed on the Internet Computer blockchain, you can use the [`dfx` CDK](../../setup/install/index.mdx). The `dfx` CDK supports the Rust as well as the Motoko programming language. To create a Rust project using `dfx`, all one needs to do is add the `--type=rust` flag while creating a new project. For example, here we create a Rust project named `hello_world`:

```bash
dfx new --type=rust hello_world
```

To start a new project see [Rust Quickstart](./rust-quickstart.md).

## Under the Hood

To support Rust development, the `dfx` CDK uses cargo crates which make up the [Rust canister development kit (Rust CDK)](https://github.com/dfinity/cdk-rs). 

Experienced Rust developers may choose to circumvent `dfx` entirely and use the Rust CDK directly.

The Rust CDK consists of the following crates:

1. The core of Rust CDK is the [`ic-cdk`](https://crates.io/crates/ic-cdk) crate. It provides the core methods that enable Rust programs to interact with the Internet Computer blockchain system API.

2. The [`ic-cdk-macros`](https://crates.io/crates/ic-cdk-macros) crate defines the procedural macros (e.g. `update`, `query`, `import`) that facilitate building operation endpoints and APIs.

3. Also, the [`ic-cdk-timers`](https://crates.io/crates/ic-cdk-timers) crate provides an API to schedule multiple and periodic tasks.

There are a few [examples](https://github.com/dfinity/cdk-rs/tree/main/examples) to get you started building Rust Canisters.

Also, it is much easier to use `dfx` instead of setting up the project from scratch. See the [Rust Quickstart](./rust-quickstart.md) for a simple walkthrough.
