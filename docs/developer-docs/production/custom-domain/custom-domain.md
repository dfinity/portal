# Custom Domains

By default all canisters on the Internet Computer are accessible through `icp0.io`
and their canister ID. In addition to that default domain, one can also host a
canister under a custom domain. This guide explains how to do that.

There are, essentially, two approaches to host a canister under a custom domain.

1. [Register the domain with the boundary nodes](#custom-domains-on-the-boundary-nodes);
1. [Hosting the domain on your own infrastructure](#custom-domains-using-your-own-infrastructure).

For both approaches, you need to acquire a domain through your favorite registrar.

The two approaches differ in the ease of use and the configurability. When registering
the domain with the boundary nodes, you simply have to configure the DNS records of
the custom domain and the boundary nodes take care of obtaining a certificate,
renewing the certificate before its expiration, SEO and serving the service worker.
When hosting the domain on your own infrastructure, you need to obtain and renew
the certificates, and provide your own infrastructure that serves the service worker.
However, you are also more flexible in how you configure your domain (e.g., you
can serve a custom service worker).

> Note: You may need to specify a `host` in your frontend code when you are using a custom domain, as the `HttpAgent` may not be able to automatically infer the host like it can on `icp0.io` and `ic0.app`. To configure your agent, it will look something like this:

```ts
// Point to icp-api for mainnet. Leaving host undefined will work for localhost
const host = isProduction ? 'https://icp-api.io' : undefined;
const agent = new HttpAgent({ host });
```

## Custom Domains on the Boundary Nodes

In the following, we first list all the steps necessary to register your
custom domain with the boundary nodes. Then, we explain how one can update and
remove a registration.

### First Registration

By following the steps below, you can host your canister under your custom domain
using the boundary nodes. We first explain the necessary steps. Then, we provide
a [concrete example to illustrate these steps](#concrete-example), followed by some
instructions on [troubleshooting](#troubleshooting).

1. Configure the DNS record of your domain, which we denote with `CUSTOM_DOMAIN`.
    * Add a `CNAME` entry for your domain pointing to `icp1.io` such that all the traffic destined to your domain is redirected to the boundary nodes;

        _Note:_ In many cases, it is not possible to set a `CNAME` record for the top of a domain, the Apex record. In this case, DNS providers support so-called `CNAME` flattening. To this end, these DNS providers offer flattened record types, such as `ANAME` or `ALIAS` records, which can be used instead of the `CNAME` to `icp1.io`.

    * Add a `TXT` entry containing the canister ID to the `_canister-id`-subdomain of your domain (e.g., `_canister-id.CUSTOM_DOMAIN`);
    * Add a `CNAME` entry for the `_acme-challenge`-subdomain (e.g., `_acme-challenge.CUSTOM_DOMAIN`) pointing to `_acme-challenge.CUSTOM_DOMAIN.icp2.io` in order for the boundary nodes to acquire the certificate.
1. Create a file named `ic-domains` in your canister under `.well-known` containing the custom domain. To use multiple custom domains with a single canister, simply list each domain on a newline in the `ic-domains`-file:
    ```sh
    custom-domain1.com
    custom-domain2.com
    custom-domain3.com
    custom-domain4.com
    ```
    * By default, `dfx` excludes all files and directories whose names start with a `.` from the asset canister. Hence, to include the `ic-domains`-file, you need to create an additional file, called `.ic-assets.json`.
    * Create a new file with the name `.ic-assets.json` inside a directory listed in `sources` in `dfx.json`..
    * Configure the `.well-known` directory to be included by writing the following configuration into the `.ic-assets.json`-file:
        ```
        [
            {
                "match": ".well-known",
                "ignore": false
            }
        ]
        ```
    * Deploy the updated canister.
1. Register the domain with the boundary nodes by issuing the following command and replacing `CUSTOM_DOMAIN` with your custom domain.
    ```sh
    curl -sLv -X POST \
        -H 'Content-Type: application/json' \
        https://icp0.io/registrations \
        --data @- <<EOF
    {
        "name": "CUSTOM_DOMAIN"
    }
    EOF
    ```
    If the call was successful, you will get a JSON response that contains the request ID in the body, which you can use to query the status of your registration request:
    ```
    {"id":"REQUEST_ID"}
    ```
    In case the call failed, you will get an error message indicating the reason for the failure:
    * _missing DNS CNAME record_ - the `CNAME` entry for the `_acme-challenge`-subdomain is missing.
    * _existing DNS TXT challenge record_ - the DNS record already contains a `TXT` entry for the `_acme-challenge`-subdomain. Remove it and try again.
    * _missing DNS TXT record_ - the `TXT` entry for the `_canister-id`-subdomain is missing.
    * _invalid DNS TXT record_ - the content of the `TXT` entry is not a valid canister ID.
    * _more than one DNS TXT record_ - there are multiple `TXT` entries for the `_canister-id`-subdomain. Remove them and keep only one.
    * _failed to retrieve known domains_ - the `ic-domains`-file is not accessible under `.well-known/ic-domains`.
    * _domain is missing from list of known domains_ - the custom domain is missing from the `ic-domains`-file.
1. Processing the registration can take several minutes. Track the progress of your registration request by issuing the following command and replacing `REQUEST_ID` with the ID you received in the previous step.
    ```sh
    curl -sLv -X GET \
        https://icp0.io/registrations/REQUEST_ID
    ```
    The status will be one of the following:
    * `PendingOrder`: The registration request has been submitted and is waiting to be picked up.
    * `PendingChallengeResponse`: The certificate has been ordered.
    * `PendingAcmeApproval`: The challenge has been completed.
    * `Available`: The registration request has been successfully processed.
    * `Failed`: The registration request failed.
1. Once your registration request becomes `available`, wait a few minutes for the certificate to become available on all boundary nodes. After that, you should be able to access your canister using the custom domain.

#### Concrete Example

Imagine you wanted to register your domain `foo.bar.com` for your canister with the canister ID `hwvjt-wqaaa-aaaam-qadra-cai`.

1. DNS Configuration:

    | Record Type   | Host                        | Value                               |
    |---------------|-----------------------------|-------------------------------------|
    | `CNAME`       | foo.bar.com                 | icp1.io                             |
    | `TXT`         | _canister-id.foo.bar.com    | hwvjt-wqaaa-aaaam-qadra-cai         |
    | `CNAME`       | _acme-challenge.foo.bar.com | _acme-challenge.foo.bar.com.icp2.io |

    _Note:_ Some DNS providers do not require you to specify the main domain. For example, you would just have to specify `foo` instead of `foo.bar.com`, `_canister-id.foo` instead of `_canister-id.foo.bar.com`, and `_acme-challenge.foo` instead of `_acme-challenge.foo.bar.com`.
2. `.well-known/ic-domains`:
    * Create the `ic-domains` file with the following content in the `.well-known` directory:
        ```
        foo.bar.com
        ```
    * Create the `.ic-assets.json` file at the root of the canister source:
        ```
        [
            {
                "match": ".well-known",
                "ignore": false
            }
        ]
        ```
    * Deploy the updated canister.
3. Start the registration process:
    ```sh
    curl -sLv -X POST \
        -H 'Content-Type: application/json' \
        https://icp0.io/registrations \
        --data @- <<EOF
    {
        "name": "foo.bar.com"
    }
    EOF
    ```

:::note
In the [following document](dns-setup.md), we provide detailed instructions to configure DNS
records on the example of two popular domain registrars.
:::

#### Troubleshooting

When you are running into issues trying to register your custom domains, make the
following checks:

1. Check your DNS configuration using a tool like [`dig`](https://linux.die.net/man/1/dig) or [`nslookup`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup). To check, for example, the `TXT` record with the canister ID, you can run `dig TXT _canister-id.CUSTOM_DOMAIN`. In particular, make sure that there are no extra entries (e.g., multiple `TXT` records for the `_canister-id`-subdomain).
1. Check that there are no `TXT` records for the `_acme-challenge`-subdomain (e.g., by using `dig TXT _acme-challenge.CUSTOM_DOMAIN`). If there are `TXT` records, then they are most likely left-over from previous ACME-challenges by your domain provider. Note that these records often do not show up in your domain management dashboard. Try disabling all TLS/SSL-certificate offerings from your domain provider to remove these records.
1. Check the `ic-domains` file by downloading it directly from your canister (e.g., by opening `CANISTER_ID.icp0.io/.well-known/ic-domains` in your browser).

### Updating a Custom Domain

In case you want to update the domain to point to a different canister, you first
need to update the DNS record of your domain and then notify a boundary node:

1. Update the `TXT` entry to contain the new canister ID for the `_canister-id`-subdomain of your domain (e.g., `_canister-id.CUSTOM_DOMAIN`).
1. Notify a boundary node of the change using a PUT request and the ID of your registration (`REQUEST_ID`).
    ```sh
    curl -sLv -X PUT \
        https://icp0.io/registrations/REQUEST_ID
    ```

:::note
In case you forgot the ID of your registration, you can just submit another registration
request for your domain and the boundary node will return the corresponding ID.
:::

### Removing a Custom Domain

In case you want to remove your domain, you just need to remove the DNS records
and notify a boundary node:

1. Remove the `TXT` entry containing the canister ID for `_canister-id`-subdomain (e.g., `_canister-id.CUSTOM_DOMAIN`) and the `CNAME` entry for the `_acme-challenge`-subdomain (e.g., `_acme-challenge.CUSTOM_DOMAIN`).
1. Notify a boundary node of the removal using a DELETE request.
    ```sh
    curl -sLv -X DELETE \
        https://icp0.io/registrations/REQUEST_ID
    ```

:::note
In case you forgot the ID of your registration, you can just submit another registration
request for your domain and the boundary node will return the corresponding ID.
:::

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
For websites that use Internet Identity (II) to authenticate users: The principals provided by II depend on the domain from which the login request was started. So if you authenticate your users through the canister URL and want to switch over to a custom domain, users will not have the same principals anymore. You can prevent this by setting up [Alternative Origins](../../integrations/internet-identity/alternative-origins.md).
:::
