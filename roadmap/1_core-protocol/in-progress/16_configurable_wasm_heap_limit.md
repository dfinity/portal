---
title: Configurable Wasm Heap Limit
links:
  Forum Link: https://forum.dfinity.org/t/proposal-configurable-wasm-heap-limit/17794
  Proposal: https://dashboard.internetcomputer.org/proposal/105322
eta: 2024
is_community: true
---

The Wasm heap of canisters is limited to 4GiB. The limit is fundamental and
cannot be increased because of 32-bit memory addresses. If a canister uses all
of the available heap space, it will start producing out-of-memory errors and
may stop working, which could lead to data loss and bricking of the canister.
The developer may not realize this until it is too late to fix the issue.

This feature aims to introduce an explicit Wasm heap limit that can be
configured in the canister settings. The default value for this limit will be a
conservative amount, such as 3GiB. If a canister tries to use more memory than
the limit, it will receive an out-of-memory error. This will alert the
developer to the potential memory issue and allow them to safely upgrade the
canister to a version that uses less memory.
