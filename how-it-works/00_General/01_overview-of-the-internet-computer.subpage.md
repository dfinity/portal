---
title: Internet Computer Blockchain Overview
abstract: 
shareImage: /img/how-it-works/overview-of-the-internet-computer.600.jpg
slug: architecture-of-the-internet-computer
---

# Internet Computer Blockchain Overview

The last original Layer 1 blockchain project has launched a revolutionary public network that provides a limitless environment for smart contracts that run at web speed, serve web, scale, and reduce compute costs by a million times or more. Build everything from DeFi, to mass market tokenized social media services that run on-chain, or extend Ethereum dapps.

The technology behind the Internet Computer (IC) has been reconceived from ground up, learning our lessons from earlier projects.
The Internet Computer intends to become the World Computer, an open and secure blockchain-based network that can scale out to power humanity's computation.
The core part of the IC's architecture is its subnet architecture: The IC consists of many subnets, where each subnet is its own blockchain that operates concurrently with all the other subnets.
New subnets can be added to scale the IC out, analogous to how public clouds scale out.
Each subnet hosts smart contracts, called *canister smart contracts*, or simply *canisters*.
Canisters on one subnet can send messages to canisters on the same or other subnet.
The secure asynchronous cross-subnet (xnet) communication between canisters and the resulting loose coupling of subnets is one of the key principles that enable the scalability of the IC by means of adding new subnets.

The IC is governed by a tokenized DAO, the so-called Network Nervous System (NNS).
The NNS is implemented as a set of canister smart contracts that are deployed on a high-replication subnet.
The NNS allows holders of the ICP governance token to make proposals and vote on those proposals.
Accepted proposals are, depending on their type, either automatically executed by the NNS (governance proposals), or define the roadmap that the IC community is working on (motion proposals).

In addition to this platform governance, dApps can be governed by an out-of-the-box deployable governance system, the Service Nervous System (SNS).
Everyone controlling a dApp, can hand over control of their dApp to a tokenized DAO by deploying and parameterizing an instance of the SNS.
The SNS implements advanced governance at the dApp level and can be used without implementing a governance system, which is revolutionary.

The Internet Computer was launched and open-sourced on May 10th 2021 by the DFINITY Foundation.
Since then, it has been growing by new nodes being added and joined to form new subnets.

1. [Internet Computer Source Code](https://github.com/dfinity/ic)
2. [Public Repositories for the Internet Computer](https://github.com/dfinity?q=&type=public&language=&sort=)
3. [The Internet Computer's Source Code is Public](https://medium.com/dfinity/the-internet-computers-source-code-is-public-603a558cb6cc)
4. [A Technical Overview of the Internet Computer](https://medium.com/dfinity/a-technical-overview-of-the-internet-computer-f57c62abc20f)
5. [Internet Computer Interface Specification](https://medium.com/dfinity/introducing-the-internet-computer-interface-specification-850a113a66d9)
6. [Internet Computer Interface Specification Docs](https://internetcomputer.org/docs/ic-interface-spec.md)
7. [Internet Computer Rust Docs](https://docs.dfinity.org/ic/rustdocs/)
8. [Internet Computer Haskell Utility Code](https://github.com/dfinity/ic-hs)
9. [Internet Computer Primer - Deck](https://dfinity.org/deck/)
10. [Internet Computer Canister SDK](https://github.com/dfinity/sdk)
11. [Internet Computer Open Source Rosetta API](https://github.com/dfinity/rosetta-node)
12. [Internet Computer for Geeks – White Paper](https://dfinity.org/whitepaper.pdf)

[![Watch youtube video](https://i.ytimg.com/vi/YWHTNr8RZHg/maxresdefault.jpg)](https://www.youtube.com/watch?v=YWHTNr8RZHg)
