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
This documentation is, as the name suggests, technical documentation aimed at developers.
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


## Explanations and Guides for Users
Finally, the website and Wiki contain information relevant for users of the SNS.

On the **website**, you will find **explanations on**
* [SNS overview page](https://internetcomputer.org/sns)
* [SNS FAQ](https://internetcomputer.org/sns/faq) including, for example 
  * [A guide how to participate in the SNS decentralization sale](/sns/faq#participate)
    
The **Wiki** contains more information about
* [DAO](https://wiki.internetcomputer.org/wiki/DAO)
* [Service Nervous System (SNS)](https://wiki.internetcomputer.org/wiki/Service_Nervous_System_(SNS))
* [Community Fund](https://wiki.internetcomputer.org/wiki/Community_Fund)
* [SNS Rewards](https://wiki.internetcomputer.org/wiki/SNS_Rewards)
* [SNS Tokenization Considerations](https://wiki.internetcomputer.org/wiki/SNS_Tokenization_Considerations)
* [SNS decentralization sale trust](https://wiki.internetcomputer.org/wiki/SNS_decentralization_sale_trust)

The Wiki also contains guides for the following topics:
* [How to get a DAO on the IC](https://wiki.internetcomputer.org/wiki/How_to_get_a_DAO_on_the_IC) providing a summary of how someone can get a DAO on the IC, but this is largely subsumed by the developer documentation here.
* [How-To: SNS tokenomics configuration](https://wiki.internetcomputer.org/wiki/How-To:_SNS_tokenomics_configuration) providing material enabling teams to choose a tokenomics set-up for their SNS DAO.
* [How-to: Verify SNS decentralization sale proposal](https://wiki.internetcomputer.org/wiki/How-to:_Verify_SNS_decentralization_sale_proposal) which is a guide how to verify the NNS proposal that starts a SNS decentralization sale.
* [How-to: Interact with SNS canisters](https://wiki.internetcomputer.org/wiki/How-to:_Interact_with_SNS_canisters) which is a guide on how to interact with SNS canisters.
* [How-To: Participate in the SNS decentralization sale via quill](https://wiki.internetcomputer.org/wiki/How-To:_Participate_in_the_SNS_decentralization_sale_via_quill), which is a command line tool for interacting with canisters.
* [How-To: Join the Community fund via quill](https://wiki.internetcomputer.org/wiki/How-To:_Join_the_Community_fund_via_quill), which is a command line tool for interacting with canisters.
