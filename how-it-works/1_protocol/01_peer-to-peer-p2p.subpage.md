---
title: Peer-to-Peer Layer
abstract: 
shareImage: /img/how-it-works/peer-to-peer-p2p.600.jpg
slug: peer-to-peer-p2p
---

# Peer-to-Peer

The peer-to-peer layer (P2P) of the Internet Computer realizes the reliable and secure communication of *network messages*, also called *artifacts*, between the nodes of a subnet.
Artifacts are the network messages that are to be broadcast in the subnet, such as ingress messages to canister smart contracts submitted by users or protocol-originating messages such as signature shares computed by the consensus layer of subnet nodes.
P2P realizes a peer-to-peer broadcast network that guarantees the secure eventual broadcast delivery of an artifact.
The P2P layer thereby is the communication fabric for the IC protocol stack and is used by the consensus layer, the next layer in the stack above it, to broadcast artifacts to the nodes in the subnet.

## Gossip Protocol

The P2P layer builds upon the basic principle of *gossip*.
Gossip in communication networks works along the same basic principle as gossip among people: A node in the subnet is connected with a subset of the other nodes of the subnet – its *peers*.
Whenever a node receives a message from a peer or creates one itself as part of the IC protocol, it gossips this message to all its peers.
By every node in the network doing exactly this, every artifact *eventually* propagates through the whole subnet.

## Asynchronous Communication Networks

It is important to note that artifacts reach all subnet nodes eventually, that is, no upper bound on when this happens can be given.
This important property of an *asynchronous communication network*, which reflects the real world of networks, is crucial and the IC consensus protocol is built with this assumption.
Clearly, assuming an asynchronous network makes protocols building on top more complex than they would be when assuming a synchronous network.

## Adverts

Ensuring the eventual delivery of broadcasts to all nodes in the subnet is achieved by a node providing a received or protocol-generated message to all its connected peers.
However, doing so in a naïve way by simply forwarding the message to all peers would result in nodes receiving as many copies of the same message as the node has peers, which unnecessarily consumes networking bandwidth for transmitting duplicate messages and reduces the achieveable throughput of the subnet.

This duplication of delivered artifacts in the naïve approach is mitigated by nodes sending *adverts* for artifacts to their peers instead of sending the artifacts themselves.
An advert specifies its corresponding artifact, but is a small message only containing the hash of the artifact to unambiguously refer to it and some additional metadata.
Only adverts for artifacts are sent (pushed) to all its peers by a node.
A node receiving adverts then requests each artifact only once from one of its peers that has advertised the artifact through an advert.
For artifacts that are larger than the advert size, this saves bandwidth on the network connections between the peers – the savings grow with increasing size of the artifacts.

## Prioritization of Artifacts

The P2P layer allows the prioritization of artifacts such that the more crucial artifacts are broadcast throughout the subnet nodes more quickly than the others.
Prioritizing some artifacts over others is important to ensure that the protocol can always make progress and not be starved of network bandwidth for "less important" traffic.
This principle is well known from traditional networking and applies equally well to a blockchain system.

## Sparse Overlay Network Topology

In subnets up to a certain size, it is practical that each node be connected to each other node of the subnet in terms of the peer relationship, i.e., each node having all the other nodes as its peers.
Full connectivity between the nodes trivially solves the problem of nodes being *eclipsed*, i.e., cut off from the broadcast network, by only connecting to compromised nodes.
In large subnets, however, this full connectivity is neither practical nor desirable as it results in too large a number of messages being communicated for a single broadcast of an artifact.

In the future, we will address this challenge by implementing an optimized solution such as an *overlay network* that is more sparse than the fully connected subnet. Broadcast through gossip is implemented in this overlay network instead of the fully connected subnet, thereby leading to a greatly reduced number of messages.
The overlay network is randomly created with properties that ensure, with high probability, that nodes cannot be *eclipsed* by only being connected to adversarial nodes.
The overlay network structure can be recomputed periodically in order to prevent adaptive eclipse attacks where an adversary over time corrupts an increasing number of nodes.

## Implementation Architecture

The P2P layer's implementation architecture uses the concept of *artifact pools* for nodes to keep track of received and to-be-broadcast artifacts.
An artifact pool has a *validated* and an *unvalidated* section, containing artifacts that have been validated by the upper protocol layer of the node or generated on the node, or containing artifacts that are still unvalidated, respectively.
Different pools are used for different kinds of artifacts.
Whenever the P2P layer receives an artifact from another node, it becomes part of an unvalidated pool.
P2P then requests its validation from components in a higher protocol layer, and once validated, the artifact is moved to the validated pool for this kind of artifact.
Artifacts generated by the protocol on the node are immediately placed into a validated pool, as being generated by the protocol locally makes them implicitly validated.

The implementation uses *adverts queues* to track received adverts, a *requested queue* to track which artifacts are currently being downloaded from peers, and a *receive check* that tracks which artifacts have been downloaded already.
Those data structures help realize an efficient advert-based gossip protocol supporting artifact priorities.

Each node maintains multiple parallel open connections to each of its peers to better utilize the available network bandwidth.
Each connection can be throttled to avoid one component at a higher protocol layer monopolizing the nodes's available network bandwidth.

The architecture and implementation of the P2P layer is designed for high throughput and fairness between higher-layer protocol components, e.g., by using parallel data streams between peers to download artifacts, bandwidth management for connections, and prioritization to favour more important artifacts over less important ones.
Good througput is valued higher than low latency, as it is crucial for obtaining a system that will be able to rival public cloud in the future.

## Go Even Deeper

https://medium.com/dfinity/secure-scalability-the-internet-computers-peer-to-peer-layer-6662d451f2cc

[![Watch youtube video](https://i.ytimg.com/vi/HOQb0lKIy9I/maxresdefault.jpg)](https://www.youtube.com/watch?v=HOQb0lKIy9I)
