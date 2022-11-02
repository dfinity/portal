---
title: Consensus
---

![](/img/how-it-works/consensus.600x300.jpg)

# Consensus

Every blockchain needs a consensus mechanism that allows the nodes to agree on the messages to be processed, as well as their ordering.
Consensus is the component of the core IC protocol that drives the subnets of the IC.
Each subnet is a blockchain that runs the IC core protocol, including consensus, independently of the other subnets.
The purpose of the consensus protocol is to output the same block of ordered messages on each node of a subnet in a given round so that each node can make the same state transition when deterministically executing those messages.

The IC’s consensus protocol is designed to meet the following requirements:
1. low latency (almost instant finality);
2. high throughput;
3. robustness (graceful degradation of latency and throughput in the presence of node or network failures).

The IC consensus protocol achieves these goals by leveraging [chain-key cryptography](/how-it-works/chain-key-technology).

The IC consensus protocol provides *cryptographically guaranteed finality*.
The option of choosing *probabilistic finality* – similar to what is done in Bitcoin-like protocols, by considering a block final once a sufficient number of blocks have built on top of it in the blockchain – is not acceptable for the IC for two reasons: (1) probabilistic finality is a very weak notion of finality and (2) probabilistic finality would increase the time to finality drastically.

The IC consensus protocol achieves all of these goals making only minimal assumptions about the communication network. In particular, it does not assume any bounds on the time it takes for protocol messages to be delivered – that is, it only assumes an *asynchronous network* rather than a *synchronous network*. Indeed, for a decentralized network that is globally distributed, *synchrony* is simply not a realistic assumption. While it is possible to design consensus protocols that work in a purely *asynchronous* setting, these protocols generally have very poor latency. In order to achieve good latency, the IC consensus protocol requires protocol messages to be delivered in a timely manner to make progress. However, the *correctness* of the protocol is always guaranteed, regardless of message delays, so long as less than a third of the nodes in the subnet are faulty.

[Go deeper](/how-it-works/consensus/)
