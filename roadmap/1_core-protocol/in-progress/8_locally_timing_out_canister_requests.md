---
title: Locally timing out canister requests
links:
  Forum Link: https://forum.dfinity.org/t/long-term-r-d-scalability-proposal/9387
  Proposal:
eta: December 2022
is_community: false
---

As opposed to ingress messages, canister-to-canister messages can not timeout at the moment. This feature will introduce the possiblity for the system to timeout canister-to-canister requests in high-load phases, thereby improving responsiveness of canister-to-canister messaging.

This feature is backward compatible in that it doesn't change the behavior of the system as defined by the interface specification and consequently also doesn't break old canisters. In particular, these timeouts do not invalidate any of the canister-to-canister messaging guarantees given today. Timeouts are simply synthetic reject responses produced by the system, analogously to synthetic rejects responses that are already produced today when queues are full. 

