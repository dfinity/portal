# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- next-header -->

## [Unreleased] - ReleaseDate

- `dfxvm --list` now supports listing the available dfx versions.
  - `--available`: List the available versions.
  - `--limit`: The maximum number of available versions to list in reverse chronological order, with default value `10`.

## [1.0.0] - 2024-02-20

## [0.3.1] - 2024-02-07

- Fixed: sets DFX_VERSION when proxying to dfx, so that `dfx +version <command>` overrides any version specified in dfx.json.
- Fixed: prepends the dfx version bin directory to the PATH when proxying to dfx.

## [0.3.0] - 2024-02-07

- Downloads new cargo-dist style tarballs from the release page.
- Breaking change: Variables in the download URL template are now `{{version}}`, `{{basename}}`, and `{{archive-format}}`
- dfx mode disallows the `dfx upgrade` command, which would replace the versioned dfx executable.

## [0.2.1] - 2024-02-05

- Removed openssl dependencies.
- Added `dfxvm self uninstall` command, which uninstalls dfxvm and all versions of dfx.
- `dfxvm-init` now removes older dfx versions found on the path, by default.
- `dfxvm-init` deletes the uninstall.sh script that the dfx install script used to create.

## [0.2.0] - 2024-01-30

- `dfxvm --version` now reports the version.
- Changed the dfxvm-init `--proceed` parameter to `--yes`.
- Static link to openssl.

## [0.1.3] - 2024-01-19

- Added `dfxvm self update` command, which updates dfxvm to the latest version.

## [0.1.2] - 2023-12-19

- dfxvm-init now alters profile scripts to modify the PATH environment variable.

## [0.1.1] - 2023-12-04

- Added `dfx` mode, which selects a dfx version and dispatches execution to it.
- Added `dfxvm install` command, which installs a dfx version.
- Added `dfxvm default` command, which sets or displays the default dfx version.
- Added `dfxvm update` command, which sets the latest dfx version as the default.
- Added `dfxvm uninstall` command, which uninstalls a dfx version.
- Added `dfxvm list` command, which lists all installed dfx versions.
- Added `dfxvm-init` mode, which installs dfxvm and dfx.
  - does not yet source the env file in profile scripts.
  - does not yet clean up previously-installed dfx versions.

<!-- next-url -->
[Unreleased]: https://github.com/dfinity/dfxvm/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/dfinity/dfxvm/compare/v0.3.1...v1.0.0
[0.3.1]: https://github.com/dfinity/dfxvm/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/dfinity/dfxvm/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/dfinity/dfxvm/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/dfinity/dfxvm/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/dfinity/dfxvm/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/dfinity/dfxvm/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/dfinity/dfxvm/compare/828e4ed...v0.1.1
