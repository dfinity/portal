# dfx ping

Use the `dfx ping` command to check connectivity to the {platform} or a testnet. This command enables you to verify that you can connect to the environment where you want to deploy to.

Note that you can only run this command from within the project directory structure. For example, if your project name is `hello_world`, your current working directory must be the `hello_world` top-level project directory or one of its subdirectories.

## Basic usage

    dfx ping [provider] [flag]

## Flags

You can use the following optional flags with the `dfx ping` command.

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

## Arguments

You can specify the following argument for the `dfx ping` command.

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
<td style="text-align: left;"><p>provider</p></td>
<td style="text-align: left;"><p>Specifies the {platform} or testnet URL that you want to use.</p></td>
</tr>
</tbody>
</table>

## Examples

You can use the `dfx ping` command to check whether the {IC} is currently available at a specific network address by running a command similar to the following:

    dfx ping https://testgw.dfinity.network

If the {IC} is running on the specified network provider address, the command returns output similar to the following:

    {
      "ic_api_version": "0.8"
    }
