# Functionality integrations

## Overview

While previous sections guide you to start building canisters on the IC, here you can see how to integrate various (sometimes advanced) extra functionality to your dapp. From identity to ledger integrations, to integrating with other blockchains, to communicating from the IC to the outside world, and even decentralizing control of your dapp, it's all here.

## Bitcoin Integration
Integrate directly with the Bitcoin network allowing canisters on the IC to receive, hold, and send Bitcoin, all directly with transactions on the Bitcoin network. Canisters can act exactly like regular users holding bitcoin on the Bitcoin network.

- [Bitcoin Integration](./bitcoin/index.md).
- [How it works](./bitcoin/bitcoin-how-it-works.md).
- [Local development](./bitcoin/local-development.md) contains a tutorial showing how to experiment locally.
- [Chain-key Bitcoin](./bitcoin/ckbtc.md) provides an overview of chain-key Bitcoin (ckBTC).

## HTTPS Outcalls
HTTP(S) outcalls on the IC enable canisters to directly make calls to HTTP(S) servers external to the blockchain and use the response in the further processing of the canister such that the replicated state can safely be updated using those inputs. A first in blockchain history, and alleviates the need for oracles.

* [HTTPS outcalls](./https-outcalls/index.md) gives an overview of how the IC can communicate with the world outside.
* [How it works](./https-outcalls/https-outcalls-how-it-works.md) to dive further into the details and gives a comparison against oracles.

## ICP Ledger
The Internet Computer Protocol (ICP) implements management of ICP using a specialized canister, called the ledger canister. There is a single ledger canister which runs alongside other canisters on the NNS subnet. The ledger canister is a smart contract that holds accounts and transactions.

* [Ledger overview](./ledger/index.md) to get a view of the ICP ledger basics.
* [Interact](./ledger/interact-with-ledger.md) shows the commands and protocol flows to interact with the ICP ledger.
* [Local setup](./ledger/ledger-local-setup.md) shows how to experiment with the ledger in your local environment.
* [Deploy new token](./ledger/deploy-new-token.md) describes how to deploy a new token and connect to Rosetta.

## Internet Identity
Internet Identity allows users to create sessions with Web3 services and dapps, and sign traditional blockchain transactions.
* [Internet Identity](../../references/ii-spec.md) gives an overview of Internet Identity.

## Rosetta
Rosetta is an open standard introduced by Coinbase to simplify the integration of blockchain-based tokens in exchanges, block explorers, and wallets. This documentation might help if you want to deploy a token on the IC that aims to be tradable on CeFi exchanges or if you are working on a block explorer or wallet.
* The [Rosetta page](./rosetta/index.md) describes how to set up a Rosetta node and answers some FAQs.
* [Transfers](./rosetta/transfers.md) details how to transfer ICP using the Rosetta Construction API.
* [Neuron lifecycle](./rosetta/neuron-lifecycle.md) gives an overview of neurons (IC assets allowing controllers to participate in the governance of the network by submitting and voting on proposals).
* [Staking support](./rosetta/staking-support.md) specifies extensions of the Rosetta API enabling staking funds and managing governance neurons on the IC.
* [Staking tutorial](./rosetta/staking-tutorial.md) walks through the process of creating a neuron.
* [Hotkeys](./rosetta/hotkeys.md) explains how to generate a hotkey for neuron management.

## Service Nervous System (SNS)
Similar to how the NNS is the open tokenized DAO that controls the IC, SNSs are algorithmic DAOs that allow developers to create decentralized, token-based governance systems for their dapps. This section provides an [overview of the SNS documentation](./sns/index.md) and then provides the documentation aimed at developers.

* [An introduction to the SNS.](./sns/introduction/sns-intro-high-level.md)
* [An introduction to how to prepare for an SNS launch.](./sns/tokenomics/index.md)
* [SNS integration documentation.](./sns/integrating/index.md)
* [SNS testing documentation.](./sns/testing/get-sns-intro.md)
* [An introduction to the SNS launch.](./sns/launching/launch-summary.md)
* [Information on how to manage an SNS.](./sns/managing/manage-sns-intro.md)

## Threshold ECDSA
A threshold ECDSA implementation on a blockchain can be viewed as the on-chain pendant to a hardware security module (HSM) that stores private keys securely and issues signatures on request of the eligible entities, and only to those. It is particularly important to facilitate direct integration with (ECDSA-based) blockchains.

* [Threshold ECDSA](./t-ecdsa/index.md) gives an overview of what can be achieved with this feature.
* See [How it works](./t-ecdsa/t-ecdsa-how-it-works.md) to dive further into the details.








