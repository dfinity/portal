# 0.6: Introduction to dfx

## Overview

`dfx` is a command line utility that is used to interact with the IC SDK. It is the primary tool that is used for creating, managing, and deploying dapps onto the Internet Computer. 

The `dfx` parent command has several flags and subcommands that can be used to perform a wide array of operations. First, we'll take a look at basic usage of the command, then we'll get started creating our first project using dfx. 

## Basic usage

The syntax for using dfx is as follows:

```
dfx [subcommand] [flag]
```

### Subcommands

The following is a list of the essential `dfx` subcommands that we'll be using throughout the developer journey series. For the full list of all possible subcommands, check out the [dfx reference documentation](/docs/references/cli-reference/dfx-parent.md).

- `build`: Used to build the canister output from the project's source code. 
- `canister`: Used to manage deployed canisters. 
- `deploy`: Deploys one or all canisters from the project's source code. By default, all canisters are deployed.
- `help`: Returns usage information for a specific subcommand.	
- `identity`: Used to create and manage identities. 
- `info`: Used to display information, such as version or port values. 
- `ledger`: Used to interact with accounts within the ledger canister. 
- `new`: Used to create a new project. By default, creates a Motoko project.
- `ping`: Used to test network connectivity to the mainnet or the local canister execution environment. 
- `quickstart`: Used to perform an initial one-time identity and wallet setup. 
- `start`: Used to start the local canister execution environment for the current project.
- `stop`: Used to stop the local canister execution environment.
- `upgrade`: Used to upgrade the version of dfx installed.	
- `wallet`: Used to manage addresses, custodians, controllers, and cycles for the default cycles wallet associated with the currently selected identity.

### Flags

- `-h`, `--help`: Used to display usage information.
- `-q`, `--quiet`: Used to suppress informational messages.
- `-v`, `--verbose`: Used to display detailed information about operations.
- `-V`, `--version`: Used to display the version of dfx installed. 

### Options

Below are the essential options that we'll be referencing throughout the developer journey. For the full list of options, see the [reference documentation](/docs/references/cli-reference/dfx-parent.md).

- `--identity <identity>`: Used to specify the user identity to be used with the command.
- `--logfile <logfile>`: Used to write the command's output logs to a specific file. 

## Upgrading to the latest version of dfx

When a new version of `dfx` is released, it is recommended that the latest version be installed whenever possible. This ensures that you are benefiting from the latest features, enhancements, and fixes. 

To upgrade to the latest version, the `dfx upgrade` command can be used. This command will compare your current version of `dfx` to the latest version available, and if a new version is available, the command will automatically download and install the newest version. 

## Installing a specific version of dfx

If there is a specific release of `dfx` you'd like to use, you can set the `DFX_VERSION` environment variable, then run the install script. The install script looks for this environment variable during installation to determine which version should be downloaded. If no variable is set, the latest version is downloaded. 

To set the `DFX_VERSION` variable and install a specific version of `dfx`, run the command:

```
DFX_VERSION=0.14.1 sh -ci "$(curl -sSL https://internetcomputer.org/install.sh)"
```

## Creating a new project with dfx

All dapps on the IC start off as **projects**. Projects are created using the `dfx` command and subcommands. 

To get started, we'll use the default sample app to demonstrate how to create a project and explore the default project structure that is generated when a new project is created. 

### Step 1: Open a terminal window on your local computer.

Assure that you are in your working directory, `developer_journey`. 

### Step 2: Create a new project with the name 'hello_world' with the command:

```
dfx new hello_world
```

When no flags are used, the `dfx new` command will create a new project using the default Motoko template. To create a project using the Rust project template, the flag `--type=rust` should be included in the command. 

In this developer journey, we will be using Motoko for our development language, so we do not need to pass any additional flags with this command. 

:::info
When creating new projects with `dfx`, only alphanumeric characters and underscores should be used. This is to assure that project names are valid within Motoko, JavaScript, and other contexts. 
:::

