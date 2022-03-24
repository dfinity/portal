# dfx ledger

Use the `dfx ledger` command to interact with the ledger canister.

This command can be used to make ICP utility token transactions from one canister to another, or top up canisters with cycles from ICP.

The basic syntax for running `dfx ledger` commands is:

    dfx ledger [options] [subcommand]

Depending on the `dfx ledger` subcommand you specify, additional arguments, options, and flags might apply. For reference information and examples that illustrate using `dfx ledger` commands, select an appropriate command.

<table>
<colgroup>
<col style="width: 32%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Command</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><a href="#account-id"><code>account-id</code></a></p></td>
<td style="text-align: left;"><p>Prints the selected identity’s Account Identifier.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><a href="#balance"><code>balance</code></a></p></td>
<td style="text-align: left;"><p>Prints the account balance of the user.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="#create-canister"><code>create-canister</code></a></p></td>
<td style="text-align: left;"><p>Creates a canister from ICP.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>help</code></p></td>
<td style="text-align: left;"><p>Displays usage information message for a specified subcommand.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="#notify"><code>notify</code></a></p></td>
<td style="text-align: left;"><p>Notifies the ledger when there is a send transaction to the cycles minting canister.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><a href="#top-up"><code>top-up</code></a></p></td>
<td style="text-align: left;"><p>Tops up a canister with cycles minted from ICP.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="#transfer"><code>transfer</code></a></p></td>
<td style="text-align: left;"><p>Transfers ICP from the user to the destination Account Identifier.</p></td>
</tr>
</tbody>
</table>

To view usage information for a specific subcommand, specify the subcommand and the `--help` flag. For example, to see usage information for `dfx ledger transfer`, you can run the following command:

`dfx ledger transfer --help`

## dfx ledger account-id

Use the `dfx ledger account-id` command to display the account identifier associated with the currently-active identity. Like the textual representation of your developer identity principal, the account identifier is derived from your private key and used to represent your identity in the ledger canister.

### Basic usage

    dfx ledger account-id [flag]

### Flags

You can use the following optional flags with the `dfx ledger account-id` command.

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

### Examples

If you have created more than one identity, check the identity you are currently using by running the `dfx identity whoami` command or the `dfx identity get-principal` command. You can then check the account identifier for your currently-selected developer identity by running the following command:

    dfx ledger account-id

The command displays output similar to the following:

    03e3d86f29a069c6f2c5c48e01bc084e4ea18ad02b0eec8fccadf4487183c223

## dfx ledger balance

Use the `dfx ledger balance` command to print your account balance or that of another user.

### Basic usage

    dfx ledger --network ic balance [of] [flag]

### Flags

You can use the following optional flags with the `dfx ledger balance` command.

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

### Arguments

You can specify the following argument for the `dfx ledger balance` command.

<table>
<colgroup>
<col style="width: 32%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Argument</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><code>&lt;of&gt;</code></p></td>
<td style="text-align: left;"><p>Specify an Account Identifier to get the balance. If this command is not specified, the command returns the balance of ICP tokens for the currently-selected user identity.</p></td>
</tr>
</tbody>
</table>

### Examples

You can use the `dfx ledger balance` command to check the balance of another user. For example, you can run the following command to see the ICP utlity tokens associated with a known Account Identifier:

    dfx ledger --network ic balance 03e3d86f29a069c6f2c5c48e01bc084e4ea18ad02b0eec8fccadf4487183c223

This command displays an ICP amount similar to the following:

    2.49798000 ICP

## dfx ledger create-canister

Use the `dfx ledger create-canister` command to convert ICP tokens to cycles and to register a new canister identifier on the {IC}.

### Basic usage

    dfx ledger --network ic create-canister controller [options]  [flag]

### Flags

You can use the following optional flags with the `dfx ledger create-canister` command.

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

### Arguments

You can specify the following argument for the `dfx ledger create-canister` command.

<table>
<colgroup>
<col style="width: 32%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Argument</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><code>&lt;controller&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies the principal identifier to set as the controller of the new canister.</p></td>
</tr>
</tbody>
</table>

### Options

