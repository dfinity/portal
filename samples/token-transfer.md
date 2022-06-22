# トークン転送 のサンプルコード

Token Transfer（トークン転送）は自分のアカウントから他のアカウントにトークンを転送することができる Canister です。Ledger Canister を使用した例であり、金融統合や Defi Dapp を作りたいときに便利です。サンプルコードは [Motoko](https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer) と [Rust](https://github.com/dfinity/examples/tree/master/rust/tokens_transfer) で公開されています。

このサンプルコードは、転送トークン数や転送先アカウント（オプションでサブアカウントも可能）を入力に取り、また転送に必要なトークンがない場合などに Canister に成否を返すような、`ledger_transfer` 関数を中心に据えています。成功した場合、トランザクションの一意な識別子が返されます。この識別子は、Ledger のトランザクションの memo に保存されます。

<!--
# ICP Transfer Sample Code

ICP Transfer is a canister that can transfer ICP from its account to other accounts. It is an example of a canister that uses the Ledger canister. Sample code is available in [Motoko](https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer) and [Rust](https://github.com/dfinity/examples/tree/master/rust/tokens_transfer).

The sample code revolves around one core transfer function which takes as input the amount of ICP to transfer, the account (and optionally the subaccount) to which to transfer ICP and returns either success or an error in case e.g. the ICP transfer canister doesn’t have enough ICP to do the transfer. In case of success, a unique identifier of the transaction is returned. This identifier will be stored in the memo of the transaction in the Ledger.

-->
