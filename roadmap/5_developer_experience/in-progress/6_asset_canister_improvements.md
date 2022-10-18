---
title: Asset Canister Improvements
links:
  Forum Link:
  Proposal:
eta: Q4 22
is_community: false
---
Boundary nodes only cache queries for a very short amount of time. Assets (HTML pages, JS sources, images, etc) are not cached. The asset canister does not provide TTL information as to when the assets should expire. This feature gives the assets time-to-live information and expose it on the boundary nodes as well as the service worker.
