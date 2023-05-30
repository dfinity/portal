# Gas and cycles cost

## Overview

The Internet Computer requires computation operations and storage to be supported by cycles. Cycles are generated from the conversion of Internet Computer (ICP) utility tokens.

### The role of the Network Nervous System (NNS) in defining costs

The Internet Computer is a decentralized public utility, controlled by the NNS –– the network’s open, algorithmic governance system. The NNS fundamentally controls how many cycles are required for low-level computation actions for computation and storage. The number of cycles needed for individual computations will vary based on a number of factors considered by the NNS, including proposals from the community.

### Details: Cost of compute and storage transactions on the Internet Computer

Canister smart contract computations running on the Internet Computer blockchain are fueled by “cycles”, which play a similar role to “gas” on Ethereum. There are several major differences however. One of the most fundamental differences is that Ethereum leverages “user pays” and the Internet Computer and “smart contract pays” (sometimes called “reverse gas”) model. Whereas the Ethereum blockchain requires end users to send payments for the gas smart contracts consume with every transaction, on the Internet Computer, canister smart contracts are pre-charged with cycles, such that contracts effectively pay for their own computation - freeing users from the responsibility.

In late November 2022, high-replication application subnets have been made available on the Internet Computer. The first such subnets launch with a replication factor in the order of 30, different sizes may be available in the future. Cycles prices for the new high-replication subnets are scaled linearly based on the number of nodes from the base prices for 13-node subnets. The Bitcoin API is an exception to linear scaling, see the note below. The following tables provide pricing in cycles and USD for the 13-node baseline and the example of 34-node subnets. The linear scaling for a transaction is computed using the following formula, where *n* is the size of the subnet to compute the price for, **13_node_price** is the price for the transaction on the reference-size subnet with 13 nodes, and **DIV** is integer division:

***Price on n-node subnet = (13_node_price \* n) DIV 13***

If you intend to deploy canisters on high-replication subnets, your canister should be prepared for an increase in cycles prices with an increase in the subnet's replication factor when the subnet grows over time. For this reason it is recommended to attach more cycles to a call than the current price for a high-replication subnet of a given size suggests.

