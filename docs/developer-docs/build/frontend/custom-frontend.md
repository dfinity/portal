# フロントエンドをカスタマイズする

シンプルな Dapp の作成、ビルド、デプロイの基本的な方法を理解しデフォルトのプロジェクトファイルとサンプルのフロントエンドにも慣れたところで、プロジェクトのフロントエンドのユーザーエクスペリエンスをカスタマイズするさまざまな方法を試してみたくなったのではないでしょうか。

このチュートリアルでは、 React フレームワークを使って、デフォルトのサンプル Dapp の新しいフロントエンドを作成し、表示されるインターフェイスをカスタマイズするための基本的な修正方法を説明します。 後のチュートリアルでは、ここで紹介したテクニックをさらに発展させていきますが、CSS 、HTML 、JavaScript 、React や他のフレームワークを使ってユーザーインターフェースを構築する方法をすでに知っている場合は、このチュートリアルを読み飛ばしても構いません。

このチュートリアルでは、React フレームワークを使用して、 Canister スマートコントラクトの Document Object Model (DOM) を管理する方法を説明します。 React には独自のカスタム DOM 構文があるため、 JSX で書かれたフロントエンドコードをコンパイルするためには、 webpack の設定を変更する必要があります。React と JSX の使い方の学習については、 [React のウェブサイト](https://reactjs.org/) の [Getting start](https://reactjs.org/docs/getting-started.html) を参照してください。

## 始める前に

チュートリアルを始める前に、以下のことを確認してください：

- フロントエンド開発のために `node.js` がインストールされており、プロジェクトで `npm install` を使用してパッケージをインストールすることができること。 ローカルのオペレーティングシステムやパッケージマネージャに node をインストールする方法については、[Node](https://nodejs.org/en/) のウェブサイトを参照してください。

- SDK パッケージを [ダウンロード＆インストール](../../quickstart/local-quickstart#download-and-install) からダウンロードしてインストールする。

- IDE として Visual Studio Code を使用している場合、 [言語編集プラグインのインストール](../../quickstart/local-quickstart#install-vscode) で説明されているように、Motoko の Visual Studio Code プラグインがインストールされていること。

- ローカルコンピュータ上で実行されている SDK プロセスをすべて停止していること。

このチュートリアルでは、SDK のバージョン `0.8.0` 以降を使用する必要があります。

このチュートリアルは約 30 分で終了します。

## 新しいプロジェクト生成

カスタムフロントエンド Dapp 用の新しいプロジェクトディレクトリを作成する：

1.  ローカルコンピューターでターミナルシェルを開きます（まだ開いていない場合）。

2.  Internet Computer プロジェクトで使用しているフォルダがあれば、そのフォルダに変更します。

3.  以下のコマンドを実行して、ローカルに `node.js` がインストールされていることを確認します：

        which node
        which npm

    もし `node.js` がインストールされていない場合は、次のステップに進む前にダウンロードしてインストールする必要があります。 お使いのローカル OS やパッケージマネージャーに合わせて node をインストールする方法については、 [Node](https://nodejs.org/en/) のウェブサイトをご覧ください。

4.  次のコマンドを実行して、新しいプロジェクトを作成します：

        dfx new custom_greeting

    `dfx new custom_greeting` コマンドは、新しい `custom_greeting` プロジェクトを作成します。

5.  以下のコマンドを実行して、プロジェクト・ディレクトリに移動します：

        cd custom_greeting

## React フレームワークのインストール

これまで React を使ったことがない場合は、フロントエンドのコードを編集する前に、[React イントロダクション](https://reactjs.org/tutorial/tutorial.html) チュートリアルや [React ウェブサイト](https://reactjs.org/) を調べてみるといいでしょう。

必要なフレームワークモジュールをインストールする：

1.  以下のコマンドを実行して、 React モジュールをインストールします：

        npm install --save react react-dom

2.  以下のコマンドを実行して、必要な TypeScript 言語のコンパイラ・ローダをインストールします：

        npm install --save-dev typescript ts-loader

    これらのモジュールをインストールする代わりに、デフォルトの `package.json` ファイルを編集して、[こちら](../_attachments/custom-frontend-package.json) のようにプロジェクトの依存関係を追加することができます。

## 初期設定の確認

このチュートリアルで React を使用するための変更を行う前に、プロジェクトの `dfx.json` 設定ファイルにあるデフォルトのフロントエンド設定を確認しましょう。

デフォルトの `dfx.json` 設定ファイルを確認するには以下の様にします：

1.  設定ファイル `dfx.json` をテキストエディターで開きます。

2.  また、 `canisters` キーには、 `custom_greeting_assets` Canister の設定が含まれています。

        {
          "canisters": {
            ...

            "custom_greeting_assets": {
              "dependencies": [
                "custom_greeting"
              ],
              "frontend": {
                "entrypoint": "src/custom_greeting_assets/src/index.html"
              },
              "source": [
                "src/custom_greeting_assets/assets",
                "dist/custom_greeting_assets/"
              ],
              "type": "assets"
            }
          }
        }

    このセクションの設定を見てみましょう。

    - プロジェクトのフロントエンドアセットは、独自の Canister にコンパイルされます。ここでは、 `custom_greeting_assets` という名前の Canister になります。

    - アセット Canister は、プロジェクトの メイン Canister にデフォルトで依存しています。

    - `frontend.entrypoint` は、 Dapp のエントリーポイントとして使用するファイル（ここでは、 `index.html` ファイル）のパスを指定します。 たとえば、カスタムの `first-page.html` ファイルのように、別のエントリーポイントがある場合には、この設定を変更します。

    - `source` の設定では、 `src` と `dist` のディレクトリのパスを指定します。 `src` 設定は、プロジェクトをビルドするアセット Canister に含まれる静的アセットに使用するディレクトリを指定します。 カスケードスタイルシート (CSS ) や JavaScript のカスタムファイルがある場合は、このパスで指定されたフォルダにインクルードします。 プロジェクトをビルドすると、 `dist` の設定で指定したディレクトリからプロジェクトのアセットが提供されます。

    - `type` の設定は、 `custom_greeting_assets` が、 [certified asset canister](https://github.com/dfinity/certified-assets) を使用することを指定します。この Canister には、 IC 上に静的アセットをホストするために必要なものがすべて付属しています。

    このチュートリアルでは、 React の JavaScript を `index.jsx` ファイルに追加しますが、そのためには `dfx.json` ファイルのデフォルト設定を変更する必要はありません。

3.  続けるには、 `dfx.json` ファイルを閉じてください。

## デフォルトのフロントエンドファイルの確認

このチュートリアルでは、カスタムフロントエンドを使って、デフォルトの `main.mo` Canister を呼び出すことになっています。 しかし、変更を加える前に、プロジェクトのデフォルトのフロントエンドファイルに何があるかを見てみましょう。

デフォルトのデフォルトのフロントエンドファイルを確認するには以下のようにします：

1.  テキストエディタで `src/custom_greeting_assets/src/index.html` ファイルを開きます。

    このテンプレートファイルは、 `dfx.json` ファイルの `frontend.entrypoint` 設定で指定された Dapp のデフォルトのフロントエンドエントリーポイントとなります。

    このファイルは標準的な HTML で、 `src/custom_greeting_assets/assets` ディレクトリにある CSS ファイルと画像への参照を含んでいます。 デフォルトの `index.html` ファイルには、 `name` 引数の入力フィールドとクリック可能なボタンを表示するための標準的な HTML 構文も含まれています。

    これは、 [デフォルトのフロントエンドを確認する](../backend/explore-templates#default-frontend) で見たのと同じデフォルトのフロントエンドです。

2.  テキストエディターで、 `src/custom_greeting_assets/src/index.js` ファイルを開きます。

        import { custom_greeting } from "../../declarations/custom_greeting";

        document.getElementById("clickMeBtn").addEventListener("click", async () => {
          const name = document.getElementById("name").value.toString();
          // custom_greetingアクターを動かしてgreetメソッドを呼び出す
          const greeting = await custom_greeting.greet(name);

          document.getElementById("greeting").innerText = greeting;
        });

    - `import` ステートメントは、 `”../declarations"` から `custom_greeting` Canister への呼び出しを可能にする Actor を指しています。

    - declarations はまだ作成されていませんが、それについてはまた改めて説明します。

3.  続けるには `index.js` ファイルを閉じてください。

## フロントエンドファイルの修正

これで、デフォルトの Dapps に新しいフロントエンドを作成する準備が整いました。

フロントエンドのファイルを準備するために：

1.  テキストエディターで、 webpack の設定ファイル (`webpack.config.js`) を開きます。

2.  フロントエンドのエントリーを変更して、デフォルトの `index.html` を `index.jsx` に置き換えます。

        entry: {
          //frontend.entrypoint は、このビルドの HTML ファイルを指しているので
          //拡張子を `.js` に変更する必要があります。
          index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx"),
        },

3.  以下の `module` キーを `plugins` セクションの上に追加します：

        module: {
          rules: [
            { test: /\.(js|ts)x?$/, loader: "ts-loader" }
          ]
        },

    この設定は、プロジェクトが React JavaScript の `index.jsx` ファイルに `ts-loader` コンパイラーを使用することを可能にします。 デフォルトの `webpack.config.js` ファイルにはコメントされたセクションがあり、これを修正して `module` キーを追加することができることに注意してください。

4.  プロジェクトのルートディレクトリに、 `tsconfig.json` という名前の新規ファイルを作成します。

5.  テキストエディターで `tsconfig.json` ファイルを開き、[こちらのコード](../_attachments/sample-tsconfig.json) をコピーしてファイルに貼り付けます：

6.  変更内容を保存し、 `tsconfig.json` ファイルを閉じて次に進みます。

7.  デフォルトの `src/custom_greeting_assets/src/index.js` ファイルをテキストエディターで開き、2 行目から 9 行目までを削除します。

8.  [こちら](../_attachments/react-index.jsx) のサンプルコードをコピーして、 `index.js` ファイルに貼り付けてください：

9.  以下のコマンドを実行して、修正した `index.js` ファイルの名前を `index.jsx` に変更します：

        mv src/custom_greeting_assets/src/index.js src/custom_greeting_assets/src/index.jsx

10. デフォルトの `src/custom_greeting_assets/src/index.html` ファイルをテキストエディタで開き、 body の内容を `<div id="app"></div>` で置き換えます。

    例：

        <!doctype html>
        <html lang="en">
         <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width">
            <title>custom_greeting</title>
            <base href="/">
            <link type="text/css" rel="stylesheet" href="main.css" />
         </head>
         <body>
            <div id="app"></div>
         </body>
        </html>

## ローカル Canister 実行環境の起動

`custom_greeting` プロジェクトをビルドする前に、IC のオンチェーンか、開発環境でローカルに実行されている Canister 実行環境に接続する必要があります。

実行環境をローカルで起動する：

1.  ローカルコンピュータで新しいターミナルウィンドウまたはタブを開きます。

2.  必要に応じて、プロジェクトのルートディレクトリに移動します。

3.  次のコマンドを実行して、ローカルコンピュータ上でローカル Canister 実行環境を起動します：

        dfx start --background

    ローカル Canister 実行環境の起動操作が完了したら、次のステップに進みます。

## Dapp の登録、ビルド、デプロイ

ローカル Canister 実行環境に接続すると、ローカルで Dapp の登録、ビルド、デプロイを行うことができます。

Dapp をローカルにデプロイする：

1.  必要に応じて、プロジェクトのルートディレクトリにいることを確認します。

2.  以下のコマンドを実行して、 Dapp の登録、ビルド、デプロイを行います：

        dfx deploy

    `dfx deploy` コマンドの出力には、実行した操作に関する情報が表示されます。

## 新しいフロントエンドを確認する

ブラウザで アセット Canister の Canister 識別子を入力すると、デフォルトの Dapp の新しいフロントエンドにアクセスできるようになりました。

カスタム・フロントエンドを確認する：

1.  ターミナルの新しいタブまたはウィンドウを開き、以下を実行します。

        npm start

2.  ブラウザを開き、 <http://localhost:8080> に移動します。

3.  greeting を入力するプロンプトが表示されていることを確認します。

    例：

    ![Sample front-end](../_attachments/react-greeting.png)

4.  入力フィールドの **Name** を表示したいテキストに置き換えて、 **Get Greeting** をクリックすると、結果が表示されます。

    例：

    ![Greeting result](../_attachments/greeting-response.png)

## フロントエンドを修正し、変更点をテストする

フロントエンドを見た後に、いくつかの変更を加えたいと思うかもしれません。

フロントエンドを変更するには：

1.  テキストエディタで `index.jsx` ファイルを開き，そのスタイル設定を変更します。 例えば、フォントファミリーを変更したり、入力フィールドにプレースホルダーを使用したりするには、[こちら](../_attachments/react-revised-index.jsx) のように変更します：

2.  ファイルを保存し、更新されたページをブラウザで表示してください。

    例：

    ![Modified styles on your entry page](../_attachments/revised-greeting.png)

3.  新しいメッセージを入力すると、新しい greeting 表示されます。例：

    ![Modified greeting result](../_attachments/modified-result.png)

## ローカル Caninster の実行環境の停止

Dapp のフロントエンドのテストが終わったら、ローカルの Canister 実行環境を停止して、バックグラウンドでの実行が続かないようにします。 ローカルネットワーク停止するには：

1.  webpack の開発サーバーが表示されているターミナルで、 Control-C を押して dev-server を中断します。

2.  ネットワーク操作を表示する端末で Control-C を押して、ローカルネットワークの処理を中断する。

3.  以下のコマンドを実行して、ローカル Canister 実行環境を停止します：

        dfx stop

<!--
# Customize the frontend

Now that you have a basic understanding of how to create, build, and deploy a simple dapp and are familiar with the default project files and sample frontend, you might want to start experimenting with different ways to customize the frontend user experience for your project.

This tutorial illustrates using the React framework to create a new frontend for the default sample dapp and guides you through some basic modifications to customize the interface displayed. Later tutorials expand on the techniques introduced here, but if you already know how to use CSS, HTML, JavaScript, and React or other frameworks to build your user interface, you can skip this tutorial.

This tutorial illustrates using the React framework to manage the Document Object Model (DOM) for your canister. Because React has its own custom DOM syntax, you need to modify the webpack configuration to compile the frontend code, which is written in JSX. For more information about learning to use React and JSX, see [Getting started](https://reactjs.org/docs/getting-started.html) on the [React website](https://reactjs.org/).

## Before you begin

Before starting the tutorial, verify the following:

-   You have `node.js` installed for frontend development and can install packages using `npm install` in your project. For information about installing node for your local operating system and package manager, see the [Node](https://nodejs.org/en/) website.

-   You have downloaded and installed the SDK package as described in [Download and install](../../quickstart/local-quickstart#download-and-install).

-   You have installed the Visual Studio Code plugin for Motoko as described in [Install the language editor plug-in](../../quickstart/local-quickstart#install-vscode) if you are using Visual Studio Code as your IDE.

-   You have stopped any SDK processes running on the local computer.

This tutorial requires you to use the SDK version `0.8.0` or later.

This tutorial takes approximately 30 minutes to complete.

## Create a new project

To create a new project directory for your custom frontend dapp:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Change to the folder you are using for your Internet Computer projects, if you are using one.

3.  Check that you have `node.js` installed locally by running the following commands:

        which node
        which npm

    If you don’t have `node.js` installed, you should download and install it before continuing to the next step. For information about installing node for your local operating system and package manager, see the [Node](https://nodejs.org/en/) website.

4.  Create a new project by running the following command:

        dfx new custom_greeting

    The `dfx new custom_greeting` command creates a new `custom_greeting` project.

5.  Change to your project directory by running the following command:

        cd custom_greeting

## Install the React framework

If you’ve never used React before, you might want to explore the [Intro to React](https://reactjs.org/tutorial/tutorial.html) tutorial or the [React website](https://reactjs.org/) before editing the frontend code.

To install required framework modules:

1.  Install the React module by running the following command:

        npm install --save react react-dom

2.  Install the required TypeScript language compiler loader by running the following command:

        npm install --save-dev typescript ts-loader

    As an alternative to installing these modules, you can edit the default `package.json` file to add dependencies for your project like [this](../_attachments/custom-frontend-package.json).

## Review the default configuration

Before we make any changes to use React for this tutorial, let’s review the default frontend settings in the `dfx.json` configuration file for your project.

To review the default `dfx.json` configuration file:

1.  Open the `dfx.json` configuration file in a text editor.

2.  Notice that the `canisters` key includes settings for a `custom_greeting_assets` canister.

        {
          "canisters": {
            ...

            "custom_greeting_assets": {
              "dependencies": [
                "custom_greeting"
              ],
              "frontend": {
                "entrypoint": "src/custom_greeting_assets/src/index.html"
              },
              "source": [
                "src/custom_greeting_assets/assets",
                "dist/custom_greeting_assets/"
              ],
              "type": "assets"
            }
          }
        }

    Let’s take a look at the settings in this section.

    -   Frontend assets for your project are compiled into their own canister, in this case, a canister named `custom_greeting_assets`.

    -   The assets canister has a default dependency on the main canister for the project.

    -   The `frontend.entrypoint` setting specifies the path to a file—in this case, the `index.html` file—to use as your dapp entry point. If you had a different starting point—for example, a custom `first-page.html` file—you would modify this setting.

    -   The `source` settings specify the path to your `src` and `dist` directories. The `src` setting specifies the directory to use for static assets that will be included in your assets canister when you build your project. If you have custom cascading stylesheet (CSS) or JavaScript files, you would include them in the folder specified by this path. After building the project, the project assets are served from the directory specified by the `dist` setting.

    -   The `type` setting specifies that the `custom_greeting_assets` should use the [certified asset canister](https://github.com/dfinity/certified-assets), which comes with everything you need to host static assets on the IC.

    For this tutorial, we are going to add React JavaScript in an `index.jsx` file, but that won’t require any changes to the default settings in the `dfx.json` file.

3.  Close the `dfx.json` file to continue.

## Review the default frontend files

For this tutorial, you are going to make calls to the default `main.mo` canister through a custom frontend. Before you make any changes, though, let’s take a look at what’s in the default frontend files for a project.

To review the default frontend files:

1.  Open the `src/custom_greeting_assets/src/index.html` file in a text editor.

    This template file is the default frontend entry point for the dapp as specified by the `frontend.entrypoint` setting in the `dfx.json` file.

    This file contains standard HTML with references to a CSS file and an image that are located in the `src/custom_greeting_assets/assets` directory. The default `index.html` file also includes standard HTML syntax for displaying an input field for the `name` argument and a clickable button.

    This is the same default frontend you saw in [Viewing the default frontend](../backend/explore-templates#default-frontend).

2.  Open the `src/custom_greeting_assets/src/index.js` file in a text editor.

        import { custom_greeting } from "../../declarations/custom_greeting";

        document.getElementById("clickMeBtn").addEventListener("click", async () => {
          const name = document.getElementById("name").value.toString();
          // Interact with custom_greeting actor, calling the greet method
          const greeting = await custom_greeting.greet(name);

          document.getElementById("greeting").innerText = greeting;
        });

    -   The `import` statement points to an actor that will allow us to make calls to our `custom_greeting` canister from `"../declarations"`

    -   The declarations haven’t been created yet, but we will come back to that.

3.  Close the `index.js` file to continue.

## Modify the frontend files

You are now ready to create a new frontend for the default dapp.

To prepare the frontend files:

1.  Open the webpack configuration file (`webpack.config.js`) in a text editor.

2.  Modify the frontend entry to replace the default `index.html` with `index.jsx`.

        entry: {
          // The frontend.entrypoint points to the HTML file for this build, so we need
          // to replace the extension to `.js`.
          index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx"),
        },

3.  Add the following `module` key above the `plugins` section:

        module: {
          rules: [
            { test: /\.(js|ts)x?$/, loader: "ts-loader" }
          ]
        },

    This setting enables the project to use the `ts-loader` compiler for a React JavaScript `index.jsx` file. Note that there’s a commented section in the default `webpack.config.js` file that you can modify to add the `module` key.

4.  Create a new file named `tsconfig.json` in the root directory for your project.

5.  Open the `tsconfig.json` file in a text editor, then copy and paste [this code](../_attachments/sample-tsconfig.json) into the file.

6.  Save your changes and close the `tsconfig.json` file to continue.

7.  Open the default `src/custom_greeting_assets/src/index.js` file in a text editor and delete lines 2 to 9.

8.  Copy and paste [this code](../_attachments/react-index.jsx) into the `index.js` file.

9.  Rename the modified `index.js` file as `index.jsx` by running the following command:

        mv src/custom_greeting_assets/src/index.js src/custom_greeting_assets/src/index.jsx

10. Open the default `src/custom_greeting_assets/src/index.html` file in a text editor, then replace the body contents with `<div id="app"></div>`.

    For example:

        <!doctype html>
        <html lang="en">
         <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width">
            <title>custom_greeting</title>
            <base href="/">
            <link type="text/css" rel="stylesheet" href="main.css" />
         </head>
         <body>
            <div id="app"></div>
         </body>
        </html>

## Start the local canister execution environment

Before you can build the `custom_greeting` project, you need to connect to either the live IC, or a canister execution environment running locally in your development environment.

To start the environment locally:

1.  Open a new terminal window or tab on your local computer.

2.  Navigate to the root directory for your project, if necessary.

3.  Start the local canister execution environment on your local computer by running the following command:

        dfx start --background

    After the local canister execution environment completes its startup operations, you can continue to the next step.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment, you can register, build, and deploy your dapp locally.

To deploy the dapp locally:

1.  Check that you are still in the root directory for your project, if needed.

2.  Register, build, and deploy your dapp by running the following command:

        dfx deploy

    The `dfx deploy` command output displays information about the operations it performs.

## View the new frontend

You can now access the new frontend for the default dapp by entering the canister identifier for the assets canister in a browser.

To view the custom frontend:

1.  Open a new tab or window of your terminal and run

        npm start

2.  Open a browser and navigate to <http://localhost:8080>.

3.  Verify that you are prompted to type a greeting.

    For example:

    ![Sample frontend](../_attachments/react-greeting.png)

4.  Replace **Name** in the input field with the text you want to display, then click **Get Greeting** to see the result.

    For example:

    ![Greeting result](../_attachments/greeting-response.png)

## Revise the frontend and test your changes

After viewing the frontend, you might want to make some changes.

To modify the frontend:

1.  Open the `index.jsx` file in a text editor and modify its style settings. For example, you might want to change the font family and use a placeholder for the input field by making changes similar to [this](../_attachments/react-revised-index.jsx).

2.  Save the file and view the updated page in your browser.

    For example:

    ![Modified styles on your entry page](../_attachments/revised-greeting.png)

3.  Type a new message and see your new greeting. For example:

    ![Modified greeting result](../_attachments/modified-result.png)

## Stop the local canister execution environment

After you finish experimenting with the frontend for your dapp, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local network:

1.  In the terminal that displays the webpack development server, press Control-C to interrupt the dev-server.

2.  In the terminal that displays network operations, press Control-C to interrupt the local network process.

3.  Stop the local canister execution environment by running the following command:

        dfx stop

-->
