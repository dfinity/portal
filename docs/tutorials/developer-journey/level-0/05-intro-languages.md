# 0.5: Introduction to languages 

## Overview

When developing canisters, the most common development workflow is to use a software development kit (SDK). The Internet Computer SDK is the most commonly used, which natively supports Motoko and Rust out of the box. 

Since the IC supports dapps that have been compiled into WebAssembly modules, many different programming languages can be used for canister development. However, a canister development kit (CDK) needs to be used. A CDK is an adapter used by the IC SDK that provides a programming language with the necessary features and tools required to create and manage canisters. The IC SDK comes bundled with CDKs for Motoko and Rust. Additionally, there are several community created CDKs for additional languages, such as Python and TypeScript, that can be installed separately. 

It is possible to use multiple languages within a single dapp's development. Different canisters can communicate to one another using the Candid language, which is an interface description language (IDL) used by IC canisters, allowing for multiple canisters in different languages to share and exchange information. 

## Motoko

Motoko is a language that has been specifically designed by DFINITY for canister development on the IC. It supports the unique features and workflows on the IC while providing a robust yet familiar programming environment.  Motoko is easy to learn and use for application development, as it has a familiar set of rules and syntax for developers that have a background with application-layer languages, such as JavaScript, Ruby, Python, or Solidity. 

Since Motoko has been developed and designed for the IC, this developer journey series will use Motoko for all tutorials and code walkthroughs. 

### Motoko attributes:

- **Candid support:** Motoko has fully automatic Candid support that is built into the Motoko runtime and compiler system. 

- **Stable memory support:** Motoko supports automatic stable memory support. 

- **Asynchronous data and control flow support:** Natively supported.

- **Actor paradigm support:** Natively supported.

- **IC-specific static analysis:** Enforced through multiple safety checks. 

- **Wasm binary size:** Wasm binary size is very small. 

- **Build time:** Motoko has a build time faster than Rust. 

- **Learning difficulty:** Learning Motoko is fairly easy. 

- **Memory management:** Memory is managed using an automatic garbage collection process. 

- **Foreign function interface support:** Not yet supported. 

## Rust

Rust is supported on the IC through the IC SDK and the DFINITY Rust CDK. The IC SDK automatically comes with the Rust CDK as part of the software, but the Rust CDK can be installed separately if the IC SDK is not installed. Rust is a good choice for developers who are already familiar with Rust environments, come from a background in C or C++, or are developing large, complex projects that would benefit from having a mature library ecosystem. 

Many of the tutorials in this developer journey series are available in a Rust version that displays identical functionality. These will be linked where applicable for those that want to follow along with Rust, though not all tutorials will have a Rust version. 

### Rust attributes:

- **Candid support:** Candid is supported through Rust libraries, which needs routine manual intervention and conversion. 

- **Stable memory support:** Stable memory is supported through Rust libraries and is automatic in some cases. 

- **Asynchronous data and control flow support:** Natively supported.

- **Actor paradigm support:** Conflicts with some language features, resulting in being error-prone. 

- **IC-specific static analysis:** Does not include static checking, which may result in canisters trapping when violating restrictions.  

- **Wasm binary size:** Wasm binary is very large and requires compression through tools. 

- **Build time:** Rust has a slower build time than Motoko.

- **Learning difficulty:** Learning Rust can be fairly difficult, as the language is quite complex. 

- **Memory management:** Memory management is application specific and has strong support through the compiler. 

- **Foreign function interface support:** Typical C FFI compatibility. 

## Candid

Candid is an interface description language with the primary purpose to describe the public interface of a service. In reference to the IC, a service is a program deployed in the form of a canister.  Each canister has a Candid file that defines the interface description for the service. 

Candid is language-agnostic, allowing for interoperability between frontends and services that are written in different languages, such as Motoko, Rust, or JavaScript. Additionally, Candid supports service interface evolution by specifying changes without breaking existing clients, such as safely adding new parameters to a service without losing compatibility from existing clients.

A Candid interface description defines the public methods for a service. Every method has a sequence of argument and result types, and can include annotations that are specific to the IC. Interface descriptions make it possible to interact with the service directly from the CLI, through a web-based frontend, or programmatically from another program or language.

Candid has a variety of features that make it a particularly good choice for developing dapps on the Internet Computer. These features include:

- Candid's implementations map the Candid value directly to the values and types of the host language, meaning developers do not construct or deconstruct some abstract Candid value. 
- Candid defines rules for how series and their associated interface can be upgraded in a simple manner. 
- Candid is a higher-order language, meaning it can receive more than plain data such as references to methods and services. 
- Candid has native support for specific IC features, such as query annotation. 

## Community developed CDKs

There are several CDKs that have been contributed by the IC community. 

### Python

Python is a popular language for web development, AI functions, and data analysis. It is readable and versatile.

Python is available through the [Kybra CDK](https://demergent-labs.github.io/kybra) developed by [Demergent Labs](https://github.com/demergent-labs). 

### TypeScript

TypeScript is available through the [Azle CDK](https://demergent-labs.github.io/azle) developed by [Demergent Labs](https://github.com/demergent-labs).

### Solidity 

Solidity is an object-oriented language used for writing and implementing smart contracts on blockchain platforms, with the most widely known being the Ethereum network. 

Solidity is supported on the IC through [Bitfinity](https://docs.bitfinity.network/), developed by the [Bitfinity EVM team](https://bitfinity.network/), which provides a way to create EVM-based smart contracts. 

### C++

C++ is available through the [icpp-pro CDK](https://docs.icpp.world/) developed by icpp World.

## Next steps

- [0.6: Introduction to dfx](06-intro-dfx.md).
