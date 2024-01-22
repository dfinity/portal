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