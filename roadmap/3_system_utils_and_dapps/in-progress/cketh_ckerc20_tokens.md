---
title: ckETH and ckERC-20 tokens
links:
  Forum Link: https://forum.dfinity.org/t/long-term-r-d-integration-with-the-ethereum-network/9382
eta: 2023
is_community: true
---

This feature brings Ethereum's Ether (ETH) token and ERC-20 tokens over to the IC in the form of chain-key tokens, i.e., twin tokens of the original tokens on the Ethereum network. Those ckETH and various ckERC-20 tokens like ckUSDC and ckUSDT stablecoins are of tremendous importance to the IC due to the potential liquidity they can bring over to the ecosystem. The initial implementation is done using HTTPS outcalls to multiple Ethereum JSON RPC providers to communicate with the Ethereum network. Once available in the future, the full Ethereum integration of the Internet Computer will be leveraged to make the communication with the Ethereum network trustless. Chain-key ECDSA signing (threshold ECDSA) is used for trustlessly creating required transactions on the Ethereum network.
