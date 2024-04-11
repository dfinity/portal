# How to fetch blocks
This endpoint allows you to fetch blocks at a certain block height.  It is the implementation of the [/block endpoint](https://www.rosetta-api.org/docs/BlockApi.html#block) of the Rosetta API standard. 
For this part of the guide we assume your rosetta instance is up and running under the address `0.0.0.0:8082`.

Make sure to use the correct NetworkIdentifier as described in this [section](/docs/developer-docs/defi/rosetta/icrc_rosetta/data_api/network.md). For this example the following arbitrary BlockIdentifier is used:
```bash
"block_identifier": {
        "index": 1357691,
        "hash": "0415ed9ea78fed787e125179c99a7d0e599ee6e4cb0d610eed2c791e6e3f5e19"
    }
```
The blockidentifer required here is a [PartialBlockIdentifier](https://www.rosetta-api.org/docs/models/PartialBlockIdentifier.html), which means you can either provide the index, the hash or both. You can select a transaction of your interest in for example the [ckBTC dashboard](https://dashboard.internetcomputer.org/bitcoin/transactions) and use the index displayed there to fetch the corresponding block from Rosetta. In the following example we only provide the index, but you are free to use the full blockidentifier or only the hash too. If you are connecting to a different ICRC-1 ledger other than the ckBTC ledger, you cannot use the index and hash from the ckBTC ledger. 

The request will look something like this:

```bash
curl --location '0.0.0.0:8082/block'  --header 'Content-Type: application/json' --data '{
    "network_identifier": {
            "blockchain": "Internet Computer",
            "network": "mxzaz-hqaaa-aaaar-qaada-cai"
    },
    "block_identifier": {
        "index": 1357691
    }
}'
```

The response will give you the transaction within the block, in this case it is a transfer between accounts. While the operation field shows you the basic information about the operation, the metadata of the transaction reveals information specific to ICRC-1 transactions such as the `memo`, the `fee_collector_block_index` and `created_at_time`. The operation name and metadata varies between operation types. It is recommended to try and fetch a block of interest and see how the metadata and operation is formed to acquire an understanding of how the ICRC Rosetta implementation parses the block information for various operation types. 

```bash
{
    "block": {
        "block_identifier": {
            "index": 1357691,
            "hash": "0415ed9ea78fed787e125179c99a7d0e599ee6e4cb0d610eed2c791e6e3f5e19"
        },
        "parent_block_identifier": {
            "index": 1357690,
            "hash": "733a2ca495090d99c5e87898d16cc3903a351da436d57e795e01fcaeb37d3ddb"
        },
        "timestamp": 1712825491835,
        "transactions": [
            {
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
        ],
        "metadata": {
            "block_created_at_nano_seconds": 1712825491835944099,
            "fee_collector_block_index": 39493
        }
    }
}
```