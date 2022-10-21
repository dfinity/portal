---
title: Architecture of the Internet Computer
---

![](img/subnet_architecture.png)

# Architecture of the Internet Computer

The technology behind the Internet Computer (IC) has been reconceived from ground up, learning our lessons from earlier projects.
The Internet Computer intends to become the World Computer, an open and secure blockchain-based network that can scale out to power humanity's computation.
The core part of the IC's architecture is its subnet architecture: The IC consists of many subnets, where each subnet is its own blockchain that operates concurrently with all the other subnets.
New subnets can be added to scale the IC out, analogous to how public clouds scale out.
Each subnet hosts smart contracts, called *canister smart contracts*, or simply *canisters*.
Canisters on one subnet can send messages to canisters on the same or other subnet.
The secure asynchronous cross-subnet (xnet) communication between canisters and the resulting loose coupling of subnets is one of the key principles that enable the scalability of the IC by means of adding new subnets.

The Internet Computer was launched and open-sourced on May 10th 2021 by the DFINITY Foundation.
Since then, it has been growing by new nodes being added and joined to form new subnets.

[Go deeper](/how-it-works/architecture-of-the-internet-computer/)
