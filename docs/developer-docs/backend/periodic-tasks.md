---
sidebar_position: 8
---
# Periodic tasks and timers

## Overview
Unlike other blockchains, the Internet Computer can automatically execute canister smart contracts after a specified delay or periodically.

There are two ways to schedule an automatic canister execution on the IC:

1. **Timers**: single-expiration or periodic canister calls with specified minimum timeout or interval.
2. **Heartbeats**: legacy periodic canister invocations with intervals close to the blockchain finalization rate (1s). Heartbeats are supported by the IC for backward compatibility and some very special use cases. **Newly developed canisters should prefer using timers over the heartbeats.**

## Timers

Timers are implemented on two layers:

- **The protocol level implementation:** the Internet Computer protocol supports minimalistic on-shot global timer per canister via `ic0.global_timer_set()` system API call and `canister_global_timer` handler (see the [Internet Computer interface specification](../../references/ic-interface-spec.md#timer)).
- **The CDK timers library level:** the library wraps the minimalistic protocol implementation, adding multiple and periodic timers on top. Canister developers can enjoy the familiar timers functionality using the CDK timers library for [Rust](https://crates.io/crates/ic-cdk-timers) or [Motoko](../../motoko/main/timers.md).

Internally the CDK timers library does the following:

1. The library keeps a global list of multiple and periodic tasks inside the canister.
2. Calls the `ic0.global_timer_set()` system API to schedule the next task from the list.
3. Implements the `canister_global_timer` method with the following logic:
   * For each expired task, the handler initiates a self canister call to isolate the tasks from each other and from the library code. Note, the [normal inter-canister call costs](../gas-cost.md) costs apply.
   * Reschedules periodic tasks at the end of their execution.
   * Calls the `ic0.global_timer_set()` system API to schedule the next task.

:::info
The library does not handle the canister upgrades. It is up to the canister developer to serialize the timers in the `canister_pre_upgrade` and reactivate the timers in the `canister_post_upgrade` method if needed.
:::

:::caution
For the code composability reasons, i.e. to be able to use different libraries with timers in a single project, canister developers are encouraged to use the CDK timers library over the protocol level API or the heartbeats.
:::

### Timers library limitations

Despite its superiority over the heartbeats, the CDK timers library has a few known shortcomings:

- **Canister upgrades:** the library keeps a global list of multiple and periodic tasks inside the canister heap. During the canister upgrade, a fresh WebAssembly state is created, all the timers are deactivated and the list of timers is cleared. It is up to the canister developer to serialize the timers in the `canister_pre_upgrade` and reactivate them in the `canister_post_upgrade` method if needed.
- **Self canister calls:** to isolate the tasks from each other and from the scheduling logic, CDK timers library initiates a self canister call to execute each task. There are a few implications:
   * Normal [inter-canister call costs](../gas-cost.md) apply to execute each task. Note, timers are [still more cost effective](https://github.com/dfinity/examples/tree/master/rust/periodic_tasks) than the heartbeats.
   * The tasks to execute are added at the end of the canister input queue. Depending on the canister and subnet load, the actual execution might be delayed.
   * As the canister output queue is limited in size (500 messages at the moment), this implicitly limits the number of tasks which might be scheduled in one round.
- **Advanced scheduling:** the CDK timers library uses relative time to schedule tasks. To use an absolute time, canister developers should calculate the duration between now and the point in time, or use a third party library.

## Heartbeats

Once an Internet Computer canister exports the `canister_heartbeat` function, it will be called every subnet heartbeat interval (see the [Internet Computer interface specification](../../references/ic-interface-spec.md#heartbeat)).

The only way to disable the heartbeats is to upgrade the canister to a version which does not export the `canister_heartbeat` method. Also, the heartbeat interval is implementation-defined, and there is no way to adjust it.

Because of those limitations, in most cases CDK timers library for [Rust](https://crates.io/crates/ic-cdk-timers) or [Motoko](../../motoko/main/timers.md) is a better option to schedule periodic tasks.

## Frequently asked questions

- #### Do timers support deterministic time slicing (DTS)?  
Yes, as the CDK timers library initiates a self canister call to execute each task, normal [update message instruction limits](../production/instruction-limits.md) apply with DTS enabled.

- #### What happens if a timer handler awaits for a call?  
Normal await point rules apply: any new execution can start at the await point: a new message, another timer handler or a heartbeat. Once that new execution is finished or reached its await point, the execution of the current timer handler might be resumed.

- #### What happens if a 1s periodic timer is executing for 2s?  
If there are no await points in the timer handler, the periodic timer will be rescheduled at the end of the execution. If there are await points, it's implementation-defined when the periodic timer is rescheduled.

## Tutorials and examples

### Tutorials and examples using Motoko

- **Motoko developer guide:** [Timers](../../motoko/main/timers.md).
- **Motoko developer guide:** [Heartbeats](../../motoko/main/heartbeats.md).

### Tutorials and examples using Rust

- **Backend tutorial:** [Using timers](rust/10-timers.md).
- **Example:** [Periodic tasks and timers](https://github.com/dfinity/examples/tree/master/rust/periodic_tasks) (compares the costs of timers and heartbeats).
