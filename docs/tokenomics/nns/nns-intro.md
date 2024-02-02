# Network Nervous System (NNS)

## Overview​
The [NNS](https://nns.ic0.app/) is the decentralized autonomous organization (DAO) that governs the Internet Computer Protocol. 

It is a fully on-chain, decentralized organization and is, for instance, responsible for making protocol-level upgrades to continuously improve the Internet Computer Protocol. 

It operates under a liquid democracy in which those who have staked their ICP or [ICP neuron holders vote](../../concepts/governance.md) vote on proposals that shape the development of the Internet Computer. 

Examples of proposals include:
1. upgrade the protocol and software used by the node machines that host the network
2. create new subnet blockchains to increase network capacity
3. split subnets to divide their load
4. configure economic parameters that determine the cost for compute capacity
5. In extreme situations, it can freeze malicious canister smart contract software to protect the network; and many other things. 

A proposal passes based on either:
- **Absolute Majority** - At any point, even before the voting period ends, if an absolute majority (more than half of the total voting power) has voted "yes," then the proposal is adopted. If an absolute majority has voted "no," then the proposal is rejected.

- **Simple Majority** - When the voting period ends, if a simple majority (more than half of the cast votes) has voted "yes" and the number of these yes votes constitutes at least 3% of the total voting power, then the proposal is adopted. Otherwise, the proposal is rejected.

For determining how long proposals are open for voting, the governance uses a so called "Wait-for-quiet" algorithm. This ensures that proposals are decided quickly if all voters agree, but have a longer voting period if they are controversial. Most proposals start with 4 days of voting period that can be extended up to 8 days.
Once a proposal is adopted, it is autonomously executed on-chain.

While other blockchains take weeks or months to upgrade (sometimes called hard fork) and typically require substantial manual work and coordination to do so, ICP upgrades itself every week (https://dashboard.internetcomputer.org/releases). Its ability to upgrade and iterate is a comparative "superpower."

## Proposals 
Participants submit proposals to the NNS. Refer to the proposal submission requirements and types at [Proposal Requirements](./proposal-requirements.md).

Proposals are adopted or rejected based on voting activity by “neurons” that network participants have created.

## Participation Rewards
Network governance on the Internet Computer is incentivized through a system called "neurons".
ICP token holders can create a “neuron” by staking ICP up to eight years. 

When a user creates a neuron, the locked balance of ICP can only be unlocked by disbursing (“destroying”) the neuron. Each neuron is configured with “dissolve delay.” or setting that determines the minimum amount of time that you have to wait before you can unlock your original locked ICP utility tokens. Once a neuron has been placed into “dissolve mode,” its dissolve delay falls over time, rather like a kitchen timer, until it reaches zero, whereupon its owner can perform a final disburse action to unlock the balance of ICP. 

Neurons with a longer dissolve delay have more voting power and get more rewards so that they are economically incentivized to vote in the best long-term interests of the network.  

The number of rewards that neuron receives derive from factors as the amount of staked tokens, the lockup period remaining (the “dissolve delay”), the neuron’s “age”, the proportion of possible votes it has participated in, and the sum of voting activity across all neurons, since the overall total rewards are capped and must be divided between voters.

It is expected that a large proportion of the overall supply of ICP will be locked to earn rewards to secure the Internet Computer’s network governance from attacker to acquire a sufficiently large stake to gain significant influence. 

For more information on neurons, refer to the [What are Neurons section in the NNS quickstart](https://internetcomputer.org/docs/current/tokenomics/token-holders/nns-app-quickstart).
For more information on staking rewards, refer to [Staking and Voting Rewards](https://internetcomputer.org/docs/current/tokenomics/nns/nns-staking-voting-rewards).

## Participation

Neuron owners face challenges in manually voting on every NNS proposal due to high submission volumes and a potential lack of expertise. The NNS allows automatic voting through delegation where neurons automatically vote by following others for all proposals or a specific proposal topic. This ensures efficient decision-making without requiring constant manual input.

It is expected that a large proportion of the overall supply of ICP will be locked to earn rewards. This secures the Internet Computer’s network governance, by making it both difficult and exorbitantly expensive for an attacker to acquire a sufficiently large stake to gain significant influence. Since neuron owners may wish to maximize their rewards by voting on all proposals, most neurons will either be actively managed or configured to follow other neurons so that they can vote automatically.

To participate, navigate to the [NNS app](https://nns.ic0.app/).