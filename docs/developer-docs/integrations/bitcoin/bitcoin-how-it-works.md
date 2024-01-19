# Bitcoin integration: technology overview

## Overview


The Internet Computer Protocol has been integrated with the Bitcoin network to obtain a direct technical integration between the two. 

![Bitcoin Integration](../_attachments/bitcoin_integration.png)

The basis of this integration includes:

- A protocol-level integration of ICP with the Bitcoin network: ICP obtains Bitcoin blocks and transactions directly from the Bitcoin network, making it possible to maintain the full Bitcoin UTXO set on ICP. Canisters can run queries against the full Bitcoin UTXO set, allowing them to know about the held UTXOs, and thus balance, of any Bitcoin address, including their own.

- A chain-key signatures: Canisters can have ECDSA keys using a novel [chain-key ECDSA signature protocol](../t-ecdsa/t-ecdsa-how-it-works.md) suite for threshold ECDSA. This enables them create Bitcoin transactions, submit them via the Bitcoin API to the Bitcoin network, and receive and hold bitcoin. Chain-key ECDSA is used to request threshold ECDSA signatures to spend UTXOs in a Bitcoin transaction. 

The integration and chain-key ECDSA signature protocols each expose an API on the management canister which are used by engineers to write Bitcoin smart contracts on ICP. These APIs are low-level and designed around the concepts of Bitcoin UTXOs and transactions. They are non-trivial and require an in-depth understanding of how Bitcoin works. The chain-key ECDSA signature API can be used for integrations with other blockchains.

## Components

The following components are used on subnets that have activated the Bitcoin integration:

- BTC canister: Implemented as a regular NNS-managed Wasm canister is made accessible to other canisters via an API of the management canister. It holds the on-chain Bitcoin-related state (the UTXO set, the most recent Bitcoin blocks, and outgoing transactions).

- Bitcoin adapter: Connects to nodes of the Bitcoin network, much like a regular Bitcoin node does.

## Maintaining the Bitcoin UTXO set

The BTC canister and adapter communicate with each other via ICP's protocol stack: 

- The BTC canister receives blocks from the adapter. It requests the successor blocks to the latest blocks it has received. 

- The adapter on each replica of the subnet obtains the requested blocks from the Bitcoin network. A block-making replica provides the requested block to the Bitcoin canister.

- The Bitcoin canister processes blocks by validating them, extracting the transactions and UTXOs, and updating the UTXO set maintained in the replica. 

This implementation securely resolves forks and protects against various kinds of attacks by maintaining a certain number of Bitcoin blocks which are not yet absorbed into the maintained UTXO set. 

## Submitting transactions

Canisters can submit Bitcoin transactions to the Bitcoin canister using the corresponding management canister API. When a transaction is submitted:

- The transaction is queued to be submitted to the Bitcoin network.
- In each subnet round the adapters queue each pending transaction.
- The transactions are submitted asynchronously to the Bitcoin network. 

This results in efficient and quick distribution of Bitcoin transactions as every replica of the subnet submits transactions via multiple connections to the Bitcoin network.

## Deployment architecture

API calls from canisters to the Bitcoin API are routed via XNet communication. Threshold ECDSA requests are answered by a signing subnet, with another subnet backing up the private key in secret-shared form for disaster recovery.

## Development, pre-production, and production environment

The Bitcoin functionality (including ECDSA chain-key signatures) is available in all stages of the development life cycle:
-   The **IC SDK** for local development.
-   The **Bitcoin testnet** for pre-production testing. 
-   The **Bitcoin mainnet** for production environments. 

### Local development

Using the [IC SDK](../../setup/install/index.mdx) is the first stage of the ICP development workflow, where canisters are compiled and run in a local environment. The IC SDK supports both the Bitcoin integration and threshold ECDSA management canister APIs.

The IC SDK integrates with a locally-running `bitcoind` node in regression testing (regtest) mode, which is the preferred workflow for Bitcoin development. The Bitcoin adapter of the single replica running the local SDK environment connects to the local `bitcoind` node instead of multiple nodes of the Bitcoin testnet or mainnet. Both development and automated testing of smart contracts are first done in the local environment with this setup.

### Bitcoin testnet on ICP

Once a smart contract is ready for acceptance testing, it is deployed on the mainnet (as is no public ICP testnet). It uses the Bitcoin API to connect to the Bitcoin testnet. This is the same setting used in local development. This setup is used to perform the acceptance testing of the smart contract using the Bitcoin testnet and a test chain-key ECDSA key, such that no real value is at stake.

