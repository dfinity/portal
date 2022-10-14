---
title: Timers
links:
  Forum Link: https://forum.dfinity.org/t/heartbeat-improvements-timers-community-consideration/14201/53
  Proposal:
eta: December 2022
is_community: false
---

Currently, the Heartbeat is a all or nothing solution: once enabled on canister, it gets called almost every round. This feature will introduce Timers: a flexible way for canisters to be scheduled after a specified minimum delay. The Heartbeat API will remain unchanged and might be discontinued in the future.
