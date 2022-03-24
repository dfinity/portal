# dfx upgrade

Use the `dfx upgrade` command to upgrade the {sdk-short-name} components running on your local computer. This command checks the version of the {sdk-short-name} that you have currently installed against the latest publicly-available version specified in the `manifest.json` file. If an older version of the {sdk-short-name} is detected locally, the `dfx upgrade` command automatically fetches the latest version from the CDN.

## Basic usage

    dfx upgrade [flag] [option]

## Flags

You can use the following optional flags with the `dfx upgrade` command.

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

You can use the following option with the `dfx upgrade` command.

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
<td style="text-align: left;"><p><code>--current-version &lt;version&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies the version you want to identify as the current version. This option enables you to override the version of the software currently identified as the latest version with the version you pass on the command-line.</p></td>
</tr>
</tbody>
</table>

## Examples

You can upgrade the version of the {sdk-short-name} that you have currently installed by running the following command:

    dfx upgrade

This command checks the version of `dfx` you have currently installed and the latest version available published on the {sdk-short-name} website in a manifest file. If a newer version of `dfx` is available, the command automatically downloads and installs the latest version.

    Current version: 0.6.8
    Fetching manifest \https://sdk.dfinity.org/manifest.json
    Already up to date
