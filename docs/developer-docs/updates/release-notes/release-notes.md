# Release Notes

# What's new in DFX 0.12.0

## DFX

### feat(frontend-canister): add warning if config is provided in `.ic-assets.json` but not used

### fix(frontend-canister): Allow overwriting default HTTP Headers for assets in frontend canister

Allows to overwrite `Content-Type`, `Content-Encoding`, and `Cache-Control` HTTP headers with custom values via `.ic-assets.json5` config file. Example `.ic-assets.json5` file:
```json5
[
    {
        "match": "web-gz.data.gz",
        "headers": {
            "Content-Type": "application/octet-stream",
            "Content-Encoding": "gzip"
        }
    }
]
```
This change will trigger the update process for frontend canister (new module hash: `2ff0513123f11c57716d889ca487083fac7d94a4c9434d5879f8d0342ad9d759`).

### feat: warn if an unencrypted identity is used on mainnet

### fix: Save SNS canister IDs

SNS canister IDs were not being parsed reliably.  Now the candid file is being specified explicitly, which resolves the issue in at least some cases.

### feat: NNS usability improvements

The command line interface for nns commands has been updated to:

- Give better help when the subnet type is incorrect
- Not offer --network as a flag given that it is unused
- List nns subcommands

### feat: -y flag for canister installation

`dfx canister install` and `dfx deploy` now have a `-y` flag that will automatically confirm any y/n checks made during canister installation.

### fix: Compute Motoko dependencies in linear (not exponential) time by detecting visited imports.

### fix(generate): add missing typescript types and fix issues with bindings array in dfx.json

### chore: update Candid UI canister with commit 79d55e7f568aec00e16dd0329926cc7ea8e3a28b

### refactor: Factor out code for calling arbitrary bundled binaries

The function for calling sns can now call any bundled binary.

### docs: Document dfx nns subcommands

`dfx nns` commands are used to deploy and manage local NNS canisters, such as:

- Governance for integration with the Internet Computer voting system
- Ledger for financial integration testing
- Internet Identity for user registration and authenttication

### fix: Only kill main process on `dfx stop`
Removes misleading panics when running `dfx stop`.

### feat: `dfx nns install` works offline if all assets have been cached.

### feat: Initialise the nns with an account controlled by a secp256k1 key

This enables easy access to toy ICP using command line tools and this key:
```
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEICJxApEbuZznKFpV+VKACRK30i6+7u5Z13/DOl18cIC+oAcGBSuBBAAK
oUQDQgAEPas6Iag4TUx+Uop+3NhE6s3FlayFtbwdhRVjvOar0kPTfE/N8N6btRnd
74ly5xXEBNSXiENyxhEuzOZrIWMCNQ==
-----END EC PRIVATE KEY-----
```
For example, you can create an identity in dfx by putting this key in the file `ident-1.pem` and importing it:
```
dfx identity import ident-1 ident-1.pem
dfx --identity ident-1 ledger balance
```

### feat: default to run ic-wasm shrink when build canisters
This behavior applies to Motoko, Rust and Custom canisters.
If you want to disable this behavior, you can config it in dfx.json:

    "canisters" : {
        "app" : {
            "shrink" : false,
        }
    }

### feat: configurable custom wasm sections

It's now possible to define custom wasm metadata sections and their visibility in dfx.json.

At present, dfx can only add wasm metadata sections to canisters that are in wasm format.  It cannot add metadata sections to compressed canisters.  Since the frontend canister is now compressed, this means that at present it is not possible to add custom metadata sections to the frontend canister.

dfx no longer adds `candid:service` metadata to canisters of type `"custom"` by default.  If you want dfx to add your canister's candid definition to your custom canister, you can do so like this:

```
    "my_canister_name": {
      "type": "custom",
      "candid": "main.did",
      "wasm": "main.wasm",
      "metadata": [
        {
          "name": "candid:service"
        }
      ]
    },
```

This changelog entry doesn't go into all of the details of the possible configuration.  For that, please see docs/concepts/canister-metadata.md and the docs in the JSON schema.

### fix: Valid canister-based env vars

Hyphens are not valid in shell environment variables, but do occur in canister names such as `smiley-dapp`. This poses a problem for vars with names such as `CANISTER_ID_${CANISTER_NAME}`.  With this change, hyphens are replaced with underscores in environment variables.  The canister id of `smiley-dapp` will be available as `CANISTER_ID_smiley_dapp`.  Other environment variables are unaffected.

### feat: Add dfx sns deploy

This allows users to deploy a set of SNS canisters.

### fix: `cargo run -p dfx -- --version` prints correct version

### feat: add --mode=auto

When using `dfx canister install`, you can now pass `auto` for the `--mode` flag, which will auto-select `install` or `upgrade` depending on need, the same way `dfx deploy` does. The default remains `install` to prevent mistakes.

### feat: add `--network` flag to `dfx generate`

`dfx generate`'s generated bindings use network-specific canister IDs depending on the generated language, but there was previously no way to configure which network this was, so it defaulted to local. A `--network` flag has been added for this purpose.

### feat: sns config validate

There is a new command that verifies that an SNS initialization config is valid.

### feat: sns config create

There is a new command that creates an sns config template.

### fix: remove $ from wasms dir

The wasms dir path had a $ which is unwanted and now gone.

### fix: Correct wasm for the SNS swap canister

Previously the incorrect wasm canister was installed.

### fix: Use NNS did files that matches the wasms

Previously the did files and wasms could be incompatible.

### fix: allow users to skip compatibility check if parsing fails

### feat: canister HTTP support is now enabled by default.

`dfx start` and `dfx replica` now ignore the `--enable-canister-http` parameter.

You can still disable the canister http feature through configuration:
- ~/.config/dfx/networks.json: `.local.canister_http.enabled=false`
- dfx.json (project-specific networks) : `.networks.local.canister_http.enabled=false`

### feat: custom canister `wasm` field can now specify a URL from which to download

- note that dfx will report an error if a custom canister's `wasm` field is a URL and the canister also has `build` steps.

### feat: custom canister `candid` field can now specify a URL from which to download

### feat: deploy NNS canisters

A developer is now able to install NNS canisters, including back end canisters such as ledger and governance, and front end canisters such as nns-dapp and internet-identity, on their local DFX server.  Usage:
```
dfx start --clean --background
dfx nns install
```

This feature currently requires that the network 'local' is used and that it runs on port 8080.
The network's port can be controlled by using the field `"provider"` in the network's definition, e.g. by setting it to `"127.0.0.1:8080"`.

### feat: configure logging level of http adapter

It is now possible to set the http adapter's log level in dfx.json or in networks.json:

    "http": {
      "enabled": true,
      "log_level": "info"
    }

By default, a log level of "error" is used, in order to keep the output of a first-time `dfx start` minimal. Change it to "debug" for more verbose logging.

### fix(typescript): add index.d.ts file for type safety when importing generated declarations

Adds an index.d.ts file to the generated declarations, allowing for better type safety in TypeScript projects.

### chore: reduce verbosity of dfx start

`dfx start` produces a lot of log output that is at best irrelevant for most users.
Most output is no longer visible unless either `--verbose` is used with dfx or the relevant part's (e.g. http adapter, btc adapter, or replica) log level is changed in dfx.json or networks.json.

### feat: generate secp256k1 keys by default

When creating a new identity with `dfx identity new`, whereas previously it would have generated an Ed25519 key, it now generates a secp256k1 key. This is to enable users to write down a BIP39-style seed phrase, to recover their key in case of emergency, which will be printed when the key is generated and can be used with a new `--seed-phrase` flag in `dfx identity import`. `dfx identity import` is however still capable of importing an Ed25519 key.

### chore: update Candid UI canister with commit 528a4b04807904899f67b919a88597656e0cd6fa

* Allow passing did files larger than 2KB.
* Better integration with Motoko Playground.

### feat: simplify verification of assets served by asset canister

* SHA256 hashes of all assets are displayed when deploying the asset canister.
* A query method is added to the asset canister that returns the entire asset hash tree together with the certificate containing the certified variables of the asset canister.

### breaking change: dfx canister update-settings --compute-allocation always fails

See https://forum.dfinity.org/t/fixing-incorrect-compute-allocation-fee/14830

Until the rollout is complete, `dfx canister update-settings --compute-allocation <N>`
will fail with an error from the replica such as the following:
```
The Replica returned an error: code 1, message: "Canister requested a compute allocation of 1% which cannot be satisfied because the Subnet's remaining compute capacity is 0%"
```

### fix: For default node starter template: copy `ic-assets.json5` file from `src` to `dist`

### fix: For `dfx start --clean --background`, the background process no longer cleans a second time.

### fix: do not build or generate remote canisters

Canisters that specify a remote id for the network that's getting built falsely had their build steps run, blocking some normal use patterns of `dfx deploy`.
Canisters with a remote id specified no longer get built.
The same applies to `dfx generate`.

### refactor: Move replica URL functions into a module for reuse

The running replica port and url are generally useful information. Previously the code to get the URL was embedded in the network proxy code. This moves it out into a library for reuse.

### chore: Frontend canister build process no longer depends on `dfx` or `ic-cdk-optimizer`

Instead, the build process relies on `ic-wasm` to provide candid metadata for the canister, and
shrinking the canister size by stripping debug symbols and unused fuctions.
Additionally, after build step, the `.wasm` file is archived with `gzip`.

### chore: Move all `frontend canister`-related code into the SDK repo

| from (`repository` `path`)                  | to (path in `dfinity/sdk` repository)          | summary                                                                                     |
|:--------------------------------------------|:-----------------------------------------------|:--------------------------------------------------------------------------------------------|
| `dfinity/cdk-rs` `/src/ic-certified-assets` | `/src/canisters/frontend/ic-certified-asset`   | the core of the frontend canister                                                           |
| `dfinity/certified-assets` `/`              | `/src/canisters/frontend/ic-frontend-canister` | wraps `ic-certified-assets` to build the canister wasm                                      |
| `dfinity/agent-rs` `/ic-asset`              | `/src/canisters/frontend/ic-asset`             | library facilitating interactions with frontend canister (e.g. uploading or listing assets) |
| `dfinity/agent-rs` `/icx-asset`             | `/src/canisters/frontend/icx-asset`            | CLI executable tool - wraps `ic-asset`                                                      |

### feat: use JSON5 file format for frontend canister asset configuration

