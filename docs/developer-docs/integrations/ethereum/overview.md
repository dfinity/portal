# Overview

Canisters deployed on ICP are able to communicate with the Ethereum blockchain and other EVM-compatible networks using the EVM RPC canister. The EVM RPC canister implements an on-chain API that facilitates API requests to JSON-RPC services like Alchemy, Ankr, and Cloudflare WEb3. It also supports BlockPI requests using the ICP feature HTTPS outcalls. 

This integration enables canisters to use Ethereum similar to dapps deployed directly on Ethereum. ICP canisters can query info such as Ethereum smart contract states and submit raw transactions to the Ethereum network. 

The EVM-RPC canister supports [other EVM chains](https://chainlist.org/?testnets=true) such as Polygon and Avalanche. 

This integration allows for the implementation of ckETH, a chain-key twin of the ETH token. 

You can [learn how to use the EVM RPC canister](evm-rpc.md)

## Costs

An approximate cost breakdown in USD can be found below. These costs are estimated using the Cloudflare RPC with a 13-node subnet:

- JSON-RPC API request: $0.0001 USD
- HTTPS outcalls: $0.001 USD (This assumes 1KiB request and 1KiB response)
- Base cost: $0.0008 USD
- JSON Request: $0.00008 USD per KiB
- JSON Response: $0.00008 USD per KiB

These costs are paid by sending cycles with each RPC call using the `--with-cycles` flag. Learn more about [cycles](/docs/current/developer-docs/gas-cost).