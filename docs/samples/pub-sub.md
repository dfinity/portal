# PubSub

## Overview
This sample project demonstrates how functions may be passed as arguments of inter-canister calls to be used as callbacks.

A common problem in both distributed and decentralized systems is keeping separate services (or canisters) synchronized with one another. While there are many potential solutions to this problem, a popular one is the Publisher/Subscriber pattern or "PubSub". PubSub is an especially valuable pattern on the Internet Computer as its primary drawback, message delivery failures, does not apply.

## Prerequisites
This example requires an installation of:

- [x] Install the [IC SDK](../developer-docs/setup/install/index.mdx).
- [x] Download the following project files from GitHub: https://github.com/dfinity/examples/

Begin by opening a terminal window.

### Step 1: Navigate into the folder containing the project's files and start a local instance of the Internet Computer with the command:

`cd examples/motoko/pub-sub`
`dfx start --background`

### Step 2: Deploy the canister:

```
dfx deploy
```

### Step 3: Subscribe to the "Apples" topic:

`dfx canister call sub init '("Apples")'`

### Step 4: Publish to the "Apples" topic:

`dfx canister call pub publish '(record { "topic" = "Apples"; "value" = 2 })'`

### Step 5: Receive your subscription:

`dfx canister call sub getCount`

The output should resemble the following:

```
(2 : nat)
```