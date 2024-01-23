# How to fetch network information
For most endpoints you will require some information about the network represented as a [NetworkIdentifier](https://www.rosetta-api.org/docs/models/NetworkIdentifier.html).
For this part of the guide we assume your rosetta instance is up and running under the address `0.0.0.0:8081`.

## Fetch Network List
The network list [endpoint](https://www.rosetta-api.org/docs/NetworkApi.html#networklist) will give you information about the NetworkIdentifier you need to use for ICP Rosetta. It requires no arguments and can thus also be used as a health check of ICP rosetta. You can fetch the endpoint using the following command:  

```bash
curl --location '0.0.0.0:8081/network/list' --header 'Content-Type: application/json' --data '{
    "metadata": {}
}'
```

The response will look something like this:

```bash
{
    "network_identifiers": [
        {
            "blockchain": "Internet Computer",
            "network": "00000000000000020101"
        }
    ]
}
```

You can use this NetworkIdentifer with other endpoints which will require you to provide it in the data section of your `HTTP` call. 

## Fetch Network Options
This [endpoint](https://www.rosetta-api.org/docs/NetworkApi.html#networkoptions) returns the version information and allowed network-specific types for a NetworkIdentifier.

```bash
curl --location '0.0.0.0:8081/network/options' --header 'Content-Type: application/json' --data '{
    "network_identifier": {
        "blockchain":"Internet Computer","network":"00000000000000020101"
    },
    "metadata": {}
}'
```

The response will give you information on the error types, the supported operations and some metadata about the ICP Rosetta node you are running. 

```bash
{
    "version": {
        "rosetta_version": "1.4.10",
        "node_version": "2.0.0"
    },
    "allow": {
        "operation_statuses": [
            {
                "status": "COMPLETED",
                "successful": true
            }
        ],
        "operation_types": [
            "TRANSACTION",
            "MINT",
            "BURN",
            "APPROVE",
            "FEE",
            "STAKE",
            "START_DISSOLVING",
            "STOP_DISSOLVING",
            "SET_DISSOLVE_TIMESTAMP",
            "CHANGE_AUTO_STAKE_MATURITY",
            "DISBURSE",
            "ADD_HOTKEY",
            "REMOVE_HOTKEY",
            "SPAWN",
            "MERGE_MATURITY",
            "REGISTER_VOTE",
            "STAKE_MATURITY",
            "NEURON_INFO",
            "LIST_NEURONS",
            "FOLLOW"
        ],
        "errors": [
            {
                "code": 700,
                "message": "Internal server error",
                "retriable": true
            },
            {
                "code": 701,
                "message": "Invalid request",
                "retriable": false
            },
            {
                "code": 702,
                "message": "Not available in offline mode",
                "retriable": false
            },
            {
                "code": 710,
                "message": "Invalid NetworkId",
                "retriable": false
            },
            {
                "code": 711,
                "message": "Account not found",
                "retriable": false
            },
            {
                "code": 712,
                "message": "Block not found",
                "retriable": false
            },
            {
                "code": 713,
                "message": "Invalid public key",
                "retriable": false
            },
            {
                "code": 714,
                "message": "Invalid transaction id",
                "retriable": false
            },
            {
                "code": 720,
                "message": "Transaction not in the mempool",
                "retriable": false
            },
            {
                "code": 721,
                "message": "Blockchain is empty",
                "retriable": false
            },
            {
                "code": 730,
                "message": "An invalid transaction has been detected",
                "retriable": false
            },
            {
                "code": 740,
                "message": "Internet Computer error",
                "retriable": false
            },
            {
                "code": 750,
                "message": "Transaction rejected",
                "retriable": false
            },
            {
                "code": 770,
                "message": "Operation failed",
                "retriable": true
            },
            {
                "code": 760,
                "message": "Transaction expired",
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
curl --location '0.0.0.0:8081/network/status'  --header 'Content-Type: application/json' --data '{
    "network_identifier": {
        "blockchain":"Internet Computer","network":"00000000000000020101"
    },
    "metadata": {}
}'
```
The response gives you information about the genesis block and the tip of the chain. You can use this to fetch blocks from the ICP Rosetta.
``` bash
{
    "current_block_identifier": {
        "index": 9890652,
        "hash": "30217e980397e9a8e14793563511e2d3191aa2df6d623866fa71f967e2ce3f08"
    },
    "current_block_timestamp": 1705654389430,
    "genesis_block_identifier": {
        "index": 0,
        "hash": "ffca0ecf5e837541c7ee5be431e433ad8e972a7f371e86fbe4f8ad646c7cbcea"
    },
    "sync_status": {
        "current_index": 9890652,
        "target_index": 9890652
    },
    "peers": []
}
```