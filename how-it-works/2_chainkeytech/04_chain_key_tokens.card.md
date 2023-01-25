---
title: Chain-key Tokens
abstract: This feature brings a Bitcoin analogue to ICP can be transferred at the speed of the ICP and with low transaction fees.
coverImage: /img/how-it-works/direct-integration-with-bitcoin.600x300.jpg
---

![](/img/how-it-works/direct-integration-with-bitcoin.600x300.jpg)

# Chain-key Tokens

A wrapped token represents an underlying asset, which typically is a token on another chain than the chain the wrapped token is available on. In the traditional architecture for token wrapping, an *intermediary* (a so-called *bridge*) performs the wrapping. This party is at risk of being hacked or otherwise compromised, potentially leading to a loss of tokens. Chain-key tokens — and chain-key Bitcoin (ckBTC) — are a cryptography-based replacement to wrapped tokens with strong decentralization advantages: Chain-key tokens (and chain-key Bitcoin) eliminate the intermediary risks associated with the traditional intermediary-based wrapping architecture. Chain-key cryptography makes this possible: Taking the example of Bitcoin, a canister smart contract can own and use ECDSA key pairs and use a public ECDSA key to derive a Bitcoin address to which transfers of real Bitcoin can be made on the Bitcoin network. When receiving native bitcoin on the Bitcoin network, an according amount of ckBTC is issued to the ICP principal of the sender in a token ledger. Redeeming ckBTC is done by removing the ckBTC from circulating supply and then the canister using the private key of the ECDSA key pair to sign a transaction happening on the Bitcoin network to transfer the underlying real bitcoin in a fully decentralized way to the user's Bitcoin address. Chain-key ECDSA signatures, another innovation part of chain-key cryptography, makes it possible that all of this can be done fully on chain on ICP.

[Go deeper](/how-it-works/chain_key_bitcoin/)
