# A guild to using VETKeys for Signing or building VRFs

For curve `bls12_381`, the decrypted vetKD key is a standard BLS signature conforming to the https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature#name-message-augmentation[message augmentation scheme], where the `derivation_id` acts as the message that is signed.

The public key to verify the signature can be obtained by calling IC method `vetkd_public_key` with the same `derivation_path` and `key_id`.

*TODOs*:

* Verify if the above is correct.
* Give more details?