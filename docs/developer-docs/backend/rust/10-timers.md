# 10: Using periodic timers

## Overview 
This guide demonstrates how to create a small dapp with a periodic task. The task is triggered automatically by the Internet Computer with a specified interval.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

## Create the timer dapp project

Open a terminal window on your local computer, if you don’t already have one open.

First, create a new Internet Computer project called `my_timers`:

```sh
dfx new --type=rust my_timers --no-frontend
```

Then, navigate into your project directory by running the command:

```sh
cd my_timers
```

:::info
Note: the following steps assume the terminal is still open and the current directory is `my_timers`.
:::

## Writing the Cargo.toml file

First, open the `src/my_timers_backend/Cargo.toml` file in a code editor. Replace the existing contents with the following:


```toml
[package]
name = "my_timers_backend"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[lib]
crate-type = ["cdylib"]

[dependencies]
candid = "0.8.2"
ic-cdk = "0.7.0"
ic-cdk-timers = "0.1"
serde = { version = "1.0", features = ["derive"] }
```

Save the file. 

## Update the Cargo.toml dependencies

Since we made changes to the Cargo.toml file, run the following command to update the project's dependencies:

```
cargo update
```

## Declaring the canister interface

Candid is an interface description language (IDL) for interacting with canisters running on the Internet Computer. Candid files provide a language-independent description of canister interfaces.

To see details about the Candid interface description language syntax, see the [Candid guide](../candid/) or the [Candid crate documentation](https://docs.rs/candid/).

Start by opening the `src/my_timers_backend/my_timers_backend.did` file in a code editor and replace its content with the following:

```candid
service : (nat64) -> {
      "counter": () -> (nat64) query;
}
```

This code establishes the following:

- `service : (nat64) -> {...}` declares a new service which accepts a single integer argument.
- `"counter": () -> (nat64) query` declares a canister query entry point named `counter`. The `counter` query takes no arguments `()` and returns an integer `(nat64)`.

Save the file. 

## Implementing the `counter` query

In the previous step the `counter` query is declared as `"counter": () -> (nat64) query`. This step implements it.

In the code editor, open the `src/my_timers_backend/src/lib.rs` file and replace its content with the following:

```rust
use std::sync::atomic::{AtomicU64, Ordering};

static COUNTER: AtomicU64 = AtomicU64::new(0);

#[ic_cdk::query]
fn counter() -> u64 {
    COUNTER.load(Ordering::Relaxed)
}
```

This code establishes the following:

- `static COUNTER: AtomicU64 = ...` defines a new global variable called `COUNTER`.
- `#[ic_cdk::query]` marks the following `counter` function as a `query` entry point, so the function will be exported as `canister_query counter`.
- `fn counter() -> u64 {...}` defines the query. Just like in the `.did` definition, it takes no arguments and returns `u64`.
- `COUNTER.load(...)` loads and returns the global `COUNTER` value.
- 

:::info
It is important to note that `Ordering` in this code is a shorter, but equivalent alternative to `thread_local!` wrapping a `Cell<u64>`.
:::

## Implementing canister initialization

In the previous step, the service is declared as `service : (nat64) -> {...}`. This step implements the canister initialization with an argument.

In the code editor, open the `src/my_timers_backend/src/lib.rs` file and append the following:

```rust
// ...

#[ic_cdk::init]
fn init(timer_interval_secs: u64) {
    let interval = std::time::Duration::from_secs(timer_interval_secs);
    ic_cdk::println!("Starting a periodic task with interval {interval:?}");
    ic_cdk_timers::set_timer_interval(interval, || {
        COUNTER.fetch_add(1, Ordering::Relaxed);
    });
}
```

This code establishes the following:

- `#[ic_cdk::init]` marks the following `init` function as a canister initialization method, so the function will be run when the canister is installed.
- `fn init(interval: u64) {...}` defines the initialization method. Just like in the `.did` definition, the function takes one argument: timer interval in seconds.
- `ic_cdk::println!(...)` prints the debug log message on the local `dfx` console.
- `ic_cdk_timers::set_timer_interval(...)` creates a new periodic timer with the specified interval and a closure to call.
- `COUNTER.fetch_add(1, ...)` increases the global `COUNTER` every time the periodic task is triggered.

## Implementing canister upgrade

:::info
Note: As described in the [periodic tasks and timers](../periodic-tasks) page, the timers library does not handle canister upgrades. It is up to the canister developer to serialize the timers in the `canister_pre_upgrade` and reactivate the timers in the `canister_post_upgrade` method if needed.
:::

For the sake of simplicity, in this guide the `canister_post_upgrade` method just calls `canister_init` to reinitialize the timer.

In the code editor, open the `src/my_timers_backend/src/lib.rs` file and append the following:

```rust
// ...

#[ic_cdk::post_upgrade]
fn post_upgrade(timer_interval_secs: u64) {
    init(timer_interval_secs)
}
```

This code establishes the following:

- `#[ic_cdk::post_upgrade]` marks the following `post_upgrade` function as a canister post-upgrade handler, so the function will be exported as `canister_post_upgrade`.
- `fn post_upgrade(interval: u64) {...}` defines the post-upgrade method. Just like in the `.did` definition, the function takes one argument: timer interval in seconds.
- `init(timer_interval_secs)` for the sake of simplicity, the post-upgrade just calls the `init` function, i.e. does exactly the same as the canister initialization.

The canister's code is now complete. The finished file should look like this:

`src/my_timers_backend/src/lib.rs`:

```rust
use std::sync::atomic::{AtomicU64, Ordering};

static COUNTER: AtomicU64 = AtomicU64::new(0);

#[ic_cdk::query]
fn counter() -> u64 {
    COUNTER.load(Ordering::Relaxed)
}

#[ic_cdk::init]
fn init(timer_interval_secs: u64) {
    let interval = std::time::Duration::from_secs(timer_interval_secs);
    ic_cdk::println!("Starting a periodic task with interval {interval:?}");
    ic_cdk_timers::set_timer_interval(interval, || {
        COUNTER.fetch_add(1, Ordering::Relaxed);
    });
}

#[ic_cdk::post_upgrade]
fn post_upgrade(timer_interval_secs: u64) {
    init(timer_interval_secs)
}
```

Save the file.

## Running the dapp locally

The libraries are added, the canister interface is described and the code is complete. Time to try it all out!

Start by assuring that you are still in your project's directory. Then, start the local execution environment with the command:

```sh
dfx start --clean --background
```

Then, compile and deploy `my_timers_backend` canister, setting the interval for the periodic task to 1s:

```sh
dfx deploy my_timers_backend --argument 1
```

The counter inside the canister starts increasing every second.

Example output:

```sh
dfx deploy my_timers_backend --argument 1
[...]
Deployed canisters.
URLs:
    Backend canister via Candid interface:
    my_timers_backend: http://127.0.0.1/...
```

Then, observe that the counter is actually non-zero:

```sh
dfx canister call my_timers_backend counter
```

Example output:

```sh
dfx canister call my_timers_backend counter
(8 : nat64)
```

## Next steps
For the next step, let's dive into Rust [stable structures](./stable-structures).
