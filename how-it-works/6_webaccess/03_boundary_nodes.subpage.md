---
title: Boundary nodes
abstract:
shareImage: /img/how-it-works/outcalls.600x300.png
slug: boundary-nodes
---

![](/img/how-it-works/outcalls.600x300.png)

# Boundary nodes

The boundary nodes form the globally distributed edge of the Internet Computer (IC)
through which all the accesses to the canister smart contracts go. The boundary
nodes provide a public endpoint for the IC and route all incoming requests to
the right subnet, loadbalance requests across replica nodes, and cache responses
for improved performance.

The boundary nodes provide two ways of accessing canister smart contracts hosted
on the Internet Computer: first, one can access them using stock browsers through
the HTTP gateway, and second, one can access them using API canister calls
through the API boundary node.

The HTTP gateway allows users to access the dapps hosted on the IC through their
browsers the same way they are used to accessing any Web 2.0 service. To this end,
the HTTP gateway translates all incoming HTTP requests into API canister calls,
which are then routed to the right subnet.

The API boundary node allows IC native applications to directly call the
canister smart contracts. In this case, the boundary node simply routes the API
canister calls to the right subnet. Hence, no trust is required between the
user and the boundary node.

Both the HTTP gateway and the API boundary node are currently combined into the
boundary node. Work to separate the two into two independent services is ongoing.
Once complete, the API boundary nodes will be fully under the control of the NNS,
while the HTTP gateways can be run by anyone in the community ensuring compliance
with local jurisdictions.
[For more information check our updates in the forum.](https://forum.dfinity.org/t/boundary-node-roadmap/15562)

In addition to the two endpoints, the boundary nodes provide to access the IC,
the boundary nodes also provide caching to improve the performance of the dapps
hosted on the IC.
