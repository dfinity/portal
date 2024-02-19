# Composite queries
## Overview
The Internet Computer Protocol supports two types of messages: updates and queries. An update message is executed on all nodes and persists canister state changes. A query message discards state changes and typically executes on a single node. It is possible to execute a query message as an update. In such a case, the query still discards the state changes, but the execution happens on all nodes and the result of execution goes through consensus. This “query-as-update” execution mode is also known as replicated query.

An update can call other updates and queries. However a query cannot make any calls, which can hinder development of scalable decentralized applications (dapps), especially those that shard data across multiple canisters.

Composite queries solve this problem. A composite query is a new type of query that you can add to your canister using the following annotations:

 * Candid: `composite_query`
 * Azle: `$query`; in combination with `async`
 * Motoko: `composite query`
 * Rust: `#[query(composite = true)]`

Users and the client-side JavaScript code can invoke a composite query endpoint of a canister using the same query URL as for existing regular queries. In contrast to regular queries, a composite query can call other composite and regular queries. Due to limitations of the current implementation, composite queries have two restrictions:

 * A composite query cannot call canisters on another subnet.
 * A composite query cannot be executed as an update. As a result, updates cannot call composite queries.

These restrictions will be hopefully lifted in future implementations.

Composite queries are enabled in the following releases:

| Platform / Language        | Version |
| -------------------------- | ------- |
| Internet computer mainnet  | Release [7742d96ddd30aa6b607c9d2d4093a7b714f5b25b](https://nns.ic0.app/proposal/?u=qoctq-giaaa-aaaaa-aaaea-cai&proposal=123311)     |
| Candid                     | [2023-06-30 (Rust 0.9.0)](https://github.com/dfinity/candid/blob/master/Changelog.md#2023-06-30-rust-090)     |
| Motoko                     | [0.9.4](https://github.com/dfinity/motoko/releases/tag/0.9.4), revision: [2d9902f](https://github.com/dfinity/motoko/commit/2d9902fb75bb04e377c28913c311aa2be373e159)    |
| Rust                       | [0.6.8](https://github.com/dfinity/cdk-rs/blob/219ae179b9c5ef0ebfff20b926a90f6624ebe704/src/ic-cdk/CHANGELOG.md#068---2022-11-28)    |
| Azle                       | [0.11.0](https://github.com/demergent-labs/azle/releases/tag/0.11.0)    |


## Code example
As an example, consider a partitioned key-value store, where a single frontend does the following for a `put` and `get` call:

- First, determines the ID of the data partition canister that holds the value with the given key.
- Then, makes a call into the `get` or `put` function of that canister and parses the result.

Below is a simplified example of the frontend code. Take note of the line `#[query(composite = true)]` which is used to leverage the new composite query feature:

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

The backend simply stores the key value pairs in a `BTreeMap` in stable memory:

```rust
#[query]
fn get(key: u128) -> Option<u128> {
	STORE.with(|store| store.borrow().get(&key))
}
```

## Using composite queries
### Prerequisites
 - [x] [Download and install the IC SDK.](/docs/current/developer-docs/getting-started/install/)
 - [x] [Download and install git.](https://git-scm.com/downloads)

### Setting up the canisters
### Step 1: Open a terminal window and clone the DFINITY examples repo with the command:

```bash
git clone https://github.com/dfinity/examples.git
```

### Step 2: Navigate into the `rust/composite_query/src` directory, start a local replica, and build the frontend canister with the commands:

```bash
cd rust/composite_query/src
dfx start
dfx canister create kv_frontend
dfx build kv_frontend
During compilation of the fronted canister, the backend canister's wasm code will be compiled and inlined in the frontend canister's wasm code.

### Step 3: Then, install the frontend canister with the command:
dfx canister install kv_frontend
```

### Interacting with the canisters
### Step 1: To add a key-value pair via the frontend canister, run the following command:

```bash
dfx canister call kv_frontend put '(1, 1337)'
```

:::note
The first call to put might be slow to respond because the data partition canisters have to be created first.
:::

The output should resemble the following indicating that no value has previously been registered for this key:
```(null)```

### Step 2: Retrieve the value associated with a key using composite queries with the command:

```bash
dfx canister call kv_frontend get '(1)'
```

The output should resemble the following:
```(opt (1337 : nat))```

This workflow displays the ability to fetch the value using composite queries with very low latency.

### Comparing composite queries to calls from update functions
Let’s now compare the performance of composite query calls with those of an equivalent implementation that leverages calls from update functions. To do this, you will use the `get_update` method, which contains the exact same logic, but is implemented based on update calls. Run the following command in your terminal window:

```bash
dfx canister call kv_frontend get_update '(1)'
```

The output will resemble the following:
```(opt (1_337 : nat))```

You can observe that with update calls you receive the very same result, but the call is at least one order of magnitude slower compared to composite query calls.

:::note
The examples repository also contains an equivalent [Motoko example](https://github.com/dfinity/examples/tree/master/motoko/composite_query).
:::

## Resources
The following example canisters demonstrate how to use composite queries:

 * [Azle example](https://github.com/demergent-labs/azle/tree/main/examples/composite_queries)
 * [Motoko example](https://github.com/dfinity/examples/tree/master/motoko/composite_query)
 * [Rust example](https://github.com/dfinity/examples/tree/master/rust/composite_query)

Feedback and suggestions can be contributed on the forum here: [https://forum.dfinity.org/t/proposal-composite-queries/15979](https://forum.dfinity.org/t/proposal-composite-queries/15979)
