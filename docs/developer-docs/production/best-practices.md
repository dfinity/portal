# Development Best Practices 

## Overview

This guide outlines essential development best practices for building on the Internet Computer Protocol (ICP).

## Best Practices

### 1. Generous Canister Top-Up

Ensure all canisters have sufficient cycles to sustain operations for several years initially. Given the cost-effectiveness of storage and computation on ICP compared to other platforms, this upfront investment is usually modest.

Refer to [topping up cycles page](../production/topping-up-canister.md) to learn how to top up cycles effectively.

Refer to the [cycles estimate](../gas-cost.md) page to estimate cycle usage. 

### 2. Managing Cycle Depletion

ICP features a mechanism to prevent canisters from running out of cycles. Canisters have a configurable `freezing_threshold`, dynamically evaluated in cycles. Set `freezing_threshold` conservatively, especially for NFTs, ensuring at least 90 to 180 days' worth of cycles for proactive management.

Refer to [this resource](../production/topping-up-canister.md#managing-cycle-depletion-with-freezing-threshold) to learn how to configure the `freezing_threshold` of a canister. 

To make sure you won’t get surprised by a high cycle burn rate or hitting an instruction limit, you can use the recently added [performance counter API](../../../blog/features/async-performance-counter.md) to profile your canisters even before going live.

### 3. Efficient Implementations

Optimize canister implementation to avoid unnecessary costs. 

Use [canister timers](../backend/periodic-tasks.md) over plain heartbeats for reduced daily costs.

#### Motoko

1. Opt for `TrieMap` over `HashMap` to prevent automatic resizing overhead.
2. Utilize `Buffer` instead of `Array` for dynamic resizing.
3. Consider `Blob` over `[Nat8]` for compact storage and reduced GC pressure:

 * Use `Blob` instead of `[Nat8]` for storing large binary assets.
 * Use `Blob` instead of `[Nat8]` when sending or receiving Candid `vec nat8/blob` values. The choice is yours but `Blobs` are 4x more compact and much less taxing on garbage collection (GC).

4. Store large Blobs in stable memory for efficient manual management:
5. Use the `compacting-gc` setting, especially in append-only scenarios, to allow access to larger heaps and reduce the cost of copying large, stationary objects.

#### Rust developers:
1. Exercise caution with Vec<u8> and String types for state serialization.
2. Refer to recommended blogs and articles for effective Rust canister development.

#### Resources:

Several resources on efficient implementations include: 

- [Blog post on effective Rust canisters by Roman Kashitsyn](https://mmapped.blog/posts/01-effective-rust-canisters.html)
- [Good practices for canister development by Joachim Breitner](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister)

### 5. State Backup and Restoration

Implement backup mechanisms within canisters for state protection against deallocation or upgrade issues. Explore [backup strategies](https://forum.dfinity.org/t/backup-restore-function-for-a-canister/12849/3) like those employed by [Distrikt](https://distrikt.app/).

#### 6. Transaction History Storage

If your application needs to store transaction history, consider using dedicated services like [CAP](https://cap.ooo/) for maintaining transaction logs, especially for NFT collections. This facilitates integration with explorers and wallets and aids in ownership state reconstruction if the main NFT canister is compromised. Be mindful of additional costs associated with inter-canister calls.