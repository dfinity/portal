---
title: Service Nervous System (SNS)
links:
  Proposal: https://dashboard.internetcomputer.org/proposal/65132
  Deployment & Upgrades: https://forum.dfinity.org/t/sns-deployment-and-upgrades-design-proposal/10816
  Rewards: https://forum.dfinity.org/t/open-governance-canister-for-sns-design-proposal/10224/36
  Decentralization sale: https://forum.dfinity.org/t/sns-initial-token-swap/13591
eta: September 2022
is_community: false
---

Service nervous systems (SNSs) are algorithmic DAOs that will allow developers to create decentralized, token-based governance systems for their dapps.
The Carbon milestone introduces the following SNS features:

1. **SNSs as a system function.** This introduces a special SNS subnet with increased security. Also, there will be tool support for developers to initially deploy their SNS on this subnet. Moreover, the SNSs on this subnet will be more easily maintainable as the SNS canisters can only be upgraded according to a blessed upgrade path maintained by the NNS community
2. **Voting rewards.** This aims at introducing a first, minimal version of voting rewards for SNSs that can then be further customized in the future.
3. **Decentralization sale.** This introduces a way for participants to provide initial funding for a dapp by exchanging ICP tokens for SNS tokens during the SNS launch that decentralizes the dapp.
4. **A minimal frontend.** This introduces a first version of a frontend dapp that allows end users to interact with the SNS in a more user friendly way. This first version will support participating in the decentralization sale and a subset of the governance functionalities.

The governance canister is similar to the NNS’s governance canister but has a simpler and more flexible design, allowing each SNS community to choose the configurations according to their needs. This feature will also provide tooling for initializing an SNS. This is the first building block for the SNS, which will be further evolved in the Carbon milestone.
