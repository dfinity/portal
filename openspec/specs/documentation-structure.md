# Documentation Structure Specification

## Overview

All documentation lives in `docs/` using MDX format. The docs are served at the
site root (`/`) via `routeBasePath: "/"` configuration.

## Top-Level Structure

```
docs/
├── home.mdx                    # Homepage content
├── styles.module.css           # Documentation styles
├── _attachments/               # Shared attachment files
├── building-apps/              # Primary developer docs (15+ subdirs)
├── defi/                       # DeFi documentation (7 subdirs)
├── build-on-btc/               # Bitcoin integration docs
├── references/                 # API/spec reference docs (28 subdirs)
├── tutorials/                  # Tutorial series (3 courses)
├── other/                      # Updates and release notes
├── tests/                      # UI test pages (dev only)
└── motoko/                     # Motoko docs (symlink to submodule)
```

## Documentation Sections

### Building Apps (`docs/building-apps/`)

The core developer documentation organized into 15+ categories:

#### Getting Started (`getting-started/`)
- `quickstart.mdx` — Quick start guide
- `app-architecture.mdx` — Application architecture overview
- `install.mdx` — Installation instructions
- `identities.mdx` — Identity management
- `tokens-and-cycles.mdx` — Tokens and cycles overview

#### ICP Essentials (`essentials/`)
- `network-overview.mdx` — Network architecture
- `gas-cost.mdx` — Fee breakdown
- `canisters.mdx` — Canister smart contracts
- `message-execution.mdx` — Message execution model

#### Developer Tools (`developer-tools/`)
- `dev-tools-overview.mdx` — Tools overview (landing page)
- `cdks/` — Canister Development Kits
  - `index.mdx` — CDK overview
  - Motoko (links to motoko/home)
  - `rust/` — Rust CDK (intro, limitations, Candid gen, intercanister, state, stable structures, upgrading, message inspect)
- `dfx/` — dfx CLI reference (25+ subcommands)
- `dfx-json.mdx` — dfx.json configuration guide
- `dfx-json-reference.mdx` — dfx.json schema reference
- `advanced-dfx/` — Advanced dfx workflows
- `dfxvm/` — dfxvm version manager (7 subcommands)
- `icp-ninja.mdx` — ICP Ninja online IDE

#### Developing Canisters (`developing-canisters/`)
- write → create → compile → install → deploy workflow
- `custom-networks.mdx` — Custom network deployment
- `deploy-specific-subnet.mdx` — Subnet-specific deployment

#### Interacting with Canisters (`interact-with-canisters/`)
- `candid/` — Candid interface (concepts, usage, tools)
- `query-calls.mdx` — Query call documentation
- `update-calls.mdx` — Update call documentation
- `advanced-calls.mdx` — Advanced call patterns
- `agents/` — Agent libraries (overview, JavaScript, Rust)

#### Testing (`test/`)
- `overview.mdx` — Testing overview
- `pocket-ic.mdx` — PocketIC testing framework

#### Canister Management (`canister-management/`)
13 topics: backtraces, control, delete, history, logs, resource-limits, snapshots, state, settings, storage, topping-up, trapping, upgrade

#### Frontends (`frontends/`)
- Asset canister usage
- Uploading/serving assets
- Existing frontend integration
- Asset security
- Custom domains (setup, DNS)

#### Authentication (`authentication/`)
- Overview
- Internet Identity integration
- Misc wallet integration
- Alternative origins
- IC signature verification

#### Chain Fusion (`chain-fusion/`)
Multi-chain integration documentation:
- Overview, supported chains
- `ethereum/` — Ethereum/EVM (comparison, workflow, interactions, EVM RPC canister)
- `solana/` — Solana integration
- `dogecoin/` — Dogecoin support
- Examples

#### Network Features (`network-features/`)
- `using-http/` — HTTP gateways, certification (7 subtopics), HTTPS outcalls (overview, GET, POST)
- `signatures/` — Threshold ECDSA, Schnorr
- `vetkeys/` — vetKeys (intro, API, DKMS, encrypted storage, BLS, IBE, timelock, VRF)
- Randomness, periodic tasks, timestamps, SIMD
- `verifiable-credentials/` — Overview, how-it-works, issuer, relying party

#### Security (`security/`)
- Overview (also serves as best practices overview)
- 10 security best practice topics
- Formal verification

#### Best Practices (`best-practices/`)
7 topics: general, architecture, idempotency, reproducible builds, storage, troubleshooting, trust

#### Governing Apps (`governing-apps/`)
- `nns/` — Network Nervous System (dapp usage: 12 guides, concepts: neurons, proposals)
- `tokenomics/` — Pre-launch (considerations, preparation, checklist)
- `launching/` — SNS launch (summary, steps, integration)
- `testing/` — SNS testing (before launch, locally)
- `managing/` — SNS management (proposals, cycles, asset canister)

### DeFi (`docs/defi/`)

- `chain-key-tokens/` — ckBTC, ckETH, ckERC20
- `token-standards/` — ICRC token standards
- `token-ledgers/` — Ledger setup, usage, upgrades
- `token-integrations/` — Token integration guides
- `token-indexes/` — Token indexing
- `rosetta/` — Rosetta API (ICP & ICRC variants)
- `nft-collections/` — NFT documentation
- `sidebar.js` — Dynamic sidebar definition

### Build on Bitcoin (`docs/build-on-btc/`)

- Bitcoin development workflow
- Development environment
- Regtest usage
- Bitcoin API
- Transaction handling (generate addresses, create, sign, submit)
- State reading
- Ordinals, Runes, BRC-20 protocols

### References (`docs/references/`)

28+ subdirectories covering:
- IC interface specification
- HTTP gateway protocol spec
- Feature specifications (asset canister, Bitcoin, ckBTC, Candid, HTTPS outcalls, II, Ledger, threshold sigs, VCs, vetKeys)
- Cycles cost formulas
- System canisters (index, exchange rate, management)
- Async code patterns
- Ingress message handling
- Execution errors
- Message execution properties
- HSM identity usage
- Dashboard APIs
- Glossary

### Tutorials (`docs/tutorials/`)

#### Developer Liftoff — Motoko (`developer-liftoff/`)
6 progressive levels (0-5), covering beginner to advanced Motoko development

#### Developer Liftoff — Rust (`developer-liftoff-rust/`)
4 progressive levels (0-3), parallel Rust track

#### Hackathon Prep Course (`hackathon-prep-course/`)
10-module quick-start for hackathon participants

### Other (`docs/other/`)

- SDK release notes
- Updates and announcements

## Documentation Features

### MDX Support
- Standard Markdown + JSX components
- Import React components directly in docs
- Custom admonition blocks (note, warning, info, tip, danger)

### Code Blocks
- Syntax highlighting (Prism: default languages + Rust)
- GitHub code block links (`@saucelabs/theme-github-codeblock`)
- Live Motoko execution via WASM interpreter
- Code import from external files (`remark-code-import`)

### Diagrams
- Mermaid diagrams (theme integration)
- PlantUML diagrams (remark plugin)

### Math
- LaTeX math via remark-math + rehype-katex

### Versioning
- `versions.json` exists but is currently empty
- `lastVersion` configuration present but inactive

### Edit Links
- Each page links to GitHub edit URL on `master` branch
- Shows last update author and time
