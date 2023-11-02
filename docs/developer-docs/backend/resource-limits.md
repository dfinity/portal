# Resource constraints and limits on the Internet Computer

## Overview

This section defines the current main constraints regarding resource usage on the Internet Computer that developers should be aware of.

## Resource constraints and limits

| Resource          | Constraint            |
|-------------------|-----------------------|
| Canister queue limit | 500 messages        |
| Maximum ingress and cross-net inter-canister call payload | 2MB |
| Maximum same-subnet inter-canister call payload (may be deprecated at some point)| 10MB |
| Maximum response size | 2MB |
| Instruction limit per update call/heartbeat/timer | 20B per method invocation |
| Instruction limit query calls | 5B |
| Instruction limit for canister install and upgrade | 200B |
| Subnet capacity | 700GB |
| Wasm heap size | 4GB |
| Wasm stable memory | 96GB |
| Wasm custom sections| 2GB per subnet; 1MB per canister; 16 sections at most (per canister)|
| Wasm code section | 10MB |
| Query calls execution threads | 4 per replica node, max 2 per canister |
| Update calls execution threads| 4 per subnet |


## Additional notes

The IC may reject WebAssembly modules for reasons such that:

- They declare more than 50_000 functions.
- They declare more than 1_000 globals.
- They declare more than 16 exported custom sections (the custom section names with prefix icp:).
- The number of all exported functions called `canister_update <name>` or `canister_query <name>` exceeds 1_000.
- The sum of `<name>` lengths in all exported functions called `canister_update <name>` or `canister_query <name>` exceeds 20_000.
- The total size of the exported custom sections exceeds 1MiB.

More information regarding these restrictions can be found in the [Internet Computer interface specification](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-module).
