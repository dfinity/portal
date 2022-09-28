---
title: Chain-key cryptography underpins the IC's security architecture
card: /img/what-is-the-ic/chainkey.jpg
cardImageFit: cover
---
The correct operation of subnets (and inter-subnet communication) relies on a suite of novel cryptographic protocols, collectively referred to as [*chain-key cryptography*](/how-it-works/chain-key-technology/). Chain-key cryptography securely generates private key shares for the BLS signature scheme as part of subnet creation using a non-interactive distributed key generation (NIDKG) protocol. Subnets use BLS threshold signing to authenticate, in a decentralized way,
- responses to user requests,
- the subnet state,
- inter-subnet messages, and
- catch-up packages to allow nodes to join a subnet without the need to re-validate the entire subnet history.

The NNS endorses the public keys of subnets, much like a decentralized certification authority. Users only need the 48-byte BLS public key of the NNS to validate the interaction with any canister.
Traditional blockchains typically require newly joined parties to redo all transactions ever performed on the chain. This is not feasible in a high-throughput system like the IC. Chain-key cryptography is leveraged to provide:

- Subnet membership changes – A replica can join a subnet, by starting from the most recent valid checkpoint, or leave at any point in time.
- Proactive security – Threshold keys of the subnet are periodically reshared between the current nodes of the subnet.
- Permanent public keys – Membership changes and key resharing do not affect the public key of any subnet.
- Garbage collection – Periodically, previous blocks are pruned from each subnet blockchain to prevent storage from growing infinitely.
