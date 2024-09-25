---
title: "Network Nervous System: Internet Computer Blockchain Governance"
abstract: 
shareImage: /img/how-it-works/network-nervous-system.webp
slug: network-nervous-system-nns
---

# The Network Nervous System (NNS)

[![Watch youtube video](https://i.ytimg.com/vi/hWnsluxmRqc/maxresdefault.jpg)](https://www.youtube.com/watch?v=hWnsluxmRqc)


The Network Nervous System (NNS) is the DAO that controls the Internet Computer blockchain. It is an open, permissionless governance system, where everyone can participate by staking ICP utility tokens in so-called _neurons_. Decisions are made by voting on _proposals_, which can be submitted by anyone.




## Governance participation
Governance participants are called _neurons_. Neurons are created by locking ICP utility tokens for a specified period of time. The NNS is a stake-based governance system, where a neuron's voting power is depending on three main factors:
1) the amount of ICP tokens the neuron stakes
2) the neuron's _dissolve delay_ which is the duration of the staking period
3) the neuron's _age_, which on a high level is the time since the tokens have been staked.


This incentivises neurons to vote in the long-term interest of the ICP as those neurons who are more committed have more voting power.


Governance participation is incentivised by _voting rewards_ to neurons. They are proportional to a neuron's voting power and how much voting decisions a neuron participated in.


## Proposals
_Proposals_ are suggestions on how to change the ICP protocol. Any neuron can submit a proposal, and all other neurons can then vote on it. Neurons can vote with the voting power they have at the time of the proposal's submission.


## Liquid democracy
The NNS implements a form of _liquid democracy_, which means that neurons can either vote directly on proposals, or delegate their voting power to other neurons, called _following_. Following is done on the basis of proposal _topics_, i.e. groups of proposals that are similar. This facilitates following different experts on different topics. The voting delegations can be changed at any point in time.


## Voting rules
Voting on NNS proposals follows an algorithm called _wait-for-quiet_. The main idea of wait-for-quiet is that proposals where all voters agree can be executed quickly, while strongly contested proposals have a longer voting period. This allows voters to have enough time to react if a proposal result is turned all of a sudden. Currently, most proposals start with an initial voting period of 4 days that can be extended up to a total of 8 days.
A proposal is adopted if either of the two conditions are met:
1) the voting period has elapsed, there are more votes in favor than against the proposal (simple majority), and at least 3% of the totally available voting power voted in favor of the proposal (enough participation).
2) more than 50% of the total voting power are in favor of the proposal. At this point, the proposal's result cannot be changed anymore even if all remaining voters vote against the proposal and therefore the proposal is executed without awaiting the end of the voting period.


## Proposal execution
As soon as a proposal is adopted, it is executed by the NNS. With very few exceptions, proposals are executed automatically and fully onchain.




## What the NNS governs
The NNS governs the full Internet Computer blockchain. For example, the NNS makes decisions on the following topics.
* *Network topology*: The NNS decides which node machines can join the network and how these nodes are organized into _subnets_.
* *Software run on the nodes*: The NNS decides which software is run by the nodes that form the blockchain. This allows the NNS to upgrade the protocol without manual intervention of the individual node operators.
* *Tokenomics*: The NNS decides how many rewards node operators and governance participants get and the costs of computation and storage on the Internet Computer.
* *Governance*: The NNS decides on the rules of the governance itself, e.g. how many votes are needed for a proposal to be adopted, how long the voting period is, etc.
* *Motion*: These proposals allow for opinion polls and are the only proposals that do not have a direct effect. 


With the exception of motion proposals, all these decisions are executed fully onchain and at low cost compared to other chains. Therefore, decisions can be made efficiently and frequently allowing the NNS to adapt the ICP platform to the community's needs.


## The Architecture of the NNS
The NNS is implemented as a set of _canister smart contracts_ on a dedicated _NNS system subnet_. Facilitated by the low computation and storage costs on the ICP, and since the NNS subnet is cross-subsidized by other subnets, voting on proposals is free of charge and a high volume of votes and proposals can be processed and stored onchain.


Two important canisters are the _governance canister_ that manages neurons, proposals, and the voting process, and the _ICP ledger canister_ that implements the ICP token which is the NNS governance token. In addition, there are other canisters for special purposes, for example the _cycles minting canister (CMC)_ that is responsible to mint _cycles_ - the "gas" used for computation and storage on the ICP.


To allow for flexible governance evolution, the NNS canisters are _mutable smart contracts_. Two canisters, called _root_ and _lifeline_, are responsible for upgrading the NNS canisters. As NNS canisters control each other, it is ensured that they can only be changed by an NNS DAO decision.









