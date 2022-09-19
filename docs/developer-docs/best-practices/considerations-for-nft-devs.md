
# Coniderations for NFT developers

## What is an NFT?

An NFT or Non-fungible Token is a record on a blockchain that is associated with a particular digital or physical asset. The unique digital representation on a blockchain allows the proving of ownership as well as trading of NFTs. 

## NFTs on the Internet Computer

The Internet Computer (IC) brings a lot of potential for NFTs. For digital assets like images, sound clips, or videos, the entire assets can live on-chain and can be included in on-chain games or metaverse experiences. Furthermore, we can imagine dynamic NFTs that change based on IC-internal and external data via HTTPS outcalls.

Although there are many applications of NFTs, for many of them the defining characteristic is their permanence and immutability (or evolution according to predefined rules). Some of the design decisions of the IC, such as the reverse gas model and the upgradability of canister smart contracts, require the NFT developer to be mindful of details that do not apply to other smart contract platforms.

An NFT implementation on the IC typically has the following three functions:

1) A registry that tracks ownership and allows transfers
2) A ledger or transaction history
3) The actual asset (in the case of digital assets)

Depending on the architecture, all of these functions may be in one canister or spread across multiple canisters right up to an asset canister per individual NFT. The actu

In the following, we discuss some best practices and topics to think about when creating or evaluating an NFT implementation.

## The Basics


### Top up all canisters very generously

