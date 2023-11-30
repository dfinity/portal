# Neurons' fund (NF)

## Background and motivation

The NF introduces the concept of a Network Nervous System (NNS) controlled treasury, designed to support the development of the Service Nervous System (SNS) DAO ecosystem. Decisions on the allocation of NF resources are made by the NNS.

## Neurons' fund components

The NF comprises four main components:
1. **Joining the NF**
2. **NF's participation in decentralization swap**
3. **Participation in SNS governance**
4. **Maturity increase of NF neurons**

### 1: Joining and Leaving the NF

Neurons can join or leave the NF using a checkbox in the NNS front-end application. This action can be taken at any time, even during ongoing voting on SNS proposals. Joining the NF means neurons expose their maturity to the risks associated with participating in SNSes.

### 2: NF's Participation in Decentralization Swaps

If a proposal to create an SNS is adopted, the decentralization swap, where initial tokens of the SNS are sold, starts. 
The extent of the NF's involvement in a specific SNS swap is decided by the Matched Funding scheme. This scheme correlates the fund participation with the level of direct participation. For further information see [here](https://wiki.internetcomputer.org/wiki/Matched_Funding). At the beginning of the swap, NF neurons' maturity is reduced proportionally to the maximum possible NF participation (`M`)

If the decentralization swap is successful, the NNS mints an amount of `X` ICP as determined by the Matched Funding scheme. 
  * The SNS treasury receives `X` ICP.
  * The NNS NF treasury receives SNS neurons corresponding to `X` ICP. This is provided as a basket of neurons with various dissolve delays for each participating NF neuron.
  * If the participation amount `X` is less than `M`, NF neurons' maturity is increased again to compensate.

If the decentralization swap is not successful, the maturity of NF neurons is increased again by the amount it was decreased by earlier.

### 3: Participation in SNS governance

Participation in voting on the SNS proposals is passed through to the NF neurons via hotkeys on the SNS neurons owned by the NNS. This means, that NF neurons are owned by NNS but permission is given to the principals that exposed maturity to NF neurons to vote on SNS proposals.

The voting power of the SNS neurons is proportional to the amount of maturity exposed.

### 4: Increasing maturity of NF neurons

The NNS NF treasury holds SNS neurons & tokens in its treasury, to be dissolved and sold at its discretion.

When a set of neurons from a decentralization swap of an SNS dissolves, the NNS determines the value of the dissolved SNS neurons. In the first stage, this is done by a proposal. In a later stage this could be done by pulling data from a DEX.

The maturity of NF neurons whose maturity was reduced when a participation in a SNS-controlled dapp was made is increased by the amount determined by the NNS in the previous step. In the worst case this amount could also be zero.

The NNS can sell the tokens from an SNS at a later point in time. After the NNS sells tokens from an SNS, the received ICP will be burned.
