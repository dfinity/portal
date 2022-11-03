---
title: Boundary nodes
abstract:
shareImage: /img/how-it-works/outcalls.600x300.png
slug: boundary-nodes
---

![](/img/how-it-works/outcalls.600x300.png)

# Boundary nodes

The boundary nodes form the globally distributed edge of the Internet Computer (IC), which provides access to the canister smart contracts hosted on chain. The boundary nodes route all requests to the right subnet and loadbalance these requests among the subnet’s replica nodes. In addition, the boundary nodes provide caching and other services for improved performance.

The boundary nodes provide two end points to interact with the IC: an HTTP and an API canister call endpoint:

The HTTP endpoint allows users to access the dapps hosted 100% on-chain through stock browsers without requiring any additional extensions. To this end, the boundary nodes translate all HTTP requests into API canister calls, which are then routed to the right subnet.

The API endpoint allows IC native applications (e.g., mobile applications or an IC-browser) to directly call the canister smart contracts.

In addition, the boundary nodes act as a globally-distributed cache for the IC to improve the performance of the dapps hosted on the IC.
