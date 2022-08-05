---
title: Custom domain names
links:
  Forum Link: https://forum.dfinity.org/t/long-term-r-d-boundary-nodes-proposal/9401
  Proposal: https://dashboard.internetcomputer.org/proposal/35671
eta:
is_community: false
---

This feature enables users on the IC to use their own custom domains (e.g., foo.com) instead of being restricted to the <canister id>.ic0.app domains. To this end, users configure the DNS entries of their domain to redirect the traffic to the boundary nodes and signal the boundary nodes to which canister the traffic should be forwarded. The boundary nodes automatically manage the required certificates for HTTPS.
