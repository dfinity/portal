# quill transfer

Signs an ICP transfer transaction.

## Basic usage

The basic syntax for running `quill transfer` commands is:

``` bash
quill transfer [option] --amount <AMOUNT> <TO>
```

## Arguments

| Argument                 | Description                                     |
|----------------------|-------------------------------------------------|
| `<TO>`       | Destination account. |

## Flags

| Flag                 | Description                                     |
|----------------------|-------------------------------------------------|
| `-h`, `--help`       | Displays usage information.                     |

## Options

| Option | Description |
|----------|-------------|
| `--amount <AMOUNT>` | Amount of ICPs to transfer (with up to 8 decimal digits after comma). |
| `--fee <FEE>` | Transaction fee, default is 10000 e8s. |
| `--memo <MEMO>` | Reference number, default is 0. |
