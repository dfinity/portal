---
title: Architecture of the Internet Computer
---

![](/img/how-it-works/subnet_architecture.png)

# Architecture of the Internet Computer

The Internet Computer (IC) realizes the vision of a *World Computer* – an open and secure blockchain-based network that hosts programs and data in the form of smart contracts and scales to unbounded capacity.
To achieve this, blockchain technology – the foundation of the IC – had to be reconceived from ground up, building on many lessons learned from earlier blockchain architectures.

The Internet Computer hosts smart contracts in the format of *canisters*, each consisting of a [*WebAssembly (Wasm)*](https://en.wikipedia.org/wiki/WebAssembly) bytecode module and data storage.
Canisters execute concurrently and can call each other via an asynchronous inter-canister messenging protocol. They have access to advanced functionality including secure randomness, ECDSA signatures, or HTTPS outcalls, and can serve web content directly into the browser.
Canisters can be immutable, but also controlled by an individual developer or a Decentralized Autonomous Organization (DAO).

The *Internet Computer Protocol (ICP)* is based on a high-throughput, low-latency consensus mechanism and an efficient virtual machine for WebAssembly execution.
The central innovation of ICP is [*chain-key cryptography*](https://internetcomputer.org/how-it-works/#Chain-key-cryptography), a suite of advanced cryptographic protocols based on [threshold cryptography](https://en.wikipedia.org/wiki/Threshold_cryptosystem) that enables the decentralized operation of the IC with unprecedented scalability.
The Internet Computer also implements [*chain-key transactions*](https://internetcomputer.org/how-it-works/#Chain-key-transactions), which enable a canister to interact with (write to) other blockchains using threshold cryptography.
ICP also includes a sophisticated collection of technologies for robustly and securely addressing operational concerns, such as how to deal with faulty nodes or protocol upgrades, which we call [*chain-evolution technology*](https://internetcomputer.org/how-it-works/#Chain-evolution-technology).

The Internet Computer scales its capacity horizontally using *subnets*.
Each subnet is an independent blockchain, running on *node machines* deployed in globally-distributed data centers.
A single subnet can securely host tens of thousands of canister smart contracts, totalling in hundreds of gigabytes of memory – there are currently dozens of subnets, growing to thousands in the future.
For each canister hosted on a subnet, its code and data is stored on every node in the subnet, and its code is executed by every node in the subnet.
This replication of storage and computation is essential to achieve *fault tolerance*, so that canister smart contracts will continue to execute even if some nodes in the subnet are faulty (either because they crash, or even worse, are hacked by a malicious party).
The IC's multi-subnet architecture is much more powerful than the well-known sharding approach because it enables smart contracts on different subnets to communicate with each other seamlessly – much like services in a traditional [microservices architecture]( https://en.wikipedia.org/wiki/Microservices), but fully on chain.
This novel approach allows for scaling out the IC by simply adding more subnets.

The Internet Computer is controlled through a *tokenized Decentralized Autonomous Organization (DAO)*, which is called the [*Network Nervous System (NNS)*](https://internetcomputer.org/how-it-works/#Network-nervous-system).
The NNS determines the topology of the IC, admits or removes nodes, and controls system canisters such as [Internet Identity](https://internetcomputer.org/how-it-works/#Internet-Identity) or the NNS front-end dApp.
The NNS has also upgraded the Internet Computer Protocol running on all nodes of the IC more than 100 times since launch.
Each individual dApp on the IC can have its own governance system similar to the NNS by customizing and deploying an out-of-the-box tokenized DAO based on the *Service Nervous System (SNS)* for the dApp.

The [Internet Computer](https://dashboard.internetcomputer.org/) was launched and open-sourced on May 10th 2021 by the DFINITY Foundation, and has ever since been controlled by the NNS.

[Go deeper into the architecture](/how-it-works/architecture-of-the-internet-computer/)
