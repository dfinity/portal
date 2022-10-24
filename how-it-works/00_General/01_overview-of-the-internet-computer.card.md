---
title: Architecture of the Internet Computer
---

![](/img/subnet_architecture.png)

# Architecture of the Internet Computer

The Internet Computer implements the vision of a World Computer –  an open and secure blockchain-based network that can host all of humanity's computations in a secure and trustworthy way.
To that end, the technology behind the Internet Computer (IC) had to be reconceived from ground up, learning many lessons from earlier projects that failed to create the World Computer.
At a high level, the IC's architecture build on *subnets*, or subnetworks: The IC as a whole consists of many subnets, where each subnet is its own blockchain that operates concurrently with and independently of the other subnets.
New subnets can be created from nodes added to the IC to scale out the system, analogous to how traditional architectures such as public clouds scale out.
Such a scale-out architecture is unique in the blockchain space and allows for limitless scaling.
Each subnet hosts smart contracts, called *canister smart contracts*, or simply *canisters*.
A canister can send messages to canisters on the same or different subnets, thereby realizing interactions between canister smart contracts.
The secure asynchronous cross-subnet (xnet) communication between canisters and the resulting loose coupling of subnets is one of the key principles that unlock the scalability of the IC by means of adding new subnets.

Each subnet is powered by the *core IC protocol* executed by the nodes of the subnet.
Besides this core protocol, the *chain-evolution* parts of the protocol enable the long-term functioning of the system, e.g., by allowing new nodes to securely join a subnet or faulty nodes to securely be replaced.
The IC protocol relies heavily on *chain-key cryptography, a toolbox of advanced cryptographic mechanisms that power the Internet Computer.
Governance of the IC is accomplished through a tokenized DAO, the Network Nervous System (NNS).
Each individual dApp on the IC can receive its own governance similar to the NNS by deploying and customizing a Service Nervous System for the dApp – without any programming.

You can learn more about all the above in the following sections of this page.

The Internet Computer was launched and open-sourced on May 10th 2021 by the DFINITY Foundation.
Since then, it has been growing by new nodes being added and joined to form new subnets.

[Go deeper](/how-it-works/architecture-of-the-internet-computer/)
