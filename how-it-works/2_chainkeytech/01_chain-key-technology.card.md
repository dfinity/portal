---
title: Chain-key cryptography
---

![](/img/how-it-works/chain-key-technology.600x300.jpg)

# Chain-key cryptography

The Internet Computer protocol uses a toolbox of advanced cryptographic mechanisms, collectively known as *chain-key cryptography*, which allows the IC to achieve functionalities and scalability that are impossible on other blockchains.

A key component of chain-key cryptography is a *threshold signature scheme*, which is like an ordinary digital signature scheme, except that the secret signing key is distributed among all the replicas in a subnet in such a way that the key cannot be stolen by compromising one (or even a large fraction) of the replicas in the subnet. 

Each subnet in the IC is associated with the public verification key of such a threshold signature scheme, which is used in several ways:

1. Most importantly, this public key may be used to verify the outputs of the IC, including responses to ingress messages from external users, as well as messages from one canister to another. This is one of the fundamental differences between the IC and other blockchains: the state of other blockchains can only be validated by running the entire protocol from the genesis block, whereas on the IC, it can be validated just by verifying a single digital signature. As such, this is one of the key technologies that enables unprecedented scalability on the Internet Computer.
2. This public key is also used to verify the entire state of a subnet at regular intervals, which enables a number of functions, such as adding new nodes to a subnet and allowing crashed nodes to quickly catch up to the rest. This enhances both the scalability of the IC and is crucial to enable the topology of the IC to autonomously evolve over time as orchestrated by the NNS.

In addition, these threshold signatures are used as a way to create a source of *unpredictable pseudo-random numbers*, which is used in two ways:

1. as a source of unpredictable and unbiasable pseudo-random numbers available to any smart contract, which is a totally unique feature in the blockchain world that enables applications that would be impossible to implement on other blockchains (for example, an NFT raffle);
2. as a mechanism for pseudo-randomly selecting the leader in the IC consensus protocol, which enhances the efficiency and fairness properties of consensus.

[Go deeper](/how-it-works/chain-key-technology/)
