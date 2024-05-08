---
title: Off chain observability stack for Node Providers
links:
  Forum Post:
  Proposal:
eta:
is_community: false
---

The node providers a) do not have access to the logs and metrics from their node, and b) do not have access to the alerts we have in place. Therefore, the node providers can not monitor the health status of their nodes. The objective is to make a observability solution available for node providers that allows them to independently triage the node health and decide whether a nodes needs to be redeployed, and to independently understand an underlying cause of a node being unhealthy.
