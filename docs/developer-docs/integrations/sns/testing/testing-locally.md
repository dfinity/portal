---
sidebar_position: 2
---
# Testing SNS locally

After having [chosen the initial SNS parameters in a .yaml file](../tokenomics/preparation.md)and before requesting an SNS launch in production, the SNS launch should be tested locally.

## Testing via `sns-testing` repo

A common way to test an SNS locally is to use the `sns-testing` [repo](https://github.com/dfinity/sns-testing#readme).

### Examples of what it tests

The `sns-testing` repo can help one test the following:

* 

You might also want to test integrations and basic SNS functionality. 
For this purpose you can use the above instructions after the test SNS is 
launched or use the [SNS testflight on mainnet](testing-on-mainnet.md).


A detailed description of how to run through [all the steps included
in an SNS launch](../launching/launch-steps.md) locally can be
found in [this repository](https://github.com/dfinity/sns-testing#readme).
