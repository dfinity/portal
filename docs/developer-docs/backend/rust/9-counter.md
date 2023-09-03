# 9: Incrementing a counter

## Overview

In this guide, you are going to write a dapp that provides a few basic functions to increment a counter and illustrates the persistence of a value.

For this guide, the dapp declares a `COUNTER` as a mutable variable to contain a natural number that represents the current value of the counter. This dapp supports the following functions:

-   The `increment` function updates the current value, incrementing by 1 with no return value.

-   The `get` function is a simple query that returns the current value of the counter.

-   The `set` function updates the current value to the numeric value you specify as an argument.

This guide provides a simple example of how you can increment a counter by calling functions on a deployed canister. By calling the function to increment a value multiple times, you can verify that the variable state—that is, the value of the variable between calls—persists.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

## Create the counter dapp project

Open a terminal window on your local computer, if you don’t already have one open.

Start by creating a new project by running the following command:

``` bash
dfx new --type=rust rust_counter
```

Then, navigate into your project directory by running the command:

``` bash
cd rust_counter
```

:::info
Note: the following steps assume the terminal is still open and the current directory is `rust_counter`.
:::

Now that you have the files in place for your Rust dapp, we can replace the template `lib.rs` dapp code with some code that creates a counter dapp instead. 

To replace the default dapp, open the template `src/rust_counter_backend/src/lib.rs` file in a text editor and delete the existing content.

Then, copy and paste this code into the `src/rust_counter_backend/src/lib.rs` file.

```rust
use std::cell::RefCell;
use candid::types::number::Nat;

thread_local! {
    static COUNTER: RefCell<Nat> = RefCell::new(Nat::from(0));
}

/// Get the value of the counter.
#[ic_cdk_macros::query]
fn get() -> Nat {
    COUNTER.with(|counter| (*counter.borrow()).clone())
}

/// Set the value of the counter.
#[ic_cdk_macros::update]
fn set(n: Nat) {
    // COUNTER.replace(n);  // requires #![feature(local_key_cell_methods)]
    COUNTER.with(|count| *count.borrow_mut() = n);
}

/// Increment the value of the counter.
#[ic_cdk_macros::update]
fn inc() {
    COUNTER.with(|counter| *counter.borrow_mut() += 1);
}



#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_set() {
        let expected = Nat::from(42);
        set(expected.clone());
        assert_eq!(get(), expected);
    }

    #[test]
    fn test_init() {
        assert_eq!(get(), Nat::from(0));
    }

    #[test]
    fn test_inc() {
        for i in 1..10 {
            inc();
            assert_eq!(get(), Nat::from(i));
        }
    }
}
```

Save your changes and close the `lib.rs` file to continue.

### Update interface description file

Candid is an interface description language (IDL) for interacting with canisters running on the Internet Computer. Candid files provide a language-independent description of a canister’s interfaces including the names, parameters, and result formats and data types for each function a canister defines.

By adding Candid files to your project, you can ensure that data is properly converted from its definition in Rust to run safely on the Internet Computer blockchain.

To see details about the Candid interface description language syntax, see the [**Candid guide**](./../candid/index.md) or the [Candid crate documentation](https://docs.rs/candid/).

To update the Candid file, open the `src/rust_counter_backend/rust_counter_backend.did` file in a text editor, then copy and paste the following `service` definition for the `increment`, `get`, and `set` functions:

``` did
service : {
    "increment": () -> ();
    "get": () -> (nat) query;
    "set": (nat) -> ();
}
```

Save your changes and close the `rust_counter_backend.did` file to continue.

## Writing the Cargo.toml file

As with any standard Rust crate, it has a `Cargo.toml` file which configures the details to build the Rust crate.

Open the `src/rust_counter_backend/Cargo.toml` file and replace the existing content with the following:

``` toml
[package]
name = "rust_counter_backend"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[lib]
crate-type = ["cdylib"]

[dependencies]
candid = "0.8.2"
ic-cdk = "0.7.0"
serde = { version = "1.0", features = ["derive"] }
```

Save the file.

## Update the Cargo.toml dependencies

Since we made changes to the Cargo.toml file, run the following command to update the project's dependencies:

```
cargo update
```

### Start the local canister execution environment

Before you can build the `rust_counter` project, you need to connect to the local canister execution environment running in your development environment or the decentralized Internet Computer blockchain mainnet.

Start the local canister execution environment on your computer in the background by running the following command:

``` bash
dfx start --clean --background 
```

Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

### Register, build, and deploy your project

After you connect to the local canister execution environment running in your development environment, you can register, build, and deploy your project locally.

Register, build, and deploy the canisters specified in the `dfx.json` file by running the following command:

``` bash
dfx deploy
```

## Call the canister's functions and test the dapp

After successfully deploying the canister, you can test the canister by invoking the functions it provides. For this guide:

-   Call the `get` function to query the value of the counter.

-   Call the `increment` function to increment the counter each time it is called.

-   Call the `set` function to pass an argument to update the counter to an arbitrary value you specify.

Call the `get` function to read the current value of the `COUNTER` variable by running the following command:

``` bash
dfx canister call rust_counter_backend get
```

The command returns the current value of the `COUNTER` variable as zero:

    (0 : nat)

Call the `increment` function to increment the value of the `COUNTER` variable by one:

``` bash
dfx canister call rust_counter_backend increment
```

This command increments the value of the variable—changing its state—but does not return the result.

Rerun the command to call the `get` function to see the current value of the `COUNTER` variable:

``` bash
dfx canister call rust_counter_backend get
```

The command returns the updated value of the `COUNTER` variable as one:

    (1 : nat)

Run additional commands to experiment with call the functions and using different values.

For example, try commands similar to the following to set and return the counter value:

``` bash
dfx canister call rust_counter_backend set '(987)'
dfx canister call rust_counter_backend get
```

Returns the current value of 987.

``` bash
dfx canister call rust_counter_backend increment
dfx canister call rust_counter_backend get
```

Returns the incremented value of 988.

## Next steps

Next, let's explore how to use [periodic timers](10-timers.md).
