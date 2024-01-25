# Introduction to developing smart contracts in Solidity

Solidity is an object-oriented, high-level language for implementing smart contracts targeting the Ethereum Virtual Machine (EVM). The ICP execution environment is based on WebAssembly and is not directly EVM compatible, but canister smart contracts are powerful enough to host an EVM implementation. Currently, there exists one such implementation, the Bitfinity EVM. 

## Bitfinity EVM

The Bitfinity EVM is an EVM implementation based on [REVM](https://github.com/bluealloy/revm), and provides an RPC interface that is compatible with the Ethereum JSON-RPC API. This means that existing Ethereum tools and libraries, such as [MetaMask](https://metamask.io/), [Hardhat](https://hardhat.org/) and [Foundry](https://getfoundry.sh/), can be used to interact with the EVM, and provide a similar developer and user experience as Ethereum.

The Bitfinity EVM is currently at Testnet stage, and is not yet ready for production use. It is available for experimentation and testing purposes only.

For more information, please refer to the official [Bitfinity EVM documentation](https://docs.bitfinity.network/)

