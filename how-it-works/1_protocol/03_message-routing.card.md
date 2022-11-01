---
title: Message routing
---

![](/img/how-it-works/message-routing.600x300.jpg)

# Message routing

The message routing layer of the core IC protocol implements, as the name suggests, the routing of inter-canister messages between subnets, so-called cross-subnet messaging (XNet messaging).
*Secure XNet messaging* is a key ingredient for the architecture of loosely-coupled subnets and thus a prerequisite for the scalability of the IC.
In every IC round, message routing receives a block of canister messages to be executed from consensus - the same on each node of the subnet - and places the messages into the input queues of their target canisters, a process called *induction*. Then, it triggers the execution round which will potentially lead to new canister messages in the executed canisters' output queues. Once execution is done, these messages in the output queues will be routed to the respective subnet-to-subnet streams to be picked up by block makers on other subnets.
Another crucial functionality is *state certification*, that is, the subnet certifying parts of the replicated subnet state in every round in a completely decentralized manner. Among others, this certification is used by other subnets to verify the authenticity of the subnet-to-subnet streams or to authentically export the status of Ingress messages.
The full state of the subnet is certified at every checkpoint, that is, every multiple hundred rounds. This certification is, among others, used to allow fallen behind and outdated replicas to verify the authenticity of the state they sync over via state sync.
The certified state and secure XNet messaging resolve the secure communication between subnets, a challenge that any blockchain that has multiple shards struggles with, allows users to read a certified response to an ingress message, or allows nodes to join a subnet efficiently without replaying all blocks since genesis.
All of this makes message routing an integral layer of the core IC protocol crucial for realizing some of the IC's unique and distinguishing features.

[Go deeper](/how-it-works/message-routing/)
