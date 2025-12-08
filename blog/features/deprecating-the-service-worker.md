---
title: Proposal to deprecate the Service Worker
description: The DFINITY Foundation would like to propose deprecating the Internet Computer Service Worker in favor of ICX Proxy on the DFINITY hosted Boundary Nodes. We believe that this change will have dramatic improvements to end user and developer experience while reducing complexity in the Internet Computer’s HTTP Gateway Protocol, without reducing security or changing trust assumptions.
tags: [Technology]
author: Nathan Mc Grath
image: /img/blog/deprecating-the-service-worker.png
---

# Proposal to deprecate the Service Worker

## Introduction

The DFINITY Foundation would like to propose deprecating the Internet Computer Service Worker in favor of ICX Proxy on the DFINITY hosted [Boundary Nodes](https://learn.internetcomputer.org/hc/en-us/articles/34212818609684-ICP-Edge-Infrastructure). We believe that this change will have dramatic improvements to end user and developer experience while reducing complexity in the Internet Computer’s [HTTP Gateway Protocol](/references/ic-interface-spec#http-gateway), without reducing security or changing trust assumptions.

Keep reading to learn more about why we believe this is the right path forward and the roadmap that we are suggesting for this transition.

## Background

In order to comprehend why DFINITY is proposing to deprecate the Service Worker in favor of other HTTP Gateway Protocol implementations, we must first grasp the intricacies of the HTTP Gateway Protocol. This includes recognizing how each implementation works, along with their respective advantages and disadvantages.

### The HTTP Gateway Protocol

The Internet Computer Protocol, unlike many other modern blockchains, possesses the unique ability to host and serve traditional websites. This functionality is made possible through the use of the HTTP Gateway Protocol. This subprotocol defines how end users can access the Internet Computer network using a standard web browser.

The HTTP Gateway Protocol has three primary functions:

- It converts standard HTTP requests into a format recognized by the Internet Computer Protocol.
- It validates the authenticity of responses originating from the Internet Computer network.
- It transforms responses from Internet Computer Protocol into a universally recognized HTTP response format.

Presently, there are three distinct implementations of this protocol: the Service Worker, ICX Proxy and the [HTTP Proxy](https://forum.dfinity.org/t/try-out-the-ic-http-proxy-a-leap-towards-decentralized-http/20357). We’ll now delve into further detail of how each of these respective implementations work - first up is the Service Worker.

### The Service Worker

The Service Worker operates on `{canisterId}.ic0.app` and `{canisterId}.icp0.io` URLs as well as [Boundary Node hosted custom domains](/building-apps/frontends/custom-domains/using-custom-domains). For example, Internet Identity can be accessed via the Service Worker using the following URLs:

- [rdmx6-jaaaa-aaaaa-aaadq-cai.ic0.app](https://rdmx6-jaaaa-aaaaa-aaadq-cai.ic0.app/)
- [rdmx6-jaaaa-aaaaa-aaadq-cai.icp0.io](https://rdmx6-jaaaa-aaaaa-aaadq-cai.icp0.io/)
- [identity.internetcomputer.org](https://identity.internetcomputer.org/)

When an end user loads any of these URLs, their web browser sends a request to an Internet Computer Boundary Node. This node will then download the Service Worker into the end user’s browser for installation. Once installed, the Service Worker is able to intercept HTTP requests made by a dapp’s frontend code and carry out the necessary HTTP Gateway functions.

This approach to the HTTP Gateway Protocol has supported convenient and secure adoption of web applications built on the Internet Computer Protocol. However, it does come with many downsides that we’ll talk about more later on in this post. For now though, let’s talk more about ICX Proxy.

### ICX Proxy

ICX Proxy is a remote HTTP Gateway that serves canisters on `{canisterId}.raw.ic0.app` and `{canisterId}.raw.icp0.io`. For example, Internet Identity can be accessed through ICX Proxy with these URLs:

- [rdmx6-jaaaa-aaaaa-aaadq-cai.raw.ic0.app](https://rdmx6-jaaaa-aaaaa-aaadq-cai.raw.ic0.app/)
- [rdmx6-jaaaa-aaaaa-aaadq-cai.raw.icp0.io](https://rdmx6-jaaaa-aaaaa-aaadq-cai.raw.icp0.io/)

Similar to the Service Worker, a web request sent to these URLs will be received by an Internet Computer Boundary Node. The difference with ICX Proxy however is that the HTTP Gateway functions are performed entirely on the Boundary Node server.

This approach has many advantages over the Service Worker, which we will discuss further later in this post. Before that though, let’s talk a bit more about the HTTP Proxy.

### HTTP Proxy

The HTTP Proxy is a desktop application that can be downloaded and installed by an end user. Once installed, it will run in the background and proxy traffic at a system level. It will intercept requests made to Internet Computer Boundary Nodes while bypassing all other requests. This allows the HTTP Proxy to implement the HTTP Gateway Protocol functions entirely locally, without relying on any remote servers.

In terms of security, this is far superior to both ICX Proxy and the Service Worker. To understand why, let’s talk more about the difference between local and remote HTTP Gateways.

### Local vs remote HTTP Gateways

The Service Worker is known as a “local” HTTP Gateway because it performs translation and validation of requests and responses locally on the end user’s computer, whereas ICX Proxy is known as a “remote” HTTP Gateway because it performs those functions on a remote server hosted in a data center.

Generally a local HTTP Gateway is preferred over a remote HTTP Gateway because it removes an element of trust from an end user’s interaction with the Internet Computer, since remote HTTP Gateways are hosted and controlled by a centralized entity, as is currently the case with the DFINITY hosted ICX Proxy.

The Service Worker is automatically installed into an end user’s browser without the need for any interaction on their part and once installed, it will perform validation of Internet Computer network responses locally, creating a secure connection with the Internet Computer. This however, is only secure with the assumption that the Boundary Node distributing the Service Worker is trusted. In contrast to the HTTP Proxy, which runs fully locally and hence has much better security guarantees for end users.

## Why a change is needed

With a clearer understanding of how the different HTTP Gateway Protocol implementations work, it should now be apparent that although the Service Worker runs locally, it has the same trust and security assumptions as a remote HTTP Gateway, such as ICX Proxy. Since Genesis, DFINITY has spent a lot of time researching ways to distribute the Service Worker in a trustless manner. We have investigated browser plugins/extensions, threshold TLS, native browser integrations, [isolated web apps](https://github.com/WICG/isolated-web-apps/blob/main/README.md) and [signed exchanges](https://web.dev/signed-exchanges/). Unfortunately these endeavors, in spite of their undoubted innovativeness, have been unfruitful so far.

If a solution was found to load the Service Worker in a trustless manner then this would provide end users with a trustless connection to the Internet Computer without any additional installation on their behalf. Without this solution however, we are left with a Service Worker that has the same trust assumptions as a remote HTTP Gateway and many, many downsides, as we will discuss later in this post.

As the Internet Computer network matures, along with the dapps that have been developed to run on it, priorities change, lessons are learned and perspectives shift. As a result, we have a stronger focus within the foundation and the community on providing a superior end user experience. This focus has exposed the Service Worker as a major pain point in this regard. Many community complaints, bug reports and feature requests are related to the Service Worker and so we feel the day has finally come to retire it.

## The solution

Our proposed solution is to make ICX Proxy the primary HTTP Gateway operated by DFINITY, replacing the Service Worker. ICX Proxy would become the default HTTP Gateway used by canisters on ic0.app, icp0.io and custom domains that are hosted on the DFINITY-managed Boundary Nodes. The Service Worker would still be available for community members to host their own HTTP Gateways if they wish to do so, but it would no longer be supported by the DFINITY foundation.

ICX Proxy, as a remote HTTP Gateway controlled by DFINITY, can provide a seamless onboarding experience for new users with superior performance and end user experience. For more security and decentralization conscious users however, we propose to continue working on a local HTTP Gateway that end users can run themselves.

A truly local HTTP Gateway should not have any points of centralization. The HTTP Proxy is one such example of this. It can be downloaded and validated by an end user without needing to trust a remote server controlled by a centralized entity.

An additional advantage of the HTTP Proxy is that it is not based in the browser. The Service Worker, along with some other browser based solutions that we’ve investigated are limited in some way or another. These limitations, which do not apply to ICX Proxy or the HTTP Proxy, are described throughout the rest of this post.

The downside of a local HTTP Gateway is of course that end users must install this software themselves, which is not ideal for onboarding or convenience. For now we believe this solution to be a great step forward in improving the experience of end users and developers alike, but it should not be the long term vision of the Internet Computer. An ideal solution will provide full security to all users without them needing to install anything outside of their browser of choice. So we believe that the long term goal for the Internet Computer Protocol should be a native browser integration. This is unfortunately not feasible right now, but we believe it will become so as the protocol matures, achieves greater levels of adoption and moves closer to becoming a true world computer.

## Benefits of removing the Service Worker

In the following, we try to show the advantages of deprecating the Service Worker by listing many of its shortcomings and drawbacks, which we have gathered from discussions with many community members or have experienced ourselves in our day-to-day work.

### User experience

#### Faster initial page load

The Service Worker has a noticeable impact on initial page load times compared to ICX Proxy. Removing it will improve the first page load of every dapp on the Internet Computer.

For more information on how important initial page load times are, you can check out resources provided by [thinkwithgoogle.com](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/).

#### Consistent branding

The Service Worker is DFINITY branded which, in spite of being a very nice design, is providing an incoherent experience to end users, especially those who are not familiar with DFINITY and its brand. Removing The Service Worker will allow developers to fully control the branding of their applications from end to end and provide a more consistent experience for their end users.

#### Availability

Service workers are not supported in all clients that are used to access Internet Computer dapps.

For example, Google Translate frames (see [NNS](https://nns-internetcomputer-org.translate.goog/?_x_tr_sl=en&_x_tr_tl=de&_x_tr_hl=en&_x_tr_pto=wapp) & [Internet Identity](https://identity-internetcomputer-org.translate.goog/?_x_tr_sl=en&_x_tr_tl=de&_x_tr_hl=en&_x_tr_pto=wapp)), or more commonly, in-app webviews. End users will encounter in-app webviews when opening a dapp through a social media app, such as Twitter or LinkedIn.

Certain standalone browsers will disable service workers completely, or when there are certain options enabled by the user:

- [Firefox Focus](https://www.mozilla.org/en-US/firefox/browsers/mobile/focus/) disables service workers completely.
- Firefox disables service workers in the following scenarios:
  - In incognito.
  - When history is disabled.
  - When the “Clear cookies when Firefox is closed” option is enabled.
- Chrome disables service workers when the “Block all cookies” option is enabled.

### Web2 developer experience

#### Reduced cognitive load

There are a number of situations where the Service Worker cannot support Internet Computer developers and they must manually instead use ICX Proxy:

- [SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) crawlers.
- Social media rich previews.
- Service workers & web workers.
- Home screen icons on iOS.
- Rich previews.
- Loading static assets from the Internet Computer into a web2 application.

The majority of these cases are necessary because they occur in an environment where service workers are not supported. The one exception to this is additional service workers and web workers. The HTTP requests for these workers are performed in a sandboxed environment within the browser that is not accessible from other service workers, so the Internet Computer service worker is unable to validate the responses to these requests and ensure that a replica has not responded with a malicious worker.

Developers must be aware of each of these scenarios when developing a frontend dapp for the Internet Computer. This increases the amount of Internet Computer specific knowledge that developers need and by extension, the barrier of entry for developers into the ecosystem along with the likelihood of introducing unexpected bugs in dapps.

#### Progressive web apps

Service workers are scoped. Only one service worker may exist at a time on the same scope and a service worker may only intercept requests within its own scope. The Internet Computer Service Worker sits on the _root_ scope, so that it’s able to intercept all requests that are made by a dapp’s frontend. This means that dapps cannot have their own service worker on the root scope, so they are unable to provide features typical for [progressive web apps](https://web.dev/progressive-web-apps/), such as offline support, more aggressive caching strategies or background synchronization.

#### Caching

Browser caching is implemented based on response headers that are read by the browser before the request is intercepted by the service worker. Since these headers are not visible to the browser, browsers cannot effectively cache static assets as they would with normal web2 apps. Moving HTTP request translation to a remote server would mean that the requests are translated before reaching the browser, enabling browsers to implement caching as they normally would.

With HTTP request translation being performed remotely on a server (as is the case with ICX Proxy), it will also be possible to provide proxy and CDN style caching. Bringing Internet Computer dapps even closer to realizing true web speed.

#### Content encoding

[Brotli](https://en.wikipedia.org/wiki/Brotli#Applications) content encoding is superior to GZIP but is not currently supported by the service worker. This is because the browser would need to have visibility into the Content-Encoding header and the Brotli encoded response body before it reaches the service worker in order to decode it correctly. Since the canister response body is hidden, along with the response headers, this is not possible, so the Service Worker needs to manually decode the response body.


Handling the translation of responses outside of the browser, either via a remote HTTP Gateway such as ICX Proxy, or through a local HTTP Gateway such as the HTTP Proxy would give the browser full visibility into the canister’s response, allowing the browser to handle decoding of Brotli encoded assets normally.

#### Lighthouse support

[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) is a tool that is commonly used by developers to measure the performance of various aspects of their frontend dapps such as SEO, page load, accessibility and other best practices. When used with the Service Worker, many metrics are thrown off because the tool measures the Service Worker’s loading page, rather than the dapp itself.

Additionally, the best practices category is completely broken. This is because the browser is searching for a response header that is hidden from it, namely the Content-Type header. This header is present in the canister’s response, but is not visible to the browser until the response has been decoded and transformed by the Service Worker.

### Reduced complexity

#### Simpler routing

In a previous section, the number of ways that The Service Worker is bypassed was discussed. This is cumbersome for developers, but also for maintainers of HTTP Gateways and Boundary Nodes. Removing The Service Worker will mean that there is a single HTTP Gateway implementation on the Boundary Nodes, reducing complexity, maintenance costs and risk.

#### No technology misuse

Service workers are not intended to be a critical path technology, but as a [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) that can add functionality for users with browsers that support it, while [gracefully degrading](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation) for users that do not have browsers with support. Using a technology for a purpose that it’s not intended for often leads to unintuitive behavior and unintended consequences, as we have seen recently with incidents related to The Service Worker.

#### No functionality duplication

Technologies that are already provided by the browser need to be reimplemented in The Service Worker, for example content decoding and client side caching. This is because the browser normally implements those functions on responses _before_ they reach The Service Worker. Canister provided headers and response bodies are not visible to the browser until _after_ they leave The Service Worker.

#### API Boundary Node routing/discovery

With the upcoming [decentralization of the boundary nodes](https://forum.dfinity.org/t/boundary-node-roadmap/15562), there will be a need for HTTP Gateway Protocol implementations (including the Service Worker) to perform API Boundary Node discovery. This will be a complex and expensive operation to do in the browser, but could be done much more efficiently in a desktop application (such as the HTTP Proxy) or a remote gateway (such as ICX Proxy).

## Roadmap

So hopefully by now you’ve been convinced that removing the Service Worker in favor of other forms of HTTP Gateways is the way forward. So let’s talk about our short and long term roadmap for handling this transition.

### Short term

The goal of the short term roadmap is to make a relatively quick transition to ICX Proxy from the Service Worker so that we can reap the benefits as soon as possible. This is something that we believe can be completed within a month or two.

#### Research and investigation

**Timeline:** From present day up to 2-3 weeks.

This is the current phase that we are in now. We are currently working on gathering metrics for the size of [streamed response bodies](/references/http-gateway-protocol-spec#response-body-streaming). This is important because these responses are currently not verified by ICX Proxy. We would suggest gathering these metrics for the next couple of weeks in order to make an educated decision about the next step of the transition.

#### Limited certified response body streaming

**Timeline:** 1 week.

Based on metrics of typical streamed response body sizes, we will implement verification for streamed response bodies up to a safe limit. This limit should be high enough that it will cover JS, HTML, CSS files and average sized images, but low enough that it would not allow a malicious canister to perform a DOS attack on ICX Proxy.

This limit will initially apply to both response verification v1 and v2, but in the future we plan to develop a streaming protocol exclusively for response verification v2 that will allow for a much higher limit of streaming without exposing ICX Proxy to DOS attacks from malicious canisters.

#### Blocking of dangerous features

**Timeline:** 1 week.

Cache headers and redirect (3xx) status codes control browser behavior. The status code and response headers are not certified for response verification v1 so these should be filtered (headers) or blocked (status code) if a canister tries to use them. A canister should use the “upgrade to update” call feature if it wishes to leverage these features.

For response verification v2, the same should apply for cache headers only if they are excluded from certification, if they are included in certification (and the verification succeeds) then they can be passed along as normal. The status code is always certified so there’s no need for any blocking there.

#### Canary release

**Timeline:** 1 - 2 weeks, depending on the success of the canary release.

A canary release of the boundary nodes will direct all dapps to ICX Proxy instead of the Service Worker, which allows community members and dapp developers to test out their dapp through ICX Proxy and make sure that everything is working as intended. This will be a much more important canary release than usual and community support with this release will be vital for a smooth transition.

#### Full release

**Timeline:** Immediately following the successful canary release.

After a testing period with the canary release, assuming everything goes to plan, then this canary release will be rolled out to all boundary nodes, region by region and the Service Worker will be officially deprecated. This rollout will be different from standard Boundary Node rollouts. Usually the Boundary Nodes are enabled for a small percentage of traffic within a region and this percentage is increased gradually. Due to the nature of this change though, the usual approach will create a bad user experience if they are toggling back and forth between a service worker enabled boundary node and an ICX proxy enabled boundary node.

### Mid term

The purpose of the mid term roadmap is to continue iterating upon our migration away from the Service Worker, making improvements in both end user experience and performance. This is a roadmap that will continue for several months and into the next year. We do not have immediate priority or plans for these features yet, so it’s difficult to put more concrete timelines on them, but they are features that we definitely want to prioritize very soon.

#### Alternative HTTP Gateways

The [HTTP Proxy](https://forum.dfinity.org/t/try-out-the-ic-http-proxy-a-leap-towards-decentralized-http/20357) is already in a proof-of-concept phase. We intend to continue developing this and make it a production ready application. We will also continue searching for and developing alternatives, such as a mobile counterpart, webview wrappers, native browser integrations etc..

#### Federated HTTP Gateways

With the decentralization of the Boundary Nodes, DFINITY will no longer be the only contributor to host Boundary Nodes. A step further on this path will be to open up the possibility for other community members to host their own HTTP Gateways. While the API Boundary Node component will be fully decentralized, HTTP Gateways will be federated when hosted by different community members.

#### Local HTTP Gateway revalidation

Federated HTTP Gateways will still have some element of centralization, but they will have many advantages depending on their implementation, especially HTTP Gateways that are optimized for specific use cases. Some dapps may benefit from having many edge locations optimized for static files serving across the globe, others may benefit from video streaming / decoding infrastructure hosted in specific locations, others may need support for web sockets or peer to peer protocols such as WebRTC. These benefits will be lost with a pure, local HTTP Gateway, so we plan to provide support for local HTTP Gateway revalidation. This will allow local HTTP Gateways (such as the HTTP Proxy) to gain the benefit of using remote HTTP Gateways, while removing the point of trust in a remote HTTP Gateway by revalidating responses locally.

### Long term - continued research

Our continued research roadmap is something that will develop over the coming years and not something that will impact the protocol in a meaningful way in the near future.

#### Decentralized HTTP Gateways

While there is no concrete proposal to fully decentralize the HTTP Gateways right now, there are some ideas that we intend to continue pursuing to see what merit these approaches may hold. We will update the community on any progress made in this direction as it becomes clearer.

#### Native browser integration

A native browser integration is, in our opinion, the ultimate HTTP Gateway implementation. This type of integration would have all the same advantages of the HTTP Proxy without end users needing to install any additional software. The primary challenge here is that we must rely on external browser developers' willingness to build and maintain this integration. This challenge will be much easier to overcome in the long term as the network grows and sees greater levels of adoption.

## Conclusion

In this post, we have presented DFINITY’s case against the Service Worker, an HTTP Gateway Protocol implementation that enables web browsers to access the Internet Computer network. We have argued that the Service Worker has many drawbacks in terms of user experience, developer experience, and complexity, and that it does not provide any additional security to the network over ICX Proxy while it is being distributed by the Boundary Nodes. We have proposed to replace the Service Worker with ICX Proxy, a remote HTTP Gateway that offers better performance, consistency and compatibility. We have also outlined a suggested roadmap for the transition, which includes research, testing, and releasing of ICX Proxy, as well as further developing alternative HTTP Gateways such as the HTTP Proxy and native browser integration.
