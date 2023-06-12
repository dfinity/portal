# Troubleshooting resources

## Overview

This section provides information to help you troubleshoot and resolve or work around common issues that are related to the following tasks:

-   Downloading and installing the IC SDK.

-   Creating, building, or deploying canisters.

-   Using the [IC SDK](../setup/install/index.mdx).

-   Running the local canister execution environment.

## Migrating an existing project

Currently, there is no automatic migration or backward compatibility for any projects that you might have created using previous versions of the IC SDK. After upgrading to the latest version, you might see error or failure messages if you attempt to build or install a project created with a previous version of the IC SDK.

In many cases, however, you can continue to work with projects from a previous release by manually changing the `dfx` setting in the `dfx.json` configuration file, then rebuilding the project to be compatible with the version of the IC SDK you have currently installed.

For example, if you have a project that was created with IC SDK version `0.8.0`, open the `dfx.json` file in a text editor and change the `dfx` setting to the latest version or remove the section entirely.

## Restarting the local canister execution environment

In some cases, starting the local canister execution environment fails due to stale state. If you encounter issues when running `dfx start` to start the local canister execution environment:

- #### Step 1:  In the terminal that displays the IC emulation the execution environment uses, press Control-C to interrupt the local canister execution environment process.

- #### Step 2:  Stop the local canister execution environment by running the following command:

        dfx stop

- #### Step 3:  Restart the local canister execution environment in a clean state by running the following command:

        dfx start --clean

    The `--clean` option removes checkpoints and stale state information from your project’s cache so that you can restart the local canister execution environment and web server processes in a clean state.

:::caution
Keep in mind, however, that if you reset the state information by running `dfx start --clean`, your existing canisters are also removed.
:::

- #### Step 4: After running `dfx start --clean`, recreate your canisters by running the following commands:

    dfx canister create --all
    dfx build
    dfx canister install --all

## Removing the canisters directory

If you run into problems building or deploying canisters after successfully connecting to the IC and registering canister identifiers, you should remove the `canisters` directory before attempting to rebuild or redeploy the canisters.

You can remove the `canisters` directory for a project by running the following command in the project’s root directory:

    rm -rf ./.dfx/* canisters/*

## Reinstalling dfx

Many of the bugs you might encounter can be addressed by uninstalling and reinstalling the IC SDK. Here are a few ways to reinstall the IC SDK.

If you only have one version of the IC SDK installed in your development environment, you can usually run the following command to uninstall and reinstall the latest version of IC SDK:

    ~/.cache/dfinity/uninstall.sh && sh -ci "$(curl -sSL https://internetcomputer.org/install.sh)"

If you have modified the location of the IC SDK binary (the binary is titled `dfx`), you might want run the following command to uninstall the version of the IC SDK that is in your PATH, then reinstall the latest version of the IC SDK:

    rm -rf ~/.cache/dfinity && rm $(which dfx) && sh -ci "$(curl -sSL https://internetcomputer.org/install.sh)"

## Xcode prerequisite

Some versions of the IC SDK prompted you to install Xcode when creating a new project on a macOS computer. The prompt has been removed and the `dfx new` command does not require you to install any macOS developer tools. However, you should have **Developer Command Line Tools** installed if you want to create a Git repository for your project.

You can check whether you have the developer tools installed by running `xcode-select -p`. You can install the developer tools by running `xcode-select --install`.

## Apple ARM silicon
If you are using a Mac with Apple silicon and are having issues (such as `bad CPU type in executable: dfx`), you may need to install Rosetta.

```shell
softwareupdate --install-rosetta 
```

## Failed build when using VMs

If you are running the IC SDK using a virtual machine image on Ubuntu or CentOS, you might see an error message that looks like this when you attempt to run the `dfx build` command:

    Building hello...
    An error occurred:
    Io(
        Os {
            code: 2,
            kind: NotFound,
            message: "No such file or directory",
        },
    )

## Address in use error or orphan processes

If you are developing projects locally, you often have the local canister execution environment running either in a separate terminal or in the background. If the local environment processes do not get properly terminated, you might see operating system errors indicating that an address is already in use or or be unable to stop processes normally using the `dfx stop` command.

There are several scenarios in which you might encounter this issue. For example, if you run `dfx start` in a local project directory then change to a different local project directory without first stopping the canister execution environment processes, you might see this issue.

If you encounter an issue where you suspect or you receive a message that an address is already in use or that a process is already running in the background, perform the following steps:

- #### Step 1:  Run the following command to see which process is listening to the 4943 port if you are using the default binding to localhost:

        lsof -i tcp:4943

- #### Step 2:  Run the following command to terminate any orphan processes:

        killall dfx replica

- #### Step 3:  Close the current terminal and open a new terminal window.

- #### Step 4:  In the new terminal, run the following command to run the local canister execution environment in a clean state:

        dfx start --clean --background

## Memory leak

Fixing memory leaks is an ongoing process. If you encounter any error messages related to memory leaks, you should do the following:

- #### Step 1:  Run `dfx stop` to stop currently running processes.

- #### Step 2:  Uninstall the IC SDK to prevent further degradation.

- #### Step 3:  Re-install the IC SDK

- #### Step 4:  Run `dfx start` to restart replica processes.

Alternatively, you can remove the `.cache/dfinity` directory and re-install the latest IC SDK `dfx` binary. For example:

    rm -rf ~/.cache/dfinity && sh -ci "$(curl -sSL https://internetcomputer.org/install.sh)"
