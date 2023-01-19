# Visual Studio Code

Visual Studio (VS) Code is a [widely used](https://survey.stackoverflow.co/2022/#section-worked-with-vs-want-to-work-with-integrated-development-environment) open-source IDE which supports canister development in [Motoko](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/) and [Rust](https://www.rust-lang.org/).

## Motoko

The [Motoko VS Code extension](https://github.com/dfinity/vscode-motoko) provides type checking, formatting, autocompletion, go-to-definition, code snippets, and more for Motoko canister development.

[![Showcase](https://github.com/dfinity/vscode-motoko/raw/master/guide/assets/intro.webp)](https://marketplace.visualstudio.com/items?itemName=dfinity-foundation.vscode-motoko)

### Getting Started

Install the extension through the [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=dfinity-foundation.vscode-motoko), or alternatively the [Extensions panel](https://code.visualstudio.com/docs/editor/extension-marketplace) in your VS Code project. VSCodium users can download the extension from [Open VSX](https://open-vsx.org/extension/dfinity-foundation/vscode-motoko) or the [GitHub releases](https://github.com/dfinity/vscode-motoko/releases) page.

### Keyboard Shortcuts

Below are the default key bindings for commonly used features supported in the extension:

- **Code formatter**: Press `Shift` + `Alt` + `F` to format a Motoko file using [prettier-plugin-motoko](https://github.com/dfinity/prettier-plugin-motoko).
- **Organize imports**: Press `Shift` + `Alt` + `O` to group and sort imports at the top of your Motoko file.
- **Import code action**: Press `Ctrl` / `Cmd` + `.` while hovering over an unresolved variable to show quick-import options. 
- **Go to definition**: Press `F12` to jump to the definition of a local or imported identifier.
- **IntelliSense**: Press `Ctrl` + `Space` in a Motoko file to view all available autocompletions and code snippets. 

### Other Features

- The Motoko VS Code extension provides schema validation and autocompletion for `dfx.json` files.
- Hover over almost anything to view type information and/or explanations from `///` doc comments.
- The extension automatically detects Motoko packages from [MOPS](https://mops.one/) and [Vessel](https://github.com/dfinity/vessel) config files. 
- In case you're hoping to learn Motoko without downloading `dfx`, the Motoko VS Code extension works on all major operating systems (including Windows). 

## Rust

Please refer to the official [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust) documentation to configure your workspace for developing Rust canisters.
