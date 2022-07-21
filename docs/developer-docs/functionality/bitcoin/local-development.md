# Local Development

## Setting up a local Bitcoin network

To develop Bitcoin dapps locally, we'll be setting up a local Bitcoin network on our machine.
Having our own local Bitcoin network allows us to mine blocks quickly and at-will, which
facilitates testing various cases without having to rely on the Bitcoin testnet
or Bitcoin mainnet.

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

        ./bin/bitcoind -conf=$(pwd)/bitcoin.conf -datadir=$(pwd)/data

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

## Mining Blocks

When `bitcoind` is running, you can issue commands to mine blocks.

    ./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf generatetoaddress <address>

:::note
The coinbase rewards that the address above receives is subject to the [coinbase maturity rule](https://wiki.bitcoinsv.io/index.php/Coinbase_Maturity_Rule), which specifies that the Bitcoin from coinbase transactions cannot
be spent until it has at least 100 confirmations.
:::

## Troubleshooting Transactions

The Bitcoin API doesn't do extensive validation on transactions that you send to the
network. If you're trying to send a transaction and the transaction isn't being mined,
try sending the same transaction via `bitcoin-cli`, as it can reveal helpful errors:

    ./bin/bitcoin-cli -conf=$(pwd)/bitcoin.conf sendrawtransaction <tx-in-hex>

You'll then receive more precise errors. TODO: add example.
