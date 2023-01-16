---
title: Message routing
---

![](/img/how-it-works/message-routing.600x300.jpg)

# Message routing

In every IC round, the message routing component receives a block of messages to be processed from consensus – the same block on each node of the subnet – and places the messages into the input queues of their target canisters, a process called *induction*. Then, it triggers the execution round which will potentially lead to new canister messages in the executed canisters' output queues. Once execution is done, the messages in the output queues are routed by the message routing component to the recipients. 

The recipients may include canisters residing on a different subnet. The message routing layer implements the routing of inter-canister messages between subnets, such that those messages can be included in blocks and be inducted on the recipient's subnet. This is referred to as cross-subnet messaging or simply XNet messaging. *Secure XNet messaging* is a key ingredient for the architecture of loosely-coupled subnets and thus a prerequisite for the scalability of the IC.

Another crucial functionality implemented by the message routing layer is *state certification*, that is, the subnet certifying parts of the replicated subnet state in every round in a decentralized manner. Among others, this certification is used by other subnets to verify the authenticity of the subnet-to-subnet streams or to allow users to authentically read the processing status of messages previously submitted by them. State certification and secure XNet messaging enable, among others, the secure and transparent communication of canisters across subnet boundaries, a challenge that any blockchain that has multiple shards struggles with. 

[Go deeper](/how-it-works/message-routing/)
