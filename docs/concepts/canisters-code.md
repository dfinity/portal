# Canisters and Code

One of the most important principles to keep in mind is that the Internet Computer is a blockchain that allows running software in a distributed, replicated way.

When you write source code for a dapp that runs on the Internet Computer, you compile the source code into a **WebAssembly module**. When you deploy the WebAssembly module that contains your program on the Internet Computer blockchain, the program is executed inside a conceptual computational unit called a **canister smart contract**, or **canister** in short.

Once deployed, end-users can interact with the canister smart contract by accessing the entry point functions you have defined for that canister through a front-end client such as a browser.

## Canisters Include both Program and State

A canister smart contract is similar to a container in that both are deployed as a software unit that contains compiled code and dependencies for an application or service.

Containerization allows for applications to be decoupled from the environment, allowing for easy and reliable deployment. The canister differs from a container, however, in that it also stores information about the current software **state**.

While a containerized application might include information about the state of the environment in which the application runs, a canister is able to persist a record of state changes that resulted from its functions being called.

## Query and Update Methods

This concept of a canister consisting of both program and state is an important one. In particular it relates to the behavior one should expect when calling an end-point of the canister. There are only two types of calls: non-committing **query calls** (any state change is discarded) and committing **update calls** (state changes are persisted).

<!-- <table>
<colgroup>
<col style="width: 15%" />
<col style="width: 84%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Type</th>
<th style="text-align: left;">Key points to remember</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Query calls</p></td>
<td style="text-align: left;"><p>Allow the user to query the current state of a canister or call a function that operates on the canister’s state <strong>without changing it</strong>.</p>
<ul>
<li><p>Are synchronous and answered immediately.</p></li>
<li><p>Can be made to any node that holds the canister; the result does not go through consensus. That is, there is an inherent tradeoff between security and performance: the reply from a single node is fast, but might be untrustworthy or inaccurate.</p></li>
<li><p>Do not allow changes to the state of the canister to be persisted, so essentially query calls are read-only operations.</p></li>
<li><p>Do not allow the called canister to invoke functions exposed by other canisters as inter-canister calls. (Note that this restriction is temporary and that canisters will be able to invoke functions exposed by other canisters when processing query calls in the future.)</p></li>
</ul></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Update calls</p></td>
<td style="text-align: left;"><p>Allow the user to change the state of the canister and have <strong>changes persisted</strong>.</p>
<ul>
<li><p>Are answered asynchronously.</p></li>
<li><p>Must pass through consensus to return the result. Because consensus is required, changing the state of a canister, and returning the result can take time. There is an inherent tradeoff between security and performance: the result is trustworthy because two-thirds of the replicas in a subnet must agree on the result, but the call is slow.</p></li>
<li><p>The called canister can invoke functions exposed by other canisters</p></li>
</ul></td>
</tr>
</tbody>
</table> -->

As a developer, it is important to recognize this relationship between the calls that query the canister and the calls that change the canister state. In particular, you should keep in mind the inherent tradeoff between security and performance.

## How to Develop Dapps for the Internet Computer

For programmers and software developers, the Internet Computer blockchain provides unique capabilities and opportunities within a framework that simplifies how you can design, build, and deploy dapps. A key part of this framework is a new, general purpose programming language, Motoko. Motoko is a programming language that has been specifically designed to take full advantage of the unique features that the Internet Computer blockchain provides, including:

-   The ability to define programs directly using `actor` objects and classes.

-   The use of `async` and `await` syntax to enable programming asynchronous messaging as if it was synchronous processing.

-   Automatic support for message serialization and deserialization.

-   The ability to leverage orthogonal persistence using data structures without external databases or storage volumes.

As a modern, high-level programming language, Motoko provides some key features of its own, including:

-   Support for big integer operations and overflow protection.

-   A sound type system that statically checks each program to ensure it can execute without type errors on all possible inputs.

-   Support for function abstractions, user-defined type definitions, and user-defined actors.

