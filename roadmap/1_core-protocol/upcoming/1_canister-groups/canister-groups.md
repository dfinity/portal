-
title: Canister groups
links:
  Forum Link: https://forum.dfinity.org/t/canister-groups/16015
  Proposal: 
eta:
is_community: false
---

Communication between canisters on the same subnetwork is very fast since the messages that they exchange do not need to go through consensus. Since intercanister communication latency is less of a concern, one can scale Dapps through multi-canister architectures, as long as the canisters are guaranteed to be collocated. 

Since upcoming load-balancing mechanisms need to move canisters between subnets, we need to avoid splitting up canisters that are part of the same Dapp.   This feature would allow a Dapp developer to explicitly indicate which canisters "belong" together and which should always be located on the same subnet.

