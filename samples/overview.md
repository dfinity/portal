---
hide_table_of_contents: true
---

# 概要

以下のサンプルアプリをご覧いただき、IC を利用したアプリで何ができるかご確認ください。すべてのサンプルとその他のプロジェクトは [Samples Repo](https://github.com/dfinity/examples) で見つけることができます。 [Awesome Dfinity repo](https://github.com/dfinity/awesome-dfinity) （私たちのコミュニティから集められたオープンソースプロジェクトや事例を集めたもの）や [Hackathon projects](hackathon-projects) でさらなる事例を見つけることができます。

## Hello world

_hello world_ に相当する Dapp で、バックエンドとフロントエンドの Canister に分かれて Web ページを提供します。  
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/hello) • [Rust](https://github.com/dfinity/examples/tree/master/rust/hello) • [See running](https://6lqbm-ryaaa-aaaai-qibsa-cai.ic0.app/) • [Technical docs](hello)

## 静的なウェブサイト

このチュートリアルでは、静的な Web サイトの構造を設定し、コンテンツと基本的なスタイルを追加して IC にデプロイする方法を紹介します。  
[Technical docs](host-a-website) • [Video guide](https://www.youtube.com/watch?v=JAQ1dkFvfPI)

## ベーシックな DEX

IC 上で Defi アプリケーションを実現するために、Canister はトークン Canister や Ladger Canister とインタラクションする必要があります。このサンプルアプリでは、取引所が資金を預かり、ユーザーの取引に応じて残高を更新し、資金が引き出されると預金をユーザーに返す方法を通じてこれらのインタラクションを説明します。  
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/defi) • [Rust](https://github.com/dfinity/examples/tree/master/rust/defi) • [See running](https://gzz56-daaaa-aaaal-qai2a-cai.ic0.app/) • [Technical docs](dex) • [YouTube](https://youtu.be/fLbaOmH24Gs)

## NFT のミント

この NFT ミント Dapp は、ユーザーが生成した NFT を簡単に作成し、それを共有することができることを紹介しています。このアプリは、[DIP721](https://github.com/Psychedelic/DIP721) NFT スタンダードを使用しています。  
[Rust](https://github.com/dfinity/examples/tree/master/rust/dip721-nft-container) • [Technical docs](nft) • [YouTube](https://youtu.be/1po3udDADp4)

## ベーシックな DAO

分散型ガバナンスは IC のハイライトであり、以下のベーシックな DAO のサンプルコードによって説明されています。これは、アカウントと対応するトークンのセットを初期化する方法、アカウントの所有者が他のアカウントの所有者に投票するための提案を提出する方法、および十分な賛成票を得た提案が実行される方法を示しています。  
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/basic_dao) • [Rust](https://github.com/dfinity/examples/tree/master/rust/basic_dao) • [Technical docs](dao) • [YouTube](https://youtu.be/3IcYlieA-EE)

## 暗号化されたノート

[Internet Identity](https://smartcontracts.org/docs/ic-identity-guide/what-is-ic-identity.html) サービスとエンドツーエンドの暗号化を用いて、複数のデバイスから秘密のメモを作成/アクセス/変更することができます。このサンプルコードは、IC の _ウェブサービス機能_ と _ストレージ機能_ に依存しており、(1）クライアントサイドのエンドツーエンド暗号化、（2）マルチユーザーおよびマルチデバイスのサポート、の 2 つの重要な機能をハイライトしています。  
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_motoko) • [Rust](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_rust) • [See running](https://cvhrw-2yaaa-aaaaj-aaiqa-cai.ic0.app/) • [Technical docs](encrypted-notes) • [YouTube](https://youtu.be/DZQmtPSxvbs)

## トークンの送金

このサンプルコードは、Dapp が最もアクティブなユーザーにトークンを転送する方法を示しています。  
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer) • [Rust](https://github.com/dfinity/examples/tree/master/rust/tokens_transfer) • [Technical docs](tokentransfer)

## Unity WebGL

The example shows how to deploy a simple Unity WebGL build on the IC, sample code can be found at [Samples repo](https://github.com/dfinity/examples/tree/master/hosting/unity-webgl-template).  
[Technical docs](host-unity-webgl)

## Motoko で書かれたサンプル集

Motoko で書かれたコードサンプルのレリポジトリへのリンク集です。ほとんどは [Motoko playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/) でも公開されています。Playground は、SDK をダウンロードして使い方を学ぶことなく Motoko のサンプルを試すことができる最もシンプルな環境ですが、フロントエンドを持つ Dapp はサポートしません。

## 基礎

IC と Motoko の基本的な概念を示す、入門用サンプル集です。

- [Actor_reference](https://github.com/dfinity/examples/tree/master/motoko/actor_reference) では Actor（参照）としての IC マネジメント Canister を紹介します。

- [Counter](https://github.com/dfinity/examples/tree/master/motoko/counter) では基本的な （静的） 変数のデモを紹介します。

- [Echo](https://github.com/dfinity/examples/tree/master/motoko/echo) では基本的なクエリ関数のデモを紹介します。

- [Factorial](https://github.com/dfinity/examples/tree/master/motoko/factorial) では基本的な階乗のデモを紹介します。

- [Hello_cycles](https://github.com/dfinity/examples/tree/master/motoko/hello_cycles) では Cycles の受信と転送、残高の確認を紹介します。

- [Whoami](https://github.com/dfinity/examples/tree/master/motoko/whoami) では呼び出し元の Principal を報告する単純な Canister を紹介します。

## 中級

中級編のサンプルでは、基本的なコンセプトを一般的なユースケースでどう使うかを紹介しています。このサンプルでは、Motoko で簡単なバックエンド機能を構築する方法を紹介します。

- [Classes](https://github.com/dfinity/examples/tree/master/motoko/classes) では動的な Actor（クラス）のインスタンス化について紹介します。

- [Pub-sub](https://github.com/dfinity/examples/tree/master/motoko/pub-sub) では複数の Canisters で、パブリッシャーとサブスクライバーの Canister 間通話を行う方法について紹介します。

- [Quicksort](https://github.com/dfinity/examples/tree/master/motoko/quicksort) では Motoko のクイックソートによる配列のソートの方法を紹介します。

- [Simple-to-do](https://github.com/dfinity/examples/tree/master/motoko/simple-to-do) は CRUD 的なデモサービスで、フロントエンドはありません。phone-book と superheroes もご覧ください.

- [Calc](https://github.com/dfinity/examples/tree/master/motoko/calc) は counter demo の発展型です。

## 最小限のフロントエンド

これらの例では、JavaSciprt で最小限のフロントエンドを作成する方法を示しています。上の例にはフロントエンドが含まれていませんでしたが、以下の 2 つの例はフロントエンドとバックエンドのどちらも含まれています。

- [Random_maze](https://github.com/dfinity/examples/tree/master/motoko/random_maze) は IC ベースのランダムな迷路生成です。

- [Cert_var](https://github.com/dfinity/examples/tree/master/motoko/cert-var) は単純な認証済み変数（単一の 32 ビット）で、クライアントサイドの証明書検証を行うものです。

## フルスタック

以下の例は、 React と TypeScript で書かれたフロントエンドを含め、どのように IC 上の Dapps を開発するのかを示します。

- [Life](https://github.com/dfinity/examples/tree/master/motoko/life) では Motoko Canister で動作する Conway の [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) のデモンストレーションをおこないます。3 つのバージョン間のアップグレードと、ステーブル変数を使った状態の移行のデモンストレーションを行う

- [Phone-book](https://github.com/dfinity/examples/tree/master/motoko/phone-book) は CRUD ライクなデモサービスです。

- [Superheroes](https://github.com/dfinity/examples/tree/master/motoko/superheroes) はシンプルな CRUD Dapp です。

- [Auth Client Demo](https://github.com/krpeacock/auth-client-demo) は Internet Identity を使った単純な認証のデモです。

- [IC-Avatar](https://github.com/krpeacock/ic-avatar) は Motoko + React のフルスタックアプリで、より高度な認証、画像アップロード、楽観的更新（Optimistic updates）が可能です。

## 上級

コミュニティから寄稿された大規模なサンプルで、必ずしも最新のものではありません。

- Motoko での [リバーシゲーム](https://github.com/ninegua/reversi) （ [Blog post](https://ninegua.github.io/reversi) 付属）

- Motoko での [QR コードジェネレータ](https://github.com/enzoh/motoko-qr) （ [Medium article](https://medium.com/@ehaussecker/my-first-microservice-on-dfinity-3ac5c142865b) 付属）

- [IC Vault](https://github.com/timohanke/icvault) は E2E のコンテンツ暗号化のデモです。

- Motoko での [認証アセット Canister](https://github.com/nomeata/motoko-certified-http) と [フォーラムへのポスト](https://forum.dfinity.org/t/certified-assets-from-motoko-poc-tutorial/7263) は Internet Computer に認証された変数の大規模なアプリケーションのデモです。

## Dapps 構築のためのビデオガイド

[community conversations](https://www.youtube.com/playlist?list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng)シリーズは、Rust で Dapps を作るためのインストラクションと、Rust で Dapps を作るためのベストプラクティスを紹介するビデオです。

- [Community conversations | overview of building a dapp in Rust](https://www.youtube.com/watch?v=6wyIhzsFbKw)

- [Community conversations | best practices for canisters in Rust](https://www.youtube.com/watch?v=36L33S_DYHY&ab_channel=DFINITY)

その他の有用なビデオシリーズとしては、https://www.youtube.com/watch?v=M2XnywvwxFM&list=PLuhDt1vhGcrfQGLWqhUo9-DFD5JaHqCh1\[Coding with Kyle\] があります。

<!--
# Overview

Take a look at some sample dapps below and see the possibilities of building on the IC. All samples and further projects can be found in the [Samples repo](https://github.com/dfinity/examples). Additional resources can be found in the [Awesome Dfinity repo](https://github.com/dfinity/awesome-dfinity) (a curated set of open-source projects and examples from our community) or [Hackathon projects](hackathon-projects)!

## Hello world

The dapp equivalent of *hello world*, with a separate backend and frontend canister serving a web page.
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/hello) • [Rust](https://github.com/dfinity/examples/tree/master/rust/hello) • [See running](https://6lqbm-ryaaa-aaaai-qibsa-cai.ic0.app/) • [Technical docs](hello)

## Static website

This tutorial shows how to quickly set up a static website structure, add content and basic styling, and deploy to the IC.
[Technical docs](host-a-website) • [Video guide](https://www.youtube.com/watch?v=JAQ1dkFvfPI)

## Basic DEX

To enable DEFI applications on the IC, canisters need to interact with token canisters and the ledger canister. This example dapp illustrates these interactions by showing how to enable an Exchange to take custody of funds, update an internal balance book as users trade, and give custody back to the user as funds are withdrawn.
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/defi) • [Rust](https://github.com/dfinity/examples/tree/master/rust/defi) • [See running](https://gzz56-daaaa-aaaal-qai2a-cai.ic0.app/) • [Technical docs](dex) • [YouTube](https://youtu.be/fLbaOmH24Gs)

## NFT minting

This NFT minting dapp showcases how easy it can be to create a user generated NFT and share it. This dapp uses the [DIP721](https://github.com/Psychedelic/DIP721) NFT standard.
[Rust](https://github.com/dfinity/examples/tree/master/rust/dip721-nft-container) • [Technical docs](nft) • [YouTube](https://youtu.be/1po3udDADp4)

## Basic DAO

Decentralised governance is higlight of the IC and is illustrated by the basic DAO sample code. It illustrates how to initialize a set of accounts and corresponding tokens, how account owners can sumit proposals for other account owners to vote on, and how a proposal is executed given enough favorable votes.
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/basic_dao) • [Rust](https://github.com/dfinity/examples/tree/master/rust/basic_dao) • [Technical docs](dao) • [YouTube](https://youtu.be/3IcYlieA-EE)

## Encrypted note-taking

Create/access/modify confidential notes from multiple devices using [Internet Identity](https://smartcontracts.org/docs/ic-identity-guide/what-is-ic-identity.html) service and end-to-end encryption. The sample code relies upon the *web-serving* and *storage capabilities* of the IC, and highlights two key functionalities: (1) client-side, end-to-end encryption and (2) multi-user and multi-device support.
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_motoko) • [Rust](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_rust) • [See running](https://cvhrw-2yaaa-aaaaj-aaiqa-cai.ic0.app/) • [Technical docs](encrypted-notes) • [YouTube](https://youtu.be/DZQmtPSxvbs)

## ICP transfer

This sample code demonstrates how a dapp can transfer ICP to its most active users.
[Motoko](https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer) • [Rust](https://github.com/dfinity/examples/tree/master/rust/tokens_transfer) • [Technical docs](token-transfer)

## Unity WebGL

The example shows how to deploy a simple Unity WebGL build on the IC, sample code can be found at [Samples repo](https://github.com/dfinity/examples/tree/master/hosting/unity-webgl-template).
[Technical docs](host-unity-webgl)

## Explore further Samples in Motoko

This is a collection of repo-links to additional code samples written in Motoko. Most are also available in the [Motoko playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/). The playground provides the simplest environment for trying out pure Motoko samples without having to download and learn to use the SDK, but does not support dapps with frontends.

### Basic

This is collection of basic getting-started Motoko samples, which demonstrate basic concepts of the IC and the Motoko language.

-   [Actor\_reference](https://github.com/dfinity/examples/tree/master/motoko/actor_reference) shows the IC management canister as an actor (reference).

-   [Counter](https://github.com/dfinity/examples/tree/master/motoko/counter) shows a basic (stable) variable demo.

-   [Echo](https://github.com/dfinity/examples/tree/master/motoko/echo) gives a basic query function demo.

-   [Factorial](https://github.com/dfinity/examples/tree/master/motoko/factorial) shows a basic factorial demo.

-   [Hello\_cycles](https://github.com/dfinity/examples/tree/master/motoko/hello_cycles) illustrates how to receive and transfer cycles and check a balance.

-   [Whoami](https://github.com/dfinity/examples/tree/master/motoko/whoami) is a simple canister that reports the Principal of its caller.

### Intermediate

The intermediate samples demonstrate how to use some of the basic concepts in common use cases. The samples show how to build simple backend functionalities in Motoko.

-   [Classes](https://github.com/dfinity/examples/tree/master/motoko/classes) shows a dynamic actor (class) instantiation.

-   [Pub-sub](https://github.com/dfinity/examples/tree/master/motoko/pub-sub) shows multiple canisters, with publisher-subscriber inter-canister calls.

-   [Quicksort](https://github.com/dfinity/examples/tree/master/motoko/quicksort) shows how to sort an array, via Quick Sort, in Motoko.

-   [Simple-to-do](https://github.com/dfinity/examples/tree/master/motoko/simple-to-do) is a CRUD-like demo service, sans a front end; see also: phone-book and superheroes.

-   [Calc](https://github.com/dfinity/examples/tree/master/motoko/calc) is a more advanced version of counter demo.

### Minimal frontend

These two samples show how to create simple frontends in JavaScript. Where the previous samples did not provide a frontend, these two samples provide both a frontend and a backend.

-   [Random\_maze](https://github.com/dfinity/examples/tree/master/motoko/random_maze) is a random maze generation, with IC-based randomness.

-   [Cert\_var](https://github.com/dfinity/examples/tree/master/motoko/cert-var) shows a simple certified variable (a single 32-bit number), with client-side certificate validation.

### Full stack

These samples demonstrate how to build dapps on the IC, with frontends based on React and TypeScript.

-   [Life](https://github.com/dfinity/examples/tree/master/motoko/life) demonstrates Conway’s [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), running in a Motoko Canister. Demonstrates upgrades among three versions and state migration using stable variables.

-   [Phone-book](https://github.com/dfinity/examples/tree/master/motoko/phone-book) is a CRUD-like demo service.

-   [Superheroes](https://github.com/dfinity/examples/tree/master/motoko/superheroes) is a simple CRUD dapp.

-   [Auth Client Demo](https://github.com/krpeacock/auth-client-demo) is a simple authentication with Internet Identity.

-   [IC-Avatar](https://github.com/krpeacock/ic-avatar) is a full-stack Motoko + React with more advanced authentication, image uploads, and optimistic updates.

### Advanced

Large samples contributed by the community and not necessarily up-to-date:

-   [Reversi](https://github.com/ninegua/reversi) with accompanying [blog post](https://ninegua.github.io/reversi).

-   [QR code generator](https://github.com/enzoh/motoko-qr) with accompanying [Medium article](https://medium.com/@ehaussecker/my-first-microservice-on-dfinity-3ac5c142865b).

-   [IC Vault](https://github.com/timohanke/icvault) demonstrates end-to-end content encryption.

-   [Certified asset canister](https://github.com/nomeata/motoko-certified-http) and [forum post](https://forum.dfinity.org/t/certified-assets-from-motoko-poc-tutorial/7263) demonstrates a larger application of Internet Computer certified variables.

## Video Guides for Building Dapps

These videos from the [community conversations](https://www.youtube.com/playlist?list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng) series cover an introduction to building dapps in Rust, and best practices for building dapps in Rust.

-   [Community conversations | overview of building a dapp in Rust](https://www.youtube.com/watch?v=6wyIhzsFbKw)

-   [Community conversations | best practices for canisters in Rust](https://www.youtube.com/watch?v=36L33S_DYHY&ab_channel=DFINITY)

Additional useful video series can be found at [Coding with Kyle](https://www.youtube.com/watch?v=M2XnywvwxFM&list=PLuhDt1vhGcrfQGLWqhUo9-DFD5JaHqCh1).

-->
