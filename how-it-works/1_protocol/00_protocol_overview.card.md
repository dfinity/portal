---
title: Overview
---

![](/img/how-it-works/core_protocol_layers.png)

# Overview

The Internet Computer is powered by the Internet Computer Protocol (ICP, IC Protocol), from which its utility token, the ICP token, derives its name.
The core part of the IC protocol, the *core IC protocol*, is a 4-layer protocol that is running on the nodes of each subnet.
By running the core IC protocol, the nodes of a subnet realize a blockchain-based replicated state machine that makes progress independently of the other subnets, each subnet's nodes running an instance of the same IC core protocol.
This architecture of many concurrently-operating subnets enables the IC to scale practically without limits.
Subnets process *messages*, corresponding to transactions in other blockchains, submitted by users or created by smart contracts.

The core IC protocol comprises the following four layers, from bottom to top: (1) Peer-to-peer (P2P), (2) Consensus, (3) Message routing, and (4) Execution.
The lower two layers, P2P and consensus, together implement a *selection and ordering* of incoming messages and provide messages to the upper two layers in the form of a blocks.
The upper two layers, message routing and execution, receive blocks containing ordered messages from the lower part of the stack and execute them in a completely deterministic manner on every node of the subnet.
This realizes a replicated state machine, where every node transitions from the same starting state to the same ending state in every round.
The core IC protocol heavily relies on *chain-key cryptography*, explained further below, for its operation.

Besides the core IC protocol, additional protocol components facilitate the long-term operation of the IC, such as allowing new nodes to securely join a subnet.

In the following four tiles of this section, we go deeper into each of the layers of the core IC protocol.

[Go deeper](/how-it-works/core-ic-protocol-overview/)
