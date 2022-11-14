---
title: Threshold Key Derivation
links:
  Forum Link:
  Proposal: 
eta: 2023
is_community: false
---

Empower dapps to perform encryption, and threshold decryption, and signing on the IC by allowing canisters to call a threshold key derivation interface. This feature will enable canisters or individual users to encrypt messages under the public key of the subnet, so that they can be decrypted by calling  the threshold key derivation interface for the corresponding decryption key that is secret-shared among the replicas. Integrating this feature will enable canisters to store end-to-end encrypted user data (e.g., storage, messaging, social networks) without having to rely on browser storage for user-side secrets, as well as enabling transaction privacy within canisters (e.g., closed-bid auctions, front-running prevention).
