# dfx new

Use the `dfx new` command to create a new project for the {platform}. This command creates a default project structure with template files that you can modify to suit your dapp. You must specify the name of the project to you want to create.

You can use the `--dry-run` option to preview the directories and files to be created without adding them to the file system.

## Basic usage

    dfx new _project_name_ [flag]

## Flags

You can use the following optional flags with the `dfx new` command:

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
<td style="text-align: left;"><p><code>--dry-run</code></p></td>
<td style="text-align: left;"><p>Generates a preview the directories and files to be created for a new project without adding them to the file system.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>--frontend</code></p></td>
<td style="text-align: left;"><p>Installs the template frontend code for the default project canister. The default value for the flag is <code>true</code> if <code>node.js</code> is currently installed on your local computer. If <code>node.js</code> is not currently installed, you can set this flag to <code>true</code> to attempt to install <code>node.js</code> and the template file when creating the project or you can set the flag to <code>false</code> to skip the installation of template frontend code entirely.</p></td>
</tr>
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

You must specify the following argument for the `dfx new` command.

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
<td style="text-align: left;"><p><code>project_name</code></p></td>
<td style="text-align: left;"><p>Specifies the name of the project to create. This argument is required.</p></td>
</tr>
</tbody>
</table>

## Examples

You can use `dfx new` to create a new project named `my_social_network` by running the following command:

    dfx new my_social_network

The command creates a new project, including a default project directory structure under the new project name and a Git repository for your project.

If you want to preview the directories and files to be created without adding them to the file system, you can run the following command:

    dfx new my_social_network --dry-run
