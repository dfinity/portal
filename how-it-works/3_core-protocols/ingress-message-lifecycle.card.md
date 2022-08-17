---
title: Ingress Message Lifecycle
---

![](/img/how-it-works/ingress-message-lifecycle.600x300.jpg)

# Ingress Message Lifecycle

When a user sends an update call to a canister smart contract on the Internet Computer, it traverses several components before it is actually executed. 
In a first step, P2P ensures that it is broadcast to a sufficiently large set of other nodes. At some point, consensus forms a block that contains the message and passes it in a batch to message routing, which in turn inserts it into its destination canister’s queue, where it waits for the scheduler to select the next message to be executed.
A message is subject to several checks, and a number of conditions must be satisfied for it to make it into the Induction Pool for execution to ensure that the right parties are charged and rewarded for its processing.
	
* [Learn more](/how-it-works/ingress-message-lifecycle/)