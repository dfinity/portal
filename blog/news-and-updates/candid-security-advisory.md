---
title: Candid upgrade required due to important security advisory
description: This important update details a recently discovered security vulnerability that should be addressed by upgrading the Candid Rust library to the latest version as soon as possible.
tags: [Security advisory]
image: /img/blog/dev-blog-candid-security-advisory.jpg
---

# Candid upgrade required due to important security advisory

![Candid security advisory](../../static/img/blog/dev-blog-candid-security-advisory.jpg)

Hello developers,

Today, we have an important security update to share. Recently, the DFINITY security team discovered a vulnerability in the Candid Rust library which indicated that the library could be vulnerable to a denial of service (DOS) exploitation, which could degrade canister performance. This security advisory does not affect Motoko canisters.

To address this security flaw, a patch has been applied in the latest Candid Rust library update, `0.9.10`. It is strongly advised that all canisters that are running Candid `0.9.0` and older upgrade to the latest version of the Candid Rust library (`0.9.10`).

For asset canisters that are bundled with dfx running dfx versions `0.14.4` and older, it is strongly advised to upgrade to the latest version of dfx, `0.15.2`, then redeploy the asset canister(s).

It is encouraged that the ICP community report any bugs or security issues found responsibly. You can refer to the [Bug Bounty](https://dfinity.org/bug-bounty/) program for more information.

All affected canisters that are developed and maintained by DFINITY have been upgraded to the latest version.

A GitHub security advisory has been published and can be viewed [here](https://github.com/dfinity/candid/security/advisories/GHSA-7787-p7x6-fq3j).

If you have questions, the forum post discussion for this security advisory can be found [here](https://forum.dfinity.org/t/security-advisory-candid-upgrade-required/25341).

Additional resources can be found here:

- [CVE for this vulnerability.](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-6245)

- [RustSec advisory.](https://rustsec.org/advisories/RUSTSEC-2023-0073.html)

- [Documentation for upgrading a canister.](/docs/building-apps/canister-management/settings/#upgrade-a-canister)

- [Documentation for building a web frontend.](/docs/building-apps/frontends/using-an-asset-canister)
