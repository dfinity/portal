# Custom Domains

By default all canisters on the Internet Computer are accessible through `ic0.app`
and their canister ID. In addition to that default domain, one can also host a
canister under a custom domain. This guide explains how to do that.

There are, essentially, two approaches to host a canister under a custom domain.

1. Register the domain with the boundary nodes;
1. Hosting the domain on your own infrastructure.

For both approaches, you need to acquire a domain through your favorite registrar.

The two approaches differ in the ease of use and the configurability. When registering
the domain with the boundary nodes, you simply has to configure the DNS records of
the custom domain and the boundary nodes take care of obtaining a certificate,
renewing the certificate before its expiration, SEO and serving the service worker.
When hosting the domain on your own infrastructure, you need to obtain and renew
the certificates, and to provide your own infrastructure that serves the service worker.
However, you are also more flexible in how you configure your domain (e.g., you
can serve a custom service worker).

## Custom Domains on the Boundary Nodes

1. Configure the DNS record of your domain (e.g., `foo.com`)
    * Add a `CNAME` entry for your domain (e.g., `foo.com`) pointing to `APPLICATION DOMAIN` such that all the traffic destined to your domain is redirected to the boundary nodes;
    * Add a `TXT` entry containing the canister ID to the `_canister-id`-subdomain of your domain (e.g., `_canister-id.foo.com`);
    * Add a `CNAME` entry for the `_acme-challenge`-subdomain (e.g., `_acme-challenge.foo.com`) pointing to `DELEGATION DOMAIN` in order for the boundary nodes to acquire the certificate.
1. In your canister, create a file named `custom-domains` under `.well-known` containing the custom domain (e.g., `foo.com`).
1. Register the domain with the boundary nodes by issuing the following command and replacing `{{ custom domain }}` with your custom domain (e.g., `foo.com`).
    ```sh
    curl -sLv -X POST \
        -H 'Content-Type: application/json' \
        APPLICATION DOMAIN/registrations \
        --data @- <<EOF
    {
        "name": "{{ custom domain }}"
    }
    EOF
    ```
    If the call was successful, you will get a request ID with which you can query the status of your registration request.
    In case the calls failed, you will get an error message explaining why.
1. Check the status of your registration request.
    ```
    curl -sLv -X GET \
        APPLICATION DOMAIN/registrations/{{ request ID }}
    ```
    The status will be one of the following:
    * `pendingOrder`: The registration request has been submitted and is waiting to be picked up.
    * `pendingChallengeResponse`: The certificate has been ordered.
    * `pendingAcmeApproval`: The challenge has been completed.
    * `available`: The registration request has been successfully processed.
    * `failed`: The registration request failed.
1. Once your registration request becomes `available`, wait a few minutes for the certificate to become available on all boundary nodes. After that, you should be able to access your canister using the custom domain.

## Custom Domains using your Own Infrastructure

1. Deploy your canister to the IC and note the canister id.
1. Clone the [official IC repo](https://github.com/dfinity/ic) and navigate to the [service worker folder](https://github.com/dfinity/ic/tree/master/typescript/service-worker) located under `ic/typescript/service-worker`.
1. Map your domain to the canister ID by adding your domain-to-canister mapping to `hostnameCanisterIdMap` in the file [`service-worker/src/sw/domains/static.ts`](https://github.com/dfinity/ic/blob/master/typescript/service-worker/src/sw/domains/static.ts).
1. Build the service worker according to the instructions in `service-worker/README.md`. The output should be:
    - an `index.html`,
    - a minified `.js` file, and
    - a `.map` file.
1. Host the assets (`index.html`, `.js` and `.map` files) from a server or CDN and point your custom domain name at this server.
1. Test.

:::caution
For websites that use Internet Identity (II) to authenticate users: The principals provided by II depend on the domain from which the login request was started. So if you authenticate your users through the canister URL and want to switch over to a custom domain, users will not have the same principals anymore. You can prevent this by setting up [Alternative Origins](../../references/ii-spec.md#alternative-frontend-origins).
:::
