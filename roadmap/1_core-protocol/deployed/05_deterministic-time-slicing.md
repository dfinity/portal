---
title: Deterministic Time Slicing
links:
  Forum Link: https://forum.dfinity.org/t/deterministic-time-slicing/10635
  Proposal:
eta: 2023
is_community: false
in_beta: true
---

Deterministic time slicing allows for long(er) running, multi-round computations by suspending the execution at the end of one round and resuming it in the next.

The feature is currently enabled on all application and verified application subnets.
All messages except for queries are automatically sliced and executed in multiple rounds.
The instruction limit for such messages has been increased from 5 billion instructions to 20 billion instructions.
Further increases will follow after the "Configurable Wasm Heap Limit" feature ships.
