---
id: create_first_dapp
title: Create Your First App
tags:
- Getting started
---

# Create Your First App

## Setup

First, let’s make sure that your development environment is ready.

* You’ll be using your own text editor and terminal app for this tutorial.
* If you don’t have the Internet Computer SDK installed, install it
  from [here](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove), or keep following
  along below.

### Install the Internet Computer SDK

```bash
 sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

:::tip
If you are on Windows, we recommend downloading [Git for Windows](https://gitforwindows.org/) and using Git Bash, which
supports the UNIX-specific commands in this tutorial. You can also
use [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
:::

## Create Project

To create an IC dapp, open your terminal, cd into the directory you’d like to create the app in, and run the following
command:

```bash
dfx new hello
```

:::info
Under the hood, dfx bootstraps a new project for you using a blank project template. If it doesn’t work, please visit
the [developer forum](https://forum.dfinity.org).
:::

## Deploy

You now have a new directory called `hello`. Let’s cd into it:

```bash
cd hello
```

From here, we’ll deploy to the Internet Computer by using the Playground, which will allow you to deploy your app free
of charge for up to one hour, after which it will automatically be deleted.

```bash
dfx deploy --playground
```

:::note
The Playground is not meant to host production dapps - it is made available to learn how to use the Internet
Computer. The Playground will periodically remove canisters from its pool in order to make space for new
deployments.
:::

Your dapp is now live on the Internet Computer! It doesn’t do much yet, but follow along to the next tutorial, and we’ll
show you how to turn this into something much more useful!
