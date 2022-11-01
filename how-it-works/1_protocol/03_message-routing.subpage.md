---
title: Message Routing
abstract: 
shareImage: /img/how-it-works/message-routing.600.jpg
slug: message-routing
---

# Message Routing

The Internet Computer blockchain enables users to send messages to canister smart contracts and canisters to send messages between themselves. For scalability, the Internet Computer is composed of many subnet blockchains and the Internet Computer's Network Nervous System can add new subnets as required. The message routing component routes messages to and from canisters across all of the Internet Computer's subnet blockchains and ensures that new subnets can be added seamlessly.

Message routing is the lower of the two upper layers of the protocol stack.
It implements multiple functionalities crucial for the operation of the IC, some of them hinted at by the layer's name.
The functionality groups of message routing are the following:
* Routing of inter-canister messages within and between subnets (from this functionality, the name of the layer is derived);
* Induction of messages received in blocks from consensus;
* Invocation of the execution layer;
* Certification of the state of the subnet;
* Synchronization of the state of the subnet.

Note that, although the layer derives its name from the functionality of routing messages, all the functionalities in this group are equally important for the functioning of the IC.
Particularly, the functionalities of state certification and synchronization are used for chain-evolution functionality such as resumption of nodes.

## Message Processing

Whenever consensus produces a finalized block of messages, that is, a block that has been considered correct (notarized) and finalized by at least two thirds of the subnet's nodes, this block is handed over to message routing.
This marks exactly the transition between the lower and upper half of the protocol stack: The lower two layers are responsible for agreeing, in each round, among all nodes in the subnet on a block of messages to be executed.
On every node, this block, once found (i.e., proposed, notarized, and finalized), is handed over to the implementation of the message routing layer on this node.

Once message routing receives a block of messages – recall that a block comprises both ingress messages submitted by users and XNet messages sent by canisters on other subnets, the messages are extracted from the block and each message is placed into the input queue of its target canister.
This process is called *induction* and all the queues are collectively referred to as *induction pool*.
After induction, the execution layer--the topmost layer of the core IC protocol stack--is triggered to deterministically *schedule* messages in the induction pool for execution and executing them.
The actual execution of messaging happens inside a sandbox, which can be thought of as a virtual machine responsible for the execution of canister messages.
Message routing and execution modify the subnet state in a deterministic way, i.e., the state of the node is changed in the same way on every (honest) node of the subnet, which is crucial for achieving the replicated state machine properties of a subnet.
The execution of a message can write to memory pages of the canister the message is executed on.
Changed memory pages are tracked and at every checkpoint interval certified by the subnet as explained below.
The execution of a message can lead to the creation of new messages targeted at other canisters.
Such a message can be either targeted at a canister on the local subnet or another subnet.
In the former case, execution can directly place the new message into the input of the target canister.
In the latter case, i.e., a new message that is targeted at another subnet, the message is placed into the so-called XNet streams for the target subnet where they can be picked up by block makers of the target subnets after the streams are certified.

## Inter-Canister Messaging

As mentioned above, the execution of a canister message can lead to the creation of a new inter-canister message sent to a local or remote (on a different subnet) canister.
Let us go deeper into how inter-canister messaging works.

### Intra-Subnet Inter-Canister Messaging

Intra-subnet, i.e., local inter-messages originating from an executing canister method do not need to go through consensus as they deterministically result from messages that have been agreed by a previous consensus round and their further execution remains completely deterministic.
This holds transitively, that is, inter-canister messages can create new inter-canister messages, resulting in a tree of messages.
Local message invocations can be executed as long as the cycles limit for the round has not yet been exhausted.
It is important to note that this local inter-canister messaging is *not synchronous* message invocation as you might be used from EVM-based blockchains.
Rather, local messages are put into the input queue of the target canister and are scheduled for execution asynchronously.
This is the standard inter-canister messaging semantics known for the Internet Computer.

### Inter-Subnet Inter-Canister Messaging

Remote inter-canister messages, that is, such sent to canisters on other subnets, are handled differently.
A remote message is placed into the outgoing *subnet stream* for the target subnet. This routing happens at the end of the deterministic execution cycle, i.e., after execution hands back control to message routing.
The XNet messages in the stream are certified (signed) using a Merkle-tree-style data representation, at the end of the round by the subnet using BLS threshold cryptography as part of the per-round state certification.
That is, every message in the outgoing stream is certified by the originating subnet.
Replicas on the receiving subnet obtain the XNet message during block making (part of consensus), validate the threshold signature, and include a valid XNet message in a consensus block.
Thanks to using a Merkle-tree-like XNet stream, parts of the stream can be consumed in a round by the receiving subnets and signatures can still be validated.

## State Certification

The replicated state of a subnet comprises all the relevant information required for the operation of the subnet:
* Items certified per round:
  * Responses to ingress messages
  * Xnet messages to be sent to other subnets
  * Canister metadata (module hashes, *certified variables*)
* Items certified per checkpoint:
  * All canister Wasm bytecode
  * All canister state (heap and stable memory)

The message routing layer performs a certification of parts of the replicated state after each round (the first three items above) and certification of the full replicated state (including also the remaining two items above) at every checkpoint, which is typically every multiple-hundred rounds.
Certification is always done using BLS threshold signatures computed collectively by the subnet, thus certifications are computed by the subnet as a whole in a decentralized manner. The properties of the threshold signature guarantee that such a certification can only exist if the subnet still agrees on the state.

### Per-Round Certification

