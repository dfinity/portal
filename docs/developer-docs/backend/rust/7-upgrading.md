# 7: Upgrading a canister

## Overview

Unlike a canister reinstall that preserves the canister identifier but no state, a canister upgrade enables you to preserve the state of a deployed canister, and change the code.

For example, assume you have a dapp that manages professional profiles and social connections. If you want to add a new feature to the dapp, you need to be able to update the canister code without losing any of the previously-stored data. A canister upgrade enables you to update existing canister identifiers with program changes without losing the program state.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

This guide assumes you have an existing canister that you'd like to upgrade. To get an existing canister, review the previous documentation pages in this section. 

## Upgrading a canister

To upgrade a canister written in Rust, you should use `pre_upgrade` and `post_upgrade` functions to ensure data is properly preserved after a canister upgrade as illustrated in the example below:

```rust
use ic_cdk::{
    api::call::ManualReply, export::Principal, init, post_upgrade, pre_upgrade, query, storage,
    update,
};
use std::cell::RefCell;
use std::collections::{BTreeMap, BTreeSet};

type Users = BTreeSet<Principal>;
type Store = BTreeMap<String, Vec<u8>>;

thread_local! {
    static USERS: RefCell<Users> = RefCell::default();
    static STORE: RefCell<Store> = RefCell::default();
}

#[init]
fn init() {
    USERS.with(|users| users.borrow_mut().insert(ic_cdk::api::caller()));
}

fn is_user() -> Result<(), String> {
    if USERS.with(|users| users.borrow().contains(&ic_cdk::api::caller())) {
        Ok(())
    } else {
        Err("Store can only be set by the owner of the asset canister.".to_string())
    }
}

#[update(guard = "is_user")]
fn store(path: String, contents: Vec<u8>) {
    STORE.with(|store| store.borrow_mut().insert(path, contents));
}

#[query(manual_reply = true)]
fn retrieve(path: String) -> ManualReply<Vec<u8>> {
    STORE.with(|store| match store.borrow().get(&path) {
        Some(content) => ManualReply::one(content),
        None => panic!("Path {} not found.", path),
    })
}

#[update(guard = "is_user")]
fn add_user(principal: Principal) {
    USERS.with(|users| users.borrow_mut().insert(principal));
}

#[pre_upgrade]
fn pre_upgrade() {
    USERS.with(|users| storage::stable_save((users,)).unwrap());
}

#[post_upgrade]
fn post_upgrade() {
    let (old_users,): (BTreeSet<Principal>,) = storage::stable_restore().unwrap();
    USERS.with(|users| *users.borrow_mut() = old_users);
}
```

This code is displayed in the [Rust CDK asset storage example](https://github.com/dfinity/cdk-rs/blob/main/examples/asset_storage/src/asset_storage_rs/lib.rs) for reference. 

To upgrade a canister, start by opening a new terminal window if necessary and navigating into your project's directory.

Then, start the local canister environment with the command:

```
dfx start --clean --background
```

Next, obtain the canister identifier of the canister(s) you'd like to upgrade. To do so, the following command can be used:

```
dfx canister id [canister-name]
```

Then, make any changes to the canister's code that you'd like to be included in the update. These changes should include adding the `pre_upgrade` and `post_upgrade` functions as displayed above. 

To upgrade all canisters, the following command can be used:

```
dfx canister install --all --mode upgrade
```

To upgrade a single canister, use the command:

```
dfx canister install [canister-id] --mode upgrade
```

## Next steps

Next, let's take a look at [optimizing canisters](./8-optimizing.md).