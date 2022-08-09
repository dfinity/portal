# Deploying & Upgrading Canisters

## Mechanics of a Deployment

During deployment, there are two main concerns: Canisters and code. The concern of canisters is all about where the code will end up running, and how to get it to the right place. The other concern is how code is managed so that there is no data loss, as little downtime as possible, and no misconfigurations. Since there are a lot of things to consider and many things that can go wrong during deployment, tools exist to make developers' lives easier. One such tool (which will be used as illustration on this page) is the DFINITY Canister Software Development Kit (SDK), whose CLI tool for managing deployments is called `dfx`.

### Canister lifecycle

The Internet Computer runs arbitrary WebAssembly modules in so-called canisters. For the first deployment, new canisters have to be created for every individual WebAssembly module that is supposed to run. On creation of those canisters, they will be assigned a canister ID. Since there is no central registry of canisters, the developers (or more likely their tools) have to keep track of those IDs. Once code is deployed to canisters, the canister IDs can be used to call functions on other canisters.

Canisters consume cycles while they're running. Performing computations costs cycles, but so does storing data. As long as a canister is supposed to be running it has to contain enough cycles to keep up operations. This again is a place where developers (or their tools) need to keep track of IDs and/or cycles balances. If a canister runs very low on cycles, it will be frozen (meaning it won't respond to update calls anymore), and if it runs out entirely, it will be deleted.

Not everyone is allowed to change a canister. Canisters all have a list of controllers that are allowed to update its settings, install/upgrade the running code or even delete the canister. Developers, automated tools, other canisters or nothing at all can be controllers. Depending on the goals for the canister, different combinations of controllers can make sense. The below section [Demonstrating Trust](#demonstrating-trust) explains more about that.

Once a canister is at the end of its lifecycle, it can be deleted. Before doing so, it is recommended that (one of) its owner(s) withdraws remaining cycles before they delete the canister. Otherwise those cycles are lost. Since withdrawing those cylces is a rather tedious process manually, tools are there to facilitate the process. The other option besides deleting the canister is to just leave it running until it gets deleted automatically.

### Deploying code

While canisters can run arbitrary WebAssembly (WASM) modules, the Internet Computer has a few conventions that make it easier to get the most out of its capabilities. For example, the function `canister_init` is the first function that gets called after the code is installed for the first time. To facilitate adhering to those conventions, Canister Development Kits (CDKs) exists for [many different languages](../build/languages/other-languages/other-languages-intro.md#developing-canisters-cdks).

To install code in a canister, the `install_code` function of the Internet Computer is used in one of three modes:
- The `install` mode is the one every canister starts with: it is only callable for canisters without any installed code and populates the canister with the supplied WASM module. Once installation is complete, the already mentioned function `canister_init` (usually exposed as `init` in CDKs) is called if it exists. This allows the code to perform any required setup before any calls arrive.
- The `reinstall` mode works almost the same as `install`, but if the canister already contains running code, its state is discarded and the running code is deleted. After that, the procedure from mode `install` is followed.
- The `upgrade` mode is the one used most often. This mode allows canister code to be changed without losing all of its state. In this mode, the canister first has the chance to save any state to stable memory in the `canister_pre_upgrade` (exposed as `pre_upgrade` in CDKs) function. After that, the new code is installed and instead of calling the init function, the `canister_post_upgrade` function (exposed as `post_ugrade` in CDKs) is run so that data can be loaded from stable memory.
All three `install_code` modes are atomic. If _anything_ goes wrong in one of the described steps, the canister state is reverted to its state before the `install_code` function was called. And in case anything is not clear enough from these explanations, the [IC Specification for `install_code`](../../references/ic-interface-spec.md#ic-install_code) is the official source of truth.

:::caution
Every function call on the Internet Computer has a limit to how many instructions can be executed. If your `pre_upgrade` function exceeds this limit, it will be canceled and the upgrade fails. This can make a canister un-upgradeable. The Wiki [contains some ideas](https://wiki.internetcomputer.org/wiki/Dealing_with_cycles_limit_exceeded_errors) how one can work around the cycles limit.
:::

When upgrading existing canisters, there are a few more things that one should keep in mind:
- *Outstanding callbacks*: If a canister is `await`ing a response from another canister, it can be upgraded in-between sending and receiving a response. If the code is installed in `upgrade` mode, the callback will be executed as if no upgrade has been made. If this should not happen, the canister should either first be stopped, or the code has to be uninstalled and then installed again.
- *Interface compatibility*: If canisters or scripts expect the upgraded canister to have a certain interface, upgrades can break existing workflows. DFX will warn the user (if possible) that the upgrade will break certain signatures, but there are always corner cases that may be missed.

## Things to consider

  * [Funding](#funding)
  * [Demonstrating Trust](#demonstrating-trust)

### Funding

Internet Computer Canisters are funded using a balance of cycles that will gradually burn down over time. You will be paying for the amount of memory you have allocated, as well as the CPU time that queries and updates take up.

Here is a checklist of the things you will need to consider:

- [ ] What will the canister's source of funds be?
  * Paid for up-front by the developer
  * Funded by donations from the community
  * Funded by ongoing revenue in ICP or cycles
- [ ] How will I monitor the canister's balance?
- [ ] What is your plan in case the balance runs low?
- [ ] What will happen if the balance runs out and the canister is eventually erased?

Depending on your use case, different answers will make sense for your application. Unlike other blockchains, where you assume that all content added is available forever, the Internet Computer requires you to think about the costs and sustainability of the computing resources that you are using.

An NFT project or DeFi canister may be able to self-fund by using transaction fees to purchase their own cycles. For other use cases, you may want a company or DAO to be responsible for supervising the balance. In any case, it is worthwhile to think about how you plan to ensure your canister's longevity.

### Demonstrating Trust

A big topic in the blockchain space is how users can trust the smart contracts they interact with. Depending on the kind of project you want to deploy, different levels of trust can be appropriate.

Here is a checklist of the things you will need to consider:

- [ ] How much trust does this project require?
- [ ] How can I demonstrate the canisters do what they are supposed to do?
  * The sections [Trust in Canisters](../../concepts/trust-in-canisters.md) and [Reproducible Builds](../build/backend/reproducible-builds.md) contain information related to this topic.
- [ ] How can users trust that the code will not suddenly change?
