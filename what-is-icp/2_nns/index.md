---
title: What is the NNS

card: /img/roadmap/core-protocol.card.jpg
overlay: /img/roadmap/core-protocol.overlay.jpg
---
The Network Nervous System (NNS) is a dapp that governs the IC. 
First, it holds the ICP ledger, which tracks the accounts and transactions of the ICP utility token.
Second, governance is also part of the NNS, which enables ICP stakers to participate in voting about every aspect of the IC. For example, stakers may vote to upgrade the IC software or vote to extend the IC by adding a new subnet and so forth (learn more about staking, voting, and rewards here).
The entire structure of the IC, that is, information about all nodes, their allocation to subnets, and more, is maintained in the NNS registry, constituting a single but decentralized source of truth.
Moreover, the NNS provides the means to power canister smart contracts, explained below, by converting ICP to "cycles", which are consumed when running applications.
Finally, the NNS subnet public key is considered the public key of the IC. This global, permanent public key makes it possible for users to safely determine the authenticity and integrity of canister messages: The messages are signed by the subnet and the public key of the subnet is certified by the NNS.
A single 48-byte public key is sufficient to verify messages, making trustworthy interactions with any decentralized application on the IC efficient and user-friendly! By comparison, hundreds of gigabytes of data needs to be processed in order to verify the validity of transactions on many other blockchains.
  
