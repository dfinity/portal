# Preparing and SNS launch
## Overview
Launching an SNS entails many non-technical and technical preparations steps.

[The SNS launch checklist](sns-checklist.md) summarizes some of the most important preparation
steps to be considered before handing over a dapp to an SNS.

The subsequent pages provide more details on some of these preparations:
* Before diving into the technical details, you may want to spend some time defining
non-technical goals of the SNS and the dapp that will be controlled by it.
To provide some tips on what considerations you should not forget,
we list a few of them on
[this page](predeployment-considerations.md).

* The SNS parameters allow each SNS to define unique settings for tokenomics and how the 
governance should work in detail.
To choose initial parameters, it is advisable to understand how the 
[SNS tokenomics](tokenomics-intro.md) and the [SNS rewards](rewards.md) work.
These pages also include a link to additional [tools](https://wiki.internetcomputer.org/wiki/How-To:_SNS_tokenomics_configuration)
that allow you to try out different configurations and assess them.
  
* In the end, the chosen configurations need to be translated to the parameters and 
[given as input to the SNS launch process](preparation.md).


In addition, during the preparation phase you might want to prepare the [integration of the SNS
with your dapp](../integrating/index.md).
Moreover, you should [test](../testing/testing-before-launch.md) your settings and confirm
that the launched SNS will work successfully with your dapp.
Integration and testing are topics that are not only relevant during the SNS launch but also
later in the SNS lifecycle. 
Therefore, these two topics are discussed in separate sections below
(see [SNS integration](../integrating/index.md) and [SNS testing](../testing/testing-before-launch.md)).
