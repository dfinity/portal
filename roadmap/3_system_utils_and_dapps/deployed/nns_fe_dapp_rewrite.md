---
title: NNS FE dapp re-write
links:
  Forum Link: https://forum.dfinity.org/t/nns-dapp-towards-new-ui-ux-including-test-link/13952
  Proposal:
eta: July 2022
is_community: false
---

The NNS FE dapp introduced at genesis is built on Flutter with a mediocre useability. As we don’t intend to launch a native mobile app for the NNS in the near future, and since we believe that Svelte is a technology stack that is better suited for the IC than Flutter, we decided to reimplement the NNS FE dapp in Svelte. We proceed in two steps. This feature represents the first step where we replace the current Flutter implementation step by step with a Svelte implementation. Upon completion, we expect a significant speed-up of the dapp. The second step, introducing an improved user interface, is captured by a separate feature.
