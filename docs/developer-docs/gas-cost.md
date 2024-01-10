# Cycles and transmission costs

## Overview

Canisters pay for consumed resources by burning cycles. These resources include storage, messaging, and execution. To obtain cycles, ICP tokens can be converted into cycles.

- [Units and fiat value](#units-and-fiat-value)
- [The ICP reverse gas model](#the-icp-reverse-gas-model)
    - [How do ICP costs compare to the EVM gas model?](#how-do-icp-costs-compare-to-the-evm-gas-model)
- [Canister calls](#canister-calls)
    - [Canister creation](#canister-creation)
    - [Messaging](#messaging)
    - [Execution](#execution)
    - [Storage](#storage)
    - [Special features](#special-features)
        - [Replication](#replication)
- [Who is responsible for paying cycles?](#who-is-responsible-for-paying-cycles)
- [Cycles price breakdown](#cycles-price-breakdown)
- [Monitoring canister cycle usage](#monitoring-canister-cycle-usage)
- [Getting cycles back from a canister](#getting-cycles-back-from-a-canister)
- [Topping up canisters](#topping-up-canisters)
- [Counting instructions](#counting-instructions)
- [Cost estimations and examples](cost-estimations-and-examples.md)

## Units and fiat value

The price of cycles is fixed against the price of [XDR](/docs/current/references/glossary#xdr), where **1 trillion cycles equals 1 XDR**. As of December 18, 2023, the exchange rate for 1 XDR = $1.336610, which is used on this page. The exchange rate for USD/XDR may vary, and it will impact the conversion rate. You can view XDR exchange rates [here](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).

This documentation will use the following units to measure and calculate the number of cycles and their associated fiat value:

| Abbreviation  | Name      | In numbers   | Cycles XDR value  | Cycles USD value |
|-------------- | --------- | ------------ | ----------------- | ---------------- |
| T             | Trillion  | 1_000_000_000_000 | 1            | 1.336610         |
| B             | Billion   | 1_000_000_000| 0.001             | 0.001336610      |
| M             | Million   | 1_000_000    | 0.000001          | 0.000001336610   |
| k             | Thousand  | 1_000        | 0.000000001       | 0.000000001336610 |


## The ICP reverse gas model

In contrast to other blockchains where users pay for their transactions, ICP charges the smart contract canister for the resources it consumes. This allows developers to provide a smoother user experience, as users are free from tedious tasks such as signing and approving every transaction they perform within the application. This cost model is known as ICP's 'reverse gas model'.

:::info
While this may be referred to as the ICP reverse 'gas' model, it is important to note that ICP does not use 'gas' -- it uses cycles.
:::

You can learn more about the ICP reverse gas model [here](https://internetcomputer.org/capabilities/reverse-gas).

One downside of the ICP reverse gas model in comparison to other models, such as the EVM gas model, is that it requires prerequisite steps and ongoing maintenance for developers. Canisters must have their cycles balances maintained and regularly topped up as they continuously use resources; otherwise, the canister will be removed from the network if it runs out of cycles. However, a [freezing threshold](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters#setting-the-canisters-freezing-threshold) can be set that pauses a canister's executions if the cycles amount is expected to fall below a certain amount, and there are several community tools that have been developed to automate managing a canister's cycles, such as [CycleOps](https://cycleops.dev/).

You can learn how to query a canister's cycles balance [here](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters#checking-the-cycles-balance-of-a-canister), and you can learn how to top up a canister [here](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters#topping-up-a-canisters-cycles-balance).


## Canister operations and resources

Canisters pay for consumed resources as well as for performed operations using features such as HTTPS outcalls, ECDSA signing, and the Bitcoin integration API. At a high level this can be visualized using the following diagram:

![Canister calls overview](./_attachments/transaction-overview.png)

Each type of canister operation and resource has a different cycles cost associated with it, and the canister responsible for paying the cycles varies based on the type of operation.

### Canister creation

Canister creation costs 100B cycles or approximately $0.13 USD. Canisters can be created by users or other canisters.

### Messaging

A canister can receive messages from users and other canisters. In canister-to-canister messages, the sending canister pays message transmission costs. In user-to-canister messages, the receiving canister covers the message transmission costs (see [reverse gas model](#the-icp-reverse-gas-model)). User-to-canister messages are also referred to as ingress messages.

The message transmission cost consists of a fixed baseline fee and per-byte-fee charged for each byte of the message: `base-fee` + `per-byte-fee` * `size-in-bytes`.

The current fees are:

| Message type | Base fee | Per byte fee |
|--------------|----------|--------------|
| Canister-to-canister | 260K | 1K |
| User-to-canister (ingress) | 1.2M | 2K |


An additional factor of cost includes the number of nodes in the subnet the canister is deployed on.

Note that query messages are currently free, but this may change in the future.

### Execution

In order to handle an incoming message or task such as a timer or heartbeat, the canister executes the function specified in the message. The execution cost consists of a fixed execution fee and per-instruction fee that is charged for each executed WebAssembly instruction: `base-fee` + `per-instruction-fee` * `number-of-instructions`. The current values of fees are `base-fee` = 590K cycles (or $0.0000007885999 USD), `per-instruction-fee` = 0.4 cycles (or $0.0053 USD for 1B instructions).

By default canisters are scheduled for execution in a "best-effort" manner. Canisters that require guaranteed execution can get a share of compute capacity by setting `compute_allocation` in their canister settings. Compute allocation is expressed in percents and denote the percentage of an execution core reserved for the canister. For example, compute allocation of 50% means that the canister will get 50% of an execution core. In other words, it will be scheduled at least every other round. Compute allocation of 100% means that the canister will be scheduled every round. The current fee for 1 percent computer allocation per second is 10M cycles (or $0.0000133661 USD).

### Storage
Canisters pay for storage consumed by their Wasm memory and stable memory. The storage cost depends on the number of consumed bytes and the time duration. The current fee is 127K cycles per second (or $0.00000016974947 USD).

Canisters can reserve storage on a subnet through the `memory_allocation` setting. However, the canister will be charged as if the entire amount of allocated storage is being used.

In order to encourage long-term usage and discourage spiky usage patterns of resources, the Internet Computer uses a *resource reservation mechanism* that was adopted by the community in [NNS proposal 12604](https://dashboard.internetcomputer.org/proposal/126094).

Every time a canister allocates new storage bytes, the system sets aside some number of cycles from the main balance of the canister. These reserved cycles are used to cover future payments for the newly allocated bytes. The reserved cycles are not transferable, and the number of reserved cycles depends on how full the subnet is. For example, it may cover days, months, or even years of payments for the newly allocated bytes.

The operations that allocate new bytes are:

- Wasm instruction: `memory.grow`.
- System API calls: `ic0.stable_grow()` `ic0.stable64_grow()`.
- Increasing the `memory_allocation` in canister settings.

These operations reserve some cycles by moving them from the main balance of the canister to the reserved cycles balance.
The amount of reserved cycles depends on how many bytes are allocated and on the current subnet usage:

- If subnet usage is below `450GiB`, then the amount of reserved cycles per allocated byte is `0`.
- If subnet usage is above `450GiB`, then the amount of reserved cycles per allocated byte grows linearly depending on the subnet usage, from `0` to `10` years worth of storage payments at the subnet capacity (which is currently `750GiB`).

A controller of a canister can disable resource reservation by setting the `reserved_cycles_limit=0` in canister settings.
Such opted-out canisters would not be able to allocate if the subnet usage is above `450GiB` though.

### Special features

Special features aside from messaging, storage, and execution resources have different costs since they use special infrastructure and architectures to provide the feature's functionality. These special features include:

- **HTTPS outcalls**: The cost of HTTPS outcalls is calculated using a unique formula since the feature includes a quadratic component in its implementation. The cost for an HTTPS outcall is calculated using the formula `(3_000_000 + 60_000 * n) * n` for the base fee and `400 * n` each request byte and `800 * n` for each response byte, where `n` is the number of nodes in the subnet. These costs are included in the chart found below.

- **Bitcoin API**: Pricing for the **Bitcoin API** is available in the [Bitcoin API documentation](./integrations/bitcoin/bitcoin-how-it-works.md).

- **Chain-key signing API**: Pricing for the **Chain-key signing API** is available in the [Chain-key signing / threshold ECDSA documentation](./integrations/t-ecdsa/t-ecdsa-how-it-works.md).

### Replication

Replication refers to the number of times a canister is replicated, which will depend on the subnet that the canister is deployed to.

#### Local development

When a canister is deployed to a local development environment, the canister is deployed to a single node (the locally running instance of the replica). Cycles charged to locally deployed canisters have a cost that is 1/13th the cost when deployed to a 13-node subnet. In local development environments, cycles can be fabricated using dfx.

#### Mainnet development

On a 13-node subnet, the canister is running on 13 nodes and therefore is replicated 13 times, whereas on a 34-node subnet, the canister is running on 34 nodes and therefore is replicated 34 times. The cost of resources on a 13-node subnet is different than the cost of resources on a 34-node subnet.

If you intend to deploy canisters on high-replication subnets, your canister should be prepared for an increase in cycles prices with an increase in the subnet's replication factor when the subnet grows over time. For this reason, it is recommended to attach more cycles to a call than the current price for a high-replication subnet of a given size suggests.

## Who is responsible for paying cycles?

Canisters are responsible for paying cycles for their own canister creation, compute resources, storage resources, and execution resources. For certain canister calls, however, the canister responsible for paying the cycles may vary.

For inter-canister calls and the associated bytes, the canister sending this call is responsible for paying the required cycles. If there is an inter-canister call chain, for example, canister A → canister B → canister C, then canister A pays for the sending request-response pair between canister A and canister B, and canister B pays for sending the request-response pair between canister B and canister C. Additionally, each canister pays for processing that happens locally, meaning canister A pays for processing the response from canister B while canister B pays for processing the request from canister A.

In contrast, for ingress messages, the receiving canister is responsible for paying for the consumed cycles.

Canisters that are created from another canister (child canisters) are responsible for paying for themselves.

## Cycles price breakdown

The chart below details the cost of compute and storage transmissions as well as management canister calls. A thorough example of how the cost of running a canister on a 13-node app subnet is computed can be found [here](https://wiki.internetcomputer.org/wiki/Comparing_Canister_Cycles_vs_Performance_Counter).

The USD cost for canister transmissions below is based on the cycle costs indicated for 13-node and 34-node subnets. 1 XDR is equal to 1 trillion cycles. The cost is shown in USD (XDR/USD exchange rate as of December 18, 2023). The exchange rate for USD/XDR may vary, and it will impact the conversion rate. You can view XDR exchange rates [here](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).

| Canister transmission | Description | Who is responsible for paying the cycles fee? | Local development ([IC SDK](./setup/index.md)) | 13-node application subnets cycles cost | 13-node application subnets USD cost | 34-node application subnets | 34-node application subnets USD cost |
| ----------------- | ------------------------------- | -------------------------------------------------- | ----------------------------------------------- | --------------------------------------- | ------------------------------------- | --------------------------- | ------------------------------------ |
| Canister creation | For creating canisters on a subnet. | Created canister | 100B / 13 | 100B | $0.133661 | 100B / 13 * 34 | $0.34957492307 |
| Compute percent allocated per second | For each percent of the reserved compute allocation (a scarce resource). | Canister with allocation | 10M / 13 | 10M | $0.0000133661 | 10M / 13 * 34 | $0.00000511056 |
| Update message execution | For every update message executed. | Target canister | 590K / 13 | 590K | $0.0000007885999 | 590K / 13 * 34 | $0.000000301523491 |
| 1B executed instructions | For every 1B instructions executed when executing update type messages. | Canister executing instructions | 400M / 13 | 400M | $0.0053 | 400M / 13 * 34 | $0.00001572482 |
| Xnet call | For every inter-canister call performed (includes the cost for sending the request and receiving the response). | Sending canister | 260K / 13 | 260K | $0.0000003475186 | 260K / 13 * 34 | $0.000000132874759 |
| Xnet byte transmission | For every byte sent in an inter-canister call (for bytes sent in the request and response). | Sending canister | 1K / 13 | 1K | $0.00000000133661 | 1K / 13 * 34 | $0.00000000051105676 |
| Ingress message reception | For every ingress message received. | Receiving canister | 1.2M / 13 | 1.2M | $0.00000160393 | 1.2M / 13 * 34 | $0.000000613268118 |
| Ingress byte reception | For every byte received in an ingress message. | Receiving canister | 2K / 13 | 2K | $0.00000000267322 | 2K / 13 * 34 | $0.00000000102211353 |
| GB storage per second | For storing a GB of data per second. | Canister with storage | 127K / 13 | 127K | $0.00000016974947 | 127K / 13 * 34 | $0.000000649042091 |
| | | | | | | | |
| _HTTPS outcalls_ | | | | | | | |
| HTTPS outcall (per call) | For sending an HTTPS outcall to a server outside the IC, per message (`http_request`). | Sending canister | 3_060_000 | 49_140_000 | $0.00006568101 | 171_360_000 | $0.00022904148 |
| HTTPS outcall request message size (per byte) | For sending an HTTPS outcall to a server outside the IC, per request byte (`http_request`). | Sending canister | 400 | 5_200 | $0.000000006950372 | 13_600 | $0.000000018177896 |
| HTTPS outcall response message size (per byte) | For sending an HTTPS outcall to a server outside the IC, per reserved response byte (`http_request`). | Sending canister | 800 | 10_400 | $0.000000013900744 | 27_200 | $0.000000036355792 |

The following table shows the calculated storage cost per GB for a 30-day month (XDR/USD exchange rate as of December 18, 2023):

| | | 13-node application subnets | 34-node application subnets |
|----------------------|------------------------------------|-----------------------------|-----------------------------|
| GB Storage Per Month | For storing a GB of data per month | $0.446150495 | $1.70 |


## Monitoring canister cycle usage

To learn how to check your canister's cycles balance, check out the documentation [here](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters#checking-the-cycles-balance-of-a-canister).

To learn how to monitor your canister's cycles usage using a cycles management service, see [here](/docs/current/developer-docs/setup/cycles/cycles_management_services).

To learn about the Motoko cycles management library, see [here](https://github.com/CycleOperators/cycles-manager).


## Getting cycles back from a canister

To withdraw cycles from a canister, the canister must be deleted. You can learn how to delete a canister in the documentation [here](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters#getting-cycles-back-from-a-canister).

## Topping up canisters

To learn how to top up your canisters using dfx or the NNS dapp, check out the documentation [here](/docs/current/developer-docs/production/topping-up-canister).

To learn how to use a cycles management service to top up your canisters, check out the documentation [here](/docs/current/developer-docs/setup/cycles/cycles_management_services).

Alternatively, you use a fiat option to top up your canister through [Cycle.express](https://cycle.express/).

## Counting instructions

To count the number of executed instructions in Motoko canisters, the [Motoko function `countInstructions`](/docs/current/motoko/main/base/ExperimentalInternetComputer#function-countinstructions) can be used.

To get information about message execution, canister performance, and executed instructions, the IC performance counters can be queried. You can find more information about the performance counters in the [IC interface specification](/docs/current/references/ic-interface-spec#system-api-performance-counter).

