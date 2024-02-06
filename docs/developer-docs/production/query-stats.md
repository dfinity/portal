# Query Stats

## Benefits for programmers

It is important for programmers to understand how users interact with their dapps.
This includes information on the use of query calls.
Query calls are not allowed to modify the canister state and it is therefore not possible to track query calls from the canister code itself.
Even just simply counting the number of query calls is not possible from within canister code, as state changes (including incrementing the counter) will not be committed to the replicated state.

The "query stats" feature attempts to give some generic guides to developers about the use of each canister's query call endpoints.
With this feature, an approximation of some statistics related to query stats are made available to developers as part of the existing canister status API.
Since query statistics collected in the canister status are approximations, they might not capture all query calls, especially for infrequently used canisters.
Query stats are incremented periodically by the system and therefore lack behind the actual query execution by up to one hour.

Query stats currently do not include cached query calls. 

## New entries in canister status

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
./dfx canister status sample_canister
Canister status call result for sample_canister.
Status: Running
[..]
Number of queries: 0
Instructions spent in queries: 0
Total query request paylod size (bytes): 0
Total query response payload size (bytes): 0
```

Query stats are available via `dfx` since XXXXX.


## Retrieve query stats from canister itself
// Basic example + rates with timers
// Pre-requisites: Do we need extra crates? Versions.