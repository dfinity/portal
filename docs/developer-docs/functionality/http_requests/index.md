# Canister HTTPS Outcalls

Up until now, blockchains have been isolated entities and smart contracts have not been able to communicate with external servers. The reason for this is that a blockchain is a replicated state machine where each replica needs to perform the same computations on the same state to make the same transitions in each round. Doing computations based on results from external services as input may easily lead to state divergence on the replicas if done in a naïve manner and thus requires some technical considerations to be workable.

The feature of canister HTTP(S) requests, or HTTP(S) outcalls, on the Internet Computer allows -- for the first time in blockchain history -- smart contracts to directly make calls to HTTP(S) servers external to the blockchain and use the response in the further processing of the smart contract s.t. the replicated state is updated depending on those inputs. So far, the only means of communication of smart contracts with external servers have been through so-called *oracles*. Note that henceforth in this documentation we may use HTTP representative for both HTTP and HTTPS, referring to the underlying protocol. Practically all HTTP traffic on public networks runs over secure HTTPS these days.

Canister HTTP requests allow for a plethora of use cases and have numerous advantages over the currently used oracle model.
* *Stronger trust model:* Canister HTTP outcalls are based on a stronger trust model because no external intermediaries (oracles) are required for smart contracts to communicate with external servers.
* *Lower fees:* No intermediaries are in place to charge additional fees for their services.
* *Closer to the standard programming paradigm*: The paradigm of a smart contract directly making HTTP requests to external servers is much closer to the "normal" programming paradigm engineers are used to when compared to using oracles. Thus, the fact that one programs for a blockchain can be further abstracted away.

Why is interfacing with the external world so important for a blockchain?
* Many real-world dApp use cases need some form of data exchange with off-chain entities.
* Most of the world's data is currently in traditional (Web 2.0) services and many dApps build on this data and therefore need to access it.
* In order to be able to reach blockchain singularity, smart contracts need to be able to interact with Web 2.0 services. In our journey towards blockchain singularity, an increasing amount of data will be pulled into the blockchain and more and more interactions will be between smart contracts without involving Web 2.0 servers.

There are many use cases for canister HTTP outcalls, see the following for some examples.
* One of the most important use cases is reading data from external HTTP APIs, e.g., pricing data for DEXs or weather data for decentralized insurance dApps.
* IoT dApps need to obtain sensor data from traditional servers the sensors interact with. In the future, we may envision also direct interactions of sensors with the IC.
* Chat services sending push notifications about incoming messages to users.

We expect the majority of HTTP calls to be GET calls for reading Web 2.0 data, but POST clearly also plays a key role for the interaction with external systems in order to be able to write data to Web 2.0 servers.

## Learn more
If you want to take a deep dive into how the HTTPS outcalls feature works and is used in a canister, see [How it Works](http_requests-how-it-works.md).
