---
sidebar_position: 3
---
# NFT development

## Overview

An NFT or **non-fungible token** is a record on a blockchain that is associated with a particular digital or physical asset. The unique digital representation on a blockchain allows the proving of ownership as well as their trading. 

## NFTs on the Internet Computer

The Internet Computer (IC) brings a lot of potential for NFTs. For digital assets like images, sound clips, or videos, the entire assets can live on-chain and can be included in on-chain games or metaverse experiences. Furthermore, we can imagine dynamic NFTs that change based on IC-internal and external data via [HTTPS outcalls](/https-outcalls).

For many applications, the defining characteristic is their permanence and immutability (or evolution according to predefined rules). Some of the design decisions of the IC, such as the reverse gas model and the upgradeability of canister smart contracts, require the NFT developer to be particularly aware.

An NFT implementation on the IC typically has the following three functions:

-  A registry that tracks ownership and allows transfers.
-  A ledger or transaction history.
-  The actual asset (in the case of digital assets).

Depending on the architecture, all of these functions may be in one canister or spread across multiple canisters right up to an asset canister per individual NFT. Each of these canisters must not run out of cycles, and should be protected against arbitrary code changes. In the following, we discuss some of the mechanisms, tools, and ideas that support NFT developers and their users to achieve these goals.


## The basics

### Top up all canisters very generously