### Bitcoin mainnet on ICP

The final stage of developing a Bitcoin smart contract on ICP is to use Bitcoin Mainnet. This is the final production environment.

## API fees & pricing

The cost of API calls for the Bitcoin testnet and Bitcoin mainnet APIs is presented in the following tables in cycles and USD. Some API calls must have a minimum amount of cycles attached to the call as indicated in the column *Minimum cycles to send with call*. Cycles not consumed by the call are returned to the caller. 

Requiring a relatively large minimum number of cycles makes it possible to change the pricing of API calls without breaking existing smart contracts when the Bitcoin subnet grows in terms of replication. The call for submitting a Bitcoin transaction to the Bitcoin network does not require extra cycles to be attached as the charged cost is independent of the replication factor of the subnet.

The price of cycles is fixed against the price of XDR. [Learn more about cycles and XDR.](/docs/current/developer-docs/gas-cost.md)

### Bitcoin testnet

| Transaction                          | Description                                                                                                    | Price (Cycles) | Price (USD) | Minimum cycles to send with call |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------|------------------|
| Bitcoin UTXO set for an address      | Retrieving the UTXO set for a Bitcoin address (`bitcoin_get_utxos`)                                        | 20_000_000 + 0.4 cycles per Wasm instruction | $0.00002617720 + Wasm instruction cost | 4_000_000_000 |
| Bitcoin fee percentiles              | Obtaining the fee percentiles of the most recent transactions (`bitcoin_get_current_fee_percentiles`)       | 4_000_000                 | $0.00000523544                    | 40_000_000 |
| Bitcoin balance for an address       | Retrieving the balance of a given Bitcoin address (`bitcoin_get_balance`)                                  | 4_000_000                 | $0.00000523544                    | 40_000_000 |
| Bitcoin transaction submission       | Submitting a Bitcoin transaction to the Bitcoin network, per transaction (`bitcoin_send_transaction`)      | 2_000_000_000             | $0.00261772000                    | N/A       |
| Bitcoin transaction payload          | Submitting a Bitcoin transaction to the Bitcoin network, per byte of payload (`bitcoin_send_transaction`)  | 8_000_000                 | $0.00001047088                    | N/A       |

### Bitcoin mainnet

| Transaction                          | Description                                                                                                    | Price (Cycles) | Price (USD) | Minimum cycles to send with call |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------|------------------|
| Bitcoin UTXO set for an address      | For retrieving the UTXO set for a Bitcoin address (`bitcoin_get_utxos`)                                        | 50_000_000 + 1 cycle per Wasm instruction | $0.00006544300 + Wasm instruction cost | 10_000_000_000 |
| Bitcoin fee percentiles              | For obtaining the fee percentiles of the most recent transactions (`bitcoin_get_current_fee_percentiles`)       | 10_000_000                 | $0.00001308860 | 100_000_000 |
| Bitcoin balance for an address       | For retrieving the balance of a given Bitcoin address (`bitcoin_get_balance`)                                  | 10_000_000                 | $0.00001308860                    | 100_000_000 |
| Bitcoin transaction submission       | For submitting a Bitcoin transaction to the Bitcoin network, per transaction (`bitcoin_send_transaction`)      | 5_000_000_000             | $0.00654430000                    | n.a.       |
| Bitcoin transaction payload          | For submitting a Bitcoin transaction to the Bitcoin network, per byte of payload (`bitcoin_send_transaction`)  | 20_000_000                 | $0.00002617720                    | n.a.       |

:::note
The `bitcoin_get_utxos` call is charged through a baseline fee that amortizes part of the Bitcoin block processing and the cycles cost of the actually-used Wasm instructions.
:::

## Further reading

- [ckBTC API reference](ckbtc.md).

- [GitHub repository](https://github.com/dfinity/ic/tree/master/rs/bitcoin/ckbtc/minter).

- [Local development workflow](local-development.md).

- [Developer journey: ckBTC and Bitcoin integration](/docs/current/tutorials/developer-journey/level-4/4.3-ckbtc-and-bitcoin).

- [Deploying your first Bitcoin dapp](https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin).

- [Creating a ckBTC point of sale dapp](https://github.com/dfinity/examples/tree/master/motoko/ic-pos).


