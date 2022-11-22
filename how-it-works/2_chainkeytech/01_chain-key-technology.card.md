---
title: Chain-key cryptography
---

![](/img/how-it-works/chain-key-technology.600x300.jpg)

# Chain-key cryptography

The Internet Computer protocol uses a toolbox of advanced cryptographic mechanisms, collectively known as *chain-key cryptography*, which allows the IC to achieve functionalities and scalability that are impossible on other blockchains.

A key component of chain-key cryptography is a *threshold signature scheme*, which is like an ordinary digital signature scheme, except that the secret signing key is distributed among all the replicas in a subnet in such a way that the key cannot be stolen by compromising one (or even a large fraction) of the replicas in the subnet. The technology has many benefits including:
1. Anyone can verify the content received from the Internet Computer by simply validating a signature without syncing the entire blockchain. 
2. The topology of IC can evolve autonomously -- New nodes and subnets can be added, faulty nodes can be recovered and protocol can be upgraded autonomously. 
3. A source of unpredictable and unbiasable pseudo-random numbers for canisters. Canisters can securely run algorithms that need randomness. 

[Go deeper](/how-it-works/chain-key-technology/)
