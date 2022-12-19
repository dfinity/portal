# Using Node.js

Node.js is a runtime for JavaScript, so you can use the [JavaScript agent](https://www.npmjs.com/package/@dfinity/agent) with it to interact with a canister. This can be useful to run an oracle, connect an existing Node.js application to the IC, or to introduce a websocket layer to your application.

In this example, we will run a simple Node.js websocket provider, proxying a canister keeping track of a stack of events.

## Setting up

First, we need to get started with a project. Let's take the Dip721 example code at https://github.com/Psychedelic/DIP721, and write a node script that will mint a collection of NFT's.

### Dependencies

This project uses features introduced in dfx 0.11.2. You can install the latest version of `dfx` with

```
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

Also, you will need Node.js. This tutorial was written for Node version 16 and up. Follow instructions to get set up with [nvm](https://github.com/nvm-sh/nvm) if you have not yet.

### Updating the project

First, fork and clone the repo.

```
git clone git@github.com:<username>/DIP721.git
```

Then, `cd` into `dip721`. The project has all of the canister logic already added, so there is only a little more we need to add.

Add a `package.json` file by running `npm init -y`. To the `src` directory, add a new directory, `"node"`, with a new file `index.js`. To `index.js`, add a simple

```js
// node/index.js
console.log("hello world");
```

Inside of `package.json`, update your `"scripts"` to include `"start": "node --es-module-specifier-resolution=node src/node/index.js"`, and add `"type": "module"`. Your package.json should look like this:

```json
// package.json
{
  "name": "dip721",
  "version": "1.0.0",
  "description": "## Summary",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node --es-module-specifier-resolution=node src/node/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

To make sure everything is set up correctly, inside of `examples/rust/dip721-nft-container` run

```
npm start
```

And see your `hello world` printed in the console.

## Generating types

Next, open up your `dfx.json` file. To `dip721_nft_container`, add a new configuration for `declarations -> node_compatibility`. This will optimize the auto-generated JavaScript interface for `node.js` projects.

It should look like this:

```json
// dfx.json
{
  "version": 1,
  "canisters": {
    "dip721_nft_container": {
      "type": "rust",
      "candid": "dip721-nft-container.did",
      "package": "dip721_nft_container",
      "declarations": {
        "node_compatibility": true
      }
    }
  }
}
```

Now, you can start up your project. We will use an example principal, derived from a seed phrase of the word `"test"` 12 times. This principal will be `rwbxt-jvr66-qvpbz-2kbh3-u226q-w6djk-b45cp-66ewo-tpvng-thbkh-wae`

> It should go without saying, but this is a testing seed phrase, and any real seed phrase used to deploy or manage a canister should be kept a secret.

```shell
# setup.sh
dfx start --background --clean
dfx deploy nft --argument '(opt record{custodians=opt vec{principal"rwbxt-jvr66-qvpbz-2kbh3-u226q-w6djk-b45cp-66ewo-tpvng-thbkh-wae"}})'
dfx deploy assets
dfx canister call asset authorize "(principal  \"rwbxt-jvr66-qvpbz-2kbh3-u226q-w6djk-b45cp-66ewo-tpvng-thbkh-wae\")"
```

## Writing Code

We will need a number of packages for this project. Start by installing the following:

```
npm install --save \
@dfinity/agent \
@dfinity/principal \
@dfinity/candid \
@dfinity/identity-secp256k1 \
@slide-computer/assets \
isomorphic-fetch \
image-thumbnail \
mmmagic \
prettier \
sha256-file
```

### Generating Declarations

Run the setup script `./setup.sh` to deploy the canisters. Once they are built, you can run `dfx generate nft` to create an auto-generated interface for your canister.

The interface will be placed into `src/declarations/nft`, and we will use that to interact with the canister. Before we setup the actor, we will need to have an identity.

### Identity from a Seed Phrase

Since we are running the code using the `--es-module-specifier-resolution=node` flag, we can use `import` syntax in our code. Let's start by setting up an identity that will resolve to the principal that is mentioned above.

```js
// identity.js
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";

// Completely insecure seed phrase. Do not use for any purpose other than testing.
// Resolves to "rwbxt-jvr66-qvpbz-2kbh3-u226q-w6djk-b45cp-66ewo-tpvng-thbkh-wae"
const seed = "test test test test test test test test test test test test";

export const identity = await Secp256k1KeyIdentity.fromSeed(seed);
```

As you can see, the seed phrase is derived from the word `test`, repeated 12 times. This is useful for testing purposes and local development. When you are deploying your contract to the IC, you should change the seed out for something private.

> Remember to store any seed phrase you use in production in a secure place. Use environment variables and never commit a real seed phrase in plaintext in your codebase.

#### Setting up an Actor

Back in `src > node > index.js`, we can now set up our actor. We can import a `createActor` utility from the `nft` declarations, as well as a `canisterId` alias, which by default points to `process.env.<canister-id>_CANISTER_ID`.

You can pass the canister id environment variable logic to your application in a number of ways. You could edit it into the start of your `package.json` scripts - `NFT_CANISTER_ID=... node...`. You could install [dotenv](https://www.npmjs.com/package/dotenv) and configure it to read from a hidden `.env` file. For the sake of this example, which will focus on local development, we will simply read it from the local `canister_ids.json` file, which can be found in `.dfx/local/canister_ids.json`.

So to import the canister ID and set up our actor, it will look something like this:

```js
// src/node/index.js
import fetch from "isomorphic-fetch";
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
  host: "http://127.0.0.1:8000",
  fetch,
});

const actor = createActor(effectiveCanisterId, {
  agent,
});
```

At the end here, the actor is fully set up and ready to make calls to the local canister and the agent we have set up. Since we are focusing on local, the `host` is pointing to the local replica at `http://127.0.0.1:8000`. If we want to talk to the IC mainnet, the `host` should point to `https://ic0.app`.

### Minting Logic

Now, let's go through and write some logic to mint our nft's. The steps we will need to go through include:

1. Parse a config for the nft's to be minted
2. Load assets and metadata for the assets
3. Generate Thumbnails
4. Upload assets to an asset canister
5. Mint the NFT

#### Parse the config

This is pretty simple - we'll just store the configs in a JSON file, using an array of items. There's the included "asset" name, plus some key-value metadata that can get loaded as well.

```json
// nfts.json
[
  {
    "asset": "example_nft_0.png",
    "metadata": [
      {
        "collection": "examples",
        "sampleKey": "value"
      }
    ]
  }
  //...
]
```

Then, we can load that in the script.

```js
// index.js
const nftConfig = require("./nfts.json");
```

#### Prepare assets and metadata

First, let's load the image, using the `"asset"` path from JSON.

```js
import path from "path";
import fs from "fs";
import mmm from "mmmagic";
// ...

nftConfig.reduce(async (prev, nft, idx) => {
  await prev;
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
```

#### Prepare thumbnail

For this, we can use image-thumbnail, a utility based on `sharp`.

```js
import imageThumbnail from "image-thumbnail";
// ...
const options = {
  width: 256,
  height: 256,
  jpegOptions: { force: true, quality: 90 },
};
const thumbnail = await imageThumbnail(filePath, options);
```

#### Upload Assets

We can use a community library to simplify uploading to our asset canister. We'll need to get the canister ID, pass our agent, and then upload our two files.

```js
import { Blob } from "buffer";
global.Blob = Blob;
import { AssetManager } from "@slide-computer/assets";
// ...

const assetCanisterId = localCanisterIds.asset.local;
const assetManager = new AssetManager({
  canisterId: assetCanisterId,
  agent, // re-use agent
  concurrency: 32, // Optional (default: 32), max concurrent requests.
  maxSingleFileSize: 450000, // Optional bytes (default: 450000), larger files will be uploaded as chunks.
  maxChunkSize: 1900000, // Optional bytes (default: 1900000), size of chunks when file is uploaded as chunks.
});

nftConfig.reduce(async (prev, nft, idx) => {
  // ...
  const uploadedFilePath = `token/${idx}${path.extname(nft.asset)}`;
  const uploadedThumbnailPath = `thumbnail/${idx}.jpeg`;

  await assetManager.insert(file, { fileName: uploadedFilePath });
  await assetManager.insert(thumbnail, { fileName: uploadedThumbnailPath });
});
```

#### Assemble the data and mint

Then, all we have left to do is assemble the metadata pointing to our uploaded assets, and to mint the NFT.

```js
nftConfig.reduce(async (prev, nft, idx) => {
  // ...
  const data = [
    [
      "location",
      {
        TextContent: `http://${assetCanisterId}.localhost:8000/${uploadedFilePath}`,
      },
    ],
    [
      "thumbnail",
      {
        TextContent: `http://${assetCanisterId}.localhost:8000/${uploadedThumbnailPath}`,
      },
    ],
    ["contentType", { TextContent: contentType }],
    ["contentHash", { BlobContent: [...encoder.encode(sha)] }],
    ...metadata,
  ];

  // set our minting identity as the recipient - replace if you have airdrops in mind
  const principal = await (await identity).getPrincipal();
  const mintResult = await actor.mint(principal, BigInt(idx), data);

  // Verify token is minted
  const metaResult = await actor.tokenMetadata(0n);
});
```

Here is the full script, with some console logs added to show process.

```js
import { Blob } from "buffer";
global.Blob = Blob;
import { AssetManager } from "@slide-computer/assets";
import { fileURLToPath } from "url";
import { HttpAgent } from "@dfinity/agent";
import fetch from "isomorphic-fetch";
import fs from "fs";
import imageThumbnail from "image-thumbnail";
import mmm from "mmmagic";
import { createRequire } from "node:module";
import path from "path";
import prettier from "prettier";
import sha256File from "sha256-file";

