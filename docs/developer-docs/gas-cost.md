# Gas and cycles cost

## Overview

The Internet Computer requires computation operations and storage to be supported by cycles. Cycles are generated from the conversion of Internet Computer (ICP) utility tokens.

### The role of the Network Nervous System (NNS) in defining costs

The Internet Computer is a decentralized public utility, controlled by the NNS – the network’s open, algorithmic governance system. The NNS fundamentally controls how many cycles are required for low-level computation actions for computation and storage. The number of cycles needed for individual computations will vary based on a number of factors considered by the NNS, including proposals from the community.

### Details: Cost of compute and storage transactions on the Internet Computer

Canister smart contract computations running on the Internet Computer blockchain are fueled by “cycles”, which play a similar role to “gas” on Ethereum. There are several major differences however. One of the most fundamental differences is that Ethereum leverages “user pays” and the Internet Computer leverages “smart contract pays” (sometimes called “reverse gas”) model. Whereas the Ethereum blockchain requires end users to send payments for the gas smart contracts consume with every transaction, on the Internet Computer, canister smart contracts are pre-charged with cycles, such that contracts effectively pay for their own computation - freeing users from the responsibility.

In late November 2022, high-replication application subnets have been made available on the Internet Computer. The first such subnets launched with a replication factor in the order of 30, different sizes may become available in the future. Cycles prices for the new high-replication subnets are scaled linearly based on the number of nodes from the base prices for 13-node subnets. The pricing mechanics for the Bitcoin Mainnet API is slightly different, see the [Bitcoin API documentation](./integrations/bitcoin/bitcoin-how-it-works.md) for details.

The following tables provide pricing in cycles and USD for the 13-node baseline and the example of 34-node subnets. The linear scaling for a transaction is computed using the following formula, where *n* is the size of the subnet to compute the price for, **13_node_price** is the price for the transaction on the reference-size subnet with 13 nodes, and **DIV** is integer division:

***Price on n-node subnet = (13_node_price \* n) DIV 13***

If you intend to deploy canisters on high-replication subnets, your canister should be prepared for an increase in cycles prices with an increase in the subnet's replication factor when the subnet grows over time. For this reason it is recommended to attach more cycles to a call than the current price for a high-replication subnet of a given size suggests.

