---
Title: Periodic Confirmation of Neuron Followees
Links: 
Forum: https://forum.dfinity.org/t/periodic-confirmation-of-neuron-followees/12109
Proposal: https://dashboard.internetcomputer.org/proposal/55651
is_community: true
---
This roadmap item is based on the community proposal 55651.

Background: Many neuron owners have not configured their neurons to follow another neuron on  governance topics, yet they are receiving voting rewards because of default following that was configured for all neurons on the all topics “catch-all” category. This discrepancy in participation rates is an incentive to submit spam proposals for the purpose of receiving higher voting rewards at the expense of others receiving lower voting rewards. This proposal aims to remove this incentive by establishing a minimum standard for active participation in governance that will strongly motivate all neuron owners to actively configure followees and to periodically confirm their selections.

Proposed change: Require neuron owners to confirm their neuron Followee selections every 6 months. The recommended solution is to create a new button and countdown timer prominently displayed at the top of the Neurons tab in the NNS front end dapp (as well as a manage neuron command) that enables users to easily see how long they have to confirm their followee selections and to easily perform the confirmation. 

Open point: A periodic reconfirmation of neuron following would presumably (at least initially) result in a similar active voting power for other topics as well (out of a total voting power of 410mn). Thus, even if all voters voted, we would have to wait for the end of the voting period which is a show-stopper for urgent updates (e.g. update of subnet). This limitation needs to be mitigated. 
