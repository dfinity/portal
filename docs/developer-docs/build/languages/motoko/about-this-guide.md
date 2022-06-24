# Motoko プログラミング言語ガイド

## このガイドについて

この _プログラミング言語 Motoko のガイド_ では、汎用プログラミング言語 Motoko の主な機能を紹介し、言語のニュアンスや適用方法を実践的に学ぶための例や参考情報を提供しています。

プログラミング言語 Motoko は、DFINITY Canister Software Development Kit (SDK) を用いて Internet Computer ブロックチェーンネットワーク 上で動作するプログラムを開発するために最適化されています。
原理的には、Motoko を使ったプログラムをよりトラディショナルなプラットフォームや Internet Computer 以外の文脈で動作するように書くこともできますが、現在のところサポートはベストエフォートであり、完全ではありません。
このガイドでは、Internet Computer で動作させるための特徴的な機能と、全般的な目的に対して汎用的に適用可能な機能をバランスよく紹介するように努めています。

## 想定される読者

このガイドでは、プログラミング言語 Motoko の使用を予定していたり詳しく知りたいと考えているプログラマー向けに、参照情報といくつかの例を提供します。 このガイドに記載されているほとんどの情報は、読者がすでに Internet Computer 上で動作するプログラムを開発していたり、DFINITY Canister SDK を使用しているかどうかにかかわらず有効です。

このガイドでは、読者が基本的なプログラミングの原理や用語に慣れており、C++ や Rust などの高級プログラミング言語でプログラムを書いた経験か、JavaScript や TypeScript などのスクリプト言語を実践的に使った経験があることを前提としています。 また、Motoko は関数型プログラミングの一部を取り入れているため、関数型プログラミングの設計原則に関する知識があれば、Motoko を学ぶのに役立つでしょう。

このガイドは、多様なバックグラウンドを持つ読者が Motoko の基本的な設計原理やセマンティクスを理解できるように努めていますが、言語の実装やドキュメントは継続的に進化していることを頭に入れておいてください。

## このガイドの使い方

