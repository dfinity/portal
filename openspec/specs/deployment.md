# Deployment Specification

## Overview

The portal deploys as a static site to an Internet Computer asset canister,
with GitHub Actions for CI/CD.

## Build Process

### Commands
```bash
npm install        # Install dependencies
npm run build      # Build static site to build/
npm run serve      # Local preview of built site
npm run analyze    # Bundle size analysis
npm run typecheck  # TypeScript validation
```

### Output
- Static files generated in `build/` directory
- Optimized for asset canister hosting

## ICP Deployment (`icp.yaml`)

- **Canister type**: Asset canister
- **Recipe version**: v2.1.0
- **Build command**: `npm install && npm run build`
- **Source directory**: `build/`

### Asset Configuration (`.ic-assets.json`)
Asset canister metadata for content-type mapping and caching headers.

## Preview Deployments

### Environment Variable
- `PREVIEW_CANISTER_ID` — When set, changes the site URL to the preview canister

### Preview URL Format
`https://{PREVIEW_CANISTER_ID}.icp0.io`

## GitHub Actions (`.github/workflows/`)

CI/CD workflows for:
- Build validation
- Preview deployments
- Production deployments
- Submodule updates
- Link checking

## Static File Configuration

### Robots (`static/robots.txt`)
SEO robot crawling rules.

### Jekyll Bypass (`.nojekyll`)
Prevents GitHub Pages Jekyll processing.

### Web Standards (`.well-known/`)
Standard web metadata files.

## Client-Side Redirects

### Redirect Types
1. **Splat redirects** — Pattern matching (e.g., `/docs/current/*` → `/*`)
2. **Standard redirects** — Direct path mapping
3. **Exact URL redirects** — Exact match redirects
4. **External redirects** — Redirects to external URLs

### Configuration
- Standard/splat: `@docusaurus/plugin-client-redirects`
- External: `plugins/external-redirects.js`
- Definitions: `plugins/utils/redirects.js`
