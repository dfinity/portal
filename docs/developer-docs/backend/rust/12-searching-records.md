# 12: Adding and searching simple records

## Overview
In this guide, you are going to write a dapp that provides a few basic functions to add and retrieve simple profile records that consist of a name, description, and an array of keywords.

This program supports the following functions:

-   The `update` function enables you to add a profile that consists of a `name`, a `description`, and `keywords`.

-   The `getSelf` function returns the profile for the principal associated with the function caller.

-   The `get` function performs a simple query to return the profile matching the `name` value passed to it. For this function, the name specified must match the `name` field exactly to return the record.

-   The `search` function performs a more complex query to return the profile matching all or part of the text specified in any profile field. For example, the `search` function can return a profile containing a specific keyword or that matches only part of a name or description.

This guide provides a simple example of how you can use the Rust CDK interfaces and macros to simplify writing dapps in Rust for the Internet Computer.

This guide demonstrates: 
-   How to represent slightly more complex data—in the form of a profile as a `record` and an `array` of keywords—using the Candid interface description language. 
-   How to write a simple search function with partial string matching. 
-   How profiles are associated with a specific principal.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

## Creating a new project

Open a terminal window on your local computer, if you don’t already have one open. Then, create a new project by running the following command:

``` bash
dfx new --type=rust rust_profile
cd rust_profile
```

Now that you have the files in place for your Rust dapp, you can replace the template `lib.rs` dapp with the Rust dapp you want to deploy on the Internet Computer.

To replace the default program, open the `src/rust_profile_backend/Cargo.toml` file in a text editor and add `serde` to dependencies.

``` toml
[dependencies]
candid = "0.8.2"
ic-cdk = "0.6.0"
serde = "1.0"
```

Then, open the template `src/rust_profile_backend/src/lib.rs` file in a text editor and delete the existing content.

The next step is to add a Rust program that implements the `getSelf`, `update`, `get`, and `search` functions. To do this, copy and paste this code into the `src/rust_profile_backend/src/lib.rs` file.

```rust
use ic_cdk::{
    export::{
        candid::{CandidType, Deserialize},
        Principal,
    },
    query, update,
};
use std::cell::RefCell;
use std::collections::BTreeMap;

type IdStore = BTreeMap<String, Principal>;
type ProfileStore = BTreeMap<Principal, Profile>;

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
struct Profile {
    pub name: String,
    pub description: String,
    pub keywords: Vec<String>,
}

thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default();
}

#[query(name = "getSelf")]
fn get_self() -> Profile {
    let id = ic_cdk::api::caller();
    PROFILE_STORE.with(|profile_store| {
        profile_store
            .borrow()
            .get(&id)
            .cloned().unwrap_or_default()
    })
}

#[query]
fn get(name: String) -> Profile {
    ID_STORE.with(|id_store| {
        PROFILE_STORE.with(|profile_store| {
            id_store
                .borrow()
                .get(&name)
                .and_then(|id| profile_store.borrow().get(id).cloned()).unwrap_or_default()
        })
    })
}

#[update]
fn update(profile: Profile) {
    let principal_id = ic_cdk::api::caller();
    ID_STORE.with(|id_store| {
        id_store
            .borrow_mut()
            .insert(profile.name.clone(), principal_id);
    });
    PROFILE_STORE.with(|profile_store| {
        profile_store.borrow_mut().insert(principal_id, profile);
    });
}
```

Save your changes and close the file to continue.

## Update the interface description file

Candid is an interface description language (IDL) for interacting with canisters running on the Internet Computer. Candid files provide a language-independent description of a canister’s interfaces including the names, parameters, and result formats and data types for each function a canister defines.

By adding Candid files to your project, you can ensure that data is properly converted from its definition in Rust to run safely on the Internet Computer blockchain.

