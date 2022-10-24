---
title: Internet Computer Consensus
abstract: 
shareImage: /img/how-it-works/consensus.600.jpg
slug: consensus
---

# Consensus

Each subnet of the IC is its own blockchain that makes progress concurrently to the other subnets and thus runs its own instance of the IC core protocol stack including consensus.
Recall that the goal of consensus is to produce blocks agreed by the nodes of the subnet with an ordered set of messages to be executed.
This is crucial so that the upper two layers of the protocol stack – message routing and execution – receive the same inputs in every round on each node.

The IC's consensus protocol is a novel protocol that achieves a high throughput both in terms of messages and message payload as well as a short time to finality.
Block finality on the IC is cryptographic and thus can have very short latency.

Consensus proceeds in discrete rounds.
At a high level, a consensus round has the following three phases:
* *Block making:* Creating and proposing a block containing a list of messages to be executed. In every round at least one node proposes a block, ideally exactly one node, but, if required, multiple nodes.
Block proposals are broadcast to all nodes in the subnet.
* *Notarization:* Attesting to the validity of a block. For a block to become the block chosen in a given round, it needs to be notarized by at least two thirds of the nodes.
A node notarizing a block means that it finds the block to be well formed and valid and a potential candidate for the chosen block of the round.
* *Finalization:* Cryptographically determining that a block is finalized. As multiple blocks may get notarized in a round, it is not immediately clear, which of those should be the block chosen for the round.
The finalization protocol helps resolve this.
Whenever there is exactly one fully-notarized block in a given round, the finalization protocol cryptographically ensures that every node can observe this block to be the block chosen for the round.
If there are multiple, there is no finalization in this round, but one block becomes finalized through a future round with a single block.

Let us next look at the different phases of a consensus round in more detail.

## Block Making and Block Maker Selection

In every round, a subnet needs to generate a *consensus block*, or *block*.
A block contains a list of ingress messages and xnet messages.
Ingress messages that are submitted from outside the IC to nodes of the subet are broadcast via the peer-to-peer layer to all nodes of the subnet.
A *block maker*, i.e., a node that is supposed to create the block for the current round, is determined using a cryptographic mechanism called *random beacon* explained below.
The determined block maker assembles a block from (a subset of) the ingress messages submitted directly to the node or received from other nodes through broadcast and xnet messages sent to this subnet from other subnets.
Xnet messages are pulled from the respective sending subnets by the block maker.
A block, once assembled, is then broadcast to all nodes of the subnet using P2P as a block proposal for the current round.

If the network is unreliable or the chosen block maker corrupted or other things are going wrong with producing, broadcasting, and notarizing the proposed block, the first proposed block may not get notarized within a reasonable timeframe or not at all.
Thus, other nodes also need to get the opportunity to act as block makers and propose a block, so that eventually a block for the round will be successfully proposed and notarized.
The block makers for a round are chosen through a random permutation of the nodes of the subnet based on randomness derived from the *random beacon*.
The random beacon is a random value computed as a unique BLS threshold signature over the random beacon value of the previous round:
A qualifying set of nodes compute and broadcast (using P2P) a BLS threshold signature share on the previous random beacon and, irrespective of which subset of shares are combined, the combined shares result in the same threshold signature value as long as a qualifying quorum has provided their shares.
A random permutation is computed using the random beacon as randomness and defines an unpredictable and unbiasable ranking of block makers for the round, ranging from the rank-$0$ to the rank-$(n-1)$ block maker, where $n$ is the number of nodes in the subnet.
The highest priority (rank-$0$) block maker is the first one to propose a block in this round.
If this block does not get fully notarized within a given time period, the next-lower-priority (rank-$1$) block maker takes an attempt at producing a block.
This process continues with increasing-rank block makers until all nodes for the round are exhausted to attempt to produce a block.
Eventually, the subnet will be able to generate a block if every node has had the opportunity to propose one.
In the scenario where the subnet works without problems, the rank-$0$ block maker's block is the only block proposed and getting notarized in the round.
This is the best case and leads to the lowest latency and highest througput in the subnet.

## Notarization

If a node receives a block broadcast by a block maker for the round, it validates the block for syntactic correctness and validity of the signatures of the messages contained in the block.
A node *notarizes* a valid block by issuing a notarization signature share (notarization share) on the block and broadcasting the notarization share to the subnet.
A notarization share is a signature share computed with a BLS multi-signature scheme.
If at least two thirds of the nodes of the subnet notarize a given block by computing and broadcasting a notarization signature share, the block becomes *fully notarized*, meaning that it is endorsed by a qualifying quorum of the subnet's nodes to be a correct block following the rules of the IC protocol and thus a candidate block for the current round.
In case that the block from the rank-$0$ block maker cannot be fully notarized with a given time window, the rank-$1$ block maker will produce a block and also this block will be notarized by nodes, as outlined above.

