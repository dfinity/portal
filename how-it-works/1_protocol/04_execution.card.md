---
title: Execution Layer
---

![](/img/how-it-works/overview-of-the-internet-computer.600x300.jpg)

# Execution layer

The execution layer, the topmost layer of the core IC protocol stack, is responsible for executing canister messages and running queries.
This layer implements a Web Assembly (Wasm) virtual machine to execute canister smart contracts implemented in Wasm.
Execution of Wasm code is invoked by message routing whenever a canister message is scheduled for execution.
In every round, each node of a subnet has the same starting state, which is transformed to the ending state of the round through the executed messages.
Execution is completely deterministic, that is, makes exactly the same state changes on every node of the subnet.
This is crucial for achieving the properties of a replicated state machine, a core property of a blockchain.

[Learn more](/how-it-works/execution-layer/)
