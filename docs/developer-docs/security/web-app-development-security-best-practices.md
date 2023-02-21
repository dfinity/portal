---
sidebar_position: 3
sidebar_label: Web app development
---
# Web app development security best practices

## Authentication

### Use a well-audited authentication service and client side IC libraries

#### Security Concern

Implementing user authentication and canister calls yourself in your web app is error prone and risky. For example, if canister calls are implemented from scratch, there may be bugs around signature creation or verification.

#### Recommendation

-   Consider using e.g. [Internet Identity](https://github.com/dfinity/internet-identity) for authentication, use [agent-js](https://github.com/dfinity/agent-js) for making canister calls, and the [auth-client](https://github.com/dfinity/agent-js/tree/main/packages/auth-client) for interacting with internet identity from your dApp.

-   It is of course also an option to consider alternative authentication frameworks on the IC for authentication.

### Set an appropriate session timeout

#### Security Concern

Currently, Internet Identity issues delegations with an expiry time. This expiry time can be set in the [auth-client](https://github.com/dfinity/agent-js/tree/main/packages/auth-client). After a delegation expires, the user has to re-authenticate. Setting a good value is a trade-off between security and usability.

#### Recommendation

See the [OWASP Recommendations](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#session-expiration). A timeout of 30min should be set for security sensitive applications.

The [auth-client](https://github.com/dfinity/agent-js/tree/main/packages/auth-client) supports idle timeouts. More details available [here](https://github.com/dfinity/agent-js/tree/main/packages/auth-client#idle-management).

### Don’t use fetchRootKey in agent-js in production

#### Security Concern

`agent.fetchRootKey()` can be used in [agent-js](https://github.com/dfinity/agent-js) to fetch the root subnet threshold public key from a status call in test environments. This key is used to verify threshold signatures on certified data received through canister update calls. Using this method in a production web app gives an attacker the option to supply their own public key, invalidating all authenticity guarantees of update responses.

#### Recommendation

Never use `agent.fetchRootKey()` in production builds, only in test builds. Not calling this method will result in the hard coded root subnet public key of mainnet being used for signature verification, which is the desired behavior in production.

## Nonspecific to the Internet Computer

The best practices in this section are very general and not specific to the Internet Computer. This list is by no means complete and only lists a few very specific concerns that have led to issues in the past.

### Validate input in the frontend

#### Security Concern

Missing input validation of data from untrusted sources (e.g. users) can lead to malformed data being persisted and delivered back to users. This may lead to DoS, injection attacks, phishing, etc.

#### Recommendation

-   Perform data validation already in the front end, in addition to data validation in the canister. Data validation should happen as early as possible.

-   See the [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#goals-of-input-validation)

### Don’t load JavaScript (and other assets) from untrusted domains

#### Security Concern

Loading untrusted JavaScript from domains other than `<canister-id>.ic0.app` means you completely trust that domain. Also, assets loaded from these domains (incl. `<canister-id>.raw.ic0.app`) will not use asset certification.

If they deliver malicious JavaScript they can take over the web app/account by e.g. reading the private key managed by agent-js from LocalStorage.

Note that also loading other assets such as CSS from untrusted domains is a security risk, see e.g. [here](https://xsleaks.dev/docs/attacks/css-injection/).

#### Recommendation

-   Loading JavaScript and other assets from other origins should be avoided. Especially for security critical applications, we can’t assume other domains to be trustworthy.

-   Make sure all the content delivered to the browser is served and certified by the canister using asset certification. This holds in particular for any JavaScript, but also for fonts, CSS, etc.

-   Use a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) to prevent scripts and other content from other origins to be loaded at all. See also [Define security headers including a Content Security Policy (CSP)](#define-security-headers-including-a-content-security-policy-csp).

### Define security headers including a Content Security Policy (CSP)

#### Security Concern

Security headers can be used to cover many security concerns, e.g. disallow [clickjacking](https://owasp.org/www-community/attacks/Clickjacking), [harden TLS](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html), make sure [JavaScript or other content from untrusted domains cannot be executed in the browser](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src), etc. Not configuring these headers appropriately can lead to concrete security issues and missing defense-in-depth.

#### Recommendation

-   Check your site using <https://securityheaders.com/>

-   Use [HSTS](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html), [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options), [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy), Permissions-Policy ([generator](https://www.permissionspolicy.com/))

-   These headers (including CSP) have been successfully integrated e.g. in [internet identity](https://github.com/dfinity/internet-identity).

-   Check your CSP against [CSP evaluator](https://csp-evaluator.withgoogle.com/)

-   See also the [OWASP secure headers project](https://owasp.org/www-project-secure-headers/)

### Crypto: Protect key material against XSS using Web Crypto API

#### Security Concern

Storing key material in browser storage (such as [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) or [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)) is considered unsafe because these keys can be accessed by JavaScript code. This could happen through an XSS attack or when loading untrusted scripts from other domains (see also [Don’t load JavaScript from untrusted domains](#dont-load-javascript-and-other-assets-from-untrusted-domains).

#### Recommendation

Use [WebCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) to hide key material from JavaScript, by using `extractable=false` in `generateKey` , see [this](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey). An example for this can be found in the encrypted notes example, see [here](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp/src/frontend/src/lib/crypto.ts#L149-L159). This makes it impossible to access the private key from JavaScript.

### Use a secure web framework

#### Security Concern

Modern web frameworks make attacks such as XSS very difficult since they safely escape / sanitize any potentially user-provided data that is rendered on a web page. Not using such a framework is risky as it is hard to avoid attacks like XSS.

#### Recommendation

-   Use a web framework that has a secure templating mechanism such as [Svelte](https://svelte.dev/) to avoid XSS. This is used e.g. in the [NNS dApp](https://github.com/dfinity/nns-dapp) project.

-   Don’t use insecure features of the framework, such as e.g. [@html in Svelte](https://svelte.dev/docs#template-syntax-html).

### Make sure the logout is effective

#### Security Concern

If a logout action by a user is not effective, this may lead to account takeover e.g. if a shared or public device is used.

#### Recommendation

-   Clear all session data (especially [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) and [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)), clear [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), etc. on logout.

-   Make sure also other browser tabs showing the same origin are logged out if the logout is triggered in one tab. This does not happen automatically when agent-js is used, since agent-js keeps the private key in memory once initialized.

### Use prompts to warn the user on any security critical actions, let the user explicitly confirm

#### Security Concern

If this is not the case, a user may by accident execute some sensitive actions.

#### Recommendation

-   Show the user a prompt with a security warning describing the exact consequences of the action and let them confirm explicitly.

-   For applications with high security requirements, consider the use of transaction approval, i.e. using e.g. a WebAuthn device to let the user confirm certain critical actions or transactions. This is recommended e.g. when token or cycle transfers is involved. For example, using a hardware wallet in the [NNS dApp](https://github.com/dfinity/nns-dapp) achieves this.
