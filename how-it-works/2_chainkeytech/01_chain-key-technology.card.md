---
title: Chain-key cryptography
---

![](/img/how-it-works/chain-key-technology.600x300.jpg)

# Chain-key cryptography

The Internet Computer protocol uses a toolbox of advanced cryptographic mechanisms, collectively known as *chain-key cryptography*, which allows the IC to achieve functionalities and scalability that are impossible on other blockchains.

A key component of chain-key cryptography is a *threshold signature scheme*, which is like an ordinary digital signature scheme, except that the secret signing key is distributed among all the replicas in a subnet in such a way that the key cannot be stolen by compromising one (or even a large fraction) of the replicas in the subnet. The technology has many benefits including efficient verification of blockchain outputs, autonomous evolution of the IC topology, a source of unpredictable and unbiasable pseudo-random numbers for canisters.

[Go deeper](/how-it-works/chain-key-technology/)
