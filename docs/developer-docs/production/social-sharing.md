# Sharing links to dapps

## Overview

Since service workers are not supported in all settings (especially on mobile),
it is important to use the `raw` links (e.g., [oa7fk-maaaa-aaaam-abgka-cai.raw.icp0.io](https://oa7fk-maaaa-aaaam-abgka-cai.raw.icp0.io))
when sharing links on different platforms (e.g., LinkedIn or Twitter/X). This guide
provides the necessary background and explains how to configure your asset
canister correctly, such that you can share links to your dapp without hiccups.

## Context

To directly access dapps hosted on the Internet Computer via a browser,
an HTTP gateway is required. This gateway translates browser HTTP requests into 
API canister calls. Currently, there are two instances of this HTTP gateway, providing
users with two ways to access dapps on the IC through their browsers:

1. `non-raw`: upon the initial dapp access, a service worker is loaded
into the user's browser, which performs the translation locally. `non-raw` is available
through the `<canister_id>.icp0.io` domains (e.g., [oa7fk-maaaa-aaaam-abgka-cai.icp0.io](https://oa7fk-maaaa-aaaam-abgka-cai.raw.icp0.io))
or a custom domain (e.g., [internetcomputer.org](https://internetcomputer.org)).

2. `raw`: the translation happens remotely on the boundary nodes and is transparent
to the user. `raw` access is available through the `<canister_id>.raw.icp0.io` domains
(e.g., [oa7fk-maaaa-aaaam-abgka-cai.raw.icp0.io](https://oa7fk-maaaa-aaaam-abgka-cai.raw.icp0.io)).

Service workers are not universally supported, especially on mobile devices.
In-App Web-Views, Firefox Privacy Mode, and Google translate, for example, do not
function with service workers and thus do not support `non-raw` dapp access.

This is relevant when sharing dapp links on other platforms like
LinkedIn or Twitter. When users try to open a `non-raw` link, for example, from
within the LinkedIn dapp, it is opened in an In-App Web-View, which does not
support service workers and therefore simply displays an error message.

:::caution
For custom domains there is no `raw` equivalent. If you want to share a link,
you should use the corresponding `<canister_id>.raw.icp0.io` domain.
:::


## Solution

To enable universal dapp access through a shared link, it is
essential to share the `raw` version (i.e., `<canister_id>.raw.icp0.io`) to bypass
the service worker.

However, two key details must be noted:

1. Starting from dfx version `0.13.1` until `0.14.3`, asset canisters redirect requests for `raw` to
`non-raw` by default. This redirection must to be disabled in order for the `raw` links to work anywhere.
1. The `raw` domain needs to be registered as an alternative frontend origin for
Internet Identity such that users can seamlessly login across both the `non-raw` and `raw` version with the same principal.

### Disable automatic `raw` redirect

If you are using dfx version `0.13.1` to `0.14.3`, your asset canister automatically redirects
all `raw` requests to `non-raw`, preventing service worker bypassing.

You can either upgrade your dfx version or explicitly enable raw access:

#### Upgrading dfx (recommended)

Simply run the following command:

```
dfx upgrade
```


#### Enabling `raw` access

To enable raw access, add the following snippet to your `.ic-assets.json` file:

```
[
    {
        "match": "**/*",
        "allow_raw_access": true
    }
]
```

This file must be present in every single source directory specified within your
asset canister's `dfx.json`

### Internet Identity alternative frontend origins

To facilitate seamless user account access across both `non-raw` and `raw`,
register the domains as alternative frontend origins for Internet
Identity. Follow these instructions to configure alternative origins:
[Configuring alternative origins](../integrations/internet-identity/alternative-origins.md)
