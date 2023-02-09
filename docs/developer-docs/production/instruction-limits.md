# Instruction Limits

The Internet Computer uses WebAssembly as the platform for executing messages of smart contracts.
Since WebAssembly is [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness), it can express different kinds of computations including non-terminating computations.
The Internet Computer protects against non-terminating computations by limiting the number of WebAssembly instructions per message execution.
The instruction limit depends on the message type as shown in the following table.

| Message type                 | Instruction limit        |
|------------------------------|--------------------------|
| Update messages              | 20 billion instructions  |
| Query messages               | 5 billion instructions   |
| Heartbeats and timers        | 5 billion instructions   |
| Canister install and upgrade | 200 billion instructions |

**Notes:**
* The instruction limit for update messages, heartbeats, and timers is [planned](https://forum.dfinity.org/t/deterministic-time-slicing/10635) to be raised to 30 billion instructions in near future.
