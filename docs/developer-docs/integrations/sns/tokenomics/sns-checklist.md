---
sidebar_position: 2
---

# SNS preparation checklist

:::caution
This guide is intended for informational purposes only and may be modified over time as 
appropriate. It is aimed to provide general guidance for projects that are planning to launch 
an SNS but should not be construed as the definitive list of action items that need to be taken
in preparation of any such launch. Following this guide is not a guarantee of a successful SNS
launch – that is a decision by the NNS DAO. Ultimately, following this guide and/or launching
an SNS is done at your own risk.
:::

:::info
The NNS has approved a new flow for how SNSs can be launched that only require one proposal.
The old flow required two NNS and one SNS proposal.
Since this is now the recommended flow how to launch an SNS, this page and others focus on the new "one-proposal" flow.
Nevertheless, the old, legacy flow is still available for those projects who started with the old flow and want to continue with this path, for example because they already started testing. These project can find the detailed launch stages according to the old flow [here](../launching/launch-summary.md) and the concrete actions to take to run through these stages [here](../launching/launch-steps.md). 
:::

# 1. Documentation / Preparation

## 1.1. Tokenomics specification

### 1.1.1. Token utility
Define concisely for which use cases the token of the DAO will be used for participation in governance, rewarding active participation in services offered by the dapp that is governed by the DAO and rewarding contributions to the growth of the dapp and the DAO.

### 1.1.2. Initial token allocation
For the initial token allocation, i.e., defining which groups/accounts should receive how many tokens, developers could consider the following main blocks: DAO treasury, decentralization swap, seed funders and funding development team. See more information about token allocation in the [tokenomics intro](./tokenomics-intro.md). Include information about vesting periods for developers and the seed team.

### 1.1.3. Voting power
Provide information about how voting power is distributed at genesis, potential attack vectors and how the voting power might evolve over time.

It is considered to be best practice that swap participants have the majority of voting power at genesis. If the developers and seed investors have the majority together, then it should be clearly articulated why these two parties are independent.

### 1.1.4. Funding target
The minimum and maximum funding target must be defined for the decentralization swap. Add information about the planned usage of the funds, e.g. plans of ramping up the team.

