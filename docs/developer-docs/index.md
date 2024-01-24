# Introduction 

The **Internet Computer** is a blockchain that enables developers, organizations, and entrepreneurs to build and deploy secure, autonomous, and tamper-proof **[canisters](/how-it-works/canister-lifecycle)**, an evolution of **smart contracts**.

As a dapp developer, you might find it useful to think of the Internet Computer as providing the following key features:

-   A **globally-accessible, public blockchain** for running smart contracts at web speed, that can serve interactive web content to users. You can read more about the [architecture of ICP](/how-it-works/architecture-of-the-internet-computer). 

-   A secure cryptographic protocol (**[Internet Computer protocol](/how-it-works/core-ic-protocol-overview)**) run by nodes machines operated by independent node providers in independent data centers all over the world. This guarantees the secure execution of smart contracts. 

-   A **network of independent blockchains**, known as [subnets](/docs/current/concepts/nodes-subnets), connected using [chain-key cryptography](/how-it-works) that can [scale out](/how-it-works/scalability) its capacity as required.

#### Getting started
- [What is the Internet Computer?](/docs/current/concepts/what-is-ic)
- [Installing the IC SDK](/docs/current/developer-docs/setup/install/)
- [Creating a developer account](/docs/current/developer-docs/setup/accounts)
- Acquiring and managing cycles
    - [Getting started with free cycles](/docs/current/developer-docs/setup/cycles/cycles-faucet)
    - [Using a cycles wallet](/docs/current/developer-docs/setup/cycles/cycles-wallet)
    - [Converting ICP tokens into cycles](/docs/current/developer-docs/setup/cycles/converting_icp_tokens_into_cycles)
- [Creating your first canister](/docs/current/developer-docs/setup/first-canister)
- [Local deployment](/docs/current/developer-docs/setup/deploy-locally)
- [Mainnet deployment](/docs/current/developer-docs/setup/deploy-mainnet)
- [Sharing links to canisters](/docs/current/developer-docs/production/social-sharing)

#### Quickstart guides
- [Quickstart for React developers](/docs/current/developer-docs/setup/react-quickstart)

#### Core concepts
- [Canisters and code](/docs/current/concepts/canisters-code)
- [Paying for resources in cycles](/docs/current/developer-docs/gas-cost)
- [Cycles cost estimations and examples](/docs/current/developer-docs/cost-estimations-and-examples)
- [Neurons and governance](/docs/current/concepts/governance)
- [Nodes and subnet blockchains](/docs/current/concepts/nodes-subnets)
- [Subnet types](/docs/current/developer-docs/backend/subnet-types)
- [ICP tokens](/docs/current/concepts/tokens-cycles)
- [Trust in canisters](/docs/current/concepts/trust-in-canisters)
- [Glossary](/docs/current/references/glossary)
#### Canister smart contracts
- [Deploying and upgrading canisters](/docs/current/developer-docs/production/deploying-and-upgrading)
- [Managing canisters](/docs/current/developer-docs/setup/manage-canisters)
- [Topping up canisters](/docs/current/developer-docs/production/topping-up-canister)
    - [Using a cycles management service](/docs/current/developer-docs/setup/cycles/cycles_management_services)
