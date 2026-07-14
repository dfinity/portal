# Search Specification

## Overview

The portal implements a dual search system: a custom ICP-hosted Rust canister for
documentation search and a Kapa.ai widget for AI-powered Q&A.

## Search Canister (`search/`)

### Architecture
- **Language**: Rust
- **Platform**: Internet Computer canister
- **Canister ID**: `5qden-jqaaa-aaaam-abfpa-cai`
- **Purpose**: Full-text search indexing of documentation content

### Source Structure
```
search/
├── Cargo.toml          # Rust dependencies
├── src/                # Canister source (7 subdirectories)
├── .icp/               # ICP build configuration
└── package.json        # Node.js build dependencies
```

### Integration
- Canister ID stored in `customFields.searchCanisterId` in docusaurus.config.js
- Custom `SearchBar` theme component (`src/theme/SearchBar/`) connects to canister
- Search appears in top-right navbar position

## AI Search (Kapa.ai Widget)

### Configuration
- **Widget**: `kapa-widget.bundle.js`
- **Website ID**: `73cafe70-9be1-494b-bd31-b849fc29799f`
- **Project Name**: "Internet Computer"
- **Bot Protection**: hCaptcha
- **Trigger**: CSS class `ask-ai-widget-trigger`
- **Z-index**: 1001 (above other UI)
- **Button**: Hidden (triggered by custom UI element)

### Features
- AI-powered question answering about ICP
- Example questions provided in config
- Disclaimer about auto-generated responses
- User analytics fingerprinting enabled

### UI Integration
- `AskAIWidget.tsx` component in `src/components/DocsHome/`
- Custom trigger button styled to match portal theme
