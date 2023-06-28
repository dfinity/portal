# Tokens and cycles

## Overview 
Within the Internet Computer ecosystem, Internet Computer Protocol tokens (ICP tokens) are a native utility token with a value determined on the open market. ICP tokens play a key role in both the governance and the economics of the Internet Computer.

## How to get ICP tokens

There are a few different ways you might acquire ICP tokens. For example, you might:

-   Purchase ICP tokens directly through an exchange that lists ICP tokens available for trade.

-   Receive tokens as rewards for participating in the governance of the Internet Computer

-   Receive a grant of tokens through the Internet Computer Association (ICA) or the DFINITY Foundation.

-   Receive tokens as remuneration for providing computing capacity as a node provider.

## How to use ICP tokens

If you have ICP tokens, but aren’t sure how to use them, the following diagram provides a simplified overview to illustrate the three most common scenarios.

![icp tokens how to use](_attachments/icp-tokens-how-to-use.svg)

As this diagram suggests, how you use ICP tokens depends primarily on your goals in acquiring them. For example, if you are a developer or founder, ICP tokens can be converted to **cycles**. Cycles can then be used to pay for running canisters that deliver products and services to the market. If you are a member of the community interested in participating in governance and influencing the direction of the Internet Computer, you can lock up ICP tokens in a stake, called a neuron, so that you can submit and vote on proposals.

:::info
Regarding transaction fees, the **transaction sender** is responsible for covering any/all transaction fees.
:::

## How cycles work

For developers, ICP tokens are important because they can be converted to cycles that, in turn, are used to pay for resource consumption.

As an example, imagine you have a house where propane is used for a water heater, kitchen stove, dryer, and space heater. As you use these appliances, you deplete the supply of gas you have on hand, so periodically you contact a provider to refill your supply so you can continue to use your appliances without interruption. This is similar to canisters in that each canister must have an account with cycles available to pay for the communication, computation, and storage that the canister’s application consumes.

To learn more about cycles and how to use them, see [here](/docs/developer-docs/setup/cycles/converting_icp_tokens_into_cycles.md).

## Cost of computation

Cycles reflect the real costs of operations for applications hosted in the Internet Computer blockchain including resources such physical hardware, rack space, energy, storage devices, and bandwidth.

Canister smart contracts must be able to pay for complete execution (all or nothing), but the platform sets limits on how many cycles a canister can hold and consume to prevent malicious code from draining resources.

The relative stability of operational costs makes it easier to predict the cycles required to process, for example, a million messages.

The costs associated with communication, computation, and storage are more likely to decrease than to increase over time. For example, because disk space becomes cheaper and hardware becomes more efficient, the Internet Computer protocol will also improve over time to make better use of the resources.

Cycles are not a currency; in particular cycles cannot be converted back to value in the form of Internet Computer Protocol tokens, but can be transferred between canisters to enable canisters to pay for operations.

For exact costs see the tables in [computation and storage costs](/developer-docs/gas-cost.md).

## Token value and volatility

Tokens (ICP) reflect the value of the Internet Computer blockchain and can fluctuate. To prevent the token value from affecting the number of messages a canister can process, tokens are not used to pay for resources directly.

Tokens can be exchanged between token holders or locked up in **neurons** to secure voting rights as part of the governance system.

Tokens are used to reward node providers for providing compute capacity and neuron holders for participating in the governance of the Internet Computer by voting and submitting proposals.

## Payment to node providers

With this model, the Internet Computer blockchain provides node providers with a predictable economic model for computing power capacity to ensure resources are available when and where they are needed. Node providers receive compensation for both active and spare nodes so that the Internet Computer blockchain has capacity to handle both normal traffic and workload spikes.

The Internet Computer economic model places much of the power and responsibility of managing capacity on the governance system—the Network Nervous System. Specific details about compensation and service level requirements are outside the scope of this document.

## Resources

If you are looking for more information about tokens and cycles, check out the following related resources:

-   [Overview of token economics (video)](https://www.youtube.com/watch?v=H2p5q0PR2pc).
