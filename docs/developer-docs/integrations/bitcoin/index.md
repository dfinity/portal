# Bitcoin Integration — Coding Bitcoin

The Internet Computer integrates directly with the Bitcoin network. This allows canisters on the Internet Computer to receive, hold, and send Bitcoin, all directly with transactions on the Bitcoin network. I.e., canisters can act exactly like regular users holding bitcoin on the Bitcoin network. All of this is made possible by (1) the Internet Computer integrating with Bitcoin at the protocol level and (2) canisters being able to securely hold (and use) ECDSA keys by means of a novel protocol for chain-key signatures, based on threshold ECDSA. The Internet Computer is among the first blockchain networks performing such direct integration with other blockchains and has built a novel technology foundation for this purpose.

This integration allows for a plethora of novel use cases:

-   *Bitcoin smart contracts:* A canister can directly hold Bitcoin on the Bitcoin network, which allows engineers to implement powerful Bitcoin smart contracts using canisters. Any canister smart contract can now offer Bitcoin smart contract functionality. For example on-chain Bitcoin wallets with biometric authentication without the user being required to manage the private key, or Social-Fi, where users can do peer-to-peer Bitcoin transactions using social dApps.
-   *Trading Bitcoin* directly on decentralized exchanges on the Internet Computer, without requiring any third-party custody of the assets.
-   Using Bitcoin to buy tokens in a *decentralization sale* when an SNS-powered DAO decentralizes a service on the IC.
-   *Chain Key Bitcoin (ckBTC)*, a Bitcoin analogue on the Internet Computer that is backed 1:1 by bitcoin, will be available on the IC shortly after the Bitcoin mainnet release of the Bitcoin feature. ckBTC will be the easiest way to handle bitcoin on the IC.

These are only a few examples of how one can use the Bitcoin integration feature. Your imagination is the only limit to the endless range of possibilities being opened up by this feature. This documentation explains how to use this feature in your own dApps. Please also note that the Bitcoin integration API is a low-level API that operates on the level of UTXOs and Bitcoin transactions and is non-trivial to use.

After the Bitcoin mainnet release (general availability release) of the Bitcoin feature, a *Chain Key Bitcoin* (ckBTC) Canister will be made available. The ckBTC canister will provide on-chain bitcoin on the IC, which looks and feels like wrapped bitcoin but has a much stronger underlying trust model because of its decentralized architecture and using threshold ECDSA instead of bridges. We envision that many people will prefer to use ckBTC instead of our native integration for their projects because of some distinct advantages:
-   *Easier to integrate:* Instead of using the low-level Bitcoin integration API, one can simply access the ckBTC ledger like any other ledger on the Internet Computer. The ckBTC ledger will adhere to the ICRC-1 token standard for fungible tokens.
-   *Faster and cheaper transfers:* ckBTC can be transferred with the low finality time of the Internet Computer (within seconds) and for a fraction of the cost of a Bitcoin transfer on the Bitcoin network. Using this scheme, only the settlement transfers with the Bitcoin network need to be done on the Bitcoin network, the majority of transfers can be done at high speed and low cost directly on the IC.

## Learn more
If you want to dive deeper into how Bitcoin integration works, see the [How it Works](bitcoin-how-it-works.md) page to get an overview of the protocol-level Bitcoin integration, our novel chain-key ECDSA implementation based on a threshold ECDSA protocol, the API, and more. If you want to go even deeper, have a look at the [chain-key ECDSA documentation](https://internetcomputer.org/docs/current/developer-docs/integrations/t-ecdsa) and the [Bitcoin integration Wiki](https://wiki.internetcomputer.org/wiki/Bitcoin_integration).

## Build more
If you are interested in experimenting with Bitcoin integration locally, see the [local development guide](local-development.md).
In the [Examples repo](https://github.com/dfinity/examples) you can find sample code in [Rust](https://github.com/dfinity/examples/tree/master/rust/basic_bitcoin) and [Motoko](https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin) from which you can start to build following the [sample code walk-through](../../../samples/deploying-your-first-bitcoin-dapp.md)
