# 2: Project organization

## Overview

When a new Rust project is created with the command:

```
dfx new --type rust example
```

the following project structure is generated: 

```
Cargo.lock
Cargo.toml
dfx.json
package.json
src
├── example_backend
│   ├── Cargo.toml
│   ├── example_backend.did
│   └── src
│       └── lib.rs
└── example_frontend
    ├── assets
    │   ├── favicon.ico
    │   ├── logo2.svg
    │   ├── main.css
    │   └── sample-asset.txt
    └── src
        ├── index.html
        └── index.js
webpack.config.js
```

In this structure, you can see the backend canister, in this case `example_backend` contains the following components:

src/example_backend:
```
│   ├── Cargo.toml //
│   ├── example_backend.did // The backend canister's Candid file. 
│   └── src 
│       └── lib.rs // The file containing your Rust smart contract.
```

### `dfx.json`

One of the template files included in your project directory is a default `dfx.json` configuration file. This file contains settings required to build a project for the Internet Computer blockchain much like the `Cargo.toml` file provides build and package management configuration details for Rust programs.

The configuration file should look like this:

```json
{
  "canisters": {
    "example_backend": {
      "candid": "src/example_backend/example_backend.did",
      "package": "example_backend",
      "type": "rust"
    },
    "example_frontend": {
      "dependencies": [
        "example_backend"
      ],
      "frontend": {
        "entrypoint": "src/example_frontend/src/index.html"
      },
      "source": [
        "src/example_frontend/assets",
        "dist/example_frontend/"
      ],
      "type": "assets"
    }
  },
  "defaults": {
    "build": {
      "args": "",
      "packtool": ""
    }
  },
  "version": 1
}
```

Notice that under the `canisters` key, you have some default settings for the `example_backend` canister.

-  `"type": "rust"` specifies that `example_backend` is a `rust` type canister.

-  `"candid": "src/example_backend/example_backend.did""` specifies the location of the Candid interface description file to use for the canister.

-  `"package": "example_backend"` specifies the package name of the Rust crate. It should be the same as in the crate `Cargo.toml` file.

### `Cargo.toml`

In the root directory, there is a `Cargo.toml` file.

It defines a Rust workspace by specifying paths to each Rust crate. A Rust type canister is just a Rust crate compiled to WebAssembly. Here we have one member at `src/example_backend` which is the only Rust canister.

``` toml
[workspace]
members = [
    "src/example_backend",
]
```

### `src/example_backend/`

Now we are in the Rust canister. As any standard Rust crate, it has a `Cargo.toml` file which configures the details to build the Rust crate.

#### `src/example_backend/Cargo.toml`

``` toml
[package]
name = "example_backend"
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

:::info
Notice the `crate-type = ["cdylib"]` line which is necessary to compile this Rust program into WebAssembly module.
:::

#### `src/example_backend/src/lib.rs`

The default project has a simple `greet` function that uses the Rust CDK `query` macro.

``` rust
#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

```

#### `src/example_backend/example_backend.did`

Candid is an interface description language (IDL) for interacting with canisters running on the Internet Computer. Candid files provide a language-independent description of a canister’s interfaces including the names, parameters, and result formats and data types for each function a canister defines.

By adding Candid files to your project, you can ensure that data is properly converted from its definition in Rust to run safely on the Internet Computer blockchain.

To see details about the Candid interface description language syntax, see the [*Candid Guide*](./../candid/index.md) or the [Candid crate documentation](https://docs.rs/candid/).

``` did
service : {
    "greet": (text) -> (text) query;
}

```

This definition specifies that the `greet` function is a `query` method which takes `text` data as input and returns `text` data.

## Declaring global variables

### Stable variables vs flexible variables

**Stable variables** are global variables that the system preserves across upgrades. For example, a user database should probably be stable.

**Flexible variables** are global variables that the system discards on code upgrade. For example, it is reasonable to make a cache flexible if keeping this cache hot is not critical for your product.

### Putting all global variables in one place

It is best practice to store all global variables privately in a single file; the canister main file. This approach is considered the best practice because:

- Testing your code is easier since the majority of your code won't interact with the global variables directly. 
- It is easier to understand how the global state is being used by the canister. 

It is also recommended that you add comments that within your code that specify which variables are stable, such as:

```rust
thread_local! {
    // static
    static USERS: RefCell<Users> = ... ;
    // flexible
    static LAST_ACTIVE: Cell<UserId> = ...;
}
```

## Canister interfaces
In comparison to Motoko, where the compiler automatically generates the corresponding Candid file, a different approach is recommended to Rust development. 

### Making the .did file the canister's source of truth
Your Candid file should be the main source of documentation for people who want to interact with your canister, including your colleagues who work on the front end portion. The interface should be stable, easy to find, and well documented, which is not something you can get automatically.

The following is an example of a .did file:

```
type TransferError = variant {
  // The debit account didn't have enough funds
  // for completing the transaction.
  InsufficientFunds : Balance;
  // ...
};
type TransferResult =
  variant { Ok : BlockHeight; Err : TransferError; };
service {
  // Transfer funds between accounts.
  transfer : (TransferArgs) -> (TransferResult);
}
```

For more information on Candid and to see the Rust equivalent of Candid types, please see the [Candid reference documentation](https://internetcomputer.org/docs/current/references/candid-ref). 

To make sure that your .did file and your implementation are in sync with one another, use the Candid tooling. There are macros in the Rust CDK that allow you to annotate your Canister methods and extract the .did file.

The latest versions of the Candid package have functions to check that one interface is a subtype of another interface, which is a Candid term for “backward compatible”.

### Using variant types to indicate error cases
Rust error types tend to make it easy to recover from errors correctly for API consumers, while Candid variants can help clients handle edge case errors more gracefully. Using variant types is also the preferred method of error handling in Motoko.

The following is an example of using variant types to indicate error cases:

```
type CreateEntityResult = variant {
  Ok  : record { entity_id : EntityId; };
  Err : opt variant {
    EntityAlreadyExists;
    NoSpaceLeftInThisShard;
  }
};
service : {
  create_entity : (EntityParams) -> (CreateEntityResult);
}
```

:::info
If a service method returns a result type, it can still reject the call. Therefore, there may not be much benefit from adding error variants like InvalidArgument or Unauthorized, as there is no meaningful way to recover from such errors programmatically. So rejecting malformed, invalid, or unauthorized requests is probably the right thing to do in most situations.
:::

## Next steps
Now let's get started setting up the Rust [developer environment](./3-dev-env.md).
