---
title: Consensus
---

![](/img/how-it-works/consensus.600x300.jpg)

# Consensus

Every blockchain needs a consensus mechanism that helps the nodes to agree on the messages to be processed, as well as their ordering.
Consensus is the component of the core IC protocol that drives the subnets of the IC.
Each subnet is a blockchain that runs the IC core protocol including consensus independently of the other subnets.
The purpose of the consensus protocol is to output the same block of ordered messages on each node of a subnet in a given round so that each node can make the same state transition when deterministically executing those messages.
The IC's consensus protocol realizes *single slot finality*, i.e., almost instant finality for each block, through a cryptographic protocol leveraging chain-key cryptography.
The components of IC consensus use the P2P layer to broadcast protocol artifacts to the nodes of the subnet and receive protocol artifacts from them.

[Go deeper](/how-it-works/consensus/)
