# Defining the parameters (technical preparation)

After some 
[non-technical preparations](../../../tokenomics/sns/not-blind/predeployment-considerations.md),
that define the goals for the SNS, in a next step you can 
choose the initial parameters that the SNS will be launched with, such as who 
will get how many SNS tokens in the beginning.

To understand this better, let’s first understand here how an SNS
with a decentralization sale is launched on a high level and which 
parameters can be set.
We refer to the next pages for learning the detailed actions that are required 
[to test the SNS launch](./local-testing.md) and to 
[initiate an SNS launch in production](./deployment.md).

## Understanding the SNS Launch process

For each SNS, the decentralization sale is realized in a separate _decentralization
sale canister_ that exists during the SNS's launch and is owned by the IC who will
run the sale. In more detail, it is controlled by the NNS root canister.

* The sale canister is set up at start with a defined amount of SNS tokens to be
  distributed publicly.

* During the decentralization sale, participants can send ICP to the sale canister
  to contribute to the dapp’s funding.

* At the sale’s end the collected ICP are “swapped” for the SNS tokens: the
  participants get SNS tokens and the SNS gets the collected ICP. Each user will
  receive their portion of the pool of SNS tokens, pro-rated by their % of the overall
  number of ICP contributed. For example, if the sale canister initially held 1000 SNS
  tokens and 500 ICP tokens were collected during the decentralization sale, then 
  the exchange rate would
  be 2:1 and each participant would get 2 SNS tokens for each ICP token they
  contributed.

Apart from distributing the tokens to many participants, the decentralization sale
achieves that a) a market price for the SNS token is set and b) every sale
participant receives SNS tokens at that price.

An SNS is launched in the following stages.

1) **Choose the initial parameters**: For initializing an SNS for your dapp,
   you first choose the initial parameters of the SNS.
   This includes both initial parameters of the governance and ledger (e.g., token name etc)
   as well as the initial token distribution. 
   You can also define the conditions for the decentralization sale, for example
   how many ICP tokens should at least and at most be collected.
   
2) **Deploy the SNS canisters**: When all parameters are specified, you make a
   call to the SNS wasm modules canister (a canister on the NNS) to deploy an SNS with 
   the specified parameters.
   At this point, the SNS ledger only has two accounts with liquid tokens, the _treasury_
   that is owned by the SNS governance canister and can be used in the future according to the
   SNS community's wishes and some pre-allocated tokens to be used in the initial 
   decentralization sale.
   To ensure that no one can transfer tokens, and distribute them or start token markets
   prematurely, all remaining inital tokens are locked in neurons. 
   Moreover, to ensure that these initial neurons cannot modify the SNS before
   or during the decentralization sale and cannot transfer the treasury tokens,
   the SNS governance is deployed in a _pre-genesis mode_ with limited functionality.

3) **Dapp control handover**: Between the SNS initialization and the start of the 
   decentralization sale, you hand over the control of your dapp to the SNS.
   As there are already initial neurons (from Step 2), the dapp can now be upgraded via
   SNS proposals. The initial neurons cannot do other things, such as changing the SNS
   parameters, as the SNS governance canister is still in pre-genesis mode.

4) **Ask the IC to start the decentralization sale**: The decentralization sale
   is started by an NNS proposal that can be submitted by anyone and is decided on by the
   IC community. This means that effectively you hand over the control of your dapp
   to the SNS and ask the IC to decentralize the SNS in a decentralization sale.
   When voting on a NNS proposal to start a decentralization sale, the NNS neurons can check
   the sale parameters and whether the dapp’s control has been handed over to the SNS.
   The NNS proposal thus also serves as a safeguard where the wisdom of the crowd can
   detect potentially malicious SNSs before they trick users into investing in them.
   If the NNS proposal is adopted, the sale is started. If the NNS proposal is rejected,
   the SNS launch is aborted and the dapp’s control is handed back to you, i.e., to the 
   original developers of the dapp.

5) **Decentralization sale**: When the sale starts, the sale canister holds the number
   of SNS tokens that were specified at initialization (see Step 1). End users can
   participate in the decentralization sale by transferring ICP tokens to the 
   sale canister.

6) **SNS genesis**: When the decentralization sale ends, it is first established whether
   it was successful, e.g., enough ICP have been collected. If the sale was successful,
   the exchange rate is determined and all tokens are given to the sale participants in
   neurons. Once all neurons are created, the SNS is under decentralized control
   and the governance canister is set to be fully functional.
   If the sale is not successful, the decentralization attempt failed and everything
   is reverted to the state before the SNS launch, including that the dapp’s control
   is handed back to you (i.e., the original developers of the dapp), and the 
   collected ICP are refunded to the sale participants.

## Setting the SNS parameters

For the sale specifically, you can specify which portion of tokens is allocated
to the original developers of the dapp,
to the decentralization sale, and to a treasury, which is an account that will be owned
by the SNS governance canister and can be spent by the SNS community according to their needs.
Possibly they can also specify a portion of tokens that are allocated to other predefined
parties, for example to “airdrop” some tokens to known dapp users or initial investors.
**TODO: add future sales**