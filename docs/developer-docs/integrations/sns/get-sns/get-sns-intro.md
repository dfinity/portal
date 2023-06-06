---
sidebar_position: 1
---
# SNS testing before the launch
Before launching an SNS it is advisable to thoroughly test it. 

There are two main tools for testing the SNS
1. [SNS local testing](./local-testing.md) allows one to test the SNS locally.
   This includes 
   * Testing the SNS's launch which enables developers to 
   try out different initial parameters. 
   * Testing the integration of the SNS with a dapp, for
   example if you integrate parts of the frontend for the SNS into you dapp or
   if you build a DEX that interacts with the SNS.
   * testing the integration of the SNS canisters with the dapp canister(s).
    
2. [SNS testflight](./testflight.md) to test whether a dapp can be operated
under SNS control. This testing can be done locally or on mainnet with a test
   SNS. 
   It might be a non-trivial tasks to ensure that all operations that are run
   by manual scrips in a centralized setting can be executed by a DAO. 
   This might require new proposals or specific privilege settings in the
   dapp canister(s). Therefore, developers are encouraged to run perform 
   an SNS testflight on mainnet, potentially for multiple days or weeks, to
   ensure that all aspects have been covered.