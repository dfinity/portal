# Launching the SNS in production
This describes the detailed steps for launching an SNS.

:::caution

In the following steps we assume that you have already
[collected the developer and airdrop principals and chosen
the initial SNS parameters in a .yaml file](predeployment.md).
We also recommend that before following these steps and launch an
SNS in production, you have [tested the SNS](local-testing.md).

:::

You are now ready to launch your SNS. There are some steps that are needed
for launching an SNS and some steps that we recommend as intermediate
sanity checks that up to this point everything works fine.
We mark the latter by the keyword _(Recommended)_.

#### 1. Make a call to the SNS wasm modules canister on the NNS subnet.
To make this call, use the command as described 'here' ().
[comment]: <> (TODO: add link)
Upon receiving this call, the SNS wasm modules cansiter will deploy
an SNS with your chosen initial parameters.


#### 2. Add the SNS root canister as a controller to your dapp canister(s).
To do so, use the command as described 'here' ().
//TODO: add link, this should already exist somewhere, ask dfx / SDK team

#### 3. _(Recommended)_ Test upgrading the dapp canister(s) by SNS proposal.
To test this, make an SNS proposal to upgrade one of the dapp canisters to
a new wasm version.
Then, ensure that sufficiently many initial neurons (deveoper and airdrop
neurons) vote on the proposal so that it is adopted.
In this way, confirm that the proposal has been upgraded. 

You can learn how to make an SNS proposal 'here' and
//TODO: SNS quill documentation to make proposal and link to it
how to vote on an SNS proposal 'here'.
// TODO: 

:::info

This step is one of the reasons why you should ensure that you can
reach and get buy in from a majority of the inital neurons. Also, these
neurons have to be able to vote on SNS proposals, which might require
the to vote on a command line tool as frontends might only show SNS
proposals after the decentralization sale.
// TODO: make more precise the warning in the launch / choosing parameters part
to also specify that the initial neurons might need to vote on a CLI

:::

#### 4. Remove all other controllers from the dapp cansiter(s)
Once you convinced yourself that the dapp canister(s) can be upgraded by
the SNS, you should remove yourself, as well as any other developers,
from the list of controllers that the dapp canister(s) have.
Note that without this, the next step will fail.

#### 5. Register the dapp to the SNS
by proposaladd dapp to sns by proposal

#### 6. _(Recommended)_ Test upgrading the dapp cnaister(s) by SNS proposal.
Test sure you can upgrade the dapp cnaister(s) by SNS proposal.

#### 7. Make a NNS proposal to start the decentralisation sale.
make sale proposal

info
atm can still upgrade the dapp by SNS proposal
atm can


// for readme, say you might want to try to upgrade dapp by sns before
starting the sale. probably even before removing yourself as controller!!!

// so detailed steps should include removing controller
// nd then also adding dapp to sns,
// which only be possible after removed




