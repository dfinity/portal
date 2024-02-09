# Node.js

## Overview


Node.js is a runtime for JavaScript, so you can use the [JavaScript agent](https://www.npmjs.com/package/@dfinity/agent) with it to interact with a canister. This can be useful to run an oracle, connect an existing Node.js application to ICP, or to introduce a websocket layer to your application.

[More information about calling ICP from JavaScript in a web browser](javascript-intro.md).

In this example, you will run a simple Node.js websocket provider, proxying a canister keeping track of a stack of events.

First, you need to get started with a project. Let's take the DIP721 example code at https://github.com/Psychedelic/DIP721, and write a node script that will mint a collection of NFTs.

## Prerequisites

- [x] This project uses features introduced in dfx 0.11.2. You can install the latest version of the IC SDK with the command:

```
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

- [x] Download and install [Node.js v0.16.0+](https://nodejs.org/en).

- [x] Install the following packages:

```
npm install --save \
    @dfinity/agent \
    @dfinity/principal \
    @dfinity/candid \
    @dfinity/identity \
    @dfinity/identity-secp256k1 \
    @dfinity/assets \
    isomorphic-fetch \
    image-thumbnail \
    mmmagic \
    prettier \
    sha256-file
```

## Updating the project

- #### Step 1: First, fork and clone the repo.

```
git clone https://github.com/Psychedelic/DIP721.git
```

- #### Step 2: Then, `cd` into `DIP721`.

The project has all of the canister logic already added, so there is only a little more that needs to be added.

- #### Step 3: Add a `package.json` file by running the command:

```
npm init -y
```

- #### Step 4: Then, in the `src` directory, add a new directory, `"node"`, with a new file `index.js` with the commands:

```
mkdir src/node
touch /src/node/index.js
```

- #### Step 5: Open the `index.js` file and add the following code:

```js
// src/node/index.js
console.log("Hello world");
```

- #### Step 6: In the root of the project directory, open the `package.json` file.

Update your `"scripts"` to include `"start": "node --es-module-specifier-resolution=node src/node/index.js"`, and add `"type": "module"`.

Your package.json should look like this:

```json
{
  "name": "dip721",
  "version": "1.0.0",
  "description": "## Summary",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "build": "",
    "start": "node --es-module-specifier-resolution=node src/node/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

- #### Step 7: To make sure everything is set up correctly, run

```
npm start
```

And see your `Hello world` printed in the console.

## Generating types

- #### Step 8: Next, open up your `dfx.json` file.

To the definition of the `nft` canister, add a new configuration for `declarations -> node_compatibility`:

```
  "canisters": {
    "nft": {
      "package": "nft",
      "candid": "nft.did",
      "type": "rust",
      "declarations": {
        "node_compatibility": true
      }
    },
```

This will optimize the auto-generated JavaScript interface for `node.js` projects.

- #### Step 9: Additionally, add a new canister, `asset`, which will be used to host the frontend assets for your NFTs.

```
    "asset": {
      "type": "assets",
      "source": ["dist"],
      "declarations": {
        "node_compatibility": true
      }
    },
```

- #### Step 10: Finally, remove the `dfx` setting as well as the `defaults` and `networks` settings.

They will lock the project to a specific and outdated version of `dfx`, and use `dfx` 12 or later.

After these steps, your `dfx.json` file should look like this:

```json
{
  "version": 1,
  "canisters": {
    "nft": {
      "package": "nft",
      "candid": "nft.did",
      "type": "rust",
      "declarations": {
        "node_compatibility": true
      }
    },
    "asset": {
      "type": "assets",
      "source": ["dist"],
      "declarations": {
        "node_compatibility": true
      }
    },
    "cap-router": {
      "type": "custom",
      "wasm": "cap/wasm/cap_router.wasm",
      "candid": "cap/candid/router.did"
    }
  }
}
```

- #### Step 11: Now, you can start up your project.

You will use an example principal, derived from a seed phrase of the word `"test"` 12 times. This principal will be `rwbxt-jvr66-qvpbz-2kbh3-u226q-w6djk-b45cp-66ewo-tpvng-thbkh-wae`.

:::caution
It should go without saying that this is a testing seed phrase, and any real seed phrase used to deploy or manage a canister should be kept a secret.
:::

You can either run these commands in the terminal, or add them to a `setup.sh` file.

```shell
# setup.sh
dfx start --background --clean
dfx deploy nft --argument '(opt record{custodians=opt vec{principal"rwbxt-jvr66-qvpbz-2kbh3-u226q-w6djk-b45cp-66ewo-tpvng-thbkh-wae"}})'
dfx deploy assets
dfx canister call asset authorize "(principal  \"rwbxt-jvr66-qvpbz-2kbh3-u226q-w6djk-b45cp-66ewo-tpvng-thbkh-wae\")"
```

## Writing code

### Generating declarations

- #### Step 12: After running the above commands to build your canisters, you can run `dfx generate nft` to create an auto-generated interface for your canister.

```
dfx generate nft
```

The interface will be placed into `src/declarations/nft`, and will be used that to interact with the canister. Before you setup the actor, you will need to have an identity.

### Identity from a seed phrase

- #### Step 13: Since you are running the code using the `--es-module-specifier-resolution=node` flag, you can use `import` syntax in your code.

Let's start by setting up an identity that will resolve to the principal that is mentioned above.

Create a new file in the `src/node` directory called `identity.js` and insert the following code into the file:

```js
// identity.js
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";

// Completely insecure seed phrase. Do not use for any purpose other than testing.
// Resolves to "rwbxt-jvr66-qvpbz-2kbh3-u226q-w6djk-b45cp-66ewo-tpvng-thbkh-wae"
const seed = "test test test test test test test test test test test test";

export const identity = await Secp256k1KeyIdentity.fromSeedPhrase(seed);
```

As you can see, the seed phrase is derived from the word `test`, repeated 12 times. This is useful for testing purposes and local development. When you are deploying your contract to ICP, you should change the seed out for something private.

:::caution
Remember to store any seed phrase you use in production in a secure place. Use environment variables and never commit a real seed phrase in plaintext in your codebase.
:::

### Setting up an actor

- #### Step 14: Back in `src > node > index.js` file, you can now set up your actor.

You can import a `createActor` utility from the `nft` declarations, as well as a `canisterId` alias, which by default points to `process.env.<canister-id>_CANISTER_ID`.

You can pass the canister id environment variable logic to your application in a number of ways. You could:

- Edit it into the start of your `package.json` scripts `NFT_CANISTER_ID=... node...`.
- Install [dotenv](https://www.npmjs.com/package/dotenv) and configure it to read from a hidden `.env` file.

For the sake of this example, which will focus on local development, you will simply read it from the local `canister_ids.json` file, which can be found in `.dfx/local/canister_ids.json`.

So, to import the canister ID and set up your actor, it will look something like this:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own. To view the full code file that should be run, please see [final code](#final-code).
:::

```js
// src/node/index.js
import fetch from "isomorphic-fetch";
import { HttpAgent } from "@dfinity/agent";
import { createRequire } from "node:module";
import { canisterId, createActor } from "../declarations/nft/index.js";
import { identity } from "./identity.js";

// Require syntax is needed for JSON file imports
const require = createRequire(import.meta.url);
const localCanisterIds = require("../../.dfx/local/canister_ids.json");

// Use `process.env` if available provoded, or fall back to local
const effectiveCanisterId =
  canisterId?.toString() ?? localCanisterIds.nft.local;

const agent = new HttpAgent({
  identity: await identity,
  host: "http://127.0.0.1:4943",
  fetch,
});

const actor = createActor(effectiveCanisterId, {
  agent,
});
```

At the end here, the actor is fully set up and ready to make calls to the local canister and the agent you have set up. Since this tutorial is focusing on local development the `host` is pointing to the local replica at `http://127.0.0.1:4943`. If you want to talk to the mainnet, the `host` should point to `https://icp-api.io`.

:::info
The port `4943` is the default port for the local replica. If you have changed the port, or you are using an older version of `dfx`, you will need to update it here and in the other instances in the code.
:::

### Minting logic

Now, let's go through and write some logic to mint your NFTs. The steps will cover:

- 1: Parsing a config for the NFTs to be minted.
- 2: Loading assets and metadata for the assets.
- 3: Generating thumbnails.
- 4: Uploading assets to an asset canister.
- 5: Minting the NFT.

### Parse the config

- #### Step 15: To parse the config, store it in a JSON file, using an array of items.

There's the included "asset" name, plus some key-value metadata that can get loaded as well.

Create a new file in the `src/node` directory called `nft.json` and insert the following content:

```json
// nfts.json
[
  {
    "asset": "example_nft_0.png",
    "metadata": {
      "collection": "examples",
      "sampleKey": "value"
    }
  }
]
```

Then, load that in the `src/node/index.js` script:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own. To view the full code file that should be run, please see [final code](#final-code).
:::

```js
// index.js
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const nftConfig = require("./nfts.json");
```

### Prepare assets and metadata

- #### Step 16: Next, let's load the image, using the `"asset"` path from JSON.

In the `src/node/index.js` script, add the following:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own. To view the full code file that should be run, please see [final code](#final-code).
:::

```js
import path from "path";
import fs from "fs";
import mmm from "mmmagic";
import { fileURLToPath } from "url";
import sha256File from "sha256-file";
// ...

async function main() {
  nftConfig.forEach(async (nft, idx) => {
    // Parse metadata, if present
    const metadata = Object.entries(nft.metadata ?? []).map(([key, value]) => {
      return [key, { TextContent: value }];
    });

    const filePath = path.join(
      fileURLToPath(import.meta.url),
      "..",
      "assets",
      nft.asset
    );

    const file = fs.readFileSync(filePath); // Blob of file
    const sha = sha256File(filePath); // SHA of file

    // Detect filetype
    const magic = await new mmm.Magic(mmm.MAGIC_MIME_TYPE);
    const contentType = await new Promise((resolve, reject) => {
      magic.detectFile(filePath, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
}
main();
```

### Prepare thumbnail

- #### Step 17: To prepare the thumbnail, you can use `image-thumbnail`, a utility based on `sharp`.

In the `src/node/index.js` script, add the following:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own. To view the full code file that should be run, please see [final code](#final-code).
:::

```js
import imageThumbnail from "image-thumbnail";
// ...
const options = {
  width: 256,
  height: 256,
  responseType: "buffer",
  jpegOptions: { force: true, quality: 90 },
};
const thumbnail = await imageThumbnail(filePath, options);
```

### Upload assets

- #### Step 18: You can use a community library to simplify uploading to your asset canister. You'll need to get the canister ID, pass your agent, and then upload your two files.

In the `src/node/index.js` script, add the following:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own. To view the full code file that should be run, please see [final code](#final-code).
:::

```js
import { Blob } from "buffer";
global.Blob = Blob;
import { AssetManager } from "@dfinity/assets";
// ...

const assetCanisterId = localCanisterIds.asset.local;
const assetManager = new AssetManager({
  canisterId: assetCanisterId,
  agent, // re-use agent
  concurrency: 32, // Optional (default: 32), max concurrent requests.
  maxSingleFileSize: 450000, // Optional bytes (default: 450000), larger files will be uploaded as chunks.
  maxChunkSize: 1900000, // Optional bytes (default: 1900000), size of chunks when file is uploaded as chunks.
});

async function main() {
  // ...
  const uploadedFilePath = `token/${idx}${path.extname(nft.asset)}`;
  const uploadedThumbnailPath = `thumbnail/${idx}.jpeg`;

  await assetManager.store(file, { fileName: uploadedFilePath });
  await assetManager.store(thumbnail, { fileName: uploadedThumbnailPath });
}
```

### Assemble the data and mint

- #### Step 19: Then, all you have left to do is assemble the metadata pointing to your uploaded assets, and to mint the NFT.

In the `src/node/index.js` script, add the following:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own. To view the full code file that should be run, please see [final code](#final-code).
:::

```js
async function main() {
  // ...
  const data = [
    [
      "location",
      {
        TextContent: `http://${assetCanisterId}.localhost:4943/${uploadedFilePath}`,
      },
    ],
    [
      "thumbnail",
      {
        TextContent: `http://${assetCanisterId}.localhost:4943/${uploadedThumbnailPath}`,
      },
    ],
    ["contentType", { TextContent: contentType }],
    ["contentHash", { BlobContent: encoder.encode(sha) }],
    ...metadata,
  ];

  // set your minting identity as the recipient - replace if you have airdrops in mind
  const principal = await (await identity).getPrincipal();
  const mintResult = await actor.mint(principal, BigInt(idx), data);

  // Verify token is minted
  const metaResult = await actor.tokenMetadata(0n);
}
```

## Final code
Here is the full `src/node/index.js` script, with some console logs added to show process.

```js
import fetch from "isomorphic-fetch";
import { HttpAgent } from "@dfinity/agent";
import { canisterId, createActor } from "../declarations/nft/index.js";
import { identity } from "./identity.js";
import { createRequire } from "node:module";
import path from "path";
import fs from "fs";
import mmm from "mmmagic";
import { fileURLToPath } from "url";
import sha256File from "sha256-file";
import { Blob } from "buffer";
import { AssetManager } from "@dfinity/assets";
import imageThumbnail from "image-thumbnail";
import prettier from "prettier";

const require = createRequire(import.meta.url);
const nftConfig = require("./nfts.json");
const localCanisterIds = require("../../.dfx/local/canister_ids.json");

const encoder = new TextEncoder();

const agent = new HttpAgent({
  identity: await identity,
  host: "http://127.0.0.1:4943",
  fetch,
});
const effectiveCanisterId =
  canisterId?.toString() ?? localCanisterIds.nft.local;
const assetCanisterId = localCanisterIds.assets.local;
const actor = createActor(effectiveCanisterId, {
  agent,
});
const assetManager = new AssetManager({
  canisterId: assetCanisterId,
  agent,
  concurrency: 32, // Optional (default: 32), max concurrent requests.
  maxSingleFileSize: 450000, // Optional bytes (default: 450000), larger files will be uploaded as chunks.
  maxChunkSize: 1900000, // Optional bytes (default: 1900000), size of chunks when file is uploaded as chunks.
});

async function main() {
  nftConfig.forEach(async (nft, idx) => {
    console.log("starting upload for " + nft.asset);

    // Parse metadata, if present
    const metadata = Object.entries(nft.metadata ?? []).map(([key, value]) => {
      return [key, { TextContent: value }];
    });

    const filePath = path.join(
      fileURLToPath(import.meta.url),
      "..",
      "assets",
      nft.asset
    );

    const file = fs.readFileSync(filePath);

    const sha = sha256File(filePath);
    const options = {
      width: 256,
      height: 256,
      responseType: "buffer",
      jpegOptions: { force: true, quality: 90 },
    };
    console.log("generating thumbnail");
    const thumbnail = await imageThumbnail(filePath, options);

    const magic = await new mmm.Magic(mmm.MAGIC_MIME_TYPE);
    const contentType = await new Promise((resolve, reject) => {
      magic.detectFile(filePath, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    console.log("detected contenttype of ", contentType);

    /**
     * For asset in nfts.json
     *
     * Take asset
     * Check extenstion / mimetype
     * Sha content
     * Generate thumbnail
     * Upload both to asset canister -> file paths
     * Generate metadata from key / value
     * Mint ^
     */

    const uploadedFilePath = `token/${idx}${path.extname(nft.asset)}`;
    const uploadedThumbnailPath = `thumbnail/${idx}.jpeg`;

    console.log("uploading asset to ", uploadedFilePath);
    await assetManager.store(file, { fileName: uploadedFilePath });
    console.log("uploading thumbnail to ", uploadedThumbnailPath);
    await assetManager.store(thumbnail, { fileName: uploadedThumbnailPath });

    const principal = await (await identity).getPrincipal();

    const data = [
      [
        "location",
        {
          TextContent: `http://${assetCanisterId}.localhost:4943/${uploadedFilePath}`,
        },
      ],
      [
        "thumbnail",
        {
          TextContent: `http://${assetCanisterId}.localhost:4943/${uploadedThumbnailPath}`,
        },
      ],
      ["contentType", { TextContent: contentType }],
      ["contentHash", { BlobContent: encoder.encode(sha) }],
      ...metadata,
    ];
    const mintResult = await actor.dip721_mint(principal, BigInt(idx), data);
    console.log("result: ", mintResult);
    const metaResult = await actor.tokenMetadata(0n);
    console.log("new token info: ", metaResult);
    console.log(
      "token metadata: ",
      prettier.format(
        JSON.stringify(metaResult, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        ),
        { parser: "json" }
      )
    );
  });
}
main();
```
