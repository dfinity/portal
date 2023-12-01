# Converting ICP tokens into cycles
 
## Overview
To convert ICP tokens into cycles, you first need to obtain some ICP and transfer to the right account. You can get ICP tokens on exchanges, or ask someone you know to send you some. To figure out which account to transfer the ICP tokens to, run the following:

``` bash
dfx ledger account-id
```

This will display your account number on the ICP ledger. It looks similar to this:

```
e213184a548871a47fb526f3cba24e2ee2fbbc8129c4ab497ef2ce535130a0a4
```

## Obtaining tokens

There are a few different ways you might acquire ICP tokens. For example, you might:

- Purchase ICP tokens directly through an exchange that lists ICP tokens available for trade. To see all available places to purchase ICP tokens, check out this [page](https://coinmarketcap.com/currencies/internet-computer/markets/). 

- Receive tokens as rewards for participating in the governance of the Internet Computer.

- Receive a grant of tokens through the Internet Computer Association (ICA) or the DFINITY Foundation.

- Receive tokens as remuneration for providing computing capacity as a node provider.

$5-$10 USD worth of tokens should be enough to get started. Depending on your workflows and use-case, you may need more. 

### Checking the balance

Once you have obtained some ICP tokens into your ICP ledger account, you can see the balance using this command:

``` bash
dfx ledger --network ic balance
```

This will output something like this:

```
12.49840000 ICP
```

## Create a cycles wallet
With those ICP tokens ready, you can start creating your cycles wallet. To start, you have to create a canister which will become your wallet. The base command for this is as follows:

``` bash
dfx ledger --network ic create-canister <your-principal-identifier> --amount <icp-tokens>
```

The two values you have to substitute are your own principal and the amount of tokens you want to convert. 

To figure out your own principal, use the output of `dfx identity get-principal`. If my principal is `tsqwz-udeik-5migd-ehrev-pvoqv-szx2g-akh5s-fkyqc-zy6q7-snav6-uqe` and I want to convert 2.3 ICP into cycles, the command looks like this:

``` bash
dfx ledger --network ic create-canister tsqwz-udeik-5migd-ehrev-pvoqv-szx2g-akh5s-fkyqc-zy6q7-snav6-uqe --amount 2.3
```

This command will take some time and output something similar to the following:

```
Transfer sent at BlockHeight: 351220
Canister created with id: "gastn-uqaaa-aaaae-aaafq-cai"
```

The ID in this output is the address of the canister where your wallet will live. In this example, it would be `gastn-uqaaa-aaaae-aaafq-cai`.

Now that the canister is created, you can install the wallet code using this command:

``` bash
dfx identity --network ic deploy-wallet <canister-identifer>
```

Here, you have to substitute the canister identifier using the ID you received in the output of the previous command. So, in the example this would look like this:

``` bash
dfx identity --network ic deploy-wallet gastn-uqaaa-aaaae-aaafq-cai
```

And the output should look like this:

```
Creating a wallet canister on ICP.
The wallet canister on the "ic" network for user "default" is "gastn-uqaaa-aaaae-aaafq-cai"
```

Now your wallet should be configured and ready to go. To check if everything went right, run this to see the identifier of your configured wallet:

``` bash
dfx identity --network ic get-wallet
```

This should print the canister ID you used in the commands earlier.

You can also check the balance of your new cycles wallet:

``` bash
dfx wallet --network ic balance
```

This should print something looking like this:

```
6.951 TC (trillion cycles).
```