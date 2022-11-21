---
title: Message routing
---

![](/img/how-it-works/message-routing.600x300.jpg)

# Message routing

The message routing layer implements the routing of inter-canister messages between subnets. This layer is also often referred to as cross-subnet messaging or simply XNet messaging.
*Secure XNet messaging* is a key ingredient for the architecture of loosely-coupled subnets and thus a prerequisite for the scalability of the IC.
In every IC round, message routing receives a block of messages to be processed from consensus – the same on each node of the subnet – and places the messages into the input queues of their target canisters, a process called *induction*. Then, it triggers the execution round which will potentially lead to new canister messages in the executed canisters' output queues. Once execution is done, the messages in the output queues will be routed to the respective subnet-to-subnet streams to be processed by the consensus protocol instances running on other subnets. 

Another crucial functionality implemented by the message routing layer is *state certification*, that is, the subnet certifying parts of the replicated subnet state in every round in a decentralized manner. Among others, this certification is used by other subnets to verify the authenticity of the subnet-to-subnet streams or to allow users to authentically read the processing status of messages previously submitted by them.
In addition to the partial state certification, the full state of the subnet is certified every multiple hundred rounds. This certification is, among others, used to allow fallen behind or newly joining replicas to verify the authenticity of the state they sync over via the state sync protocol.

State certification and secure XNet messaging enable, among others, the secure and transparent communication of canisters across subnet boundaries, a challenge that any blockchain that has multiple shards struggles with. 

[Go deeper](/how-it-works/message-routing/)
