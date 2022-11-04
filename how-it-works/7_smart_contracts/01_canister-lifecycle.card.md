---
title: Canisters
---

![](/img/how-it-works/canister-lifecycle.600x300.jpg)

# Canisters

On the Internet Computer smart contracts come in the form of canisters.  These are computational units which bundle together code and state. Each canister defines a set of entry points which can be called by other canisters and parties external to the IC, such as browsers or mobile apps.
When deployed, canisters behave much like actors from the actor-based concurrency model – they communicate asynchronously with each other but, unlike in the traditional actor model, communication is bidirectional. 
Canisters are managed by controllers. These can deploy the canister to the Internet Computer, start/stop their execution and update their code.  As they execute, canisters need to acquire resources for their execution (memory, network bandwidth and computational power). To this end canisters hold, locally, a cycle balance which is the unit used to measure resource consumption. The controllers also need to ensure that canisters hold sufficient cycles. 
A canister can have no controllers: such canisters are completely immutable and resemble traditional smart contracts.


[Go deeper](/how-it-works/canister-lifecycle/)
