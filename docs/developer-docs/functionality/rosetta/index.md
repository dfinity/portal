# Rosetta

[Rosetta](https://www.rosetta-api.org/) is an open standard introduced by Coinbase to simplify the integration of blockchain-based tokens in exchanges, block explorers and wallets. This documetation is of interest for you, if you want to deploy a token on the IC which aims to be tradable on CeFi exchanges, or if you are working on a block explorer or wallet.

## Set up a Rosetta node

You can set up a Rosetta API-compliant node to interact with the Internet Computer and exchange Internet Computer Protocol (ICP) tokens. To keep the instructions simple, we use a Docker image to create the integration with the Rosetta API  — one can also build and run binary using the source code. If you don’t already have Docker on your local computer, download and install the latest version.

To set up a Rosetta node (which connects to a testnet):

1.  [Install Docker](https://docs.docker.com/get-docker/) and [start the Docker daemon](https://docs.docker.com/config/daemon/).

    The Docker daemon (`dockerd`) should automatically start when you reboot your computer. If you start the Docker daemon manually, the instructions vary depending on the local operating system.

2.  Pull the latest `dfinity/rosetta-api` image from the Docker Hub by running the following command:

    ``` bash
    docker pull dfinity/rosetta-api
    ```

3.  Start the integration software by running the following command:

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

    By default, the software **does not** connect to the ledger canister running on the Internet Computer blockchain mainnet, but rather it connects to a testnets.

    If you have been assigned a test network and corresponding ledger canister identifier, you can run the command against that network by specifying an additional `canister` argument. For example, the following command illustrates connecting to the ledger canister on a test network by setting the `canister` argument to `2xh5f-viaaa-aaaab-aae3q-cai`.

    ``` bash
    docker run \
        --interactive \
        --tty \
        --publish 8080:8080 \
        --rm \
       dfinity/rosetta-api
       --canister 2xh5f-viaaa-aaaab-aae3q-cai
    ```

    :::note

    The first time you run the command it might take some time for the node to catch up to the current link of the chain. When the node is caught up, you should see output similar to the following:

    :::

        You are all caught up to block height 109

    After completing this step, the node continues to run as a **passive** node that does not participate in block making.

4.  Open a new terminal window or tab and run the `ps` command to verify the status of the service.

    If you need to stop the service, press CONTROL-C. You might want to do this to change the canister identifier you are using, for example.

    To test the integration after setting up the node, you will need to write a program to simulate a principal submitting a transaction or looking up an account balance.

### Run the Rosetta node in production

When you are finished testing, you should run the Docker image in production mode without the `--interactive`, `--tty`, and `--rm` command-line options. These command-line options are used to attach an interactive terminal session and remove the container, and are primarily intended for testing purposes.

To run the software in a production environment, you can start the Docker image using the `--detach` option to run the container in the background and, optionally, specify the `--volume` command for storing blocks.

To connect the Rosetta node instance to the mainnet, add flags: `--mainnet` and `--not-whitelisted`.

For more information about Docker command-line options, see the [Docker reference documentation](https://docs.docker.com/engine/reference/commandline/run/).

### Requirements and limitations

The integration software provided in the Docker image has one requirement that is not part of the standard Rosetta API specification.

For transactions involving ICP tokens, the unsigned transaction must be created less than 24 hours before the network receives the signed transaction. The reason is that the 'created_at' field of each transaction refers to an existing transaction (essentially last_index available locally at the time of transaction creation). Any submitted transaction that refers to a transaction that is too old is rejected to maintain operational efficiency.

Other than this requirement, the Rosetta API integration software is fully-compliant with all standard Rosetta endpoints and passes all of the `rosetta-cli` tests. The software can accept any valid Rosetta request. However, the integration software only prompts for transactions to be signed using Ed25519, rather than [all the signature schemes listed here](https://www.rosetta-api.org/docs/models/SignatureType.html#values) and only replies with a small subset of the potential responses that the specification supports. For example, the software doesn’t implement any of the UTXO features of Rosetta, so you won’t see any UTXO messages in any of the software responses.


## Frequently asked questions

The following questions are taken from the most commonly reported questions and blockers from the developer community regarding Rosetta integration with the Internet Computer.

### The Rosetta node

#### How do I run an instance of the Rosetta node?

An easy way to accomplish this is to use the [`dfinity/rosetta-api`](https://hub.docker.com/r/dfinity/rosetta-api/tags?page=1&ordering=last_updated) Docker image. Once the node initializes and syncs all blocks, you can perform queries and submit transactions by invoking the Rosetta API on the node. The node listens on the `8080` port.

#### How do I connect the Rosetta node to the mainnet?

Use flags `--mainnet` and `--not-whitelisted`

#### How do I connect the Rosetta node to the mainnet?

Use flags `--mainnet` and `--not-whitelisted`

#### How do I know if the node has caught up with the test net?

Search the `Starting Rosetta API server` startup log. There will be a log entry that says `You are all caught up to block XX`. This message confirms that you are caught up with all blocks.

#### How to persist synced blocks data?

Mount the `/data` directory elsewhere.

#### Is the Rosetta node versioned?

Not yet. Before launch, when we push to the `dfinity/rosetta-api:latest` image, it’s usually a major update that we’ll announce in our communication channels beforehand.

We’ll soon implement nightly builds of the image, and CI will ensure it works before pushing. Other than `latest`, those images will also be tagged with the build date, so for more reproducibility, it’s possible to use the image of a specific date tag rather than `latest`. We’ll announce when nightly builds become available.

#### How do I connect to the main net instead of the test net?

Start `dfinity/rosetta-api` with `--help`, you can see some additional CLI arguments that can be passed. Among those there are `--canister-id` and `--ic-url` which can be used to configure the ledger destination. At the moment, they default to the test net.

**Note**: The main net is not live yet; it will be live some time before the publicly announced date, and we’ll push the updated image to point to the main net to ensure you can perform testing on the main net beforehand.

### ICP-specific Rosetta API details

#### How are accounts generated and verified?

-   Generate an ED25519 keypair.

-   The secret key is used for signing transactions.

-   The public key is used for generating a self-authenticating Principal ID. For more information, see: <https://smartcontracts.org/docs/interface-spec/index.html#_principals>.

-   The Principal ID is hashed to generate the account address.

#### How to use the public key to generate its account address?

-   Call the [`/construction/derive`](https://www.rosetta-api.org/docs/ConstructionApi.html#constructionderive) endpoint with the hex-encoded 32-byte public key.

-   Call the `pub_key_to_address` function in the JavaScript SDK.

#### How to verify the checksum of an account address?

-   After hex decoding, the first 4 bytes is the big-endian CRC32 checksum of the rest of the address.

-   Call [`address_from_hex`](https://github.com/dfinity/rosetta-client#working-with-account-addresses) in the JavaScript SDK. It returns and error if checksum doesn’t match.

-   [Here](https://gist.github.com/TerrorJack/d6c79b33e5b5d0f5d52f3a2c5cdacc60) is a Java implementation of address validation logic.

#### What are `signature_type` and `curve_type` for ED25519?

-   `signature_type` is `"ed25519"`

-   `curve_type` is `"edwards25519"`

#### What kinds of transactions can appear in a block, and what do they mean?

-   Each block as queried from the [`/block`](https://www.rosetta-api.org/docs/BlockApi.html#block) endpoint contains exactly one transaction. Note that some operations, such as `burn`, are not suppoted in Rosetta API calls.

-   Transfer

    -   Operation 0: type `"TRANSACTION"`, subtracts the transfer amount from the source account.

    -   Operation 1: type `"TRANSACTION"`, adds the same transfer amount to the destination account.

    -   Operation 2: type `"FEE"`, subtracts the fee from the source account.

-   Don’t rely on the order above, you can rearrange them in the `/construction/payloads` call, and when parsing transactions in a block, you should check for transaction type and amount sign instead.

-   Mint

    -   Operation 0: type `"MINT"`, adds the minted amount to the destination account.

-   Burn

    -   Operation 0: type `"BURN"`, subtract the burned amount from the source account.

-   `"status"` is always `"COMPLETED"`, failed transactions don’t show up in the polled blocks

#### What fee is needed? Can I customize the fee?

-   By calling [`/construction/metadata`](https://www.rosetta-api.org/docs/ConstructionApi.html#constructionmetadata), you can get `suggested_fee`.

-   At the moment, `suggested_fee` is a constant, and the fee specified in a transfer must be equal to it.

-   Fees do not apply to Mint or Burn operations.

#### How do I know if the submitted transaction hit the chain?

-   The Rosetta server will wait for a short period of time after a `/construction/submit` call, if the transaction hit the chain, it’ll be returned.

-   In case of an error from the ledger, the error information will be available in the `/construction/submit` result.

-   It’s still possible that a `/construction/submit` call has returned successfully, but there’s still some time before it hits the chain. You can poll latest blocks and search for the transaction hash. We also implemented a subset of the [`/search/transactions`](https://www.rosetta-api.org/docs/SearchApi.html#searchtransactions) endpoint which allows searching for a transaction given its hash.

-   5 minutes is a worst case timeout.

-   Don’t use `mempool` APIs, our implementation is an empty stub.

#### What kinds of errors might I get from Rosetta API calls?

-   Successful calls always have `200` response status code.

-   Failed calls always have `500` response status code, with a JSON payload containing more information. The possible Rosetta error codes and their text descriptions can be seen in the `/network/options` call result.

#### How do I send Mint or Burn transactions?

-   Mint is a privileged operation; we don’t support Burn through Rosetta API calls at the moment.

#### What happens if the same signed transaction is submitted multiple times?

The ledger rejects duplicate transactions. Only the first transaction will make it to the chain and for the duplicate submissions the `/construction/submit` call will fail.

#### How to sign a transaction without calling Rosetta API?

The JavaScript SDK contains an [implementation](https://github.com/dfinity/rosetta-client/blob/master/lib/construction_combine.js) of the offline signing logic. This is deeply coupled with internal implementation details, so we strongly advise you to call `/construction/combine` to sign a transaction if possible.

#### How to configure the ingress time period?

In the `/construction/payloads` call, you can add one or all of the `ingress_start` / `ingress_end` fields to specify the ingress time period. They are nanoseconds since the Unix epoch, and must be within the next 24 hours. This enables generating & signing a transaction, but delaying the actual submission to a later time.

#### How to deserialize a signed transaction?

The JavaScript SDK supports [deserializing](https://github.com/dfinity/rosetta-client/blob/master/lib/signed_transaction_decode.js) a `signed_transaction` hex string and recovering some information about the transfer. This may be useful in the case that you’d like to perform a sanity check.