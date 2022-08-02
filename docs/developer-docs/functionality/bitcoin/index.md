# Bitcoin Integration

The Internet Computer integrates directly with the Bitcoin network. This allows canisters on the Internet Computer to receive, hold, and send Bitcoin, all directly with transactions on the Bitcoin network. I.e., canisters can act exactly like regular users holding bitcoin on the Bitcoin network. All of this is made possible by (1) the Internet Computer integrating with Bitcoin at the protocol level and (2) canisters being able to securely hold (and use) ECDSA keys by means of a novel threshold ECDSA protocol. The Internet Computer is among the first blockchain networks performing such direct integration with other blockchains and has built a novel technology foundation for this purpose.

This integration allows for a plethora of novel use cases:

-   *Bitcoin smart contracts:* A canister can directly hold Bitcoin on the Bitcoin network, which allows engineers to implement powerful Bitcoin smart contracts using canisters. Any canister smart contract can now offer Bitcoin smart contract functionality. For example on-chain Bitcoin wallets with biometric authentication without the user being required to manage the private key, or Social-Fi, where users can do peer-to-peer Bitcoin transactions with social dApps.
-   *Trading Bitcoin* on decentralized exchanges on the Internet Computer.
-   Using Bitcoin to buy tokens in a *decentralization sale* when an SNS-powered DAO decentralizes a service on the IC.
-   *Chain-key Bitcoin (ckBTC)*, an advanced variant of wrapped Bitcoin, that will be available on the IC with the Bitcoin mainnet release of the Bitcoin feature. ckBTC will be the easiest way to handle Bitcoin on the IC and might be the right choice for many people interested in Bitcoin on the IC. Note that ckBTC will only be available with the general availability (GA) release of Bitcoin in the upcoming months together with Bitcoin mainnet launch on IC mainnet.

These are only a few examples of how one can use the Bitcoin integration feature. Your imagination is the only limit to the endless range of possibilities being opened up by this feature. This documentation explains how to use the feature to implement your own dApps using Bitcoin.

As part of the upcoming Bitcoin mainnet release (general availability release) of the Bitcoin integration feature, a Chain-Key Bitcoin (ckBTC) Canister will be made available. The ckBTC canister will provide on-chain Bitcoin on the IC, which looks and feels like wrapped Bitcoin, but has a much stronger underlying trust model because of its decentralized architecture and using threshold ECDSA instead of bridges. We envision that many people will revert to using ckBTC instead of our native integration for their projects because of some distinct advantages:

-   Easier to integrate: Instead of using the low-level Bitcoin integration API, one can simply access the ckBTC ledger.
-   Faster and cheaper transfers: ckBTC can be transferred with the low finality time of the Internet Computer (within seconds) and for a fraction of the cost of a Bitcoin transfer on the Bitcoin network. Using this scheme, only the settlement transfers with the Bitcoin network need to be done on the Bitcoin network, the majority of transfers could be done with lightning speed and low cost directly on the IC.

## Learn more
If you want to take a deep dive into how Bitcoin integration works, see [How it Works](bitcoin-how-it-works.md) page to get an overview of our novel threshold ECDSA implementation, the API, and more. 

## Build more
If you're interested to experiment with Bitcoin integration locally, see the [local development guide](local-development.md). 
In the [Examples repo](https://github.com/dfinity/examples) you can find sample code in [Rust](https://github.com/dfinity/examples/tree/master/rust/basic_bitcoin) and [Motoko](https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin) from which you can start to build following the [sample code walk-through](../../../samples/deploying-your-first-bitcoin-dapp.md)