---
title: Install Large Wasm 
links:
  Forum Link: https://forum.dfinity.org/t/allow-installation-of-large-wasm-modules/17372
eta: Q4 2023
is_community: false
---

The Internet Computer currently imposes a 2MiB limit on ingress messages for most subnets. This limit also applies to install_code messages, which are utilized for canister installation or upgrades. This limitation is a significant challenge for canister developers which is only partially mitigated by the ability to install compressed Wasm modules.

In this feature, we aim to significantly relax this restriction by enabling chunked canister installation: the Wasm module is uploaded in chunks of up to 2MiB, and installation is done once all relevant chunks are uploaded. Implementing this solution will necessitate modifications both on the replica side and on the dfx tooling support.