- [Canister history](/docs/current/developer-docs/production/canister-history)
- [Canister recovery](/docs/current/developer-docs/production/canister-recovery)
- [Canister storage](/docs/current/developer-docs/production/storage)
- [Pulling canister dependencies](/docs/current/developer-docs/setup/pulling-canister-dependencies)
- [Composite queries](/docs/current/developer-docs/integrations/composite-query/)
- [Building with Motoko](/docs/current/developer-docs/backend/motoko/)
    - [1: Motoko fundamentals](/docs/current/developer-docs/backend/motoko/infrastructure)
    - [2: Project organization](/docs/current/developer-docs/backend/motoko/explore-templates)
    - [3: Developer environment](/docs/current/developer-docs/backend/motoko/dev-env)
    - [4: Motoko quickstart](/docs/current/developer-docs/backend/motoko/at-a-glance)
    - [5: Writing and deploying canisters](/docs/current/developer-docs/backend/motoko/deploying)
    - [6: Upgrading canisters](/docs/current/developer-docs/backend/motoko/upgrading)
    - [7: Making inter-canister calls](/docs/current/developer-docs/backend/motoko/intercanister-calls)
    - [8: Optimizing canisters](/docs/current/developer-docs/backend/motoko/optimizing)
    - [9: Importing library modules](/docs/current/developer-docs/backend/motoko/phonebook)
    - [10: Using integers in calculator functions](/docs/current/developer-docs/backend/motoko/calculator)
    - [11: Incrementing a natural number](/docs/current/developer-docs/backend/motoko/counter-tutorial)
    - [12: Passing text arguments](/docs/current/developer-docs/backend/motoko/hello-location)
    - [13: Accepting cycles from a wallet](/docs/current/developer-docs/backend/motoko/simple-cycles)
    - [14: Querying using an actor](/docs/current/developer-docs/backend/motoko/define-an-actor)
    - [15: Using multiple actors](/docs/current/developer-docs/backend/motoko/multiple-actors)
    - [16: Add access control with identities](/docs/current/developer-docs/backend/motoko/access-control)
    - [17: Using the Candid UI to test functions in a browser](/docs/current/developer-docs/backend/motoko/candid-ui)
    - [18: Scalable dapp example](/docs/current/developer-docs/backend/motoko/scalability-cancan)
    - [Motoko sample code and applications](/docs/current/developer-docs/backend/motoko/sample-apps)
    - [Generating Motoko documentation](/docs/current/developer-docs/backend/motoko/mo-doc)
- [Building with Rust](/docs/current/developer-docs/backend/rust/)
    - [1: Rust backend canister infrastructure](/docs/current/developer-docs/backend/rust/infrastructure)
    - [2: Project organization](/docs/current/developer-docs/backend/rust/project-organization)
    - [3: Developer environment](/docs/current/developer-docs/backend/rust/dev-env)
    - [4: Rust quickstart](/docs/current/developer-docs/backend/rust/quickstart)
    - [5: Writing and deploying canisters](/docs/current/developer-docs/backend/rust/deploying)
    - [6: Inter-canister calls](/docs/current/developer-docs/backend/rust/intercanister)
    - [7: Upgrading a canister](/docs/current/developer-docs/backend/rust/upgrading)
    - [8: Optimizing Rust canisters](/docs/current/developer-docs/backend/rust/optimizing)
    - [9: Incrementing a counter](/docs/current/developer-docs/backend/rust/counter)
    - [10: Using periodic timers](/docs/current/developer-docs/backend/rust/timers)
    - [11: Stable structures](/docs/current/developer-docs/backend/rust/stable-structures)
    - [12: Adding and searching simple records](/docs/current/developer-docs/backend/rust/searching-records)
    - [13: Access control](/docs/current/developer-docs/backend/rust/access-control)
    - [14: Using the Candid UI with a Rust canister](/docs/current/developer-docs/backend/rust/candid)
    - [Rust sample code and applications](/docs/current/developer-docs/backend/rust/samples)

#### Dapp developers
- [Choosing a programming language](/docs/current/developer-docs/backend/choosing-language)
- [Dapp design considerations](/docs/current/developer-docs/backend/design-dapps)
- [Periodic tasks and timers](/docs/current/developer-docs/backend/periodic-tasks)
- [Resource limits](/docs/current/developer-docs/production/resource-limits)
- [Large web assembly modules](/docs/current/developer-docs/production/larger-wasm)
- [Sample projects](/docs/current/samples/overview)
- [Host a website](/docs/current/samples/host-a-website)
- [Host a webgame](/docs/current/samples/host-a-webgame)

#### Exchanges and token developers
- [Introduction and overview](/docs/current/developer-docs/integrations/ledger/introduction_and_overview)
- ICP tokens
    - [ICP ledger](/docs/current/developer-docs/integrations/ledger/)
    - [Account trimming](/docs/current/developer-docs/integrations/ledger/collecting-dust)
    - [ICP ledger local setup](/docs/current/developer-docs/integrations/ledger/ledger-local-setup)
    - [Interacting with the ICP ledger](/docs/current/developer-docs/integrations/ledger/interact-with-ledger)
    - [ICP index local setup](/docs/current/developer-docs/integrations/ledger/icp-index-local-setup)
- ICRC-1 tokens
    - [ICRC-1 token standard](/docs/current/developer-docs/integrations/icrc-1/)
    - [ICRC-1 ledger setup](/docs/current/developer-docs/integrations/icrc-1/icrc1-ledger-setup)
    - [Interacting with a ICRC-1 ledger](/docs/current/developer-docs/integrations/icrc-1/interact-with-ICRC-1-ledger)
    - [ICRC-1 index local setup](/docs/current/developer-docs/integrations/icrc-1/icrc1-index-setup)
