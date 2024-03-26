# Query stats

## Overview

When users interact with a dapp, query calls may be used. Query calls cannot modify a canister's state, making it impossible to track them from the canister's code. 

The **query stats** feature gives developers information about the use of each canister's query calls.
An approximation of some statistics related to query stats are made available to developers as part of the existing canister status API.

:::note
The statistics collected in the canister status are an approximation. 
They might not capture all query calls, especially for infrequently used canisters.
Query stats are collected in intervals by the system and therefore may lag behind the actual query execution by up to 30 mins.
:::

:::caution
Statistics of composite queries are not collected at the moment. This restriction will be lifted soon.
:::

## Canister status entries

The feature exposes the following fields to the canister status endpoint:

 - A counter for the total number of query calls executed by that canister.
 - The sum of all instructions executed by the canister for query calls.
 - The sum of the payload sizes of all query requests to the canister.
 - The sum of the payload sizes of all query responses from the canister.

Each value represents the total count since the canister has been created.
Rates for these values can be calculated from multiple calls to the canister status and observing the difference between the values in different calls.
All values are monotonically increasing.

## Retrieve query stats using `dfx`

`dfx` can be used to return a canister's query stats:

```
dfx canister status sample_canister
```

This will return output such as:

```
Canister status call result for sample_canister.
Status: Running
[..]
Number of queries: 0
Instructions spent in queries: 0
Total query request paylod size (bytes): 0
Total query response payload size (bytes): 0
```

Query stats are available via `dfx` since version `0.16.1`.


## Use query stats programatically

It's also possible to programatically retrieve query stats from within the canister via the canister status method. The following is an example of how to do this
in Rust:

```rust
let canister_status = canister_status(CanisterIdRecord {
    canister_id: ic_cdk::id(),
})
.await.unwrap();
let query_stats = canister_status.0.query_stats;
```

This is supported in `ic-cdk` since version `0.12.1`.
