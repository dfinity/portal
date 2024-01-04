# Cycles and transaction costs

## Overview

When a smart contract canister is deployed to ICP, the resources that the canister uses are paid for using cycles. These resources include storage, messaging, and execution. To obtain cycles, ICP tokens can be converted into cycles. 

Understanding how cycles costs are incurred and what the associated fiat value of these costs are is important for developers to understand so they can budget or plan accordingly for their application. This guide will cover the following topics: 

- [Units and fiat value](#units-and-fiat-value)
- [The ICP reverse gas model](#the-icp-reverse-gas-model)
    - [How do ICP costs compare to the EVM gas model?](#how-do-icp-costs-compare-to-the-evm-gas-model)
- [Transactions](#transactions)
    - [Messaging](#messaging)
    - [Execution](#execution)
    - [Storage](#storage)
    - [Special features](#special-features)
    - [Replication](#replication)
- [Who is responsible for paying cycles?](#who-is-responsible-for-paying-cycles)
- [Cycles price breakdown](#cycles-price-breakdown)
- [Resource reservation mechanism](#resource-reservation-mechanism)
- [Cost estimations and examples](cost-estimations-and-examples.md)


## Units and fiat value

The price of cycles is fixed against the price of [XDR](/docs/current/references/glossary#xdr), where **1 trillion cycles equals 1 XDR**. As of December 18, 2023, the exchange rate for 1 XDR = $1.336610, which is used on this page. The exchange rate for USD/XDR may vary and it will impact the conversion rate. You can view XDR exchange rates [here](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).

This documentation will use the following units to measure and calculate the number of cycles and their associated fiat value:

| Abbreviation  | Name      | In numbers   | Cycles XDR value  | Cycles USD value  |
|---------------------------------------------------------------------------|
| T      | Trillion  | 1_000_000_000_000 | 1            | 1.34              |
| B      | Billion   | 1_000_000_000     | 0.001        | 0.00134           |
| M      | Million   | 1_000_000         | 0.000001     | 0.00000134        |
| k      | Thousand  | 1_000             | 0.000000001  | 0.00000000134     |
| –      | (one)     | 1                 | 0.000000000001 | 0.00000000000134|


## The ICP reverse gas model 

Smart contract canisters deployed on ICP are charged for the resources that they use. Cycles are withdrawn from the canister's cycles wallet whenever the canister performs an action that incurs a charge, such as sending an HTTPS outcall, receiving a message, or executing an instruction. This cost model is sometimes referred to as ICP's 'reverse gas model', since the smart contract canister is responsible for paying the cycles cost, rather than the user. 

:::info
While this may be referred to as the ICP reverse 'gas' model, it is important to note that ICP does not use 'gas' -- it uses cycles. 
::

You can learn more about the ICP reverse gas model [here](https://internetcomputer.org/capabilities/reverse-gas). 

Each canister deployed on ICP has a cycles balance. When a canister is first deployed, it must be deployed with an amount of cycles that covers the cost of creating the canister, then provides enough cycles for the canister's operations. If a canister's cycles balance becomes depleted and it cannot cover the cost of the canister's operations, the canister must be 'topped up', which refers to depositing additional cycles into the canister's cycles balance. 

You can learn how to query a canister's cycles balance [here](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters#checking-the-cycles-balance-of-a-canister), and you can learn how to top up a canister [here](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters#topping-up-a-canisters-cycles-balance).

### How do ICP costs compare to the EVM gas model?

On other blockchain platforms such as Ethereum, users are responsible for paying the 'gas' charge for every on-chain interaction they incur. For some dapps, that means the user must pay a gas fee for doing tasks as simple as commenting on or liking a video. ICP removes this expensive barrier for users by allowing them to interact with dapps deployed on the network without paying gas fees, instead charging the canisters themselves for the resources used. 

Additionally, gas fees on Ethereum can fluctuate in price unpredictably, resulting in drastically different gas fees based on the current price of ETH and the current network conditions. This can make using dapps on Ethereum difficult and expensive, as one day it may cost significantly more than the day prior or vice versa. Since ICP uses cycles, which have a fixed price based on XDR, the price is predictable and stable. 

One downside of the ICP cycles model in comparison to the EVM gas model is that it requires prerequisite steps and ongoing maintenance for developers. ICP tokens must be converted into cycles, then cycles must be deposited into a canister's cycles balance. Canisters must have their cycles balances maintained and regularly topped up as they continuously use resources, otherwise the canister will be removed from the network if it runs out of cycles. However, a [freezing threshold](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters#setting-the-canisters-freezing-threshold) can be set that pauses a canister's executions if the cycles amount is expected to fall below a certain amount, and there are several community tools that have been developed to automate managing a canister's cycles, such as [CycleOps](https://cycleops.dev/).

## Canister transactions

A canister transaction on ICP refers to invoking a function within a smart contract. Transactions can come in the form of messages, executions, data storage, or they can use special features such as HTTPS outcalls, chain-key signing cryptography, and the Bitcoin API integration.

:::caution
For information on transactions regarding **ledgers and tokens**, such as minting and burning transactions, please see the documentation [here](/docs/current/developer-docs/integrations/ledger/#transaction-types).
:::

At a high level, transactions can be visualized using the following diagram:

[Transaction overview](./_attachments/transaction-overview.png)

Each type of transaction has a different cycles cost associated with it and the canister responsible for paying the cycles varies based on the type of transaction as well. 

### Messaging
Explain all cost drivers related to messaging. Make examples: query call (no cost for now), update call, inter-canister calls, a timer or heartbeat making a call, …

Query calls:

Update calls:

Inter-canister calls:

Calls made by timers/heartbeats:

Number of nodes in the subnet 
13
Number of all users 
0
Number of daily active users 
1
Number of daily messages per active user 
1
Number of request bytes per message 
1
Number of instructions executed per message 
1
Number of calls per message 
1
Number of request and response bytes per call 

### Execution
Same for execution 

Number of instructions per call 
1
Number of daily tasks 
1
Number of instructions executed per task 

### Storage
Same for storage

Number of storage bytes per user 
1
Number of user-independent storage bytes 

### Special features
HTTP outcalls
Bitcoin API
Chain-key signing
(others?)

Pricing for the **Bitcoin API** is available in the [Bitcoin API documentation](./integrations/bitcoin/bitcoin-how-it-works.md).

Pricing for the **Chain-key signing API** is available in the [Chain-key signing / threshold ECDSA documentation](./integrations/t-ecdsa/t-ecdsa-how-it-works.md).

:::note
* System API calls are just like normal function calls from the WebAssembly stand point. The number of instructions each call takes depends on the work done.
:::

The pricing for HTTPS outcalls is calculated in a slightly different way as the prices for other resources: The feature has a quadratic component in its implementation, which is reflected through the formula `(3_000_000 + 60_000 * n) * n` for the base fee and `400 * n` each request byte and `800 * n` for each response byte. Those formulas have been used in the table to obtain the concrete values for subnets of sizes 13 and 34.

### Replication
It’s strange how we explain the prices today. Basically we say that 13 nodes is the default and then we linearly extrapolate from there. I understand that this is how the pricing evolved over time. But to the reader this must look strange. How about we provide prices per replica and then show how much it costs on a 13 node subnet (as this is the default for an app subnet) and a 34 node subnet (high replication). So the table would not look much different but we could skip the confusion introduction about “Price on n-node subnet = (13_node_price * n) DIV 13”

In late November 2022, high-replication application subnets have been made available on the Internet Computer. The first such subnets launched with a replication factor in the order of 30, different sizes may become available in the future. Cycles prices for the new high-replication subnets are scaled linearly based on the number of nodes from the base prices for 13-node subnets. The pricing mechanics for the Bitcoin Mainnet API is slightly different, see the [Bitcoin API documentation](./integrations/bitcoin/bitcoin-how-it-works.md) for details.

### Who is responsible for paying cycles?

Explain how either the cycles are consumed on the sending or receiving end.  

## Cycles price breakdown

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