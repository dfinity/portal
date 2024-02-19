# Query stats

## Overview

When users interact with a dapp, query calls may be used. Query calls cannot modify a canister's state, making it impossible to track query calls from the canister's code. 

The **query stats** feature gives developers information about the use of each canister's query call endpoints. With this feature, an approximation of some statistics related to query stats are made available to developers as part of the existing canister status API.

:::caution
Since query statistics collected in the canister status are approximations, they might not capture all query calls, especially for infrequently used canisters. Query stats are incremented periodically by the system, and therefore lag behind the actual query execution by up to one hour.
:::

Query stats currently do not include cached query calls. 

## Canister status entries

The feature adds a new field to the canister status which includes:

 - A counter for the total number of query calls executed by that canister
 - The sum of all instructions executed by the canister for query calls
 - The sum of the payload sizes of all query requests to the canister
 - The sum of the payload sizes of all query responses from the canister

All values are monotonically increasing, i.e. the values in those counters never decrease.
The value represents the total count since the canister has been created.

Rates for those values an be calculated from multiple calls to the canister status and observing the difference between the values in different calls.

// When is the canister status reset?

// Link to cycle cost pages or resource limits page (if needed)

## Retrieve query stats from SDK

Retriving query stats from `dfx` is straight forward:

```
dfx canister status sample_canister

This will return output such as:


Canister status call result for sample_canister.
Status: Running
[..]
Number of queries: 0
Instructions spent in queries: 0
Total query request paylod size (bytes): 0
Total query response payload size (bytes): 0


Query stats are available via `dfx` since XXXXX.


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

This is supported from `ic-cdk` commit `c01fc1741eb3fec2df0bb4e5c5ff54fa027a6091` and higher.