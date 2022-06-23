# ニューロンとガバナンス

分散化されたブロックチェーンとして、Internet Computer の設定や振る舞いに加えられたあらゆる変更は、Network Nervous System(NNS) と呼ばれる統治主体によって管理されます。NNS は Internet Computer ブロックチェーンの以下を含む多くの面を管理します。

- どのデータセンタープロバイダがネットワークに参加しているか

- データセンタープロバイダが受け入れたノードの数、ロケーション、所有者

- サブネットブロックチェーンへのノードのアサイン

- Canister スマートコントラクトまたは新しいバージョンのプロトコルへのアップグレードを許可するかどうか

さらに、統治主体のメンバーのみが、Internet Computer レプリカのアップデートや Internet Computer Protocol の修正の採否に投票できます。

## ステークホルダーの投票権

Internet Computer 上のトークンは概して流動的であるため、保有者がガバナンスの目的に使用できるほど十分に価格が安定することを保証するものではありません。責任あるガバナンスに必要な安定性を提供するため、トークンは **ニューロン** に変換できます。ニューロンは、一定期間 (ロックアップ期間)は交換できない ICP トークンの数量を表します。

個人や組織がある量の ICP トークンをニューロンにロックアップしている場合、ニューロンの保有者は提案に対する投票権を持ち、ロックアップされた ICP の数量、ロックアップの期間、相対的な投票数に比例して投票に対する支払いを得ます。

Internet Computer ブロックチェーンは、ニューロンにロックアップされた ICP トークン数を追跡し、ICP トークンアカウントの残高管理と共に、投票に必要なロジックを提供します。

<!--
# Neurons and Governance

As a decentralized blockchain, all changes to the configuration and behavior of the Internet Computer are controlled by a governance body called the Network Nervous System (NNS). The NNS controls many aspects of the Internet Computer blockchain including the following:

-   which data center providers participate in the network

-   the number, location, and ownership of the nodes accepted from a data center provider

-   assignment of nodes to subnet blockchains

-   whether upgrades to canisters or to a new protocol version are allowed or not

In addition, only members of the governance body can vote to adopt or reject requests to upgrade Internet Computer replicas or modify the Internet Computer protocol.

## Voting Rights for Stakeholders

Because tokens on the Internet Computer are generally liquid, they do not represent a stable enough commitment on the part of their holders for them to be used for governance purposes. To provide the stability required for responsible governance, tokens can be converted to **neurons**. A neuron represents a number of ICP tokens that cannot be exchanged for a minimum period of time (the lock-up period).

When a person or organization has some number of ICP tokens locked up in a neuron, the neuron holder has the right to vote on proposals, and to be paid for voting in proportion to the number of ICP locked up, the length of the lock-up period and the relative number of votes cast.

The Internet Computer blockchain tracks the number of ICP tokens that are locked up in neurons and provides the logic necessary for voting in conjunction with managing ICP token account balances.

-->
