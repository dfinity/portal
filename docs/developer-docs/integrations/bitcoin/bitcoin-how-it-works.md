# How Bitcoin Integration Works — Technology Background

Bitcoin-enabling the IC has required us to solve two advanced engineering challenges: (1) A protocol-level integration of the IC with the Bitcoin network and (2) a chain-key signatures based on a novel threshold ECDSA protocol.

**Protocol-level integration of the IC with the Bitcoin network**

Through the protocol-level integration of the IC with the Bitcoin network, the IC can obtain Bitcoin blocks directly from the Bitcoin network and process the contained transactions. This allows for maintaining the full Bitcoin UTXO set on-chain on the IC. Canisters can run queries against the full Bitcoin UTXO set. This allows canisters to know about the held UTXOs, and thus balance, of any Bitcoin address, including their own addresses.

**Chain-key ECDSA signatures**

Canisters themselves can have ECDSA keys using a novel chain-key ECDSA signature protocol suite for threshold ECDSA, and so can receive and hold Bitcoin. Canisters also can create Bitcoin transactions and submit them via the Bitcoin API to the Bitcoin network. They use the chain-key ECDSA functionality to request threshold ECDSA signatures to spend UTXOs in a transaction to be submitted to the Bitcoin network. Chain-key ECDSA signatures are a new member of the IC's Chain Key cryptography toolbox of protocols. Chain-key ECDSA signatures are much more than just a threshold ECDSA implementation as they for example also comprise protocols for secure distributed key generation and key rotation, which are crucial from a systems perspective to make threshold signing secure and practically viable. Details regarding the IC's chain-key ECDSA signature protocol can be found on the corresponding documentation page [here](../t-ecdsa/t-ecdsa-how-it-works.md).

The protocol-level Bitcoin integration and chain-key ECDSA signature protocols each expose an API on the management canister. Those APIs are the system-level APIs engineers use to write Bitcoin smart contracts on the IC. The APIs are low-level APIs designed around the concepts of Bitcoin UTXOs and transactions and are non-trivial to use and require an in-depth understanding of how Bitcoin works. The chain-key ECDSA signature API is also generically useful for any ECDSA use case, e.g., integration with other blockchains such as Ethereum.

