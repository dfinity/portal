# 6: Inter-canister calls

## Overview

Inter-canister calls can be used to update information between two or more canisters. 

To demonstrate these inter-canister calls, we'll use an example project called "PubSub". 

A common problem in both distributed and decentralized systems is keeping separate services (or canisters) synchronized with one another. While there are many potential solutions to this problem, a popular one is the **publisher/subscriber** pattern or "PubSub". PubSub is an especially valuable pattern on the Internet Computer as its primary drawback, message delivery failures, does not apply.

## Prerequisites 

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

Then, download the sample project's files with the commands:

```
git clone https://github.com/dfinity/examples/
cd examples/rust/pub-sub/
```

## Viewing the canister code

This project is comprised of two canisters: publisher and subscriber. 

The **subscriber** canister contains a record of topics. The **publisher** canister uses inter-canister calls to add topics to the record within the subscriber canister. 

Let's take a look at the `src/lib.rs` file for each of these canisters.

`src/publisher/src/lib.rs`:

```rust
use candid::{CandidType, Principal};
use ic_cdk::update;
use serde::Deserialize;
use std::cell::RefCell;
use std::collections::BTreeMap;

type SubscriberStore = BTreeMap<Principal, Subscriber>;

thread_local! {
    static SUBSCRIBERS: RefCell<SubscriberStore> = RefCell::default();
}

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Counter {
    topic: String,
    value: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Subscriber {
    topic: String,
}

#[update]
fn subscribe(subscriber: Subscriber) {
    let subscriber_principal_id = ic_cdk::caller();
    SUBSCRIBERS.with(|subscribers| {
        subscribers
            .borrow_mut()
            .insert(subscriber_principal_id, subscriber)
    });
}

#[update]
async fn publish(counter: Counter) {
    SUBSCRIBERS.with(|subscribers| {
        // In this example, we are explicitly ignoring the error.
        for (k, v) in subscribers.borrow().iter() {
            if v.topic == counter.topic {
                let _call_result: Result<(), _> =
                    ic_cdk::notify(*k, "update_count", (&counter,));
            }
        }
    });    
}
```

In this code, you can see two inter-canister update calls: `fn subscribe(subscriber: Subscriber)` and `async fn publish(counter: Counter)`. The first method allows for the publisher canister to make a call to the subscriber canister and subscribe to topics. The second method allows the publisher canister to publish information into a topic in the subscribers canister. 

`src/subscriber/src/lib.rs`:

```rust
use candid::{CandidType, Principal};
use ic_cdk::{update, query};
use serde::Deserialize;
use std::cell::Cell;

thread_local! {
    static COUNTER: Cell<u64> = Cell::new(0);
}

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Counter {
    topic: String,
    value: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Subscriber {
    topic: String,
}

#[update]
async fn setup_subscribe(publisher_id: Principal, topic: String) {
    let subscriber = Subscriber { topic };
    let _call_result: Result<(), _> =
        ic_cdk::call(publisher_id, "subscribe", (subscriber,)).await;
}

#[update]
fn update_count(counter: Counter) {
    COUNTER.with(|c| {
        c.set(c.get() + counter.value);
    });
}

#[query]
fn get_count() -> u64 {
    COUNTER.with(|c| {
        c.get()
    })
}
```

In this code, there are three main methods: two inter-canister update methods and a query method. 

The first method, `async fn setup_subscribe(publisher_id: Principal, topic: String)` provides functionality for the publisher canister to subscribe to topics within the `subscriber` canister. This function is called by the publisher canister. 

The second method, `fn update_count(counter: Counter)` updates the counter record for each published value in a topic within the subscriber canister. 

The third method, `fn get_count() -> u64` allows the `Counter` value to be queried and returned in a call. 

## Deploying the canisters

Now that we've taken a look at our canisters, let's deploy them. 

Open a terminal window on your local computer, if you don’t already have one open.

Then run the commands:

```
dfx start --clean --background
dfx deploy
```

## Making inter-canister calls

First, let's subscribe to a topic. For example, to subscribe to the "Apples" topic, use the command:

```
dfx canister call subscriber init '("Apples")'
```

Then, to publish a record to the "Apples" topic, use the command:

```
dfx canister call publisher publish '(record { "topic" = "Apples"; "value" = 2 })'
```

Then, you can query and receive the subscription record value with the command:

```
dfx canister call subscriber getCount
```

The output should resemble the following:

```
(2 : nat)
```

## Next steps

Next, let's cover how to [upgrade canisters](./7-upgrading.md).
