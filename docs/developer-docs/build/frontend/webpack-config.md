# フロントエンドの概要

IC では、[JavaScript agent](https://www.npmjs.com/package/@dfinity/agent) を使うことで dapps のために Web 3.0 のフロントエンドをホストすることができます。また、`dfx` が提供する [asset canister](https://github.com/dfinity/certified-assets) を使って静的ファイルを IC にアップロードすることで、アプリケーション全体を分散型技術で実行することができます。このセクションでは、`dfx new` で提供されるデフォルトのフロントエンドテンプレート、フロントエンドの設定オプション、プロジェクトのユーザーインターフェイスを構築するための他のフレームワークの使用について詳しく説明します。

ここではフロントエンド Dapps の開発の様々な段階でのサンプルコードを含むチュートリアルへのクイックリンクをご紹介します。

- React dapp 構築のチュートリアル [Customize the frontend](custom-frontend)

- [Candid](../backend/hello-location#candid-ui) を、Canister 内の機能を公開してテストするための最低限のインターフェースとして使用する。

- [生の HTML と JavaScript](../backend/explore-templates#default-frontend) を使って、シンプルな HTML エントリーページを表示する。

- [React とコンパイルされた JavaScript](custom-frontend) を使って、HTML の属性や要素を直接ページに埋め込む。

- [React と TypeScript](my-contacts) を使って、外部ファイルから CSS プロパティをインポートする。

## デフォルトテンプレートの使用方法

チュートリアルでお気づきのように、プロジェクトにはテンプレートの `index.js` と `webpack.config.js` ファイルが含まれています。

デフォルトでは、`index.js` ファイルは、`src/declarations` フォルダにあるエージェントをインポートします。このディレクトリは、`dfx deploy` を実行しローカルまたは Internet Computer にデプロイするときに、`dfx` によって生成されます。

その生成されたコードは以下のようになります。

    import { Actor, HttpAgent } from "@dfinity/agent";

    // candid interfaceをimport
    import { idlFactory } from './hello.did.js';
    // CANISTER_ID は、ノード環境に応じて webpack で置き換え
    export const canisterId = process.env.HELLO_CANISTER_ID;

    /**
     *
     * @param {string | Principal} canisterId Canister ID of Agent
     * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
     * @return {import("@dfinity/agent").ActorSubclass<import("./hello.did.js")._SERVICE>}
     */
    export const createActor = (canisterId, options) => {
      const agent = new HttpAgent({ ...options?.agentOptions });

      // 開発中の証明書検証のためのルートキーをfetch
      if(process.env.NODE_ENV !== "production") agent.fetchRootKey();

      // actor をcandid インターフェースとHttpAgentを利用して生成
      return Actor.createActor(idlFactory, {
        agent,
        canisterId,
        ...options?.actorOptions,
      });
    };

    /**
     * A ready-to-use agent for the hello canister
     * @type {import("@dfinity/agent").ActorSubclass<import("./hello.did.js")._SERVICE>}
     */
    export const hello = createActor(canisterId);

そして、`index.js` に戻ると、生成されたアクターを受け取り、それを使って `hello` Canister の `greet` メソッドを呼び出しているのがわかります。

    import { hello } from "../../declarations/hello";

    document.getElementById("clickMeBtn").addEventListener("click", async () => {
      const name = document.getElementById("name").value.toString();
      // Interact with hello actor, greet methodをコール
      const greeting = await hello.greet(name);

      document.getElementById("greeting").innerText = greeting;
    });

多くのプロジェクトでは、`declarations` にあるコードをそのまま使うことができ、`hello_assets/src` に変更を加えることができます。しかし、あなたのプロジェクトに追加の要件がある場合は、以下を読み進めてください。

### webpack の設定を変更する

webpack は、JavaScript ベースのアプリケーション用のモジュールバンドラーとして人気があり、高度な設定が可能であるため、新しいプロジェクトでは、デフォルトの `webpack.config.js` ファイルが作成され、使用したい特定のモジュール（`react` や `markdown` など）を簡単に追加できるようになっています。

テンプレートの `webpack.config.js` ファイルのコードを確認すると、ローカル開発の場合は `.dfx/local/canister_ids.json` から、その他の環境を設定した場合は `./canister_ids.json` から Canister ID を推定しています。どのネットワークを使用するかは、プロセス変数の `DFX_NETWORK` や、`NODE_ENV` が `"production"` に設定されているかどうかに基づいて決定されます。

これらの手順は以下のコードブロックで見ることができます。

    let localCanisters, prodCanisters, canisters;

    try {
      localCanisters = require(path.resolve(".dfx", "local", "canister_ids.json"));
    } catch (error) {
      console.log("No local canister_ids.json found. Continuing production");
    }

    function initCanisterIds() {
      try {
        prodCanisters = require(path.resolve("canister_ids.json"));
      } catch (error) {
        console.log("No production canister_ids.json found. Continuing with local");
      }

      const network =
        process.env.DFX_NETWORK ||
        (process.env.NODE_ENV === "production" ? "ic" : "local");

      canisters = network === "local" ? localCanisters : prodCanisters;

      for (const canister in canisters) {
        process.env[canister.toUpperCase() + "_CANISTER_ID"] =
          canisters[canister][network];
      }
    }
    initCanisterIds();

### エントリーとアウトプットの設定

多くの場合、デフォルトの `webpack.config.js` ファイルをそのまま、何も変更せずに使用することもできますし、プラグインやモジュール、その他のカスタム構成を追加して、ニーズに合わせて使用することもできます。 具体的に `webpack.config.js` の設定をどのように変更するかは、使用したい他のツールやフレームワークに大きく依存します。

例えば、フロントエンドのチュートリアルである [フロントエンドのカスタマイズ](https://nifty-beaver-611cb8.netlify.app/docs/developers-guide/tutorials/custom-frontend.html) や [スタイルシートの追加](https://nifty-beaver-611cb8.netlify.app/docs/developers-guide/tutorials/my-contacts.html) を試したことがある方は、React JavaScript で動作するように以下の部分を変更しているかもしれません。

        module: {
          rules: [
            { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
            { test: /\.css$/, use: ['style-loader','css-loader'] }
          ]
        }
      };
    }

ビルドスクリプトの実行に `dfx` を使用しないアプリケーションの場合は、自分で変数を用意することができます。例えば、以下のようになります。

    DFX_NETWORK=staging NODE_ENV=production HELLO_CANISTER_ID=rrkah... npm run build

### ノードがプロジェクトで利用可能であることを確認する

プロジェクトは、デフォルトのフロントエンドのフレームワークを提供するために webpack に依存しているので、開発環境に `node.js` がインストールされ、プロジェクトディレクトリにアクセスできる必要があります。

- デフォルトの webpack 設定と Canister のエイリアスを使用せずにプロジェクトを開発したい場合は、`dfx.json` ファイルから `assets` Canister を削除するか、特定の Canister 名を使用してプロジェクトをビルドすることができます。例えば、以下のコマンドを実行すると、フロントエンドのアセットを使わずに hello プログラムだけをビルドすることができます。

      dfx build hello

- デフォルトの webpack 構成を使用していて、`dfx build` の実行に失敗する場合は、プロジェクトディレクトリで `npm install` を実行してから、`dfx build` を再実行してください。

- プロジェクトディレクトリで `npm install` を実行しても問題が解決しない場合は、`webpack.config.js` ファイルの設定にシンタックスエラーがないか確認してください。

## 他のモジュールを React フレームワークで使用する

[リポジトリにあるいくつかのチュートリアルやサンプルプロジェクト](https://github.com/dfinity/examples)では、`npm install` コマンドを使って React モジュールを追加する方法が説明されています。 これらのモジュールを使って、プロジェクトで使用したいユーザーインターフェースコンポーネントを構築することができます。 例えば、以下のコマンドを実行して、`react-router` モジュールをインストールすることができます。

    npm install --save react react-router-dom

このモジュールを使って、以下のようなナビゲーションコンポーネントを作ることができます。

    import React from 'react';
    import { NavLink } from 'react-router-dom';

    const Navigation = () => {
      return (
        <nav className="main-nav">
          <ul>
            <li><NavLink to="/myphotos">Remember</NavLink></li>
            <li><NavLink to="/myvids">Watch</NavLink></li>
            <li><NavLink to="/audio">Listen</NavLink></li>
            <li><NavLink to="/articles">Read</NavLink></li>
            <li><NavLink to="/contribute">Write</NavLink></li>
          </ul>
        </nav>
      );
    }

    export default Navigation;

## webpack-dev-server を使用した反復処理の高速化

dfx 0.7.7 から、`dfx new` スターターに webpack dev-server が搭載されました。

webpack 開発サーバ `webpack-dev-server` は、webpack アセットへのインメモリアクセスを提供し、ライブリロードを使って変更を行い、すぐにブラウザに反映させることができます。

`webpack-dev-server` を利用するには、次のようにします。

1.  新しいプロジェクトを作成し、プロジェクトディレクトリに変更します。

2.  必要に応じて{IC}をローカルで起動し、`dfx deploy` コマンドを実行するなど、通常の操作でデプロイします。

3.  以下のコマンドを実行して、webpack 開発サーバーを起動します。

        npm start

4.  Web ブラウザーを開き、8080 ポートを使用して、アプリケーションのアセット Canister にナビゲートします。

    例:

        http://localhost:8080

5.  新しいターミナルウィンドウまたはタブを開き、プロジェクトのディレクトリに移動します。

6.  プロジェクトの `index.js` ファイルをテキストエディターで開き、内容を変更します。

    例えば、JavaScript を使ってページに要素を追加するような場合です。

    document.body.onload = addElement;

        document.body.onload = addElement;

        function addElement () {
          // div要素を新規に生成
          const newDiv = document.createElement("div");

          // それに乗せるコンテント
          const newContent = document.createTextNode("Test live page reloading!");

          // 新しく作成された div 要素に テキストノードである newContent を追加
          newDiv.appendChild(newContent);

          // 新しく作成したnewDiv要素とnewContentをDOMに追加
          const currentDiv = document.getElementById("div1");
          document.body.insertBefore(newDiv, currentDiv);
        }

7.  `index.js` ファイルへの変更を保存しますが、エディタを開いたままにしておき、変更を続けます。

8.  ブラウザを更新するか、またはブラウザが自動的に更新されるのを待つと、変更内容が表示されます。

    プロジェクトのフロントエンドの作業が終わったら、Control-C を押して webpack 開発サーバーを停止することができます。

## 他のフレームワークを使うと

webpack 以外のバンドラーを使いたい場合もあるでしょう。バンドラーごとの説明はまだ準備できていませんが、お使いのバンドラーに精通していれば、以下の手順で作業を進めることができます。

1.  `package.json` から `copy:types`, `prestart`, `prebuild` のスクリプトを削除します。

2.  `dfx deploy` を実行して、Canister 用のローカルバインディングを生成します。

3.  生成されたバインディングを保存したいディレクトリにコピーします。

4.  `declarations/<canister_name>/index.js` を修正し、`process.env.<CANISTER_NAME>_CANISTER_ID` をバンドラーの環境変数に相当するパターンに置き換えます。

    - 望ましいワークフローであれば、CanisterID をハードコードすることもできます。

5.  宣言をコミットして、コードベースに import します。

<!--
# Frontend Overview

the IC allows you to host Web 3.0 frontends for your dapps, using our [JavaScript agent](https://www.npmjs.com/package/@dfinity/agent). By using the [asset canister](https://github.com/dfinity/certified-assets) provided by `dfx` to upload static files to the IC, you will be able to run your entire application on decentralized technology. This section takes a closer look at the default frontend template that is provided by `dfx new`, frontend configuration options, and using other frameworks to build the user interface for your projects.

Here are some quick links to tutorials with example code for various stages of developing your frontend dapp:

-   A tutorial on building a React dapp [Customize the frontend](custom-frontend)

-   Using [Candid](../backend/hello-location#candid-ui) as a bare-bones interface to expose and test the functions in a canister.

-   Using [raw HTML and JavaScript](../backend/explore-templates#default-frontend) to display a simple HTML entry page.

-   Using [React and compiled JavaScript](custom-frontend) to embed HTML attributes and elements directly in a page.

-   Using [React and TypeScript](my-contacts) to import CSS properties from an external file.

## How the default templates are used

As you might have noticed in the tutorials, projects include template `index.js` and `webpack.config.js` files.

By default, the `index.js` file imports an agent that is located in `src/declarations` folder. That directory will be generated by `dfx` when you run `dfx deploy`, either locally or when deploying to the IC.

That generated code will look like this:

    import { Actor, HttpAgent } from "@dfinity/agent";

    // Imports candid interface
    import { idlFactory } from './hello.did.js';
    // CANISTER_ID is replaced by webpack based on node enviroment
    export const canisterId = process.env.HELLO_CANISTER_ID;

    /**
     *
     * @param {string | Principal} canisterId Canister ID of Agent
     * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
     * @return {import("@dfinity/agent").ActorSubclass<import("./hello.did.js")._SERVICE>}
     *
    export const createActor = (canisterId, options) => {
      const agent = new HttpAgent({ ...options?.agentOptions });

      // Fetch root key for certificate validation during development
      if(process.env.NODE_ENV !== "production") agent.fetchRootKey();

      // Creates an actor with using the candid interface and the HttpAgent
      return Actor.createActor(idlFactory, {
        agent,
        canisterId,
        ...options?.actorOptions,
      });
    };
    /**
     * A ready-to-use agent for the hello canister
     * @type {import("@dfinity/agent").ActorSubclass<import("./hello.did.js")._SERVICE>}
     *
    export const hello = createActor(canisterId);

Then, if you return to `index.js`, you can see that it takes the generated actor, and uses it to make a call to the `hello` canister’s `greet` method:

    import { hello } from "../../declarations/hello";

    document.getElementById("clickMeBtn").addEventListener("click", async () => {
      const name = document.getElementById("name").value.toString();
      // Interact with hello actor, calling the greet method
      const greeting = await hello.greet(name);

      document.getElementById("greeting").innerText = greeting;
    });

In many projects, you will be able to use the code under `declarations` without any changes, and make your changes in `hello_assets/src`. However, if your project has additional requirements, continue reading below.

### Modifying the webpack configuration

Because webpack is a popular and highly-configurable module bundler for JavaScript-based applications, new projects create a default `webpack.config.js` file that makes it easy to add the specific modules—such as `react` and `markdown`—that you want to use.

If you review the code in the template `webpack.config.js` file, you see that it infers canister ID’s from your `.dfx/local/canister_ids.json` for local development, and from `'./canister_ids.json'` for any other environments you configure. It decides which network to use based on a `DFX_NETWORK` proccess variable, or based on whether `NODE_ENV` is set to `"production"`.

You can see these steps in the following code block:

    let localCanisters, prodCanisters, canisters;

    try {
      localCanisters = require(path.resolve(".dfx", "local", "canister_ids.json"));
    } catch (error) {
      console.log("No local canister_ids.json found. Continuing production");
    }

    function initCanisterIds() {
      try {
        prodCanisters = require(path.resolve("canister_ids.json"));
      } catch (error) {
        console.log("No production canister_ids.json found. Continuing with local");
      }

      const network =
        process.env.DFX_NETWORK ||
        (process.env.NODE_ENV === "production" ? "ic" : "local");

      canisters = network === "local" ? localCanisters : prodCanisters;

      for (const canister in canisters) {
        process.env[canister.toUpperCase() + "_CANISTER_ID"] =
          canisters[canister][network];
      }
    }
    initCanisterIds();

### Entry and output configuration

In many cases, you can use the default `webpack.config.js` file as-is, without any modification, or you can add plug-ins, modules, and other custom configuration to suit your needs. The specific changes you make to the `webpack.config.js` configuration largely depend on the other tools and frameworks you want to use.

For example, if you have experimented with the [Customize the frontend](custom-frontend) or [Add a stylesheet](my-contacts) frontend tutorials, you might have modified the following section to work with React JavaScript:

        module: {
          rules: [
            { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
            { test: /\.css$/, use: ['style-loader','css-loader'] }
          ]
        }
      };
    }

If your application does not use `dfx` to run your build script, you can provide the variables yourself. For example:

    DFX_NETWORK=staging NODE_ENV=production HELLO_CANISTER_ID=rrkah... npm run build

### Ensuring node is available in a project

Because projects rely on webpack to provide the framework for the default frontend, you must have `node.js` installed in your development environment and accessible in the project directory.

-   If you want to develop your project without using the default webpack configuration and canister aliases, you can remove the `assets` canister from the `dfx.json` file or build your project using a specific canister name. For example, you can choose to build only the hello program without frontend assets by running the following command:

        dfx build hello

-   If you are using the default webpack configuration and running `dfx build` fails, you should try running `npm install` in the project directory then re-running `dfx build`.

-   If running `npm install` in the project directory doesn’t fix the issue, you should check the configuration of the `webpack.config.js` file for syntax errors.

## Using other modules with the React framework

Several tutorials and sample projects in the [examples](https://github.com/dfinity/examples) repository illustrate how to add React modules using the `npm install` command. You can use these modules to construct the user interface components you want to use in your project. For example, you might run the following command to install the `react-router` module:

    npm install --save react react-router-dom

You could then use the module to construct a navigation component similar to the following:

    import React from 'react';
    import { NavLink } from 'react-router-dom';

    const Navigation = () => {
      return (
        <nav className="main-nav">
          <ul>
            <li><NavLink to="/myphotos">Remember</NavLink></li>
            <li><NavLink to="/myvids">Watch</NavLink></li>
            <li><NavLink to="/audio">Listen</NavLink></li>
            <li><NavLink to="/articles">Read</NavLink></li>
            <li><NavLink to="/contribute">Write</NavLink></li>
          </ul>
        </nav>
      );
    }

    export default Navigation;

## Iterate faster using webpack-dev-server

Starting with dfx 0.7.7, we now provide you with webpack dev-server in our `dfx new` starter.

The webpack development server—`webpack-dev-server`—provides in-memory access to the webpack assets, enabling you to make changes and see them reflected in the browser right away using live reloading.

To take advantage of the `webpack-dev-server`:

1.  Create a new project and change to your project directory.

2.  Start the IC locally, if necessary, and deploy as you normally would, for example, by running the `dfx deploy` command.

3.  Start the webpack development server by running the following command:

        npm start

4.  Open a web browser and navigate to the asset canister for your application using port 8080.

    For example:

        http://localhost:8080

5.  Open a new terminal window or tab and navigate to your project directory.

6.  Open the `index.js` file for your project in a text editor and make changes to the content.

    For example, you might add an element to the page using JavaScript:

    document.body.onload = addElement;

        document.body.onload = addElement;

        function addElement () {
          // create a new div element
          const newDiv = document.createElement("div");

          // and give it some content
          const newContent = document.createTextNode("Test live page reloading!");

          // add the text node to the newly created div
          newDiv.appendChild(newContent);

          // add the newly created element and its content into the DOM
          const currentDiv = document.getElementById("div1");
          document.body.insertBefore(newDiv, currentDiv);
        }

7.  Save your changes to the `index.js` file but leave the editor open to continue making changes.

8.  Refresh the browser or wait for it to refresh on its own to see your change.

    When you are done working on the frontend for your project, you can stop the webpack development server by pressing Control-C.

## Using other frameworks

You may want to use a bundler other than webpack. Per-bundler instructions are not ready yet, but if you are familiar with your bundler, the following steps should get you going:

1.  Remove the `copy:types`, `prestart`, and `prebuild` scripts from `package.json`

2.  Run `dfx deploy` to generate the local bindings for your canisters

3.  Copy the generated bindings to a directory where you would like to keep them

4.  Modify `declarations/<canister_name>/index.js` and replace `process.env.<CANISTER_NAME>_CANISTER_ID` with the equivalent pattern for environment variables for your bundler

    -   Alternately hardcode the canister ID if that is your preferred workflow

5.  Commit the declarations and import them in your codebase

-->
