# 0.2: Internet Computer terminology 

## Overview

This page introduces some of the most commonly used terminology that developers should be aware of when building on the Internet Computer. This page covers many terms, but does not include every single term that is related to the Internet Computer. For the full glossary of terms, please see [here.](/docs/references/glossary.md)

## Concepts 

- **Actor:** An actor is a process with an encapsulated state that communicates with other actors that are concurrently running. Actors communicate through asynchronous messages that are received sequentially. Actors can modify their own private state, but can only alter other actors indirectly through messages.  Actors are a part of the actor model, which is used by canisters for concurrent and asynchronous computation. 

- **Agent:** An agent is a library used to make calls to the Internet Computer public interface. Examples of external agents include the JavaScript and Rust agents. 

- **Certified variables:** A certified variable is a piece of data that a canister stores in the subnet's canonical state during the processing of an update or inter-canister call. This data is used when a query call is made, so that the canister can return a certificate to the user to prove the data's value. 

- **Chain-key cryptography:** Chain-key cryptography is an array of advanced cryptographic mechanisms which allow the IC to achieve scalability and functionalities that aren't possible on other blockchain networks. These cryptographic protocols help orchestrate the nodes that make up the IC. One example of chain-key cryptography is the IC's single public key, which allows any device to verify the authenticity of artifacts from the IC. 

- **Cycles**: A cycle in regards to the IC is a unit of measurement used for resources consumed by a canister. These resources include compute processing power, memory, storage, and network bandwidth. Cycles are consumed for every execution performed by a canister that has been deployed on the mainnet. The IC's utility token ICP can be converted into cycles and transferred into a canister to be used to pay for that canister's consumed resources. ICP can be converted to cycles using the current price of ICP measured in [XDR](https://internetcomputer.org/docs/current/references/glossary#xdr), where one trillion cycles corresponds to one XDR. XDR is the currency code for special drawing rights (SDR), which are supplementary foreign exchange assets defined and maintained by the International Monetary Fund (IMF).

- **Decentralized application (dapp):** A decentralized application (dapp) refers to a canister or several interoperable canisters that provide a program or service that has been deployed on the Internet Computer. 

- **Decentralized autonomous organization (DAO):** A decentralized autonomous organization (DAO) is a form of governance where there is no centralized form of authority. Decisions are made by stakeholders, usually determined by staking the DAO's token, through voting on decisions proposed to the DAO. All DAO activity is executed on-chain, providing a transparent and verifiable record of activity. 

- **Execution:** Execution in reference to the IC refers to the execution layer, which is responsible for executing canister smart contract code. Execution is done using WebAssembly (Wasm). 

- **ICP:** ICP is the native utility token of the Internet Computer. ICP can be used to participate in the network's governance through token staking, or it can be converted into cycles which can be used to pay for a canister's resource consumption. 

- **Principal:** A principal in regards to the IC is an entity that can be authenticated by the IC. 

- **Proposal:** A proposal is a statement that describes a suggested modification to an aspect of the IC or any of its subsystems. Proposals can be submitted for consideration from the IC community by eligible neuron owners. Once a proposal has been submitted, it undergoes a voting process that determines if the proposed modification will be adopted or rejected. 

- **Messages:** A message in regards to the IC is data sent from one canister to another canister, or data sent from a user to a canister. 

- **Replica:** On the Internet Computer, the replica is the collection of protocol components necessary for a node to participate in a subnet. 

- **Subnet:** On the Internet Computer, a subnet is a collection of nodes that operate an independent instance of the blockchain network by running their own implementation of the consensus algorithm. Subnets interact with other subnets through chain-key cryptography. 

- **Transaction:** A transaction refers to the ledger process of transferring ICP from one account to another. A transaction can be a regular transfer transaction, a minting transaction, or a burning transaction. 


## Canister terminology

- **Smart contracts:** Smart contracts are stateful programs that are designed to automatically execute, control, or document events and actions according to the configuration of the contract. On the Internet Computer, smart contracts are deployed in the form of a canister, which bundles together data and code. 

- **Canister:** A canister is a type of smart contract computational unit that bundle together both code and state. When developing a dapp on the IC, canister files are the primary place that code development happens. Canister types are split into three categories; backend canisters, frontend canisters, and custom canisters.

- **Canister account:** A canister account is a ledger account owned by a canister. 

- **Canister development kit (CDK):** A canister development kit (CDK) is an adapter used by the Internet Computer SDK that provides a programming language with the functionality and features necessary to create and manage canisters.

- **Canister identifier:** The canister identifier (ID) is a globally-unique identifier for a canister that can be used to interact with it.

- **Canister state:** A canister state refers to the entire state of a canister at any given point in time. The state is divided into two portions: the system state and the user state. The system state contains the auxiliary state maintained by the IC on behalf of the canister and contains information such as the balance of cycles, input and output queues, compute allocation, and other metadata. The user state contains a WebAssembly module instance. A canister interacts with its canister state either through the system API such as when sending messages, or implicitly such as when consuming cycles for execution. 

- **Controller:** A controller on the IC refers to the controller of an individual canister. A controller can be a person, organization (such as a DAO), or another canister that has administrative rights over a canister. Controllers are identified by their principal. Controllers are capable of functions such as upgrading the canister or deleting the canister. 

- **Identity:** In regards to canisters, an identity is a principal value used for access control of canisters. Identities can be set as controllers of canisters and can have cycles wallets associated with them. 

- **Query:** A query is a method used to execute operations on a canister. Queries are performed synchronously and are made to any node that hosts the canister. Consensus is not required to verify the result of the query. 

- **State change:** A state change refers to the result of any operation, function call, or transaction that changes the information stored within a canister. A simple example would be a function that makes an update call that removes a value from a list. The result of this function is a change to the canister's state. 

- **System canister:** System canisters are pre-installed canisters that perform specific tasks that are used to help maintain the Internet Computer. 

- **Wallet:** In regards to canisters, a wallet refers to the cycles wallet for a canister. The cycles wallet contains the cycles used to pay for the canister's resource consumption. 

## Tools and products 

- **dfx:** `dfx` is the primary tool used for creating, managing, and deploying canisters on the Internet Computer. `dfx` is a component of the IC SDK. 

- **Internet Identity:** Internet Identity is the Internet Computer's native authentication system. 

- **Ledger:** In reference to the IC, the ledger canister is a system canister used to store accounts and their corresponding transactions. 

- **Motoko:** Motoko is a programming language developed and designed for programming on the Internet Computer. It was designed specifically to support the IC's unique features and attributes, such as the actor model and smart contract compilation to WebAssembly. 

## Next steps

- [0.3: Developer environment setup](03-dev-env.md).
