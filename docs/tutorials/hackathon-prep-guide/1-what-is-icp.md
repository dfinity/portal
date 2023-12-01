# 1: What is the Internet Computer?

## Vision of the Internet Computer Protocol

The Internet Computer Protocol is a transparent and secure blockchain network that enables developers to create and deploy fully decentralized applications. Decentralized applications are created through deploying smart contracts, which are known as canisters on ICP. Each canister is hosted on an independent blockchain network running on nodes called a subnet.

The Internet Computer's vision is to create a blockchain so powerful, it plays the role of Cloud 3.0. ICP extends the public internet with serverless cloud functionality. 

Developers can build almost anything using advanced smart contract software without using traditional IC infrastructure. Users can interact with decentralized applications without needing a crypto wallet, and smart contracts are scalable to directly serve user experiences. 

You can learn more about the ICP vision in the [ICP deck](https://deck.internetcomputer.org/). 

## Architecture of the Internet Computer Protocol

ICP's architecture is has four layers:

1. [Peer-to-peer.](https://internetcomputer.org/how-it-works/peer-to-peer-p2p/)
2. [Consensus.](https://internetcomputer.org/how-it-works/consensus/)
3. [Message routing.](https://internetcomputer.org/how-it-works/message-routing/)
4. [Execution.](https://internetcomputer.org/how-it-works/execution-layer/)

### Subnets

An subnet is a collection of nodes that run their own instance of the Internet Computer Protocol's consensus algorithm, essentially running their own blockchain. Each subnet consists of node machines, or nodes, which are used to host canister smart contracts. Each canister's code, along with it's state and computation, is replicated across every node on the subnet.

Subnets are designed to be highly scalable and host canister smart contracts efficiently. Each subnet operates concurrently with and independently of the other subnets, but can communicate asynchronously with other subnets. Multiple independent subnets run in parallel, allowing the Internet Computer to break through the single-machine barrier that limits traditional blockchains.

### Deterministic decentralization

The term deterministic decentralization refers to a concept used to maximize the decentralization and diversity of each subnet on ICP. Deterministic decentralization measures and maximizes the decentralization of every layer of the ICP infrastructure by maximizing the number of different node providers, data centers, geographies, and jurisdictions. The purpose of deterministic decentralization is to ensure that the network remains diverse and decentralized.

You can read more about deterministic decentralization on the [Internet Computer wiki.](https://wiki.internetcomputer.org/wiki/Deterministic_Decentralization#firstHeading)

### Chain-key cryptography

A core component of ICP is the protocol's advanced cryptographic mechanisms, which are collectively referred to as chain-key cryptography. Chain-key cryptographic methods provide the ability for ICP to achieve functionalities and scalability that other networks can't. 

Chain-key cryptography uses a threshold signature schemes, which uses a secret signing key in a threshold signature scheme that is distributed across all replicas in a subnet. 

Chain-key cryptography enables the following functionalities:

- Content received from the Internet Computer can be verified through validating a signature, without needing to sync the entire network. 

- New subnets and nodes can be added to the network autonomously. Faulty nodes can be recovered autonomously as well.

- Pseudo-randomness through chain-key cryptography can be used by canisters that require randomness. 

- Transactions that are targeted at other blockchain networks can be computed fully on-chain, allowing for integrations with chains such as Bitcoin and Ethereum. 

To learn more about chain-key cryptography, check out [this documentation.](/how-it-works/chain-key-technology/)


## ICP superpowers

### Seamless user onboarding

Users can be onboarded into the ICP ecosystem seamlessly through dozens of different educational resources in all different formats, lengths, and focuses. Seamless onboarding helps developers get started building on ICP quickly, and provide resources for connecting with other developers to ask questions or help others. Onboarding also helps facilitate widespread adoption and advocation for ICP. A few onboarding resources include:

- [ICP.Hubs](https://internetcomputer.org/community): Local communities dedicated to promoting adoption and awareness of ICP through education, strategic partnerships, and project acceleration. You can learn more about ICP.Hubs [here]. 

- [ICP.Labs](https://dfinity.org/icplab): An advanced, tailored program provided by the DFINITY Foundation that's dedicated to onboarding teams and individuals onto ICP. 

- [Developer Journey tutorial series](/docs/current/tutorials/developer-journey/).

- [Developer Journey video series](https://www.youtube.com/watch?v=3WpP8ux1zX0).

- [ICP Zero to Dapp workshop series](https://www.youtube.com/watch?v=P3ngpMedCTE).

- [Motoko Bootcamp](https://www.motokobootcamp.com/).

- [ICP on Youtube](https://www.youtube.com/dfinity). 

- [ICP Hackathons](https://dfinity.org/events-and-news/).

- [ICP Community Discord](https://discord.gg/jnjVVQaE2C).

- [DFINITY community forum](https://forum.dfinity.org/)

- [ICP Crash course video](https://www.youtube.com/watch?v=Zmm-oo3ibPA&t=3411s).


### Unbounded scalability

ICP is able to scale infinitely, meaning there is no limit to the amount of canisters it can host, memory it can store, or transactions it can process. This unbounded scalability is achieved through horizontal scaling, where new subnets can be added at any time, without a limit on the maximum number of subnets that can exist. 

Infinite scalability is especially beneficial for hosting large scale projects or applications in a fully decentralized manner. You can learn more in the documentation [here](how-it-works/scalability/#infinite-scalability).

### Cross-chain interoperability 

ICP is able to directly integrate with other blockchain networks without using bridges through the ICP's advanced cryptography. Through threshold ECDSA, coupled with chain-key cryptography, ICP can natively create signed transactions on other blockchains like Ethereum and Bitcoin. This allows for dapps deployed on ICP to interact directly with other networks and their smart contracts, tokens, and other digital assets. 

ICP is integrated with the Bitcoin network using chain-key ECDSA signatures and a protocol-level integration, allowing for a canister to create a Bitcoin address, then send or receive bitcoin directly ias if they were a regular Bitcoin user. ICP will also use chain-key ECDSA to facilitate an upcoming integration with Ethereum that will allow Ethereum smart contracts and digital assets like ERC-20 tokens to be used in ICP canisters. 

Using Bitcoin or Ethereum through ICP is faster, cheaper, and more performant than using the other networks directly. You can learn more about cross-chain integrations, such as the Bitcoin integration, in the documentation [here](https://internetcomputer.org/bitcoin-integration/).


### Future-proof

ICP is designed with features that strive to make it future-proof. Some key components of ICP's future-proof capabilities include:

- Decentralization: ICP aims to be owned and operated by as many independent entities in as many geographic locations as possible. Decentralization contributes to the goals of future-proofing as it reduces the risk of a single point of failure within the network. 

- Scalability: Through ICP's subnet architecture that enables unbounded scalability, 100% on-chain Web3 services are made possible. Scalability helps future-proof ICP as it helps increase adoption, demand, and usage.

- Governance: ICP is governed by an advanced decentralized autonomous organization (DAO) known as the Network Nervous System (NNS), which provides the ICP community with direct control over the governance of the network. Upgrades made to ICP are executed through proposals that are approved by the NNS without requiring the network to fork. This form of governance makes ICP future-proof as it provides the ability for the network to adapt and change to fit the needs of the ICP community. 

- Interoperability: Through chain-key cryptography, ICP is able to directly interact with other blockchains without using bridges. This interoperability contributes to ICP's ability to adapt and change in the blockchain ecosystem. 

## Canisters smart contracts

The term canister refers to a smart contract on ICP that is a computational unit that bundles together both smart contract code and state. Canister smart contracts can define functions that can be called by external services or other canisters. Canisters communicate with one another through asynchronous messages. Each message is executed in isolation, allowing for increased levels of concurrent execution.

Canister code can be written in any language that can be compiled into a Wasm module. Currently, Motoko and Rust are supported and maintained by DFINITY through the [IC SDK](/docs/developer-docs/setup/install/index.mdx), and there are several community-developed canister development kits such as Python and Typescript.

A canister is managed by a controller, which can be a centralized entity, a decentralized entity such as a DAO, or a canister can have no controller at all, which would make it an immutable smart contract. Controllers are the only ones that can deploy the canister to the IC, start or stop their execution, and push updated code to the canister.

You can learn more about canister smart contracts in [this documentation.](https://internetcomputer.org/how-it-works/canister-lifecycle/)

### Capabilities

Canister smart contracts can be used for almost any workflow, use-case, or project. A few possible ways to use canisters include:

- Hosting web servers and scripts.

- Hosting databases.

- Hosting server operating systems.

- Hosting distributed code.

- Virtualization.

- Hosting application servers.

- Connect Web2 services to Web3 without using oracles.

- Hosting failover and backups.

- Hosting websites, portfolios, and other digital assets.

- Creating virtual games.

- Creating marketplaces.

- Creating digital exchanges. 

- Hosting social media applications.

- Hosting live auctions.

- Cross-chain infrastructure. 

Want some inspiration? Check out the [Awesome ICP repo](https://github.com/dfinity/awesome-internet-computer) to see some projects in the ecosystem.


### Cycles

Controllers are also responsible for assuring that a canister contains sufficient **cycles** to pay for the canister's resources, which include network bandwidth, memory, and computational power. Each execution performed by a canister deployed on the mainnet has a cost of cycles.

Cycles are used to pay for the resources, such as memory, storage, and compute power, that are used by a canister using the Internet Computer Protocol's reverse gas model. When a canister is deployed on the mainnet, cycles are 'charged' for every action that a canister performs.

To obtain cycles, the Internet Computer Protocol's utility token, ICP, can be converted into cycles and transferred into a canister to be used to pay for that canister's consumed resources. Cycles have a fixed price in [XDR](https://internetcomputer.org/docs/current/references/glossary#xdr) in order to make canister costs predictable and independent of the price of ICP. One trillion cycles always correspond to one XDR.

### Languages 

To develop a canister smart contract, many developers use the IC SDK, which natively supports Motoko and Rust. However, canister smart contracts can be deployed in any language if the code has been compiled into WebAssembly (Wasm) modules using a canister development kit (CDK). A CDK is an adapter used by the IC SDK that provides programming languages with the necessary tools and features required to create and manage canisters. There are several community contributed CDKs for languages such as Python and TypeScript.

It is possible to create a dapp that uses multiple canister smart contracts written in different languages. Canisters written in different languages use Candid, an interface description language (IDL) to share and exchange information. 

Languages that can be used to develop on ICP currently include:

- **Motoko**: Designed by DFINITY specifically for ICP canister development. It supports ICP's unique features and workflows while providing a robust yet familiar programming environment. Motoko is easy to learn and use for application development. It is similar to languages such as JavaScript, Ruby, Python, or Solidity. 

- **Rust**: Supported on ICP through the IC SDK and the DFINITY Rust CDK. The IC SDK automatically comes with the Rust CDK as part of the software, but the Rust CDK can be installed separately.  

- **Candid**: Candid is an interface description language used to describe the public interface of a service. In reference to ICP, a service is a program deployed in the form of a canister. Candid is language-agnostic, which allows for interoperability between frontends and services that are written in different languages. 

- **Python**: Python is a popular language for web development, AI functions, and data analysis. Python is available through the [Kybra CDK](https://demergent-labs.github.io/kybra) developed by [Demergent Labs](https://github.com/demergent-labs). 

- **TypeScript**: TypeScript is available through the [Azle CDK](https://demergent-labs.github.io/azle) developed by [Demergent Labs](https://github.com/demergent-labs).

- **Solidity**: Solidity is an object-oriented language used for writing and implementing smart contracts on blockchain platforms, such as the Ethereum network. Solidity is supported on the IC through [Bitfinity](https://docs.bitfinity.network/), developed by the [Bitfinity EVM team](https://bitfinity.network/). 

- **C++**: C++ is available through the [icpp-pro CDK](https://docs.icpp.world/) developed by icpp World.

## Next steps

- [2: Deploying your first fullstack dapp](./2-deploying-first-fullstack-dapp.md).


