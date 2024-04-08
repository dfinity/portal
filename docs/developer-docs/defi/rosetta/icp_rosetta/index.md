# Overview
The ICP Rosetta allows for communication with the [ICP Ledger](https://dashboard.internetcomputer.org/canister/ryjl3-tyaaa-aaaaa-aaaba-cai) and the [NNS Governance Canister](https://dashboard.internetcomputer.org/canister/rrkah-fqaaa-aaaaa-aaaaq-cai) through the Rosetta-API standard. 
This guide is split up into the endpoints of the Data-API and that of the Construction-API. 

## Set up an ICP Rosetta node

You can set up a Rosetta API-compliant node to interact with the Internet Computer and exchange Internet Computer Protocol (ICP) tokens.
To keep the instructions simple, you can use a Docker image to create the integration with the Rosetta API.
You can also build and run the binary using the source code.

If you don’t already have [Docker](https://docs.docker.com/get-docker/) on your computer, download and install the latest version.

To set up a Rosetta node (which connects to a testnet):

### Step 1:  [Install Docker](https://docs.docker.com/get-docker/) and [start the Docker daemon](https://docs.docker.com/config/daemon/).

The Docker daemon (`dockerd`) should automatically start when you reboot your computer. If you start the Docker daemon manually, the instructions vary depending on the local operating system.

### Step 2:  Pull the latest `dfinity/rosetta-api` image from the Docker Hub by running the following command:

``` bash
docker pull dfinity/rosetta-api
```

### Step 3:  Start the integration software by running the following command:

``` bash
docker run \
    --interactive \
    --tty \
    --publish 8080:8080 \
    --rm \
    dfinity/rosetta-api
```

This command starts the software on the local host and displays output similar to the following:

    Listening on 0.0.0.0:8080
    Starting Rosetta API server

By default, the software connects to a testnet.
It **does not** connect to the ledger canister running on the Internet Computer blockchain mainnet.

If you have been assigned a test network and corresponding ledger canister identifier, you can run the command against that network by specifying an additional `canister` argument.
For example, the following command illustrates connecting to the ledger canister on a test network by setting the `canister` argument to `2xh5f-viaaa-aaaab-aae3q-cai`.

``` bash
docker run \
    --interactive \
    --tty \
    --publish 8080:8080 \
    --rm \
    dfinity/rosetta-api \
    --canister 2xh5f-viaaa-aaaab-aae3q-cai
```

:::info
The first time you run the command, it might take some time for the node to catch up to the current link of the chain.
When the node is caught up, you should see output similar to the following:

You are all caught up to block height 109
:::

After completing this step, the node continues to run as a **passive** node that does not participate in block making.

### Step 4:  Open a new terminal window or tab and run the `ps` command to verify the status of the service.

If you need to stop the service, press <kbd>Ctrl-C</kbd>. You might want to do this to change the canister identifier you are using, for example.

To test the integration after setting up the node, you will need to write a program to simulate a principal submitting a transaction or looking up an account balance.

### Run the Rosetta node in production

When you are finished testing, you should run the Docker image in production mode without the `--interactive`, `--tty`, and `--rm` command-line options.
These command-line options are used to attach an interactive terminal session and remove the container, and are primarily intended for testing purposes.
To run the software in a production environment, you can start the Docker image using the `--detach` option to run the container in the background and, optionally, specify the `--volume` command for storing blocks.

To connect the Rosetta node instance to the mainnet, add flags: `--mainnet` and `--not-whitelisted`.

For more information about Docker command-line options, see the [Docker reference documentation](https://docs.docker.com/engine/reference/commandline/run/).

### Requirements and limitations

The integration software provided in the Docker image has one requirement that is not part of the standard Rosetta API specification.

For transactions involving ICP tokens, the unsigned transaction must be created less than 24 hours before the network receives the signed transaction.
The reason is that each transaction's `created_at` field refers to an existing transaction (essentially `last_index` available locally at the time of transaction creation).
Any submitted transaction that refers back to a too old transaction is rejected to maintain operational efficiency.

Other than this requirement, the Rosetta API integration software fully complies with all standard Rosetta endpoints and passes all of the `rosetta-cli` tests.
The software can accept any valid Rosetta request.
However, the integration software only prompts for transactions to be signed using Ed25519, rather than all the signature schemes [listed here](https://www.rosetta-api.org/docs/models/SignatureType.html#values), and only replies with a small subset of the potential responses that the specification supports.
For example, the software doesn’t implement any of the UTXO features of Rosetta, so you won’t see any UTXO messages in any of the software responses.


# How to use the Rosetta API
The interaction with the Rosetta node can be split in two different parts. The first part consists of fetching data from the ledger regarding blocks, transactions and balances. This part is called the Data-API. [View the steps on how to interact with the Data-API](/docs/developer-docs/defi/rosetta/icp_rosetta/data_api/index.md). 
The second part is more complex. To allow users to sign transactions offline and send them back to Rosetta there are a few interactions that the user will have to follow with the Rosetta node. This part is called the flow of operations in the Construction-API. [View an example of how to go through such a flow of operations](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/index.md). The reader of this guide can follow along the examples outlined in the section for the Construction-API. 

# Frequently asked questions

The following questions come from the most commonly reported questions and blockers from the developer community regarding Rosetta integration with the Internet Computer.

### The Rosetta node

- #### How do I run an instance of the Rosetta node?
An easy way to accomplish this is to use the [`dfinity/rosetta-api`](https://hub.docker.com/r/dfinity/rosetta-api/tags?page=1&ordering=last_updated) Docker image.
Once the node initializes and syncs all blocks, you can perform queries and submit transactions by invoking the Rosetta API on the node.
The node listens on the `8081` port.

- #### How do I connect the Rosetta node to the mainnet?
Use flags `--mainnet` and `--not-whitelisted`

- #### How do I connect the Rosetta node to the mainnet?
Use flags `--mainnet` and `--not-whitelisted`

- #### How do I know if the node has caught up with the test net?
Search the `Starting Rosetta API server` startup log. There will be a log entry that says `You are all caught up to block XX`.
This message confirms that you are caught up with all blocks.

- #### How to persist synced blocks data?
Mount the `/data` directory as a [volume](https://docs.docker.com/storage/volumes/).

```bash
docker volume create rosetta
```
```bash
docker run \
    --volume rosetta:/data \
    --interactive \
    --tty \
    --publish 8081:8081 \
    --rm \
   dfinity/rosetta-api
```

- #### Is the Rosetta node versioned?
Yes, new versions are regularly published on [DockerHub](https://hub.docker.com/r/dfinity/rosetta-api/tags).
It is recommended to use a specific version in production settings, e.g., `dfinity/rosetta-api:v2.0.0`
You can query the version of a running rosetta node using the `/network/options` endpoint.

```console
$ curl -s -q -H 'Content-Type: application/json' -d '{"network_identifier": {"blockchain": "Internet Computer", "network": "00000000000000020101"}}' -X POST http://localhost:8080/network/options | jq '.version.node_version'

"2.0.0"
```

## Example Rosetta-Client implementation 
This guide will show sample codes of various parts of a Rosetta client implementation throughout the tutorials. 
It is recommended to go through each section as the relevant parts of the Rosetta client will be showcased there. 
For the sake of completion we list the entire Rosetta-Client sample implementation for all functionalities written in python here. 

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
    controller=None,
    operation_identifier=0,
    dissolve_time_utc_seconds=int(time.time()),
):
    return {
        "operation_identifier": {"index": 4},
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