# quill

The `quill` is a minimalistic ledger and governance toolkit for cold wallets.

You can use the `quill` parent command with different flags and subcommands to perform different types of operations.

## Basic usage

The basic syntax for running `quill` commands is:

``` bash
quill [option] [subcommand] [flag]
```

To see the available subcommands, please refer to the [index page](index.md) of the quill reference.

## Flags

You can use the following optional flags with the `quill` parent command or with any of the `quill` subcommands.

| Flag                 | Description                                     |
|----------------------|-------------------------------------------------|
| `-h`, `--help`       | Displays usage information.                     |
| `--hsm`              | Enables HSM functionality.                      |
| `--insecure-local-dev-mode` | Enter local testing mode.                |
| `--qr`               | Output the result(s) as UTF-8 QR codes.         |
| `-V`, `--version`    | Displays version information.                   |

## Options

You can use the following options with the `quill` command.

| Option                         | Description                                     |
|--------------------------------|-------------------------------------------------|
| `--hsm-id <HSM_ID>`            | Specifies the HSM key identifier. |
| `--hsm-libpath <HSM_LIBPATH>`  | Specifies the path to the HSM library. |
| `--hsm-slot <HSM_SLOT>`        | Specifies the HSM slot to use. |
| `--pem-file <PEM_FILE>`        | Path to your PEM file (use "-" for STDIN). |
| `--seed-file <SEED_FILE>`      | Path to your seed file (use "-" for STDIN). |
