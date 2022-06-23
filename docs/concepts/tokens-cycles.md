# トークンと Cycle

Internet Computer のエコシステムの中で、Internet Computer プロトコルトークン（ICP トークン）は、オープンマーケットで価値が決定されるネイティブユーティリティトークンです。 ICP トークンは Internet Computer のガバナンスとエコノミクスの両方において重要な役割を果たしています。

## ICP トークンの入手方法

ICP トークンを取得する方法は、以下に示すようにいくつかあります:

- ICP トークンを取り扱っている取引所を通じて、直接購入する

- Internet Computer のガバナンスに参加した報酬としてトークンを受け取る

- Internet Computer 協会 (ICA) または DFINITY 財団を通じて助成を受ける

- ノードプロバイダとして計算能力を提供することに対する報酬としてトークンを受け取る

## ICP トークンの使用方法

ICP トークンを持っていても使い方がわからない場合のために、最も一般的な 3 つのシナリオを以下の図で簡単に説明します。

![icp tokens how to use](_attachments/icp-tokens-how-to-use.svg)

この図が示すように、ICP トークンをどのように使用するかは、主にトークンを取得する目的によって異なります。 例えば、あなたが開発者や起業家であれば、ICP トークンを **Cycle** に変換することができます。Cycle は、製品やサービスをマーケットに提供する Canister スマートコントラクトを実行するための支払いに使用できます。 ガバナンスに参加して Internet Computer の方向性に影響を与えることに興味があるコミュニティメンバーであれば、ICP トークンを Neuron と呼ばれるステークにロックアップすることで、提案を提出したり投票したりすることができます。

## Cycle の仕組み

開発者にとって ICP トークンが重要なのは、それが Cycle に変換され、その Cycle がリソース消費の支払いに使われるからです。

例えば、給湯器、キッチンコンロ、ドライヤー、スペースヒーターなどにプロパンガスを使用している家があるとします。これらの機器を使用すると、手持ちのガスがいずれ枯渇するため、機器を使用し続けるために定期的にプロバイダーに連絡してガスを補充することになります。 Canister のスマートコントラクトはこれと似ており、各 Canister には、アプリケーションが消費する通信、計算、ストレージの支払いに利用できる Cycle を持つアカウントが必要です。

## 計算コスト

- Cycle は、物理的なハードウェア、ラックスペース、エネルギー、ストレージデバイス、および帯域幅などのリソースを含む、Internet Computer ブロックチェーンでホストされるアプリケーションの運用にかかる実際のコストを反映しています。

- Canister スマートコントラクトは、完全な実行ができるだけの対価を支払う必要がありますが、プラットフォームは、悪意のあるコードがリソースを消耗するのを防ぐために、Canister が保持・消費する Cycle 数に制限を設けています。

- 運用コストは比較的安定しているため、例えば 100 万件のメッセージを処理するのに必要な Cycle 数を予測しやすくなっています。

- 通信、計算、ストレージに関連するコストは、時間の経過とともに増加するよりも減少する可能性の方が高いです。例えば、ディスクスペースが安価になり、ハードウェアがより効率的になり、Internet Computer プロトコルも時間の経過とともに改良され、リソースをより有効に利用できるようになるからです。

- Cycle は通貨ではありません。さらに言えば、Cycle を ICP トークンに戻すことはできません。ただし、Canister 間で転送することで、オペレーションの支払いを行うことはできます。

厳密なコストについては、[Computation and Storage costs](../developer-docs/deploy/computation-and-storage-costs.md) のテーブルをご覧ください。

## トークンの価値とボラティリティ

- トークンは Internet Computer ブロックチェーンの価値を反映しており、変動する可能性があります。トークンの価値が Canister が処理できるメッセージの数に影響を与えないように、トークンはリソースへの直接の支払いには使用されません。

- トークンは、トークンホルダー間で交換したり、**Neuron** にロックアップして、ガバナンスシステムの一部としての議決権を得ることができます。

- トークンは、計算能力を提供するノードプロバイダーや、投票や提案の提出によって Internet Computer のガバナンスに参加する Neuron ホルダーへの報酬として使用されます。

## ノードプロバイダーへの支払い

このモデルにより、Internet Computer ブロックチェーンはノードプロバイダーにコンピューティングパワーの容量に対する予測可能な経済モデルを提供し、必要なときに必要な場所でリソースが利用できるようにします。ノードプロバイダーは、アクティブノードとスペアノードの両方に対して報酬を受け取るため、Internet Computer ブロックチェーンは通常のトラフィックとワークロードの急増の両方に対応できるキャパシティを持つことができます。

