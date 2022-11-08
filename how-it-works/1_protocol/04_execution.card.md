---
title: Execution
---

![](/img/how-it-works/overview-of-the-internet-computer.600x300.jpg)

# Execution

The execution layer, the topmost layer of the core IC protocol stack, is responsible for executing canister smart contract code.
Code execution is done by a [*WebAssembly (Wasm)*](https://webassembly.org/) virtual machine deployed on every node.
WebAssembly bytecode can be executed deterministically, which is important for a blockchain system, and with near-native speed.
Canister messages, i.e., ingress messages by users or messages by other canisters, have been inducted into the queues of the canisters on the subnet by message routing.
Message routing then hands over control to the execution layer, which deterministically executes messages, either until all messages in the canisters' queues are consumed or the cycles limit for the round has been reached, to ensure bounded round times.
The execution of very large messages requiring billions of Wasm instructions to be executed can be split across multiple IC rounds through a novel technique called *deterministic time slicing (DTS)*.
This capability of executing messages over multiple rounds is unique to the Internet Computer blockchain.

Execution of canister Wasm bytecode is done *concurrently* on multiple CPU cores, which is possible due to each canister having its own, isolated, state – recall that a canister is a bundle of code and its state.
A canister's state can only be changed when it executes messages delivered using an asynchronous messaging semantics, thereby leading to a loose coupling between canisters allowing for the concurrent execution and high throughput of messages.

In every IC round, each node of a subnet has the same starting state, which is transformed to the ending state of the round through the execution of messages.
Message scheduling and execution is completely *deterministic*, that is, makes exactly the same state changes on every node of the subnet.
This is crucial for achieving the properties of a replicated state machine, a core property of a blockchain.
Another powerful feature in the execution layer is the availability of an unpredictable and unbiasable *pseudorandom number generator*, which sets apart the IC from other blockchains.

[Go deeper](/how-it-works/execution-layer/)
