---
title: Subnet Splitting
links:
  Forum Link: https://forum.dfinity.org/t/long-term-r-d-subnet-splitting-proposal/9402/4
  Proposal: https://dashboard.internetcomputer.org/proposal/35672
eta:
is_community: false
---

The Internet Computer is designed to have unbounded capacity by scaling out to different subnet blockchains. 
Each subnet, however, has a bounded capacity: It is limited in how many messages it can process and how much canister memory it can hold. 
If a subnet becomes overloaded then the canisters on that subnet may become less responsive or unable to increase their memory usage. 
Subnet splitting aims to address such issues by introducing a new NNS proposal that splits a single subnet into two subnets. 
After adding sufficiently many replicas to the subnet to uphold decentralization guarantees,
the replicas are divided into two groups, each of which will become a separate subnet. 
The canisters are distributed over the two subnets in a similar fashion: 
Each of the two child subnets only have half of the load before the split. 
Since all replicas already have the state of all canisters on the subnet, no slow transfer of state is required and the subnet downtime due to splitting should be minimal.