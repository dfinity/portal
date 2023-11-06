---
title: "Tokenomics of the Internet Computer"
abstract: 
shareImage: /img/how-it-works/tokenomics.600.jpg
slug: tokenomics
---

# Tokenomics of the Internet Computer


### The ICP utility token

The Internet Computer (IC) makes use of a utility token called ICP. This token is used as follows in the protocol: First, any ICP holder can participate in the governance of the IC by staking ICP and then vote on or submit governance proposals and earn voting rewards. Second, ICP can be transformed into cycles and pay for Internet Computer resources. Third, ICP tokens are used to renumerate node providers who operate node machines running the Internet Computer protocol. Last but not least, ICP can be used to participate in token swaps of decentralized autonomous organizations (DAOs) on the IC. These four protocol use cases are eloborated on in the following. However, ICP can of course also be used as a medium of exchange to pay for goods and services such as NFTs, subscriptions, etc.

### Governance and voting rewards

Anyone can participate in the governance of the IC by staking ICP tokens in so-called neurons. Neuron holders can vote on proposals, which are suggestions on how the IC should be changed. The neurons’ voting power for decision making is proportional to the number of ICP staked inside and some other charateristics of the neuron such as the staking duration. For example, a neuron can boost its voting power by 100% by setting the time staked to the maximum of 8 years. The increased voting power for neurons with longer staking time creates an incentive to vote on proposals with the aim of driving decisions that maximize the value of their staked ICP over the long term.

For participation in governance, the voting neurons' maturity increases. Maturity can then be used to minted ICP. Every day, the IC calculates a voting reward pot according to a schedule, which it then divides among all eligible neurons according to their relative voting power. The schedule for voting rewards is designed to incentivize early adoption: Initially at genesis, maturity corresponding to 10% of the total supply of ICP is distributed in voting rewards on an annualized basis. Over the course of eight years, this number falls to 5%.

As the daily reward amount is independent of the overall amount of staked ICP in the system and is distributed to neurons in proportion to their voting power and ratio of the proposals they voted on. This mehanism creates a natural incentive to stake ICP and participate in governance: the lower participation is the higher the rewards are. As of November 2022, 266M ICP is staked, corresponding to 54% of the total supply. A significant part of staked ICP, namely 123M ICP (i.e., 46%), is staked for the maximum time of 8 years expressing the long-term commitment of these stakers.

Neurons can be configured to vote automatically by following the votes of other neurons, an advanced form of “liquid democracy.” Neurons that vote automatically still receive their full share of the voting rewards, as they enable the IC community to reach decisions securely and quickly.

The following graph depicts annualized voting rewards as a function of the staking time as of November 1, 2022. For current estimates of annualized voting rewards, refer to the IC Dashboard’s [Governance page](https://dashboard.internetcomputer.org/governance).

![](/img/how-it-works/voting_rewards.png)

### Cycles as fuel for computation and other resources

ICP can be used to pay for the usage of resources consumed the IC. More specifically, ICP tokens can be converted to cycles (i.e., burned), and these cycles are used by developers to pay for installing smart contracts, called “canisters” on the IC, for the resources that canisters use (storage, CPU, and bandwidth). The cycle price is pegged to a basket of fiat currencies, so the conversion rate ICP to cycle fluctuates with the market price of ICP. Hence the cost to developers of acquiring fuel to run their application is predictable.

In this so-called "reverse gas model" of the IC, developers pre-pay costs by loading canisters with computation cycles. As a consequence, users can interact with a decentralized application (dapp) without needing tokens or dealing with seed-phrases. As cycles are stable in cost, developers know in advance how much they will need to spend on computation, storage, and other resources.

### Node provider rewards

ICP tokens are used to renumerate node providers—these are the entities that own and operate the computing nodes that run the Internet Computer protocol. Node provider rewards are paid via newly minted ICP. The renumeration they receive is fixed per node and tightly related to their actual costs. It depends on two parameters: First, the location of the node, as hosting prices differ between locations. Second, the type of the node, i.e., the hardware and connectivity specifications.



To cover the investment & running cost of nodes, which occur in fiat currency terms, node provider rewards are specified in XDR, and are converted into ICP based on the average exchange rate over the last 30 days.

### Investing in the IC ecosystem

The IC provides a plug & play solution for developers to transfer control of their dapps over to a Decentralized Autonomous Organization (DAO) and raise funds.

As part of a so-called decentralization swap, users can commit some ICP to a new DAO. In return, when the decentralization swap is complete, these users will receive tokens of the DAO with everyone paying the same price. Developers can specify a time period and minimum & maximum funding target of ICP to be collected, which determines when the sale is over.

The ICP funds raised by the decentralization swap are retained within the reserves of the fully autonomous DAO, rather than being forwarded to the original developers of the dapp or service. These funds can be used to pay for future computation needs of the dapp and also to pay code bounties for future dapp enhancements.

Investments via decentralization swaps in DAOs act like rocket fuel for the IC ecosystem. It provides easy and transparent access to exciting Web3 projects and channels funds to productive usage of the platform.

### Development of total supply

The IC has inflationary and deflationary mechanisms. Governance participants can convert voting rewards to newly minted ICP. Also, node providers receive rewards in the form of newly minted ICP tokens. On the other hand, ICP is converted to cycles (i.e., burned) in order to pay for computation and storage. This is depicted in the following picture.

![](/img/how-it-works/deflation_inflation.png)
