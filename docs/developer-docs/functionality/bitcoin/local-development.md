# Developing Bitcoin Dapps Locally

In the [Deploy Your First Bitcoin Dapp](./deploying-your-first-bitcoin-dapp.md) tutorial,
we explored how to deploy a Bitcoin dapp on the Internet Computer that can receive and send
Bitcoin. In this tutorial, we'll explore how we can develop and test a Bitcoin dapp
locally. Testing locally allows you to iterate and improve your dapp more quickly.

`dfx` includes support for both the [ECDSA API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key) and
the [Bitcoin API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin-api)
so that you can locally test out your dapp before deploying it to the Internet Computer.

## Setting up a Local Bitcoin Network

To develop Bitcoin dapps locally, you'll need to set up a local Bitcoin network on your machine.
Having your own local Bitcoin network allows you to mine blocks quickly and at-will, which
facilitates testing various cases without having to rely on the (slow) Bitcoin testnet
or the (even slower) Bitcoin mainnet.

1. Download [Bitcoin Core](https://bitcoin.org/en/download).  Mac users are recommended to download the `.tar.gz` version.
2. Unpack the `.tar.gz` file.
3. Create a directory named `data` inside the unpacked folder.
4. Create a file called `bitcoin.conf` at the root of the unpacked folder and add the following contents:

        # Enable regtest mode. This is required to setup a private bitcoin network.
        regtest=1

        # Dummy credentials that are required by `bitcoin-cli`.
        rpcuser=ic-btc-integration
        rpcpassword=QPQiNaph19FqUsCrBRN0FII7lyM26B51fAMeBQzCb-E=
        rpcauth=ic-btc-integration:cdf2741387f3a12438f69092f0fdad8e$62081498c98bee09a0dce2b30671123fa561932992ce377585e8e08bb0c11dfa

5. Run `bitcoind` to start the bitcoin client using the following command:

        ./bin/bitcoind -conf=$(pwd)/bitcoin.conf -datadir=$(pwd)/data --port=18444

    If everything went well, you should see the following output. `bitcoind` is now ready to accept requests.

        2022-07-11T12:49:51Z Bitcoin Core version v22.0.0 (release build)
        ...
        2022-07-11T12:49:51Z Config file arg: regtest="1"
        2022-07-11T12:49:51Z Config file arg: rpcauth=****
        2022-07-11T12:49:51Z Config file arg: rpcpassword=****
        2022-07-11T12:49:51Z Config file arg: rpcuser=****
        ...
        2022-07-11T12:49:51Z Bound to 127.0.0.1:18445
        2022-07-11T12:49:51Z Bound to [::]:18444
        2022-07-11T12:49:51Z Bound to 0.0.0.0:18444
        ...
        2022-07-11T12:49:52Z opencon thread start
        2022-07-11T12:49:52Z addcon thread start
        2022-07-11T12:49:52Z 0 addresses found from DNS seeds
        2022-07-11T12:49:52Z dnsseed thread exit

    :::note
    The command above assumes that port `18444` on your machine is available. If it isn't, change the port specified in `--port`
    accordingly.
    :::

## Deploying Your Bitcoin Dapp

Now that you have a local Bitcoin network, you're ready to start
developing and locally testing your Bitcoin dapps.

For the next steps, we'll be leveraging the example project
in the [examples repo](https://github.com/dfinity/examples) to showcase some of the key concepts. Let's clone it and explore
what it's like to deploy a Bitcoin dapp locally.

1. Clone the `examples` repo

        git clone https://github.com/dfinity/examples

2. Go to the `basic_bitcoin` example in the language of your choice

        # For motoko
        cd examples/motoko/basic_bitcoin

        # For rust
        cd examples/rust/basic_bitcoin

3. If you're on a Mac, install [Homebrew](https://brew.sh/) and then run the following to install additional packages.

        brew install llvm binaryen cmake

### Configuring `dfx.json`

For Bitcoin projects, you need to configure `dfx` to connect to your local Bitcoin node.
You already configured your local Bitcoin node to accept connections on port `18444`,
so in `dfx.json` you can add the following configuration in the `defaults` section:

    "bitcoin": {
        "enabled": true,
        "nodes": ["127.0.0.1:18444"]
    }

The example code already includes this in its `dfx.json`.

### Deploying in `regtest` Mode

Your local Bitcoin node operates in what's called "regression testing mode", or [regtest mode](https://developer.bitcoin.org/examples/testing.html#regtest-mode).
You can now deploy your canister and configure it to connect to your local `Regtest` network.

1. Run `dfx start`.

    :::tip
    If when running `dfx start` you see errors like

        Failed to connect to 127.0.0.1:18444 ::: Connecting to the stream timed out.

    that means that `dfx` isn't able to connect to your Bitcoin node. Make sure your Bitcoin
    node is up and running, and that you're setting the correct port in `dfx.json`.
    :::

2. Deploy the example canister:

        dfx deploy basic_bitcoin --argument '(variant { Regtest })'

    If successful, you should see an output that looks like this:

            Deploying: basic_bitcoin
            Building canisters...
            ...
            Deployed canisters.
            URLs:
            Candid:
                basic_bitcoin: http://127.0.0.1:8000/?canisterId=...

Your canister is live and ready to use! You can interact with it using either the command line,
or using the Candid UI, which is the link you see in the output above.

## Generating a Bitcoin Address

Bitcoin has different types of addresses (e.g. P2PKH, P2SH). Most of these
addresses can be generated from an ECDSA public key. The example code
showcases how your canister can generate a P2PKH address using the [ecdsa_public_key](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key) API.

On the Candid UI of your canister, click the "Call" button under `get_p2pkh_address` to
generate a P2PKH Bitcoin address:

![Generating a P2PKH Bitcoin Address](../_attachments/generate-ecdsa-key.png)

Or, if you prefer the command line:

    dfx canister call basic_bitcoin get_p2pkh_address

:::note
The Bitcoin address you see will be different from the one above, because the
  ECDSA public key your canister retrieves is unique.
:::

<!--The one key difference between working with a local Bitcoin network and Bitcoin testnet or
mainnet, is how we receive Bitcoin.-->

## Receiving Bitcoin

### Mining Blocks

In order to receive BTC on your local Bitcoin network, you need to mine blocks. For every block
that you mine, you get some BTC as a reward for mining it.

In the same directory as `bitcoind`, you can issue the following command to mine blocks.

    ./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf generatetoaddress <number-of-blocks> <address>

For example, let's mine a block and have the block reward be given to your canister:

    ./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf generatetoaddress 1 <your-canister-btc-address>

where `<your-canister-btc-address>` is the address you obtained from calling the `get_p2p_address`
endpoint on your canister.

If successful, you'll see an output that looks similar, but not identical, to this:

    [
        "5eaf0bb0947bc5c3348749b7e194e000f6d93902235e7422b6472a1edfa5a821"
    ]

This is the hash of the block you just mined. In the logs of `dfx`, within a few seconds
you should see something like this:

    INFO .../blockchainmanager Added headers: Height = 1, Active chain's tip = 5eaf0bb0947bc5c3348749b7e194e000f6d93902235e7422b6472a1edfa5a821
    DEBG .../ic_btc_canister/heartbeat New Bitcoin tip height: 1

These logs indicate that your local `dfx` project has ingested the block you just mined.

Now, check your BTC balance:

![Checking Bitcoin Balance](../_attachments/bitcoin-local-check-balance.png)

Or, via the command line:

    dfx canister call basic_bitcoin get_balance '("<your-canister-btc-address>")'

If everything worked well, you should see a balance of 5,000,000,000 Satoshi, which is 50 BTC.
This is the reward you received for mining one block.

:::note
The BTC we mine is only in your local bitcoin network and cannot be spent or used elsewhere.
:::

### Coinbase Maturity

In the previous step, you mined one block, giving your canister a reward of 50 BTC in the process.

One caveat of these block rewards is that they are subject to the [coinbase maturity rule](https://github.com/bitcoin/bitcoin/blob/bace615ba31cedec50afa4f296934a186b9afae6/src/consensus/consensus.h#L19),
which states that, in order for you to spend them, you will first need to mine 100
additional blocks.

Let's mine 100 additional blocks by running the following command:

    ./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf generatetoaddress 100 mtbZzVBwLnDmhH4pE9QynWAgh6H3aC1E6M

The above command will mine 100 blocks, giving the block rewards to a random address. By doing so,
the 50 BTC in rewards that your canister already has will now be spendable.

If successful, you'll see an output that looks similar, but not identical, to this:

    [
        "0e70a5e8a56f1799e13fd7a52b445023c2d857a5d4b508971390dc9ae010dedc",
        ...
        "3e0410961a3b144d16dcdc95d73c262e0ec09e9812ce33835b2a55606d2be84b"
    ]

In the logs of `dfx`, you should see something like this within a few seconds:

    INFO .../blockchainmanager Added headers: Height = 101, Active chain's tip = 3e0410961a3b144d16dcdc95d73c262e0ec09e9812ce33835b2a55606d2be84b
    DEBG .../ic_btc_canister/heartbeat New Bitcoin tip height: 101

These logs indicate that your local `dfx` project has ingested the 100 new blocks you just mined.
The BTC your canister owns can now be spent.

## Sending Bitcoin

You can send Bitcoin using the `send` endpoint on your canister.

In the Candid UI, add a destination address and an amount to send. In the example
below, we're sending 1 BTC to the address `n2dcQfuwFw7M2UYzLfM6P7DwewsQaygb8S`.

![Sending Bitcoin Transaction](../_attachments/bitcoin-local-send-tx.png)

Via command line, the same call would look like this:

    dfx canister call basic_bitcoin send '(record { destination_address = "n2dcQfuwFw7M2UYzLfM6P7DwewsQaygb8S"; amount_in_satoshi = 100000000; })'

The command above creates a transaction and sends it out to your local Bitcoin node.
For more details on how the `send` endpoint works, see the [Deploying Your First Bitcoin Dapp](./deploying-your-first-bitcoin-dapp#sending-bitcoin) tutorial.

There still remains one additional step, which is to mine a block so that the transaction
you just sent becomes part of the blockchain. Run the following from the `bitcoind` directory:

    ./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf generatetoaddress 1 mtbZzVBwLnDmhH4pE9QynWAgh6H3aC1E6M

The above command is similar to what we did in the section on [Coinbase Maturity](./local-development#coinbase-maturity).
And, similarly, you should see the logs in `dfx` updating to indicate the ingestion of this new
block.

If everything worked, you should now see that address `n2dcQfuwFw7M2UYzLfM6P7DwewsQaygb8S`
has a balance of 1 BTC.

![Checking Bitcoin Balance](../_attachments/bitcoin-local-balance-after-send.png)

## Troubleshooting

### Sending Transactions

If you're trying to send a transaction and the transaction isn't being mined,
try sending the same transaction via `bitcoin-cli`, as it can reveal helpful errors:

    ./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf sendrawtransaction <tx-in-hex>

For example:

    ./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf sendrawtransaction 0200000001b0ca9600da1057765dab692467579cb309aba2524d0cd45376874d6e39e1cd50000000006a47304402200024c768daeb38591438cb3cc7e40212442e8a3662f7465bd466d00ceede8014022069ca804f7ca0ba757c9531c5c37c41943a1a1b53b96697b27e928fb35637c5b10121024f9671d4f1a434cfa6c5ca863670b34f2836c259ef2c8c33f4195f2997dc3ee3ffffffff0200e1f505000000001976a914ce0966271055a5b17abb0e9021a7eafdfe557d3088ac1f101024010000001976a9143fc55ebf65a72a3658f0e14c75c99f6eae65b9b388ac00000000
    error code: -25
    error message:
    bad-txns-inputs-missingorspent

### Resetting the state

It's often useful to delete all the Bitcoin state you have locally and to start from
scratch. To do so:

1. Run the following commands in the directory of your `dfx` project to delete
   the local state of `dfx`.

        dfx stop
        rm -rf .dfx

2. In the folder where you're running `bitcoind`, stop the `bitcoind` process if it's running,
and then run the following to delete the chain you created.

    rm -r data
    mkdir data
