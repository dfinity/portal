# スタイルシートの追加

カスケードスタイルシートは、フロントエンドのユーザーインターフェースの重要な部分です。デフォルトのスターターでは、編集可能な `main.css` ファイルをインポートするように設定されていますが、スタイルシートを JavaScript ファイルにインポートしたり、 Syntactically Awesome Style Sheets (SCSS) のような代替フォーマットを使用したりすることもできます。 このチュートリアルでは、"Contacts" Dapp の構築を通じて、スタイルシートをインポートするように webpack を設定する方法を説明します。 webpack ベースのプロジェクトにカスケーディング・スタイルシート（CSS）を追加する方法をすでにご存知の方は、このチュートリアルを読み飛ばしていただいて構いません。

このチュートリアルでは、 React フレームワークを使ってフロントエンドの DOM（Document Object Model）を管理する方法を説明します。 React には独自のカスタム DOM 構文があるため、 JSX で書かれたフロントエンドコードをコンパイルするためには、 webpack の設定を変更する必要があります。React と JSX の使い方の学習については、 [React のウェブサイト](https://reactjs.org/) の [Getting started](https://reactjs.org/docs/getting-started.html) を参照してください。

## 始める前に

チュートリアルを始める前に、以下のことを確認してください。

- フロントエンド開発のために `node.js` がインストールされており、プロジェクトで `npm install` を使用してパッケージをインストールできること。 ローカルのオペレーティングシステムやパッケージマネージャに node をインストールする方法については、 [Node](https://nodejs.org/en/) のウェブサイトを参照してください。

- [ダウンロードとインストール](../../quickstart/local-quickstart#download-and-install) で説明されている通り、 {sdk-short-name} パッケージをダウンロードしてインストールしていること。

- IDE として Visual Studio Code を使用している場合、 [language editor plug-in のインストール](../../quickstart/local-quickstart#install-vscode) で説明されているように、 Motoko の Visual Studio Code プラグインをインストールしていること。

- ローカルコンピュータ上で実行されているローカルキャニスターの実行環境プロセスを停止していること。

このチュートリアルでは、 {sdk-short-name} のバージョン `0.8.0` 以降を使用する必要があります。

## 新しいプロジェクトを生成

カスタムフロントエンド Dapp 用の新しいプロジェクトディレクトリを作成するには：

1.  ローカルコンピューターでターミナルシェルを開きます（まだ開いていない場合）。

2.  Internet Computer プロジェクトで使用しているフォルダがあれば、そのフォルダに変更します。

3.  必要に応じて、ローカルに `node.js` がインストールされていることを確認します。

4.  次のコマンドを実行して、新しいプロジェクトを作成します：

        dfx new contacts

5.  以下のコマンドを実行して、プロジェクト・ディレクトリに変更します：

        cd contacts

## React フレームワークのインストール

React を使ったことがない方は、フロントエンドのコードを編集する前に、 [React 紹介](https://reactjs.org/tutorial/tutorial.html) チュートリアルや、 [React ウェブサイト](https://reactjs.org/) をご覧になるとよいでしょう。

必要なフレームワークモジュールをインストールするには：

1.  以下のコマンドを実行して、React モジュールをインストールします：

        npm install --save react react-dom

2.  以下のコマンドを実行して、必要な TypeScript 言語のコンパイラ・ローダをインストールします：

        npm install --save-dev typescript ts-loader

3.  以下のコマンドを実行して、必要なスタイルローダーをインストールします：

        npm install --save-dev style-loader css-loader

    また、 `npm install` コマンドで脆弱性が報告された場合は、 `npm audit fix` コマンドを実行して、報告された脆弱性の修正を試みてから続行するとよいでしょう。

    これらのモジュールをインストールする代わりに、デフォルトの `package.json` ファイルを編集して、プロジェクトの依存関係を [こちら](../_attachments/add-stylesheet-package.json) のように追加することができます。

    この例の `package.json` ファイルに含まれている JavaScript エージェントのバージョンは `0.10.0` です。しかし、ほとんどの場合、利用可能な最新バージョンのエージェントを使用することをお勧めします。新しいプロジェクトを作成すると、 `dfx new` コマンドが自動的に最新バージョンの JavaScript エージェントを取得します。また、プロジェクトを作成した後に `npm install --save @dfinity/agent` コマンドを実行して、手動で最新バージョンを取得することもできます。

## デフォルトプログラムの変更

このチュートリアルでは、メインプログラムを修正して、連絡先情報を保存したり検索したりするコードを追加します。

デフォルトプログラムを変更するには：

1.  テキストエディタで `src/contacts/main.mo` ファイルを開き、既存のコンテンツを削除します。

2.  [こちらのコード](../_attachments/contacts.mo) をコピーしてファイルに貼り付けます：

3.  変更を保存し、 `main.mo` ファイルを閉じて次に進みます。

## フロントエンドファイルの変更

これで、プログラムの新しいフロントエンドを作成する準備が整いました。

1.  テキストエディターで、 webpack の設定ファイル(`webpack.config.js`)を開きます。

2.  フロントエンドのエントリーを修正し、デフォルトの index.html を index.jsx に置き換えます。

        entry: {
          // フロントエンド・エンドポイントは、このビルドのHTMLファイルを指しているので
          // 拡張子を `.js` に変更する必要があります。
          index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx"),
        },

3.  コメントされた `module` キーの例を `plugins` セクションの上に見つけて、次の行をアンコメントしてください。

        module: {
          rules: [
            { test: /\.(js|ts)x?$/, loader: "ts-loader" },
            { test: /\.css$/, use: ['style-loader','css-loader'] }
          ]
        },

4.  これらの設定により、プログラムが `ts-loader` コンパイラを使用したり、CSS ファイルをインポートしたりすることができます。

    Note: `.scss` や `.sass` ファイルのサポートを追加したい場合は、 `sass-loader` を一緒にインストールしてください。

        npm install --save react react-dom

    それから、 `webpack.config.js` の `css-loader` ルールの下にこの追加ルールを追加します。

        module: {
          rules: [
            // ...
            {
              test: /\.s[ac]ss$/i,
              use: [
                // `style` ノードをJS文字列から生成
                "style-loader",
                // CSS を CommonJS に翻訳する
                "css-loader",
                // Sass を CSS にコンパイルする
                "sass-loader",
              ],
            },
          ]
        },

5.  変更内容を保存し、 `webpack.config.js` ファイルを閉じて次に進みます。

6.  プロジェクトのルートディレクトリに、 `tsconfig.json` という名前の新規ファイルを作成します。

7.  テキストエディターで `tsconfig.json` ファイルを開き、[こちらのコード](../_attachments/sample-tsconfig.json) をコピーしてファイルに貼り付けます：

8.  変更内容を保存し、 `tsconfig.json` ファイルを閉じて次に進みます。

## スタイルシートをプロジェクトに追加

これで、新しいカスケードスタイルシートを作成し、プロジェクトに追加する準備が整いました。

スタイルシートをプロジェクトに追加するには：

1.  `src/contacts_assets/assets` ディレクトリに移動します。

        cd src/contacts_assets/assets/

2.  テキストエディターで `main.css` ファイルを開き、既存の内容を削除します。

3.  フロントエンド用にいくつかのスタイルプロパティを定義します。

    例えば、[こちら](../_attachments/mycontacts.css) のサンプルスタイルをコピーして、ファイルに貼り付けます：

4.  変更内容を保存し、 `main.css` ファイルを閉じて次に進みます。

5.  `src/contacts_assets/src` ディレクトリに移動します。

        cd ../src

6.  デフォルトの `index.js` ファイルをテキストエディターで開き、既存のコンテンツを削除します。

7.  [こちら](../_attachments/mod-index.jsx) のサンプルコードをコピーして、 `index.js` ファイルに貼り付けてください：

8.  以下のコマンドを実行して、修正した `index.js` ファイルの名前を `index.jsx` に変更します：

        mv index.js index.jsx

9.  デフォルトの `src/contacts_assets/src/index.html` ファイルをテキストエディターで開き、 `main.css` のリンクを削除して、 `body` の内容を `<div id="contacts"></div>` で更新します。

    例えば：

        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width" />
            <title>contacts</title>
            <base href="/" />
          </head>
          <body>
            <main>
              <div id="contacts"></div>
            </main>
          </body>
        </html>

10. プロジェクトディレクトリのルートに戻ってください。

    例えば：

        cd ../../..

## ローカルネットワークをスタート

`contacts` プロジェクトをビルドする前に、ローカルの Canister 実行環境に接続する必要があります。 ローカル実行環境をスタートするには：

1.  ローカルコンピュータで新しいターミナルウィンドウまたはタブを開きます。

2.  次のコマンドを実行して、ローカルコンピュータ上でローカルキャニスター実行環境を起動します：

        dfx start --background

    環境の起動操作が完了したら、次のステップに進みます。

## Dapp の登録、ビルド、デプロイ

開発環境のローカル Canister 実行環境に接続した後、テスト用の Dapp を登録、ビルド、デプロイすることができます。

Dapp をデプロイするには：

1.  必要に応じて、プロジェクトのルートディレクトリにいることを確認します。

2.  以下のコマンドを実行して、 Dapp の登録、ビルド、デプロイを行います：

        dfx deploy

    `dfx deploy` コマンドの出力には、実行した操作に関する情報が表示されます。

    なお、Canister の実行環境はローカルで動作しているため、 `dfx deploy` コマンドを実行したときに表示される識別子は、自分のマシンでのみ有効であることに注意してください。

    {platform} にキャニスターをデプロイするには、 `--network` コマンドラインオプションを使用して、ローカル環境ではなく Internet Computer にデプロイすることを指定する必要があります。

        dfx deploy --network=ic

3.  Webpack development server を起動する：

        npm start

## フロントエンドを確認する

これで、 `contacts` Dapp のフロントエンドにアクセス出来ます。

フロントエンドを確認するには：

1.  ブラウザを開き、 `http://localhost:8080` に移動します。

2.  **My Contacts** フォームが表示されていることを確認します。

    例えば：

    ![Sample front-end](../_attachments/mycontacts-form.png)

3.  "Name" 、"Address" 、"Mail" の各入力欄にテキストを入力し、 "Phone" の入力欄に数字を入力して **Add Contact** をクリックして、1 つまたは複数のテストレコードを作成します。

4.  フォームフィールドをクリアして、 "Lookup name" フィールドに連絡先の名前を入力し、 **Lookup** をクリックすると、保存されている連絡先情報が表示されます。

    なお、入力する "Lookup" は、追加した連絡先の名前と完全に一致している必要があります。

## スタイルシートを変更し、変更内容をテストする

Contacts Dapp を見た後、いくつかの変更を加えたいと思うかもしれません

スタイルシートのプロパティを変更するには：

1.  テキストエディターで `src/contacts_assets/assets/mycontacts.css` ファイルを開き、そのスタイル設定を修正します。

    例えば、背景色を変更したり、入力フォームのスタイルを変更したりすることができます。

    開いているブラウザウィンドウに変更がすぐに反映されるはずです。

## フロントエンドやバックエンドのコードを変更する

さらに詳しく知りたい場合は、このチュートリアルのフロントエンドやバックエンドのコードを変更してみるとよいでしょう。 例えば、以下のように変更してみてはいかがでしょうか。

- 新しい連絡先を追加した後に入力フィールドをクリアするように、フロントエンドのコードを変更しましょう。例えば、 `onClick` イベントの一部として。

- プログラムの Motoko 関数を変更して、 `Name` フィールドで正確な文字列マッチングではなく、部分的な文字列マッチングを行うようにしましょう。（変更内容をローカル環境でテストするには、 `dfx deploy` を実行する必要があります）

- 異なるフィールドに基づいて検索できるように Motoko プログラムを変更しましょう。

## Canister ローカル実行環境の停止

プログラムの実験が終わったら、ローカル環境を停止して、バックグラウンドで実行し続けないようにすることができます。

Canister ローカル実行環境の停止するには：

1.  webpack の開発サーバーが表示されているターミナルで、 Control-C を押して開発サーバーを中断します。

2.  以下のコマンドを実行して Internet Computer ネットワークを停止します。

        dfx stop

<!--
# Add a stylesheet

Cascading stylesheets are an important part of any frontend user interface. The default starter is configured to import a `main.css` file that you can edit, but you may prefer to import your stylesheet into a JavaScript file, or to use an alternate format such as Syntactically Awesome Style Sheets, aka SCSS. This tutorial illustrates how to configure webpack to import a stylesheet by walking through building a contact dapp. If you already know how to add cascading stylesheets (CSS) to a webpack-based project, you can skip this tutorial.

This tutorial illustrates using the React framework to manage the Document Object Model (DOM) for your frontend. Because React has its own custom DOM syntax, you need to modify the webpack configuration to compile the frontend code, which is written in JSX. For more information about learning to use React and JSX, see [Getting started](https://reactjs.org/docs/getting-started.html) on the [React website](https://reactjs.org/).

## Before you begin

Before starting the tutorial, verify the following:

-   You have `node.js` installed for frontend development and can install packages using `npm install` in your project. For information about installing node for your local operating system and package manager, see the [Node](https://nodejs.org/en/) website.

-   You have downloaded and installed the SDK package as described in [Download and install](../../quickstart/local-quickstart#download-and-install).

-   You have installed the Visual Studio Code plugin for Motoko as described in [Install the language editor plug-in](../../quickstart/local-quickstart#install-vscode) if you are using Visual Studio Code as your IDE.

-   You have stopped any local canister execution environment processes running on the local computer.

This tutorial requires you to use the SDK version `0.8.0` or later.

## Create a new project

To create a new project directory for your custom frontend dapp:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Change to the folder you are using for your Internet Computer projects, if you are using one.

3.  Verify that you have `node.js` installed locally, if necessary.

4.  Create a new project by running the following command:

        dfx new contacts

5.  Change to your project directory by running the following command:

        cd contacts

## Install the React framework

if you’ve never used React before, you might want to explore the [Intro to React](https://reactjs.org/tutorial/tutorial.html) tutorial or the [React website](https://reactjs.org/) before editing the frontend code.

To install required framework modules:

1.  Install the React module by running the following command:

        npm install --save react react-dom

2.  Install the required TypeScript language compiler loader by running the following command:

        npm install --save-dev typescript ts-loader

3.  Install the required style loaders by running the following command:

        npm install --save-dev style-loader css-loader

    If the `npm install` command reports a vulnerability, you might also want to run the `npm audit fix` command to attempt to fix the vulnerability reported before continuing.

    As an alternative to installing these modules, you can edit the default `package.json` file to add dependencies for your project like [this](../_attachments/add-stylesheet-package.json).

    The version of the JavaScript agent in this example `package.json` file is `0.10.0`. In most cases, however, you would want to use the latest version of the agent available. When you create a new project, the `dfx new` command automatically retrieves the latest version of the JavaScript agent for you. You can also manually retrieve the latest version after creating a project by running the `npm install --save @dfinity/agent` command.

## Modify the default program

For this tutorial, you are going to modify the main program to with code that allows you to store and look up contact information.

To modify the default program:

1.  Open the `src/contacts/main.mo` file in a text editor and delete the existing content.

2.  Copy and paste [this code](../_attachments/contacts.mo) into the file.

3.  Save your changes and close the `main.mo` file to continue.

## Modify the frontend files

You are now ready to create a new frontend for your program.

1.  Open the webpack configuration file (`webpack.config.js`) in a text editor.

2.  Modify the frontend entry to replace the default index.html with index.jsx.

        entry: {
          // The frontend.entrypoint points to the HTML file for this build, so we need
          // to replace the extension to `.js`.
          index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx"),
        },

3.  Locate the commented example for the `module` key above the `plugins` section, then uncomment the following lines:

        module: {
          rules: [
            { test: /\.(js|ts)x?$/, loader: "ts-loader" },
            { test: /\.css$/, use: ['style-loader','css-loader'] }
          ]
        },

4.  These settings enable your program to use the `ts-loader` compiler and to import CSS files.

    Note: if you want to add support for `.scss` or `.sass` files, you should install `sass-loader` with:

        npm install --save react react-dom

    and then add this additional rule beneath the `css-loader` rule in `webpack.config.js`:

        module: {
          rules: [
            // ...
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
              ],
            },
          ]
        },

5.  Save your changes and close the `webpack.config.js` file to continue.

6.  Create a new file named `tsconfig.json` in the root directory for your project.

7.  Open the `tsconfig.json` file in a text editor, then copy and paste [this code](../_attachments/sample-tsconfig.json) into the file.

8.  Save your changes and close the `tsconfig.json` file to continue.

## Add a stylesheet to your project

You are now ready to create a new cascading stylesheet and add it to your project.

To add a stylesheet:

1.  Change to the `src/contacts_assets/assets` directory.

        cd src/contacts_assets/assets/

2.  Open the `main.css` file in a text editor and delete the existing content.

3.  Define some style properties for the frontend.

    For example, copy and paste [these styles](../_attachments/mycontacts.css) into the file.

4.  Save your changes and close the `main.css` file to continue.

5.  Change to the `src/contacts_assets/src` directory.

        cd ../src

6.  Open the default `index.js` file in a text editor and delete the existing content.

7.  Copy and paste [this code](../_attachments/mod-index.jsx) into the `index.js` file.

8.  Rename the modified `index.js` file as `index.jsx` by running the following command:

        mv index.js index.jsx

9.  Open the default `src/contacts_assets/src/index.html` file in a text editor, then remove the `main.css` link and update the `body` contents with `<div id="contacts"></div>`.

    For example:

        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width" />
            <title>contacts</title>
            <base href="/" />
          </head>
          <body>
            <main>
              <div id="contacts"></div>
            </main>
          </body>
        </html>

10. Navigate back to the root of your project directory.

    For example:

        cd ../../..

## Start the local network

Before you can build the `contacts` project, you need to connect to the local canister execution environment.

To start the environment locally:

1.  Open a new terminal window or tab on your local computer.

2.  Start the local canister execution environment on your local computer by running the following command:

        dfx start --background

    After the environment completes its startup operations, you can continue to the next step.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment in your development environment, you can register, build, and deploy your dapp for testing.

To deploy the dapp:

1.  Check that you are still in the root directory for your project, if needed.

2.  Register, build, and deploy your dapp by running the following command:

        dfx deploy

    The `dfx deploy` command output displays information about the operations it performs.

    Keep in mind that because you are running the canister execution environment locally, the identifiers displayed when you run the `dfx deploy` command are only valid on your machine.

    To deploy canisters on the IC, you must specify that you are deploying to the Internet Computer and not your local environment by using the `--network` command-line option:

        dfx deploy --network=ic

3.  Start the Webpack development server:

        npm start

## View the frontend

You can now access the frontend for the `contacts` dapp.

To view the frontend:

1.  Open a browser and navigate to the `http://localhost:8080`.

2.  Verify that you are prompted with a **My Contacts** form.

    For example:

    ![Sample frontend](../_attachments/mycontacts-form.png)

3.  Create one or more test records by entering text in the Name, Address, and Email input fields and a number in the Phone input field, then clicking **Add Contact**.

4.  Clear the form fields and type a contact name in the Lookup name field, then click **Lookup** to see the stored contact information.

    Keep in mind that the **Lookup name** you type must be an exact match for the name of a contact you added.

## Modify the stylesheet and test your changes

After viewing the Contacts dapp, you might want to make some changes.

To change stylesheet properties:

1.  Open the `src/contacts_assets/assets/mycontacts.css` file in a text editor and modify its style settings.

    For example, you might want to change the background color or style the input form.

    You should see the changes update immediately in your open browser window.

## Modify the frontend or backend code

If you want to explore further, you might want to experiment with modifying the frontend or backend code for this tutorial. For example, you might want try modifying the tutorial to do the following:

-   Change the frontend code to clear the input fields after adding a new contact, for example, as part of an `onClick` event.

-   Change the Motoko program functions to do partial instead of exact string matching on the `Name` field. (You will need to run `dfx deploy` to test your changes on the local environment)

-   Change the Motoko program to allow lookups based on a different field.

## Stop the local canister execution environment

After you finish experimenting with your program, you can stop the local environment so that it doesn’t continue running in the background.

To stop the local development environment:

1.  In the terminal that displays your webpack dev server, press Control-C to interrupt the development server.

2.  Stop the Internet Computer network by running the following command:

        dfx stop
-->
