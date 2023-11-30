# Acquiring and managing cycles

## What are ICP cycles?
The Internet Computer (ICP) blockchain runs on a network of nodes owned and operated by a growing community of independent node providers (NPs) distributed across the globe. NPs spend money for running nodes, e.g. they purchase hardware and require electricity and network bandwidth. The Internet Computer Protocol compensates NPs on a monthly basis by minting and distributing rewards in the form of ICP tokens.

To make ICP sustainable, canister smart contracts are required to pay for the resources they consume, e.g. storage and compute. Resource consumption is not paid in ICP tokens but **cycles**. It’s typically the canister’s developer who charges the canister with cycles. As the canister is used, its cycle balance is continuously reduced. Eventually, the canister needs to be “topped up” with more cycles. The default way to get cycles is to convert ICP tokens to cycles. When doing so, the protocol burns the ICP tokens. 

## Why are cycles different from ICP tokens? 

While the value of an ICP token is volatile, cycles are not. They are pegged to [XDR](https://en.wikipedia.org/wiki/Special_drawing_rights), a basket of fiat currencies. This has the benefit that resource consumption, e.g. smart contract executions, on ICP has a somewhat stable price. 

:::info
Cycles are measured in very large numbers, such as billions and trillions. When you talk about cycle transfers and replenishment, you will usually operate with trillions of cycles.
:::

## Resources
To further explore cycle management please see the following articles:
- **[Using a cycles wallet](cycles-wallet.md)**.
- **[Getting free cycles from DFINITY cycles faucet](cycles-faucet.md)**.
- **[Converting ICP tokens into cycles](converting_icp_tokens_into_cycles.md)**.
