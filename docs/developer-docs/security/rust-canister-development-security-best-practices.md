---
sidebar_position: 2
sidebar_label: "Canister development"
---
# Canister development security best practices

## Overview

This document contains canister development best practices for both Motoko and Rust. 

## Smart contracts canister control

### Use a decentralized governance system like SNS to put dapps under decentralized control

#### Security concerns

If single entities or small groups control canisters, they can apply changes or updates whenever they like. If a canister e.g. holds assets such as ICP, ckBTC or ckETH on a user's behalf, this effectively means that the controller could decide at any time to steal these funds by e.g. updating the canister and transferring the assets to their account.

Furthermore, the controller of canisters serving web content (such as e.g. the [asset canister](../../references/asset-canister)) could maliciously modify the web application to e.g. steal user funds or perform security sensitive actions on the user's behalf. For example, if [Internet Identity](../../developer-docs/integrations/internet-identity/overview) is used, the user principal's private key for the given origin is stored in the browser storage, and a malicious app can therefore fully control the private key and the user's session and any assets controlled by that key.  

Dapps are commonly reachable over their own custom domain name instead of ic0.app. These domains are registered with a DNS registrar by one of the developers. The developer can choose to have this domain point at a completely different web application. Even one not hosted on the IC. Users will trust this domain and the app it serves. This could allow such a developer to steal funds, leak data, etc.

A dapp might have privileged features which are only accessible to principals that are on an allow list. For example, minting new tokens, debug functions, permissions management, removing NFTs for digital rights violations, etc. This means that whoever controls that principal (this could e.g. be dapp developers) may have central control over these privileged features.

For performance or privacy reasons, some components of a dapp may be hosted off-chain, e.g. in the cloud. These off-chain components often control principals used to interact with the on-chain components, and are usually controlled by a developer holding credentials to the off-chain cloud environment. On top of that, cloud providers can inspect and manipulate data in this environment if they choose. They could take IC principal private keys out of this environment and call privileged operations on the canisters. Off-chain components can quickly lead to many additional centrally trusted parties. Depending on the value managed by a dapp, these parties could be tempted to act maliciously.

#### Recommendations

