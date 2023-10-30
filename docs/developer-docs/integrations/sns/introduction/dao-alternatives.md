---
sidebar_position: 4
---
# Alternatives how to get and maintain a DAO

## Overview

SNSs are system-provided DAOs on the Internet Computer.
There are of course also other alternatives to getting a DAO.

These possibilities allow communities to choose between using DAOs that are provided
as a service by the IC, where maintenance is as automated as possible, and DAOs
that have full flexibility of how they can evolve.


## Self-deploy the SNS code
  A developer or a community can choose to self-deploy a DAO by reusing the publicly
  available [open source code](https://github.com/dfinity/ic/tree/master/rs/sns).
They can deploy this code on a normal application subnet and manually upgrade it.
  They can then choose to follow the same SNS versions than
  system-provided SNSs follow or they can choose to deviate from this path.
  In this option, the DAO community has to be more active in
  implementing, testing and approving code versions. In exchange, they have more flexbility.
One advantage of the system-provided SNSs over this option is that the verification of the code is
easier as all SNSs on the SNS subnet run the same cansiter versions that are verified by the
  NNS community.

## Build your own DAO / use other DAO frameworks
  While this is conceptually similar to the above option, it is important to emphasize
  that there are of course other designs than what the SNS code implements
  that also realize a DAO.
  For most of these, the implications for the communities will be similar: The DAO
  communities will have to maintain the DAO versions or trust
  a third party to do so.
