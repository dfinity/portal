# How to use HTTPS Outcalls

This guide shoes how to use the [HTTPS Outcalls](../index.md) feature of the IC. This feature allows smart contracts to directly make calls to HTTP(S) servers external to the blockchain and use the response in the further processing of the smart contract, without the need of oracles.

## Key concepts

### Methods supported

The feature currently supports `GET`, `HEAD`, and `POST` methods for HTTP requests.

### IC management canister
* [The IC Management Canister](../../../references/ic-interface-spec#ic-management-canister) - In order for a canister to use HTTPS outcalls, it needs to call into the system API of the IC. Canisters can call into the system API by sending messages to the *IC Management Canister*. The intent is to make using the system API as simple as if it were just another canister. Management canister is evoked by using the identifier `"aaaaa-aa"`.

:::note
The IC management canister is just a facade; it does not actually exist as a canister (with isolated state, Wasm code, etc.). 
:::

#### Minimal example for a GET request

To get started, we present a minimal example in Motoko that uses a GET request. The structure the code will have is:

Here is what `main.mo` will look like:

```motoko
//Import some custom types
import Types "Types";

actor {

    //declare the IC management canister
    let ic : Types.IC = actor ("aaaaa-aa");

    //code that uses the management canister
    let request : Types.CanisterHttpRequestArgs = {
        //construct the request
    };

    //send the http request
    let response : Types.CanisterHttpResponsePayload = await ic.http_request(request);

}
```

Here is what `Types.mo` will look like:
```motoko
module Types {

    //type declaration

}
```

#### Example in Rust
Here is how the management canister is declared in a Rust canister (e.g. `main.rs`):

```rust
//declare the HTTPS outcalls feature of the IC management canister
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse, TransformArgs,
    TransformContext,
};

//public method that uses the HTTPS outcalls management canister
async fn foo() {
    //code that uses the management canister
    let request = CanisterHttpRequestArgument {
        //instantiate the request
    };

    //send the http request
    match http_request(request).await {
        Ok((response,)) => {
            //Ok case 
        }
        Err((r, m)) => {
            //error case
        }
    }
}
```

## The API

As per the Internet Computer Interface Specification, a canister can use the `http_request` method by [following construction](../../../references/ic-interface-spec#ic-http_request):

### The request
The following parameters should be supplied for in the request:

-   `url` - the requested URL. The URL must be valid according to https://www.ietf.org/rfc/rfc3986.txt[RFC-3986] and its length must not exceed `8192`. The URL may specify a custom port number.

-   `max_response_bytes` - optional, specifies the maximal size of the response in bytes. If provided, the value must not exceed `2MB` (`2,000,000B`). The call will be charged based on this parameter. If not provided, the maximum of `2MB` will be used.

-   `method` - currently, only `GET`, `HEAD`, and `POST` are supported

-   `headers` - list of HTTP request headers and their corresponding values

-   `body` - optional, the content of the request's body

-   `transform` - an optional function that transforms raw responses to sanitized responses, and a byte-encoded context that is provided to the function upon invocation, along with the response to be sanitized. If provided, the calling canister itself must export this function.

### Cycles

Cycles to pay for the call must be explicitly transferred with the call, i.e., they are not deducted from the caller's balance implicitly (e.g., as for inter-canister calls).

### The response

The returned response (and the response provided to the `transform` function, if specified) contains the following fields:

-   `status` - the response status (e.g., 200, 404)

-   `headers` - list of HTTP response headers and their corresponding values

-   `body` - the response's body

## Simple example in Motoko

- #### Step 1: Create a project

```bash
dfx new http_motoko_demo
```

- #### Step 2: Replace `main.mo` with the following:

```motoko


```
- #### Step 3: Deploy dapp locally

```bash
dfx start --background
dfx deploy
```

- #### Step 4: Test the dapp

Open the Candid web UI, to call a method that uses the feature.


## Simple example in Rust

```bash
dfx new http_motoko_demo
```

## 1. Create a project

```bash
dfx new https_hello_world
```

## 2. 