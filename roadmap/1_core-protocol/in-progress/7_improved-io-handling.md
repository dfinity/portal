---
title: Improved I/O Handling in State Manager
links:
  Forum Link: https://forum.dfinity.org/t/long-term-r-d-scalability-proposal/9387
  Proposal:
eta: 
is_community: false
---

This feature is a collection of improvements to how we interact with the disk in the state manager. By reducing the number of interactions, or taking them out of the state machine loop, we can reduce the instances where the state manager blocks, or otherwise interferes with, execution. The work in this feature is important to make sure that the IC can keep up with the scalability requirements.
