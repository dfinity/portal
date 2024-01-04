# Query Stats

## Benefits for programmers

It is important for programmers to understand how users interact with their dapps.
This includes information on the use of query calls.
Query calls are not allowed to modify the canister state and it is therefore difficult to track query calls from the canister code itself.
Even a simple counter for the number of calls cannot be implemented in the canister code, as changes including incrementing the counter will not be committed to the replicated state.

The "query stats" feature attempts to give some generic guides to developers about the use of each canister's query call endpoints.
Statistics collected in the canister status are approximations and might not capture all query calls, especially for infrequently used canisters.
Query stats are incremented periodically by the system and therefore lack behind the actual query execution.

Those metrics currently do not include cached query calls.

## New entries in canister status

The feature adds a new field to the canister status which includes:

 - A counter for the total number of query calls executed by that canister
 - The sum of all instructions executed by the canister for query calls
 - The sum of the payload sizes of all query requests to the canister
 - The sum of the payload sizes of all query responses from the canister

// Link to cycle cost pages or resource limits page (if needed)

## Retrieve query stats from SDK
// SDK example
// Pre-requisites: Do we need extra crates? Versions.

## Retrieve query stats from canister itself
// Basic example + rates with timers
// Pre-requisites: Do we need extra crates? Versions.