---
sidebar_position: 4
sidebar_label: "From Rust"
---
# Calling IC from Rust

The Rust Agent by DFINTY (documentation [here](https://docs.rs/ic-agent/latest/ic_agent), source code [here](https://github.com/dfinity/agent-rs)) is a simple-to-use library that enables you to build applications and interact with the Internet Computer.
It serves as a Rust-based low-level backend for the IC (SDK).
The ic-agent is a Rust crate that can connect directly to the Internet Computer through the Internet Computer protocol (ICP).
The agent is designed to be compatible with multiple versions of the replica API, and to expose both low-level APIs for communicating with Internet Computer protocol components like the replica and to provide higher-level APIs for communicating with software applications deployed as canisters.

One example of a project that uses the `ic-agent` is dfx, which you can find [here](https://github.com/dfinity/sdk).
