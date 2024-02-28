# ICP tokens

## Overview 
Internet Computer Protocol tokens (ICP tokens) are a native utility token with a value determined on the open market. ICP tokens play a key role in both the governance and the economics of the Internet Computer.

## How to get ICP tokens

There are a few different ways you might acquire ICP tokens. For example, you might:

-   Purchase ICP tokens directly through an exchange that lists ICP tokens available for trade.

-   Create tokens from rewards (maturity) obtained for participating in the governance of the Internet Computer.

-   Receive tokens from the protocol as remuneration for being a node provider and operating a Internet Computer node.

-   Receive a grant of tokens by the DFINITY Foundation.


## How to use ICP tokens

If you have ICP tokens, but aren’t sure how to use them, the following diagram provides a simplified overview to illustrate the three most common scenarios.

![icp tokens how to use](_attachments/icp-tokens-how-to-use.svg)

As this diagram suggests, how you use ICP tokens depends primarily on your goals in acquiring them. For example, if you are a developer or founder, ICP tokens can be converted to **cycles**. Cycles can then be used to pay for running canisters that deliver products and services to the market. If you are a member of the community interested in participating in governance and influencing the direction of the Internet Computer, you can lock up ICP tokens in a stake, called a neuron, so that you can submit and vote on proposals.

:::info
Regarding transaction fees, the **transaction sender** is responsible for covering any/all transaction fees.
:::

## Cycles

Cycles are burned by canisters to pay for the resources they consume such as execution, storage, and messaging. Cycles have a fixed price where 1 trillion cycles is equal to 1 XDR, an official group of currencies maintained by [IMF](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx). This means that running costs of canisters are decoupled from price fluctuations of ICP.

For developers, ICP tokens are important because they can be converted to cycles that, in turn, are used to pay for resource consumption. Cycles reflect the real costs of operations for applications hosted in the Internet Computer blockchain including resources such physical hardware, rack space, energy, storage devices, and bandwidth.

Canister smart contracts must be able to pay for complete execution (all or nothing), but the platform sets limits on how many cycles a canister can hold and consume to prevent malicious code from draining resources.

To learn more about cycles and how to use them, see [here](/docs/current/developer-docs/getting-started/cycles/converting_icp_tokens_into_cycles).

For more information on cycles costs, see the tables in [computation and storage costs](/docs/current/developer-docs/gas-cost).

## Token value and volatility

Tokens (ICP) reflect the value of the Internet Computer blockchain and can fluctuate. To prevent the token value from affecting the number of messages a canister can process, tokens are not used to pay for resources directly.

Tokens can be exchanged between token holders or locked up in **neurons** to secure voting rights as part of the governance system.

Tokens are used to reward node providers for operating nodes (and thereby providing compute capacity) and indirectly to reward neuron holders for participating in the governance of the Internet Computer by voting and submitting proposals.

## Payment to node providers

With this model, the Internet Computer blockchain provides node providers with a predictable economic model for computing power capacity to ensure resources are available when and where they are needed. Node providers receive compensation for both active and spare nodes so that the Internet Computer blockchain has capacity to handle both normal traffic and workload spikes.

The Internet Computer economic model places much of the power and responsibility of managing capacity on the governance system—the Network Nervous System. Specific details about compensation and service level requirements are outside the scope of this document.

## Resources

If you are looking for more information about tokens and cycles, check out the following related resources:

-   [Overview of token economics (video)](https://www.youtube.com/watch?v=H2p5q0PR2pc).
