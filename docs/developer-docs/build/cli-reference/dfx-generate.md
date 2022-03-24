# dfx generate

Use the `dfx generate` command to generate canister type declarations for supported programming languages. Currently, `dfx generate` supports four languages: Motoko, Candid, JavaScript, and TypeScript.

You can use this command to generate type declarations for all canisters that are defined for a project in the project’s `dfx.json` configuration file or a specific canister.

Note that you can only run this command from within the project directory structure. For example, if your project name is `hello_world`, your current working directory must be the `hello_world` top-level project directory or one of its subdirectories.

The `dfx generate` command looks for the configuration under the `declarations` section of a canister in the `dfx.json` configuration file.

## Basic usage

    dfx generate [canister_name]

## Flags

You can use the following optional flags with the `dfx generate` command.

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

## Arguments

You can specify the following arguments for the `dfx generate` command.

<!-- <table>
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
<td style="text-align: left;"><p>Specifies the name of the canister for which to generate type declarations. The canister name must match at least one name that you have configured in the <code>canisters</code> section of the <code>dfx.json</code> configuration file for your project. If you don’t specify this argument, <code>dfx generate</code> will generate type declarations for all canisters declared in <code>dfx.json</code>.</p></td>
</tr>
</tbody>
</table> -->

## Configuration

The behavior of `dfx generate` is controlled by the `dfx.json` configuration file. Under `dfx.json` → `canisters` → `<canister_name>`, you can add a `declarations` section. In this section, you can specify the following fields:

<!-- <table>
<colgroup>
<col style="width: 32%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Field</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><code>output</code></p></td>
<td style="text-align: left;"><p>Directory to place declarations for the canister. Default is <code>src/declarations/&lt;canister_name&gt;</code>.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>bindings</code></p></td>
<td style="text-align: left;"><p>List of languages to generate type declarations. Options are <code>"js", "ts", "did", "mo"</code>. Default is <code>["js", "ts", "did"]</code>.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>env_override</code></p></td>
<td style="text-align: left;"><p>String that will replace <code>process.env.{canister_name_uppercase}_CANISTER_ID</code> in the <code>src/dfx/assets/language_bindings/canister.js</code> template.</p></td>
</tr>
</tbody>
</table> -->

Outputs from `dfx generate`:

<!-- <table>
<colgroup>
<col style="width: 32%" />
<col style="width: 68%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Language</th>
<th style="text-align: left;">File</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p><code>JavaScript(js)</code></p></td>
<td style="text-align: left;"><p><code>index.js</code> and <code>&lt;canister_name&gt;.did.js</code></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>TypeScript(ts)</code></p></td>
<td style="text-align: left;"><p><code>&lt;canister_name&gt;.did.ts</code></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>Candid(did)</code></p></td>
<td style="text-align: left;"><p><code>&lt;canister_name&gt;.did</code></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p><code>Motoko(mo)</code></p></td>
<td style="text-align: left;"><p><code>&lt;canister_name&gt;.mo</code></p></td>
</tr>
</tbody>
</table> -->

## Examples

    Unresolved directive in dfx-generate.adoc - include::example$sample-generate-dfx.json[]

Note that the file name and path to the programs on your file system must match the information specified in the `dfx.json` configuration file.

In this example, the `hello_world` canister itself is written in Motoko. The `declarations` section specifies that type declarations for all four languages will be generated and stored at `src/declarations/`.

    dfx generate hello_world

Since there is only one canister in `dfx.json`, calling `dfx generate` without an argument will have the same effect as the above command. If there were multiple canisters defined in `dfx.json`, this would generate type declarations for all defined canisters.

    dfx generate
