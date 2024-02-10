
# JavaScript agent

## Overview

The JavaScript agent (`agent-js`) is used to interact with the public API endpoints of ICP and canisters deployed on ICP from a JavaScript program. 

The JavaScript agent supports both JavaScript and TypeScript languages.

## Installing `agent-js`

To install the JavaScript agent, run the following command:

```
npm i --save @dfinity/agent
```


## Using `agent-js`

### Prerequisites
To get started with agent-js, it is recommended your development environment includes:

- [x] IC SDK for canister creation and management.
- [x] Node JS (12, 14, or 16).
- [x] A canister you want to experiment with.
  - Suggestions: 
    - `dfx new` starter project.
    - An example from [dfinity/examples](https://github.com/dfinity/examples).

For this guide, use the project created by the command:

```
dfx new hello
```

### Simple call

This guide covers connecting to ICP from JavaScript in a web browser. For more information about calling ICP from Node.js, please, refer to [this guide](nodejs.md).

Talking to ICP from your application starts with the canister interface. Let's take a very simple one to begin with.

In most cases, it is easier to configure your project to have a canister defined in `dfx.json`, and to generate your declarations automatically using the `dfx generate` command. 

For our 'Hello, world!' example, the `dfx.json` file looks like this:

```jason
{
  "canisters": {
    "hello_backend": {
      "main": "src/hello_backend/main.mo",
      "type": "motoko"
    },
    "hello_frontend": {
      "dependencies": [
        "hello_backend"
      ],
      "frontend": {
        "entrypoint": "src/hello_frontend/src/index.html"
      },
      "source": [
        "src/hello_frontend/assets",
        "dist/hello_frontend/"
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


Then, to generate the interface files, run the command:

```
dfx generate
```

By running this command, dfx will automatically write the following to your `src/declarations` directory inside your project.

```
|── src
│   ├── declarations
│   │   ├── hello_backend
│   │   │   ├── hello_backend.did
|   |   |   ├── hello_backend.did.d.js
│   │   │   ├── hello_backend.did.d.ts
│   │   │   ├── hello_backend.did.js
│   │   │   ├── index.d.ts
│   │   │   └── index.js
```

Then, you can view the contents of the Candid interface file for the `hello_backend` canister:

```candid
# src/declarations/hello_backend/hello_backend.did
service : {
  greet: (text) -> (text);
}
```

This is a Candid interface. It defines no new special types and defines a `service` interface with a single method, `greet`. Greet accepts a single argument, of type `text`, and responds with `text`. Unless labeled as a `query`, all calls are treated as updates by default.

In JavaScript, `text` maps to a type of `string`. You can see a full list of Candid types and their JavaScript equivalents at the [Candid types](../../references/candid-ref.md) reference.

Let's explore each of these `src/declarations` files a bit more. 

#### hello_backend.did

`hello_backend.did` defines your interface, as seen above.

#### hello.did.d.ts

This file will look something like this:

```ts
import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
export interface _SERVICE { 'greet' : ActorMethod<[string], string> };
```

The `_SERVICE` export includes a `greet` method, with typings for an array of arguments and a return type. This will be typed as an [ActorMethod](https://agent-js.icp.xyz/agent/interfaces/ActorMethod.html), which will be a handler that takes arguments and returns a promise that resolves with the type specified in the declarations.

#### hello.did.js

Next, let's look at `hello.did.js`.

```js
export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'greet' : IDL.Func([IDL.Text], [IDL.Text], []) });
};

```

Unlike our `did.d.ts` declarations, this `idlFactory` needs to be available during runtime. The `idlFactory` gets loaded by an [actor](https://agent-js.icp.host/agent/interfaces/Actor.html) interface, which is what will handle structuring the network calls according to the ICP API and the provided candid spec.

This factory again represents a service with a `greet` method, and the same arguments as before. You may notice, however, that the `IDL.Func` has a third argument, which here is an empty array. That represents any additional annotations the function may be tagged with, which most commonly will be `"query"`.

#### index.js

In the `index.js` file, each of the previously explained pieces are pulled together to set up a customized actor with your smart contract's interface. This does a few things, like using `process.env` variables to determine the ID of the canister, based on which deploy context you are using, but the most important aspect is in the `createActor` export.

```js
 export const createActor = (canisterId, options) => {
  const agent = new HttpAgent({ ...options?.agentOptions });
  
  // Fetch root key for certificate validation during development
  if(process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch(err=>{
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }
  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
}
```

:::caution
This example uses `fetchRootKey`. It is not recommended that dapps deployed on the mainnet call this function from agent-js, since using `fetchRootKey` on the mainnet poses severe security concerns for the dapp that's making the call. It is recommended to put it behind a condition so that it only runs locally. 

This API call will fetch a root key for verification of update calls from a single replica, so it’s possible for that replica to respond with a malicious key. A verified mainnet root key is already embedded into agent-js, so this only needs to be called on your local replica, which will have a different key from mainnet that agent-js does not know ahead of time.
:::

This constructor first creates a `HTTPAgent`, which is wraps the JS `fetch` API and uses it to encode calls through the public API. This code also optionally fetches the root key of the replica, for non-mainnet deployments. Finally, it creates an actor using the automatically generated interface for the canister will call, passing it the `canisterId` and the `HTTPAgent` that have been initialized.

This `actor` instance is now set up to call all of the service methods as methods. Once this is all set up, you can simply run `dfx generate` whenever you make changes to your canister API, and the full interface will automatically stay in sync in your frontend code.

Since this interface is easily typed, you are able to automatically generate a JavaScript interface, as well as TypeScript declarations, for this application. This can be done in two ways. You can manually generate an interface using the `didc` tool, download it by going to the [releases](https://github.com/dfinity/candid/releases) tab of the `dfinity/candid` repository.

## Browser

The browser context is the easiest to account for. The `fetch` API is available, and most apps will have an easy time determining whether they need to talk to `https://icp0.io` or a local replica, depending on their URL. 

When you are building apps that run in the browser, here are some things to consider:

### Performance

Updates to ICP may feel slow to your users, at around 2-4 seconds. When you are building your application, take that latency into consideration, and consider following some best practices:

* Avoid blocking UI interactions while you wait for the result of your update. Instead, allow users to continuing to make other updates and interactions, and inform your users of success asynchronously. 
* Try to avoid making inter-canister calls. If the backend needs to talk to other canisters, the duration can add up quickly.
* Use `Promise.all` to make multiple calls in a batch, instead of making them one-by-one.
* If you need to fetch assets or data, you can make direct `fetch` calls to the `raw.icp0.io` endpoint for canisters.

## Bundlers

It is recommended to use a bundler to assemble your code for convenience and less troubleshooting. This guide provides a standard Webpack config, but you may also turn to Rollup, Vite, Parcel, or others. For this pattern, it is recommended to run a script to generate `.env.development` and `.env.production` environment variable files for your canister ids, which is a fairly standard approach for bundlers, and can be easily supported using [dotenv](https://www.npmjs.com/package/dotenv). 

Here is an example script you can run to map those files:

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

## Resources

- [`agent-js` GitHub repo](https://github.com/dfinity/agent-js.git).

- [`agent-js` documentation](https://agent-js.icp.xyz/agent/modules.html).

- [`agent-js` npm package](https://www.npmjs.com/package/@dfinity/agent).