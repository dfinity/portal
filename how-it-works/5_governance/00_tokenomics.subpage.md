---
title: "Tokenomics of the Internet Computer"
abstract: 
shareImage: /img/how-it-works/direct-integration-with-bitcoin.600x300.jpg
slug: tokenomics
---

# Tokenomics of the Internet Computer


### The ICP utility token

The Internet Computer (IC) makes use of a utility token called ICP. This token is used for the following functions on the platform: First, any ICP holder can participate in the governance of the IC by staking ICP in order to vote on proposals and earn voting rewards. Second, you can transform ICP into cycles, which are used as fuel for computation. Third, ICP tokens are used to pay the entities who provide compute capacity by operating node machines. Last but not least, ICP can be used in order to invest in token sales of decentralized autonomous organizations (DAOs) on the IC. We will elaborate on these four use cases in the following. In addition to the aforementioned platform use cases, ICP can also be used as a medium of exchange, i.e., to pay for goods and services like NFTs, subscriptions, etc.

### Governance and voting rewards

Anyone can participate in the governance of the IC by staking ICP tokens in so-called neurons. Neuron holders can vote on proposals, which are suggestions on how the IC should be changed. The neurons’ voting power for decision making is proportional to the number of ICP staked inside. However, the voting power also depends on some other neuron characteristics, in particular, for how long tokens are staked. For example, a neuron can boost its voting power by 100% by setting the time staked to the maximum of 8 years. The increased voting power for neurons with longer staking time creates an incentive to vote on proposals with the aim of driving decisions that maximize the value of their staked ICP over the long term.

For participation in governance, neurons receive voting rewards which can be converted into newly minted ICP. Every day, the IC calculates a voting reward pot according to a schedule, which it then divides among all eligible neurons according to their relative voting power. The schedule for voting rewards is designed to incentivize early adoption: Initially at genesis, 10% of the total supply of ICP is distributed in voting rewards on an annualized basis. Over the course of eight years, this number falls to 5%.

Since, the daily reward amount is independent of the overall amount of staked ICP in the system, participants receive larger rewards if overall staking and participation in governance decreases. This mechanism creates a natural incentive to stake ICP and participate in governance. As of November 2022, 266M ICP is staked, corresponding to 54% of the total supply. A significant part of staked ICP, namely 123M ICP (i.e., 46%), is staked for the maximum time of 8 years expressing the long-term commitment of these stakers.

Neurons can be configured to vote automatically by following the votes of other neurons, in an advanced form of “liquid democracy.” Neurons that vote automatically still receive their full share of the voting reward, as they enable the IC community to reach decisions securely and quickly.

The following graph depicts annualized voting rewards as a function of the staking time as of November 1, 2022. For current estimates of annualized voting rewards, refer to the IC Dashboard’s [Governance page](https://dashboard.internetcomputer.org/governance).

![](/img/how-it-works/voting_rewards.png)

### Cycles as fuel for computation

ICP can be used to pay for the usage of the IC. More specifically, ICP tokens can be converted to cycles (i.e., burned), and these cycles are used by developers to pay for installing smart contracts, called “canisters” on the IC, for the resources that canisters use (storage, CPU, and bandwidth). The cycle price is pegged to a basket of fiat currencies, so the conversion rate ICP to cycle fluctuates with the market price of ICP. Hence the cost to developers of acquiring fuel to run their application is predictable.

In the "reverse gas model" of the IC, developers pre-pay costs by loading canisters with computation cycles. As a consequence, users can interact with a decentralized application (dapp) without having to pay in tokens. Since cycles are stable in cost, developers know in advance how much they will need to spend on computation & storage.

### Node provider rewards

ICP tokens are used to pay the node providers—these are the entities that own and operate the computing nodes that host the IC. Node provider rewards are paid via newly minted ICP and computed on a monthly basis for each node individually. The amount per node depends on two parameters: First, the location of the node, as hosting prices differ between locations. Second, the type of the node, i.e., the hardware and connectivity specifications.

To cover the investment & running cost of nodes, which occur in fiat currency terms, node provider rewards are specified in XDR, and are converted into ICP based on the average exchange rate over the last 30 days.

### Investing in the IC ecosystem

The IC provides a plug & play solution for developers to transfer control of their dapps over to a Decentralized Autonomous Organization (DAO) and raise funds.

As part of a so-called decentralization sale, users can commit some ICP to a new DAO. In return, when the decentralization sale is complete, these users will receive tokens of the DAO with everyone paying the same price. Developers can specify a time period and minimum & maximum funding target of ICP to be collected, which determines when the sale is over.

The ICP funds raised by the decentralization sale are retained within the reserves of the fully autonomous DAO, rather than being forwarded to the original developers of the dapp or service. These funds can be used to pay for future computation needs of the dapp and also to pay code bounties for future dapp enhancements.

Investments via decentralization sales in DAOs act like rocket fuel for the IC ecosystem. It provides easy and transparent access to exciting Web3 projects and channels funds to productive usage of the platform.

### Development of total supply

The IC has inflationary and deflationary mechanisms. Governance participants can convert voting rewards to newly minted ICP. Also, node providers receive rewards in the form of newly minted ICP tokens. On the other hand, ICP is converted to cycles (i.e., burned) in order to pay for computation and storage. This is depicted in the following picture.

![](/img/how-it-works/deflation_inflation.png)