See below for details on the cost of compute and storage transactions as well as management canister calls for new features on the Internet Computer as of December 2, 2022.
A thorough example how the cost of running a canister on a 13-node app subnet is computed can be found [here](https://medium.com/@DBOXFoundation/findings-from-calculating-the-cycle-consumption-of-messity-a-universal-example-b2af8dcd3151).

| Transaction                          | Description                                                                                                      | Local development ([IC SDK](./setup/index.md))             | 13-node Application Subnets           | 34-node Application Subnets        |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------- | ---------------------------------- |
| Canister Created                     | For creating canisters on a subnet                                                                               | 100B / 13                             | 100B                                  | 100B / 13 * 34                     |
| Compute Percent Allocated Per Second | For each percent of the reserved compute allocation (a scarce resource).                                         | 10M / 13                              | 10M                                   | 10M / 13 * 34                      |
| Update Message Execution             | For every update message executed                                                                                | 590K / 13                             | 590K                                  | 590K / 13 * 34                     |
| Ten Update Instructions Execution    | For every 10 instructions executed when executing update type messages                                           | 4 / 13                                | 4                                     | 4 / 13 * 34                        |
| Xnet Call                            | For every inter-canister call performed (includes the cost for sending the request and receiving the response)   | 260K / 13                             | 260K                                  | 260K / 13 * 34                     |
| Xnet Byte Transmission               | For every byte sent in an inter-canister call (for bytes sent in the request and response)                       | 1K / 13                               | 1K                                    | 1K / 13 * 34                       |
| Ingress Message Reception            | For every ingress message received                                                                               | 1.2M / 13                             | 1.2M                                  | 1.2M / 13 * 34                     |
| Ingress Byte Reception               | For every byte received in an ingress message                                                                    | 2K / 13                               | 2K                                    | 2K / 13 * 34                       |
| GB Storage Per Second                | For storing a GB of data per second                                                                              | 127K / 13                             | 127K                                  | 127K / 13 * 34                     |
| GB Storage Per Second                | For storing a GB of data per second                                                                              | 127K / 13                             | 127K                                  | 127K / 13 * 34                     |
|                                      |                                                                                                                  |                                       |                                       |                                    |
| _Chain-key signatures_               |                                                                                                                  |                                       |                                       |                                    |
| Threshold ECDSA signing              | For computing one threshold ECDSA signature (`sign_with_ecdsa`)                                                  | 10B / 13                              | 10B                                   | 10B / 13 * 34                      |
|                                      |                                                                                                                  |                                       |                                       |                                    |
| _Coding Bitcoin_                     |                                                                                                                  |                                       |                                       |                                    |
| Bitcoin UTXO set for an address      | For retrieving the UTXO set for a Bitcoin address (`bitcoin_get_utxos`)                                          | 20M + 0.4 cycles per Wasm instruction | 20M + 0.4 cycles per Wasm instruction | 50M + 1 cycle per Wasm instruction |
| Bitcoin fee percentiles              | For obtaining the fee percentiles of the most recent transactions (`bitcoin_get_current_fee_percentiles`)        | 4M                                    | 4M                                    | 10M                                |
| Bitcoin balance for an address       | For retrieving the balance of a given Bitcoin address (`bitcoin_get_balance`)                                    | 4M                                    | 4M                                    | 10M                                |
| Bitcoin transaction submission       | For submitting a Bitcoin transaction to the Bitcoin network, per transaction (`bitcoin_send_transaction`)        | 2B                                    | 2B                                    | 5B                                 |
| Bitcoin transaction payload          | For submitting a Bitcoin transaction to the Bitcoin network, per byte of payload (`bitcoin_send_transaction`)    | 8M                                    | 8M                                    | 20M                                |
|                                      |                                                                                                                  |                                       |                                       |                                    |
| _HTTPS outcalls_                     |                                                                                                                  |                                       |                                       |                                    |
| HTTPS outcall request                | For sending an HTTPS outcall to a server outside the IC, per message (`http_request`)                            | 400M / 13                             | 400M                                  | 400M / 13 * 34                     |
| HTTPS outcall payload                | For sending an HTTPS outcall to a server outside the IC, per request and reserved response byte (`http_request`) | 100K / 13                             | 100K                                  | 100K / 13 * 34                     |

### **Notes:**
* System API calls are just like normal function calls from the WebAssembly stand point. The number of instructions each call takes depends on the work done.
* The Bitcoin canister for Bitcoin mainnet is launched initially on a 13-node subnet but the 34-node price as advertised above is charged to avoid frequent price changes. ***The Bitcoin API requires to send more cycles as specified for future-proofness.*** See the [Bitcoin documentation](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/bitcoin-how-it-works) for further details regarding the specifics of Bitcoin pricing.
* Prices for Bitcoin testnet are 40% of the prices for Bitcoin mainnet.

The USD cost for transactions below is based on the above cycle costs. 1 XDR is equal to 1 Trillion cycles. As of November 23, 2022, the exchange rate for 1 XDR = $1.308860, which is used on this page. The exchange rate for USD/XDR may vary and it will impact the conversion rate. You can view XDR exchange rates [here](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).

To derive the estimated cost for a GB Storage per month, we assume a 30 day month.

| Transaction                          | Description                                                                                                      | 13-node Application Subnets | 34-node Application Subnets |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------|-----------------------------|
| Canister Created                     | For creating canisters on a subnet                                                                               | $0.130886                   | $0.342317                   |
| Compute Percent Allocated Per Second | For each percent of the reserved compute allocation (a scarce resource).                                         | $0.0000130886               | $0.0000342317               |
| Update Message Execution             | For every update message executed                                                                                | $0.0000007722274            | $0.0000020196705            |
| Ten Update Instructions Execution    | For every 10 instructions executed when executing update type messages                                           | $0.000000000005235          | $0.000000000013089          |
| Xnet Call                            | For every inter-canister call performed (includes the cost for sending the request and receiving the response)   | $0.0000003403036            | $0.0000008900248            |
| Xnet Byte Transmission               | For every byte sent in an inter-canister call (for bytes sent in the request and response)                       | $0.00000000130886           | $0.00000000342267           |
| Ingress Message Reception            | For every ingress message received                                                                               | $0.000001570632             | $0.000004107806             |
| Ingress Byte Reception               | For every byte received in an ingress message                                                                    | $0.00000000261772           | $0.00000000684534           |
| GB Storage Per Second                | For storing a GB of data per second                                                                              | $0.00000016622522           | $0.00000043474178           |
|                                      |                                                                                                                  |                             |                             |
| *Chain-key signatures*               |                                                                                                                  |                             |                             |
| Threshold ECDSA signing              | For computing one threshold ECDSA signature (`sign_with_ecdsa`)                                                  | $0.0130886                  | $0.0342317                  |
|                                      |                                                                                                                  |                             |                             |
| *Coding Bitcoin*                     |                                                                                                                  |                             |                             |
| Bitcoin UTXO set for an address      | For retrieving the UTXO set for a Bitcoin address (`bitcoin_get_utxos`)                                          | $0.00002617720 + Wasm instruction cost                    | $0.00006544300 + Wasm instruction cost |
| Bitcoin fee percentiles              | For obtaining the fee percentiles of the most recent transactions (`bitcoin_get_current_fee_percentiles`)        | $0.00000523544              | $0.00001308860              |
| Bitcoin balance for an address       | For retrieving the balance of a given Bitcoin address (`bitcoin_get_balance`)                                    | $0.00000523544              | $0.00001308860              |
| Bitcoin transaction submission       | For submitting a Bitcoin transaction to the Bitcoin network, per transaction (`bitcoin_send_transaction`)        | $0.00261772000              | $0.00654430000              |
| Bitcoin transaction payload          | For submitting a Bitcoin transaction to the Bitcoin network, per byte of payload (`bitcoin_send_transaction`)    | $0.00001047088              | $0.00002617720              |
|                                      |                                                                                                                  |                             |                             |
| *HTTPS outcalls*                     |                                                                                                                  |                             |                             |
| HTTPS outcall request                | For sending an HTTPS outcall to a server outside the IC, per message (`http_request`)                            | $0.0005235440               | $0.0013692689               |
| HTTPS outcall payload                | For sending an HTTPS outcall to a server outside the IC, per request and reserved response byte (`http_request`) | $0.0000001308860            | $0.0000003423166            |

Cost per Transaction in USD (XDR/USD exchange rate as of November 23, 2022):

Assuming a 30 day month — 

|                      |                                    | 13-node Application Subnets | 34-node Application Subnets |
|----------------------|------------------------------------|-----------------------------|-----------------------------|
| GB Storage Per Month | For storing a GB of data per month | $0.431                      | $1.127                      |
