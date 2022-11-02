---
title: Chain-Key Transactions
abstract: 
shareImage: /img/how-it-works/threshold-ecdsa-signing.600.jpg
slug: threshold-ecdsa-signing
---

# Chain-Key Transactions

For the reasons outlined [here](/how-it-works/chain-key-technology/), the threshold signature scheme used to implement chain-key cryptography is based on BLS signatures. While BLS signatures have distinct advantages, they are simply not compatible with other blockchains. To achieve maximum compatibility with other blockchains, the IC implements chain-key transactions with threshold ECDSA signatures.

As is well known, implementing a secure and efficient threshold signing protocol for ECDSA is much more challenging than for BLS signatures. While there has been a flurry of [research on threshold ECDSA in recent years](https://eprint.iacr.org/2020/1390), none of these protocols meet the demanding requirements of the Internet Computer: they all either assume a *synchronous network* (meaning that the protocols will fail or become insecure if messages are unexpectedly delayed) or provide *no robustness* (meaning that the ability to produce signatures is completely lost if a *single* node should crash) or *both*. Neither of these assumptions are acceptable on the IC: security and liveness must hold even an an *asynchronous network* with many faulty nodes.

DFINITY has designed, analyzed, and implemented a new threshold ECDSA signing protocol that works over an *asynchronous network* and is quite *robust* (it will still produce signatures if up to a third of the nodes in a subnet are crashed or corrupt) while still delivering acceptable performance. Papers written by DFINITY's researchers [describe the protocol in detail](https://eprint.iacr.org/2022/506) and [prove the key elements of its security](https://eprint.iacr.org/2021/1330).

[ECDSA White Paper](https://eprint.iacr.org/2021/1330)

[ECDSA GitHub](https://github.com/ic-association/nns-proposals/blob/main/proposals/governance/20210920T1500Z.md)

[Motion Proposal 21340](https://dashboard.internetcomputer.org/proposal/21340)

[The Internet Computer Community Adopts Threshold ECDSA Signatures Motion Proposal](https://medium.com/dfinity/the-internet-computer-community-approves-threshold-ecdsa-signatures-motion-proposal-65a0a3463492?source=friends_link&sk=db265995e31dac5ea751cd91e7b0a3b0)

[![Watch youtube video](https://i.ytimg.com/vi/MulbKPwv6_s/maxresdefault.jpg)](https://www.youtube.com/watch?v=MulbKPwv6_s)

