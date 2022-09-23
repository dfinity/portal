---
title: Low-latency high-throughput consensus
card: /img/what-is-icp/consensus.jpg
cardImageFit: cover
---

The Internet Computer Protocol ensures that nodes of the subnet always hold the same canister state—even if multiple nodes of a subnet (up to less than one third) are faulty or misbehave. The IC is neither a proof-of-work, nor a proof-of-stake network, but a so-called DAO-controlled network, where the NNS DAO manages subnet node membership.
The [consensus protocol](/how-it-works/consensus/) has the following desirable properties:
- Low latency – a small number of rounds of exchange suffice to reach agreement. Normally consensus is reached within 1 to 2 seconds.
- High throughput – Every consensus execution can handle payloads in the order of megabytes.
- Cryptographic finality – IC consensus reaches cryptographically-guaranteed finality, that is, finalized state changes cannot be undone.
- Byzantine fault tolerant (BFT) – Being able to tolerate up to (but less than) one third of arbitrarily faulty nodes is theoretically optimal in the considered partially synchronous communication model.
