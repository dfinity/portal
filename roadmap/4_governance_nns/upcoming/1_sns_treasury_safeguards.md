---
title: Safe guards for the access to the SNS treasury
links:
  Forum Post: https://forum.dfinity.org/t/safe-guards-for-the-access-to-the-sns-treasury/19669
eta: Q3 23
is_community: false
---
Via the proposal action “Transfer SNS Treasury funds” an SNS can vote on transferring funds from its treasury, for example to pay developers for work on code extensions. Currently, this type of proposals follows the same rules as all proposals which can be adopted with only 3% voter participation. There is the risk that a malicious treasury transfer is approved because:
* Voters might be overwhelmed with many proposals submitted in parallel.
* (Some) voters are not yet actively voting, in particular in the first days/weeks after SNS launch, where participants are still configuring their following set-up.

The proposed solution is to approve treasury transfer proposals only if they reach 50% approval.