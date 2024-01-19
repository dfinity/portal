# Bitcoin integration

## Overview

The Internet Computer integrates directly with the Bitcoin network. This allows canisters on the Internet Computer to receive, hold, and send Bitcoin, all directly with transactions on the Bitcoin network. Canisters can act exactly like regular users holding bitcoin on the Bitcoin network. All of this is made possible by:
-  The Internet Computer integrating with Bitcoin at the protocol level.
-  Canisters being able to securely hold and use ECDSA keys by means of a novel protocol for chain-key signatures, based on threshold ECDSA. 

The Internet Computer is among the first blockchain networks performing such direct integration with other blockchains and has built a novel technology foundation for this purpose.

## Use cases
This integration allows for a plethora of novel use cases:

-   **Bitcoin smart contracts:** A canister can directly hold bitcoin on the Bitcoin network, which allows engineers to implement powerful Bitcoin smart contracts using canisters. Any canister smart contract can now offer Bitcoin functionality such as on-chain bitcoin wallets with biometric authentication, or Social-Fi dapps where users can do peer-to-peer Bitcoin transactions.
-   **Trading Bitcoin:** Trade bitcoin directly on decentralized exchanges on ICP, without requiring any third-party custody of the assets.
-   **Decentralization swap:** Using bitcoin to buy tokens in a decentralization swap when an SNS-powered DAO decentralizes a service on ICP.
-   **Chain Key Bitcoin (ckBTC):** A Bitcoin analogue on the Internet Computer that is backed 1:1 by bitcoin is available on ICP. ckBTC is the easiest way to handle bitcoin on ICP.

## Examples
This documentation explains how to use this feature in your own dapps. The Bitcoin integration API is a low-level API that operates on the level of UTXOs and Bitcoin transactions.

The ckBTC canister provides on-chain bitcoin on ICP, which looks and feels like wrapped bitcoin but has a much stronger underlying trust model because of its decentralized architecture that uses threshold ECDSA instead of bridges. 

Many developers may prefer to use ckBTC instead of our native integration for their projects because of some distinct advantages:
-   **Easier to integrate:** Instead of using the low-level Bitcoin integration API, one can simply access the ckBTC ledger like any other ledger on ICP. The ckBTC ledger adheres to the ICRC-2 token standard for fungible tokens.
-   **Faster and cheaper transfers:** ckBTC can be transferred with the low finality time (within seconds) and for a fraction of the cost of a Bitcoin transfer on the Bitcoin network. Using this scheme, only the settlement transfers with the Bitcoin network need to be done on the Bitcoin network; the majority of transfers can be done at high speed and low cost directly on ICP.

## Further reading

- [Bitcoin integration: technology overview](bitcoin-how-it-works.md).

- [ckBTC API reference](ckbtc.md).

- [Local development](local-development.mdx).

- [GitHub repository](https://github.com/dfinity/ic/tree/master/rs/bitcoin/ckbtc/minter).

- [Developer journey: ckBTC and Bitcoin integration](/docs/current/tutorials/developer-journey/level-4/4.3-ckbtc-and-bitcoin).

- [Deploying your first Bitcoin dapp](https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin).

- [Creating a ckBTC point of sale dapp](https://github.com/dfinity/examples/tree/master/motoko/ic-pos).

