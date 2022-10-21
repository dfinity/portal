---
title: "Internet Computer Execution Layer"
abstract: 
shareImage: /img/how-it-works/network-nervous-system-nns.600.jpg
slug: execution-layer
---

# Execution

The execution layer is the topmost layter of the IC core protocol stack.
It deterministically executes the messages that consensus has agreed on, thereby changing the state of the subnet in a deterministic manner.
On each node of the subnet, message routing invokes execution with the same sequence of messages, starting with the same state on each node in a given round.
The deterministic execution of the same sequence of agreed-upon messages on every node of the subnet guarantees that the same ending state is obtained on each node of the subnet after completion of the round.

A canister smart contract is the union of Web Assembly bytecode and memory pages representing its state.
The code can be changed by installing and updating the canister.
Both the code and the memory pages, i.e., the state, of the canister, are maintained by every machine of the subnet the canister is installed on.
Each node in the subnet holding the same canister state and ensuring that the state transitions in the same way on every node in every round is the foundation of realizing a replicated state machine and the security and resilience properties that make blockchains so unique.

The execution layer is designed such that it can execute multiple canisters concurrently on different CPU cores.
This concurrent execution within a subnet together with the capability of all subnets operating concurrently to each other makes the IC scalable like public cloud: The IC scales out by adding more subnets.

## Concurrent Message Execution

In one IC round, the message routing layer invokes the execution layer for each message to be executed.
Depending on how much effort (CPU cycles) the execution of the messages of a round requires, a round ends with all messages to be scheduled being executed or the cycles limit of the round being reached with parts of the messages left to the next round for execution.
Each message execution can lead to memory pages of the canister being written ("dirtied"), new messages to other canisters on the same or different subnets being created, or a response to be generated in case of an ingress message.

Changes to memory pages are tracked and pages flagged as "dirty" so that the can be processed accordingly when certifying the state.

When a message execution leads to the generation of a new canister message targeted at a canister in the local subnet, this message can be queued up directly by execution in the input queue of the target canister and scheduled in the same round or an upcoming round, without this new message going through consensus.
This works because the generation and queuing of the new message is completely deterministic and thus happens in exactly the same way on all the nodes of the subnet – thus no need for this new message going through consensus.

New messages targeted at other subnets are placed into the target subnet queue and are certified by the subnet at the end of the round.
This way, the receiving subnet can verify that the xnet messages are authenticated by the subnet.

## Concurrent Query Execution

Queries are operations that are executed by a single node and return a response synchronously.
The key difference to messages (update calls) is that queries cannot change the replicated state of the subnet.
They are essentially read operations done on one replica, with the associated trust model of a compromised replica being able to return any arbitrary result of its choice.

Analogous to update calls, queries are executed concurrently by multiple threads by a node.
However, all the nodes of the subnet can concurrently execute different queries as queries are not executed in a replicated manner.
Query throughput of a subnet increases linearly with an increasing number of nodes in the subnet.

Queries are used for non-critical operations, similiar to read operations on a local or cloud Ethereum node on the Ethereum blockchain.
Whenever criticial information is to be read, e.g., financial data based on which decisions are made, update calls should be used to obtain such information such that it is certified by the subnet.

## Memory Handling

Management of the canister code and state (collectively memory) is one of the key responsibilities of the execution layer.
The replicated state that can be held by a single subnet is not bounded by the available RAM in the node machines, but rather by the SSD storage.
Available RAM, however, impacts the performance of the subnet, particularly access latency of memory pages.
Our node machines are equippend with tens of terabyte of high-end SSD storage and half a terabyte of RAM to achieve good performance and be able to hold large amounts of replicated canister state and Wasm code.
While the execution layer maintains the memory data structures and updates them accordingly with changes to memory pages, it interacts closely with the state management component of message routing which is responsible for certifying (parts of) the state through the subnet at the end of a round or once every (much longer) DKG interval.

Memory pages are persisted to SSD by the execution layer, without canister programmers needing to take care of this.
Having all memory pages transparently persisted enables orthogonal persistence and frees the users from reading from and writing to storage as on other blockchains.
This simplifies smart contract implementation a lot and helps reduce TCO of a dApp.
Programmers can always have the full canister state on the heap or in stable memory.
The difference is that the heap is cleared on updates of the canister code, while stable memory remains, hence the name.

## Cycles Accounting

The execution of a canister consumes resources of the Internet Computer, which are paid for with cycles that the canister must be topped up with.
Fulling up the canister with cycles is the responsibility of the maintainer, which can be a DAO, users do not pay for using services on the IC.
The Wasm code running in a canister gets instrumented with code that counts the instructions executed when the Wasm code gets installed on the IC.
This allows for deterministally determining the exact amount of cycles to be charged for a given message being executed.
Also, the memory the canister users in terms of both its Wasm code and canister state, needs to be paid for with cycles.
Much like in public cloud, consumed storage per time is charged for.
Furthermore, networking activities such as receiving ingress messages and xnet messages are paid for by the canister in cycles.
It is crucial that the cycles charging be deterministic so that every node charges exactly the same amount of cycles for a given operation.
