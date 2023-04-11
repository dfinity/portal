# A guild to using VETKeys for Identity Based Encryption

The decrypted vetKD key can act as decryption key in a Boneh-Franklin identity-based encryption (BF-IBE) scheme for identity `derivation_path`, where the corresponding encryption key can be obtained by calling `vetkd_public_key` with the same `derivation_path` and `key_id`.

*TODOs*:

* Figure out if the `derivation_id` is relevant for the BF-IBE identity? If yes, explain how.
* Give more details on how exactly asymmetric (identity-based) encryption is done: see `ibe_encrypt` and `ibe_decrypt` in the design document.
* Give examples of how canisters can use these keys, e.g., for end-to-end encrypted messaging.