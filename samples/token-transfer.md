# Token Transfer Sample Code

Tokens Transfer is a canister that can transfer token from its account to other accounts. It is an example of a canister that uses the Ledger canister. Sample code is available in [Motoko](https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer) and [Rust](https://github.com/dfinity/examples/tree/master/rust/tokens_transfer).

The sample code revolves around one core transfer function which takes as input the amount of tokens to transfer, the account (and optionally the subaccount) to which to transfer the tokens and returns either success or an error in case e.g. the tokens transfer canister doesn’t have enough tokens to do the transfer. In case of success, a unique identifier of the transaction is returned. This identifier will be stored in the memo of the transaction in the Ledger.
