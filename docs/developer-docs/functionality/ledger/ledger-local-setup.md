# Ledger Local Setup

If you are working in a local development environment, i.e with a local replica instead of the public Internet Computer, you can't access the ICP ledger. In order to test your application that integrates with the ICP ledger locally, you need to deploy a local ledger canister. However, this local ledger canister won't have the history and balances of the live ICP ledger.
Follow the steps below to deploy your copy of the ledger canister to a local replica.

1.  Get a pre-built Ledger canister module and Candid interface files.

    ``` sh
    export IC_VERSION=dd3a710b03bd3ae10368a91b255571d012d1ec2f
    curl -o ledger.wasm.gz https://download.dfinity.systems/ic/${IC_VERSION}/canisters/ledger-canister_notify-method.wasm.gz
    gunzip ledger.wasm.gz
    curl -o ledger.private.did https://raw.githubusercontent.com/dfinity/ic/${IC_VERSION}/rs/rosetta-api/ledger.did
    curl -o ledger.public.did https://raw.githubusercontent.com/dfinity/ic/${IC_VERSION}/rs/rosetta-api/ledger_canister/ledger.did
    ```

    :::note

    The `IC_VERSION` variable is a commit hash from the <http://github.com/dfinity/ic> repository.

    :::

2.  Make sure you use a recent version of DFX. If you don’t have DFX installed, follow instructions on <https://smartcontracts.org/> to install it.

3.  If you don’t have a DFX project yet, follow these instructions to create a new DFX project: <https://smartcontracts.org/docs/developers-guide/cli-reference/dfx-new.html>

4.  Copy the file you obtained at the first step (`ledger.wasm`, `ledger.private.did`, `ledger.public.did`) into the root of your project.

5.  Add the following canister definition to the `dfx.json` file in your project:

    ``` json
    {
      "canisters": {
        "ledger": {
          "type": "custom",
          "wasm": "ledger.wasm",
          "candid": "ledger.private.did"
        }
      }
    }
    ```

6.  Start a local replica.

    ``` sh
    dfx start --background
    ```

7.  Create a new identity that will work as a minting account:

    ``` sh
    dfx identity new minter
    dfx identity use minter
    export MINT_ACC=$(dfx ledger account-id)
    ```

    Transfers from the minting account will create `Mint` transactions. Transfers to the minting account will create `Burn` transactions.

8.  Switch back to your default identity and record its ledger account identifier.

    ``` sh
    dfx identity use default
    export LEDGER_ACC=$(dfx ledger account-id)
    ```

9.  Deploy the ledger canister to your network.

    ``` sh
    dfx deploy ledger --argument '(record {minting_account = "'${MINT_ACC}'"; initial_values = vec { record { "'${LEDGER_ACC}'"; record { e8s=100_000_000_000 } }; }; send_whitelist = vec {}})'
    ```

    If you want to setup the ledger in a way that matches the production deployment, you should deploy it with archiving enabled. In this setup, the ledger canister dynamically creates new canisters to store old blocks. We recommend using this setup if you are planning to exercise the interface for fetching blocks.

    :::note
    
    In recent versions of dfx (>= 0.10.0) you might encounter the issue that the wasm size is too large. This is because the [default subnet type](../../updates/release-notes/#new-feature-configure-subnet-type-of-local-replica) for the local replica changed to `application` instead of `system`, which has stricter limits. In this case change the subnet type to `system` in `dfx.json`.

    ```javascript
    "defaults": {
      "replica": {
        "subnet_type": "system"
      }
    }
    ```
    :::

    Obtain the principal of the identity you use for development. This principal will be the controller of archive canisters.

    ``` sh
    dfx identity use default
    export ARCHIVE_CONTROLLER=$(dfx identity get-principal)
    ```

    Deploy the ledger canister with archiving options:

    ``` sh
    dfx deploy ledger --argument '(record {minting_account = "'${MINT_ACC}'"; initial_values = vec { record { "'${LEDGER_ACC}'"; record { e8s=100_000_000_000 } }; }; send_whitelist = vec {}; archive_options = opt record { trigger_threshold = 2000; num_blocks_to_archive = 1000; controller_id = principal "'${ARCHIVE_CONTROLLER}'" }})'
    ```

    You may want to set `trigger_threshold` and `num_blocks_to_archive` options to low values (e.g., 10 and 5) to trigger archivation after only a few blocks.

10. Update the canister definition in the `dfx.json` file to use the public Candid interface:

    ``` diff
     {
       "canisters": {
         "ledger": {
           "type": "custom",
           "wasm": "ledger.wasm",
    -       "candid": "ledger.private.did"
    +       "candid": "ledger.public.did"
         }
       }
     }
    ```

11. Check that the Ledger canister is healthy. Execute the following command:

    ``` sh
    dfx canister call ledger account_balance '(record { account = '$(python3 -c 'print("vec{" + ";".join([str(b) for b in bytes.fromhex("'$LEDGER_ACC'")]) + "}")')' })'
    ```

    The output should look like the following:

        (record { e8s = 100_000_000_000 : nat64 })

Your local ICP ledger canister is up and running now. You can now deploy other canisters that need to communicate with the ledger canister.
