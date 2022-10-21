---
title: Core Internet Computer Protocol
abstract: 
shareImage: /img/how-it-works/peer-to-peer-p2p.600.jpg
slug: core-ic-protocol-overview
---

The *IC core protocol* is a 4-layer protocol responsible for implementing the blockchain functionality within a subnet. Each node of a subnet runs an implementation of this core protocol. The core protocol has the following layers:
* Peer-to-peer layer
* Consensus layer
* Message routing layer
* Execution layer

We want to first give a very basic intuition on those layers, as illustrated also in the following figure.

![](img/core_protocol_layers.png)
Layers of the IC core protocol

The lower two layers – peer-to-peer and consensus – are responsible for *selecting and ordering messages* to be executed and ensuring that each node has the same view of those messages for a given round. The output of those two layers is a block comprising an ordered list of messages to be executed, and the layers ensure that every node of the subnet has the same block as output in a given round.

The upper two layers ensure *deterministic execution* of the block of messages received from the lower layers on each node. At the beginning of a round, each (honest) node holds the same state. By executing the messages of the block received from consensus in a completely determinstic manner, it is ensured, that the state after executing the messages of the round is the same on each node. By induction, every node makes exactly the same state transition in every round. This makes the subnet a replicated state machine.

In the following four topics, we go deeper into each of the layers of the core IC protocol.
