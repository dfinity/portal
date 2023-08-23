# 0.3: Developer environment setup

## Overview

Before we can begin our developer journey, we need to set up our developer environment. A developer environment consists of tools and packages that are required to develop code projects. Usually, developer environments are stored and hosted on your local computer, but there are some situations where a virtual, web-based development environment exists. 

An example of this is the [Motoko Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.ic0.app/), which is a web-based, virtual developer environment that can be used by developers without having to set up a local environment. The Motoko Playground has several restrictions, however, and it isn't recommended to be used for workflows other than simple, small-scale testing. 

## Setting up your developer environment

### Confirm you have a connection to the internet

To follow along with the developer journey and develop on the Internet Computer, you will need a connection to the internet. 

#### Why does this matter?

You will need an internet connection to download a few different tools and packages, as described further in this document. You will also need an internet connection whenever you plan to deploy your canister to the mainnet. You do not need an internet connection to deploy your canister to your local execution environment.

### Confirm you have access to a command line interface (CLI) on your local macOS or Linux computer

Open a command line interface (CLI) window. This may be referred to as 'Terminal' or 'Shell' depending on your computer's operating system. In this documentation, this is often referred to as the 'terminal window'. 

#### Why does this matter?

We will primarily be using CLI-based tools, such as `dfx` and `git`, in this developer journey. 

#### Options for Windows users

`dfx` is not natively supported on Windows. To download `dfx` on Windows, you will need to download the Windows Subsystem for Linux. You can learn more [here](/docs/developer-docs/setup/install/index.mdx).

### Download and install the IC SDK

To download and install the IC SDK, first open a terminal window. Then, run the following command in that window:

```
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

This command will prompt you to read and accept the license agreement before the install begins. Type `y`, then press `Return` to accept the agreement and begin the installation. 

:::info
If you are using a machine running Apple silicon, you will need to have Rosetta installed. You can install [Rosetta](https://support.apple.com/en-us/HT211861) by running `softwareupdate --install-rosetta` in your terminal.
:::

Then, to verify that the IC SDK is ready to use, run the following command:

```
dfx --version
```

This command should output information about the latest version of `dfx`. This output indicates that the installation has been successful, and that `dfx` is ready to use. 

#### Why does this matter?

The IC SDK is composed of several components that are required for developing on the Internet Computer. These components are:

- `dfx`: The CLI tool used to interact with and develop canisters on the IC. Motoko is included in the installation of dfx. 
- `moc`: The Motoko runtime compiler. 
- `replica`: The Internet Computer's local network binary. 

### Download and install a code editor

To write and edit code, you will need a code editor. macOS and Linux systems come with some basic editors, such as `vi` or `nano`, but these have very limited functionality and can be hard to use. 

We recommend you use [Visual Studio Code](https://code.visualstudio.com/download), as it is a popular choice and there is a [Motoko extension](https://github.com/dfinity/vscode-motoko) that provides additional tools for Motoko development. 

#### Why does this matter?

Code editors are a core component to writing and developing code. 

### Download and install git

Download and install [git](https://git-scm.com/downloads). 

#### Why does this matter?

Many of the DFINITY public repositories are hosted on Github, such as our `examples` repository. We will be using code from this repository later in the developer journey, so it is important to install `git` to assure that you can download the sample code pieces and follow along with the later tutorials. 

### Download and install Node.js

Download and install [node.js](https://nodejs.org/en).

#### Why does this matter?

Node.js is used by `dfx` to generate frontend code and dependencies. It is not required for dapps that do not contain a frontend interface, though it is required for you to follow along with this developer journey series, since we will explore frontend canisters in a later tutorial. 

### Assure all packages and tools are updated to the latest release versions

If you have followed this guide and installed each of these tools for the first time, you will have the most recent release versions installed.

If you previously had installed any of these tools, be sure to check the most recent release version and update them if needed. 
#### Why does this matter?

Having the latest release version assures that you have all of the newest features and bug fixes for each tool to assure for the most seamless developer experience. 

### Create a working directory

The last step in setting up our developer environment is to create a new directory for us to build in. You can create a new directory with the command:

```
mkdir developer_journey
```

In future modules, we'll refer to this directory as the **working directory**. Each project that we create will be a *sub-directory* of this working directory.

#### Why does this matter?

We'll use this working directory to contain the projects that we build throughout our developer journey. This will help keep things organized in our local file structure. 
## Next steps

- [0.4: Introduction to canisters](04-intro-canisters.md).
