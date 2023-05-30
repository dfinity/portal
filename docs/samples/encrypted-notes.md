# Encrypted note-taking dapp

## Overview

[Encrypted notes](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp) is an experimental dapp for authoring and storing confidential information in the form of short pieces of text. The user can access their notes via any number of automatically synchronized devices authenticated via [Internet Identity](https://internetcomputer.org/internet-identity). Thanks to the end-to-end encryption performed by the dapp’s frontend, the user does not need to trust the dapp’s backend.

You can play around with the [dapp deployed on the IC](https://cvhrw-2yaaa-aaaaj-aaiqa-cai.icp0.io/) and see a quick introduction on [YouTube](https://youtu.be/DZQmtPSxvbs).

We wanted to build an example of a simple (but not too simple) dapp running purely on the IC. This example relies upon the **web-serving** and **storage capabilities** of the IC. We focused on the following two key features for our example dapp: 
1. Client-side **end-to-end encryption**. 
2. **Multi-user** and **multi-device** support.

To demonstrate the potential of the IC as a platform for developing such dapps, we implemented this example using two distinct canister development kits (CDKs). The Motoko CDK allows developers to implement actor-based dapps using the [Motoko](/motoko/main/motoko.md) language. The Rust CDK allows implementing dapps in [Rust](/developer-docs/backend/rust/index.md). In both cases, canisters are compiled into WebAssembly files that are then deployed onto the IC.

## Architecture

The basic functionality of the encrypted notes consists of two main components.

First, we re-used the code of a non-encrypted dapp called [IC Notes](https://github.com/pattad/ic_notes). In particular IC Notes relies on the Internet Identity (II) canister for user authentication, an approach that is also inherited by the encrypted notes dapp. For development purposes, we deploy a local instance of the II canister, along with a local instance of encrypted notes. When deploying the encrypted notes dapp onto the mainnet, the real-world instance of II is used for authentication.

Second, we enabled client-side, end-to-end encryption for the note contents, borrowing the solution from another existing dapp called [IC Vault](https://github.com/timohanke/icvault). Our encrypted notes dapp follows the approach of IC Vault to support managing multiple devices.

In the context of the canisters discussed in this document, a device is not necessarily a separate physical device but a logical instance device, e.g., a web browser, with its own local data storage. For example, we consider two web browsers running on the same laptop as two independent devices, since these browsers generate their own encryption keys. In contrast, the II canister relies on hardware-generated encryption keys, distinguishing only hardware devices.

To support multiple devices per user, IC Vault employs a device manager; a canister that securely synchronizes device-specific keys across all the devices that are associated with a user. The remainder of this document focuses on the encrypted notes dapp canister that implements a device manager in a similar way but as part of its main canister.

For further details and user stories, please refer to the [README file](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp/README.md).

![High-level architecture overview diagram of the Encrypted Notes dapp](_attachments/encrypted-notes-arch.png)

## Note management

-   Users are linked to II in the frontend, getting the user a principal that can be used for calling API queries and updates.

-   Internally, we store the map of the form `Principal → [Notes]` and a `counter`.

-   `counter` stores the number of notes the canister has created across all principals.

-   Method `create` adds a note to its principal’s entry (if it exists), or adds the principal to the map with the `note_id == counter`, and then increments `counter`.

-   Method `update` pulls a note, for the caller’s principal and for the provided `note_id` and replaces it with the provided `text` (this `text` is assumed to be encrypted by the frontend).

-   Method `delete` finds the note with the given `note_id` in the map and removes it. To ensure that note IDs are always globally unique, we do not decrease `counter`.

## Cryptography

Encryption of notes is entirely client-side. However, our example dapp is still not protected against potentially data-revealing attacks by a possibly malicious node provider. For example, the attacker can infer how many notes a particular user has, user activity statistics, etc. Therefore, please carefully read the [disclaimer](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp/README.md#disclaimer-please-read-carefully) before using any of the code or patterns from this dapp.

Recall that, in our definition, a device is not necessarily a separate physical device but simply a web browser instance with an independent local storage.

This dapp uses three different kinds of keys:

-   **Symmetric AES-GCM secret key**: Used to encrypt the notes of a given principal. The notes of a principal are stored in the encrypted notes dapp canister encrypted with this secret key. Thus, the frontend of the dapp needs to know this secret key to decrypt notes from this user and to send encrypted notes to be stored in the Encrypted Notes canister.

-   **Device RSA-OAEP public key**: used to encrypt the symmetric AES **secret key** of the principal. The encrypted secret key is stored in the canister for each device registered to the principal. The same key is used for different principals using that device.

-   **Device RSA-OAEP private key**: used to decrypt the symmetric AES **secret key** stored in the encrypted notes canister for a given principal. Once the frontend decrypts the secret key, it can use this key for decrypting the notes stored in the encrypted notes canister.

We store a map of the form:

        Principal → (DeviceAlias → PublicKey,
                     DeviceAlias → CipherText)

This map is used for managing user devices, as explained next. To register a device, the frontend generates a device alias, a public key, and a private key (held in its local storage).

Adding a device:

-   **Device registration:** If this identity is already known, a new device will remain unsynced at first; at this time, only the `alias` and `publickey` of this device will be added to the Encrypted Notes canister.

-   **Device synchronization:** Once an unsynced device obtains the list of all unsynced devices for this II, it will encrypt the symmetric AES *secret key* under each unsynced device’s public key. Afterwards, the unsynced device obtains the encrypted symmetric AES *secret key*, decrypts it, and then uses it to decrypt the existing notes stored in the encrypted notes canister.

Once authenticated with II:

-   If this identity is not known, then the frontend generates a symmetric AES *secret key* and encrypts it with its own public key. Then the frontend calls `seed(publickey, ciphertext)`, adding that ciphertext and its associated `publickey` to the map.

-   If a user wants to register a subsequent device, the frontend calls `register_device`, passing in the `alias` and `publickey` of that device. The frontend then calls `submit_ciphertexts([publickey, ciphertext])` for all the devices it needs to register. This allows the registered devices to pull and decrypt the AES key to encrypt and decrypt the user notes.

## Sequence Diagrams

### Adding New Device

![UML sequence diagram showing device registration and synchronization](_attachments/encrypted-notes-seq.png)
