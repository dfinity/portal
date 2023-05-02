---
sidebar_position: 1
---
# Choosing a programming language

To create [canister smart contracts](https://internetcomputer.org/how-it-works/architecture-of-the-internet-computer/#canister-smart-contracts) it is typical to use a so-called CDK, a Canister Development Kit.
The CDK's main tasks are to expose the public interface of a canister, manage memory, allow other canisters to be called, and to interface with the system API. Because the Internet Computer supports dapps compiled to standard WebAssembly modules, you can use many different programming languages to create your canisters.

In theory, any language that can be compiled into a WebAssembly module, can produce modules [tailored for the IC](../../references/ic-interface-spec.md) depoyable as an ICP smart contract.
In practice, the amount of CDK and library support for different anguages varies across the ICP developer ecosystem, so this article lays out common paths for entering developers. The most common languages to use are:

- **Motoko**
  - [Motoko DFINITY](/motoko/main/motoko.md) was [specifically designed](https://stackoverflow.blog/2020/08/24/motoko-the-language-that-turns-the-web-into-a-computer/) by DFINITY to support the unique features of the Internet Computer and to provide a familiar yet robust programming environment.
  - You can use Motoko via th `dfx` CDK by DFINITY.
- **Rust**
  - Rust is a powerful and modern type-sound programming language with an active developer community, specially in Web3.
  - You can use Rust via th `dfx` CDK by DFINITY.
  - See [Introduction to Developing Canisters in Rust](./rust/index.md)
- **Python**
  - Python is a readable, versatile language for web development, data analysis, and AI.
  - You can use Python via the [`Kybra`](https://demergent-labs.github.io/kybra) CDK by Demergent Labs
- **TypeScript**
  - TypeScript is a typed JavaScript superset, improving tooling and maintainability in large applications.
  - You can use TypeScript via the [`Azle`](https://demergent-labs.github.io/azle) CDK by Demergent Labs


It is also possible to split your work between multiple languages. Different canister smart contracts talk to each other using the [Candid](./candid/index.md) language (an [IDL](https://en.wikipedia.org/wiki/Interface_description_language) used commonly in ICP smart contracts) . What language works behind the candid interface, however, does not matter.

## A comparison between Motoko and Rust

To help developers interested in Motoko, here is a comparison of Motoko and Rust (a popular language in Web3). 

As a rule of thumb in deciding between Motoko and Rust:

* Motoko is much easier to learn and ergonomic to use for application developers. It has syntax and rules familiar to developers with a background in the application layer (JavaScript, Ruby, Python, Solidity, etc...). Motoko is good for getting sample, demo, or smaller contracts shipped quickly, but its library ecosystem is still early so can prove challenging for larger projects.

* Rust is a good place for those who already know Rust, come from a systems engingeering background (C, C++), or are starting larger or more complex projects where having a baked library ecosystem is helpful or important.

For a more in-depth comparison, read on.

### Internet Computer considerations:

|                   | Motoko          | Rust        |
|-------------------|-----------------|-------------|
| Candid support | Fully automatic. Support is built into the compiler and runtime system. | Library-supported. Regularly needs manual intervention/conversion. |
| Stable Memory support | Automatic, supported by the language. Performance is not ideal yet. Bypassing the language is possible, but error-prone. | Library-supported. Automatic in simple cases, otherwise manual implementations are needed. More predictable than Motoko. |
| Asynchronous Data and Control Flow Support | Native | Native |
| Actor Paradigm support (Canister = Actor) | Native | Error-prone, conflicts with deep-rooted language features (e.g. the borrow checker). |
| IC-specific Static Analysis | Enforces various safety checks. | No static checking. Canisters may trap when violating restrictions. |

WebAssembly considerations:

|                   | Motoko          | Rust        |
|-------------------|-----------------|-------------|
| Wasm binary size | Very small. | Very large, requires compacting tools. |
| Wasm performance | Benchmarks TBD | Benchmarks TBD |

Other considerations:

|                   | Motoko          | Rust        |
|-------------------|-----------------|-------------|
| Language Maturity | Not mature yet, lots of work left to do. | Mature (enough). Solid library support. |
| Build Time | Faster than Rust. | Slower than Motoko. |
| Difficulty of Learning | Not very hard. | Quite complex, lots of details to consider. |
| Memory Management | Automatic GC (garbage collection). | Application-specific, strong support by the compiler. |
| Foreign Function Interface support | None yet. | Typical C FFI compatibility. |
