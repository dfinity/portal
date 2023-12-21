# Resource limits

## Overview

The Internet Computer uses WebAssembly as the platform for executing messages of smart contracts.
Since WebAssembly is [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness), it can express different kinds of computations including non-terminating computations.
The Internet Computer protects against non-terminating computations by limiting the number of WebAssembly instructions and other resources per message execution.
The limits depend on the message type as shown in the following table.

## Resource constraints and limits

| Message resource limits                                                              | Constraint  |
| ------------------------------------------------------------------------------------ | ----------- |
| Message queue limit, messages per canister                                           | 500         |
| Maximum ingress message payload                                                      | 2MB         |
| Maximum cross-net inter-canister message payload                                     | 2MB         |
| Maximum same-subnet inter-canister message payload (may be deprecated at some point) | 10MB        |
| Maximum response size                                                                | 2MB         |

| Instruction resource limits                                                          | Constraint  |
| ------------------------------------------------------------------------------------ | ----------- |
| Instruction limit, instructions per update call/heartbeat/timer                      | 20 Billion  |
| Instruction limit, instructions per query calls                                      | 5 Billion   |
| Instruction limit, instructions per canister install/upgrade                         | 200 Billion |
| Instruction limit, instructions per inspect_message                                  | 200 Million |

| Subnet limits                                                                        | Constraint  |
| ------------------------------------------------------------------------------------ | ----------- |
| Subnet capacity (total memory available per subnet)                                  | 700GiB      |

| Memory resource limits                                                               | Constraint  |
| ------------------------------------------------------------------------------------ | ----------- |
| Wasm heap memory, per canister                                                       | 4GiB        |
| Wasm stable memory, per canister                                                     | 96GiB       |
| Wasm custom sections, per subnet                                                     | 2GiB        |
| Wasm custom sections, per canister                                                   | 1MiB        |
| Wasm custom sections, sections per canister                                          | 16          |
| Wasm code section, per canister                                                      | 10MiB       |

| Query call resource limits                                                           | Constraint  |
| ------------------------------------------------------------------------------------ | ----------- |
| Query calls execution threads, per replica node                                      | 4           |
| Query calls execution threads, per canister                                          | 2           |

| Update call resource limits                                                          | Constraint  |
| ------------------------------------------------------------------------------------ | ----------- |
| Update calls execution threads, per subnet                                           | 4           |
| Update calls execution threads, per canister                                         | 1           |

## Additional notes

ICP may reject WebAssembly modules for reasons such that:

- They declare more than 50_000 functions.
- They declare more than 1_000 globals.
- They declare more than 16 exported custom sections (the custom section names with prefix icp:).
- The number of all exported functions called `canister_update <name>` or `canister_query <name>` exceeds 1_000.
- The sum of `<name>` lengths in all exported functions called `canister_update <name>` or `canister_query <name>` exceeds 20_000.
- The total size of the exported custom sections exceeds 1MiB.

More information regarding these restrictions can be found in the [Internet Computer interface specification](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-module).
