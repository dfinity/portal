# 1: What is the Internet Computer?

## Vision of the Internet Computer

The Internet Computer (ICP) is a transparent and secure blockchain network that enables developers to create and deploy fully decentralized applications. Decentralized applications are created through deploying smart contracts, which are known as canisters on ICP. Each canister is hosted on an independent blockchain network running on nodes called a subnet.

The Internet Computer's vision is to create a blockchain so powerful, it plays the role of Cloud 3.0. ICP extends the public internet with serverless cloud functionality. 

Developers can build almost anything using advanced smart contract software without using traditional IC infrastructure. Users can interact with decentralized applications without needing a crypto wallet, and smart contracts are scalable to directly serve user experiences. 

You can learn more about the ICP vision in the [ICP deck](https://deck.internetcomputer.org/). 

## Architecture of the Internet Computer 

The Internet Computer's architecture is has four layers:

1. [Peer-to-peer.](https://internetcomputer.org/how-it-works/peer-to-peer-p2p/)
2. [Consensus.](https://internetcomputer.org/how-it-works/consensus/)
3. [Message routing.](https://internetcomputer.org/how-it-works/message-routing/)
4. [Execution.](https://internetcomputer.org/how-it-works/execution-layer/)

### Subnets

An ICP subnet is a collection of nodes that run their own instance of the ICP consensus algorithm, essentially running their own blockchain. Each subnet consists of node machines, or nodes, which are used to host canister smart contracts. Each canister's code, along with it's state and computation, is replicated across every node on the subnet.

Subnets are designed to be highly scalable and host canister smart contracts efficiently. Each subnet operates concurrently with and independently of the other subnets, but can communicate asynchronously with other subnets. Multiple independent subnets run in parallel, allowing the Internet Computer to break through the single-machine barrier that limits traditional blockchains.

### Deterministic decentralization

The term deterministic decentralization refers to a concept used to maximize the decentralization and diversity of each subnet on ICP. Deterministic decentralization measures and maximizes the decentralization of every layer of the ICP infrastructure by maximizing the number of different node providers, data centers, geographies, and jurisdictions. The purpose of deterministic decentralization is to ensure that the network remains diverse and decentralized.

You can read more about deterministic decentralization on the [Internet Computer Wiki.](https://wiki.internetcomputer.org/wiki/Deterministic_Decentralization#firstHeading)

### Chain-key cryptography

A core component of ICP is the protocol's advanced cryptograhic mechanisms, which are collectively referred to as chain-key cryptography. Chain-key cryptographic methods provide the ability for ICP to achieve functionalities and scalability that other networks can't. 

Chain-key cryptography uses a threshold signature schemes, which uses a secret signing key in a threshold signature scheme that is distributed across all replicas in a subnet. 

Chain-key cryptography
Another core component of the Internet Computer is an array of advanced cryptographic mechanisms, which are collectively referred to as chain-key cryptography. These chain-key cryptographic methods allow the IC to achieve scalability and functionalities that aren't possible on other blockchain networks.

At the core of chain-key cryptography is a threshold signature scheme. A threshold signature scheme is similar to an ordinary digital signature scheme, though the secret signing key in a threshold signature scheme is distributed among all the replicas in a subnet. This provides a layer of security where a key cannot be stolen by compromising one, or even a large portion, of the replicas on the subnet.

Through chain-key cryptography:

Anyone can verify content received by the IC by validating a signature without needing to sync the entire blockchain network.
New subnets and nodes can be added, or faulty nodes can be recovered, autonomously.
Chain-key cryptography provides a source of pseudo-randomness that can be used by canisters for algorithms that require randomness.
Chain-key signatures provide the ability for transactions that are targeted at other blockchain networks to be computed fully on-chain using the IC. This allows for integrations with other blockchains such as Bitcoin and Ethereum.

Want to go further into this topic? Check out this documentation. https://internetcomputer.org/how-it-works/chain-key-technology/


## ICP superpowers

### Seamless user onboarding

### Unbounded scalability

Unbounded scalability, also referred to as infinite scalability, is a feature of the Internet Computer that allows it to scale infinitely. This means that the Internet Computer can host an unlimited number of canisters (smart contracts), store an unlimited amount of memory, and process an unlimited amount of transactions per second.
This is achieved through a process known as horizontal scaling, which involves adding more computers (or nodes) to the system. Unlike vertical scaling, which involves adding more CPU, RAM, and disk to a single computer and has a limit, horizontal scaling can theoretically achieve unlimited scalability.
In the context of the Internet Computer, the nodes are divided into subnets, each containing a few dozen nodes. Each subnet can host thousands of canisters and process messages received by those canisters. As more subnets are added to the Internet Computer, its overall capacity increases proportionately. There is no limit on the number of subnets that can be added, which allows for unbounded scalability.
This feature is particularly beneficial for hosting large scale applications, such as social media platforms, in a fully decentralized way. You can read more about it on the Internet Computer's documentation.

https://internetcomputer.org/how-it-works/scalability/#infinite-scalability


### Cross-chain interoperability 

### Future-proof

## Canisters smart contracts

Smart contracts on the IC are referred to as **canisters**. Canisters are computational units that bundle together both code and state. A canister can define functions that can be called by external services, such as browsers or mobile apps, or that can be called by other canisters.

Canisters are able to communicate with each other through asynchronous messages. The execution of messages is done in isolation, allowing for increased levels of concurrent execution.

Canister code can be written in a number of different languages. Currently, Motoko and Rust are supported and maintained by DFINITY through the [IC SDK](/docs/developer-docs/setup/install/index.mdx), and there are several community-developed SDKs such as Python and Typescript.

A canister is managed by **controllers**. A controller can be a centralized entity, a decentralized entity such as a DAO, or it can have no controller at all, which would make it an immutable smart contract. Controllers are the only ones that can deploy the canister to the IC, start or stop their execution, and push updated code to the canister.



Want to go further into this topic? Check out [this documentation.](https://internetcomputer.org/how-it-works/canister-lifecycle/)

### Capabilities

Canister smart contracts can be used for almost any workflow, use-case, or project. A few possible ways to use canisters include:

- Hosting web servers and scripts.

- Hosting databases.

- Hosting server operating systems.

- Hosting distributed code.

- Virtualization.

- Hosting application servers.

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

cycles are used to measure the resources, such as memory, storage, and compute power, that are used by a canister. When a canister is deployed on the mainnet, cycles are 'charged' for every action that a canister performs.

To obtain cycles, the IC's utility token, ICP, can be converted into cycles and transferred into a canister to be used to pay for that canister's consumed resources. Cycles have a fixed price in [XDR](https://internetcomputer.org/docs/current/references/glossary#xdr) in order to make canister costs predictable and independent of the price of ICP. One trillion cycles always correspond to one XDR.

Since cycles are not a currency and are only used to pay for a canister's consumed resources, developers manage the distribution of cycles through a special canister called a **cycles wallet**. When a canister needs to use the cycles stored in the cycles wallet, the canister's operations are executed using the canister principal of the cycles wallet, rather than your user principal. 


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


