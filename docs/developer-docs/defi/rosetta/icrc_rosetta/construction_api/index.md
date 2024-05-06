---
keywords: [intermediate, rosetta, tutorial]
---

import { MarkdownChipRow } from "/src/components/Chip/MarkdownChipRow";

# Construction-API implementation

<MarkdownChipRow labels={["Intermediate", "Tutorial" ]} />

## Overview 

The Construction-API allows for offline signing of transactions and then posting them on ICP at a later point in time. It is recommended to first go through [flow of operations](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/index.mdx) of the Construction-API to gain an understanding of how it works, what endpoints to call with what parameters, and where the user has to take action upon receiving certain responses. 

Currently, the Construction-API of Rosetta supports only one category of transactions, which is the transfer of assets. According to the ICRC-1 and ICRC-2 standards this can be done in the following ways:
- [Direct transfers](/docs/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/transfer.mdx): This is the most basic functionality. In accordance with the ICRC-1 standard you can use Rosetta to transfer ICP. 
- [Approve spender](/docs/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/approve.mdx): You can approve a spender to spend your tokens for you. This feature adheres to the ICRC-2 standard. 

## Example implementation 
For the sake of completion, the entire Rosetta-Client sample implementation in this example lists all functionalities of the Construction-API. 

You may use it as a starting point to bootstrap your client implementation in your language of choice. 

