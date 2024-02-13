# Deploy

## Overview

After you have built a canister, you can deploy it either on the local execution environment or on the mainnet. Your canister must be deployed before you can make calls to it and execute methods. 

- #### Step 1:  Open a new terminal and navigate to your project directory.

- #### Step 2:  Start the local canister execution environment, if necessary.

```
dfx start
```

- #### Step 3:  Verify the canisters you'd like to deploy are configured in the project's `dfx.json` file.

An example `dfx.json` file can be found in the [default project template document](/docs/current/developer-docs/setup/first-canister)

- #### Step 4:  Deploy all of the canisters within your project by running the following command:

```
dfx deploy 
```

This command deploys all canisters configured in your `dfx.json` file. To deploy just one canister, specify the canister's name:

```
dfx deploy hello_backend
```

These commands both deploy to the local network since they do not include a `--network` flag. 

For more information on deploying to the local or mainnet networks:

- [Local deployment](/docs/current/developer-docs/setup/deploy-locally).

- [Mainnet deployment](/docs/current/developer-docs/setup/deploy-mainnet).

- #### Step 5: To deploy your canisters to the mainnet, use the `--network ic` flag:

```
dfx deploy --network ic
```

Deploying canisters to the mainnet will cost cycles. [Learn more about cycles and how to acquire them](/docs/current/developer-docs/setup/cycles/cycles-faucet).

## Use a custom Motoko version with `dfx deploy`

To use a custom Motoko version with `dfx deploy`, export the following environment variable:

```
DFX_MOC_PATH="$(vessel bin)/moc" dfx deploy
```

## Setting a canister's init arguments

You can set a canister's init arguments when the canister is deployed by passing the `--argument` flag in either the `dfx install` or `dfx deploy` commands:

```
dfx canister install <CANISTER_NAME> --argument "(arg in candid)"
```

```
dfx deploy <CANISTER_NAME> --argument "(arg in candid)"
```

If several arguments should be used, an argument file can be defined with the `--argument-file` flag instead:

```
dfx deploy <CANISTER_NAME> --argument-file file.txt
```

Alternatively, init arguments can be set in `dfx.json` in `dfx` versions `v0.17.0` and newer:

```json
"canisters": {
    "hello_backend": {
      "candid": "src/hello_backend/hello_backend.did",
      "package": "hello_backend",
      "type": "rust",
      "init_arg": "(arg in candid)"
    },
```

If an init argument is set in `dfx.json` and set with the CLI command, the argument set in the CLI command is used.

## Setting tasks to execute once a canister has been deployed