### 1.1.5. SNS tokenomics tool
Use the [SNS tokenomics tool](https://docs.google.com/spreadsheets/u/0/d/1eSxkJl94jPt63CdOXH6ROy-WSkacW6P4qcAKMLrfBPc/edit) to analyze and document the chosen amount of tokens, initial distribution of tokens, dissolve delays etc. Both the tool and a training deck can be found in [this wiki page](https://wiki.internetcomputer.org/wiki/How-To:_SNS_tokenomics_configuration).

## 1.2. Technical architecture / whitepaper / project roadmap

### 1.2.1. Technical architecture
The technical architecture should give an overview of the dapp and illustrate how the dapp works. Some dapps rely on off-chain components, either developed and maintained by the team, or 3rd party components. The use of components that will not be controlled by the DAO should also be included to show the dependencies.

### 1.2.2. Whitepaper
The whitepaper should provide information about the dapp, the architecture, the goal with launching the SNS, tokenomics and other information relevant to the community to vote on the decentralization proposal. It should be clear what the dapp will gain from the SNS launch. For inspiration,  see OpenChat’s whitepaper it [here](https://oc.app/whitepaper), and Hot or Not’s whitepaper [here](https://hotornot.notion.site/hotornot/Hot-or-Not-Whitepaper-c539179e51f44867979f4372e4635f59).

### 1.2.3. Project roadmap
The roadmap should show what the plan is with the dapp, also past the SNS launch. The roadmap should show the vision the team/developers behind the dapp have for the dapp, and what they would like to work on, also after the SNS launch. See [OpenChat’s roadmap](https://oc.app/roadmap) for inspiration.

## 1.3. Disclosure of dependencies
It may not be possible to fully decentralize the dapp at the time of the SNS launch. The dapp may rely on off-chain services or 3rd party service providers like SMS/text gateways.

If the dapp does have dependencies of some kind that cannot be managed by the DAO, then those dependencies should be documented so the community is aware of potential risks. When possible, there should also be a plan for how to bring these services on-chain and under control of the DAO.

## 1.4. Create SNS configuration file
The SNS is initialized using an NNS proposal that defines the initial parameters, thus the initial configuration is approved by the NNS DAO.
The proposal can be created from a .yaml configuration file and defines things like the token name, token supply, token distribution, transaction fees, dissolve delays and more. 

The initial parameters are explained more [here](./preparation.md).
You can find a template with all parameters that need to be defined [here](https://github.com/dfinity/ic/blob/master/rs/sns/cli/sns_init_template.yaml) and an example of a filled in file [here](https://github.com/dfinity/sns-testing/blob/main/example_sns_init.yaml).
Add comments, explaining the parameters and token allocation, in the configuration file for transparency and ease of reading.

Geo-restriction can be used to exclude users with IPs in specific countries with the “restricted_countries” parameter, which takes an array of country codes like this: `restricted_countries: [ "CH" ]`. 

A confirmation text, defined as a parameter that is approved by the NNS, can be shown before the user can participate in the decentralization swap. This confirmation text can be set like this: `confirmation_text: "Please confirm that..."` 

Test the configuration extensively locally before submitting the NNS proposal. See section 2 for more information about testing.

## 1.5. Create NNS proposals
<!-- OLD: As a part of the SNS launch process, two proposals must be created. The first proposal is for allowing a principle to create the SNS canisters, see Hot or Not’s [command](https://forum.dfinity.org/t/help-submit-the-sns-w-wallet-principal-id-to-be-whitelisted/20322/20) to create the first proposal.-->

 As a part of the SNS launch process, an NNS proposal must be created to ask the NNS to create an SNS and start a decentralization swap. You can find the details about how to create such a proposal [here](../launching/launch-summary-1proposal.md).

Include relevant information like tokenomics (token distribution, governance, decentralization swap), details about the dapp (link to the open sourced code), whitepaper, a link to the forum discussion (see Step 3.2), and anything else relevant for the community to make a decisions if an SNS should be launched for the dapp. 

For details about the preparation process, see the [documentation](./preparation.md) and for details about how the launch works, see [this documentation](../launching/index.md). 
The documentation page [SNS predeployment considerations](./predeployment-considerations.md) has a list of topics that should be covered in the whitepaper/proposal. See this [forum post](https://forum.dfinity.org/t/dfinitys-voting-on-upcoming-sns-launch-proposals/19543) for information about DFINITY’s voting.

# 2. Technical Prep & Testing

## 2.1. Security review
In general, it is considered best practice to conduct a security review including the fixing of risky findings. Guidance on security best practices is [here](../../../security/index.md). It should be explained to which extent security reviews are relevant for the dapp and what kind of security reviews have been conducted for the dapp if applicable.

## 2.2. Open Sourcing
If the dapp is not already open sourced, it should be open sourced before the SNS launch - actually before the decentralization proposals are created. A dapp is not truly decentralized if the source code is not shared with the community. Open sourcing the code gives the community an opportunity to evaluate the dapp before the SNS launch, and after the launch, where upgrades must be voted on. It’s hard to make a meaningful voting decision without having full visibility into the code, and without the visibility it will also not be possible to verify the code and assess the impact it will have, before voting.

## 2.3. Create reproducible build
It should be possible to create a reproducible build from the open sourced code, for the same reasons as open sourcing the code. Providing the build and deploy instructions enables the community to evaluate the dapp and the code before voting on the SNS launch proposal, and after the decentralization, where upgrades must be voted on, the upgrades can be verified and tested by the community before voting.

Provide the build and deploy instructions with the source code. Ideally the instructions are a part of the code repository README file, and if that’s not the case, a link to the instructions should be available in the README file. In order to be able to create a reproducible build, the build environment needs to be reproducible. The documentation [here](../../../backend/reproducible-builds.md) provides more information how reproducible builds can be created using Docker.

## 2.4. Test dapp operations under SNS on mainnet with SNS Testflight
Before requesting an SNS launch in production, developers are strongly encouraged to test their deployed dapp’s operation (e.g., upgrading the dapp’s canisters) via SNS proposals, as if the live version of the dapp was managed by SNS.

Make sure to test upgrading canisters through SNS proposals, test updating asset canister content through SNS proposals, and other typical upgrade and maintenance operations. Also establish a [cycles management strategy](../managing/cycles-usage.md), so canisters never run out of cycles. The longer the test runs, the better, ideally several weeks.

The developer can keep direct control over the dapp’s canisters registered with testflight SNS.
The testflight can be done in a local test environment or with the live dapp on the mainnet. When deployed on the mainnet, the testflight SNS is deployed to a regular application subnet instead of a dedicated SNS subnet.

To use the SNS testflight on the mainnet, pass the `–network ic` parameter to the deploy command. The [documentation](../testing/testing-on-mainnet.md) for running the testflight is the same as for deploying it locally - except for the added parameter (which is also covered in the documentation).

See the documentation for more information about testing [SNS Testflight on mainnet](../testing/testing-on-mainnet.md), including setup instructions.

## 2.5. Integrate an SNS frontend into the dapp
Developers can choose to integrate a frontend for the SNS functionality in the dapp. A good example of a useful integration is SNS proposal voting. This allows neurons to vote on proposals directly in the dapp frontend. Integrations should be tested thoroughly with the SNS Testflight or the local SNS test before the SNS launch.

## 2.6. Test the SNS launch locally
In addition to performing comprehensive testing of all dapp operations using the SNS (as explained in section 2.4), it is recommended to conduct a local test of the SNS launch process. By doing so, you can simulate the complete SNS initial token swap process also from the user’s perspective via the NNS frontend dapp. Detailed instructions on how to set up SNS locally for testing are available [here 1](https://github.com/dfinity/sns-testing).

# 3. Community Consultation

## 3.1. Publish tokenomics / whitepaper / roadmap / architecture
The documentation prepared in section 1.1 and 1.2 should be made publicly available ahead of the SNS launch. This provides transparency about the dapp, future plans with the dapp, the technical architecture and the tokenomics. This information can be shared on the dapp’s website, GitHub or where it would make sense.

## 3.2. Community discussion
It’s strongly recommended that developers have a discussion in the forum with the community about the decentralization plans. It’s suggested to start a thread at least a couple of weeks before the NNS proposal is created. This will allow the community to learn about your plans, ask questions and build trust in the SNS launch. The SNS initialization and decentralization swap will not start unless enough NNS neurons vote in favor of the proposal.

It is recommended to share:

- [x] The init file that you used. You can find the template [here](https://github.com/dfinity/ic/blob/master/rs/sns/cli/sns_init_template.yaml).
- [x] Provide whitepaper with a full description of the decentralization and tokenomics.
- [x] Provide a technical decomposition of the dapp architecture in terms of canisters, source code and documentation so that the community can validate that the dapp will actually be a decentralized application after the swap.
- [x] Explain to which extent security reviews were considered relevant for the dapp and what kind of security reviews have been conducted for the dapp.

The idea is to provide the community with information so they can verify what they are supporting from a decentralization standpoint.

This [forum post](https://forum.dfinity.org/t/dfinitys-voting-on-upcoming-sns-launch-proposals/19543) provides some initial thoughts from the perspective of DFINITY when voting. 

## 4. SNS Launch Workflow
Please find all stages included in an SNS launch [here](../launching/launch-summary-1proposal.md) and a more detailed descriptions of the actions needed to enable these stages [here](../launching/launch-steps-1proposal.md).

## 4.1. Dapp control handover
Together with the submission of the NNS proposal to launch an SNS, the dapp developers hand over their dapp to the NNS by setting the NNS root canister as an additional controller of the dapp. 

Consider what the impact of the handover will have for the entire dapp, since principals will change. Is it necessary to change access rights to e.g. asset canisters? All features of the dapp should be thoroughly tested before the SNS launch. See previous mention of testing with the SNS testflight.

## 4.2. Submit decentralization proposal
This proposal will initiate the SNS launch. Use the proposal content created in Step 1.4 and create the NNS proposal. You can learn how to do so in the [documentation about the required actions to go through the launch stages](../launching/launch-steps-1proposal.md).

## 4.3. Setup custom SNS functions
To execute code on SNS managed canisters via SNS proposals, the canisters must expose two public functions,
also referred to as generic functions in the documentation. The first function is a validation function 
to validate and render the proposal payload, and the second function is an execution function to perform
an action given the proposal payload.

To use generic functions, you must first submit an SNS proposal to register these functions with SNS governance. Once the proposal is adopted, you can submit proposals to execute them with a given binary payload.
You can find more details on proposals in the [documentation how to manage SNSs](../managing/making-proposals.md).
