# ハッカソン プロジェクト

世界中の開発者がハッカソンに参加し、 Dapp やツールなどの様々なプロジェクトを Internet Computer 上で構築しています。優勝したプロジェクトのいくつかのソースコードをご覧になり、インスピレーションを得てください。

## DFINIHack

ハッカソンは優れた学びの方法です。DFINITY では外部のハッカソンに加え、社内のハッカソンも開催しています。コーディング経験の有無に関わらず、どんな分野からでも誰でも参加できます。目的は新しいユースケースの探索、開発者に提供するドキュメントやツールの評価、そしてビルダー文化を内部に浸透させることです。

### Sidekick

Sidekick は、数行のコードで Canister スマートコントラクトを構築できる Internet Computer 上で動作する Dapp です。

- [GitHub のコードはこちら](https://github.com/blynn/sidekick)

- [デモ用 Canister](https://ffgig-jyaaa-aaaae-aaaoa-cai.raw.ic0.app)

### IC Vault

IC Vault はエンドツーエンドの暗号化（言い換えると Internet Computer 内部で平文を見ることができない）により、Internet Computer を経由したデバイス間のデータが安全に同期されることを保証します。

- [GitHub のコードはこちら](https://github.com/timohanke/hack13)

- [デモ用 Canister](https://xggrc-cyaaa-aaaaj-aaasq-cai.raw.ic0.app)

- [YouTube のプレゼンテーション](https://youtu.be/16xxA8EKEhE)

### PrivIC

PrivIC（「プライバシー」と発音します）は、 Internet Computer 上での ID 管理を提供します。ユーザーは、名前、生年月日、E メール、電話番号などの属性からなる自分の ID を管理するため、直接 PrivIC アプリにアクセスするか、アプリの登録・サインイン機能で利用することができます。

- [GitHub のコードはこちら](https://github.com/open-ic/priv-ic)

### DeFind

DeFind はステーキングベースの検索エンジンです。インターネットが普及した今日、検索エンジンはウェブクローラーを使ってデータを非公開のアルゴリズムに送り込んでいます。広告主にとって、これは間違ったインセンティブになります。例えば、見えないテキストでウェブクローラーを騙したり、ボットを通じて偽のトラフィックを発生させたりするインセンティブが働くかもしれません。

- [GitHub のコードはこちら](https://github.com/IC-Search/ic-search)

- [デモ用 Canister](https://jbioa-siaaa-aaaai-qanfq-cai.ic0.app)

### IC Notary

IC Notary はある時点の文書（または任意のファイル）を保有していたことを証明できるタイムスタンプ付き公証サービスです。ユーザーはファイルを IC Notary にアップロードすることができ、また過去にアップロードされたファイルを検索・ダウンロードすることもできます。

- [GitHub のコードはこちら](https://github.com/jplevyak/dfnhack7)

- [デモ用 Canister](https://jbxh5-eqaaa-aaaae-qaaoq-cai.ic0.app)

### IC Netboot

IC Netboot は開発者が Canister から直接、仮想マシン（VM）を起動できるようにし、起動インフラを分散化するとともに機能停止を防ぎます。さらに、zookeeper のようなアプリケーションの VM データの予備になりえます。また、 TFTP/DHCP/iPXE のような合法的なプロトコルで Internet Computer と対話するための概念実証（Proof of Concept）となります。

- [GitHub のコードはこちら](https://github.com/farazshaikh/team14)

<!--
# Hackathon Projects

Developers from around the world are participating in hackathons, building dapps, tools and other types of projects on the IC. Get inspired, and see the source code of some of the winning projects.

## DFINIHack

Hackathons are a great way to learn, and that’s why we, in addition to external hackathons, run internal hackathons at DFINITY. Everyone from all departments can participate, with or without coding experience. The objective is to explore new use cases, assess the documentation and tools we provide developer, and to promote a builder’s culture internally.

### Sidekick

Sidekick is a dapp running on the Internet Computer that can build canisters from a few lines of code.

-   [See code on GitHub](https://github.com/blynn/sidekick)

-   [Live Canister](https://ffgig-jyaaa-aaaae-aaaoa-cai.raw.ic0.app)

### ICVault

IC Vault ensures the secure synchronization of data between devices via the Internet Computer via end-to-end encryption (i.e., the Internet Computer cannot see any cleartext).

-   [See code on GitHub](https://github.com/timohanke/hack13)

-   [Live Canister](https://xggrc-cyaaa-aaaaj-aaasq-cai.raw.ic0.app)

-   [Presentation on YouTube](https://youtu.be/16xxA8EKEhE)

### PrivIC

PrivIC (pronounced “privacy”) provides identity management on the Internet Computer. Users can visit the PrivIC app directly to manage their identity, which consists of attributes such as name, date of birth, email, and phone number, or do so as part of the register/sign-in flow from an app.

-   [See code on GitHub](https://github.com/open-ic/priv-ic)

### DeFind

DeFind is a staking-based search engine. With the internet today, search engines use web crawlers to feed data into secret algorithms. For advertisers, this creates the wrong incentives — they may be incentivized to trick the web crawler with invisible text, for example, or generate fake traffic through bots.

-   [See code on GitHub](https://github.com/IC-Search/ic-search)

-   [Live Canister](https://jbioa-siaaa-aaaai-qanfq-cai.ic0.app)

### ICNotary

IC Notary is a timestamped notarization service that allows users to prove that they held a document (or an arbitrary file) at a certain point in time. The user can upload the file toICNotary, and also search and download previously uploaded files.

-   [See code on GitHub](https://github.com/jplevyak/dfnhack7)

-   [Live Canister](https://jbxh5-eqaaa-aaaae-qaaoq-cai.ic0.app)

### ICNetboot

IC Netboot allows developers to boot a virtual machine (VM) directly from a canister, making the boot infrastructure decentralized and unstoppable. Furthermore, it can be a failover for VM data for applications like zookeeper. Lastly, this is a proof of concept for talking to the Internet computer over legal protocols like TFTP/DHCP/iPXE.

-   [See code on GitHub](https://github.com/farazshaikh/team14)

-->
