---
sidebar_position: 1
---
# Choosing a programming language

## Overview

To create [canister smart contracts](https://internetcomputer.org/how-it-works/architecture-of-the-internet-computer/#canister-smart-contracts) it is common practice to use an SDK. The [IC SDK](/docs/current/developer-docs/getting-started/install/) is a common entry point. The IC SDK supports a few programming languages out of the box.

Because the Internet Computer blockchain supports dapps compiled to standard WebAssembly modules, one can use many different programming languages to create ICP canister smart contracts. To build a canister with a particular programming language, one needs a [canister development kit (CDK)](/docs/current/developer-docs/getting-started/install/) for their particular language. A CDK is an adapter used by the IC SDK that provides a programming language with the features necessary to create and manage canisters. To make starting easier, the IC SDK already comes with CDK for multiple languages.

In theory, any language that can be compiled into a WebAssembly module, can produce modules [tailored for deploying on ICP](../../references/ic-interface-spec.md) as an ICP smart contract.

In practice, the amount of CDK and library support for different languages varies across the ICP developer ecosystem, so this article lays out common paths for entering developers. 

The most common languages to use are:

- **Motoko**
  - [Motoko](/motoko/main/motoko.md) was [specifically designed](https://stackoverflow.blog/2020/08/24/motoko-the-language-that-turns-the-web-into-a-computer/) by DFINITY to support the unique features of the Internet Computer and to provide a familiar yet robust programming environment.
  - One can use Motoko via the [IC SDK](https://github.com/dfinity/sdk) by DFINITY.
  - See [introduction to developing canisters in Motoko](./motoko/index.md).
  - You can get a sense of Motoko by using the web-based [Motoko playground](https://m7sm4-2iaaa-aaaab-qabra-cai.ic0.app).
- **Rust**
  - One can use Rust via the either the [IC SDK](https://github.com/dfinity/sdk) (typical path for developers) or use the [Rust CDK](https://github.com/dfinity/cdk-rs) by DFINITY. To see difference between SDK and CDK, see: [SDK vs CDK](/docs/current/developer-docs/getting-started/install/).
  - See [introduction to developing canisters in Rust](./rust/index.mdx).
- **Python**
  - Python is a readable, versatile language for web development, data analysis, and AI.
  - You can use Python via the [Kybra](https://demergent-labs.github.io/kybra) CDK by [Demergent Labs](https://github.com/demergent-labs).
- **TypeScript**
   - You can use TypeScript via the [Azle](https://demergent-labs.github.io/azle) CDK by [Demergent Labs](https://github.com/demergent-labs).
- **Solidity**
  - Solidity is an object-oriented programming language for writing smart contracts. It is used for implementing smart contracts on various blockchain platforms, most notably Ethereum.
  - The Solidity support on Internet Computer is available via the [Bitfinity docs](https://docs.bitfinity.network/) by the [Bitfinity EVM team](https://bitfinity.network), providing the ability to create EVM-based smart contracts.
  - This opens up new possibilities for developers familiar with Ethereum and Solidity to leverage the Internet Computer’s capabilities.
- **C++**
  - You can use C++ via the [icpp-pro](https://docs.icpp.world/) CDK by icpp World.
  - See [Introduction to developing canisters in C++](https://docs.icpp.world/getting-started.html)

It is also possible to split your work between multiple languages. Different canister smart contracts talk to each other using the [Candid](./candid/index.md) language (an [IDL](https://en.wikipedia.org/wiki/Interface_description_language) used commonly in ICP smart contracts). What language works behind the Candid interface, however, does not matter.

## A comparison between Motoko and Rust

To help developers interested in Motoko, here is a comparison of Motoko and Rust (a popular language in Web3). 

As a rule of thumb in deciding between Motoko and Rust:

* Motoko is much easier to learn and ergonomic to use for application developers. It has syntax and rules familiar to developers with a background in the application layer (JavaScript, Ruby, Python, Solidity, etc...). Motoko is good for getting sample, demo, or smaller contracts shipped quickly, but its library ecosystem is still early so can prove challenging for larger projects.

* Rust is a good place for those who already know Rust, come from a systems engineering background (C, C++), or are starting larger or more complex projects where having a baked library ecosystem is helpful or important.

For a more in-depth comparison, read on.

### Internet Computer considerations:

|                   | Motoko          | Rust        |
|-------------------|-----------------|-------------|
| Candid support | Fully automatic. Support is built into the compiler and runtime system. | Library-supported. Regularly needs manual intervention/conversion. |
| Stable memory support | Automatic, supported by the language. Performance is not ideal yet. Bypassing the language is possible, but error-prone. | Library-supported. Automatic in simple cases, otherwise manual implementations are needed. More predictable than Motoko. |
| Asynchronous data and control flow support | Native | Native |
| Actor paradigm support (canister = actor) | Native | Error-prone, conflicts with deep-rooted language features (e.g. the borrow checker). |
| ICP-specific static analysis | Enforces various safety checks. | No static checking. Canisters may trap when violating restrictions. |

### WebAssembly considerations:

|                   | Motoko          | Rust        |
|-------------------|-----------------|-------------|
| Wasm binary size | Very small. | Very large, requires compacting tools. |
| Wasm performance | Benchmarks TBD | Benchmarks TBD |

### Other considerations:

|                   | Motoko          | Rust        |
|-------------------|-----------------|-------------|
| Language maturity | Not mature yet, lots of work left to do. | Mature (enough). Solid library support. |
| Build time | Faster than Rust. | Slower than Motoko. |
| Difficulty of learning | Not very hard. | Quite complex, lots of details to consider. |
| Memory management | Automatic GC (garbage collection). | Application-specific, strong support by the compiler. |
| Foreign function interface support | None yet. | Typical C FFI compatibility. |
