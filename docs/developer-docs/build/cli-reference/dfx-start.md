# dfx start

Use the `dfx start` command to start a local canister execution environment and web server processes for the current project. This command enables you to deploy canisters to the local canister execution environment to test your dapps during development.

Note that you can only run this command from within the project directory structure. For example, if your project name is `hello_world`, your current working directory must be the `hello_world` top-level project directory or one of its subdirectories.

## Basic usage

    dfx start [option] [flag]

## Flags

You can use the following optional flags with the `dfx start` command.

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
<td style="text-align: left;"><p><code>--background</code></p></td>
<td style="text-align: left;"><p>Starts the local canister execution environment and web server processes in the background and waits for a reply before returning to the shell.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>--clean</code></p></td>
<td style="text-align: left;"><p>Starts the local canister execution environment and web server processes in a clean state by removing checkpoints from your project cache. You can use this flag to set your project cache to a new state when troubleshooting or debugging.</p></td>
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

## Options

You can use the following option with the `dfx start` command.

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
<td style="text-align: left;"><p><code>--host host</code></p></td>
<td style="text-align: left;"><p>Specifies the host interface IP address and port number to bind the frontend to. The default is <code>127.0.0.1:8000</code>.</p></td>
</tr>
</tbody>
</table>

## Examples

You can start the local canister execution environment and web server processes in the current shell by running the following command:

    dfx start

If you start the local canister execution environment in the current shell, you need to open a new terminal shell to run additional commands. Alternatively, you can start the local canister execution environment in the background by running the following command:

    dfx start --background

If you run the local canister execution environment in the background, however, be sure to stop the local canister execution environment before uninstalling or reinstalling the `dfx` execution environment by running the following command:

    dfx stop

You can view the current process identifier (`pid`) for the local canister execution environment process started by `dfx` by running the following command:

    more .dfx/pid
