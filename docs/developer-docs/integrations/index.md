# Advanced features

## Overview

While previous sections guide you to start building canisters on ICP, here you can see how to integrate various (sometimes advanced) extra functionality to your dapp. From identity to ledger integrations, to integrating with other blockchains, to communicating from ICP to the outside world, and even decentralizing control of your dapp, it's all here.

## Composite queries

The Internet Computer (IC) supports two types of messages: updates and queries. An update message is executed on all nodes and persists canister state changes. A query message discards state changes and typically executes on a single node. An update can call other updates and queries. However a query cannot make any calls, which can hinder development of scalable decentralized applications (dapps), especially those that shard data across multiple canisters. Composite queries solve this problem. 

* [Composite queries](https://internetcomputer.org/docs/current/developer-docs/integrations/composite-query/).

## HTTPS Outcalls
HTTP(S) outcalls on ICP enable canisters to directly make calls to HTTP(S) servers external to the blockchain and use the response in the further processing of the canister such that the replicated state can safely be updated using those inputs. A first in blockchain history, and alleviates the need for oracles.

* [HTTPS outcalls](./https-outcalls/index.md) gives an overview of how ICP can communicate with the world outside.
* [How it works](./https-outcalls/https-outcalls-how-it-works.md) to dive further into the details and gives a comparison against oracles.

## Independently verifying Internet Computer signatures

* [Independently verifying Internet Computer signatures](https://internetcomputer.org/docs/current/developer-docs/integrations/independently-verifying-ic-signatures).

## Internet Identity
Internet Identity allows users to create sessions with Web3 services and dapps, and sign traditional blockchain transactions.
* [Internet Identity](./internet-identity/overview.md) gives an overview of Internet Identity.

## Threshold ECDSA
A threshold ECDSA implementation on a blockchain can be viewed as the on-chain pendant to a hardware security module (HSM) that stores private keys securely and issues signatures on request of the eligible entities, and only to those. It is particularly important to facilitate direct integration with (ECDSA-based) blockchains.

* [Threshold ECDSA](./t-ecdsa/index.md) gives an overview of what can be achieved with this feature.
* See [How it works](./t-ecdsa/t-ecdsa-how-it-works.md) to dive further into the details.

## vetKeys

The VETKeys feature is in ongoing development on the Internet Computer (ICP). It stands for ‘Verifiable Encrypted Threshold Keys’ and enables a number of cryptographic functionalities on ICP. The primary motivation for VETKeys is to facilitate onchain encryption, as such the focus of this primer has that example in mind.

* [vetKeys technology overview.](https://internetcomputer.org/docs/current/developer-docs/integrations/vetkeys/technology-overview)
* [vetKeys primer.](https://internetcomputer.org/blog/features/vetkey-primer)



