---
title: State synchronization
---

![](/img/how-it-works/state-synchronization.600x300.jpg)

# State synchronization

Since the Internet Computer is fault tolerant, the network will make progress even if some nodes fail or misbehave. If a node has been offline for a while or is being added to a subnet, efficient mechanisms are in place to ensure that such a node is able up and process messages quickly. This involves learning which other nodes to connect to, gathering the necessary key material and information to participate in the consensus algorithm, and obtaining a recent checkpoint of the state and the queues of the canister smart contracts hosted on the subnet.

- [Go deeper](/how-it-works/state-synchronization/)