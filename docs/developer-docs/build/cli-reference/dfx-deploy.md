# dfx deploy

Use the `dfx deploy` command to register, build, and deploy a dapp on the local canister execution environment, on the {platform} or on a specified testnet. By default, all canisters defined in the project `dfx.json` configuration file are deployed.

This command simplifies the developer workflow by enabling you to run one command instead of running the following commands as separate steps:

    dfx canister create --all
    dfx build
    dfx canister install --all

Note that you can only run this command from within the project directory structure. For example, if your project name is `hello_world`, your current working directory must be the `hello_world` top-level project directory or one of its subdirectories.

## Basic usage

    dfx deploy [flag] [option] [canister_name]

## Flags

You can use the following optional flags with the `dfx deploy` command.

<table>
<colgroup>
<col style="width: 32%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Flag</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><code>-h</code>, <code>--help</code></p></td>
<td style="text-align: left;"><p>Displays usage information.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>-V</code>, <code>--version</code></p></td>
<td style="text-align: left;"><p>Displays version information.</p></td>
</tr>
</tbody>
</table>

## Options

You can use the following options with the `dfx deploy` command.

<table>
<colgroup>
<col style="width: 32%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Option</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><code>--network &lt;network&gt;</code></p></td>
<td style="text-align: left;"><p>Overrides the environment to connect to. By default, the local canister execution environment is used.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>--argument &lt;argument&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies an argument using Candid syntax to pass to the canister during deployment. Note that this option requires you to define an actor class in the {proglang} program.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>--with-cycles &lt;number-of-cycles&gt;</code></p></td>
<td style="text-align: left;"><p>Enables you to specify the initial number of cycles for a canister in a project.</p></td>
</tr>
</tbody>
</table>

### Arguments

You can specify the following arguments for the `dfx deploy` command.

<table>
<colgroup>
<col style="width: 36%" />
<col style="width: 64%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Argument</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><code>canister_name</code></p></td>
<td style="text-align: left;"><p>Specifies the name of the canister you want to register, build, and deploy. Note that the canister name you specify must match at least one name in the <code>canisters</code> section of the <code>dfx.json</code> configuration file for the project. If you don’t specify a canister name, <code>dfx deploy</code> will deploy all canisters defined in the <code>dfx.json</code> file.</p></td>
</tr>
</tbody>
</table>

## Examples

You can use the `dfx deploy` command to deploy all or specific canisters on the local canister execution environment, on the {platform} or on a specified testnet.

For example, to deploy the `hello` project on the hypothetical `ic-pubs` testnet configured in the `dfx.json` configuration file, you can run the following command:

    dfx deploy hello --network ic-pubs

To deploy a project on the local canister execution environment and pass a single argument to the installation step, you can run a command similar to the following:

    dfx deploy hello_actor_class --argument '("from DFINITY")'

Note that currently you must use an actor class in your {proglang} dapp. In this example, the `dfx deploy` command specifies an argument to pass to the `hello_actor_class` canister. The main program for the `hello_actor_class` canister looks like this:

    actor class Greet(name: Text) {
        public query func greet() : async Text {
            return "Hello, " # name # "!";
        };
    };

You can use the `dfx deploy` command with the `--with-cycles` option to specify the initial balance of a canister created by your wallet. If you don’t specify a canister, the number of cycles you specify will be added to all canisters by default. To avoid this, specify a specific canister by name. For example, to add an initial balance of 8000000000000 cycles to a canister called "hello-assets", run the following command:

    dfx deploy --with-cycles 8000000000000 hello-assets