import { canisterId, createActor } from "../declarations/nft/index.js";
import { identity } from "./identity.js";

const require = createRequire(import.meta.url);
const localCanisterIds = require("../../.dfx/local/canister_ids.json");
const nftConfig = require("./nfts.json");
const encoder = new TextEncoder();

const agent = new HttpAgent({
  identity: await identity,
  host: "http://127.0.0.1:8000",
  fetch,
});
const effectiveCanisterId =
  canisterId?.toString() ?? localCanisterIds.nft.local;
const assetCanisterId = localCanisterIds.asset.local;
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
nftConfig.reduce(async (prev, nft, idx) => {
  await prev;
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
  await assetManager.insert(file, { fileName: uploadedFilePath });
  console.log("uploading thumbnail to ", uploadedThumbnailPath);
  await assetManager.insert(thumbnail, { fileName: uploadedThumbnailPath });

  const principal = await (await identity).getPrincipal();

  const data = [
    [
      "location",
      {
        TextContent: `http://${assetCanisterId}.localhost:8000/${uploadedFilePath}`,
      },
    ],
    [
      "thumbnail",
      {
        TextContent: `http://${assetCanisterId}.localhost:8000/${uploadedThumbnailPath}`,
      },
    ],
    ["contentType", { TextContent: contentType }],
    ["contentHash", { BlobContent: [...encoder.encode(sha)] }],
    ...metadata,
  ];
  const mintResult = await actor.mint(principal, BigInt(idx), data);
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
```