Nodes notary-sign blocks as long as they have not yet seen a fully-notarized block for this round.
Once a node observes a fully notarized block for a round, it stops notarizing other blocks as then it is ensured by the P2P layer that eventually every node will receive this block and its notarization signature shares so that each of the nodes will be able to observe the full notarization of the block.

If all goes well in a round, the block proposed by the first (the rank-$0$) block maker becomes fully notarized and no other block is even proposed by higher-rank block makers.
This is the case when the consensus protocol consumes the least subnet resources.
However, if things go wrong, e.g., network communication gets delayed or interrupted and the proposed block or notarization shares do not reach sufficiently many of the nodes in time, or the proposed block is invalid, further blocks may need to be proposed and notarized to finally get a fully-notarized block for this round.
In this case, the resource consumption (networking bandwidth, CPU) and time to create the block for the round increases as multiple block proposals are created, broadcast, and notarized by nodes.
The IC protocol ensures that the subnet performance degrades gracefully with increasing faults in the subnet communication or of nodes.

[](/img/how-it-works/consensus_notarization.png)
Notarization of increasing-rank block proposals in a round

## Finalization

Given the scheme that allows up to all the nodes of a subnet to create and propose a block for a given round if things go wrong, more than one block can become fully notarized in a round.
In this case it is not clear, which of the block should be the chosen block for this round.
That means that we need an additional mechanism for determining finality, i.e., which of the possibly multiple fully-notarized blocks of the round should be the one that is the chosen (finalized) block for the round which can be provided to the upper layers of the protocol stack to be executed.

It is not realistic to assume a synchronous communication model in practice, which means that we cannot assume to be able to deduce finality by waiting for a timeout to occur and then conclude that no further notarization shares can be received for proposed blocks.
We must work under the assumption of an asynchronous communication model where network messages may be arbitrarily delayed, but will eventually reach all nodes of a subnet.
This model reflects reality of communication networks, but also makes it much harder to determine finality.

The option of choosing "probabilistic finality," similar to what is done in Bitcoin-like protocols, by considering a block final once a sufficient number of blocks have built on top of it in the blockchain is not acceptable for the IC for two reaons: (1) Probabilistic finality is only a very weak notion of finality and (2) probabilistic finality would increase the time to finality drastically.

Considering these unacceptable approaches to finality, we decided to apply a cryptographic protocol for determining finality.
This protocol uses, like the notarization protocol, BLS multi signatures to determine finality:
A node that observes a fully notarized block issues a finalization share on the block and broadcasts it to the nodes of the subnet, but does so *only if it has not notary signed another block in this round*.
The latter condition guarantees that if there is a block that receives finality shares from at least two thirds of the nodes, then there can only be one such block.
That is, if there is a fully finalized block in a given round, then this is a proof that this block is the only finalized block in this round.
This can be seen when using the assumption for the IC that less than one third of the nodes are compromised at any time.
This way, we can achieve, using a cryptographic protocol, almost instant finalization that can be observed by all nodes on the subnet by receiving the finalization signature shares.

## Why is this Cool?

The IC consensus protocol obtains a number of desirable properties:
* It is *resource efficient* in that it preserves resources by only creating and endorsing a minimum number of block proposals.
If things go wrong on the subnet due to things like network problems or attacks or compromised nodes, then the resource consumption increases gracefully, leading to a graceful degradation of throughput and increase of latency.
Importantly, the subnet still makes progress under such adversarial conditions and does not grind to a halt.
* The protocol has *instant cryptographic finalization* in the asynchronous communication model.
This is crucial for achieving low latency of the consensus protocol under the real-world network assumption of an asynchronus communication model.
Assuming a synchronous communication model does not work in practice for distributed systems.
* The protocol processes both ingress messages from users and xnet messages received from other subnets.
The latter enables *secure messaging between subnets*, which is a crucial feature that allows the IC to scale essentially without limits.

[Achieving Consensus on the Internet Computer](https://medium.com/dfinity/achieving-consensus-on-the-internet-computer-ee9fbfbafcbc)

[Consensus White Paper](https://eprint.iacr.org/2021/632.pdf)

[Extended Abstract published at PODC'22](//assets.ctfassets.net/ywqk17d3hsnp/1Gutwfrd1lMgiUBJZGCdUG/d3ea7730aba0a4b793741681463239f5/podc-2022-cr.pdf)

<!-- https://img.youtube.com/vi/vVLRRYh3JYo/0.jpg -->
[![Watch youtube video](https://i.ytimg.com/vi/vVLRRYh3JYo/maxresdefault.jpg)](https://www.youtube.com/watch?v=vVLRRYh3JYo)
