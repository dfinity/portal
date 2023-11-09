# ICP transfer sample code

## Overview
ICP transfer is a canister that can transfer ICP from its account to other accounts. It is an example of a canister that uses the ledger canister. Sample code is available in [Motoko](https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer) and [Rust](https://github.com/dfinity/examples/tree/master/rust/tokens_transfer).

## Architecture
The sample code revolves around one core transfer function which takes as input the amount of ICP to transfer, the account (and optionally the subaccount) to which to transfer ICP and returns either success or an error in case e.g. the ICP transfer canister doesn’t have enough ICP to do the transfer. In case of success, a unique identifier of the transaction is returned. This identifier will be stored in the memo of the transaction in the ledger.

This sample will use the Motoko variant. 

This example uses the ledger transfer project files located in the [samples Github repo](https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer).

Follow the guide on [deploying an ICP ledger locally](/docs/developer-docs/integrations/ledger/ledger-local-setup.md). You can have a look at [how to interact with the ICP ledger aftwerwards](/docs/developer-docs/integrations/ledger/interact-with-ledger.md).