# Control

## Overview

A canister is managed by a list of controllers. A controller is specified by a principal, which can be self-authenticating, e.g. a `dfx` developer identity, or another canister. Canisters can have multiple controllers where each controller has the same administrative rights, or it has no controller, in which case the canister becomes immutable, or blackholed, and cannot be upgraded or deleted. 

## Setting the controllers of a canister

The controllers of a canister are set when the canister is created. If no explicit controller settings are specified, the default controller is the principal that created the canister. If the canister is created with `dfx` then the default controller list contains the developer identity and the principal of the associated cycles wallet canister.

## Update the controllers of a canister

The controllers of a canister can be updated by any of the existing controllers. To update the controllers with `dfx`, the following commands can be used:

### Add a controller

```sh
dfx canister update-settings CANISTER_NAME --add-controller CONTROLLER
```

### Remove a controller

```sh
dfx canister update-settings CANISTER_NAME --remove-controller CONTROLLER
```

### Set the controller

The following command sets only the specified controller and removes all other controllers:

```sh
dfx canister update-settings CANISTER_NAME --set-controller CONTROLLER
```

## Actions available only to controllers

- Stopping and starting the canister.
- Installing code in the canister.
- Upgrading the canister.
- Getting the status of the canister which includes its cycles balance, memory usage, and list of controllers.
- Deleting the canister.
- Updating settings like the freezing threshold, resource allocation, and controllers.

## Common control models

### Developer or team of developers

A canister is controlled by a single developer or a team of developers. Each developer has the same administrative rights over the canister. This is the most common control model for canisters in early development stages. This model can be made more secure by using a Hardware Security Module (HSM) to store the private key of the developer identity.

### MultiSig

A canister is controlled by a multi-signature canister. The multi-signature canister is controlled by a list of developers and requires a threshold number of signatures to perform administrative actions on the canister. This model is more secure than the single developer model, as it requires multiple developers to agree on an action before it can be performed. 

A canister that can be used for this purpose is the [Threshold canister](https://github.com/dfinity/threshold).

### Launchtrail

The [Launchtrail canister](https://github.com/spinner-cash/launchtrail) can be used to schedule the upgrade of a canister at a future time to give the public enough time to review the proposed changes. The canister also keeps a complete record of all actions and their execution results. The Launchtrail canister itself should be immutable without a controller.

###  Decentralized Autonomous Organization (DAO)

A canister is controlled by a DAO, and all upgrades and administrative actions are decided by a vote of the DAO members. The most common DAO model for applications on the Internet Computer is the [Service Nervous System (SNS)](/docs/developer-docs/integrations/sns/index.md).

The system canisters on ICP are controlled by the Network Nervous System (NNS) root canister, which allows administration of the canisters by NNS proposals.

Developers can also add the NNS root canister as a controller of their canister, to enable [recovery](/docs/developer-docs/production/canister-recovery.md) of the canister by NNS proposal if other control methods are lost.

### No controller

A canister has no controller and is immutable. On ICP this model is often called a blackholed canister. This is the model used by smart contracts on Ethereum.
