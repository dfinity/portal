# 7: Upgrading a canister

## Overview

Unlike a canister reinstall that preserves the canister identifier but no state, a canister upgrade enables you to preserve the state of a deployed canister, and change the code.

For example, assume you have a dapp that manages professional profiles and social connections. If you want to add a new feature to the dapp, you need to be able to update the canister code without losing any of the previously-stored data. A canister upgrade enables you to update existing canister identifiers with program changes without losing the program state.

## Canister upgrades
When a canister needs to be upgraded, the following workflow is used:
- If a `pre_upgrade` hook is defined, the system calls it. Note: Having a `pre_upgrade` hook is not recommended, since the `pre_upgrade` hook is run in the current Wasm. If there are any bugs or errors, the canister will trap. 
- The system calls a `pre_upgrade` hook if your canister defines it.
- The system discards canister memory and instantiates the new version of your WebAssembly module. The system does preserve the stable memory, which is now available to the new version.
- The system calls a `post_upgrade` hook on the newly created instance if your canister defines it. The `init` function is not executed.
- If the canister traps (throws an unrecoverable error) in any of the steps above, the system reverts the canister to the pre-upgrade state.

### Versioning stable memory

Stable memory is a data persistence feature on ICP. Stable memory is used to store data that persists across canister upgrades. The maximum data storage size of stable memory is 96GiB if the subnet can accommodate it. 

In comparison, heap storage refers to the regular Wasm data storage for a canister. Heap storage is not persisted across canister upgrades and is limited to 4GiB. 

Stable memory can be viewed as the communication channel between old and new versions of a canister. As good practice, communication protocols should be versioned. In some cases, developers may want to radically change something such as the serialization format or the stable data layout of their canister. In radical changes like these, the stable memory decoding mechanism may need to guess the data's format, which can become messy and complicated. To make this process easier, stable memory versioning should be planned for. It can be as simple as declaring that the first byte of the canister's stable memory will be used to represent the version number. 

### Testing upgrade hooks

It is best practice to test upgrades before applying them in order to catch any potential errors that may result in losing data irrevocably. To test upgrades, several different workflows or approaches can be used, such as shell or bash scripts, or Rust test scripts. The following psuedo-code showcases a Rust upgrade example that adds an additional step to execute the state validation of your upgrade test. 

```
let canister_id = install_canister(WASM);
populate_data(canister_id);
if should_upgrade { upgrade_canister(canister_id, WASM); }
let data = query_canister(canister_id);
assert_eq!(data, expected_value);
```

Then, your tests should be run twice in two different scenarios:
- In a scenario without any upgrades, to assure that your tests run successfully without executing an upgrade.
- In a scenario with an upgrade, to assure that your tests run successfully while executing an upgrade. 
You then run your tests twice in different modes:

By running both of these tests, developers can gain confidence that when an upgrade is applied to a canister, the canister's state is preserved. 

:::caution
It is not recommended to trap within the `pre_upgrade` hook. This is because while the `pre_upgrade` and `post_upgrade` hooks appear to be symmetrical, they are not. 

If the `pre_upgrade` hook succeeds, but the `post_upgrade` hook traps, the canister can be debugged and another version can be built. However, if the `pre_upgrade` hook traps, there is not much you can do about it; a broken `pre_upgrade` hook prevents you from changing the canister's behavior. 
:::

### Using stable memory as primary storage

When a canister is upgraded, there is a limit regarding how many cycles a canister can burn during that upgrade. If the canister goes beyond that limit, the upgrade will be canceled by the system and the canister's state will be reverted. That means if you serialize the canister's whole state to stable memory in the `pre_upgrade` hook and the state becomes very large, the canister may not be able to be upgraded again. 

One way to prevent this is to avoid serializing the canister state to begin with. Stable memory can be used as the canister's primary storage, where it can be used to store each upgrade call. Using this method, the `pre_upgrade` hook may not be necessary, and the `post_upgrade` hook will burn fewer cycles. 

:::caution
While this approach might be useful for some workflows, there are a few drawbacks of this approach:
- It is a challenge to organize the flat address space of stable storage into a data structure, especially for complex canister states that consist of multiple interconnected data structures. The [ic-stable-structures](https://crates.io/crates/ic-stable-structures) package and the [ic-stable-memory](https://crates.io/crates/ic-stable-memory) package provide tools to help you organize data in stable memory.
- Altering your canister's data layout may be counterproductive and infeasible. 
- There may be a need for your canister to have backward compatibility of it's data structures; new versions of your canister may need to read data written by previous versions. 
:::

Overall, if your canister plans to store gigabytes of state data and upgrade the code, it may be worth considering using stable memory for the primary storage despite the drawbacks of the approach. 

## Upgrading a canister 

### Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

This guide assumes you have an existing canister that you'd like to upgrade. To get an existing canister, review the previous documentation pages in this section. 

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
