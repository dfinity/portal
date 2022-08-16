# agent by DFINITY

`agent` (source code [here](https://github.com/dfinity/agent-js), npm package [here](https://www.npmjs.com/package/@dfinity/agent)) is a JavaScript and TypeScript library to interact with the Internet Computer for Node.js and Client applications.
It is a low-level interface that the Actor uses to encode and decode messages to the Internet Computer.
It provides `call`, `query` and `readState` methods to the Actor, as well as a few additional utilities.
For the most part, calls through the agent are intended to be structured through an Actor, configured with a canister interface that can be automatically generated from a Candid interface.

You can find a bunch of examples that use the `agent` package [here](https://github.com/dfinity/examples).