- [Exchange rate canister](/docs/current/developer-docs/integrations/exchange-rate/exchange-rate-canister)
- [Rosetta API](/docs/current/developer-docs/integrations/rosetta/)
    - [Hotkeys generation](/docs/current/developer-docs/integrations/rosetta/hotkeys)
    - [Neuron lifecycle](/docs/current/developer-docs/integrations/rosetta/neuron-lifecycle)
    - [Staking and neuron management](/docs/current/developer-docs/integrations/rosetta/staking-support)
    - [Rosetta staking](/docs/current/developer-docs/integrations/rosetta/staking-tutorial)
    - [Regular token transfers](/docs/current/developer-docs/integrations/rosetta/transfers)
- Asset custody
    - [Self-custody for digital assets](/docs/current/tokenomics/token-holders/custody-options-intro)
    - [Self-custody guide](/docs/current/tokenomics/token-holders/self-custody-quickstart)

#### Candid UI

- [What is Candid?](/docs/current/developer-docs/backend/candid/candid-concepts)
- [Using Candid](/docs/current/developer-docs/backend/candid/candid-howto)
- [Generating Candid files for Rust canisters](/docs/current/developer-docs/backend/candid/generating-candid)

#### Application frontends

- [Frontend canisters](/docs/current/developer-docs/frontend/)
- [Customizing a frontend](/docs/current/developer-docs/frontend/custom-frontend)
- [Adding a stylesheet](/docs/current/developer-docs/frontend/add-stylesheet)
- [Using a frontend boilerplate](/docs/current/developer-docs/frontend/boilerplate-frontend)
- [Deploy an existing frontend](/docs/current/developer-docs/frontend/existing-frontend)

#### Agents

- [Using external agents](/docs/current/developer-docs/agents/)
- [JavaScript agent](/docs/current/developer-docs/agents/javascript-intro)
- [NodeJS](/docs/current/developer-docs/agents/nodejs)
- [Rust agent](/docs/current/developer-docs/agents/ic-agent-dfinity)

#### Custom domains

- [Using custom domains](/docs/current/developer-docs/production/custom-domain/)
- [DNS configuration guide](/docs/current/developer-docs/production/custom-domain/dns-setup)

#### Developer tools

- [Motoko playground](/docs/current/developer-docs/setup/playground)
- [Managing projects](/docs/current/developer-docs/setup/manage-projects)
- [Using Visual Studio Code](/docs/current/developer-docs/setup/vs-code)

#### Bootcamps 

##### Developer journey

- Level 0: Pre-flight operations
    - [0.1 Overview of the Internet Computer](/docs/current/tutorials/developer-journey/level-0/ic-overview)
    - [0.2 Internet Computer terminology](/docs/current/tutorials/developer-journey/level-0/ic-terms)
    - [0.3 Developer environment setup](/docs/current/tutorials/developer-journey/level-0/dev-env)
    - [0.4 Introduction to canisters](/docs/current/tutorials/developer-journey/level-0/intro-canisters)
    - [0.5 Introduction to languages](/docs/current/tutorials/developer-journey/level-0/intro-languages)
    - [0.6 Introduction to dfx](/docs/current/tutorials/developer-journey/level-0/intro-dfx)

- Level 1: Space cadet
    - [1.1 Exploring a live demo](/docs/current/tutorials/developer-journey/level-1/1.1-live-demo)
    - [1.2 Motoko level 1](/docs/current/tutorials/developer-journey/level-1/1.2-motoko-lvl1)
    - [1.3 Developing your first dapp](/docs/current/tutorials/developer-journey/level-1/1.3-first-dapp)
    - [1.4 Acquiring and using cycles](/docs/current/tutorials/developer-journey/level-1/1.4-using-cycles)
    - [1.5 Deploying canisters](/docs/current/tutorials/developer-journey/level-1/1.5-deploying-canisters)
    - [1.6 Managing canisters](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters)


