# Who am I?

## Overview

This example demonstrates how a canister can identify its caller and itself.

## Prerequisites

This example requires an installation of:

- [x] Install the [IC SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/index.mdx).
- [x] Download the following project files from GitHub: https://github.com/dfinity/examples/

Begin by opening a terminal window.

### Step 1: Navigate into the folder containing the project's files and start a local instance of the Internet Computer with the command:

```
cd examples/motoko/whoami
dfx start --background
```

### Step 2: Build and deploy the canister:

```
dfx canister install whoami --argument='(principal "2mxjj-pyyts-rk2hl-2xyka-avylz-dfama-pqui5-pwrhx-wtq2x-xl5lj-qqe")'
dfx build
dfx deploy
```

### Step 3: Invoke the `whoami` method:

```
dfx canister call whoami whoami
```

### Step 4: Observe your principal identifier.

### Step 5: Invoke the `id` method:

```
dfx canister call whoami id
```

### Step 6: Observe the principal identifier of your canister.