You can specify the following argument for the `dfx ledger create-canister` command.

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
<td style="text-align: left;"><p><code>--amount &lt;amount&gt;</code></p></td>
<td style="text-align: left;"><p>Specify the number of ICP tokens to mint into cycles and deposit into destination canister. You can specify an amount as a number with up to eight (8) decimal places.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>--e8s &lt;e8s&gt;</code></p></td>
<td style="text-align: left;"><p>Specify ICP token fractional units—called e8s—as a whole number, where one e8 is smallest partition of an ICP token. For example, 1.05000000 is 1 ICP and 5000000 e8s. You can use this option on its own or in conjunction with the <code>--icp</code> option.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>--fee &lt;fee&gt;</code></p></td>
<td style="text-align: left;"><p>Specify a transaction fee. The default is 10000 e8s.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>--icp &lt;icp&gt;</code></p></td>
<td style="text-align: left;"><p>Specify ICP tokens as a whole number. You can use this option on its own or in conjunction with <code>--e8s</code>.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>--max-fee &lt;max-fee&gt;</code></p></td>
<td style="text-align: left;"><p>Specify a maximum transaction fee. The default is 10000 e8s.</p></td>
</tr>
</tbody>
</table>

### Examples

To create a new canister with cycles, transfer ICP tokens from your ledger account by running a command similar to the following:

    dfx ledger --network ic create-canister tsqwz-udeik-5migd-ehrev-pvoqv-szx2g-akh5s-fkyqc-zy6q7-snav6-uqe --amount 1.25

This command converts the number of ICP tokens you specify for the `--amount` argument into cycles, and associates the cycles with a new canister identifier controlled by the principal you specify.

In this example, the command converts 1.25 ICP tokens into cycles and specifies the principal identifier for the default identity as the controller of the new canister.

If the transaction is successful, the ledger records the event and you should see output similar to the following:

    Transfer sent at BlockHeight: 20
    Canister created with id: "53zcu-tiaaa-aaaaa-qaaba-cai"

You can create a new canister by specifying separate values for ICP tokens and e8s by running a command similar to the following:

    dfx ledger --network ic create-canister tsqwz-udeik-5migd-ehrev-pvoqv-szx2g-akh5s-fkyqc-zy6q7-snav6-uqe --icp 3 --e8s 5000

## dfx ledger notify

Use the `dfx ledger notify` command to notify the ledger about a send transaction to the cycles minting canister. This command should only be used if `dfx ledger create-canister` or `dfx ledger top-up` successfully sent a message to the ledger, and a transaction was recorded at some block height, but for some reason the subsequent notify failed.

### Basic usage

    dfx ledger notify [options] _block-height_ _destination-principal_

### Flags

You can use the following optional flags with the `dfx ledger notify` command.

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

### Arguments

You can specify the following argument for the `dfx ledger notify` command.

<table>
<colgroup>
<col style="width: 32%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Argument</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><code>&lt;block-height&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies the block height at which the send transaction was recorded.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>&lt;destination-principal&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies the principal of the destination, either a canister identifier or the textual representation of a user principal. If the send transaction was for the <code>create-canister</code> command, specify the <code>controller</code> principal. If the send transaction was for the <code>top-up</code> command, specify the <code>canister ID</code>.</p></td>
</tr>
</tbody>
</table>

### Examples

The following example illustrates sending a `notify` message to the ledger in response to a `_send+` transaction that was recorded at the block height `75948`.

    dfx ledger --network ic notify 75948 tsqwz-udeik-5migd-ehrev-pvoqv-szx2g-akh5s-fkyqc-zy6q7-snav6-uqe

## dfx ledger top-up

Use the `dfx ledger top-up` command to top up a canister with cycles minted from ICP tokens.

### Basic usage

    dfx ledger --network ic top-up [options] canister [flag]

### Flags

You can use the following optional flags with the `dfx ledger top-up` command.

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

### Arguments

You can specify the following argument for the `dfx ledger top-up` command.

<table>
<colgroup>
<col style="width: 32%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Argument</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><code>canister</code></p></td>
<td style="text-align: left;"><p>Specifies the canister identifier that you would like to top up.</p></td>
</tr>
</tbody>
</table>

