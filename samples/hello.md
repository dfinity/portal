# Hello, World!

このサンプルは、以下の 2 つの Canister スマートコントラクトからなるごく単純な Dapp です。

- アプリケーションのロジックを実装しているシンプルなバックエンド Canister である `hello` と

- Dapp の Web ユーザーインターフェースのアセットを提供するシンプルなフロントエンドアセット Caninster である `hello_assets`

これは、よくある _hello world_ に相当する Dapp で、 [IC 上のここで](https://6lqbm-ryaaa-aaaai-qibsa-cai.ic0.app/) 動作しているのを見ることができます。

このサンプルは、以下の説明に従って `dfx new` を実行して作成されたデフォルトのプロジェクトに基づいています。 [Motoko](../quickstart/local-quickstart.xml) と [Rust](../rust-guide/rust-quickstart.xml) のクイックスタートドキュメント。

サンプルコードはこちらの github の [samples](https://github.com/dfinity/examples) リポジトリの、 [Motoko](https://github.com/dfinity/examples/tree/master/motoko/hello) と [Rust](https://github.com/dfinity/examples/tree/master/rust/hello) のどちらでも見ることができます。

Canister `hello` は Motoko で実装されても Rust で実装されても、同じ Candid インターフェイスを提供します。

    service : {
      greet: (text) -> (text);
    }

フロントエンド Canister である `hello_assets` は、引数入力のためのテキストボックスと、その引数で greet 関数を呼び出すためのボタンを持つ HTML ページを表示します。 呼び出しの結果はメッセージボックスに表示されます。

![hello フロントエンド](_attachments/hello.png)

フロントエンド Canister は `dfx` によって提供される汎用的な Canister ですが、 ブラウザに提供するアセットは、dfx プロジェクトの設定とプロジェクトファイルによって決定されます。

フロントエンド Canister とそのアセットは、両方のプロジェクトで同じものです。

<!--
# Hello, World!

This sample demonstrates a dead simple dapp consisting of two canisters:

-   a simple backend canister, `hello`, implementing the logic of the application, and

-   a simple frontend asset canister, `hello_assets`, serving the assets of the dapp’s web user interface.

It is the dapp equivalent of the ubiquitous *hello world* and can be seen running [here on the IC](https://6lqbm-ryaaa-aaaai-qibsa-cai.ic0.app/).

This sample is based on the default project created by running `dfx new` as described in the quickstart documents.

The sample code is available from the [samples](https://github.com/dfinity/examples) repository in both [Motoko](https://github.com/dfinity/examples/tree/master/motoko/hello) and [Rust](https://github.com/dfinity/examples/tree/master/rust/hello).

Canister `hello`, whether implemented in Motoko or Rust, presents the same Candid interface:

    service : {
      greet: (text) -> (text);
    }

The frontend canister, `hello_assets`, displays an HTML page with a text box for the argument and a button for calling the function greet with that argument. The result of the call is displayed in a message box.

![hello frontend](_attachments/hello.png)

The frontend canister is a generic canister provided by `dfx` but the assets it serves to browsers are determined by the dfx project settings and project files.

The frontend canister and its assets are identical for both projects.

-->
