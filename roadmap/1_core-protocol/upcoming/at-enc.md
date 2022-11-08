---
title: Threshold Encryption
links:
  Forum Link:
  Proposal: 
eta: 2023
is_community: false
---

Enable threshold encryption on the IC by allowing canisters to call a threshold decryption interface. The interface would enable canisters or individual users to encrypt messages under the public key of the subnet, and decrypt the ciphertexts under the corresponding decryption key that is secret-shared among the replicas. Threshold encryption will enable canisters to store end-to-end encrypted user data (e.g., storage, messaging, social networks) without having to rely on browser storage for user-side secrets, as well as enabling transaction privacy within canisters (e.g., closed-bid auctions, front-running prevention).
