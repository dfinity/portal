---
title: Message routing
---

![](/img/how-it-works/message-routing.600x300.jpg)

# Message routing

The message routing layer of the core IC protocol implements, as the name suggests, the routing of canister messages between subnets, so-called xnet messaging.
Secure xnet messaging is a key ingredient for the loosely-coupled concurrently-operating subnets and the scalability of the IC.
Newly added subnets are immediately available as source or target subnet of canister messages.
The layer also implements the scheduling of message execution on a subnet including the invocation of execution for scheduled messages.
Another major feature is state certification, that is, having parts of the replicated subnet state certified by the subnet in every round.
The full state of the subnet is certified at every checkpoint, which corresponds to the DKG interval, which typically has a length of multiple hundred rounds.
All of this, and more, makes message routing an integral protocol layer crucial for realizing some of the IC's unique features.

[Go deeper](/how-it-works/message-routing/)
