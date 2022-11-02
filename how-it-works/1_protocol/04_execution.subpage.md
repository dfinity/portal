---
title: "Internet Computer Execution Layer"
abstract: 
shareImage: /img/how-it-works/network-nervous-system-nns.600.jpg
slug: execution-layer
---

The execution layer processes one input at a time. This input is taken from one of the
input queues, and is directed to one canister. Based on this input and the state of the
canister, the execution environment updates the state of the canister, and additionally may
add messages to output queues and update the ingress history (possibly with a response to
an earlier ingress message).