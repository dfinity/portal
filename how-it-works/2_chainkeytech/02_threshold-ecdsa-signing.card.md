---
title: Chain-key transactions
abstract: This feature will enable canister smart contracts to sign with regard to an ECDSA public key while their host subnet has a threshold shared secret key.
coverImage: /img/how-it-works/threshold-ecdsa-signing.600x300.jpg
---

![](/img/how-it-works/threshold-ecdsa-signing.600x300.jpg)

# Chain-key transactions

*Chain-key transactions* extends chain-key technology to allow transactions targeted at other blockchains to be computed fully on-chain using the Internet Computer Protocol.
Using chain-key transactions, the IC can integrate with other blockchains such as Bitcoin and Ethereum in a completely trustless manner without needing any bridges. Canisters can now securely store and transact Bitcoin. The secret key of the Bitcoin is shared between all the nodes running the canister. The canister can trasact Bitcoin (using a chain-key transaction) only when at least 2/3rd of the nodes agree to make the transaction. Indeed, using chain-key transactions is the strongest, most decentralized way of integrating blockchains as no additional trust assumptions besides that of the two blockchains are required, particularly no additional parties that manage signature keys or their shares. 

[Go deeper](/how-it-works/threshold-ecdsa-signing/)

