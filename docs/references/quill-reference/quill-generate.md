# quill generate

Generate a mnemonic seed phrase and generate or recover PEM.

## Basic usage

The basic syntax for running `quill generate` commands is:

``` bash
quill generate [option]
```

## Flags

| Flag                 | Description                                     |
|----------------------|-------------------------------------------------|
| `-h`, `--help`       | Displays usage information.                     |
| `--overwrite-pem-file` |Overwrite any existing PEM file. |
| `--overwrite-seed-file` |Overwrite any existing seed file. |

## Options

| Option | Description |
|----------|-------------|
| `--pem-file <PEM_FILE>` | File to write the PEM to. |
| `--phrase <PHRASE>` | A seed phrase in quotes to use to generate the PEM file. |
| `--seed-file <SEED_FILE>` | File to write the seed phrase to [default: seed.txt]. |
| `--words <WORDS>` | Number of words: 12 or 24 [default: 12]. |

