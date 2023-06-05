# Calculator 

## Overview

This example demonstrates a basic calculator dapp. It uses an orthogonally persistent cell variable to store an arbitrary precision integer that represents the result of the most recent calculation.

The dapp provides an interface that exposes the following methods:

- `add`: accepts input and performs addition.
- `sub`: accepts input and performs subtraction.
- `mul`: accepts input and performs multiplication.
- `div`: accepts input, performs division, and returns an optional type to guard against division by zero.
- `clearall`: clears the cell variable by setting its value to zero.

This is a Motoko example that does not currently have a Rust variant. 


## Prerequisites
This example requires an installation of:

- [x] Install the [IC SDK](../developer-docs/setup/install/index.mdx).
- [x] Download the following project files from GitHub: https://github.com/dfinity/examples/

Begin by opening a terminal window.

### Step 1: Navigate into the folder containing the project's files and start a local instance of the Internet Computer with the command:

`cd examples/motoko/calc`
`dfx start --background`

### Step 2: Deploy the canister with the command:

`dfx deploy`

### Step 3: Run a calculator function. For example, to multiple 2 by 3:

```
dfx canister call calc add '(2)'
dfx canister call calc mul '(3)'
```

Output:

```
(2 : int)
(6 : int)
```

