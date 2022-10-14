# Functionality Integrations

While previous sections guide you to start building canisters on the IC, here you can see how to integrate various (sometimes advanced) extra functionality to your dapp.

## Service Nervous System
* [Get an SNS]
* [Manage an SNS]

## Bitcoin Integration
Integrate directly with the Bitcoin network allowing canisters on the IC to receive, hold, and send Bitcoin, all directly with transactions on the Bitcoin network. I.e., canisters can act exactly like regular users holding bitcoin on the Bitcoin network.

* [Bitcoin Integration](./bitcoin/index.md) gives a longer overview
* [How it works](./bitcoin/bitcoin-how-it-works.md) dives further into the details
* [local development](./bitcoin/local-development.md) contains a tutorial showing how to experiment locally

## Threshold ECDSA
A threshold ECDSA implementation on a blockchain can be viewed as the on-chain pendant to a hardware security module (HSM) that stores private keys securely and issues signatures on request of the eligible entities, and only to those. It is particularly important to facilitate direct integration with (ECDSA-based) blockchains.

* [Threshold ECDSA](./t-ecdsa/index.md) gives an overview of what can be achieved with this feature
* See [How it works](./t-ecdsa/t-ecdsa-how-it-works.md) to dive further into the details

## HTTPS Outcalls
HTTP(S) outcalls on the IC enable canisters to directly make calls to HTTP(S) servers external to the blockchain and use the response in the further processing of the canister such that the replicated state can safely be updated using those inputs. A first in blockchain history, and alleviates the need for oracles.
* [HTTPS outcalls](./http_requests/index.md) gives an overview of how the IC can communicate with the world outside
* [How it works](./http_requests/http_requests-how-it-works.md) to dive further into the details and gives a comparison against oracles

## Internet Identity
Internet Identity allows users to create sessions with Web3 services and dapps, and sign traditional blockchain transactions.
* [Internet Identity](./internet-identity/integrate-identity.md) gives an overview of how to use internet identity in your app

## ICP Ledger
The Internet Computer Protocol (ICP) implements management of ICP using a specialized canister, called the ledger canister. There is a single ledger canister which runs alongside other canisters on the NNS subnet. The ledger canister is a smart contract that holds accounts and transactions. 

* [Ledger overview](./ledger/index.md) to get a view of the ICP ledger basics
* [Interact](./ledger/interact-with-ledger.md) shows the commands and protocol flows to interact with the ICP ledger
* [Local Setup](./ledger/ledger-local-setup.md) shows how to experiment with the ledger in your local environment
* [Deploy New Token](./ledger/deploy-new-token.md) describes how to deploy a new token and connect to Rosetta

## Rosetta
Rosetta is an open standard introduced by Coinbase to simplify the integration of blockchain-based tokens in exchanges, block explorers, and wallets. This documentation might help if you want to deploy a token on the IC that aims to be tradable on CeFi exchanges or if you are working on a block explorer or wallet.
* The [Rosetta page](./rosetta/index.md) describes how to set up a Rosetta node and answers some FAQs
* [transfers](./rosetta/transfers.md) details how to transfer ICP using the Rosetta Construction API
* [neuron lifecycle](./rosetta/neuron-lifecycle.md) gives an overview of neurons (IC assets allowing controllers to participate in the governance of the network by submitting and voting on proposals)
* [staking support](./rosetta/staking-support.md) specifies extensions of the Rosetta API enabling staking funds and managing governance neurons on the IC
* [staking tutorial](./rosetta/staking-tutorial.md) walks through the process of creating a neuron
* [hotkeys](./rosetta/hotkeys.md) explains how to generate a hotkey for neuron management