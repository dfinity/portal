---
title: Internet Computer Consensus
abstract: 
shareImage: /img/how-it-works/consensus.600.jpg
slug: consensus
---

# Consensus

Each subnet of the IC is its own blockchain that makes progress concurrently to the other subnets and thus runs its own instance of the IC core protocol stack including consensus. We next go deeper into the IC consensus protocol. Recall that the goal of consensus is to produce blocks agreed by the nodes of the subnet with messages to be executed. This is crucial so that the upper two layers of the protocol stack – message routing and execution – get the same input in every round.

A consensus round has the following three phases:
* Block making: creating and proposing a block containing a list of messages to be executed
* Notarization: attesting to the validity of a block
* Finalization: cryptographically determining that a block is finalized

## Block Making

Ingress messages that are submitted from outside the IC are broadcast via the peer-to-peer layer and Xnet messages sent to the subnet from other subnets are pulled from the sending subnets.
A *block maker*, i.e., a node that is supposed to create the block for the current round, is determined using a cryptographic protocol explained below.
The determined block maker assembles a block from (a subset of) the ingress messages it has received and (a subset of) the Xnet messages sent to this subnet.
The block is then broadcast to all nodes of the subnet using P2P.

If the network is unreliable or the chosen block maker corrupted or other things are going wrong with producing, broadcasting, and notarizing the proposed block, other nodes should get the opportunity to act as block makers and propose a block, so that eventually a block will be successfully proposed and notarized.
The block makers for a round are chosen through a random permutation of the nodes of the subnet based on randomness derived from the *random beacon*.
The random beacon is a random value computed as a unique BLS threshold signature over the random beacon of the previous round.
That is, a qualifying set of nodes compute and broadcast a signature share and, irrespective of which nodes do so, the combined shares result in the same threshold signature value as long as a qualifying quorum provides their shares.
The permutation defines an unpredictable and unbiasable ranking of block makers for the round, ranging from the rank-$0$ to the rank-$(n-1)$ block maker, where $n$ is the number of nodes in the subnet.
The highest priority (rank-$0$) block maker first proposes a block in a round.
If this block does not get fully notarized within a given time period, the next-lower-priority (rank-$1$) block maker takes an attempt at producing a block.
This process continues with increasing-rank block makers until all nodes for the round are exhausted to attempt to produce a block.
In the scenario where the subnet works without problems, the rank-$0$ block maker's block is the only block proposed and getting notarized in the round.

## Notarization

If a node receives a block broadcast by a block maker for the round, it validates the block for syntactic correctness and validity of the signatures of the messages contained in the block.
A valid block is *notarized* by a node by it issuing a notarization share on the block and broadcasting the notarization share to the subnet.
A notarization share is a signature share computed with a BLS multi-signature scheme.
If at least two thirds of the nodes of the subnet notarize a given block by computing and broadcasting a notarization signature share, the block becomes *fully notarized*, meaning that it is endorsed by a qualifying quorum of the subnet's nodes to be a correct block following the rules of the IC protocol and thus a candidate block for the current round.
In case that the block from the rank-$0$ block maker cannot be fully notarized with a given time window, the rank-$1$ block maker will produce a block and also this block will be notarized by nodes.

Nodes notary-sign blocks as long as they have not yet seen a fully-notarized block for this round.
Once a node observes a fully notarized block for a round, it stops notarizing other blocks as then it is ensured by the P2P layer that eventually every node will receive this block and its notarization signature shares so that each of the nodes will be able to observe the full notarization of the block.

If all goes well in a round, the block proposed by the first (the rank-$0$) block maker is fully notarized and no other block is even proposed by higher-rank block maker.
This is the case that consumes the least subnet resources.
However, if things go wrong, e.g., network communication gets delayed or interrupted and the proposed block or notarization shares do not reach sufficiently many of the nodes in time, or the proposed block is invalid, further blocks may need to be proposed and notarized to finally get a fully-notarized block for this round.
In this case, the resource consumption and time to create the block increases as multiple block proposals are created, broadcast, and notarized by nodes.
The IC protocol ensures that the subnet performance degrades gracefully with increasing faults in the subnet communication or of nodes.

Figure
Block making and notarization in a round

## Finalization

Given the above scheme that allows up to all the nodes to create and propose a block for a given round if things go wrong, more than one block can become fully notarized in a round.
That means that we need an additional mechanism for determining finality, i.e., which of the fully-notarized blocks of the round should be the one that is the chosen (finalized) block for the round which can be provided to the upper layers of the protocol stack to be executed.

It is not realistic to assume a synchronous communication model in practice, which means that we cannot assume to be able to deduce finality by waiting for a certain time and then conclude that no further notarization shares can be received.
We must work under the assumption of an asynchronous communication model where network messages may be arbitrarily delayed, but will eventually reach all nodes of a subnet.
This model reflects reality of communication networks, but also makes it much harder to determine finality.

The option of choosing "probabilistic finality," similar to what is done in Bitcoin-like protocols, by considering a block final once a sufficient number of blocks build on top of it in the blockchain is not acceptable for two reaons: (1) Probabilistic finality is a weak notion of finality and (2) probabilistic finality would increase the time to finality drastically.

Considering these not-acceptable approaches to finality, we decided to apply a cryptographic protocol for determining finality.
This protocol uses, like the notarization protocol, BLS multi signatures to determine finality:
A node that observes a fully notarized block issues a finalization share on the block and broadcasts it to the nodes of the subnet.
It only does so if it has not notary signed another block in this round.
The latter condition guarantees that if there is a block that receives finality shares from at least two thirds of the nodes, then there can only be one such block.
(Note that on the IC we have the assumption that less than one third of the nodes are compromised.)
That is, if there is a finalized block in a given round, then this is a proof that this block is the only finalized block in this round.
This way, we can achieve, using a cryptographic protocol, almost instant finalization that can be observed by all nodes on the subnet.

## Why is this Cool?

The above explanation shows how the IC consensus protocol has the following desirable properties:
* It is resource efficient in that it preserves resources by only creating and endorsing a minimum number of block proposals.
If things go wrong on the subnet due to network problems or attacks or compromised nodes, then the resource consumption increases gracefully, leading to a graceful degradation of throughput and increase of latency.
Importantly, the subnet still makes progress under such adversarial conditions and does not come to a halt.
* The protocol has instant cryptographic finalization in the asynchronous communication model.
This is crucial for achieving low latency of the consensus protocol.
It is important to note that we only assume an asynchronous communication model, which reflects reality of communication networks.
* The protocol processes both ingress messages from users and Xnet messages received from other subnets.
The latter enables secure messaging between subnets, which is a crucial feature that allows the IC to scale essentially without limits.

[Achieving Consensus on the Internet Computer](https://medium.com/dfinity/achieving-consensus-on-the-internet-computer-ee9fbfbafcbc)

[Consensus White Paper](https://eprint.iacr.org/2021/632.pdf)

[Extended Abstract published at PODC'22](//assets.ctfassets.net/ywqk17d3hsnp/1Gutwfrd1lMgiUBJZGCdUG/d3ea7730aba0a4b793741681463239f5/podc-2022-cr.pdf)

<!-- https://img.youtube.com/vi/vVLRRYh3JYo/0.jpg -->
[![Watch youtube video](https://i.ytimg.com/vi/vVLRRYh3JYo/maxresdefault.jpg)](https://www.youtube.com/watch?v=vVLRRYh3JYo)
