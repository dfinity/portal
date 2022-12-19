---
id: cycles-faucet
title: Tutorial 3 - Use Cycles Faucet
position: 3
tags:
- Getting started
---

# Cycles Faucet
Ready to deploy your first smart contract on the Internet Computer
blockchain? You can use our Cycles Faucet to get set up with 20T free
cycles in just a few minutes.

    sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

or following the instructions on the [Installing the SDK](/developer-docs/build/install-upgrade-remove.mdx) section.

:::warning
The cycles faucet is currently getting reworked. Some parts of this page are outdated. Please go to <https://faucet.dfinity.org> for the current instructions. Once the rework is completed, this page will be updated.
:::

## Claim your Cycles Wallet

### Step 1: Authenticate

First, you will need to navigate to <https://faucet.dfinity.org>. You
will need to connect an active Twitter account to continue.

![Connecting to Twitter](_attachments/faucet_step_1.png)

If the Twitter account has not been used before, you are eligible to claim the 20T cycles.

![Eligible account](_attachments/faucet_step_2.png)

Click NEXT to continue.

### Step 2: Setup SDK

Once your eligibility has been confirmed, open up a terminal window.

If you already have created a project, go to the root of the project in the terminal, where the `dfx.json` file is located. If you haven't created a project yet, run these commands in the terminal:

    mkdir my_project && cd my_project
    echo '{}' > dfx.json

![Setup SDK](_attachments/faucet_step_4.png)

Click NEXT to continue.

### Step 3: Create Canister and Claim Cycles

The `redeem` command shown on the screen contains a unique coupon code, which with this command will be used to create a canister and load it with 20T cycles. 

![Create Canister and Claim Cycles](_attachments/faucet_step_5.png)

After a successfully running the `redeem` command, the created canister's ID is returned. 

After runninng the `redeem` command, the created canister and it's balance can be checked using the status command. Use the canister ID returned by the `redeem` command:

    dfx canister --network=ic status <canister id>

Please note the canister ID is used in the next step, so write down the canister ID. 

Click NEXT to continue.

### Step 4: Set Wallet

The canister can now be linked to your principal ID as your wallet canister. The wallet is linked by calling a `dfx identity` command:

![Set Wallet](_attachments/faucet_step_6.png)

Click NEXT to continue.

### Step 5: Verify Wallet Canister

The last step is to verify the wallet is setup correctly, by checking its balance using the `dfx wallet` command:

![Verify Wallet Canister](_attachments/faucet_step_7.png)

## Setup Completed

Now you are ready to host a website on the IC or follow one of our dapp tutorials.

### Next, people often look at these guides:

-   [Local Development](./local-quickstart)

-   [Network Deployment](./network-quickstart)
