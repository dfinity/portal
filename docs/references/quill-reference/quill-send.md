# quill send

Sends a signed message or a set of messages.

## Basic usage

The basic syntax for running `quill send` commands is:

``` bash
quill send [option] <file name>
```

## Arguments

| Argument                 | Description                                     |
|----------------------|-------------------------------------------------|
| `<file name>`       | Path to the signed message. |

## Flags

| Flag                 | Description                                     |
|----------------------|-------------------------------------------------|
| `--dry-run` | Will display the signed message, but not send it. |
| `-h`, `--help`       | Displays usage information.                     |
| `--yes` | Skips confirmation and sends the message directly. |
