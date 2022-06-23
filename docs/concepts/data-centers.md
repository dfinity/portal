# 分散型データセンター

Internet Computer ブロックチェーンは、あらゆる物理的な場所に存在する物理的なハードウェアではありません。その代わりに、Internet Computer ブロックチェーンは、世界中の独立して運用されているデータセンターにより提供されている計算資源を組み合わせています。

パブリックまたはプライベートなクラウドとは異なり、Internet Computer ブロックチェーンは 1 つの民間企業により所有・運営されてはいません。 Internet Computer ブロックチェーンは、プロトコルで定義されたアルゴリズムによる分散型のガバナンスシステムによって管理され、更新と運用が行われる公共事業です。そのアーキテクチャは、複数のコンピュータが 1 つの非常に強力な仮想マシンのように動作することを可能にします。

Internet Computer ブロックチェーンを構成する世界各地のデータセンターに設置されたノードは、サブネットブロックチェーンに編成され、Chain Key 暗号を用いて相互に接続されます。分散型アーキテクチャにより、ファイアウォールまたは攻撃を受けやすい技術無しで安全な通信が可能です。独立したノード運用者は、ノードをホストしてもらうためにデータセンターに支払い、Internet Computer ブロックチェーン上で動作する dapps をサポートするコンピューティング能力とホスティングサービスを提供することで報酬を受け取ります。

## サブネットとデータセンター

ブロックチェーンのあらゆるサブネットを構成する物理的なノードは、サービスの中断に耐えうる真の分散型ブロックチェーンを提供するために、異なる場所のデータセンターに分散されています。 ノード自体は、データセンターの所在地とは関係なく、異なる当事者が所有または提供しているかもしれません。

下図は、4 つのデータセンターにノードがあるサブネットの簡略図です。

![data center simplified](_attachments/data-center-simplified.svg)

シンプルなシナリオを下記に示します。

- 地理的に独立した 4 つのデータセンターがあります。

- 各データセンターには、複数のノードプロバイダから提供されたハードウェアが設置されます。

- 一つのノードプロバイダーが複数のデータセンターに機器を設置する場合があります。

この例では、複数のデータセンターにノードを持つ 1 つのサブネットブロックチェーンを示していますが、必要に応じて、どのノードもこのブロックチェーンサブネットから移動して、新しいブロックチェーンサブネットを形成することができます。 ネットワークトポロジーの変更は、 **Network Nervous System**（NNS） と呼ばれる Internet Computer ブロックチェーンのガバナンスシステムによって管理されます。

## ノードプロバイダーとデータセンター事業者

多くの場合、ノードプロバイダまたはそのパートナーであるデータセンター事業者は、Internet Computer ブロックチェーンが動作する機器の計算能力を監視・維持する責任を負っています。 例えば、ノードプロバイダーやデータセンター事業者は、ハードウェアの故障やシステムの不具合が発生した場合、機器の修理や交換を行う必要があります。 一方、ネットワークの運用やアップグレードは、分散型のガバナンスシステムである NNS（Network Nervous System）によって監視・管理されます。

## もっと詳しく知りたいですか？

データセンターの運用やノードプロバイダーについてより多くの情報をお探しの場合は、以下の関連資料をご覧ください。

- [Internet Computer Help Center for Node Providers (FAQ and articles)](https://support.internetcomputer.org/hc/en-us/sections/4405489337748-Node-Provider)

<!--
# Decentralized Data Centers

The Internet Computer blockchain is not physical hardware that exists in any physical location. Instead, the Internet Computer blockchain combines computing resources provided by independently-operated data centers around the world.

Unlike a public or private cloud, the Internet Computer blockchain is not owned and operated by a single private company. Instead, the Internet Computer blockchain is a public utility with updates and operations that are managed through an algorithmic, decentralized governance system defined in the protocol. Its architecture enables multiple computers to operate like one, very powerful, virtual machine.

The nodes located in data centers around the globe that make up the Internet Computer are organized into subnet blockchains that in turn connect to each other using Chain Key cryptography. The distributed architecture enables secure communication without firewalls or technologies that are vulnerable to attack. Independent node operators pay data centers to host their nodes and receive remuneration for contributing computing capacity and hosting services to support dapps running on the Internet Computer blockchain.

## Subnets and Data Centers

To provide a truly decentralized blockchain that can withstand potential service disruptions, the physical nodes that make up any given blockchain subnet are distributed across data centers in diverse locations. The nodes themselves might be owned or provided by different parties in partnership or unaffiliated with the data center location where they operate.

The following diagram provides a simplified view of a subnet with nodes in four data centers.

![data center simplified](_attachments/data-center-simplified.svg)

In this simplified scenario:

-   There are four geographically-independent data centers.

-   Each data center has hardware supplied by multiple node providers.

-   Any single node provider might have equipment in multiple data centers.

Although this example represents one subnet blockchain with nodes in multiple data centers, any of the nodes could be moved out of this blockchain subnet to form a new blockchain subnet, if needed. Changes to the network topology are managed through the Internet Computer blockchain governance system called the **Network Nervous System** (NNS).

## Node Providers and Data Center Operators

In most cases, node providers—or the data center operators they partner with—are responsible for monitoring and maintaining the compute capacity of the equipment on which the Internet Computer blockchain runs. For example, node providers or data center operators might need to repair or replace equipment if there’s a hardware failure or if a system under-performs. Network operations and upgrades, however, are monitored and managed through the decentralized governance system, the Network Nervous System (NNS).

## Want to Learn More?

If you are looking for more information about data center operations and node providers, check out the following related resources:

-   [Internet Computer Help Center for Node Providers (FAQ and articles)](https://support.internetcomputer.org/hc/en-us/sections/4405489337748-Node-Provider)

-->
