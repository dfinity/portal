# UI Components & Theme Specification

## Overview

The portal extends Docusaurus with custom React components and extensive theme
overrides. Components are built with React 16.14.0, TypeScript, SCSS, and Tailwind CSS.

## Component Library (`src/components/`)

### Card (`Card/`)
Reusable card component for content display.

### CenterImages (`CenterImages/`)
Utility component for centering images within documentation content.

### Chip (`Chip/`)
Badge/tag components for labeling:
- `AlphaChip` — Alpha status indicator
- `BetaChip` — Beta status indicator
- Custom chip variants

### Common (`Common/`)
Shared utility components:
- `AnimateSpawn/` — Framer Motion animation wrapper for scroll-triggered animations
- `DarkHeroStyles/` — Dark-themed hero section styling
- `Icons/` — SVG icon component library
- `Search/` — Search-related components

### DocsHome (`DocsHome/`)
Homepage-specific components:
- `AskAIWidget.tsx` — Kapa.ai "Ask AI" trigger widget
- `Blog.tsx` — Blog post display on homepage
- `TeaserCard.tsx` — Feature teaser cards
- SVG illustration assets

### Tabs (`Tabs/`)
Custom tabbed interface components for multi-language/multi-variant code examples.

### Tooltip (`Tooltip/`)
Glossary tooltip component — shows definitions on hover for technical terms.

### TutorialFooter (`TutorialFooter/`)
Navigation footer for tutorial pages with previous/next links.

## Theme Overrides (`src/theme/`)

Custom Docusaurus theme components (24 override directories):

| Component | Purpose |
|-----------|---------|
| `Admonition/` | Custom styled note/warning/info/tip/danger blocks |
| `BlogLayout/` | Blog page layout |
| `BlogListPage/` | Blog listing page |
| `BlogPostItem/` | Individual blog post rendering |
| `CodeBlock/` | Code block with GitHub link support |
| `DocBreadcrumbs/` | Breadcrumb navigation (disabled in config) |
| `DocItem/` | Documentation page wrapper/layout |
| `Footer/` | Site footer with social links |
| `Icon/` | Icon components (external link icon, etc.) |
| `Layout/` | Main layout wrapper |
| `Logo/` | Site logo component |
| `Navbar/` | Top navigation bar |
| `Navbar/MobileSidebar/` | Mobile sidebar navigation |
| `NavbarItem/` | Individual navbar item |
| `SearchBar/` | Search functionality integration |
| `Subnav/` | Sub-navigation menu (unique to this portal) |
| `prism/` | Syntax highlighting customization |
| `Root.js` | Root theme component (context providers) |
| `NotFound.js` | 404 page handler |
| `prism-include-languages.js` | Additional Prism language support |

## Styling Architecture

### Global Styles (`src/css/`)

| File | Purpose |
|------|---------|
| `custom.scss` | Main custom styles (entry point) |
| `navbar.scss` | Navigation bar styling |
| `subnav.scss` | Sub-navigation styling |
| `sidebar.scss` | Documentation sidebar styling |
| `blog.scss` | Blog-specific styles |
| `code.scss` | Code block styling |
| `fonts.css` | Web font definitions |
| `map.scss` | Interactive map styling |
| `spinner.scss` | Loading spinner animation |
| `scrollbar.scss` | Custom scrollbar styling |
| `animate.scss` | Animation utility classes |

### Tailwind CSS (`tailwind.config.js`)

- Custom theme colors and typography
- Responsive design breakpoints
- Container queries plugin
- Applied via `plugins/tailwind.js` PostCSS integration

### Color Scheme

- Light mode: Custom light theme (Prism code blocks)
- Dark mode: Dracula theme (Prism code blocks)
- Respects `prefers-color-scheme` system preference
- Toggle switch available

## Animations (`src/animations/`)

Lottie animation files and animation utility functions for interactive elements.

## Hooks (`src/hooks/`)

Custom React hooks for shared stateful logic.

## Context (`src/context/`)

React Context providers for global state management.

## Utilities (`src/utils/`)

22+ utility subdirectories providing:
- Markdown processing helpers
- Data transformation utilities
- URL/path manipulation
- Various helper functions

## Pages (`src/pages/`)

- `notfound.tsx` — Custom 404 page

## Key UI Features

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Mobile sidebar for navigation
- Viewport meta tag prevents iOS zoom on input focus

### Interactive Elements
- Scroll-triggered animations (Framer Motion via AnimateSpawn)
- Lottie animations
- Glossary tooltips on hover
- Live Motoko code execution
- Chart.js visualizations
- Leaflet maps
- Slick Carousel / Swiper for content carousels

### Accessibility
- SVG icons with alt text
- Keyboard navigation support via Docusaurus defaults
- Color mode respects system preferences
