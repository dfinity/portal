---
title: Canister smart contracts serve the Web
abstract:
shareImage: /img/how-it-works/web-content.jpg
slug: smart-contracts-serve-the-web
---

The Internet Computer is the only blockchain that can host an entire dapp – frontend, backend and data.  This is a crucial and distinguishing feature allowing dapps to run 100% on-chain inheriting the security and decentralization of blockchain. Browsing dapps hosted on the Internet Computer is as seamless as browsing Web2 apps. In fact, this very site is hosted 100% on-chain on the Internet Computer and there are many more [dapps hosted on the Internet Computer that can be found here](https://internetcomputer.org/ecosystem/).

All of it is made possible by the [HTTP gateway protocol](https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec), a protocol that translates HTTP requests coming from a client (e.g., your browser) into API canister calls and then the responses back into HTTP responses.

## HTTP Gateway Protocol

In the following, we describe the life of an HTTP request to a canister until it is turned into the corresponding HTTP response. This involves four components:

1. The client, which makes the HTTP request (e.g., a browser);
2. An HTTP gateway, which translates the HTTP request into an API canister call and the resulting response into an HTTP response;
3. An API boundary node, which routes the API canister call to a replica of the subnet hosting the target canister;
4. A canister, which implements the HTTP interface.

<figure>
<img src="/img/how-it-works/web_access.png" alt="Architecture: HTTP gateways and API boundary nodes help in forwarding HTTP requests to canisters" title="The HTTP gateway translates HTTP requests into API canister calls and API boundary nodes route the message to the appropriate subnet" align="center" style="width:1000px">
<figcaption align="center">
HTTP Gateway converts the format of HTTP Requests to canister API calls, and the resulting responses back to HTTP responses.
</figcaption>
</figure>

So let's look at what happens, when one opens [internetcomputer.org](https://internetcomputer.org).

It all starts in the browser. The browser does not know that this site is hosted on the Internet Computer and makes a normal HTTP request, just as it would for any other site. It sends that request to the server hosting internetcomputer.org, which is running the HTTP gateway protocol.

This server takes the HTTP request and translates it into an API canister call. In particular, it turns the HTTP request into a query call to the `http_request`-method of the target canister and puts the requested path, the HTTP request headers and the body into the payload of that query call. How this works in detail is explained in the [HTTP gateway protocol specification](/docs/current/references/http-gateway-protocol-spec). Today, there exist two main implementations of the [HTTP gateway protocol](/docs/current/references/http-gateway-protocol-spec): `icx-proxy`, a remote HTTP gateway, which runs on the boundary nodes; and the `IC HTTP proxy`, a local HTTP gateway, which can be downloaded and run locally.

The API boundary node simply takes the API canister call and forwards it to a replica node, which is part of the subnet that hosts the target canister.

The canister receives that query call for its `http_request`-method, processes it and replies. To this end, the canister needs to implement the [Canister HTTP Interface](/docs/current/references/http-gateway-protocol-spec#canister-http-interface), which is part of the HTTP gateway protocol.

The HTTP gateway receives the response from the canister and translates it back to an HTTP response. It unpacks the response, takes the status code, the supplied headers, the body, etc. and constructs an HTTP response from that. In addition to constructing the response, the HTTP gateway also verifies that the response is correct and has not been tampered with by a malicious replica node. To this end, each response comes with a certificate from the entire subnet (for more details check [asset certification](/how-it-works/asset-certification/)).

Finally, the browser receives the HTTP response and displays the site.

## Additional Information
* [Hosting a static website on the IC](/docs/current/references/samples/hosting/static-website/)
* [Serving web content](/capabilities/serve-web-content/)
* [Web Serving Wiki Article](https://wiki.internetcomputer.org/wiki/Web_Serving)
