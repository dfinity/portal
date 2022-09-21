---
title: What are Canisters

card: /img/roadmap/core-protocol.card.jpg
overlay: /img/roadmap/core-protocol.overlay.jpg
---
Smart contracts on the IC are called canister smart contracts or simply canisters. A canister is a bundle of both the code and state of a smart contract. A canister is hosted on one subnet of the IC and the nodes of the subnet ensure, through the IC's consensus protocol and deterministic execution, that every node within the subnet always holds the same canister state. The IC's protocol ensures that, even if a subset of nodes of a subnet (up to less than one third) are faulty or misbehave, the remaining honest nodes of the subnet still retain a consistent view of the subnet and its canisters, and the subnet can still make progress.
Multiple canisters on the same subnet can be executed concurrently, as can canisters on different subnets. Canisters communicate with other canisters on the same or different subnets through asynchronous message passing, that is, a canister sends a message to another canister and receives back a response asynchronously. This implicitly solves the consistency problem with respect to different subnets and allows for essentially unbounded horizontal scalability.
Compared to smart contracts on other blockchains, canisters are more powerful in the following ways: canisters can serve the user interface and all assets directly from the blockchain; canisters can hold gigabytes of memory for a low fee; canisters can perform substantial amounts of computation at a low cost; and canisters pay for their own fees, instead of the end users paying in order to use the service.
Engineers can implement canisters in any language that compiles to Wasm. Currently Rust and the IC's own smart contract programming language Motoko have development kits to streamline the engineering experience.
  
