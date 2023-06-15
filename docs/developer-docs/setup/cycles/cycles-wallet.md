---
sidebar_position: 3
---
# Using a cycles wallet
 
## Overview

As discussed in [tokens and cycles](/concepts/tokens-cycles.md), ICP tokens can be converted into **cycles** to power canister operations. Cycles reflect the operational cost of communication, computation, and storage that dapps consume.

Unlike ICP tokens, cycles are only associated with canisters and not with user or developer principals. Because only canisters require cycles to perform operations and pay for the resources they use, users and developers manage the distribution and ownership of cycles through a special type of canister called a **cycles wallet**. The cycles wallet holds the cycles required to perform operations such as creating new canisters. These operations are executed using the canister principal of the cycles wallet instead of your user principal.

For the purposes of using the local canister execution environment, the SDK automatically creates a default cycles wallet for you in every project and most of the operations performed using the cycles wallet happen behind the scenes. For example, the cycles wallet acts on your behalf to register canister principals and deploy canisters in the local canister execution environment.

In a production environment, however, you need to explicitly register and transfer cycles to new canisters, specify the principals that can act as custodians, and manage the principals with ownership rights. You can perform some of these tasks using the default cycles wallet dapp running in a web browser. Depending on the specific action you want to take, you can also perform these cycle and canister management tasks by running `dfx wallet` commands in a terminal or by calling methods in the default cycles wallet canister directly. You can learn more about how to use `dfx wallet` [here](https://internetcomputer.org/docs/current/references/cli-reference/dfx-wallet).

You should keep in mind, however, that calls to the cycles wallet canister are executed using the cycles wallet principal associated with the currently selected user identity. Depending on your currently selected identity and whether the principal associated with that identity has been added as a controller or a custodian for a wallet, you might see different results or be denied access to a specific method.

To check the identity you are currently using, run the following command:

    dfx identity whoami

## Controller and custodian roles

A user principal or canister principal can be assigned to a **controller** or **custodian** role.

:::info
The controller role this document talks about is NOT the same controller role usually meant when talking about the Internet Computer. Typically, the controller refers to a principal that controls a canister. Here, a controller is a **wallet-internal** role that happens to have the same name. For a more detailed differentiation, see [this forum post](https://forum.dfinity.org/t/why-is-my-cycles-wallet-canister-slowly-losing-cycles/13190/11).
:::

### Controllers
A **controller** is the most privileged role and a principal assigned to the controller role can perform privileged tasks including the following:

-   Add and remove other principals as controllers.

-   Authorize and de-authorize other principals as custodians.

-   Add entries to the cycles wallet address book.

-   Access the cycles wallet balance and all other wallet-related information.

-   Send cycles to other canisters.

-   Accept receipt of cycles from other canisters.

-   Rename the cycles wallet.

-   Create canisters and additional cycles wallets.

:::caution
A canister can have a maximum of 10 controllers. Learn more [here](https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-create_canister).
:::

### Custodians

A principal assigned to the **custodian** role can only perform a subset of cycles wallet management tasks, including the following:

-   Access the cycles wallet balance and all other wallet-related information.

-   Send cycles to other canisters.

-   Accept receipt of cycles from other canisters.

-   Create canisters.

Authorizing a principal as a custodian does not automatically grant the principal access to a cycles wallet. The identity assigned to the custodian role must also be assigned a cycles wallet principal. For example, if you authorize the identity `alice_custodian` as a custodian of a cycles wallet (`rwlgt-iiaaa-aaaaa-aaaaa-cai`) in a local project, that user would also need to be assigned to use that wallet with the `dfx identity set-wallet rwlgt-iiaaa-aaaaa-aaaaa-cai` command.

## Create a cycles wallet

If you are doing local development, your cycles wallet is created when you register a new canister principal using `dfx canister create` or when you register, build, and deploy a canister with `dfx deploy`.

If you are deploying on the Internet Computer mainnet, you typically create your cycles wallet by converting ICP tokens to cycles, transferring the cycles to a new canister principal, and updating the canister with the default cycles wallet WebAssembly module (WASM). [Convert ICP to cycles](/developer-docs/setup/deploy-mainnet.md#creating-a-cycles-wallet) shows how to do this.

There are dapps that can help you convert ICP to cycles and create a new cycles wallet, e.g., [NNS dapp](../../../tokenomics/token-holders/nns-app-quickstart#_deploy_a_canister_with_cycles).

## Check the cycle balance

In the local canister execution environment or with a cycles wallet on the Internet Computer, you can use the:


```
dfx wallet balance
```

or 

```
wallet_balance
``` 

commands to check the current cycle balance.

### Check your cycles balance when developing locally

If you are doing local development, you can use the `dfx wallet balance` command to check the current cycles balance on a project-by-project basis.

To check the cycles balance in a local project:

- #### Step 1:  Open a terminal and navigate to the root directory of the project.

- #### Step 2:  Start the local canister execution environment by running the following command:

        dfx start --background

- #### Step 3:  Display the cycles balance from the cycles wallet associated with the currently-selected identity by running the following command:

        dfx wallet balance

    The command displays output similar to the following:

        78.000 TC (trillion cycles).

### Check the cycles balance when deploying on the mainnet

If you have deployed a cycles wallet on the Internet Computer, you can use the `dfx wallet balance` command to check the current cycles balance on the network.

To check the cycles balance on the Internet Computer:

- #### Step 1:  Open a terminal and navigate to a directory that contains a `dfx.json` configuration file.

- #### Step 2:  Check your connection to the Internet Computer by running the following command:

        dfx ping ic

- #### Step 3:  Display the cycle balance from the cycles wallet associated with the currently-selected identity by running the following command:

        dfx wallet --network ic balance

    The command displays output similar to the following:

        67.992 TC (trillion cycles).

#### Call the cycles `wallet_balance` method

You can also check the cycles balance by calling the `wallet_balance` method in the cycles wallet canister directly. For example, if your principal is a controller for the `h5aet-waaaa-aaaab-qaamq-cai` cycles wallet, you can check the current cycle balance by running the following command:

    dfx canister --network ic call h5aet-waaaa-aaaab-qaamq-cai wallet_balance

The command returns the balance using Candid format as a record with an amount field (represented by the hash 3\_573\_748\_184) and a balance of 6,895,656,625,450 cycles like this:

    (record { 3_573_748_184 = 6_895_656_625_450 })

command to create a cycles wallet canister tied to an identity. You can use `dfx wallet` commands to modify your cycles wallet settings, send cycles to other cycles wallets, and add or remove controllers and custodians.

## Listing wallets

You can use the:

```
dfx wallet addresses
``` 

command to display the wallet's principal and role (contact, custodian, or controller), and might contain a name, and kind (unknown, user, or canister) associated with the address.

## Using your wallet

After you have used the `dfx identity deploy-wallet` command to create a cycles wallet canister tied to an identity, you can use `dfx wallet` commands to modify your cycles wallet settings, send cycles to other cycles wallets, and add or remove controllers and custodians.

For more details on each supported method, see the [dfx wallet reference](../../../references/cli-reference/dfx-wallet).

### `dfx` wallet functions

Use the `dfx wallet` command with subcommands and flags to manage the cycles wallets of your identities and to send cycles to the wallets of other account cycles wallet canisters.

The basic syntax for running the dfx wallet commands is:

```
dfx wallet [option] <subcommand> [flag]
```

Depending on the `dfx wallet` subcommand you specify, additional arguments, options, and flags might apply or be required. To view usage information for a specific `dfx wallet` subcommand, specify the subcommand and the `--help` flag. For example, to see usage information for `dfx wallet` send, you can run the following command:

```
dfx wallet send --help
```

For reference information and examples that illustrate using dfx wallet commands, select an appropriate command.

- `add-controller`: add a controller using the selected identity's principal.
- `addresses`: displays the address book of the cycles wallet.
- `authorize`: authorize a custodian by principal for the selected identity's cycles wallet
- `balance`: displays the cycles wallet balance of the selected identity.
- `controllers`: displays a list of the selected identity's cycles wallet controllers.
- `custodians`:	displays a list of the selected identity's cycles wallet custodians.
- `deauthorize`: deauthorize a cycles wallet custodian using the custodian's principal.
- `help`: displays a usage message and the help of the given subcommand(s).
- `name`: returns the name of the cycles wallet if you've used the dfx wallet set-name command.
- `redeem-faucet-coupon`: redeem a code at the cycles faucet.
- `remove-controller`: removes a specified controller from the selected identity's cycles wallet.
- `send`: sends a specified amount of cycles from the selected identity's cycles wallet to another cycles wallet using the destination wallet canister ID.
- `set-name`: specify a name for your cycles wallet.
- `upgrade`: upgrade the cycles wallet's Wasm module to the current Wasm bundled with DFX.

### Adding a controller
An identity assigned the role of controller has the most privileges and can perform the following actions on the selected identity's cycles wallet. Identities that are added as controllers are also listed as custodians. 

To add a controller, the following command can be used:

```
dfx wallet add-controller
```

If the controller you want to add is on a different environment, specify it using the `--network` option. For example:

```
dfx wallet add-controller b5quc-npdph-l6qp4-kur4u-oxljq-7uddl-vfdo6-x2uo5-6y4a6-4pt6v-7qe
```

### Viewing controllers
To list the principals of the identities that are controllers of the selected identity's cycles wallet, the following command can be used:

```
dfx wallet controllers
```

### Removing a controller
To remove a controller from an identity's cycles wallet, the following command can be used:

```
dfx wallet remove-controller
```

For example, to remove alice_auth as a controller, specify her principal in the following command:

```
dfx wallet remove-controller dheus-mqf6t-xafkj-d3tuo-gh4ng-7t2kn-7ikxy-vvwad-dfpgu-em25m-2ae
```

### Authorizing a principal to be a custodian

To authorize a custodian for a cycles wallet, the following command can be used:

```
dfx wallet authorize <custodian> [flag]
```

For example, to add alice_auth as a custodian, specify her principal in the following command:

```
dfx wallet authorize dheus-mqf6t-xafkj-d3tuo-gh4ng-7t2kn-7ikxy-vvwad-dfpgu-em25m-2ae
```

### Listing custodians

To list custodians of the currently selected identity's cycles wallet, the following command can be used:

```
dfx wallet custodians
```

### De-authorizing a principal from being a custodian

To de-authorize a custodian from a cycles wallet, the following command can be used:

```
dfx wallet deauthorize <custodian> [flag]
```

For example, to remove "alice_auth" as a custodian, specify her principal in the following command:

```
dfx wallet deauthorize dheus-mqf6t-xafkj-d3tuo-gh4ng-7t2kn-7ikxy-vvwad-dfpgu-em25m-2ae
```

## Additional methods that are not exposed as `dfx wallet` commands

The default cycles wallet canister includes additional methods that are not exposed as `dfx wallet` commands. The additional methods support more advanced cycles management tasks such as creating new canisters and managing events.

### Create a new cycles wallet

Use the `wallet_create_wallet` method to create a new cycles wallet canister with an initial cycle balance and, optionally, with a specific principal as its controller. If you don’t specify a controlling principal, the cycles wallet you use to create the new wallet will be the new wallet’s controller.

For example, you can run a command similar to the following to create a new wallet and assign a principal as a controller:

    dfx canister --network ic call f3yw6-7qaaa-aaaab-qaabq-cai wallet_create_wallet '(record { cycles = 5000000000000 : nat64; controller = principal "vpqee-nujda-46rtu-4noo7-qnxmb-zqs7g-5gvqf-4gy7t-vuprx-u2urx-gqe"})'

The command returns the principal for the new wallet:

    (record { 1_313_628_723 = principal "dcxxq-jqaaa-aaaab-qaavq-cai" })

### Register a new canister principal

Use the `wallet_create_canister` method to register a new canister principal on the Internet Computer. This method creates a new "empty" canister placeholder with an initial cycle balance and, optionally, with a specific principal as its controller. After you have registered the canister principal, you can install code for your canister as a separate step.

For example, you can run a command similar to the following to create a new wallet and assign a principal as a controller:

    dfx canister --network ic call f3yw6-7qaaa-aaaab-qaabq-cai wallet_create_canister '(record { cycles = 5000000000000 : nat64; controller = principal "vpqee-nujda-46rtu-4noo7-qnxmb-zqs7g-5gvqf-4gy7t-vuprx-u2urx-gqe"})'

The command returns the principal for the new canister you created:

    (record { 1_313_628_723 = principal "dxqg5-iyaaa-aaaab-qaawa-cai" })

### Receive cycles from a canister

Use the `wallet_receive` method as an endpoint to receive cycles.

### Forward calls from a wallet

Use the `wallet_call` method to forward calls using the cycles wallet principal as caller.

### Manage addresses

Use the following methods to manage address book entries:

-   `add_address`: (address: AddressEntry) → ();

-   `remove_address`: (address: principal) → ();

### Manage events

Use the following methods to retrieve event and chart information.

-   `get_events`: (opt record { from: opt nat32; to: opt nat32; }) → (vec Event) query;

-   `get_chart`: (opt record { count: opt nat32; precision: opt nat64; } ) → (vec record { nat64; nat64; }) query;

For example, you can use the `get_events` method to return `canister_create` and other events by running a command similar to the following:

    dfx canister call <cycles-wallet-principal> get_events '(record {from = null; to = null})'

If the cycles wallet (`gastn-uqaaa-aaaae-aaafq-cai`) is deployed on the Internet Computer main network, you could run a command that looks like this to return events:

    dfx canister --network ic call gastn-uqaaa-aaaae-aaafq-cai get_events '(record {from = null; to = null})'

The output from the command is in Candid format similar to the following:

    (
      vec { record { 23_515 = 0; 1_191_829_844 = variant { 4_271_600_268 = record { 23_515 = principal "tsqwz-udeik-5migd-ehrev-pvoqv-szx2g-akh5s-fkyqc-zy6q7-snav6-uqe"; 1_224_700_491 = null; 1_269_754_742 = variant { 4_218_395_836 };} }; 2_781_795_542 = 1_621_456_688_636_513_683;}; record { 23_515 = 1; 1_191_829_844 = variant { 4_271_600_268 = record { 23_515 = principal "ejta3-neil3-qek6c-i7rdw-sxreh-lypfe-v6hjg-6so7x-5ugze-3iohr-2qe"; 1_224_700_491 = null; 1_269_754_742 = variant { 2_494_206_670 };} }; 2_781_795_542 = 1_621_461_468_638_569_551;}; record { 23_515 = 2; 1_191_829_844 = variant { 1_205_528_161 = record { 2_190_693_645 = 11_000_000_000_000; 2_631_180_839 = principal "gvvca-vyaaa-aaaae-aaaga-cai";} }; 2_781_795_542 = 1_621_462_573_993_647_258;}; record { 23_515 = 3; 1_191_829_844 = variant { 1_205_528_161 = record { 2_190_693_645 = 11_000_000_000_000; 2_631_180_839 = principal "gsueu-yaaaa-aaaae-aaagq-cai";} }; 2_781_795_542 = 1_621_462_579_193_578_440;}; record { 23_515 = 4; 1_191_829_844 = variant { 1_955_698_212 = record { 2_190_693_645 = 0; 2_374_371_241 = "install_code"; 2_631_180_839 = principal "aaaaa-aa";} }; 2_781_795_542 = 1_621_462_593_047_590_026;}; record { 23_515 = 5; 1_191_829_844 = variant { 1_955_698_212 = record { 2_190_693_645 = 0; 2_374_371_241 = "install_code"; 2_631_180_839 = principal "aaaaa-aa";} }; 2_781_795_542 = 1_621_462_605_779_157_885;}; record { 23_515 = 6; 1_191_829_844 = variant { 1_955_698_212 = record { 2_190_693_645 = 0; 2_374_371_241 = "authorize"; 2_631_180_839 = principal "gsueu-yaaaa-aaaae-aaagq-cai";} }; 2_781_795_542 = 1_621_462_609_036_146_536;}; record { 23_515 = 7; 1_191_829_844 = variant { 1_955_698_212 = record { 2_190_693_645 = 0; 2_374_371_241 = "greet"; 2_631_180_839 = principal "gvvca-vyaaa-aaaae-aaaga-cai";} }; 2_781_795_542 = 1_621_463_144_066_333_270;}; record { 23_515 = 8; 1_191_829_844 = variant { 4_271_600_268 = record { 23_515 = principal "ejta3-neil3-qek6c-i7rdw-sxreh-lypfe-v6hjg-6so7x-5ugze-3iohr-2qe"; 1_224_700_491 = null; 1_269_754_742 = variant { 2_494_206_670 };} }; 2_781_795_542 = 1_621_463_212_828_477_570;}; record { 23_515 = 9; 1_191_829_844 = variant { 1_955_698_212 = record { 2_190_693_645 = 0; 2_374_371_241 = "wallet_balance"; 2_631_180_839 = principal "gastn-uqaaa-aaaae-aaafq-cai";} }; 2_781_795_542 = 1_621_878_637_071_884_946;}; record { 23_515 = 10; 1_191_829_844 = variant { 4_271_600_268 = record { 23_515 = principal "b5quc-npdph-l6qp4-kur4u-oxljq-7uddl-vfdo6-x2uo5-6y4a6-4pt6v-7qe"; 1_224_700_491 = null; 1_269_754_742 = variant { 4_218_395_836 };} }; 2_781_795_542 = 1_621_879_473_916_547_313;}; record { 23_515 = 11; 1_191_829_844 = variant { 313_999_214 = record { 1_136_829_802 = principal "gastn-uqaaa-aaaae-aaafq-cai"; 3_573_748_184 = 10_000_000_000;} }; 2_781_795_542 = 1_621_977_470_023_492_664;}; record { 23_515 = 12; 1_191_829_844 = variant { 2_171_739_429 = record { 25_979 = principal "gastn-uqaaa-aaaae-aaafq-cai"; 3_573_748_184 = 10_000_000_000; 4_293_698_680 = 0;} }; 2_781_795_542 = 1_621_977_470_858_839_320;};},
    )

In this example, there are twelve event records. The `Role` field (represented by the hash `1_269_754_742`) specifies whether a principal is a controller (represented by the hash `4_218_395_836`) or a custodian (represented by the hash `2_494_206_670`). The events in this example also illustrate an amount field (represented by the hash `3_573_748_184`) with a transfer of 10,000,000,000 cycles.