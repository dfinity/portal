# A guild to using VETKeys for Symmetric Encryption

A decrypted vetKD key can be used to derive a symmetric key to be used for symmetric-key encryption, i.e., for both encryption and decryption of a message.
For curve `bls12_381`, this is possible because the decrypted vetKD key is actually a (threshold) BLS signature, and BLS signatures are unique. This uniqueness makes them amenable to a pseudo-random function (PRF), where the pseudo-random output is easily obtained by applying a hash function modeled as a random oracle to the decrypted vetKD key.

*TODOs*:

* Give more details on how to derive keys (H?, HKDF?, etc.)
* Give examples of how canisters can use these keys, e.g., for end-to-end encrypted storage or end-to-end encrypted messaging.