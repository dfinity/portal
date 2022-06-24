# デフォルトプロジェクトを探索する

もし [クイックスタート](../../quickstart/hello10mins.md) の DFINITY Canister Software Development Kit (SDK) ツアーを始めているなら、すでに Internet Computer 上に Dapps を作成する基本ワークフローを見たことでしょう。ここでは今から新規プロジェクト作成時に、ワークスペースに追加されるデフォルトファイルとデフォルトフォルダを、詳しく見ていきましょう。

概要を掴めるように、コンピュータ上でローカルに Internet Computer を動かす開発のワークフローを以下の図に示しています。

![Development work flow](../_attachments/dev-workflow-explore.svg)

## 始める前に

このチュートリアルを始める前に、以下のことを確認してください:

- インターネット接続があり、macOS もしくは Linux コンピュータのシェルターミナルへアクセスできること

- もしプロジェクトのフロントエンド開発でデフォルトテンプレートファイルを取り込みたいのであれば、`node.js` を既にインストールしていること

- [ダウンロードとインストール](../../quickstart/local-quickstart#download-and-install) に記載されている SDK パッケージをダウンロードしてインストールをしていること

- IDE として Visual Studio Code を使用しているのであれば、[言語別エディタプラグインをインストールする](../../quickstart/local-quickstart#install-vscode) に記載されている Motoko 専用プラグインをインストールしていること

- ローカルコンピュータ上で走るすべてのローカル Canister 実行環境プロセスを止めていること

このチュートリアルの所要時間は２０分程度です。

## 新しいプロジェクトを作成する

[クイックスタート](../../quickstart/hello10mins.md) にも記載されている通り、Internet Computer での Dapps は、あなたが作る **プロジェクト** として始まります。コマンドライン（CLI）上で `dfx` コマンドを実行することでプロジェクトを作成することができます。

デフォルトでプロジェクトに含まれているファイルやフォルダを詳しく見るために、実際に新しいプロジェクトを作っていきましょう。

新しいプロジェクトを作る:

1.  ローカルコンピュータ上でターミナルシェルを、まだ開いていなければ開きます。

2.  別のワーキングフォルダを利用しているなら、Internet Computer プロジェクトで使うフォルダに移動します。

3.  以下のコマンドを実行して、新しいプロジェクトを作成します。

        dfx new explore_hello

    `dfx new explore_hello` コマンドは、新しいプロジェクト名直下のデフォルトプロジェクト構造と新しい Git リポジトリを含めた `explore_hello` プロジェクトを作成します。もし `node.js` をローカルにインストールしていれば、新規のプロジェクトを作成することでテンプレートフロントエンドコードと依存ライブラリも追加されます。

    JavaScript や Motoko または別の環境で、プロジェクト名が有効であることを保証するために、英数字とアンダースコアのみを使うべきです。ダッシュやいかなる特殊文字は、含めることができません。

4.  以下のコマンドを実行して、デフォルトディレクトリ構成を見ていきます。

        ls -l explore_hello

    デフォルトでのプロジェクトディレクトリ構成は、少なくとも１つのソースサブディレクトリ、テンプレート `README.md` ファイル、また `dfx.json` 設定ファイルを含んでいます。

    `node.js` をインストールしているかどうかで、以下のファイルを一部もしくは全て含んでいるかが変わります。

        explore_hello/
        ├── README.md      # デフォルトプロジェクトのドキュメント
        ├── dfx.json       # プロジェクトの設定ファイル
        ├── node_modules   # フロントエンド開発のライブラリ
        ├── package-lock.json
        ├── package.json
        ├── src            # ソースファイルディレクトリ
        │   ├── explore_hello
        │   │   └── main.mo
        │   └── explore_hello_assets
        │       ├── assets
        │       │   ├── logo.png
        │       │   ├── main.css
        │       │   └── sample-asset.txt
        │       └── src
        │           ├── index.html
        │           └── index.js
        └── webpack.config.js

    最小単位では、デフォルトプロジェクトのディレクトリは、以下のフォルダやファイルを含みます。

    - リポジトリのプロジェクトを説明する `README` ファイル

    - プロジェクトのオプションを設定する `dfx.json` 設定ファイル

    - Dapp に必要なすべてのソースファイルを持つ `src` ディレクトリ

    デフォルトの `src` ディレクトリは、テンプレートファイルである `main.mo` を含んでおり、ファイルを修正したり、自分のプログラミングロジックへと置き換えることができます。

このチュートリアルでは、始める上での基本に重点を置いているので、`main.mo` ファイルだけを使うことになります。もし `node.js` をインストールしているなら、プロジェクトディレクトリは、Dapp のフロントエンドインターフェースを定義するのに使える追加のファイルとディレクトリを含んでいます。フロントエンド開発と `assets` フォルダにあるテンプレートファイルについては、少し後に話します。

## デフォルト設定を確認する

デフォルトで、新しいプロジェクトを作成すると、プロジェクトディレクトリにいくつかのテンプレートファイルが追加されます。プロジェクトの設定をカスタマイズする、もしくは開発サイクルを加速するために自身のコードを取り込むのに、これらのテンプレートファイルを編集することができます。

プロジェクトのデフォルト設定ファイルを確認する:

1.  ローカルコンピュータ上でターミナルシェルを、まだ開いていなければ開きます。

2.  以下のコマンドを実行して、プロジェクトディレクトリに移動します。

        cd explore_hello

3.  デフォルト設定を確認するために、テキストエディタで `dfx.json` 設定ファイルを開きます。

    [こちら](../_attachments/sample-explore-dfx.json) のようになっているはずです。

    いくつかデフォルト設定を見ていきましょう。

    - `settings` セクションでは、プロジェクトの WebAssembly モジュールの名前を指定します。今回は `explore_hello` になります。

    - `canisters.explore_hello` キーは、メイン設定に指定されたパス上に、コンパイルされるメインプログラムが位置していることを明記しています、今回のケースでは、`src/explore_hello/main.mo` と `type` 設定が、これは `Motoko` プログラムであることを示しています。

    - `canisters.explore_hello_assets` キーは、プロジェクトのフロントエンドアセットの詳細設定を指定します。今、こちらは飛ばしましょう。

    - `dfx` 設定は、プロジェクト作成時のソフトウェアバージョンを識別するのに使われます。

    - `networks` セクションは、あなたがつなげているネットワーク情報を指定します。デフォルトの設定では、ローカル Canister 実行環境は、ローカルホストアドレス `127.0.0.1` と ポート番号を `8000` に結びついています。

      もし別の Internet Computer ネットワークプロバイダへのアクセスできるのであれば、`networks` セクションは、そのプロバイダ接続を行うネットワークエイリアスと URLs を持ちます。

    デフォルト設定のままにすることもできます。

4.  `dfx.json` ファイルを閉じて、次に進みます。

## デフォルトプログラムコードを確認する

新しいプロジェクトは、常にテンプレート `main.mo` ソースコードファイルを含んでいます。開発サイクルを加速する自身のコードを埋め込むために、このファイルを編集することができます。

Motoko プログラミング言語を使った Dapp を作るスタート地点として、`main.mo` デフォルトテンプレートファイルのサンプルプログラムを見ていきましょう。

プロジェクトのデフォルトサンプルプログラムを確認する:

1.  以下のコマンドを実行して、プロジェクトでのあなたの現在地を確認しましょう。

        pwd

2.  テキストエディタで `src/explore_hello/main.mo` ファイルを開き、テンプレートのコードを確認します。

        actor {
            public func greet(name : Text) : async Text {
                return "Hello, " # name # "!";
            };
        };

    このプログラムのキーとなるいくつかの要素を見ていきましょう。

    - このサンプルコードは、ある一部のプログラミング言語が必要とする `main` 関数の代わりに `actor` を定義しているのに気づいたかもしれません。Motoko では、`main` 関数はそのファイル単体では動作しません。

    - 伝統的な "Hello, World!" プログラムは、`print` または `println` 関数を使って文字列を表示する方法を説明しますが、その伝統的なプログラムは、Internet Computer 上で動く Motoko Dapps の典型的なユースケースを提示することはしないでしょう。

    - print 関数の代わりに、このサンプルプログラムは、`Text` 型の `name` 引数を受けるパブリックの `greet` 関数を用いて `actor` を定義します。

    - そのプログラムは、`"Hello, "`、`#` 演算子、`name` 引数、また `"!"` を連結した文字列から成る非同期メッセージを返すことをを示すのに `async` キーワードを使います。

    `actor` オブジェクトと非同期メッセージ処理を使用するコードを探検するのは、もう少し後になります。今は次のセクションに進みましょう。

3.  `main.mo` ファイルを閉じて、次に進みます。

## ローカル Canister 実行環境を起動する

デフォルトプロジェクトをデプロイする前に、ローカル Canister 環境もしくは Internet Computer ブロックチェーンメインネットに接続する必要があります。

ローカル Canister 実行環境を起動するには、`dfx.json` ファイルが必要になります、そのため現在地がプロジェクトのルートディレクトリ直下であることを確認してください。このチュートリアルでは、分離している２つのターミナルシェルを開いておくと良いです。１つのターミナルシェルでネットワーク処理を行い、もう１つの方でプロジェクトを管理するのが良いです。

ローカル Canister 実行環境を起動する:

1.  新しいターミナルウィンドウまたは新しいターミナルタブを、ローカルコンピュータ上で開きます。

2.  必要であればプロジェクトのルートディレクトリ直下に移動します。

    - **２つのターミナル** を開いておくと良いです。

    - **現在のワーキングディレクトリ** を、**プロジェクトディレクトリ** としておくと良いです。

3.  以下のコマンドを実行して、ローカル Cansiter 実行環境を起動します。

        dfx start

    プラットフォームやローカルセキュリティ設定によっては、警告の表示が出るかもしれません。もしネットワーク接続の許可もしくは拒否の選択を促されているなら、**Allow** をクリックしましょう。

    ローカル Canister 実行環境を起動した後は、ネットワーク処理を表示するターミナルとプロジェクトに関連したタスクを表示するもう１つのターミナルを持つことになります。

4.  ネットワーク処理を表示するターミナルはそのままにしておいて、新しく作成したプロジェクトの場所を表示するターミナルに重点を置き変えます。

## Canister ID を登録する

ローカル Canister 実行環境に接続した後に、あなたのプロジェクトをユニークなネットワーク固有の **Canister ID** を生成することでネットワークに登録できます。

[クイックスタート](../../quickstart/hello10mins.md) では、このステップは `dfx deploy` コマンドワークフローの一部として扱われました。このチュートリアルでは、独立してそれぞれの処理をどう扱うかを説明します。

ローカルネットワークに対して Canister ID を登録する:

1.  プロジェクトディレクトリに位置することを確認します、必要であれば移動します。

2.  以下のコマンドを実行して、プロジェクトの Canister に対しユニークな Canister ID を登録します。

        dfx canister create --all

    そのコマンドは `dfx.json` 環境設定ファイルで定義される Canisters のネットワーク固有の Canister ID を表示します。

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "pubs-id" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Creating canister "explore_hello"...
        "explore_hello" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"
        Creating canister "explore_hello_assets"...
        "explore_hello_assets" canister created with canister id: "ryjl3-tyaaa-aaaaa-aaaba-cai"

    ローカル Canister 実行環境に接続したので、これらの Canister ID は、ローカルでのみ有効かつ `.dfx/local/canister_ids.json` ファイルに保管されます。

    例:

        {
          "explore_hello": {
            "local": "rrkah-fqaaa-aaaaa-aaaaq-cai"
          },
          "explore_hello_assets": {
            "local": "ryjl3-tyaaa-aaaaa-aaaba-cai"
          }
        }

## Dapp をビルドする

デフォルト環境設定やプログラムコードを探検して、ローカル Canister 実行環境を動かしてきたので、デフォルトプログラムを実行可能な WebAssembly モジュールにコンパイルしましょう。

プログラムを実行可能にビルドする:

1.  ローカルコンピューターのターミナルシェルで `explore_hello` プロジェクトディレクトリに移動します。

    そのプロジェクトディレクトリ構成の内側から `dfx build` コマンドを実行する必要があります。

2.  以下のコマンドを実行して、Canister を実行可能にビルドします。

        dfx build

    以下のような出力が表示されるでしょう。

        Building canisters...
        Building frontend...

    ローカル canister 実行環境に接続されたので、`dfx build` コマンドは、プロジェクトの `.dfx/local/` ディレクトリ直下に `canisters` ディレクトリを追加します。

3.  以下のコマンドを実行して、`dfx build` コマンドで作成された `.dfx/local/canisters/explore_hello` ディレクトリが WebAssembly や関連アプリケーションファイルを含んでいることを確認します。

        ls -l .dfx/local/canisters/explore_hello/

    例えば、そのコマンドは以下のような出力を返します。

        -rw-r--r--  1 pubs  staff     178 Apr  6 14:25 explore_hello.d.ts
        -rw-r--r--  1 pubs  staff      41 Apr  6 14:25 explore_hello.did
        -rw-r--r--  1 pubs  staff     155 Apr  6 14:25 explore_hello.did.js
        -rw-r--r--  1 pubs  staff     142 Apr  6 14:25 explore_hello.js
        -rw-r--r--  1 pubs  staff  157613 Apr  6 14:25 explore_hello.wasm

    `canisters/explore_hello` ディレクトリは、以下のキーとなるファイルを含みます。

    - メイン Dapp のインターフェースの説明を持っている `explore_hello.did` ファイル

    - Dapp の関数の Canister インターフェースの JavaScript 表示を持っている `explore_hello.did.js` ファイル

    - Dapp の Canister インターフェースの JavaScript 表示を持っている `explore_hello.js` ファイル

    - プロジェクトで使用されるコンパイルされた WebAssembly のアセットを持っている `explore_hello.wasm` ファイル

    `canisters/explore_hello_assets` ディレクトリは、プロジェクトのフロントエンドアセットを表示するファイルを含みます。

    `canisters/explore_hello` や `canisters/explore_hello_assets` ディレクトリにあるファイルに加えて、`dfx build` コマンドは、`idl` ディレクトリを作成します。

4.  `src/declarations` というディレクトリが作成されたことを確認します。

    このフォルダは Wasm を除いた `.dfx/local` のフォルダのコピーを含みます。そのコピーはどんな秘密も含まないので、これらのファイルと一緒に残りのソースコードをコミットすることを薦めます。

## ローカルでプロジェクトをデプロイする

`dfx build` コマンドでプロジェクトの Canister ディレクトリに加工されたものを作成するのを見たことでしょう。Internet Computer ネットワーク上に Dapp をデプロイするためには、WebAssembly モジュールと `canister_manifest.json` ファイルが必要になります。

ローカル Canister 実行環境をデプロイする:

1.  ローカルコンピューターの `explore_hello` プロジェクトディレクトリにターミナルシェルで移動します。

2.  以下のコマンドを実行して、ローカルネットワークに `explore_hello` プロジェクトをデプロイします。

        dfx canister install --all

    そのコマンドは、以下のような出力を表示します。

        Installing code for canister explore_hello, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
        Installing code for canister explore_hello_assets, with canister_id ryjl3-tyaaa-aaaaa-aaaba-cai
        Authorizing our identity (pubs-id) to the asset canister...
        Uploading assets to asset canister...
          /index.html 1/1 (480 bytes)
          /index.js 1/1 (296836 bytes)
          /main.css 1/1 (484 bytes)
          /sample-asset.txt 1/1 (24 bytes)
          /logo.png 1/1 (25397 bytes)
          /index.js.map 1/1 (964679 bytes)
          /index.js.LICENSE.txt 1/1 (499 bytes)

3.  `dfx canister call` コマンドを実行して、Dapp を指定して関数を呼び出します。

        dfx canister call explore_hello greet '("everyone": text)'

    このコマンドは、以下を指定します:

    - `explore_hello` は、コールしたい スマートコントラクト Canister もしくは Dapp の名前

    - `greet` は、コールした意特定の関数

    - `everyone` は、`greet` 関数に渡す引数

4.  そのコマンドが、`greet` 関数の返り値を表示するのを確認します。

    例:

        ("Hello, everyone!")

## デフォルトのフロントエンドを確認する

もし開発環境に `node.js` をインストールしているのであれば、あなたのプロジェクトは、ブラウザで Dapp にアクセスするのに `index.js` JavaScript ファイルを使う単純なフロントエンドの例を含んでいます。

デフォルトのフロントエンドテンプレートを探検する:

1.  ローカルコンピューターでターミナルシェルを開いていなければ開き、また `explore_hello` プロジェクトディレクトリに移動します。

2.  テキストエディタで `src/explore_hello_assets/src/index.js` ファイルを開き、テンプレートスクリプトのコードを確認します。

        import { explore_hello } from "../../declarations/explore_hello";

        document.getElementById("clickMeBtn").addEventListener("click", async () => {
          const name = document.getElementById("name").value.toString();
          // Interact with explore_hello actor, calling the greet method
          const greeting = await explore_hello.greet(name);

          document.getElementById("greeting").innerText = greeting;
        });

    テンプレート `index.js` は、新しく作成した `declarations` ディレクトリから `explore_hello` エージェントをインポートします。そのエージェントは、自動的に `Main.mo` で作成したインターフェースと親和性があるように構成され、ユーザーが `greeting` ボタンをクリックした時に `AnonymousIdentity` を使って Canister にコールします。

    このファイルはテンプレート `index.html` ファイルと組み合わせて、`greet` 関数の画像アセット、入力欄、ボタンを備えた HTML ページを表示するよう機能します。

3.  `index.js` ファイルを閉じて、次に進みます。

4.  以下のコマンドを実行して、プロジェクトのフロントエンドアセットを確認します。

        ls -l .dfx/local/canisters/explore_hello_assets/

    そのコマンドは、以下のような出力を表示します。

        drwxr-xr-x  9 pubs  staff     288 Apr  6 14:25 assets
        -r--r--r--  1 pubs  staff    2931 Dec 31  1969 assetstorage.did
        -r--r--r--  1 pubs  staff  265823 Dec 31  1969 assetstorage.wasm
        -rw-r--r--  1 pubs  staff    3651 Apr  6 14:25 explore_hello_assets.d.ts
        -rw-rw-rw-  1 pubs  staff    2931 Dec 31  1969 explore_hello_assets.did
        -rw-r--r--  1 pubs  staff    4236 Apr  6 14:25 explore_hello_assets.did.js
        -rw-r--r--  1 pubs  staff     149 Apr  6 14:25 explore_hello_assets.js
        -rw-rw-rw-  1 pubs  staff  265823 Dec 31  1969 explore_hello_assets.wasm

    node モジュールと `index.js` ファイルテンプレートを使う `dfx build` コマンドによって、これらのファイルは自動的に作成されます。

5.  `npm start` コマンドで開発サーバーを起動します。

6.  ブラウザを開き、 `local` ネットアドレスとポート番号を `+127.0.0.1:8080` に指定します。

7.  サンプルアプリケーションの HTML ページが見えることを確認します。

    例:

    ![Sample HTML entry page](../_attachments/explore-hello.png)

8.  あいさつを打ち込みます、それから **Click Me** をクリックすることで、あいさつが返されます。

    例:

    ![Return the name argument](../_attachments/greeting.png)

## ローカル Canister 実行環境を止める

Dapp を使った実験を終えたら、ローカル Canister 実行環境を、バックグラウンドで動かし続けないために止めます。

ローカル Canister 実行環境を止める:

1.  ネットワーク処理を表示するターミナルで、ローカルネットワークでのプロセスを中断するために Control-C を押します。

2.  以下のコマンドを実行することで、ローカル Canister 実行環境を止めます。

        dfx stop

<!--
# Explore the default project

If you started your tour of the SDK with the [Quick start](../../quickstart/hello10mins.md), you have already seen the basic work flow for creating dapps that run on the Internet Computer. Now, let’s take a closer look at that work flow by exploring the default files and folders that are added to your workspace when you create a new project.

As a preview, the following diagram illustrates the development work flow when running the Internet Computer locally on you computer.

![Development work flow](../_attachments/dev-workflow-explore.svg)

## Before you begin

Before you start this tutorial, verify the following:

-   You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

-   You have `node.js` installed if you want to include the default template files for frontend development in your project.

-   You have downloaded and installed the SDK package as described in [Download and install](../../quickstart/local-quickstart#download-and-install).

-   You have installed the Visual Studio Code plugin for Motoko as described in [Install the language editor plug-in](../../quickstart/local-quickstart#install-vscode) if you are using Visual Studio Code as your IDE.

-   You have stopped any local canister execution environment processes running on the local computer.

This tutorial takes approximately 20 minutes to complete.

## Create a new project

As discussed in the [Quick start](../../quickstart/hello10mins.md), dapps for the Internet Computer start as **projects** that you create. You can create projects using the `dfx` executable command-line interface (CLI).

To take a closer look at the files and folders that are included in a project by default, let’s create a new project to work with.

To create a new project:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Navigate to the folder you are using for your Internet Computer projects, if you are using a separate working folder.

3.  Create a new project by running the following command:

        dfx new explore_hello

    The `dfx new explore_hello` command creates a new `explore_hello` project, including a default project directory structure under the new project name and a new Git repository for your project. If you have `node.js` installed locally, creating a new project also adds some template frontend code and dependencies.

    To ensure that project names are valid when used in JavaScript, Motoko, and other contexts, you should only use alphanumeric characters and underscores. You cannot include dashes or any special characters.

4.  View the default directory structure by running the following command:

        ls -l explore_hello

    By default, the project directory structure includes at least one source subdirectory, a template `README.md` file, and a default `dfx.json` configuration file.

    Depending on whether you have `node.js` installed, your project directory might include some or all of the following files:

        explore_hello/
        ├── README.md      # default project documentation
        ├── dfx.json       # project configuration file
        ├── node_modules   # libraries for frontend development
        ├── package-lock.json
        ├── package.json
        ├── src            # source files directory
        │   ├── explore_hello
        │   │   └── main.mo
        │   └── explore_hello_assets
        │       ├── assets
        │       │   ├── logo.png
        │       │   ├── main.css
        │       │   └── sample-asset.txt
        │       └── src
        │           ├── index.html
        │           └── index.js
        └── webpack.config.js

    At a minimum, the default project directory includes the following folders and files:

    -   A default `README` file for documenting your project in the repository.

    -   A default `dfx.json` configuration file to set configurable options for your project.

    -   A default `src` directory for all of the source files required by your dapp.

    The default `src` directory includes a template `main.mo` file that you can modify or replace to include your core programming logic.

    Because this tutorial focuses on the basics of getting started, you are only going to use the `main.mo` file. If you have `node.js` installed, your project directory includes additional files and directories that you can use to define the frontend interface for your dapp. Frontend development and the template files in the `assets` folder are discussed a little later.

## Review the default configuration

By default, creating a new project adds some template files to your project directory. You can edit these template files to customize the configuration settings for your project and to include your own code to speed up the development cycle.

To review the default configuration file for your project:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Change to your project directory by running the following command:

        cd explore_hello

3.  Open the `dfx.json` configuration file in a text editor to review the default settings.

    It may look like [this](../_attachments/sample-explore-dfx.json).

    Let’s take a look at a few of the default settings.

    -   The `settings` section specifies the name of the WebAssembly module for your `explore_hello` project is `explore_hello`.

    -   The `canisters.explore_hello` key specifies that the main program to be compiled is located in the path specified by the `main` setting, in this case, `src/explore_hello/main.mo` and the `type` setting indicates that this is a `motoko` program.

    -   The `canisters.explore_hello_assets` key specifies configuration details about frontend assets for this project. Let’s skip those for now.

    -   The `dfx` setting is used to identify the version of the software used to create the project.

    -   The `networks` section specifies information about the networks to which you connect. The default settings bind the local canister execution environment to the local host address `127.0.0.1` and port `8000`.

        If you have access to other Internet Computer network providers, the `networks` section can include network aliases and URLs for connecting to those providers.

    You can leave the default settings as they are.

4.  Close the `dfx.json` file to continue.

## Review the default program code

New projects always include a template `main.mo` source code file. You can edit this file to include your own code to speed up the development cycle.

Let’s take a look at the sample program in the default `main.mo` template file as a starting point for creating simple dapp using the Motoko programming language.

To review the default sample program for your project:

1.  Check that you are still in your project directory by running the following command:

        pwd

2.  Open the `src/explore_hello/main.mo` file in a text editor and review the code in the template:

        actor {
            public func greet(name : Text) : async Text {
                return "Hello, " # name # "!";
            };
        };

    Let’s take a look at a few key elements of this program:

    -   You might notice that this sample code defines an `actor` instead of a `main` function, which some programming languages require. For Motoko, the `main` function is implicit in the file itself.

    -   Although the traditional "Hello, World!" program illustrates how you can print a string using a `print` or `println` function, that traditional program would not represent a typical use case for Motoko dapps that run on the Internet Computer.

    -   Instead of a print function, this sample program defines an `actor` with a public `greet` function that takes a `name` argument with a type of `Text`.

    -   The program then uses the `async` keyword to indicate that the program returns an asynchronous message consisting of a concatenated text string constructed using `"Hello, "`, the `#` operator, the `name` argument, and `"!"`.

    We’ll explore code that uses `actor` objects and asynchronous message handling more a little later. For now, you can continue to the next section.

3.  Close the `main.mo` file to continue.

## Start the local canister execution environment

Before you can deploy the default project, you need to connect to either the local canister execution environment, or to the Internet Computer blockchain mainnet.

Starting the local canister execution environment requires a `dfx.json` file, so you should be sure you are in your project’s root directory. For this tutorial, you should have two separate terminal shells, so that you can start and see network operations in one terminal and manage your project in another.

To start the local canister execution environment:

1.  Open a new terminal window or a new terminal tab on your local computer.

2.  Navigate to the root directory for your project, if necessary.

    -   You should now have **two terminals** open.

    -   You should have the **project directory** as your **current working directory**.

3.  Start the local canister execution environment by running the following command:

        dfx start

    Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

    After you start the local canister execution environment, you have one terminal that displays messages about network operations and another for performing project-related tasks.

4.  Leave the terminal that displays network operations open and switch your focus to the terminal where you created your new project.

## Register canister identifiers

After you connect to the local canister execution environment, you can register with the network to generate unique, network-specific **canister identifiers** for your project.

In the [Quick start](../../quickstart/hello10mins.md) tutorial, this step was performed as part of the `dfx deploy` command work flow. This tutorial demonstrates how to perform each of the operations independently.

To register canister identifiers for the local network:

1.  Check that you are still in your project directory, if needed.

2.  Register unique canister identifiers for the canisters in the project by running the following command:

        dfx canister create --all

    The command displays the network-specific canister identifiers for the canisters defined in the `dfx.json` configuration file.

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "pubs-id" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Creating canister "explore_hello"...
        "explore_hello" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"
        Creating canister "explore_hello_assets"...
        "explore_hello_assets" canister created with canister id: "ryjl3-tyaaa-aaaaa-aaaba-cai"

    Because you are connected to the local canister execution environment, these canister identifiers are only valid locally and are stored for the project in the `.dfx/local/canister_ids.json` file.

    For example:

        {
          "explore_hello": {
            "local": "rrkah-fqaaa-aaaaa-aaaaq-cai"
          },
          "explore_hello_assets": {
            "local": "ryjl3-tyaaa-aaaaa-aaaba-cai"
          }
        }

## Build the dapp

Now that you have explored the default configuration settings and program code and have started the local canister execution environment, let’s compile the default program into an executable WebAssembly module.

To build the program executable:

1.  In the terminal shell on your local computer, navigate to your `explore_hello` project directory.

    You must run the `dfx build` command from within the project directory structure.

2.  Build the executable canister by running the following command:

        dfx build

    You should see output similar to the following:

        Building canisters...
        Building frontend...

    Because you are connected to the local canister execution environment, the `dfx build` command adds the `canisters` directory under the `.dfx/local/` directory for the project.

3.  Verify that the `.dfx/local/canisters/explore_hello` directory created by the `dfx build` command contains the WebAssembly and related application files by running the following command.

        ls -l .dfx/local/canisters/explore_hello/

    For example, the command returns output similar to the following:

        -rw-r--r--  1 pubs  staff     178 Apr  6 14:25 explore_hello.d.ts
        -rw-r--r--  1 pubs  staff      41 Apr  6 14:25 explore_hello.did
        -rw-r--r--  1 pubs  staff     155 Apr  6 14:25 explore_hello.did.js
        -rw-r--r--  1 pubs  staff     142 Apr  6 14:25 explore_hello.js
        -rw-r--r--  1 pubs  staff  157613 Apr  6 14:25 explore_hello.wasm

    The `canisters/explore_hello` directory contains the following key files:

    -   The `explore_hello.did` file contains an interface description for your main dapp.

    -   The `explore_hello.did.js` file contains a JavaScript representation of the canister interface for the functions in your dapp.

    -   The `explore_hello.js` file contains a JavaScript representation of the canister interface for your dapp.

    -   The `explore_hello.wasm` file contains the compiled WebAssembly for the assets used in your project.

    The `canisters/explore_hello_assets` directory contains similar files to describe the frontend assets associated with your project.

    In addition to the files in the `canisters/explore_hello` and the `canisters/explore_hello_assets` directories, the `dfx build` command creates an `idl` directory.

4.  Verify that a new folder has been created, `src/declarations`.

    This folder will include copies of the folders from `.dfx/local`, except for the wasm. They do not contain any secrets, and we recommend committing these files along with the rest of your source code.

## Deploy the project locally

You’ve seen that the `dfx build` command creates several artifacts in a `canisters` directory for your project. The WebAssembly modules and the `canister_manifest.json` file are required for your dapp to be deployed on the Internet Computer network.

To deploy to the local canister execution environment:

1.  In a terminal shell on your local computer, navigate to your `explore_hello` project directory.

2.  Deploy your `explore_hello` project on the local network by running the following command:

        dfx canister install --all

    The command displays output similar to the following:

        Installing code for canister explore_hello, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
        Installing code for canister explore_hello_assets, with canister_id ryjl3-tyaaa-aaaaa-aaaba-cai
        Authorizing our identity (pubs-id) to the asset canister...
        Uploading assets to asset canister...
          /index.html 1/1 (480 bytes)
          /index.js 1/1 (296836 bytes)
          /main.css 1/1 (484 bytes)
          /sample-asset.txt 1/1 (24 bytes)
          /logo.png 1/1 (25397 bytes)
          /index.js.map 1/1 (964679 bytes)
          /index.js.LICENSE.txt 1/1 (499 bytes)

3.  Run the `dfx canister call` command and specify the dapp and function to call by running the following command:

        dfx canister call explore_hello greet '("everyone": text)'

    This command specifies:

    -   `explore_hello` as the name of the *canister* or dapp you want to call.

    -   `greet` as the specific *method* or function you want to call.

    -   `everyone` as the argument to pass to the `greet` function.

4.  Verify the command displays the return value of the `greet` function.

    For example:

        ("Hello, everyone!")

## View the default frontend

If you have `node.js` installed in your development environment, your project includes a simple frontend example that uses a template `index.js` JavaScript file for accessing the `explore_hello` dapp in a browser.

To explore the default frontend template:

1.  Open a terminal shell on your local computer, if you don’t already have one open, and navigate to your `explore_hello` project directory.

2.  Open the `src/explore_hello_assets/src/index.js` file in a text editor and review the code in the template script:

        import { explore_hello } from "../../declarations/explore_hello";

        document.getElementById("clickMeBtn").addEventListener("click", async () => {
          const name = document.getElementById("name").value.toString();
          // Interact with explore_hello actor, calling the greet method
          const greeting = await explore_hello.greet(name);

          document.getElementById("greeting").innerText = greeting;
        });

    The template `index.js` imports an `explore_hello` agent from our newly created `declarations` directory. The agent is automatically configured to interact with the interface we created in `Main.mo`, and makes calls to our canister using an `AnonymousIdentity` when the user clicks the `greeting` button.

    This file works in conjunction with the template `index.html` file to display an HTML page with an image asset, input field, and button for the `greet` function.

3.  Close the `index.js` file to continue.

4.  View the frontend assets created for the project by running following command:

        ls -l .dfx/local/canisters/explore_hello_assets/

    The command displays output similar to the following:

        drwxr-xr-x  9 pubs  staff     288 Apr  6 14:25 assets
        -r--r--r--  1 pubs  staff    2931 Dec 31  1969 assetstorage.did
        -r--r--r--  1 pubs  staff  265823 Dec 31  1969 assetstorage.wasm
        -rw-r--r--  1 pubs  staff    3651 Apr  6 14:25 explore_hello_assets.d.ts
        -rw-rw-rw-  1 pubs  staff    2931 Dec 31  1969 explore_hello_assets.did
        -rw-r--r--  1 pubs  staff    4236 Apr  6 14:25 explore_hello_assets.did.js
        -rw-r--r--  1 pubs  staff     149 Apr  6 14:25 explore_hello_assets.js
        -rw-rw-rw-  1 pubs  staff  265823 Dec 31  1969 explore_hello_assets.wasm

    These files were generated automatically by the `dfx build` command using node modules and the template `index.js` file.

5.  Start a development server with `npm start`.

6.  Open a browser and navigate to the `local` network address and port number—`+127.0.0.1:8080`

7.  Verify that you see the HTML page for the sample application.

    For example:

    ![Sample HTML entry page](../_attachments/explore-hello.png)

8.  Type a greeting, then click **Click Me** to return the greeting.

    For example:

    ![Return the name argument](../_attachments/greeting.png)

## Stop the local canister execution environment

After you finish experimenting with your dapp, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local canister execution environment:

1.  In the terminal that displays network operations, press Control-C to interrupt the local network process.

2.  Stop the local canister execution environment by running the following command:

        dfx stop

-->
