---
title: Consensus
---

![](/img/how-it-works/consensus.600x300.jpg)

# Consensus

Much like every blockchain implementation, the IC needs a consensus mechanism that helps the nodes of a subnet to agree on the messages to be processed in the next round and their ordering. On the IC, each subnet is a blockchain that runs the IC core protocol including consensus independently of the other subnets. The purpose of the consensus protocol is to output the same block of ordered messages on each node of a subnet in a given round so that each node can make the same state transition when deterministically executing those messages. IC consensus uses the P2P layer to broadcast protocol artifacts to the nodes of the subnet.

1. [Learn more](/how-it-works/consensus/)
2. [Achieving Consensus on the Internet Computer](https://medium.com/dfinity/achieving-consensus-on-the-internet-computer-ee9fbfbafcbc)
3. [Consensus White Paper](https://eprint.iacr.org/2021/632.pdf)
