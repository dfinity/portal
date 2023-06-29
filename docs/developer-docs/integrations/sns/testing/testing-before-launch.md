---
sidebar_position: 1
---

# SNS testing before launch

Before launching an SNS it is advisable to thoroughly test it. 

## Two main ways for testing an SNS decentralization

### On a local machine

Developers can test **[on a local machine](./testing-locally.md)**. To help developers, DFINITY has created the `sns-testing` repo which has scripts that help developers test the SNS process. They can run a local version of the Internet Computer on their local machine, deploy their dapp locally and run through [the stages](../launching/launch-summary.md) of decentralizing their dapp. 

**The main intent of `sns-testing` repo is for a developer to test the actual process of decentralizing their dapp.**

Among other things, developers can use `sns-testing` repo to: 
* Initiate proposals.
* Pass proposals.
* Start decentralization swaps.
* Upgrade the dapp via DAO voting.

:::info
`sns-testing` is just one form of testing SNS process locally. Developers should feel free to use others, fork/modify `sns-testing` or create their own.
:::


### On the mainnet

Once a developer has tested the process of an SNS, it is highly recommended they do an **"SNS testflight" [on the mainnet](./testing-on-mainnet.md)**. An SNS testflight is when a developer deploys their dapp (to the mainnet) and hands control of it to a mock SNS (on the mainnet). 

**The main intent of performing an SNS testflight is for a developer to experience how a dapp works *after* it has been decentralized, so developer can make sure their dapp is ready for decentralization. It does not test the actual process of decentralizing it.**

:::info 
A testflight is not a repo or set of tools, but an *activity* (deploying and dapp and handing control of it to a mock SNS), so the instructions for [testing on the mainnet](./testing-on-mainnet.md) utilize various tools, but developers can of course use any tools they wish. 
:::

Among other things, here are some examples of issues developers find after running an SNS testflight: 
* Developers notice they need better pipeline for creating proposals to update a dapp.
* Developers notice they may have been decentralized prematurely and need to fix some things.
* Developers notice they may need better monitoring before decentralizing.

The mock SNS used in a SNS testflight gives developers the ability to see how post-decentralization lifecycle of a dapp looks like, but still provides a way for a developer to keep control of their dapp. **Therefore, developers are encouraged to run and perform an SNS testflight on the mainnet, potentially for multiple days or weeks, to ensure that all aspects have been covered.**
