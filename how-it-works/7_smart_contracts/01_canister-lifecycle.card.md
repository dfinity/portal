---
title: Canisters
---

![](/img/how-it-works/canister-lifecycle.600x300.jpg)

# Canisters

Smart contracts on the Internet computer come in the form of *canisters*: computational units that bundle together code and state. Each canister defines functions that can be called by other canisters and parties external to the IC, such as browsers or mobile apps.
When deployed, canisters behave much like actors from the actor-based concurrency model – they communicate asynchronously with each other but, unlike in the traditional actor model, communication is bidirectional. 
Canisters are managed by controllers. These can deploy the canister to the Internet Computer, start/stop their execution and update their code.  The controllers also need to ensure that canisters hold sufficient *cycles*. These are the unit used on the IC to acquire resources for canister execution (memory, network bandwidth and computational power). To this end the IC monitors the resource usage of canisters and deducts their cost from a cycle balance maintained locally by each canister. 


[Go deeper](/how-it-works/canister-lifecycle/)
