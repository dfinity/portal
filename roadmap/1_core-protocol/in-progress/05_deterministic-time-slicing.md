---
title: Deterministic Time Slicing
links:
  Forum Link: https://forum.dfinity.org/t/deterministic-time-slicing/10635
  Proposal:
eta: May 2023
is_community: false
in_beta: true
---

Currently, the computation a canister call can perform is hard bounded per round. Deterministic time slicing allows for long(er) running, multi-round computations by suspending the execution at the end of one round and resuming it in the next.
