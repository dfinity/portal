# Service Nervous System (SNS)

This section introduces ideas and instructions needed when considering handing control of an application to a Service Nervous System (SNS). If this is the first time you hear SNS, we recommend to take a look at the high level [SNS](/sns) and [FAQ](/sns/faq) pages to get an overview of what is discussed in more detail here.
We anticipate that different types of readers are interested
in different aspects of the SNS and in different kinds of documentation.
We thus try to split the SNS documentation accordingly.

This page provides an overview of the SNS documentation and 
provides links to the parts that already exist.
Some of the SNS documentation is still being worked on and will be 
edited or added as later SNS features are added, so please bare with
us if it is not yet complete or a few parts do not work yet.

## SNS and DAOs primer
The DAO Docs introduce the ideas and tools needed when considering to form a DAO. It targets developers or entrepreneurs who want to get an SNS, understand tokenomics of an SNS, and introduces predeployment, product-based, considerations like roadmapping.

In this documentation you will find
* [An introduction to DAOs and SNSs](./tokenomics/index.md)
* [An introduction to tokenomics of DAOs](./tokenomics/tokenomics-intro.md)
* [An introduction to SNS rewards](./tokenomics/rewards.md)
* [Tips on what to consider before getting an SNS](./tokenomics/predeployment-considerations.md)

## Technical documentation
This documentation is, as the name suggests, tecnical documentation aimed at developers.
Most of the documentation targets developers that have
a dapp that they would like to decentralize with an SNS. 
However, this documentation also targets developers that
want to build services that integrate with SNSs, such as wallet dapps
or decentralized exchanges.

Here you'll find an overview of the stages of an SNS.
* [A technical introduction to the SNS](sns-intro.md)

* Information on how to **get an SNS**, which includes
    * [An introduction how to get an SNS](get-sns/get-sns-intro.md) which
      explains the high level stages of getting an SNS
    * [Technical preparations for getting an SNS](get-sns/preparation.md) which
      describes the technical steps required before getting an SNS.
      We also link to non-technical steps that we recommend,
      which can be found under the "DAO and Tokenomics" documentation
      targeted at a less technical audience.
    * [Steps to Test the SNS locally](get-sns/local-testing.md)
    * Steps how to get an SNS in production <!--Steps how to get an SNS in production-->
  
* Tips for how to **integrate with an SNS**, which includes
  * Guidelines how to integrate a frontend <!--Guidelines how to integrate a frontend (integrate-sns/frontend-integration.md)-->
  * [Guidelines how to integrate with the ledger canister](integrate-sns/ledger-integration.md)
  * [Guidelines how to integrate with the index canister](integrate-sns/index-integration.md)

* Guidelines for how to **manage an SNS**, which includes
  * [An introduction to managing an SNS](managing-sns/manage-sns-intro.md)
  * [Tips regarding cycles management for the canisters](managing-sns/cycles-usage.md)
  * Information on nervous system parameters that can be configured
    in each SNS <!-- Information on nervous system parameters that can be configured in each SNS (managing-sns/nervous-system-parameters.md)-->
  * Information on how SNS are upgraded <!--Information on how SNS are upgraded (managing-sns/upgradeSNS.md)-->  
  * A guideline for SNS proposals <!-- A guideline for SNS proposals (managing-sns/proposal-guide.md)-->


## User Guides
Finally, the website and wiki contain information relevant for users of the SNS.

You will find
* [How-to: Interact with SNS canisters](https://wiki.internetcomputer.org/wiki/How-to:_Interact_with_SNS_canisters)
* [A guide how to participate in the SNS decentralization sale](/sns/faq#participate)
* [A guide how to verify the NNS proposal that starts a SNS decentralization sale](https://wiki.internetcomputer.org/wiki/How-to:_Verify_SNS_decentralization_sale_proposal)
