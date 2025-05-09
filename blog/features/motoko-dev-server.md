---
title: "Announcing the Motoko Dev Server: live-reloading for Web3 dapps"
description: Introducing mo-dev, a flexible live-reload server for quickly building and testing Motoko services on the Internet Computer.
tags: [New features]
image: /img/blog/motoko-dev-server.jpg
---

# Announcing the Motoko Dev Server: live-reloading for Web3 dapps

[![Motoko Dev Server](/img/blog/motoko-dev-server.jpg)](https://github.com/dfinity/motoko-dev-server)

* [Medium post](https://medium.com/dfinity/announcing-the-motoko-dev-server-live-reloading-for-web3-dapps-20363088afb4)
* [Developer forum topic](https://forum.dfinity.org/t/announcing-mo-dev-live-reloading-for-motoko-dapps/21007)
* [GitHub repository](https://github.com/dfinity/motoko-dev-server)

We are excited to introduce [mo-dev](https://github.com/dfinity/motoko-dev-server), a flexible live-reload server for quickly building and testing Motoko services on the Internet Computer.

## Background

Live reloading (or more specifically, [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/)) is a well-established technology known to massively improve the productivity of web developers. I highly recommend checking out [this blog post](https://blog.logrocket.com/complete-guide-full-stack-live-reload/) for a great explanation of how it works.

This is a solved problem in the world of conventional web development. Robust solutions such as the [Vite](https://vitejs.dev/), [Next.js](https://nextjs.org/docs/architecture/fast-refresh), and [Webpack](https://webpack.js.org/configuration/dev-server/) dev servers make it possible to change a line of frontend code and immediately see the result in your browser, usually without even refreshing the page.

However, this feature is almost nonexistent when developing a decentralized application (or “dapp”) running on a blockchain. Several options exist — such as [ZepKit](https://blog.openzeppelin.com/solidity-hot-reloading-using-zepkit) for Solidity smart contracts — but the current state of Web3 live reloading leaves much to be desired given the sky-high expectations from Web2.

---

This is where the [Motoko programming language](/docs/motoko/main/getting-started/motoko-introduction) comes in. With quick compilation times, module-based imports, and [stable variable](/docs/motoko/main/canister-maintenance/upgrades) semantics, Motoko is the ideal candidate for a game-changing live reload workflow.

Over the past six months, DFINITY has adopted full-stack live reloading in our internal Motoko projects, saving a huge amount of development time and allowing us to quickly try lots of different ideas to improve the end-user experience of our Internet Computer dapps.

This was made possible using the [Motoko Dev Server](https://github.com/dfinity/motoko-dev-server) (or `mo-dev` for short), a command-line tool which facilitates a live-reload workflow for Motoko dapps and smart contracts.

`mo-dev` is already used in a wide range of projects such as the [playground](https://play.motoko.org/), [Developer Experience Feedback Board](https://dx.internetcomputer.org/), and even the language’s own [base library](https://github.com/dfinity/motoko-base).

Each use case requires different live-reload capabilities, so we decided to create a Swiss Army knife ([if you will](https://dfinity.org/foundation/)) of features which you can select depending on your project:

* Deploy canisters to the local replica
* Generate language bindings
* Run unit tests (files ending with `.test.mo`)
* Execute commands
* Any combination of the above

For a complete list of features, check out the project’s GitHub repository at [github.com/dfinity/motoko-dev-server](https://github.com/dfinity/motoko-dev-server).

Now that you know why you’d want to use `mo-dev`, here are a few ways to get started:

## Online Demo

If you’re curious to try `mo-dev` without downloading anything, here’s an online example project which you can [run entirely in your browser](https://gitpod.io/#https://github.com/rvanasa/vite-react-motoko) ([source code](https://github.com/rvanasa/vite-react-motoko#readme)).

## Installation

Run the following command in your terminal (requires Node.js ≥ 16):

```sh
npm install -g mo-dev
```

Alternatively, you can download a standalone binary from the project’s [GitHub releases](https://github.com/dfinity/motoko-dev-server/releases).

Once you’ve installed the tool, run `mo-dev --help` to view usage examples and descriptions for each available feature.

## Candid UI

Let’s say you’re developing a Motoko smart contract using the [Candid UI](/docs/building-apps/interact-with-canisters/candid/candid-concepts). Here’s a command which will redeploy the canister on file change:

```sh
mo-dev --deploy -y
```

The `-y` flag automatically responds “yes” to prompts from [dfx](/docs/building-apps/developer-tools/dfx/dfx-deploy) about upgrading the canister interface (potentially clearing canister data). Feel free to include or omit this depending on your use case.

## Full-Stack Dapp

`mo-dev` is specifically designed to play well with popular frontend build tools such as [Vite](https://vitejs.dev/) and [Create React App](https://create-react-app.dev/).

If you want to start a new project, consider using the [Vite + React + Motoko](https://github.com/rvanasa/vite-react-motoko#readme) template (or the even simpler [plain JavaScript version](https://github.com/rvanasa/vite-react-motoko/tree/simplified-js#readme)).

Otherwise, this is a good starting point for live reloading a backend Motoko canister:

```sh
mo-dev --generate --deploy -y
```

The `--generate` flag automatically creates and updates JavaScript language bindings whenever you make changes to your Motoko source code.

It’s also possible to use this feature by itself (`mo-dev --generate`).

## Advanced Usage

For those wanting to plug the Motoko Dev Server into an existing webapp, here is a scalable Vite project configuration we’ve adopted at DFINITY:

* Run `npm install -D npm-run-all mo-dev` in your project’s root directory
* Add a frontend npm script which runs `vite`
* Add a backend npm script which runs `mo-dev` with relevant flags
* Change the start npm script to `run-p frontend backend`

With this project configuration, `npm start` will run the Vite and Motoko dev servers with a seamlessly integrated console output. You can split the outputs via `npm run frontend` and `npm run backend` in separate terminals.

Another benefit of this configuration is that anyone can run the dev server without needing to globally install the `mo-dev` command, which is great for encouraging open-source contributions or working as part of a team.

This project configuration will be included by default in the upcoming changes to the [dfx new](/docs/building-apps/developer-tools/dfx/dfx-new) command.

`mo-dev` ships with a test runner compatible with third-party libraries such as motoko-matchers.

To register a unit test, create a file with the extension `*.test.mo` anywhere in your project. For example, here is a basic unit test which asserts that `2vxsx-fae` is the anonymous [principal](https://medium.com/dfinity/internet-computer-basics-part-1-principals-and-identities-215e8f239da4):

```motoko
import { print } "mo:base/Debug";
import Principal "mo:base/Principal";

let myPrincipal = Principal.fromText("2vxsx-fae");

print("Anonymous?");
assert Principal.isAnonymous(myPrincipal);

print("Yep!");
```

Once you’ve created a `*.test.mo` file, run the following command:

```sh
mo-dev --test
```

This will run all unit tests whenever you change a Motoko source file.

Note that when using `--test` with `--deploy`, the dev server will wait until all relevant tests succeed before redeploying your canister.

If you want to run tests without the live-reloading functionality, you can use the `mo-test` command which is automatically installed alongside `mo-dev`:

```sh
mo-test --help
```

You can also include the `-f` flag to filter specific test files:

```sh
mo-test -f Foo # Run test files starting with "Foo"
mo-test -f Foo.test.mo # Only run test files named "Foo.test.mo"
mo-test -f Foo -f Bar # Run test files starting with "Foo" or "Bar"
```

By default, the test runner uses the Motoko interpreter. If performance is critical, you can switch to a compiled [WASI](https://wasi.dev/) runtime by installing [Wasmtime](https://wasmtime.dev/) and adding `--testmode wasi` to the test command.

The [Motoko VS Code extension](https://github.com/dfinity/vscode-motoko#readme) also includes a UI for the test runner:

![VS Code unit testing integration](https://user-images.githubusercontent.com/522097/219227189-71bb8d54-1904-49f2-8fe8-253b5a709e3f.png)

## Continuous Integration

The Motoko Dev Server can be used in [CI](https://semaphoreci.com/continuous-integration) environments such as [GitHub Actions](https://github.com/features/actions), [Travis](https://www.travis-ci.com/), and [CircleCI](https://circleci.com/). In these environments, `mo-dev` will automatically terminate instead of waiting for file changes.

You can achieve the same effect on your local system by setting the CI environment variable to `true` or `1`:

```sh
CI=true mo-dev --generate --deploy
```

## Final Thoughts

Here are a few miscellaneous tips which might come in handy while working with `mo-dev`:

* Live reloading works when switching Git branches, which is useful to keep in mind for code reviews and pair programming.
* If you’ve used [dfx generate](/docs/building-apps/developer-tools/dfx/dfx-generate), you might have encountered a common catch-22 where both `dfx generate` and `dfx deploy` require running each other first. `mo-dev --generate --deploy` automatically handles this situation for you.
* You can define custom live-reload logic using `mo-dev --exec <command>`.

---

Feedback is welcome! If you find a bug or want to see a new feature, please feel free to [reach out on GitHub](https://github.com/dfinity/motoko-dev-server/issues) (or give us a ⭐ to support the project) at [github.com/dfinity/motoko-dev-server](https://github.com/dfinity/motoko-dev-server).

Otherwise, consider submitting a request on our [Developer Experience Feedback Board](https://dx.internetcomputer.org/), which itself was built with `mo-dev`! If you're curious, you can find the source code at [github.com/dfinity/feedback](https://github.com/dfinity/feedback).

Thanks for reading. Cheers!
