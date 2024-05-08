---
title: Canister Lifecycle Hooks
links:
  Forum Link: https://forum.dfinity.org/t/canister-lifecycle-hooks/17089
  Proposal: https://dashboard.internetcomputer.org/proposal/106146
eta:
is_community: true
---

Currently, developers have to actively monitor their canisters by periodically
polling the cycle balance and the memory usage of the canisters. Periodic
polling is inefficient in terms of resource usage and difficult to maintain for
dapps with many canisters.

This feature aims to improve the monitoring and observability of canisters by
introducing a push model, where the canister is automatically notified when it
is low on cycles and memory.
