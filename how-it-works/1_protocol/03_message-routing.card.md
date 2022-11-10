---
title: Message routing
---

![](/img/how-it-works/message-routing.600x300.jpg)

# Message routing

The message routing layer implements the routing of inter-canister messages between subnets. This layer is also often referred to as cross-subnet messaging or simply XNet messaging.
*Secure XNet messaging* is a key ingredient for the architecture of loosely-coupled subnets and thus a prerequisite for the scalability of the IC.
In every IC round, message routing receives a block of messages to be processed from consensus - the same on each node of the subnet - and places the messages into the input queues of their target canisters, a process called *induction*. Then, it triggers the execution round which will potentially lead to new canister messages in the executed canisters' output queues. Once execution is done, the messages in the output queues will be routed to the respective subnet-to-subnet streams to be processed by the consensus protocol instances running on other subnets. 

Another crucial functionality implemented by the message routing layer is *state certification*, that is, the subnet certifying parts of the replicated subnet state in every round in a decentralized manner. Among others, this certification is used by other subnets to verify the authenticity of the subnet-to-subnet streams or to allow users to authentically read the processing status of messages previously submitted by them.
In addition to the partial state certification, the full state of the subnet is certified every multiple hundred rounds. This certification is, among others, used to allow fallen behind and/or newly joining replicas to verify the authenticity of the state they sync over via the state sync protocol.
Details regarding the cryptography behind state certification can be found in the section on *chain-key cryptography*.

State certification and secure XNet messaging enable, among others, the secure and transparent communication of canisters across subnet boundaries, a challenge that any blockchain that has multiple shards struggles with. It also provides crucial building blocks to allow users to read certified parts of the replicated state, e.g., responses to messages submitted by them. Furthermore, it allows nodes to join a subnet efficiently without replaying all blocks since genesis or fallen behind nodes to catch up to the most recent state of a subnet. All of this makes message routing an integral layer of the core IC protocol crucial for realizing some of the IC's unique and distinguishing features.

[Go deeper](/how-it-works/message-routing/)
