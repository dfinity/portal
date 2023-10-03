# Getting started with free cycles
 
## Overview

This guide explains how to use **cycles faucet** to acquire your first amount of 10T free cycles that could be used to deploy your dapps on the mainnet.

## Prerequisites

- [x] Install Internet Computer SDK following [this guide](/developer-docs/setup/install/index.mdx).

## Step 1: Get a coupon.

First, you will need to navigate to <https://faucet.dfinity.org>. You
will need to put in a request for cycles on the [DFINITY dev official Discord](https://discord.gg/jnjVVQaE2C) server. You can click on the **REQUEST CYCLES** button on the faucet page to join the Discord server.

![Getting Coupon](_attachments/faucet_step_1.png)

## Step 2: Once inside the Discord server, navigate into the `#cycles-faucet` channel. 

![Cycles-faucet](./_attachments/cycles-faucet.png)

## Step 3: In this channel, execute the following slash command:

> /request

## Step 4: After you send this message, you are prompted to fill out a survey. 

:::caution
Please ensure that your Discord settings are set to allow direct messages from other users. If you do not have this setting enabled, you will not receive a direct message from the faucet bot.
:::

## Step 5: Once completed, our team will review your submission. If accepted, the faucet bot will send you a private message with a coupon code.

## Step 6: Head back to the <https://faucet.dfinity.org> webpage. 

Now, click **NEXT STEP** to continue.

## Step 7: Redeem the coupon.

Now that you have a coupon code, enter your coupon code within the faucet UI.

![Enter Coupon](_attachments/faucet_step_3.png)

Click **NEXT STEP** to continue.

## Step 8: Setup the IC SDK.

Next, confirm your computer has `dfx` installed. Run this command to check the version of `dfx` on your computer:

    dfx --version

If your dfx version is below 0.12.0, please run this command:

    sudo dfx upgrade

![Setup SDK](_attachments/faucet_step_4.png)

Click **NEXT STEP** to continue.

## Step 9: Create a new identity to claim your cycles.

To create a new identity, use the command:

```
dfx identity new MyNewIdentity
```

Your identity's seed phrase will be returned. Be sure to save this in a secure location.

Then, set this identity to be used by default:

```
dfx identity use MyNewIdentity
```

## Step 10: Now, claim your cycles. 

You will need to claim your free cycles by running this command:

```
dfx wallet --network ic redeem-faucet-coupon <your-coupon-code>
```

![Claim Cycles](_attachments/faucet_step_5.png)

Click **NEXT STEP** to continue.

## Step 11: Verify wallet canister.

The last step is to verify the wallet is setup correctly, by checking its balance using the `dfx wallet --network ic balance` command:

![Verify Wallet Canister](_attachments/faucet_step_6.png)

## Conclusion

Now you are ready to host a website on the IC or follow one of our dapp tutorials, which can be found [here.](../../../tutorials/index.mdx)

