# Bitcoin Dapp Example Walkthrough

This is a tutorial that will walk you through the basics of using the Bitcoin Integration in your canister.
The walkthrough will be relying on this "Basic Bitcoin" example in the [examples repository](https://github.com/dfinity/examples/).

## Quickstart: Deploying Your First Bitcoin Dapp

If you're interested in the end result. Clone the example, and run the following
command to deploy it to the IC:

1. Clone the `examples` repo.

        git clone https://github.com/dfinity/examples

2. Go the `basic_bitcoin` example:

        # For motoko
        cd examples/motoko/basic_bitcoin

        # For rust
        cd examples/rust/basic_bitcoin

3. Deploy the example to the Internet Computer:

        dfx deploy --network=ic basic_bitcoin

    :::tip
    Deploying to the Internet Computer requires `Cycles`. You can read more about cycles [here](../../../concepts/tokens-cycles.md). You can also get some free cycles from the [Cycles Faucet](../../quickstart/cycles-faucet.md).
    :::

TODO: walkthrough of how to use.

## Local Development

We just showed how to deploy and test a dapp that works with Bitcoin testnet,
but it's beneficial to be able to develop locally before deploying. TODO: talk about
the advantages of regtest vs mainnet.

### Setting up a local Bitcoin network

TODO: material from the local development guide.

### Configuring `dfx.json`

Look at `dfx.json`. You'll see we've added the following to the config:

    "bitcoin": {
      "enabled": true,
      "nodes": ["127.0.0.1:18444"],
      "log_level": "info"
    },

Note that we've configured the SDK to connect to bitcoin at port 18444. Make sure
this is set it to the IP that is reported in bitcoind.
