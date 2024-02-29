# Examples

Take a look at some sample dapps below and see the possibilities of building on ICP. All samples and further projects can be found in the [samples repo](https://github.com/dfinity/examples). Additional resources can be found in the [awesome DFINITY repo](https://github.com/dfinity/awesome-dfinity), a curated set of open-source projects and examples from our community.

## Hello, world!

The dapp equivalent of 'Hello, World!' with a separate backend and frontend canister serving a web page.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/hello).
- [Rust](https://github.com/dfinity/examples/tree/master/rust/hello).
- [See a running example](https://6lqbm-ryaaa-aaaai-qibsa-cai.ic0.app/).

## Actor classes

A sample dapp that shows a dynamic actor (class) instantiation.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/classes).

## Actor reference

A simple dapp that shows how to import the IC management canister as an actor reference.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/actor_reference).

## Calculator

This example demonstrates a basic calculator dapp. It uses an orthogonally persistent cell variable to store an arbitrary precision integer that represents the result of the most recent calculation.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/calc).

## Certified variables

This dapp provides a frontend and a backend that shows a simple certified variable (a single 32-bit number), with client-side certificate validation.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/cert-var).

## Counter

A simple dapp that shows a basic (stable) variable demo.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/counter).

## Basic decentralized autonomous organization (DAO)

Decentralized governance is highlight of ICP and is illustrated by the basic DAO sample code. It illustrates how to initialize a set of accounts and corresponding tokens, how account owners can submit proposals for other account owners to vote on, and how a proposal is executed given enough favorable votes.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/basic_dao).
- [Rust](https://github.com/dfinity/examples/tree/master/rust/basic_dao).
- [YouTube tutorial](https://youtu.be/3IcYlieA-EE).

## Basic decentralized exchange (DEX)

To enable DeFi applications on ICP, canisters need to interact with token canisters and the ledger canister. This example dapp illustrates these interactions by showing how to enable an Exchange to take custody of funds, update an internal balance book as users trade, and give custody back to the user as funds are withdrawn.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/defi).
- [Rust](https://github.com/dfinity/examples/tree/master/rust/defi).
- [See a running example](https://gzz56-daaaa-aaaal-qai2a-cai.ic0.app/).
- [YouTube tutorial](https://youtu.be/fLbaOmH24Gs).

## Encrypted note-taking dapp

Create, access, modify confidential notes from multiple devices using [Internet Identity](../references/ii-spec) service and end-to-end encryption. The sample code relies upon the **web-serving** and **storage capabilities** of ICP, and highlights two key functionalities:
1. Client-side, end-to-end encryption.
2. Multi-user and multi-device support.

- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_motoko).
- [Rust](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_rust).
- [See a running example](https://cvhrw-2yaaa-aaaaj-aaiqa-cai.ic0.app/).
- [YouTube tutorial](https://youtu.be/DZQmtPSxvbs).

## Echo

This sample dapp gives a basic query function demo.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/echo).

## Factorial

This sample dapp shows a basic factorial demo.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/factorial).

## Game of Life
A dapp sample that demonstrates Conway’s [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), running in a Motoko canister. Demonstrates upgrades among three versions and state migration using stable variables.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/life).

## HTTP counter
The example demonstrates a counter dapp and an HTTP interface. It is essentially an iteration on the counter canister which adds native HTTP interfaces.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/http_counter).

## Hosting a static website

This tutorial shows how to quickly set up a static website structure, add content and basic styling, and deploy to ICP.
- [YouTube tutorial](https://www.youtube.com/watch?v=JAQ1dkFvfPI).

## Hosting a web game

The example shows how to deploy a web game on ICP, sample code can be found at [samples repo](https://github.com/dfinity/examples/tree/master/hosting).

## ICP transfer

This sample code demonstrates how a dapp can transfer ICP to its most active users.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer).
- [Rust](https://github.com/dfinity/examples/tree/master/rust/tokens_transfer).

## Internet Identity integration

- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/internet_identity_integration).

## Invoice canister

- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/invoice-canister).

## Minimal counter dapp

The example dapp shows how to build a very basic dapp with both backend and frontend, using Motoko for the backend functionality and plain HTML and JavaScript for the frontend. The dapp is a simple counter, which will increment a counter by clicking a button in the frontend.

- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/minimal-counter-dapp).

## NFT minting

