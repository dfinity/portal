---
title: Canisters
---

![](/img/how-it-works/canister-lifecycle.600x300.jpg)

# Canisters

On the Internet Computer smart contracts come in the form of canisters.  These are computational units which bundle together code and state. Each canister defines a set of entry points which can be called by other canisters and parties external to the IC, such as browsers or mobile apps.
When deployed, canisters behave much like actors from the actor-based concurrency model – they communicate asynchronously with each other but, unlike in the traditional actor model, communication is bidirectional.
Canisters are managed by zero or more controllers. The controllers of a canister can update the code inside and start, stop its execution.  The controllers are also typically in charge of ensuring that canisters hold sufficient cycles. This is the unit used to pay for using resources on the Internet Computer.


[Go deeper](/how-it-works/canister-lifecycle/)
