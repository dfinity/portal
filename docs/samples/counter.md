# Counter

## Overview

This example demonstrates a counter application. It uses an orthogonally persistent counter variable to store an arbitrary precision natural number that represents the current value of the counter.

By using the Motoko keyword stable when declaring the counter variable, the value of this variable will automatically be preserved whenever your canister code is upgraded. Without the stable keyword, a variable is deemed flexible, and its value is reinitialized on every canister upgrade, i.e. whenever new code is deployed to the canister.

The application provides an interface that exposes the following methods:

- `set`: sets the value of the counter.
- `inc`: increments the value of the counter.
- `get`: gets the value of the counter.

## Motoko variant

### Prerequisites
This example requires an installation of:

- [x] Install the [IC SDK](../developer-docs/setup/install/index.mdx).
- [x] Download the following project files from GitHub: https://github.com/dfinity/examples/

Begin by opening a terminal window.

- #### Step 1: Navigate into the folder containing the project's files and start a local instance of the Internet Computer with the command:

`cd examples/motoko/counter`
`dfx start --background`

- #### Step 2: Deploy the canister:

```
dfx deploy
```

- #### Step 3: Set the value of the counter:

```
dfx canister call counter set '(7)'
```

- #### Step 4: Increment the value of the counter:

```
dfx canister call counter inc
```

- #### Step 5: Get the value of the counter:

```
dfx canister call counter get
```

The following output should be returned:

```
(8 : nat)
```

### Resources
To learn more about these features of Motoko, see:

- [Orthogonal persistence](../motoko/main/motoko#orthogonal-persistence).
- [Declaring stable values](../motoko/main/upgrades#declaring-stable-variables).

## Rust variant

### Prerequisites
This example requires an installation of:

- [x] Install the [IC SDK](../developer-docs/setup/install/index.mdx).
- [x] Download the following project files from GitHub: https://github.com/dfinity/examples/

Begin by opening a terminal window.

- #### Step 1: Navigate into the folder containing the project's files and start a local instance of the Internet Computer with the command:

`cd examples/rust/counter`
`dfx start --background`

- #### Step 2: Test the canister:

```
cargo test
```

- #### Step 3: Deploy the canister:

```
dfx deploy
```

- #### Step 4: Set the value of the counter:

```
dfx canister call counter set '(7)'
```

- #### Step 5: Increment the value of the counter:

```
dfx canister call counter inc
```

- #### Step 6: Get the value of the counter:

```
dfx canister call counter get
```

The following output should be returned:

```
(8 : nat)
```

