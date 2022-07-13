
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

## How it Works -- Technology Background

Bitcoin-enabling the IC has required us to solve two advanced engineering challenges: (1) A protocol-level integration of the IC with the Bitcoin network and (2) a novel threshold ECDSA protocol.

**Protocol-level integration of the IC with the Bitcoin network**

Through the protocol-level integration of the IC with the Bitcoin network, the IC can obtain Bitcoin blocks and process the contained transactions. This allows for maintaining the full Bitcoin UTXO state on-chain on the IC and canisters can run queries against it. This allows canisters to know about the held UTXOs, and thus balance, of any Bitcoin address.

**Novel threshold ECDSA protocol**

Canisters themselves can have ECDSA keys using a novel threshold ECDSA protocol, and so can receive and hold Bitcoin. Canisters can create Bitcoin transactions and submit them via the Bitcoin API to the Bitcoin network. They use the threshold ECDSA functionality to request threshold signatures on transactions to be submitted to the Bitcoin network. Threshold ECDSA is an extension of the IC\'s chain-key technology toolbox of protocols. Details regarding the IC\'s threshold ECDSA protocol can be found on the threshold ECDSA documentation page [here](./t-ecdsa.md).

The protocol-level Bitcoin integration and threshold ECDSA protocol each expose an API on the management canister. Those APIs are the system-level APIs engineers use to write Bitcoin smart contracts on the IC.

We next give a high-level overview of the abovementioned technology behind the direct Bitcoin integration. For details, we refer the reader to the Bitcoin page on the Internet Computer Wiki (link??) as well as the threshold ECDSA documentation page [here](./t-ecdsa.md).

### Protocol-level integration of the IC with the Bitcoin network

We integrated the Internet Computer Protocol with the Bitcoin protocol to obtain a direct technical integration between the two networks. This integration can be activated on any number of Internet Computer subnets. At the beginning, there will only be one dedicated Bitcoin-activated subnet. The integration serves two key purposes:

-   Obtaining the Bitcoin UTXO set and keeping it on chain in the replicated state of the Internet Computer to be able to answer queries for UTXO sets and balances of Bitcoin accounts issued by canisters.

-   Accepting signed Bitcoin transactions of canisters and submitting them to the Bitcoin network.

Figure

**Components**

On a Bitcoin-activated subnet, a *BTC canister* (Bitcoin canister), implemented as part of the management canister, i.e, as part of the replica, is made accessible to canisters via an API. The BTC canister holds the on-chain Bitcoin-related state: the UTXO set, the most recent Bitcoin blocks to allow for fork resolution, and outgoing transactions.

A *Bitcoin adapter* process at the networking layer connects to nodes of the Bitcoin network, much like a regular Bitcoin node does.

**Maintaining the Bitcoin UTXO set**

The BTC canister and adapter are integrated and communicate with each other via the IC\'s protocol stack: The BTC canister requests successor blocks to the latest Bitcoin blocks it has received from the Bitcoin adapter. The adapter on each replica of the subnet obtains the requested blocks from the Bitcoin network and the adapter of a block-making replica provides a requested block to the Bitcoin canister through consensus. The Bitcoin canister processes blocks in that it validates the proof of work, extracts the block\'s transactions, extracts the UTXOs from the transactions, and updates the UTXO set maintained in replicated state to reflect the UTXOs consumed and the UTXOs created by the transactions. The UTXO set and a set of recent blocks not yet absorbed into the UTXO set are used to respond to UTXO and balance requests.

Significant complexity of the implementation is in the area of securely resolving forks and protecting against various kinds of attacks. For example, in order to be able to resolve forks, the Bitcoin canister needs to maintain a certain number of Bitcoin blocks which are not yet absorbed into the maintained UTXO set, but UTXOs therein must be considered in addition for UTXO queries efficiently.

**Submitting transactions**

Canisters can submit Bitcoin transactions to the Bitcoin canister using the corresponding management canister API. Doing so queues the transactions for being submitted to the Bitcoin network. In every subnet round, Adapters obtain the pending transactions from the Bitcoin canister and queue them for being submitted asynchronously to the Bitcoin network. This leads to an efficient and quick distribution of transactions in the Bitcoin network as every replica of the subnet submits transactions via multiple connected nodes of the Bitcoin network.

### Novel threshold ECDSA protocol