Internet Computer の経済モデルでは、キャパシティを管理する権限と責任の多くが Network Nervous System というガバナンスシステムに置かれています。 報酬やサービスレベルの要求に関する具体的な内容については、本ドキュメントの範囲外です。

## もっと詳しく知りたいですか？

トークンや Cycle についての詳しい情報をお探しの方は、以下の関連資料をご覧ください:

- [トークンエコノミクスの概要（動画）](https://www.youtube.com/watch?v=H2p5q0PR2pc)

<!--
# Tokens and Cycles

Within the Internet Computer ecosystem, Internet Computer Protocol tokens (ICP tokens) are a native utility token with a value determined on the open market. ICP tokens play a key role in both the governance and the economics of the Internet Computer.

## How to Get ICP Tokens

There are a few different ways you might acquire ICP tokens. For example, you might:

-   Purchase ICP tokens directly through an exchange that lists ICP tokens available for trade.

-   Receive tokens as rewards for participating in the governance of the Internet Computer

-   Receive a grant of tokens through the Internet Computer Association (ICA) or the DFINITY Foundation.

-   Receive tokens as remuneration for providing computing capacity as a node provider.

## How to Use ICP Tokens

If you have ICP tokens, but aren’t sure how to use them, the following diagram provides a simplified overview to illustrate the three most common scenarios.

![icp tokens how to use](_attachments/icp-tokens-how-to-use.svg)

As this diagram suggests, how you use ICP tokens depends primarily on your goals in acquiring them. For example, if you are a developer or entrepreneur, ICP tokens can be converted to **cycles**. Cycles can then be used to pay for running canisters that deliver products and services to the market. If you are a member of the community interested in participating in governance and influencing the direction of the Internet Computer, you can lock up ICP tokens in a stake—called a neuron—so that you can submit and vote on proposals.

## How Cycles Work

For developers, ICP tokens are important because they can be converted to cycles that, in turn, are used to pay for resource consumption.

As an example, imagine you have a house where propane is used for a water heater, kitchen stove, dryer, and space heater. As you use these appliances, you deplete the supply of gas you have on hand, so periodically you contact a provider to refill your supply so you can continue to use your appliances without interruption. This is similar to canisters in that each canister must have an account with cycles available to pay for the communication, computation, and storage that the canister’s application consumes.

## Cost of Computation

-   Cycles reflect the real costs of operations for applications hosted in the Internet Computer blockchain including resources such physical hardware, rack space, energy, storage devices, and bandwidth.

-   Canister smart contracts must be able to pay for complete execution (all or nothing), but the platform sets limits on how many cycles a canister can hold and consume to prevent malicious code from draining resources.

-   The relative stability of operational costs makes it easier to predict the cycles required to process, for example, a million messages.

-   The costs associated with communication, computation, and storage are more likely to decrease than to increase over time—for example, because disk space becomes cheaper, hardware more efficient and the Internet Computer protocol will also improve over time to make better use of the resources.

-   Cycles are not a currency; in particular cycles cannot be converted back to value in the form of Internet Computer Protocol tokens, but can be transferred between canisters to enable canisters to pay for operations.

For exact costs see the tables in [Computation and Storage costs](../developer-docs/deploy/computation-and-storage-costs.md)

## Token Value and Volatility

-   Tokens reflect the value of the Internet Computer blockchain and can fluctuate. To prevent the token value from affecting the number of messages a canister can process, tokens are not used to pay for resources directly.

-   Tokens can be exchanged between token holders or locked up in **neurons** to secure voting rights as part of the governance system.

-   Tokens are used to reward node providers for providing compute capacity and neuron holders for participating in the governance of the Internet Computer by voting and submitting proposals.

## Payment to Node Providers

With this model, the Internet Computer blockchain provides node providers with a predictable economic model for computing power capacity to ensure resources are available when and where they are needed. Node providers receive compensation for both active and spare nodes so that the Internet Computer blockchain has capacity to handle both normal traffic and workload spikes.

The Internet Computer economic model places much of the power and responsibility of managing capacity on the governance system—the Network Nervous System. Specific details about compensation and service level requirements are outside the scope of this document.

## Want to Learn More?

If you are looking for more information about tokens and cycles, check out the following related resources:

-   [Overview of Token Economics (video)](https://www.youtube.com/watch?v=H2p5q0PR2pc)

-->
