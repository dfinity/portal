# 12: Making inter-canister calls

## Overview
One of the most important features of the Internet Computer blockchain for developers is the ability to call functions in one canister from another canister. This capability to make calls between canisters—also sometimes referred to as **inter-canister calls**—enables you to reuse and share functionality in multiple dapps.

For example, you might want to create a dapp for professional networking, organizing community events, or hosting fundraising activities. Each of these dapps might have a social component that enables users to identify social relationships based on some criteria or shared interest, such as friends and family or current and former colleagues.

To address this social component, you might want to create a single canister for storing user relationships then write your professional networking, community organizing, or fundraising application to import and call functions that are defined in the canister for social connections. You could then build additional applications to use the social connections canister or extend the features provided by the social connections canister to make it useful to an even broader community of other developers.

This example will showcase a simple way to configure inter-canister calls that can be used as the foundation for more elaborate projects and use-cases such as those mentioned above. 


## Prerequisites

Before following this guide, assure that you have the necessary dependencies in your environment:

-   [x] Download and install the IC SDK package as described in the [download and install](/developer-docs/setup/install/index.mdx) page.

-   [x] Stop any local canister execution environments running on the computer.

### Step 1:  Open a terminal shell on your local computer, if you don’t already have one open.

### Step 2:  Change to the folder you are using for your Internet Computer projects, if you are using one.

### Step 3: Create a new dfx project with the command:

```
dfx new intercanister
```

### Step 4: Navigate into the project's directory:

```
cd intercanister
```

### Step 5: Create two new directories under the `src` directory for your new canisters:

```
mkdir src/canister1
mkdir src/canister2
```

### Step 6: Create a new file, `src/canister1/main.mo`.

In this file, insert the following code:

```
import Canister2 "canister:canister2";

actor {
    public func main() : async Nat {
        return await Canister2.getValue();
    };
};
```

### Step 7: Then, create another new file, `src/canister2/main.mo`.

In this file, insert the following code:

```
import Prim "mo:prim";

actor {
    public func getValue() : async Nat {
        Prim.debugPrint("Hello from canister 2!");
        return 10;
    };
};
```

### Step 8: Open the `dfx.json` file and delete the existing content.

Then, insert the following code:

```
{
 "canisters": {
  "canister1": {
    "main": "src/canister1/main.mo",
    "type": "motoko"
  },
  "canister2": {
    "main": "src/canister2/main.mo",
    "type": "motoko"
  }
},
  "defaults": {
    "build": {
      "args": "",
      "packtool": ""
    }
  },
  "output_env_file": ".env",
  "version": 1
}
```

### Step 9:  Start the local canister execution environment on your local computer by running the following command:

        dfx start --clean

    For this guide, we’re using the `--clean` option to start the local canister execution environment in a clean state.

    This option removes any orphan background processes or canister identifiers that might disrupt normal operations. For example, if you forgot to issue a `dfx stop` when moving between projects, you might have a process running in the background or in another terminal. The `--clean` option ensures that you can start the local canister execution environment and continue to the next step without manually finding and terminating any running processes.

### Step 10: Deploy your project. 

Deploy your new canisters with the command:

```
dfx deploy
```

### Step 11: Use the following command to make a call from canister1 to canister2:

```
dfx canister call canister1 main 
```

The output should resemble the following:

```
2023-06-15 15:53:39.567801 UTC: [Canister ajuq4-ruaaa-aaaaa-qaaga-cai] Hello from canister 2!
(10 : nat)
```

### Step 12: Using a previously deployed canister.

Alternatively, you can also use a canister id to access a previously deployed canister by using the following piece of code in the `src/canister1/main.mo` file:

```
actor {
    public func main(canisterId: Text) : async Nat {
        let canister2 = actor(canisterId): actor { getValue: () -> async Nat };
        return await canister2.getValue();
    };
};
```

Then, use the following call, replacing `canisterID` with the principal ID of a previously deployed canister:

```
dfx canister call canister1 main "canisterID"
```

For example, for a canister with the principal ID of `ajuq4-ruaaa-aaaaa-qaaga-cai`, which is the principal ID of `canister2` that we used earlier:

```
dfx canister call canister1 main "ajuq4-ruaaa-aaaaa-qaaga-cai"
```