Both `.ic-assets.json` and `.ic-assets.json5` are valid filenames config filename, though both will get parsed
as if they were [JSON5](https://json5.org/) format. Example content of the `.ic-assets.json5` file:
```json5
// comment
[
  {
    "match": "*", // comment
    /*
    keys below not wrapped in quotes
*/  cache: { max_age: 999 }, // trailing comma 
  },
]
```
- Learn more about JSON5: https://json5.org/

### fix: Update nns binaries unless `NO_CLOBBER` is set

Previously existing NNS binaries were not updated regardless of the `NO_CLOBBER` setting.

### feat!: Support installing canisters not in dfx.json

`install_canister_wasm` used to fail if installing a canister not listed in dfx.json.  This use case is now supported.

### feat: print the dashboard URL on startup

When running `dfx start` or `dfx replica`, the path to the dashboard page is now printed.

### feat!: changed the default port of the shared local network from 8000 to 4943.

This is so dfx doesn't connect to a project-specific network instead of the local shared network.

In combination with the "system-wide dfx start" feature, there is a potential difference to be aware of with respect to existing projects.

Since previous versions of dfx populate dfx.json with a `networks.local` definition that specifies port 8000, the behavior for existing projects won't change.

However, if you've edited dfx.json and removed the `networks.local` definition, the behavior within the project will change: dfx will connect to the shared local network on port 4943 rather than to the project-specific network on port 8000.  You would need to edit webpack.config.js to match.  If you have scripts, you can run the new command `dfx info webserver-port` from the project directory to retrieve the port value.

### feat!: "system-wide dfx start"

By default, dfx now manages the replica process in a way that is independent of any given dfx project.  We've called this feature "system-wide dfx", even though it's actually specific to your user
(storing data files under $HOME), because we think it communicates the idea adequately.

The intended benefits:
- deploying dapps from separate projects alongside one another, similar to working with separate dapps on mainnet
- run `dfx start` from any directory
- run `dfx stop` from any directory, rather than having to remember where you last ran `dfx start`

We're calling this the "shared local network."  `dfx start` and `dfx stop` will manage this network when run outside any project directory, or when a project's dfx.json does not define the `local` network.  The dfx.json template for new projects no longer defines any networks.

We recommend that you remove the `local` network definition from dfx.json and instead use the shared local network.  As mentioned above, doing so will make dfx use port 4943 rather than port 8000.

See [Local Server Configuration](docs/cli-reference/dfx-start.md#local-server-configuration) for details.

dfx now stores data and control files in one of three places, rather than directly under `.dfx/`:
- `.dfx/network/local` (for projects in which dfx.json defines the local network)
- `$HOME/.local/share/dfx/network/local` (for the shared local network on Linux)
- `$HOME/Library/Application Support/org.dfinity.dfx/network/local` (for the shared local network on MacOS)

There is also a new configuration file: `$HOME/.config/dfx/networks.json`.  Its [schema](docs/networks-json-schema.json) is the same as the `networks` element in dfx.json.  Any networks you define here will be available from any project, unless a project's dfx.json defines a network with the same name.  See [The Shared Local Network](docs/cli-reference/dfx-start.md#the-shared-local-network) for the default definitions that dfx provides if this file does not exist or does not define a `local` network.

### fix: `dfx start` and `dfx stop` will take into account dfx/replica processes from dfx <= 0.11.x

### feat: added command `dfx info`

#### feat: `dfx info webserver-port`

This displays the port that the icx-proxy process listens on, meaning the port to connect to with curl or from a web browser.

#### feat: `dfx info replica-port`

This displays the listening port of the replica.

#### feat: `dfx info replica-rev`

This displays the revision of the replica bundled with dfx, which is the same revision referenced in replica election governance proposals.

#### feat: `dfx info networks-json-path`

This displays the path to your user's `networks.json` file where all networks are defined.

### feat: added ic-nns-init, ic-admin, and sns executables to the binary cache

### fix: improved responsiveness of `greet` method call in default Motoko project template

`greet` method was marked as an `update` call, but it performs no state updates. Changing it to `query` call will result in faster execution.

### feat: dfx schema --for networks

The `dfx schema` command can now display the schema for either dfx.json or for networks.json.  By default, it still displays the schema for dfx.json.

```bash
dfx schema --for networks
```

### feat: createActor options accept pre-initialized agent

If you have a pre-initialized agent in your JS code, you can now pass it to createActor's options. Conflicts with the agentOptions config - if you pass both the agent option will be used and you will receive a warning.

```js
const plugActor = createActor(canisterId, {
  agent: plugAgent
})
```

### feat!: option for nodejs compatibility in dfx generate

Users can now specify `node_compatibility: true` in `declarations`. The flag introduces `node.js` enhancements, which include importing `isomorphic-fetch` and configuring the default actor with `isomorphic-fetch` and `host`.

```json
// dfx.json
"declarations": {
  "output": "src/declarations",
  "node_compatibility": true
}
```

#### JS codegen location deprecation

DFX new template now uses `dfx generate` instead of `rsync`. Adds deprecation warning to `index.js` in `.dfx/<network-name>/<canister-name>` encouringing developers to migrate to the `dfx generate` command instead. If you have a `package.json` file that uses `rsync` from `.dfx`, consider switching to something like this:

```json
"scripts": {
  "build": "webpack",
  "prebuild": "npm run generate",
  "start": "webpack serve --mode development --env development",
  "prestart": "npm run generate",
  // It's faster to only generate canisters you depend on, omitting the frontend canister
  "generate": "dfx generate hello_backend"
},
```

### feat: simple cycles faucet code redemption

Using `dfx wallet --network ic redeem-faucet-coupon <my coupon>` faucet users have a much easier time to redeem their codes.
If the active identity has no wallet configured, the faucet supplies a wallet to the user that this command will automatically configure.
If the active identity has a wallet configured already, the faucet will top up the existing wallet.

Alternative faucets can be used, assuming they follow the same interface. To direct dfx to a different faucet, use the `--faucet <alternative faucet id>` flag.
The expected interface looks like the following candid functions:
``` candid
redeem: (text) -> (principal);
redeem_to_wallet: (text, principal) -> (nat);
```
The function `redeem` takes a coupon code and returns the principal to an already-installed wallet that is controlled by the identity that called the function.
The function `redeem_to_wallet` takes a coupon code and a wallet (or any other canister) principal, deposits the cycles into that canister and returns how many cycles were deposited.

### feat: disable automatic wallet creation on non-ic networks

By default, if dfx is not running on the `ic` (or networks with a different name but the same configuration), it will automatically create a cycles wallet in case it hasn't been created yet.
It is now possible to inhibit automatic wallet creation by setting the `DFX_DISABLE_AUTO_WALLET` environment variable.

### fix!: removed unused --root parameter from dfx bootstrap

### feat: canister installation now waits for the replica

When installing a new WASM module to a canister, DFX will now wait for the updated state (i.e. the new module hash) to be visible in the replica's certified state tree before proceeding with post-installation tasks or producing a success status.

### feat!: remove `dfx config`

`dfx config` has been removed. Please update Bash scripts to use `jq`, PowerShell scripts to use `ConvertTo-Json`, nushell scripts to use `to json`, etc.

### feat: move all the flags to the end

Command flags have been moved to a more traditional location; they are no longer positioned per subcommand, but instead are able to be all positioned after the final subcommand. In prior versions, a command might look like:
```bash
dfx --identity alice canister --network ic --wallet "$WALLET" create --all
```
This command can now be written:
```bash
dfx canister create --all --network ic --wallet "$WALLET" --identity alice
```
The old syntax is still available, though, so you don't need to migrate your scripts.

### feat!: changed update-settings syntax

When using `dfx canister update-settings`, it is easy to mistake `--controller` for `--add-controller`. For this reason `--controller` has been renamed to `--set-controller`.

### feat!: removed the internal webserver

This is a breaking change.  The only thing this was still serving was the /_/candid endpoint.  If you need to retrieve the candid interface for a local canister, you can use `dfx canister metadata <canister> candid:service`.

### fix: dfx wallet upgrade: improved error messages:

- if there is no wallet to upgrade
- if trying to upgrade a local wallet from outside of a project directory

### fix: canister creation cost is 0.1T cycles

Canister creation fee was calculated with 1T cycles instead of 0.1T.

### fix: dfx deploy and dfx canister install write .old.did files under .dfx/

When dfx deploy and dfx canister install upgrade a canister, they ensure that the
new candid interface is compatible with the previous candid interface.  They write
a file with extension .old.did that contains the previous interface.  In some
circumstances these files could be written in the project directory.  dfx now
always writes them under the .dfx/ directory.

### fix: dfx canister install now accepts arbitrary canister ids

This fixes the following error:
``` bash
> dfx canister install --wasm ~/counter.wasm eop7r-riaaa-aaaak-qasxq-cai
Error: Failed while determining if canister 'eop7r-riaaa-aaaak-qasxq-cai' is remote on network 'ic'.
Caused by: Failed while determining if canister 'eop7r-riaaa-aaaak-qasxq-cai' is remote on network 'ic'.
  Failed to figure out if canister 'eop7r-riaaa-aaaak-qasxq-cai' has a remote id on network 'ic'.
    Invalid argument: Canister eop7r-riaaa-aaaak-qasxq-cai not found in dfx.json
```

### feat: allow replica log level to be configured

It is now possible to specify the replica's log level. Possible values are `critical`, `error`, `warning`, `info`, `debug`, and `trace`.
The log level defaults to the level 'error'. Debug prints (e.g. `Debug.print("...")` in Motoko) still show up in the console.
The log level can be specified in the following places (See [system-wide dfx start](#feat-system-wide-dfx-start) for more detailed explanations on the network types):
- In file `networks.json` in the field `<network name>.replica.log_level` for shared networks.
- In file `dfx.json` in the field `networks.<network name>.replica.log_level` for project-specific networks.
- In file `dfx.json` in the field `defaults.replica.log_level` for project-specific networks. Requires a project-specific network to be run, otherwise this will have no effect.

### feat: enable canister sandboxing

Canister sandboxing is enabled to be consistent with the mainnet.

### chore: dfx ledger account-id --of-canister also accepts principal

It is now possible to do e.g. `dfx ledger account-id --of-canister fg7gi-vyaaa-aaaal-qadca-cai` as well as `dfx ledger account-id --of-canister my_canister_name` when checking the ledger account id of a canister.
Previously, dfx only accepted canister aliases and produced an error message that was hard to understand.

### chore: dfx canister deposit-cycles uses default wallet if none is specified

Motivated by [this forum post](https://forum.dfinity.org/t/dfx-0-10-0-dfx-canister-deposit-cycles-returns-error/13251/6).

### chore: projects created with `dfx new` are not pinned to a specific dfx version anymore

It is still possible to pin the dfx version by adding `"dfx":"<dfx version to pin to>"` to a project's `dfx.json`.

### fix: print links to cdk-rs docs in dfx new

### fix: broken link in new .mo project README

### fix: Small grammar change to identity password decryption prompt

The prompt for entering your passphrase in order to decrypt an identity password read:
"Please enter a passphrase for your identity"
However, at that point, it isn't "a" passphrase.  It's either your passphrase, or incorrect.
Changed the text in this case to read:
"Please enter the passphrase for your identity"

### chore: add retry logic to dfx download script

### feat: Add subnet type argument when creating canisters

`dfx ledger create-canister` gets a new option `--subnet-type` that allows users to choose a type of subnet that their canister can be created on. Additionally, a `dfx ledger show-subnet-types` is introduced which allows to list the available subnet types.

## Dependencies

### Replica

Updated replica to release candidate 93dcf2a2026c34330c76149dd713d89e37daa533.

This also incorporates the following executed proposals:

- [88831](https://dashboard.internetcomputer.org/proposal/88831)
- [88629](https://dashboard.internetcomputer.org/proposal/88629)
- [88109](https://dashboard.internetcomputer.org/proposal/88109)
- [87631](https://dashboard.internetcomputer.org/proposal/87631)
- [86738](https://dashboard.internetcomputer.org/proposal/86738)
- [86279](https://dashboard.internetcomputer.org/proposal/86279)
* [85007](https://dashboard.internetcomputer.org/proposal/85007)
* [84391](https://dashboard.internetcomputer.org/proposal/84391)
* [83786](https://dashboard.internetcomputer.org/proposal/83786)
* [82425](https://dashboard.internetcomputer.org/proposal/82425)
* [81788](https://dashboard.internetcomputer.org/proposal/81788)
* [81571](https://dashboard.internetcomputer.org/proposal/81571)
* [80992](https://dashboard.internetcomputer.org/proposal/80992)
* [79816](https://dashboard.internetcomputer.org/proposal/79816)
* [78693](https://dashboard.internetcomputer.org/proposal/78693)
* [77589](https://dashboard.internetcomputer.org/proposal/77589)
* [76228](https://dashboard.internetcomputer.org/proposal/76228)
* [75700](https://dashboard.internetcomputer.org/proposal/75700)
* [75109](https://dashboard.internetcomputer.org/proposal/75109)
* [74395](https://dashboard.internetcomputer.org/proposal/74395)
* [73959](https://dashboard.internetcomputer.org/proposal/73959)
* [73714](https://dashboard.internetcomputer.org/proposal/73714)
* [73368](https://dashboard.internetcomputer.org/proposal/73368)
* [72764](https://dashboard.internetcomputer.org/proposal/72764)

### ic-ref

Updated ic-ref to 0.0.1-1fba03ee
- introduce awaitKnown
- trivial implementation of idle_cycles_burned_per_day

### Updated Motoko from 0.6.29 to 0.7.3

- See https://github.com/dfinity/motoko/blob/master/Changelog.md#073-2022-11-01


### Cycles wallet

- Module hash: b944b1e5533064d12e951621d5045d5291bcfd8cf9d60c28fef02c8fdb68e783
- https://github.com/dfinity/cycles-wallet/commit/fa86dd3a65b2509ca1e0c2bb9d7d4c5be95de378

### Frontend canister:
- Module hash: 2ff0513123f11c57716d889ca487083fac7d94a4c9434d5879f8d0342ad9d759
- https://github.com/dfinity/sdk/pull/2689

# What's new in DFX 0.11.2

### fix: disable asset canister redirection of all HTTP traffic from `.raw.ic0.app` to `.ic0.app`

### fix: disable asset canister's ETag HTTP headers

The feature is not yet implemented on `icx-proxy`-level, and is causing 500 HTTP response for some type of assets every second request. We'll bring this feature back in upcoming `dfx` releases.

# What's new in DFX 0.11.1

## DFX

### Fixed: dfx now only adds candid:service metadata to custom canisters that have at least one build step

This way, if a canister uses a premade canister wasm, dfx will use it as-is.

### Fixed: "canister alias not defined" in the Motoko language server

It is now possible to develop multiple-canister projects using the [Motoko VSCode extension](https://marketplace.visualstudio.com/items?itemName=dfinity-foundation.vscode-motoko).

### Fixed: improve browser compatibility for the JavaScript language binding

Patches a JavaScript language binding compatibility issue encountered in web browsers which do not support the (?.) operator.

### New feature: print dfx.json schema

dfx is now capable of displaying the schema for `dfx.json`. You can see the schema by running `dfx schema` or write the schema to a file with `dfx schema --outfile path/to/file/schema.json`.

### New feature: support for configuring assets in assets canister
- The `.ic-assets.json` file should be placed inside directory with assets, or its subdirectories. Multiple config files can be used (nested in subdirectories). Example of `.ic-assets.json` file format:
``` json
[
    {
        "match": ".*",
        "cache": {
            "max_age": 20
        },
        "headers": {
            "X-Content-Type-Options": "nosniff"
        },
        "ignore": false
    },
    {
        "match": "**/*",
        "headers": null
    },
    {
        "match": "file.json",
        "ignore": true
    }
]
```
- Configuring assets works only during asset creation - any changes to `.ic-assets.json` files won't have any effect on assets that have already been created. We are working on follow up implementation with improvements to handle updating these properties.
- `headers` from multiple applicable rules are being stacked/concatenated, unless `null` is specified, which resets/empties the headers.
- Both `"headers": {}` and absence of `headers` field don't have any effect on end result.
- Valid JSON format is required, i.e. the array of maps, `match` field is required. Only the following fields are accepted: `cache`, `ignore`, `headers`, `match`. The glob pattern has to be valid.
- The way matching rules work:
    1. The most deeply nested config file takes precedence over the one in parent dir. In other words, properties from a rule matching a file in a subdirectory override properties from a rule matching a file in a parent directory
    2. Order of rules within file matters - last rule in config file takes precedence over the first one

- The way `ignore` field works:
    1. By default, files that begin with a `.` are ignored, while all other files are included.
    2. The `.ignore` field overrides this, if present.
    3. If a directory is ignored, file and directories within it cannot be un-ignored.
    4. A file can be ignored and un-ignored many times, as long as any of its parent directories haven't been ignored.


### Fixed: Allow `dfx deploy` to not take arguments for canisters not being installed

A longstanding bug with `dfx deploy` is that if an installation is skipped (usually an implicitly included dependency), it still requires arguments even if the installed canister doesn't. As of this release that bug is now fixed.

### New feature: Add additional logging from bitcoin canister in replica.

Configures the replica to emit additional logging from the bitcoin canister whenever the bitcoin feature is enabled. This helps show useful information to developers, such as the bitcoin height that the replica currently sees.

### Fixed: make `build` field optional for custom canisters

Prior to 0.11.0, a custom canister's `build` field could be left off if `dfx build` was never invoked. To aid in deploying prebuilt canisters, this behavior is now formalized; omitting `build` is equivalent to `build: []`.

### New feature: Use `--locked` for Rust canisters

`dfx build`, in Rust canisters, now uses the `--locked` flag when building with Cargo. To offset this, `dfx new --type rust` now runs `cargo update` on the resulting project.

### New feature: Enable threshold ecdsa signature

ECDSA signature signing is now enabled by default in new projects, or by running `dfx start --clean`.
A test key id "Secp256k1:dfx_test_key" is ready to be used by locally created canisters.

## Dependencies

### Updated `agent-rs` to 0.20.0

### Updated `candid` to 0.7.15

### Replica

Updated replica to elected commit 6e86169e98904047833ba6133e5413d2758d90eb.
This incorporates the following executed proposals:

* [72225](https://dashboard.internetcomputer.org/proposal/72225)
* [71669](https://dashboard.internetcomputer.org/proposal/71669)
* [71164](https://dashboard.internetcomputer.org/proposal/71164)
* [70375](https://dashboard.internetcomputer.org/proposal/70375)
* [70002](https://dashboard.internetcomputer.org/proposal/70002)

# What's new in DFX 0.11.0

## Breaking changes

### Duplicate asset keys are now reported as errors

The webpack.config.js included in new projects created by previous versions of dfx copied all files from `src/<project>/assets` into `dist/<project>`.  Since the default asset canister defines both of these as a `source`, these assets will show up as duplicates.

For existing projects, you will need to remove the following from webpack.config.js and delete the dist/ directory, or else `dfx deploy` will fail:

    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src", frontendDirectory, "assets"),
          to: path.join(__dirname, "dist", frontendDirectory),
        },
      ],
    }),

### Removed deprecated candid path environment variable

Any reference to environment variables of the form `CANISTER_CANDID_{name}` (formerly used in Rust projects) must be replace with `CANISTER_CANDID_PATH_{name}`.

## Changes to DFX

### New feature: renamed canisters in new projects to `<project>_frontend` and `<project>_backend`

The names of canisters created for new projects have changed.
After `dfx new <project>`, the canister names are:

- `<project>_backend` (previously `<project>`)
- `<project>_frontend` (previously `<project>_assets`)

### New feature: Enable threshold ecdsa signature

ECDSA signature signing is now enabled by default in new projects, or by running `dfx start --clean`.
A test key id "Secp256k1:dfx_test_key" is ready to be used by locally created canisters.

### Refactor: optimize from ic-wasm

Optimize Rust canister WASM module via ic-wasm library instead of ic-cdk-optimizer. A separate installation of ic-cdk-optimizer is no longer needed.

The actual optimization was kept the same.

### New feature: Read dfx canister call argument from a file or stdin

Enables passing large arguments that cannot be passed directly in the command line using the `--argument-file` flag. For example:
* Named file: `dfx canister call --argument-file ./my/argument/file.txt my_canister_name greet`
* Stdin: `echo '( null )' | dfx canister call --argument-file - my_canister_name greet`

### Fixed: Use default setting for BTC adapter idle seconds

A lower threshold was no longer necessary.

### New feature: Allow users to configure logging level of bitcoin adapter

The bitcoin adapter's logging can be very verbose if debug logging is enabled, making it difficult to make sense of what's going on. On the other hand, these logs are useful for triaging problems.

To get the best of both worlds, this release adds support for an additional configuration option in dfx.json:

    "bitcoin": {
      "enabled": true,
      "nodes": ["127.0.0.1:18444"],
      "log_level": "info" <------- users can now configure the log level
    }

By default, a log level of "info" is used, which is relatively quiet. Users can change it to "debug" for more verbose logging.

### Chore: update Candid UI canister with commit bffa0ae3c416e8aa3c92c33722a6b1cb31d0f1c3

This includes the following changes:

* Fetch did file from canister metadata
* Better flamegraph support
* Fix bigint error for vec nat8 type

### New feature: dfx will look up the port of the running webserver from .dfx/webserver-port, if present

After `dfx start --host 127.0.0.1:0`, the dfx webserver will listen on an ephemeral port.  It stores the port value in .dfx/webserver-port.  dfx will now look for this file, and if a port is contained within, use that port to connect to the dfx webserver.

### Fixed: dfx commands once again work from any subdirectory of a dfx project

Running `dfx deploy`, `dfx canister id`, `dfx canister call` and so forth work as expected
if run from within any subdirectory of a dfx project.  Previously, this would create
canister_ids.json or .dfx/local/canister_ids.json within the subdirectory.

### New feature: Post-installation tasks

You can now add your own custom post-installation/post-deployment tasks to any canister type. The new `post-install` key for canister objects in `dfx.json` can be a command or list of commands, similar to the `build` key of `custom` canisters, and receives all the same environment variables. For example, to replicate the upload task performed with `assets` canisters, you might set `"post-install": "icx-asset sync $CANISTER_ID dist"`.

### New feature: assets are no longer copied from source directories before being uploaded to asset canister

Assets are now uploaded directly from their source directories, rather than first being copied
to an output directory.

If you're using `dfx deploy`, you won't see any change in functionality.  If you're running
`dfx canister install --mode=upgrade`, changed files in asset source directories will
be detected and uploaded even without an intervening `dfx build`.

### Fixed: Added src/declarations to .gitignore for new projects

### Fixed: remove deprecated candid path environment variable

The environment variable format `CANISTER_CANDID_{name}`, used in Rust projects, was deprecated in 0.9.2, to be unified with the variables `CANISTER_CANDID_PATH_{name}` which are used in other project types. It has now been removed. Note that you will need to update `ic-cdk-macros` if you use the `#[import]` macro.

### New feature: deprecate `dfx config` for removal

The `dfx config` command has several issues and is ultimately a poor replacement for [jq](https://stedolan.github.io/jq/). The command is being deprecated, and will be removed in a later release; we recommend switching to `jq` or similar tools (e.g. `ConvertTo-Json` in PowerShell, `to json` in nushell, etc.)

### New feature: Better build scripts for type:custom

Build scripts now always receive a CWD of the DFX project root, instead of wherever `dfx` was invoked from, and a bare script `script.sh` can be specified without needing to prefix with `./`.

### New feature: rust, custom, and asset canisters now include candid:service metadata

Motoko canisters already included this metadata.

Also added this metadata to the asset canister wasm, which will cause the next deploy to
install this new version.

### New feature: Add safeguard to freezing threshold

Some developers mistakenly think that the freezing threshold is measured in cycles, but it is actually measured in seconds. To stop them from accidentally freezing their canisters, setting a freezing threshold above 50M seconds (~1.5 years) now requires a confirmation.

### Fixed: restores assets to webpack devserver

### Chore: updates webpack dependencies for dfx new project

Resolves an issue where `webpack-cli` was was breaking when users tried to run `npm start` in a fresh project. For affected users of 0.10.1, you can resolve this issue manually by running `npm install webpack@latest webpack-cli@latest terser-webpack-plugin@latest`.

### New feature: Support for new ledger notify function

Ledger 7424ea8 deprecates the existing `notify` function with a switch parameter between creating and topping up a canister, and introduces two
functions for doing the same. This should *mostly* be invisible to users, except that previously, if `dfx ledger create-canister` or `dfx ledger top-up`
failed, you would call `dfx ledger notify` after correcting the issue. In order to support the change, this command has been changed to two subcommands:
`dfx ledger notify create-canister` and `dfx ledger notify top-up`.

### New feature: `--from-subaccount`

Previously, the ledger commands assumed all transfers were made from the default subaccount for the identity principal. This feature adds a `--from-subaccount` flag to `dfx ledger transfer`, `dfx ledger create-canister`, and `dfx ledger top-up`, to enable making transfers from a selected subaccount. A `--subaccount` flag is also added to `dfx ledger balance` for convenience. Subaccounts are expected as 64-character hex-strings (i.e. 32 bytes).

### New feature: cargo audit when building rust canisters

When a canister with type `rust` is built and `cargo-audit` is installed, dfx will now check for vulnerabilities in the dependencies. If a vulnerability is found, dfx will recommend that the user update to a version without known vulnerabilities.

### Fixed: Freezing Threshold now documented

Calls made to retrieve the help output for `canister update-settings` was missing the `freezing-threshold` parameter.

### Chore: warnings and errors are more visible

`WARN` and `ERROR` messages are now clearly labelled as such, and the labels are colored accordingly.
This is now included when running `dfx canister update-settings -h`.

### Fixed: canister call uses candid file if canister type cannot be determined

The candid file specified in the field `canisters.<canister name>.candid` of dfx.json, or if that not exists `canisters.<canister name>.remote.candid`, is now used when running `dfx canister call`, even when dfx fails to determine the canister type.

### Fixed: btc/canister http adapter socket not found by replica after restart

After running `dfx start --enable-bitcoin` twice in a row (stopping dfx in between), the second
launched replica would fail to connect to the btc adapter.  This is because ic-starter
does not write a new configuration file if one already exists, so the configuration file
used by the replica referred to one socket path, while dfx passed a different socket path
to the btc adapter.

Now dfx reuses the previously-used unix domain socket path, for both the btc adapter
and for the canister http adapter.

### Fixed: dfx stop now waits until dfx and any child processes exit

Previously, `dfx stop` would send the TERM signal to the running dfx and its child processes,
and then exit immediately.

This avoids interference between a dfx process performing cleanup at shutdown and
a dfx process that is starting.

### Fixed: dfx ping no longer creates a default identity

dfx ping now uses the anonymous identity, and no longer requires dfx.json to be present.

### Fixed: Initialize replica with bitcoin regtest flag

When the bitcoin feature is enabled, dfx was launching the replica with the "bitcoin_testnet" feature.
The correct feature to use is "bitcoin_regtest".

### New feature: dfx bootstrap now looks up the port of the local replica

`dfx replica` writes the port of the running replica to one of these locations:

- .dfx/replica-configuration/replica-1.port
- .dfx/ic-ref.port

`dfx bootstrap` will now use this port value, so it's no longer necessary to edit dfx.json after running `dfx replica`.

### New feature: dfx.json local network settings can be set on the local network, rather than defaults

In `dfx.json`, the `bootstrap`, `bitcoin`, `canister_http`, and `replica` settings can
now be specified on the local network, rather than in the `defaults` field.
If one of these four fields is set for the local network, the corresponding field
in `defaults` will be ignored.

Example:

    {
        "networks": {
            "local": {
                "bind": "127.0.0.1:8000",
                "canister_http": {
                    "enabled": true
                }
            }
        }
    }

## Dependencies

### Rust Agent

Updated agent-rs to 0.18.0

### Motoko

Updated Motoko from 0.6.28 to 0.6.29.

### Replica

Updated replica to elected commit 8993849de5fab76e796d67750facee55a0bf6649.
This incorporates the following executed proposals:

* [69804](https://dashboard.internetcomputer.org/proposal/69804)
* [69116](https://dashboard.internetcomputer.org/proposal/69116)
* [67990](https://dashboard.internetcomputer.org/proposal/67990)
* [67483](https://dashboard.internetcomputer.org/proposal/67483)
* [66895](https://dashboard.internetcomputer.org/proposal/66895)
* [66888](https://dashboard.internetcomputer.org/proposal/66888)
* [65530](https://dashboard.internetcomputer.org/proposal/65530)
* [65327](https://dashboard.internetcomputer.org/proposal/65327)
* [65043](https://dashboard.internetcomputer.org/proposal/65043)
* [64355](https://dashboard.internetcomputer.org/proposal/64355)
* [63228](https://dashboard.internetcomputer.org/proposal/63228)
* [62143](https://dashboard.internetcomputer.org/proposal/62143)

### ic-ref

Updated ic-ref to 0.0.1-173cbe84
- add ic0.performance_counter system interface
- add system API for ECDSA signing
- allow optional "error_code" field in responses
- support gzip-compressed canister modules
- enable canisters to send HTTP requests

# What’s new in 0.10.1

## Changes to DFX

### Fixed: Webpack config no longer uses CopyPlugin

Dfx already points to the asset canister's assets directory, and copying to disk could sometimes
lead to an annoying "too many open files" error.

### Fixed: HSMs are once again supported on Linux

On Linux, dfx 0.10.0 failed any operation with an HSM with the following error:
Error: IO: Dynamic loading not supported

The fix was to once again dynamically-link the Linux build.

### New feature: error explanation and fixing instructions engine

Dfx is now capable of providing explanations and remediation suggestions for entire categories of errors at a time.
Explanations and suggestions will slowly be added over time.
To see an example of an already existing suggestion, run `dfx deploy --network ic` while using an identity that has no wallet configured.

### Improvement: add context to errors

Most errors that happen within dfx are now reported in much more detail. No more plain `File not found` without explanation what even was attempted.

### Fixed: identities with configured wallets are not broken anymore and removed only when using the --drop-wallets flag

When an identity has a configured wallet, dfx no longer breaks the identity without actually removing it.
Instead, if the --drop-wallets flag is specified, it properly removes everything and logs what wallets were linked,
and when the flag is not specified, it does not remove anything.

The behavior for identities without any configured wallets is unchanged.

### New Feature: print wallet balance in a human readable form

Default behaviour changed for `dfx wallet balance`, it will now print cycles amount upscaled to trillions.

New flag `--precise` added to `dfx wallet balance`. Allows to get exact amount of cycles in wallet (without upscaling).

### Fixed: specifying ic provider with a trailing slash is recognised correctly

Specifying the network provider as `https://ic0.app/` instead of `https://ic0.app` is now recognised as the real IC network.

### Binary cache

Added ic-canister-http-adapter to the binary cache.

## Dependencies

### Updated agent-rs to 0.17.0

### Motoko

Updated Motoko from 0.6.26 to 0.6.28.

### Replica

Updated replica to elected commit b90edb9897718730f65e92eb4ff6057b1b25f766.
This incorporates the following executed proposals:

* https://dashboard.internetcomputer.org/proposal/61004[61004]
* https://dashboard.internetcomputer.org/proposal/60222[60222]
* https://dashboard.internetcomputer.org/proposal/59187[59187]
* https://dashboard.internetcomputer.org/proposal/58479[58479]
* https://dashboard.internetcomputer.org/proposal/58376[58376]
* https://dashboard.internetcomputer.org/proposal/57843[57843]
* https://dashboard.internetcomputer.org/proposal/57395[57395]

### icx-proxy

Updated icx-proxy to commit c312760a62b20931431ba45e5b0168ee79ea5cda

* Added gzip and deflate body decoding before certification validation.
* Fixed unzip and streaming bugs
* Added Prometheus metrics endpoint
* Added root and invalid ssl and dns mapping

## Highlights of what’s new in 0.10.0

An overview of the 0.10.0 release:

The default subnet type is now `application` for local networks.  This means cycles limits will match the values enforced for your canisters on mainnet, and the local replica will track cycle usage for your canisters. You can top up your local canisters with the new `dfx ledger fabricate-cycles` command.

We've upgraded the cycles wallet to support 128-bit operations.  You will need to upgrade it with `dfx wallet upgrade` and/or `dfx wallet --network ic upgrade`.

dfx can now store private keys in an encrypted format.

### Changes to DFX

#### New feature: Use null as default value for opt arguments

Before this, `deploy` ing a canister with an `opt Foo` init argument without specifying an `--argument` would lead to an error:

```
$ dfx deploy
Error: Invalid data: Expected arguments but found none.
```

With this change, this isn't an error anymore, but instead `null` is passed as a value. In general, if the user does _not_ provide an `--argument`, and if the init method expects only `opt` arguments, then `dfx` will supply `null` for each argument.

Note in particular that this does not try to match `opt` arguments for heterogeneous (`opt`/non-`opt`) signatures. Note moreover that this only impacts a case that would previously error out, so no existing (working) workflows should be affected.

#### New feature: dfx identity set-wallet now checks that the provided canister is actually a wallet

This check was previously performed on local networks, but not on mainnet.

#### New feature: `dfx canister call --candid <path to candid file>`

Allows one to provide the .did file for calls to an arbitrary canister.

#### New feature: Install arbitrary wasm into canisters

You no longer need a DFX project setup with a build task to install an already-built wasm module into a canister ID. The new `--wasm <path>` flag to `dfx canister install` will bypass project configuration and install the wasm module at `<path>`. A DFX project setup is still recommended for general use; this should mostly be used for installing pre-built canisters. Note that DFX will also not perform its usual checks for API/ABI/stable-memory compatibility in this mode.

#### New feature: Support for 128-bit cycle counts

Cycle counts can now exceed the previously set maximum of 2^64. The new limit is 2^128. A new wallet version has been bundled with this release that supports the new cycle count. You will not be able to use this feature with your existing wallets without running `dfx wallet upgrade`, but old wallets will still work just fine with old cycle counts.

#### Fixed: dfx start will once again notice if dfx is already running

dfx will once again display 'dfx is already running' if dfx is already running,
rather than 'Address already in use'.

As a consequence, after `dfx start` failed to notice that dfx was already running,
it would replace .dfx/pid with an empty file.  Later invocations of `dfx stop`
would display no output and return a successful exit code, but leave dfx running.

#### Fixed: dfx canister update-settings `<canister id>` works even if the canister id is not known to the project.

This makes the behavior match the usage text of the command:
`<CANISTER> Specifies the canister name or id to update. You must specify either canister name/id or the --all option`

#### New feature: dfx deploy --upgrade-unchanged or dfx canister install --mode upgrade --upgrade-unchanged

When upgrading a canister, `dfx deploy` and `dfx canister install` skip installing the .wasm
if the wasm hash did not change.  This avoids a round trip through stable memory for all
assets on every dfx deploy, for example.  By passing this argument, dfx will instead
install the wasm even if its hash matches the already-installed wasm.

#### New feature: Introduce DFX_CACHE_ROOT environment variable

A new environment variable, `DFX_CACHE_ROOT`, has been introduced to allow setting the cache root directory to a different location than the configuration root directory. Previously `DFX_CONFIG_ROOT` was repurposed for this which only allowed one location to be set for both the cache and configuration root directories.

This is a breaking change since setting `DFX_CONFIG_ROOT` will no longer set the cache root directory to that location.

#### Fixed: Error if nonzero cycles are passed without a wallet proxy

Previously, `dfx canister call --with-cycles 1` would silently ignore the `--with-cycles` argument as the DFX principal has no way to pass cycles and the call must be forwarded through the wallet. Now it will error instead of silently ignoring it. To forward a call through the wallet, use `--wallet $(dfx identity get-wallet)`, or `--wallet $(dfx identity --network ic get-wallet)` for mainnet.

#### New feature: Configure subnet type of local replica

The local replica sets its parameters according to the [subnet type](../../../concepts/nodes-subnets.md#subnet-blockchains) defined in defaults.replica.subnet_type, defaulting to 'application' when none is specified.
This makes it less likely to accidentally hit the `cycles limit exceeded` error in production. Since the previous default was `system`, you may see these types of errors in development instead.
Possible values for defaults.replica.subnet_type are: "application", "verifiedapplication", "system"

Example how to specify the [subnet type](../../../concepts/nodes-subnets.md#subnet-blockchains):
```
{
  "defaults": {
    "replica": {
      "subnet_type": "verifiedapplication"
    }
  }
}
```

#### New feature: Introduce command for local cycles top-up

`dfx ledger fabricate-cycles <canister (id)> <optional amount>` can be used during local development to create cycles out of thin air and add them to a canister. Instead of supplying a canister name or id it is also possible to use `--all` to add the cycles to every canister in the current project. When no amount is supplied, the command uses 10T cycles as default. Using this command with `--network ic` will result in an error.

#### New feature: Private keys can be stored in encrypted format

`dfx identity new` and `dfx identity import` now ask you for a password to encrypt the private key (PEM file) when it is stored on disk.
If you decide to use a password, your key will never be written to disk in plain text.
In case you don't want to enter your password all the time and want to take the risk of storing your private key in plain text, you can use the `--disable-encryption` flag.

The `default` identity as well as already existing identities will NOT be encrypted. If you want to encrypt an existing identity, use the following commands:
```
dfx identity export identity_name > identity.pem
# if you have set old_identity_name as the identity that is used by default, switch to a different one
dfx identity use other_identity
dfx identity remove identity_name
dfx identity import identity_name identity.pem
```

#### New feature: Identity export

If you want to get your identity out of dfx, you can use `dfx identity export identityname > exported_identity.pem`. But be careful with storing this file as it is not protected with your password.

#### New feature: Identity new/import now has a --force flag

If you want to script identity creation and don't care about overwriting existing identities, you now can use the `--force` flag for the commands `dfx identity new` and `dfx identity import`.

#### Fixed: Do not automatically create a wallet on IC

When running `dfx deploy --network ic`, `dfx canister --network ic create`, or `dfx identity --network ic get-wallet` dfx no longer automatically creates a cycles wallet for the user if none is configured. Instead, it will simply report that no wallet was found for that user.

Dfx still creates the wallet automatically when running on a local network, so the typical workflow of `dfx start --clean` and `dfx deploy` will still work without having to manually create the wallet.

#### Fixed: Identities cannot exist and not at the same time

When something went wrong during identity creation, the identity was not listed as existing.
But when trying to create an identity with that name, it was considered to be already existing.

#### Fixed: report context of errors

dfx now displays the context of an error in several places where previously the only error
message would be something like "No such file or directory."

#### chore: updates starter project for Node 18

Webpack dev server now works for Node 18 (and should work for Node 17). A few packages are also upgraded

### Updating Dependencies

Updated to version 0.14.0 of agent-rs

### Cycles wallet

Module hash: bb001d1ebff044ba43c060956859f614963d05c77bd778468fce4de095fe8f92
https://github.com/dfinity/cycles-wallet/commit/f18e9f5c2f96e9807b6f149c975e25638cc3356b

### Replica

Updated replica to elected commit b3788091fbdb8bed7e527d2df4cc5e50312f476c.
This incorporates the following executed proposals:

* https://dashboard.internetcomputer.org/proposal/57150[57150]
* https://dashboard.internetcomputer.org/proposal/54964[54964]
* https://dashboard.internetcomputer.org/proposal/53702[53702]
* https://dashboard.internetcomputer.org/proposal/53231[53231]
* https://dashboard.internetcomputer.org/proposal/53134[53134]
* https://dashboard.internetcomputer.org/proposal/52627[52627]
* https://dashboard.internetcomputer.org/proposal/52144[52144]
* https://dashboard.internetcomputer.org/proposal/50282[50282]

Added the ic-btc-adapter binary to the cache.

### Motoko

Updated Motoko from 0.6.25 to 0.6.26.

## 0.9.3

An overview of the 0.9.3 release:

### Changes to DFX

#### New feature: dfx deploy now displays URLs for the frontend and candid interface

#### dfx.json

In preparation for BTC integration, added configuration for the bitcoind port:

``` json
{
  "canisters": {},
  "defaults": {
    "bitcoind": {
      "port": 18333
    }
  }
}
```

### Changes to icx-proxy

Updated icx-proxy to commit 594b6c81cde6da4e08faee8aa8e5a2e6ae815602, now static-linked.

-   upgrade HTTP calls upon canister request

-   no longer proxies /\_/raw to the dfx internal webserver

-   allows for generic StreamingCallback tokens

### Changes to Replica

Updated replica to blessed commit d004accc3904e24dddb13a11d93451523e1a8a5f. This incorporates the following executed proposals:

-   [49653](https://dashboard.internetcomputer.org/proposal/49653)

-   [49011](https://dashboard.internetcomputer.org/proposal/49011)

-   [48427](https://dashboard.internetcomputer.org/proposal/48427)

-   [47611](https://dashboard.internetcomputer.org/proposal/47611)

-   [47512](https://dashboard.internetcomputer.org/proposal/47512)

-   [47472](https://dashboard.internetcomputer.org/proposal/47472)

-   [45984](https://dashboard.internetcomputer.org/proposal/45984)

-   [45982](https://dashboard.internetcomputer.org/proposal/45982)

### Motoko

Updated Motoko from 0.6.21 to 0.6.25.

## 0.9.2

An overview of the 0.9.2 release:

Be sure to see the [0.9.0 Release Notes](#090) and follow the instructions due to breaking changes since dfx 0.8.4.

### Changes to DFX

#### New Feature: Verify Candid and Motoko stable variable type safety of canister upgrades

Newly deployed Motoko canisters now embed the Candid interface and Motoko stable signatures in the Wasm module. `dfx deploy` and `dfx canister install` will automatically check

    1) the backward compatible of Candid interface in both upgrade and reinstall mode;
    2) the type safety of Motoko stable variable type in upgrade mode to avoid accidentally lossing data;

See [Upgrade compatibility](https://smartcontracts.org/docs/language-guide/compatibility.html) for more details.

#### New Feature: Unified environment variables across build commands

The three canister types that use a custom build tool - `assets`, `rust`, and `custom` - now all support the same set of environment variables during the build task:

-   `DFX_VERSION` - The version of DFX that was used to build the canister.

-   `DFX_NETWORK` - The network name being built for. Usually `ic` or `local`.

-   `CANISTER_ID_{canister}` - The canister principal ID of the canister `{canister}` registered in `dfx.json`.

-   `CANISTER_CANDID_PATH_{canister}` - The path to the Candid interface file for the canister `{canister}` among your canister’s dependencies.

-   `CANISTER_CANDID_{canister}` (deprecated) - the same as `CANISTER_CANDID_PATH_{canister}`. This is provided for backwards compatibility with `rust` and `custom` canisters, and will be removed in dfx 0.10.0.

-   `CANISTER_ID` - Same as `CANISTER_ID_{self}`, where `{self}` is the name of *this* canister.

-   `CANISTER_CANDID_PATH` - Same as `CANISTER_CANDID_PATH_{self}`, where `{self}` is the name of *this* canister.

#### New Feature: Support for local ledger calls

If you have an installation of the ICP Ledger (see [Ledger Installation Guide](https://github.com/dfinity/ic/tree/master/rs/rosetta-api/ledger_canister#deploying-locally)), `dfx ledger balance` and `dfx ledger transfer` now support `--ledger-canister-id` parameter.

Some examples:

``` base
$ dfx ledger \
  --network local \
  balance \
  --ledger-canister-id  rrkah-fqaaa-aaaaa-aaaaq-cai
1000.00000000 ICP

$ dfx ledger \
  --network local \
  transfer --amount 0.1 --memo 0 \
  --ledger-canister-id  rrkah-fqaaa-aaaaa-aaaaq-cai 8af54f1fa09faeca18d294e0787346264f9f1d6189ed20ff14f029a160b787e8
Transfer sent at block height: 1
```

#### New Feature: `dfx ledger account-id` can now compute canister addresses

The `dfx ledger account-id` can now compute addresses of principals and canisters. The command also supports ledger subaccounts now.

``` bash
dfx ledger account-id --of-principal 53zcu-tiaaa-aaaaa-qaaba-cai
dfx ledger --network small02 account-id --of-canister ledger_demo
dfx ledger account-id --of-principal 53zcu-tiaaa-aaaaa-qaaba-cai --subaccount 0000000000000000000000000000000000000000000000000000000000000001
```

#### New Feature: Print the full error chain in case of a failure

All `dfx` commands will now print the full stack of errors that led to the problem, not just the most recent error. Example:

    Error: Subaccount '00000000000000000000000000000000000000000000000000000000000000000' is not a valid hex string
    Caused by:
      Odd number of digits

#### Fixed: dfx import will now import pem files created by `quill generate`

`quill generate` currently outputs .pem files without an `EC PARAMETERS` section. `dfx identity import` will now correctly identify these as EC keys, rather than Ed25519.

#### Fixed: retry on failure for ledger create-canister, top-up, transfer

dfx now calls `transfer` rather than `send_dfx`, and sets the created_at_time field in order to retry the following commands:

-   dfx ledger create-canister

-   dfx ledger top-up

-   dfx ledger transfer

#### New Feature: Remote canister support

It’s now possible to specify that a canister in dfx.json references a "remote" canister on a specific network, that is, a canister that already exists on that network and is managed by some other project.

Motoko, Rust, and custom canisters may be configured in this way.

This is the general format of the configuration in dfx.json:

``` json
{
  "canisters": {
    "<canister name>": {
      "remote": {
        "candid": "<path to candid file to use when building on remote networks>"
        "id": {
          "<network name>": "<principal on network>"
        }
      }
    }
  }
}
```

The "id" field, if set for a given network, specifies the canister ID for the canister on that network. The canister will not be created or installed on these remote networks. For other networks, the canister will be created and installed as usual.

The "candid" field, if set within the remote object, specifies the candid file to build against when building other canisters on a network for which the canister is remote. This definition can differ from the candid definitions for local builds.

For example, if have an installation of the ICP Ledger (see [Ledger Installation Guide](https://github.com/dfinity/ic/tree/master/rs/rosetta-api/ledger_canister#deploying-locally)) in your dfx.json, you could configure the canister ID of the Ledger canister on the IC network as below. In this case, the private interfaces would be available for local builds, but only the public interfaces would be available when building for `--network ic`.

``` json
{
  "canisters": {
    "ledger": {
      "type": "custom",
      "wasm": "ledger.wasm",
      "candid": "ledger.private.did",
      "remote": {
        "candid": "ledger.public.did",
        "id": {
          "ic": "ryjl3-tyaaa-aaaaa-aaaba-cai"
        }
      }
    },
    "app": {
      "type": "motoko",
      "main": "src/app/main.mo",
      "dependencies": [ "ledger" ]
    }
  }
}
```

As a second example, suppose that you wanted to write a mock of the ledger in Motoko. In this case, since the candid definition is provided for remote networks, `dfx build` (with implicit `--network local`) will build app against the candid definitions defined by mock.mo, but `dfx build --network ic` will build app against `ledger.public.did`.

This way, you can define public update/query functions to aid in local testing, but when building/deploying to mainnet, references to methods not found in `ledger.public.did` will be reported as compilation errors.

``` json
{
  "canisters": {
    "ledger": {
      "type": "motoko",
      "main": "src/ledger/mock.mo",
      "remote": {
        "candid": "ledger.public.did",
        "id": {
          "ic": "ryjl3-tyaaa-aaaaa-aaaba-cai"
        }
      }
    },
    "app": {
      "type": "motoko",
      "main": "src/app/main.mo",
      "dependencies": [ "ledger" ]
    }
  }
}
```

#### New Feature: Generating remote canister bindings

It’s now possible to generate the interface of a remote canister using a .did file using the `dfx remote generate-binding <canister name>|--all` command. This makes it easier to write mocks for local development.

Currently, dfx can generate .mo, .rs, .ts, and .js bindings.

This is how you specify how to generate the bindings in dfx.json:

``` json
{
  "canisters": {
    "<canister name>": {
      "main": "<path to mo/rs/ts/js file that will be generated>",
      "remote": {
        "candid": "<path to candid file to use when generating bindings>"
        "id": {}
      }
    }
  }
}
```

### Motoko

Updated Motoko from 0.6.20 to 0.6.21.

### Replica

Updated replica to blessed commit 04fe8b0a1262f07c0cec1fdfa838a37607370a61. This incorporates the following executed proposals:

-   [45091](https://dashboard.internetcomputer.org/proposal/45091)

-   [43635](https://dashboard.internetcomputer.org/proposal/43635)

-   [43633](https://dashboard.internetcomputer.org/proposal/43633)

-   [42783](https://dashboard.internetcomputer.org/proposal/42783)

-   [42410](https://dashboard.internetcomputer.org/proposal/42410)

-   [40908](https://dashboard.internetcomputer.org/proposal/40908)

-   [40647](https://dashboard.internetcomputer.org/proposal/40647)

-   [40328](https://dashboard.internetcomputer.org/proposal/40328)

-   [39791](https://dashboard.internetcomputer.org/proposal/39791)

-   [38541](https://dashboard.internetcomputer.org/proposal/38541)

### ic-ref

Upgraded from a432156f24faa16d387c9d36815f7ddc5d50e09f to ab8e3f5a04f0f061b8157c2889f8f5de05f952bb

-   Support 128-bit system api for cycles

-   Include canister_ranges in the state tree

-   Removed limit on cycles in a canister

##  0.9.0

An overview of the 0.9.0 release:

This release removes the `--no-wallet` parameter by making use of the fact that canisters can now have multiple controllers.

Please see below for required upgrade steps.

### Changes to DFX

#### New feature (breaking change): Remove the wallet proxy and the --no-wallet flag

Breaking change: Canister commands, except for `dfx canister create`, will make the call directly, rather than via the user’s wallet. The `--no-wallet` flag is thus removed from `dfx canister` as its behavior is the default.

When working with existing canisters, use the `--wallet` flag in conjunction with `dfx identity get-wallet` in order to restore the old behavior.

You will need to upgrade your wallet and each of your existing canisters to work with the new system. To do so, execute the following in each of your dfx projects:

``` bash
dfx wallet upgrade
dfx canister --wallet "$(dfx identity get-wallet)" update-settings --all --add-controller "$(dfx identity get-principal)"
```

To upgrade projects that you have deployed to the IC mainnet, execute the following:

``` bash
dfx wallet --network ic upgrade
dfx canister --network ic --wallet "$(dfx identity --network ic get-wallet)" update-settings --all --add-controller "$(dfx identity get-principal)"
```

#### New feature: Add --add-controller and --remove-controller flags for "canister update-settings"

`dfx canister update-settings` previously only let you overwrite the entire controller list; `--add-controller` and `--remove-controller` instead add or remove from the list.

#### New feature: Add --no-withdrawal flag for "canister delete" for when the canister is out of cycles

`dfx canister delete --no-withdrawal <canister>` can be used to delete a canister without attempting to withdraw cycles.

#### Fixed: set RUST_MIN_STACK to 8MB for ic-starter (and therefore replica)

This matches the value used in production and is meant to exceed the configured 5 MB wasmtime stack.

#### Fixed: asset uploads will retry failed requests as expected

Fixed a defect in asset synchronization where no retries would be attempted after the first 30 seconds overall.

### Motoko

Updated Motoko from 0.6.11 to 0.6.20.

-   Implement type union/intersection

-   Transform for-loops on arrays into while-loops

-   Tighten typing rules for type annotations in patterns

-   Candid decoding: skip vec any fast

-   Bump up MAX_HP_FOR_GC from 1GB to 3GB

-   Candid decoder: Trap if a principal value is too large

-   Eliminate bignum calls from for-iteration on arrays

-   Improve scheduling

-   Improve performance of bignum equality

-   Stable signatures: frontend, metadata, command-line args

-   Added heartbeat support

### Cycles wallet

Module hash: 53ec1b030f1891bf8fd3877773b15e66ca040da539412cc763ff4ebcaf4507c5 <https://github.com/dfinity/cycles-wallet/commit/57e53fcb679d1ea33cc713d2c0c24fc5848a9759>

### Replica

Updated replica to blessed commit 75138bbf11e201aac47266f07bee289dc18a082b. This incorporates the following executed proposals:

-   [33828](https://dashboard.internetcomputer.org/proposal/33828)

-   [31275](https://dashboard.internetcomputer.org/proposal/31275)

-   [31165](https://dashboard.internetcomputer.org/proposal/31165)

-   [30392](https://dashboard.internetcomputer.org/proposal/30392)

-   [30078](https://dashboard.internetcomputer.org/proposal/30078)

-   [29235](https://dashboard.internetcomputer.org/proposal/29235)

-   [28784](https://dashboard.internetcomputer.org/proposal/28784)

-   [27975](https://dashboard.internetcomputer.org/proposal/27975)

-   [26833](https://dashboard.internetcomputer.org/proposal/26833)

-   [25343](https://dashboard.internetcomputer.org/proposal/25343)

-   [23633](https://dashboard.internetcomputer.org/proposal/23633)

#### Repeated warning about missing max_block_payload_size registry setting

The replica logs will display a warning about a missing registry setting approximately every five minutes. The replica will use the required minimum value. You can ignore this warning.

The warnings look like this:

    Jan 19 19:03:42.719 WARN s:crz25-qujie-7jqyj-d5ldq-p3psu-y2hmg-c32rf-pnfda-xskfm-dtnmc-iqe/n:fw7p7-4ynfm-s6e5c-axkum-76532-d2k4j-aowre-7twtq-gabts-hfs2e-cae/ic_consensus/payload_builder max_block_payload_size too small. current value: 0, required minimum: 3670016! max_block_payload_size must be larger than max_ingress_bytes_per_message and MAX_XNET_PAYLOAD_IN_BYTES. Update registry!

## 0.8.4

An overview of the 0.8.4 release:

-   Added first-class support for rust canisters.

-   The included replica now supports canister_heartbeat.

### Changes to DFX

#### New feature: Added "rust" canister type

You can now declare "rust" canisters in dfx.json.

``` json
{
  "canisters": {
    "canister_name": {
      "type": "rust",
      "package": "crate_name",
      "candid": "path/to/canister_name.did"
    }
  }
}
```

Don’t forget to place a `Cargo.toml` in your project root. Then dfx will build the rust canister with your rust toolchain. Please also make sure that you have added the WebAssembly compilation target.

``` bash
rustup target add wasm32-unknown-unknown
```

You can also create new dfx project with a default rust canister.

``` bash
dfx new --type=rust <project-name>
```

#### Updated the new project template

Updated dependencies to latest for Webpack, and updated the configuration. Additionally simplified environment variables for canister IDs in config.

Additionally added some polish to the starter template, including a favicon and using more semantic html in the example app

#### New feature: environment variable overrides for executable pathnames

You can now override the location of any executable normally called from the cache by specifying an environment variable. For example, DFX_ICX_PROXY_PATH will specify the path for `icx-proxy`.

#### New feature: dfx deploy --mode=reinstall \<canister\>

`dfx deploy` can now reinstall a single canister, controlled by a new `--mode=reinstall` parameter. This is destructive (it resets the state of the canister), so it requires a confirmation and can only be performed on a single canister at a time.

`dfx canister install --mode=reinstall <canister>` also requires the same confirmation, and no longer works with `--all`.

### Changes to Replica

The included replica now supports canister_heartbeat. This only works with rust canisters for the time being, and does not work with the emulator (`dfx start --emulator`).

## 0.8.3

An overview of the 0.8.3 release:

Breaking change: Removed `--no-artificial-delay` option from `dfx start` and `dfx replica`

### Changes to DFX

#### Breaking change: Replaced `--no-artificial-delay` option with a sensible default

The `--no-artificial-delay` option not being the default has been causing a lot of confusion. Now that we have measured in production and already applied a default of 600ms to most subnets deployed, we set the same default for dfx and removed this option.

### Changes to Replica

#### Fixed: ic-ref linux binary no longer references /nix/store

This means `dfx start --emulator` has a chance of working on linux if nix is not installed. This has always been broken, even before dfx 0.7.0.

#### Fixed: replica and ic-starter linux binaries no longer reference /nix/store

This means `dfx start` will work again on linux. This bug was introduced in dfx 0.8.2.

### Changes to Motoko

Updated Motoko from 0.6.10 to 0.6.11

-   Assertion error messages are now reproducible (#2821)

## 0.8.2

An overview of the 0.8.2 release:

-   Breaking change in how to specify a controller to `dfx canister create`

-   Be sure to upgrade your wallet with `dfx wallet upgrade`, or `dfx wallet --network ic upgrade`

### Changes to DFX

#### Breaking change: controller parameter for dfx canister create

Breaking change: The controller parameter for `dfx canister create` is now passed as a named parameter, rather than optionally following the canister name.

Old: dfx canister create \[canister name\] \[controller\] New: dfx canister create --controller \<controller\> \[canister name\]

#### JS Codegen update - JSDoc comment now accepts a complete Agent for createActor

#### dfx canister delete can now return cycles to a wallet or dank

By default `dfx canister delete` will return cycles to the default cycles wallet. Cycles can be returned to a designated canister with `--withdraw-cycles-to-canister` and cycles can be returned to dank at the current identity principal with `--withdraw-cycles-to-dank` and to a designated principal with `--withdraw-cycles-to-dank-principal`.

#### New feature: dfx canister create now accepts multiple instances of --controller argument

It is now possible to create canisters with more than one controller by passing multiple instances of the `--controller` parameter to `dfx canister create`.

You will need to upgrade your wallet with `dfx wallet upgrade`, or `dfx wallet --network ic upgrade`

#### New feature: dfx canister update-settings now accepts multiple instance of --controller argument

It is now possible to configure a canister to have more than one controller by passing multiple instances of the `--controller` parameter to `dfx canister update-settings`.

#### New feature: dfx canister info and dfx canister status now display all controllers

#### Fixed: dfx now respects $DFX_CONFIG_ROOT when looking for legacy credentials

Previously this would always look in `$HOME/.dfinity/identity/creds.pem`.

#### Fixed: changed dfx canister (create\|update-settings) --memory-allocation limit to 12 GiB

Updated the maximum value for the `--memory-allocation` value to be 12 GiB (12,884,901,888 bytes)

### Changes to Cycles Wallet

-   Module hash: 9183a38dd2eb1a4295f360990f87e67aa006f225910ab14880748e091248e086

-   <https://github.com/dfinity/cycles-wallet/commit/9ef38bb7cd0fe17cda749bf8e9bbec5723da0e95>

#### Added support for multiple controllers

You will need to upgrade your wallet with `dfx wallet upgrade`, or `dfx wallet --network ic upgrade`

### Changes to Replica

-   Updated to [Interface Spec 0.18.0](https://smartcontracts.org/docs/ic-interface-spec.md)

    -   A canister has a set of controllers, instead of always one

-   Added support for 64-bit stable memory

-   The replica now goes through an initialization sequence, reported in its status as `replica_health_status`. Until this reports as `healthy`, queries or updates will fail.

    -   `dfx start --background` waits to exit until `replica_health_status` is `healthy`.

    -   If you run `dfx start` without `--background`, you can call `dfx ping --wait-healthy` to wait until the replica is healthy.

### Changes to Motoko

Updated Motoko from 0.6.7 to 0.6.10

-   Add Debug.trap : Text → None (motoko-base \#288)

-   Introduce primitives for `Int` ⇔ `Float` conversions (#2733)

-   Fix crashing bug for formatting huge floats (#2737)

## 0.8.1

An overview of the 0.8.1 release:

-   Adds a `dfx generate` command to generate types for code editors.

-   Adds support for anonymous identities.

-   Makes `dfx import` work with default identities.

-   Adds support for nonstandard wallet modules.

-   Improves performance of the asset canister to allow for storage of more and larger assets.

-   Updates to version 0.6.7 of Motoko.

### Changes to DFX

#### New command: dfx generate

``` bash
dfx generate
```

This new command will generate type declarations for canisters in dfx.json.

You can control what will be generated and how with corresponding configuration in dfx.json.

Under dfx.json → "canisters" → "\<canister_name\>", developers can add a "declarations" config. Options are:

-   "output" → directory to place declarations for that canister \| default is "src/declarations/\<canister_name\>"

-   "bindings" → \[\] list of options, ("js", "ts", "did", "mo") \| default is "js", "ts", "did"

-   "env_override" → a string that will replace process.env.{canister_name_uppercase}\_CANISTER_ID in the "src/dfx/assets/language_bindings/canister.js" template.

js declarations output

-   index.js (generated from "src/dfx/assets/language_bindings/canister.js" template)

-   \<canister_name\>.did.js - candid js binding output

ts declarations output

-   \<canister_name\>.did.d.ts - candid ts binding output

did declarations output

-   \<canister_name\>.did - candid did binding output

mo declarations output

-   \<canister_name\>.mo - candid mo binding output

#### New feature: dfx now supports the anonymous identity

Use it with either of these forms:

``` bash
dfx identity use anonymous
dfx --identity anonymous ...
```

#### feat: import default identities

Default identities are the pem files generated by `dfx identity new …​` which contain Ed25519 private keys. They are located at `~/.config/dfx/identity/xxx/identity.pem`. Now, you can copy such pem file to another computer and import it there.

``` bash
dfx identity new alice
cp ~/.config/dfx/identity/xxx/identity.pem alice.pem
# copy the pem file to another computer, then
dfx identity import alice alice.pem
```

Before, people could manually copy the pem files to the target directory to "import". That workaround still works. We suggest using the `import` subcommand since it also validate the private key.

#### New feature: Can now provide a nonstandard wallet module with DFX_WALLET_WASM environment variable

Define DFX_WALLET_WASM in the environment to use a different wasm module when creating or upgrading the wallet.

### Changes to the Asset Canister

#### Performance improvement: trust full asset SHA-256 hashes provided by the caller

When the caller provides SHA-256 hashes (which dfx does), the asset canister will no longer recompute these hashes when committing the changes. These recomputations were causing canisters to run out of cycles, or to attempt to exceed the maximum cycle limit per update.

## 0.8.0

The 0.8.0 release includes updates and fixes that are primarily internal to improve existing features and functions rather than user-visible, as well as potentially breaking changes to some frontend projects.

1.  improvements to codegen from 0.7.7

2.  set-wallet command no longer requires `--force` flag

### Instructions on migrating to dfx 0.8.0

If your project does not have a frontend that relies on the JavaScript files that have been generated under `.dfx/local`, you should not expect to have any issues with dfx 0.8.0.

If you have an existing project that depends on dfx-generated frontend files, you may need to make some adjustments when upgrading to 0.8.0. Depending on your situation you may want to choose to set up environment variables or to make a minimum set of changes. We will document both cases here.

#### Environment variables

With webpack, we are providing environment variables by using an EnvironmentPlugin. At the top of `webpack.config.js`, we read from the root `canister_ids.json` and the one inside `.dfx/local` to map the canister IDs into environment variables, and then replace the `process.env` values in the code during development or at build time.

``` js
// webpack.config.js
let localCanisters, prodCanisters, canisters;

try {
  localCanisters = require(path.resolve(".dfx", "local", "canister_ids.json"));
} catch (error) {
  console.log("No local canister_ids.json found. Continuing production");
}

function initCanisterIds() {
  try {
    prodCanisters = require(path.resolve("canister_ids.json"));
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local");
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local");

  canisters = network === "local" ? localCanisters : prodCanisters;

  for (const canister in canisters) {
    process.env[canister.toUpperCase() + "_CANISTER_ID"] =
      canisters[canister][network];
  }
}
initCanisterIds();
```

With your bundler, whether it is Webpack or another bundler of your choice, you will need to account for the following:

1.  Identifying canister ids. The output no longer hardcodes the canister ids into JavaScript, so you will need to provide that code using your own strategy. Other bundlers that allow for custom scripting should be able to re-use the webpack config logic.

2.  Determining `NODE_ENV`. During development, the app should call `agent.fetchRootKey()`, but it should not fetch the root key in production.

3.  Copying the codegen, as we do in the `dfx new` template, is optional. You still have access to the `.did.js` and `.did.d.ts` files in `.dfx`, so you can choose to ignore the new `index.js` format if it is inconvenient, and continue providing your own Actor.createActor pattern as before.

4.  Return types - if you do not want to use the dfx-provided files, consider using the JSDoc comments that we have come up with. If the code knows that your actor has a type of `ActorSubclass<_SERVICE>`, for your particular service, the development process is significantly enhanced in compatible editors.

#### Minimal Update

If you are looking to minimally modify your project, here is all you need to do, assuming you are starting from the 0.7.2 starter:

You can continue using a query parameter in your URL, you can access it via

``` js
// src/example_assets/src/index.js
import { idlFactory as example_idl } from 'dfx-generated/example/example.did.js';
import canisterIds from '../../../.dfx/local/canister_ids.json'

const example_id = new URLSearchParams(window.location.search).get("exampleId") || canisterIds.example.local;

const agent = new HttpAgent();
agent.fetchRootKey();
const example = Actor.createActor(example_idl, { agent, canisterId: example_id });
```

And you can modify the `aliases` reducer to point to the path, rather than hardcoding the old `<canister-name>.js` file

``` js
// webpack.config.js

// Old
["dfx-generated/" + name]: path.join(outputRoot, name + ".js"),
// New
["dfx-generated/" + name]: path.join(outputRoot),
```

Then, you can `dfx deploy` like normal and visit your working site with <http://localhost:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai&exampleId=rrkah-fqaaa-aaaaa-aaaaq-cai>.

## 0.7.7

The 0.7.7 release includes updates and fixes that are primarily internal to improve existing features and functions rather than user-visible.

The most significant changes in this release include the following:

-   Support for the latest version of the Internet Computer specification and replica.

-   Updating to latest versions of Motoko, Candid, and agent-rs

-   Changes to `dfx new` project template and JavaScript codegen

# 0.7.2

The 0.7.2 release includes updates and fixes that are primarily internal to improve existing features and functions rather than user-visible.

The most significant changes in this release include the following:

-   Support for the latest version of the Internet Computer specification and replica.

-   The availability of new application subnets enable you to now deploy projects on the Internet Computer.

-   The default cycle balance for new cycles wallet canisters is now set to 3T (three trillion) cycles on application subnets and 4T (four trillion) on verified application subnets.

## 0.7.1

The 0.7.1 release includes new features and fixes to DFX commands, Motoko, the Motoko base library, and Candid.

### New features and capabilities

The most significant new features and capabilities include the following updates for DFX commands:

-   An update to the `dfx canister sign` command enables you to sign `request_status` messages for update calls.

    If you are using `dfx canister sign` to call a method that generates an update message, the command also signs a corresponding `request_status` message and appends it to the `message.json` file as `signed_request_status`. After you send the message using the `dfx canister send` command, you can check the `request_status` of the call by running the following command:

    ``` bash
    dfx canister send message.json --status
    ```

    This change is particularly useful if you are using the `dfx canister sign` and `dfx canister send` commands to call the `ledger` or `governance` canister to make a transaction or stake tokens as a two-step process.

-   There are new `deposit_cycles` and `uninstall_code` management canister methods that are also exposed as `dfx canister` subcommands.

    The two new commands are `dfx canister deposit-cycles` and `dfx canister uninstall-code`. For example, you can now send cycles from your cycles wallet to a specific canister by running a command similar to the following:

    ``` bash
    dfx canister deposit-cycles 125000000000 hello_world
    ```

    You can uninstall code for a deployed WASM module by running a command similar to the following:

    ``` bash
    dfx canister uninstall-code hello_world
    ```

-   A new `--no-artificial-delay` option enables you to reduce the time it takes for the local Internet Computer to start.

    This change adds the `--no-artificial-delay` flag to `dfx start` and `dfx replica` commands. By default, the local Internet Computer replica that is installed with the SDK has an artificial consensus delay to simulate the delay users might see in a networked environment. With this new flag, you can skip the built-in delay when you start the local Internet Computer by running either the `dfx start --no-artificial-delay` or `dfx replica --no-artificial-delay` command.

    For example, you can start the local Internet Computer without a delay by running the following command:

    ``` bash
    dfx start -no-artificial-delay
    ```

    If you use this option, however, you might an increase in the CPU used by the local Internet Computer replica.

### Breaking change

The SDK version 0.7.1 introduces a change to the default principal used when you run `dfx canister call` commands. Depending on the version of the SDK that you were previously using, this change might require changes to your program code or to the way you call methods in deployed canisters.

-   The cycles wallet canister identifier is not longer used as the message caller by default.

    In some previous versions of the SDK, the `dfx canister call` command would use the cycles wallet canister identifier as the message caller to perform queries and update calls by default.

    The `--no-wallet` command-line option was introduced to allow you to bypass the cycles wallet canister identifier and perform query and update calls using the currently-selected identity.

    However, using the cycles wallet canister identifier to execute `dfx canister call` commands resulted in each call being treated as an inter-canister call and the calls would take longer than necessary to resolve.

    With this release, `dfx canister call` commands no longer use the cycles wallet canister identifier to execute query and update calls by default. If you want to execute a query or update call using the cycles wallet, you can run a command similar to the following:

    ``` bash
    dfx canister --wallet=cycles-wallet-id call canister method
    ```

### Issues fixed in this release

This section covers any reported issues that have been fixed in this release.

-   Allow consistent use of canisters names or identifiers in `dfx canister` commands.

    Previously, `dfx canister` commands were inconsistent about whether you could specify a canister using a canister name or a canister identifier. With this change, all `dfx canister` commands now accept either a canister name as specified in the local `dfx.json` configuration file or a valid canister identifier as listed in the `canister_ids.json` file.

## 0.7.0

The 0.7.0 release primarily consists of changes to support new features that are not yet complete, including fixes and updates to DFX commands, Motoko, the Motoko base library, and Candid.

The most significant new features and capabilities are updates to the following:

-   [DFX](#_dfx)

-   [Motoko](#_motoko)

### New features and capabilities

#### DFX

-   Addition of ledger subcommands

    `dfx` now supports a dedicated `dfx ledger` subcommand. This allows you to interact with the ledger canister installed on the Internet Computer. Example commands include `dfx ledger account-id` which prints the Account Identifier associated with your selected identity, `dfx ledger transfer` which allows you to transfer ICP from your ledger account to another, and `dfx ledger create-canister` which allows you to create a canister from ICP. For more information on `dfx ledger` subcommands, see [dfx ledger](../../../references/cli-reference/dfx-ledger).

-   Addition of wallet subcommands

    `dfx` now supports a dedicated `dfx wallet` subcommand. This allows you to interact with the cycles wallet associated with your selected identity.

    The following are just some of the available commands:

    -   `dfx wallet balance` returns the selected identity’s cycles wallet balance.

    -   `dfx wallet list-addresses` displays the assigned controllers & custodians of the cycles wallet.

        You can use `dfx wallet send <destination> <amount>` to send cycles to another wallet.

        For more information on `dfx wallet` see [dfx wallet](../../../references/cli-reference/dfx-wallet).

-   Add an output type to the `request-status` subcommand.

    This change allows you to specify the format for the return result for `dfx canister request-status`. Formatting options include `idl`, `raw`, and `pp`.

-   The default network for projects is now `ic`.

    The default network is now the mainnet `ic` unless otherwise specified. Additionally, `--network ic` now points to the mainnet Internet Computer (Sodium has been deprecated.)

-   Automatic creation of a candid UI canister

    A dedicated candid UI canister is installed on a local network when using `dfx canister install` or `dfx deploy`.

-   Compress some content types

    You can now store `gzip` content encodings of assets with media types if the encoding is smaller than the source contents. Supported file types are `text/*`, `*/javascript`, and `*/html`.

-   Add the encoding size when listing assets

    Now when assets are listed, a new `length` field returns the size of encodings.

-   Add new command `dfx canister info`

    This allows you to retrieve certified canister information. Access to this information is limited to the controller of the canister and the SHA256 hash of its WASM module. If there is no WASM module installed, the hash will be `None`.

-   New method deletes asset canister assets that no longer exist in a project—**breaking change**

    The `keys()` method is no longer supported. Use the `list()` method to delete missing project assets. For example:

    ``` bash
    assert_command dfx canister call --query e2e_project_assets get '(record{key="/will-delete-this.txt";accept_encodings=vec{"identity"}})'
    assert_command dfx canister call --query e2e_project_assets list  '(record{})'
    assert_match '"/will-delete-this.txt"'
    ```

-   Run an emulator instead of the replica

    To run a `dfx` project using an emulator instead of the replica, you can now run `dfx start --emulator`.

-   Rely on npmjs.org to get the version of agent-js to install

    This decouples the version of `dfx` from the release version of `agent-js`. Additionally, it allows for debug builds to install properly (as `dfx` has a non-release version).

-   You can now install the DFINITY Canister SDK on for M1 Macs running Darwin.

-   Allow upload of assets of any size to the asset canister.

    The following asset canister call methods are added: **create_batch()** create_chunk() **commit_batch()** get() \*\* get_chunk()

    \+ Reworks the asset installer in `dfx` to use these methods. It can therefore upload assets that exceed the message ingress size.

-   Add `--no-wallet` flag and `--wallet` option

    `--no-wallet` allows users to bypass specifying a wallet ID.

    `--wallet` allows users to specify a particular wallet to use for calls.

-   Implement the HTTP request proposal in `dfx` bootstrap webserver

    Adds support for http requests in the base storage canister (with a default to `/index.html`).

This does not support encodings other than `identity`, and doesn’t return any headers.

This also upgrades `tokio` and `reqwest` in order to work correctly. There are some performance issues to note (this is slower than the ICx-http-server).

#### Motoko

-   Reformat to style guidelines.

-   Add type bindings

    Add `Nat.Nat`, `Nat8.Nat8`, etc. to libraries for primitive types.

### Issues fixed in this release

This section covers any reported issues that have been fixed in this release.

#### DFX

-   Deleting a canister on a network removes entries for other networks

    This change fixes a bug where deleting a canister on a network removed all other entries for the canister in the `canister_ids.json` file.

-   Error message: already in use (os error 48) when issuing dfx start.

    This fixes an error which occurred when starting a replica soon after stopping it.

-   The `dfx new` command should not require `node`

    This fixes the inability to use the `dfx new` command to create projects on machines that do not have `node.js` installed.

-   Missing webpack.config plugin

    This adds the missing ProvidePlugin to webpack.config for new projects.

-   Allow new projects assets to contain non-utf8 files

    Previously assets were forced to be valid UTF-8 strings. After this change if a string cannot be converted, in-place variable replacements are ignored.

#### Motoko

-   No longer confused by distinct, but eponymous, type definitions.

-   Numbers of eponymous types and specializations from 1 (not 2)

-   Avoids long chains of type equalities by normalizing before translation

## 0.6.26

The 0.6.26 release primarily consists of changes to support new features that are not yet complete, including fixes and updates to DFX commands, Motoko, the Motoko base library, and Candid.

### New features and capabilities

The most significant new feature included in this release is the publication of the [*Internet Computer Interface Specification*](../../../references/ic-interface-spec.md).

The *Internet Computer Interface Specification* details many technical properties that describe the lower-level interfaces for interacting with the Internet Computer. For example, the *Internet Computer Interface Specification* describes the HTTPS endpoints that are exposed to handle incoming requests and how low-level bindings enable canisters to interact with system components.

If you use existing tools—like the DFINITY Canister SDK or Canister Development Kit for Rust—to work with canisters, these tools interact with the lower-level interfaces described in the *Internet Computer Interface Specification* on your behalf. If you want to create your own tooling for working with canisters, however, the *Internet Computer Interface Specification* includes the technical details you need to understand how the Internet Computer external interfaces work.

If you are interested in expanding the Internet Computer ecosystem, you’ll also find information in the *Internet Computer Interface Specification* to help you in developing the following types of projects:

-   Building **frontend agents** for user-facing interaction in any programming language, including popular languages such as Python, Golang, or C.

-   Building **backend Canister Development Kits** (CDKs) in any language that can compile down to WebAssembly bytecode.

-   Building **local development tools** such as command line interfaces or Internet Computer emulators and debuggers.

-   Implementing **features and enhancements** to improve the developer experience for deploying and managing canisters running remotely on the network.

### Issues fixed in this release

This section covers any reported issues that have been fixed in this release.

This release fixes an issue with memory allocation in the default cycles wallet that caused an error after creating and deploying canisters. If you encountered this issue, you might have seen an error message similar to the following:

    The Replica returned an error: code 5, message: "Canister 6dtaa-vaaaa-aaaab-aaipa-cai exceeded its allowed memory allocation"

This release updates the default cycles wallet to provide better handling of unused memory and how memory is allocated when creating and deploying canisters.

### Known issues and limitations

This section covers any known issues or limitations that might affect how you work with the SDK in specific environments or scenarios.

#### Only the default wallet canister principal can perform canister management tasks

The introduction of the cycles wallet canister changes the default principal used to perform key canister management tasks, such as registering a new canister identifier and deploying a new canister on the Internet Computer. This change introduces some inconsistencies in the identity used to perform certain tasks and can result in potential access control issues.

You should note that none of the tutorials have been updated to reflect this specific change in behavior yet and the current version of the [Add access control with identities](../../build/backend/access-control) tutorial is known to be invalid for this release. If you want to experiment with access control using the [Add access control with identities](../../build/backend/) tutorial, you should install the SDK version 0.6.23 (or older).

#### Incompatibility when using the JavaScript agent directly in a project

If you access the `@dfinity/agent` JavaScript agent directly in a project—that is, without going through the bootstrap server—you will not be able to import the `bls` certification scheme with the `agent-js` release.

If your application uses the JavaScript agent directly, you should use the latest version of the agent.

## 0.6.25

The 0.6.25 release primarily consists of changes to support new features that are not yet complete, including fixes and updates to DFX commands, Motoko, the Motoko base library, and Candid.

### New features and capabilities

The most significant new features and capabilities include the following updates:

-   This release introduces environment variables for specifying canister identifiers.

    You can now use the `CANISTER_ID_{canister.name}` and `CANISTER_CANDID_PATH_{canister.name}` environment variables to reference canister identifiers and the path to the canister Candid description (`.did` file) during the build process. These environment variables enable you to construct the JavaScript for frontend assets using the correct canister identifiers.

    The environment variables are intended to replace the `import` syntax for dependent canisters described in [Entry and output configuration](../../build/frontend/webpack-config) which is being deprecated and will be removed in a future release.

-   A new `dfx identity import` subcommand enables you to import a security certificate to create an identity.

    For example, if you use a hardware wallet or a key generation utility to generate a PEM file for authenticating your identity, you can now import that PEM file into `dfx` to create a new identity. After importing the PEM file, you can run the `dfx identity use` command to set that identity as your default context.

    For example, to import the `my-external-id.pem` and create an identity named `alice`, you would run the following command:

        dfx identity import alice my-external-id.pem

    After running this command, you would run the following command to begin using the new identity:

        dfx identity use alice

### Issues fixed in this release

This section covers any reported issues that have been fixed in this release.

### Known issues and limitations

This section covers any known issues or limitations that might affect how you work with the SDK in specific environments or scenarios.

## 0.6.24

The 0.6.24 release primarily consists of changes to support new features
that are not yet complete, including fixes and updates to DFX commands,
Motoko, the Motoko base library, and Candid.

### New features and capabilities


The most significant new features and capabilities include updates in
the following functional areas:

-   [DFX](#DFX)

-   [Candid](#Candid)

-   [Motoko](#Motoko)

# DFX

-   With this release, you must have a **wallet canister** with
    **cycles** to deploy or manage applications on the IC.

    For local development, `+dfx+` automatically creates a wallet for
    you when you run `+dfx canister create+` or `+dfx deploy+` commands
    within each project.

    Wallets are also created automatically if you deploy to the IC using
    the `+ic+` network alias before the network is upgraded to require a
    cycle balance.

    To deploy applications on the IC network:

    1.  Download and install the SDK.

    2.  Run the `dfx identity get-principal` command to create your
        default identity and principal:

        ``` {.bash}
        dfx identity get-principal
        ```

        Running the command displays output similar to the following:

            Creating the "default" identity.
              - generating new key at /Users/pubs/.config/dfx/identity/default/identity.pem
            Created the "default" identity.
            wre5u-xietp-k5jz4-sdaaz-g3x4l-zjzxa-lxnly-fp2mk-j3j77-25qat-pqe

    3.  Run the `+dfx identity set-wallet+` command to associate your
        wallet canister identifier with your default identity.

        ``` {.bash}
        dfx identity set-wallet <wallet-canister-identifier>
        ```

    4.  Open the wallet application in a web browser by navigating to
        the canister with a URL similar to the following:

            https://<WALLET-CANISTER-ID>.ic0.app

-   A new command-line option enables you to specify the number of
    initial cycles to transfer to a newly-created canister.

    The `+dfx canister create+` and `+dfx deploy+` commands now support
    a new `+--with-cycles <number-of-cycles>+` option. This option
    allows you to specify the initial cycle balance of a canister
    created by your wallet.

    You can use this option when running the IC network locally or
    connected to the current `+ic+` network (Sodium) for testing
    purposes. However, because wallets and cycle balances are not
    currently used for canisters you create while connected to the
    current `+ic+` network (Sodium), the `+--with-cycles+` option does
    not affect any canister operations.

    For example, you might run the following `+dfx canister create+`
    command to initialize `+8000000000+` cycles for all of the canisters
    in a project:

        dfx canister create --with-cycles 8000000000 --all

    If using `+dfx deploy+`, you might run the following command to
    initialize `+8000000000+` cycles for the `+backend+` canister in a
    project:

        dfx deploy --with-cycles 8000000000 backend

:::note
You must have a wallet canister with a cycles balance on the
network where you want to create or deploy additional canisters.
:::

-   You can now use the new `+dfx toolchain+` command to manage the
    version of the `+dfx+` command-line interface you are using for your
    projects.

    The `+dfx toolchain+` command enables you to install, uninstall, and
    set the default version of `dfx` that you want to use. You can
    specify the version by the complete version number, the major and
    minor version number, or a tag name. For example:

        dfx toolchain install 0.6.24 # complete version
        dfx toolchain install 0.6    # major minor version
        dfx toolchain install latest # tag name

-   A new `+deploy-wallet+` subcommand enables you to specify the
    canister identifier for your cycles wallet WebAssembly module
    (WASM).

    For example, if you have an account with a third party exchange
    provider and receive a wallet canister identifier, you can run a
    command similar to the following to deploy the wallet and uses its
    cycles for development:

        dfx identity deploy-wallet <canister-identifier>

:::note
The `+deploy-wallet+` feature is intended for a future use case.
The command is only applicable if you received the wallet canister identifier as part of a transfer operation that converted ICP tokens to cycles. In addition, the `+deploy-wallet+` subcommand is **not intended for use** with the current version of IC running locally or on the remote network.

### Candid 


-   New [Candid documentation](../../build/candid/candid-intro.md) for
    developers provides type mapping information for Rust and
    JavaScript.

-   Candid now supports additional native Rust types and Typescript.

-   For additional information, see the [Candid
    changelog](https://github.com/dfinity/candid/blob/master/Changelog.md).

### Motoko

-   The Motoko compiler (`+moc+`) now accepts the `+-Werror+` flag to
    turn warnings into errors.

-   The language server now returns documentation comments alongside
    completions and hover notifications.

-   Motoko supports wrapping arithmetic and bit-wise operations on
    `NatN` and `IntN`.

    The conventional arithmetic operators on `NatN` and `IntN` trap on
    overflow. If wrap-around semantics is desired, the operators `+%`,
    `-%`, `*%` and `**%` can be used. The corresponding assignment
    operators (`+%=` etc.) are also available.

    Likewise, the bit fiddling operators (`&`, `|`, `^`, `<<`, `>>`,
    `<<>`,`<>>` etc.) are now also available on `NatN` and `IntN`. The
    right shift operator (`>>`) is an unsigned right shift on `NatN` and
    a signed right shift on `IntN`; the `+>>` operator is *not*
    available on these types.

    The motivation for this change is to eventually deprecate and remove
    the `WordN` types. Therefore, the wrapping arithmetic operations on
    `WordN` are deprecated and their use will print a warning. For
    information about replacing Word types, see [Word
    types](../../build/cdks/motoko-dfinity/language-manual.md#word-types).

-   For values `x` of type `Blob`, an iterator over the elements of the
    blob `x.vals()` is introduced. It works like `x.bytes()`, but
    returns the elements as type `Nat8`.

-   The base library documentation tool `+mo-doc+` now generates
    cross-references for types in signatures. With this enhancement,
    when you view a signature like
    `fromIter : I.Iter<Nat> -> List.List<Nat>`, you can click `I.Iter`
    or `List.List` to navigate to the appropriate definition.

-   Improvements to the type checker and compiler provide better
    handling for object literals.

### Issues fixed in this release


This section covers any reported issues that have been fixed in this
release.

### Known issues and limitations {#_known_issues_and_limitations}

This section covers any known issues or limitations that might affect
how you work with the SDK in specific environments or scenarios.

# 0.6.23

The 0.6.23 release consists of changes to support new features and enhancements that are not yet complete.

## New features and capabilities

The most significant new feature enables you to use a locally-installed `@dfinity/bootstrap` server.

For information about updates to Candid, see the [Candid changelog](https://github.com/dfinity/candid/blob/master/Changelog.md).

## 0.6.22

The 0.6.22 release consists of changes to support new features that are not yet complete, including fixes and updates to DFX commands, Motoko, the Motoko base library, and Candid.

### New features and capabilities

The most significant new features and capabilities include updates in the following functional areas:

-   [DFX](#_dfx)

-   [Sample applications](#Apps)

-   [Candid](#_candid)

-   [Motoko](#_motoko)

#### DFX

-   The `dfx canister call` command can now pass a randomly-generated value to a canister method when an argument is required but not provided.

-   The `dfx canister call` command can take canister identifiers for local canisters even if the canister is installed on a remote network.

-   The `dfx replica` command has been fixed so that it does not attempt to write the replica `pid` to a nonexistent directory.

-   The default `webpack.config.js` file used when you create new projects has been modified to comment out the configuration to enable TypeScript.

    Previously, the `webpack.config.js` file configured `ts-loader` to process files with the `.js` file extension, which could lead to errors. This configuration is now disabled by default and the commented-out configuration only processes `.ts`, `.tsx`, and `.jsx` files through `ts-loader`.

#### Sample applications

-   There have been updates, improvements, and new sample applications added to the [examples](https://github.com/dfinity/examples/tree/master/motoko) repository.

    All of Motoko sample apps in the [examples](https://github.com/dfinity/examples/tree/master/motoko) repository have been updated to work with the latest release of the SDK.

    There are also new sample apps to illustrate using arrays ([Quicksort](https://github.com/dfinity/examples/tree/master/motoko/quicksort)) and building create/read/update/delete (CRUD) operations for a web application [Superheroes](https://github.com/dfinity/examples/tree/master/motoko/superheroes).

-   The [LinkedUp](https://github.com/dfinity/linkedup) sample application has been updated to work with the latest release of Motoko and the SDK.

#### Candid

-   [Candid changelog](https://github.com/dfinity/candid/blob/master/Changelog.md)

#### Motoko

-   The Motoko compiler now reports errors and warnings with an additional error code.

    You can use the error code to look up a more detailed description for a given error by passing the `--explain` flag with a code to the compiler.

    Note that detailed descriptions are not yet available for most error codes and will be added incrementally in upcoming releases.

## 0.6.21

The 0.6.21 release primarily consists of changes to support new features that are not yet complete, including fixes and updates to DFX commands, Motoko, the Motoko base library, and Candid.

### New features and capabilities

The most significant new features and capabilities include updates in the following functional areas:

-   [DFX](#_dfx)

-   [Candid](#_candid)

-   [Motoko](#_motoko)

#### DFX

-   Two new subcommands—`get-wallet` and `set-wallet`—have been added to the `dfx identity` command to support working with wallet canisters.

    In a future release, you will be able to use these commands locally for testing purposes. However, the commands are not currently supported on any version of the Internet Computer network available for you to run locally or on the public Internet Computer network.

#### Candid

-   [Candid changelog](https://github.com/dfinity/candid/blob/master/Changelog.md)

#### Motoko

-   The Motoko compiler now reports errors and warnings with an additional error code.

    You can use the error code to look up a more detailed description for a given error by passing the `--explain` flag with a code to the compiler.

    Note that detailed descriptions are not yet available for most error codes and will be added incrementally in upcoming releases.

### Issues fixed in this release

This section covers any reported issues that have been fixed in this release.

### Known issues and limitations

This section covers any known issues or limitations that might affect how you work with the SDK in specific environments or scenarios.

## 0.6.20

The 0.6.20 release has both user-facing and internal enhancements, including fixes and updates to Motoko, the Motoko base library, and Candid.

### New features and capabilities

The most significant new features and capabilities include updates in the following functional areas:

-   [DFX](#_dfx)

-   [Candid](#_candid)

-   [Motoko](#_motoko)

#### DFX

-   The `dfx` commands that support the `--network` option have been updated to support URLs when specifying the network value.

    Previously, the `--network` option required you to specify a network name that matched a network aliases configured in the project’s `dfx.json` file.

#### Candid

The Candid web interface has been updated to provide easier navigation and a better user experience. The updates to the Candid web interface include the following new features and improvements:

-   A new Console drawer provides quick access to method output and a list of all available methods as links for fast navigation.

-   Canister methods and their related form elements are more clearly separated and annotated.

-   Method output is selectable and easier to toggle between text, UI, and JSON formats.

-   The layout is now responsive to provide an optimized display when viewing service using mobile devices or other media.

#### Motoko

-   The Motoko base documentation examples are now executable in the browser.

-   The Motoko compiler supports specifying command-line arguments using `--args <file>` and `--args0 <file>`.

    The new options enable the compiler to read newline and NUL terminated arguments from a specified file name.

### Issues fixed in this release

This section covers any reported issues that have been fixed in this release.

### Known issues and limitations

This section covers any known issues or limitations that might affect how you work with the SDK in specific environments or scenarios.
