# 基本的な DAO

これは [Internet Computer](https://github.com/dfinity/ic) 上にデプロイされている基本的な DAO [( Decentralized Autonomous Organization )](https://en.wikipedia.org/wiki/Decentralized_autonomous_organization) のサンプルプロジェクトのデモです。 基本的な DAO のサンプルコードは [Motoko](https://github.com/dfinity/examples/tree/master/motoko/basic_dao) と [Rust](https://github.com/dfinity/examples/tree/master/rust/basic_dao) で見ることが出来ます。

## 概要

`basic_dao` は Principal ID とトークン数をマッピングしたアカウントセットで初期化することができます。 アカウントのオーナーは `account_balance` を呼び出してアカウント残高を照会したり、 `transfer` を呼び出してトークンを他のアカウントに転送することができます。誰でもすべてのアカウントを閲覧するために `list_accounts` を呼び出すことができます。

アカウントのオーナーは `submit_proposal` を呼び出してプロポーザルを提出することができます。プロポーザルでは、Canister、メソッド、およびこのメソッドの引数を指定します。アカウントのオーナーは `vote` を呼び出すことで、提案に対して ( `Yes` か `No` のどちらかの) 票を投じることができます。 投票数はそのアカウントのオーナーが持っているトークン数と同じです。もし十分な数の `Yes` 票が投じられたら `basic_dao` は、指定された Canister 、与えられた引数、指定されたメソッドを呼び出すことでその提案を実行します。もし `No` の票数が多く投じられた場合、提案は実行されず、代わりに `Rejected` として登録されます。

あるプロポーザルを可決するために必要な `Yes` の票数などの特定のシステムパラメータを `get_system_params` で問い合わせることができます。これらのシステムパラメータはプロポーザルプロセスを通じて変更することができます。つまり、プロポーザルは `update_system_params` で更新された値を呼び出すようにすることができます。以下のデモはまさにそれを行っています。

詳しくは [ Canister のサービス定義](https://github.com/dfinity/examples/blob/master/rust/basic_dao/src/basic_dao/src/basic_dao.did) をご覧ください。

<!--
# Basic Dao

This sample project demonstrates a basic DAO ([Decentralized Autonomous Organization](https://en.wikipedia.org/wiki/Decentralized_autonomous_organization)) that can be deployed to the [Internet Computer](https://github.com/dfinity/ic). The basic DAO sample code is available in [Motoko](https://github.com/dfinity/examples/tree/master/motoko/basic_dao) and [Rust](https://github.com/dfinity/examples/tree/master/rust/basic_dao). You can see a quick introduction on [YouTube](https://youtu.be/3IcYlieA-EE).

## Overview

A `basic_dao` can be initialized with a set of accounts: mappings from principal IDs to an amount of tokens. Account owners can query their account balance by calling `account_balance` and transfer tokens to other accounts by calling `transfer`. Anyone can call `list_accounts` to view all accounts.

Account owners can submit proposals by calling `submit_proposal`. A proposal specifies a canister, method and arguments for this method. Account owners can cast votes (either `Yes` or `No`) on a proposal by calling `vote`. The amount of votes cast is equal to amount of tokens the account owner has. If enough `Yes` votes are cast, `basic_dao` will execute the proposal by calling the proposal’s given method with the given args against the given canister. If enough `No` votes are cast, the proposal is not executed, and is instead marked as `Rejected`.

Certain system parameters, like the number of `Yes` votes needed to pass a proposal, can be queried by calling `get_system_params`. These system params can be modified via the proposal process, i.e. a proposal can be made to call `update_system_params` with updated values. The below demo does exactly that.

View the [canister service definition](https://github.com/dfinity/examples/blob/master/rust/basic_dao/src/basic_dao/src/basic_dao.did) for more details.

-->
