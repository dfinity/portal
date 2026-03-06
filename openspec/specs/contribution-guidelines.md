# Contribution Guidelines Specification

## Overview

All documentation contributions must follow specific style, format, and process
requirements. This spec consolidates the rules from the style guide, README best
practices, and PR checklist.

## PR Checklist (Required)

Every PR that adds or changes documentation content must satisfy:

1. Follows the [developer docs style guide](../../style-guide.md).
2. Follows the [best practices and guidelines](../../README.md#best-practices).
3. New documentation pages include [document tags](#document-tags).
4. New documentation pages include [SEO keywords](#seo-keywords).
5. New documents are in `.mdx` file format.
6. New documents are registered in [`sidebars.js`](../../sidebars.js).
7. New directories or documents are added to [`.github/CODEOWNERS`](../../.github/CODEOWNERS) if a specific team should review them.

## Document Tags (Required)

All documentation pages must include tags via `MarkdownChipRow`:

```mdx
import { MarkdownChipRow } from "/src/components/Chip/MarkdownChipRow";

# Page title

<MarkdownChipRow labels={["Beginner", "Motoko", "Tutorial"]} />
```

### Required Tags

- **Skill level** (one of): `Beginner`, `Intermediate`, `Advanced`
  - Exception: Reference pages do not require a skill level tag.
- **Document type** (one of): `Getting started`, `Developer tools`, `Concept`, `Reference`, `Tutorial`

### Optional Tags

- **Language**: `Motoko`, `Rust`, `Python`, `Typescript`, `Solidity`
- **Integration**: `Bitcoin`, `Ethereum`
- **Governance** (for NNS/SNS docs)

## SEO Keywords (Required)

All documentation pages must include frontmatter keywords:

```yaml
---
keywords: [intermediate, browser js, javascript, ICP JavaScript agent, agents]
---
```

Keywords must include at minimum the document tag words (skill level, document type).

## Page Structure Template

```mdx
---
keywords: [keyword1, keyword2, keyword3]
---

import { MarkdownChipRow } from "/src/components/Chip/MarkdownChipRow";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Page title

<MarkdownChipRow labels={["label1", "label2", "label3"]} />

Introduction text.

## Prerequisites (optional)

<Tabs>
<TabItem value="prereq" label="Prerequisites" default>
Before you start, verify that you have:
<input type="checkbox"/> <a href="/docs/building-apps/getting-started/install">Install the IC SDK.</a>
</TabItem>
</Tabs>

## Topic 1

### Subtopic 1

## Resources

- [Link](link.com)
```

## Headings

| Heading | Usage |
|---------|-------|
| `#` H1 | Page title only (once per page) |
| `##` H2 | Primary topics/sections |
| `###` H3 | Subtopics or tutorial steps |
| `####` H4 | Steps within guides (with bullet), glossary terms, sub-subtopics |

## Capitalization Rules

- Sentence case for titles and headings (capitalize first word + proper nouns only).
- GUI button names match the GUI's capitalization and are **bolded**.
- Code references match the code's capitalization.

### Proper Nouns (Always Capitalized)

Blockchain Singularity, Candid, DFINITY, DFINITY Foundation, Internet Computer,
Internet Computer Protocol, Internet Identity, JavaScript, Motoko, Mops,
Network Nervous System, NodeJS, Rust, Service Nervous System, tECDSA, tSchnorr,
TypeScript, WebAssembly (Wasm), and tool/company/project names.

### Common Abbreviations

BTC, CDK, ckBTC, ckETH, ckERC20, ckUSDC, ckLINK, DAO, DeFi, ECDSA, HTTP, HTTPS,
ICP, ICRC-1/2/3/7/37, II, NFT, NNS, SDK, SNS (plural: SNSes), XDR, UTXO.

## Language & Terminology

### Key Terms

| Use | Instead of |
|-----|------------|
| `dapp` | decentralized application, dApp |
| `ICP` | IC, the IC (exceptions: IC SDK, IC interface specification) |
| `canister` | smart contract (on ICP) |
| `dfx` or \`dfx\` | lowercase always |
| `mainnet` | main net (prefaced with "the") |
| `onchain` | on-chain |
| `frontend` / `backend` | front-end / back-end |
| `multichain` | multi-chain |
| `inter-canister` | intercanister (hyphenated) |
| `top-up` | topup (hyphenated) |
| `Chain Fusion` | chain fusion |
| `vetKeys` | VetKeys |
| `Web3` | web3 |

### Writing Style

- **No "we" or "us"**: Use protocol point of view ("the protocol ensures," not "we ensure"). Exception: blog posts.
- **No "system" or "platform"**: Say "Internet Computer" or "protocol."
- **American spelling/grammar**: With British capitalization rules for article titles.
- **Avoid learning language**: No "what you will learn," "learning objectives."
- **Avoid informal language**: No jokes, "dig in," "take a deep dive," "go down the rabbit hole."
- **Be brief**: Cut fluff, avoid redundancy, keep sentences pointed.
- **Non-native English friendly**: Avoid idioms and confusing phrases.

## Code Snippets & Blocks

- In-line code for method names, commands, variables: \`install_code\`, \`dfx deps\`.
- Code blocks must specify the language and file title:

```motoko title="src/hello_backend/main.mo" no-repl
actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
```

- Motoko code: include `no-repl` for incomplete examples.
- Reference code via submodule files or GitHub URLs (avoid inline duplication):

```motoko file=../submodules/samples/motoko/basic_bitcoin/src/basic_bitcoin/src/Main.mo#L55-L78
```

- CLI flags always at end of command: `dfx deploy --background`, not `dfx --background deploy`.

## Multi-Language Code Tabs

Use the custom `AdornedTabs` component:

```mdx
import TabItem from "@theme/TabItem";
import { AdornedTabs } from "/src/components/Tabs/AdornedTabs";
import { AdornedTab } from "/src/components/Tabs/AdornedTab";
import { BetaChip } from "/src/components/Chip/BetaChip";

<AdornedTabs groupId="language">
<TabItem value="motoko" label="Motoko" default>
```motoko
// Motoko code
```
</TabItem>
<TabItem value="rust" label="Rust">
```rust
// Rust code
```
</TabItem>
</AdornedTabs>
```

## Tooltips

For glossary terms (recommended in Beginner content):

```mdx
import { GlossaryTooltip } from "/src/components/Tooltip/GlossaryTooltip";

I'm a <GlossaryTooltip>canister</GlossaryTooltip> deployed on ICP.
```

Terms must be defined in `/static/glossary.txt` as `word=definition.` (one per line).

## Formatting Rules

- **Numbers**: Use `_` separator (44_760_000, not 44,760,000).
- **Storage**: XiB format (7TiB, 5GiB, 500MiB, 10KiB).
- **API methods**: Capitalized inline code in body (\`GET\`, \`POST\`), capitalized without formatting in headings.
- **Hints**: Use `:::info` and `:::caution` admonitions only.
- **Bold**: For defined terms, GUI buttons, and emphasis. No italic text.
- **Bullet lists**: End items in periods. Use `- #### Step N:` format for guide steps.
- **Numbered lists**: For architecture/backend steps (not user-facing steps).

## Submodule Workflow

Content in submodule directories must be edited in the upstream repo first:

| Submodule | Docs Path | Upstream Repo |
|-----------|-----------|---------------|
| SDK | `docs/building-apps/developer-tools/dfx/` | dfinity/sdk |
| Motoko | `docs/motoko/` | dfinity/motoko |
| Internet Identity | `docs/references/ii-spec` | dfinity/internet-identity |
| Samples | `docs/references/samples` (.md not .mdx) | dfinity/examples |
| dfxvm | `docs/building-apps/developer-tools/dfxvm/` | dfinity/dfxvm |
| Response verification | `docs/building-apps/network-features/using-http/http-certification/` | dfinity/response-verification |

### Process

1. Merge changes in the upstream submodule repo.
2. Update the submodule ref in portal: `git submodule update --remote --merge`.
3. SDK and Motoko submodules must track the latest release version.

## CODEOWNERS

Teams that own specific documentation areas (from `.github/CODEOWNERS`):

| Area | Owner Teams |
|------|-------------|
| Default (all files) | @dfinity/editorial |
| Release notes | @dfinity/dx |
| Agents, CDKs | @dfinity/dx + editorial |
| SDK submodule | @dfinity/sdk |
| Motoko submodule | @dfinity/languages |
| DeFi docs | @dfinity/defi-team + editorial |
| Chain Fusion, chain-key tokens | @dfinity/defi-team + editorial |
| Security | @dfinity/product-security + editorial |
| Execution (errors, calls, SIMD, timers) | @dfinity/team-dsm + editorial |
| Custom domains, access logs | @dfinity/boundary-node + editorial |
| HTTP certification | @dfinity/trust + editorial |
| Interface specification | @dfinity/interface-spec + team-dsm + consensus |

## Target Audience

- Existing ICP developers.
- Web3/blockchain developers from Ethereum/Solidity, Solana, Bitcoin ecosystems.
- "20-29 crypto community" demographic.
- Assume familiarity with blockchain concepts; relate ICP terms to broad Web3 terms.
- Language-agnostic: provide code in multiple languages when possible.
