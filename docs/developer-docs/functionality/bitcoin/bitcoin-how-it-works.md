# How Bitcoin Integration Works — Technology Background

Bitcoin-enabling the IC has required us to solve two advanced engineering challenges: (1) A protocol-level integration of the IC with the Bitcoin network and (2) a novel threshold ECDSA protocol.

**Protocol-level integration of the IC with the Bitcoin network**

Through the protocol-level integration of the IC with the Bitcoin network, the IC can obtain Bitcoin blocks directly from the Bitcoin network and process the contained transactions. This allows for maintaining the full Bitcoin UTXO set on-chain on the IC. Canisters can run queries against the full Bitcoin UTXO set. This allows canisters to know about the held UTXOs, and thus balance, of any Bitcoin address, including their own addresses.

**Novel threshold ECDSA protocol**

Canisters themselves can have ECDSA keys using a novel threshold ECDSA protocol, and so can receive and hold Bitcoin. Canisters also can create Bitcoin transactions and submit them via the Bitcoin API to the Bitcoin network. They use the threshold ECDSA functionality to request threshold ECDSA signatures to spend UTXOs in a transaction to be submitted to the Bitcoin network. Threshold ECDSA is an extension of the IC's Chain Key cryptography toolbox of protocols. Details regarding the IC's threshold ECDSA protocol can be found on the threshold ECDSA documentation page [here](../t-ecdsa/t-ecdsa-how-it-works.md).

The protocol-level Bitcoin integration and threshold ECDSA protocol each expose an API on the management canister. Those APIs are the system-level APIs engineers use to write Bitcoin smart contracts on the IC. The APIs are low-level APIs designed around the concepts of Bitcoin UTXOs and transactions and are non-trivial to use and require an in-depth understanding of how Bitcoin works.