### Options

You can specify the following options for the `dfx ledger top-up` command.

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
<td style="text-align: left;"><p><code>--amount &lt;amount&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies the number of ICP tokens to mint into cycles and deposit into the destination canister. You can specify the amount as a number with up to eight (8) decimal places.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>--e8s &lt;e8s&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies fractional units of an ICP token—called e8s—as a whole number, where one e8 is the smallest unit of an ICP token. For example, 1.05000000 is 1 ICP and 5000000 e8s. You can use this option on its own or in conjunction with the <code>--icp</code> option.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>--fee &lt;fee&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies the transaction fee for the operation. The default is 10000 e8s.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>--icp &lt;icp&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies ICP tokens as a whole number. You can use this option on its own or in conjunction with <code>--e8s</code>.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>--max-fee &lt;max-fee&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies a maximum transaction fee. The default is 10000 e8s.</p></td>
</tr>
</tbody>
</table>

### Examples

You can use the `dfx ledger top-up` command to top up the cycles of a specific canister from the balance of ICP tokens you control. The canister identifier must be associated with a cycles wallet canister that is able to receive cycles. Alternatively, you can modify a non-cycles wallet canister to implement a method to receive cycles using system APIs described in the [Internet Computer Interface Specification](../../interface-spec/index.xml).

For example, you can run the following command to top-up a cycles wallet canister deployed on the Internet Computer with 1 ICP worth of cycles:

    dfx ledger --network ic top-up --icp 1 5a46r-jqaaa-aaaaa-qaadq-cai

This command displays output similar to the following:

    Transfer sent at BlockHeight: 59482
    Canister was topped up!

## dfx ledger transfer

Use the `dfx ledger transfer` command to transfer ICP tokens from your account address in the ledger canister to a destination address.

### Basic usage

    dfx ledger transfer [options] to --memo memo

### Flags

You can use the following optional flags with the `dfx ledger transfer` command.

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

### Arguments

You can specify the following argument for the `dfx ledger transfer` command.

<table>
<colgroup>
<col style="width: 32%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Argument</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><code>&lt;to&gt;</code></p></td>
<td style="text-align: left;"><p>Specify the Account Identifier or address to which you want to transfer ICP tokens.</p></td>
</tr>
</tbody>
</table>

### Options

You can specify the following argument for the `dfx ledger transfer` command.

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
<td style="text-align: left;"><p><code>--amount &lt;amount&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies the number of ICP tokens to transfer. Can be specified as a number with up to eight (8) decimal places.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>--e8s &lt;e8s&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies e8s as a whole number, where one e8 is smallest partition of an ICP token. For example, 1.05000000 is 1 ICP and 5000000 e8s. You can use this option alone or in conjunction with the <code>--icp</code> option.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>--fee &lt;fee&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies a transaction fee. The default is 10000 e8s.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>--icp &lt;icp&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies ICP as a whole number. You can use this option alone or in conjunction with <code>--e8s</code>.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>--memo &lt;memo&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies a numeric memo for this transaction.</p></td>
</tr>
</tbody>
</table>

### Examples

You can use the `dfx ledger transfer` command to send ICP to the Account Identifier of the destination.

For example, you can run the following command to check the account identifier associated with the principal you are currently using:

    dfx ledger account-id

This command displays output similar to the following:

    30e596fd6c5ff5ad7b7d70bbbda1187c833e646c6251464da7f82bc217bba397

You can check the balance of this account by running the following command:

    dfx ledger --network ic balance

This command displays output similar to the following:

    64.89580000 ICP

Use the `dfx ledger transfer` command to send some of your ICP balance to another known destination using the following command:

    dfx ledger --network ic transfer dd81336dbfef5c5870e84b48405c7b229c07ad999fdcacb85b9b9850bd60766f --memo 12345 --icp 1

This command displays output similar to the following:

    Transfer sent at BlockHeight: 59513

You can then use the `dfx ledger --network ic balance` command to check that your account balance reflects the transaction you just made.
