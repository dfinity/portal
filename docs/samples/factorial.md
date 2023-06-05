# Factorial

## Overview

This example demonstrates a recursive mathematical function that calculates the product of all positive integers less than or equal to its input.

This is a Motoko example that does not currently have a Rust variant. 


## Prerequisites
This example requires an installation of:

- [x] Install the [IC SDK](../developer-docs/setup/install/index.mdx).
- [x] Download the following project files from GitHub: https://github.com/dfinity/examples/

Begin by opening a terminal window.

### Step 1: Navigate into the folder containing the project's files and start a local instance of the Internet Computer with the command:

`cd examples/motoko/factorial`
`dfx start --background`

### Step 2: Deploy the canister:

```
dfx deploy
```

### Step 3: Calculate the factorial of 20:

`dfx canister call factorial fac '(20)'`

The following output will be returned: 

```
(2_432_902_008_176_640_000 : nat)
```