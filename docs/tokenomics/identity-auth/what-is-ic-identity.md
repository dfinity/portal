# What is Internet Identity?

*Internet Identity* is an anonymous blockchain authentication framework supported by the Internet Computer. Users can create identity "anchors" to which they assign compatible cryptographically enabled devices, such as the fingerprint sensor on a laptop, the face ID system on a phone, or a portable HSM, such as a YubiKey or Ledger wallet. Thereafter, they can signup and authenticate to any dapp running on the Internet Computer using any of the devices they have assigned to their anchor. This provides a high level of convenience, allowing users to authenticate to dapps they are interested in with a very low level of friction, while benefiting from the highest level of cryptographic security, but without the need to directly manage or handle cryptographic key material themselves, which prevents mistakes and the theft of their key material. The system is anonymizing towards dapps, and whenever an anchor is used to interact with a dapp, the dapp sees a specially generated *pseudonym*, which prevents users from being tracked across the various dapps they use. A user can create as many identity anchors as they wish.

Unlike most authentication methods, Internet Identity does not require you to set and manage passwords or provide any personal identifying information to dapps or to Internet Identity.

## How Internet Identity works

Internet Identity builds on Web Authentication (WebAuthn) API supported by modern web browsers and operating systems, and the "chain key cryptography" framework that powers the Internet Computer. Essentially, the Internet Computer signs the list of public keys inside the devices assigned to each anchor using its master chain key, which client side code, for example running in the web browser, is aware of.

Dapps that integrate with Internet Identity prompt you to authenticate using an identity anchor. If you don’t have an identity anchor yet, it is easy to create one and add authentication methods to it. For more details, see [How to use Internet Identity](./auth-how-to.html). For each device you add, a pair of cryptographic keys (private and public key) is generated. The public key is stored on the Internet Computer blockchain, while the private key remains locked inside the authentication device together with any biometric data that governs access to it. Adding multiple authentication devices to an identity anchor allows you to access dapps across all of your devices.

When you access a dapp that uses Internet Identity for authentication, you first specify the identity anchor you want to use. After authenticating using an identity anchor using an assigned device, your browser connects to Internet Identity and generates a session key for use with that dapp. Finally, you are asked to authorize access to the dapp.

Your browser downloads the authorization and then redirects you to the dapp. The dapp verifies the authorization from Internet Identity and grants you access as an application-specific anonymous identity that we call pseudonym. Internally, you have a different pseudonym for each dapp, but your pseudonym for any single dapp is the same across all of your devices. All of your devices just represent different methods you can use to authenticate your Internet Identity anchor.

You can register as many identity anchors as you want for redundancy, or different purposes. For example, a user might create one anchor for use with SocialFi or GameFi, and another for use with pure DeFi. They might only feel comfortable adding facial recognition to their SocialFi and GameFi anchor, say, and only use more secure portable HSM devices like YubiKeys and Ledger wallets with their pure DeFi anchor.

## How to use Internet Identity

To learn how to create and use Identity Anchors step-by-step, see [How to use Internet Identity](../docs/tokenomics/identity-auth/auth-how-to.html). This also describes how to set up recovery mechanisms for Identity Anchors.
