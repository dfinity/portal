# Service Nervous System (SNS)

## Overview
These pages introduce instructions needed when considering handing over control of a 
dapp to a Service Nervous System (SNS) or integrating with an SNS.
If this is the first time you hear about the SNS, we recommend to take a look at the high level [SNS](/sns)
and [FAQ](/sns/faq) pages to get an overview of what is discussed in more detail here.

This page provides an overview of how the SNS developer documentation is organized and also lists references to other relevant SNS documentation.

## Introduction to the SNS
This section gives a high level overview of the SNS lifecycle, including the architecture and how an SNS is launched.
You will find 
* [SNS introduction](./introduction/sns-intro-high-level.md) giving a quick introduction.
* [SNS architecture](./introduction/sns-architecture.md) explaining how SNSs are deployed and upgraded and what canisters are involved.
* [SNS launch](./launching/launch-summary.md) explaining on a high level how and SNS is launched.
* [Alternative DAOs](./introduction/dao-alternatives.md) presenting alternative ways how to get a DAO.

## Preparing an SNS launch
This section introduces the ideas and tools needed when considering to form a DAO, including less technical aspects, such as planning the tokenomics, as well as more technical aspects, such as how different configuration choices can technically be set in the SNS.

In this documentation you will find
* [An introduction to SNS preparation](./tokenomics/index.md).
* [The SNS launch checklist](./tokenomics/sns-checklist.md) providing a summary of what to consider when launching an SNS.
* [Pre-deployment considerations](./tokenomics/predeployment-considerations.md) introducing some non-technical considerations to take into account when planning an SNS launch.
* [SNS tokenomics](./tokenomics/tokenomics-intro.md) providing and introduction to tokenomics that can be considered when planning an SNS's tokenomics.
* [SNS rewards](./tokenomics/rewards.md) providing and introduction to SNS rewards that can be considered when planning an SNS's tokenomics.
* A (technical) introduction how to convert the configurations into [SNS parameters](./tokenomics/preparation.md).

## Integrating with an SNS
This section not only targets developers that have a dapp that they would like to decentralize with an SNS, but also developers that want to build services that integrate with SNSs, such as wallet dapps or decentralized exchanges.

It includes
* [An introduction to SNS integration](./integrating/index.md). 
* [Guidelines how to integrate with the ledger canister](./integrating/ledger-integration.md).
* [Guidelines how to integrate with the index canister](./integrating/index-integration.md).

## Testing an SNS
An important part of preparing an SNS launch, integrating with an SNS, and managing an SNS, is testing.
This section provides 
* [An introduction to SNS testing](./testing/testing-before-launch.md).
* [Guidelines how to test an SNS locally](./testing/testing-locally.md), including the SNS launch.
* [Guidelines how to test the operation of the dapp under SNS control](./testing/testing-on-mainnet.md), including on the mainnet.

## Launching an SNS
This section of documentation explains the SNS launch in detail.
It contains:
* An [introduction of how to read the launch pages](./launching/index.md) as there are currently two supported methods how to launch an SNS.
* A detailed [description of all stages included in an SNS launch](./launching/launch-summary-1proposal.md) for the recommended launch flow that was adopted by the NNS in August 2023 and only includes one proposal.
* [The technical actions that are needed to complete the SNS launch stages](./launching/launch-steps-1proposal.md) for this recommended launch flow that only includes one proposal. 
* A detailed [description of all stages included in an SNS launch](./launching/launch-summary.md) for the old, legacy launch flow that is still available for those who started testing with this flow but might be deprecated at some point.
 * [The technical actions that are needed to complete the SNS launch stages](./launching/launch-steps.md) for the old, legacy launch flow that is still available for those who started testing with this flow but might be deprecated at some point but.

## Managing an SNS
After an SNS is launched, the SNS community needs to manage it, including ensuring that the canisters have enough cycles, govern the dapp, and manage SNS canister upgrades.
This section includes
* [An introduction to managing an SNS](./managing/manage-sns-intro.md).
* [An introduction to SNS proposals](./managing/making-proposals.md).
* [Tips regarding cycles management for the canisters](./managing/cycles-usage.md).
* [An intorduction to how to use the asset canister with an SNS-controlled dapp](./managing/sns-asset-canister.md).


<!-- Information on nervous system parameters that can be configured in each SNS (managing-sns/nervous-system-parameters.md); Information on how SNS are upgraded (managing-sns/upgradeSNS.md)-->

## Explanations and guides for users
Finally, the website and Wiki contain information relevant for users of the SNS.

On the **website**, you will find **explanations on:**
* [SNS overview page](https://internetcomputer.org/sns).
* [SNS FAQ](https://internetcomputer.org/sns/faq) including, for example:
  * [A guide how to participate in the SNS decentralization swap](/sns/faq#participate).

The **Wiki** contains more information about
* [DAOs](https://wiki.internetcomputer.org/wiki/DAO).
* [Service Nervous System (SNS)](https://wiki.internetcomputer.org/wiki/Service_Nervous_System_(SNS)).
* [Neurons' Fund](https://wiki.internetcomputer.org/wiki/Neurons_Fund).
* [SNS Rewards](https://wiki.internetcomputer.org/wiki/SNS_Rewards).
* [SNS Tokenization Considerations](https://wiki.internetcomputer.org/wiki/SNS_Tokenization_Considerations).
* [SNS decentralization swap trust](https://wiki.internetcomputer.org/wiki/SNS_decentralization_sale_trust).

The Wiki also contains guides for the following topics:
* [How to: get a DAO on the IC](https://wiki.internetcomputer.org/wiki/How_to_get_a_DAO_on_the_IC) providing a summary of how someone can get a DAO on the IC, but this is largely subsumed by the developer documentation here.
* [How to: SNS tokenomics configuration](https://wiki.internetcomputer.org/wiki/How-To:_SNS_tokenomics_configuration) providing material enabling teams to choose a tokenomics set-up for their SNS DAO.
* [How to: verify SNS decentralization swap proposal](https://wiki.internetcomputer.org/wiki/How-to:_Verify_SNS_decentralization_sale_proposal) which is a guide how to verify the NNS proposal that starts a SNS decentralization swap.
* [How to: interact with SNS canisters](https://wiki.internetcomputer.org/wiki/How-to:_Interact_with_SNS_canisters) which is a guide on how to interact with SNS canisters.
* [How to: participate in the SNS decentralization swap via quill](https://wiki.internetcomputer.org/wiki/How-To:_Participate_in_the_SNS_decentralization_sale_via_quill), which is a command line tool for interacting with canisters.
* [How to: join the community fund via quill](https://wiki.internetcomputer.org/wiki/How-To:_Join_the_Community_fund_via_quill), which is a command line tool for interacting with canisters.
