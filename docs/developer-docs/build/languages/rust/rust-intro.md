# Introduction to working with Rust

Rust is a powerful and type sound modern programming language with an active developer community. Because Rust compiles to WebAssembly, it offers a rich development environment for writing dapps to run on the Internet Computer blockchain. To help pave the way for writing dapps in Rust that can be deployed on the Internet Computer blockchain, {company-id} provides some tools to simplify the process.

Collectively, these tools are referred to as the DFINITY Canister Development Kit (CDK) for Rust and consist of the following main libraries:

| Package            | Description                                                                                                                                                                                                             |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ic-types`         | The `ic-types` crate defines the types used to communicate with the decentralized Internet Computer blockchain, and when building dapps to be deployed as canister smart contracts on the Internet Computer blockchain. |
| `ic-agent`         | The `ic-agent` library enables direct communication with the Internet Computer blockchain.                                                                                                                              |
| `ic-utils`         | The `ic-utils` library provides utilities for managing calls and dapps deployed as canister smart contracts.                                                                                                            |
| `ic-cdk`           | The `ic-cdk` provides the core methods that enable Rust programs to interact with the Internet Computer blockchain system API. This library serves as the runtime core of the Rust CDK.                                 |
| `ic-cdk-macros`    | The `ic-cdk-macros` library defines the procedural macros that facilitate building operation endpoints and APIs. This library includes macros for `update`, `query`, `import` and other important operations.           |
| `ic-cdk-optimizer` | The `ic-cdk-optimizer` is a helper library used to reduce the size of WebAssembly modules.                                                                                                                              |

The following diagram provides a simplified view of the Rust Canister Development Kit (CDK) building blocks from the lowest to highest level of abstraction.

![Rust building blocks](../_attachments/../../_attachments/Rust-building-blocks.svg)
