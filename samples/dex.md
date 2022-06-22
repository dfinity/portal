# DEX サンプル

IC 上で DEFI アプリケーションを実現するためには、DEFI の Canister は token Canister や ledger Canister と相互に対話する必要があります。このサンプル Dapp ではこれらの相互対話を容易にする方法を説明します。

サンプルの DEFI は [Motoko](https://github.com/dfinity/examples/tree/master/motoko/defi) と [Rust](https://github.com/dfinity/examples/tree/master/rust/defi) で実装されており、 [ IC 上で動作中のもの](https://gzz56-daaaa-aaaal-qai2a-cai.ic0.app/) を見ることが出来ます。

## アーキテクチャ

IC の設計が複雑なオンチェーン演算処理を可能としています。IC の安価なストレージと組み合わせれば、オンチェーンでのオーダーブックも可能です。このサンプルコードではこれらの機能を利用して、ユーザーの残高と注文を取引所 Canister に保存します。サンプルの取引所機能は以下のステップに要約することが出来ます。

- 取引所が資金を保管する（ ICP と他のトークンでは仕組みが異なる、後述）。

- 取引所が内部帳簿の収支を更新する。

- ユーザーが取引所で取引を行い、取引所は内部帳簿の収支を更新する。

- 取引所から資金を引き出すと、保管されていた資金はユーザーに戻される。

### インターフェイス

取引所からユーザー固有の元帳アカウント識別子をリクエストします。この一意のアカウント識別子は、取引所の元帳アカウントのユーザー固有のサブアカウントを表し、ユーザーのデポジットを区別できるようにします。

    getDepositAddress: () -> (blob);

取引所へのユーザーのデポジットを開始します。ユーザーが ICP をデポジットしたい場合、取引所はユーザー固有のデポジットアドレスからそのデフォルトのサブアドレスに資金を移動し、DEX でユーザーの ICP 残高を調整します。ユーザーが DIP トークンのデポジットを希望している場合、取引所は承認された資金をそのトークン口座に移動しようとし、ユーザーの残高を調整します。

    deposit: (Token) -> (DepositReceipt);

取引所へ出金依頼をします。取引所はユーザーが十分な残高を持っている場合、ユーザーに資金を送り返します。

    withdraw: (Token, nat, principal) -> (WithdrawReceipt);

取引所に新しい注文を出します。既に出ている反対売買の注文と一致した場合、すぐに成立します。

    placeOrder: (Token, nat, Token, nat) -> (OrderPlacementReceipt);

ユーザーに発注をキャンセル出来るようにします。

    cancelOrder: (OrderId) -> (CancelOrderReceipt);

ユーザーの持っている取引所にある特定トークン残高を要求します。

    getBalance: (Token) -> (nat) query;

### 手数料

取引から手数料を差し引くのは取引所の責任です。取引所が出金等の内部送金の手数料を支払わなければならないため重要です。

## トークン取引所の動作説明

このセクションでは、取引所の中核機能を詳しく説明していきます。ほとんどの相互対話には複数のステップを要求され、提供されるフロントエンドを使用することで簡略化されます。取引所 Canister の機能は公開されているので、スキルのあるユーザーは `dfx` を使用して取引所とやり取りすることができます。

### ICP のデポジット

ICP のやり取りにおいて別々に解決（Resolve）しなければならない処理があるため、Ledger Canister は独自のインターフェースを提供しています。

- ユーザーは `getDepositAddress` 関数を呼び出します。レスポンスは取引所が管理するユーザー固有のサブアカウントを表す一意のアカウント識別子を含んでいます。取引所はこのアドレスを通してデポジットするユーザーを特定することができます。

- ユーザは取得したデポジット先アドレスに ICP を転送し、完了するのを待ちます。

- 取引所に通知するために、ユーザーは ICP トークンの Principal で `deposit` を呼び出します。取引所はユーザーのサブアカウントを調べ、取引所におけるユーザーの残高を調整します。第二段階として、取引所はユーザーのサブアカウントからデフォルトのサブアカウントに資金を転送し、そこに取引所のすべての ICP を保持します。

### トークンのデポジット

DIP20 では、よりリッチなインターフェースで対話ができるため、トークンのデポジットがより簡単になります。

- ユーザーは、 token Canister の `approve` 関数を呼び出します。これにより、取引所はユーザーに代わって取引所に資金を送金することができるようになります。

- ICP のデポジットと同様に、ユーザーは取引所の `deposit` 機能を呼び出します。取引所は承認されたトークンを取引所に転送し、ユーザーの取引所残高を調整します。

### オーダー発注

取引所に資金をデポジットした後、ユーザーは注文を出すことができます。注文は 2 つのタプルから構成されます。 `from: (Token1, amount1)` と `to: (Token2, amount2)` です。これらの注文は取引所に追加されます。これらの注文に何が起こるかは、取引所の実装に依存します。このサンプルでは、完全に一致する注文のみを実行するシンプルな取引所を提供します。これは単なるおもちゃの取引所であり、取引所の機能は単に説明のためです。ヒント：取引所は時々貪欲になることがあります。

### 資金の出金

資金をデポジットすることに比べて、資金の出金は簡単です。取引所が資金を保管しているため、 `withdraw` のリクエストがあると、取引所はユーザーに資金を送り返します。それに応じて、取引所内の残高が調整されます。

## よくある間違い

- 同時実行。 Canister 関数が `await` ステートメントを持つ場合、実行がインターリーブされる可能性があります。バグを回避するために、データ構造の更新の配置を慎重に検討し、ダブルスペンド攻撃を防ぐ必要があります。

- 浮動小数点数。より高性能な取引所では、浮動小数点に注意し、小数を制限するようにする必要があります。

- await 後に回復不能なエラー（Panic）を起こさないこと。回復不能なエラーが起きると、状態がロールバックされます。これは、交換の正しさに問題を引き起こす可能性があります。

<!--
# DEX Sample

To enable DEFI applications on the IC, canisters need to interact with token canisters and the ledger canister. This sample dapp illustrates how to facilitate these interactions. You can see a quick introduction on [YouTube](https://youtu.be/fLbaOmH24Gs).

The sample exchange is implemented in [Motoko](https://github.com/dfinity/examples/tree/master/motoko/defi) and [Rust](https://github.com/dfinity/examples/tree/master/rust/defi) and can be seen [running on the IC](https://gzz56-daaaa-aaaal-qai2a-cai.ic0.app/).

## Architecture

The design of the IC allows for more complex on-chain computation. In combination with cheap storage, it is possible to have on-chain order books. This sample code takes advantage of these features and stores user balances and orders inside the exchange canister. The sample exchange functionality can be condensed into the following steps:

-   Exchange takes custody of funds (different mechanism for tokens and ICP, see below).

-   Exchange updates internal balance book.

-   Users trade on exchange causing the exchange to update its internal balance book.

-   Withdrawing funds from the exchange gives custody back to the user.

### Interface

Request user-specific ledger account identifier from the exchange. This unique account identifier represents a user-specific subaccount in the exchange’s ledger account, allowing it to differentiate between user deposits.

    getDepositAddress: () -> (blob);

Initiate user deposit to exchange. If the user wants to deposit ICP, the exchange moves the funds from the user-specific deposit address to its default subaddress and adjusts the user’s ICP balance on the DEX. If the user wants to deposit a DIP token, the exchange tries to move the approved funds to its token account and adjusts the user’s balance.

    deposit: (Token) -> (DepositReceipt);

Withdraw request to the exchange. The exchange will send funds back to the user if the user has a sufficient balance.

    withdraw: (Token, nat, principal) -> (WithdrawReceipt);

Place new order to exchange. If the order matches an existing order, it will get executed.

    placeOrder: (Token, nat, Token, nat) -> (OrderPlacementReceipt);

Allows the user to cancel submitted orders.

    cancelOrder: (OrderId) -> (CancelOrderReceipt);

Request user’s balance on exchange for a specific token.

    getBalance: (Token) -> (nat) query;

### Fee

It is the responsibility of the exchange to subtract fees from the trades. This is important because the exchange must pay fees for withdrawals and internal transfers.

## Token Exchange Walkthrough

This section contains a detailed walkthrough of the core exchange functionalities. Most interactions require multiple steps and are simplified by using the provided frontend. Since the exchange canister functions are public, advanced users can use `dfx` to interact with the exchange.

### Depositing ICP

The ledger canister provides a unique interface so that interactions with ICP need to be resolved separately.

-   The user calls the `getDepositAddress` function. The response contains a unique account identifier representing a user-specific subaccount controlled by the exchange. The exchange can identify the user responsible for deposits through this address.

-   User transfers ICP to the fetched deposit address and waits for the transfer to complete.

-   To notify the exchange, the user calls `deposit` with the ICP token principal. The exchange will look into the user’s subaccount and adjust the user’s balance on the exchange. In a second step, the exchange will transfer the funds from the user subaccount to its default subaccount, where the exchange keeps all of its ICP.

### Depositing Tokens

There are a number of token standards in development (e.g. IS20, DFT, and DRC20); This sample uses DIP20.

-   The user calls the `approve` function of the token canister. This gives the exchange the ability to transfer funds to itself on behalf of the user.

-   Similar to the ICP depositing, the user calls the `deposit` function of the exchange. The exchange then transfers the approved token funds to itself and adjusts the user’s exchange balance.

### Placing Orders

After depositing funds to the exchange, the user can place orders. An order consists of two tuples. `from: (Token1, amount1)` and `to: (Token2, amount2)`. These orders get added to the exchange. What happens to these orders is specific to the exchange implementation. This sample provides a simple exchange that only executes exactly matching orders. Be aware this is just a toy exchange, and the exchange functionality is just for completeness. Hint: The exchange can be greedy sometimes ;)

### Withdrawing Funds

Compared to depositing funds, withdrawing funds is simpler. Since the exchange has custody of the funds, the exchange will send funds back to the user on `withdraw` requests. The internal exchange balances are adjusted accordingly.

## Common mistakes

-   Concurrent execution: If canister functions have `await` statements, it is possible that execution is interleaved. To avoid bugs, it is necessary to carefully consider the placement of data structure updates to prevent double-spend attacks.

-   Floating Points: More advanced exchanges should take care of floating points and make sure to limit decimals.

-   No panics after await: When a panic happens, the state gets rolled back. This can cause issues with the correctness of the exchange.

-->
