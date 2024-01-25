# Overview

Up until now, blockchains have been isolated entities and smart contracts have not been able to directly communicate with external servers or other blockchains. The reason for this is that a blockchain is a replicated state machine where each replica needs to perform the same computations on the same state to make the same transitions in each round. Doing computations based on results from external services as input may easily lead to state divergence on the replicas if done in a naïve manner and thus requires some technical considerations to be workable.

The feature of **canister HTTP(S) requests**, or **HTTP(S) outcalls**, on the Internet Computer enables — for the first time in blockchain history — smart contracts to directly make calls to HTTP(S) servers external to the blockchain and use the response in the further processing of the smart contract such that the replicated state can safely be updated using those inputs. So far, the only means of communication of smart contracts with external servers has been through so-called **oracles**. 

:::info
Note that in the remainder of this documentation uses **HTTP** representative for both **HTTP** and **HTTPS**, referring to the underlying protocol. Practically all HTTP traffic on public networks runs over secured HTTPS these days.
:::

Canister HTTP requests allow for a plethora of use cases and have numerous advantages over the currently used oracle model.
* **Stronger trust model:** canister HTTP outcalls are based on a stronger trust model because no external intermediaries (oracles) are required for smart contracts to communicate with external servers.
* **Lower fees:** no intermediaries are in place to charge additional fees for their services.
* **Closer to the standard programming paradigm**: the paradigm of a smart contract directly making HTTP requests to external servers is much closer to the "normal" programming paradigm engineers are used to when compared to using oracles. Thus, the fact that one programs for a blockchain can be further abstracted away.

#### Why is interfacing with the external world so important for a blockchain?
* Most real-world dapp use cases need some form of data exchange with off-chain entities.
* Most of the world's data is currently held in traditional (Web 2.0) services and many dapps build on this data and therefore need access to it.
* In order to be able to reach **blockchain singularity**, smart contracts need to be able to interact with Web 2.0 services. In our journey towards blockchain singularity, an ever increasing amount of data will be pulled into the blockchain world of Web 3.0 and interactions will increasingly take place between different smart contracts without involving Web 2.0 servers.


## Use cases
There are many use cases for canister HTTPS outcalls, see the following list for some prominent examples.

* One of the most important use cases is reading data from external HTTP APIs, e.g., pricing data used in DEXs or weather data used in decentralized insurance dApps.
* IoT dApps need to obtain sensor data from traditional servers with which the sensors interact. In the future, the Internet Computer may even envision direct interactions of sensors.

* Chat services sending push notifications about incoming messages to users.

It is expected that the majority of HTTP calls to be `GET` calls for reading Web 2.0 data, but `POST` clearly also plays an important role for the interaction with external systems in order to be able to write data to Web 2.0 servers.

## Key concepts

### Methods supported

The feature currently supports `GET`, `HEAD`, and `POST` methods for HTTP requests.

### ICP management canister
* [The ICP management canister](https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-management-canister) - In order for a canister to use HTTPS outcalls, it needs to call into the system API of ICP. Canisters can call into the system API by sending messages to the **ICP management canister**. The intent is to make using the system API as simple as if it were just another canister. Management canister is evoked by using the identifier `"aaaaa-aa"`.

:::info
The ICP management canister is just a facade; it does not actually exist as a canister (with isolated state, Wasm code, etc.). 
:::

### Cycles

* [Cycles](../../gas-cost.md) used to pay for the call must be explicitly transferred with the call, i.e., they are not deducted from the caller's balance implicitly (e.g., as for inter-canister calls).

## The API for sending HTTP outcalls

As per the [Internet Computer interface specification](https://internetcomputer.org/docs/current/references/ic-interface-spec), a canister can use the `http_request` method by [following construction](https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-http_request):

### The request
The following parameters should be supplied for in the request:

-   `url`: the requested URL. The URL must be valid according to https://www.ietf.org/rfc/rfc3986.txt[RFC-3986] and its length must not exceed `8192`. The URL may specify a custom port number.

-   `max_response_bytes`: optional; specifies the maximal size of the response in bytes. If provided, the value must not exceed `2MB` (`2_000_000B`). The call will be charged based on this parameter. If not provided, the maximum of `2MB` will be used.

-   `method`: currently, only `GET`, `HEAD`, and `POST` are supported.

-   `headers`: list of HTTP request headers and their corresponding values.

-   `body`: optional; the content of the request's body.

-   `transform`: an optional function that transforms raw responses to sanitized responses, and a byte-encoded context that is provided to the function upon invocation, along with the response to be sanitized. If provided, the calling canister itself must export this function.

### The response

The returned response (and the response provided to the `transform` function, if specified) contains the following fields:

-   `status`: the response status (e.g., 200, 404).

-   `headers`: list of HTTP response headers and their corresponding values.

-   `body`: the response's body.

## Resources

- If you want to take a deep dive into how the HTTPS outcalls feature works and how to use it when coding a canister, see the [reference documentation](https-outcalls-how-it-works.md).

- In the [examples repository](https://github.com/dfinity/examples) you can find sample code which you can use as starting point for building your own dapp.:
    * Sample code for making [HTTP GET requests in Rust](https://github.com/dfinity/examples/tree/master/rust/send_http_get) 
    * Sample code for making [HTTP GET requests in Motoko](https://github.com/dfinity/examples/tree/master/motoko/send_http_get) 
    * Sample code for making [HTTP POST requests in Rust](https://github.com/dfinity/examples/tree/master/rust/send_http_post) 
    * Sample code for making [HTTP POST requests in Motoko](https://github.com/dfinity/examples/tree/master/motoko/send_http_post)
