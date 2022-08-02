# Deploying Your First Bitcoin Dapp

This tutorial will walk you through how to deploy a canister to the Internet Computer
that can send and receive Bitcoin.

We will be relying on the "Basic Bitcoin" example in the [examples repository](https://github.com/dfinity/examples/),
which internally leverages the [ECDSA API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key)
and [Bitcoin API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin-api) of the Internet Computer.

## Deployment

1. Clone the `examples` repo

        git clone https://github.com/dfinity/examples

2. Go to the `basic_bitcoin` example in the language of your choice

        # For motoko
        cd examples/motoko/basic_bitcoin

        # For rust
        cd examples/rust/basic_bitcoin

3. Deploy the example to the Internet Computer. We're initializing the canister with `variant { Testnet }`, so that the canister connects to the Bitcoin testnet.

        dfx deploy --network=ic basic_bitcoin --argument '(variant { Testnet })'

   :::tip
   Deploying to the Internet Computer requires `Cycles`. You can read more about cycles [here](../concepts/tokens-cycles.md). You can also get some free cycles from the [Cycles Faucet](../developer-docs/quickstart/cycles-faucet.md).
   :::

    If successful, you should see an output that looks like this:

        Deploying: basic_bitcoin
        Building canisters...
        ...
        Deployed canisters.
        URLs:
        Candid:
            basic_bitcoin: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/?id=<YOUR-CANISTER-ID>

   Your canister is live and ready to use! You can interact with it using either the command line, or using the Candid UI, which is the link you see in the output above.

## Generating a Bitcoin Address

Bitcoin has different types of addresses (e.g. P2PKH, P2SH). Most of these
addresses can be generated from an ECDSA public key. The example code
showcases how your canister can generate a P2PKH address using the [ecdsa_public_key](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key) API.

On the Candid UI of your canister, click the "Call" button under `get_p2pkh_address` to
generate a P2PKH Bitcoin address:

![Generating a P2PKH Bitcoin Address](_attachments/generate-ecdsa-key.png)

Or, if you prefer the command line:

    dfx canister --network=ic call basic_bitcoin get_p2pkh_address

:::note

* The Bitcoin address you see will be different from the one above, because the
  ECDSA public key your canister retrieves is unique.

* We are generating a Bitcoin testnet address, which can only be
used for sending/receiving Bitcoin on the Bitcoin testnet.
:::

## Receiving Bitcoin

Now that the canister is deployed and you have a Bitcoin address. It's time to receive
some testnet Bitcoin. You can use one of the Bitcoin faucets, such as [this one](https://bitcoinfaucet.uo1.net/),
to receive some bitcoin.

Enter your address and click on "Send testnet bitcoins". In the example below, the
canister will be receiving 0.0001 test BTC.

![Bitcoin Testnet Faucet](../_attachments/bitcoin-testnet-faucet.png)

Once the transaction has at least one confirmation, which can take a few minutes,
you'll be able to see it in your canister's balance.

## Checking Your Bitcoin Balance

You can check a Bitcoin address's balance by using the `get_balance` endpoint on your canister.

In the Candid UI, paste in your canister's address, and click on "Call":

![Checking Bitcoin Balance](../_attachments/bitcoin-received-funds.png)

Alternatively, make the call using the command line:

    dfx canister --network=ic call basic_bitcoin get_balance '("mheyfRsAQ1XrjtzjfU1cCH2B6G1KmNarNL")'

Checking the balance of a Bitcoin address relies on the [bitcoin_get_balance](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_get_balance) API.

## Sending Bitcoin

You can send Bitcoin using the `send` endpoint on your canister.

In the Candid UI, add a destination address and an amount to send. In the example
below, we're sending 4,321 Satoshi (0.00004321 BTC) back to the testnet faucet.

![Sending Bitcoin](../_attachments/bitcoin-send-transaction.png)

Via command line, the same call would look like this:

    dfx canister --network=ic call basic_bitcoin send '(record { destination_address = "tb1ql7w62elx9ucw4pj5lgw4l028hmuw80sndtntxt"; amount_in_satoshi = 4321; })'

The `send` endpoint is able to send Bitcoin by:

1. Getting the percentiles of the most recent fees on the Bitcoin network using the [bitcoin_get_current_fee_percentiles API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_get_current_fee_percentiles).
2. Fetching your unspent transaction outputs (UTXOs), using the [bitcoin_get_utxos API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_get_utxos).
3. Building a transaction, using some of the UTXOs from step 2 as input and the destination address and amount to send as output.
   The fee percentiles obtained from step 1 is used to set an appropriate fee.
4. Signing the inputs of the transaction using the [sign_with_ecdsa API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-sign_with_ecdsa).
5. Sending the signed transaction to the Bitcoin network using the [bitcoin_send_transaction API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_send_transaction).

The `send` endpoint returns the ID of the transaction it sent to the network.
You can track the status of this transaction using a block explorer. Once the
transaction has at least one confirmation, you should be able to see it
reflected in your current balance.
