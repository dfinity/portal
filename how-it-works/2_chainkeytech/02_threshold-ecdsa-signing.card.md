---
title: Chain-key signatures
abstract: This feature will enable canister smart contracts to sign with regard to an ECDSA public key while their host subnet has a threshold shared secret key.
coverImage: /img/how-it-works/chain-key-signature.webp
---

![](/img/how-it-works/chain-key-signature.webp)

# Chain-key signatures

*Chain-key signatures* is a piece of chain-key technology to allows the creation of signed transactions targeted at other blockchains fully onchain using the Internet Computer Protocol. Using chain-key signatures, the IC can integrate with other blockchains such as Bitcoin and Ethereum in a completely trustless manner without needing any bridges or off-chain third party signers. Canisters can thus securely store and transact Bitcoin. The secret key exists only as shares held between all the nodes forming the subnet that runs the canister. The canister can transact Bitcoin using a chain-key signed transaction only when at least 2/3rd of the nodes agree to make the transaction. Indeed, using chain-key signatures is the strongest, most decentralized way of integrating blockchains as no additional trust assumptions besides that of the two blockchains are required, particularly no additional parties that manage signing keys or their shares. 

[Go deeper](/how-it-works/threshold-ecdsa-signing/)

