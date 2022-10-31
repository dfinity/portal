---
title: Wasm-native stable memory
links:
  Forum Link: https://forum.dfinity.org/t/proposal-wasm-native-stable-memory/15966
  Proposal: https://dashboard.internetcomputer.org/proposal/88812
eta: 2023
is_community: false
---

The goal of introducing Wasm-native stable memory is to improve the performance of stable reads and writes by letting these operations directly access stable memory in the same way Wasm loads and stores currently access the Wasm heap.

This will make direct use of stable memory more practical and it will not require canister developers to make any changes to how they use stable memory.
