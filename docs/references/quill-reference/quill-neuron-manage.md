# quill neuron-manage

Signs a neuron configuration change.

## Basic usage

The basic syntax for running `quill neuron-manage` commands is:

``` bash
quill neuron-manage [option] <neuron id>
```

## Arguments

| Argument                 | Description                                     |
|----------------------|-------------------------------------------------|
| `<neuron id>`       | The id of the neuron to manage. |

## Flags

| Flag                 | Description                                     |
|----------------------|-------------------------------------------------|
| `--clear-manage-neuron-followees` | Remove all followees for the NeuronManagement topic. |
| `--disburse` | Disburse the entire staked amount to the controller's account. |
| `-h`, `--help`       | Displays usage information.                     |
| `--join-community-fund` | Join the Internet Computer's community fund with this neuron's entire stake. Caution: this operation is not reversible. |
| `--spawn` | Spawn rewards to a new neuron under the controller's account. |
| `--start-dissolving` | Start dissolving. |
| `--stop-dissolving` | Stop dissolving. |

## Options

| Option | Description |
|----------|-------------|
| `-a`, `--additional-dissolve-delay-seconds <ADDITIONAL_DISSOLVE_DELAY_SECONDS>` | Number of dissolve seconds to add. |
| `--add-hot-key <ADD_HOT_KEY>` | Principal to be used as a hot key. |
| `--follow-neurons <FOLLOW_NEURONS>...` | Defines the neuron ids of a follow rule. |
| `--follow-topic <FOLLOW_TOPIC>` | Defines the topic of a follow rule as defined [here](https://github.com/dfinity/ic/blob/4c9e71499d90d00da986dbe7b985d861fd031c4e/rs/nns/governance/gen/ic_nns_governance.pb.v1.rs#L1571-L1632). |
| `--merge-from-neuron <MERGE_FROM_NEURON>` | Merge stake, maturity and age from the neuron specified by this option into the neuron being managed. |
| `--merge-maturity <MERGE_MATURITY>` | Merge the percentage (between 1 and 100) of the maturity of a neuron into the current stake. |
| `--remove-hot-key <REMOVE_HOT_KEY>` | Principal hot key to be removed. |
| `--split <SPLIT>` | Split off the given number of ICP from a neuron. |

