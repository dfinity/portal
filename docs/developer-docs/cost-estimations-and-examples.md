# Cycles cost estimations and examples


## Overview

To get a rough estimate of how much your project may cost, below are common project architectures and their estimated monthly/yearly cost. These estimates are broken down into the groups:

- **Messaging**: Calls that are made to a canister's methods. Costs depend on the type of call being sent (query, update, inter-canister, etc), the size of the message's request and response bytes, and the total amount of messages a canister sends and receives.

- **Execution**: Cycles are charged during execution of messages and tasks. There is a fixed fee for starting execution and a fee per each executed instruction.

- **Storage**: Cycles charged for canister storage, both Wasm memory and stable memory.

- **Special features**: Include HTTPS outcalls, transmissions using the [Bitcoin API](./integrations/bitcoin/bitcoin-how-it-works.md), and transmissions using the [chain-key signing API](./integrations/t-ecdsa/t-ecdsa-how-it-works.md).

## Units and fiat value

The price of cycles is fixed against the price of [XDR](/docs/current/references/glossary#xdr), where **1 trillion cycles equals 1 XDR**.

This documentation will use the following units:


| Abbr. | Name | In numbers | Cycles XDR value | Cycles USD value |
|-------|------|------------|------------------|------------------|
| T | Trillion | 1_000_000_000_000 | 1 | 1.34 |
| B | Billion | 1_000_000_000 | 0.001 | 0.00134 |
| M | Million | 1_000_000 | 0.000001 | 0.00000134 |
| k | Thousand | 1_000 | 0.000000001 | 0.00000000134 |
| – | (one) | 1 | 0.000000000001 | 0.00000000000134|

## Sample project architectures

:::caution
The estimates below are simply to demonstrate what different sample architectures may cost. The actual cost of your project will vary. The estimates below should only be used for gaining an idea of what a project may cost. For exact costs, calculate them using the [cycles and transmission costs chart](gas-cost.md).
:::

:::info
These estimates use a 13-node subnet. Costs will be different if deployed on a 34-node subnet. Please refer to the [cycles and transmission costs chart](gas-cost.md).
:::


### Single canister

The cost estimate for a single canister that provides a service used by 5 users, each stores 100KB of data per user, uses inter-canister calls, and stores 5GB of data. The average number of request and response bytes per message is 351 and the number of instructions executed per message is 1_000_000. There are 100 daily messages generated per user. The canister performs 50 daily tasks, with 1_000_000 instructions executed per task. 


| Transaction group | Cost per month in cycles | Cost per month in USD | Cost per year in cycles | Cost per year in USD |
| ----------------- | ------------------------ | --------------------- | ----------------------- | -------------------- |
| Messaging | 19B | $0.03 USD | 228B | $0.36 USD |
| Execution | 25.2B | $0.03 USD | 302.4B | $0.36 USD |
| Storage | 1.53T | $2.05 USD | 18.36T | $24.60 USD |
| HTTPS outcalls | 0 | $0 USD | 0 | $0 USD |


### Simple static website 

The cost estimate for a simple static website using a single canister for the website's assets. It is not called by other canisters or performs HTTPS outcalls. It stores 5GB of data, has 100 total users, and has 10 daily active users that each generate 50 messages per day. The average number of request and response bytes per message is 351, and the number of instructions executed per message is 1_000_000. 


| Transaction group | Cost per month in cycles | Cost per month in USD | Cost per year in cycles | Cost per year in USD |
| ----------------- | ------------------------ | --------------------- | ----------------------- | -------------------- |
| Messaging | 1.06B | $0.01 USD | 12.72B | $0.12 USD |
| Execution | 1.65B | $0.02 USD | 19.8B | $0.24 USD |
| Storage | 1.53T | $2.05 USD | 18.36T | $24.60 USD |
| HTTPS outcalls | 0 | $0 USD | 0 | $0 USD |


:::caution
When considering developing a website on ICP, there are several important benefits to consider that traditional Web2 web hosting services often hold behind additional paywalls, such as fees for multiple developers, access to workflows that use third-party services, advanced frontend functionality, site analysis, and advanced security functions.

On ICP, the fees broken down in this document are the only fees that are charged for developing. Developers only pay for exactly what is used by their project's canisters in terms of resources. No features are restricted behind additional paywalls. 
:::


### Smart contract web dapp 

The cost estimate for a simple smart contract-powered web dapp that uses two canisters. This dapp has 100 total users, 10 daily users that generate 1_000 messages per day. The average number of request and response bytes per message is 245, and the number of instructions executed per message is 1_442_185. The dapp stores 100KB of data per user and stores 10GB of user-independent data. 


| Transaction group | Cost per month in cycles | Cost per month in USD | Cost per year in cycles | Cost per year in USD |
| ----------------- | ------------------------ | --------------------- | ----------------------- | -------------------- |
| Messaging | 901B | $1.21 USD | 1.0812T | $14.52 USD |
| Execution | 1.34T | $1.79 USD | 16.08T | $21.48 USD |
| Storage | 3.07T | $4.11 USD | 36.84T | $49.32 USD |
| HTTPS outcalls | 0 | $0 USD | 0 | $0 USD |


### Social media dapp with two canisters

The cost estimate for a project that creates a social media dapp using two canisters with 200 total users, 50 daily users that generate 6_127 messages per day. The average number of request and response bytes per message is 245, and the number of instructions executed per message is 1_442_185. This project also uses 2000 HTTPS outcalls per day, with an average of 250 request and response bytes per outcall. The project stores 100KB of data per user and 25GB of user-independent storage.


| Transaction group | Cost per month in cycles | Cost per month in USD | Cost per year in cycles | Cost per year in USD |
| ----------------- | ------------------------ | --------------------- | ----------------------- | -------------------- |
| Messaging | 25.7T | $34.38 USD | 308.4T | $412.56 USD |
| Execution | 3.79T | $50.74 USD | 45.48T | $608.88 USD |
| Storage | 7.67T | $10.28 USD | 92.04T | $123.36 USD |
| HTTPS outcalls | 3.18T | $4.26 USD | 38.16T | $51.12 USD |


### Decentralized service using threshold ECDSA and HTTPS outcalls

The cost estimate for a project that creates a decentralized service with 5_000 total users, 100 daily users that generate 4_400 messages per day. The average number of request and response bytes per message is 500, and the number of instructions executed per message is 437_253. This project also uses 3691 HTTPS outcalls per day, with an average of 332 request and response bytes per outcall. The project stores 100KB of data per user and 150GB of user-independent storage.

| Transaction group | Cost per month in cycles | Cost per month in USD | Cost per year in cycles | Cost per year in USD |
| ----------------- | ------------------------ | --------------------- | ----------------------- | -------------------- |
| Messaging | 198T | $265.36 USD | 2_376T | $3_184.32 USD |
| Execution | 402T | $538.90 USD | 4_824T | $6_466.80 USD |
| Storage | 46.1T | $61.83 USD | 553.2T | $741.96 USD |
| HTTPS outcalls | 6.01T | $8.06 USD | 72.12T | $96.72 USD |

:::caution
This example resembles that of an enterprise-level project. For reference, the [Orally](https://orally.network/) enterprise application on ICP averages between 35_000 and 46_000 HTTPS outcalls per month.

An enterprise-level project of this size could potentially cost several thousands of dollars if deployed on a traditional Web2 platform. Web2 infrastructure services often charge additional fees that scale with the number of requests that your project serves per day or per month. 
:::


### Instant messaging dapp with thousands of canisters

The cost estimate for a project that creates a messaging dapp where each user's data is stored in its own canister with 15_000 total users. 1_500 of these users are active daily, generating 5_700 messages each per day. The average number of request and response bytes per message is 624, and the number of instructions executed per message is 74_983. The project stores 10MB of data per user and 750GB of user-independent storage.


| Transaction group | Cost per month in cycles | Cost per month in USD | Cost per year in cycles | Cost per year in USD |
| ----------------- | ------------------------ | --------------------- | ----------------------- | -------------------- |
| Messaging | 464T | $622.12 USD | 5_568T | $7_465.44 USD |
| Execution | 382T | $511.89 USD | 4_584T | $6_142.68 USD |
| Storage | 276T | $369.73 USD | 3_312T | $4_436.76 USD |
| HTTPS outcalls | 0 | $0.00 USD | 0 | $0.00 USD |

:::caution
In this example, a new canister is created for each user. That means each time a new user signs up for the dapp a cost of 100_000_000_000 is charged. This additional cost should be considered when choosing a similar architecture.
:::

## How is the number of cycles charged to a canister estimated?

The number of cycles charged to the canister can be estimated using the following parameters:

- Nodes in the subnet the canister is deployed to: If deployed locally, this number is 1. If deployed on the mainnet, this number is either 13 or 34.
- Amount of users: The total number of users that interact with the canister.
- Daily active users: The total number of users that interact with the canister daily.
- Daily messages per active user: The total number of messages sent to the canister that each active user generates.
- Request and response bytes per message: The size of the request and response bytes per message.
- Instructions executed per message: The number of instructions that are executed in response to each message.
- Calls per message: The number of calls that are triggered per message.
- Request and response bytes per call: The size of the request and response bytes per call.
- Instructions per call: The number of instructions that are executed per call.
- Daily tasks: The number of daily tasks that the canister executes.
- Instructions executed per task: The number of instructions that are executed per daily task.
- Daily HTTPS outcalls: The number of daily HTTPS outcalls the canister makes.
- Request bytes per HTTPS outcall: The size of the request bytes per HTTPS outcall.
- Response bytes per HTTPS outcall: The size of the response bytes per HTTPS outcall.
- Storage bytes per user: The amount of data that is stored for each user.
- User-independent storage bytes: The amount of data the canister stores, independent of the storage used per user.

HTTPS outcalls are a special feature that is calculated differently than the other resources. Additionally, if a canister uses the [Bitcoin API](./integrations/bitcoin/bitcoin-how-it-works.md) or makes transmissions using the [chain-key signing API](./integrations/t-ecdsa/t-ecdsa-how-it-works.md), there are additional cycle costs for these special feature transmissions.