For more detailed information about the Motoko programming language itself, including syntactical conventions and supported features, see the [*Motoko Programming Language Guide*](../../language-guide/motoko.xml).

The following diagram provides a simplified drill-down view of the development environment as part of the Internet Computer ecosystem.

![Your development environment as part of the Internet Computer ecosystem](_attachments/SDK-protocol-network.svg)

## Canisters, Actors, and the Code you Produce

One of the most important principles to keep in mind when preparing to write programs using the Motoko programming language is that Motoko uses an *actor-based* programming model.

An *actor* is a special kind of object that processes messages in an isolated state, enabling messages to be handled remotely and asynchronously.

In general, each canister smart contract includes the compiled code for one actor object. Each canister may also include some additional information such as interface descriptions or front-end assets. You can create projects that include multiple canisters, but each canister can only include one actor.

## Why your Code is Compiled into WebAssembly

When you compile Motoko code, the result is a WebAssembly module. WebAssembly is a low-level computer instruction format that is portable and abstracts program execution cleanly over most modern computer hardware. It is broadly supported for programs that run on the internet and a natural fit for deploying dapps that are intended to run on the {platform}.

With Motoko, developers can compile to portable WebAssembly while still delivering secure dapps using a simple and high-level language.

The Motoko language offers many of the features that are common to other higher-level modern languages—like type safety and pattern-matching. In addition, Motoko provides built-in support for defining messaging services using actors in a way that is especially well-suited to the {platform} and is easy to learn whether you are a new or experienced programmer.

This guide provides an introduction to the basic features of the Motoko programming language in the context of writing programs using the SDK. For more detailed information about the Motoko programming language itself, see the [*Motoko Programming Language Guide*](../../language-guide/motoko.xml).

## Identities and Authentication

One of the main differences between a user-initiated canister operation and a canister-to-canister operation is that canisters have an explicitly registered identity on the Internet Computer.

There is no central registry for user principals, but users may chose to identify themselves using one (or more) digital signing key. The user’s private key is used to sign messages, which are sent along with their public key to the Internet Computer. The Internet Computer authenticates the user and passes the principal to the canister — the canister may choose to implement whatever authorization policies it wants based on principals.

At a high level, first-time users generate an unsigned key pair and derive their principal identifier from the public key during their first interaction with the Internet Computer. Returning users are authenticated using the private key (or keys) that have been stored securely by the user agent. Users with access to multiple canisters can manage the keys and devices used for authentication associated with each canister.

A single user can have multiple public-private key pairs for accessing canisters from different devices—such as browsers running on different computers, mobile phones, or tablets—but these derived keys all map to a primary identifier.

## Resource Consumption and Cycles

All canisters consume resources, being CPU cycles for execution, bandwidth for routing messages, and storage for persisted data. These resources are paid for using a unit of cost called **cycles**. Cycles can be obtained by converting ICP tokens and are stored by each canister in a local balance.

-   Canisters must be able to pay for complete execution (all or nothing), but the cost associated with a unit of cycles will make efficient programs cost-effective.

-   By setting limits on how many cycles a canister can consume, the platform can prevent malicious code from completely taking over resources.

-   Cycles are intended to reflect the real cost of operations in a stable or deflationary way so that the cost of program execution remains the same or decreases with operational efficiency. As such, the conversion rate of ICP to cycles is adjusted accordingly, based on the current ICP market value. The relative stability of operational costs makes it easier to predict the cycles required to process, for example, a million messages.

## Want to Learn More?

If you are looking for more information about canisters, check out the following related resources:

-   [Introducing Canisters — An Evolution of Smart Contracts (video)](https://www.youtube.com/watch?v=LKpGuBOXxtQ)

-   [What is the DFINITY Canister SDK? (video)](https://www.youtube.com/watch?v=60uHQfoA8Dk)

-   [Deploying your first application (video)](https://www.youtube.com/watch?v=yqIoiyuGYNA)
