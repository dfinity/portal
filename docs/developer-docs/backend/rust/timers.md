Using Timers
============

This tutorial demonstrates how to create a small dapp with a periodic task. The task is triggered automatically by the Internet Computer with a specified interval.

This tutorial takes about 10 minutes to complete.

Prerequisites
-------------

1. Make sure the [Canister SDK](../../setup/install/) (`dfx`) is installed.
2. There is a macOS or Linux terminal with internet connection.
3. The [Rust language](https://www.rust-lang.org/tools/install) and a code editor are installed. The [VS Code IDE](https://code.visualstudio.com/download) is a popular choice for Rust.

Step 1. Creating a new project
------------------------------

1. Open a new terminal window.

2. Create a new Internet Computer project called `my_timers`:

   ```sh
   dfx new --type=rust my_timers --no-frontend
   ```

3. Enter the newly created project directory and open the code editor:

   ```sh
   cd my_timers
   code .
   ```

Note, the following steps assume the terminal is still open and the current directory is `my_timers`.

Step 2. Adding Canister Development Kit (CDK) libraries
-------------------------------------------------------

The following libraries are required for this tutorial:

1. **The main CDK library, version 0.7** &mdash; contains the Internet Computer System API bindings.
2. **The CDK macros library, version 0.6** &mdash; defines macros to declare dapp entry points.
3. **The CDK timers library, version 0.1** &mdash; implements multiple and periodic timers.

Note, the specified versions are the latest stable versions at the moment of writing. Also, this step is required for the `dfx` version `0.13.1` and earlier. For the latest `dfx` versions this step is optional.

Add the libraries to the project:

```sh
cargo add ic-cdk@0.7 ic-cdk-macros@0.6 ic-cdk-timers@0.1
```

Example output:

```sh
% cargo add ic-cdk@0.7 ic-cdk-macros@0.6 ic-cdk-timers@0.1
Updating crates.io index
   Adding ic-cdk v0.7 to dependencies.
   Adding ic-cdk-macros v0.6 to dependencies.
   Adding ic-cdk-timers v0.1 to dependencies.
```

Step 3. Declaring canister interface
------------------------------------

Candid is an interface description language (IDL) for interacting with canisters running on the Internet Computer. Candid files provide a language-independent description of canister interfaces.

To see details about the Candid interface description language syntax, see the [*Candid Guide*](../candid/index.md) or the [Candid crate documentation](https://docs.rs/candid/).

In the code editor, open the `my_timers_backend.did` file and replace its content with the following:

```candid
service : (nat64) -> {
      "counter": () -> (nat64) query;
}
```

Where:

* `service : (nat64) -> {...}` &mdash; declares a new service which accepts a single integer argument.
* `"counter": () -> (nat64) query` &mdash; declares a canister query entry point named `counter`. The `counter` query takes no arguments `()` and returns an integer `(nat64)`.

The interface definition is complete, save the changes.

Step 4. Implementing the `counter` query
----------------------------------------

In the Step 3 above, the `counter` query is declared as `"counter": () -> (nat64) query`. This step implements it.

In the code editor, open the `src/my_timers_backend/src/lib.rs` file and replace its content with the following:

```rust
use std::sync::atomic::{AtomicU64, Ordering};

static COUNTER: AtomicU64 = AtomicU64::new(0);

#[ic_cdk_macros::query]
fn counter() -> u64 {
    COUNTER.load(Ordering::Relaxed)
}
```

Where:

* `static COUNTER: AtomicU64 = ...` &mdash; defines a new global variable called `COUNTER`.
* `#[ic_cdk_macros::query]` &mdash; marks the following `counter` function as a `query` entry point, so the function will be exported as `canister_query counter`.
* `fn counter() -> u64 {...}` &mdash; defines the query. Just like in the `.did` definition, it takes no arguments and returns `u64`.
* `COUNTER.load(...)` &mdash; loads and returns the global `COUNTER` value.

Step 5. Implementing canister initialization
--------------------------------------------

In the Step 3 above, the service is declared as `service : (nat64) -> {...}`. This step implements the canister initialization with an argument.

In the code editor, open the `src/my_timers_backend/src/lib.rs` file and append the following:

```rust
[...]

#[ic_cdk_macros::init]
fn init(timer_interval_secs: u64) {
    let interval = std::time::Duration::from_secs(timer_interval_secs);
    ic_cdk::println!("Starting a periodic task with interval {interval:?}");
    ic_cdk_timers::set_timer_interval(interval, || {
        COUNTER.fetch_add(1, Ordering::Relaxed);
    });
}
```

Where:

* `#[ic_cdk_macros::init]` &mdash; marks the following `init` function as a canister initialization method, so the function will be exported as `canister_init`.
* `fn init(interval: u64) {...}` &mdash; defines the initialization method. Just like in the `.did` definition, the function takes one argument: timer interval in seconds.
* `ic_cdk::println!(...)` &mdash; prints the debug log message on the local `dfx` console.
* `ic_cdk_timers::set_timer_interval(...)` &mdash; creates a new periodic timer with the specified interval and a closure to call.
* `COUNTER.fetch_add(1, ...)` &mdash; increases the global `COUNTER` every time the periodic task is triggered.

Step 6. Implementing canister upgrade
-------------------------------------

Note, as described in [Periodic Tasks and Timers](../periodic-tasks.md), the timers library does not handle canister upgrades. It is up to the canister developer to serialize the timers in the `canister_pre_upgrade` and reactivate the timers in the `canister_post_upgrade` method if needed.

For the sake of simplicity, in this tutorial the `canister_post_upgrade` method just calls `canister_init` to reinitialize the timer.

In the code editor, open the `src/my_timers_backend/src/lib.rs` file and append the following:

```rust
[...]

#[ic_cdk_macros::post_upgrade]
fn post_upgrade(timer_interval_secs: u64) {
    init(timer_interval_secs)
}
```

Where:

* `#[ic_cdk_macros::post_upgrade]` &mdash; marks the following `post_upgrade` function as a canister post-upgrade handler, so the function will be exported as `canister_post_upgrade`.
* `fn post_upgrade(interval: u64) {...}` &mdash; defines the post-upgrade method. Just like in the `.did` definition, the function takes one argument: timer interval in seconds.
* `init(timer_interval_secs)` &mdash; for the sake of simplicity, the post-upgrade just calls the `init` function, i.e. does exactly the same as the canister initialization.

The code is complete. Save the changes.

Step 7. Running the dapp locally
--------------------------------

The libraries are added, the canister interface is described and the code is complete. Time to try it all out!

1. Open a new terminal window in the project root directory:

   ```sh
   cd my_timers
   ```

2. Start a clean local Internet Computer replica and a web server:

   ```sh
   dfx stop
   dfx start --clean
   ```

   This terminal will stay blocked, printing log messages, until the `Ctrl+C` is pressed or the `dfx stop` command is run.

   Example output:

   ```sh
   % dfx stop && dfx start --clean
   [...]
   Dashboard: http://localhost:63387/_/dashboard
   ```

3. Open another terminal window in the same directory:

   ```sh
   cd my_timers
   ```

4. Compile and deploy `my_timers_backend` canister, setting the interval for the periodic task to 1s:

   ```sh
   dfx deploy my_timers_backend --argument 1
   ```

   The counter inside the canister starts increasing every second.

   Example output:

   ```sh
   % dfx deploy my_timers_backend --argument 1
   [...]
   Deployed canisters.
   URLs:
     Backend canister via Candid interface:
       my_timers_backend: http://127.0.0.1/...
   ```

5. Observe the counter is actually non-zero:

   ```sh
   dfx canister call my_timers_backend counter
   ```

   Example output:

   ```sh
   % dfx canister call my_timers_backend counter
   (8 : nat64)
   ```

More to Explore
---------------

1. Learn more about periodic tasks and timers in the [Internet Computer Developer Guide.](../periodic-tasks.md)
2. Have a look at the locally running dashboard. The URL is at the end of the `dfx start` command: `Dashboard: http://localhost/...`
3. Check out `my_timers_backend` canister Candid User Interface. The URLs are at the end of the `dfx deploy` command: `my_timers_backend: http://127.0.0.1/...`

The Final Result
----------------

The `src/my_timers_backend/Cargo.toml` file:

```toml
[package]
name = "my_timers_backend"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
candid = "0.8.2"
ic-cdk = "0.7"
ic-cdk-macros = "0.6"
ic-cdk-timers = "0.1"
```

The `src/my_timers_backend/src/lib.rs` file:

```rust
use std::sync::atomic::{AtomicU64, Ordering};

static COUNTER: AtomicU64 = AtomicU64::new(0);

#[ic_cdk_macros::query]
fn counter() -> u64 {
    COUNTER.load(Ordering::Relaxed)
}

#[ic_cdk_macros::init]
fn init(timer_interval_secs: u64) {
    let interval = std::time::Duration::from_secs(timer_interval_secs);
    ic_cdk::println!("Starting a periodic task with interval {interval:?}");
    ic_cdk_timers::set_timer_interval(interval, || {
        COUNTER.fetch_add(1, Ordering::Relaxed);
    });
}

#[ic_cdk_macros::post_upgrade]
fn post_upgrade(timer_interval_secs: u64) {
    init(timer_interval_secs)
}
```
