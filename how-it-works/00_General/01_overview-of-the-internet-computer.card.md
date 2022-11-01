---
title: Architecture of the Internet Computer
---

![](/img/how-it-works/subnet_architecture.png)

# Architecture of the Internet Computer

The Internet Computer (IC) realizes the vision of a World Computer – an open and secure blockchain-based network that can host programs and data in the form of smart contracts, perform computations on smart contracts in a secure and trustworthy way, and scale indefinitely.
To achieve this, blockchain technology – the foundation of the IC – had to be reconceived from ground up, building on many lessons learned from earlier blockchain projects.

Anyone can deploy a canister smart contract, or just canister, on the Internet Computer.
A canister bundles Wasm program code and memory pages into a single unit.
Canister smart contracts are executed in a replicated, fault-tolerant manner on many machines and can change the state of memory of the canister.

At a high level, the IC's architecture builds on *subnets*, or *subnetworks*: The IC as a whole consists of many subnets, where each subnet is its own blockchain that operates concurrently with and independently of the other subnets.
A subnet is a blockchain-based *replicated state machine*, that is, a virtual machine that holds state in a secure and non-tamperable manner.
Each subnet hosts smart contracts, called *canister smart contracts*, or just *canisters*.
New subnets can be created from nodes added to the IC to scale out the system, analogous to how traditional architectures such as public clouds scale out by adding machines.
Such a scale-out architecture is unique in the blockchain space and allows for limitless scaling, i.e., combining the security and resiliency properties of blockchains with the scalability properties known from the public cloud.

A canister smart contract can send messages to canisters on the same or different subnets, thereby realizing interactions between canister smart contracts.
The secure *asynchronous cross-subnet (xnet) communication* between canisters and the resulting loose coupling of subnets is one of the key principles that unlock the scalability of the IC by means of adding new subnets.
The asynchronous communication between canister smart contracts is also a major difference to most other blockchains in terms of the programming model.

Each subnet is powered by the *core IC protocol* executed by the nodes of the subnet.
Besides this core protocol, there is much more that is needed to build and run the Internet Computer:
The *chain-evolution* parts of the IC protocol enable the long-term operation of the system, e.g., by allowing new nodes to securely and efficiently join a subnet or faulty nodes to securely be replaced.
The IC protocol relies heavily on *chain-key cryptography*, a toolbox of advanced cryptographic mechanisms that power the Internet Computer.
Governance of the IC is accomplished through a *tokenized Decentralized Autonomous Organization (DAO)*, the *Network Nervous System (NNS)*.
Each individual dApp on the IC can receive its own governance system similar to the NNS by deploying and customizing a *Service Nervous System (SNS)* for the dApp – without any programming by the dApp developers, but only SNS customization.

The Internet Computer was launched and open-sourced on May 10th 2021 by the DFINITY Foundation.
Since then, it has been growing substantially by receiving new nodes and new subnets being created from those nodes.

You can learn more about how the Internet Computer works and realizes the vision of a World Computer in the remainder of this page.

[Go deeper into the architecture](/how-it-works/architecture-of-the-internet-computer/)
