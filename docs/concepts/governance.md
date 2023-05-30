# Neurons and governance

## Overview 
As a decentralized blockchain, all changes to the configuration and behavior of the Internet Computer are controlled by a governance body called the Network Nervous System (NNS). The NNS controls many aspects of the Internet Computer blockchain including the following:

-   Which data center providers participate in the network.

-   The number, location, and ownership of the nodes accepted from a data center provider.

-   Assignment of nodes to subnet blockchains.

-   Whether upgrades to canisters or to a new protocol version are allowed or not.

In addition, only members of the governance body can vote to adopt or reject requests to upgrade Internet Computer replicas or modify the Internet Computer protocol.

## Voting rights for stakeholders

Because tokens on the Internet Computer are generally liquid, they do not represent a stable enough commitment on the part of their holders for them to be used for governance purposes. To provide the stability required for responsible governance, tokens can be converted to **neurons**. A neuron represents a number of ICP tokens that cannot be exchanged for a minimum period of time (the lock-up period).

When a person or organization has some number of ICP tokens locked up in a neuron, the neuron holder has the right to vote on proposals, and to be paid for voting in proportion to the number of ICP locked up, the length of the lock-up period and the relative number of votes cast.

The Internet Computer blockchain tracks the number of ICP tokens that are locked up in neurons and provides the logic necessary for voting in conjunction with managing ICP token account balances.
