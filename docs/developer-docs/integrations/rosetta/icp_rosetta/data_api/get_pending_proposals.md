
# How to list pending proposals
This endpoint allows you to fetch all pending proposals from the NNS.  It is the implementation of the [/call endpoint](https://www.rosetta-api.org/docs/BlockApi.html#call) of the Rosetta API standard. The call endpoint is very flexible as to what it can be used for. In the case of ICP Rosetta it is used to fetch various custom information that is not covered by the Rosetta API standard.
For this part of the guide we assume your rosetta instance is up and running under the address `0.0.0.0:8081`.

Make sure to use the correct NetworkIdentifier as described in this [section](/docs/developer-docs/integrations/rosetta/icp_rosetta/data_api/network.md). 
Pedning proposals are all proposals which not yet have come to a conclusion and may be voted on. It is a direct call to the `get_pending_proposals` [endpoint](https://dashboard.internetcomputer.org/canister/rrkah-fqaaa-aaaaa-aaaaq-cai#get_pending_proposals) of the Governance canister.

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
    "method_name": "get_pending_proposals",
    "parameters": {
    }
}'
```

As of the time of this writing the list of pedning proposals is quite long so we will only list the first few examples of the response here.


```bash
{
    "result": {
        "pending_proposals": [
            {
                "ballots": {
                    "14315117116521128082": {
                        "vote": 1,
                        "voting_power": 194303150
                    }
                },
                "deadline_timestamp_seconds": 1705675261,
                "decided_timestamp_seconds": 0,
                "derived_proposal_information": null,
                "executed_timestamp_seconds": 0,
                "failed_timestamp_seconds": 0,
                "failure_reason": null,
                "id": {
                    "id": 127044
                },
                "latest_tally": {
                    "no": 989160836352154,
                    "timestamp_seconds": 1705653818,
                    "total": 46153510008621873,
                    "yes": 12289611440879857
                },
                "proposal": {
                    "action": {
                        "Motion": {
                            "motion_text": "Interim remuneration proposal: rewards for Gen-1 node machines after 48 months"
                        }
                    },
                    "summary": "\n\n## Problem statement\n\nWith the approval of the [IC target topology](https://dashboard.internetcomputer.org/proposal/125549), a target of 750 node machines in the IC network is defined for the next half year/year. This target is defined keeping in mind that several of the Gen-1 node provider agreements will expire in the next two years.\n\nAlthough the IC target topology requires fewer node machines than the current number of node machines (750 node machines vs approximately 1300 node machines), the IC network still requires an extensive number of Gen-1 node machines for operating purposes.\n\nThe long term objective is to have remuneration based on useful work for all node machines, which means node rewards are paid out based on the actual contribution to the IC, e.g. the number of blocks created, the size of the blocks created, how many times the node machine has been a block maker, in which subnet the node machine is running, etc; regardless of the type of node machine and when the node machine was bought. Since implementing this new approach to remuneration requires extensive discussion within the community as well as time to design and develop, an interim approach is required for the remuneration of Gen-1 node machines for which the node provider agreements will expire.\n\nDespite the introduction of Gen-2 node machines, the Gen-1 node machines are still very relevant for the IC network for several reasons:\n\n- They provide for the necessary decentralization of the IC network.\n- Not all subnets require SEV-SNP functionality (the additional security functionality introduced with Gen-2 node machines).\n- Since the initial capital investments for the Gen-1 node machines have been amortized, Gen-1 node machines are economically very attractive to operate.\n- They provide for a buffer to scale up the IC network should use of the network start to increase sharply.\n\nOn the other hand, Gen-1 node machines in the IC network have several constraints:\n\n- They cannot be deployed in every IC subnet since some subnets will require node machines with SEV-SNP support.\n- As described in the forum posts on node diversification (see [node diversification part 1](https://forum.dfinity.org/t/ic-topology-series-node-diversification-part-i/23402), and [node diversification part 2](https://forum.dfinity.org/t/ic-topology-node-diversification-part-ii/23553)) - Gen-1 node machines are less decentralized and more concentrated at fewer node providers than Gen 2 node machines.\n- There are too many Gen-1 node machines to fit the IC target topology.\n\n## Proposal\n\nTaking into account both the benefits and constraints of Gen-2 node machines, the following interim remuneration scheme for Gen-1 node machines after 48 months is proposed:\n\n- **Rewards are optimized for 28 node machines** - if all Gen-1 node provider agreements have reached 48 months, it can be calculated that with a maximum of 28 nodes per Gen-1 Node provider, sufficient node machines remain in the IC network to meet the target topology of 750 node machines. However, it will still be possible for a Node Provider to continue to operate up to 42 node machines (similar as for Gen-2 Node Providers, and described in node diversification part 2), for example in anticipation of growth of the IC network and increase in ICP token price.\n- **Rewards for Gen-1 node machines are lower than at launch** - rewards for Gen-1 node machines are lower than the rewards set at launch because of several reasons: not all Gen-1 node machines add to decentralization, Gen-1 node machines cannot be deployed in every subnet, and the initial investment costs for buying the node machines have been amortized by the node provider.\n- **Rewards apply for a period of 12 months** - the interim remuneration proposal applies for a period of 12 months, after which the scheme will be reevaluated based on feedback and input from the community.\n- **Rewards for Gen-1 node machines follow a similar formula as the rewards scheme for Gen-2 node machines** - node rewards will follow the same formula as remuneration for Gen-2 node machines, which is Initial reward for first node machine x Multiplier x Reduction Coefficient.\n\nThe Gen-1 node machine rewards are set at the values specified in the below table.  To summarize the remuneration scheme, for a geography g, let\n\n**mult(g)** be the geography multiplier\n\n**value(g)** be the base value for a Gen-1 node in XDR\n\n**r(np, g)** be the reduction coefficient\n\nThen the monthly reward for the n-th node of a Node Provider (np) in geography g are defined as follows:\n\n**reward(g, n)** = value(g) * mult(g) * r(np, g) ^ (n-1)\n\nWith a multiplier of 2.5 on the base value of the node, and a reduction coefficient of 0.97, this optimum of 28 node machines as described above can be achieved. The following table shows the geography-dependent values and the monthly reward for the first node onboarded. A few previously-separated geographic areas have been combined:\n\n| Geography\t| Gen-2 value per node before multiplier for comparison | Reduced value for non- SEV-SMP nodes | Multiplier\t| Monthly reward for 1st node | Reduction coefficient r |\n| ----- | ----- | ----- | ----- | ----- | ----- |\n| US - California | 771 | 496 | 2.5 | 1247.5 | 0.97 |\n| US - other | 647 | 465 | 2.5 | 1162.5 | 0.97 |\n| Canada | 771 | 496 | 2.5 | 1247.5 | 0.97 |\n| Europe | 771 | 496 | 2.5 | 1247.5 | 0.97 |\n| Japan and Singapore | 844 | 568 | 2.5 | 1420 | 0.97 |\n\nThe above formula and table can be used to calculate the accumulated profit for each additional node. When calculating the accumulated profit for Gen-1 node machines in the United States, the below graph results, which shows the total profit for all machines up to the n-th node machine. It shows that when 28 nodes (2 racks of node machines) are kept on the IC network, almost maximum profit is achieved (30 to 31 node machines being the optimal). \n\n",
                    "title": "Interim remuneration proposal: rewards for Gen-1 node machines after 48 months",
                    "url": "https://forum.dfinity.org/t/update-of-gen1-np-remuneration/10553/18"
                },
                "proposal_timestamp_seconds": 1705329661,
                "proposer": {
                    "id": 76
                },
                "reject_cost_e8s": 1000000000,
                "reward_event_round": 0,
                "reward_status": 1,
                "status": 1,
                "topic": 4
            },
            {
                "ballots": {
                    "14315117116521128082": {
                        "vote": 1,
                        "voting_power": 194267385
                    }
                },
                "deadline_timestamp_seconds": 1705765554,
                "decided_timestamp_seconds": 0,
                "derived_proposal_information": null,
                "executed_timestamp_seconds": 0,
                "failed_timestamp_seconds": 0,
                "failure_reason": null,
                "id": {
                    "id": 127053
                },
                "latest_tally": {
                    "no": 35216853805094,
                    "timestamp_seconds": 1705653898,
                    "total": 46155134009664689,
                    "yes": 847929671238854
                },
                "proposal": {
                    "action": {
                        "ExecuteNnsFunction": {
                            "nns_function": 22,
                            "payload": [
                                68,
                                73,
                                68,
                                76,
                                4,
                                108,
                                2,
                                209,
                                165,
                                198,
                                156,
                                4,
                                1,
                                138,
                                148,
                                209,
                                203,
                                14,
                                2,
                                110,
                                113,
                                110,
                                3,
                                109,
                                113,
                                1,
                                0,
                                0,
                                1,
                                0
                            ]
                        }
                    },
                    "summary": "Remove read-only SSH keys from unassigned nodes that were added a long time ago and subsequently forgotten.",
                    "title": "Update all unassigned nodes",
                    "url": ""
                },
                "proposal_timestamp_seconds": 1705419954,
                "proposer": {
                    "id": 40
                },
                "reject_cost_e8s": 1000000000,
                "reward_event_round": 0,
                "reward_status": 1,
                "status": 1,
                "topic": 5
            },
            ...

```
