---
sidebar_position: 1
sidebar_label: From JavaScript
---
# Calling IC from JavaScript Frontend

:::note
This article covers connecting to the IC from JavaScript in a web browser. For more information about calling IC from Node.js, please, refer to [this guide](nodejs.md).
:::

To get started with JavaScript on the Internet Computer, we recommend you follow our quickstart guide in order to get set up with the basics of your development environment. This includes:

* Dfinity's development SDK, `dfx`
* Node JS (12, 14, or 16)
* A canister you want to experiment with
  * Suggestions: 
    * `dfx new` starter project
    * an example from [dfinity/examples](https://github.com/dfinity/examples)

If you are looking for an explanation of what an agent does, see [Agent Overview](../index.md).


____

The Internet Computer blockchain is accessible via an API that is available at [https://ic0.app/api/v2](https://ic0.app/api/v2). Smart contracts are able to define their own API's using the Candid Interface Declaration Language (IDL), and they will respond to calls through the public API.

The IC supports two types of calls - `queries` and `updates`. Queries are fast and cannot change state. Updates go through consensus, and will take around 2-4 seconds to complete. 

As a result of the latency for updates, best practices around modeling your application's performance will have you make updates asynchronously and early. If you can make an update ahead of time and have it already "cached" in your canister's memory, your users will have a better experience requesting that data. Similarly, if your application needs to make an update, it is best to avoid blocking interaction while your update is taking place. Use *optimistic rendering* wherever practical, and proceed with your application as if the call has already succeeded.

### A simple call

Talking to the IC from your application starts with the canister interface. Let's take a very simple one to begin with.

```
# hello.did
service : {
  greet: (text) -> (text);
}
```

This is a Candid interface. It defines no new special types and defines a `service` interface with a single method, `greet`. Greet accepts a single argument, of type `text`, and responds with `text`. Unless labeled as a `query`, all calls are treated as updates by default.

In JS, `text` maps to a type of `string`. You can see a full list of Candid types and their JS equivalents at the [Candid Types](https://smartcontracts.org/docs/candid-guide/candid-types.html) reference.

Since this interface is easily typed, we are able to automatically generate a JavaScript interface, as well as TypeScript declarations, for this application. This can be done in two ways. You can manually generate an interface using the `didc` tool, by going to the [releases](https://github.com/dfinity/candid/releases) tab of the dfinity/candid repository.

In most cases, it is easier to configure your project to have a canister defined in `dfx.json`, and to generate your declarations automatically using the `dfx generate` command. 

For our Hello World example, that looks like this:

```
// dfx.json
{
  "canisters": {
    "hello": {
      "main": "src/hello/main.mo",
      "type": "motoko"
    },
	...
}
```
Then when we run `dfx generate`, dfx will automatically write the following to your src/declarations directory inside your project.

```
|── src
│   ├── declarations
│   │   ├── hello
│   │   │   ├── hello.did
│   │   │   ├── hello.did.d.ts
│   │   │   ├── hello.did.js
│   │   │   ├── hello.most
│   │   │   └── index.js
```

`hello.did` defines your interface, as we saw above, and `hello.most` is used for upgrade safety. That leaves us with the three remaining files, `index.js`, `hello.did.js`, and `hello.did.d.ts`.

Let's start with the simplest, `hello.did.d.ts`.

This file will look something like this:

```ts
import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
export interface _SERVICE { 'greet' : ActorMethod<[string], string> };
```

The `_SERVICE` export includes a `greet` method, with typings for an array of arguments and a return type. This will be typed as an [ActorMethod](https://agent-js.icp.host/agent/interfaces/ActorMethod.html), which will be a handler that takes arguments and returns a promise that resolves with the type specified in the declarations.

Next, let's look at `hello.did.js`.

```js
export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'greet' : IDL.Func([IDL.Text], [IDL.Text], []) });
};

```

Unlike our `did.d.ts` declarations, this `idlFactory` needs to be available during runtime. The `idlFactory` gets loaded by an [Actor](https://agent-js.icp.host/agent/interfaces/Actor.html) interface, which is what will handle structuring the network calls according to the IC API and the provided candid spec.

This factory again represents a service with a `greet` method, and the same arguments as before. You may notice, however, that the `IDL.Func` has a third argument, which here is an empty array. That represents any additional annotations the function may be tagged with, which most commonly will be `"query"`.

And third, we have `index.js`, which will pull those pieces together and set up a customized actor with your smart contract's interface. This does a few things, like using `process.env` variables to determine the ID of the canister, based on which deploy context you are using, but the most important aspect is in the `createActor` export.

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

This constructor first creates a `HttpAgent`, which is wraps the JS `fetch` API and uses it to encode calls through the public API. We also optionally fetch the root key of the replica, for non-mainnet deployments. Finally, we create an Actor using the automatically generated interface for the canister we will call, passing it the `canisterId` and the `HttpAgent` we have initialized.

This `Actor` instance is now set up to call all of the service methods as methods. Once this is all set up, like it is by default in the `dfx new` template, you can simply run `dfx generate` whenever you make changes to your canister API, and the full interface will automatically stay in sync in your frontend code.


## Browser

The browser context is the easiest to account for. The `fetch` API is available, and most apps will have an easy time determining whether they need to talk to `https://ic0.app` or a local replica, depending on their URL. 

When you are building apps that run in the browser, here are some things to consider:

### Performance

Updates to the IC may feel slow to your users, at around 2-4 seconds. When you are building your application, take that latency into consideration, and consider following some best practices:

* Avoid blocking UI interactions while you wait for the result of your update. Instead, allow users to continuing to make other updates and interactions, and inform your users of success asyncronously. 
* Try to avoid making inter-canister calls. If the backend needs to talk to other canisters, the duration can add up quickly.
* Use `Promise.all` to make multiple calls in a batch, instead of making them one-by-one
* If you need to fetch assets or data, you can make direct `fetch` calls to the `raw.ic0.app` endpoint for canisters

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
