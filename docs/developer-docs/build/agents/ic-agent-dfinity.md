# DFINITY's Rust Agent

DFINITY's Rust Agent (documentation [here](https://docs.rs/ic-agent/latest/ic_agent), source code [here](https://github.com/dfinity/agent-rs)) is a simple-to-use library that enables you to build applications and interact with the Internet Computer in Rust.
It serves as a Rust-based low-level backend for the DFINITY Canister Software Development Kit (SDK) and the Canister SDK command-line execution environment dfx.
The ic-agent is a Rust crate that can connect directly to the Internet Computer through the Internet Computer protocol (ICP).
The agent is designed to be compatible with multiple versions of the replica API, and to expose both low-level APIs for communicating with Internet Computer protocol components like the replica and to provide higher-level APIs for communicating with software applications deployed as canisters.

You can find a bunch of examples that use the `ic-agent` crate [here](https://github.com/dfinity/examples/tree/master/rust).