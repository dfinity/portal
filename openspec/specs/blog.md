# Blog Specification

## Overview

The portal hosts a blog at `/blog/` for feature announcements and news updates,
using Docusaurus's built-in blog plugin with custom theme overrides.

## Structure

```
blog/
├── features/           # Feature announcements (21 categories)
├── news-and-updates/   # General news (142+ posts)
└── _assets/            # Blog images and media assets
```

## Configuration

### Docusaurus Blog Settings
- **Path**: `blog/`
- **Sidebar count**: ALL (show all posts in sidebar)
- **Posts per page**: ALL (single page, no pagination)
- **Remark plugins**: Same as docs (math, PlantUML, code-import, link validation)
- **Rehype plugins**: Same as docs (katex)

### Blog Posts Plugin (`plugins/blog-posts.js`)
Custom plugin for additional blog post processing and data exposure.

## Theme Overrides

| Component | Purpose |
|-----------|---------|
| `BlogLayout/` | Custom blog page layout |
| `BlogListPage/` | Blog listing page with all posts |
| `BlogPostItem/` | Individual blog post card/rendering |

## Styling

- `src/css/blog.scss` — Blog-specific styles

## Homepage Integration

- `src/components/DocsHome/Blog.tsx` — Displays recent blog posts on the documentation homepage
- Blog posts surfaced as teaser cards

## Content Categories

### Features (`features/`)
21 category directories for organized feature announcements.

### News and Updates (`news-and-updates/`)
142+ posts covering general ICP ecosystem news and development updates.

### Assets (`_assets/`)
Shared image and media assets referenced by blog posts.
