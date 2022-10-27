---
title: NIDKG
---

![](/img/how-it-works/noninteractive-distributed-key-generation-nidkg.600x300.jpg)

# Non-Interactive Distributed Key Generation

NIDKG is a cryptographic protocol to distributedly generate key shares for each of the nodes participating in a subnet blockchain. It applies advanced cryptography, including encryption with forward secrecy and noninteractive zero-knowledge proofs of correct key sharing.

*Non-Interactive Distributed Key Generation (NIDKG)* is an advanced cryptographic protocol for securely generating a secret-shared private signing key.
The private key is never available in reconstructred form during this process, but generated in the form of shares.
Cryptographic zero-knowledge proofs are used to show to other nodes that protocol messages are computed correctly, allowing everyone to validate the messages.
The protocol is non-interactive, that is, the messages can be validated without interaction with the originator, which makes the scheme both powerful.

NIDKG is run for creating a secret-shared BLS signing key whenever a new subnet is created.
The key is then periodically re-shared among the nodes of the subnet every DKG interval, which coincides with the checkpointing interval, and spans a couple of minutes.
If an attacker manages to obtain some key shares, they will become worthless after the resharing.
This re-sharing thus makes attacking the subnet signing key substantially harder.
The public key corresponding to the secret-shared private key is used to validate signatures the subnet uses to authenticate its state, or for nodes to validate things like catch-up packages when trying to (re-)join a subnet.
The NNS, as a special subnet, signs all other subnet's keys with its own private key, thereby acting as a CA for the IC.
Thus, anybody interacting with the IC only needs to have the NNS's public key in order to interact with (any subnet of) the IC.

[Go deeper](/how-it-works/noninteractive-distributed-key-generation-nidkg/)

