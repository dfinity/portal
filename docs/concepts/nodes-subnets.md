# Nodes and Subnet Blockchains

Internet Computer blockchain **subnet blockchains** provide physical hardware and resources—like CPU and memory—for performing software operations. Each subnet is a blockchain that consists of some number of decentralized, independently owned and controlled machines—connected peer computers called **nodes**—that run the software components of the Internet Computer blockchain protocol.

The Internet Computer blockchain software components that run on each node are called a **replica** because they replicate state and computation across all of the nodes in a subnet blockchain.

## Replica Architecture

The core components of a replica are organized into the following logical layers:

-   A **peer-to-peer** (P2P) networking layer that collects and advertises messages from users, from other nodes in its subnet blockchain, and from other subnet blockchains. Messages received by the peer-to-peer layer are replicated to all of the nodes in the subnet to ensure the security, reliability, and resiliency.

-   A **consensus** layer that selects and sequences messages received from users and from different subnets to create blockchain blocks that can be notarized and finalized by Byzantine Fault Tolerant Consensus forming the evolving blockchain. These finalized blocks are delivered to the message routing layer.

-   A **message routing** layer that routes user- and system-generated messages between subnets, manages the input and output queues for dapps, and schedules messages for execution.

-   An **execution environment** that calculates the deterministic computation involved in executing a smart contract by processes the messages it receives from the message routing layer.

The following diagram provides a simplified overview of the Internet Computer blockchain protocol components deployed as a local canister execution environment in a development environment.

![Internet Computer components in a developer’s environment](_attachments/SDK-protocol-local-overview.svg)

As a developer, it isn’t necessary to know the details about how your dapps and user interactions with your dapps are routed through the Internet Computer blockchain architecture or replicated on the blockchain network. However, a general understanding of the key components can be useful because the development environment includes the replica components to provide an execution environment for deployment and a realistic sense of the workflow for a production deployment.

## Subnet Blockchains

A so-called **subnet** is a collection of replicas that run a separate instance of the consensus mechanism in order to create their own blockchain on which a set of canisters can run. Each subnet can communicate with other subnets and is controlled by the **root subnet**, which uses [chain key](../references/glossary.md#chain-key) cryptography to delegate its authority to the various subnets.

The Internet Computer uses subnets to allow it to scale indefinitely. The problem with traditional blockchains (and individual subnets) is that they are limited by the computing power of a single node machine, because every node has to run everything that happens on the blockchain to participate in the [consensus](../references/glossary.md#consensus) algorithm. Running multiple independent subnets in parallel allows the Internet Computer to break through this single-machine barrier.

Because not every canister has the same security,  size, or feature requirements, not every subnet has the same configuration. The `system` subnet (which contains the [NNS](../references/glossary.md#network-nervous-system-nns) and a bunch of other critical services), for example, does not charge any cycles for its canisters, because those canisters should be available in all circumstances. Other subnets can, for example, have different features enabled or disabled (such as the Bitcoin integration.

At the time of writing, there are two main subnet types: `system` and `application`. Almost all canisters run on application subnets. In comparison with the `application` subnet, the `system` subnet has the following characteristics:
- No cycles accounting takes place
- More generous per-call instruction limit
- More generous wasm module size limit
