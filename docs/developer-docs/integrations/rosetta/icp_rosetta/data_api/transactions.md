# How to fetch block transactions
This endpoint allows you to fetch a transaction at a certain block height.  It is the implementation of the [/block endpoint](https://www.rosetta-api.org/docs/BlockApi.html#blocktransaction) of the Rosetta API standard. 

:::info
Note that in the case of the ICP ledger a block always contains exactly one transaction. The hash of the block as well as the index of the block is guarenteed to be unique 
while the hash of the transaction is not. 
:::

For this part of the guide we assume your rosetta instance is up and running under the address `0.0.0.0:8081`.

Make sure to use the correct NetworkIdentifier as described in this [section](/docs/developer-docs/integrations/rosetta/icp_rosetta/data_api/network.md). For this example the following arbitrary BlockIdentifier and TransactionIdentifier are used:
```bash
"block_identifier": {
        "index": 9890652,
        "hash": "e189f729b207dafc2583305cf313671a84bb1437ee44435e12eaf3dcfbcb8fcf"
    }
"transaction_identifier": {
                    "hash": "93a19bfa37db0200cec77281cd8a0602a4375a7367338e7c6973f93a42e6eb5e"
                }
```
The request is the following: 

```bash
curl --location '0.0.0.0:8081/block/transaction'  --header 'Content-Type: application/json' --data '{
    "network_identifier": {
        "blockchain":"Internet Computer",
        "network":"00000000000000020101"
    },
        "block_identifier": {
            "index": 9840566,
            "hash": "e189f729b207dafc2583305cf313671a84bb1437ee44435e12eaf3dcfbcb8fcf"
        },
                    "transaction_identifier": {
                    "hash": "93a19bfa37db0200cec77281cd8a0602a4375a7367338e7c6973f93a42e6eb5e"
                }
}
```
The response is similar to that of the block [endpoint](/docs/developer-docs/integrations/rosetta/icp_rosetta/data_api/blocks.md) as there is only one transaction withing a block.

```bash
{
    "transaction": {
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
}
```