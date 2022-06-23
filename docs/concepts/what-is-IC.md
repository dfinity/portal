# Internet Computer とは？

**Internet Computer** は、開発者・組織・起業家が、安全で、自律的で、改ざん不可能な **Canister** を構築し、展開することを可能にするブロックチェーンであり、**スマートコントラクト** の進化形です。

Dapp の開発者としては、Internet Computer が以下のような重要な特徴を有すると考えるとよいでしょう。

- スマートコントラクトをウェブスピードで実行するための、**グローバルにアクセス可能なパブリックブロックチェーン** で、ユーザーにインタラクティブなウェブコンテンツを提供することができます。

- 世界中の独立したデータセンターで、独立したノードプロバイダーが運営するノードマシンが実行する安全な暗号プロトコル（**Internet Computer Protocol**）です。これにより、スマートコントラクトの安全な実行が保証されます。

- Chain Key 暗号を用いて接続された **ブロックチェーンのネットワーク** で、必要に応じて容量をスケールアウトできます。

## オープンなブロックチェーン

Internet Computer は、地理的に分散したデータセンターに設置された、独立した関係者が運営するノードマシンでホストされるブロックチェーンです。ノードは、ブロックチェーン上で実行されているスマートコントラクトが改ざんされたり停止されたりしないことを保証する、高度な暗号化障害耐性を有する Internet Computer プロトコルを実行します。 Internet Computer は、並列に稼働する個々のサブネットブロックチェーンで構成され、Chain Key 暗号を用いて接続されています。つまり、あるサブネット上で稼働している Canister は、Internet Computer ブロックチェーンの他のサブネットでホストされている Canister をシームレスに呼び出すことができます。

Internet Computer のもう一つの重要な特徴は、完全にオンチェーンで動作する **Network Nervous System**（NNS）と呼ばれる非中央集権のパーミッションレスなガバナンスシステムの管理下で動作することです。NNS は、新しいサブネットブロックチェーンの作成による Internet Computer のスケールアウト、ノードマシンの更新、Internet Computer プロトコルで使用されるパラメータの設定など、いくつかのトピックについて決定を下すことができます。誰もがガバナンスに参加し、NNS に新しい提案を提出したり、オープンプロポーザルに投票することができます。そのためには、ユーザーは ICP (Internet Computer のユーティリティトークン) をステークし、NNS に **neuron** を作成する必要があります。

## 次世代のソフトウェアとサービスの構築

Internet Computer プロトコルは、ソフトウェアの構築・展開・アクセスの方法を再構築することで、プラットフォームに起因するリスクを軽減し、イノベーションへの道を開きます。

例えば、Internet Computer プロトコルでは、開発者は以下のような環境設定に煩わされることなく、Canister スマートコントラクトを使ったコードを書くことに集中できます:

- 物理的または仮想的なネットワーク構成の要件

- ロードバランシングサービス

- ファイアウォール・ネットワークトポロジー・ポート管理

- データベースの構成とメンテナンス

- ストレージボリュームとデバイス

開発者がアプリケーションの構築と価値の提供に集中できるようにすることで、Internet Computer は開発プロセスを簡素化し、市場投入までの時間を短縮し、イノベーションを促進します。

エンドユーザーにとっては、Internet Computer はより少ないリスクで Dapps にアクセスできる安全な環境を提供します。 ブロックチェーンには固有のセキュリティがあるため、Internet Computer 上で動作するプログラムは悪意のあるコードに乗っ取られることはなく、アプリケーションのエンドユーザーと運営者の両方にとって、所有コストの削減にもつながります。

また、Dapps は "自律的"でパブリックであるため、開発者は相互に通信するサービスを書き、サービス間で機能を共有することで、生産性と効率を向上させながら、自信を持ってプロジェクトを革新し、改善する余裕を持つことができます。

また、Internet Computer は、開発者が暗号的に安全な ID を使用してアクセス制御を行うことを可能にし、ユーザー名とパスワードや外部の ID 管理プラグインに頼る必要性を減らします。

<!--
# What is the Internet Computer?

The **Internet Computer** is a blockchain that enables developers, organizations, and entrepreneurs to build and deploy secure, autonomous, and tamper-proof **canisters**, an evolution of **smart contracts**.

As a dapp developer, you might find it useful to think of the Internet Computer as providing the following key features:

-   A **globally-accessible, public blockchain** for running smart contracts at web speed, that can serve interactive web content to users.

-   A secure cryptographic protocol (**Internet Computer Protocol**) run by nodes machines operated by independent node providers in independent data centers all over the world. This guarantees the secure execution of smart contracts.

-   A **network of blockchains** connected using Chain Key cryptography that can scale out its capacity as required.

## An Open Blockchain

The Internet Computer is a blockchain hosted on node machines operated by independent parties and located in geographically distributed datacenters. The nodes run the Internet Computer Protocol, an advanced cryptographic fault-tolerant protocol which ensures that smart contracts running on the blockchain cannot be tampered with or stopped. The Internet Computer is composed of individual subnet blockchains running in parallel and connected using chain key cryptography. This means that canisters running on a subnet can seamlessly call canisters hosted in any other subnet of the Internet Computer blockchain.

Another important feature of the Internet Computer is that it runs under the control of a decentralized permissionless governance system, called **Network Nervous System** (NNS), which runs completely on-chain. The NNS can make decisions on several topics, including scaling out the Internet Computer by creating new subnet blockchains, updating the node machines, and configuring parameters used in the Internet Computer protocol. Anyone can participate in the governance and submit new proposals to the NNS or vote on open proposals. To do so, users have to stake ICP, the Internet Computer utility tokens, and create a **neuron** with the NNS.

## Building the Next Generation of Software and Services

The Internet Computer protocol reduces platform-based risks and paves the way for innovation by re-imagining how software is built, deployed, and accessed.

For example, with the Internet Computer, developers can focus on writing code using canisters without environment-related distractions such as:

-   physical or virtual network configuration requirements

-   load balancing services

-   firewalls, network topology, or port management

-   database configuration and maintenance

-   storage volumes and devices

By enabling developers to focus on building applications and delivering value, the Internet Computer helps simplify the development process, reduce time to market, and foster innovation.

For end-users, the Internet Computer provides a secure environment for accessing dapps with fewer risks. Because of the inherent security of the blockchain, programs running on the Internet Computer cannot be hijacked by malicious code, which also reduces the total cost of ownership for both application end-users or organizations.

In addition, because dapps can be "autonomous" and public, developers can write services that communicate with each other and share functions in ways that increase productivity and efficiency while leaving room to innovate and improve projects with confidence.

The Internet Computer also enables developers to use cryptographically-secure identities to enforce access controls, reducing the need to rely on usernames and passwords or external identity management plug-ins.

-->
