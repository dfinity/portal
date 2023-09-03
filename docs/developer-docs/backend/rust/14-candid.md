# 14: Using the Candid UI with a Rust canister

## Overview

Candid is an **interface description language** with the primary purpose of describing the public interface of a service. A service is usually in the form of a program deployed as a canister. Candid is language-agnostic, meaning that it allows for the inter-operation between services and frontends written in different programming languages, including Rust. 

## Prerequisites 

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

## Interacting with a service from a Rust canister

When writing a canister in Rust, the `dfx build` command will ensure that the canister's service description is correctly referenced. The Candid service description, however, will need to be manually written following the writing conventions described in the [Candid specification](https://github.com/dfinity/candid/blob/master/spec/Candid.md#core-grammar).

The following example code displays how a simple Counter application can use a Candid interface to interact with a Rust canister. 

:::info
This example assumes you have a project made with the `dfx new` command, as described in the [quick start](4-quickstart.md) or [deploying canisters](5-deploying.md) pages.
:::

`src/counter_backend/src/lib.rs`:
``` rust
use ic_cdk::{
    api::call::ManualReply,
    export::{candid, Principal},
    init, query, update,
};
use std::cell::{Cell, RefCell};

thread_local! {
    static COUNTER: RefCell<candid::Nat> = RefCell::new(candid::Nat::from(0));
    static OWNER: Cell<Principal> = Cell::new(Principal::from_slice(&[]));
}

#[init]
fn init() {
    OWNER.with(|owner| owner.set(ic_cdk::api::caller()));
}

#[update]
fn inc() {
    ic_cdk::println!("{:?}", OWNER.with(|owner| owner.get()));
    COUNTER.with(|counter| *counter.borrow_mut() += 1u64);
}

#[query(manual_reply = true)]
fn read() -> ManualReply<candid::Nat> {
    COUNTER.with(|counter| ManualReply::one(counter))
}

#[update]
fn write(input: candid::Nat) {
    COUNTER.with(|counter| *counter.borrow_mut() = input);
}
```

`src/counter_backend/counter_backend.did`:

```
service : {
  "inc": () -> ();
  "read": () -> (nat) query;
  "write": (nat) -> ();
}
```

## Using Candid UI in the browser

To use Candid UI in the browser, first you need to deploy your canisters. Using the `src/counter_backend/src/lib.rs` and `src/counter_backend/src/counter.did` files provided above, after these have been saved in a dfx project, they can be deployed with the command:

```
dfx deploy
```

:::info
If you need to create a new dfx project to insert these files into, please see the [deploying canisters page](5-deploying.md).
:::

The output of the `dfx deploy` command will resemble:

```
Deployed canisters.
URLs:
  Frontend canister via browser
    counter_frontend: http://127.0.0.1:8080/?canisterId=ajuq4-ruaaa-aaaaa-qaaga-cai
  Backend canister via Candid interface:
    counter_backend: http://127.0.0.1:8080/?canisterId=aovwi-4maaa-aaaaa-qaagq-cai&id=a4tbr-q4aaa-aaaaa-qaafq-cai
```

To use the Candid UI, navigate to the link specified as the 'Backend canister via Candid interface' URL. In the browser, the Candid UI will look like this:

[Candid UI](../rust/_attachments/CandidUI.png)

This UI interface can be used to call the functions of the `counter` canister. 

## Using Candid for interactions between canisters

For example, if you want to write a `hello` canister that calls the `counter` canister in Rust, the code for the `hello` canister will resemble te following:

`src/hello_backend/src/lib.rs`:

``` rust
use ic_cdk_macros::*;

#[import(canister = "counter")]
struct Counter;

#[update]
async fn greet() -> String {
    let result = Counter::inc(1.into()).await;
    format!("The current counter is {}", result)
}
```

### What this code does

When the import macro on the `counter` canister (the `#[import(canister = "counter")]` declaration) is processed by the `dfx build` command, the `dfx build` command ensures that the `counter` canister identifier and the Candid description are passed to the Rust CDK correctly. 

The Rust CDK then translates the Candid type into the appropriate native Rust type. This translation enables you to call the `inc` method natively, as if it were a Rust function, even if the `counter` canister is implemented in a different language or if you do not have the source code for the imported canister. 

For additional information on the type mapping between Candid and Rust, you can consult the [supported types](../../../references/candid-ref.md) reference section.

For other canisters and tools to interact with the `hello` canister, you need to manually create a `.did` file with the content:

`src/hello_backend/hello_backend.did`

``` candid
service : {
    greet : () -> (text);
}
```

There is also an experimental feature to generate a Candid service description automatically, see this [test case](https://github.com/dfinity/candid/blob/master/rust/candid/tests/types.rs#L99) as an example.

## References

For additional information and libraries to help you create Candid services or canisters in Rust, see the documentation for the [Candid crate](https://docs.rs/candid/), [Rust CDK examples](https://github.com/dfinity/cdk-rs/tree/next/examples) and the [Rust tutorials](../rust/index.md).

## Next steps

To finish the developing backend canisters with Rust guide, check out other [sample](15-samples.md) projects. 