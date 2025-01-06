# Contributing to `dfxvm`

Thank you for your interest in contributing to `dfxvm`! By participating in
this project, you agree to abide by our [Code of Conduct][code-of-conduct].

## CLA

All code contributions are subject to our [Contributor License Agreement (CLA)][cla].
When you open your first PR, the CLA bot will prompt you to agree to the CLA
before the PR can be reviewed and merged.

## Documentation

Every change to the command-line interface must contain documentation.
We use `clap`, so Rustdoc comments turn into CLI documentation. Additionally,
this in-code documentation must be mirrored by a corresponding change
in `docs/cli-reference`. Finally, any feature or notable bugfix should be
mentioned in [CHANGELOG.md](CHANGELOG.md), under the `## Unreleased` header.

## Release Process

Prerequisites to make a release:
```bash
cargo install cargo-release
cargo install cargo-dist
```

To make a release, follow these steps:
1. Run the [Prepare Release][prepare-release-workflow] workflow.
2. Obtain approval and merge the PR that the workflow generated.
3. Run the following locally:

```bash
git checkout main
git pull
cargo dist plan
cargo release --execute
```

[code-of-conduct]: https://github.com/dfinity/ic-docutrack/blob/main/.github/CODE_OF_CONDUCT.md
[cla]: https://github.com/dfinity/cla/blob/master/CLA.md
[prepare-release-workflow]: https://github.com/dfinity/dfxvm/actions/workflows/prepare-release.yml
