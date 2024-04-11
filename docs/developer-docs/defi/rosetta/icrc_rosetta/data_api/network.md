# How to fetch network information
For most endpoints you will require some information about the network represented as a [NetworkIdentifier](https://www.rosetta-api.org/docs/models/NetworkIdentifier.html).
For this part of the guide we assume your rosetta instance is up and running under the address `0.0.0.0:8082`.

## Fetch Network List
The network list [endpoint](https://www.rosetta-api.org/docs/NetworkApi.html#networklist) will give you information about the NetworkIdentifier you need to use for ICP Rosetta. It requires no arguments and can thus also be used as a health check of ICP rosetta. You can fetch the endpoint using the following command:  

```bash
curl --location '0.0.0.0:8082/network/list' --header 'Content-Type: application/json' --data '{
    "metadata": {}
}'
```

The response will look something like this:

```bash
{
    "network_identifiers": [
        {
            "blockchain": "Internet Computer",
            "network": "mxzaz-hqaaa-aaaar-qaada-cai"
        }
    ]
}
```
In this case we are connected to the ckBTC ledger with the canister id `mxzaz-hqaaa-aaaar-qaada-cai`. 
You can use this NetworkIdentifer with other endpoints which will require you to provide it in the data section of your `HTTP` call. 

## Fetch Network Options
This [endpoint](https://www.rosetta-api.org/docs/NetworkApi.html#networkoptions) returns the version information and allowed network-specific types for a NetworkIdentifier.

```bash
curl --location '0.0.0.0:8082/network/options' --header 'Content-Type: application/json' --data '{
    "network_identifier": {
            "blockchain": "Internet Computer",
            "network": "mxzaz-hqaaa-aaaar-qaada-cai"
    },
    "metadata": {}
}'
```

The response will give you information on the error types, the supported operations and some metadata about the ICP Rosetta node you are running. 

```bash
{
    "version": {
        "rosetta_version": "1.4.13",
        "node_version": "1.0.0"
    },
    "allow": {
        "operation_statuses": [
            {
                "status": "COMPLETED",
                "successful": true
            }
        ],
        "operation_types": [
            "MINT",
            "BURN",
            "TRANSFER",
            "SPENDER",
            "APPROVE",
            "FEE",
            "FEE_COLLECTOR"
        ],
        "errors": [
            {
                "code": 1,
                "message": "Invalid network identifier",
                "description": "\"Invalid NetworkIdentifier. Expected Identifier: NetworkIdentifier { blockchain: \\\"Internet Computer\\\", network: \\\"mxzaz-hqaaa-aaaar-qaada-cai\\\", sub_network_identifier: None } \"",
                "retriable": false
            },
            {
                "code": 2,
                "message": "Unable to find block",
                "description": "\"Unable to find block\"",
                "retriable": false
            },
            {
                "code": 3,
                "message": "Invalid block identifier provided",
                "description": "\"Unable to find block\"",
                "retriable": false
            },
            {
                "code": 4,
                "message": "Failed to build block response",
                "description": "\"Faild to create a response for fetching blocks.\"",
                "retriable": false
            },
            {
                "code": 5,
                "message": "Invalid transaction identifier provided",
                "description": "Invalid transaction identifier provided.",
                "retriable": false
            },
            {
                "code": 6,
                "message": "Mempool transaction not found",
                "description": "Mempool transaction not found.",
                "retriable": false
            },
            {
                "code": 7,
                "message": "Failed trying to parse types.",
                "description": "\"Failed to parse in between types.\"",
                "retriable": false
            },
            {
                "code": 8,
                "message": "The operation TRANSFER is not supported by ICRC Rosetta.",
                "retriable": false
            },
            {
                "code": 9,
                "message": "Failed to communicate with the icrc1 ledger.",
                "description": "\"Rosetta could not communicate with the ICRC-1 Ledger successfully.\"",
                "retriable": false
            },
            {
                "code": 13,
                "message": "Unable to find account balance.",
                "description": "\"The balance for the given account could not be fetched.\"",
                "retriable": false
            },
            {
                "code": 10,
                "message": "Error while processing the request.",
                "description": "\"The input of the user resulted in an error while trying to process the request.\"",
                "retriable": false
            },
            {
                "code": 11,
                "message": "Processing of the construction request failed.",
                "description": "\"An error while processing an construction api endpoint occured.\"",
                "retriable": false
            },
            {
                "code": 12,
                "message": "Invalid metadata provided.",
                "description": "\"The metadata provided by the user is invalid.\"",
                "retriable": false
            }
        ],
        "historical_balance_lookup": true,
        "call_methods": [],
        "balance_exemptions": [],
        "mempool_coins": false
    }
}

```

## Fetch Network Status
This [endpoint](https://www.rosetta-api.org/docs/NetworkApi.html#networkstatus) returns the current status of the network requested.

```bash
curl --location '0.0.0.0:8082/network/status'  --header 'Content-Type: application/json' --data '{
    "network_identifier": {
            "blockchain": "Internet Computer",
            "network": "mxzaz-hqaaa-aaaar-qaada-cai"
    },
    "metadata": {}
}'
```
The response gives you information about the genesis block and the tip of the chain. You can use this to fetch blocks from the ICRC Rosetta.
``` bash
{
    "current_block_identifier": {
        "index": 1357691,
        "hash": "0415ed9ea78fed787e125179c99a7d0e599ee6e4cb0d610eed2c791e6e3f5e19"
    },
    "current_block_timestamp": 1712825491835,
    "genesis_block_identifier": {
        "index": 0,
        "hash": "b0e8e9d676e9283877dc50db00cd41cf605568ce1f0a2126cda9dcc6562f3401"
    },
    "oldest_block_identifier": {
        "index": 0,
        "hash": "b0e8e9d676e9283877dc50db00cd41cf605568ce1f0a2126cda9dcc6562f3401"
    },
    "peers": []
}
```