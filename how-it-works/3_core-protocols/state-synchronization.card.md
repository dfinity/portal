---
title: State Synchronization
---

![](/img/how-it-works/state-synchronization.600x300.jpg)

# State Synchronization

The Internet Computer Protocol has been designed to provide a reliable service despite some of the nodes failing or misbehaving. More precisely, even if a node has been offline for a while or is being added to a subnet, efficient mechanisms are in place to ensure that such a node is able to process messages quickly. This involves learning which other nodes to connect to, gathering the necessary key material and information to participate in the consensus algorithm, and obtaining a recent checkpoint of the state and the queues of the canister smart contracts hosted on the subnet. The latter is particularly challenging, since it can require several GiB of data to be transmitted to the node that is catching up.

* [Learn more](/how-it-works/state-synchronization/)



