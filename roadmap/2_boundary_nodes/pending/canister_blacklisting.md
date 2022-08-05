---
title: Canister Blacklisting on Boundary Nodes
links:
  Forum Link: https://forum.dfinity.org/t/long-term-r-d-boundary-nodes-proposal/9401
  Proposal: https://dashboard.internetcomputer.org/proposal/35671
eta:
is_community: false
---

**What?** Provide a means to boundary node providers to specify a blacklist for canisters. If a canister c is on the backlist of a boundary node b, then no query or update call to c shall be routed through b. Optional: the blacklist configured for a boundary node shall be publicly visible.

**Why?** Node providers are the first to be contacted if questionableof questionable content is stored on the IC. If they can independently block such content, then they can comply with local regulations. If we have many different boundary nodes that each can make their own decision, and users can choose which boundary node to use, then this approach can be seen as decentralized.