Motoko を学ぶためのフレームワークとして、まず [エンジニアリングの価値観と目標](#engineering-values-and-goals) を確認することから始めるとよいでしょう。 [エンジニアリングの価値観と目標](#engineering-values-and-goals) は、Motoko プログラミング言語の開発と進化のための、設計上考慮すべき重要な事柄を説明しています。

考慮すべきことを頭に入れた上で、簡単なコードの例や小さなプログラムを使って、型や型アノテーションの役割などの基本的な概念を学んでいきましょう。

基本的な概念や用語に慣れてきたら、以降の章では、関数の抽象化、ユーザー定義の型定義、ユーザー定義の Actor、非同期通信など、より興味深い方法で計算を行うプログラムを紹介します。

Motoko を使って自分のプログラムを書き始めたら、このガイドに戻って参考情報や例を確認するとよいでしょう。

このガイドに掲載されているコードの例のほとんどはインタラクティブなものです。例をその場で編集し、ブラウザ上のインタープリタでコードを解釈し、その結果を見ることができます。インタープリタは教育目的で提供されています。インタープリタはほとんどの言語機能をサポートしていますが、実際のコンパイラと全く同じではありません。例えば、中程度のサイズの入力に対してスタックオーバーフローが発生することがありますが、実際のコンパイラはその入力を問題なく処理します。システム機能の中には、Cycle、Canister のインポート、ステートを変更するクエリコールなど、完全にはサポートされていないものもあります。

## ドキュメンテーションの表記ルール

このガイドは、以下のような表記ルールに従っています：

- `固定幅フォント` は、サンプルコード、プログラム名、プログラム出力、ファイル名、コマンドラインで入力するコマンドなどに使用されます。

- **太字** のテキストは、コマンドやボタン、ユーザーインターフェースのテキストを強調したり、新しい用語を紹介したりするのに使用されます。

- _イタリック体_ は、書籍のタイトルや、特定の単語や用語を強調するために使用します。

- CAUTION スタイルは、コンテンツが不足していたり、不完全であることを示すために使用されます。

- WARNING スタイルは、コンテンツが古い、または不正確である可能性を示すために使用されます。

- NOTE スタイルは、まだサポートされていないものの、将来のリリースで予定されている機能を説明するコンテンツを示すために使用されます。

## エンジニアリングの価値観と目標

Motoko の設計と実装の背後にあるエンジニアリングの努力は、価値観と目標のコアセットによってドライブされています。 DFINITY のエンジニアリング組織は、これらの価値観と目標のもとに、_継続的な_ 言語開発の一環として、追加・改良する言語機能や拡張機能を定義し、優先順位をつけています。

プログラミング言語 Motoko の方向性を導く原理原則を見える化するために、エンジニアリング組織は以下のようなコアバリューとセカンダリバリューを定義しました。

### コアバリュー

以下の指針は、エンジニアリング組織の基本的な価値観を示すものであり、優先順位は以下の通りです：

1.  [Internet Computer ブロックチェーンネットワーク](../../../../concepts/what-is-ic#ic-overview) とのシームレスな統合：Motoko が Actor ベースモデル、非同期メッセージング、データの永続性、インターフェース記述言語の相互運用性などの機能を完全にサポートすることを保証します。

2.  人間工学：Motoko が親しみやすさ、シンプルさ、明快さ、明示性、その他の特徴を取り入れていることを保証します。

3.  形式的な正しさ：Motoko がステートの分離、健全な型システムと型安全性、精度、パターンマッチ、適切なデフォルトの挙動、コーディングのベストプラクティスを維持することを保証します。

### セカンダリバリュー

以下の原則は、エンジニアリング組織の二次的な価値観であり、重要ではあるが主要な推進要因ではないと考えるものです：

1.  表現力：Motoko は第一級関数、ポリモーフィズム、パターンマッチなどを、言語の進化に合わせて提供しています。

2.  パフォーマンス: Motoko は、初期段階でそれなりに高速な動作を提供し、言語の進化に伴って改善を続けています。

3.  すぐに使い始められること：Motoko は、ライブラリやサンプル、DFINITY Canister SDK との統合など、「バッテリーを含む」形で提供されます。

### 非目標

コアバリューと目標に対抗するものとして、エンジニアリング組織は以下のものをエンジニアリング活動の範囲外である「非目標」としました：

1.  最先端の機能を備えた、より高度な型システムを持つこと。

2.  設計や実装において、機能性よりも単純性を重視すること（"Worse is Better" アプローチ）。

3.  Internet Computer 以外のブロックチェーン上で Motoko プログラムを実行するための相互運用性またはサポート。

## 詳細情報を見つける

Motoko を DFINITY Canister SDK で使用する方法については、[SDK 開発者ツール](../../index.md) を参照してください。

Motoko サービスの設計、使用、デプロイ、あるいは言語設計そのものなどのさまざまなトピックの背景情報については、以下のリソースを参考にしてください。

### WebAssembly

- [WebAssembly home page](https://webassembly.org/).

- [WebAssembly overview video (youtube)](https://www.youtube.com/watch?v=fvkIQfRZ-Y0).

### モダン型システム

- [Practical Foundations for Programming Languages](http://www.cs.cmu.edu/~rwh/pfpl/) by Robert Harper. Cambridge University Press, 2016.

- [Types and Programming Languages](https://www.cis.upenn.edu/~bcpierce/tapl/) by Benjamin C. Pierce. The MIT Press.

## さらなるサポートを受ける

より詳しい情報や技術的なサポートが必要な場合、DFINITY のウェブサイトでは、よくある質問、技術的な記事、開発者の最新情報などに素早くアクセスできます。 ウェブサイトでは、ナレッジベース記事の検索、サポートケースの作成と閲覧、ニュースレターへの登録、最新のブログ記事の閲覧、How To ビデオの閲覧、ソフトウェアアップデートのダウンロード、コミュニティのメンバーとの意見交換などを行うことができます。

ウェブサイトで利用できるリソースに加えて、ソーシャルメディアを利用して DFINITY や他の開発者とつながることができます。また、DFINITY のコミュニティフォーラムにアクセスして会話に参加することもできます。Discourse のコミュニティフォーラムにアクセスして会話に参加することもできます。

<!--
# Motoko Programming Language Guide

## About this guide

The *Motoko Programming Language Guide* introduces key features of the general-purpose Motoko programming language and provides examples and reference information to help you learn the nuances of the language and the practical implications of how to apply it.

The Motoko programming language is optimized for developing programs that run on the Internet Computer blockchain network and to work with the DFINITY Canister Software Development Kit (SDK). You could, in principle, also write programs using Motoko for more traditional platforms and to run in other contexts, though support for this is currently best-effort and incomplete. This guide attempts to strike a balance between highlighting features that are uniquely suited to running on the Internet Computer and features that are generally-applicable or well-suited for programs running on all targets.

## Intended audience

This guide provides reference information and examples for programmers who want to explore or plan to use the Motoko programming language. Most of the information in this guide is applicable independent of whether you are developing programs to run on the Internet Computer or working with the DFINITY Canister SDK.

The guide assumes you are familiar with basic programming principles and terminology and have at least some experience writing programs in a high-level programming language such as C++ or Rust, or have practical experience working with a scripting language such as JavaScript or TypeScript. In addition, Motoko incorporates some aspects of functional programming, so you might find some knowledge of functional programming design principles helpful in learning to use Motoko.

Although this guide is intended to help readers from different backgrounds understand the basic design principles and semantics of the Motoko, you should keep in mind that the language implementation and the documentation are also continuing to evolve.

## Using this guide

To provide a framework for learning Motoko, you might want to start by reviewing [Engineering values and goals](#_engineering_values_and_goals). The [Engineering values and goals](#_engineering_values_and_goals) describe the core design considerations for the development and evolution of the Motoko programming language.

With those considerations in mind, you can start to explore fundamental concepts, including the role of types and type annotations, in simple code examples and small programs.

Once you are familiar with the basic concepts and terminology, later sections introduce programs that compute in more interesting ways, including function abstractions, user-defined type definitions, user-defined actors, and asynchronous communication.

As you begin using Motoko to write your own programs, you can return to this guide for reference information and examples.

Most of the code examples in this guide are interactive: you can live edit the example, interpret the code in the browser and see the result. The interpreter is provided for education purposes. While most of the language features are supported in the interpreter, they are not exactly the same as the real compiler. For example, you may get a stack overflow for a medium-size input, while the real compiler handles the input just fine. Some of the system features are not fully supported, such as cycles, canister imports and state-mutating query calls.

## Documentation conventions

The following conventions are used in this guide:

-   `Fixed-width` font is used for sample code, program names, program output, file names, and commands that you type at the command line.

-   **Bold** text is used to emphasize commands, buttons, or user interface text, and to introduce new terms.

-   *Italics* are used for book titles and to emphasize specific words or terms.

-   The CAUTION style is used to indicate content that is missing or incomplete.

-   The WARNING style is used to indicate where content is outdated or potentially inaccurate.

-   The NOTE style is used to indicate content that describes a feature that is not yet supported but is planned for a future release.

## Engineering values and goals

The engineering effort behind the design and implementation of Motoko is driven by a core set of values and goals. The DFINITY engineering organization uses these values and goals to define and prioritize the language features and enhancements to add and improve as part of *ongoing* language development.

For transparency into the principles that guide the engineering effort, the engineering organization has identified the following sets of core values and secondary values for driving the direction of the Motoko programming language.

### Core values

The following guiding principles represent the core values of the engineering organization in prioritized order:

1.  Seamless integration with the [Internet Computer blockchain network](../../../../concepts/what-is-ic#ic-overview) to ensure that Motoko provides full language support for the actor-based model, asynchronous messaging, data persistence, interface description language interoperability, and other features.

2.  Ergonomics to ensure that Motoko embraces familiarity, simplicity, clarity, explicitness, and other human factors.

3.  Formal correctness to ensure that Motoko maintains state isolation, a sound type system and type safety, precision, pattern matching, appropriate defaults, and coding best-practices.

### Secondary values

The following principles represent the secondary values of the engineering organization that are deemed important but not primary driving factors:

1.  Expressiveness, so that Motoko provides first-class functions, polymorphism, pattern matching, and more as the language evolves.

2.  Performance, so that Motoko provides reasonably fast operation initially and continues to improves as the language evolves.

3.  Readiness, so the Motoko comes with "batteries included" in the form of libraries and examples and out-of-the-box integration with the DFINITY Canister SDK.

### Non-goals

As a counterpoint to the core values and goals, the engineering organization also identified the following as "non-goals" that are outside of the scope of the engineering effort:

1.  Having a more advanced type system, with cutting-edge features.

2.  Simplicity over functionality in design or implementation (the "Worse is Better" approach).

3.  Interoperability or support for running Motoko programs on blockchains other than the Internet Computer.

## Finding more information

For information about using Motoko with the DFINITY Canister SDK, see the [SDK Developer Tools](../../index.md).

For background information on various topics relevant to the design, use, or deployment of Motoko services, or the language’s design itself, consider the following resources as a starting point:

### WebAssembly

-   [WebAssembly home page](https://webassembly.org/).

-   [WebAssembly overview video (youtube)](https://www.youtube.com/watch?v=fvkIQfRZ-Y0).

### Modern type systems

-   [Practical Foundations for Programming Languages](http://www.cs.cmu.edu/~rwh/pfpl/) by Robert Harper. Cambridge University Press, 2016.

-   [Types and Programming Languages](https://www.cis.upenn.edu/~bcpierce/tapl/) by Benjamin C. Pierce. The MIT Press.

## Getting additional support

If you are looking for more information or technical support, the DFINITY website provides quick access to frequently-asked questions, technical articles, developer updates, and other resources. From the website, you can search knowledge base articles, open and view support cases, sign up for the newsletter, read the latest blog posts, view how-to videos, download software updates, or exchange ideas with members of the community.

In addition to the resources available on the website, you can connect with DFINITY or other developers using social media or by visiting the DFINITY Community Forum on Discourse and joining the conversation.

-->
