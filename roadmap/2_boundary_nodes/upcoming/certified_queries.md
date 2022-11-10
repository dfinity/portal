---
title: Certified Queries
links:
  Forum Link:
  Proposal:
eta:
is_community: false
---

While query calls have very good performance, they only allow to serve static assets without having to forgo certification and giving up security. Certified queries allow to secure all query calls (even for dynamic responses) by having the boundary nodes issuing the query to multiple replicas at once, aggregating their signed responses and sending that back to the client.
