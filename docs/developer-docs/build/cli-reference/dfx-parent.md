# dfx

The DFINITY command-line execution environment (`dfx`) is the primary tool for creating, deploying, and managing the dapps you develop for the {platform}.

Use the `dfx` parent command with flags and subcommands to specify the operations you want to perform with or without optional arguments.

## Basic usage

    dfx [option] [subcommand] [flag]

## Flags

You can use the following optional flags with the `dfx` parent command or with any of the `dfx` subcommands.

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
<td style="text-align: left;"><p><code>-q`</code>, <code>--quiet</code></p></td>
<td style="text-align: left;"><p>Suppresses informational messages.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>-v</code>, <code>--verbose</code></p></td>
<td style="text-align: left;"><p>Displays detailed information about operations.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>-V</code>, <code>--version</code></p></td>
<td style="text-align: left;"><p>Displays version information.</p></td>
</tr>
</tbody>
</table> -->

## Options

You can use the following options with the `dfx` command.

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
<td style="text-align: left;"><p><code>--identity &lt;identity&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies the user identity to use when running a command.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>--logfile &lt;logfile&gt;</code></p></td>
<td style="text-align: left;"><p>Writes log file messages to the specified log file name if you use the <code>--log file</code> logging option.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>--log &lt;logmode&gt;</code></p></td>
<td style="text-align: left;"><p>Specifies the logging mode to use. + You can set the log mode to one of the following:</p>
<p>- <code>stderr</code> to log messages to the standard error facility.</p>
<p>- <code>tee</code> to write messages to both standard output and to a specified file name.</p>
<p>- <code>file</code> to write messages to a specified file name.</p>
<p>The default logging mode is <code>stderr</code>.</p></td>
</tr>
</tbody>
</table> -->

## Subcommands

Use the following subcommands to specify the operation you want to perform or to view usage information for a specific command.

For reference information and examples, select an appropriate subcommand.

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
<td style="text-align: left;"><p><a href="dfx-build.xml"><code>build</code></a></p></td>
<td style="text-align: left;"><p>Builds canister output from the source code in your project.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><a href="dfx-cache.xml"><code>cache</code></a></p></td>
<td style="text-align: left;"><p>Manages the <code>dfx</code> cache on the local computer.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="dfx-canister.xml"><code>canister</code></a></p></td>
<td style="text-align: left;"><p>Manages deployed canisters .</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><a href="dfx-config.xml"><code>config</code></a></p></td>
<td style="text-align: left;"><p>Sets or changes configuration options for your current project.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="dfx-deploy.xml"><code>deploy</code></a></p></td>
<td style="text-align: left;"><p>Deploys all or a specific canister from the code in your project. By default, all canisters are deployed.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><a href="dfx-help.xml"><code>help</code></a></p></td>
<td style="text-align: left;"><p>Displays usage information for a specified subcommand.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="dfx-identity.xml"><code>identity</code></a></p></td>
<td style="text-align: left;"><p>Enables you to create and manage the identities used to communicate with the {platform}.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><a href="dfx-ledger.xml"><code>ledger</code></a></p></td>
<td style="text-align: left;"><p>Enables you to interact with accounts in the ledger canister running on the Internet Computer.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="dfx-new.xml"><code>new</code></a></p></td>
<td style="text-align: left;"><p>Creates a new project.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><a href="dfx-ping.xml"><code>ping</code></a></p></td>
<td style="text-align: left;"><p>Sends a response request to the {platform} or the local canister execution environment to determine network connectivity. If the connection is successful, a status reply is returned.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="dfx-replica.xml"><code>replica</code></a></p></td>
<td style="text-align: left;"><p>Starts a local canister execution environment.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><a href="dfx-start.xml"><code>start</code></a></p></td>
<td style="text-align: left;"><p>Starts the local canister execution environment a web server for the current project.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="dfx-stop.xml"><code>stop</code></a></p></td>
<td style="text-align: left;"><p>Stops the local canister execution environment.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><a href="dfx-upgrade.xml"><code>upgrade</code></a></p></td>
<td style="text-align: left;"><p>Upgrades the version of <code>dfx</code> installed on the local computer to the latest version available.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><a href="dfx-wallet.xml"><code>dfx wallet</code></a></p></td>
<td style="text-align: left;"><p>Enables you to manage cycles, controllers, custodians, and addresses for the default cycles wallet associated with the currently-selected identity.</p></td>
</tr>
</tbody>
</table> -->

## Examples

You can use the `dfx` parent command to display usage information or version information. For example, to display information about the version of `dfx` you currently have installed, you can run the following command:

    dfx --version

To view usage information for a specific subcommand, specify the subcommand and the `--help` flag. For example, to see usage information for `dfx build`, you can run the following command:

    dfx build --help

### Using logging options

You can use the `--verbose` and `--quiet` flags to increment or decrement the logging level. If you don’t specify any logging level, CRITICAL, ERROR, WARNING, and INFO messages are logged by default. Specifying one verbose flag (`-v`) increases the log level to include DEBUG messages. Specifying two verbose flags (`-vv`)increases the logging level to include both DEBUG and TRACE messages.

Adding a `--quiet` flag decreases the logging level. For example, to remove all messages, you can run a command similar the following:

    dfx -qqqq build

Keep in mind that using TRACE level logging (`--vv`) generates a lot of log messages that can affect performance and should only be used when required for troubleshooting or analysis.

To output log messages to a file named `newlog.txt` and display the messages on your terminal when creating a new project, you can run a command similar to the following:

    dfx --log tee --logfile newlog.txt new hello_world

### Specifying a user identity

If you create user identities with the `dfx identity new` command, you can then use the `--identity` comment-line option to change the user context when running other `dfx` commands.

In the most common use case, you use the `--identity` option to call specific canister functions to test access controls for specific operations.

For example, you might want to test whether the `devops` user identity can call the `modify_profile` function for the `accounts` canister by running the following command:

    dfx --identity devops canister call accounts modify_profile '("Kris Smith")'
