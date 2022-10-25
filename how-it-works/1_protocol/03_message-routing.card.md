---
title: Message routing
---

![](/img/how-it-works/message-routing.600x300.jpg)

# Message routing

The message routing layer of the core IC protocol implements, as the name suggests, the routing of inter-canister messages between subnets, so-called cross-subnet messaging (xnet messaging).
Secure xnet messaging is a key ingredient for the architecture of loosely-coupled subnets and thus a prerequisite for the scalability of the IC.
This layer also implements the scheduling of message execution on a subnet including the invocation of the execution layer for scheduled messages.
An equally important functionality is state certification, that is, the subnet certifying parts of the replicated subnet state in every round in a completely decentralized manner.
The full state of the subnet is certified at every checkpoint, that is, every multiple hundred rounds.
The certified state resolves the authentication of xnet messages which any blockchain that has multiple shards struggles with, allows users to read a certified response to an ingress message, or allows nodes to join a subnet efficiently without replaying all blocks since genesis.
All of this makes message routing an integral layer of the core IC protocol crucial for realizing some of the IC's unique and distinguishing features.

[Go deeper](/how-it-works/message-routing/)
