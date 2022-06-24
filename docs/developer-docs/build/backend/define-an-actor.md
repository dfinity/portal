# Actor を使ったクエリ

[クイックスタート](../../quickstart/hello10mins.md) では、Actor オブジェクトや非同期メッセージを含めた Internet Computer の単純な Canister を初めて見たことでしょう。Actor ベースのメッセージを活用する Canister の書き方を学ぶ次のステップとして、このチュートリアルでは Actor を定義する伝統的な `Hello, World!` Canister を修正する方法を説明して、ローカル実行環境でのデプロイからテストまで行います。

## 始める前に

このチュートリアルを始める前に、以下のことを確認してください。

- [ダウンロードとインストール](../../quickstart/local-quickstart#download-and-install) に記載されている SDK パッケージを、ダウンロードしてインストールまで行っていること

- すべてのローカル Canister 実行環境プロセスを停止していること

このチュートリアルの所要時間は２０分程度です。

## 新しいプロジェクトを作成する

このチュートリアルで利用する新しいプロジェクトを作成する:

1.  ターミナルシェルをまだ開いていなければ開きます。

2.  もし別のフォルダを使用しているなら、Internet Computer プロジェクト用のフォルダに移動します。

3.  以下のコマンドを実行して、新しいプロジェクトを作成します。

        dfx new actor_hello

4.  以下のコマンドを実行して、プロジェクトディレクトリに移動します。

        cd actor_hello

## デフォルト設定を修正する

[デフォルトプロジェクトを探索する](explore-templates) チュートリアルでは、新しくプロジェクトを作成することで、プロジェクトディレクトリにデフォルト `dfx.json` 設定ファイルが追加されるのを見たことでしょう。このチュートリアルでは、プロジェクトに反映するデフォルト設定をいくつか修正する必要があります。

`dfx.json` 設定ファイルを修正する:

1.  テキストエディタで `dfx.json` 設定ファイルを開きます。

2.  `actor_hello` プロジェクトのデフォルト設定を確認します。

3.  名前、ソースへのパス、出力ファイルのすべてが、`actor_hello` プロジェクト名を使用していることに注目します。

    例えば、デフォルト Canister スマートコントラクト名は `actor_hello` であり、メインコードのファイルへのデフォルトパスは `src/actor_hello/main.mo` です。

    これらのファイルやディレクトリの名前は変更することができます。ただし、変更する場合は、ファイルシステム上のファイルやディレクトリの名前が、`dfx.json` 設定ファイルで指定している名前と一致していることを確認してください。 デフォルトのディレクトリ名やファイル名を使用するつもりであれば、変更する必要はありません。

4.  ファイルから `actor_hello_assets` 設定をすべて取り除きます。

    このチュートリアルでのサンプル Canister では、フロントエンドアセットを使用しないので、設定ファイルからこれらの設定を削除できます。

    例えば、`actor_hello_assets` セクションを取り除いた後、設定ファイルは[こちら](../_attachments/define-actor-dfx.json) のようになります。

5.  変更内容を保存し、ファイルを閉じて次に進みます。

## デフォルト Canister を修正する

[デフォルトプロジェクトを探索する](explore-templates) チュートリアルでは、新しいプロジェクトを作成することで、`main.mo` ファイルを含む `src` デフォルトディレクトリが作成されるのを見たことでしょう。このチュートリアルでは、Actor を定義することで、単純な "Hello, World!" Canister を作成するテンプレートコードを修正します。Motoko では、Internet Computer Canister は Motoko Actor として表現されます。

デフォルトテンプレートソースコードを修正する:

1.  以下のコマンドを実行して、プロジェクトのソースコードディレクトリに移動します。

        cd src/actor_hello

2.  テキストエディタでテンプレート `main.mo` ファイルを開き、既存のコンテンツを削除します。

        cd src/actor_hello

    次のステップは、伝統的な "Hello, World!" のような文章を表示する Canister を書くことです。 ただ Internet Computer の Canister をコンパイルするには、Motoko コードで Actor を定義する必要があります。

3.  [こちら](../_attachments/actor_hello.mo) のサンプルコードをコピーして、`main.mo` ファイルに貼り付けます。

    Canister を定義した Motoko Actor を詳しく見ていきましょう。

    - まず `print` 機能を提供する `Debug` モジュールをインポートします。

    - Actor は、Internet Computer _query_ メソッドを定義するのに `public query func` 宣言を使います。メソッドは Actor のステートに永続的な変更を加える必要はありません。メソッドをクエリとして宣言することで、メソッドが行ういかなる変更も一時的なものになり、クエリの完了後に破棄されます。

    クエリコールの使用方法に関しては、[Canisters はプログラムとステートを含める](../../../concepts/canisters-code#canister-state) にある [クエリコール](../../../concepts/canisters-code#query-update) を参照してください。

4.  変更内容を保存して、`main.mo` ファイルを閉じます。

## Canister のビルドを確認する

通常 Canister をビルドするには、まず Internet Computer ブロックチェーンメインネット上でユニークな Canister ID を予約する必要があります。

しかしながら、Internet Computer ブロックチェーンメインネットに全く接続せずに、プログラムをコンパイルすることも可能です。`dfx build --check` コマンドは、一時的にハードコードされた Canister ID を使用してコンパイルを実現します。

Canister のビルドを確認する:

1.  プロジェクトディレクトリのルート直下に戻ります。

2.  以下のコマンドを実行して、一時的にハードコードされた Canister ID での Canister をビルドします。

        dfx build --check

    `--check` オプションは、プロジェクトをローカルにビルドして、コンパイルの確認と生成されたファイルの調査を可能にします。`dfx build --check` コマンドは、一時的な ID のみを使用するので、以下のような出力を表示します。

        Building canisters to check they build ok. Canister IDs might be hard coded.
        Building canisters...

    もし Canister のコンパイルが成功すれば、デフォルト `.dfx/local/canisters` ディレクトリと `.dfx/local/canisters/actor_hello/` サブディレクトリにある出力を調査できます。

    例えば、生成されたファイルを確認するには、`tree` コマンドを使います。

        tree .dfx/local/canisters

    コマンドを実行すると、以下のような出力が表示されます。

<!-- -->

    .dfx/local/canisters
    ├── actor_hello
    │   ├── actor_hello.d.ts
    │   ├── actor_hello.did
    │   ├── actor_hello.did.js
    │   ├── actor_hello.js
    │   └── actor_hello.wasm
    └── idl

    2 directories, 5 files

## プロジェクトをデプロイする

`dfx build --check` コマンドからローカル Canister 実行環境もしくは Internet Computer メインネットにデプロイすることはできません。 もしプロジェクトをデプロイしたいのであれば、以下のことを実行する必要があります。

- ローカル Canister 実行環境もしくは Internet Computer メインネットに接続すること

- 接続専用の Canister ID を登録すること

- Canister をデプロイすること

これらのステップをもう少し詳しく考えてみましょう。まずプロジェクトをデプロイする前に、`dfx` のローカル Canister 実行環境もしくは Internet Computer ブロックチェーンメインネットに接続する必要があります。どちらかに接続した後、ローカルで定義した ID の代わりに、ユニークで接続専用の Canister ID を生成する必要があります。これらのステップを確認するために、プロジェクトをローカルにデプロイしてみましょう。

プロジェクトをローカルにデプロイする:

1.  必要であればターミナルを開き、プロジェクトディレクトリに移動します。

2.  以下のコマンドを実行して、ローカル Canister 実行環境を起動します。

        dfx start --background

    このチュートリアルでは、バックグラウンドプロセスとして、ローカル Canister 実行環境を動かすのに `--background` オプションを使用します。 このオプションのおかげで、別のターミナルシェルを開くことなく、次のステップに進むことができます。

3.  以下のコマンドを実行して、ローカル Canister 実行環境のプロジェクトに対する新しい Canister ID を生成します。

        dfx canister create actor_hello

    コマンドの実行で、以下のような出力が表示されます。

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "pubs-id" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Creating canister "actor_hello"...
        "actor_hello" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"

    `dfx canister create` コマンドは、`.dfx/local` ディレクトリの `canister_ids.json` ファイルに接続専用の Canister ID を格納します。

    例:

        {
          "actor_hello": {
            "local": "rrkah-fqaaa-aaaaa-aaaaq-cai"
          }
        }

4.  以下のコマンドを実行して、Canister をビルドします。

        dfx build

    コマンドの実行で、以下のような出力が表示されます。

        Building canisters...

5.  以下のコマンドを実行して、ローカル Canister 実行環境に `actor_hello` プロジェクトをデプロイします。

        dfx canister install actor_hello

    コマンドの実行で、以下のような出力が表示されます。

        Installing code for canister actor_hello, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai

## Canister に処理を要求する

これでローカル Canister 実行環境にデプロイした Canister がありますので、`dfx canister call` コマンドを使用して Canister をテストします。

ローカル Canister 実行環境にデプロイした Canister をテストする:

1.  以下のコマンドを実行することで、`dfx canister call` を使用して `hello` 関数を呼び出します。

        dfx canister call actor_hello hello

2.  ローカル Canister 実行環境が稼働しているターミナルで、コマンドが `hello` 関数に指定された文章とチェックポイントのメッセージを返すことを確認します。

    例えば、Canister は、以下のような出力の中に "Hello, World from DFINITY" を表示します。

        [Canister rrkah-fqaaa-aaaaa-aaaaq-cai] Hello, World from DFINITY

    もしバックグラウンドの代わりに別のターミナルで Internet Computer メインネットを動かしていたら、"Hello, World from DFINITY" メッセージはメインネットの処理を表示するターミナルに表示されることに注意してください。

## ローカル Canister 実行環境を止める

Canister での実験が終わりましたら、バックグラウンドで動かし続けないために、ローカル Canister 実行環境を停止します。

ローカル Canister 実行環境を止める:

1.  Canister とやり取りを行うターミナルで、`dfx stop` コマンドを実行します。もしくは

2.  ローカル Canister 実行環境の処理を表示しているターミナルで、プロセスを中断するために Control-C を押します。もしくは

3.  コマンドや OS のツールを使用して `replica` プロセスを強制終了します。

4.  以下のコマンドを実行して、ローカル Canister 実行環境を止めます。

        dfx stop

<!--
# Query using an actor

In the [Quick start](../../quickstart/hello10mins.md), you had your first look at a simple canister for the Internet Computer involving an actor object and asynchronous messaging. As the next step in learning to write canisters that take advantage of actor-based messaging, this tutorial illustrates how to modify a traditional `Hello, World!` canister to define an actor, then deploy and test your canister on a local canister execution environment.

## Before you begin

Before starting the tutorial, verify the following:

-   You have downloaded and installed the SDK package as described in [Download and install](../../quickstart/local-quickstart#download-and-install).

-   You have stopped any local canister execution environment processes

This tutorial takes approximately 20 minutes to complete.

## Create a new project

To create a new project for this tutorial:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Change to the folder you are using for your Internet Computer projects, if you are using one.

3.  Create a new project by running the following command:

        dfx new actor_hello

4.  Change to your project directory by running the following command:

        cd actor_hello

## Modify the default configuration

In the [Exploring the default project](explore-templates) tutorial, you saw that creating a new project adds a default `dfx.json` configuration file to your project directory. In this tutorial, you need to modify a few of the default settings to reflect your project.

To modify the `dfx.json` configuration file:

1.  Open the `dfx.json` configuration file in a text editor.

2.  Check the default settings for the `actor_hello` project.

3.  Notice that the names and paths to source and output files all use the `actor_hello` project name.

    For example, the default canister name is `actor_hello` and the default path to the main code file is `src/actor_hello/main.mo`.

    You can rename any of these files or directories. If you make any changes, however, be sure that the names you use for your files and directories on the file system match the names you specify in the `dfx.json` configuration file. If you plan to use the default directory and file names, no changes are necessary.

4.  Remove all of the `actor_hello_assets` configuration settings from the file.

    The sample canister for this tutorial doesn’t use any frontend assets, so you can remove those settings from the configuration file.

    For example, the configuration file looks like [this](../_attachments/define-actor-dfx.json) after you remove the `actor_hello_assets` section.

5.  Save your changes and close the file to continue.

## Modify the default canister

In the [Exploring the default project](explore-templates) tutorial, you saw that creating a new project creates a default `src` directory with a template `main.mo` file. In this tutorial, you modify the template code to create a simple "Hello, World!" canister. by defining an actor in Motoko. In Motoko, an Internet Computer canister is representeded as a Motoko actor.

To modify the default template source code:

1.  Change to the source code directory for your project by running the following command:

        cd src/actor_hello

2.  Open the template `main.mo` file in a text editor and delete the existing content.

    The next step is to write a canister that prints a statement like the traditional "Hello, World!" sample canister. To compile the canister for the Internet Computer, however, your Motoko code must define an `actor`.

3.  Copy and paste [this code](../_attachments/actor_hello.mo) into the `main.mo` file.

    Let’s take a closer look at this Motoko actor defining our canister:

    -   The code imports a `Debug` module to provide the `print` functionality.

    -   The actor uses the `public query func` declaration to define an Internet Computer *query* method. Our method doesn’t need to make any permanent changes to the state of the actor. Declaring it as a query means that any changes it does make are transient and discarded after the query completes.

    For more information about using a query call, see [query calls](../../../concepts/canisters-code#query-update) in [Canisters include both program and state](../../../concepts/canisters-code#canister-state).

4.  Save your changes and close the `main.mo` file.

## Checking that the canister builds

Usually, in order to build a canister, it’s necessary to first reserve a unique canister identifier on the Internet Computer blockchain mainnet.

However, it’s also possible to compile your program without connecting to the Internet Computer blockchain mainnet at all. The `dfx build --check` command uses a temporary, hard-coded canister identifier to accomplish this.

To check that the canister builds:

1.  Navigate back to the root of your project directory.

2.  Build the canister executable with a temporary, hard-coded identifier by running the following command:

        dfx build --check

    The `--check` option enables you to build a project locally to verify that it compiles and to inspect the files produced. Because the `dfx build --check` command only uses a temporary identifier, you should see output similar to the following:

        Building canisters to check they build ok. Canister IDs might be hard coded.
        Building canisters...

    If the canister compiles successfully, you can inspect the output in the default `.dfx/local/canisters` directory and `.dfx/local/canisters/actor_hello/` subdirectory.

    For example, you might use the `tree` command to review the files created:

        tree .dfx/local/canisters

    The command displays output similar to the following

-->
<!-- -->
<!--

    .dfx/local/canisters
    ├── actor_hello
    │   ├── actor_hello.d.ts
    │   ├── actor_hello.did
    │   ├── actor_hello.did.js
    │   ├── actor_hello.js
    │   └── actor_hello.wasm
    └── idl

    2 directories, 5 files

## Deploy the project

You cannot deploy the output from the `dfx build --check` command to a local canister execution environment or the Internet Computer mainnet. If you wanted to deploy this project, you would need to do the following:

-   Connect to the either the local canister execution environment or Internet Computer mainnet.

-   Register a connection-specific canister identifier.

-   Deploy the canister.

Let’s consider these steps in a bit more detail. Before you can deploy this project, you must connect to either your local canister execution environment, provided by `dfx`, or to the Internet Computer blockchain mainnet. After you connect to a local canister execution environment or Internet Computer mainnet, you must also generate a unique, **connection-specific** canister identifier to replace your locally-defined identifier. To see the steps involved for yourself, let’s deploy the project locally.

To deploy this project locally:

1.  Open a terminal and navigate to your project directory, if needed.

2.  Start the local canister execution environment on your local computer by running the following command:

        dfx start --background

    For this tutorial, you can use the `--background` option to start the local canister execution environment as background processes. With this option, you can continue to the next step without opening another terminal shell on your local computer.

3.  Generate a new canister identifier for your project on the local canister execution environment by running the following command:

        dfx canister create actor_hello

    You should see output similar to the following:

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "pubs-id" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Creating canister "actor_hello"...
        "actor_hello" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"

    The `dfx canister create` command also stores the connection-specific canister identifier in a `canister_ids.json` file in the `.dfx/local` directory.

    For example:

        {
          "actor_hello": {
            "local": "rrkah-fqaaa-aaaaa-aaaaq-cai"
          }
        }

4.  Build the canister by running the following command:

        dfx build

    The command displays output similar to the following:

        Building canisters...

5.  Deploy your `actor_hello` project on the local canister execution environment by running the following command:

        dfx canister install actor_hello

    The command displays output similar to the following:

        Installing code for canister actor_hello, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai

## Query the canister

You now have a canister deployed on your local canister execution environment and can test your canister by using the `dfx canister call` command.

To test the canister you have deployed on the local canister execution environment:

1.  Use `dfx canister call` to call the `hello` function by running the following command:

        dfx canister call actor_hello hello

2.  Verify that the command returns the text specified for the `hello` function along with a checkpoint message in the terminal running the local canister execution environment.

    For example, the canister displays "Hello, World from DFINITY" in output similar to the following:

        [Canister rrkah-fqaaa-aaaaa-aaaaq-cai] Hello, World from DFINITY

    Note that if you are running the Internet Computer mainnet in a separate terminal instead of in the background, the "Hello, World from DFINITY" message is displayed in the terminal that displays mainnet activity.

## Stop the local canister execution environment

After you finish experimenting with your canister, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local canister execution environment, you can:

1.  In the terminal used to interact with your canister, issue the command `dfx stop`; or

2.  In the terminal that displays operations from the local canister execution environment, press Control-C to interrupt that process; or

3.  Kill the `replica` process using commands or tools of your operating system.

4.  Stop the local canister execution environment by running the following command:

        dfx stop
-->
