# Infrastructure Specification

## Overview

The ICP Developer Portal is a Docusaurus v2.4.3 static site that builds and deploys
to an Internet Computer asset canister. It serves as the official documentation hub
at https://internetcomputer.org.

## Build System

### Docusaurus Configuration (`docusaurus.config.js`)

- **Site title**: "Internet Computer"
- **URL**: `https://internetcomputer.org` (or preview canister URL when `PREVIEW_CANISTER_ID` is set)
- **Base URL**: `/`
- **Broken links/markdown**: `warn` (not `throw`)
- **Organization**: `dfinity` / project: `portal`
- **Mermaid**: Enabled via `@docusaurus/theme-mermaid`

### Preset: Classic

- **Docs**: Route at `/` (root), source from `docs/`, edit URL points to `master` branch
- **Blog**: All posts on single page, full sidebar
- **Theme**: Custom SCSS entry at `src/css/custom.scss`

### Markdown Processing

| Plugin | Purpose |
|--------|---------|
| `remark-math` | LaTeX math expressions |
| `@akebifiky/remark-simple-plantuml` | PlantUML diagrams |
| `remark-code-import` | Import code from external files |
| `plugins/remark/validate-links.js` | Custom link validation |
| `rehype-katex` | Math rendering |

### Custom Plugins (`plugins/`)

| Plugin | File | Purpose |
|--------|------|---------|
| SASS | `docusaurus-plugin-sass` (npm) | SCSS stylesheet support |
| Webpack | `plugins/custom-webpack.js` | Custom webpack configuration |
| Tailwind | `plugins/tailwind.js` | Tailwind CSS integration |
| Matomo | `plugins/matomo.js` | Analytics tracking |
| Blog Posts | `plugins/blog-posts.js` | Blog post processing |
| External Redirects | `plugins/external-redirects.js` | External URL redirect handling |
| Client Redirects | `@docusaurus/plugin-client-redirects` | Client-side redirect resolution |
| Link Validation | `plugins/remark/validate-links.js` | Remark plugin for link checking |

### Redirect System (`plugins/utils/redirects.js`)

Four redirect types are supported:
1. **Splat redirects**: Pattern-based path rewrites
2. **Standard redirects**: Simple path-to-path mappings
3. **Exact URL redirects**: Exact match redirects
4. **External redirects**: Redirects to external URLs

### Themes

- `@saucelabs/theme-github-codeblock` — GitHub code block links
- `@docusaurus/theme-mermaid` — Mermaid diagram support

### Third-Party Integrations

| Integration | Purpose | Config Location |
|-------------|---------|-----------------|
| Kapa.ai | AI Q&A widget ("Ask AI") | `scripts[]` in docusaurus.config.js |
| hCaptcha | Bot protection for AI widget | Kapa.ai data attributes |
| Matomo | Analytics/tracking | `plugins/matomo.js` |
| PushFeedback | User feedback widget | npm dependency |

## Deployment

### ICP Asset Canister (`icp.yaml`)

- **Recipe**: Asset canister v2.1.0
- **Build**: `npm install && npm run build`
- **Output**: `build/` directory
- **Search Canister ID**: `5qden-jqaaa-aaaam-abfpa-cai`

### Preview Deployments

When `PREVIEW_CANISTER_ID` environment variable is set:
- Site URL changes to `https://{PREVIEW_CANISTER_ID}.icp0.io`
- Enables deploy preview mode

## Package Configuration (`package.json`)

- **Name**: `@dfinity/portal`
- **Version**: `0.0.0` (private)
- **Node scripts**:
  - `start` — Dev server on `0.0.0.0`
  - `build` — Production build
  - `serve` — Serve built site
  - `analyze` — Bundle analysis
  - `typecheck` — TypeScript checking
  - `write-translations` — i18n support (currently disabled)

## Git Submodules

| Submodule | Repository | Branch | Purpose |
|-----------|-----------|--------|---------|
| sdk | dfinity/sdk | main | SDK documentation |
| motoko | dfinity/motoko | revisions | Motoko language docs (symlinked to docs/motoko) |
| internetidentity | dfinity/internet-identity | main | Internet Identity docs |
| examples | dfinity/examples | main | Sample project references |
| dfxvm | dfinity/dfxvm | main | dfxvm tool documentation |
| response-verification | dfinity/response-verification | main | HTTP certification docs |

## TypeScript Configuration (`tsconfig.json`)

- Extends `@tsconfig/docusaurus`
- JSON module resolution enabled
- Excludes: `build/`, `submodules/`

## Static Assets (`static/`)

- `img/` — Images, logos, icons (25+ subdirectories)
- `fonts/` — Custom web fonts
- `.well-known/` — Web standards metadata
- `moc-interpreter-0.16.3.js` — WebAssembly Motoko compiler for live code blocks
- `load_moc.ts` — Client module to load Motoko interpreter
- `glossary.txt` — Glossary terms
- `transitions.json` — Page transition configuration
- `robots.txt` — SEO configuration
- `.ic-assets.json` — Asset canister metadata
