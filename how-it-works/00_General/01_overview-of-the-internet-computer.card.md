---
title: Architecture of the Internet Computer
---

![](/img/how-it-works/subnet_architecture.png)

# Architecture of the Internet Computer

The Internet Computer (IC) realizes the vision of a *World Computer* – an open and secure *blockchain-based network* that can host programs and data in the form of smart contracts, perform computations on smart contracts in a secure and trustworthy way, and scale infinitely.
To achieve this, blockchain technology – the foundation of the IC – had to be reconceived from ground up, building on many lessons learnt from earlier blockchain projects.

Smart contracts on the Internet Computer are called *canister smart contracts*, or *canisters*, each consisting of a bundle of [*WebAssembly (Wasm)*](https://en.wikipedia.org/wiki/WebAssembly) bytecode and smart contract data storage.
Each canister has its own, isolated, data storage that is only changed when the canister executes code.

Canisters are hosted on *subnets*, the top-level architectural building block of the IC.
A subnet is an independent blockchain, running on *node machines*, or *nodes*, deployed in globally-distributed data centers.
A single subnet can securely host tens of thousands of canister smart contracts, totalling in hundreds of gigabytes of memory – there are currently dozens of subnets, growing to thousands in the future.
For each canister hosted on a subnet, its code and data is stored on every node in the subnet, and its code is executed by every node in the subnet.
This replication of storage and computation is essential to achieve *fault tolerance*, so that canister smart contracts will continue to execute even if some nodes in the subnet are faulty (either because they crash, or even worse, are hacked by a malicious party).
This replication is powered by the core *Internet Computer Protocol (ICP)*, which implements a high-throughput, low-latency consensus mechanism and an efficient virtual machine for WebAssembly execution, backed by a blockchain.

The IC's multi-subnet architecture is much more powerful than the well-known sharding approach because it enables smart contracts on different subnets to communicate with each other seamlessly – much like services in a traditional [microservices architecture]( https://en.wikipedia.org/wiki/Microservices), but fully on chain.
Canisters communicate via *asynchronous messages*, i.e., they don't block on sending a message, but process the response when it eventually arrives. 
This novel approach to inter-canister calls allows for scaling out the IC by simply adding more subnets.

The core ICP makes heavy use of [*chain-key cryptography*](https://internetcomputer.org/how-it-works/#Chain-key-cryptography), a toolbox of advanced cryptographic protocols (based on [threshold cryptography](https://en.wikipedia.org/wiki/Threshold_cryptosystem)) that enables the decentralized operation of the IC with unprecedented scalability.
Chain-key cryptography also includes a sophisticated collection of technologies for robustly and securely maintaining the IC over time, which we call *chain-evolution technology* 
(for example, enabling nodes to easily join a subnet without validating every block beginning from the genesis block, as in other blockchains).
Another building block in the chain-key crypto toolbox are [*chain-key transactions*](https://internetcomputer.org/how-it-works/#Chain-key-transactions).
They enable a canister to interact with (write to) other blockchains using threshold cryptography.

Having scalable and decentralized technology to power the operation of the network is not enough.
In order to meet the requirements of complete decentralization, the IC needs a fully decentralized approach to governance.
Governance of the IC platform and its R&D roadmap is accomplished through a *tokenized Decentralized Autonomous Organization (DAO)*, which is called the *Network Nervous System (NNS)*.
Each individual dApp on the IC can have its own governance system similar to the NNS by customizing and deploying an out-of-the-box tokenized DAO based on the *Service Nervous System (SNS)* for the dApp.

Learn more about how the Internet Computer works and realizes the vision of a World Computer!

The [Internet Computer](https://dashboard.internetcomputer.org/) was launched and open-sourced on May 10th 2021 by the DFINITY Foundation.

[Go deeper into the architecture](/how-it-works/architecture-of-the-internet-computer/)
