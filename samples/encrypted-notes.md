# 暗号化されたノート（Encrypted Notes）

[ Encrypted Notes ](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp)は、短いテキスト形式で秘密の情報を作成・保存する試験的なアプリケーションです。ユーザーは [ Internet Identity ](https://smartcontracts.org/docs/ic-identity-guide/what-is-ic-identity.html)で認証された、自動的に同期される複数のデバイスから自分のノートにアクセスすることができます。アプリのフロントエンドがエンドツーエンドで暗号化するため、ユーザーはアプリのバックエンドを信頼する必要がありません。

こちらの [ IC 上にデプロイされている Dapp ](https://cvhrw-2yaaa-aaaaj-aaiqa-cai.ic0.app/)から試すことが出来ます。

## アイディア

純粋に IC 上で動作する簡素な（しかし簡素すぎない）アプリケーションの例を示したいと思います。この例は IC の _ウェブ配信機能_ と _ストレージ機能_ に依存しています。このアプリの例で次の 2 つの主要な機能に焦点を当てます。(1)クライアントサイドでの _エンドツーエンドの暗号化_ 、(2) _マルチユーザー_ 、 _マルチデバイス_ のサポート。

このようなアプリの開発プラットフォームとしての IC の可能性を示すために、2 種類の Canister Development Kits ( CDKs )を用いて実装を行いました。Motoko CDK は[ Motoko ](https://smartcontracts.org/docs/language-guide/motoko.html) 言語を使って Actor ベースの Dapp を実装するためのものです。Rust CDK は[ Rust ](https://smartcontracts.org/docs/rust-guide/rust-intro.html) 言語で実装されたアプリを提供します。いずれも Canister を WebAssembly ファイルにコンパイルし、 IC 上にデプロイします。

## アプローチ

Encrypted Notes の基本機能は 2 つの主要コンポーネントで構成されています。

第一に、[ IC-Notes ](https://github.com/pattad/ic_notes)という Dapp のコード（非暗号化） を再利用しました。特に IC-Notes はユーザー認証のために[ Internet Identity ](https://smartcontracts.org/docs/ic-identity-guide/auth-how-to.html) ( II ) Canister に依存しており、このアプローチは Encrypted Notes にも継承されています。開発目的では II Canister のローカルインスタンス（ Encrypted Notes のローカルインスタンスと共に)をデプロイします。Encrypted Notes をメインネットにデプロイする場合、現実世界の II インスタンスが認証に使用されます。

第二に、クライアントサイドでノートの内容のエンドツーエンドの暗号化を可能にしました。これは、[ IC-Vault ](https://github.com/timohanke/icvault)という別の既存のアプリからソリューションを借用したものです。私たちの Encrypted Notes アプリは IC-Vault のアプローチを踏襲し、複数のデバイスの管理をサポートしています。

このドキュメントで論じる Canister の文脈では、デバイスは必ずしも独立した物理デバイスではなく論理的なインスタンスデバイスです。つまり、独自のローカルデータストレージを持つ Web ブラウザなどです。例えば、同じノートパソコン上で動作する 2 つの Web ブラウザを独立した 2 つのデバイスと見なし、これらのブラウザは独自の暗号鍵を生成します。これに対し、II Canister はハードウェアが生成する暗号鍵に依存し、ハードウェアデバイスのみを識別します。

ユーザーごとに複数のデバイスをサポートするために、IC-Vault はデバイスマネージャーとユーザーに結びついたすべてのデバイス間でデバイス固有の鍵を安全に同期させる Canister を採用しています。このドキュメントの残りの部分では、メイン Canister の一部として同様の方法でデバイスマネージャーを実装している Encrypted Notes Canister に焦点を当てます。

詳細やユーザーストーリーは [ README ファイル](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp/README.md) を参照して下さい。

![High-level architecture overview diagram of the Encrypted Notes dapp](_attachments/encrypted-notes-arch.png)

## ノートマネージメント

- ユーザーはフロントエンドで II にリンクされ、API クエリやアップデートを呼び出すために使用できる Principal を取得します。

- 内部的には、`Principal → [Notes]` という形式のマップと、`counter` を格納しています。

- `counter` には、Canister が作成した（すべての Principal にわたる）ノートの数が格納されます。

- `create` メソッドは、Principal のエントリがすでに存在する場合にはそのエントリに、そうでなければ Principal を新たにマップに追加し、`note_id == counter` であるノートを追加した後に、`counter` をインクリメントします。

- `update` メソッドは、呼び出し元の Principal と指定された `note_id` に対応するノートを取り出し、与えられた `text` で置き換えます （この `text` はフロントエンドによって暗号化されていると仮定します）。

- `delete` メソッドは、指定された `note_id` を持つノートをマップから探し出し削除します。ノート ID が常にグローバルに一意であることを保証するために、 `counter` を減少させないようにします。

## 暗号化

- ノートの暗号化は完全にクライアントサイドで行われます。しかし、このサンプルアプリは、悪意のあるノードプロバイダによるデータ漏洩攻撃の可能性からはまだ保護されていません。例えば、攻撃者は特定のユーザーが何冊のノートを持っているかや、ユーザーの活動統計などを推論することができます。したがって、このアプリのコードやパターンを使用する前に、[免責条項](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp/README.md#disclaimer-please-read-carefully)をよく読んでください。

- このアプリの定義では、デバイスは必ずしも独立した物理デバイスではなく、単に独立したローカルストレージを持つ web ブラウザのインスタンスであることを思い出してください。

- Dapp は３種類の違う鍵を利用します。

  - 対称型 AES-GCM _秘密鍵_ ： 指定された Principal のノートを暗号化するために使用されます。Principal のノートはこの秘密鍵で暗号化されて Encrypted notes Canister に保存されます。したがって、アプリのフロントエンドはこのユーザーのノートを復号したり、 Encrypted Notes Canister に暗号化したノートを格納するためにこの秘密鍵を知っている必要があります。

  - デバイス RSA-OAEP _公開鍵_ ： Principal の対称型 AES _秘密鍵_ を暗号化するために使用されます。暗号化された秘密鍵は Principal に登録されたデバイスそれぞれに対して Canister に格納されます。そのデバイスを使用する Principal が異なると同じ鍵が使用されます。

  - デバイス RSA-OAEP _秘密鍵_ ：Encrypted notes Canister に格納されている、指定された Principal の対称型 AES _秘密鍵_ を復号するために使用されます。フロントエンドが秘密鍵を復号すると、 Encrypted Notes Canister に保存されているノートを復号するためにこの鍵を使用することができます。

- フォームのマップを保存します。

      Principal → (DeviceAlias → PublicKey,
                   DeviceAlias → CipherText)

- このマップは次に説明するように、ユーザーデバイスを管理するために使用されます。

- デバイスを登録するために、フロントエンドはデバイス・エイリアス、公開鍵、秘密鍵（ローカルストレージに保持）を生成します。

- デバイスを追加すると、以下が行われます。

  - **デバイスの登録：** この ID がすでに登録されていると、このデバイスの `alias` と `publickey` だけが Encrypted Notes Canister に追加されます。

  - **デバイスの同期：** 同期していないデバイスがこの II のすべての同期していないデバイスのリストを取得すると、同期していないデバイスのそれぞれの公開鍵で対称型 AES _秘密鍵_ を暗号化します。その後、同期していないデバイスは暗号化された対称型 AES _秘密鍵_ を取得して復号し、それを使って Encrypted Notes Canister に保存されている既存のノートを復号します。

- 一度 II で認証すると、以下が行われます。

  - この ID が未登録の場合、フロントエンドは対称型 AES _秘密鍵_ を生成し、それを自身の公開鍵で暗号化します。そして `seed(publickey, ciphertext)` を呼び出し、その暗号文とそれに関連する `publickey` をマップに追加します。

  - ユーザーが後続のデバイスを登録したい場合、フロントエンドは `register_device` を呼び出して、そのデバイスの `alias` と `publickey` を渡します。次に、フロントエンドは登録する必要があるすべてのデバイスに対して `submit_ciphertexts([publickey, ciphertext])` を呼び出します。これにより、登録されたデバイスはユーザーノートを暗号・復号化するための AES 鍵を復号し引き出すことができるようになります。

## シーケンスダイヤグラム

### 新しいデバイスの追加

![UML sequence diagram showing device registration and synchronization](_attachments/encrypted-notes-seq.png)

<!--
# Encrypted Note-taking Dapp

[Encrypted Notes](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp) is an experimental dapp for authoring and storing confidential information in the form of short pieces of text. The user can access their notes via any number of automatically synchronized devices authenticated via [Internet Identity](https://smartcontracts.org/docs/ic-identity-guide/what-is-ic-identity.html). Thanks to the end-to-end encryption performed by the dapp’s frontend, the user does not need to trust the dapp’s backend.

You can play around with the [dapp deployed on the IC](https://cvhrw-2yaaa-aaaaj-aaiqa-cai.ic0.app/) and see a quick introduction on [YouTube](https://youtu.be/DZQmtPSxvbs).

## Idea

We wanted to build an example of a simple (but not too simple) dapp running purely on the IC. This example relies upon the *web-serving* and *storage capabilities* of the IC. We focused on the following two key features for our example dapp: (1) client-side, *end-to-end encryption* and (2) *multi-user* and *multi-device* support.

To demonstrate the potential of the IC as a platform for developing such dapps, we implemented this example using two distinct Canister Development Kits (CDKs). The Motoko CDK allows developers to implement actor-based dapps using the [Motoko](https://smartcontracts.org/docs/language-guide/motoko.html) language. The Rust CDK allows implementing dapps in [Rust](https://smartcontracts.org/docs/rust/rust-intro.html). In both cases, canisters are compiled into WebAssembly files that are then deployed onto the IC.

## Approach

The basic functionality of Encrypted Notes consists of two main components.

First, we re-used the code of a (non-encrypted) dapp called [IC-Notes](https://github.com/pattad/ic_notes). In particular IC-Notes relies on the [Internet Identity](https://smartcontracts.org/docs/ic-identity-guide/auth-how-to.html) (II) canister for user authentication, an approach that is also inherited by Encrypted Notes. For development purposes, we deploy a local instance of the II canister (along with a local instance of Encrypted Notes); when deploying Encrypted Notes onto the mainnet, the real-world instance of II is used for authentication.

Second, we enabled client-side, end-to-end encryption for the note contents, borrowing the solution from another existing dapp called [IC-Vault](https://github.com/timohanke/icvault). Our Encrypted Notes dapp follows the approach of IC-Vault to support managing multiple devices.

In the context of the canisters discussed in this document, a device is not necessarily a separate physical device but a logical instance device, e.g., a web browser, with its own local data storage. For example, we consider two web browsers running on the same laptop as two independent devices; these browsers generate their own encryption keys. In contrast, the II canister relies on hardware-generated encryption keys, distinguishing only hardware devices.

To support multiple devices per user, IC-Vault employs a device manager, a canister that securely synchronizes device-specific keys across all the devices that are associated with a user. The remainder of this document focuses on the Encrypted Notes canister that implements a device manager in a similar way but as part of its main canister.

For further details and user stories, please refer to the [README file](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp/README.md).

![High-level architecture overview diagram of the Encrypted Notes dapp](_attachments/encrypted-notes-arch.png)

## Note management

-   Users are linked to II in the frontend, getting the user a principal that can be used for calling API queries and updates.

-   Internally, we store the map of the form `Principal → [Notes]` and a `counter`.

-   `counter` stores the number of notes the canister has created (across all principals).

-   Method `create` adds a note to its principal’s entry (if it exists), or adds the principal to the map with the `note_id == counter`, and then increments `counter`.

-   Method `update` pulls a note, for the caller’s Principal and for the provided `note_id` and replaces it with the provided `text` (this `text` is assumed to be encrypted by the frontend).

-   Method `delete` finds the note with the given `note_id` in the map and removes it. To ensure that note IDs are always globally unique, we do not decrease `counter`.

## Cryptography

-   Encryption of notes is entirely client-side. However, our example dapp is still not protected against potentially data-revealing attacks by a possibly malicious node provider. For example, the attacker can infer how many notes a particular user has, user activity statistics, etc. Therefore, please carefully read the [disclaimer](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp/README.md#disclaimer-please-read-carefully) before using any of the code or patterns from this dapp.

-   Recall that, in our definition, a device is not necessarily a separate physical device but simply a web browser instance with an independent local storage.

-   The dapp uses three different kinds of keys:

    -   Symmetric AES-GCM *secret key*: used to encrypt the notes of a given principal. The notes of a principal are stored in the Encrypted Notes canister encrypted with this secret key. Thus the frontend of the dapp needs to know this secret key to decrypt notes from this user and to send encrypted notes to be stored in the Encrypted Notes canister.

    -   Device RSA-OAEP *public key*: used to encrypt the symmetric AES *secret key* of the principal. The encrypted secret key is stored in the canister for each device registered to the principal. The same key is used for different principals using that device.

    -   Device RSA-OAEP *private key*: used to decrypt the symmetric AES *secret key* stored in the Encrypted Notes canister for a given principal. Once the frontend decrypts the secret key, it can use this key for decrypting the notes stored in the Encrypted Notes canister.

-   We store a map of the form:

        Principal → (DeviceAlias → PublicKey,
                     DeviceAlias → CipherText)

-   This map is used for managing user devices, as explained next.

-   To register a device, the frontend generates a device alias, a public key, and a private key (held in its local storage).

-   Adding a device:

    -   **Device registration:** If this identity is already known, a new device will remain unsynced at first; at this time, only the `alias` and `publickey` of this device will be added to the Encrypted Notes canister.

    -   **Device synchronization:** Once an unsynced device obtains the list of all unsynced devices for this II, it will encrypt the symmetric AES *secret key* under each unsynced device’s public key. Afterwards, the unsynced device obtains the encrypted symmetric AES *secret key*, decrypts it, and then uses it to decrypt the existing notes stored in the Encrypted Notes canister.

-   Once authenticated with II:

    -   If this identity is not known, then the frontend generates a symmetric AES *secret key* and encrypts it with its own public key. Then the frontend calls `seed(publickey, ciphertext)`, adding that ciphertext and its associated `publickey` to the map.

    -   If a user wants to register a subsequent device, the frontend calls `register_device`, passing in the `alias` and `publickey` of that device. The frontend then calls `submit_ciphertexts([publickey, ciphertext])` for all the devices it needs to register. This allows the registered devices to pull and decrypt the AES key to encrypt and decrypt the user notes.

## Sequence Diagrams

### Adding New Device

![UML sequence diagram showing device registration and synchronization](_attachments/encrypted-notes-seq.png)

-->