Threshold ECDSA refers to the implementation of the ECDSA signature protocol using threshold cryptography. In a threshold ECDSA protocol, the private ECDSA key is secret shared between multiple parties and only an eligible quorum of the parties can generate a signature using their respective private key shares. The private key never exists in reconstructed form, but only in its secret-shared form. Key generation generates private key shares for the parties.

The threshold ECDSA protocol implemented as part of the Internet Computer\'s chain key technology toolbox uses a single master private key from which keys for canisters can be derived using BIP-32-like key derivation. Each canister has one such root key derived using the canister id and an arbitrary number of additional canister keys can be derived using a backward-compatible extension of BIP-32.

Threshold ECDSA on the Internet Computer will be rolled out to one signing subnet initially that will answer signing requests of canisters. The subnet enforces that only the canister that controls a key may request signatures with this key. All API calls go through Xnet traffic and thus incur some extra latency.

Canisters can query their own or other canisters\' public keys, including further derived public keys of canisters. Canisters can request signatures with private keys they control, i.e., their root private key and derived private key. For requests of public keys or signatures with derived keys, a derivation path can be specified in the respective API. You can find more details on threshold ECDSA [here](./t-ecdsa.md).

## Deployment Architecture

The Bitcoin functionality will be activated on a single subnet of the IC and API calls from canisters to the Bitcoin API are routed via Xnet communication, thus extra latency is incurred. The feature may, if needed, in the future be additionally activated on (some) application subnets to avoid the additional Xnet latency and to be able to respond to more requests per time unit.

Threshold ECDSA requests will equally be answered by a single active subnet, another subnet will back up the private key in secret-shared form for disaster recovery.

## API

