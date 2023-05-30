# 4: Adding and searching simple records

## Overview
In this guide, you are going to write a dapp that provides a few basic functions to add and retrieve simple profile records that consist of a name, description, and an array of keywords.

This program supports the following functions:

-   The `update` function enables you to add a profile that consists of a `name`, a `description`, and `keywords`.

-   The `getSelf` function returns the profile for the principal associated with the function caller.

-   The `get` function performs a simple query to return the profile matching the `name` value passed to it. For this function, the name specified must match the `name` field exactly to return the record.

-   The `search` function performs a more complex query to return the profile matching all or part of the text specified in any profile field. For example, the `search` function can return a profile containing a specific keyword or that matches only part of a name or description.

This guide provides a simple example of how you can use the Rust CDK interfaces and macros to simplify writing dapps in Rust for the Internet Computer blockchain.

This guide demonstrates: 
-   How to represent slightly more complex data—in the form of a profile as a `record` and an `array` of keywords—using the Candid interface description language. 
-   How to write a simple search function with partial string matching. 
-   How profiles are associated with a specific principal.

## Prerequisites

Before you start your project, verify the following:

- [x]   You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

- [x]   You have downloaded and installed the Rust programming language and Cargo as described in the [Rust installation instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for your operating system.

    ``` bash
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
    ```

    The Rust tool chain must be at version 1.46.0, or later.

- [x]   You have downloaded and installed the IC SDK package as described in the [install SDK](/developer-docs/setup/install/index.mdx) page.

- [x]   You have `cmake` installed. For example, use Homebrew with the following command:

    ``` bash
    brew install cmake
    ```

    For instructions on how to install Homebrew, see the [Homebrew documentation](https://docs.brew.sh/Installation).

- [x]   You have stopped any local execution environment processes running on your computer.

## Create a new project

To create a new project directory for this guide:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Create a new project by running the following command:

    ``` bash
    dfx new --type=rust rust_profile
    ```

3.  Change to your project directory by running the following command:

    ``` bash
    cd rust_profile
    ```

## Modify the default project

In the ['Hello, world!' Rust CDK Quick Start](./rust-quickstart.md), you went through the files in a default project with Rust type canister.

To complete this guide, you’ll need to complete the following steps:

-   [Replace the default dapp](#replace-the-default-dapp)

-   [Update interface description file](#update-interface-description-file)

### Replace the default dapp

Now that you have the files in place for your Rust dapp, we can replace the template `lib.rs` dapp with the Rust dapp we want to deploy on the Internet Computer blockchain.

To replace the default program:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Open the `src/rust_profile_backend/Cargo.toml` file in a text editor and add `serde` to dependencies.

    ``` toml
    [dependencies]
    candid = "0.8.2"
    ic-cdk = "0.6.0"
    ic-cdk-macros = "0.6.0"
    serde = "1.0"
    ```

- #### Step 3:  Open the template `src/rust_profile_backend/src/lib.rs` file in a text editor and delete the existing content.

    The next step is to add a Rust program that implements the `getSelf`, `update`, `get`, and `search` functions.

- #### Step 4:  Copy and paste this code into the `lib.rs` file.

    ```rust
    use ic_cdk::{
        api::call::ManualReply,
        export::{
            candid::{CandidType, Deserialize},
            Principal,
        },
    };
    use ic_cdk_macros::*;
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

    #[query(manual_reply = true)]
    fn search(text: String) -> ManualReply<Option<Profile>> {
        let text = text.to_lowercase();
        PROFILE_STORE.with(|profile_store| {
            for (_, p) in profile_store.borrow().iter() {
                if p.name.to_lowercase().contains(&text) || p.description.to_lowercase().contains(&text)
                {
                    return ManualReply::one(Some(p));
                }

                for x in p.keywords.iter() {
                    if x.to_lowercase() == text {
                        return ManualReply::one(Some(p));
                    }
                }
            }
            ManualReply::one(None::<Profile>)
        })
    }
    ```

- #### Step 5:  Save your changes and close the file to continue.

## Update interface description file

Candid is an interface description language (IDL) for interacting with canisters running on the Internet Computer. Candid files provide a language-independent description of a canister’s interfaces including the names, parameters, and result formats and data types for each function a canister defines.

By adding Candid files to your project, you can ensure that data is properly converted from its definition in Rust to run safely on the Internet Computer blockchain.

To see details about the Candid interface description language syntax, see the [*Candid Guide*](./../candid/index.md) or the [Candid crate documentation](https://docs.rs/candid/).

To update Candid file for this guide:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Open the `src/rust_profile_backend/rust_profile_backend.did` file in a text editor.

- #### Step 3:  Copy and paste the following `Profile` type declaration and `service` definition for the `getSelf`, `update`, `get`, and `search` functions.
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

- #### Step 4:  Save your changes and close the file to continue.

## Start the local execution environment

Before you can build the `rust_profile` project, you need to connect to the local execution environment running in your development environment or the decentralized Internet Computer blockchain mainnet.

To start local execution environment:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Start the local execution environment on your computer in the background by running the following command:

    ``` bash
    dfx start --background --clean
    ```

    Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

## Register, build, and deploy your project

After you connect to the local execution environment running in your development environment, you can register, build, and deploy your project locally.

To register, build, and deploy:

- #### Step 1:  Check that you are still in root directory for your project directory, if needed.

- #### Step 2:  Register, build, and deploy the canisters specified in the `dfx.json` file by running the following command:

    ``` bash
    dfx deploy
    ```

    The `dfx deploy` command output displays information about each of the operations it performs similar to the following excerpt:

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "default" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Deploying all canisters.
        Creating canisters...
        Creating canister "rust_profile_backend"...
        "rust_profile_backend" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"
        Creating canister "rust_profile_frontend"...
        "rust_profile_frontend" canister created with canister id: "ryjl3-tyaaa-aaaaa-aaaba-cai"
        Building canisters...
        Executing: "cargo" "build" "--target" "wasm32-unknown-unknown" "--release" "-p" "rust_profile_backend"
        ...
            Finished release [optimized] target(s) in 6.31s
        Building frontend...
        Installing canisters...
        Creating UI canister on the local network.
        The UI canister on the "local" network is "r7inp-6aaaa-aaaaa-aaabq-cai"
        Installing code for canister rust_profile_backend, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
        ...
        Deployed canisters.

## Call functions on the deployed canister

After successfully deploying the canister, you can test the canister by calling the functions it provides.

For this guide:

-   Call the `update` function to add a profile.

-   Call the `getSelf` function to display the profile for the principal identity.

-   Call the `search` function to look up the profile using a keyword.

To test the deployed canister:

- #### Step 1:  Call the `update` function to create a profile record by running the following command:

    ``` bash
    dfx canister call rust_profile_backend update '(record {name = "Luxi"; description = "mountain dog"; keywords = vec {"scars"; "toast"}})'
    ```

- #### Step 2:- #### Step   Call the `getSelf` function to retrieve a profile record by running the following command:

    ``` bash
    dfx canister call rust_profile_backend getSelf
    ```

    The command returns the profile you used the `update` function to add. For example:

        (  record {
            name = "Luxi";
            description = "mountain dog";
            keywords = vec { "scars"; "toast" };
          },
        )

    In its current form, the dapp only stores and returns one profile. If you run the following command to add a second profile using the `update` function, the command replaces the `Luxi` profile with the `Dupree` profile:

    ``` bash
    dfx canister call rust_profile_backend update '(record {name = "Dupree"; description = "black dog"; keywords = vec {"funny tail"; "white nose"}})'
    ```

    You can use the `get`, `getSelf`, and `search` functions, but they will only return results for the `Dupree` profile.

- #### Step 3:  Run the following command to call the `search` function:

    ``` bash
    dfx canister call rust_profile_backend search '("black")';
    ```

    This command finds the matching profile using the `description` and returns the profile:

        (
          opt record {
            name = "Dupree";
            description = "black dog";
            keywords = vec { "funny tail"; "white nose" };
          },

## Adding profiles for new identities

In its current form, the dapp only stores one profile—the one associated with the principal invoking the commands. To test that the `get`, `getSelf`, and `search` functions do what we want them to, we need to add some new identities that can have different profiles.

To add identities for testing:

- #### Step 1:  Create a new user identity by running the following command, enter a passphrase to secure the identity when prompted:

    ``` bash
    dfx identity new Miles
    ```
    
    ```
    Your seed phrase for identity 'Miles': recycle  ...
    This can be used to reconstruct your key in case of emergency, so write it down in a safe place.
    Created identity: "Miles".
    ```
- #### Step 2:  Call the `update` function to add a profile for the new identity. Enter your passphrase when prompted.

    ``` bash
    dfx --identity Miles canister call rust_profile_backend update '(record {name = "Miles"; description = "Great Dane"; keywords = vec {"Boston"; "mantle"; "three-legged"}})'
    ```

- #### Step 3:  Call the `getSelf` function to view the profile associated with the `default` user identity.

    ``` bash
    dfx canister call rust_profile_backend getSelf
    ```

    The command displays the profile currently associated with the default identity, in this example, the Dupree profile:

        (
          record {
            name = "Dupree";
            description = "black dog";
            keywords = vec { "funny tail"; "white nose" };
          },
        )

- #### Step 4:  Call the `getSelf` function using the `Miles` user identity by running the following command:

    ``` bash
    dfx --identity Miles canister call rust_profile_backend getSelf
    ```

    The command displays the profile currently associated with the Miles identity, in this example:

        (
          record {
            name = "Miles";
            description = "Great Dane";
            keywords = vec { "Boston"; "mantle"; "three-legged" };
          },
        )

- #### Step 5:  Call the `search` function using part of the description or a keyword to further test the whether the correct profile is returned.

    For example, to verify the `Miles` profile is returned, you might run the following command:

    ``` bash
    dfx canister call rust_profile_backend search '("Great")'
    ```

    The command returns the `Miles` profile:

        (
          opt record {
            name = "Miles";
            description = "Great Dane";
            keywords = vec { "Boston"; "mantle"; "three-legged" };
          },
        )

- #### Step 6:  Call the `search` function to further test the whether the correct profile is returned.

    For example, to verify the `Dupree` profile is returned, you might run the following command:

    ``` bash
    dfx canister call rust_profile_backend search '("black")'
    ```

    The command returns the `Dupree` profile:

        (
          opt record {
            name = "Dupree";
            description = "black dog";
            keywords = vec { "funny tail"; "white nose" };
          },
        )

## Extending the sample dapp

This sample dapp only stores one profile for each unique user identity. If you were to extend this dapp by adding a second method for linking social connections to each users profile, you would be well on your way to recreating the LinkedUp sample application using Rust.

## Stop the local execution environment

After you finish experimenting with your program, you can stop the local execution environment so that it doesn’t continue running in the background.

To stop the local execution environment running on your computer, run the following command:

``` bash
dfx stop
```
