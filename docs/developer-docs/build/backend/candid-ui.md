# Candid UI を使ったブラウザー上での関数のテスト

Canister インターフェース記述言語（Candid または IDL と呼ばれることが多い）は、Canister スマートコントラクトの署名を指定するための共通言語を提供します。Candid は、異なる言語で書かれていたり、異なるツールでアクセスされる Canister スマートコントラクトを扱うための統一された方法を提供します。 例えば、Candid は、基礎となるプログラムが Rust、JavaScript、Motoko のいずれであっても、一貫した表示となります。また、Candid は、dfx コマンドラインインターフェイスや Network Nervous System Dapp などの異なるツールが、サービスに対する共通の記述を共有できるようにします。

Actor の型注釈に基づいて、Candid はテストやデバッグのために Canister の関数を呼び出すことができる Web インターフェースも提供しています。

`dfx deploy` または `dfx canister install` コマンドを使用してプロジェクトをローカルの Canister 実行環境にデプロイした後、ブラウザで Candid インターフェイスのエンドポイントにアクセスできます。 この Web インターフェイス（Candid UI）は、サービスの説明を決められた形式で表現しており、フロントエンドのコードを書くことなく、関数をすばやく表示してテストしたり、さまざまなデータタイプを入力して実験したりすることができます。

Candid の Web インターフェースを使って Canister の関数をテストするには、以下のようにします:

- 現在のプロジェクトに関連する Candid UI の Canister の識別子を、`dfx canister id __Candid_UI` コマンドを使って見つけます。このコマンドは、Candid UI の Canister 識別子を以下のような出力で表示します。

  ```
  r7inp-6aaaa-aaaaa-aaabq-cai
  ```

- Candid UI の Canister 識別子をクリップボードで使用できるようにコピーします。ローカルの Canister 実行環境を停止していた場合は、以下のコマンドを実行してローカルで再起動します。

  ```
  dfx start --background
  ```

- ブラウザを開き、設定ファイルである `dfx.json` で指定されたアドレスとポート番号に移動します。デフォルトでは、ローカルの Canister 実行環境は、`127.0.0.1:8000` のアドレスとポート番号にバインドされます。
- 必要な `canisterId` パラメータと、`dfx canister id __Candid_UI` コマンドで返される Candid UI の Canister 識別子を URL に追加します。例えば、完全な URL は以下のようになりますが、`CANDID-UI-CANISTER-IDENTIFIER` は `dfx canister id __Candid_UI` コマンドで返された値になります。

  ```
  http://127.0.0.1:8000/?canisterId=<CANDID-UI-CANISTER-IDENTIFIER>
  ```

  例えば、上記の Candid UI の canister 識別子の例では、以下のようになります。

  ```
  http://127.0.0.1:8000/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai
  ```

  ブラウザには、 Canister の識別子を指定するか、Candid の説明（ `.did` ）ファイルを選択するためのフォームが表示されます。 このフィールドは、対話したい Canister の識別子を参照することに注意してください（最後のステップで使用した Candid UI の Canister 識別子とは異なります）。

- テストしたい Canister の識別子を「 **Provide a canister ID** 」フィールドに指定し、「 **Go** 」をクリックしてサービスの説明を表示します。
  使用する Canister の識別子がわからない場合は、`dfx canister id` コマンドを実行して、特定の Canister 名の識別子を調べることができます。 例えば、`my_counter` という名前の Canister の識別子を得るには、次のようにします:
  ```
  dfx canister id my_counter
  ```
- Dapp で定義されている関数の呼び出しと型のリストを確認します。
- 関数に合った型の値を入力するか、「 **Random** 」をクリックして値を生成し、「 **Call** 」または「 **Query** 」をクリックして結果を確認します。

  なお、データ型によっては、Candid インターフェースに、関数をテストするための追加の設定が表示される場合があります。 例えば、関数が配列を取る場合は、値を入力する前に配列のアイテム数を指定する必要があるかもしれません。

<!--
# Using the candid ui to test functions in a browser

The canister interface description language—often referred to as Candid or more generally as the IDL—provides a common language for specifying the signature of a canister smart contract.
Candid provides a unified way for you to interact with canister smart contracts that are written in different languages or accessed using different tools.
For example, Candid provides a consistent view of a service whether the underlying program is native Rust, JavaScript, or {proglang}.
Candid also enables different tools—such as the `dfx` command-line interface and the Network Nervous System dapp—to share a common description for a service.

Based on the type signature of the actor, Candid also provides a web interface that allows you to call canister functions for testing and debugging.


After you have deployed your project in the local canister execution environment using the `dfx deploy` or `dfx canister install` command, you can access the Candid web interface endpoint in a browser.
This web interface—the Candid UI—exposes the service description in a form, enabling you to quickly view and test functions and experiment with entering different data types without writing any front-end code.

To use the Candid web interface to test canister functions:

- Find the Candid UI canister identifier associated with the current project using the `dfx canister id __Candid_UI` command. The command displays the canister identifier for the Candid UI with output similar to the following:
    ```
    r7inp-6aaaa-aaaaa-aaabq-cai
    ```

- Copy the Candid UI canister identifier so that it is available in the clipboard. If you've stopped the local canister execution environment, restart it locally by running the following command:
    ```
    dfx start --background
    ```

- Open a browser and navigate to the address and port number specified in the `dfx.json` configuration file. By default, the local canister execution environment binds to the `127.0.0.1:8000` address and port number.
- Add the required `canisterId` parameter and the Candid UI canister identifier returned by the `dfx canister id __Candid_UI` command to the URL. For example, the full URL should look similar to the following but with the `CANDID-UI-CANISTER-IDENTIFIER` that was returned by the `dfx canister id __Candid_UI` command:
    ```
    http://127.0.0.1:8000/?canisterId=<CANDID-UI-CANISTER-IDENTIFIER>
    ```
    For instance, with the example canister identifier for the Candid UI as shown above, this could look as follows:
    ```
    http://127.0.0.1:8000/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai
    ```

    The browser then displays a form for you to specify a canister identifier or choose a Candid description (`.did`) file.
    Note that this field refers to the canister identifier of the canister you would like to interact with (as opposed to the canister identifier for the Candid UI that we used in the last step).

- Specify the canister identifier of the canister you would like to test in the *Provide a canister ID* field, then click *Go* to display the service description.
    If you aren’t sure which canister identifier to use, you can run the `dfx canister id` command to look up the identifier for a specific canister name.
    For instance, to get the canister identifier for a canister named `my_counter`, you would use:
    ```
    dfx canister id my_counter
    ```
- Review the list of function calls and types defined in the dapp.
- Type a value of the appropriate type for a function or click *Random* to generate a value, then click *Call* or *Query* to see the result.

    Note that depending on the data type, the Candid interface might display additional configuration settings for testing functions.
    For example, if a function takes an array, you might need to specify the number of items in the array before entering values.


![Calculator functions](../_attachments/candid-calc.png)
-->
