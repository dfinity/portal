# NFT Minting

This example demonstrates implementing an NFT canister. NFTs (non-fungible tokens) are unique tokens with arbitrary metadata - usually an image of some kind, to form the digital equivalent of trading cards. There are a few different NFT standards for the Internet Computer, but the most cycles-efficient and feature-complete one is the [DIP-721](https://github.com/Psychedelic/DIP721) standard, so that is the standard that this canister uses.

The sample code is available in the [samples repository](https://github.com/dfinity/examples) in [Rust](https://github.com/dfinity/examples/tree/master/rust/dip721-nft-container) and Motoko is coming soon! versions:

The canister is a basic implementation of the standard, with support for the minting, burning, and notification interface extensions.

Command-line length limitations would prevent you from minting an NFT with a large file, like an image or video, via `dfx`. To that end, there is a [command-line minting tool](https://github.com/dfinity/experimental-minting-tool) provided for minting simple NFTs.

The interface is meant to be programmatic, but the Rust version additionally contains HTTP functionality so you can view a metadata file at `<canister URL>/<NFT ID>/<file ID>`.
