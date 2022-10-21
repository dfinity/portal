---
title: Message routing
---

![](/img/how-it-works/message-routing.600x300.jpg)

# Message routing

The message routing layer of the core IC protocol implements, as the name suggests, the routing of canister messages between subnets.
Secure xnet messaging is a key ingredient for the loosely-coupled concurrently-operating subnets and the scalability of the IC.
Newly added subnets are immediately available as source or target subnet of canister messages.
The layer also implements the scheduling of messages to be executed within a subnet.
Another major functionality group is state certification, that is, getting parts of the replicated subnet state certified by the subnet in every round and the full state in every DKG interval (hundreds of rounds).
All of this makes message routing an integral protocol layer crucial for realizing some of the IC's unique features.

[Go deeper](/how-it-works/message-routing/)
