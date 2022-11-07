---
title: Internet Computer Serves Web Pages
abstract:
shareImage: /img/how-it-works/web-access.600.jpg
slug: web-access
---

Smart contracts are software programs that run on a blockchain. In the general design of blockchain apps, the backend is hosted as a smart contract, whereas the frontend is hosted on cloud. Blockchains are generally incapable of hosting the frontend. This is because our web browser does not know how to communicate with a blockchain and obtain the HTML, CSS and Javascript frontend pages. 

The Internet Computer is the only blockchain that can host a full Dapp – frontend, backend and data. This is possible because the Internet Computer can securely serve HTTP requests. 

A canister hosted on the Internet Computer consists of a bunch of methods. Users can send queries to the canister. A query consists of the canister method to be executed and the inputs for the canister method. The Internet Computer receives the queries sent by the users, executes the corresponding canister and returns the response to the user. 

If a canister wishes to serve web content, it should implement a predefined method called “http_request”. The method takes input a HTTP request (url, http method and headers) and outputs a HTTP response (status, headers and body). One can implement the frontend of a blockchain app by creating a canister and letting its http_request method return HTML, CSS and Javascript content.  More detailed information of the http_request method can be found at [interface spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request). 

We now have a way for canisters to serve web content. However, the browser only communicates with HTTP(s) protocol and doesn’t know how to query a canister. To fill the gap between the browser and Internet Computer protocols, we introduce the notion of [HTTP Gateway protocol](https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-gateway) which sits in between the browser and the Internet Computer. 

The browser sends a http request to the http gateway. The gateway first interprets the URL in the http request and extracts the corresponding canister id. The gateway then creates a query to the http_request method of the canister and sends the query to the IC. When the canister sends back a response, the http gateway interprets the response, verifies the signatures, converts into a http response and sends it to the browser. 

There are many ways to implement the HTTP Gateway protocol. Currently, there are 2 implementations. 
* The gateway protocol is implemented as a service worker. When the user enters a URL such as http://<canister id>.ic0.app, the browser calls the DNS service to resolve the query. Currently, the DNS maps the ic0.app domain to the boundary nodes of the Internet Computer. When the browser makes a request to a boundary node, it responds with a service worker that implements HTTP Gateway protocol. The browser then installs the service worker. From then on, whenever the user makes a request to http://<canister id>.ic0.app, the browser passes on the request to the service worker.
* Boundary nodes also run a software called icx-proxy which implements the HTTP Gateway protocol. When the user enters a URL such as http://<canister id>.raw.ic0.app, the browser sends the http request to the boundary node. The icx-proxy of the boundary node then acts as an http gateway. 
There are a few other ways of implementing the HTTP Gateway protocol. The gateway can be implemented as a browser extension. The chromium browser could also be modified to include HTTP Gateway as part of the browser. 

[Serve Web Content](https://internetcomputer.org/features/serve-web-content/)