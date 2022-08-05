---
title: Nodes Can be Reassigned to a Different Subnet
links:
  Forum Link:
  Proposal:
eta: March 2022
---

Currently, the only way to reassign a node from one subnet to another is by redeploying the node from scratch, a tedious and error-prone process. This feature will allow nodes to be reassigned to other subnets through simple NNS proposals. Nodes will leave their old subnet “gracefully”, meaning, without having to count the departing node to the budget of faulty/malicious nodes in the subnet.
