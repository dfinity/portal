# Gas and cycles cost

## Overview

The Internet Computer requires computation operations and storage to be supported by cycles. Cycles are generated from the conversion of Internet Computer (ICP) utility tokens.

Canister smart contract computations running on the Internet Computer blockchain are fueled by “cycles”, which play a similar role to “gas” on Ethereum. There are several major differences however. One of the most fundamental differences is that Ethereum leverages “user pays” and the Internet Computer leverages “smart contract pays” (sometimes called “reverse gas”) model. Whereas the Ethereum blockchain requires end users to send payments for the gas smart contracts consume with every transaction, on the Internet Computer, canister smart contracts are pre-charged with cycles, such that contracts effectively pay for their own computation - freeing users from the responsibility.

1 XDR is equal to 1 Trillion cycles. As of December 18, 2022, the exchange rate for 1 XDR = $1.336610, which is used on this page. The exchange rate for USD/XDR may vary and it will impact the conversion rate. You can view XDR exchange rates [here](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).

In late November 2022, high-replication application subnets have been made available on the Internet Computer. The first such subnets launched with a replication factor in the order of 30, different sizes may become available in the future. Cycles prices for the new high-replication subnets are scaled linearly based on the number of nodes from the base prices for 13-node subnets. The pricing mechanics for the Bitcoin Mainnet API is slightly different, see the [Bitcoin API documentation](./integrations/bitcoin/bitcoin-how-it-works.md) for details.

## The role of the Network Nervous System (NNS) in defining costs

The Internet Computer is a decentralized public utility, controlled by the NNS – the network’s open, algorithmic governance system. The NNS fundamentally controls how many cycles are required for low-level computation actions for computation and storage. The number of cycles needed for individual computations will vary based on a number of factors considered by the NNS, including proposals from the community.

## Overview: Estimated cost of sample project architectures

