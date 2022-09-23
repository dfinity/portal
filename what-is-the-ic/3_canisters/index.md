---
title: Canisters are the next evolution of smart contracts
card: /img/what-is-the-ic/canister.jpg
cardImageFit: cover
---

A smart contract is a computer program executed on a blockchain. A canister, or canister smart contract, is a bundle comprised of a computer program and its data. Every canister is hosted on one subnet of the IC.

Canisters on different subnets can be executed concurrently. Furthermore, multiple canisters on the same subnet can also be executed in parallel, further increasing throughput. Canisters communicate with each other within and across subnets by sending asynchronous messages in a non-blocking manner. These properties allow for essentially unbounded scalability.

Canisters on the IC have distinguishing properties. They can

- serve a user interface directly from the blockchain,
- hold gigabytes of memory for a low fee,
  perform substantial amounts of computation at a low cost, and
  pay for their own computation (reverse gas model).

Engineers can implement canisters in any language that compiles to WebAssembly (Wasm). SDKs are currently available for [Rust](/docs/current/developer-docs/build/cdks/cdk-rs-dfinity/) and [Motoko](/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/).
  
