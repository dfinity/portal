# 0.1: Overview of the Internet Computer

## Overview

The **Internet Computer (IC)** is a secure and transparent blockchain-based network that can be used to host data and programs. Programs and their data hosted on the IC are referred to as **decentralized applications**, often abbreviated to **dapps**.

Dapps are created by the development and deployment of **smart contracts**, which are known as **canisters** on the IC. Each canister is hosted on an independent blockchain network running on **nodes** called a **subnet**.

We'll dive into these terms a bit further in the next section, [Internet Computer terminology](02-ic-terms.md).

In order to understand how to develop dapps on the IC, first let's take a look at the architecture of the IC and how it functions.

## The Internet Computer Protocol

At the core of the Internet Computer is the Internet Computer Protocol (ICP). The ICP is a 4-layer technology stack that runs on the nodes of each subnet. Through the implementation of this 4-layer stack, each subnet is capable of creating a blockchain-based **replicated state machine** which is able to operate independently of other subnets while communicating asynchronously with them. Each subnet processes **messages**, which are received from end-users or other subnets.

### Protocol stack

The ICP is comprised of four layers:

1. Peer-to-peer.
2. Consensus.
3. Message routing.
4. Execution.

Together, the peer-to-peer and consensus layers select and order incoming messages, then provide them to the upper two layers in the form of **blocks**. When the message routing and execution layers receive those blocks that contain ordered messages, they can execute them in a completely deterministic manner across every node on the subnet. This demonstrates a **round** of message execution, and showcases the implementation of the replicated state machine, where every node within the subnet transitions from the same starting state to the same ending state in each round of message execution.

#### Peer-to-peer

In the ICP technology stack, the first layer is the peer-to-peer layer. This layer is responsible for the communication between the nodes within a subnet, and facilitates a reliable and secure channel to do so. Through peer-to-peer communication, nodes on a subnet can broadcast messages, referred to as **artifacts**, to all nodes in the subnet.

Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/how-it-works/peer-to-peer-p2p/)

#### Consensus

The consensus layer is responsible for assuring that all nodes in a subnet agree on the messages that are processed on the subnet and the order that they are processed in. This is important to ensure that all nodes make the same state transition when executing messages. Each subnet on the IC runs consensus independently of the other subnets.

A unique aspect of the IC consensus protocol is that it provides **cryptographically guaranteed finality**, which is different in comparison to other consensus protocols, such as the one used by Bitcoin, which provides **probabilistic finality**.

Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/how-it-works/consensus/)

#### Message routing

The message routing layer receives a block of messages from the consensus layer, then places these messages into the input queues of their associated target canisters. This process is called **induction**. The induction process then triggers the **execution** process, which may result in new canister messages in the executed canisters' output queues. After execution has completed, messages in the output queues are routed to their recipient by the message routing component.

Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/how-it-works/message-routing/)

#### Execution

The execution layer is responsible for executing canister smart contract code. Execution is done using WebAssembly (Wasm). There is a Wasm virtual machine that runs on each node that is responsible for this process. Wasm is used since Wasm bytecode can be executed deterministically.

Messages that have been inducted into canister queues on the subnet are executed by the execution layer until either all messages in the queue have been executed or until the cycles limit for the round has been reached.

Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/how-it-works/execution-layer/)

## Chain-key cryptography

Another core component of the Internet Computer is an array of advanced cryptographic mechanisms, which are collectively referred to as **chain-key cryptography**. These chain-key cryptographic methods allow the IC to achieve scalability and functionalities that aren't possible on other blockchain networks.

At the core of chain-key cryptography is a **threshold signature scheme**. A threshold signature scheme is similar to an ordinary digital signature scheme, though the secret signing key in a threshold signature scheme is distributed among all the replicas in a subnet. This provides a layer of security where a key cannot be stolen by compromising one, or even a large portion, of the replicas on the subnet.

Through chain-key cryptography:
- Anyone can verify content received by the IC by validating a signature without needing to sync the entire blockchain network.
- New subnets and nodes can be added, or faulty nodes can be recovered, autonomously.
- Chain-key cryptography provides a source of pseudo-randomness that can be used by canisters for algorithms that require randomness.

[**Chain-key signatures**](https://internetcomputer.org/how-it-works/chain-key-technology/) provide the ability for transactions that are targeted at other blockchain networks to be computed fully on-chain using the IC. This allows for integrations with other blockchains such as Bitcoin and Ethereum.

Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/how-it-works/chain-key-technology/)
## Canisters and smart contracts

Smart contracts on the IC are referred to as **canisters**. Canisters are computational units that bundle together both code and state. A canister can define functions that can be called by external services, such as browsers or mobile apps, or that can be called by other canisters.

Canisters are able to communicate with each other through asynchronous messages. The execution of messages is done in isolation, allowing for increased levels of concurrent execution.

Canister code can be written in a number of different languages. Currently, Motoko and Rust are supported and maintained by DFINITY through the [IC SDK](/docs/developer-docs/setup/install/index.mdx), and there are several community-developed SDKs such as Python and Typescript.

A canister is managed by **controllers**. A controller can be a centralized entity, a decentralized entity such as a DAO, or it can have no controller at all, which would make it an immutable smart contract. Controllers are the only ones that can deploy the canister to the IC, start or stop their execution, and push updated code to the canister.

Controllers are also responsible for assuring that a canister contains sufficient **cycles** to pay for the canister's resources, which include network bandwidth, memory, and computational power. Each execution performed by a canister deployed on the mainnet has a cost of cycles.

Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/how-it-works/canister-lifecycle/)

## Tokens

The Internet Computer's utility token is **ICP**, named after the Internet Computer Protocol. This utility token is used for several functions within the network, such as being staked to have voting power in the NNS, or being used to purchase **cycles**, which are used to power canisters deployed on the mainnet network.

Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/how-it-works/tokenomics/)

## Governance

### The Network Nervous System

The Internet Computer is governed by the **Network Nervous System (NNS)**, which is a **decentralized autonomous organization (DAO)**. The NNS coordinates the independent nodes that make up the decentralized system of the IC. The NNS is responsible for proposing and voting on decisions such as which subnet a node should belong to, which protocol version the nodes should run, and when nodes should be upgraded to a new version of the protocol. Anyone can participate in the NNS by staking ICP tokens and voting on proposals.

Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/nns/)

### Service Nervous System

Dapps deployed on the IC can be governed in the same manner that the IC itself is governed - through a DAO, referred to as an **SNS, or Service Nervous System**. An SNS is a version of the NNS that is responsible for tokenizing and decentralizing a single dapp. Once a dapp's control has been handed over to an SNS, it can be managed through proposals that are voted on by those that have staked the dapp's native token.

Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/sns/)

## Internet Identity

The Internet Computer has pioneered a secure and advanced form of cryptographic authentication, known as **Internet Identity (II)**. II Is designed to work across all user devices and protect user privacy as a means to replace traditional usernames and passwords, which can be hard to manage and easy to exploit.

II can be integrated with dapps on the IC and helps secure your online identity by providing protection from websites collecting your data. II does this through the ability for users to create new anonymous, independent accounts for each website that they visit.

Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/how-it-works/web-authentication-identity/)

## Next steps

- [0.2: Internet Computer terminology](02-ic-terms.md).
