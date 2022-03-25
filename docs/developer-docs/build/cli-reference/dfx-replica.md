# dfx replica

Use the `dfx replica` command to start a local canister execution environment (without a web server). This command enables you to deploy canisters locally and to test your dapps during development.

Note that you can only run this command from within the project directory structure. For example, if your project name is `hello_world`, your current working directory must be the `hello_world` top-level project directory or one of its subdirectories.

## Basic usage

    dfx replica [option] [flag]

## Flags

You can use the following optional flags with the `dfx replica` command.

<!-- <table>
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
</table> -->

## Options

You can use the following option with the `dfx replica` command.

<!-- <table>
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
<td style="text-align: left;"><p><code>--port port</code></p></td>
<td style="text-align: left;"><p>Specifies the port the local canister execution environment should listen to.</p></td>
</tr>
</tbody>
</table> -->

## Examples

You can start the local canister execution environment by running the following command:

    dfx replica
