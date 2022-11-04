---
title: Chain-key transactions
abstract: This feature will enable canister smart contracts to sign with regard to an ECDSA public key while their host subnet has a threshold shared secret key.
coverImage: /img/how-it-works/threshold-ecdsa-signing.600x300.jpg
---

![](/img/how-it-works/threshold-ecdsa-signing.600x300.jpg)

# Chain-key transactions

*Chain-key transactions* extends chain-key technology to allow transactions targeted at other blockchains to be computed fully on-chain using the Internet Computer Protocol.
Using chain-key transactions, the IC can integrate with other blockchains in a completely trustless manner.
Indeed, using chain-key transactions is the strongest, most decentralized way of integrating blockchains as no additional trust assumptions besides that of the two blockchains are required, particularly no additional parties that manage signature keys or their shares.

Just like chain-key technology, a key component of chain-key transactions is threshold signatures.
However, in order to work with other blockchains, the IC must use threshold signatures that are compatible with the digital signature schemes of those other blockchains.
By far, the most commonly used signature scheme used on other blockchains (including Bitcoin and Ethereum) is the [ECDSA signature scheme](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm).
Because of this, *threshold ECDSA* signatures are currently supported on the IC, with implementations of other threshold signature schemes in the planning stages.

ECDSA signatures are widely used in the blockchain industry. This feature will enable canister smart contracts to have an ECDSA public key and to sign with regard to it. The corresponding secret key is threshold-shared among the nodes of the subnet holding the canister smart contract. This is a prerequisite for the direct integration between the Internet Computer and Bitcoin and Ethereum.

[Go deeper](/how-it-works/threshold-ecdsa-signing/)

