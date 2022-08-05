---
title: Boundary Node/Asset Canister Caching
links:
  Forum Post: https://forum.dfinity.org/t/long-term-r-d-boundary-nodes-proposal/9401
  Proposal: https://dashboard.internetcomputer.org/proposal/35671
eta: Nov 2022
is_community: false
---

Boundary nodes only cache queries for a very short amount of time. Assets (HTML pages, JS sources, images, etc) are not cached. The asset canister does not provide TTL information as to when the assets should expire. This feature would give the assets time-to-live information and expose it to Nginx on the boundary nodes as well as the service worker.
