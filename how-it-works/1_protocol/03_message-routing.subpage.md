---
title: Message Routing
abstract: 
shareImage: /img/how-it-works/message-routing.600.jpg
slug: message-routing
---

# Message Routing

The Internet Computer blockchain enables users to send messages to canister smart contracts and canisters to send messages between themselves. For scalability, the Internet Computer is composed of many subnet blockchains and the Internet Computer's Network Nervous System can add new subnets as required. The message routing component routes messages to and from canisters across all of the Internet Computer's subnet blockchains and ensures that new subnets can be added seamlessly.

Message routing is the lower of the two upper layers of the protocol stack. It implements multiple functionalities crucial for the operation of the IC, some of them hinted at by the layer's name.
Whenever consensus produces a finalized block of messages, that is, a block that has been considered correct (notarized) and finalized by at least two thirds of the subnet's nodes, this block is handed over to message routing.
This is exactly the transition between the lower and upper half of the protocol stack: The lower two layers are responsible for agreeing among all nodes in the subnet in each round on a block of messages to be executed.
On every node, this block, once found (i.e., proposed, notarized, and finalized) is handed over to the implementation of the message routing layer on this node.

Once message routing receives a block of messages – recall that a block comprises both ingress messages submitted by users and xnet messages sent by canisters on other subnets, the messages are extracted from the block and each message is placed into the input queue of its target canister.
This process is called *induction* and all the queues are collectively referred to as *induction pool*.
Message routing implements a *scheduler* that schedules messages in the induction pool for execution and invokes the execution of to-be-scheduled messages. At this point, control is handed over to the *execution layer*, a virtual machine responsible for execution of canister messages and the topmost layer of the core IC protocol stack.
Execution is deterministic, thus the state stored in the node is change in the same way on every node of the subnet, which is crucial for achieving the replicated state machine properties of a subnet.
The execution of a message can change memory pages of the canister the message is executed on.
Changed memory pages are tracked by the *state manager* at the message routing layer.
The execution of a message can also lead to the creation of new messages the canister calls on other canisters.
Such a message can be either targeted at a cabnister on the local subnet or another subnet.
In the further case, execution can directly place the new message into the input of the target canister.
In the latter case of a new xnet message, the message is placed into the xnet queue for the target subnet.
This queus is implemented as part of the message routing layer and enables sending xnet messages to other subnets.

## Inter-Canister Messaging

As mentioned above, the execution of a canister message can lead to the creation of a new inter-canister message sent to a local or remote (on a different subnet) canister.

### Intra-Subnet (Local) Inter-Canister Messaging

Local messages do not need to go through consensus as they deterministically result from already-consented messages and their further execution remains completely deterministic.
Local message invocations can be executed as long as the cycles limit for the round has not yet been exhausted.
It is important to note that this local inter-canister messaging is *not synchronous* message invocation as you might be used from EVM-based blockchains.
Rather, local messages are put into the input queue of the target canister and executed asynchronously.
This is the standard inter-canister messaging semantics known for the Internet Computer.

### Inter-Subnet (Remote) Inter-Canister Messaging

Remote messages, that is, such sent to canisters on other subnets, are handled differently.
A remote message is placed into the outgoing *subnet queue* for the target subnet.
The xnet messages in the queue are certified (signed) using an optimized data representation, at the end of the round by the subnet using BLS threshold cryptography.
That is, every message in the outgoing queue is certified by the originating subnet.
Replicas on the receiving subnet obtain the xnet message during block making (part of consensus), validate the threshold signature, and include a valid xnet message in a consensus block.

## State Certification

The replicated state of a subnet comprises multiple items:
* Responses to ingress messages
* Xnet messages to be sent to other subnets
* Canister metadata (module hashes, *certified variables*)
* All canister Wasm bytecode
* All canister state (heap and stable memory)

The message routing layer performs a certification of parts of the replicated state after each round (the first three items above) and certification of the full replicated state (also the remaining two items) every so-called DKG interval, which is typically set to be multiple-hundred rounds.
Certification is always done using BLS threshold signatures computed collectively by the subnet, thus certifications are by the subnet, and not individual nodes.

### Per-Round Certification

At the end of the round, i.e., when all messages have been executed or the cycles limit for the round has been reached (to ensure rounds cannot take arbitrarily long), the message routing layer performs a certification of parts of the replicated state.
A BLS threshold signature is computed to certify the following parts:
* Xnet messages in queues to other subnets as outlined above to allow a receiving subnet to validate the authenticity of xnet messages.
* Ingress history, containing the responses of executed ingress messages so that users can verify the responses.

### Checkpoint Certification

Wasm code changed in canister updates and updated (dirty) memory pages are not certified in every round, but tracked in a Merkle tree data structure whenever they are written.
The tracking is actually done by the execution layer on each write using standard memory page management approaches as known from the Linux kernel.
At every DKG interval (FIX: reference), that is, every multiple hundred rounds which corresponds to around 10 minutes (configurable), the subnet computes a so-called checkpoint at which the complete state of a subnet is recertified.
This is done through signing the Merkle tree data structure that tracks all the elements of the state of the subnet.
The state certification is done incrementally on changed memory pages by hashing the content of all pages changed since the last certification and propagating the changes up the Merkle tree – something well known in the blockchain domain.
The runtime of this checkpointing operation is linear in the number of changed pages, not overall state size.
The Merkle tree data structure makes this operation incremental and thus efficient.
This is crucial as we expect a subnet to hold many terabytes of state in the future and a full recertification of multiple terabytes of replicated state would not be practical every 10 minutes.

The above-described state certification ensures that any item of data is authenticated, be it data within the subnet or such communicated to other subnets, or the responses to ingress messages retrieved by users.
This particularly enables secure and verifiable inter-subnet communication, a crucial feature of the Internet Computer as well as an enabler of its scalability.

## State Sync

The message routing layer implements another quite unique feature of the Internet Computer.
As described above, every checkpointing interval, i.e., around every 10 minutes, the complete subnet state is certified by the subnet through a BLS threshold signature on a Merkle tree.
One prominent use case of such a checkpoint is to allow new nodes to join a subnet, e.g., if the subnet is to grow in size or a node needs to be replaced because of having been destroyed in a disaster.
A newly-joined node of a subnet can download the latest checkpoint from its subnet peers.
Once downloaded and verified with the public key of the subnet, the new node catches up to the current block height by processing all the blocks that have been generated in the subnet since the downloaded checkpoint and "replays" them, i.e., executes them as it would in the normal node operation to successively make state transitions of its local state to finally reach that of the subnet.
Thanks to the downloaded checkpoint, only some hundred blocks need to be replayed, not every block from the start of the subnet as is the case in other blockchains.
The possibility of a new node starting with the state in a checkpoint realistically allows for any form of efficient node joining in the subnet.

A node joining a subnet would practically not be possible if the node would need to replay all blocks from the very first block ever created on the subnet as is the architecture in other blockchains.
The reasoning here is that the IC is intended to replace public cloud, i.e., is intended to have a high throughput of operations per time unit, much like real-world cloud servers running their applications.
Consider a subnet that has been running for four years with high CPU utilization.
It is in this case completely infeasible for a newly joining node to ever catch up with the subnet when trying to replay all blocks starting with the genesis block of the subnet.
to resolve this, the IC supports nodes joining by downloading and verifying the state from a checkpoint and replaying only the transactions since then, which are in the hundreds, and not hundreds of millions.

[![Watch youtube video](https://img.youtube.com/vi/YexfeByBXlo/0.jpg)](https://www.youtube.com/watch?v=YexfeByBXlo)