- Level 2: Space explorer
    - [2.1 Canister upgrades, storage, and persistence](/docs/current/tutorials/developer-journey/level-2/2.1-storage-persistence)
    - [2.2 Advanced canister calls](/docs/current/tutorials/developer-journey/level-2/2.2-advanced-canister-calls)
    - [2.3 Using third-party canisters](/docs/current/tutorials/developer-journey/level-2/2.3-third-party-canisters)
    - [2.4 Introduction to Candid](/docs/current/tutorials/developer-journey/level-2/2.4-intro-candid)
    - [2.5 Unit, integration, and end2end testing](/docs/current/tutorials/developer-journey/level-2/2.5-unit-testing)
    - [2.6 Motoko level 2](/docs/current/tutorials/developer-journey/level-2/2.6-motoko-lvl2)

- Level 3: Space engineer
    - [3.1 Motoko package managers](/docs/current/tutorials/developer-journey/level-3/3.1-package-managers)
    - [3.2 Using HTTPS outcalls](/docs/current/tutorials/developer-journey/level-3/3.2-https-outcalls)
    - [3.3 Certified data](/docs/current/tutorials/developer-journey/level-3/3.3-certified-data)
    - [3.4 Introduction to agents](/docs/current/tutorials/developer-journey/level-3/3.4-intro-to-agents)
    - [3.5 Identities and authentication](/docs/current/tutorials/developer-journey/level-3/3.5-identities-and-auth)
    - [3.6 Motoko level 3](/docs/current/tutorials/developer-journey/level-3/3.6-motoko-lvl3)

- Level 4: Space pilot
    - [4.1 Using the ICP ledger](/docs/current/tutorials/developer-journey/level-4/4.1-icp-ledger)
    - [4.2 ICRC-1 tokens](/docs/current/tutorials/developer-journey/level-4/4.2-icrc-tokens)
    - [4.3 ckBTC and Bitcoin integration](/docs/current/tutorials/developer-journey/level-4/4.3-ckbtc-and-bitcoin)
    - [4.4 NNS governance and staking](/docs/current/tutorials/developer-journey/level-4/4.4-nns-governance)
    - [4.5 Using quill](/docs/current/tutorials/developer-journey/level-4/4.5-using-quill)
    - [4.6 Motoko level 4](/docs/current/tutorials/developer-journey/level-4/4.6-motoko-lvl4)

- Level 5: Internet Computer astronaut
    - [5.1 Developing an encrypted notes dapp with vetKeys](/docs/current/tutorials/developer-journey/level-5/5.1-vetKeys-tutorial)
    - [5.2 Developing a dapp using the ICP Ethereum integration](/docs/current/tutorials/developer-journey/level-5/5.2-ICP-ETH-tutorial)
    - [5.3 Creating a decentralized token swap](/docs/current/tutorials/developer-journey/level-5/5.3-token-swap-tutorial)
    - [5.4 Creating NFTs on ICP](/docs/current/tutorials/developer-journey/level-5/5.4-NFT-tutorial)
    - [5.5 Creating an auction dapp](/docs/current/tutorials/developer-journey/level-5/5.5-auction-tutorial)
    - [5.6 Next steps](/docs/current/tutorials/developer-journey/level-5/5.6-next-steps)

