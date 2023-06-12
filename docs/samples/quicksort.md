# Quick sort

## Overview
This example implements the quick sort algorithm.

This is a Motoko example that does not currently have a Rust variant. 

## Prerequisites
This example requires an installation of:

- [x] Install the [IC SDK](../developer-docs/setup/install/index.mdx).
- [x] Download the following project files from GitHub: https://github.com/dfinity/examples/

Begin by opening a terminal window.

### Step 1: Navigate into the folder containing the project's files and start a local instance of the Internet Computer with the command:

```
cd examples/motoko/quicksort
dfx start --background
```

### Step 2: Deploy the canister:

```
dfx deploy
```

### Step 3: Sort an array of integers.

```
dfx canister call quicksort sort '(vec { 5; 3; 0; 9; 8; 2; 1; 4; 7; 6 })'
```

The output will resemble the following:

```
(
  vec {
    0 : int;
    1 : int;
    2 : int;
    3 : int;
    4 : int;
    5 : int;
    6 : int;
    7 : int;
    8 : int;
    9 : int;
  },
)
```