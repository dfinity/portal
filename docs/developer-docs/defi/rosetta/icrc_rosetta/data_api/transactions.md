---
keywords: [intermediate, rosetta, tutorial]
---

import { MarkdownChipRow } from "/src/components/Chip/MarkdownChipRow";

# Fetch block transactions

<MarkdownChipRow labels={["Intermediate", "Tutorial" ]} />

## Overview 

The `block_transaction` endpoint allows you to fetch a transaction at a certain block height. It is the implementation of the [/block endpoint](https://www.rosetta-api.org/docs/BlockApi.html#blocktransaction) of the Rosetta API standard. 

:::info
An ICRC-1 ledger block always contains exactly one transaction. The hash of the block as well as the index of the block is guaranteed to be unique while the hash of the transaction is not. 
:::


### Prerequisites

- Your Rosetta instance is up and running under the address `0.0.0.0:8082`.

- Make sure to use the correct `[NetworkIdentifier`](/docs/developer-docs/defi/rosetta/icrc_rosetta/data_api/network.md). 

## Example
For this example the following arbitrary `BlockIdentifier` and `TransactionIdentifier` are used:
```bash
"block_identifier": {
        "index": 1357691,
        "hash": "0415ed9ea78fed787e125179c99a7d0e599ee6e4cb0d610eed2c791e6e3f5e19"
    }
"transaction_identifier": {
        "hash": "700481a99b9a10cf4c4d037141ae5f1472fefe1f5be6b43d02577e398da4bdfe"
    }
```
An example request can be found below:

```bash
curl --location '0.0.0.0:8082/block/transaction'  --header 'Content-Type: application/json' --data '{
    "network_identifier": {
            "blockchain": "Internet Computer",
            "network": "mxzaz-hqaaa-aaaar-qaada-cai"
    },
    "block_identifier": {
        "index": 1357691,
        "hash": "0415ed9ea78fed787e125179c99a7d0e599ee6e4cb0d610eed2c791e6e3f5e19"
    },
    "transaction_identifier": {
        "hash": "700481a99b9a10cf4c4d037141ae5f1472fefe1f5be6b43d02577e398da4bdfe"
    }
}'
```

The response is similar to that of the block [endpoint](/docs/developer-docs/defi/rosetta/icrc_rosetta/data_api/blocks.md) as there is only one transaction within a block.


```json
{
    "transaction": {
        "transaction_identifier": {
            "hash": "700481a99b9a10cf4c4d037141ae5f1472fefe1f5be6b43d02577e398da4bdfe"
        },
        "operations": [
            {
                "operation_identifier": {
                    "index": 3
                },
                "related_operations": [
                    {
                        "index": 4
                    },
                    {
                        "index": 5
                    }
                ],
                "type": "TRANSFER",
                "status": "COMPLETED",
                "account": {
                    "address": "lrf2i-zba54-pygwt-tbi75-zvlz4-7gfhh-ylcrq-2zh73-6brgn-45jy5-cae",
                    "sub_account": {
                        "address": "0000000000000000000000000000000000000000000000000000000000000000"
                    }
                },
                "amount": {
                    "value": "230407",
                    "currency": {
                        "symbol": "ckBTC",
                        "decimals": 8
                    }
                }
            },
            {
                "operation_identifier": {
                    "index": 4
                },
                "related_operations": [
                    {
                        "index": 3
                    },
                    {
                        "index": 5
                    }
                ],
                "type": "TRANSFER",
                "status": "COMPLETED",
                "account": {
                    "address": "xmiu5-jqaaa-aaaag-qbz7q-cai",
                    "sub_account": {
                        "address": "0000000000000000000000000000000000000000000000000000000000000000"
                    }
                },
                "amount": {
                    "value": "-230407",
                    "currency": {
                        "symbol": "ckBTC",
                        "decimals": 8
                    }
                }
            },
            {
                "operation_identifier": {
                    "index": 5
                },
                "related_operations": [
                    {
                        "index": 3
                    },
                    {
                        "index": 4
                    }
                ],
                "type": "FEE",
                "status": "COMPLETED",
                "account": {
                    "address": "xmiu5-jqaaa-aaaag-qbz7q-cai",
                    "sub_account": {
                        "address": "0000000000000000000000000000000000000000000000000000000000000000"
                    }
                },
                "amount": {
                    "value": "-10",
                    "currency": {
                        "symbol": "ckBTC",
                        "decimals": 8
                    }
                },
                "metadata": {
                    "fee_set_by": "User"
                }
            }
        ],
        "metadata": {
            "memo": [
                0,
                0,
                0,
                0,
                0,
                0,
                249,
                198
            ]
        }
    }
}
```