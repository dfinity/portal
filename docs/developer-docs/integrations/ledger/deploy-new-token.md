# Deploy New Token

This tutorial will guide you step-by-step to deploy your own token to the IC and to connect Rosetta to it.

## Deploy your Ledger

1.  Ensure you have the ledger image, the private ledger interface, and the public ledger interface. If you do not have them, follow the steps in [Setup Ledger locally](./ledger-local-setup).

2.  Ensure you use a recent version of `dfx`. If you don’t have `dfx` installed, follow instructions on the [Installing the SDK](../../build/install-upgrade-remove) section to install it.

3.  Add the following canister definition to the `dfx.json` file in your project:

    ``` json
    {
      "canisters": {
        "custom-ledger": {
          "type": "custom",
          "wasm": "ledger.wasm",
          "candid": "ledger.private.did"
        }
      }
    }
    ```

4.  Deploy the ledger canister to the IC:

    ``` bash
    # Change the variable to "ic" to deploy the ledger on the mainnet.
    export NETWORK=local

    # Change the variable to the account that can mint and burn tokens.
    export MINT_ACC=$(dfx ledger account-id)

    # Change the variable to the principal that controls archive canisters.
    export ARCHIVE_CONTROLLER=$(dfx identity get-principal)

    export TOKEN_NAME="My Token"
    export TOKEN_SYMBOL=XMTK

    dfx deploy --network ${NETWORK} custom-ledger --argument '(record {
      token_name = opt "'${TOKEN_NAME}'";
      token_symbol = opt "'${TOKEN_SYMBOL}'";
      minting_account = "'${MINT_ACC}'";
      initial_values = vec {};
      send_whitelist = vec {};
      archive_options = opt record {
        trigger_threshold = 2000;
        num_blocks_to_archive = 1000;
        controller_id = principal "'${ARCHIVE_CONTROLLER}'";
        cycles_for_archive_creation = opt 10_000_000_000_000;
      }
    })'
    ```

    where

    -   the `NETWORK` is the url or name of the replica where you want to deploy the ledger (e.g. use ic for the mainnet)

    -   the `TOKEN_NAME` is the human-readable name of your new token

    -   the `TOKEN_SYMBOL` is the ticker symbol of your new token

    -   the `MINT_ACC` is the account of the Principal responsible for minting and burning tokens (see the [Ledger documentation](./index.md))

    -   the `ARCHIVE_CONTROLLER` is the [controller Principal](../../build/project-setup/cycles-wallet#controller-and-custodian-roles) of the archive canisters

    <div class="important">

    When you deploy to the mainnet:

    -   Always set the `archive_options` field. If the archiving is disabled, the capacity of your ledger is limited to the memory of a single canister.

    -   Make sure that the ledger canister has plenty of cycles. The canister will need cycles to spawn new instances of the archive canister on demand. The exact number of cycles attached to `create_canister` messages is controlled by the `cycles_for_archive_creation` option.

    </div>

5.  Update the canister definition in the `dfx.json` file to use the public Candid interface:

    ``` diff
     {
       "canisters": {
         "custom-ledger": {
           "type": "custom",
           "wasm": "ledger.wasm",
    -       "candid": "ledger.private.did"
    +       "candid": "ledger.public.did"
         }
       }
     }
    ```

6.  Check that the Ledger canister is healthy. Execute the following command:

    ``` sh
    dfx canister --network ${NETWORK} call custom-ledger symbol
    ```

    The output should look like the following:

        (record { symbol = "XMTK" })

Your new token is deployed and ready to be used.

## Connect Rosetta

Rosetta is an application that connects to a Ledger canister and exposes the [Rosetta API](https://www.rosetta-api.org). Its main purpose is to facilitate integration with exchanges. You can learn more about Rosetta in the [next section](../rosetta/index.md).

Let us now connect Rosetta to an existing Ledger canister.

1.  Get the Ledger token symbol

    ``` sh
    dfx canister call <ledger_canister_id> symbol
    ```

    The output should look like the following:

        (record { symbol = <token_symbol> })

2.  Run `rosetta-api`

    ``` bash
    docker run \
        --interactive \
        --tty \
        --publish 8081:8080 \
        --rm \
        dfinity/rosetta-api:v1.3.0 \
        --canister-id <ledger_canister_id> \
        --ic-url <replica> \
        -t <token_symbol>
    ```

    The output should contain the following lines:

        16:31:45.472550 INFO [main] ic_rosetta_api::rosetta_server - Starting Rosetta API server
        16:31:45.506905 INFO [main] ic_rosetta_api::ledger_client - You are all caught up to block <x>

    The `<x>` above stands for the last block index in the ledger blockchain.

`rosetta-api` is connected to your Ledger instance and ready to be used. Read [Transfers tokens](../rosetta/transfers) article to learn about Rosetta token transfer operations.
