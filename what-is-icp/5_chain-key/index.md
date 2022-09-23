---
title: What is Chain-key Cryptography

card: /img/roadmap/core-protocol.card.jpg
overlay: /img/roadmap/core-protocol.overlay.jpg
---
A core motivation of the IC is to facilitate a scalable and secure computing environment. Above we see how canisters maintain state, and how powerful they can be, but their correct execution relies on chain-key cryptography.
Scalability is granted by the fact that chain-key cryptography allows the IC to construct a signing and certification architecture to onboard and update nodes, and to connect subnets.
Security on the IC is achieved by leveraging threshold cryptography, whereby a subnet's keys are secret-shared across nodes in the subnet. This allows honest nodes to collectively sign messages and prevents dishonest nodes from forging signatures. The subnet can sign messages under this key even if up to a third of the nodes are faulty. Subnets also use chain-key cryptography to securely communicate among themselves (elegantly solving the consistency problem that other sharding mechanisms fail to solve).

  
