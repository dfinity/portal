# Canisters and code

## Overview

One of the most important principles to keep in mind is that the Internet Computer is a blockchain that allows running software in a distributed, replicated way.

When you write source code for a dapp that runs on the Internet Computer, you compile the source code into a **WebAssembly module**. When you deploy the WebAssembly module that contains your program on the Internet Computer blockchain, the program is executed inside a conceptual computational unit called a **canister**. Canisters can be developed in various programming languages. Besides Motoko, a programming language purposefully designed for the Internet Computer, you can also use existing programming languages like C, Rust, JavaScript/TypeScript, AssemblyScript, and Python. 

Once deployed, end-users can interact with the canister by accessing the entry point functions you have defined for that canister through a frontend client such as a browser.

## Architecture
### Canisters include both program and state

A canister is similar to a container in that both are deployed as a software unit that contains compiled code and dependencies for an application or service.

Containerization allows for applications to be decoupled from the environment, allowing for easy and reliable deployment. The canister differs from a container, however, in that it also stores information about the current software **state**.

While a containerized application might include information about the state of the environment in which the application runs, a canister is able to persist a record of state changes that resulted from its functions being called.

### Query and update methods

This concept of a canister consisting of both program and state is an important one. In particular, it relates to the behavior one should expect when calling an end-point of the canister. There are only two types of calls: 
- Non-committing **query calls** (any state change is discarded).
- Committing **update calls** (state changes are persisted).


| Type      | Key points to remember|
|-----------|-----------------------|
|**Query calls**|**Update calls**   |
|Allow the user to query the current state of a canister or call a function that operates on the canister’s state **without changing it**.|Allow the user to change the state of the canister and have **changes persisted**.|
|Are synchronous and answered immediately.|Are answered asynchronously.|
|Can be made to any node that holds the canister; the result does not go through consensus. That is, there is an inherent tradeoff between security and performance: the reply from a single node is fast, but might be untrustworthy or inaccurate.|Must pass through consensus to return the result. Because consensus is required, changing the state of a canister, and returning the result can take time. There is an inherent tradeoff between security and performance: the result is trustworthy because two-thirds of the replicas in a subnet must agree on the result, but the call is slow.|
|Do not allow changes to the state of the canister to be persisted, so essentially query calls are read-only operations.|The called canister can invoke functions exposed by other canisters|
|Do not allow the called canister to invoke functions exposed by other canisters as inter-canister calls. (Note that this restriction is temporary and that canisters will be able to invoke functions exposed by other canisters when processing query calls in the future.)| |

:::tip
As a developer, it is important to recognize this relationship between the calls that query the canister and the calls that change the canister state. In particular, you should keep in mind the inherent tradeoff between security and performance.
:::

## Certified data

