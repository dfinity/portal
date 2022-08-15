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
tests that nothing went wrong up to this point.
We mark the latter by the keyword _(Recommended)_. 

#### 1. Make a call to the SNS wasm modules canister on the NNS subnet.
To make this call, use the command as described [here]().
//TODO: add link
   Upon receiving this call, the SNS wasm modules cansiter will deploy
   an SNS with your chosen initial parameters.

   
#### 2. Add the SNS root canister as a controller to your dapp canister(s).

#### 3. _(Recommended)_ Test upgrading the dapp cnaister(s) by SNS proposal.

(warning that for this you require voting majority or that you can ask 
neurons to upgrade)

#### 4. Remove all other controllers from the dapp cansiter(s)
remove self as controller and all other devs

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




