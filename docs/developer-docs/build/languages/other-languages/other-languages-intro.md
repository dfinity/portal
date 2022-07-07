# Other Languages

The Internet Computer has some common interfaces that are defined, but leaves the developers lots of freedom in the tools/languages they want to use. For example, canisters can be developed with anything that ultimately can produce a WebAssembly module. And anything that can translate its requests into correctly-shaped HTTP requests is allowed to talk to the Internet Computer.

There are two main ways to working with canisters: It is possible to develop canisters, and it is possible to interact with canisters from outside. These two development modes are relatively separate tasks, and therefore most libraries are geared towards one use case. 

## Developing Canisters (CDKs)

To create canisters, it is typical to use a so-called CDK, a Canister Development Kit. The CDK's main tasks are to expose the public interface of a canister, manage memory, allowing other canisters to be called, and to interface with the system API. Here is a non-exhaustive list of different CDKs and/or language guides: (CDK developers, feel free to add your own using the 'Edit this page' button at the bottom!)

- C-like languages: [Clang guide](./clang-supported-languages.md)
- Motoko: support built into [dfx](../../install-upgrade-remove.mdx) using the Motoko compiler [moc](https://github.com/dfinity/motoko)
- Rust: [cdk-rs](https://github.com/dfinity/cdk-rs)

## Interfacing with Canisters (Agents)

To send requests to canisters from outside of the Internet Computer, so-called agents are used. They are most commonly integrated into frontends, e.g. when serving a web page. Another popular use case is for writing scripts that talk to canisters. Here is a non-exhaustive list of different agents: (Agent developers, feel free to add your own using the 'Edit this page' button at the bottom!)

- .NET: [ICP.NET](https://github.com/Gekctek/ICP.NET)
- Go: [IC-Go](https://github.com/mix-labs/IC-Go)
- Javascript: [agent-js](https://github.com/dfinity/agent-js)
- Python: [ic-py](https://github.com/rocklabs-io/ic-py)
- Rust: [agent-rs](https://github.com/dfinity/agent-rs)
