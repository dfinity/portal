# How to list known neurons
This endpoint allows you to fetch all neurons from the NNS that are publicly known.  It is the implementation of the [/call endpoint](https://www.rosetta-api.org/docs/BlockApi.html#call) of the Rosetta API standard. The call endpoint is very flexible as to what it can be used for. In the case of ICP Rosetta it is used to fetch various custom information that is not covered by the Rosetta API standard.
For this part of the guide we assume your rosetta instance is up and running under the address `0.0.0.0:8081`.

Make sure to use the correct NetworkIdentifier as described in this [section](/docs/developer-docs/integrations/rosetta/icp_rosetta/data_api/network.md). 
Known neurons are neurons in the NNS that have publicly available information about them such as a name, description and so forth. It is a direct call to the `list_known_neurons` [endpoint](https://dashboard.internetcomputer.org/canister/rrkah-fqaaa-aaaaa-aaaaq-cai#list_known_neurons) of the Governance canister.

:::info
This call requires Rosetta to make an online call, so make sure that Rosetta is connected to the internet.
:::

The request will look something like this:


```bash
curl --location '0.0.0.0:8081/call'  --header 'Content-Type: application/json' --data '{
    "network_identifier": {
        "blockchain":"Internet Computer",
        "network":"00000000000000020101"
    },
    "method_name": "list_known_neurons",
    "parameters": {
        
    }
}'
```

As of the time of this writing the list of publicly known neurons is quite long so we will only list the first few examples of the response here.

```bash
{
    "result": {
        "known_neurons": [
            {
                "id": {
                    "id": 11974742799838195634
                },
                "known_neuron_data": {
                    "description": "Voting Practices Governed & Incentivized by the $STACK DAO",
                    "name": "$STACK"
                }
            },
            {
                "id": {
                    "id": 13538714184009896865
                },
                "known_neuron_data": {
                    "description": "We are building a spiritual home that truly belongs to the ICP 8yeargang community",
                    "name": "8yeargangDAO"
                }
            },
            {
                "id": {
                    "id": 12890113924500239096
                },
                "known_neuron_data": {
                    "description": "A neuron that votes to reject on every proposal.",
                    "name": "Always Rejects"
                }
            },
            {
                "id": {
                    "id": 10843833286193887500
                },
                "known_neuron_data": {
                    "description": "Anvil provides web3 tools and services",
                    "name": "Anvil"
                }
            },
            {
                "id": {
                    "id": 5967494994762486275
                },
                "known_neuron_data": {
                    "description": "This neuron used to be controlled by cycle_dao. It is now controlled by an individual, Arthur Falls. It will vote on all proposals. Subjects of concern for the controller are protocol stability, healthy economics, token holder rights, node provider incentivisation, better governance, DFINITY accountability, and DFINITY non-participation in the application layer. ",
                    "name": "Arthur\u2019s Neuron (used to be cycle_dao)"
                }
            },
            ...
```