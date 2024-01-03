# How to use HTTP outcalls: Intro

This guide shoes how to use the [HTTPS outcalls](../index.md) feature of ICP. This feature allows smart contracts to directly make calls to HTTP(S) servers external to the blockchain and use the response in the further processing of the smart contract, without the need of oracles.

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

## Sample code

To see concrete examples of making `GET` and `POST`requests in Motoko and Rust see:

* [Minimal sample code of making a `GET` request](./https-outcalls-get.md)
* [Minimal sample code of making a `POST` request](./https-outcalls-post.md)

