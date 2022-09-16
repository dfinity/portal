# Community fund

The Community fund (CF) facilitates investments by the community in the Internet Computer (IC) ecosystem. In this article, we explain how the process of the Community fund (CF) works.

## Background and motivation

* The success of the IC is dependent on the services built on the IC. Similar to Ethereum, we envisage that, in the long run, the value of services built on the IC will collectively be worth more than the IC itself.
* The CF introduces the concept of an NNS controlled treasury. The goals of this treasury are to aid the bootstrapping of the SNS DAO ecosystem, and later be able to re-invest in the continued growth of the ecosystem. The NNS will be the decision maker in choosing where its treasury or CF resources are to be invested. The NNS treasury can be extended in the future to support additional community-developed governance and fundraising frameworks (i.e. opportunities from these frameworks will also be featured in the Launchpad).
* To allow the CF to create this treasury CF neurons, i.e. NNS neurons flagged as CF, will expose their maturity to the risks the CF fund is taking when investing. Maturity of CF neurons will be reduced when the CF decides to make investments. At a later date CF neurons whose maturity was reduced will be rewarded with maturity increases, dependent on the success of the investments the CF has made.
* Involving the maturity of CF neurons instead of their stake in ICP minimizes the impact on the overall ICP tokenomics.
* Please note that anyone can also directly invest ICP tokens in an SNS via the decentralization sale.

## Community fund process

The community fund (CF) process can be split into five phases: (1) joining the CF, (2) making an investment decision, (3) CF participating in the decentralization sale receiving SNS neurons, (4) participation in SNS governance, and (5) increasing maturity when SNS neurons dissolve. In the following we describe these five phases in more detail.

![](../_attachments/community_fund_flow.png)

### (1) Joining and leaving the CF

* Using a tick-box in the NNS front-end dapp, a neuron can join and leave the CF at any time, also while there are proposals with ongoing voting periods.
* CF neurons will expose their maturity to the risks the CF fund is taking when investing, as described in the following steps.

### (2) Voting on investments

* The CF investment proposal is part of the proposal to decentralize an SNS. It is essentially a statement “Start the SNS and invest X ICP from the CF in the SNS decentralization sale”.
* As a consequence, all NNS neurons will vote on both the creation of an SNS for a dapp and on whether the CF invests in that dapp.
* If CF neurons opt out of the CF whilst an SNS proposal is open for voting, then the ICP amount the CF was proposed to make is reduced proportionally.
* If neurons opt in when an SNS proposal is open for voting, the ICP amount the CF invests in an SNS remains the same, but each CF neuron will participate with less maturity (proportionally decreased).

### (3) CF participating in the decentralization sale

* If a proposal to create an SNS is adopted, the decentralization sale, where initial tokens of the SNS are sold, starts. The CF participates in the decentralization sale.
* The maturity of CF neurons is reduced pro rata by an amount related to X as defined in the proposal.
* If the decentralization sale is successful, the NNS mints X ICP as specified in the proposal.
  * The SNS treasury receives the X ICP.
  * The NNS CF treasury receives SNS neurons corresponding to X ICP. This is provided as a basket of neurons with various dissolve delays for each participating CF neuron.
* If the decentralization sale is not successful, the maturity of CF neurons is increased again by the amount it was decreased by earlier.

### (4) Participation in SNS governance

* Participation in voting on the SNS proposals is passed through to the CF neurons via hotkeys on the SNS neurons owned by the NNS. This means, that CF neurons are owned by NNS but permission is given to the principals that exposed maturity to CF neurons to vote on SNS proposals.
* The voting power of the SNS neurons is proportional to the amount of maturity exposed.

### (5) Increasing maturity of CF neurons

* The NNS CF treasury holds SNS neurons & tokens in its treasury, to be dissolved and sold at its discretion.
* When a set of neurons from a decentralization sale of an SNS dissolves, the NNS determines the value of the dissolved SNS neurons. In the first stage, this is done by a proposal. In a later stage this could be done by pulling data from a DEX.
* The maturity of CF neurons whose maturity was reduced when an investment in a SNS-controlled dapp was made is increased by the amount determined by the NNS in the previous step. In the worst case this amount could also be zero.
* The NNS can sell the tokens from an SNS at a later point in time with the goal to maximize the sale price. After the NNS sells tokens from an SNS, the received ICP will be burned.
