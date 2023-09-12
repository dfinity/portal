# Custom domains

## Overview

By default all canisters on the Internet Computer are accessible through `icp0.io`
and their canister ID. In addition to that default domain, one can also host a
canister under a custom domain. This guide explains how to do that.

There are, essentially, two approaches to host a canister under a custom domain:

- [Register the domain with the boundary nodes](#custom-domains-on-the-boundary-nodes).
- [Hosting the domain on your own infrastructure](#custom-domains-using-your-own-infrastructure).

For both approaches, you need to acquire a domain through your favorite registrar.

The two approaches differ in the ease of use and the configurability. When registering
the domain with the boundary nodes, you simply have to configure the DNS records of
the custom domain and the boundary nodes take care of obtaining a certificate,
renewing the certificate before its expiration, SEO and serving the service worker.
When hosting the domain on your own infrastructure, you need to obtain and renew
the certificates, and provide your own infrastructure that serves the service worker.
However, you are also more flexible in how you configure your domain (e.g., you
can serve a custom service worker).

:::info
You may need to specify a `host` in your frontend code when you are using a custom domain, as the `HttpAgent` may not be able to automatically infer the host like it can on `icp0.io` and `ic0.app`. To configure your agent, it will look something like this:

```ts
// Point to icp-api for the mainnet. Leaving host undefined will work for localhost
const host = isProduction ? 'https://icp-api.io' : undefined;
const agent = new HttpAgent({ host });
```
:::

## Custom domains on the boundary nodes

In the following, we first list all the steps necessary to register your
custom domain with the boundary nodes. Then, we explain how one can update and
remove a registration.

### First registration

By following the steps below, you can host your canister under your custom domain
using the boundary nodes. We first explain the necessary steps. Then, we provide
a [concrete example to illustrate these steps](#concrete-example), followed by some
instructions on [troubleshooting](#troubleshooting).

- #### Step 1: Configure the DNS record of your domain, which we denote with `CUSTOM_DOMAIN`.
Add a `CNAME` entry for your domain pointing to `icp1.io` such that all the traffic destined to your domain is redirected to the boundary nodes;
Add a `TXT` entry containing the canister ID to the `_canister-id`-subdomain of your domain (e.g., `_canister-id.CUSTOM_DOMAIN`);
Add a `CNAME` entry for the `_acme-challenge`-subdomain (e.g., `_acme-challenge.CUSTOM_DOMAIN`) pointing to `_acme-challenge.CUSTOM_DOMAIN.icp2.io` in order for the boundary nodes to acquire the certificate.

:::info
In many cases, it is not possible to set a `CNAME` record for the top of a domain, the Apex record. In this case, DNS providers support so-called `CNAME` flattening. To this end, these DNS providers offer flattened record types, such as `ANAME` or `ALIAS` records, which can be used instead of the `CNAME` to `icp1.io`.

In some cases (like AWS:Route53), the format of the `TXT` record can depend on whether it is APEX or not. 
For APEX, the name has to be empty, with the value containing the key-value pair: "_canister-id:CANISTER_ID".
For non-apex (e.g. www), the name should be the standard “_canister-id.www” and value "CANISTER_ID".
:::

--------------------------------------

- #### Step 2: Create a file named `ic-domains` in your canister under `.well-known` containing the custom domain.
By default, `dfx` excludes all files and directories whose names start with a `.` from the asset canister. Hence, to include the `ic-domains`-file, you need to create an additional file, called `.ic-assets.json`.
Create a new file with the name `.ic-assets.json` inside a directory listed in `sources` in `dfx.json`.

To use multiple custom domains and their subdomains with a single canister, simply list each one of them on a newline in the `ic-domains`-file:
```sh
custom-domain1.com
subdomain1.custom-domain1.com
subdomain2.custom-domain1.com
custom-domain2.com
subdomain1.custom-domain3.com
custom-domain4.com
```

In the above example, `subdomain1` could, for example, stand for `www`.

Configure the `.well-known` directory to be included by writing the following configuration into the `.ic-assets.json`-file:

```
[
    {
        "match": ".well-known",
        "ignore": false
    }
]
```

Deploy the updated canister.

--------------------------------------

- #### Step 3: Register the domain with the boundary nodes by issuing the following command and replacing `CUSTOM_DOMAIN` with your custom domain.

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
* **Missing DNS CNAME record**: the `CNAME` entry for the `_acme-challenge`-subdomain is missing.
* **Existing DNS TXT challenge record**: the DNS record already contains a `TXT` entry for the `_acme-challenge`-subdomain. Remove it and try again.
* **Missing DNS TXT record**: the `TXT` entry for the `_canister-id`-subdomain is missing.
* **Invalid DNS TXT record**: the content of the `TXT` entry is not a valid canister ID.
* **More than one DNS TXT record**: there are multiple `TXT` entries for the `_canister-id`-subdomain. Remove them and keep only one.
* **Failed to retrieve known domains**: the `ic-domains`-file is not accessible under `.well-known/ic-domains`.
* **Domain is missing from list of known domains**: the custom domain is missing from the `ic-domains`-file.
* **Rate limit exceeded for apex domain**: too many registration requests have been submitted for the apex domain. Try again later. You can submit at most 5 registration requests per apex domain and hour.
--------------------------------------

- #### Step 4: Processing the registration can take several minutes.
Track the progress of your registration request by issuing the following command and replacing `REQUEST_ID` with the ID you received in the previous step.

```sh
curl -sLv -X GET \
    https://icp0.io/registrations/REQUEST_ID
```

The status will be one of the following:
* `PendingOrder`: the registration request has been submitted and is waiting to be picked up.
* `PendingChallengeResponse`: the certificate has been ordered.
* `PendingAcmeApproval`: the challenge has been completed.
* `Available`: the registration request has been successfully processed.
* `Failed`: the registration request failed.

--------------------------------------

- #### Step 5: Once your registration request becomes `available`, wait a few minutes for the certificate to become available on all boundary nodes.
After that, you should be able to access your canister using the custom domain.

## Concrete example

Imagine you wanted to register your domain `foo.bar.com` for your canister with the canister ID `hwvjt-wqaaa-aaaam-qadra-cai`.

### DNS configuration

| Record Type   | Host                        | Value                               |
|---------------|-----------------------------|-------------------------------------|
| `CNAME`       | foo.bar.com                 | icp1.io                             |
| `TXT`         | _canister-id.foo.bar.com    | hwvjt-wqaaa-aaaam-qadra-cai         |
| `CNAME`       | _acme-challenge.foo.bar.com | _acme-challenge.foo.bar.com.icp2.io |

:::info
Some DNS providers do not require you to specify the main domain. For example, you would just have to specify `foo` instead of `foo.bar.com`, `_canister-id.foo` instead of `_canister-id.foo.bar.com`, and `_acme-challenge.foo` instead of `_acme-challenge.foo.bar.com`.
:::

### `.well-known/ic-domains`
- #### Step 1: Create the `ic-domains` file with the following content in the `.well-known` directory:
    ```
    foo.bar.com
    ```
- #### Step 2: Create the `.ic-assets.json` file at the root of the canister source:

```
[
    {
        "match": ".well-known",
        "ignore": false
    }
]
```

- #### Step 3: Deploy the updated canister.

### Start the registration process

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

:::info
In the [following document](dns-setup.md), we provide detailed instructions to configure DNS
records on the example of two popular domain registrars.
:::

### Troubleshooting

When you are running into issues trying to register your custom domains, make the
following checks:

- Check your DNS configuration using a tool like [`dig`](https://linux.die.net/man/1/dig) or [`nslookup`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup). To check, for example, the `TXT` record with the canister ID, you can run `dig TXT _canister-id.CUSTOM_DOMAIN`. In particular, make sure that there are no extra entries (e.g., multiple `TXT` records for the `_canister-id`-subdomain).
- Check that there are no `TXT` records for the `_acme-challenge`-subdomain (e.g., by using `dig TXT _acme-challenge.CUSTOM_DOMAIN`). If there are `TXT` records, then they are most likely left-over from previous ACME-challenges by your domain provider. Note that these records often do not show up in your domain management dashboard. Try disabling all TLS/SSL-certificate offerings from your domain provider to remove these records.
- Check the `ic-domains` file by downloading it directly from your canister (e.g., by opening `CANISTER_ID.icp0.io/.well-known/ic-domains` in your browser or using `curl CANISTER_ID.icp0.io/.well-known/ic-domains` in your terminal).

## Updating a custom domain

In case you want to update the domain to point to a different canister, you first
need to update the DNS record of your domain and then notify a boundary node:

- #### Step 1: Update the `TXT` entry to contain the new canister ID for the `_canister-id`-subdomain of your domain (e.g., `_canister-id.CUSTOM_DOMAIN`).
- #### Step 2: Notify a boundary node of the change using a PUT request and the ID of your registration (`REQUEST_ID`).

```sh
curl -sLv -X PUT \
    https://icp0.io/registrations/REQUEST_ID
```

:::info
In case you forgot the ID of your registration, you can just submit another registration
request for your domain and the boundary node will return the corresponding ID.
:::

### Removing a custom domain

In case you want to remove your domain, you just need to remove the DNS records
and notify a boundary node:

- #### Step 1: Remove the `TXT` entry containing the canister ID for `_canister-id`-subdomain (e.g., `_canister-id.CUSTOM_DOMAIN`) and the `CNAME` entry for the `_acme-challenge`-subdomain (e.g., `_acme-challenge.CUSTOM_DOMAIN`).
- #### Step 2: Notify a boundary node of the removal using a DELETE request.

```sh
curl -sLv -X DELETE \
    https://icp0.io/registrations/REQUEST_ID
```

:::info
In case you forgot the ID of your registration, you can just submit another registration
request for your domain and the boundary node will return the corresponding ID.
:::

## Custom domains using your own infrastructure

- #### Step 1: Deploy your canister to the IC and note the canister id.
- #### Step 2: Clone the [official IC repo](https://github.com/dfinity/ic) and navigate to the [service worker folder](https://github.com/dfinity/ic/tree/master/typescript/service-worker) located under `ic/typescript/service-worker`.
- #### Step 3: Map your domain to the canister ID by adding your domain-to-canister mapping to `hostnameCanisterIdMap` in the file [`service-worker/src/sw/domains/static.ts`](https://github.com/dfinity/ic/blob/master/typescript/service-worker/src/sw/domains/static.ts).
- #### Step 4: Build the service worker according to the instructions in `service-worker/README.md`. The output should be:
    - an `index.html`,
    - a minified `.js` file, and
    - a `.map` file.
- #### Step 5: Host the assets (`index.html`, `.js` and `.map` files) from a server or CDN and point your custom domain name at this server.
- #### Step 6: Test.

:::caution
For websites that use Internet Identity (II) to authenticate users: The principals provided by II depend on the domain from which the login request was started. So if you authenticate your users through the canister URL and want to switch over to a custom domain, users will not have the same principals anymore. You can prevent this by setting up [Alternative Origins](../../integrations/internet-identity/alternative-origins.md).
:::
