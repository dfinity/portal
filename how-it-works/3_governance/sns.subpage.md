---
title: Service Nervous System
abstract:
shareImage: /img/how-it-works/service-nervous-system.webp
slug: sns
---

![](/img/how-it-works/service-nervous-system.webp)

# Service Nervous System (SNS)

The Service Nervous System (SNS) framework is the Internet Computer's built-in solution for creating and maintaining decentralized autonomous organizations (DAOs) to govern dapps. An SNS consists of an open, permissionless governance system governing a dapp, and of a built-in governance token that is unique to each SNS.


## SNS DAO
Generally, for each dapp that is under SNS DAO control, there is one SNS DAO. The SNS DAO works very similarly to the [NNS DAO that governs the full ICP](/how-it-works/network-nervous-system-nns/), where DAO participants are called _neurons_ and all neurons can suggest and vote on suggestions on how to evolve the dapp that are called _proposals_. Each SNS community can choose its own unique tokenomics and governance rules by parameters that can be set for each SNS DAO.


### What an SNS governs
On a high level an SNS DAO governs a dapp, that is decides on the code of that dapp and how it is evolved. On the Internet Computer this can also include the dapp's data and frontend. Moreover, the SNS DAO makes decisions on the DAO itself, for example on how to change tokenomics. More technically, there are _native proposals_ that are common to all SNSes, such as proposals to upgrade the DAO-controlled dapp canisters, change governance rules, or making transfers from the treasury to open a liquidity pool on a DEX. In addition, each SNS can define _custom proposals_ that are specific to the dapp's needs. A proposal can be defined to call any method on any canister. This allows, for example to define proposals that orchestrate upgrades of dapps with many canisters.




### Liquid democracy
The SNS implements a form of _liquid democracy_, which means that neurons can either vote directly on proposals, or delegate their voting power to other neurons, called _following_. In the SNS, following is done on the basis of proposal _types_. This facilitates following different experts on different proposals kinds. The voting delegations can be changed at any point in time.


### Voting rules
Voting on SNS proposals follows an algorithm called _wait-for-quiet_. The main idea of wait-for-quiet is that proposals where all voters agree can be executed quickly, while strongly contested proposals have a longer voting period. This allows voters to have enough time to react if a proposal result is turned all of a sudden. Each SNS can decide on the initial and maximal voting period of proposals.


For proposal adoption, SNSes distinguish between normal and _critical_ proposals, which include for example treasury transfer proposals.
Most proposals are adopted if
1) the voting period has elapsed, there are more votes in favor than against the proposal (simple majority), and at least 3% of the totally available voting power voted in favor of the proposal (enough participation).
2) more than 50% of the total voting power are in favor of the proposal. At this point, the proposal's result cannot be changed anymore even if all remaining voters vote against the proposal and therefore the proposal is executed without awaiting the end of the voting period.


For _critical_ proposals, these rules are more strict and passing a proposal requires two thirds of the votes to be in favor of it and at least 20% of the totally available voting power in favor of the proposal (enough participation).


### Proposal execution
As soon as a proposal is adopted, it is executed by the SNS. With very few exceptions, proposals are executed automatically and fully onchain and thus do not require trusting any third party.

## The Architecture of an SNS


### SNS canisters
Each SNS DAO consists of a set of _canisters smart contracts_ that run _Wasm code_. The most central canisters closely resemble the [Network Nervous System](/how-it-works/network-nervous-system-nns/) (NNS) which is the DAO that governs the full ICP. The _governance canister_ implements the governance system and the _ledger canister_ implements an SNS specific governance token. The _swap canister_ implements the initial decentralization swap that is used during the launch process (see below) to raise initial funds in the form of ICP and swap them for newly minted SNS tokens. These canisters, together with a few additional ones, form one SNS DAO that governs one dapp.


### SNS canister code
The SNS DAOs are hosted on the _SNS subnet_.


The Wasms run on SNS canister are approved by the [NNS](/how-it-works/network-nervous-system-nns/) and published on an NNS canister called the _SNS wasm modules canister (SNS-W)_. If an SNS community decides, by DAO decision, to update the SNS, then the DAO will automatically fetch the new version from SNS-W and update the canisters accordingly. This means that all the SNS DAOs run code that is pre-approved by the NNS and they all run the same code (some of the SNS might be a few versions behind). The fact that this is built into the platform makes it easy for SNS DAO communities to maintain the code. Moreover, it is easy for users to verify different SNS DAOs as they all run the same, pre-approved code.


## SNS Launch process
The SNS framework includes a process how to launch a new SNS. To decentralize a dapp, the dapp is handed over to the Internet Computer together with an NNS proposal defining the details of the SNS launch and the initial configuration of the SNS DAO to be created. The proposal details, for example, the initial token distribution. If the NNS community approves this proposal, the following steps are executed fully automatically:
* The NNS creates a new set of SNS canisters and initializes them as defined in the NNS proposal.
* The NNS hands over the dapp's control to the newly created SNS.
* The NNS starts an [_initial decentralization swap_](/sns/faq#what-is-a-decentralization-swap) for the SNS. The purpose of this is to raise initial funds for the DAO and to decentralize the voting power. This is done by an open swap where users can contribute ICP tokens as initial funding and get in return (staked) SNS tokens and thereby a share of the DAO's voting power.
* If the decentralization swap is successful, the SNS launch was successful and turns into a fully functional DAO.