Since query calls do not go through consensus, [certified responses](https://internetcomputer.org/docs/current/developer-docs/security/general-security-best-practices) should be used wherever possible when data only needs to be read, not updated. 

Certification happens on the canister level, i.e. is done by a subnet. Any certified response has to be pre-certified during an update call, so that the certificate can simply be fetched in a query call at a later point in time.

## How to develop dapps for the Internet Computer

For programmers and software developers, the Internet Computer blockchain provides unique capabilities and opportunities within a framework that simplifies how you can design, build, and deploy dapps. A key part of this framework is a new, general purpose programming language, Motoko. Motoko is a programming language that has been specifically designed to take full advantage of the unique features that the Internet Computer blockchain provides, including:

-   The ability to define programs directly using `actor` objects and classes.

-   The use of `async` and `await` syntax to enable programming asynchronous messaging as if it was synchronous processing.

-   Automatic support for message serialization and deserialization.

-   The ability to leverage orthogonal persistence using data structures without external databases or storage volumes.

As a modern, high-level programming language, Motoko provides some key features of its own, including:

-   Support for big integer operations and overflow protection.

-   A sound type system that statically checks each program to ensure it can execute without type errors on all possible inputs.

-   Support for function abstractions, user-defined type definitions, and user-defined actors.

For more detailed information about the Motoko programming language itself, including syntactical conventions and supported features, see the [**Motoko programming language guide**](/motoko/main/about-this-guide.md).

For information about Canister Development Kits (CDKs) supporting other programming languages, see this [**overview**](../developer-docs/backend/choosing-language.md).

The following diagram provides a simplified drill-down view of the development environment as part of the Internet Computer ecosystem.

![Your development environment as part of the Internet Computer ecosystem](_attachments/SDK-protocol-network.svg)

## Canisters, actors, and the code you produce

One of the most important principles to keep in mind when preparing to write programs using the Motoko programming language is that Motoko uses an *actor-based* programming model.

An **actor** is a special kind of object that processes messages in an isolated state, enabling messages to be handled remotely and asynchronously.

In general, each canister includes the compiled code for one actor object. Each canister may also include some additional information such as interface descriptions or frontend assets. You can create projects that include multiple canisters, but each canister can only include one actor.

## Why your code is compiled into WebAssembly

When you compile Motoko code, the result is a WebAssembly module. WebAssembly is a low-level computer instruction format that is portable and abstracts program execution cleanly over most modern computer hardware. It is broadly supported for programs that run on the internet and a natural fit for deploying dapps that are intended to run on the Internet Computer.

With Motoko, developers can compile to portable WebAssembly while still delivering secure dapps using a simple and high-level language.

The Motoko language offers many of the features that are common to other higher-level modern languages—like type safety and pattern-matching. In addition, Motoko provides built-in support for defining messaging services using actors in a way that is especially well-suited to the Internet Computer and is easy to learn whether you are a new or experienced programmer.

This guide provides an introduction to the basic features of the Motoko programming language in the context of writing programs using the SDK. For more detailed information about the Motoko programming language itself, see the [**Motoko programming language guide**](/motoko/main/about-this-guide.md).

## Identities and authentication

One of the main differences between a user-initiated canister operation and a canister-to-canister operation is that canisters have an explicitly registered identity on the Internet Computer.

There is no central registry for user principals, but users may choose to identify themselves using one (or more) digital signing keys. The user’s private key is used to sign messages, which are sent along with their public key to the Internet Computer. The Internet Computer authenticates the user and passes the principal to the canister — the canister may choose to implement whatever authorization policies it wants based on principals.

At a high level, first-time users generate an unsigned key pair and derive their principal identifier from the public key during their first interaction with the Internet Computer. Returning users are authenticated using the private key (or keys) that have been stored securely by the user agent. Users with access to multiple canisters can manage the keys and devices used for authentication associated with each canister.

A single user can have multiple public-private key pairs for accessing canisters from different devices—such as browsers running on different computers, mobile phones, or tablets—but these derived keys all map to a primary identifier.

## Resource consumption and cycles

All canisters consume resources, CPU cycles for execution, bandwidth for routing messages, and storage for persisted data. These resources are paid for using a unit of cost called **cycles**. Cycles can be obtained by converting ICP tokens and are stored by each canister in a local balance.

-   Canisters must be able to pay for complete execution (all or nothing), but the cost associated with a unit of cycles will make efficient programs cost-effective.

-   By setting limits on how many cycles a canister can consume, the platform can prevent malicious code from completely taking over resources.

-   Cycles are intended to reflect the real cost of operations in a stable or deflationary way so that the cost of program execution remains the same or decreases with operational efficiency. As such, the conversion rate of ICP to cycles is adjusted accordingly, based on the current ICP market value. The relative stability of operational costs makes it easier to predict the cycles required to process, for example, a million messages.

## Resources

If you are looking for more information about canisters, check out the following related resources:

-   [Introducing canisters — an evolution of smart contracts (video)](https://www.youtube.com/watch?v=LKpGuBOXxtQ).

-   [What is the IC SDK? (video)](https://www.youtube.com/watch?v=60uHQfoA8Dk).

-   [Deploying your first application (video)](https://www.youtube.com/watch?v=yqIoiyuGYNA).
