# Introduction to working with Rust

Rust is a powerful and type sound modern programming language with an active developer community. Because Rust compiles to WebAssembly, it offers a rich development environment for writing dapps to run on the Internet Computer blockchain. To help pave the way for writing dapps in Rust that can be deployed on the Internet Computer blockchain, DFINITY provides some tools to simplify the process.

Collectively, these tools are referred to as the DFINITY Canister Development Kit (CDK) for Rust and consist of the following main libraries:

| Package            | Description                                                                                                                                                                                                             |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`ic-types`](https://crates.io/crates/ic-types)         | The `ic-types` crate defines the types used to communicate with the decentralized Internet Computer blockchain, and when building dapps to be deployed as canisters on the Internet Computer blockchain. |
| [`ic-agent`](https://crates.io/crates/ic-agent)         | The `ic-agent` library enables direct communication with the Internet Computer blockchain.                                                                                                                              |
| [`ic-utils`](https://crates.io/crates/ic-utils)         | The `ic-utils` library provides utilities for managing calls and dapps deployed as canisters.                                                                                                            |
| [`ic-cdk`](https://crates.io/crates/ic-cdk)           | The `ic-cdk` provides the core methods that enable Rust programs to interact with the Internet Computer blockchain system API. This library serves as the runtime core of the Rust CDK.                                 |
| [`ic-cdk-macros`](https://crates.io/crates/ic-cdk-macros)    | The `ic-cdk-macros` library defines the procedural macros that facilitate building operation endpoints and APIs. This library includes macros for `update`, `query`, `import` and other important operations.           |

The following diagram provides a simplified view of the Rust Canister Development Kit (CDK) building blocks from the lowest to highest level of abstraction.

![Rust building blocks](../_attachments/../../_attachments/Rust-building-blocks.svg)

The [Rust canister development kit (Rust CDK)](https://github.com/dfinity/cdk-rs) provides some shortcuts to make it easier to write functions as query and update calls and includes several [examples](https://github.com/dfinity/cdk-rs/tree/next/examples) to get you started building Rust-based projects, but you can also develop dapps for the IC without using the Rust CDK. Also, it is much easier to use `dfx` instead of setting up the project from scratch. See the [Rust Quickstart](./rust-quickstart.md) for a simple walkthrough.
