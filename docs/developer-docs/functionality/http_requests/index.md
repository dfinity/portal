# Canister HTTP Requests

Up until now, blockchains have been isolated entities and smart contracts could not communicate with external servers. The reason for this is that a blockchain is a replicated state machine where each replica needs to make the same computations on the same state to make the same transitions in each round. Doing computations with results from external services may easily lead to state divergence on the replicas and thus cannot be done in a straightforward manner.

The feature of canister HTTP outcalls on the Internet Computer allows smart contracts, for the firs time in history, to directly make calls to servers external to the blockchain and use the response in its processing. So far, the only means of communicating with external servers have been oracles.

Canister HTTP outcalls allow for a plethora of use cases and have numerous advantages over the so-far used oracle model.
* *Stronger trust model:* Canister HTTP outcalls have a stronger trust model as no external intermediaries (oracles) are required to communicate with external servers.
* *Less fees:* No intermediaries are there to charge extra fees for their services.
* *Closer to the standard programming paradigm*: The paradigm of a smart contract directly making HTTP requests to external servers is much closer to the "normal" programming paradigm engineers are used to than using oracles. Thus, the fact that one programs for a blockchain can be further abstracted away.

Why is interfacing with the external world so important for a blockchain?
* Many real-world dApp use cases need some form of data exchange with off-chain entities.
* Most data is currently in traditional (Web 2.0) services and many dApps build on this data and therefore need to access it.
* In order to be able to reach blockchain singularity, smart contracts need to be able to interact with Web 2.0 services. In our journey towards blockchain singularity, an increasing amount of data will be on chain and more and more interactions will be between smart contracts.

There are many use cases for canister HTTP outcalls.
* One of the most important use cases is reading data from external HTTP APIs, e.g., pricing data for DEXs or weather data for decentralized insurance dApps.
* IoT dApps need to obtain sensor data from traditional servers.
* Chat services sending push notifications about incoming messages to users.

We expect the majority of HTTP calls to be GET calls, but POST clearly also plays a key role for the interaction with external systems in order to write data.
