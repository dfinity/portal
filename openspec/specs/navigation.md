# Navigation & Sidebar Specification

## Overview

The portal uses a multi-tiered navigation system: a top navbar, a sub-navigation bar,
and multiple sidebar configurations for different documentation sections.

## Top Navigation (`navbar` in docusaurus.config.js)

- **Logo**: DFINITY horizontal logo (`/img/IC_logo_horizontal.svg`)
- **Hide on scroll**: Enabled
- **Items**: Search (right position) + sub-nav items (merged for mobile)

## Sub-Navigation (`subnav` in docusaurus.config.js)

| Label | Type | Target |
|-------|------|--------|
| Home | doc | `home` |
| Building apps | docSidebar | `build` sidebar, `/build/` path |
| DeFi | docSidebar | `defi` sidebar, `/defi/` path |
| Build on Bitcoin | docSidebar | `btc` sidebar, `/build-on-btc/` path |
| Motoko | docSidebar | `motoko` sidebar, `/motoko/` path |
| References | docSidebar | `references` sidebar, `/references/` path |
| Resources | dropdown | External links (release notes, ICP Ninja, forum, Discord, etc.) |

## Sidebar Definitions (`sidebars.js`)

### `build` Sidebar — Building Apps

The primary developer documentation sidebar with these top-level categories:

1. **Getting started** — Quickstart, architecture, install, identities, tokens/cycles
2. **ICP essentials** — Network architecture, fees, canisters, message execution
3. **Developer tools** — CDKs (Motoko, Rust), CLI (dfx, dfxvm), ICP Ninja
4. **Developing canisters** — Write, create, compile, install, deploy
5. **Interacting with canisters** — Candid, query/update calls, agents
6. **Testing canisters** — Overview, PocketIC
7. **Canister management** — Backtraces, control, delete, history, logs, limits, snapshots, state, settings, storage, topping-up, trapping, upgrades
8. **Building frontends** — Asset canisters, serving assets, existing frontends, certification, security, custom domains
9. **Advanced development** — Migration, third-party canisters, benchmarking, optimization (Motoko/Rust), access logs
10. **User authentication** — Overview, Internet Identity, misc wallets, alternative origins, signature verification
11. **Network features** — HTTP (gateways, certification, outcalls), threshold signatures (ECDSA, Schnorr), vetKeys, randomness, timers, timestamps, SIMD, verifiable credentials
12. **Chain Fusion** — Overview, supported chains, Bitcoin, Dogecoin, Ethereum/EVM (comparison, workflow, interactions, EVM RPC), Solana, examples
13. **Security** — Overview, best practices (inter-canister, IAM, decentralization, data integrity, storage, HTTP, DoS, upgrades, monitoring, misc, resources), formal verification
14. **Best practices** — General, architecture, idempotency, reproducible builds, storage, troubleshooting, trust
15. **Governing applications** — NNS (dapp usage, concepts/neurons/proposals), SNS (pre-launch, launching, testing, managing)

### `defi` Sidebar

Loaded dynamically from `docs/defi/sidebar.js`. Covers:
- Chain-key tokens (ckBTC, ckETH, ckERC20)
- Token standards (ICRC)
- Token ledgers
- Token integrations
- Token indexes
- Rosetta API (ICP & ICRC)
- NFT collections

### `btc` Sidebar — Build on Bitcoin

Linear sidebar:
1. Index/overview
2. BTC dev workflow
3. BTC dev environment
4. Using regtest
5. BTC API
6. Bitcoin transactions (generate addresses, create, sign, submit)
7. Read state
8. Ordinals
9. Runes
10. BRC-20

### `references` Sidebar

1. **IC specifications** — IC interface spec, HTTP gateway protocol spec
2. **Feature specifications** — Asset canister, Bitcoin, ckBTC, Candid, HTTPS outcalls, Internet Identity, Ledger, Threshold signatures, Verifiable credentials, vetKeys
3. Cycles cost formulas
4. **System canisters** — List, exchange rate canister, management canister
5. Async code
6. Advanced ingress messages
7. Execution errors
8. Message execution properties
9. HSM with identities
10. Dashboard API reference
11. Glossary

### `devjourney` Sidebar — Developer Liftoff (Motoko)

Progressive tutorial series:
- **Level 0**: Pre-flight (IC overview, terms, canisters, languages, tooling, first dapp)
- **Level 1**: Space cadet (Motoko basics, dev env, dfx, cycles, deploying, managing)
- **Level 2**: Space explorer (storage, canister calls, third-party, Candid, testing, Motoko intermediate)
- **Level 3**: Space engineer (package managers, HTTPS outcalls, certified data, agents, auth, Motoko advanced)
- **Level 4**: Space pilot (ICP ledger, ICRC tokens, ckBTC/Bitcoin, NNS governance, Quill, Motoko expert)
- **Level 5**: IC astronaut (vetKeys, ICP-ETH, token swap, NFT, auction, next steps)

### `devjourneyRust` Sidebar — Developer Liftoff (Rust)

Rust-focused parallel tutorial:
- **Level 0**: Pre-flight (same as Motoko)
- **Level 1**: Space cadet (Rust basics, dev env, dfx, cycles, deploying, managing)
- **Level 2**: Space explorer (canister calls, storage/memory, state, stable memory, upgrading, Rust intermediate)
- **Level 3**: Space engineer (testing, logging, snapshots, identity/auth, access control, Rust advanced)

### `hackathon` Sidebar — Hackathon Prep Course

Quick-start course: Hello world, static website, fullstack dapp, EVM block explorer, tokens, auth, dev env, canisters, advanced features, resources

### `motoko` Sidebar

Auto-generated from `docs/motoko/` directory (content from submodule).

### Development-Only Sidebars

`__ui_tests_internal__` — Auto-generated from `docs/tests/` (only in development mode).

## Footer

### Links (two columns)
- Column 1: Dashboard, Learn Hub, Node Providers, Developer Grants
- Column 2: Support & Feedback, Brand Materials, Press Kit

### Social Media
X, Telegram, Medium, YouTube, Reddit, CoinMarketCap, Discord
(Each with light/dark mode SVG icons)

### Copyright
`© {year} Internet Computer`
