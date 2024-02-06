# Overview

Internet Identity is the ICP's native form of identity used for authenticating with ICP dapps.

Internet Identity doesn't use usernames and passwords. Instead, users utilize a **passkey** to register and authenticate with websites and applications. Passkeys are a unique cryptographic public/private key pair. Internet Identity issues a new identity for each dapp that a user authenticates with, and the identity cannot be linked back to the user. No personal data is shared with dapps or the Internet Identity application itself, and no software downloads are required. 

Internet Identity uses a form of WebAuthn API running in a single canister that serves both the Internet Identity frontend and backend code. When a user sends a request to the frontend code, the backend authentication service issues a delegation on the user's behalf. This delegation is then signed with the user's passkey. 

Internet Identity can be integrated into your dapp for users to authenticate with as a form of user sign-up and login. 

## Creating an Internet Identity

Check out [how to create an Internet Identity](creating-ii.md).

## Integrating Internet Identity into your dapp

Check out [how to integrate Internet Identity into your dapp](integrate-identity.md).

## Resources

- [Internet Identity dashboard](https://identity.ic0.app/).
- [Internet Identity specification](https://internetcomputer.org/docs/current/references/ii-spec).
- [Internet Identity GitHub repository](https://github.com/dfinity/internet-identity).
- [Internet Identity alternative frontend origins](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/alternative-origins).
- [Internet Identity integration](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/integrate-identity).
