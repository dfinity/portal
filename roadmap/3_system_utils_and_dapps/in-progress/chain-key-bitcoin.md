---
title: Chain-Key Bitcoin
links:
  Forum Link: https://forum.dfinity.org/t/chain-key-bitcoin-ckbtc-bitcoin-wrapped-by-a-smart-contract/17606/
  Proposal: https://dashboard.internetcomputer.org/proposal/50135
eta: Q1 2023
is_community: false
in_beta: true
---

Canister smart contracts on the Internet Computer can control real bitcoin on the Bitcoin network. 
However, Bitcoin transactions are slow and expensive. 
To address this limitation, we introduce a new token called "Chain-Key Bitcoin", or ckBTC, which is an analogue of Bitcoin on the Internet Computer. The ckBTC token does not involve traditional wrapping.
A canister smart contract that builds on the Bitcoin integration, including chain-key ECDSA, will be able to receive bitcoin and issue ckBTC to the sender.
Vice versa, users can use this canister to redeem their ckBTC for real bitcoin.
As ckBTC is a token that lives on the Internet Computer, it can be transacted efficiently and with low fees. 