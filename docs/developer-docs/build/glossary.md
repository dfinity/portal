# Glossary

actor  
An actor is a special kind of object in modern programming languages that processes messages in an isolated state, enabling them to be handled remotely and asynchronously.

<!-- -->

Canister smart contract  
Canister smart contracts, sometimes also simply called canisters, are an extended form of smart contracts. They are revolutionary because they can be run in parallel deterministically. This is enabled by relying on the actor model and deterministic message passing. A canister has a universally-unique identifier and an owner that defines the boundaries of a specific dapp. A canister encapsulates all of the programming logic, public entry methods, the interface description for the provided message types, and state information for the dapp it describes.

<!-- -->

principal  
A principal is an entity that can be authenticated by the Internet Computer blockchain. Principals that interact with the Internet Computer blockchain often do so via an identity. For example, the first time you use the SDK, the `dfx` command-line tool creates a `default` developer identity for you with a public/private key pair in a PEM file. This developer identity determines a **principal**. There is a textual representation of the principal which is often referred to as your **principal identifier**. Note that the developer identity can also be used to derive an **account identifier**—similar to a Bitcoin or Ethereum address—to hold ICP tokens on the identity’s behalf in the ledger canister.

<!-- -->

controller  
A controller is a principal that has special rights to manage the canister it controls. For example, only a controlling principal can be used to install, upgrade, or delete the canister under its control. You can specify the controller principal using the textual representation of a principal—often referred to as the principal identifier—associated with a user or with a canister.

<!-- -->

ledger  
The Internet Computer blockchain records all transactions involving ICP tokens in a specialized management canister, called the **ledger canister**. The ledger canister implements a smart contract that maintains **accounts** and **balances** and keeps a history of the **transactions** that affect accounts and balances. The transactions are recorded to track the following specific events:

-   **Mint ICP tokens** for accounts.

-   **Transfer ICP tokens** from one account to another.

-   **Burn ICP tokens** to eliminate them from existence.

<!-- -->

wallet  
A wallet is a specialized dapp (implemented as a canister) that allows to store and manage cycles. Cycles are used to pay for computation and resource consumption on the Internet Computer blockchain. Cycles can be obtained by conversion from the Internet Computer blockchain’s native utility token ICP.

<!-- -->

node  
A physical or virtual machine that hosts all the hardware, replica software, and configuration settings required to participate in the Internet Computer blockchain.

<!-- -->

replica  
In the context of the Internet Computer blockchain, a replica refers to the Internet Computer protocol processes running on a node.

<!-- -->

WebAssembly  
[WebAssembly](https://webassembly.org/) (`Wasm`) is a low-level computer instruction format. Because WebAssembly defines a portable, open-standard, binary format that abstracts cleanly over most modern computer hardware, it is broadly supported for programs that run on the internet. Dapps written in Motoko are compiled to WebAssembly code for execution on the Internet Computer blockchain.
