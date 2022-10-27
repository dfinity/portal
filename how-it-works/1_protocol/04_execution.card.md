---
title: Execution Layer
---

![](/img/how-it-works/overview-of-the-internet-computer.600x300.jpg)

# Execution layer

The execution layer, the topmost layer of the core IC protocol stack, is responsible for executing *queries* (the easy part) and scheduling and executing *canister messages* (the hard part).
The execution layer implements a *Web Assembly (Wasm) virtual machine* for the execution of Wasm-based canister smart contract bytecode used on the IC.
Queries are executed by one machine of a subnet, i.e., in a non-replicated manner.
For executing canister messages, the execution layer gets invoked by the message routing layer once the messages of the block have been inducted into the queues of the canisters on the subnet.
Execution then deterministically executes messages, either until all messages in the canisters' queues are consumed or the cycles limit for the round has been reached, to ensure bounded round times.
Execution of canister Wasm bytecode is done concurrently on multiple CPU cores, which is possible due to the asynchronous messaging semantics between canisters and each canister having its own, isolated, state.
In every round, each node of a subnet has the same starting state, which is transformed to the ending state of the round through the execution of messages.
Message scheduling and execution is completely deterministic, that is, makes exactly the same state changes on every node of the subnet.
This is crucial for achieving the properties of a replicated state machine, a core property of a blockchain.
Another powerful feature in the execution layer is the availability of an unpredictable and unbiasable *pseudorandom number generator*, which sets apart the IC from other blockchains.

[Go deeper](/how-it-works/execution-layer/)
