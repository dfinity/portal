---
title: Canisters — next evolution smart contracts
card: /img/what-is-the-ic/canister.webp
cardImageFit: cover
---

A smart contract is a computer program executed on a blockchain. A canister smart contract on the Internet Computer bundles a computer program and its data. Every canister is hosted on one subnet of the Internet Computer.
Canisters can be executed concurrently and are capable of communicating within and across subnets by sending asynchronous messages in a non-blocking manner, resulting in essentially unbounded scalability. Canisters are more powerful than smart contracts on other blockchains as they can:

- serve a user interface directly to any web browser,
- hold gigabytes of memory for a low fee,
- perform substantial amounts of computation at a low cost, and
- pay for their own computation ([reverse gas model](/capabilities/reverse-gas/)).

Canisters can be implemented in any language that compiles to WebAssembly. See selection of canister development kits ([CDKs])(/docs/building-apps/essentials/canisters).
