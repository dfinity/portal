# DNS configuration guide

## Overview
This guide explains how to configure the DNS records of your domain for three popular
registrars: [Namecheap](#namecheap), [GoDaddy](#godaddy), and [Amazon Route 53](#amazonroute53).

## Namecheap

In the following, the steps to configure the apex of a domain and
a subdomain on Namecheap to be used as a custom domain are listed. To illustrate the required
configuration, the domain `ic-domain.live` and the subdomain `example.ic-domain.live` are used
by configuring it to point to the canister with the ID `y5jqt-wqaaa-aaaam-abcoq-cai`.

- #### Step 1: After purchasing your domain on Namecheap, open the management pane of your domain in the Namecheap dashboard.

- #### Step 2: Open the **Advanced DNS** tab.

### Apex
To configure the apex of the domain (e.g., `ic-domain.live`), add the following records by clicking on **Add new record**:
  * Create an `ALIAS` record for which you set the host field to `@` and the target field to `icp1.io`;
  * Create a `CNAME` record for which you set the host field to `_acme-challenge` and the target field to `_acme-challenge.ic-domain.live.icp2.io`;
  * Create a `TXT` record for which you set the host field to `_canister-id` and the value field to the canister ID `y5jqt-wqaaa-aaaam-abcoq-cai`.

  The resulting configuration should look similar to the following screenshot:

  ![DNS Configuration for `ic-domain.live` on Namecheap](namecheap-apex.png)

### Subdomain
To configure a subdomain (e.g., `example.ic-domain.live`), add the following records by clicking on **Add new record**:
  * Create a `CNAME` record for which you set the host field to `example` and the target field to `icp1.io`;
  * Create a `CNAME` record for which you set the host field to `_acme-challenge.example` and the target field to `_acme-challenge.example.ic-domain.live.icp2.io`;
  * Create a `TXT` record for which you set the host field to `_canister-id.example` and the value field to the canister ID `y5jqt-wqaaa-aaaam-abcoq-cai`.

  The resulting configuration should look similar to the following screenshot:

  ![DNS Configuration for `example.ic-domain.live` on Namecheap](namecheap-subdomain.png)

Now, you are all set to register your custom domain with the boundary nodes and you can continue with step 2 of the [general custom domains instructions](custom-domain.md#custom-domains-on-the-boundary-nodes).

## GoDaddy

In the following, it is explained how you can configure your domain on GoDaddy to
be used to point to a canister hosted on the Internet Computer. As an illustration,
this guide shows how to configure the domain `ic-domain.online` and the subdomain `example.ic-domain.online`
to point to the canister with the ID `y5jqt-wqaaa-aaaam-abcoq-cai`.

- #### Step 1: After purchasing your domain on GoDaddy, open your account and navigate to **My Products**.

- #### Step 2: Click on the **DNS** button next to the domain:

    ![Domain Management Overview](godaddy-overview.png)

### Apex

Unfortunately, GoDaddy does not support to configure a `CNAME` record (or one of its alternatives, `ALIAS` or `ANAME`) for the apex of the domain, you need to make use of a workaround.

  There are mainly two approaches:

  - [_recommended_: Relying on a different DNS provider (e.g., Cloudflare).](#rely-on-an-alternative-dns-provider-recommended)
  - [Directly configuring the IP addresses of the boundary nodes.](#directly-configure-the-ip-addresses)

Directly configuring the IP addresses is simpler compared to relying on another
DNS provider, but is less resilient and performant. Therefore, it is advised you to use
a different DNS provider (e.g., Cloudflare or Route 53).

#### Rely on an alternative DNS provider (_recommended_)

It is explained in this approach using Cloudflare as DNS provider. It works similar
with any other DNS provider that supports `CNAME`, `ALIAS`, or `ANAME` records
for the apex of a domain.

  - #### Step 1: Create a free account with Cloudflare, click on **Add site** in the top bar of dashboard.

  - #### Step 2: Enter your domain (e.g., `ic-domain.online`) and click **Add site**.

  - #### Step 3: Choose the free plan and continue.

  - #### Step 4: In the next step, Cloudflare lists two nameservers that you should configure GoDaddy to use.
  Take note of the two nameservers (e.g., `brianna.ns.cloudflare.com` and `kaiser.ns.cloudflare.com`) provided by Cloudflare.

  - #### Step 5: In the **DNS Management** pane of GoDaddy, remove all DNS entries on GoDaddy.
  Go back to your DNS settings on Godaddy and make sure to remove all the DNS entries that GoDaddy created.

  - #### Step 6: Click on the **Change** button in the **Nameservers** section.

  - #### Step 7: In the dialog that opened, click on **Enter my own nameservers (advanced)** and fill in the nameservers from Cloudflare in the provided fields. To finish, click on **Save**.

  ![GoDaddy's dialog to configure the nameservers](godaddy-ns-dialog.png)

  - #### Step 8: Confirm in the dialog that you indeed intend to change the nameservers.
  The resulting configuration should look similar to the following screenshot:

  ![Alternative nameserver configuration on GoDaddy](godaddy-ns-configured.png)

  - #### Step 9: Back in the Cloudflare management portal, click on **Done, check nameservers**.
  This step can take several hours and you will be notified by email once it
  succeeded.

  - #### Step 10: On Cloudflare, add the following records to configure your domain:
    * Create a `CNAME` record for which you set the name field to `@` and the
    target field to `icp1.io`;
    * Create a `CNAME` record for which you set the host field to `_acme-challenge` and the target field to `_acme-challenge.ic-domain.online.icp2.io`;
    * Create a `TXT` record for which you set the name field to `_canister-id` and the content field to the canister ID `y5jqt-wqaaa-aaaam-abcoq-cai`.

  The resulting configuration should look similar to the following screenshot:

  ![DNS Configuration for `ic-domain.online` on Cloudflare](cloudflare-apex.png)

#### Directly configure the IP addresses (at your own risk)

:::caution
By directly configuring the IP addresses of the boundary nodes, you always need to make sure
to keep your DNS records up-to-date. If a boundary node is retired or changes its IP
addresses, you need to remove or update your DNS records. Otherwise, you risk that
your dapp becomes inaccessible.
:::

  - #### Step 1: First, you need to look up the IP addresses of the boundary nodes (`icp1.io`).
  To this end, use an online DNS lookup service (e.g., [nslookup.io](https://nslookup.io))
  and take a note of the IPv4- and IPv6-addresses, the `A` and `AAAA` records, respectively.

    ![Resulting `A` and `AAAA` records from querying `icp1.io` on nslookup.io](nslookup-results.png)

  - #### Step 2: In the **DNS Management** pane in your GoDaddy account, add the following DNS records:

    * Create an `A` record for each IPv4-address by setting the name field
    to "@" and the value field to the IPv4-address (e.g., `193.118.63.173`);
    * Create an `AAAA` record for each IPv6-address by setting the name field
    to "@" and the value field to the IPv6-address (e.g., `2a0b:21c0:b002:2:5000:59ff:fead:c233`);
    * Create a `CNAME` record for which you set the name field to `_acme-challenge` and the value field to `_acme-challenge.ic-domain.online.icp2.io`;
    * Create a `TXT` record for which you set the name field to `_canister-id` and the value field to the canister ID `y5jqt-wqaaa-aaaam-abcoq-cai`.

    The resulting configuration should look similar to the following screenshot:

    ![DNS Configuration for `ic-domain.online` on GoDaddy](godaddy-apex-ips.png)

### Subdomain
To configure a subdomain (e.g., `example.ic-domain.live`), add the following records by clicking on **Add new record**:
  * Create a `CNAME` record for which you set the host field to `example` and the target field to `icp1.io`;
  * Create a `CNAME` record for which you set the host field to `_acme-challenge.example` and the target field to `_acme-challenge.example.ic-domain.online.icp2.io`;
  * Create a `TXT` record for which you set the host field to `_canister-id.example` and the value field to the canister ID `y5jqt-wqaaa-aaaam-abcoq-cai`.

  The resulting configuration should look similar to the following screenshot:

  ![DNS Configuration for `example.ic-domain.online` on GoDaddy](godaddy-subdomain.png)

Now, you are all set to register your custom domain with the boundary nodes and you can continue with step 2 of the [general custom domains instructions](custom-domain.md#custom-domains-on-the-boundary-nodes).

## Amazon Route 53

In the following, it is explained how you can configure your domain on Amazon Route 53
to point to a canister hosted on the Internet Computer. As an illustration, this guide showcases how to 
configure the domain `ic-domain.net` and the subdomain `example.ic-domain.net` to
point to the canister with the ID `y5jqt-wqaaa-aaaam-abcoq-cai`.

### Apex

Unfortunately, Amazon Route 53 does not support to configure a `CNAME` record (or one of its alternatives, `ALIAS` or `ANAME`) for the apex of the domain. You need to make use of a workaround.
For instructions take a look at the steps outlined for GoDaddy under ["Rely on an alternative DNS provider"](#rely-on-an-alternative-dns-provider-recommended).

### Subdomain

- #### Step 1: After purchasing your domain on Route 53, navigate to **Hosted zones** and click on your domain.

- #### Step 2: Click on the domain to open the DNS settings.

- #### Step 3: Configure your DNS records.
To configure a subdomain (e.g., `example.ic-domain.net`), add the following records by clicking on **Add new record**:
  * Create a `CNAME` record for which you set the host field to `example` and the target field to `icp1.io`;
  * Create a `CNAME` record for which you set the host field to `_acme-challenge.example` and the target field to `_acme-challenge.example.ic-domain.net.icp2.io`;
  * Create a `TXT` record for which you set the host field to `_canister-id.example` and the value field to the canister ID `y5jqt-wqaaa-aaaam-abcoq-cai`.
  The resulting configuration should look similar to the following screenshot:

  ![DNS Configuration for `example.ic-domain.net` on Amazon Route 53](route53-subdomain.png)

Now, you are all set to register your custom domain with the boundary nodes and you can continue with step 2 of the [general custom domains instructions](custom-domain.md#custom-domains-on-the-boundary-nodes).
