# Rosetta

## Overview

[Rosetta](https://www.rosetta-api.org/) is an open standard introduced by Coinbase to simplify the integration of blockchain-based tokens in exchanges, block explorers, and wallets.
This documentation might help if you want to deploy a token on the IC that aims to be tradable on CeFi exchanges or if you are working on a block explorer or wallet.

## Set up a Rosetta node

You can set up a Rosetta API-compliant node to interact with the Internet Computer and exchange Internet Computer Protocol (ICP) tokens.
To keep the instructions simple, we use a Docker image to create the integration with the Rosetta API.
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


## Frequently asked questions

The following questions come from the most commonly reported questions and blockers from the developer community regarding Rosetta integration with the Internet Computer.

### The Rosetta node

- #### How do I run an instance of the Rosetta node?
An easy way to accomplish this is to use the [`dfinity/rosetta-api`](https://hub.docker.com/r/dfinity/rosetta-api/tags?page=1&ordering=last_updated) Docker image.
Once the node initializes and syncs all blocks, you can perform queries and submit transactions by invoking the Rosetta API on the node.
The node listens on the `8080` port.

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
    --publish 8080:8080 \
    --rm \
   dfinity/rosetta-api
```

- #### Is the Rosetta node versioned?
Yes, we regularly publish new versions on [DockerHub](https://hub.docker.com/r/dfinity/rosetta-api/tags).
We recommend using a specific version in production settings, e.g., `dfinity/rosetta-api:v1.7.0`
You can query the version of a running rosetta node using the `/network/options` endpoint.

```console
$ curl -s -q -H 'Content-Type: application/json' -d '{"network_identifier": {"blockchain": "Internet Computer", "network": "00000000000000020101"}}' -X POST http://localhost:8080/network/options | jq '.version.node_version'

"1.7.0"
```

### ICP-specific Rosetta API details

- #### How are accounts generated and verified?
The following steps can be used to generate and verify accounts:
- Generate an ED25519 keypair.
- The secret key is used for signing transactions.
- The public key is used for generating a self-authenticating Principal ID. For more information, see the [principals section in the interface specification](/references/ic-interface-spec.md#principals).
- The principal ID is hashed to generate the account address.

- #### How to use the public key to generate its account address?
You can call the [`/construction/derive`](https://www.rosetta-api.org/docs/ConstructionApi.html#constructionderive) endpoint with the hex-encoded 32-byte public key. or all the `pub_key_to_address` function in the JavaScript SDK.

- #### How to verify the checksum of an account address?
After hex decoding, the first 4 bytes is the big-endian CRC32 checksum of the rest of the address. Then, call [`address_from_hex`](https://github.com/dfinity/rosetta-client#working-with-account-addresses) in the JavaScript SDK. It returns and error if checksum doesn’t match.
[Here](https://gist.github.com/TerrorJack/d6c79b33e5b5d0f5d52f3a2c5cdacc60) is a Java implementation of address validation logic.

- #### What are `signature_type` and `curve_type` for ED25519?
The `signature_type` is `"ed25519"` and the `curve_type` is `"edwards25519"`

- #### What kinds of transactions can appear in a block, and what do they mean?
Each block as queried from the [`/block`](https://www.rosetta-api.org/docs/BlockApi.html#block) endpoint contains precisely one transaction. Note that some operations, such as `burn`, are not supported in Rosetta API calls.

    Transfer:
      - Operation 0: type `"TRANSACTION"`, subtracts the transfer amount from the source account.
      - Operation 1: type `"TRANSACTION"`, adds the same transfer amount to the destination account.
      - Operation 2: type `"FEE"`, subtracts the fee from the source account.
      
    Mint:
      - Operation 0: type `"MINT"`, adds the minted amount to the destination account.

    Burn:
      - Operation 0: type `"BURN"`, subtract the burned amount from the source account.

    `"status"` is always `"COMPLETED"`.
      - Failed transactions do not appear on the ledger.
          
:::info

  Don’t rely on the order of operations presented in the previous point; the system can rearrange the operations passed the `/construction/payloads` call.
  You should check for transaction type and amount sign instead.

:::

- #### What fee is needed? Can I customize the fee?
By calling [`/construction/metadata`](https://www.rosetta-api.org/docs/ConstructionApi.html#constructionmetadata), you can get `suggested_fee`. At the moment, `suggested_fee` is a constant, and the fee specified in a transfer must be equal to it. Fees do not apply to Mint or Burn operations.

- #### How do I know if the submitted transaction hit the chain?
The Rosetta server will wait for a short period of time after a `/construction/submit` call; if the transaction hits the chain, the server will return the block hash. In case of an error from the ledger, the error information will be available in the `/construction/submit` result. It’s still possible that a `/construction/submit` call has returned successfully, but there’s still some time before it hits the chain.
You can poll the latest blocks and search for the transaction hash.
The Rosetta node also supports a subset of the [`/search/transactions`](https://www.rosetta-api.org/docs/SearchApi.html#searchtransactions) interface that allows searching for a transaction given its hash.
Five minutes is a worst-case timeout. Don’t use `mempool` APIs; our implementation is an empty stub.

- #### What kinds of errors might I get from Rosetta API calls?
Successful calls always have `200` response status code.
Failed calls always have `500` response status code, with a JSON payload containing more information.

You can find all possible Rosetta error codes and their text descriptions in the [`/network/options`](https://www.rosetta-api.org/docs/NetworkApi.html#networkoptions) call result.

- #### How do I send Mint or Burn transactions?
Mint is a privileged operation; we don’t support Burn through Rosetta API calls at the moment.

- #### What happens if the same signed transaction is submitted multiple times?
The ledger rejects duplicate transactions.
Only the first transaction will make it to the chain; the [`/construction/submit`](https://www.rosetta-api.org/docs/ConstructionApi.html#constructionsubmit) call will fail for the duplicates.

- #### How to sign a transaction without calling Rosetta API?
The JavaScript SDK contains an [implementation](https://github.com/dfinity/rosetta-client/blob/master/lib/construction_combine.js) of the offline signing logic.
This functionality is unstable because it is coupled with internal implementation details, so we strongly advise you to call [`/construction/combine`](https://www.rosetta-api.org/docs/ConstructionApi.html#constructioncombine) to sign transactions if possible.

- #### How to configure the ingress time period?
In the `/construction/payloads` call, you can add one or all of the `ingress_start` / `ingress_end` fields to specify the ingress time period.
These are nanoseconds since the Unix epoch and must be within the next 24 hours.
Adding `ingress_start`/`ingress_end` fields enables generating & signing of a transaction but delays the submission to a later time.

- #### How to deserialize a signed transaction?
Use the [`/construction/parse`](https://www.rosetta-api.org/docs/ConstructionApi.html#constructionparse) endpoint of a Rosetta Node.
This functionality is also available in offline mode.