```python
import json
import requests
import argparse
from hashlib import sha256
import ecdsa
import time
from ecdsa import VerifyingKey

NETWORK_ID = {"blockchain": "Internet Computer", "network": "00000000000000020101"}
HEADERS = {"Content-Type": "application/json", "charset": "utf-8"}


class RosettaClient:
    # Takes in the private key an the url to the running Rosetta instance
    def __init__(self, pk, url):
        self._pk = pk
        self._url = url

    def public_key(self):
        return public_key(self._pk.verifying_key, "secp256k1")

    def sign(self, payloads):
        signatures = []
        for payload in payloads:
            data_to_sign = bytes.fromhex(payload["hex_bytes"])
            signature_bytes = self._pk.sign(data_to_sign, hashfunc=sha256).hex()
            signatures.append(
                {
                    "signing_payload": {
                        "account_identifier": payload["account_identifier"],
                        "hex_bytes": payload["hex_bytes"],
                        "signature_type": "ecdsa",
                    },
                    "signature_type": "ecdsa",
                    "public_key": self.public_key(),
                    "hex_bytes": signature_bytes,
                }
            )
        return signatures

    # Makes a post request to the Rosetta instance and takes in the suffix of the endpoint of Rosetta as well as the request data
    def post(self, url_suffix, data):
        url = self._url + url_suffix
        data_pp = json.dumps(data, indent=2)
        print(f"post({url=}, data={data_pp})")
        response = requests.post(url, data=json.dumps(data), headers=HEADERS)
        return response.json()

    def construction_derive(
        self,
        public_key: str = None,
        curve_type: str = "secp256k1",
        account_type=None,
        neuron_index=0,
    ):
        metadata = None
        if public_key is None:
            public_key = self.public_key()
        if account_type is not None:
            metadata = {"account_type": account_type, "neuron_index": neuron_index}

        return self.post(
            "/construction/derive",
            build_data({"public_key": public_key, "metadata": metadata}),
        )

    def construction_preprocess(self, operations, metadata):
        return self.post(
            "/construction/preprocess",
            build_data(
                {
                    "operations": operations,
                    "metadata": metadata,
                    "network_identifier": NETWORK_ID,
                }
            ),
        )

    def construction_metadata(self, options, public_keys):
        return self.post(
            "/construction/metadata",
            build_data(
                {
                    "options": options,
                    "public_keys": public_keys,
                }
            ),
        )

    def construction_payload(self, public_keys, operations, metadata=None):
        data = build_data(
            {
                "public_keys": public_keys,
                "operations": operations,
            }
        )
        data["metadata"] = metadata
        return self.post("/construction/payloads", data)

    def construction_combine(self, unsigned_transaction, signatures):
        return self.post(
            "/construction/combine",
            build_data(
                {
                    "unsigned_transaction": unsigned_transaction,
                    "signatures": signatures,
                }
            ),
        )

    def construction_submit(self, signed_transaction: str):
        return self.post(
            "/construction/submit",
            build_data(
                {
                    "signed_transaction": signed_transaction,
                }
            ),
        )

    def make_and_submit_transaction(self, operations):
        public_keys = [self.public_key()]
        result = self.construction_payload(public_keys, operations)
        print(result)
        signatures = self.sign(result["payloads"])
        signed_transaction = self.construction_combine(
            result["unsigned_transaction"], signatures
        )
        return self.construction_submit(signed_transaction["signed_transaction"])

def icp_amount(amount: int):
    return {"value": f"{amount}", "currency": {"symbol": "ICP", "decimals": 8}}

def public_key(public_key=VerifyingKey, curve_type="secp256k1"):
    return {
        "hex_bytes": public_key.to_string("uncompressed").hex(),
        "curve_type": "secp256k1",
    }

def stake_operation(source_account, neuron_index=0, operation_identifier=0):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "STAKE",
        "account": {"address": source_account},
        "metadata": {"neuron_index": neuron_index},
    }

def start_dissolving_operation(source_account, neuron_index=0, operation_identifier=0):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "START_DISSOLVING",
        "account": {"address": source_account},
        "metadata": {"neuron_index": neuron_index},
    }

def stop_dissolving_operation(source_account, neuron_index=0, operation_identifier=0):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "STOP_DISSOLVING",
        "account": {"address": source_account},
        "metadata": {"neuron_index": neuron_index},
    }

def neuron_info_operation(
    address, neuron_index=0, controller=None, operation_identifier=0
):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "NEURON_INFO",
        "account": {"address": address},
        "metadata": {"neuron_index": neuron_index, "controller": controller},
    }

def set_dissolve_timestamp_operation(
    address,
    neuron_index=0,
    operation_identifier=0,
    dissolve_time_utc_seconds=int(time.time()),
):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "SET_DISSOLVE_TIMESTAMP",
        "account": {"address": address},
        "metadata": {
            "neuron_index": neuron_index,
            "dissolve_time_utc_seconds": dissolve_time_utc_seconds,
        },
    }

def stake_maturity_operation(
    address, neuron_index=0, operation_identifier=0, percentage_to_stake=100
):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "STAKE_MATURITY",
        "account": {"address": address},
        "metadata": {
            "neuron_index": neuron_index,
            "percentage_to_stake": percentage_to_stake,
        },
    }

def change_auto_stake_maturity_operation(
    address, neuron_index=0, operation_identifier=0, auto_stake=True
):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "CHANGE_AUTO_STAKE_MATURITY",
        "account": {"address": address},
        "metadata": {
            "neuron_index": neuron_index,
            "set_auto_stake_maturity": auto_stake,
        },
    }

def spawn_operation(
    address,
    neuron_index=0,
    operation_identifier=0,
    percentage_to_spawn=100,
    spawned_neuron_index=1,
):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "SPAWN",
        "account": {"address": address},
        "metadata": {
            "neuron_index": neuron_index,
            "percentage_to_spawn": percentage_to_spawn,
            "spawned_neuron_index": spawned_neuron_index,
        },
    }

def add_hotkey_operation(
    address, verifying_key: VerifyingKey, neuron_index=0, operation_identifier=0, curve_type="secp256k1"
):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "ADD_HOTKEY",
        "account": {"address": address},
        "metadata": {
            "neuron_index": neuron_index,
            "public_key": public_key(verifying_key,curve_type),
        },
    }

def remove_hotkey_operation(
    address, verifying_key: VerifyingKey, neuron_index=0, operation_identifier=0, curve_type="secp256k1"
):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "REMOVE_HOTKEY",
        "account": {"address": address},
        "metadata": {
            "neuron_index": neuron_index,
            "public_key": public_key(verifying_key,curve_type),
        },
    }

def register_vote_operation(address, neuron_index=0, operation_identifier=0, proposal_id=0, vote=0):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "REGISTER_VOTE",
        "account": {"address": address},
        "metadata": {
            "neuron_index": neuron_index,
            "proposal": proposal_id,
            "vote": vote,
        },
    }

def follow_operation(address, neuron_index=0, operation_identifier=0, followees=[],topic=0, controller=None):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "FOLLOW",
        "account": {"address": address},
        "metadata": {
            "neuron_index": neuron_index,
            "followees": followees,
            "topic": topic,
            "controller": controller,
        },
    }
    
def disburse_operation(address, recipient, neuron_index=0, operation_identifier=0, amount = 0):
    return {
        "operation_identifier": {"index": operation_identifier},
        "type": "DISBURSE",
        "account": {"address": address},
        "amount": icp_amount(amount),
        "metadata": {
            "neuron_index": neuron_index,
            "recipient": recipient,
        },
    }

def fee_operation(index: int, account_id: str, fee: int):
    return {
        "operation_identifier": {"index": index},
        "type": "FEE",
        "account": {"address": account_id},
        "amount": icp_amount(-fee),
    }


def transfer_operation(index: int, account_id: str, amount: int):
    return {
        "operation_identifier": {"index": index},
        "type": "TRANSACTION",
        "account": {"address": account_id},
        "amount": icp_amount(amount),
    }


# Attaches the network_identifier to the request
def build_data(d):
    return {"network_identifier": NETWORK_ID, **d}


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-k", "--private-key-file", required=True)
    parser.add_argument("-hk", "--hot-key-private-key-file", required=False)
    parser.add_argument("-u", "--ic-url", required=True)
    parser.add_argument("-is", "--ingress-start", required=False)
    parser.add_argument("-ie", "--ingress-end", required=False)
    parser.add_argument("-m", "--memo", required=False)
    parser.add_argument("-c", "--created-at-time", required=False)
    return parser.parse_args()
```