


# How to get a proposal info
This endpoint allows you to fetch more detailed information about a specific proposal from the NNS.  It is the implementation of the [/call endpoint](https://www.rosetta-api.org/docs/BlockApi.html#call) of the Rosetta API standard. The call endpoint is very flexible as to what it can be used for. In the case of ICP Rosetta it is used to fetch various custom information that is not covered by the Rosetta API standard.
For this part of the guide we assume your rosetta instance is up and running under the address `0.0.0.0:8081`.

Make sure to use the correct NetworkIdentifier as described in this [section](/docs/developer-docs/integrations/rosetta/icp_rosetta/data_api/network.md). 
Pedning proposals are all proposals which not yet have come to a conclusion and may be voted on. It is a direct call to the `get_proposal_info` [endpoint](https://dashboard.internetcomputer.org/canister/rrkah-fqaaa-aaaaa-aaaaq-cai#get_proposal_info) of the Governance canister.

:::info
This call requires Rosetta to make an online call, so make sure that Rosetta is connected to the internet.
:::

For the arbitrarily chosen proposal `127049` the request will look something like this:


```bash
curl --location '0.0.0.0:8081/call'  --header 'Content-Type: application/json' --data '{
    "network_identifier": {
        "blockchain":"Internet Computer",
        "network":"00000000000000020101"
    },
    "method_name": "get_proposal_info",
    "parameters": {
        "proposal_id": 127049
    }
}'
```

The response gives you detailed information about the current state of the proposal. 
```bash
{
    "result": {
        "ballots": {
            "14315117116521128082": {
                "vote": 1,
                "voting_power": 194302072
            }
        },
        "deadline_timestamp_seconds": 1705677983,
        "decided_timestamp_seconds": 1705574372,
        "derived_proposal_information": null,
        "executed_timestamp_seconds": 1705574372,
        "failed_timestamp_seconds": 0,
        "failure_reason": null,
        "id": {
            "id": 127049
        },
        "latest_tally": {
            "no": 22366231454553,
            "timestamp_seconds": 1705574372,
            "total": 46153787418737556,
            "yes": 45931044100020061
        },
        "proposal": {
            "action": {
                "ExecuteNnsFunction": {
                    "nns_function": 31,
                    "payload": [
                        68,
                        73,
                        68,
                        76,
                        2,
                        108,
                        3,
                        221,
                        217,
                        155,
                        135,
                        3,
                        1,
                        189,
                        134,
                        157,
                        139,
                        4,
                        104,
                        136,
                        254,
                        159,
                        200,
                        13,
                        1,
                        109,
                        104,
                        1,
                        0,
                        2,
                        1,
                        29,
                        192,
                        197,
                        253,
                        217,
                        205,
                        254,
                        199,
                        112,
                        105,
                        186,
                        150,
                        168,
                        234,
                        251,
                        182,
                        142,
                        187,
                        238,
                        221,
                        135,
                        38,
                        176,
                        97,
                        192,
                        253,
                        118,
                        190,
                        211,
                        2,
                        1,
                        29,
                        100,
                        98,
                        50,
                        110,
                        148,
                        84,
                        150,
                        147,
                        157,
                        195,
                        102,
                        99,
                        15,
                        150,
                        48,
                        232,
                        54,
                        83,
                        160,
                        194,
                        49,
                        252,
                        216,
                        236,
                        129,
                        56,
                        250,
                        237,
                        2,
                        1,
                        29,
                        18,
                        121,
                        14,
                        118,
                        97,
                        252,
                        205,
                        61,
                        79,
                        200,
                        49,
                        56,
                        220,
                        175,
                        253,
                        159,
                        24,
                        142,
                        134,
                        123,
                        69,
                        174,
                        16,
                        200,
                        131,
                        109,
                        208,
                        184,
                        2,
                        2,
                        1,
                        29,
                        34,
                        107,
                        89,
                        103,
                        74,
                        148,
                        137,
                        44,
                        182,
                        109,
                        248,
                        191,
                        158,
                        197,
                        193,
                        116,
                        233,
                        105,
                        88,
                        39,
                        11,
                        53,
                        175,
                        180,
                        230,
                        17,
                        76,
                        76,
                        2,
                        1,
                        29,
                        137,
                        101,
                        36,
                        181,
                        86,
                        42,
                        173,
                        156,
                        56,
                        65,
                        68,
                        44,
                        75,
                        253,
                        202,
                        146,
                        245,
                        196,
                        212,
                        107,
                        140,
                        94,
                        21,
                        208,
                        145,
                        121,
                        47,
                        24,
                        2
                    ]
                }
            },
            "summary": "# Replace nodes in subnet opn46\n\nMotivation: replacing 2 nodes to improve subnet decentralization",
            "title": "Replace nodes in subnet opn46",
            "url": ""
        },
        "proposal_timestamp_seconds": 1705332383,
        "proposer": {
            "id": 40
        },
        "reject_cost_e8s": 1000000000,
        "reward_event_round": 0,
        "reward_status": 1,
        "status": 4,
        "topic": 7
    }
}
```