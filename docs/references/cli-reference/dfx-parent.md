# dfx

The DFINITY command-line execution environment (`dfx`) is the primary tool for creating, deploying, and managing the dapps you develop for the {platform}.

Use the `dfx` parent command with flags and subcommands to specify the operations you want to perform with or without optional arguments.

## Basic usage

``` bash
dfx [option] [subcommand] [flag]
```

## Flags

You can use the following optional flags with the `dfx` parent command or with any of the `dfx` subcommands.

| Flag                 | Description                                     |
|----------------------|-------------------------------------------------|
| `-h`, `--help`       | Displays usage information.                     |
| `` -q` ``, `--quiet` | Suppresses informational messages.              |
| `-v`, `--verbose`    | Displays detailed information about operations. |
| `-V`, `--version`    | Displays version information.                   |

## Options

You can use the following options with the `dfx` command.

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
</table>

## Subcommands

Use the following subcommands to specify the operation you want to perform or to view usage information for a specific command.

For reference information and examples, select an appropriate subcommand.

| Command                        | Description                                                                                                                                                                            |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`build`](dfx-build.xml)       | Builds canister output from the source code in your project.                                                                                                                           |
| [`cache`](dfx-cache.xml)       | Manages the `dfx` cache on the local computer.                                                                                                                                         |
| [`canister`](dfx-canister.xml) | Manages deployed canisters .                                                                                                                                                           |
| [`config`](dfx-config.xml)     | Sets or changes configuration options for your current project.                                                                                                                        |
| [`deploy`](dfx-deploy.xml)     | Deploys all or a specific canister from the code in your project. By default, all canisters are deployed.                                                                              |
| [`help`](dfx-help.xml)         | Displays usage information for a specified subcommand.                                                                                                                                 |
| [`identity`](dfx-identity.xml) | Enables you to create and manage the identities used to communicate with the {platform}.                                                                                               |
| [`ledger`](dfx-ledger.xml)     | Enables you to interact with accounts in the ledger canister running on the Internet Computer.                                                                                         |
| [`new`](dfx-new.xml)           | Creates a new project.                                                                                                                                                                 |
| [`ping`](dfx-ping.xml)         | Sends a response request to the {platform} or the local canister execution environment to determine network connectivity. If the connection is successful, a status reply is returned. |
| [`replica`](dfx-replica.xml)   | Starts a local canister execution environment.                                                                                                                                         |
| [`start`](dfx-start.xml)       | Starts the local canister execution environment a web server for the current project.                                                                                                  |
| [`stop`](dfx-stop.xml)         | Stops the local canister execution environment.                                                                                                                                        |
| [`upgrade`](dfx-upgrade.xml)   | Upgrades the version of `dfx` installed on the local computer to the latest version available.                                                                                         |
| [`dfx wallet`](dfx-wallet.xml) | Enables you to manage cycles, controllers, custodians, and addresses for the default cycles wallet associated with the currently-selected identity.                                    |

## Examples

You can use the `dfx` parent command to display usage information or version information. For example, to display information about the version of `dfx` you currently have installed, you can run the following command:

``` bash
dfx --version
```

To view usage information for a specific subcommand, specify the subcommand and the `--help` flag. For example, to see usage information for `dfx build`, you can run the following command:

``` bash
dfx build --help
```

### Using logging options

You can use the `--verbose` and `--quiet` flags to increment or decrement the logging level. If you don’t specify any logging level, CRITICAL, ERROR, WARNING, and INFO messages are logged by default. Specifying one verbose flag (`-v`) increases the log level to include DEBUG messages. Specifying two verbose flags (`-vv`)increases the logging level to include both DEBUG and TRACE messages.

Adding a `--quiet` flag decreases the logging level. For example, to remove all messages, you can run a command similar the following:

``` bash
dfx -qqqq build
```

Keep in mind that using TRACE level logging (`--vv`) generates a lot of log messages that can affect performance and should only be used when required for troubleshooting or analysis.

To output log messages to a file named `newlog.txt` and display the messages on your terminal when creating a new project, you can run a command similar to the following:

``` bash
dfx --log tee --logfile newlog.txt new hello_world
```

### Specifying a user identity

If you create user identities with the `dfx identity new` command, you can then use the `--identity` comment-line option to change the user context when running other `dfx` commands.

In the most common use case, you use the `--identity` option to call specific canister functions to test access controls for specific operations.

For example, you might want to test whether the `devops` user identity can call the `modify_profile` function for the `accounts` canister by running the following command:

    dfx --identity devops canister call accounts modify_profile '("Kris Smith")'