To get a rough estimate of how much your project may cost, below are a few common project architectures and their estimated monthly cost in cycles. For detailed breakdowns of each cycles cost, please refer to the chart below in [Details: Cost of compute and storage transactions on the Internet Computer](#details-cost-of-compute-and-storage-transactions-on-the-internet-computer).

:::info
The estimates below are simply for demonstrating what different sample architectures may cost. The actual cost of your project will vary based on the exact number of resources and canister calls that are used. Therefore, the estimates below should only be used for gaining an idea of what a project may cost, but should not be used for budgeting exact costs. For exact costs, you can calculate using the chart below for more details: [Details: Cost of compute and storage transactions on the Internet Computer](#details-cost-of-compute-and-storage-transactions-on-the-internet-computer).
:::

:::info
These estimates use a 13-node subnet. Costs will be different if deployed on a 34-node subnet. Please refer to the chart below for more details: [Details: Cost of compute and storage transactions on the Internet Computer](#details-cost-of-compute-and-storage-transactions-on-the-internet-computer).
:::

### Single canister

For a single canister that provides a service or function that is called by other canisters through inter-canister calls the following approximate cycles costs would be incurred:

- Canister creation (one-time fee charged when the canister is deployed): 100_000_000_000 cycles.

- Storing 2GB of data: 254_000 cycles per second; 667_585_152_000 per month.

- Using 0.5% compute resources: 5_000_000 cycles per second; 13_141_440_000_000 cycles per month.

- 1_000 ingress messages received per month with 1_000 bytes per message: 3_200_000_000 cycles. 

**Approximate monthly cost:** 13_812_225_000_000 cycles; 13.812225152 XDR. At the exchange rate of 1.336610, this would cost $18.46 USD.

### Simple static website using a frontend canister

For a simple static website that uses a single frontend canister for the website's assets, that is not called by other canisters or performs HTTPS outcalls, 

- Canister creation (one-time fee charged when the canister is deployed): 100_000_000_000 cycles.

- Storing 4GB of data: 508_000 cycles per second, 1_335_170_300_000 cycles per month.

- Using 0.5% compute resources: 5_000_000 cycles per second; 13_141_440_000_000 cycles per month.

**Approximate monthly cost:** 14_476_610_000_000 cycles; 14.4766103 XDR. At the exchange rate of 1.336610, this would cost $19.35 USD.

:::caution
When considering developing a website on ICP, the estimated cost above might appear higher than the 'free tier' of a traditional Web2 service. However, there are several important benefits to consider that traditional Web2 web hosting services often hold behind additional paywalls, such as:

- Fees for multiple developers.

- Fees for access to workflows that use third-party services such as Github or Gitlab.

- Fees to enable advanced frontend functionality, like developing submittable forms, certain web assets, or streaming content.

- Fees to view site analysis.

- Fees to upload large media files. 

- Fees for advanced security functions or features.

On ICP, the fees broken down in this document are the only fees that are charged for developing. Developers only pay for exactly what is used by their project's canisters in terms of resources, and no features are restricted behind additional paywalls. Developers can integrate any aspect of ICP into their dapp (such as Internet Identity or chain-key cryptography) without being charged additional fees. Development teams can exist of any size, use any workflow they desire, and do not have to worry about fitting within certain resource limits to stay under a certain paid tier. 
:::

### Simple smart contract web dapp using a frontend canister and backend canister

For a simple smart contract powered web dapp that uses two canisters (a backend canister for the dapp's functionality and a frontend canister for the user interface), the following approximate cycles costs would be incurred:

- Canister creation for two canisters (one-time fee): 200_000_000_000 cycles.

- Storing 4GB of data (across both canisters): 508_000 cycles per second, 1_335_170_300_000 cycles per month.

- Using 1% compute resources: 10_000_000 cycles per second; 26_282_880_000_000 cycles per month.

**Approximate monthly cost:** 27_618_050_000_000 cycles; 27.6180503 XDR. At the exchange rate of 1.336610, this would cost $36.91 USD.

### Social media dapp with two canisters

For a project that creates a social media dapp using two canisters with around 200 active user accounts that interact with the dapp monthly, the following approximate cycles costs would be incurred:

- Canister creation for two canisters (one-time fee): 200_000_000_000 cycles.

- Storing 25GB of data: 3_175_000 cycles per second; 8_344_814_400_000 cycles per month.

- Using 5% compute resources: 50_000_000 cycles per second; 131_414_400_000_000 cycles per month.

- 500_000 ingress messages with 1_000 bytes per message (2_500 per active user, per month): 600_002_000_000 cycles.

**Approximate monthly cost:** 140_359_220_000_000 cycles; 140.3592164 XDR. At the exchange rate of 1.336610, this would cost $187.61 USD.

### Decentralized service using threshold ECDSA and HTTPS outcalls

For a project that creates a decentralized service that makes several thousand HTTPS outcalls to services outside ICP, utilizes the threshold ECDSA feature on ICP, and makes several thousand inter-canister calls, the following approximate cycles costs would be incurred:

- Canister creation for ten canisters (one-time fee): 1_000_000_000_000 cycles.

- Storing 150GB of data: 19_050_000 cycles per second; 50_068_886_000_000 cycles per month. 

- Using 10% compute resources: 100_000_000 cycles per second; 262_828_800_000_000 cycles per month.

- 100_000 ingress messages with 1_000 bytes per message: 320_000_000_000 cycles.

- [5_000 threshold ECDSA signature keys](/docs/current/developer-docs/integrations/t-ecdsa/t-ecdsa-how-it-works#fees-for-the-t-ecdsa-production-key) per month: 130_769_230_000_000 cycles. 

- 45_000 HTTPS outcalls requests with 800 bytes per message: 2_211_534_000_000 cycles.

- 45_000 HTTPS outcalls responses with 800 bytes per message: 468_000_000 cycles.

**Approximate monthly cost:** 445_878_920_000_000 cycles; 445.87892 XDR. At the exchange rate of 1.336610, this would cost $595.97 USD.

::caution
This example resembles that of an enterprise-level project that expects the application will make about 1500 HTTPS outcalls per day. For reference, the [Orally](https://orally.network/) enterprise application on ICP averages between 35_000 and 46_000 HTTPS outcalls per month. 

An enterprise-level project of this size could potentially cost several thousands of dollars if deployed on a traditional Web2 platform. Web2 infrastructure services often charge additional fees that scale with the amount of requests that your project serves per day/per month. Traditional Web2 infrastructure services also frequently charge high fees for additional features or 'add-ons' into your application. Such fees do not exist on ICP; the fees listed in this document are the only fees associated with developing on ICP. Therefore, it is possible to run large, enterprise applications on ICP at a fraction of what the cost would be if deploying on a Web2 service.
:::

### Instant messaging dapp with thousands of canisters

For a project that creates a messaging dapp where each user's data is stored in its own canister, there are potentially thousands of canisters that each make thousands of inter-canister calls to facilitate messaging between two or more users. In this example, there are 15_000 active users, and the dapp uses only inter-canister calls, and no HTTPS outcalls:

- Canister creation for 15_000 canisters (one-time fee): 1_500_000_000_000_000 cycles.

- Storing 750GB of data: 95_250_000 cycles per second; 250_344_430_000_000 cycles per month. 

- Using 40% compute resources: 400_000_000 cycles per second; 1_051_315_200_000_000 cycles per month.

- 15_000_000 ingress messages with 1_000 bytes per message: 3_915_000_000_000 cycles. 

**Approximate monthly cost:** 1_305_574_600_000_000 cycles; 1305.57463 XDR. At the exchange rate of 1.336610, this would cost $1745.04 USD.

:::caution
In this example, a new canister is created for each user. That means, each time a new user signs up for the dapp, a cost of 100_000_000_000 is charged. This additional cost should be considered if choosing an architecture similar to this, as it can become expensive quickly.
:::

## Details: Cost of compute and storage transactions on the Internet Computer

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
 | HTTPS outcall (per call)                | For sending an HTTPS outcall to a server outside the IC, per message (`http_request`)                            | Sending canister | 3_060_000                             | 49_140_000                                  | 171_360_000                                        | 27_200                     |
| HTTPS outcall request message size (per byte)|	For sending an HTTPS outcall to a server outside the IC, per request byte (http_request) | Sending canister |	400	| 5_200	| 13_600 |
| HTTPS outcall response message size (per byte) |	For sending an HTTPS outcall to a server outside the IC, per reserved response byte (http_request)|	Sending canister | 800	| 10_400	| 27_200 |


Pricing for the **Bitcoin API** is available in the [Bitcoin API documentation](./integrations/bitcoin/bitcoin-how-it-works.md).

Pricing for the **Chain-key signing API** is available in the [Chain-key signing / threshold ECDSA documentation](./integrations/t-ecdsa/t-ecdsa-how-it-works.md).

:::note
* System API calls are just like normal function calls from the WebAssembly stand point. The number of instructions each call takes depends on the work done.
:::

The pricing for HTTPS outcalls is calculated in a slightly different way as the prices for other resources: The feature has a quadratic component in its implementation, which is reflected through the formula `(3_000_000 + 60_000 * n) * n` for the base fee and `400 * n` each request byte and `800 * n` for each response byte. Those formulas have been used in the table to obtain the concrete values for subnets of sizes 13 and 34.

The USD cost for transactions below is based on the above cycle costs. 1 XDR is equal to 1 Trillion cycles. As of November 23, 2022, the exchange rate for 1 XDR = $1.336610, which is used on this page. The exchange rate for USD/XDR may vary and it will impact the conversion rate. You can view XDR exchange rates [here](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).

To derive the estimated cost for a GB Storage per month, a 30 day month is assumed.

 | Transaction                          | Description                                                                                                      | Who is responsible for paying the transaction fee? |  13-node Application Subnets | 34-node Application Subnets |
 |--------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------|---------------------------|-----------------------------|
| Canister Created                     | For creating canisters on a subnet                                                                               | Created canister | $0.133661                   | $0.34957492307                  |
| Compute Percent Allocated Per Second | For each percent of the reserved compute allocation (a scarce resource).                                         | Canister with allocation | $0.0000133661               | $0.00000511056               |
| Update Message Execution             | For every update message executed                                                                                | Target canister | $0.0000007885999           | $0.000000301523491            |
| Ten Update Instructions Execution    | For every 10 instructions executed when executing update type messages                                           | Canister executing instructions | $0.00000000000534644          | $0.0000000000020442271        |
| Xnet Call                            | For every inter-canister call performed (includes the cost for sending the request and receiving the response)   | Sending canister | $0.0000003475186            | $0.000000132874759            |
| Xnet Byte Transmission               | For every byte sent in an inter-canister call (for bytes sent in the request and response)                       | Sending canister | $0.00000000133661           | $0.00000000051105676           |
| Ingress Message Reception            | For every ingress message received                                                                               | Receiving canister | $0.00000160393             | $0.000000613268118             |
| Ingress Byte Reception               | For every byte received in an ingress message                                                                    | Receiving canister | $0.00000000267322           | $0.00000000102211353          |
| GB Storage Per Second                | For storing a GB of data per second                                                                              | Canister with storage | $0.00000016974947           | $0.000000649042091           |
 |                                      |                                                                                                                  |                             |                             |
 | *HTTPS outcalls*                     |                                                                                                                  |                             |                             |
 | HTTPS outcall (per call)                | For sending an HTTPS outcall to a server outside ICP, per message (`http_request`)                            | Sending canister | $0.00006568101               | $0.00022904148 |
 | HTTPS outcall request message size (per byte)	| For sending an HTTPS outcall to a server outside ICP, per request byte (http_request)	| Sending canister | $0.000000006950372 |	$0.000000018177896 |
| HTTPS outcall response message size (per byte)	| For sending an HTTPS outcall to a server outside ICP, per reserved response byte (http_request) | Sending canister | $0.000000013900744	| $0.000000036355792 |

Cost per transaction in USD (XDR/USD exchange rate as of December 18, 2022).

The following table shows the calculated storage cost per GB for a 30-day month: 

|                      |                                    | 13-node Application Subnets | 34-node Application Subnets |
|----------------------|------------------------------------|-----------------------------|-----------------------------|
| GB Storage Per Month | For storing a GB of data per month | $0.446150495                      | $1.70                      |

## Resource reservation mechanism

In order to encourage long-term usage and discourage spiky usage patterns of resources, the Internet Computer uses a *resource reservation mechanism* that was adopted by the community in [NNS proposal 12604](https://dashboard.internetcomputer.org/proposal/126094).
Every time a canister allocates new storage bytes, the system sets aside some amount of cycles from the main balance of the canister. These reserved cycles are used to cover future payments for the newly allocated bytes. The reserved cycles are not transferable and the amount of reserved cycles depends on how full the subnet is. For example, it may cover days, months, or even years of payments for the newly allocated bytes.

The operations that allocate new bytes are:

- Wasm instruction: `memory.grow`.
- System API calls: `ic0.stable_grow()` `ic0.stable64_grow()`.
- Increasing the `memory_allocation` in canister settings.

These operations reserve some amount of cycles by moving them from the main balance of the canister to the reserved cycles balance.
The amount of reserved cycles depends on how many bytes are allocated and on the current subnet usage:

- If subnet usage is below `450GiB`, then the amount of reserved cycles per allocated byte is `0`.
- If subnet usage is above `450GiB`, then the amount of reserved cycles per allocated byte grows linearly depending on the subnet usage from `0` to `10` years worth of storage payments at the subnet capacity (which is currently `750GiB`).

A controller of a canister can disable resource reservation by setting the `reserved_cycles_limit=0` in canister settings.
Such opted-out canisters would not be able to allocate if the subnet usage is above `450GiB` though.
