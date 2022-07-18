# quill neuron-stake

Signs topping up of a neuron (new or existing).

## Basic usage

The basic syntax for running `quill neuron-stake` commands is:

``` bash
quill neuron-stake [option]
```

## Flags

| Flag                 | Description                                     |
|----------------------|-------------------------------------------------|
| `-h`, `--help`       | Displays usage information.                     |

## Options

| Option | Description |
|----------|-------------|
| `--amount <AMOUNT>` | ICPs to be staked on the newly created neuron. |
| `--fee <FEE>` | Transaction fee, default is 10000 e8s. |
| `--name <NAME>` | The name of the neuron (up to 8 ASCII characters). |
| `--nonce <NONCE>` | The nonce of the neuron. |