Make sure that all canisters have enough cycles to sustain a few years to begin with. Storage and computation on the IC are magnitudes less expensive than on other platforms, so don’t be stingy. To make it easy for others to top up the canisters you should add the [black hole canister](https://github.com/ninegua/ic-blackhole) as a controller to the NFT canisters. This allows users to use the [Tip Jar service](https://k25co-pqaaa-aaaab-aaakq-cai.ic0.app/) to top up the canisters.


### Set a generous freezing threshold

The IC has a useful mechanism to save your canister from running out of cycles. Canisters have a configurable [`freezing_threshold`](https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-create_canister). The `freezing_threshold` can be set by the controller of a canister and is given in seconds. The IC dynamically evaluates this as a threshold value in cycles. The value is such that the canister will be able to pay for its idle resources for at least the time given in `freezing_threshold`. To guarantee that, the canister is frozen when the cycle balance reaches the threshold, and all update calls, including the heartbeat, are immediately rejected and won’t affect the canister’s cycle balance. The default value is approximately 30 days, but for NFTs, developers should set the `freezing_threshold` to at least 90 days, preferably 180 days. This makes sure that NFT developers and their users have enough time to react and top up the canisters before they finally run out of cycles.


### Make sure your canisters can be monitored

On the IC, the cycle balance of a canister is only visible to controllers. Since an NFT (collection) might outlive its creator, you should plan for monitoring by third parties. You can do this via implementing a simple query method as included in the [DIP721](https://github.com/Psychedelic/DIP721/blob/064b04fbaf0429bf9fefdc0663d53fae033be0f9/src/main.rs#L450) and [EXT](https://github.com/Toniq-Labs/extendable-token/blob/86eabb7336ea259876be9be830fb69b03046ea14/examples/erc721.mo#L254) standards.
Again, adding the black hole canister as a controller is a good practice in this regard, since it can act as a proxy to fetch the `canister status`. 

You can also use a more complete monitoring solution like [Canistergeek](https://canistergeek.app/). Recently, the team behind Canistergeek added a new feature to their [NFTgeek](https://t5t44-naaaa-aaaah-qcutq-cai.raw.ic0.app/) product that allows observing the [cycles balance of popular NFT collections](https://t5t44-naaaa-aaaah-qcutq-cai.raw.ic0.app/cycles). 



### Follow best practices for efficient implementations

There are a few foot guns that could make your canister more expensive than you’d expect. Here are a few examples that you might encounter when implementing NFT canisters.

* Use of the heartbeat: A plain heartbeat without doing anything will cost ~0.055 T cycles/day. There are discussions about [implementing alternatives that allow for cheaper scheduling](https://forum.dfinity.org/t/heartbeat-improvements-timers-community-consideration/14201).
* Some advice for Motoko developers: 
    * Use `TrieMap` instead of `HashMap` to avoid the performance cliff of automatic resizing associated with HashMaps.
    * Use `Buffer` instead of `Array` if you need to dynamically resize the structure
    * Use `Blob` instead of `[Nat8]` for storing large binary assets
    * Consider using `Blob` instead of `[Nat8]` when sending or receiving Candid `vec nat8/blob` values. The choice is yours but `Blobs are 4x more compact and much less taxing on garbage collection (GC).
    * Consider storing large `Blob`s in stable memory, to reduce pressure on the GC even further, especially when the manual memory management of that Blob is simple (e.g. they are only added, never deleted).
    * Consider using the `compacting-gc` setting, especially in append-only scenarios, to allow access to larger heaps and reduce the cost of copying large, stationary objects.
* Some advice for Rust developers:
    * Be careful with extensive use of `Vec<u8>` and hence the `String` type if you need to (de-)serialize state for upgrades.
    * Read [Roman’s blog post on effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)

A general article with [good practices for canister development by Joachim Breitner](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister). 

To make sure you won’t get surprised, you can use the recently added [performance counter API](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027) to profile your canisters even before going live.


### Implement mechanisms to backup and restore state

The IC itself does not yet support backup and restoration of the canister state, but it can be implemented in the canister itself. Regular backups are insurance against the worst-case scenario that a canister gets deallocated or there are issues with upgrading a canister.


### Consider using a dedicated service for storing the transaction history 

There are dedicated services on the IC to keep an audit log of transactions such as [CAP](https://cap.ooo/), which can be used by an NFT collection as a service. This allows simple integration of the provenance history in explorers and wallets. 
Furthermore, the state of ownership could be reconstructed in case the main NFT canister gets lost. However, some drawbacks have to be considered, e.g. NFT transfers incur additional costs due to the necessary inter-canister calls. 

## Advanced Topics

### Think about governance

The value proposition of most NFTs is their permanence and immutability, e.g. by setting the [blackhole canister](https://github.com/ninegua/ic-blackhole) as the only controller.  As long as NFT canisters have their developers as controllers, users depend on the trustworthiness (and operational security) of the developers. Developers should therefore make the canisters immutable or manage the canisters with a DAO. A middle ground are mechanisms like [Launchtrail](https://devpost.com/software/launch-trail) that makes changes to a canister auditable.

Blackholing a canister has its issues as well. If there are bugs in the canister code or you’re using experimental system APIs that might get deprecated, later on, the canister might stop functioning. 

More information on this topic can be found in the [Trust in Canisters](https://internetcomputer.org/docs/current/concepts/trust-in-canisters) article.


### Think about economic sustainability

Ideally, your canisters implement mechanisms to generate fees that the canisters can use to pay for their existence indefinitely. A simple approach is to utilize (parts of) the transfer fee to fuel the canisters, but more elaborate schemes could involve staking or other advanced mechanisms. We’re unaware of any good best practices, but please share if you know of projects implementing clever mechanisms.


## Resources

The following resources are community projects. Please do your own research and use them at your own risk.

### NFT interface specifications and implementations

- [DIP 721](https://github.com/Psychedelic/DIP721): An interface similar to [ERC-721](https://eips.ethereum.org/EIPS/eip-721).
- [Extendable Token (EXT)](https://github.com/Toniq-Labs/extendable-token): Extandable interface inspired by [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155).

### NFT Marketplaces and Launchpads

- [Entrepot](https://entrepot.app/)
- [Jelly](https://jelly.xyz/)
- [Yumi](https://tppkg-ziaaa-aaaal-qatrq-cai.raw.ic0.app/)
- [NFT Anvil](https://nftanvil.com/)




