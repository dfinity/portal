# Canister HTTPS Outcalls

Up until now, blockchains have been isolated entities and smart contracts have not been able to directly communicate with external servers or other blockchains. The reason for this is that a blockchain is a replicated state machine where each replica needs to perform the same computations on the same state to make the same transitions in each round. Doing computations based on results from external services as input may easily lead to state divergence on the replicas if done in a naïve manner and thus requires some technical considerations to be workable.

The feature of _canister HTTP(S) requests_, or _HTTP(S) outcalls_, on the Internet Computer enables — for the first time in blockchain history — smart contracts to directly make calls to HTTP(S) servers external to the blockchain and use the response in the further processing of the smart contract such that the replicated state can safely be updated using those inputs. So far, the only means of communication of smart contracts with external servers has been through so-called *oracles*. Note that in the remainder of this documentation we may use *HTTP* representative for both *HTTP* and *HTTPS*, referring to the underlying protocol. Practically all HTTP traffic on public networks runs over secured HTTPS these days.

Canister HTTP requests allow for a plethora of use cases and have numerous advantages over the currently used oracle model.
* *Stronger trust model:* Canister HTTP outcalls are based on a stronger trust model because no external intermediaries (oracles) are required for smart contracts to communicate with external servers.
* *Lower fees:* No intermediaries are in place to charge additional fees for their services.
* *Closer to the standard programming paradigm*: The paradigm of a smart contract directly making HTTP requests to external servers is much closer to the &ldquo;normal&rdquo; programming paradigm engineers are used to when compared to using oracles. Thus, the fact that one programs for a blockchain can be further abstracted away.

Why is interfacing with the external world so important for a blockchain?
* Most real-world dApp use cases need some form of data exchange with off-chain entities.
* Most of the world's data is currently held in traditional (Web 2.0) services and many dApps build on this data and therefore need access to it.
* In order to be able to reach *blockchain singularity*, smart contracts need to be able to interact with Web 2.0 services. In our journey towards blockchain singularity, an ever increasing amount of data will be pulled into the blockchain world of Web 3.0 and interactions will increasingly take place between different smart contracts without involving Web 2.0 servers.

There are many use cases for canister HTTPS outcalls, see the following list for some prominent examples.
* One of the most important use cases is reading data from external HTTP APIs, e.g., pricing data used in DEXs or weather data used in decentralized insurance dApps.
* IoT dApps need to obtain sensor data from traditional servers with which the sensors interact. In the future, we may even envision direct interactions of sensors with the IC blockchain.
* Chat services sending push notifications about incoming messages to users.

We expect the majority of HTTP calls to be `GET` calls for reading Web 2.0 data, but `POST` clearly also plays an important role for the interaction with external systems in order to be able to write data to Web 2.0 servers.

## Learn more

If you want to take a deep dive into how the HTTPS outcalls feature works and how to use it when coding a canister, see the [How it Works](http_requests-how-it-works.md) section.

## Build more

In the [Examples repository](https://github.com/dfinity/examples) you can find [sample code in Rust](https://github.com/dfinity/examples/tree/master/rust/exchange_rate) which you can use as starting point for building your own dApp. See the [sample code](https://internetcomputer.org/docs/current/samples/http-requests-exchange-rates) for more details.
