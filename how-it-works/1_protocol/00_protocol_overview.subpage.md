---
title: Overview
abstract: 
shareImage: /img/how-it-works/peer-to-peer-p2p.600.jpg
slug: core-ic-protocol-overview
---

# Core Internet Computer Protocol – Overview

The *IC core protocol* is a 4-layer protocol responsible for implementing the blockchain functionality within a subnet. Each node of a subnet runs an implementation of this core protocol. The core protocol has the following layers:
1. Peer-to-peer layer
2. Consensus layer
3. Message routing layer
4. Execution layer

A subnet hosts canister smart contracts and executes *messages* sent by users or other smart contracts to them.
Messages are the IC analogon to transactions on other blockchains.
Messages addressed to a canister smart contract are executed by the subnet and can update the replicated canister smart contract state.
This is the core of the blockchain-based replicated state machine functionality realizing the IC.

We want to next give a very basic intuition on those layers, as illustrated in the following figure.

[](/img/how-it-works/core_protocol_layers_annotated.png)
Layers of the IC core protocol

The lower two layers – *peer-to-peer* and *consensus* – are responsible for the *selection and ordering of messages* to be executed and ensuring that each node has the same view of what those messages are in a given round.
The output of this lower part of the protocol stack in a round is a block comprising an ordered list of messages to be executed.
The two layers ensure that every node of the subnet has the same block as output in a given round.
This is exactly the consensus functionality the IC achieves, building on the P2P layer for secure and reliable communication.

The upper two layers ensure *deterministic execution* of the block of messages for a round received from the lower two layers on each node. 
At the beginning of a round, each (honest) node holds the same state, representing the replicated state of the subnet. 
By executing the messages of the block received from consensus in a completely determinstic manner, it is ensured, that the state after executing the messages of the round is the same on each node due to the determinism in execution.
By induction, as every node makes exactly the same state transition in every round and starts a round with the same state, this makes the subnet a *replicated state machine*.

Canister smart contracts on the same or different subnets can communicate with each other by sending messages.
The IC core protocol handles both the inter-canister messages sent locally, i.e., on the same subnet, between canisters, and such sent across subnets.
Local inter-canister messages do not need to go through consensus, while xnet inter-canister messages do, making the further more efficient in terms of throughput and incurring less latency.
