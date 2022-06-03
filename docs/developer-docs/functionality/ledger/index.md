# The ICP Ledger


The Internet Computer Protocol (ICP) implements management of its utility token (ticker "ICP") using a specialized canister, called the **ledger canister**. There is a single ledger canister which runs alongside other canisters on a special subnet of the Internet Computer - the NNS subnet. The ledger canister is a smart contract that holds **accounts** and **transactions**. These transactions either **mint ICP tokens** for accounts, **transfer ICP tokens** from one account to another, or **burn ICP tokens**, eliminating them from existence, e.g. while converting ICP tokens to cycles. The ledger canister maintains a traceable history of all transactions starting from its genesis state (initial state). 

This section is structured as follows:

- This page provides an introduction to the basics of ICP and the ledger. For a more detailed exposition of the complete public interface of the ledger canister head over to the [specification](/docs/current/references/ledger) in the [references section](/docs/current/references/).
- [Interact with the ICP ledger](interact-with-ledger.md) provides hands on tutorials to interact with the ICP ledger from the command line, agents and from canisters.
- [Ledger Local Setup](./ledger-local-setup.md) walks you through the steps to deploy a ledger canister to your local replica for development.
- [Deploy New Token](./deploy-new-token.md) explains how you can create your own token by deploying a custom ledger canister and make it available to exchanges via the [Rosetta API](../rosetta/).

## The Basics

### Accounts

An account belongs to and is controlled by the account owner who must be an Internet Computer (IC) principal. No account can be owned by two or more IC principals (no "joint accounts"). However, since a principal can refer to an external user as well as to a canister, joint accounts can be implemented as canisters.

An account owner may control more than one account. In this case, each account corresponds to a pair (account_owner, sub_account). The sub-account is an optional bitstring which helps distinguish between the different sub-accounts of the same owner.

An account on the ledger is identified by its address, which is derived from the principal ID and sub-account identifier.

In this context, you can think of principal identifiers as a rough equivalent to the hash of a user’s public key for Bitcoin or Ethereum. You use the corresponding secret key to sign messages and therefore authenticate to the ledger canister and operate on the principal’s account. Canisters can also have accounts in the ledger canister, in which case the address is derived from the canister’s principal.

The ledger canister is initialized using administrative operations that are internal to the Internet Computer. As part of the initialization process, the canister is created with the set of accounts and associated ICP token balances.

:::note Why does the ledger use Account IDs and not just Principal IDs?

The main reason for introducing accounts was to allow a principal to control multiple accounts. While this could be abstracted away for a user by a the wallet software, this is not possible for canisters.
:::

### Transaction types

There are three operations that can change the internal state of the ledger canister:

-   **Minting ICP tokens** for accounts.

-   **Transferring ICP tokens** between accounts.

-   **Burning ICP tokens**.

All operations are recorded as transactions in the ledger canister.

The ledger maintains the transactions as a hashed blockchain, i.e., a blockchain running inside a cansiter smart contract (the ledger canister), which in turn is running on the NNS subnet blockchain.

As state changes are recorded, each new transaction is placed in a block and assigned a unique index. The entire chain is regularly authenticated by signing the latest chain link. The signature used to authenticate the chain can be verified by any third party who has access to the root public key of the Internet Computer. Specific transactions can be retrieved by querying the ledger.


### Basic properties for ICP utility tokens

The ICP token is similar to utility tokens governing decentralized networks such as Bitcoin, but also differs in important ways.

The ICP token is similar to Bitcoin in the following ways:

-   Each ICP token is divisible 10^8 times.

-   All transactions are stored in the ledger starting with the genesis initial state.

-   Tokens are entirely fungible.

-   Account identifiers are 32 bytes and are roughly the equivalent of the hash of a public key, optionally together with some additional sub-account specifier.

The ICP token differs from Bitcoin in the following ways:

-   Rather than using proof of work, staked participant nodes use a variant of threshold BLS signatures to agree on a valid state of the chain.

-   Any transaction can store an 8-byte memo — this memo field is used by the Rosetta API to store the nonce that distinguishes between transactions. However, other uses for the field are possible.
