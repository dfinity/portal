# How to fetch account balances
This endpoint allows you to fetch the balances for a certain account. It is the implementation of the [/account/balance endpoint](https://www.rosetta-api.org/docs/AccountApi.html#accountbalance) of the Rosetta API standard. 
For this part of the guide we assume your rosetta instance is up and running under the address `0.0.0.0:8081`.

Make sure to use the correct NetworkIdentifier as described in this [section](/docs/developer-docs/integrations/rosetta/icp_rosetta/data_api/network.md). For this example an arbitrary AccountIdentifier [8b84c3a3529d02a9decb5b1a27e7c8d886e17e07ea0a538269697ef09c2a27b4](https://dashboard.internetcomputer.org/account/8b84c3a3529d02a9decb5b1a27e7c8d886e17e07ea0a538269697ef09c2a27b4) was used. 

```bash
curl --location '0.0.0.0:8081/account/balance'  --header 'Content-Type: application/json' --data '{
    "network_identifier": {
        "blockchain":"Internet Computer",
        "network":"00000000000000020101"
    },
    "account_identifier": {
        "address": "8b84c3a3529d02a9decb5b1a27e7c8d886e17e07ea0a538269697ef09c2a27b4"
    }
}'
```

The response will give you the balance of the AccountIdentifier at the most recent block.

```bash
{
    "block_identifier": {
        "index": 9890652,
        "hash": "30217e980397e9a8e14793563511e2d3191aa2df6d623866fa71f967e2ce3f08"
    },
    "balances": [
        {
            "value": "62841206500025",
            "currency": {
                "symbol": "ICP",
                "decimals": 8
            }
        }
    ]
}
```