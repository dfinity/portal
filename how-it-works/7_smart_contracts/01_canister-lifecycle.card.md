---
title: Canisters
---

![](/img/how-it-works/canister-lifecycle.600x300.jpg)

# Canisters

Smart contracts on the Internet computer come in the form of *canisters*: computational units that bundle together code and state. Each canister defines functions that can be called by other canisters and parties external to the IC, such as browsers or mobile apps.
Canisters communicate with one another via asynchronous messages but the execution of each such message is done in complete isolation, allowing for massive levels of concurrent execution. 
Canisters are managed by controllers. Control structure of canisters could be centralized (e.g. when the controllers include some centralized entity), decentralized (when the controller is a DAO) or even non-existent, in which case the canister is an immutable smart contract. 
Controllers are the only entities which can deploy the canister to the Internet Computer, start/stop their execution and update their code.  The controllers also need to ensure that canisters hold sufficient *cycles*. These are the unit used on the IC to acquire resources for canister execution (memory, network bandwidth and computational power). To this end the IC monitors the resource usage of canisters and deducts their cost from a cycle balance maintained locally by each canister.

[Go deeper](/how-it-works/canister-lifecycle/)
