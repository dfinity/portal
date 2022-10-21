---
title: Peer-to-Peer Layer
abstract: 
shareImage: /img/how-it-works/peer-to-peer-p2p.600.jpg
slug: peer-to-peer-p2p
---

# Peer-to-Peer Layer

The peer-to-peer layer (P2P) of the Internet Computer realizes the reliable and secure communication of *messages*, also called *artifacts*, between the nodes of a subnet. Artifacts are the messages that are to be broadcast in the subnet, such as ingress messages submitted by users or protocol-originated messages such as signature shares computed by the consensus layer of subnet nodes. P2P realizes a peer-to-peer broadcast network that guarantees the secure eventual broadcast delivery of an artifact. It thereby is the communication fabric for the IC protocol stack and is used by the consensus layer, the next layer in the stack above it, to have messages broadcast in the subnet.

## Gossip Protocol

The P2P layer builds on the principle of *gossip*, that operates along the same basic principles as gossip among people: A node in the subnet is connected with a subset of the other nodes of the subnet – we call those connected nodes the *peers* of the node. Whenever a node has received a message from a peer or created one itself as part of the protocol, it provides this message to all its peers.

## Adverts

Guaranteeing the eventual delivery of broadcasts to all nodes in the subnet is achieved by a node providing a received or generated message to all its connected peers. However, doing so in a naïve way by simply forwarding the message to all peers would result in nodes receiving as many copies of the same message as they have peers, which unnecessarily consumes networking bandwidth and reduces the achieveable throughput of the subnet.

This duplication of delivered artifacts in the naïve approach is mitigated by nodes sending *adverts* for artifacts to their peers instead of sending the artifacts themselves. An advert specifies its corresponding artifact, but is a small message only containing the hash of the artifact to uniquely refer to it and some additional metadata. Only adverts for artifacts are sent (pushed) to peers by a node. A node then requests each artifact only once from one of its peers that have advertised the artifact through an advert. For artifacts that are larger than the advert size, this saves bandwidth on the network connections between the peers – the larger the artifacts are, the more bandwidth is saved with the advert-based approach.

## Overlay Network Topology

In subnets up to a certain size, it is practical that each node be connected to each other node of the subnet, i.e., having all the other nodes as peers. In very large subnets, this full connectivity is not practical as it would result in too large a number of messages being communicated for a single broadcast of an artifact.

In the future, we address this challenge by implementing an overlay network that is more sparse than the fully connected subnet. Broadcasts through gossip is implemented in this overlay network instead of the fully connected subnet, thereby leading to a greatly reduced number of messages. The overlay network is randomly created with properties that ensure with high probability that nodes cannot be *eclipsed* by only being connected to adversarial nodes. The overlay network structure is recomputed periodically in order to prevent adaptive eclipse attacks where an adversary over time corrupts an increasing number of nodes.

[![Watch youtube video](https://i.ytimg.com/vi/HOQb0lKIy9I/maxresdefault.jpg)](https://www.youtube.com/watch?v=HOQb0lKIy9I)

https://medium.com/dfinity/secure-scalability-the-internet-computers-peer-to-peer-layer-6662d451f2cc
