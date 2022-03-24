# dfx cache

Use the `dfx cache` command with flags and subcommands to manage the `dfx` version cache.

The basic syntax for running `dfx cache` commands is:

    dfx cache [subcommand] [flag]

Depending on the `dfx cache` subcommand you specify, additional arguments, options, and flags might apply. For reference information and examples that illustrate using `dfx cache` commands, select an appropriate command.

<!-- <table>
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
<td style="text-align: left;"><p><a href="#delete"><code>delete</code></a></p></td>
<td style="text-align: left;"><p>Deletes the specified version of <code>dfx</code> from the local cache.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>help</code></p></td>
<td style="text-align: left;"><p>Displays usage information message for a specified subcommand.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="#install"><code>install</code></a></p></td>
<td style="text-align: left;"><p>Installs the specified version of <code>dfx</code> from the local cache.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><a href="#_dfx_cache_list"><code>list</code></a></p></td>
<td style="text-align: left;"><p>Lists the versions of <code>dfx</code> currently installed and used in current projects.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="#_dfx_cache_show"><code>show</code></a></p></td>
<td style="text-align: left;"><p>Show the path of the cache used by this version of the <code>dfx</code> executable.</p></td>
</tr>
</tbody>
</table> -->

To view usage information for a specific subcommand, specify the subcommand and the `--help` flag. For example, to see usage information for `dfx cache delete`, you can run the following command:

    dfx cache delete --help

## dfx cache delete

Use the `dfx cache delete` command to delete a specified version of `dfx` from the version cache on the local computer.

### Basic usage

    dfx cache delete [version] [flag]

### Flags

You can use the following optional flags with the `dfx cache delete` command.

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

### Arguments

You can specify the following argument for the `dfx cache delete` command.

<!-- <table>
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
<td style="text-align: left;"><p><code>version</code></p></td>
<td style="text-align: left;"><p>Specifies the version of <code>dfx</code> you to delete from the local cache.</p></td>
</tr>
</tbody>
</table> -->

### Examples

You can use the `dfx cache delete` command to permanently delete versions of `dfx` that you no longer want to use. For example, you can run the following command to delete `dfx` version `0.6.2`:

    dfx cache delete 0.6.2

## dfx cache install

Use the `dfx cache install` command to install `dfx` using the version currently found in the `dfx` cache.

### Basic usage

    dfx cache install [flag]

### Flags

You can use the following optional flags with the `dfx cache install` command.

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

### Examples

You can use the `dfx cache install` command to force the installation of `dfx` from the version in the cache. For example, you can run the following command to install `dfx`:

    dfx cache install

## dfx cache list

Use the `dfx cache list` command to list the `dfx` versions you have currently installed and used in projects.

If you have multiple versions of `dfx` installed, the cache list displays an asterisk (\*) to indicate the currently active version.

### Basic usage

    dfx cache list [flag]

### Flags

You can use the following optional flags with the `dfx cache list` command.

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

### Examples

You can use the `dfx cache list` command to list the `dfx` versions you have currently installed and used in projects. For example, you can run the following command to list versions of `dfx` found in the cache:

    dfx cache list

This command displays the list of `dfx` versions found similar to the following:

    0.6.4 *
    0.6.3
    0.6.0

## dfx cache show

Use the `dfx cache show` command to display the full path to the cache used by the `dfx` version you are currently using.

### Basic usage

    dfx cache show [flag]

### Flags

You can use the following optional flags with the `dfx cache show` command.

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

### Examples

You can use the `dfx cache show` command to display the path to the cache used by the `dfx` version you are currently using:

    dfx cache show

This command displays the path to the cache used by the `dfx` version you are currently using:

    /Users/pubs/.cache/dfinity/versions/0.6.4
