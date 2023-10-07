# Staging Environment

Many projects can benefit from having a staging environment available besides the usual local and live deployments. This page explains how to set up such a staging environment.

## Benefits of a staging environment

It makes sense to start with the "why?" Why would a project want a staging environment? One of the biggest reasons is testing.
Having a separate deployment environment available where features can be end-to-end tested before they get deployed to the production environment is very helpful.
It allows developers (and maybe some beta users) to try things for themselves in a real environment.
While local deployments mirror the live Internet Computer as closely as possible, it is still not the same.
For example, the local instance only runs as a single subnet. If you want to test canisters of two different subnets connecting to each other, you cannot do this locally.

Some more reasons for having a staging environment are:
- Testing integration with other services.
- Testing deployment workflows.
- Estimating costs before setting a feature live for all users.
- End-to-end testing.

## Setting up a staging environment

This section shows how to configure a staging environment. With a working staging environment it is possible to run any `dfx` command that would otherwise take `--network ic` with `--network myStaging` instead.
Of course, the name `myStaging` can be replaced with any other name (except the two reserved ones: `ic`, the built in live Internet Computer and `local`, the implicit default network that runs with `dfx start`).

Networks (or also 'environments' in this context) are defined in two ways: assumed and explicitly configured. Dfx only contains one network as an assumed network: the `ic` network.
If you add `--network ic` to (almost) any command, it will run in the context of the live Internet Computer environment.
All other networks are explicitly configured in `dfx.json`. Looking at any random `dfx.json` (e.g. a fresh one generated with `dfx new`), the `"networks"` section should contain at least the `local` network.
The `local` network is the network that gets chosen by default if no other network is specified with `--network`.

### Network definition

To add a staging network named `myStaging` to `dfx.json`, add this under `"networks"` in your `dfx.json`:

``` json
"myStaging": {
    "providers": [
        "https://icp0.io"
    ],
    "type": "persistent"
}
```

This value for `"providers"` tells `dfx` where to connect to the network. It is identical to the one in the hard-coded `ic` network.
The type `persistent` tells `dfx` that the canisters on this network will stay there. Because of that, the canister identifiers will be saved in the `canister_ids.json` file.

### Configuring a wallet

Which cycles wallet to use by default is stored separately for every network. Because of this, the newly created `myStaging` network has no wallet configured yet.
Most people will just want to use the same cycles wallet as on the main `ic` network. To do so, make sure the correct identity is set (`dfx identity use <identity name>`).
Then, read the `ic` network's currently configured wallet using `dfx identity get-wallet --network ic`.
Finally, set the wallet for the newly defined network with `dfx identity set-wallet <wallet id> --network myStaging`.
Or, combining the two into a one-liner:

``` bash
dfx identity set-wallet "$(dfx identity get-wallet --network ic)" --network myStaging
```

If you prefer to use a separate cycles wallet for the staging environment, follow the instructions in the step 'Creating a cycles wallet' in the [deploying to the mainnet guide](/developer-docs/setup/deploy-mainnet.md).
