---
title: Install Large Wasm 
links:
  Forum Link: https://forum.dfinity.org/t/long-term-r-d-subnet-splitting-proposal/9402/4
  Proposal: https://forum.dfinity.org/t/allow-installation-of-large-wasm-modules/17372
eta:
is_community: false
---

In this feature, we tackle this problem. The Internet Computer currently imposes a 2MiB limit on ingress messages for most subnets. This limit also applies to install_code messages, which are utilized for canister installation or upgrades. However, there is a growing need for larger Wasm modules that exceed this limit. This holds true even when considering the option of installing compressed modules, which doesn't consistently address the issue due to factors like inefficient compression or module size. This limitation presents a significant challenge for canister developers.

In this feature, we aim to significantly relax this restriction. The proposed approach to tackle this challenge is to permit canister installation in smaller chunks, wherein the Wasm module is uploaded in multiple ingress messages (each up to 2MiB), and the installation proceeds once all chunks are received. Implementing this solution will necessitate modifications across the entire stack, from the replica to the dfx tooling, to ensure a seamless user experience.

