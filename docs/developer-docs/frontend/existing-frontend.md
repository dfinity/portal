# Deploy an existing frontend

## Overview

While numerous starter projects and examples exist for those who prefer to start from scratch, deploying an existing frontend application as a frontend canister is also a viable option.

This guide provides an overview of how to deploy an existing frontend application built on the following frameworks as a frontend canister:

- [Next.js](#nextjs)

## Next.js

[Next.js](https://nextjs.org/) is an open-source web development framework providing React-based web applications with server-side rendering and static website generation.

A full example exists on [this repository](https://github.com/jennifertrin/nextjsicp).

### Prerequisites

You’ll need the following to complete this guide:

-  [x] An existing Next.js application.

-  [x] Complete download and configuration of DFX, the command-line execution environment that serves as the primary tool for creating, deploying, and managing dapps on the Internet Computer. You can reference how to download and configure DFX by reviewing the [install DFX section](/docs/developer-docs/setup/install/index.mdx).


### Step 1: Create an application build

To start, you must generate and point the static files of a properly-built Next.js application for deployment on the Internet Computer.

In order to generate the static files of a Next.js application, add this to your `next.config.js` file:

```
output: 'export'
```

Your `next.config.js` file should look similar to this. Please note that you may have existing settings that you should avoid overriding. 

```
const nextConfig = {
  output: 'export',
};
```

Build your Next.js application by running your build command. 

For example, using npx:

`npx run build`

You should reference your `package.json` scripts section to find the correct build command. 

This should now generate an `out` folder which consists of the static assets that make up the website.

In the next step, we will instruct the Internet Computer to deploy the website on-chain using these static files. 

:::info
When deploying on ICP, these static files are not public to anyone including the nodes. Only the Wasm file which is a binary instruction file which does not leak any of your code is public to nodes. 
:::

### Step 2: Create a dfx.json file

In the top-level directory of your repository, at the source of add a `dfx.json` file and add the following:

```
{
    "canisters": {
      "app": {
        "frontend": {
          "entrypoint": "out/index.html"
        },
        "source": ["out"],
        "type": "assets"
      }
    },
    "output_env_file": ".env"
}
```

`dfx.json` is the configuration file for deploying all of your code to canister smart contracts on the ICP.

Please note that you can adjust the following:

`app`: Refers to the name of the canister smart contract.

Also, make sure that these do point to the correct file:

```
"entrypoint": "out/index.html"
```

and folder:

```
 "source": ["out"],
```

### Step 3: Generate Candid definitions 

Run the following command to generate the correct types:

```
dfx generate
```

### Step 4: Deploy the project

Run the following command to deploy the Next.js application locally:

```
dfx deploy
```

Run the following command to deploy the Next.js application on the Internet Computer mainnet: 

```
dfx deploy --network ic
```

After running this command, you will see a generated link where you can navigate to your Next.js application. 

### Step 5: Navigate to the frontend canister to view the React frontend.

Navigate to the frontend canister using the URL `http://127.0.0.1:4943/?canisterId=<canister-id>`.