We next give a high-level overview of the abovementioned technology behind the direct Bitcoin integration. For details, we refer the reader to the [Bitcoin page on the Internet Computer Wiki](https://wiki.internetcomputer.org/wiki/Bitcoin_integration) as well as the [threshold ECDSA documentation page](../t-ecdsa/t-ecdsa-how-it-works.md).

## Protocol-level Integration of the IC with the Bitcoin Network

We integrated the Internet Computer Protocol with the Bitcoin protocol to obtain a direct technical integration between the two networks. This integration can be activated on any number of Internet Computer subnets. At the beginning, there will only be one dedicated Bitcoin-activated subnet and requests to the Bitcoin API from canisters on any subnet will be routed to this single Bitcoin-activated subnet. The integration serves two key purposes:
-   Obtaining the Bitcoin UTXO set and keeping it on chain in the replicated state of the Internet Computer to be able to answer queries for UTXO sets and balances of Bitcoin accounts issued by canisters.
-   Accepting signed Bitcoin transactions of canisters and submitting them to the Bitcoin network.

![Bitcoin Integration](../_attachments/bitcoin_integration.png)

**Components**

On a Bitcoin-activated subnet, a *BTC canister* (Bitcoin canister), implemented as part of the management canister, i.e, as part of the replica, is made accessible to canisters via an API of the management canister. The BTC canister holds the on-chain Bitcoin-related state: the UTXO set, the most recent Bitcoin blocks to allow for fork resolution, and outgoing transactions.

A *Bitcoin adapter* process at the networking layer connects to nodes of the Bitcoin network, much like a regular Bitcoin node does.

**Maintaining the Bitcoin UTXO set**

The BTC canister and adapter are integrated and communicate with each other via the IC's protocol stack: The BTC canister requests successor blocks to the latest Bitcoin blocks it has received from the Bitcoin adapter. The adapter on each replica of the subnet obtains the requested blocks from the Bitcoin network and the adapter of a block-making replica provides a requested block to the Bitcoin canister through consensus. The Bitcoin canister processes blocks in that it validates the proof of work, extracts the block's transactions, extracts the UTXOs from the transactions, and updates the UTXO set maintained in replicated state to reflect the UTXOs consumed and the UTXOs created by the transactions. The UTXO set and a set of recent blocks not yet absorbed into the UTXO set are used to respond to UTXO and balance requests.

Significant complexity of the implementation is in the area of securely resolving forks and protecting against various kinds of attacks. For example, in order to be able to resolve forks, the Bitcoin canister needs to maintain a certain number of Bitcoin blocks which are not yet absorbed into the maintained UTXO set, but UTXOs therein must be efficiently considered for calculating the UTXOs of a given address in addition to those in the UTXO set.

**Submitting transactions**

Canisters can submit Bitcoin transactions to the Bitcoin canister using the corresponding management canister API. Doing so queues the transactions for being submitted to the Bitcoin network. In every subnet round, Adapters obtain the pending transactions from the Bitcoin canister and queue them for being submitted asynchronously to the Bitcoin network. This leads to an efficient and quick distribution of transactions in the Bitcoin network as every replica of the subnet submits transactions via multiple connected nodes of the Bitcoin network.

## Novel Threshold ECDSA Protocol

Threshold ECDSA refers to the implementation of the ECDSA signature protocol using threshold cryptography. In a threshold ECDSA protocol, the private ECDSA key is secret shared between multiple parties and only an eligible quorum of the parties can generate a signature using their respective private key shares. The private key never exists in reconstructed form, but only in its secret-shared form. Key generation generates private key shares for the parties.

The threshold ECDSA protocol implemented as part of the Internet Computer's Chain Key cryptography toolbox uses a single master private key from which keys for canisters can be derived using BIP-32-like key derivation. Each canister has one such root key derived using the canister id and an arbitrary number of additional canister keys can be derived using a backward-compatible extension of BIP-32.

Threshold ECDSA on the Internet Computer is deployed on one signing subnet initially that will answer signing requests of canisters. The signing subnet enforces that only the canister that controls a key may request signatures with this key. All API calls need to go through Xnet traffic to reach the ECDSA subnet and thus incur extra latency accordingly.

Canisters can query their own or other canisters' public keys, including further derived public keys of canisters. Canisters can request signatures with private keys they control, i.e., their root private key and derived private keys. For requests of public keys or signatures with derived keys, a derivation path can be specified in the respective API or the derivation can be done using BIP-32. You can find more details on threshold ECDSA [here](../t-ecdsa/t-ecdsa-how-it-works.md).

## Deployment Architecture

The Bitcoin functionality will be activated on a single subnet of the IC and API calls from canisters to the Bitcoin API are routed via Xnet communication, thus extra latency is incurred. The feature may, if needed, in the future be additionally activated on (some) application subnets to avoid the additional Xnet latency and to be able to respond to more requests per time unit.

Threshold ECDSA requests will equally be answered by a single active subnet, another subnet will back up the private key in secret-shared form for disaster recovery.

## API

The Bitcoin integration makes the following management canister APIs available to canisters (the threshold ECDSA API is explained in [its documentation page](../t-ecdsa/t-ecdsa-how-it-works.md) and the [interface specification](../../../references/ic-interface-spec.md)). Each Bitcoin-related method needs to specify whether it uses Bitcoin `mainnet` or `testnet`.

-   `bitcoin_get_utxos`: Given a `get_utxos_request`, which must specify a Bitcoin address and a Bitcoin network (mainnet or testnet), the function returns all unspent transaction outputs (UTXOs) associated with the provided address in the specified Bitcoin network based on the current view of the Bitcoin blockchain available to the Bitcoin component. The UTXOs are returned sorted by block height in descending order.<br/>
The optional filter parameter can be used to restrict the set of returned UTXOs, either providing a minimum number of confirmations or a page reference when pagination is used for addresses with many UTXOs. In the first case, only UTXOs with at least the provided number of confirmations are returned, i.e. transactions with fewer than this number of confirmations are not considered. In other words, if the number of confirmations is c, an output is returned if it occurred in a transaction with at least c confirmations and there is no transaction that spends the same output with at least c confirmations.<br/>
A `get_utxos_request` without the optional filter results in a request that considers the full blockchain, which is equivalent to setting `min_confirmations` to 0.
-   `bitcoin_get_balance`: Given a `get_balance_request`, which must specify a Bitcoin address and a Bitcoin network (mainnet or testnet), the function returns the current balance of this address in Satoshi (10<sup>8</sup> Satoshi = 1 Bitcoin) in the specified Bitcoin network. The same address formats as for `bitcoin_get_utxos` are supported.
-   `bitcoin_send_transaction`: Given a `send_transaction_request`, which must specify a blob of a Bitcoin transaction and a Bitcoin network (mainnet or testnet), several checks are performed, and, if successful, the transaction is forwarded to the Bitcoin network.
-   `bitcoin_get_current_fee_percentiles`: The transaction fees in the Bitcoin network change dynamically based on the number of pending transactions. It must be possible for a canister to determine an adequate fee when creating a Bitcoin transaction.<br/>
This function returns the 100 fee percentiles, measured in millisatoshi/byte (10<sup>3</sup> millisatoshi = 1 satoshi), over the last 10,000 transactions, i.e., over the transactions in the last approximately 4-10 blocks. Please note that this usually gives a solid indication of the fees to be paid, but we do not consider the Bitcoin mempool in the computation of the fee percentiles.

We refer to the [Internet Computer Interface Specification](../../../references/ic-interface-spec.md) for the details of the Bitcoin integration API.

## Development, Pre-Production, and Production Environment

The Bitcoin functionality including threshold ECDSA is available in all stages required for the development life cycle on the IC:
-   The *SDK* for local development of canisters;
-   IC support as the pre-production environment for final testing on *Bitcoin testnet*;
-   IC support as the production environment for the release using *Bitcoin mainnet*.

### Local SDK

In the typical canister development workflow, canisters on the IC are compiled and run in the local environment using the Motoko or Rust canister SDK during their development. Thus, the SDK is the first stage, or environment, of the development workflow. The SDK has been enabled to support both the Bitcoin integration and threshold ECDSA management canister APIs.

In contrast to the IC deployments of the feature, which integrate with Bitcoin Testnet and Bitcoin Mainnet, respectively, the SDK integrates with a locally-running bitcoind node in regression testing (regtest) mode. Using bitcoind in regtest mode is the preferred way for Bitcoin development. To facilitate our developers as best as possible, we integrated the SDK with bitcoind in regtest mode to bring the best Bitcoin development experience to the IC. Both development and automated testing of smart contracts are first done in the local environment with this setup.

The Bitcoin adapter of the single replica running the local SDK environment connects to the local bitcoind node instead of multiple nodes of Bitcoin Testnet or Mainnet. To see the relevant flags on dfx, please look at the output of `dfx start --help`.

### Bitcoin Testnet on the IC

Once a smart contract is ready for acceptance testing, it is deployed on the IC (recall, there is no public IC testnet), still using the Bitcoin API set to connect to the Bitcoin testnet. This is the same setting as used in local development. This setup is used to perform the acceptance testing of the dApp, using the Bitcoin testnet, i.e., no real value is at stake.

### Bitcoin Mainnet on the IC

The final stage of development of a Bitcoin smart contract is its deployment on the IC with the Bitcoin API set to use Bitcoin Mainnet. This is the final production environment for the smart contract. This is not yet available, but will be activated with the GA release.

## Working with the Feature

To start building your own apps with Bitcoin see the following tutorials:

[Deploying Your First Bitcoin Dapp](../../../samples/deploying-your-first-bitcoin-dapp.md)

[Local Development](./local-development.md)
