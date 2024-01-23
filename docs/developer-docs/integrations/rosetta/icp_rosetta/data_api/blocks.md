# How to fetch blocks
This endpoint allows you to fetch blocks at a certain block height.  It is the implementation of the [/block endpoint](https://www.rosetta-api.org/docs/BlockApi.html#block) of the Rosetta API standard. 
For this part of the guide we assume your rosetta instance is up and running under the address `0.0.0.0:8081`.

Make sure to use the correct NetworkIdentifier as described in this [section](/docs/developer-docs/integrations/rosetta/icp_rosetta/data_api/network.md). For this example the following arbitrary BlockIdentifier is used:
```bash
"block_identifier": {
        "index": 9890652,
        "hash": "e189f729b207dafc2583305cf313671a84bb1437ee44435e12eaf3dcfbcb8fcf"
    }
```
The blockidentifer required here is a [PartialBlockIdentifier](https://www.rosetta-api.org/docs/models/PartialBlockIdentifier.html), which means you can either provide the index, the hash or both. You can select an transaction of your interest in the [ICP dashboard](https://dashboard.internetcomputer.org/transactions) and use the index displayed there to fetch the corresponding block from Rosetta. In the following example we only provide the index, but you are free to use the full blockidentifier or only the hash too.

The request will look something like this:


```bash
curl --location '0.0.0.0:8081/block'  --header 'Content-Type: application/json' --data '{
    "network_identifier": {
        "blockchain":"Internet Computer",
        "network":"00000000000000020101"
    },
    "block_identifier": {
        "index": 9890652
    }
}'
```

The response will give you the transaction within the block, in this case it is a transfer between accounts. While the operation field shows you the basic information about the operation, the metadata of the transaction reveals information specific to ICP transactions such as the `memo` and `created_at_time`. The operation name and metadata varies between operation types. It is recommended to try and fetch a block of interest and see how the metadata and operation is formed to acquire an understanding of how the ICP Rosetta implementation parses the block information for various operation types. 

```bash
{
    "block": {
        "block_identifier": {
            "index": 9840566,
            "hash": "e189f729b207dafc2583305cf313671a84bb1437ee44435e12eaf3dcfbcb8fcf"
        },
        "parent_block_identifier": {
            "index": 9840565,
            "hash": "b9683af7a13e8400b05e582fec77d180db036aba865b4bc7abc0d13ccddeb610"
        },
        "timestamp": 1705420805314,
        "transactions": [
            {
                "transaction_identifier": {
                    "hash": "93a19bfa37db0200cec77281cd8a0602a4375a7367338e7c6973f93a42e6eb5e"
                },
                "operations": [
                    {
                        "operation_identifier": {
                            "index": 0
                        },
                        "type": "TRANSACTION",
                        "status": "COMPLETED",
                        "account": {
                            "address": "d360ba83413713928ec6a61438f7c611c6c81a09b36a99462f654473f9a1a671"
                        },
                        "amount": {
                            "value": "-830010000",
                            "currency": {
                                "symbol": "ICP",
                                "decimals": 8
                            }
                        }
                    },
                    {
                        "operation_identifier": {
                            "index": 1
                        },
                        "type": "TRANSACTION",
                        "status": "COMPLETED",
                        "account": {
                            "address": "42727096b88d2ef0527c77e16c4b11b8685e623bfdd0b035b3680f36078cca06"
                        },
                        "amount": {
                            "value": "830010000",
                            "currency": {
                                "symbol": "ICP",
                                "decimals": 8
                            }
                        }
                    },
                    {
                        "operation_identifier": {
                            "index": 2
                        },
                        "type": "FEE",
                        "status": "COMPLETED",
                        "account": {
                            "address": "d360ba83413713928ec6a61438f7c611c6c81a09b36a99462f654473f9a1a671"
                        },
                        "amount": {
                            "value": "-10000",
                            "currency": {
                                "symbol": "ICP",
                                "decimals": 8
                            }
                        }
                    }
                ],
                "metadata": {
                    "block_height": 9840566,
                    "memo": 0,
                    "timestamp": 1705420805314666462
                }
            }
        ]
    }
```