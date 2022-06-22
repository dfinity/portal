# NFT ミント（ NFT Minting ）

このサンプルでは NFT Canister の実装を説明します。NFT（ non-fungible tokens ）は、任意のメタデータ（通常は何らかの画像）を持つ一意のトークンで、トレーディングカードに相当するデジタルデータを形成するものです。いくつかの異なる Internet Computer の NFT 規格はいくつかありますが、最も Cycle 効率がよく機能が充実しているのが [DIP-721](https://github.com/Psychedelic/DIP721) 規格なので、この Canister はこの規格を採用しています。

Canister はミント、バーンおよび通知の拡張インタフェースをサポートした規格の基本的な実装です。

サンプルコードは [Rust](https://github.com/dfinity/examples/tree/master/rust/dip721-nft-container) の [サンプルリポジトリ](https://github.com/dfinity/examples)で公開されており、Motoko は近日公開予定です。 デモ用の Rust Canister の実行インスタンスは [t5l7c-7yaaa-aaaab-qaehq-cai](https://t5l7c-7yaaa-aaaab-qaehq-cai.ic0.app) で公開されています。 このインターフェースはプログラムによるものですが、Rust 版には HTTP 機能が追加されており、`<canister URL>/<NFT ID>/<file ID>` のメタデータファイルを閲覧することが可能です。 6 つの NFT が含まれていて、 `<canister URL>/0/0` から `<canister URL>/5/0` までのアイテムを見ることができます。

コマンドラインの長さの制限で画像やビデオのような大きなファイルを `dfx` 経由で NFT をミントすることができません。そのため [ minting tool （コマンドライン）](https://github.com/dfinity/experimental-minting-tool) が用意されており、簡単な NFT をミントすることができます。

## アイディア

NFT Canister は [DIP-721](https://github.com/Psychedelic/DIP721) 規格が主に [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) 操作を指定しているので、それほど複雑なものではありません。 しかし Internet Computer の Dapp 開発に関する 3 つの重要なコンセプトを説明するには十分利用可能です。

### Canister アップグレードのためのステーブルメモリ（ Stable Memory ）

Internet Computer は [直交永続性（ Orthogonal Persistence ）](https://smartcontracts.org/docs/language-guide/motoko.html#_orthogonal_persistence) を採用しているため、開発者は通常、データの保存について深く考える必要はありません。 しかし、Canister コードをアップグレードする場合、Canister データを明示的に処理する必要があります。NFT Canister のサンプルでは、 `pre_upgrade` と `post_upgrade` を使ってステーブルメモリをどのように処理するかを示しています。

### 認証データ（ Certified Data ）

一般的に、関数が（ Canister のステートを変更するのではなく）データを読み取るだけの場合は、 [update call の代わりに query call](https://smartcontracts.org/docs/developers-guide/concepts/canisters-code.html#query-update) を使用するのが便利です。 しかし、クエリコールはコンセンサスを経ないため、 [認証済みレスポンス](https://smartcontracts.org/docs/security-best-practices/general-security-best-practices.html#_certify_query_responses_if_they_are_relevant_for_security) を可能な限り使用する必要があります。Rust 実装の HTTP インターフェースは認証済みデータをどのように処理できるかを示しています。

### アセットに対するコントロールの委任

さまざまな理由から、ユーザーは自分の資産の管理を他の ID に委ねたり、アイテムを削除（バーン）したい場合があります。 NFT Canister のサンプルはこれらのケースをすべて含んでどのように実行できるかを示しています。

## アプローチ

[DIP-721](https://github.com/Psychedelic/DIP721) で必要とされる基本的な機能は非常に簡単に実装できるため、ここでは上記の考え方をどのように処理・実装するかについてのみ説明します。

### Canister アップグレードのためのステーブルストレージ

Canister コードのアップグレード中、異なる Canister 呼び出し間でメモリは保持されません。ステーブルメモリ内のメモリのみが引き継がれます。 そのため、アップグレードが行われる前にすべてのデータをステーブルメモリに書き込む必要があり、これは通常 `pre_upgrade` 関数で実行されます。 この関数はアップグレードが行われる前にシステムから呼び出されます。アップグレード後は通常、ステーブルメモリからメモリにデータをロードします。 `post_upgrade` 関数はアップグレード後にシステムから呼び出されます。 アップグレードの途中でエラーが発生した場合、アップグレード（ `post_upgdrade` を含む）はすべて元に戻されます。

Rust CDK（ Canister Development Kit ）は現在、ステーブルメモリに 1 つの値しかサポートしていないので、気になるものをすべて保持できるオブジェクトを作成する必要があります。 さらに、すべてのデータ型をステーブルメモリに格納できるわけではありません。 [CandidType trait](https://docs.rs/candid/latest/candid/types/trait.CandidType.html) を実装したものだけがステーブルメモリに格納できます。 （通常は [CandidType derive macro](https://docs.rs/candid/latest/candid/derive.CandidType.html) を介して）ステーブルメモリに書き込むことができます。

この Canister のステートには `CandidType` を実装していない `RbTree` が含まれているので、これを `CandidType` を実装したデータ構造（この場合は `Vec` ）に変換する必要があります。 幸いなことに、 `RbTree` と `Vec` の両方がイテレータとの変換を可能にする関数を実装しているので、変換は非常に簡単に行うことができます。 変換後はアップグレード中のデータを保存するために、別の `StableState` オブジェクトが使用されます。

### 認証データ（ Certified Data ）

`<canister-id>.raw.ic0.app` の代わりに `<canister-id>.ic0.app` を介して http でアセットを提供するには、レスポンスに以下のものが必要です。 [証明書を含む](https://wiki.internetcomputer.org/wiki/HTTP_asset_certification) レスポンスのコンテンツを検証する必要があります。 このような証明書の取得はコンセンサスを得なければならないため、クエリコール中に行うことはできず、アップデートコールで作成する必要があります。

証明書のコンテンツは非常に限定されています。この文章を書いている時点では、Canister は 32 バイト以上のデータを送信して証明書を発行することができません。 その少ないデータを最大限に活用するために、`HashTree` が使われています（前のセクションで出てきた `RbTree` も `HashTree` です）。 `HashTree` はツリー状のデータ構造で、ツリー全体を 32 バイトの小さなハッシュにまとめることができます（ハッシュ化される）。 ツリーの内容が変更されるたびにハッシュも変更されます。このようなツリーのハッシュが認証されていれば、ツリーの内容は認証されていると考えてもよいです。 NFT のサンプル Canister でデータがどのように認証されるかを見るには、 `http.rs` の関数 `add_hash` を見てください。

レスポンスが検証されるためには、a) 送られたコンテンツがツリーの一部であること、b) そのコンテンツを含むツリーが実際に認証済みハッシュにハッシュ化できること、を確認しないといけません。 関数 `witness` は、a) と b) を満たすように検証可能な最小限のコンテンツを含むツリーを作成する責任を負います。 この最小限のツリーが構築されると、証明書と最小限のハッシュツリーが `IC-Certificate` ヘッダーの一部として送信されます。

認証の仕組みについては、 [こちらの解説動画](https://dfinity.org/howitworks/response-certification) をご覧ください。

### アセットに対するコントロール管理

[DIP-721](https://github.com/Psychedelic/DIP721) では、NFT に対する複数の管理レベルを規定しています。 - 所有者：この人物は NFT を所有しています。NFT の譲渡、オペレータの追加・削除、NFT のバーンが可能です。 - オペレータ：委任された所有者に近いです。オペレーターは NFT を所有しませんが、所有者と同じ操作を行うことができます。 - カストディアン：NFT コレクション・ Canister の作成者です。NFT の譲渡、オペレーターの追加・削除、バーン、バーン解除が可能です。また、新しい NFT をミントしたりコレクションのシンボルや説明を変更することもできます。

NFT の Canister のサンプルではこれら 3 つのレベルのアクセス制御を非常にシンプルに保っています。制御レベルごとに、Principal の個別のリスト（またはセット）が保持されます。 制御レベルごとに Principal のリスト（またはセット）が作成され、誰かが認証を必要とする操作を行うたびに、この 3 つのレベルが手動でチェックされます。 もしユーザーがある関数を呼び出す権限がない場合は、エラーが返されます。

NFT のバーンは特殊なケースです。NFT をバーンということは NFT を削除するか（ DIP-721 では意図していない）、所有権を `null`（または類似の値）に設定することを意味します。 Internet Computer ではこの存在しない Principal は [Management Canister](https://smartcontracts.org/docs/interface-spec/index.html#ic-management-canister) と呼ばれています。 以下はリンク先からの引用です。「 IC Management Canister は単なる見せかけであり、実際には（独立したステートや Wasm コードなどの持つ） Canister として存在しません。」（引用終わり）アドレスは `aaaa-aa` になります。 この Management Canister のアドレスを使って Principal を構築し、Management Canister をバーンした NFT のオーナーとして設定することが可能です。

<!--
# NFT Minting

This example demonstrates implementing an NFT canister. NFTs (non-fungible tokens) are unique tokens with arbitrary
metadata - usually an image of some kind - to form the digital equivalent of trading cards. There are a few different
NFT standards for the Internet Computer (e.g [EXT](https://github.com/Toniq-Labs/extendable-token), [IC-NFT](https://github.com/rocklabs-io/ic-nft)), but for the purposes of this tutorial we use [DIP-721](https://github.com/Psychedelic/DIP721). You can see a quick introduction on [YouTube](https://youtu.be/1po3udDADp4).

The canister is a basic implementation of the standard, with support for the minting, burning, and notification interface extensions.

The sample code is available in the [samples repository](https://github.com/dfinity/examples) in [Rust](https://github.com/dfinity/examples/tree/master/rust/dip721-nft-container) and Motoko is coming soon!
A running instance of the Rust canister for demonstration purposes is available as [t5l7c-7yaaa-aaaab-qaehq-cai](https://t5l7c-7yaaa-aaaab-qaehq-cai.ic0.app).
The interface is meant to be programmatic, but the Rust version additionally contains HTTP functionality so you can view a metadata file at `<canister URL>/<NFT ID>/<file ID>`.
It contains six NFTs, so you can look at items from `<canister URL>/0/0` to `<canister URL>/5/0`.

Command-line length limitations would prevent you from minting an NFT with a large file, like an image or video, via `dfx`. To that end,
there is a [command-line minting tool](https://github.com/dfinity/experimental-minting-tool) provided for minting simple NFTs.

## Ideas
The NFT canister is not very complicated since the [DIP-721](https://github.com/Psychedelic/DIP721) standard specifies mostly [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations,
but we can still use it to explain three important concepts concerning dapp development for the Internet Computer:

### Stable Memory for Canister Upgrades
The Internet Computer employs [Orthogonal Persistence](https://smartcontracts.org/docs/current/developer-docs/build/languages/motoko#orthogonal-persistence), so developers generally do not need to think a lot about storing their data.
When upgrading canister code, however, it is necessary to explicitly handle canister data. The NFT canister example shows how stable memory can be handled using `pre_upgrade` and `post_upgrade`.

### Certified Data
Generally, when a function only reads data (instead of modifying the state of the canister), it is
beneficial to use a [query call instead of an update call](https://smartcontracts.org/docs/current/concepts/canisters-code#query-and-update-methods).
But, since query calls do not go through consensus, [certified responses](https://smartcontracts.org/docs/current/developer-docs/build/security/general-security-best-practices#certify-query-responses-if-they-are-relevant-for-security)
should be used wherever possible. The HTTP interface of the Rust implementation shows how certified data can be handled.

### Delegating Control over Assets
For a multitude of reasons, users may want to give control over their assets to other identities, or even delete (burn) an item.
The NFT canister example contains all those cases and shows how it can be done.

## Approach
Since the basic functions required in [DIP-721](https://github.com/Psychedelic/DIP721) are very straightforward to implement, this section only discusses how the above ideas are handled/implemented.

### Stable Storage for Canister Upgrades
During canister code upgrades, memory is not persisted between different canister calls. Only memory in stable memory is carried over.
Because of that it is necessary to write all data to stable memory before the upgrade happens, which is usually done in the `pre_upgrade` function.
This function is called by the system before the upgrade happens. After the upgrade, it is normal to load data from stable memory into memory
during the `post_upgrade` function. The `post_upgrade` function is called by the system after the upgrade happened.
In case an error occurs during any part of the upgrade (including `post_upgdrade`), the entire upgrade is reverted.

The Rust CDK (Canister Development Kit) currently only supports one value in stable memory, so it is necessary to create an object that can hold everyhing you care about.
In addition, not every data type can be stored in stable memory; only ones that implement the [CandidType trait](https://docs.rs/candid/latest/candid/types/trait.CandidType.html)
(usually via the [CandidType derive macro](https://docs.rs/candid/latest/candid/derive.CandidType.html)) can be written to stable memory.

Since the state of our canister includes an `RbTree` which does not implement the `CandidType`, it has to be converted into a data structure (in this case a `Vec`) that implements `CandidType`.
Luckily, both `RbTree` and `Vec` implement functions that allow converting to/from iterators, so the conversion can be done quite easily.
After conversion, a separate `StableState` object is used to store data during the upgrade.

### Certified Data
To serve assets via http over `<canister-id>.ic0.app` instead of `<canister-id>.raw.ic0.app`, responses have to
[contain a certificate](https://wiki.internetcomputer.org/wiki/HTTP_asset_certification) to validate their content.
Obtaining such a certificate can not happen during a query call since it has to go through consensus, so it has to be created during an update call.

A certificate is very limited in its content. At the time of writing, canisters can submit no more than 32 bytes of data to be certified.
To make the most out of that small amount of data, a `HashTree` (the `RbTree` from the previous section is also a `HashTree`) is used.
A `HashTree` is a tree-shaped data structure where the whole tree can be summarized (hashed) into one small hash of 32 bytes.
Whenever some content of the tree changes, the hash also changes. If the hash of such a tree is certified, it means that the content of the tree can be considered certified.
To see how data is certified in the NFT example canister, look at the function `add_hash` in `http.rs`.

For the response to be verified, it has to be checked that a) the served content is part of the tree, and b) the tree containing that content actually can be hashed to the certified hash.
The function `witness` is responsible for creating a tree with minimal content that still can be verified to fulfill a) and b).
Once this minimal tree is constructed, certificate and minimal hash tree are sent as part of the `IC-Certificate` header.

For a much more detailed explanation how certification works, see [this explanation video](https://dfinity.org/howitworks/response-certification).

### Managing Control over Assets
[DIP-721](https://github.com/Psychedelic/DIP721) specifies multiple levels of control over the NFTs:
- Owner: This person owns an NFT. They can transfer the NFT, add/reomve operators, or burn the NFT.
- Operator: Sort of a delegated owner. The operator does not own the NFT, but can do the same actions an owner can do.
- Custodian: Creator of the NFT collection/canister. They can do anything (transfer, add/remove operators, burn, and even un-burn) to NFTs, but also mint new ones or change the symbol or description of the collection.

The NFT example canister keeps access control in these three levels very simple: For every level of control, a separate list (or set) of principals is kept.
Those three levels are then manually checked every single time someone attempts to do something for which they require authorisation.
If a user is not authorised to call a certain function an error is returned.

Burning an NFT is a special case. To burn an NFT means to either delete the NFT (not intended in DIP-721) or to set ownership to `null` (or a similar value).
On the Internet Computer, this non-existing principal is called the [Management Canister](https://smartcontracts.org/docs/current/references/ic-interface-spec#the-ic-management-canister).
Quote from the link: "The IC management canister is just a facade; it does not actually exist as a canister (with isolated state, Wasm code, etc.)." and its address is `aaaaa-aa`.
Using this management canister address, we can construct its principal and set the management canister as the owner of a burned NFT.

-->