This NFT minting dapp showcases how easy it can be to create a user generated NFT and share it. This dapp uses the [DIP721](https://github.com/Psychedelic/DIP721) NFT standard.
- [Rust](https://github.com/dfinity/examples/tree/master/rust/dip721-nft-container).
- [YouTube tutorial](https://youtu.be/1po3udDADp4).

## NFT wallet
This is an NFT wallet example dapp that utilizes minted NFTs from the Rust dip721-nft-container. Among some of its essential features, the wallet can register NFTs, transfer out NFTs and check how many NFTs it contains. This dapp includes a frontend UI for interaction.

- [Rust](https://github.com/dfinity/examples/tree/master/rust/nft-wallet).

## Periodic tasks

This example demonstrates different ways of scheduling periodic tasks on the Internet Computer: timers and heartbeats. The example shows the difference between the two, and helps to decide which method suits you the best.
- [Rust](https://github.com/dfinity/examples/tree/master/rust/periodic_tasks).

## Persistent storage

The example dapp shows how to build a simple dapp in Motoko, which will have persistent storage. The dapp is a simple counter, which will increment a counter, retrieve the counter value and reset the counter value by calling backend functions. The functions are exposed through a Candid interface.

- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/persistent-storage).

## Phone book

This simple dapp is a CRUD-like demo service for storing pieces of related information, such as names and phone numbers.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/phone-book).

## Point of sale (POS)

This app demonstrates a real world use case for [ckBTC](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/ckbtc/) on the Internet Computer. It is a simple point of sale app that allows users to charge customers using ckBTC. It also demonstrates the [HTTPS outcall](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/) functionality by sending notifications to users when a payment is received.

- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/ic-pos).
- [See a running example](https://hngac-6aaaa-aaaal-qb6tq-cai.icp0.io/).

## PubSub

This sample shows multiple canisters, with publisher-subscriber inter-canister calls.
- [PubSub](https://github.com/dfinity/examples/tree/master/motoko/pub-sub).

## Quicksort

This example shows how to sort an array, via quicksort, in Motoko.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/quicksort).

## QR code generator

This example shows that an Internet Computer dapp can perform a long-running computation, like image processing, in a single message execution which is possible due to a unique feature called Deterministic Time Slicing (DTS) that automatically divides long computations into smaller slices executed across multiple blocks.

- [Rust](https://github.com/dfinity/examples/tree/master/rust/qrcode).

## Random maze

This sample shows how to create a simple frontend in JavaScript where the previous samples did not provide a frontend, this sample provides both a frontend and a backend. It creates a random maze generation, with ICP-based randomness.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/random_maze).

## Sending and receiving cycles

This sample dapp illustrates how to receive and transfer cycles and check a balance.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/hello_cycles).

## Simple to-do

This sample is a CRUD-like demo service, sans a front end; see also: phone book and superheroes.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/simple-to-do).

## Superheros

This example is a simple CRUD dapp.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/superheroes).

## Who am I?

This dapp is a simple canister that reports the Principal of its caller.
- [Motoko](https://github.com/dfinity/examples/tree/master/motoko/whoami).

## Explore further samples in Motoko

This is a collection of repo-links to additional code samples written in Motoko. Most are also available in the [Motoko playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/). The playground provides the simplest environment for trying out pure Motoko samples without having to download and learn to use the SDK, but does not support dapps with frontends.

### Full stack

These samples demonstrate how to build dapps on ICP, with frontends based on React and TypeScript.

-   [Auth client demo](https://github.com/krpeacock/auth-client-demo) is a simple authentication with Internet Identity.
-   [IC-avatar](https://github.com/krpeacock/ic-avatar) is a full-stack Motoko + React with more advanced authentication, image uploads, and optimistic updates.

### Advanced

Large samples contributed by the community and not necessarily up-to-date:

-   [Certified asset canister](https://github.com/nomeata/motoko-certified-http) and [forum post](https://forum.dfinity.org/t/certified-assets-from-motoko-poc-tutorial/7263) demonstrates a larger application of Internet Computer certified variables.

-   [IC Vault](https://github.com/timohanke/icvault) demonstrates end-to-end content encryption.

-   [QR code generator](https://github.com/enzoh/motoko-qr) with accompanying [Medium article](https://medium.com/@ehaussecker/my-first-microservice-on-dfinity-3ac5c142865b).

-   [Reversi](https://github.com/ninegua/reversi) with accompanying [blog post](https://ninegua.github.io/reversi).


## Video guides for building dapps

These videos from the [community conversations](https://www.youtube.com/playlist?list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng) series cover an introduction to building dapps in Rust, and best practices for building dapps in Rust.

-   [Community conversations | overview of building a dapp in Rust](https://www.youtube.com/watch?v=6wyIhzsFbKw).

-   [Community conversations | best practices for canisters in Rust](https://www.youtube.com/watch?v=36L33S_DYHY&ab_channel=DFINITY).

Additional useful video series can be found at [coding with Kyle](https://www.youtube.com/watch?v=M2XnywvwxFM&list=PLuhDt1vhGcrfQGLWqhUo9-DFD5JaHqCh1).
