---
title: Chain-key tokens
abstract: This feature brings a Bitcoin ‘twin’ token to ICP that is backed 1:1 with real bitcoin, but native to the Internet Computer, benefitting from its low latency, high throughput, and low fees. In the future, when the Ethereum integration is available, further chain-key tokens will come to the ICP.
coverImage: /img/how-it-works/ckbtc-content.1200x600.jpg
---

![](/img/how-it-works/ckbtc-content.600x300.webp)

# Chain-key tokens

Chain-key tokens — and Chain-Key Bitcoin (ckBTC) — are a cryptography-based replacement to wrapped tokens with strong decentralization advantages: Chain-key tokens eliminate the risks associated with the traditional intermediary-based token wrapping, while also having the same benefit of making a token from another blockchain available for transfers and trading. _Chain-key cryptography_ makes this possible: Taking the example of Bitcoin, a canister smart contract can own ECDSA key pairs and derive Bitcoin addresses to which transfers of real Bitcoin can be made on the Bitcoin network. When receiving bitcoin, the canister mints and issues ckBTC in a 1:1 ratio to the sender of the bitcoin. Conversely, redeeming ckBTC for the underlying bitcoin removes the ckBTC from circulating supply and refunds the bitcoin. This makes a chain-key token a ‘twin’ of the original token with the same properties and valuation, but hosted on the Internet Computer.

[Go deeper](/how-it-works/chain-key-tokens/)
