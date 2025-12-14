---
title: Don’t trust, verify — New node metrics on the Internet Computer
description: With the release of new metrics, node performance is fully transparent and verifiable.
tags: [Technology]
author: DFINITY
image: /img/blog/node-metrics.webp
---

# Don’t trust, verify — New node metrics on the Internet Computer

![Don’t trust, verify — New node metrics on the Internet Computer](/img/blog/node-metrics.webp)

*This article was originally published on the [DFINITY Medium blog](https://medium.com/dfinity/dont-trust-verify-new-node-metrics-on-the-internet-computer-367cc154a572)*

## Background

[The Internet Computer protocol](https://internetcomputer.org/) coordinates the creation and interaction of subnet blockchains created by standardized node machines run by independent owners and installed within independent data centers around the globe to ensure decentralization. Compared to other blockchains, the Internet Computer has stronger requirements on the performance and availability of the nodes. This is due to the fact that most of the node resources are dedicated to [performing useful work](https://learn.internetcomputer.org/hc/en-us/articles/34207558615956-Consensus) such as executing smart contracts and participating in threshold cryptography — tasks that needs to be performed by all nodes of a given subnet blockchain, and at a much lower replication factor than other blockchains, for energy and cost efficiency.

The Internet Computer is designed in a way that allows anyone to become a [node provider (NP)](https://internetcomputer.org/node-providers). In a decentralized manner, each node provider is verified and voted in by token holders via the [Network Nervous System (NNS)](https://learn.internetcomputer.org/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System), the DAO that governs the Internet Computer. The NNS acts as a decentralized algorithmic authority that oversees the network’s operations and evolution, including scaling the Internet Computer’s capacity by adding more nodes. In this regard, it makes sense to be able to measure node contributions and allow their providers to diagnose node problems efficiently. With trustworthy node metrics, the [node provider remuneration model](https://wiki.internetcomputer.org/wiki/Node_Provider_Remuneration) can be adjusted to reward precise node contributions, rather than a fixed monthly sum to cover hardware and operational costs.

## Trustworthy metrics

So far, the health of the nodes has been measured by collecting and analyzing logs and metrics on infrastructure external to the Internet Computer. When deviating from expected indicator values, the respective node providers and data centers are currently responsible for fixing the situation. But this is not exactly *trustless*. In the past few months, the Internet Computer protocol has been improved with the changes outlined below to allow some monitoring of tasks to be carried out by the nodes of the network themselves in a fully automated, trustless fashion. It is now possible for any party to collect information on the health of any node and its contributions without additional trust assumptions, purely by interacting with the Internet Computer itself.

While users normally need to process all blocks to infer this information on other blockchains, users on the Internet Computer can rely on chain-key technology and threshold-signing to retrieve node metrics directly.

In the long run, the availability of verifiable node metrics will lead to further refinements and improvements of the node remuneration process, as insights gained through the decentralized monitoring will allow automated adjustments to payments based on the performance of nodes, or rather the lack thereof.

## ICP architecture for trustworthy node metrics

![Node metrics diagram](/img/blog/node-metrics-diagram.webp)

## How consensus has always worked

The job of the [consensus layer](https://learn.internetcomputer.org/hc/en-us/articles/34207558615956-Consensus) of the Internet Computer is to **order inputs to a subnet** so that all nodes in a subnet **process such inputs in the same order**. The Internet Computer consensus protocol achieves this by creating a chain of blocks containing the inputs and handing over the content to the [message routing layer](https://learn.internetcomputer.org/hc/en-us/articles/34208241927316-Message-Routing), which will ensure that the inputs reach their targets. To this end, the consensus protocol relies on an unbiased and unpredictable pseudorandom function to determine which node is supposed to create the next block. If the selected node fails to do so fast enough, the pseudorandom function picks another node to make a block.

## Recent updates
Consensus now provides Message Routing (MR) with information on which nodes succeeded to be the block maker, and which nodes failed to be block makers even though it was their turn.

In turn, the MR layer adds this information into the replicated state, which is threshold-signed by nodes in the subnet to ensure all honest nodes have the same state. The metrics for the number of successfully proposed blocks and failures thereof are accumulated in the replicated state for nodes belonging to the subnet.

For each day over a 60-day period, the state of this accumulation is saved as a snapshot including the last replicated state update just before midnight in a queue of snapshots (in chronologically ascending order). Snapshots in the queue are immutable, meaning the current state is not included.

More functionalities have to be provided to make this useful. More precisely, node providers and members of the ICP community may be interested in different ranges. Hence, there is now functionality to query for a date range returning the difference between the value at the end and the start of the range. Since subnet membership can change over time, a culling mechanism had to be provided. If no changes in stats have been recorded for the node ID in question when a new snapshot is about to be pushed compared to the one preceding it, the node ID is pruned. This must be taken into account also when taking the difference between snapshots for range queries.

To make this available externally, via the [management canister](https://learn.internetcomputer.org/hc/en-us/articles/34210839162004-Canister-Smart-Contracts), a new endpoint `node_metrics_history` was created. It returns data from the snapshots explained above for a given range of dates. More details are described in the [IC Interface Specification](/docs/references/ic-interface-spec#ic-node-metrics-history). Note that this API is considered **EXPERIMENTAL**. In other words, feedback is much appreciated and canister developers must be aware that the API may evolve in a non-backward-compatible way.

Since retrieving the node metrics consumes resources (CPU, memory, bandwidth), the endpoint can only be called by canisters, to prevent abuse. Each request for fetching metrics will be charged for, which makes it harder for malicious users to conduct DOS attacks using this interface.

## Tooling for trustworthy node metrics

A DFINITY R&D team has created [open-source tooling](https://dfinity.github.io/dre/trustworthy-metrics/trustworthy-metrics.html) that allows node providers and any other interested party to fetch metrics from the [management canister(s)](/docs/references/system-canisters/management-canister) of all subnets and inspect them in detail. Moreover, it also provides information about subnet membership changes (e.g, when a node joins a subnet it will not contribute blocks until it has finished state sync). The tooling retrieves the metrics from all subnets in parallel to reduce the amount of time needed to fetch them.

All data is retrieved through update calls in order to prevent a potentially malicious node from providing false data. Typically, it takes under 10 seconds to collect the most recent metrics from all 37 subnets. The metrics can then be stored in a local file in JSON format, and be further analyzed by other tools.

See https://dfinity.github.io/dre/trustworthy-metrics/trustworthy-metrics.html for more information.

## A gateway to more milestones

The ability to obtain trustworthy node metrics enables the next milestone in the transparency and operational efficiency of the Internet Computer. By providing clear insights into node performance, it lays the groundwork for decentralized data-driven decision making, and for future enhancements in node remuneration processes.

## Further reading

- [Fetch trustworthy node metrics](https://dfinity.github.io/dre/trustworthy-metrics/trustworthy-metrics.html).

- [Join the discussion](https://forum.dfinity.org/t/trustworthy-node-metrics-for-useful-work/22989).

- [More about nodes on the Internet Computer](https://internetcomputer.org/node-providers).
