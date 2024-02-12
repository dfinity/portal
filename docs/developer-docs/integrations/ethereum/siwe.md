# Sign in with Ethereum

The [SIWE](https://eips.ethereum.org/EIPS/eip-4361) standard defines a protocol for off-chain authentication of Ethereum accounts. This protocol is designed to enable Ethereum wallet-based authentication for applications on other platforms, such as the Internet Computer (ICP). 

By integrating the third party library [ic_siwe](https://github.com/kristoferlund/ic-siwe/tree/main/packages/ic_siwe) or adding the pre-built [ic_siwe_provider](https://github.com/kristoferlund/ic-siwe/tree/main/packages/ic_siwe_provider) canister to your project, you can enable users to sign into your application using their Ethereum wallets. 

The goal of the `ic_siwe` project is to enhance the interoperability between Ethereum and ICP, enabling developers to build applications that leverage the strengths of both platforms.

### Key features

- **Ethereum Wallet Sign-In**: Enables Ethereum wallet sign-in for ICP applications. Sign in with any Ethereum wallet to generate an ICP identity and session.
- **Session identity uniqueness**: Ensures that session identities are specific to each application's context, preventing cross-app identity misuse.
- **Consistent principal generation**: Guarantees that logging in with an Ethereum wallet consistently produces the same principal, irrespective of the client used.
- **Direct Ethereum address to principal mapping**: Creates a 1:1 correlation between Ethereum addresses and principals within the scope of the current application.
- **Timebound sessions**: Allows developers to set expiration times for sessions, enhancing security and control.

## Pre-built `ic_siwe_provider` canister

While the `ic_siwe` library can be integrated with any Rust-based ICP project, using the pre-built [ic-siwe-provider](https://github.com/kristoferlund/ic-siwe/tree/main/packages/ic_siwe_provider) canister is the easiest way to integrate Ethereum wallet authentication into an ICP app built using any language.

The canister is designed as a plug-and-play solution for developers, enabling easy integration into existing ICP applications with minimal coding requirements. By adding the pre built `ic_siwe_provider` canister to the `dfx.json` of an ICP project, developers can quickly enable Ethereum wallet-based authentication for their applications. The canister simplifies the authentication flow by managing the creation and verification of SIWE messages and handling user session management.

## React demo application

A demo application that uses the `ic_siwe_provider` canister to demonstrate the full login flow is available in two versions: 
- [ic-siwe-react-demo-rust](https://github.com/kristoferlund/ic-siwe-react-demo-rust)
- [ic-siwe-react-demo-ts](https://github.com/kristoferlund/ic-siwe-react-demo-ts)

The demo uses another package from the `ic-siwe` project, [ic-use-siwe-identity](https://github.com/kristoferlund/ic-siwe/tree/main/packages/ic-use-siwe-identity), a React hook and context provider for easy frontend integration with SIWE enabled ICP canisters.