In the following list, we first provide recommendations for centralized dapp control, and then move to recommendations for increasingly decentralized settings. From a security perspective, more decentralization is favorable. The following list could also be used as a basis for assessing a dapp's level of decentralization. This is just a set of recommendations and may not be complete. 
1. **The dapp uses central, off-chain components:** The application makes use of centralized components that are e.g. running in the cloud. The owners of these cloud services have full control over the application and assets managed by it. Your application should likely be further decentralized by avoiding central components. But while you have them, [securely manage your keys in the cloud](https://cloudsecurityalliance.org/research/topics/cloud-key-management/). 
2. **The dapp is controlled by the developer team:** Your project is not under decentralized control, for example because it is in an early development stage or does not (yet) hold significant funds. In that case, it is recommended to manage access to your canisters securely and ideally not letting individuals control the application. To achieve that, consider the following: 
    - Require approval by several individuals or parties to perform any canister controller operations. 
    - Also require approval by several individuals or parties for any security sensitive changes at the application level that are restricted to privileged principals, such as admin operations including  e.g. permissions management, minting new tokens, removing NFTs for digital rights violations, etc.
    - A helpful tool to achieve either of the above two points is the [threshold canister](https://github.com/dfinity/threshold). Individuals should manage their key material using hardware security modules, such as e.g. [YubyHSM](https://www.yubico.com/ch/store/yubihsm-2-series/) and physically protect these e.g. using safes at different geographical locations. Some of HSMs support threshold signature schemes, which can help to further secure the setup. To increase transparency about the changes made to a dapp, consider using a tool like [LaunchTrail](https://github.com/spinner-cash/launchtrail). 
3. **Full decentralization using a DAO**: The dapp is controlled by a decentralized governance system such as the Internet Computer's [Service Nervous System (SNS)](../../developer-docs/integrations/sns), so that any security sensitive changes to the canisters are only executed if the SNS community approves them collectively through a proposal voting mechanism. If an SNS is used:
   - Make sure voting power is distributed over many, independent entities such that there is not one single or a few entities that can decide by themselves how the DAO evolves, see [here](../../developer-docs/integrations/sns/tokenomics/tokenomics-intro#voting-power-and-decentralization).
   - Ensure all components of the dapp are under SNS control, including the canisters serving the web frontends, see [SNS asset canisters](../../developer-docs/integrations/sns/managing/sns-asset-canister). 
   - Consider the [SNS preparation checklist](../../developer-docs/integrations/sns/tokenomics/sns-checklist). Important points from a security perspective are e.g. [tokenomics](../../developer-docs/integrations/sns/tokenomics/sns-checklist#11-tokenomics-specification), [disclosing dependencies to off-chain components](../../developer-docs/integrations/sns/tokenomics/sns-checklist#13-disclosure-of-dependencies) and [performing security reviews](../../developer-docs/integrations/sns/tokenomics/sns-checklist#21-security-review).
   - Rather than [self-deploying the SNS code](../../developer-docs/integrations/sns/introduction/dao-alternatives#self-deploy-the-sns-code) or [building your own DAO](../../developer-docs/integrations/sns/introduction/dao-alternatives#build-your-own-dao--use-other-dao-frameworks), consider using the official SNS on the SNS subnet, as this guarantees that the SNS is running an NNS-blessed version and maintained as part of ICP.
   - See also [Verification and trust in a (launched) SNS](https://wiki.internetcomputer.org/wiki/Verification_and_trust_in_a_(launched)_SNS) and [SNS decentralization swap trust](https://wiki.internetcomputer.org/wiki/SNS_decentralization_swap_trust).

An alternative to DAO control (3. above) would be to create an immutable canister smart contract by removing the canister controller completely. However, note that this implies that the canister cannot be upgraded, which may have severe implications in case e.g. a bug were found. The option to use a decentralized governance system and thus being able to upgrade smart contracts is a big advantage of the Internet Computer ecosystem compared to other blockchains.

:::info
Note that, contrary to some other blockchains, also immutable smart contracts need cycles to run, and they can receive cycles.
:::

It is also possible to implement a DAO [decentralized autonomous organization](https://en.wikipedia.org/wiki/Decentralized_autonomous_organization) on ICP from scratch. If you decide to do this (e.g. along the lines of the [basic DAO example](https://internetcomputer.org/docs/current/samples/dao)), be aware that this is security critical and must be security reviewed carefully. Furthermore, users will need to verify that the DAO is controlled by itself.

### Verify the control and level of decentralization of smart contracts you depend on

#### Security concern

If a dapp depends on a third-party canister smart contract (e.g. by making inter-canister calls to it), it is important to verify that the callee satisfies an appropriate level of decentralization. For example: 
* If funds or cycles are transferred to a third-party canister, one might require the canister to be controlled by a decentralized governance system, as otherwise these funds are centrally controlled. 
* If inter-canister calls are made to a centrally controlled and potentially malicious canister, that canister could DoS the caller or even trigger functional bugs, see [Be aware of the risks involved in calling untrustworthy canisters](#be-aware-of-the-risks-involved-in-calling-untrustworthy-canisters). 

#### Recommendation

If you interact with a canister that you require to be decentralized, make sure it is controlled by the NNS, a service nervous system (SNS) or a decentralized governance system, and review under what conditions and by whom the smart contract can be changed.

## Authentication

### Make sure any action that only a specific user should be able to do requires authentication

#### Security concern

If this is not the case, an attacker may be able to perform sensitive actions on behalf of a user, compromising their account.

#### Recommendation

- By design, for every canister call the caller can be identified. The calling [principal](../../references/ic-interface-spec.md#principals) can be accessed using the system API’s methods `ic0.msg_caller_size` and `ic0.msg_caller_copy` (see [here](../../references/ic-interface-spec.md#system-api-imports)). If e.g. Internet Identity is used, the principal is the user identity for this specific origin, see [here](../../references/ii-spec.md#identity-design-and-data-model). If some actions (e.g. access to user’s account data or account specific operations) should be restricted to a principal or a set of principals, then this must be explicitly checked in the canister call, for example as follows in Rust:

<!-- -->

        // Let pk be the public key of a principal that is allowed to perform
        // this operation. This pk could be stored in the canister's state.
        if caller() != Principal::self_authenticating(pk) {  ic_cdk::trap(...) }

        // Alternatively, if the canister keeps data for different principals
        // in e.g. a map such as BTreeMap<Principal, UserData>, then the canister
        // must ensure that each caller can only access and perform operations
        // on their own data:
        if let Some(user_data) = user_data_store.get_mut(&caller()) {
            // perform operations on the user's data
        }

- In Rust, the `ic_cdk` crate can be used to authenticate the caller using `ic_cdk::api::caller`. Make sure the returned principal is of type `Principal::self_authenticating` and identify the user’s account using the public key of that principal, see the example code above.

- Do authentication as early as possible in the call to avoid unauthenticated actions and potentially expensive operations before authentication. It is also a good idea to [deny service to anonymous users](#disallow-the-anonymous-principal-in-authenticated-calls).

- Do not rely on authentication performed during [ingress message inspection](#do-not-rely-on-ingress-message-inspection).

### Disallow the anonymous principal in authenticated calls

#### Security concern

The caller from the system API (e.g. `ic0::api::caller` in Rust) may also return `Principal::anonymous()`. In authenticated calls, this is probably undesired (and could have security implications) since this would behave like a shared account for anyone that does unauthenticated calls.

#### Recommendation

In authenticated calls, make sure the caller is not anonymous and return an error or trap if it is. This could e.g. be done centrally by using a helper method. In Rust it could e.g. look as follows:

    fn caller() -> Result<Principal, String> {
        let caller = ic0::api::caller();
        // The anonymous principal is not allowed to interact with canister.
        if caller == Principal::anonymous() {
            Err(String::from(
                "Anonymous principal not allowed to make calls.",
            ))
        } else {
            Ok(caller)
        }
    }

## Asset certification

### Use HTTP asset certification and avoid serving your dApp through `raw.icp0.io`

#### Security concern

Dapps on ICP can use [asset certification](https://wiki.internetcomputer.org/wiki/HTTP_asset_certification) to make sure the HTTP assets delivered to the browser are authentic (i.e. threshold-signed by the subnet). If an app does not do asset certification, it can only be served insecurely through `raw.icp0.io` , where no asset certification is checked. This is insecure since a single malicious node or boundary node can freely modify the assets delivered to the browser.

If an app is served through `raw.icp0.io` in addition to `icp0.io`, an adversary may trick users (phishing) into using the insecure raw.icp0.io.

#### Recommendation

- Only serve assets through `<canister-id>.icp0.io` where the service worker verifies asset certification. Do not serve through `<canister-id>.raw.icp0.io`.

- Serve assets using the asset canister (which creates asset certification automatically), or add the `ic-certificate` header including the asset certification as e.g. done in the [NNS dapp](https://github.com/dfinity/nns-dapp) or [Internet Identity](https://github.com/dfinity/internet-identity).

- Check in the canister’s `http_request` method if the request came through raw. If so, return an error and do not serve any assets.

## Canister storage

### Rust: Use `thread_local!` with `Cell/RefCell` for state variables and put all your globals in one basket

#### Security concern

Canisters need global mutable state. In Rust, there are several ways to achieve this. However, some options can lead e.g. to memory corruption.

#### Recommendation

- [Use `thread_local!` with `Cell/RefCell` for state variables](https://mmapped.blog/posts/01-effective-rust-canisters.html#use-threadlocal) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)).

- [Put all your globals in one basket](https://mmapped.blog/posts/01-effective-rust-canisters.html#clear-state) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)).

### Limit the amount of data that can be stored in a canister per user

#### Security concern

If a user is able to store a big amount of data on a canister, this may be abused to fill up the canister storage and make the canister unusable.

#### Recommendation

Limit the amount of data that can be stored in a canister per user. This limit has to be checked whenever data is stored for a user in an update call.

### Consider using stable memory, version it, test it

#### Security concern

Canister memory is not persisted across upgrades. If data needs to be kept across upgrades, a natural thing to do is to serialize the canister memory in `pre_upgrade`, and deserialize it in `post_upgrade`. However, the available number of instructions for these methods is limited. If the memory grows too big, the canister can no longer be updated.

#### Recommendation

- Stable memory is persisted across upgrades and can be used to address this issue.

- [Consider using stable memory](https://mmapped.blog/posts/01-effective-rust-canisters.html#stable-memory-main) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)). See also the disadvantages discussed there.

- [Version stable memory](https://mmapped.blog/posts/01-effective-rust-canisters.html#version-stable-memory) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)).

- [Test the upgrade hooks](https://mmapped.blog/posts/01-effective-rust-canisters.html#test-upgrades) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)).

- See also the section on upgrades in [how to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister) (though focused on Motoko).

- Write tests for stable memory to avoid bugs.

- Some libraries (mostly work in progress or partly unfinished) that people work on:

  - <https://github.com/dfinity/stable-structures/>

  - HashMap: <https://github.com/dfinity/stable-structures/pull/1> (currently not production ready.)

  - <https://github.com/seniorjoinu/ic-stable-memory>

- See [current limitations of the Internet Computer](https://wiki.internetcomputer.org/wiki/Current_limitations_of_the_Internet_Computer), sections "Long running upgrades" and "\[de\]serialiser requiring additional wasm memory".

- For example, [Internet Identity](https://github.com/dfinity/internet-identity) uses stable memory directly to store user data.

### Consider encrypting sensitive data on canisters

#### Security concern

By default, canisters provide integrity but not confidentiality. Data stored on canisters can be read by nodes / replicas.

#### Recommendation

- Consider end-to-end encrypting any private or personal data (e.g. user’s personal or private information) on canisters.

- The example dapp [encrypted notes](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp) illustrates how end-to-end encryption can be done.

### Create backups

#### Security concern

A canister could be rendered unusable so it could never be upgraded again e.g. due to the following reasons:

- It has a faulty upgrade process (due to some bug from the dapp developer).

- The state becomes inconsistent / corrupt because of a bug in the code that persists data.

#### Recommendation

- Make sure methods used in upgrading are tested or the canister becomes immutable.

- It may be useful to have a disaster recovery strategy that makes it possible to reinstall the canister.

- See the "Backup and recovery" section in [how to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister)

## Inter-canister calls and rollbacks

### Message execution basics

To understand the issues around async inter-canister calls, one needs to understand a few properties about message execution. This is also explained in the [community conversation on security best practices](https://www.youtube.com/watch?v=PneRzDmf_Xw&list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng&index=2&t=4s).

A **call** is a canister's implementation of either an [update](/references/ic-interface-spec.md#http-call) or [query call](/references/ic-interface-spec.md#http-query) that it exposes. For example, if the Rust CDK is used, these are usually annotated with `#[query]` or `#[update]`, respectively. A **message** is a set of consecutive instructions that a subnet executes for a canister. A call can be split into several messages if inter-canister calls are made. The following properties are essential:

- **Property 1**: only a single message is processed at a time per canister. So message execution is sequential, and never parallel.

- **Property 2**: each call (query / update) triggers a message. When an inter-canister call is made using `await`, the code after the call (the callback, highlighted in blue) is executed as a separate message.

:::info
Note that if the code does not `await` the response, the code after the callback (until the next inter-canister call is triggered using `await`) is executed in the same message.


For example, consider the following Motoko code:

![example_highlighted_code](./_attachments/example_highlighted_code.png)

The first message that is executed here are lines 2-3, until the inter-canister call is made using the `await` syntax (orange box). The second message executes lines 3-5: when the inter-canister call returns (blue box). This part is called the _callback_ of the inter-canister call. The two messages involved in this example will always be scheduled sequentially.
:::

- **Property 3**: successfully delivered requests are received in the order in which they were sent. In particular, if a canister A sends `m1` and `m2` to canister B in that order, then, if both are accepted, `m1` is executed before `m2`.

:::info
Note that this property only gives a guarantee on when the messages are executed, but there is no guarantee on the ordering of the responses received.
:::

- **Property 4**: messages from interleaving calls have no reliable execution ordering.

Property 3 provides a guarantee on the execution order of messages on a target canister. However, if multiple calls interleave, one cannot assume additional ordering guarantees for these interleaving calls. To illustrate this, let's consider the above example code again, and assume the method `example` is called twice in parallel, the resulting calls being Call 1 and Call 2. The following illustration shows two possible message orderings. On the left, the first call's messages are scheduled first, and only then the second call's messages are executed. On the right, you can see another possible message scheduling, where the first messages of each call are executed first. Your code should result in a correct state regardless of the message ordering.

![example_orderings](./_attachments/example_orderings.png)

- **Property 5**: on a trap / panic, modifications to the canister state for the current message are not applied.

For example, if a trap in the second message (blue box) of the above example occurs, canister state changes resulting from that message, even earlier in the blue box, are discarded. However, note that any state changes from earlier messages and in particular the first message (orange box) have been applied, as that message executed successfully.

- **Property 6**: inter-canister calls are not guaranteed to make it to the destination canister, and if a call does reach the destination canister, the destination canister can trap or return a reject response while processing the call. 

Every inter-canister call is guaranteed to receive a response, either from the canister, or synthetically produced by the protocol. However, the response does not have to be successful, but can also be a reject response. The reject may come from the called canister, but it may also be generated by the Internet Computer. Such protocol-generated rejects can occur at any time before the call reaches the callee-canister, as well as once the call does reach the callee-canister if the callee-canister traps while processing the call. If the call reaches the callee-canister, the callee-canister can produce a reply or reject response and the protocol guarantees that the callee-canister's generated reply or reject response gets back to the caller-canister. Thus, it's important that the calling canister handles reject responses as well. A reject response means that the message hasn't been successfully processed by the receiver but doesn't guarantee that the receivers state wasn't changed. 

For more details, refer to the Interface Specification [section on ordering guarantees](/references/ic-interface-spec.md#ordering_guarantees) and the section on [abstract behavior](/references/ic-interface-spec.md#abstract-behavior) which defines message execution in more detail.

### Securely handle traps in callbacks

#### Security Concern

Traps / panics roll back the canister state, as described in Property 5 above. So any state change followed by a trap or panic can be risky. This is an important concern when inter-canister calls are made. If a trap occurs after an await to an inter-canister call, then the state is reverted to the snapshot before the inter-canister call’s callback invocation, and not to the state before the entire call.

More precisely, suppose some state changes are applied and then an inter-canister call is issued. Also, assume that these state changes leave the canister in an inconsistent state, and that state is only made consistent again in the callback. Now if there is a trap in the callback, this leaves the canister in an inconsistent state.

Here are two example security issues that can arise because of this:

- Assume an inter-canister call is issued to transfer funds. In the callback, the canister accounts for having made that transfer by updating the balances in the canister storage. However, suppose the callback also updates some usage statistics data, which eventually leads to a trap when some data structure becomes full. As soon as that is the case, the canister ends up in an inconsistent state because the state changes in the callback are no longer applied and thus the transfers are not correctly accounted for.
  ![example_highlighted_code](./_attachments/example_trap_after_await.png)
  This example is also discussed in this [community conversation](https://www.youtube.com/watch?v=PneRzDmf_Xw&list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng&index=2&t=4s). 

- Suppose part of the canister state is locked before an inter-canister call and released in the callback. Then the lock may never be released if the callback traps.
Note that in canisters implemented in Rust with Rust CDK version 0.5.1, any local variables still go out of scope if a callback traps. The CDK actually calls into the ic0.call_on_cleanup API to release these resources. This helps to prevent issues with locks not being released, as it is possible to use Rust's Drop implementation to release locked resources, as we discuss in [Be aware that there is no reliable message ordering](https://internetcomputer.org/docs/current/developer-docs/security/rust-canister-development-security-best-practices#be-aware-that-there-is-no-reliable-message-ordering).

#### Recommendation

Recall that the responses to inter-canister calls are processed in the corresponding callback. If the callback traps, the cleanup (ic0.call_on_cleanup) is executed. When making an inter-canister call, the ICP reserves sufficiently many cycles to execute the response callback or cleanup (up to the instruction limit). A fixed fraction of the reservation is set aside for the cleanup. Thus, a response or cleanup execution can never “run out of cycles”, but they can run into the instruction limit and trap.

The naïve recommendation to address the security concern described above would be to avoid traps. However, that can be very difficult to achieve due to the following reasons: 

- The implementation can be involved and could panic due to bugs, such as index out-of-bounds errors or panics (expect, unwrap) that should supposedly never happen.

- It is hard to make sure the callback or cleanup doesn’t run into the instruction limit (and thus traps), because the number of instructions required can in general not be predicted and may e.g. depend on the data being processed. 

Due to these reasons, while it is easy to recommend “avoiding traps”, this is actually hard to achieve in practice. So in our view, code should be written so that it can deal even with unexpected traps due to bugs or hitting the instruction limits. We discuss two approaches:

1. Do simple cleanups 
1. Do “journaling”

In the first approach, the cleanup callback is used to recover from unexpected panics. This can work, but has several drawbacks: 
- The cleanup itself could panic, in which case one is in the initial problematic situation again. The risk may be acceptable for simple cleanups, but as discussed above it is hard to write code that never panics, especially if it is somewhat complex. 
- Currently, Motoko does not allow setting custom cleanup callbacks. Cleanup is used internally by Motoko to do some cleanups.
- As discussed above, the Rust CDK has a feature that automatically releases local variables in cleanup, which [can be used to release locks](https://internetcomputer.org/docs/current/developer-docs/security/rust-canister-development-security-best-practices#be-aware-that-there-is-no-reliable-message-ordering). Since only one cleanup callback can be defined, any custom cleanup would currently have to implement that feature itself if needed, making this currently hard to use and understand.

We proceed to discuss “journaling”, which is currently our recommended way of addressing the problem at hand. 

#### Journaling

Journaling can be used for ensuring that tasks are completed correctly in an asynchronous context, where any instruction or async task can fail. Journaling is generally useful in any security critical application canister on the IC. The journaling concept we describe here is inspired and adapted from journaling in file systems.

Conceptually, a journal is a chronological list of records kept in a canister’s storage. It keeps track of tasks before they begin and when they are completed. Before each failable task, the journal records the intent to execute the task, and after the task, the journal records the result. The journal supports idempotent task flows by providing the necessary information for the canister to resume flows that failed to complete, report progress for ongoing flows, and report results for completed flows. Retries can be initiated by calls or automatically on heartbeat. If the task flow was completed in a heartbeat, a user can take advantage of idempotency to check the result.

Creating a record in the journal is called “journaling”.  For example, to make an unreliable async call to a ledger:

1. Check the journal to ensure the transfer is not already in progress. If it is already in progress, go into recovery (see [Recovery](#recovery) section below). Otherwise, journal the intent to call a ledger to transfer 1 token from A to B. The journaled intent should contain sufficient context to later identify what happened to the call.

   - An “in progress” transfer would show in the journal as an entry containing intent to do the transfer without an entry containing the result of the transfer call.

1. Call ledger to transfer 1 token from A to B.

1. Journal the result of the transfer.

   - On failure, record the error.

   - On success, record success. (In order to commit the record, inter-canister call can be made to an endpoint on the same canister that does nothing. Otherwise a trap could erase the journaled result, complicating recovery.)

1. Continue onto the next blocked task.

   - “Blocked tasks” are those that require that step 3 has been completed before execution.

   - A blocked task may depend on the success or failure recorded in step 3.

   - Examples of blocked tasks:

     - On failure, log the failure in a user-visible log, and if less than 5 failures have occurred, make a new transfer outcall with the same parameters.

     - On success, update the internal accounting of assets to conform to the result of the transfer.

   - Note that any independent task does not need to wait for any part of this flow.

The critical property of the journal is that at any point, if there is a failure, the journal is sufficient to determine what the next safe step should be. If, after step 1 (journal the intent),
there is a failure in step 2 or 3, and step 3 (record the result) has not been completed, then the application should complete step 3 by finding out what happened to the call in step 2. (If finding out what happened to the call is too difficult to automate, it can be done manually. The journal can indicate whether a manual intervention is necessary, and the type of intervention that is necessary.)
The fact that the intent has been journaled and the app knows not to reenter the flow until the result has been recorded means the journal acts as a lock on the critical section containing
the ledger outcall. The lock will not get stuck assuming the application can always find out what happened to a call. Enough context about the call should be recorded in the intent to ensure
that this is the case. For the ICP ledger, an ID can be generated and recorded in the journaled intent and the ledger can be called with the ID included in the memo so that the result of the
call can be queried later.

#### Journaling is Robust to Panics

Continuing the above example, let us consider a panic at any point. 
1. If there is panic before the async outcall, then the journaled intent will be lost, but no state change occurred internally and no outcalls were made so the app is in a safe state. The next step is to record a new intent.
1. If there is a panic after the async outcall and no self-call was used to commit the journal, the journaled result (step 3) will be lost. This means the app will need to determine the result and journal it before continuing to step 4. As long as it is possible to determine the result, the app can be brought back to a consistent state.

#### Journaling And Audit Events

The journal can be used to augment the audit trail for recent events. However, it is probably too detailed for long term storage. After a while, journal entries could be compressed and incorporated into long term audit events. The process for creating audit events could itself be journaled.

#### Recovery

The journal ensures the application knows that recovery from an error is needed, and aids in making recovery decisions. In order to support the recovery process, the journal should support querying all unresolved tasks of a certain type, and tasks of a certain type that resulted in an error. Given an intent, the journal should also be able to return the result if it exists and indicate if it does not exist.

Note that recovery can often be complex to automate. In such cases, the journal can support a manual recovery process.
Extending the ledger example above, a recovery process could look as follows:

1. There is a panic and the status of the ledger call is unknown. However, the journal has recorded that a call to transfer with particular parameters and memo has been made, and the deduplication timestamp of the transfer. 
1. The app calls the ledger to determine whether a transaction with the journaled parameters has succeeded on the ledger. Due to the guarantee that any pair of messages that are both executed are always executed in the order issued, if the ledger indicates that the transaction has not occurred, then the transaction will never occur.
1. The app journals the result of the transfer call.
1. The app journals the intention to update internal state according to the result of the transfer call, then updates the internal state, and finally journals the result of the attempt to update the internal state. (Journaling this step is still useful even if it does not contain outcalls, because outcalls may be introduced later, and the step could conflict with other processes that are not atomic.)

Note that querying the ICP ledger or an ICRC ledger to determine whether a transaction has succeeded is not straightforward to automate, so it could be done manually.

#### Example journaling structures and flows

Here is a sketch of data structures and flows that could be used to implement a journal for transaction flows in the example application described above. For simplicity, multiple transaction flows of the same action type from the same caller are not allowed to overlap in time.

The journaling data structures should support the following queries.
- What are the unresolved actions for a particular user and action type?
- What are the unresolved actions that have been open for longer than some time T?

* Map: Journal by caller
  - Key: (caller, action type) – e.g. (Alice, Withdraw)
  - Value: Journal struct

* Map: Transactions by timestamp (ordered map, could use an additional list for the ordering in Motoko)
  - Key: timestamp 
  - Value: list of references to `Transaction journal struct`s

* Transaction journal struct (compatible with `Journal struct`)
  - Meta data
    - transaction, including memo
    - timestamp
  - List of events, e.g. initialized, returned/success, returned/error with error condition
  - Number of times attempted and failed to progress

* Map: Transaction audit log
  - Key: transaction (hash)
  - Value: result of (completed) transaction

Note that `Journal by caller` is intended to support various types of flows, but only transaction flows are detailed explicitly. `Transactions by timestamp` is an auxiliary structure to be used for searching for transactions that require recovery.

Here is a sketch of how the above structures could be used.

* When executing a transaction:
  1. Look up the transaction in the audit log. If an entry exists, return it and exit this flow.
  1. Look up the transaction flow in the `Journal by caller` map.
  1. If no entry exists in `Journal by caller`, then:
     1. Create a new `Transaction journal struct`.
     1. Add an entry for the `Transaction journal struct` to `Journal by caller`,
     1. Add an entry for the `Transaction journal struct` to `Transactions by timestamp`.
  1. Initiate or resume the task flow according to the list of events in the `Transaction journal struct` that was previously obtained or created.

* When a transaction is finished:
  1. Create an audit log event for the transaction.
  1. Remove the transaction from both `Transactions by caller` and `Transactions by timestamp`.

* When searching for unfinished transactions that need to be recovered: 
  - Iterate through `Transactions by timestamp` map (oldest first).
  - Transactions older than e.g. 10 minutes back that have unresolved tasks should be considered for recovery.

#### Example implementation of journaling

GoldDAO's GLDT-swap has an implementation of journaling. See https://github.com/GoldDAO/gldt-swap/blob/ledger-v1.0.0/canister/gldt_core/src/lib.rs#L654. In their case the journal entries are recorded in the "registry". Note that in GLDT-swap there is also a separate concept of "record" which is a permanent audit trail, and is not used for journaling.

### Avoid traps after await

*This section is deprecated in favor of [Securely handle traps in callbacks](#Securely-handle-traps-in-callbacks)*

#### Security concern

Traps / panics roll back the canister state, as described in Property 5 above. So any state change followed by a trap or panic can be risky. This is also an important concern when inter-canister calls are made. If a panic/trap occurs after an `await` to an inter-canister call, then the state is reverted to the snapshot before the inter-canister call callback invocation, and not before the entire call!

This may e.g. lead to the following issues:

- Suppose some state changes are applied and then an inter-canister call is issued. Also, assume that these state changes leave the canister in an inconsistent state, and that state is only made consistent again in the callback. Now if there is a trap in the callback, this leaves the canister in an inconsistent state.
- A concrete bug of this kind is the following. Assume an inter-canister call is issued to transfer funds. In the callback, the canister accounts for having made that transfer by reflecting that fact in the canister storage. However, suppose the callback also updates some usage statistics data, which eventually leads to a trap when some data structure becomes full. As soon as that is the case, the canister ends up in an inconsistent state because the state changes in the callback are no longer applied and thus the transfers are not correctly accounted for.
  ![example_highlighted_code](./_attachments/example_trap_after_await.png)
  This example is also discussed in this [community conversation](https://www.youtube.com/watch?v=PneRzDmf_Xw&list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng&index=2&t=4s).
- Another example: if e.g. part of the canister state is locked before an inter-canister call and released in the callback, the lock may never be released if the callback traps.

- Generally, there can be bugs where data is not persisted when the developer expected it to be.

Note that in Rust, from Rust CDK version 0.5.1, any local variables still go out of scope if a callback traps. The CDK actually calls into the `ic0.call_on_cleanup` API to release these resources. This helps to prevent some of the above issues, as e.g. it is possible to use Rust's `Drop` implementation to release locked resources, as we discuss in ["Be aware that there is no reliable message ordering"](#be-aware-that-there-is-no-reliable-message-ordering).

#### Recommendation

- Watch the [community conversation on security best practices](https://www.youtube.com/watch?v=PneRzDmf_Xw&list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng&index=2&t=4s) which shows a concrete example of an issue as described here.

- [Don’t lock shared resources across await boundaries](https://mmapped.blog/posts/01-effective-rust-canisters.html#dont-lock) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)).

- [Don’t panic after `await`](https://mmapped.blog/posts/01-effective-rust-canisters.html#panic-await) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)).

- For context: [IC interface spec on message execution](/references/ic-interface-spec.md#message-execution).
- See also: "Inter-canister calls" section in [how to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister).

### Be aware that there is no reliable message ordering

#### Security concern

As described in the [message execution basics](#message-execution-basics) above, messages (but not entire calls) are processed atomically. In particular, as described in Property 4 above, messages from interleaving calls do not have a reliable execution ordering. Thus, the state of the canister (and other canisters) may change between the time an inter-canister call is started and the time when it returns, which may lead to issues if not handled correctly. These issues are generally called 'Reentrancy bugs' (see e.g. the [Ethereum best practices on reentrancy](https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/)). Note however that the messaging guarantees (and thus the bugs) on the Internet Computer are different from Ethereum.

Here are two concrete and somewhat similar types of bugs to illustrate potential reentrancy security issues:

- **Time-of-check time-of-use issues:** these occur when some condition on global state is checked before an inter-canister call, and then wrongly assuming the condition still holds when the call returns. For example, one might check if there is sufficient balance on some account, then issue an inter-canister call and finally make a transfer as part of the callback message. When the second inter-canister call starts, it is possible that the condition which was checked initially no longer holds, because other ledger transfers may have happened before the callback of the first call is executed (see also Property 4 above).

- **Double-Spending issues.**: such issues occur when a transfer is issued twice, often because of unfavorable message scheduling. For example, suppose you check if a caller is eligible for a refund and if so, transfer some refund amount to them. When the refund ledger call returns successfully, you set a flag in the canister storage indicating that the caller has been refunded. This is vulnerable to double-spending because the refund method can be called twice by the caller in parallel, in which case it is possible that the messages before issuing the transfer (including the eligibility check) are scheduled before both callbacks. A detailed explanation of this issue can be found in the [community conversation on security best practices](https://www.youtube.com/watch?v=PneRzDmf_Xw&list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng&index=2&t=4s).

#### Recommendation

It is highly recommended to carefully review any canister code that makes async inter-canister calls (`await`). If two messages access (read or write) the same state, review if there is a possible scheduling of these messages that leads to illegal transactions or inconsistent state.

See also: "Inter-canister calls" section in [how to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister).

To address issues around message ordering that can lead to bugs, one usually employs locking mechanisms to ensure that e.g. a caller (or anyone) can only execute an entire call (which involves several messages) once at a time. A simple example is also given in the [community conversation](https://www.youtube.com/watch?v=PneRzDmf_Xw&list=PLuhDt1vhGcrez-f3I0_hvbwGZHZzkZ7Ng&index=2&t=4s) mentioned above.

The locks would usually be released in the callback. That bears the risk that the lock may never be released in case the callback traps, as we discussed in [avoid traps after await](#avoid-traps-after-await). In Rust, there is a nice pattern to avoid this issue by using Rust's `Drop` implementation. The example code below shows how one can implement a lock per caller (`CallerGuard`) with a `Drop` implementation. From Rust CDK version 0.5.1, any local variables still go out of scope if the callback traps, so the lock on the caller is released even in that case. Technically, the CDK calls into the `ic0.call_on_cleanup` API to release these resources. Note that the `Drop` function is only executed for callbacks and not all messages in general, as `ic0.call_on_cleanup` is only executed for those. 

    pub struct State {
        pending_requests: BTreeSet<Principal>,
    }

    thread_local! {
        static STATE: RefCell<State> = RefCell::new(State{pending_requests: BTreeSet::new()});
    }

    pub struct CallerGuard {
        principal: Principal,
    }

    impl CallerGuard {
        pub fn new(principal: Principal) -> Result<Self, String> {
            STATE.with(|state| {
                let pending_requests = &mut state.borrow_mut().pending_requests;
                if pending_requests.contains(&principal){
                    return Err(format!("Already processing a request for principal {:?}", &principal));
                }
                pending_requests.insert(principal);
                Ok(Self { principal })
            })
        }
    }

    impl Drop for CallerGuard {
        fn drop(&mut self) {
            STATE.with(|state| {
                state.borrow_mut().pending_requests.remove(&self.principal);
            })
        }
    }

    #[update]
    #[candid_method(update)]
    async fn example_call_with_locking_per_caller() -> Result<(), String> {
        let caller = ic_cdk::caller();
        // using `?`, return an error immediately if there is already a call in progress for `caller`.
        let _ = CallerGuard::new(caller)?;
        // do anything, call other canisters
        Ok(())
    } // here the guard goes out of scope and is dropped

    mod test {
        use super::*;

        #[test]
        fn should_obtain_guard_for_different_principals() {
            let principal_1 = Principal::anonymous();
            let principal_2 = Principal::management_canister();
            let caller_guard = CallerGuard::new(principal_1);
            assert!(caller_guard.is_ok());
            assert!(CallerGuard::new(principal_2).is_ok());
        }

        #[test]
        fn should_not_obtain_guard_twice_for_same_principal() {
            let principal = Principal::anonymous();
            let caller_guard = CallerGuard::new(principal);
            assert!(caller_guard.is_ok());
            assert!(CallerGuard::new(principal).is_err());
        }

        #[test]
        fn should_release_guard_on_drop() {
            let principal = Principal::anonymous();
            {
                let caller_guard = CallerGuard::new(principal);
                assert!(caller_guard.is_ok());
            } // drop caller_guard as it goes out of scope here
            // it is possible to get a guard again:
            assert!(CallerGuard::new(principal).is_ok());
        }
    }

This pattern can be extended e.g. to work for the following use cases:

- A global lock that does not only lock per caller. For this, set a boolean flag in the canister state instead of using a `BTreeSet<Principal>`.
- A guard that makes sure that only a limited number of principals are allowed to execute a method at the same time. For this, one can return an error in `CallerGuard::new()` in case `pending_requests.len() >= MAX_NUM_CONCURRENT_REQUESTS`.
- A guard that limits the number of times a method can be called in parallel. For this, use a counter in the canister state that is checked and increased in `CallerGuard::new()` and decreased in `Drop`.

Finally, note that the same guard can be used in several methods to restrict parallel execution of them.

### Handle rejected inter-canister calls correctly

#### Security concern

As stated by the Property 6 above, inter-canister calls can fail in which case they result in a **reject**. See [reject codes](/references/ic-interface-spec.md#reject-codes) for more detail. The caller must correctly deal with the reject cases, as they can happen in normal operation, e.g. because of insufficient cycles on the sender or receiver side, or because some data structures (like message queues) are full.

Not handling the error cases correctly is risky: for example, if a ledger transfer results in an error, the callback dealing with that error must interpret it correctly (the transfer did **not** happen).

#### Recommendation

When making inter-canister calls, always handle the error cases (rejects) correctly. These errors imply that the message has not been successfully executed.

### Be aware of the risks involved in calling untrustworthy canisters

#### Security concern

- If inter-canister calls are made to potentially malicious canisters, this can lead to DoS issues or there could be issues related to candid decoding. Also, the data returned from a canister call could be assumed to be trustworthy when it is not.

- When another canister is called with a callback being registered, and the receiver stalls the response indefinitely by not responding, the result would be a DoS. Additionally, that canister can no longer be upgraded if it has callbacks registered. Recovery would require wiping the state of the canister by reinstalling it. Note that even a trustworthy canister could have a bug causing it to stall indefinitely. However, such a bug seems rather unlikely to occur. 

- In summary, this can DoS a canister, consume an excessive amount of resources, or lead to logic bugs if the behavior of the canister depends on the inter-canister call response.

#### Recommendation

- Making inter-canister calls to trustworthy canisters is safe, except for the rather unlikely case that there is a bug in the callee that makes it stall forever. 

- Interacting with untrustworthy canisters is still possible by using a state-free proxy canister which could easily be re-installed if it is attacked as described above and is stuck. When the proxy is reinstalled, the caller obtains an error response to the open calls.

- Sanitize data returned from inter-canister calls.

- See "Talking to malicious canisters" section in [how to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister).

- See [current limitations of the Internet Computer](https://wiki.internetcomputer.org/wiki/Current_limitations_of_the_Internet_Computer), section "Calling potentially malicious or buggy canisters can prevent canisters from upgrading".


### Make sure there are no loops in call graphs

#### Security concern

Loops in the call graph (e.g. canister A calling B, B calling C, C calling A) may lead to canister deadlocks.

#### Recommendation

- Avoid such loops!

- For more information, see [current limitations of the Internet Computer](https://wiki.internetcomputer.org/wiki/Current_limitations_of_the_Internet_Computer), section "Loops in call graphs".

## Canister upgrades

### Be careful with panics during upgrades

#### Security concern

If a canister traps or panics in `pre_upgrade`, this can lead to permanently blocking the canister, resulting in a situation where upgrades fail or are no longer possible at all.

#### Recommendation

- Avoid panics / traps in `pre_upgrade` hooks, unless it is truly unrecoverable, so that any invalid state can fixed by upgrading. Panics in the pre-upgrade hook prevent upgrade, and since the pre-upgrade hook is controlled by the old code, it can permanently block upgrading.

- Panic in the `post_upgrade` hook if state is invalid, so that one can retry the upgrade and try to fix the invalid state. Panics in the the post-upgrade hook abort the upgrade, but one can retry with new code.

- [Test the upgrade hooks](https://mmapped.blog/posts/01-effective-rust-canisters.html#test-upgrades) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)).

- See also the section on upgrades in [how to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister) (though focused on Motoko).

- See [current limitations of the Internet Computer](https://wiki.internetcomputer.org/wiki/Current_limitations_of_the_Internet_Computer), section "Bugs in `pre_upgrade` hooks".

### Reinstantiate timers during upgrades

#### Security Concern

Global timers are deactivated upon changes to the canister's Wasm module. The [IC specification](../../references/ic-interface-spec#timer) states this as follows:

> "The timer is also deactivated upon changes to the canister's Wasm module (calling install_code, uninstall_code methods of the management canister or if the canister runs out of cycles). In particular, the function canister_global_timer won't be scheduled again unless the canister sets the global timer again (using the System API function ic0.global_timer_set)."

Upgrade is a mode of `install_code` and hence the timers are deactivated during an upgrade.

This could result in a vulnerability in certain cases where security controls or other critical features rely on these timers to function. For example, a DEX which relies on timers to update the exchange rates of currencies could be vulnerable to arbitraging opportunities if the rates are no longer updated.

Since global timers are used internally by the Motoko `Timer` mechanism, the same holds true for Motoko Timer. As explained in the [pull request](https://github.com/dfinity/motoko/pull/3542) under "The upgrade story", the global timer gets jettisoned on upgrade, and the timers need to be set up in the post-upgrade hook.

As explained in [this pull request](https://github.com/dfinity/motoko/pull/3542) under "Opting out", the behavior is different when using Motoko and implementing `system func timer`. The `timer` function will be called after an upgrade. In case your canister was using timers for recurring tasks, the `timer` function would likely set the global timer again for a later time. However, the time between invocations of `timer` would not be consistent as the upgrade triggered an "unexpected" call to `timer`.

Using the rust CDK, the reccuring timer is also lost on upgrade as explained in the API documentation of [set_timer_interval](https://docs.rs/ic-cdk/0.6.9/ic_cdk/timer/fn.set_timer_interval.html).

#### Recommendation

- Keep track of global timers in the `pre_upgrade` hook. Store any state in stable variables.
- Set timers in the `post_upgrade` hook.
- See the Motoko documentation on [recurringTimer](../../motoko/main/base/Timer.md#function-recurringtimer).
- See the Rust documentation on [set_timer_interval](https://docs.rs/ic-cdk/0.6.9/ic_cdk/timer/fn.set_timer_interval.html).

## HTTP Outcalls

### Do not store sensitive data (e.g. API keys) in canisters

#### Security concern

Sensitive data is a broad term that varies depending on your application logic and behaviour. Here is a non-exhaustive list of secrets that are typically considered sensitive, such as API keys or tokens:
* Secrets that allow interaction with non-public endpoints.
* Secrets that allow querying or modifying endpoints with confidential data.
* API tokens that are fee-based.

By default, the data stored inside your canister is unencrypted. Therefore if your canister is installed in a malicious replica, it can easily retrieve and steal your keys, tokens, and secrets in plain text.

#### Recommendation

Make sure you don’t store sensitive data inside your canister.

[More information.](../integrations/https-outcalls/https-outcalls-how-it-works#compromised-replicas)

[Data confidentiality security recommendations.](general-security-best-practices#data-confidentiality-on-the-internet-computer)

### Ensure your canisters have a sufficiently large quota with the HTTP server

#### Security concern

When an HTTP outcall is performed, it is amplified by the number of replicas in the subnet. The target web server will receive not only one request, but as many requests as the number of nodes in the subnet.

Most web servers implement some sort of rate limiting; this is a mechanism used to restrict the number of requests a client can make to a web server within a specific time period, preventing abuse or excessive usage of their API(s).

#### Recommendation

You should consider such rate limits when designing and implementing your canisters. Rate limits are enforced using different time granularities, e.g., seconds or minutes. For second-granularity enforcement, make sure that the simultaneous requests by all subnet replicas do not violate the quota. Violations may lead to temporary or permanent bans.

[More information.](../integrations/https-outcalls/https-outcalls-how-it-works#rate-limiting-by-servers)

### Only make HTTP outcall requests to idempotent endpoints

#### Security concern

As mentioned before, if an HTTP outcall is performed it is amplified by the number of replicas in the subnet. That means the queried endpoint will receive the same request several times. This is especially risky in requests that change the endpoint state, given that one HTTP outcall could lead to unintentionally changing the endpoint state several times.

#### Recommendation

Make sure the endpoints, called by an HTTP outcall, are idempotent, i.e. the queried endpoint has the same behaviour with the same request payload, no matter the number of times it is called.

Some servers support the use of idempotency keys. These keys are random unique strings submitted in the HTTP request as headers. If used with the HTTP outcalls feature, all requests sent by each (honest) replica will contain the same idempotency key. This allows the server to recognize duplicated requests (i.e requests with the same idempotency key), handle just one and modify the server state only once. Note that this is a feature that must be supported by the server.

[More information.](../integrations/https-outcalls/https-outcalls-how-it-works#post-requests-must-be-idempotent)

### Ensure HTTP responses are identical

#### Security concern

When replicas of a subnet receive HTTP responses, these responses must be identical. Otherwise, consensus won’t be achieved and the HTTP response will be rejected, but still charged.

#### Recommendation

Make sure the HTTP responses sent to the consensus layer are identical.

Ideally the HTTP responses returned by the queried endpoint would always be the same. However, most of the time this is not possible to control and the responses include random data (e.g the response includes timestamps, cookie values or some sort of identifiers). In those cases make sure to use the [transformation functions](../integrations/https-outcalls/https-outcalls-how-it-works#transformation-function) to guarantee that the responses received by each replica are identical by removing any random data or extracting only the relevant data.

This applies to the HTTP response body and headers. Make sure to consider both when applying the transformation functions. Response headers are often overlooked and lead to failure because of failed consensus.

[More information.](../integrations/https-outcalls/https-outcalls-how-it-works#responses-must-be-similar)

### Be aware of HTTP request and response sizes

#### Security concern

The [pricing](../integrations/https-outcalls/https-outcalls-how-it-works#pricing) of HTTPS outcalls is determined by, among other variables, the size of the HTTP request and the maximal response size. Thus, if big requests are made, this could quickly drain the canister’s cycles balance. This can be risky e.g. if HTTP outcalls are triggered by user actions (rather than a heartbeat or timer invocation).

#### Recommendation

When using HTTPS outcalls be mindful of the HTTP request and response sizes. Ensure that the size of the request issued and the size of the HTTP response coming from the server are reasonable.

When making an HTTP outcall it is possible – and highly recommended – to define the `max_response_bytes` parameter, which allows you to set the maximum allowed response size. If this parameter is not defined, it defaults to 2MB (the hard response size limit of the HTTPS outcalls functionality). The cycle cost of the response is always charged based on the `max_response_bytes` or 2MB if not set.

Finally, be aware that users may incur cycles costs for HTTP outcalls in case these calls can be triggered by user actions.

[More information.](../integrations/https-outcalls/https-outcalls-how-it-works#recipe-for-coding-a-canister-http-call)

### Perform input validation in HTTP outcalls

#### Security concern

HTTP outcalls that use user-submitted data are susceptible to various injection attacks. This may lead to several issues, such as the ones previously mentioned.

#### Recommendation

Perform input validation when using user-submitted data in the HTTP outcalls.

[More information.](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)

## Miscellaneous

### Test your canister code even in presence of system API calls

#### Security concern

Since canisters interact with the system API, it is harder to test the code because unit tests cannot call the system API. This may lead to lack of unit tests.

#### Recommendation

- Create loosely coupled modules that do not depend on the system API and unit test those. See this [recommendation](https://mmapped.blog/posts/01-effective-rust-canisters.html#target-independent) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)).

- For the parts that still interact with the system API: create a thin abstraction of the System API that is faked in unit tests. See the [recommendation](https://mmapped.blog/posts/01-effective-rust-canisters.html#target-independent) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)). For example, one can implement a ‘Runtime’ as follows and then use the ‘MockRuntime’ in tests (code by Dimitris Sarlis):

<!-- -->

        use ic_cdk::api::{
            call::call, caller, data_certificate, id, print, time, trap,
        };

        #[async_trait]
        pub trait Runtime {
            fn caller(&self) -> Result<Principal, String>;
            fn id(&self) -> Principal;
            fn time(&self) -> u64;
            fn trap(&self, message: &str) -> !;
            fn print(&self, message: &str);
            fn data_certificate(&self) -> Option<Vec<u8>>;
            (...)
        }

        #[async_trait]
        impl Runtime for RuntimeImpl {
            fn caller(&self) -> Result<Principal, String> {
                let caller = caller();
                // The anonymous principal is not allowed to interact with the canister.
                if caller == Principal::anonymous() {
                    Err(String::from(
                        "Anonymous principal not allowed to make calls.",
                    ))
                } else {
                    Ok(caller)
                }
            }

            fn id(&self) -> Principal {
                id()
            }

            fn time(&self) -> u64 {
                time()
            }

            (...)

        }

        pub struct MockRuntime {
            pub caller: Principal,
            pub canister_id: Principal,
            pub time: u64,
            (...)
        }

        #[async_trait]
        impl Runtime for MockRuntime {
            fn caller(&self) -> Result<Principal, String> {
                Ok(self.caller)
            }

            fn id(&self) -> Principal {
                self.canister_id
            }

            fn time(&self) -> u64 {
                self.time
            }

            (...)

        }

### Make canister builds reproducible

#### Security concern

It should be possible to verify that a canister does what it claims to do. ICP provides a SHA256 hash of the deployed WASM module. In order for this to be useful, the canister build has to be reproducible.

#### Recommendation

Make canister builds reproducible. See this [recommendation](https://mmapped.blog/posts/01-effective-rust-canisters.html#reproducible-builds) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)). See also the [developer docs on this](/developer-docs/backend/reproducible-builds.md).

### Expose metrics from your canister

#### Security concern

In case of attacks, it is great to be able to obtain relevant metrics from canisters, such as number of accounts, size of internal data structures, stable memory, etc.

#### Recommendation

[Expose metrics from your canister](https://mmapped.blog/posts/01-effective-rust-canisters.html#expose-metrics) (from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)).

### Don’t rely on time being strictly monotonic

#### Security concern

The time read from the System API is monotonic, but not strictly monotonic. Thus, two subsequent calls can return the same time, which could lead to security bugs when the time API is used.

#### Recommendation

See the "Time is not strictly monotonic" section in [how to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister).

### Protect against draining the cycles balance

#### Security concern

Canisters pay for their cycles which makes them inherently vulnerable to attacks that consume all their cycles.

#### Recommendation

* Consider monitoring, early authentication, rate limiting on canister level to mitigate this. Also, be aware that an attacker will aim for the call consuming most cycles. See the "Cycle balance drain attacks section" in [how to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister).

* For query calls that cause significant computation and don't modify the state, it is advisable to not execute the expensive computation if the method is called as update. However, keep in mind that query calls [don't provide authenticity guarantees](general-security-best-practices#certify-query-responses-if-they-are-relevant-for-security), so this is a trade-off. Unfortunately, the execution mode of the query (whether it was called as query or update) is currently not directly exposed to the user code. However, one can e.g. call  `ic0.data_certificate_present()` which returns `1` when called as query, and `0` for update methods. See the Interface Specification [section on certified data](/references/ic-interface-spec.md#system-api-certified-data). 

* Expensive calls that only need to be called from other canisters can require some amount of cycles to be sent along with the call to compensate for the cycles consumed by the execution.  

* Finally, it is also an option to charge for ingress messages, but that is not currently supported by the protocol itself and a custom solution would need to be designed. 

### Do not rely on ingress message inspection

#### Security concern

The correct execution of [canister_inspect_message](../../references/ic-interface-spec#system-api-inspect-message) is not guaranteed in the presence of a malicious node, because it is executed as a [query call](../../references/ic-interface-spec#http-query).  

#### Recommendation

Your canisters should not rely on the correct execution of `canister_inspect_message`. This in particular means that no security critical code, such as [access control checks](#make-sure-any-action-that-only-a-specific-user-should-be-able-to-do-requires-authentication), should be solely performed in that method. Such checks **must** be performed as part of an update method to guarantee reliable execution. Ideally, they are executed both in the `canister_inspect_message` function and a guard function. 

Also note that for inter-canister calls `canister_inspect_message` is not invoked which is another reason to execute the code as part of the update call by using a guard.

## Nonspecific to the Internet Computer

The best practices in this section are very general and not specific to the Internet Computer. This list is by no means complete and only lists a few very specific concerns that have led to issues in the past.

### Validate inputs

#### Security concern

The data sent in [query and update calls](/references/ic-interface-spec.md#http-interface) is generally untrusted. The message size limit is a few MB. This can e.g. lead the following issues:

- If unvalidated data is rendered in web UIs or displayed in other systems, this can lead to injection attacks (e.g. XSS).

- Messages of big size could be sent and potentially stored in the canister, consuming an excessive amount of storage.

- Big inputs (e.g. big lists or strings) could trigger an excessive amount of computation, resulting in DoS and consuming many cycles. See also [protect against draining the cycles balance](#protect-against-draining-the-cycles-balance).

#### Recommendation

- Perform input validation, see e.g. the [OWASP cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).

- "Large data attacks" section in [how to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister) (be aware of Candid space bombs).

- [ASVS](https://owasp.org/www-project-application-security-verification-standard/) 5.1.4: Verify that structured data is strongly typed and validated against a defined schema including allowed characters, length and pattern (e.g. credit card numbers or telephone, or validating that two related fields are reasonable, such as checking that suburb and zip/postcode match).

### Rust: Don’t use unsafe Rust code

#### Security concern

Unsafe Rust code is risky because it may introduce memory corruption issues.

#### Recommendation

- Avoid unsafe code whenever possible.

- See the [Rust security guidelines](https://anssi-fr.github.io/rust-guide/04_language.html#unsafe-code).

- Consider the [DFINITY Rust guidelines](https://docs.dfinity.systems/dfinity/spec/meta/rust.html#_avoid_unsafe_code).

### Rust: Avoid integer overflows

#### Security concern

Integers in Rust may overflow. While such overflows lead to panics in the debug configuration, the values are just wrapped around silently in release compilation. This can cause major security issues e.g. when the integers are used as indices, unique IDs, or if cycles or ICP amounts are computed.

#### Recommendation

- Review your code carefully for any integer operations that may wrap around.

- Use the `saturated` or `checked` variants of these operations, such as `saturated_add`, `saturated_sub`, `checked_add` , `checked_sub`, etc. See e.g. the [Rust docs](https://doc.rust-lang.org/std/primitive.u32.html#method.saturating_add) for `u32`.

### Rust: Avoid floating point arithmetic for financial information

#### Security concern

Floats in Rust may behave unexpectedly. There can be undesirable loss of precision under certain circumstances. When dividing by zero, the result could be `-inf`, `inf`, or `NaN`. When converting to integer, this can lead to unexpected results. (There is no `checked_div` for floats.)

#### Recommendation

Use [`rust_decimal::Decimal`](https://docs.rs/rust_decimal/latest/rust_decimal/) or [`num_rational::Ratio`](https://docs.rs/num-rational/latest/num_rational/). Decimal uses a fixed-point representation with base 10 denominators, and Ratio represents rational numbers. Both implement `checked_div` to handle division by zero, which is not available for floats. Numbers in common use like 0.1 and 0.2 can be represented more intuitively with Decimal, and can be represented exactly with Ratio. Rounding oddities like `0.1 + 0.2 != 0.3`, which happen with floats in Rust, do not arise with Decimal (see https://0.30000000000000004.com/ ). With Ratio, the desired precision can be made explicit. With either Decimal or Ratio, although one still has to manage precision, the above make arithmetic easier to reason about.

### For expensive calls, consider using captchas or proof of work

#### Security concern

If an update or query call is expensive e.g. in terms of memory used or cycles consumed, this may make it easy for bots to render the canister unusable (e.g. by filling up it’s storage).

#### Recommendation

If the dApp offers such operations, consider bot prevention techniques such as adding Captchas or proof of work. There is e.g. a captcha implementation in [Internet Identity](https://github.com/dfinity/internet-identity).
