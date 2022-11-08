---
title: Low-latency high-throughput consensus
card: /img/what-is-the-ic/consensus.jpg
cardImageFit: cover
---

The Internet Computer Protocol ensures that the canister state on any subnet is always consistent—even if multiple nodes of a subnet are faulty or misbehave. The IC is neither a proof-of-work, nor a proof-of-stake network, but a so-called DAO-controlled network, where the NNS DAO manages subnet node membership. The [consensus protocol](/how-it-works/consensus/) has the following properties:

* Low latency – A small number of rounds of exchange suffice to reach agreement. Consensus is normally reached within 1 to 2 seconds.
* High throughput – Every consensus execution can handle payloads in the order of megabytes.
* Cryptographic finality – IC consensus reaches cryptographically-guaranteed finality, that is, finalized state changes cannot be undone.
* Byzantine fault tolerance (BFT) – The IC can tolerate up to (but less than) one third of arbitrarily faulty nodes.
