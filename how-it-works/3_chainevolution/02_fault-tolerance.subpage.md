---
title: Fault tolerance
abstract: 
shareImage: /img/how-it-works/state-synchronization.600.jpg
slug: fault-tolerance
---

# Fault tolerance

In today’s world, softwares and networks crash surprising often. This could be because of software bugs, improper error handling, power failure, etc. The Internet Computer is designed to be fault tolerant. In other words, the network will make progress even if some nodes fail or misbehave. 

## Handling Node Failures
The nodes in the Internet Computer are divided into subnets. The nodes in a subnet together maintain a blockchain. In each round, a block is proposed by the consensus layer, and the messages in the block are processed later by the execution layer. The proposed block and the resulting state needs to be signed by at least 2/3rd of the nodes in the subnet in order to make progress. As long as less than 1/3rd of the nodes in a subnet fail or misbehave, the subnet will continue making progress. 

Let us consider a scenario where less than 1/3rd of the nodes in a subnet fail while rest of the subnet continue to make progress. We will now describe how a failed node can recover and catchup with the other well-functioning nodes. We will use the same process when a new node joins the subnet and would like to catchup with the existing nodes. 

Here’s one natural solution. After a failed node restarts or new node joins the network, it could download all the consensus blocks it missed from its peers, and process each block one by one. Unfortunately, new nodes will take a long time to catchup if they have to process all the blocks from the genesis. Another solution is to let the failed/new node to directly sync the latest state from its peers. However, the peers are continuously updating their state as they process blocks. Syncing the latest state while the peers are updating it could lead to inconsistencies. 

Internet Computer follows a mix of both the approaches. The consensus protocol is divided into epochs. Each epoch is a few hundred consensus rounds. At the beginning of each epoch, all the nodes make a backup copy of their blockchain state, and create a “catch up package” (CUP). The CUP at height h contains all relevant information required for consensus to resume from height h. This includes hash of the blockchain state after processing block at height h. The CUP is then signed by at least 2/3rd of the nodes in the subnet. Each well-functioning node then broadcasts the CUP. 

All the nodes in the subnet listen to the CUP messages broadcasted by their peers. Suppose a node observes that a received CUP has a valid signature (signed by at least 2/3 of the nodes in the subnet) and has a different blockchain state hash than the locally available state hash. Then the node initiates a [state sync protocol](https://www.youtube.com/watch?v=WaNJINjGleg) to sync the blockchain state at that height (the height when the CUP is published). The blockchain state is organized as a merkle tree and could be a few hundreds of gigabytes. The syncing node might already have a majority of the blockchain state and need not download everything. Therefore, the syncing node tries to download only the subtrees of the peers’ blockchain state that differ from its local state. The syncing node first requests for the children of root of blockchain state. The syncing node then recursively downloads the subtrees that differ from its local state. 

Note that while the failed/newly joined nodes are syncing the blockchain state, rest of the well-functioning nodes continue to process new blocks and make progress. The well-functioning nodes use their backup copy of the blockchain state (created at the same time as the CUP) to supply the state to syncing nodes. After the syncing node finishes syncing the blockchain state, it will request its peers for the consensus blocks generated in the meantime and process the blocks one by one. Once fully synced, the node can then process messages regularly as other nodes. 

[![Watch youtube video](https://i.ytimg.com/vi/H7HCqonSMFU/maxresdefault.jpg)](https://www.youtube.com/watch?v=H7HCqonSMFU)

[![Watch youtube video](https://i.ytimg.com/vi/WaNJINjGleg/maxresdefault.jpg)](https://www.youtube.com/watch?v=WaNJINjGleg)
