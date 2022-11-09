---
title: Smart Contracts Serve the Web
abstract:
shareImage: /img/how-it-works/smart-contracts-serve-the-web.600.jpg
slug: smart-contracts-serve-the-web
---
# Smart Contracts Serve the Web

The Internet Computer has the ability is the only blockchain that can host a full Dapp – frontend, backend and data. Any user can deploy their Dapp as a canister (smart contract) on the Internet Computer. Canisters are computational units that bundle together code and state. Canisters can store data, deliver HTML, CSS and Javascript pages, and answer API requests. Canisters are incredibly fast and can deliver webpages within 200ms. Canisters can store up to 32 GB of data at an incredibly low cost ($5 per GB per annum). Browsing Dapps hosted on the Internet Computer is as seemless as browsing Web2 apps hosted on cloud. All these factors enable developers to deploy even large-scale social media applications entirely on-chain without needing any cloud services. Try out a few apps deployed on the IC. 
* [DSCVR (Decentralized Reddit)](https://h5aet-waaaa-aaaab-qaamq-cai.ic0.app)
* [Distrikt (Decentralized Twitter)](https://az5sd-cqaaa-aaaae-aaarq-cai.ic0.app/) 

# Workflow

<figure>
<img src="/img/how-it-works/web_access.png" alt="Architecture: HTTP Gateway and Boundary nodes help in forwarding HTTP Request to canisters" title="HTTP Gateway converts the format of messages and Boundary nodes route the message to appropriate subnet" align="center" style="width:900px">
<figcaption align="center">
HTTP Gateway converts the format of HTTP Requests to canister queries, and canister responses to HTTP responses.<br>
Boundary nodes route canister queries to appropriate subnet.
</figcaption>
</figure>

A canister hosted on the Internet Computer consists of a bunch of methods. Users can send queries to the canister. A query consists of the canister method to be executed and the inputs for the canister method. The Internet Computer receives the queries sent by the users, executes the corresponding canister method and returns the response to the user. 

If a canister wishes to serve web content, it should implement a method that takes input a HTTP request (url, http method and headers) and outputs a HTTP response (status, headers and body). The canister method could return HTML, CSS and Javascript content as part of the HTTP response. Refer to [Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request) for more details.

There’s also an easy way to host existing static web apps (even those built using frameworks such as React and Angular) on the Internet Computer with minimal extra code by creating an “asset canister”. An asset canister works similar to a regular canister, except that a lot of boilerplate code to host static websites is taken care of for us. To host a static website, we simply need to create a canister, specify its type as “asset” and specify the source folder of the web app. Once the asset canister is deployed to the Internet Computer, the website can be accessed at http://\<canister id\>.ic0.app. A detailed tutorial can be found [here](https://www.youtube.com/watch?v=JAQ1dkFvfPI) and [here](https://internetcomputer.org/docs/current/samples/host-a-website/). 

## HTTP Gateway Protocol
We now have a way for canisters to serve web content. However, the browser only communicates with HTTP(s) protocol and doesn’t know how to query a canister. To fill the gap between the browser and Internet Computer protocols, we introduce the notion of a [HTTP Gateway](https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-gateway) which sits in between the browser and the Internet Computer. 

The browser sends a http request to the http gateway. The gateway first interprets the URL in the http request, extracts the corresponding canister id and queries the canister. When the canister sends back a response, the http gateway interprets the response, verifies the signatures, converts into a http response and sends it to the browser. 

There are many ways to implement the HTTP Gateway protocol. Currently, there are 2 implementations. 
* The gateway protocol is implemented as a [service worker](https://web.dev/learn/pwa/service-workers/). When the user enters a URL such as http://\<canister id\>.ic0.app, the browser calls the DNS service to resolve the query. Currently, the DNS maps the ic0.app domain to the [boundary nodes](https://internetcomputer.org/how-it-works/boundary-nodes/) of the Internet Computer. When the browser makes a request to a boundary node, it responds with a service worker that implements HTTP Gateway protocol. The browser then installs the service worker. From then on, whenever the user makes a request to http://\<canister id\>.ic0.app, the browser passes on the request to the service worker.
* Boundary nodes also implement the HTTP Gateway protocol. When the user enters a URL such as http://\<canister id\>.raw.ic0.app, the browser sends the http request to the boundary node, which acts as a http gateway. 
There are a few other ways of implementing the HTTP Gateway protocol. The gateway can be implemented as a browser extension. The chromium browser could also be modified to include HTTP Gateway as part of the browser. 

## SEO
The dapps running on the Internet Computer seamlessly integrate into the Web 2.0 world as crawlers are able to access them directly on-chain. This allows dapps to be indexed by search engines and for their metadata to be read in order to generate previews and cards on social platforms. A tutorial on using the Search Engine Optimization (SEO) features of the Internet Computer can be found in this [blog post](https://medium.com/dfinity/how-to-configure-dapps-for-social-platform-previews-and-seo-62a55ee63d33) and this [blog post](https://medium.com/dfinity/seo-support-for-100-on-chain-websites-built-on-the-internet-computer-19c951d73853). 

[Serving web content](https://internetcomputer.org/features/serve-web-content/)

[Building a front-end dapp on the IC](https://medium.com/dfinity/building-a-front-end-dapp-on-the-internet-computer-55985f0a595b)

[Hosting a static website on the IC](https://internetcomputer.org/docs/current/samples/host-a-website/)

[HTTP Gateway Protocol](https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-gateway)

[Web Serving Wiki Article](https://wiki.internetcomputer.org/wiki/Web_Serving)

[![Watch youtube video](https://i.ytimg.com/vi/JAQ1dkFvfPI/maxresdefault.jpg)](https://www.youtube.com/watch?v=JAQ1dkFvfPI)

[![Watch youtube video](https://i.ytimg.com/vi/b_nc6yx5_DQ/maxresdefault.jpg)](https://www.youtube.com/watch?v=b_nc6yx5_DQ)