At the end of a round, i.e., when all messages have been executed or the cycles limit for the round has been reached (to ensure rounds cannot take arbitrarily long), the message routing layer performs a certification of parts of the replicated state.
A BLS threshold signature is computed to certify the part of the state tree containing
* Responses to ingress messages,
* Xnet messages to be sent to other subnets, and
* Canister metadata (module hashes, *certified variables*).

The responses to ingress messages are referred to as ingress history.
The certified responses can be read and validated against the subnet's public key by users as the response to their ingress messages.
This way of validating responses to state-changing messages to a blockchain is extremely powerful when compared to other approaches seen in the field like reading the response from a transaction log.

This per-round state certification ensures that any item of data relevant for interactions of users and subnets and between different subnets on the Internet Computer is authenticated.
This particularly enables secure and verifiable inter-subnet communication, a crucial feature of the Internet Computer as well as an enabler of its scalability.

### Per-Checkpoint Certification

Wasm code changed through canister updates and written-to ("dirty") memory pages of canisters are not certified in every round, but flagged as modified by the execution layer whenever they are written, using approaches known from operating system kernels.
At every checkpointing interval, that is, every multiple hundred rounds, which corresponds to around 10 minutes, the subnet computes a so-called checkpoint at which the state of a subnet is written to disk and certified. This allows newly joining and fallen behind nodes to join in without re-executing all blocks. 
The state certification is done incrementally by incorporating the changes since the last checkpoint certification into the so called manifest of the previous checkpoint. The manifest can abstractly be viewed as a relatively flat Merkle tree and the incremental computation can be achieved by updating the leafs that changed and propagating changes up the tree.
Finally, the root hash of the manifest is signed with a BLS threshold signature by the subnet, thereby certifying the entire contents of the manifest.
The signed result is called a *catch-up package* as it can be used by nodes to efficiently catch up to the point in time when the checkpoint was made. (Note that a catch-up package also contains other things required to resume, which are omitted here for the sake of simplicity).
Technically, the overall state is partitioned into chunks and the catch-up package contained an authenticated hash of each of the chunks.
The run time of this certification operation is linear in the number of changes and not the overall state size on the subnet.
This is crucial as a subnet can hold terabytes of state in the future and a full recertification of multiple terabytes of replicated state would not be practical at every checkpoint interval.

## State Synchronization

The message routing layer implements another feature quite unique to the Internet Computer.
As described above, every checkpointing interval, i.e., around every 10 minutes, the complete subnet state is certified by the subnet through a BLS threshold signature on a Merkle-tree-like structure--the manifest--and made available as part of a catch-up package.
As the name already suggests, a catch-up package allows a node to catch-up if it has fallen behind, e.g., because it was down for some time. In addition, it allows new nodes to join, e.g., if the subnet is to grow in size or a node needs to be replaced because of having been destroyed in a disaster.
Such a node can download the latest catch-up package and validate its signature with the public subnet key.
Once verified, the new node can download the state corresponding to the checkpoint.
The downloading of the state requires the transfer or large amounts (gigabytes to terabytes) of data from the nodes's peers.
This is done efficiently and in parallel from all peers, by using a protocol that chunks the state and allows for different chunks to be downloaded from different peers. 
Technically, the artifact transfer protocol of the P2P layer is used for transferring the state.
Every chunk is authenticated through the catch-up package individually through its hash. Note that the tree like structure of the manifest allows the verify each of these chunks individually relative to the root hash in the catch-up package.
The chunking protocol is not dissimilar to the approach that Bittorrent used for downloading large files from many peers.

If a node is not newly added, but only had a downtime and needs to catch up, it may still have an older checkpoint.
In this case, only the chunks different to the local checkpoint need to be downloaded, which can significantly reduce the to-be-transferred volume.
The catch-up package allows for determining for each state chunk whether it is available in the old snapshot and can be copied over locally from there or whether it needs to be obtained from the subnet peers.

Once the full state corresponding to the checkpoint has been authentically downloaded, the node catches up to the current block height by processing all the blocks that have been generated in the subnet since the checkpoint and "replaying" them, i.e., executing them as it would in the normal node operation to successively make state transitions of its local state to finally reach that of the subnet.
Thanks to the downloaded checkpoint, only few (e.g., some hundred) blocks need to be replayed, not every block from the start of the blockchain as is the case in other blockchains.
The possibility of a new node starting with the state in a checkpoint realistically allows for any form of efficient node joining in the subnet.

A node joining a subnet would practically not be possible if the node would need to replay all blocks from the very first block ever created on the subnet, which is the standard architecture in other blockchains.
The reasoning here is that the IC is intended to replace public cloud, i.e., is intended to have a high throughput of operations per time unit, much like real-world cloud servers running their applications.
Consider a subnet that has been running for multiple years with high CPU utilization.
It is in this case completely infeasible for a newly joining node to catch up with the subnet when trying to replay all blocks starting with the genesis block of the subnet as it is multiple years behind and all nodes progress as fast the node tries to catch up.
To resolve this, the IC supports nodes joining a subnet by downloading and verifying the state from a checkpoint using a catch-up package and replaying only the transactions since then, which are in the hundreds, and not hundreds of millions.
Thus, state synchronization using catch-up packages is a necessary feature for a blockchain that wants to operate successfully under real-world conditions where nodes do fail and need replacement.

[![Watch youtube video](https://img.youtube.com/vi/YexfeByBXlo/0.jpg)](https://www.youtube.com/watch?v=YexfeByBXlo)
