---
sidebar_position: 2
---
# SNS architecture

## Overview
The core architecture of the SNS closely resembles the architecture of the Network Nervous System
(NNS), the DAO that governs the Internet Computer.
It includes a governance canister that enables decentralized decision making and a ledger canister
that defines a token unique to each SNS.
In contrast to the SNS, the NNS contains additional canisters that are important to run the IC
platform (e.g., the cycles minting canister that is responsible for creating cycles, the registry
that stores the network topology etc.).
There are also a few canisters that only exist on the SNS, most notably the decentralization 
swap canister that is used during the launch process of an SNS.

## SNS as a system functionality (connection to the NNS community)
SNSs are provided as a system functionality by the IC in that the code for the SNS canisters
is maintained by the IC. ([Here](dao-alternatives.md)
is a brief description of alternative ways to use the SNS code or how to create a DAO.)
More concretely, this means that the NNS community approved the original SNS canisters' code
and continuously approves new improved SNS versions.

### SNS wasm modules canister (SNS-W){#SNS-W}
All approved SNS canister versions are stored on an NNS canister,
called the **SNS wasm modules canister (SNS-W)**.
When an SNS is created, SNS-W is involved and responsible for deploying the latest version of 
the SNS canister.
When the SNS should be updated, this happens by an NNS proposal that adds a new version of the 
SNS canisters to SNS-W.
Each SNS community can then simply decide - by SNS proposal - to adopt these new, approved versions in their SNS instance.

### Customizability
Individual SNSs can nevertheless be customized by choosing parameters, 
called nervous system parameters, that
can be configured to realise different forms of voting and tokenomics.

## The SNS subnet
SNSs are hosted on an _SNS subnet_. Since this subnet exclusively hosts SNSs,
this simplifies the verification for end users: users can simply verify that an SNS is running
on the SNS subnet and infer that the underlying code has been approved by the NNS community as
explained in the previous paragraph.

## SNS canisters
The SNS consists of the following canisters:
* The governance canister.
* The ledger canister and archive canisters.
* The index canister.
* The root canister.
* The decentralization swap canister.

### SNS governance canisters
The **governance canister** defines who can participate in governance decisions and automatically triggers the execution of these decisions.
It stores **proposals** that are suggestions on how to
evolve the dapp that the SNS governs and **neurons** that define who the governance participants are. Neurons facilitate stake-based voting as they contain staked SNS tokens.
Anyone can be a participant in governance by staking SNS tokens in a neuron.
When a proposal is adopted, the governance system automatically and autonomously triggers the execution of the proposal in the form calling a defined method. In most cases, these decisions are therefore executed fully on chain.

### SNS ledger canister with archive and index
The **ledger canister** implements the
[ICRC-1 standard](https://github.com/dfinity/ICRC-1)
and contains a unique token that is different for each SNS. We call this _kind_ of tokens **SNS tokens**.
In each SNS, this SNS's ledger stores which accounts own how many SNS tokens and
the history of transactions between them.
To keep the full ledger history even though a canister has limited
memory, the ledger canister spawns **archive canisters** that store the ledger block history.
Moreover, wallets and other frontends will need to show all transactions that are
relevant for a given account.
To facilitate this and ensure that not every frontend has to implement this themselves,
the **index canister** provides a map of which transactions are relevant for a given account.

### SNS root canister
The **root canister** is responsible for upgrading the other SNS canisters
and the dapp canisters that the SNS governs.

### SNS (decentralization) swap canister
The **decentralization swap canister**, or swap canister for short, is the main canister involved
in the SNS launch. Users can provide ICP tokens to the swap and, if the swap is successful, they get staked SNS tokens (in SNS neurons) in return. 
Hence, the ICP and the SNS tokens are "swapped".
This facilitates that 1) the SNS can collect initial funding and
2) the distribution of neurons and thus of voting power to many different participants, which makes the governance decentralized.

