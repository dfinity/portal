# How to fetch account balances
This endpoint allows you to fetch the balances for a certain account. It is the implementation of the [/account/balance endpoint](https://www.rosetta-api.org/docs/AccountApi.html#accountbalance) of the Rosetta API standard. 
For this part of the guide we assume your rosetta instance is up and running under the address `0.0.0.0:8082`.

Make sure to use the correct NetworkIdentifier as described in this [section](/docs/developer-docs/defi/rosetta/icrc_rosetta/data_api/network.md). For this example an arbitrary AccountIdentifier with the principal `xmiu5-jqaaa-aaaag-qbz7q-cai` and the default subaccount `0000000000000000000000000000000000000000000000000000000000000000` was used. 

```bash
curl --location '0.0.0.0:8082/account/balance'  --header 'Content-Type: application/json' --data '{
    "network_identifier": {
            "blockchain": "Internet Computer",
            "network": "mxzaz-hqaaa-aaaar-qaada-cai"
    },
    "account_identifier": {
        "address": "xmiu5-jqaaa-aaaag-qbz7q-cai",
        "sub_account": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000"
        }
    }
}'
```

The response will give you the balance of the AccountIdentifier at the most recent block.

```bash
{
    "block_identifier": {
        "index": 1357692,
        "hash": "5f1719c97f981f663f5ca612a24a503734eb87d5fbfc295193ab4a29ae139f3f"
    },
    "balances": [
        {
            "value": "134469737",
            "currency": {
                "symbol": "ckBTC",
                "decimals": 8
            }
        }
    ]
}
```