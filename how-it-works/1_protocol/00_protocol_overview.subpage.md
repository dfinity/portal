---
title: Overview
abstract: 
shareImage: /img/how-it-works/peer-to-peer-p2p.600.jpg
slug: core-ic-protocol-overview
---

# Core Internet Computer Protocol – Overview

A subnet hosts canister smart contracts and executes *messages* sent to them either by users or other canister smart contracts (which may be hosted on the same or another subnet).
Messages on the IC are analogous to transactions on other blockchains.
Messages addressed to a canister smart contract are executed by the nodes on the corresponding subnet by running the Wasm code of the canister.
Canister code execution updates the canister state.
In order to keep the state on the subnet nodes on which a canister is hosted in sync, it must be ensured that every node executes the same messages in the same order, i.e., fully deterministically.
This is the core of the blockchain-based replicated state machine functionality realizing the IC.

The upper two layers realize *deterministic execution* of the block of messages for a round received from the lower two layers, on each node of the subnet.
At the beginning of a round, all (honest) nodes hold the same state, representing the replicated state of the subnet (which includes the current state on all canisters hosted on that subnet.
By executing the messages of the next block received from consensus in a completely deterministic manner, it is ensured that the state after executing the messages of the block is the same on each node due to the determinism in execution.

Canister smart contracts can communicate with each other by sending messages, regardless of whether they are hosted on the same or different subnets.
The IC core protocol handles both the inter-canister messages sent locally, i.e., on the same subnet, between canisters, as well as inter-canister messages sent across subnets, so called *XNet messages*.
Local inter-canister messages do not need to go through consensus, while XNet inter-canister messages do (making the former more efficient in terms of throughput and incurring less latency).

The core IC protocol heavily relies on [*chain-key cryptography*](https://internetcomputer.org/how-it-works/#Chain-key-cryptography) for its operation.  A key component of chain-key cryptography is [*chain-evolution technology*](https://internetcomputer.org/how-it-works/#Chain-evolution-technology), which facilitates the long-term operation of the IC, such as allowing new nodes to easily and securely join a subnet.
