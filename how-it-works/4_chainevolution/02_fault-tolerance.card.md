---
title: Fault tolerance
---

![](/img/how-it-works/state-synchronization.600x300.jpg)

# Fault tolerance

In any large-scale distributed system, it is inevitable that individual nodes fail due to hardware breaking, network connectivity issues, or even the owner deciding to remove the nodes from the network.
In such cases, the IC's Network Nervous System selects a spare node that replaces the failed node in its subnet.
The new node then performs a state synchronization with the existing nodes on the subnet and begins contributing to the subnet blockchain's consensus protocol.

[Go deeper](/how-it-works/fault-tolerance/)
