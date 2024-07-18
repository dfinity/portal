---
title: Deprecation of the Service Worker
description: In September, DFINITY proposed to deprecate the Internet Computer Service Worker in favorite of ICX Proxy, a service hosted on the DFINITY Boundary Nodes. This proposal has been adopted, and as of December 7, 2023, the Service Worker has been deprecated.
tags: [Technology]
image: /img/blog/deprecating-the-service-worker.png
---

# Deprecation of the Service Worker

![Deprecation of the Service Worker](/img/blog/deprecating-the-service-worker.png)

In September, DFINITY proposed to deprecate the Internet Computer Service Worker in favour of ICX Proxy, a service hosted on the DFINITY Boundary Nodes. This proposal has been adopted, and as of December 7, 2023, the Service Worker has been deprecated.

Beginning December 7, 2023, the new version of boundary nodes which uses icx-proxy to verify HTTP responses on the boundary node itself has begun to gradually roll out.

For more information on the reasons behind this change, check out the full proposal blog post [here](https://internetcomputer.org/blog/features/deprecating-the-service-worker).

### Who is affected

This update affects all dapps being served via a DFINITY gateway (*.ic0.app, *.icp0.io and hosted custom domains). Dapps being served from a custom gateway implementation will remain unchanged.

### What to expect

Most notably with this change, you will no longer see the service worker loading screen. Inspecting requests in your browser console will show regular HTTP calls for fetching static assets instead of the encoded ones.

An important note is that streamed resources that are larger than 8MB will not be verified through icx-proxy; they will be served as-is. This is because requests with larger responses are fairly infrequent and represented an almost insignificant percentage of total HTTP traffic according to our metrics. Verification for larger streamed responses will be addressed at a later stage.

## Resources

You can join the forum discussion on this topic [here](https://forum.dfinity.org/t/deprecating-the-service-worker/23401/6?u=raymondk), and you can read the full proposal on the Dev Blog [here](https://internetcomputer.org/blog/features/deprecating-the-service-worker).
