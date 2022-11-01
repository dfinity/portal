---
title: Architecture of the Internet Computer
abstract: 
shareImage: /img/how-it-works/overview-of-the-internet-computer.600.jpg
slug: architecture-of-the-internet-computer
---

# Architecture of the Internet Computer

The technology behind the Internet Computer (IC) has been reconceived from ground up, learning lessons from the weaknesses of earlier projects, e.g., the lack of scalability.
The Internet Computer intends to become the World Computer, an open and secure blockchain-based network that can scale out to power humanity's computation.

## Subnet Architecture

The core part of the IC's architecture is its subnet architecture: The IC consists of many subnets, where each subnet is its own blockchain that operates concurrently with all the other subnets.
New subnets can be added to scale the IC out, analogous to how public clouds scale out.
Each subnet hosts smart contracts, called *canister smart contracts*, or simply *canisters*.
Canisters on one subnet can send messages to canisters on the same or other subnet.
The secure asynchronous cross-subnet (xnet) communication between canisters and the resulting loose coupling of subnets is one of the key principles that enable the scalability of the IC by means of adding new subnets.

<figure>
<img src="/img/how-it-works/subnet_architecture.png" alt="Architecture: The IC is composed of subnets, each of which is an independent blockchain" title="The IC is composed of subnets, each of which is an independent blockchain" align="center" style="width:600px">
<figcaption align="center">
The IC is composed of subnets, each of which is an independent blockchain.<br>
Canisters within and across subnets communicate through asynchronous messaging.
</figcaption>
</figure>

## Canister Smart Contracts

Each subnet can host tens of thousands of *canister smart contracs* or simply *canisters*.
A canister smart contract is a bundle comprising the smart contract Wasm bytecode and its storage.
Canister smart contracts can be updated by their maintainer, which can be a single developer, a groups of developers, or a decentralized autonomous organization (DAO).
For reasons of decentralization, it is best if a canister smart contract be maintained by a DAO in the long run.

Canisters pay for the IC resources they consume in *cycles*.
To this end, canisters need to be topped up with cycles by their maintainer or anyone else who has an interest in the canister running.
Cycles can be acquired with the ICP token, the IC's utility token.
One Trillion cycles can be acquired with ICP worth 1 XDR, where an XDR is a basket comprising major currencies and one XDR is roughly 1.3 USD as of Q3 2022.

Canisters can hold gigabytes of memory for a low fee.
They can serve the user interface of a dApp directly to a web browser, unlike the UI being served from public cloud as is the case in other blockchains.
Canisters can be updated and evolve, much like regular software.
DAO-based governance can make such upgrade process secure and decentralized.
Using Internet Identity, canisters can authenticate users based on biometry using the WebAuthn protocol.

## Core Internet Computer Protocol

Each subnet of the IC is driven by the core Internet Computer protocol (core IC protocol) an implementation of which is running on every node.
This protocol consists of the following four layers: (1) The peer-to-peer, (2) consensus, (3) message routing, and (4) execution layer.
This core IC protocol stack is running on all nodes of any subnet and drives the subnet to make progress in terms of consensus and message execution.
Each subnet of the IC thereby is its own replicated state machine that makes progress independently of the other subnets of the IC.

## Chain-Key Cryptography

Many parts of the protocol of the IC depend on *chain-key cryptography*, also referred to as chain-key technology.
Chain-key cryptography is the collection of cryptographic mechanisms that enable the Internet Computer Protocol.

One important mechanism in this toolbox is non-interactive distributed key generation (NIDKG) for BLS signature keys.
NIDKG is one of the most involved technical components of the IC and allows for the secure and trusteless setup of the signing key of a new subnet.
A private key secret-shared with NIDKG is re-shared periodically so that compromised key shares become worthless and adaptive attacks become harder.
BLS threshold signatures are another important tool in this toolbox and are used, for example, to certify the state of a subnet and to create unpredictable and unbiasable random numbers.

Another new mechanism in the toolbox are threshold ECDSA signatures and their interactive distributed key generation protocol.
Threshold ECDSA allows canister smart contracts to request signatures, which are then computed jointly by a subnet, based on a secret-shared key that no single party knows.

## Chain-Evolution Technology

Chain-evolution technology refers to specific mechanims that enable the IC to operate in the long term.
To this end, chain-evolution technology enables new nodes to join a subnet or nodes that have been down to catch up with the remaining part of the subnet.
All this can be done efficiently, without a node needing to replay all messages from the start of its subnet.

## Ingress Messages

When a user sends a message to a canister from outside the IC, this message goes through the core IC protocol stack until it gets executed.
Successful execution can change the state of the subnet and results in the generation of a response that is stored in a certified part of replicated state.
The response can be retrieved by the user's client and verified for authenticity.
This allows users to obtain certified answers to canister messages almost instantly.
Getting an alomst-instant certified response to a request is a feature that sets apart the IC from other blockchain projects.

## Governance

Governance is an aspect of blockchain decentralization that gets increasing attention.
The IC offers governance at multiple levels.

### Platform Governance

The IC is governed by a *tokenized DAO*, the so-called *Network Nervous System (NNS)*.
The NNS is implemented as a set of canister smart contracts that are deployed on a high-replication subnet, i.e., a subnet with many nodes and the stronger security properties derived from that.
The NNS allows holders of the ICP governance token to make proposals and vote on those proposals.
Accepted proposals are, depending on their type, either automatically executed by the NNS (governance proposals), or define the roadmap that the IC community is working on (motion proposals).

### DApp Governance

In addition to this DAO-based platform governance, dApps can be governed by an out-of-the-box deployable governance system, the *Service Nervous System (SNS)*, which is similar to the NNS, but tailored to governing dApps.
Everyone controlling a dApp, can hand over control of their dApp to a tokenized DAO by deploying and parameterizing an instance of the SNS.
The SNS implements advanced governance at the dApp level and can be used without implementing a governance system, which is revolutionary.
Handing over control of a dApp to an instance of the SNS usually includes running a decentralization sale where funds can be raised through the sale of the dApp's governance tokens.

Canister smart contracts are more powerful than the smart contracts on other blockchains.
For example, a web browser can directly interact with a canister smart contract, without involving any public cloud for serving the web interface and assets.
Also, canisters can use gigabytes of storage for a low cost.

The Internet Computer was launched on May 10th 2021 by the DFINITY Foundation.
Since then, it has been growing by new nodes being added and joined to form new subnets.

## Go Even Deeper

If you want to learn in more detail how the IC works and realizes the vision of a World Computer, read through the whole page and the referenced Medium articles, or watch the YouTube videos.
If you prefer to have a single source of information, the [White Paper](https://dfinity.org/whitepaper.pdf) is highly recommended, however, note that is is a little technical at times.

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
