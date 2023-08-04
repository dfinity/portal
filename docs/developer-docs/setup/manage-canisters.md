# Managing canisters

## Overview

If you have experimented with using the IC SDK by following the tutorials in this section or by cloning examples from the [examples](https://github.com/dfinity/examples) repository, you are already familiar with how to build and deploy programs as **canisters**. This section provides additional information about the canister lifecycle and how to manage canisters.

## Obtaining a canister identifier

Depending on your preferred development workflow, you can obtain a unique identifier for your canister, before or after you have a program ready to compile. For example, if you want to reserve a unique identifier for your canister on a subnet before you have written any code, you can do so by running the `dfx canister create` command. This command essentially creates an empty canister placeholder into which you can later install your code. The resulting canister will obtain a unique identifier.

To obtain a unique identifier for a canister:

- #### Step 1:  Open a new terminal window or tab on your computer.

- #### Step 2:  Create a new project for the canister you plan to create by running a command similar to the following:

        dfx new YOUR-PROJECT-NAME

    Note that the name you use for the project is also used as the canister name by default.

- #### Step 3:  Change to your new project directory.

- #### Step 4:  Open the `dfx.json` configuration file and set the host and port for the canister execution environment you want to use (e.g. the IC blockchain).

    If you are using a local deployment, you can skip this step.

    You can also optionally change the names of your canisters or add canister settings to the configuration file if you want to create identifiers for any additional canisters you think you will need before compiling code.

- #### Step 5:  Start the local canister execution environment, if necessary, by running the following command:

        dfx start --background

    In most cases, this step is only necessary if you are running the canisters locally.

    If you were registering canisters to run on a remote execution environment, e.g. the IC blockchain, you would include the `--network` command-line option to perform tasks on the environment specified under this parameter.

- #### Step 6:  Register unique identifiers for the canisters defined in the `dfx.json` by running the following command:

        dfx canister create --all

    The command creates the `.dfx/local` directory and adds the `canister_ids.json` file to that directory for the project.

## Build a canister with a local identifier

After you have written source code for your project, you need to compile it into a WebAssembly module before deploying it as a canister.

If you are only compiling your project for local debugging, you can generate a locally-defined identifier for your project.

To generate a locally-defined identifier:

- #### Step 1:  Create a project with the configuration settings and program logic to suit your needs.

- #### Step 2:  Start the local canister execution environment, if necessary.

    If you were compiling canisters to run on a remote execution environment, e.g. the IC blockchain, you would include the `--network` command-line option to perform tasks on the environment specified under this parameter.

- #### Step 3:  Generate hard-coded local identifiers for the canisters defined in the `dfx.json` by running the following command:

        dfx build --check

    Note that you must register unique canister identifiers to replace your locally-defined identifier before you can deploy the project on the IC blockchain.

## Deploy canisters

After you have compiled a program, you can install the compiled code in a canister running either on a local canister execution environment or on the IC blockchain.

The canister identifier that was created in advance or during the build process determines where your code is installed during deployment.

To deploy the code for the first time:

- #### Step 1:  Open a new terminal and navigate to your project directory.

- #### Step 2:  Start the local canister execution environment, if necessary.

    In most cases, this step is only necessary if you are running the canisters locally.

    If you were registering canisters to run on a remote execution environment, e.g. the IC blockchain, you would include the `--network` command-line option to perform tasks on the environment specified under this parameter.

- #### Step 3:  Verify you have canister identifiers for all of the canisters you want to deploy.

- #### Step 4:  Deploy all of the canisters by running the following command:

        dfx canister install --all

## Look up a canister ID

All canisters have unique identifiers. You often need to use these identifiers to interact with the canister. For example, if you want to access the frontend canister for a dapp or interact with a service using the Candid web interface, you must specify the appropriate canister identifier.

Because the identifiers are specific to the environment where the canisters are deployed, the files used to store the information are in different directories. For example, identifiers for a canister deployed locally are located in the project’s `.dfx/local/canister_ids.json` file.

You can look up the canister identifier for any specific canister by running the `dfx canister id` command. For example, to look up the the canister identifier for the `lookup` canister deployed on the local canister execution environment, you could run the following command:

    dfx canister id lookup

To look up the canister identifier for the same canister deployed on the environment specified by the `ic` alias, you would run the following command:

    dfx canister --network=ic id lookup

## Add a wallet for existing canisters

When you are doing local development, creating a new project automatically creates a default wallet for you to use with the canisters in that project. If you want to add a wallet for projects with canisters that you have previously created, you can force `dfx` to generate one by taking a couple of manual steps.

To add a wallet for use with an existing canister:

- #### Step 1:  Open a terminal and navigate to your project directory.

- #### Step 2:  Stop the local canister execution environment, if necessary, by running the following command:

        dfx stop

- #### Step 3:  Delete the `.dfx` directory.

- #### Step 4:  Start the local canister execution environment network by running the following command:

        dfx start --clean

## Reinstall a canister

During the development cycle, you might want to install, then update your program as you debug and improve it.

In this scenario, you might want to keep the canister identifier you have registered but without preserving any of the canister code or state. For example, your canister might only have test data that you don’t want to keep or you might have decided to change the program altogether. In these scenarios, you may want to reinstall under a canister identifier you used to install a previous program.

To reinstall a canister:

- #### Step 1:  Open a new terminal and navigate to your project directory.

- #### Step 2:  Start the local canister execution environment, if necessary.

    In most cases, this step is only necessary if you are running the canisters locally.

    If you were registering canisters to run on a remote execution environment, e.g. the IC blockchain, you would include the `--network` command-line option to perform tasks on the environment specified under this parameter.

- #### Step 3:  Verify you have canister identifiers for all of the canisters you want to re-deploy.

- #### Step 4:  Re-deploy all of the canisters by running the following command for every canister:

        dfx canister install <canister id or name> --mode reinstall

Note that you can use the `reinstall` mode to replace any canister, regardless of whether the canister has code or state associated with it.

## Set an identity to own a canister

In most cases, a `default` user identity is created for you automatically the first time you run the `dfx canister create` command. This default identity consists of the public and private key pair generated for your local user account. Typically, this `default` identity is also the default owner of all of the projects you create and all of the canisters you deploy. You can, however, proactively create and use identities of your choice to circumvent the `default` user identity from being used.

As an example, the following scenario illustrates creating a `registered_owner` identity that is then used to register, build, deploy, and call the `pubs` project.

To set an identity for a project:

- #### Step 1:  Create a new project by running the following command:

        dfx new project

- #### Step 2:  Change to the project directory by running the following command:

        cd project

- #### Step 3:  Start the local canister execution environment in the background by running the following command:

        dfx start --background

- #### Step 4:  Create a new `registered_owner` identity by running the following command:

        dfx identity new registered_owner

- #### Step 5:  Set the active user context to use the `registered_owner` identity by running the following command:

        dfx identity use registered_owner

- #### Step 6:  Register, build, and deploy canisters for the project by running the following commands:

        dfx canister create --all
        dfx build --all
        dfx canister install --all

    These commands run using the `registered_owner` identity, making that user the owner of the canisters deployed.

- #### Step 7:  Call the `greet` function from your project's *`_backend` canister to verify a successful deployment by running the following command:

        dfx canister call project_backend greet '("Sam")'

## Managing the running state of a canister

After you deploy a canister, it can begin receiving and processing requests from users and from other canisters. Canisters that are available to send requests and receive replies are considered in be in a **Running** state.

Although canisters are normally placed in the Running state by default, there are cases where you might want to temporarily or permanently stop a canister. For example, you might want to stop a canister before upgrading it. Stopping a canister helps to ensure proper handling of any messages that are in progress and need to either run to completion or be rolled back. You might also want to stop a canister to clear its message queue cleanly as a prerequisite to deleting the canister.

You can check the current status of all canisters or a specified canister by running the `dfx canister status` command. For example, to see the status for all canisters running on the local canister execution environment, you would run the following command:

    dfx canister status --all

This command returns output similar to the following if canisters are currently running:

    Canister status_check's status is Running.
    Canister status_check_assets's status is Running.

You can stop canisters that are currently running by running the `dfx canister stop` command.

    dfx canister stop --all

This command displays output similar to the following:

    Stopping code for canister status_check, with canister_id 75hes-oqbaa-aaaaa-aaaaa-aaaaa-aaaaa-aaaaa-q
    Stopping code for canister status_check_assets, with canister_id cxeji-wacaa-aaaaa-aaaaa-aaaaa-aaaaa-aaaaa-q

If you were to rerun the `dfx canister status` command, you might see a status of `Stopped` indicating that there were no pending messages that needed to processed or a status of `Stopping` indicating that there were messages in-flight that needed to be addressed.

To restart a canister-for example, after a successful canister upgrade—you can run the `dfx canister start` command. For example, to restart all of the canisters, you would run the following command:

    dfx canister start --all

This command displays output similar to the following:

    Starting code for canister status_check, with canister_id 75hes-oqbaa-aaaaa-aaaaa-aaaaa-aaaaa-aaaaa-q
    Starting code for canister status_check_assets, with canister_id cxeji-wacaa-aaaaa-aaaaa-aaaaa-aaaaa-aaaaa-q

## Upgrade a canister

Unlike a canister reinstall that preserves the canister identifier but no state, a canister upgrade enables you to preserve the state of a deployed canister, and change the code.

For example, assume you have a dapp that manages professional profiles and social connections. If you want to add a new feature to the dapp, you need to be able to update the canister code without losing any of the previously-stored data. A canister upgrade enables you to update existing canister identifiers with program changes without losing the program state.

To preserve state when you are upgrading a canister written in Motoko, be sure to use the `stable` keyword to identify the variables you want to preserve. For more information about preserving variable state in Motoko, see [stable variables and upgrade methods](/motoko/main/upgrades.md). If you are upgrading a canister written in Rust, you should use `pre_upgrade` and `post_upgrade` functions as illustrated in the [Rust CDK asset storage](https://github.com/dfinity/cdk-rs/blob/master/examples/asset_storage/src/asset_storage_rs/lib.rs) example to ensure data is properly preserved after a canister upgrade.

To upgrade a canister:

- #### Step 1:  Open a new terminal and navigate to your project directory.

- #### Step 2:  Start the local canister execution environment, if necessary.

    In most cases, this step is only necessary if you are running the canisters locally.

    If you were registering canisters to run on a remote execution environment, e.g. the IC blockchain, you would include the `--network` command-line option to perform tasks on the environment specified under this parameter.

- #### Step 3:  Verify you have canister identifiers for all of the canisters you want to upgrade.

    Note that your program must identify the variables for which to maintain state by using the `stable` keyword in the variable declaration.

    For more information about declaring stable variables, see the [**Motoko documentation**](../../motoko/main/stablememory.md).

- #### Step 4:  Upgrade all of the canisters by running the following command:

        dfx canister install --all --mode upgrade

## Delete a canister

If you want to permanently delete a specific canister or all canisters for a specific project on a given deployment (either local, or remote), you can do so by running the command:
 
```
dfx canister delete <canister-name>
```

Deleting a canister removes the canister identifier, code, and state. Before you can delete a canister, however, you must first stop the canister to clear any pending message requests or replies.

## Delete all canisters

To delete all canisters for a project:

- #### Step 1:  Open a new terminal and navigate to your project directory.

- #### Step 2:  Start the local canister execution environment, if necessary.

    In most cases, this step is only necessary if you are running the canisters locally.

    If you were deleting canisters to run on a remote execution environment, e.g. the IC blockchain, you would include the `--network` command-line option to perform tasks on the environment specified under this parameter.

- #### Step 3:  Check the status of the project canisters running on the local canister execution environment by running the following command:

        dfx canister status --all

- #### Step 4:  Stop all of the project canisters by running the following command:

        dfx canister stop --all

- #### Step 5:  Delete all of the project canisters by running the following command:

        dfx canister delete --all

## Resources

-   [Building on the IC](../../samples/overview.md) to explore sample dapps.

-   [Concepts](../../concepts/index.md) to learn about different IC concepts and services.  

-   [IC glossary](../../references/glossary.md) to learn the definitions of various terms used within the IC. 