##### Hackathon prep course
- [1: What is the Internet Computer?](/docs/current/tutorials//hackathon-prep-course/what-is-icp)
- [2: Deploying your first fullstack dapp](/docs/current/tutorials//hackathon-prep-course/deploying-first-fullstack-dapp)
- [3: Exploring the backend](/docs/current/tutorials//hackathon-prep-course/exploring-the-backend)
- [4: Exploring the frontend](/docs/current/tutorials//hackathon-prep-course/exploring-the-frontend)
- [5: Integrating with tokens](/docs/current/tutorials//hackathon-prep-course/integrating-with-tokens)
- [6: Authentication](/docs/current/tutorials//hackathon-prep-course/authentication)
- [7: Obtaining cycles](/docs/current/tutorials//hackathon-prep-course/obtaining-cycles)
- [8: Managing canisters](/docs/current/tutorials//hackathon-prep-course/managing-canisters)
- [9: Sample starter projects](/docs/current/tutorials//hackathon-prep-course/sample-starter-projects)
- [10: Resources to learn more](/docs/current/tutorials//hackathon-prep-course/resources)

#### Security best practices

- [General](/docs/current/developer-docs/security/general-security-best-practices)
- [Canister development](/docs/current/developer-docs/security/rust-canister-development-security-best-practices)
- [Web app development](/docs/current/developer-docs/security/web-app-development-security-best-practices)

#### Testing and troubleshooting

- [Testing canisters with PocketIC](/docs/current/developer-docs/setup/pocket-ic)
- [Staging environment](/docs/current/developer-docs/production/staging-environment)
- [Creating reproducible canister builds](/docs/current/developer-docs/backend/reproducible-builds)
- [Troubleshooting resources](/docs/current/developer-docs/backend/troubleshooting)

#### HTTPS outcalls

- [Overview](/docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-to-use)
- [HTTP outcalls: GET](/docs/current/developer-docs/integrations/https-outcalls/https-outcalls-get)
- [HTTP outcalls: POST](/docs/current/developer-docs/integrations/https-outcalls/https-outcalls-post)

#### Encryption and signatures 

- [Verifying signatures](/docs/current/developer-docs/integrations/independently-verifying-ic-signatures)
- [Threshold ECDSA](/docs/current/developer-docs/integrations/t-ecdsa/)
- vetKeys
    - [vetKeys API demo](/docs/current/developer-docs/integrations/vetkeys/using-vetkeys)

#### Internet Identity (II)

- [Overview](/docs/current/developer-docs/integrations/internet-identity/overview)
- [Alternative frontend origins](/docs/current/developer-docs/integrations/internet-identity/alternative-origins)
- [Internet Identity integration](/docs/current/developer-docs/integrations/internet-identity/integrate-identity)


#### Bitcoin integration

- [Overview](/docs/current/developer-docs/integrations/bitcoin/)
- [Chain-key Bitcoin (ckBTC)](/docs/current/developer-docs/integrations/bitcoin/ckbtc)
- [Developing Bitcoin dapps locally](/docs/current/developer-docs/integrations/bitcoin/local-development)

#### Network Nervous System (NNS)

- [NNS intro](/docs/current/tokenomics/nns/nns-intro)
- [NNS quickstart](/docs/current/tokenomics/token-holders/nns-app-quickstart)
- [Neurons' fund (NF)](/docs/current/tokenomics/nns/neurons-fund)
- [Staking and voting rewards](/docs/current/tokenomics/nns/nns-staking-voting-rewards)

#### Service Nervous System (SNS)

- Introduction to the SNS
    - [SNS introduction](/docs/current/developer-docs/integrations/sns/introduction/sns-intro-high-level)
    - [SNS architecture](/docs/current/developer-docs/integrations/sns/introduction/sns-architecture)
    - [SNS launch](/docs/current/developer-docs/integrations/sns/introduction/sns-launch)
    - [Alternatives how to get and maintain a DAO](/docs/current/developer-docs/integrations/sns/introduction/dao-alternatives)

- Preparing an SNS launch
    - [SNS preparation checklist](/docs/current/developer-docs/integrations/sns/tokenomics/sns-checklist)
    - [SNS predeployment considerations](/docs/current/developer-docs/integrations/sns/tokenomics/predeployment-considerations)
    - [SNS tokenomics](/docs/current/developer-docs/integrations/sns/tokenomics/tokenomics-intro)
    - [SNS rewards](/docs/current/developer-docs/integrations/sns/tokenomics/rewards)
    - [SNS initial parameters](/docs/current/developer-docs/integrations/sns/tokenomics/preparation)

- Integrating with an SNS
    - [SNS ledger canister](/docs/current/developer-docs/integrations/sns/integrating/ledger-integration)
    - [SNS index canister](/docs/current/developer-docs/integrations/sns/integrating/index-integration)
    - [SNS frontend integration](/docs/current/developer-docs/integrations/sns/integrating/frontend-integration)

- Testing an SNS
    - [Testing SNS locally](/docs/current/developer-docs/integrations/sns/testing/testing-locally)
    - [Testing on mainnet (SNS testflight)](/docs/current/developer-docs/integrations/sns/testing/testing-on-mainnet)

- Launching an SNS
    - [Stages of an SNS launch](/docs/current/developer-docs/integrations/sns/launching/launch-summary-1proposal)
    - [Commands & actions to go through SNS launch](/docs/current/developer-docs/integrations/sns/launching/launch-steps-1proposal)

- Managing an SNS
    - [SNS proposals](/docs/current/developer-docs/integrations/sns/managing/making-proposals)
    - [SNS cycle management](/docs/current/developer-docs/integrations/sns/managing/cycles-usage)
    - [SNS asset canisters](/docs/current/developer-docs/integrations/sns/managing/sns-asset-canister)
    - [Managing nervous system parameters](/docs/current/developer-docs/integrations/sns/managing/managing-nervous-system-parameters)
