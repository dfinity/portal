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
This is exactly the transition between the lower two layers and upper two layers of the protocol stack: The lower two layers are responsible for agreeing among all nodes in the subnet in each round on a block of messages to be executed.
On every node, this block, once found (i.e., proposed, notarized, and finalized) is handed over to the implementation of the message routing layer on this node.

Once message routing receives a block of messages – recall that a block comprises both ingress messages submitted by users and xnet messages sent by canisters on other subnets, the messages are extracted from the block, each message is placed into the input queue of its target canister.
This process is called *induction* and the queues are collectively referred to as *induction pool*.
Message routing implements a *scheduler* that schedules messages in the induction pool for execution and invokes the execution of to-be-scheduled messages. At this point, control is handed over to the *execution layer*, a virtual machine responsible for execution of canister messages.
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

The message routing layer performs a certification of parts of the replicated state after each round and certification of the full replicated state every so-called DKG interval, which is typically set to be multiple-hundred rounds.
Certification is always done using BLS threshold signatures computed collectively by the subnet, thus certifications are by the subnet, and not individual nodes.

### Per-Round Certification

At the end of the round, i.e., when all messages have been executed or the cycles limit for the round has been reached (to ensure rounds cannot take arbitrarily long), the message routing layer performs a certification of parts of the replicated state.
A BLS threshold signature is computed to certify the following parts:
* Xnet messages in queues to other subnets as outlined above to allow a receiving subnet to validate the authenticity of xnet messages.
* Ingress history, containing the responses of executed ingress messages so that users can verify the responses.

### Periodic Certification

Updated (dirty) memory pages are not certified in every round, but tracked in a tree data structure whenever they are written.
Every DKG interval (FIX: reference), that is, every multiple hundred rounds (configurable), the complete state of a subnet becomes recertified.
This is done through a Merkle tree data structure that tracks the dirty memory pages.
The state certification is done incrementally only on changed memory pages by hashing the content of all pages changed since the last certification, thus its runtime depends on the number of dirty pages in the DKG interval.
The Merkle tree data structure makes this operation efficient and incremental.
A full recertification of terabytes of replicated state would not be practical every 10 minutes.

The above-described state certification ensures that any item of data is authenticated, be it data within the subnet or such communicated to other subnets.
This particularly enables secure and verifiable inter-subnet communication, a crucial feature of the Internet Computer and enabler of its scalability.

[![Watch youtube video](https://img.youtube.com/vi/YexfeByBXlo/0.jpg)](https://www.youtube.com/watch?v=YexfeByBXlo)

