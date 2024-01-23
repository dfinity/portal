# Overview

## Use cases
This integration allows for a plethora of novel use cases:

-   **Bitcoin smart contracts:** a canister can directly hold Bitcoin on the Bitcoin network, which allows engineers to implement powerful Bitcoin smart contracts using canisters. Any canister smart contract can now offer Bitcoin smart contract functionality. For example on-chain Bitcoin wallets with biometric authentication without the user being required to manage the private key, or Social-Fi, where users can do peer-to-peer Bitcoin transactions using social dApps.
-   **Trading Bitcoin:** trade Bitcoin directly on decentralized exchanges on the Internet Computer, without requiring any third-party custody of the assets.
-   **Decentralization swap:** using Bitcoin to buy tokens in a decentralization swap when an SNS-powered DAO decentralizes a service on ICP.
-   **Chain Key Bitcoin (ckBTC):** a Bitcoin analogue on the Internet Computer that is backed 1:1 by bitcoin, is available on ICP. ckBTC is the easiest way to handle bitcoin on ICP.

## Examples
These are only a few examples of how one can use the Bitcoin integration feature. Your imagination is the only limit to the endless range of possibilities being opened up by this feature. This documentation explains how to use this feature in your own dApps. Please also note that the Bitcoin integration API is a low-level API that operates on the level of UTXOs and Bitcoin transactions and is non-trivial to use.

After the Bitcoin mainnet release (general availability release) of the Bitcoin feature, a **chain key Bitcoin (ckBTC)** canister was made available. The ckBTC canister provides on-chain bitcoin on ICP, which looks and feels like wrapped bitcoin but has a much stronger underlying trust model because of its decentralized architecture and using threshold ECDSA instead of bridges. 

The ICP envisions that many people will prefer to use ckBTC instead of our native integration for their projects because of some distinct advantages:
-   **Easier to integrate:** instead of using the low-level Bitcoin integration API, one can simply access the ckBTC ledger like any other ledger on the Internet Computer. The ckBTC ledger adheres to the ICRC-2 token standard for fungible tokens.
-   **Faster and cheaper transfers:** ckBTC can be transferred with the low finality time of the Internet Computer (within seconds) and for a fraction of the cost of a Bitcoin transfer on the Bitcoin network. Using this scheme, only the settlement transfers with the Bitcoin network need to be done on the Bitcoin network, the majority of transfers can be done at high speed and low cost directly on ICP.

## Resources

- If you want to dive deeper into how Bitcoin integration works, see the [how it works](bitcoin-how-it-works.md) page to get an overview of the protocol-level Bitcoin integration, our novel chain-key ECDSA implementation based on a threshold ECDSA protocol, the API, and more. 
- If you want to go even deeper, have a look at the [chain-key ECDSA documentation](https://internetcomputer.org/docs/current/developer-docs/integrations/t-ecdsa).
- [Bitcoin integration Wiki](https://wiki.internetcomputer.org/wiki/Bitcoin_integration).
- If you are interested in experimenting with Bitcoin integration locally, see the [local development guide](local-development.md).
- In the [examples repo](https://github.com/dfinity/examples) you can find sample code in [Rust](https://github.com/dfinity/examples/tree/master/rust/basic_bitcoin) and [Motoko](https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin) from which you can start to build following the [sample code walk-through](../../../samples/deploying-your-first-bitcoin-dapp.md).