We next give a high-level overview of the abovementioned technology behind the direct Bitcoin integration. For details, we refer the reader to the [Bitcoin page on the Internet Computer Wiki](https://wiki.internetcomputer.org/wiki/Bitcoin_integration) as well as the [threshold ECDSA documentation page](../t-ecdsa/t-ecdsa-how-it-works.md).

## Protocol-level Integration of the IC with the Bitcoin Network

We integrated the Internet Computer Protocol with the Bitcoin protocol to obtain a direct technical integration between the two networks. This integration can be activated on any number of Internet Computer subnets. At the beginning, there will only be one dedicated Bitcoin-activated subnet and requests to the Bitcoin API from canisters on any subnet will be routed to this single Bitcoin-activated subnet using the IC's XNet communication capabilities. The integration serves two key purposes:

-   Obtaining the Bitcoin UTXO set and keeping it on chain in the replicated state of the Internet Computer to be able to answer queries for UTXO sets and balances of Bitcoin accounts issued by canisters.
-   Accepting signed Bitcoin transactions of canisters and submitting them to the Bitcoin network.

![Bitcoin Integration](../_attachments/bitcoin_integration.png)

**Components**

On a Bitcoin-activated subnet, a *BTC canister* (Bitcoin canister), implemented as a regular NNS-managed Wasm canister is made accessible to canisters via an API of the management canister, i.e, the interface is implemented as part of the replica. The BTC canister holds the on-chain Bitcoin-related state: the UTXO set, the most recent Bitcoin blocks to allow for fork resolution ("unstable blocks"), and outgoing transactions.

A *Bitcoin adapter* process at the networking layer connects to nodes of the Bitcoin network, much like a regular Bitcoin node does.

**Maintaining the Bitcoin UTXO set**

The BTC canister and adapter are integrated and communicate with each other via the IC's protocol stack: The BTC canister requests successor blocks to the latest Bitcoin blocks it has received from the Bitcoin adapter. The adapter on each replica of the subnet obtains the requested blocks from the Bitcoin network and the adapter of a block-making replica provides a requested block to the Bitcoin canister through consensus. The Bitcoin canister processes blocks in that it validates the proof of work, extracts the block's transactions, extracts the UTXOs from the transactions, and updates the UTXO set maintained in replicated state to reflect the UTXOs consumed and the UTXOs created by the transactions. Both the UTXO set and a set of recent blocks not yet absorbed into the UTXO set (the unstable blocks) are used to respond to UTXO and balance requests.

Significant complexity of the implementation is in the area of securely resolving forks and protecting against various kinds of attacks. For example, in order to be able to resolve forks, the Bitcoin canister needs to maintain a certain number of Bitcoin blocks which are not yet absorbed into the maintained UTXO set, but UTXOs therein must be efficiently considered for calculating the UTXOs of a given address in addition to those in the UTXO set.

**Submitting transactions**

Canisters can submit Bitcoin transactions to the Bitcoin canister using the corresponding management canister API. Doing so queues the transactions for being submitted to the Bitcoin network. In every subnet round, Adapters obtain the pending transactions from the Bitcoin canister and queue them for being submitted asynchronously to the Bitcoin network. This leads to an efficient and quick distribution of transactions in the Bitcoin network as every replica of the subnet submits transactions via multiple connected nodes of the Bitcoin network.

## Chain-key ECDSA Signatures — A Novel Threshold ECDSA Protocol Suite

Chain-key signatures are realized with a novel threshold ECDSA protocol suite, i.e., an implementation of the ECDSA signature protocol using threshold cryptography. In a threshold ECDSA protocol, the private ECDSA key is secret shared between multiple parties and only an eligible quorum of the parties can generate a signature using their respective private key shares. The private key never exists in reconstructed form, but only in its secret-shared form. Key generation generates private key shares for the parties. But chain-key signing comprises much more than just the threshold ECDSA protocol, e.g., cryptographic multi-party computation protocols for secure threshold key generation and periodic key resharing for hardening the overall security.

The ECDSA chain-key signing protocol currently implemented uses a single master private key from which keys for canisters can be derived using BIP-32-like key derivation. Each canister has one such root key derived using the canister id and an arbitrary number of additional canister keys can be derived using a backward-compatible extension of BIP-32.

ECDSA chain-key signing is deployed on one signing subnet of the Internet Computer initially that will answer signing requests of canisters. The signing subnet enforces that only the canister that controls a key may request signatures with this key. All API calls made by canisters need to go through XNet traffic to reach the ECDSA subnet and thus incur the related extra latency accordingly to obtain a signature.

Canisters can query their own or other canisters' public keys, including further derived public keys of canisters. Canisters can request signatures with private keys they control, i.e., their root private key and derived private keys. For requests of public keys or signatures with derived keys, a derivation path can be specified in the respective API or the derivation can be done using BIP-32. You can find more details on the [ECDSA chain-key signatures page](../t-ecdsa/t-ecdsa-how-it-works.md).

## Deployment Architecture

The Bitcoin functionality will be activated on a single subnet of the IC and API calls from canisters to the Bitcoin API are routed via XNet communication, thus some extra latency is incurred. The Bitcoin canister may, if needed, in the future be additionally activated on some (application) subnets to avoid the additional XNet latency and to be able to respond to more requests per time unit.

Threshold ECDSA requests will equally be answered by a single active signing subnet, another subnet will back up the private key in secret-shared form for disaster recovery.

## API

The Bitcoin integration makes the following management canister APIs available to canisters (the ECDSA chain-key signatures API is explained in [its documentation page](../t-ecdsa/t-ecdsa-how-it-works.md) and the [interface specification](/references/ic-interface-spec.md)). Each Bitcoin-related method needs to specify whether it uses Bitcoin `mainnet` or `testnet`.

-   `bitcoin_get_utxos`: Given a `get_utxos_request`, which must specify a Bitcoin address and a Bitcoin network (mainnet or testnet), the function returns all unspent transaction outputs (UTXOs) associated with the provided address in the specified Bitcoin network based on the current view of the Bitcoin blockchain available to the Bitcoin component. The UTXOs are returned sorted by block height in descending order.<br/>
The optional filter parameter can be used to restrict the set of returned UTXOs, either providing a minimum number of confirmations or a page reference when pagination is used for addresses with many UTXOs. In the first case, only UTXOs with at least the provided number of confirmations are returned, i.e. transactions with fewer than this number of confirmations are not considered. In other words, if the number of confirmations is c, an output is returned if it occurred in a transaction with at least c confirmations and there is no transaction that spends the same output with at least c confirmations.<br/>
A `get_utxos_request` without the optional filter results in a request that considers the full blockchain, which is equivalent to setting `min_confirmations` to 0.
-   `bitcoin_get_balance`: Given a `get_balance_request`, which must specify a Bitcoin address and a Bitcoin network (mainnet or testnet), the function returns the current balance of this address in Satoshi (10<sup>8</sup> Satoshi = 1 Bitcoin) in the specified Bitcoin network. The same address formats as for `bitcoin_get_utxos` are supported.
-   `bitcoin_send_transaction`: Given a `send_transaction_request`, which must specify a blob of a Bitcoin transaction and a Bitcoin network (mainnet or testnet), several checks are performed, and, if successful, the transaction is forwarded to the Bitcoin network.
-   `bitcoin_get_current_fee_percentiles`: The transaction fees in the Bitcoin network change dynamically based on the number of pending transactions. It must be possible for a canister to determine an adequate fee when creating a Bitcoin transaction.<br/>
This function returns the 100 fee percentiles, measured in millisatoshi/byte (10<sup>3</sup> millisatoshi = 1 satoshi), over the last 10,000 transactions, i.e., over the transactions in the last approximately 4-10 blocks. Please note that this usually gives a solid indication of the fees to be paid, but we do not consider the Bitcoin mempool in the computation of the fee percentiles.

We refer to the [Internet Computer Interface Specification](/references/ic-interface-spec.md) for the details of the Bitcoin integration API.

## Development, Pre-Production, and Production Environment

The Bitcoin functionality including ECDSA chain-key signatures is available in all stages required for the development life cycle on the IC:
-   The *SDK* for local development of canisters;
-   IC support as the pre-production environment for final testing on *Bitcoin testnet*;
-   IC support as the production environment for the release using *Bitcoin mainnet*.

### Local SDK

In the typical canister development workflow, canisters on the IC are compiled and run in the local environment using the Motoko or Rust canister SDK during their development. Thus, the SDK is the first stage, or environment, of the development workflow. The SDK has been enabled to support both the Bitcoin integration and threshold ECDSA management canister APIs.

In contrast to the IC deployments of the feature, which integrate with Bitcoin Testnet and Bitcoin Mainnet, respectively, the SDK integrates with a locally-running bitcoind node in regression testing (regtest) mode. Using bitcoind in regtest mode is the preferred way for Bitcoin development. To facilitate our developers as best as possible, we integrated the SDK with bitcoind in regtest mode to bring the best Bitcoin development experience to the IC. Both development and automated testing of smart contracts are first done in the local environment with this setup.

The Bitcoin adapter of the single replica running the local SDK environment connects to the local bitcoind node instead of multiple nodes of Bitcoin Testnet or Mainnet. To see the relevant flags on dfx, please look at the output of `dfx start --help`.

### Bitcoin Testnet on the IC

Once a smart contract is ready for acceptance testing, it is deployed on the IC mainnet (recall, there is no public IC testnet), still using the Bitcoin API set to connect to the Bitcoin testnet. This is the same setting as used in local development. This setup is used to perform the acceptance testing of the dApp, using the Bitcoin testnet and a test chain-key ECDSA key, i.e., no real value is at stake.

### Bitcoin Mainnet on the IC

The final stage of development of a Bitcoin smart contract is its deployment on the IC with the Bitcoin API set to use Bitcoin Mainnet. This is the final production environment for the smart contract and is now available.

## API Fees

The fees for using the Bitcoin API can be found on the [page on computation and storage costs](https://internetcomputer.org/docs/current/developer-docs/deploy/computation-and-storage-costs). It is important to note that the cost is scaled with the replication factor of the subnet the Bitcoin canister resides on. In order for the API to be future proof, some of the methods require to send more cycles along with an API call than actually required and any cycles exceeding the actually-charged cost are refunded.


| Transaction                          | Description                                                                                                    | 13-node Application Subnets | 34-node Application Subnets |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------|
| *Coding Bitcoin*                     |                                                                                                                |                             |                             |
| Bitcoin UTXO set for an address      | For retrieving the UTXO set for a Bitcoin address (`bitcoin_get_utxos`)                                        | 20,000,000 + 0.4 cycles per Wasm instruction       | 50,000,000 + 1 cycle per Wasm instruction |
| Bitcoin fee percentiles              | For obtaining the fe percentiles of the most recent transactions (`bitcoin_get_current_fee_percentiles`)       | 4,000,000                 | 10,000,000                    |
| Bitcoin balance for an address       | For retrieving the balance of a given Bitcoin address (`bitcoin_get_balance`)                                  | 4,000,000                 | 10,000,000                    |
| Bitcoin transaction submission       | For submitting a Bitcoin transaction to the Bitcoin network, per transaction (`bitcoin_send_transaction`)      | 2,000,000,000               | 5,000,000,000               |
| Bitcoin transaction payload          | For submitting a Bitcoin transaction to the Bitcoin network, per byte of payload (`bitcoin_send_transaction`)  | 8,000,000                  | 20,000,000                   |

Cost per API call in USD (as of the USD/XDR exchange rate of November 23, 2022):

| Transaction                          | Description                                                                                                    | 13-node Application Subnets | 34-node Application Subnets |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------|
| *Coding Bitcoin*                     |                                                                                                                |                             |                             |
| Bitcoin UTXO set for an address      | For retrieving the UTXO set for a Bitcoin address (`bitcoin_get_utxos`)                                        | $0.00002617720 + Wasm instruction cost             | $0.00006544300 + Wasm instruction cost |
| Bitcoin fee percentiles              | For obtaining the fe percentiles of the most recent transactions (`bitcoin_get_current_fee_percentiles`)       | $0.00000523544              | $0.00001308860              |
| Bitcoin balance for an address       | For retrieving the balance of a given Bitcoin address (`bitcoin_get_balance`)                                  | $0.00000523544              | $0.00001308860              |
| Bitcoin transaction submission       | For submitting a Bitcoin transaction to the Bitcoin network, per transaction (`bitcoin_send_transaction`)      | $0.00261772000              | $0.00654430000              |
| Bitcoin transaction payload          | For submitting a Bitcoin transaction to the Bitcoin network, per byte of payload (`bitcoin_send_transaction`)  | $0.00001047088              | $0.00002617720              |

Some Bitcoin API calls must have at least the following amount of cylces attached to be future proof. Cycles not consumed by the call are returned. This figure does not depend on the replication factor of the subnet, but is intended to allow for the replication factor to grow over time without canisters to be adapted. The call for submitting a Bitcoin transaction to the Bitcoin network does not require to attach extra cycles as the charged cost is independent of the replication factor of the subnet.

| API call | Minimum cycles to be attached (Bitcoin mainnet)| Minimum cycles to be attached (Bitcoin testnet)|
|----------|------------------------------------------------|------------------------------------------------|
| `get_utxos` | 10,000,000,000 | 4,000,000,000 |
| `get_balance` | 100,000,000 | 40,000,000 |
| `get_current_fee_percentiles` | 40,000,000 |

The `bitcoin_get_utxos` call is charged through a baseline fee that amortizes part of the Bitcoin block processing and the cycles cost of the actually-consumed Wasm instructions. This is the fairest way of charging because a flat fee would be less fair for requests returning a small number of UTXOs, while a fee scaling with the number of UTXOs is hard to define in a clean way. A few informal test measurement have yielded Wasm execution fees anywhere in the range from less than 200K to more than 1,000K cycles per returned UTXO and in addition 30M-50M cycles for processing of the unstable blocks. This wide variance per UTXO was the reason to not use a charging approach based on the number of UTXOs returned, but it should give you a rough indication of what to expect to pay in terms of fees. For queries with a small number of UTXOs, you can expect around 100M cycles as fee to be deducted from the provided cycles on the call for a majority of calls.

Pricing for Bitcoin Testnet remains as is for now in order to not break existing canisters.

## Working with the Feature

To start building your own apps with Bitcoin see the following tutorials:

[Deploying Your First Bitcoin Dapp](../../../samples/deploying-your-first-bitcoin-dapp.md)

[Local Development](./local-development.md)
