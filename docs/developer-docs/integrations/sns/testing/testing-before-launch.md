---
sidebar_position: 1
---

# SNS testing before launch

Before launching an SNS it is advisable to thoroughly test it. 

## Two main ways for testing an SNS decentralization

### On a local machine

Developers can test **[on a local machine](./testing-locally.md)**. They can run a local version of the Internet Computer on their local machine, deploy their dapp locally and run through [the stages](../launching/launch-summary.md) of decentralizing their dapp. 

Developers can initiate, pass proposals, start decentralization swaps, upgrade dapp via DAO voting, etc...

### On mainnet

Developers can test **[on mainnet](./testing-on-mainnet.md)** (AKA "SNS testflight") and run through each of [the stages](../launching/launch-summary.md) of decentralizing their dapp on an SNS deployed to an app subnet. The tools for testing for this way always give teh developer a way to recover control of their dapp (something that would be impossible for a real SNS decentralization). 

Developers can initiate, pass proposals, start decentralization swaps, upgrade dapp via DAO voting, etc... It might be a non-trivial tasks to ensure that all operations that are run by manual scrips in a centralized setting can be executed by a DAO. This might require new proposals or specific privilege settings in the dapp canister(s). **Therefore, developers are encouraged to run perform an SNS testflight on the mainnet, potentially for multiple days or weeks, to ensure that all aspects have been covered.**
