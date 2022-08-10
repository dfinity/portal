# Using Node.js

There are 

### Configuration

You may need to do some additional configuration for your node.js application, using the default declarations we provide from dfx generate. This is because there are a couple features that are typically present in the browser context that may not be available in your Node.js context. Fetch is now available in Node 18, so that may not work out of the box. However, in older versions, you may need to configure fetch to be available in the global context, as well as the `TextEncoder` API.

In Node 18 - the setup is fairly simple. You need to make the following changes once you've generated your declarations:

1. Rename the `.js` files to `.mjs`
2. Comment out the last line exporting `hello`
3. Either provide the canisterId through a process variable or import it directly
4. Pass the host during the `createActor` method

```js
// script.mjs
// Note - files were re-named from js to mjs
import { createActor } from "../declarations/hello/index.mjs";

import canisterIds from "../../.dfx/local/canister_ids.json" assert { type: "json" };

const canisterId = canisterIds.hello.local;

const hello = createActor(canisterId, {
  agentOptions: { 
    // fetch polyfill would go here if needed
    host: "http://127.0.0.1:8000" 
  },
});

hello.greet("Alice").then((result) => {
  console.log(result);
});
```

This will work out of the box, but you may also prefer to use a bundler to support TypeScript or other language features. 

## Bundlers

We recommend using a bundler to assemble your code for convenience and less troubleshooting. We provide a standard Webpack config, but you may also turn to Rollup, Vite, Parcel, or others. For this pattern, we recommend running a script to generate `.env.development` and `.env.production` environment variable files for your canister ids, which is a fairly standard approach for bundlers, and can be easily supported using [dotenv](https://www.npmjs.com/package/dotenv). Here is an example script you can run to map those files:

```js
// setupEnv.js
const fs = require("fs");
const path = require("path");

function initCanisterEnv() {
  let localCanisters, prodCanisters;
  try {
    localCanisters = require(path.resolve(
      ".dfx",
      "local",
      "canister_ids.json"
    ));
  } catch (error) {
    console.log("No local canister_ids.json found");
  }
  try {
    prodCanisters = require(path.resolve("canister_ids.json"));
  } catch (error) {
    console.log("No production canister_ids.json found");
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local");

  const canisterConfig = network === "local" ? localCanisters : prodCanisters;

  const localMap = localCanisters
    ? Object.entries(localCanisters).reduce((prev, current) => {
        const [canisterName, canisterDetails] = current;
        prev[canisterName.toUpperCase() + "_CANISTER_ID"] =
          canisterDetails[network];
        return prev;
      }, {})
    : undefined;
  const prodMap = prodCanisters
    ? Object.entries(prodCanisters).reduce((prev, current) => {
        const [canisterName, canisterDetails] = current;
        prev[canisterName.toUpperCase() + "_CANISTER_ID"] =
          canisterDetails[network];
        return prev;
      }, {})
    : undefined;
  return [localMap, prodMap];
}
const [localCanisters, prodCanisters] = initCanisterEnv();

if (localCanisters) {
  const localTemplate = Object.entries(localCanisters).reduce((start, next) => {
    const [key, val] = next;
    if (!start) return `${key}=${val}`;
    return `${start ?? ""}
          ${key}=${val}`;
  }, ``);
  fs.writeFileSync(".env.development", localTemplate);
}
if (prodCanisters) {
  const prodTemplate = Object.entries(prodCanisters).reduce((start, next) => {
    const [key, val] = next;
    if (!start) return `${key}=${val}`;
    return `${start ?? ""}
        ${key}=${val}`;
  }, ``);
  fs.writeFileSync(".env", localTemplate);
}
```

Then, you can add `"prestart"` and `"prebuild"` commands of `dfx generate; node setupEnv.js`. Follow documentation for your preferred bundler on how to work with environment variables.
