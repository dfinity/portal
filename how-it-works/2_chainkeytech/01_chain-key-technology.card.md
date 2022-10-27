---
title: Chain key cryptography
---

![](/img/how-it-works/chain-key-technology.600x300.jpg)

# Chain key cryptography

The Internet Computer protocol is powered by Chain-key cryptography, a toolbox of advanced cryptographic mechanisms enabling the decentralized operation of the Internet Computer.
The advanced chain-key cryptography is one of the biggest strengths of the Internet Computer when comparing with other blockchains.
Chain-key cryptography solves the challenge of securely setting up key shares among the nodes of a subnet for the BLS threshold signature scheme, i.e., a scheme, where only a quorum of some minimal size can create signatures together.
The protocol ensures that if less than one third of the nodes in the subnet are compromised, the properly-operating nodes in the subnet will receive a private key share securely.
The key shares are renewed periodically to further increase security.

Consensus uses the *random beacon* mechanism, a unique BLS threshold signature computed in every round, as an unpredictable and unbiasable random number source to rank the block makers.
The execution layer uses a mechanism similar to the random beacon, the *random tape*, to provide an unpredictable and unbiasable random number source to any smart contract – something unique in the blockchain world.

Message routing certifies parts of the subnet state in every round of the IC using the secret-shared BLS threshold signing key.
This is crucial for authenticating xnet inter-canister messages or responses to user's ingress messages.

Another quite unique part of this toolbox is cryptography for *chain-key transactions*,
which are used to make cross-chain transactions to other blockchain networks, i.e., to write to other blockchains without any bridge.
Currently, a *threshold ECDSA* protocol for realizing chain-key transactions with any other blockchain that supports the ECDSA signature scheme for signing transactions is available.

[Go deeper](/how-it-works/chain-key-technology/)

