---
title: Building a partitioned key-value store with composite queries on the Internet Computer
description: "Today, we’ll dive into composite queries and walk through the process of building a sample app: a partitioned key-value store. Each partition is represented by a single canister. We'll leverage the power of the Internet Computer’s composite queries to efficiently retrieve data from those partition canisters."
tags: [New features]
image: /img/blog/dev-update-blog-composite-query.png
---

# Building a partitioned key-value store with composite queries on the Internet Computer

Welcome to another developer blog post! Today, we’ll dive into composite queries and walk through the process of building a sample dapp: a partitioned key-value store. Each partition is represented by a single canister. We'll leverage the power of the Internet Computer’s composite queries to efficiently retrieve data from those partition canisters.

In essence, the partitioned key-value store is structured as a single frontend with multiple backends. Each backend represents one partition of the key-value store.

![Partitioned key-value store](/img/blog/dev-update-blog-composite-query.png)

## Frontend code
The frontend code does the following for a put and get call:

 * Determines the ID of the canister that holds the partition with the given key.
 * Makes a call into the `get` or `put` function of that canister and parsing of the result.

The following code shows a simplified version of the frontend code. Note the line `#[query(composite = true)]` which is used to leverage the new composite query feature:

```rust
#[query(composite = true)]
async fn frontend_get(key: u128) -> Option<u128> {
    let canister_id = get_partition_for_key(key);
    match call(canister_id, "get", (key, ), ).await {
        Ok(r) => {
            let (res,): (Option<u128>,) = r;
            res
        },
        Err(_) => None,
    }
}
```

For completeness, the `put` code cannot benefit from composite query calls, as adding values to the key value store modifies the canister’s state and therefore needs to be implemented as an `update` call.

```rust
#[update]
async fn put(key: u128, value: u128) -> Option<u128> {
    let canister_id = get_partition_for_key(key);
    match call(canister_id, "put", (key, value), ).await {
        Ok(r) => {
            let (res,): (Option<u128>,) = r;
            res
        },
        Err(_) => None,
    }
}
```

## Backend code
The backend simply stores the key value pairs in a `BTreeMap` in stable memory:

```rust
#[update]
fn put(key: u128, value: u128) -> Option<u128> {
    STORE.with(|store| store.borrow_mut().insert(key, value))
}

#[query]
fn get(key: u128) -> Option<u128> {
    STORE.with(|store| store.borrow().get(&key))
}
```

And that’s it!

The complete code can be found [here](https://github.com/dfinity/examples/tree/master/rust/composite_query).

An alternative implementation for Motoko can be found [here](https://github.com/dfinity/examples/tree/master/motoko/composite_query).

## Using composite queries
To start, let's set up our development environment. Make sure you have [dfx](/docs/building-apps/getting-started/install) installed on your computer. You will need at least version 0.15.0 of dfx for composite query support. Open your terminal and follow these commands:

```bash
DFX_VERSION=0.15.0-beta.1 sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

Then clone the ICP sample apps as follows:

```bash
git clone https://github.com/dfinity/examples.git
```

## Deploy the example canister
We first need to start a local replica instance via dfx and then create and build our frontend canister:

```bash
cd rust/composite_query/src
dfx start
dfx canister create kv_frontend
dfx build kv_frontend
```

During compilation of the fronted canister, the backend canister's wasm code will be compiled and inlined in the frontend canister's wasm code.
Finally, let’s install the frontend canister:

```bash
dfx canister install kv_frontend
```

Excellent! We have our partitioned key-value store set up and ready to go. Now, let's explore its capabilities.

## Interacting with the canister
To add a key-value pair via the frontend canister, run the following command in your terminal:

```bash
$ dfx canister call kv_frontend put '(1, 1337)'
(null)
```

Keep in mind that the first call to put might be slow to respond because the data partition canisters have to be created first.
Now, let's retrieve the value associated with a key using the power of composite queries:

```bash
$ dfx canister call kv_frontend get '(1)'
(opt (42 : nat))
```

As you can see, we can effortlessly fetch the value using composite queries with very low latency.
Let’s now compare the performance of composite query calls with those of an equivalent implementation that leverages calls from update functions: for that, we use the `get_update` method, which contains the exact same logic, but is implemented based on update calls:

```bash
$ dfx canister call kv_frontend get_update '(1)'
(opt (1_337 : nat))
```

We can observe that with update calls we receive the very same result, but the call is at least one order of magnitude slower compared to composite query calls.
Furthermore, we can orchestrate two query calls: first into the frontend canister and then into the data partition canister. This has similar latency as the composite query call, but requires extra logic on the client side.
```bash
$ dfx canister call kv_frontend lookup '(1)'
(1 : nat, "dmalx-m4aaa-aaaaa-qaanq-cai")
$ dfx canister call dmalx-m4aaa-aaaaa-qaanq-cai get '(1: nat)' --query
(1_337 : nat)
```

In summary, by using composite queries, we achieve low latency while keeping the client side simple. This is especially useful for dapps that are scaling vertically by partitioning data across multiple canisters.

Congratulations! You have successfully built a key-value store using Rust and leveraged the powerful composite query feature of the Internet Computer. This allows for efficient retrieval of data from your canisters.

We hope you found this blog post helpful. Happy coding with the composite query feature!
Many thanks to the DFINITY for contributing to the composite query feature: Adam Spofford, Claudio Russo, Martin Raszyk, Robin Künzler, Roel Storms, Stefan Kaestle, Ulan Degenbaev, Yan Chen