See below for details on the cost of compute and storage transactions as well as management canister calls for new features on the Internet Computer as of December 2, 2022.
A thorough example how the cost of running a canister on a 13-node app subnet is computed can be found [here](https://wiki.internetcomputer.org/wiki/Comparing_Canister_Cycles_vs_Performance_Counter).

 | Transaction                          | Description                                                                                                      | Who is responsible for paying the transaction fee? | Local development ([IC SDK](./setup/index.md))             | 13-node Application Subnets           | 34-node Application Subnets        |
 | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------- | ------------------------------------- | ---------------------------------- |
| Canister Created                     | For creating canisters on a subnet                                                                               | Created canister | 100B / 13                             | 100B                                  | 100B / 13 * 34                     |
| Compute Percent Allocated Per Second | For each percent of the reserved compute allocation (a scarce resource).                                         | Canister with allocation | 10M / 13                              | 10M                                   | 10M / 13 * 34                      |
| Update Message Execution             | For every update message executed                                                                                | Target canister | 590K / 13                             | 590K                                  | 590K / 13 * 34                     |
| Ten Update Instructions Execution    | For every 10 instructions executed when executing update type messages                                           | Canister executing instructions | 4 / 13                                | 4                                     | 4 / 13 * 34                        |
| Xnet Call                            | For every inter-canister call performed (includes the cost for sending the request and receiving the response)   | Sending canister | 260K / 13                             | 260K                                  | 260K / 13 * 34                     |
| Xnet Byte Transmission               | For every byte sent in an inter-canister call (for bytes sent in the request and response)                       | Sending canister | 1K / 13                               | 1K                                    | 1K / 13 * 34                       |
 | Ingress Message Reception            | For every ingress message received                                                                               | Receiving canister | 1.2M / 13                             | 1.2M                                  | 1.2M / 13 * 34                     |
 | Ingress Byte Reception               | For every byte received in an ingress message                                                                    | Receiving canister | 2K / 13                               | 2K                                    | 2K / 13 * 34                       |
| GB Storage Per Second                | For storing a GB of data per second                                                                              | Canister with storage | 127K / 13                             | 127K                                  | 127K / 13 * 34                     |
 |                                      |                                                                                                                  |                                       |                                       |                                    |
 | _HTTPS outcalls_                     |                                                                                                                  |                                       |                                       |                                    |
 | HTTPS outcall (per call)                | For sending an HTTPS outcall to a server outside ICP, per message (`http_request`)                            | Sending canister | 3_060_000                             | 49_140_000                                  | 171_360_000                                        | 27,200                     |
| HTTPS outcall request message size (per byte)|	For sending an HTTPS outcall to a server outside ICP, per request byte (http_request) | Sending canister |	400	| 5,200	| 13,600 |
| HTTPS outcall response message size (per byte) |	For sending an HTTPS outcall to a server outside ICP, per reserved response byte (http_request)|	Sending canister | 800	| 10,400	| 27,200 |

Pricing for the **Bitcoin API** is available in the [Bitcoin API documentation](./integrations/bitcoin/bitcoin-how-it-works.md).

Pricing for the **Chain-Key Signing API** is available in the [Chain-Key Signing / threshold ECDSA documentation](./integrations/t-ecdsa/t-ecdsa-how-it-works.md).

:::note
* System API calls are just like normal function calls from the WebAssembly stand point. The number of instructions each call takes depends on the work done.
:::

The pricing for HTTPS outcalls is calculated in a slightly different way as the prices for other resources: The feature has a quadratic component in its implementation, which is reflected through the formula `(3_000_000 + 60_000 * n) * n` for the base fee and `400 * n` each request byte and `800 * n` for each response byte. Those formulas have been used in the table to obtain the concrete values for subnets of sizes 13 and 34.

The USD cost for transactions below is based on the above cycle costs. 1 XDR is equal to 1 Trillion cycles. As of November 23, 2022, the exchange rate for 1 XDR = $1.308860, which is used on this page. The exchange rate for USD/XDR may vary and it will impact the conversion rate. You can view XDR exchange rates [here](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).

To derive the estimated cost for a GB Storage per month, a 30 day month is assumed.

 | Transaction                          | Description                                                                                                      | Who is responsible for paying the transaction fee? |  13-node Application Subnets | 34-node Application Subnets |
 |--------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------|---------------------------|-----------------------------|
| Canister Created                     | For creating canisters on a subnet                                                                               | Created canister | $0.130886                   | $0.342317                   |
| Compute Percent Allocated Per Second | For each percent of the reserved compute allocation (a scarce resource).                                         | Canister with allocation | $0.0000130886               | $0.0000342317               |
| Update Message Execution             | For every update message executed                                                                                | Target canister | $0.0000007722274            | $0.0000020196705            |
| Ten Update Instructions Execution    | For every 10 instructions executed when executing update type messages                                           | Canister executing instructions | $0.000000000005235          | $0.000000000013089          |
| Xnet Call                            | For every inter-canister call performed (includes the cost for sending the request and receiving the response)   | Sending canister | $0.0000003403036            | $0.0000008900248            |
| Xnet Byte Transmission               | For every byte sent in an inter-canister call (for bytes sent in the request and response)                       | Sending canister | $0.00000000130886           | $0.00000000342267           |
| Ingress Message Reception            | For every ingress message received                                                                               | Receiving canister | $0.000001570632             | $0.000004107806             |
| Ingress Byte Reception               | For every byte received in an ingress message                                                                    | Receiving canister | $0.00000000261772           | $0.00000000684534           |
| GB Storage Per Second                | For storing a GB of data per second                                                                              | Canister with storage | $0.00000016622522           | $0.00000043474178           |
 |                                      |                                                                                                                  |                             |                             |
 | *HTTPS outcalls*                     |                                                                                                                  |                             |                             |
 | HTTPS outcall (per call)                | For sending an HTTPS outcall to a server outside ICP, per message (`http_request`)                            | Sending canister | $0.0000643173804               | $0.0002242862496 |
 | HTTPS outcall request message size (per byte)	| For sending an HTTPS outcall to a server outside ICP, per request byte (http_request)	| Sending canister | $0.000000006806072 |	$0.000000017800496 |
| HTTPS outcall response message size (per byte)	| For sending an HTTPS outcall to a server outside ICP, per reserved response byte (http_request) | Sending canister | $0.000000013612144	| $0.000000035600992 |

Cost per Transaction in USD (XDR/USD exchange rate as of November 23, 2022).

The following table shows the calculated storage cost per GB for a 30-day month: 

|                      |                                    | 13-node Application Subnets | 34-node Application Subnets |
|----------------------|------------------------------------|-----------------------------|-----------------------------|
| GB Storage Per Month | For storing a GB of data per month | $0.431                      | $1.127                      |
