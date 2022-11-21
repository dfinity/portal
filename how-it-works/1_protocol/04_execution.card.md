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

The execution layer has many unique features, which sets apart the IC from other blockchains: 
1. *Deterministic time slicing (DTS)* - The execution of very large messages requiring billions of Wasm instructions to be executed can be split across multiple IC rounds. This capability of executing messages over multiple rounds is unique to the Internet Computer blockchain.
2. *Concurrency* - Execution of canister Wasm bytecode is done *concurrently* on multiple CPU cores, which is possible due to each canister having its own isolated state. 
3. *Pseudorandom number generator* - Execution layer has access to unpredictable and unbiasable *pseudorandom number generator*. Canisters can now execute algorithms that require randomness. 
[Go deeper](/how-it-works/execution-layer/)
