# Staking and neuron management

This document specifies extensions of the Rosetta API enabling staking funds and managing governance "neurons" on the Internet Computer.

:::note

Operations within a transaction are applied in order, so the order of operations is significant. Transactions that contain idempotent operations provided by this API can be re-tried within the 24-hour window.

:::

:::note

Due to limitations of the governance canister, neuron management operations are not reflected on the chain. If you lookup transactions by identifier returned from the `/construction/submit` endpoint, these transactions might not exist or miss neuron management operations. Instead, `/construction/submit` returns the statuses of all the operations in the `metadata` field using the same format as `/block/transaction` would return.

:::

## Deriving neuron address

|               |       |
|---------------|-------|
| Since version | 1.3.0 |

Call the `/construction/derive` endpoint with metadata field `account_type` set to `"neuron"` to compute the ledger address corresponding to the neuron controlled by the public key.

### Request

``` json
{
  "network_identifier": {
    "blockchain": "Internet Computer",
    "network": "00000000000000020101"
  },
  "public_key": {
    "hex_bytes": "1b400d60aaf34eaf6dcbab9bba46001a23497886cf11066f7846933d30e5ad3f",
    "curve_type": "edwards25519"
  },
  "metadata": {
    "account_type": "neuron",
    "neuron_index": 0
  }
}
```

:::note