To see details about the Candid interface description language syntax, see the [Candid Guide](./../candid/index.md) or the [Candid crate documentation](https://docs.rs/candid/).

To update Candid file for this guide open the `src/rust_profile_backend/rust_profile_backend.did` file in a text editor.

Copy and paste the following `Profile` type declaration and `service` definition for the `getSelf`, `update`, `get`, and `search` functions.

```did
type Profile = record {
    "name": text;
    "description": text;
    "keywords": vec text;
};

service : {
    "getSelf": () -> (Profile) query;
    "get": (text) -> (Profile) query;
    "update": (Profile) -> ();
    "search": (text) -> (opt Profile) query;
}
```

Save your changes and close the file to continue.

## Start the local execution environment

Before you can build the `rust_profile` project, you need to connect to the local execution environment running in your development environment or the Internet Computer blockchain mainnet.

Start the local execution environment on your computer in the background by running the following command:

``` bash
dfx start --background --clean
```

Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

## Register, build, and deploy your project

After you connect to the local execution environment running in your development environment, you can register, build, and deploy your project locally.

To do this, run the following command:

``` bash
dfx deploy
```

## Call functions on the deployed canister

After successfully deploying the canister, you can test the canister by calling the functions it provides.

For this guide:

-   Call the `update` function to add a profile.

-   Call the `getSelf` function to display the profile for the principal identity.

-   Call the `search` function to look up the profile using a keyword.

### Updating records

Call the `update` function to create a profile record by running the following command:

``` bash
dfx canister call rust_profile_backend update '(record {name = "Luxi"; description = "mountain dog"; keywords = vec {"scars"; "toast"}})'
```

In its current form, the dapp only stores and returns one profile. If you run the following command to add a second profile using the `update` function, the command replaces the `Luxi` profile with the `Dupree` profile:

``` bash
dfx canister call rust_profile_backend update '(record {name = "Dupree"; description = "black dog"; keywords = vec {"funny tail"; "white nose"}})'
```

You can use the `get`, `getSelf`, and `search` functions, but they will only return results for the `Dupree` profile.

### Retrieving records

Call the `getSelf` function to retrieve a profile record by running the following command:

``` bash
dfx canister call rust_profile_backend getSelf
```

The command returns the profile you used the `update` function to add. For example:

```
(
    record {
        name = "Luxi";
        description = "mountain dog";
        keywords = vec { "scars"; "toast" };
    },
)
```

### Searching records
Run the following command to call the `search` function:

``` bash
dfx canister call rust_profile_backend search '("black")'
```

This command finds the matching profile using the `description` and returns the profile:

```
(
    opt record {
        name = "Dupree";
        description = "black dog";
        keywords = vec { "funny tail"; "white nose" };
    },
)
```

## Adding profiles for new identities

In its current form, the dapp only stores one profile—the one associated with the principal invoking the commands. To test that the `get`, `getSelf`, and `search` functions do what you want them to, you need to add some new identities that can have different profiles.

To add identities for testing, first create a new user identity by running the following command, enter a passphrase to secure the identity when prompted:

``` bash
dfx identity new Miles
```

The following output will be returned:
    
```
Your seed phrase for identity 'Miles': recycle  ...
This can be used to reconstruct your key in case of emergency, so write it down in a safe place.
Created identity: "Miles".
```

Call the `update` function to add a profile for the new identity. Enter your passphrase when prompted.

``` bash
dfx --identity Miles canister call rust_profile_backend update '(record {name = "Miles"; description = "Great Dane"; keywords = vec {"Boston"; "mantle"; "three-legged"}})'
```

Call the `getSelf` function to view the profile associated with the `default` user identity.

``` bash
dfx canister call rust_profile_backend getSelf
```

The command displays the profile currently associated with the default identity, in this example, the Dupree profile:

```
(
    record {
        name = "Dupree";
        description = "black dog";
        keywords = vec { "funny tail"; "white nose" };
    },
)
```

Call the `getSelf` function using the `Miles` user identity by running the following command:

``` bash
dfx --identity Miles canister call rust_profile_backend getSelf
```

The command displays the profile currently associated with the Miles identity, in this example:

```
(
    record {
        name = "Miles";
        description = "Great Dane";
        keywords = vec { "Boston"; "mantle"; "three-legged" };
    },
)
```

Call the `search` function using part of the description or a keyword to further test the whether the correct profile is returned.

For example, to verify the `Miles` profile is returned, you might run the following command:

``` bash
dfx canister call rust_profile_backend search '("Great")'
```

The command returns the `Miles` profile:

```
(
    opt record {
    name = "Miles";
    description = "Great Dane";
    keywords = vec { "Boston"; "mantle"; "three-legged" };
    },
)
```

Call the `search` function to further test the whether the correct profile is returned.

For example, to verify the `Dupree` profile is returned, you might run the following command:

``` bash
dfx canister call rust_profile_backend search '("black")'
```

The command returns the `Dupree` profile:

```
(
    opt record {
        name = "Dupree";
        description = "black dog";
        keywords = vec { "funny tail"; "white nose" };
    },
)
```
## Next steps

Next, you'll cover [access control](./13-access-control.md) in Rust canisters.