Make sure that all canisters have enough cycles to sustain a few years to begin with. Storage and computation on the IC are magnitudes less expensive than on other platforms, so this is typically not a huge investment. To make it easy for others to top up the canisters you should consider adding the [black hole canister](https://github.com/ninegua/ic-blackhole) or some other immutable proxy canister as a controller to the NFT canisters. This allows users to use the [tip jar service](https://k25co-pqaaa-aaaab-aaakq-cai.icp0.io/) to top up the canisters.


### Set a generous freezing threshold

The IC has a useful mechanism to save your canister from running out of cycles. Canisters have a configurable [`freezing_threshold`](/references/ic-interface-spec.md#ic-create_canister). The `freezing_threshold` can be set by the controller of a canister and is given in seconds. The IC dynamically evaluates this as a threshold value in cycles. The value is such that the canister will be able to pay for its idle resources for at least the time given in `freezing_threshold`. To guarantee that, the canister is frozen when the cycle balance reaches the threshold, and all update calls, including the heartbeat and timer, are immediately rejected and won’t affect the canister’s cycle balance. The default value is approximately 30 days, but for NFTs, developers should set the `freezing_threshold` to at least 90 days, preferably 180 days. This makes sure that NFT developers and their users have enough time to react and top up the canisters before they finally run out of cycles.


### Make sure your canisters can be monitored

On the IC, the cycle balance of a canister is only visible to controllers. Since an NFT (collection) might outlive its creator, you should plan for monitoring by third parties. You can do this via implementing a simple query method as included in the [DIP721](https://github.com/Psychedelic/DIP721/blob/064b04fbaf0429bf9fefdc0663d53fae033be0f9/src/main.rs#L450) and [EXT](https://github.com/Toniq-Labs/extendable-token/blob/86eabb7336ea259876be9be830fb69b03046ea14/examples/erc721.mo#L254) standards.

Again, adding the black hole canister as a controller is a good practice in this regard, since it can act as a proxy to fetch the [`canister_status`](/references/ic-interface-spec.md#c-canister_status). 

You can also use a more complete monitoring solution like [Canistergeek](https://canistergeek.app/). Recently, the team behind Canistergeek added a new feature to their [NFTgeek](https://t5t44-naaaa-aaaah-qcutq-cai.raw.icp0.io/) product that allows observing the [cycles balance of popular NFT collections](https://t5t44-naaaa-aaaah-qcutq-cai.raw.icp0.io/cycles). 



### Follow best practices for efficient implementations

There are a few foot guns that could make your canister more expensive than you’d expect. Here are a few examples that you might encounter when implementing NFT canisters.

* Use of the heartbeat: A plain heartbeat without doing anything will cost ~0.055 T cycles/day. Instead, use [canister timers](/developer-docs/backend/periodic-tasks.md) &mdash; one-shot or periodic canister calls with specified minimum timeout or interval.
* Some advice for Motoko developers: 
    * Use `TrieMap` instead of `HashMap` to avoid the performance cliff of automatic resizing associated with HashMaps.
    * Use `Buffer` instead of `Array` if you need to dynamically resize the structure.
    * Use `Blob` instead of `[Nat8]` for storing large binary assets.
    * Consider using `Blob` instead of `[Nat8]` when sending or receiving Candid `vec nat8/blob` values. The choice is yours but `Blobs` are 4x more compact and much less taxing on garbage collection (GC).
    * Consider storing large `Blob`s in stable memory, to reduce pressure on the GC even further, especially when the manual memory management of that Blob is simple (e.g. they are only added, never deleted).
    * Consider using the `compacting-gc` setting, especially in append-only scenarios, to allow access to larger heaps and reduce the cost of copying large, stationary objects.
* Some advice for Rust developers:
    * Be careful with extensive use of `Vec<u8>` and hence the `String` type if you need to (de-)serialize state for upgrades.
    * Read [Roman’s blog post on effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)

Another must-read is the general article on [good practices for canister development by Joachim Breitner](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister). 

To make sure you won’t get surprised by a high cycle burn rate or hitting an instruction limit, you can use the recently added [performance counter API](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027) to profile your canisters even before going live. Furthermore, a list of all costs on the IC can be found [here](../gas-cost.md). 


### Implement mechanisms to backup and restore state

The IC itself does not yet support backup and restoration of the canister state, but it can be implemented in the canister itself. Regular backups are insurance against the worst-case scenario that a canister gets deallocated or there are issues with upgrading a canister. [This forum post](https://forum.dfinity.org/t/backup-restore-function-for-a-canister/12849/3) describes the approach [Distrikt](https://distrikt.app) is using.


### Consider using a dedicated service for storing the transaction history 

There are dedicated services on the IC to keep an audit log of transactions such as [CAP](https://cap.ooo/), which can be used by an NFT collection as a service. This allows simple integration of the provenance history in explorers and wallets. 
Furthermore, the state of ownership could be reconstructed in case the main NFT canister gets lost. However, some drawbacks have to be considered, e.g. NFT transfers incur additional costs due to the necessary inter-canister calls. 

## Advanced topics

### Think about governance

The value proposition of most NFTs is their permanence and immutability, e.g. by setting the [black hole canister](https://github.com/ninegua/ic-blackhole) as the only controller. As long as NFT canisters have their developers as controllers, users depend on the trustworthiness (and operational security) of the developers. Developers should therefore make the canisters immutable or manage the canisters with a DAO. A middle ground are mechanisms like [Launchtrail](https://devpost.com/software/launch-trail) that make changes to a canister auditable.

Blackholing a canister has its issues as well. If there are bugs in the canister code or you’re using experimental system APIs that might get deprecated, later on, the canister might stop functioning. 

More information on this topic can be found in the [trust in canisters](/concepts/trust-in-canisters.md) article.


### Think about economic sustainability

Ideally, your canisters implement mechanisms to generate fees that the canisters can use to pay for their existence indefinitely. A simple approach is to utilize (parts of) the transfer fee to fuel the canisters, but more elaborate schemes could involve staking or other advanced mechanisms. We’re unaware of any good best practices, but please share if you know of projects implementing clever mechanisms.


## Resources

The following resources are community projects. Please do your own research and use them at your own risk.

### NFT interface specifications and implementations

- [DIP 721](https://github.com/Psychedelic/DIP721): An interface similar to [ERC-721](https://eips.ethereum.org/EIPS/eip-721).
- [Extendable token (EXT)](https://github.com/Toniq-Labs/extendable-token): Extendable interface inspired by [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155).

### NFT marketplaces and launchpads

- [Entrepot](https://entrepot.app/).
- [Jelly](https://jelly.xyz/).
- [NFT Anvil](https://nftanvil.com/).
- [Yumi](https://tppkg-ziaaa-aaaal-qatrq-cai.raw.icp0.io/).





