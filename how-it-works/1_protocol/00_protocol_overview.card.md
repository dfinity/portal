---
title: The Core IC Protocol
---

![](/img/how-it-works/peer-to-peer-p2p.600x300.jpg)

The Internet Computer is powered by the Internet Computer Protocol (ICP), from which its ICP utility token derives its name.
The core part of this protocol is a 4-layer protocol that is running on the nodes of each subnet.
By running the core IC protocol, a subnet becomes a blockchain-based replicated state machine that makes progress independently of the other subnets, each running an instance of the same protocol.
The architecture of many concurrently-operating subnets enables the IC to scale practically without limits.

The core IC protocol is built up from four layers, from bottom to top: (1) Peer-to-peer (P2P), (2) Consensus, (3) Message routing, and (4) Execution.
The lower two layers, P2P and consensus, together implement a selection and ordering of incoming messages and provide messages to the upper two layers in the form of a blocks.
The upper two layers, message rounting and execution, receive blocks containing ordered messages from the lower part of the stack and execute them in a completely deterministic manner on every node of the subnet.
This realizes a replicated state machine, where every node transitions from the same starting state to the same ending state in every round.

[Go deeper](/how-it-works/core-ic-protocol-overview/)
