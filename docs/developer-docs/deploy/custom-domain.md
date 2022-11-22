# Custom Domains

All smart contracts, including Web3 dapps, on the Internet Computer blockchain are secured by the root key. End-to-end security is provided by a service worker, a proxy embedded in the browser, which verifies the integrity of data downloaded from the Internet Computer blockchain.

This guide shows how to build a custom service worker which enables a custom domain with end-to-end security for a specific canister. The service worker can be served as static assets from any internet-connected device and after the service worker is loaded, all data is transferred directly between the client and the Internet Computer blockchain.

Ultimately the security of any site using standard web technology depends on DNS since control of DNS allows the site to be redirected and enables control of TLS certificates. Consequently, for a standard website trust must be placed at least in the DNS registrar. If the registrar provides static hosting, deployment of a custom service worker can provide end-to-end security for standard Web3 dapps on the Internet Computer blockchain without increasing the number of entities that must be trusted.

## Creating the custom Service Worker

1. Deploy your canister to the IC and note the canister id.
1. Clone the [official IC repo](https://github.com/dfinity/ic) and navigate to the [service worker folder](https://github.com/dfinity/ic/tree/master/typescript/service-worker) located under `ic/typescript/service-worker`.
1. Map your domain to the canister ID by adding your domain-to-canister mapping to `hostnameCanisterIdMap` in the file `service-worker/src/sw/http_request.ts`.
1. Build the service worker according to the instructions in `service-worker/README.md`. The output should be:
    - an `index.html`,
    - a minified `.js` file, and
    - a `.map` file.
1. Host the assets (`index.html`, `.js` and `.map` files) from a server or CDN and point your custom domain name at this server.
1. Test.

:::caution
For websites that use Internet Identity (II) to authenticate users: The principals provided by II depend on the domain from which the login request was started. So if you authenticate your users through the canister URL and want to switch over to a custom domain, users will not have the same principals anymore. You can prevent this by setting up [Alternative Origins](../../references/ii-spec.md#alternative-frontend-origins).
:::
