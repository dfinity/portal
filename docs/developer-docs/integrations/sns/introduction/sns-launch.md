---
sidebar_position: 3
---
# SNS launch

## Overview
The SNS launch not only creates the SNS, but one of its main purposes is to
decentralize the control of an SNS and thereby of the dapp that the SNS governs.

To achieve this, new tokens must be distributed to a large community to ensure
proper decentralization of the voting power. There are of course many ways to do so.

The SNS provides one simple way to achieve this: a developer can hand over their dapp
to the NNS and ask it to create an SNS and start a decentralization swap for it.
The decentralization swap collects ICP from participants and distributes the voting
power of the SNS among participants by swapping the ICP for (staked) SNS tokens.

The decentralization swap is a key concept explained in more detail below. Refer to
[this section](../launching/launch-summary-1proposal.md) for the detailed, technical stages of an SNS launch.

## Decentralization swap

The launch of each SNS includes a separate **decentralization swap canister** that
is owned and run by the IC.
In more detail, it is controlled by the NNS root canister.

* The swap canister is set up at the start with a defined amount of SNS tokens to be
  distributed publicly.

* During the decentralization swap, participants can send ICP to the swap canister
  to contribute to the dapp’s funding.

* At the swap's end the collected ICP are “swapped” for the SNS tokens; the
  participants get staked SNS tokens in the form of SNS neurons and the SNS gets the
  collected ICP in an SNS controlled treasury. Each swap participant will receive their portion of the pool of SNS tokens, pro-rated by their share of the overall number of ICP contributed.
  For example, if the swap canister initially held 1000 SNS tokens and 500 ICP tokens
  were collected during the decentralization swap, then the exchange rate would be 2:1
  and each participant would get 2 SNS tokens for each ICP token they contributed.

After a successful decentralization swap, SNS tokens are owned and the SNS is governed
by a large community.
The ICP that were collected are in an SNS-owned treasury.