This command will create a new project directory called `hello_world` that contains the project's default template files and a new git repository for your project. 

### Step 3: Then, navigate into the project's directory with the command:

```
cd hello_world
```

## Exploring the default project structure

By default, the project structure will resemble the following:

```
hello_world/
├── README.md      # Default project documentation
├── dfx.json       # Project configuration file
├── node_modules   # Libraries for frontend development
├── package-lock.json
├── package.json
├── src            # Source files directory
│   ├── hello_world_backend
│   │   └── main.mo
│   ├── hello_world_frontend
│       ├── assets
│       │   ├── logo.png
│       │   ├── main.css
│       │   └── sample-asset.txt
│       └── src
│           ├── index.html
│           └── index.js
└── webpack.config.js
```

In this directory, the following files and directories are notable:

- `README.md`: The default README file to be used for documenting your project.
- `dfx.json`: The default configuration file used to set configurable options for your project.
- `src/`: The source directory that contains all of your dapp's source files.
- `hello_world_backend`: The source directory that contains your dapp's backend code files.
- `hello_world_frontend`: The source directory that contains your dapp's frontend code files.
- `hello_world_backend/main.mo`: The default template Motoko file that can be modified or replaced to include your dapp's core programming logic. 

## Reviewing the default configuration

By default, the `dfx.json` file will contain some automatically generated configuration settings for your new project. These settings will provide basic functionality for the default dapp, which is a simple 'Hello, world' program. 

To review the default configuration file for the project, open the `dfx.json` file in a code or text editor. The contents will resemble the following:

```
{
  "canisters": {
    "hello_world_backend": {
      "main": "src/hello_world_backend/main.mo",
      "type": "motoko"
    },
    "hello_world_frontend": {
      "dependencies": [
        "hello_world_backend"
      ],
      "frontend": {
        "entrypoint": "src/hello_world_frontend/src/index.html"
      },
      "source": [
        "src/hello_world_frontend/assets",
        "dist/hello_world_frontend/"
      ],
      "type": "assets"
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

Let's explore these settings a bit further:

- There are two canisters defined in this file; `hello_world_frontend` and `hello_world_backend`. 
- The `hello_world_backend` canister has a `main` attribute which specifies the file path of the program's core file, `main.mo`.
- The `hello_world_backend` canister has a `type` of 'motoko', which specifies the programming language. If the canister was written in Rust, this value would read 'rust'. 
- The `hello_world_frontend` canister has a dependency of the `hello_world_backend` canister, meaning it relies on the backend canister to be deployed and running for it to be deployed and ran. 
- The `hello_world_frontend` canister has a frontend endpoint of `src/hello_world_frontend/src/index.html`, which specifies the primary frontend asset. 
- Additional assets for the `hello_world_frontend` canister are specified in the `source` configuration. 
- Lastly, the `hello_world_frontend` canister has a `type` of 'assets', configuring it as a frontend asset canister. 

## Reviewing the default program code

Now that we've explored the default project structure, let's take a look at the default program code located in the `main.mo` file. This is located in the `src/hello_world_backend` directory. We will cover frontend development and the default files located in the frontend canister directory in a later tutorial. 

New Motoko projects will always include a default, template `main.mo` file. To take a look at the file's default contents, open the `src/hello_world_backend/main.mo` file in a code or text editor. The code will resemble the following:

```
actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
```

In this simple 'Hello, world' program, there are a few key elements:

- This code defines an `actor` rather than a `main` function as some other languages define. In Motoko, the `main` function is implicit in the file itself.
- Instead of the traditional 'Hello, world' that uses a simple `print` function, this version of 'Hello, world' defines an actor with a public `greet` function that takes an input of a name argument with the type of `Text`. 
- Then, the program uses an async keyword to indicate that the program will return an async message that consists of text string that is constructed using "Hello, ", the # operator, the name argument, and "!".


We'll explore actor objects, classes, and asynchronous messages in a future tutorial. For now, this will wrap up our introduction to `dfx`. 

## Next steps

- 1.1: Exploring a live demo.
