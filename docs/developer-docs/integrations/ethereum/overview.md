# Overview

Canisters deployed on ICP are able to communicate with the Ethereum blockchain and other EVM-compatible networks using the EVM RPC canister. This canister facilitates API requests to JSON-RPC services such as [CloudFlare](https://www.cloudflare.com/en-gb/web3/), [Alchemy](https://www.alchemy.com/), [Ankr](https://www.ankr.com/), [BlockPI](https://blockpi.io/), or [Public Node](https://www.publicnode.com/) using [HTTPS outcalls](https://internetcomputer.org/https-outcalls). 

This enables functionality similar to traditional Ethereum dapps, including querying Ethereum smart contract states and submitting raw transactions.

Beyond the Ethereum blockchain, this canister also has partial support for Polygon, Avalanche, and other popular EVM networks. Check out [ChainList.org](https://chainlist.org/?testnets=true) for an extensive list of compatible networks and RPC providers.

This integration allows for the implementation of ckETH, a chain-key twin of the ETH token. 

You can [learn how to use the EVM RPC canister](evm-rpc.md).

## Costs

JSON-RPC requests typically cost between 10^8 and 10^9 cycles, which is equivalent to approximately $0.0001 - $0.001 USD. 

These costs are paid by sending cycles with each RPC call, such as by using the `--with-cycles` flag when calling a canister with [dfx](https://internetcomputer.org/docs/current/references/cli-reference/dfx-canister#dfx-canister-call). Learn more about [cycles](/docs/current/developer-docs/gas-cost).