The Bitcoin integration makes the following management canister APIs available to canisters (the threshold ECDSA API is explained in [its documentation page](./t-ecdsa.md) and the [interface specification](../../../references/ic-interface-spec.md)). Each Bitcoin-related method needs to specify whether it uses Bitcoin \`mainnet\` or \`testnet\`.

-   `bitcoin_get_utxos`: Given a `get_utxos_request`, which must specify a Bitcoin address and a Bitcoin network (mainnet or testnet), the function returns all unspent transaction outputs (UTXOs) associated with the provided address in the specified Bitcoin network based on the current view of the Bitcoin blockchain available to the Bitcoin component. The UTXOs are returned sorted by block height in descending order.
    > The optional filter parameter can be used to restrict the set of returned UTXOs, either providing a minimum number of confirmations or a page reference when pagination is used for addresses with many UTXOs. In the first case, only UTXOs with at least the provided number of confirmations are returned, i.e. transactions with fewer than this number of confirmations are not considered. In other words, if the number of confirmations is c, an output is returned if it occurred in a transaction with at least c confirmations and there is no transaction that spends the same output with at least c confirmations.\
    > A `get_utxos_request` without the optional filter results in a request that considers the full blockchain, which is equivalent to setting `min_confirmations` to 0.

-   `bitcoin_get_balance`: Given a `get_balance_request`, which must specify a Bitcoin address and a Bitcoin network (mainnet or testnet), the function returns the current balance of this address in Satoshi (10\^8 Satoshi = 1 Bitcoin) in the specified Bitcoin network. The same address formats as for `bitcoin_get_utxos` are supported.

-   `bitcoin_send_transaction`: Given a `send_transaction_request`, which must specify a blob of a Bitcoin transaction and a Bitcoin network (mainnet or testnet), several checks are performed, and, if successful, the transaction is forwarded to the Bitcoin network.

-   `bitcoin_get_current_fee_percentiles`: The transaction fees in the Bitcoin network change dynamically based on the number of pending transactions. It must be possible for a canister to determine an adequate fee when creating a Bitcoin transaction.
    > This function returns the 100 fee percentiles, measured in millisatoshi/byte (10\^3 millisatoshi = 1 satoshi), over the last 10,000 transactions, i.e., over the transactions in the last approximately 4-10 blocks.

We refer to the [Internet Computer Interface Specification](../../../references/ic-interface-spec.md) for the details of the Bitcoin integration API.

## Development, Pre-Production, and Production Stage

The Bitcoin functionality including threshold ECDSA is available in all stages required for the development life cycle on the IC:

-   The *SDK* for local development of canisters;

-   IC mainnet support as the pre-production environment for final testing on *Bitcoin testnet*;

-   IC mainnet support as the production environment for the release using *Bitcoin mainnet*.

### Local SDK

In the typical canister development workflow, canisters on the IC are compiled and run in the local environment using the Motoko or Rust canister SDK during their development. Thus, the SDK is the first stage of the development workflow. The SDK has been enabled to support both the Bitcoin integration and threshold ECDSA management canister APIs.

In contrast to the mainnet deployments of the feature, which integrate with Bitcoin testnet and Bitcoin mainnet, respectively, the SDK integrates with a locally-running bitcoind node in regression testing (regtest) mode. Using bitcoind in regtest mode is the preferred way of Bitcoin development. To facilitate our developers as best as possible, we integrated the SDK with bitcoind in regtest mode to bring the best Bitcoin development experience to the IC. Both development and automated testing of smart contracts are first done in the local environment.

The Bitcoin adapter of the single replica running the local SDK environment connects to the local bitcoind node instead of multiple nodes of Bitcoin testnet or mainnet. To see the relevant flags on dfx, please look at the output of `dfx start --help`.

### Bitcoin testnet on IC mainnet

Once a smart contract is ready for acceptance testing, it is deployed on IC mainnet (recall, there is no public IC testnet), still using the Bitcoin API set to connect to the Bitcoin testnet. This is the same setting used in local development. This setup is used to perform the acceptance testing of the dApp, using the Bitcoin testnet, i.e., no real value is at stake.

### Bitcoin mainnet on IC mainnet

The final stage of development of a Bitcoin smart contract is its deployment on IC mainnet with the Bitcoin API set to use Bitcoin mainnet. This is the final production environment for the smart contract. This is not yet available, but will be activated with the GA release.

## A Simple Example Canister -- Walkthrough

We will next show how to implement a simple example smart contract using the Bitcoin integration feature. Everything relevant will be explained, from installing the SDK, local development, to deploying the canister on IC mainnet and using the Bitcoin testnet integration.

The following walkthrough uses a minimal example canister that uses all the APIs of the Bitcoin and threshold ECDSA functionality. This code is publicly available on GitHub (link) and can serve as the basis for your own Bitcoin integration project.

Our minimal example is a simple canister with the following functionality:

-   Expose a Bitcoin address derived from an ECDSA public key

-   Accept Bitcoin payments on this address (implicit)

-   Query UTXOs / balance for the address

-   Transfer Bitcoin to another Bitcoin address

Note that the focus here is on simplicity and therefore we will not go into all the details of how to handle aspects such as the pitfalls of UTXO handling in the light of transactions that do not get mined etc.

### Getting Started

-   Download the latest SDK (minimum version 0.10.1)

-   Create new project

-   ...

### Accepting Payments

-   In order for a canister to accept a payment, it requires an ECDSA key

-   Threshold ECDSA for obtaining decentralized ECDSA

-   Reference to threshold ECDSA for details

-   Getting a threshold ECDSA public key; the private key is never held or seen by anyone

    -   Key derivation: see threshold ECDSA

-   Computing a Bitcoin address from the public key

-   Implementing API for accessing the Bitcoin address; now everyone can retrieve the address of the canister and send Bitcoin to it on the Bitcoin network; one address for now, generalization easy by using ECDSA key derivation

### Making a Payment

-   Making a few payments to the canister on local bitcoind regtest network

-   Tooling for bitcoind shown to audience

### Querying UTXOs

-   Querying the canister for the UTXOs of its address

-   Explaining the result

-   Explaining the confirmation count

### Creating a Transaction

-   Building a transaction from two UTXOs

-   Signing the transaction with threshold ECDSA; show Bitcoin-specific use of API (link to threshold ECDSA)

-   Determining the transaction fee

-   Submitting the transaction

-   Background explanation

-   Scenarios of failed transactions / resubmission

### Implementing API for making a Bitcoin payment

-   Using Bitcoin library transparently due to complexity

### Bitcoin Testnet Deployment

-   After local development: Bitcoin testnet on IC mainnet

-   Deploying the canister to IC mainnet, API used for Bitcoin testnet (implicit)

-   Making transactions on Bitcoin testnet

-   Testnet faucet to get testnet Bitcoin

-   Querying the canister

-   Making a transaction to send Bitcoin on Bitcoin testnet

-   Showing results on block explorer

**Comment:** Show the seamless transition from local SDK-based development to having a deployed canister on IC mainnet

-   Everything works on IC testnet / mainnet exactly as implemented locally

-   Differences come from Bitcoin, not our implementation (e.g., how you operate the local bitcoind or interact with Bitcoin testnet faucets)
