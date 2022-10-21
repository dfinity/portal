---
title: ECDSA key rotation and resharing
links:
  Forum Link: https://forum.dfinity.org/t/threshold-ecdsa-signatures/6152/245
eta: 2022
is_community: false
in_beta: false
---

To make the threshold ECDSA feature as secure as possible, all ECDSA secret shares are periodically refreshed by resharing the secret key. The encryption keys that are used in this distributed key generation protocol are also regularly updated by the nodes. This makes it harder for an attacker to steal sufficiently many ECDSA key shares, as the attack now has to be performed in a small time window. 