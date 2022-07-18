# quill list-neurons

Signs the query for all neurons belonging to the signing principal.

## Basic usage

The basic syntax for running `quill list-neurons` commands is:

``` bash
quill list-neurons [neuron id]...
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<neuron id>` | The optional ids of the specific neuron to query. Note that these ids may only be those that occur in the usual output from `list-neurons`, i.e., they should be ids of the user's own neurons. The purpose of this option is to narrow the query, and not to allow querying of arbtirary neuron ids. |

## Flags

| Flag                 | Description                                     |
|----------------------|-------------------------------------------------|
| `-h`, `--help`       | Displays usage information.                     |
