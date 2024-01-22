# Bitcoin integration: technology overview

## Overview

Smart contracts running on ICP can directly interact with the Bitcoin network without any bridges. This is possible because ICP nodes can fetch and validate the Bitcoin network's blocks, then make them available for smart contracts to query and read.

Being able to read the Bitcoin state fully on-chain enables many use cases. However, for the full integration, ICP allows smart contracts to submit Bitcoin transactions. This is possible because smart contracts can have [decentralized private keys for signing Bitcoin transactions.](https://medium.com/dfinity/how-icps-bitcoin-integration-secures-private-keys-c2af14597846)

![Bitcoin Integration](../_attachments/bitcoin_integration.png)

The basis of this integration includes a protocol-level integration with the Bitcoin network and smart contracts holding ECDSA keys that use a novel [chain-key ECDSA signature protocol](../t-ecdsa/t-ecdsa-how-it-works.md). Each expose an API used to write Bitcoin smart contracts on ICP. 

API calls from canisters to the Bitcoin API are routed via XNet communication. Threshold ECDSA requests are answered by a signing subnet, with another subnet backing up the private key in secret-shared form for disaster recovery.

## Reading the Bitcoin state

To read information from the Bitcoin state, you can make a call to the Bitcoin API endpoints `bitcoin_get_balance`, `bitcoin_get_utxos`, and `bitcoin_get_current_fee_percentiles`.

[Learn more about how to use the Bitcoin API.](/docs/current/references/ic-interface-spec/#ic-bitcoin-api)

## Submitting transactions

Canisters can submit Bitcoin transactions to the Bitcoin canister using the corresponding API. When a transaction is submitted:

- The transaction is queued to be submitted to the Bitcoin network.
- In each subnet round the adapters queue each pending transaction.
- The transactions are submitted asynchronously to the Bitcoin network. 

This results in efficient and quick distribution of Bitcoin transactions as every replica of the subnet submits transactions via multiple connections to the Bitcoin network.

[Learn more about how to submit transactions.](/docs/current/references/ic-interface-spec/#ic-bitcoin-api)

## API fees & pricing

The cost of API calls for the Bitcoin testnet and Bitcoin mainnet APIs is presented in the following tables in cycles and USD. Some API calls must have a minimum amount of cycles attached to the call as indicated in the column *Minimum cycles to send with call*. Cycles not consumed by the call are returned to the caller. 

Requiring a relatively large minimum number of cycles makes it possible to change the pricing of API calls without breaking existing smart contracts when the Bitcoin subnet grows in terms of replication. The call for submitting a Bitcoin transaction to the Bitcoin network does not require extra cycles to be attached as the charged cost is independent of the replication factor of the subnet.

The price of cycles is fixed against the price of XDR. [Learn more about cycles and XDR.](/docs/current/developer-docs/gas-cost)

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

- [Local development workflow](local-development.mdx).

- [Developer journey: ckBTC and Bitcoin integration](/docs/current/tutorials/developer-journey/level-4/4.3-ckbtc-and-bitcoin).

- [Deploying your first Bitcoin dapp](https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin).

- [Creating a ckBTC point of sale dapp](https://github.com/dfinity/examples/tree/master/motoko/ic-pos).
