--- 
hide_table_of_contents: true
---

# Overview

Take a look at some sample dapps below and see the possibilities of building on the IC. All samples and further projects can be found in the [Samples repo](https://github.com/dfinity/examples). Additional resources can be found in the [Awesome Dfinity repo](https://github.com/dfinity/awesome-dfinity) (a curated set of open-source projects and examples from our community) or [Hackathon projects](hackathon-projects)!

## Hello world

The dapp equivalent of *hello world*, with a separate backend and frontend canister serving a web page.  
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/hello) • [Rust](https://github.com/dfinity/examples/tree/master/rust/hello) • [See running](https://6lqbm-ryaaa-aaaai-qibsa-cai.ic0.app/) • [Technical docs](hello)

## Static website

This tutorial shows how to quickly set up a static website structure, add content and basic styling, and deploy to the IC.  
[Technical docs](host-a-website) • [Video guide](https://www.youtube.com/watch?v=JAQ1dkFvfPI)

## Basic DEX

To enable DEFI applications on the IC, canisters need to interact with token canisters and the ledger canister. This example dapp illustrates these interactions by showing how to enable an Exchange to take custody of funds, update an internal balance book as users trade, and give custody back to the user as funds are withdrawn.  
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/defi) • [Rust](https://github.com/dfinity/examples/tree/master/rust/defi) • [See running](https://gzz56-daaaa-aaaal-qai2a-cai.ic0.app/) • [Technical docs](dex) • [YouTube](https://youtu.be/fLbaOmH24Gs)

## NFT minting

This NFT minting dapp showcases how easy it can be to create a user generated NFT and share it. This dapp uses the [DIP721](https://github.com/Psychedelic/DIP721) NFT standard.  
[Rust](https://github.com/dfinity/examples/tree/master/rust/dip721-nft-container) • [Technical docs](nft) • [YouTube](https://youtu.be/1po3udDADp4)

## Basic DAO

Decentralised governance is higlight of the IC and is illustrated by the basic DAO sample code. It illustrates how to initialize a set of accounts and corresponding tokens, how account owners can sumit proposals for other account owners to vote on, and how a proposal is executed given enough favorable votes.  
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/basic_dao) • [Rust](https://github.com/dfinity/examples/tree/master/rust/basic_dao) • [Technical docs](dao) • [YouTube](https://youtu.be/3IcYlieA-EE)

## Encrypted note-taking

Create/access/modify confidential notes from multiple devices using [Internet Identity](https://smartcontracts.org/docs/ic-identity-guide/what-is-ic-identity.html) service and end-to-end encryption. The sample code relies upon the *web-serving* and *storage capabilities* of the IC, and highlights two key functionalities: (1) client-side, end-to-end encryption and (2) multi-user and multi-device support.  
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_motoko) • [Rust](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_rust) • [See running](https://cvhrw-2yaaa-aaaaj-aaiqa-cai.ic0.app/) • [Technical docs](encrypted-notes) • [YouTube](https://youtu.be/DZQmtPSxvbs)

## Token transfer

This sample code demonstrates how a dapp can transfer tokens to its most active users.  
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer) • [Rust](https://github.com/dfinity/examples/tree/master/rust/tokens_transfer) • [Technical docs](token-transfer)

## Unity WebGL

The example shows how to deploy a simple Unity WebGL build on the IC, sample code can be found at [Samples repo](https://github.com/dfinity/examples/tree/master/hosting/unity-webgl-template).   
[Technical docs](host-unity-webgl)

## Explore further Samples in Motoko

This is a collection of repo-links to additional code samples written in Motoko. Most are also available in the [Motoko playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/). The playground provides the simplest environment for trying out pure Motoko samples without having to download and learn to use the SDK, but does not support dapps with frontends.

### Basic

This is collection of basic getting-started Motoko samples, which demonstrate basic concepts of the IC and the Motoko language.

-   [Actor\_reference](https://github.com/dfinity/examples/tree/master/motoko/actor_reference) shows the IC management canister as an actor (reference).

-   [Counter](https://github.com/dfinity/examples/tree/master/motoko/counter) shows a basic (stable) variable demo.

-   [Echo](https://github.com/dfinity/examples/tree/master/motoko/echo) gives a basic query function demo.

-   [Factorial](https://github.com/dfinity/examples/tree/master/motoko/factorial) shows a basic factorial demo.

-   [Hello\_cycles](https://github.com/dfinity/examples/tree/master/motoko/hello_cycles) illustrates how to receive and transfer cycles and check a balance.

-   [Whoami](https://github.com/dfinity/examples/tree/master/motoko/whoami) is a simple canister that reports the Principal of its caller.

### Intermediate

The intermediate samples demonstrate how to use some of the basic concepts in common use cases. The samples show how to build simple backend functionalities in Motoko.

-   [Classes](https://github.com/dfinity/examples/tree/master/motoko/classes) shows a dynamic actor (class) instantiation.

-   [Pub-sub](https://github.com/dfinity/examples/tree/master/motoko/pub-sub) shows multiple canisters, with publisher-subscriber inter-canister calls.

-   [Quicksort](https://github.com/dfinity/examples/tree/master/motoko/quicksort) shows how to sort an array, via Quick Sort, in Motoko.

-   [Simple-to-do](https://github.com/dfinity/examples/tree/master/motoko/simple-to-do) is a CRUD-like demo service, sans a front end; see also: phone-book and superheroes.

-   [Calc](https://github.com/dfinity/examples/tree/master/motoko/calc) is a more advanced version of counter demo.

### Minimal frontend

These two samples show how to create simple frontends in JavaScript. Where the previous samples did not provide a frontend, these two samples provide both a frontend and a backend.

-   [Random\_maze](https://github.com/dfinity/examples/tree/master/motoko/random_maze) is a random maze generation, with IC-based randomness.

-   [Cert\_var](https://github.com/dfinity/examples/tree/master/motoko/cert-var) shows a simple certified variable (a single 32-bit number), with client-side certificate validation.

### Full stack

These samples demonstrate how to build dapps on the IC, with frontends based on React and TypeScript.

-   [Life](https://github.com/dfinity/examples/tree/master/motoko/life) demonstrates Conway’s [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), running in a Motoko Canister. Demonstrates upgrades among three versions and state migration using stable variables.

-   [Phone-book](https://github.com/dfinity/examples/tree/master/motoko/phone-book) is a CRUD-like demo service.

-   [Superheroes](https://github.com/dfinity/examples/tree/master/motoko/superheroes) is a simple CRUD dapp.

-   [Auth Client Demo](https://github.com/krpeacock/auth-client-demo) is a simple authentication with Internet Identity.

-   [IC-Avatar](https://github.com/krpeacock/ic-avatar) is a full-stack Motoko + React with more advanced authentication, image uploads, and optimistic updates.

### Advanced

Large samples contributed by the community and not necessarily up-to-date:

-   [Reversi](https://github.com/ninegua/reversi) with accompanying [blog post](https://ninegua.github.io/reversi).

-   [QR code generator](https://github.com/enzoh/motoko-qr) with accompanying [Medium article](https://medium.com/@ehaussecker/my-first-microservice-on-dfinity-3ac5c142865b).

-   [IC Vault](https://github.com/timohanke/icvault) demonstrates end-to-end content encryption.

-   [Certified asset canister](https://github.com/nomeata/motoko-certified-http) and [forum post](https://forum.dfinity.org/t/certified-assets-from-motoko-poc-tutorial/7263) demonstrates a larger application of Internet Computer certified variables.

## Video Guides for Building Dapps

These videos from the [community conversations](https://www.youtube.com/playlist?list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng) series cover an introduction to building dapps in Rust, and best practices for building dapps in Rust.

-   [Community conversations | overview of building a dapp in Rust](https://www.youtube.com/watch?v=6wyIhzsFbKw)

-   [Community conversations | best practices for canisters in Rust](https://www.youtube.com/watch?v=36L33S_DYHY&ab_channel=DFINITY)

Additional useful video series can be found at [Coding with Kyle](https://www.youtube.com/watch?v=M2XnywvwxFM&list=PLuhDt1vhGcrfQGLWqhUo9-DFD5JaHqCh1).
