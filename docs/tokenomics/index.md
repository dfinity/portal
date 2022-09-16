--- 
hide_table_of_contents: true
---

# DAOs and Tokenomics

When building this developer documentation we tried to include the natural guides; how to [get started](../developer-docs/quickstart/hello10mins.md) with canister smart contract development, how to [make progress](../developer-docs/build/), how to [deploy](../developer-docs/deploy/), update and manage apps. There were some remarks about cycles and their use in computation and about [integrating various features](../developer-docs/integrations/) of the IC. Yet, somehow it still felt like something was lacking in the documentation. Building on the IC is about more than just the code. 

Building decentralized applications inherently requires us to open our minds to new ways of thinking and coding, but also of interacting, controlling, funding and planning. This category of documentation aims to capture the more *entrepreneurial* considerations that will likely arise in a move towards a more open internet. This is done both via noting considerations that should be made by developers and builders, but also by end users of apps, as, after all, the line between these types of people becomes ever more blurry.


## Network Nervous System (NNS)
The NNS is the open tokenized DAO that controls the IC. As we move to more and more decentralization, it is crucial to learn more about the IC components that facilitate community governance. The NNS allows users to participate the governance of the IC by staking tokens and voting (or delegating votes - liquid democracy ftw) and to earn rewards over time. 
- How to make proposals
- Proposals, voting and rewards can be explored in the [Governance section](https://dashboard.internetcomputer.org/governance) on the dashboard.
- Start participating in the NNS app by checking out the [NNS Intro](token-holders/nns-app-quickstart.md).

## Service Nervous System (SNS)
As the NNS is to the IC, an SNS is to services running on the IC. Governance of a service or dapp can operate in a decentralized manner by getting an SNS. 
- [Dive into the SNS and DAOs](./sns/sns-intro-tokens.md)
- See the [tokenomics of a DAO](./sns/tokenomics.md)
- Think about the numerous [considerations](./sns/predeployment-considerations.md) that should be made if you plan to get an SNS


## Identity & Authentication
One of the advantages of building apps on the Internet Computer is that users can interact and authenticate without the need for holding tokens. This is facilitated by Internet Identity. 

- [What is Internet Identity](identity-auth/what-is-ic-identity.md)
- [How to get started with Internet Identity](identity-auth/auth-how-to.md)

## Token Holders
There are multiple ways to obtain token; purchasing via an exchange, earning as a node provider, receiving from a friend, or otherwise. Learn about some options for how to hold tokens, and how you can set up self-custody. Follow the quickstart to take control of your tokens. 
- [Custody Options](token-holders/custody-options-intro.md)
- [Self Custody Quickstart](token-holders/self-custody-quickstart.md)