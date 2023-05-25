# How to use HTTPS Outcalls

This tutorial how to use the [HTTPS Outcalls](../index.md) feature of the IC. This feature allows smart contracts to directly make calls to HTTP(S) servers external to the blockchain and use the response in the further processing of the smart contract, without the need of oracles.

## The API



## Key concepts

### IC management canister
* [The IC Management Canister](../../../references/ic-interface-spec#the-ic-management-canister) - In order for a canister to use HTTPS outcalls, it needs to call into the system API of the IC. Canisters can call into the system API by sending messages to the *IC Management Canister*. The intent is to make using the system API as simple as if it were just another canister. Management canister is evoked by using the identifier `"aaaaa-aa"`.

:::note
The IC management canister is just a facade; it does not actually exist as a canister (with isolated state, Wasm code, etc.). 
:::

#### Example in Motoko
Here is how the management canister is declared in a Motoko canister (e.g. `main.mo`):

```motoko
//Needed for declaring the IC management canister
import Types "Types";

actor {

    //declare the IC management canister
    let ic : Types.IC = actor ("aaaaa-aa");

    //code that uses the management canister
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
async fn use_http_outcalls() {
    //code that uses the management canister
}
```


## 1. Create a project

```bash
dfx new https_hello_world
```

## 2. 