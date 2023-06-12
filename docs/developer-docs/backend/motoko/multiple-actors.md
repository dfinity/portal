# 9: Using multiple actors

## Overview
In this guide, you are going to create a project with multiple actors. Currently, you can only define one actor in a Motoko file and a single actor is always compiled to a single canister. You can, however, create **projects** that have multiple actors and can build multiple canisters from the same `dfx.json` configuration file.

For this guide, you are going to create separate program files for three actors in the same project. This project defines the following unrelated actors:

-   The `assistant` actor provides functions to add and show tasks in a to-do list.

    For simplicity, the code sample for this guide only includes the functions to add to-do items and to show the current list of to-do items that have been added. A more complete version of this canister—with additional functions for marking items as complete and removing items from the list—is available in the [examples](https://github.com/dfinity/examples/) repository as [simple to-do checklist](https://github.com/dfinity/examples/tree/master/motoko/simple-to-do).

-   The `rock_paper_scissors` actor provides a function for determining a winner in a hard-coded rock-paper-scissors contest.

    This code sample illustrates the basic use of `switch` and `case` in a Motoko program with hard-coded players and choices.

-   The `daemon` actor provides mock functions for starting and stopping a daemon.

    This code sample simply assigns a variable and prints messages for demonstration purposes.

## Prerequisites

Before starting the guide, verify the following:

-   [x] You have downloaded and installed the SDK package as described in the [download and install](/developer-docs/setup/install/index.mdx) page.

-   [x] You have stopped any local canister execution environment running on your computer.

## Create a new project

To create a new project for this guide:

- #### Step 1:  Open a terminal shell on your local computer, if you don’t already have one open.

- #### Step 2:  Change to the folder you are using for your Internet Computer projects, if you are using one.

- #### Step 3:  Create a new project by running the following command:

        dfx new multiple_actors

- #### Step 4:  Change to your project directory by running the following command:

        cd multiple_actors

## Modify the default configuration

You have already seen that creating a new project adds a default `dfx.json` configuration file to your project directory. For this guide, you need to add sections to this file to specify the location of each canister that defines an actor you want to build.

To modify the default `dfx.json` configuration file:

- #### Step 1:  Open the `dfx.json` configuration file in a text editor, then change the default `multiple_actors` canister name and source directory to `assistant`.

    For example, under the `canisters` key:

            "assistant": {
              "main": "src/assistant/main.mo",
              "type": "motoko"
            },

    Because you are going to add settings to this `canisters` section of the configuration file, you must also add a **comma** after the curly brace that encloses the location of the `assistant` main source code file and the canister type.

- #### Step 2:  Remove the `multiple_actors_assets` section from the file.

- #### Step 3:  Add a new canister name, source code location, and canister type for the `rock_paper_scissors` canister and a new canister name, source code location, and canister type for the `daemon` program files below the `assistant` canister definition.

    After making the changes, the `canisters` section of the `dfx.json` file should look similar to [this](./_attachments/multiple-actors-dfx.json).

    You can leave the other sections as-is.

- #### Step 4:  Save your changes and close the `dfx.json` file to continue.

- #### Step 5:  Change the name of the default source file directory to match the name specified in the `dfx.json` configuration file by running the following command:

        cp -r src/multiple_actors/ src/assistant/

- #### Step 6:  Copy the `assistant` source file directory to create the main canister file for the `rock_paper_scissors` actor by running the following command:

        cp -r src/assistant/ src/rock_paper_scissors/

- #### Step 7:  Copy the `assistant` source file directory to create the main canister file for the `daemon` actor by running the following command:

        cp -r src/assistant/ src/daemon/

## Modify the default canisters

You now have three separate directories in the `src` directory, each with a template `main.mo` file. For this guide, you will replace the content in each template `main.mo` file with a different actor.

To modify the default source code:

- #### Step 1:  Open the `src/assistant/main.mo` file in a text editor and delete the existing content.

- #### Step 2:  Copy and paste [this code](./_attachments/multiple-actors-assistant-main.mo) into the file.

- #### Step 3:  Save your changes and close the `main.mo` file to continue.

- #### Step 4:  Open the `src/rock_paper_scissors/main.mo` file in a text editor and delete the existing content.

- #### Step 5:  Copy and paste [this code](./_attachments/multiple-actors-rock-main.mo) into the file.

- #### Step 6:  Save your changes and close the `main.mo` file to continue.

- #### Step 7:  Open the `src/daemon/main.mo` file in a text editor and delete the existing content.

- #### Step 8:  Copy and paste [this code](./_attachments/multiple-actors-daemon-main.mo) into the file.

- #### Step 9:  Save your changes and close the `main.mo` file to continue.

## Start the local canister execution environment

Before you can install the `multiple_actors` project locally, you need to start your local canister execution environment. If you intend to deploy it to the Internet Computer blockchain mainnet, then you can skip this section.

To start the local canister execution environment:

- #### Step 1:  Open a new terminal window or tab on your local computer.

- #### Step 2:  Navigate to the root directory for your project, if necessary.

- #### Step 3:  Start the local canister execution environment by running the following command:

        dfx start

- #### Step 4:  Leave the terminal that displays canister execution operations open and switch your focus to your original terminal where you created your new project.

## Deploy your multi-canister dapp

To deploy the multi-canister dapp you need to register, build, and install the canisters either to the local canister execution environment or to the Internet Computer blockchain mainnet.

To deploy the dapp locally:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Register, build, and deploy the application by running the following command:

        dfx deploy

To deploy the dapp on the Internet Computer blockchain mainnet:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Run `dfx deploy` command specifying the `--network` option and the network alias configured in the `dfx.json` file. For example, if you are connecting to the Internet Computer mainnet using to the URL specified by the network alias `ic` you would run a command similar the following:

        dfx deploy --network ic

The `dfx deploy` command output displays information about the operations it performs. For example, the command displays the specific canister identifiers for the three canisters defined in the `dfx.json` configuration file.

    Deploying all canisters.
    Creating canisters...
    Creating canister "assistant"...
    "assistant" canister created with canister id: "75hes-oqbaa-aaaaa-aaaaa-aaaaa-aaaaa-aaaaa-q"
    Creating canister "daemon"...
    "daemon" canister created with canister id: "cxeji-wacaa-aaaaa-aaaaa-aaaaa-aaaaa-aaaaa-q"
    Creating canister "rock_paper_scissors"...
    "rock_paper_scissors" canister created with canister id: "7kncf-oidaa-aaaaa-aaaaa-aaaaa-aaaaa-aaaaa-q"

## Verify deployment by calling the canisters

You now have three **canisters** smart contracts deployed, either on your local canister execution environment or on the Internet Computer blockchain mainnet, and can test them by using `dfx canister call` commands.

To test the canisters you have deployed locally:

- #### Step 1:  Use the `dfx canister call` command to call the canister `assistant` using the `addTodo` function and pass it the task you want to add by running the following command:

        dfx canister call assistant addTodo '("Schedule monthly demos")'

- #### Step 2:  Verify that the command returns the to-do list item using the `showTodos` function by running the following command:

        dfx canister call assistant showTodos

    The command returns output similar to the following:

        ("
        ___TO-DOs___
        (1) Schedule monthly demos")

- #### Step 3:  Use the `dfx canister call` command to call the canister `rock_paper_scissors` using the `contest` function by running the following command:

        dfx canister call rock_paper_scissors contest

    The command returns the result of the hard-coded contest similar to the following:

        ("Bob won")

- #### Step 4:  Use the `dfx canister call` command to call the canister `daemon` using the `launch` function by running the following command:

        dfx canister call daemon launch

- #### Step 5:  Verify the mock `launch` function returns "The daemon process is running" message:

        (""The daemon process is running"")

To test your canisters running on the Internet Computer blockchain mainnet use the same command as above, specifying the `--network` option and the network alias configured in the `dfx.json` file.

## Stop the local network

After you finish experimenting with your dapp, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local canister execution environment:

- #### Step 1:  In the terminal that displays network operations, press Control-C to interrupt the local network process.

- #### Step 2:  Stop the local canister execution environment by running the following command:

        dfx stop
