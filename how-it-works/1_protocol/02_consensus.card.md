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
low latency (almost instant finality);
high throughput;
robustness (graceful degradation of latency and throughput in the presence of node or network failures). The IC consensus protocol also provides *cryptographically guaranteed finality*. This is in contrast to Bitcoin-like protocols which only provides *probabilistic finality*, where a block is considered final once a sufficient number of blocks have built on top of it in the blockchain.

[Go deeper](/how-it-works/consensus/)
