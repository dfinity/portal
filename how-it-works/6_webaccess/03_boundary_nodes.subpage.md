---
title: Boundary nodes
abstract:
shareImage: /img/how-it-works/boundary-nodes.jpg
slug: boundary-nodes
---

The boundary nodes form the globally distributed edge of the Internet Computer (IC) through which all the accesses to the canister smart contracts go. The boundary nodes provide a public endpoint for the IC and route all incoming requests to the right subnet, loadbalance requests across replica nodes, and cache responses for improved performance.

<figure>
<img src="/img/how-it-works/boundary-nodes.webp" alt="Architecture of boundary nodes" title="Architecture of boundary nodes" align="center" />
<figcaption align="left">
Boundary nodes are the gateway to the Internet Computer, which allow users to seamlessly access the canister smart contracts.
</figcaption>
</figure>

The boundary nodes provide two ways of accessing canister smart contracts hosted on the Internet Computer: first, one can access them using stock browsers through the HTTP gateway, and second, one can access them using API canister calls through the API boundary node.

The HTTP gateway allows users to access the dapps hosted on the IC through their browsers the same way they are used to accessing any Web 2.0 service. To this end, the HTTP gateway translates all incoming HTTP requests into API canister calls, which are then routed to the right subnet.

The API boundary node allows IC native applications to directly call the canister smart contracts. In this case, the boundary node simply routes the API canister calls to the right subnet. Hence, no trust is required between the user and the boundary node.

Both the HTTP gateway and the API boundary node are currently combined into the boundary node. Work to separate the two into two independent services is ongoing. The first proposal to deploy API boundary nodes under the control of the NNS has been adopted. The next step is to create the HTTP gateways, that can be run by anyone, and shift the traffic from the existing boundary nodes to the HTTP gateways and API boundary nodes. [For more information on the current state check the updates in the forum.](https://forum.dfinity.org/t/boundary-node-roadmap/15562)

In addition to the two endpoints, the boundary nodes provide to access the IC, the boundary nodes also provide caching to improve the performance and a [custom domains service](/docs/current/developer-docs/web-apps/custom-domains/using-custom-domains).

## Go Even Deeper

[Boundary Nodes on the IC Wiki](https://wiki.internetcomputer.org/wiki/Boundary_Nodes)
