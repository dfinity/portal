---
title: Motoko Stable Regions
links:
  Forum Post:
  Proposal: https://github.com/dfinity/motoko/blob/113f9c72edf4ff36bcc6dacc892fdb2f454ac81d/design/StableRegions-20230209.md
eta: Q3 2023
is_community: false
---

The current stable memory module in base has been "experimental" for a long time, and requires a more composable API to
graduate from this status.

Stable regions address the problem that today's ExperimentalStableMemory module only provides a single, monolithic
memory that makes it unsuitable for directly building composable software parts.

Stable regions permit a new API that supports composable use cases.

Stable regions also bring Motoko closer to parity with Rust canister development support today, by giving a
run-time-system-based analogue of a special Rust library for stable data structures that allocates “pages” for them from
stable memory in separate memory regions.
