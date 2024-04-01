---
title: Chain-key signatures
abstract:
shareImage: /img/how-it-works/chain-key-signature.jpg
slug: threshold-ecdsa-signing
---

# Chain-key signatures

The main application of _chain-key signatures_ is to enable direct interoperability with other blockchains as part of [Chain Fusion Technology](/multichain). Using chain-key signatures, canister smart contracts obtain control over cryptographic keys: They have a public key, from which a blockchain address on another blockchain like Bitcoin or Ethereum can be derived, and they can sign transactions relative to that address. Two major features of ICP that build on chain-key signatures are ckBTC and ckETH, representations of BTC and ETH on the Internet Computer, in which a canister smart contract cryptographically controls the bitcoin and ether that backs the ckBTC and ckETH tokens 1:1. Indeed, using chain-key signatures is the strongest, most decentralized way of integrating blockchains as no additional trust assumptions besides that of the two blockchains are required, particularly no additional parties that manage signature keys or their shares.

Just like chain-key technology, a key component of chain-key signatures is threshold cryptography. The [threshold signature scheme](/how-it-works/chain-key-technology/) used to implement chain-key cryptography is based on BLS signatures. While BLS signatures have distinct advantages, they are simply not compatible with other blockchains. In order to work with other blockchains, the IC must use threshold signatures that are compatible with the digital signature schemes of those other blockchains. By far, the most commonly used signature scheme used on other blockchains (including Bitcoin and Ethereum) is the [ECDSA signature scheme](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Because of this, _threshold ECDSA_ signatures are currently supported on the IC, with implementations of other threshold signature schemes in the planning stages.

Canister smart contracts can have an ECDSA public key. The corresponding secret key is threshold-shared among the nodes of the subnet holding that canister smart contract. This is a prerequisite for the direct integration between the Internet Computer and Bitcoin and Ethereum.

Implementing a secure and efficient threshold signing protocol for ECDSA is much more challenging than for BLS signatures. While there has been a flurry of [research on threshold ECDSA in recent years](https://eprint.iacr.org/2020/1390), none of these protocols meet the demanding requirements of the Internet Computer: they all either assume a _synchronous network_ (meaning that the protocols will fail or become insecure if messages are unexpectedly delayed) or provide _no robustness_ (meaning that the ability to produce signatures is completely lost if a _single_ node should crash) or _both_. Neither of these assumptions are acceptable on the IC: security and liveness must hold even in an _asynchronous network_ with many faulty nodes.

The DFINITY R&D team has designed, analyzed, and implemented a new threshold ECDSA signing protocol that works over an _asynchronous network_ and is quite _robust_ (it will still produce signatures if up to a third of the nodes in a subnet are crashed or corrupt) while still delivering acceptable performance. This signing protocol has been published in two research papers that [describe the protocol in detail](https://eprint.iacr.org/2022/506) and [prove the key elements of its security](https://eprint.iacr.org/2021/1330). The NNS DAO decided to adopt threshold ECDSA on the Internet Computer and to roll it out, such that canister smart contracts are able to have an ECDSA public key.

[ECDSA White Paper](https://eprint.iacr.org/2021/1330)

[ECDSA GitHub](https://github.com/ic-association/nns-proposals/blob/main/proposals/governance/20210920T1500Z.md)

[Motion Proposal 21340](https://dashboard.internetcomputer.org/proposal/21340)

[The Internet Computer Community Adopts Threshold ECDSA Signatures Motion Proposal](https://medium.com/dfinity/the-internet-computer-community-approves-threshold-ecdsa-signatures-motion-proposal-65a0a3463492?source=friends_link&sk=db265995e31dac5ea751cd91e7b0a3b0)

[![Watch youtube video](https://i.ytimg.com/vi/MulbKPwv6_s/maxresdefault.jpg)](https://www.youtube.com/watch?v=MulbKPwv6_s)
