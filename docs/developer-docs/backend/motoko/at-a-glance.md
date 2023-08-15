---
sidebar_position: 1
---
# 1: Motoko quick start

## Overview

The [deploy your first dapp in 5 minutes](/tutorials/deploy_sample_app.md) tutorial provides a fast path to deploying a simple default application without stopping to admire the scenery along the way. Individual tutorials in this section walk through specific scenarios, pointing out details about what you’re doing in each step.

If the quick start and tutorials are not quite your style, this at-a-glance cheat sheet summarizes the steps to follow for quick reference.

After you [install the IC SDK](../../setup/install/index.mdx), here’s all you need to know:

## Step 1:
Create a new project and change to the project directory.

        dfx new <project_name> && cd <project_name>>

## Step 2:
Edit the `src/<project_name>_backend` files to define your service or application.

## Step 3:
Edit the `src/<project_name>_frontend` files with HTML, JavaScript, and CSS that provides the frontend for your service or application.

## Step 4:
Start the Internet Computer for local development or check your connection to the Internet Computer for network deployment:
- [Local deployment](../../setup/deploy-locally.md).
- [Mainnet deployment](../../setup/deploy-mainnet.md).

## Step 5:
Register, build, and deploy locally or on the mainnet (for the mainnet, use:`--network ic`).

        dfx deploy --network <network>

## Step 6:
View your service or application in a browser, using the URLS in the output of the `dfx deploy` command:

```
...
Committing batch.
Committing batch with 18 operations.
Deployed canisters.
URLs:
Frontend canister via browser
        access_hello_frontend: http://127.0.0.1:8080/?canisterId=cuj6u-c4aaa-aaaaa-qaajq-cai
Backend canister via Candid interface:
        access_hello_backend: http://127.0.0.1:8080/?canisterId=cbopz-duaaa-aaaaa-qaaka-cai&id=ctiya-peaaa-aaaaa-qaaja-cai
```
