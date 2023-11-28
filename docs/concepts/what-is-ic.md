# What is the Internet Computer?

The **Internet Computer** is a blockchain that enables developers, organizations, and entrepreneurs to build and deploy secure, autonomous, and tamper-proof **[canisters](/how-it-works/canister-lifecycle/)**, an evolution of **smart contracts**.

As a dapp developer, you might find it useful to think of the Internet Computer as providing the following key features:

-   A **globally-accessible, public blockchain** for running smart contracts at web speed, that can serve interactive web content to users. You can read more about the architecture of the IC [here](/how-it-works/architecture-of-the-internet-computer/). 

-   A secure cryptographic protocol (**[Internet Computer protocol](/how-it-works/core-ic-protocol-overview/)**) run by nodes machines operated by independent node providers in independent data centers all over the world. This guarantees the secure execution of smart contracts. 

-   A **network of independent blockchains**, known as [subnets](./nodes-subnets.md), connected using [chain-key cryptography](/how-it-works/#Chain-key-cryptography) that can [scale out](/how-it-works/scalability/) its capacity as required.

## An open blockchain

The Internet Computer is a blockchain hosted on node machines operated by independent parties and located in geographically distributed data centers. The nodes run the [Internet Computer protocol](/how-it-works/core-ic-protocol-overview/), an advanced cryptographic fault-tolerant protocol which ensures that smart contracts running on the blockchain cannot be tampered with or stopped. The Internet Computer is composed of individual subnet blockchains running in parallel and connected using [chain-key cryptography](/how-it-works/#Chain-key-cryptography). This means that canisters running on a subnet can seamlessly call canisters hosted in any other subnet of the Internet Computer blockchain.

Another important feature of the Internet Computer is that it runs under the control of a decentralized, permissionless governance system, called **[Network Nervous System](/how-it-works/#Network-nervous-system)** (NNS), which runs completely on-chain. The NNS can make decisions on several topics, including scaling out the Internet Computer by creating new subnet blockchains, updating the node machines, and configuring parameters used in the Internet Computer protocol. Anyone can participate in the governance and submit new proposals to the NNS or vote on open proposals. To do so, users have to stake ICP, the Internet Computer utility token, and [create a **neuron** with the NNS](/docs/current/tokenomics/token-holders/nns-app-quickstart).

## Building the next generation of software and services

The Internet Computer protocol reduces platform-based risks and paves the way for innovation by re-imagining how software is built, deployed, and accessed.

For example, with the Internet Computer, developers can focus on writing code using canisters without environment-related distractions such as:

-   Physical or virtual network configuration requirements.

-   Load balancing services.

-   Firewalls, network topology, or port management.

-   Database configuration and maintenance.

-   Storage volumes and devices.

By enabling developers to focus on building applications and delivering value, the Internet Computer helps simplify the development process, reduce time to market, and foster innovation.

For end-users, the Internet Computer provides a secure environment for accessing dapps with fewer risks. Because of the inherent security of the blockchain, programs running on the Internet Computer cannot be hijacked by malicious code, which also reduces the total cost of ownership for both application end-users or organizations.

In addition, because dapps can be "autonomous" and public, developers can write services that communicate with each other and share functions in ways that increase productivity and efficiency while leaving room to innovate and improve projects with confidence.

The Internet Computer also enables developers to use [cryptographically-secure identities](/how-it-works/web-authentication-identity/) to enforce access controls, reducing the need to rely on usernames and passwords or external identity management plug-ins.

## Learn more 

- [Architecture of the Internet Computer](/how-it-works/architecture-of-the-internet-computer/).

- [The Internet Computer Protocol](/how-it-works/core-ic-protocol-overview/).

- [Peer-to-peer layer](/how-it-works/peer-to-peer-p2p/).

- [Consensus layer](/how-it-works/consensus/).

- [Message routing layer](/how-it-works/message-routing/).

- [Execution layer](/how-it-works/execution-layer/).

- [Chain-key cryptography](/how-it-works/chain-key-technology/).

- [Chain-key tokens](/how-it-works/chain-key-tokens/).

- [The Network Nervous System](https://internetcomputer.org/nns/).

- [Service Nervous Systems](https://internetcomputer.org/sns/).

- [Canisters](/how-it-works/canister-lifecycle/).

- [Internet Identity](/how-it-works/web-authentication-identity/).

## Get started developing on the IC

- Get started developing on the IC by embarking on your [developer journey](/docs/current/tutorials/developer-journey).

- [Designing a dapp](/docs/current/developer-docs/backend/design-dapps).

- [Building backend canisters with Motoko](/docs/current/developer-docs/backend/motoko/).

- [Building backend canisters with Rust](/docs/current/developer-docs/backend/rust/).

## Connect with the IC community

- [Developer Discord community](https://discord.com/invite/cA7y6ezyE2), which is a large chatroom for IC developers to ask questions, get help, or chat with other developers asynchronously via text chat. 

- [Developer journey forum discussion](https://forum.dfinity.org/t/developer-journey-feedback-and-discussion/23893).

- [Developer tooling working group](https://www.google.com/calendar/event?eid=MHY0cjBubmlnYXY1cTkzZzVzcmozb3ZjZm5fMjAyMzEwMDVUMTcwMDAwWiBjX2Nnb2VxOTE3cnBlYXA3dnNlM2lzMWhsMzEwQGc&ctz=Europe/Zurich).

- [Motoko bootcamp](https://github.com/motoko-bootcamp/bootcamp-2022), a week-long crash course to learning all things Motoko. 

- [Motoko developer working group](https://www.google.com/calendar/event?eid=ZWVnb2luaHU0ZjduMTNpZHI3MWJkcWVwNWdfMjAyMzEwMTJUMTUwMDAwWiBjX2Nnb2VxOTE3cnBlYXA3dnNlM2lzMWhsMzEwQGc&ctz=Europe/Zurich).

- [Upcoming events and conferences](https://dfinity.org/events-and-news/).

- [Upcoming hackathons](https://dfinity.org/hackathons/).

- [Weekly developer office hours](https://discord.gg/4a7SZzRk?event=1164114241893187655) to ask questions, get clarification, and chat with other developers live via voice chat. This is hosted on our [developer Discord](https://discord.com/invite/cA7y6ezyE2) group.

