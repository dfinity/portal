---
title: "A step towards WebSockets on the Internet Computer"
description: Introducing a WebSocket proof-of-concept for the dev community to build on.
tags: [Devs]
image: /img/blog/moonshot.webp
---

Today, users expect web applications to be fast and snappy: an exchange should update
the prices in real-time, edits of colleagues should appear immediately when collaborating
on a document, and comments on social media platforms should update continuously.

To provide such a user-experience, modern web2 applications usually rely on WebSockets,
which allow establishing a long-lived, full-duplex connection between the frontend
and backend of an application. This allows for both sides to send data, for example,
the latest exchange rates, in real-time.

WebSockets can be seen as the next step after [HTTPS outcalls](https://internetcomputer.org/https-outcalls).
While HTTPS outcalls enable canisters to access publicly-available, off-chain data,
WebSockets provide long-lived, bi-directional connections with any client.

## Challenges

While WebSockets are a standard in the web2 world, they have not yet
found their way to web3. We aim to change this for the Internet Computer blockchain.

Unfortunately, this is not a straightforward undertaking due to the decentralized
nature of the Internet Computer, where the backend does not just run on a single
centralized entity, but on multiple replica nodes in a subnet. To enable WebSockets
on the Internet Computer, we need to address the following two main challenges:

_One-to-one connections_ - WebSockets are one-to-one connections: the frontend establishes
a connection with a single centralized backend. An application on the Internet Computer,
however, is running distributed across multiple replica nodes in a subnet. In order
to enable WebSockets, there needs to be a point of consolidation, which provides a
single contact point for the frontend.

_Long-lived connections_ - WebSockets remain open for long periods of time. The
canisters on the Internet Computer however follow the actor model, which accepts
a message, processes it and replies.

To get started and gain experience, we decided to take things one step at a time, and first
build a proof-of-concept instead of trying to directly integrate WebSockets fully
into the Internet Computer.

## Architecture

The centerpiece of our proof-of-concept is the WebSocket gateway. It runs on a
dedicated machine and sits between the frontend, the client’s browser, and the
backend, the canister on the Internet Computer as the following figure shows.

![WebSockets architecture](../_assets/websockets-architecture.webp)

The gateway provides a WebSocket endpoint for the frontend and maintains the connection,
while it interfaces with the backend on the Internet Computer through query and update calls.

The gateway sends messages coming from the frontend as update calls to the backend
and it continuously polls the backend for new messages for the frontend. Instead of
polling, one could have also used HTTPS outcalls to "push" the messages to the gateway.
However, with an increasing number of messages, polling is more and more efficient.

Despite being a centralized point of failure, the gateway draws on the Internet Computer
to fulfill its role trustlessly: both the frontend and the backend sign their messages
such that the gateway cannot tamper with them.

## Try it out!

We have released [the proof-of-concept on Github](https://github.com/dfinity/ic-websocket-poc)
and invite you to try it out yourself! Use it as an inspiration for your own projects and
build upon it! Please note that this is a proof-of-concept and requires further
improvements to enhance security and stability for any use in production. We have
started [a thread in the developer forum](https://forum.dfinity.org/t/websockets-on-the-ic-a-proof-of-concept/20836)
and are looking forward to seeing all the applications you built and your feedback.