Since version 1.3.0, you can control many neurons using the same key. You can differentiate between neurons by specifying different values of the `neuron_index` metadata field. The rosetta node supports `neuron_index` in all neuron management operations. `neuron_index` is an arbitrary integer between `0` and `264 - 1` (`18446744073709551615`). It is equal to zero if not specified. If you use JavaScript to construct requests to the Rosetta node, consider using the [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type to represent the `neuron_index`. The `Number` type can precisely represent only values below `253 - 1` (`9007199254740991`).

:::

### Response

``` json
{
  "account_identifier": {
    "address": "531b163cd9d6c1d88f867bdf16f1ede020be7bcd928d746f92fbf7e797c5526a"
  }
}
```

## Stake funds

|               |       |
|---------------|-------|
| Since version | 1.0.5 |
| Idempotent?   | yes   |

To stake funds, execute a transfer to the neuron address followed by a `STAKE` operation.

The only field that you must set for the `STAKE` operation is `account`, which should be equal to the ledger account of the neuron controller. You can specify `neuron_index` field in the `metadata` field of the `STAKE` operation. If you do specify the `neuron_index`, its value must be the same as you used to derive the neuron account identifier.

### Request

``` json
{
  "network_identifier": {
    "blockchain": "Internet Computer",
    "network": "00000000000000020101",
  },
  "operations": [
    {
      "operation_identifier": { "index": 0 },
      "type": "TRANSACTION",
      "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
      "amount": {
        "value": "-100000000",
        "currency": { "symbol": "ICP", "decimals": 8 }
      }
    },
    {
      "operation_identifier": { "index": 1 },
      "type": "TRANSACTION",
      "account": { "address": "531b163cd9d6c1d88f867bdf16f1ede020be7bcd928d746f92fbf7e797c5526a" },
      "amount": {
        "value": "100000000",
        "currency": { "symbol": "ICP", "decimals": 8 }
      }
    },
    {
      "operation_identifier": { "index": 2 },
      "type": "FEE",
      "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
      "amount": {
        "value": "-10000",
        "currency": { "symbol": "ICP", "decimals": 8 }
      }
    },
    {
      "operation_identifier": { "index": 3 },
      "type": "STAKE",
      "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
      "metadata": {
        "neuron_index": 0
      }
    }
  ]
}
```

### Response

``` json
{
  "transaction_identifier": {
    "hash": "2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f"
  },
  "metadata": {
    "operations": [
      {
        "operation_identifier": { "index": 0 },
        "type": "TRANSACTION",
        "status": "COMPLETED",
        "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
        "amount": {
          "value": "-100000000",
          "currency": { "symbol": "ICP", "decimals": 8 }
        }
      },
      {
        "operation_identifier": { "index": 1 },
        "type": "TRANSACTION",
        "status": "COMPLETED",
        "account": { "address": "531b163cd9d6c1d88f867bdf16f1ede020be7bcd928d746f92fbf7e797c5526a" },
        "amount": {
          "value": "100000000",
          "currency": { "symbol": "ICP", "decimals": 8 }
        }
      },
      {
        "operation_identifier": { "index": 2 },
        "type": "FEE",
        "status": "COMPLETED",
        "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
        "amount": {
          "value": "-10000",
          "currency": { "symbol": "ICP", "decimals": 8 }
        }
      },
      {
        "operation_identifier": { "index": 3 },
        "type": "STAKE",
        "status": "COMPLETED",
        "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
        "metadata": {
          "neuron_index": 0
        }
      }
    ]
  }
}
```

## Managing neurons

### Setting dissolve timestamp

|                      |            |
|----------------------|------------|
| Since version        | 1.1.0      |
| Idempotent?          | yes        |
| Minimal access level | controller |

This operation updates the time when the neuron can reach the `DISSOLVED` state.

Dissolve timestamp always increases monotonically.

-   If the neuron is in the `DISSOLVING` state, this operation can move the dissolve timestamp further into the future.

-   If the neuron is in the `NOT_DISSOLVING` state, invoking `SET_DISSOLVE_TIMESTAMP` with time T will attempt to increase the neuron’s dissolve delay (the minimal time it will take to dissolve the neuron) to `T - current_time`.

-   If the neuron is in the `DISSOLVED` state, invoking `SET_DISSOLVE_TIMESTAMP` will move it to the `NOT_DISSOLVING` state and will set the dissolve delay accordingly.

<div class="formalpara-title">

**Preconditions:**

</div>

-   `account.address` is the ledger address of the neuron contoller.

<div class="formalpara-title">

**Example**

</div>

``` json
{
  "operation_identifier": { "index": 4 },
  "type": "SET_DISSOLVE_TIMESTAMP",
  "account": {
    "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d"
  },
  "metadata": {
    "neuron_index": 0,
    "dissolve_time_utc_seconds": 1879939507
  }
}
```

### Start dissolving

|                      |            |
|----------------------|------------|
| Since version        | 1.1.0      |
| Idempotent?          | yes        |
| Minimal access level | controller |

The `START_DISSOLVNG` operation changes the state of the neuron to `DISSOLVING`.

<div class="formalpara-title">

**Preconditions:**

</div>

-   `account.address` is the ledger address of the neuron contoller.

<div class="formalpara-title">

**Postconditions:**

</div>

-   The neuron is in the `DISSOLVING` state.

<div class="formalpara-title">

**Example**

</div>

``` json
{
  "operation_identifier": { "index": 5 },
  "type": "START_DISSOLVING",
  "account": {
    "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d"
  },
  "metadata": {
    "neuron_index": 0
  }
}
```

### Stop dissolving

|                      |            |
|----------------------|------------|
| Since version        | 1.1.0      |
| Idempotent?          | yes        |
| Minimal access level | controller |

The `STOP_DISSOLVNG` operation changes the state of the neuron to `NOT_DISSOLVING`.

<div class="formalpara-title">

**Preconditions:**

</div>

-   `account.address` is a ledger address of a neuron contoller.

<div class="formalpara-title">

**Postconditions:**

</div>

-   The neuron is in `NOT_DISSOLVING` state.

<div class="formalpara-title">

**Example**

</div>

``` json
{
  "operation_identifier": { "index": 6 },
  "type": "STOP_DISSOLVING",
  "account": {
    "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d"
  },
  "metadata": {
    "neuron_index": 0
  }
}
```

### Adding hotkeys

|                      |            |
|----------------------|------------|
| Since version        | 1.2.0      |
| Idempotent?          | yes        |
| Minimal access level | controller |

The `ADD_HOTKEY` operation adds a hotkey to the neuron. The Governance canister allows some non-critical operations to be signed with a hotkey instead of the controller’s key (e.g., voting and querying maturity).

<div class="formalpara-title">

**Preconditions:**

</div>

-   `account.address` is a ledger address of a neuron controller.

-   The neuron has less than 10 hotkeys.

The command has two forms: one form accepts an [IC principal](https://smartcontracts.org/docs/interface-spec/index.html#principal) as a hotkey, another form accepts a [public key](https://www.rosetta-api.org/docs/models/PublicKey.html).

#### Add a principal as a hotkey

``` json
{
  "operation_identifier": { "index": 0 },
  "type": "ADD_HOTKEY",
  "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
  "metadata": {
    "neuron_index": 0,
    "principal": "sp3em-jkiyw-tospm-2huim-jor4p-et4s7-ay35f-q7tnm-hi4k2-pyicb-xae"
  }
}
```

#### Add a public key as a hotkey

``` json
{
  "operation_identifier": { "index": 0 },
  "type": "ADD_HOTKEY",
  "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
  "metadata": {
    "neuron_index": 0,
    "public_key": {
      "hex_bytes":  "1b400d60aaf34eaf6dcbab9bba46001a23497886cf11066f7846933d30e5ad3f",
      "curve_type": "edwards25519"
    }
  }
}
```

### Removing hotkeys

|                      |            |
|----------------------|------------|
| Since version        | 1.2.0      |
| Idempotent?          | yes        |
| Minimal access level | controller |

The `REMOVE_HOTKEY` operation remove a previously added hotkey from the neuron.

<div class="formalpara-title">

**Preconditions:**

</div>

-   `account.address` is a ledger address of a neuron controller.

-   The hotkey is linked to the neuron.

The command has two forms: one form accepts an [IC principal](https://smartcontracts.org/docs/interface-spec/index.html#principal) as a hotkey, another form accepts a [public key](https://www.rosetta-api.org/docs/models/PublicKey.html).

#### Remove a principal as a hotkey

``` json
{
  "operation_identifier": { "index": 0 },
  "type": "REMOVE_HOTKEY",
  "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
  "metadata": {
    "neuron_index": 0,
    "principal": "sp3em-jkiyw-tospm-2huim-jor4p-et4s7-ay35f-q7tnm-hi4k2-pyicb-xae"
  }
}
```

#### Remove a public key as a hotkey

``` json
{
  "operation_identifier": { "index": 0 },
  "type": "REMOVE_HOTKEY",
  "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
  "metadata": {
    "neuron_index": 0,
    "public_key": {
      "hex_bytes":  "1b400d60aaf34eaf6dcbab9bba46001a23497886cf11066f7846933d30e5ad3f",
      "curve_type": "edwards25519"
    }
  }
}
```

### Spawn neurons

|                      |            |
|----------------------|------------|
| Since version        | 1.3.0      |
| Idempotent?          | yes        |
| Minimal access level | controller |

The `SPAWN` operation creates a new neuron from an existing neuron with enough maturity. This operation transfers all the maturity from the existing neuron to the staked amount of the newly spawned neuron.

<div class="formalpara-title">

**Preconditions:**

</div>

-   `account.address` is a ledger address of a neuron controller.

-   The parent neuron has at least 1 ICP worth of maturity.

<div class="formalpara-title">

**Postconditions:**

</div>

-   Parent neuron maturity is set to `0`.

-   A new neuron is spawned with a balance equal to the transferred maturity.

``` json
{
  "operation_identifier": { "index": 0 },
  "type": "SPAWN",
  "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
  "metadata": {
    "neuron_index": 0,
    "controller": {
      "principal": "sp3em-jkiyw-tospm-2huim-jor4p-et4s7-ay35f-q7tnm-hi4k2-pyicb-xae"
    },
    "spawned_neuron_index": 1,
    "percentage_to_spawn": 75
  }
}
```

:::note

- `spawned_neuron_index` metadata field is required. The rosetta node uses this index to compute the subaccount for the spawned neuron. All spawned neurons must have different values of `spawned_neuron_index`.

- `controller` metadata field is optional and equal to the existing neuron controller by default.

- `percentage_to_spawn` metadata field is optional and equal to 100 by default. If specified, the value must be an integer between 1 and 100 (bounds included).

:::

### Merge neuron maturity

|                      |            |
|----------------------|------------|
| Since version        | 1.4.0      |
| Idempotent?          | no         |
| Minimal access level | controller |

The `MERGE_MATURITY` operation merges the existing maturity of the neuron into its stake. The percentage of maturity to merge can be specified, otherwise the entire maturity is merged.

<div class="formalpara-title">

**Preconditions:**

</div>

-   `account.address` is the ledger address of the neuron controller.

-   The neuron has non-zero maturity to merge.

<div class="formalpara-title">

**Postconditions:**

</div>

-   Maturity decreased by the amount merged.

-   Neuron stake increased by the amount merged.

<div class="formalpara-title">

**Example**

</div>

``` json
{
  "operation_identifier": { "index": 0 },
  "type": "MERGE_MATURITY",
  "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
  "metadata": {
    "neuron_index": 0,
    "percentage_to_merge": 14
  }
}
```

:::note

`percentage_to_merge` metadata field is optional and equal to 100 by default. If specified, the value must be an integer between 1 and 100 (bounds included).

:::

### Follow neurons

|                      |            |
|----------------------|------------|
| Since version        | 1.5.0      |
| Idempotent?          | yes        |
| Minimal access level | hotkey     |


The `FOLLOW` operation sets a follow rule for a neuron.
The Governance canister smart contract will automatically deduce the vote of the following neurons from the votes of the followees during the voting.

The `followees` metadata field contains the list of neurons to follow.
If the list contains more than one neuron, the neuron will vote according to the majority of followed neurons votes (or abstain in case of draw).
If the list is empty, the rule for this topic will be discarded (i.e., the neuron will not follow any other neuron for proposals of this type).

You can restrict the rule to a specific topic by specifying the `topic` metadata field.
The topic is an integer between 0 and 10 (inclusive).
The default value for the `topic` field is 0.
Each topic can have at most one rule associated with it.
The topic codes are listed below.

0. Undefined (all topics).
1. Neuron management.
2. Exchange rate.
3. Network economics.
4. Governance.
5. Node administration.
6. Participant management.
7. Subnet management.
8. Network canister management.
9. KYC.
10. Node provider rewards.

<div class="formalpara-title">

**Preconditions:**

</div>

* `account.address` is the ledger address of the neuron controller or hotkey.
* `metadata.followees` contains an array of valid neuron identifiers.
* `metadata.topic` is a valid topic identifier.


<div class="formalpara-title">

**Postconditions:**

</div>

* Neuron votes according to specified follow rule.

<div class="formalpara-title">

**Calling `FOLLOW` as a controller:**

</div>

```json
{
  "operation_identifier": { "index": 0 },
  "type": "FOLLOW",
  "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
  "metadata": {
    "topic": 0,
    "followees": [4169717477823915596, 7814871076665269296],
    "neuron_index": 0
  }
}
```

<div class="formalpara-title">

**Calling `FOLLOW` with a hotkey:**

</div>

```json
{
  "operation_identifier": { "index": 0 },
  "type": "FOLLOW",
  "account": { "address": "8af54f1fa09faeca18d294e0787346264f9f1d6189ed20ff14f029a160b787e8" },
  "metadata": {
    "topic": 0,
    "followees": [4169717477823915596, 7814871076665269296],
    "neuron_index": 0,
    "controller": {
      "public_key": {
        "hex_bytes": "ba5242d02642aede88a5f9fe82482a9fd0b6dc25f38c729253116c6865384a9d",
        "curve_type": "edwards25519"
      }
    }
  }
}
```

:::note

The `followees` metadata field contains list of unique neuron identifiers assigned by the Governance canister smart contract, not the list of neuron indices chosen by the caller.
You can obtain unique neuron identifiers of you your neurons from the `neuron_id` metadata field of the `STAKE` and `NEURON_INFO` operations.

:::


## Accessing neuron attributes

### Accessing public information

|                      |        |
|----------------------|--------|
| Since version        | 1.3.0  |
| Minimal access level | public |

Call the `/account/balance` endpoint to access the staked amount and publicly available neuron metadata.

<div class="formalpara-title">

**Preconditions:**

</div>

-   `public_key` contains the public key of a neuron’s controller.

:::note

-   This operation is available only in online mode.

-   The request should not specify any block identifier because the endpoint always returns the latest state of the neuron.

:::

#### Request

``` json
{
  "network_identifier": {
    "blockchain": "Internet Computer",
    "network": "00000000000000020101"
  },
  "account_identifier": {
    "address": "a4ac33c6a25a102756e3aac64fe9d3267dbef25392d031cfb3d2185dba93b4c4"
  },
  "metadata": {
    "account_type": "neuron",
    "neuron_index": 0,
    "public_key": {
      "hex_bytes": "ba5242d02642aede88a5f9fe82482a9fd0b6dc25f38c729253116c6865384a9d",
      "curve_type": "edwards25519"
    }
  }
}
```

#### Response

``` json
{
  "block_identifier": {
    "index": 1150,
    "hash": "ca02e34bafa2f58b18a66073deb5f389271ee74bd59a024f9f7b176a890039b2"
  },
  "balances": [
    {
      "value": "100000000",
      "currency": {
        "symbol": "ICP",
        "decimals": 8
      }
    }
  ],
  "metadata": {
    "verified_query": false,
    "retrieved_at_timestamp_seconds": 1639670156,
    "state": "DISSOLVING",
    "age_seconds": 0,
    "dissolve_delay_seconds": 240269355,
    "voting_power": 195170955,
    "created_timestamp_seconds": 1638802541
  }
}
```

### Accessing protected information

|                      |        |
|----------------------|--------|
| Since version        | 1.5.0  |
| Idempotent?          | yes    |
| Minimal access level | hotkey |

The `NEURON_INFO` operation retrieves the state of the neuron from the governance canister, including protected fields such as maturity. This operation does not change the state of the neuron. Either the neuron controller or a hotkey can execute this operation.

<div class="formalpara-title">

**Calling `NEURON_INFO` as a controller:**

</div>

``` json
{
  "operation_identifier": { "index": 0 },
  "type": "NEURON_INFO",
  "account": { "address": "907ff6c714a545110b42982b72aa39c5b7742d610e234a9d40bf8cf624e7a70d" },
  "metadata": {
    "neuron_index": 0
  }
}
```

- `account.address` is the ledger address of the neuron controller.

<div class="formalpara-title">

**Calling `NEURON_INFO` with a hotkey:**

</div>

``` json
{
  "operation_identifier": { "index": 0 },
  "type": "NEURON_INFO",
  "account": { "address": "8af54f1fa09faeca18d294e0787346264f9f1d6189ed20ff14f029a160b787e8" },
  "metadata": {
    "neuron_index": 0,
    "controller": {
      "public_key": {
        "hex_bytes": "ba5242d02642aede88a5f9fe82482a9fd0b6dc25f38c729253116c6865384a9d",
        "curve_type": "edwards25519"
      }
    }
  }
}
```

- `account.address` is the ledger address of the neuron hotkey.
- `metadata.controller.public_key` is the public key of the neuron controller.

:::note

Since Rosetta API identifies neurons by the controller’s public key and neuron index, the caller has to specify the public key when executing the operation using a hotkey.

:::

The Rosetta API returns the state of the neuron as operation metadata in the `/construction/submit` endpoint.

<div class="formalpara-title">

**Example response from the /construction/submit endpoint:**

</div>

``` json
{
  "transaction_identifier": {
    "hash": "0000000000000000000000000000000000000000000000000000000000000000"
  },
  "metadata": {
    "operations": [
      {
        "operation_identifier": { "index": 0 },
        "type": "NEURON_INFO",
        "status": "COMPLETED",
        "account": {
          "address": "8af54f1fa09faeca18d294e0787346264f9f1d6189ed20ff14f029a160b787e8"
        },
        "metadata": {
          "controller": {
            "principal": "sp3em-jkiyw-tospm-2huim-jor4p-et4s7-ay35f-q7tnm-hi4k2-pyicb-xae"
          },
          "followees": [
            "0": [111, 222],
            "8": [555, 666]
          ],
          "hotkeys": [
            "6xpcx-hldf5-4ddrg-onbug-4e2kw-rc25g-rxknf-p2wij-hxhqj-azcii-oqe"
          ],
          "kyc_verified": true,
          "maturity_e8s_equivalent": 1000,
          "neuron_fees_e8s": 0,
          "neuron_id": 18089972080608815000,
          "neuron_index": 0,
          "state": "DISSOLVING"
        }
      }
    ]
  }
}
```
