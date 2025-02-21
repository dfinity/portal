const redirects = `

  # Redirects (from -> to)

  /apis/site/proxy /docs/references/http-gateway-protocol-spec
  /base-libraries/ /docs/motoko/main/base/
  /basics /what-is-the-ic
  /bitcoin /bitcoin-integration
  /bootcamp	/education-hub
  /community https://linktr.ee/icp_hubs_network
  /deck-main https://deck.internetcomputer.org
  /developers-guide.html /docs/tutorials/developer-liftoff/
  /developers-guide/quickstart.html /docs/tutorials/developer-liftoff/
  /developers-guide/quickstart /docs/tutorials/developer-liftoff/
  /developers /docs/home
  /docs-intro.html /docs/building-apps/getting-started/install
  /docs.html /docs/building-apps/getting-started/install
  /docs/backend/candid/generating-candid /docs/building-apps/developer-tools/cdks/rust/generating-candid
  /docs/base-libraries/ /docs/motoko/main/base/
  /docs/base-libraries/motoko-base/Text.html	/docs/motoko/main/base/Text
  /docs/blog/features/vetkey-primer	/blog/features/vetkey-primer

  ## Wildcards
  /docs/current/motoko/* /docs/motoko:splat
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/* /docs/building-apps/developer-tools/dfx:splat
  /docs/current/tutorials/developer-journey/* /docs/tutorials/developer-liftoff/:splat
  /docs/current/references/* /docs/references:splat
  /docs/current/developer-docs/security/security-best-practices/* /docs/building-apps/best-practices/security:splat

  ## Candid
  /docs/candid-guide/candid-concepts.html	/docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/candid-guide/candid-intro /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/candid-guide/candid-ref /docs/references/candid-ref
  /docs/candid-guide/candid-types.html	/docs/building-apps/interact-with-canisters/candid/using-candid/
  /docs/candid-guide/candid-types /docs/references/candid-ref
  /docs/candid-guide/candid /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/candid-guide /docs/building-apps/interact-with-canisters/candid/candid-concepts

  ## Concepts
  /docs/concepts/bitcoin-integration /bitcoin-integration
  /docs/concepts/canisters-code /docs/building-apps/essentials/canisters
  /docs/concepts/chain-key-technology/ /docs/building-apps/chain-fusion/overview
  /docs/concepts/concepts-intro.html	/docs/building-apps/essentials/network-overview
  /docs/concepts/data-centers /docs/building-apps/essentials/network-overview
  /docs/concepts /docs/building-apps/essentials/network-overview
  /docs/concepts/governance https://internetcomputer.zendesk.com/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/concepts/index /docs/building-apps/essentials/network-overview
  /docs/concepts/nodes-subnets /docs/building-apps/developing-canisters/create
  /docs/concepts/subnet-types /docs/building-apps/developing-canisters/create
  /docs/concepts/what-is-ic /docs/building-apps/essentials/network-overview

  ## Dev docs
  /docs/current/developer-docs/agents/ /docs/building-apps/interact-with-canisters/agents/overview
  /docs/current/developer-docs/agents/ic-agent-dfinity /docs/building-apps/interact-with-canisters/agents/rust-agent
  /docs/current/developer-docs/agents/javascript-intro /docs/building-apps/interact-with-canisters/agents/javascript-agent
  /docs/current/developer-docs/agents/nodejs /docs/building-apps/interact-with-canisters/agents/nodejs
  /docs/current/developer-docs/ai/ai-on-chain  /ecosystem
  /docs/current/developer-docs/ai/inference /ecosystem
  /docs/current/developer-docs/ai/machine-learning-sample /ecosystem
  /docs/current/developer-docs/ai/overview /ecosystem
  /docs/current/developer-docs/ai/samples /ecosystem
  /docs/current/developer-docs/ai/training-models /ecosystem
  /docs/current/developer-docs/backend/arguments /docs/building-apps/interact-with-canisters/advanced-calls

  ## Candid
  /docs/current/developer-docs/backend/candid/candid-concepts /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/backend/candid/candid-howto /docs/building-apps/interact-with-canisters/candid/using-candid
  /docs/current/developer-docs/backend/candid/ /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/backend/candid/generating-candid /docs/building-apps/developer-tools/cdks/rust/generating-candid
  /docs/current/developer-docs/backend/candid/index /docs/building-apps/interact-with-canisters/candid/candid-concepts

  /docs/current/developer-docs/backend/choosing-language /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/backend/design-dapps /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/backend /docs/building-apps/essentials/network-overview
  /docs/current/developer-docs/backend/eu-subnets /docs/building-apps/developing-canisters/create

  ## Motoko
  /docs/current/developer-docs/backend/motoko/0.11.0-migration-guide /docs/motoko/main/migration-guides/0.11.0-migration-guide
  /docs/current/developer-docs/backend/motoko/access-control /docs/motoko/main/writing-motoko/caller-id
  /docs/current/developer-docs/backend/motoko/at-a-glance /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/motoko/calculator /docs/motoko/main/writing-motoko/integers
  /docs/current/developer-docs/backend/motoko/candid-ui /docs/motoko/main/writing-motoko/candid-ui
  /docs/current/developer-docs/backend/motoko/counter-tutorial /docs/motoko/main/writing-motoko/local-objects-classes
  /docs/current/developer-docs/backend/motoko/define-an-actor /docs/motoko/main/writing-motoko/actors-async
  /docs/current/developer-docs/backend/motoko/deploying /docs/motoko/main/getting-started/quickstart
  /docs/current/developer-docs/backend/motoko/dev-env /docs/motoko/main/getting-started/dev-env
  /docs/current/developer-docs/backend/motoko/explore-templates /docs/motoko/main/getting-started/basic-concepts
  /docs/current/developer-docs/backend/motoko/hello-location /docs/motoko/main/writing-motoko/arguments
  /docs/current/developer-docs/backend/motoko/index.md /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/motoko/infrastructure /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/motoko/intercanister-calls /docs/motoko/main/writing-motoko/intercanister-calls
  /docs/current/developer-docs/backend/motoko/mo-doc /docs/motoko/main/reference/generating-docs
  /docs/current/developer-docs/backend/motoko/multiple-actors /docs/motoko/main/writing-motoko/actor-classes
  /docs/current/developer-docs/backend/motoko/optimizing /docs/motoko/main/canister-maintenance/optimization
  /docs/current/developer-docs/backend/motoko/phonebook /docs/motoko/main/writing-motoko/modules-and-imports
  /docs/current/developer-docs/backend/motoko/sample-apps  /samples
  /docs/current/developer-docs/backend/motoko/scalability-cancan /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/motoko/simple-cycles /docs/motoko/main/canister-maintenance/cycles
  /docs/current/developer-docs/backend/motoko/upgrading /docs/motoko/main/canister-maintenance/upgrades

  /docs/current/developer-docs/backend/periodic-tasks /docs/building-apps/network-features/periodic-tasks-timers
  /docs/current/developer-docs/backend/python/ https://demergent-labs.github.io/kybra/
  /docs/current/developer-docs/backend/reproducible-builds /docs/building-apps/best-practices/reproducible-builds
  /docs/current/developer-docs/backend/resource-limits /docs/building-apps/canister-management/resource-limits

  ## Rust
  /docs/current/developer-docs/backend/rust/candid /docs/building-apps/developer-tools/cdks/rust/candid
  /docs/current/developer-docs/backend/rust/counter /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/deploying /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/dev-env /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/generating-candid /docs/building-apps/developer-tools/cdks/rust/generating-candid
  /docs/current/developer-docs/backend/rust/index /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/infrastructure /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/intro-to-rust /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/optimizing /docs/building-apps/advanced/optimize/rust
  /docs/current/developer-docs/backend/rust/rust-considerations /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/rust-quickstart	/docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/samples /docs/building-apps/developer-tools/cdks/rust/intro-to-rust

  /docs/current/developer-docs/backend/solidity/ https://docs.bitfinity.network/
  /docs/current/developer-docs/backend/subnet-types /docs/building-apps/developing-canisters/create
  /docs/current/developer-docs/backend/troubleshooting /docs/building-apps/getting-started/troubleshooting
  /docs/current/developer-docs/backend/typescript/ https://demergent-labs.github.io/azle/
  /docs/current/developer-docs/best-practices/considerations-for-nft-devs /docs/defi/overview
  /docs/current/developer-docs/best-practices/	/docs/building-apps/best-practices/general

  ## Agents
  /docs/current/developer-docs/build/agents/agent-dfinity	/docs/building-apps/interact-with-canisters/agents/overview
  /docs/current/developer-docs/build/agents/ /docs/building-apps/interact-with-canisters/agents/overview
  /docs/current/developer-docs/build/agents/javascript/  /docs/building-apps/interact-with-canisters/agents/javascript-agent
  /docs/current/developer-docs/build/agents/javascript/javascript-intro /docs/building-apps/interact-with-canisters/agents/javascript-agent
  /docs/current/developer-docs/build/backend/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/build/backend/reproducible-builds /docs/building-apps/best-practices/reproducible-builds
  /docs/current/developer-docs/build/candid/candid-concepts /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/build/candid/candid-howto /docs/building-apps/interact-with-canisters/candid/using-candid
  /docs/current/developer-docs/build/candid/candid-intro /docs/building-apps/interact-with-canisters/candid/candid-concepts

  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/  /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/rust-quickstart /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/build/cdks/ /docs/building-apps/developer-tools/cdks/
  /docs/current/developer-docs/build/cdks/motoko-dfinity /docs/building-apps/developer-tools/cdks/
  /docs/current/developer-docs/build/cdks/motoko-dfinity/ /docs/motoko/main/base/
  /docs/current/developer-docs/build/cdks/motoko-dfinity/language-manual /docs/motoko/main/reference/language-manual
  /docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/build/ /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/build/frontend/default-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/build/frontend/webpack-config /docs/building-apps/frontends/using-an-asset-canister#modifying-the-webpack-configuration
  /docs/current/developer-docs/build/install-upgrade-remove /docs/building-apps/getting-started/install
  /docs/current/developer-docs/build/languages/candid/ /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/build/languages/motoko /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/build/languages/motoko/ /docs/motoko/main/base/
  /docs/current/developer-docs/build/languages/other-languages/ /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/build/languages/rust/ /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/build/languages/rust/rust-intro /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/build/languages/work-with-languages /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/build/project-setup/cycles-wallet /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/build/project-setup/design-dapps /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/build/project-setup/manage-canisters /docs/building-apps/canister-management/settings
  /docs/current/developer-docs/build/troubleshooting /docs/building-apps/getting-started/troubleshooting
  /docs/current/developer-docs/build/using-an-agent /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/chain-fusion/ethereum/siwe /docs/building-apps/authentication/overview
  /docs/current/developer-docs/cost-estimations-and-examples /docs/building-apps/essentials/cost-estimations-and-examples

  ## NNS & SNS
  /docs/current/developer-docs/daos/nns/concepts/neurons-fund https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/concepts/neurons/becoming-a-known-neuron https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/concepts/neurons/neuron-following https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/concepts/neurons/neuron-management https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/concepts/neurons/neuron-overview https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/concepts/neurons/staking-voting-rewards https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/concepts/proposals/direct-voting https://internetcomputer.zendesk.com/hc/en-us/articles/34084113508500-Proposals
  /docs/current/developer-docs/daos/nns/concepts/proposals/proposal-overview https://internetcomputer.zendesk.com/hc/en-us/articles/34084113508500-Proposals
  /docs/current/developer-docs/daos/nns/concepts/proposals/proposal-submit https://internetcomputer.zendesk.com/hc/en-us/articles/34084113508500-Proposals
  /docs/current/developer-docs/daos/nns/concepts/proposals/proposal-topics https://internetcomputer.zendesk.com/hc/en-us/articles/34140518658068-Proposal-Topics-and-Types
  /docs/current/developer-docs/daos/nns/concepts/proposals/verify-proposals https://internetcomputer.zendesk.com/hc/en-us/articles/34084113508500-Proposals
  /docs/current/developer-docs/daos/nns/overview https://internetcomputer.zendesk.com/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-app-quickstart https://internetcomputer.zendesk.com/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-additional-features https://internetcomputer.zendesk.com/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-advanced-neuron-operations https://internetcomputer.zendesk.com/hc/en-us/articles/34084179554196-Neurons-Fund-NF
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-following-other-neurons https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-importing-tokens https://internetcomputer.zendesk.com/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-making-neurons-public https://internetcomputer.zendesk.com/hc/en-us/articles/34140499557908-Neuron-Attributes
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-manage-quill-neurons https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-send-and-receive-tokens https://internetcomputer.zendesk.com/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-staking-a-neuron https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-voting-on-proposals https://internetcomputer.zendesk.com/hc/en-us/articles/34084113508500-Proposals
  /docs/current/developer-docs/daos/sns/launching/index /docs/building-apps/governing-apps/launching/
  /docs/current/developer-docs/daos/sns/launching/integrating /docs/building-apps/governing-apps/launching/integrating
  /docs/current/developer-docs/daos/sns/launching/launch-steps-1proposal /docs/building-apps/governing-apps/launching/launch-steps-1proposal
  /docs/current/developer-docs/daos/sns/launching/launch-summary-1proposal /docs/building-apps/governing-apps/launching/launch-summary-1proposal
  /docs/current/developer-docs/daos/sns/managing/cycles-usage /docs/building-apps/governing-apps/managing/cycles-usage
  /docs/current/developer-docs/daos/sns/managing/making-proposals /docs/building-apps/governing-apps/managing/making-proposals
  /docs/current/developer-docs/daos/sns/managing/manage-sns-intro /docs/building-apps/governing-apps/managing/manage-sns-intro
  /docs/current/developer-docs/daos/sns/managing/managing-nervous-system-parameters /docs/building-apps/governing-apps/managing/managing-nervous-system-parameters
  /docs/current/developer-docs/daos/sns/managing/sns-asset-canister /docs/building-apps/governing-apps/managing/sns-asset-canister
  /docs/current/developer-docs/daos/sns/overview /docs/building-apps/governing-apps/overview
  /docs/current/developer-docs/daos/sns/testing/testing-before-launch /docs/building-apps/governing-apps/testing/testing-before-launch
  /docs/current/developer-docs/daos/sns/testing/testing-locally /docs/building-apps/governing-apps/testing/testing-locally
  /docs/current/developer-docs/daos/sns/testing/testing-on-mainnet /docs/building-apps/governing-apps/testing/testing-on-mainnet
  /docs/current/developer-docs/daos/sns/tokenomics/index /docs/building-apps/governing-apps/tokenomics/
  /docs/current/developer-docs/daos/sns/tokenomics/predeployment-considerations /docs/building-apps/governing-apps/tokenomics/predeployment-considerations
  /docs/current/developer-docs/daos/sns/tokenomics/preparation /docs/building-apps/governing-apps/tokenomics/preparation
  /docs/current/developer-docs/daos/sns/tokenomics/rewards /docs/building-apps/governing-apps/tokenomics/rewards
  /docs/current/developer-docs/daos/sns/tokenomics/sns-checklist /docs/building-apps/governing-apps/tokenomics/sns-checklist
  /docs/current/developer-docs/daos/sns/tokenomics/tokenomics-intro /docs/building-apps/governing-apps/tokenomics/tokenomics-intro

  ## DeFi
  /docs/current/developer-docs/defi/asset-custody/custody-options /docs/defi/overview
  /docs/current/developer-docs/defi/asset-custody/hardware-wallet-cli /docs/defi/overview
  /docs/current/developer-docs/defi/asset-custody/self-custody-quickstart /docs/defi/overview
  /docs/current/developer-docs/defi/cycles/converting_icp_tokens_into_cycles /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/defi/cycles/cycles-ledger /docs/defi/token-ledgers/cycles-ledger
  /docs/current/developer-docs/defi/cycles/cycles-wallet /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/defi/dex/overview https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/developer-docs/defi/exchange-rate-canister/ /docs/references/system-canisters/
  /docs/current/developer-docs/defi/icp-tokens/account-trimming /docs/defi/account-trimming
  /docs/current/developer-docs/defi/icp-tokens/overview /docs/defi/token-standards/
  /docs/current/developer-docs/defi/icrc-1/icrc1-index-setup /docs/defi/token-indexes/
  /docs/current/developer-docs/defi/icrc-1/token-quickstart /docs/defi/create
  /docs/current/developer-docs/defi/nfts/considerations-for-nft-devs /docs/defi/overview
  /docs/current/developer-docs/defi/nfts/marketplaces https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/developer-docs/defi/nfts/nft-collections /docs/defi/nft-collections
  /docs/current/developer-docs/defi/nfts/overview https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/developer-docs/defi/overview /docs/defi/overview

  ## Rosetta
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/index /docs/defi/rosetta/icp_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/combine /docs/defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/derive /docs/defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/index /docs/defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/metadata /docs/defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/payloads /docs/defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/preprocess /docs/defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/submit /docs/defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/change_auto_stake_maturity /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/derive_neuron_id /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/disburse /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/dissolve /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/index /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/lock_neuron /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/neuron_info /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/spawn /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/stake_icp /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/stake_maturity /docs/defi/rosetta/icp_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/voting/follow /docs/defi/rosetta/icp_rosetta/construction_api/voting
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/voting/index /docs/defi/rosetta/icp_rosetta/construction_api/voting
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/voting/vote /docs/defi/rosetta/icp_rosetta/construction_api/voting
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/balances /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/blocks /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/get_pending_proposals /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/get_proposal_info /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/index /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/list_known_neurons /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/network /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/transactions /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/index /docs/defi/rosetta/icp_rosetta/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/approve /docs/defi/rosetta/icrc_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/index /docs/defi/rosetta/icrc_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/transfer /docs/defi/rosetta/icrc_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/index /docs/defi/rosetta/icrc_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/balances /docs/defi/rosetta/icrc_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/blocks /docs/defi/rosetta/icrc_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/index /docs/defi/rosetta/icrc_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/network /docs/defi/rosetta/icrc_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/transactions /docs/defi/rosetta/icrc_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/index /docs/defi/rosetta/icrc_rosetta/

  ## Tokens
  /docs/current/developer-docs/defi/tokens/advanced/direct_integration /docs/defi/token-integrations/
  /docs/current/developer-docs/defi/tokens/asset_flow/index /docs/defi/overview
  /docs/current/developer-docs/defi/tokens/create /docs/defi/create
  /docs/current/developer-docs/defi/tokens/indexes /docs/defi/token-indexes/
  /docs/current/developer-docs/defi/tokens/ledger/overview /docs/defi/overview
  /docs/current/developer-docs/defi/tokens/ledger/setup/icp_ledger_setup /docs/defi/token-ledgers/setup/icp_ledger_setup
  /docs/current/developer-docs/defi/tokens/ledger/setup/icrc1_ledger_setup /docs/defi/token-ledgers/setup/icrc1_ledger_setup
  /docs/current/developer-docs/defi/tokens/ledger/setup/overview /docs/defi/overview
  /docs/current/developer-docs/defi/tokens/ledger/usage/icp_ledger_usage /docs/defi/token-ledgers/usage/icp_ledger_usage
  /docs/current/developer-docs/defi/tokens/ledger/usage/icrc1_ledger_usage /docs/defi/token-ledgers/usage/icrc1_ledger_usage
  /docs/current/developer-docs/defi/tokens/ledger/usage/overview /docs/defi/overview
  /docs/current/developer-docs/defi/tokens/token-standards /docs/defi/token-standards/
  /docs/current/developer-docs/defi/wallets/overview https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/developer-docs/defi/wallets/self-custody/hardware-wallet-cli https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/developer-docs/defi/wallets/self-custody/self-custody-quickstart https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/developer-docs/defi/wallets/workflow /docs/defi/overview

  ## Dev tools
  /docs/current/developer-docs/deploy/computation-and-storage-costs /docs/building-apps/essentials/gas-cost
  /docs/current/developer-docs/deploy/custom-domain	/docs/building-apps/frontends/custom-domains/using-custom-domains
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/check-chunk-store /docs/building-apps/developer-tools/advanced-dfx/check-chunk-store
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/dfx-migration /docs/building-apps/developer-tools/advanced-dfx/dfx-migration
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/init-args /docs/building-apps/developer-tools/advanced-dfx/init-args
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/networks-json /docs/building-apps/developer-tools/advanced-dfx/networks-json
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/specifying-replica-version /docs/building-apps/developer-tools/advanced-dfx/specifying-replica-version
  /docs/current/developer-docs/developer-tools/cli-tools/dfx-json-reference /docs/building-apps/developer-tools/dfx-json-reference
  /docs/current/developer-docs/developer-tools/cli-tools/dfx-json /docs/building-apps/developer-tools/dfx-json
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm-init/dfxvm-init /docs/building-apps/developer-tools/dfxvm/
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-default /docs/building-apps/developer-tools/dfxvm/dfxvm-default
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-install /docs/building-apps/developer-tools/dfxvm/dfxvm-install
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-list /docs/building-apps/developer-tools/dfxvm/dfxvm-list
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-self-uninstall /docs/building-apps/developer-tools/dfxvm/
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-self-update /docs/building-apps/developer-tools/dfxvm/dfxvm-self-update
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-uninstall /docs/building-apps/developer-tools/dfxvm/dfxvm-uninstall
  /docs/current/developer-docs/developer-tools/cli-tools/networks-json /docs/building-apps/developer-tools/advanced-dfx/networks-json
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc-status https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-update-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-withdrawal-address https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/index https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-account-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-ckbtc https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-claim-neurons https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-generate https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-get-neuron-info https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-get-proposal-info https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-list-neurons https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-list-proposals https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-neuron-manage https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-neuron-stake https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-parent https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-public-ids https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-qr-code https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-replace-node-provider-id https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-scanner-qr-code https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-send https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-update-node-provider https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-configure-dissolve-delay https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-disburse-maturity https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-disburse https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-follow-neuron https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-get-sale-participation https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-get-swap-refund https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-list-deployed-snses https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-make-proposal https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-make-upgrade-canister-proposal https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-neuron-permission https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-new-sale-ticket https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-pay https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-register-vote https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-split-neuron https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-stake-maturity https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-stake-neuron https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-status https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns https://github.com/dfinity/quill/tree/master/docs/cli-reference

  /docs/current/developer-docs/developer-tools/ide/codespaces /docs/building-apps/developer-tools/ide/icp-ninja
  /docs/current/developer-docs/developer-tools/ide/gitpod /docs/building-apps/developer-tools/ide/icp-ninja
  /docs/current/developer-docs/developer-tools/ide/playground /docs/building-apps/developer-tools/ide/icp-ninja
  /docs/current/developer-docs/developer-tools/off-chain/agents/javascript-agent /docs/building-apps/interact-with-canisters/agents/javascript-agent
  /docs/current/developer-docs/developer-tools/off-chain/agents/nodejs /docs/building-apps/interact-with-canisters/agents/nodejs
  /docs/current/developer-docs/developer-tools/off-chain/agents/overview /docs/building-apps/interact-with-canisters/agents/overview
  /docs/current/developer-docs/developer-tools/off-chain/agents/rust-agent /docs/building-apps/interact-with-canisters/agents/rust-agent
  /docs/current/developer-docs/developer-tools/on-chain/cdks /docs/building-apps/developer-tools/cdks/
  /docs/current/developer-docs/frontend/add-stylesheet /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/boilerplate-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/default-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/existing-frontend /docs/building-apps/frontends/existing-frontend
  /docs/current/developer-docs/frontend/ /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/index /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/javascript-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/my-contacts /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/react-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/svelte-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/vue-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/functionality/ledger/ /docs/defi/token-ledgers/setup/icp_ledger_setup
  /docs/current/developer-docs/gas-cost /docs/building-apps/essentials/gas-cost

  ## Getting started
  /docs/current/developer-docs/getting-started/accounts /docs/building-apps/getting-started/identities
  /docs/current/developer-docs/getting-started/cycles/cycles-wallet /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/getting-started/cycles/cycles_management_services /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/getting-started/cycles/overview /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/getting-started/default-template /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/getting-started/deploy/local /docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/getting-started/deploy/testnet /docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/getting-started/development-workflow /docs/building-apps/getting-started/install
  /docs/current/developer-docs/getting-started/explore-examples /docs/building-apps/developer-tools/ide/icp-ninja
  /docs/current/developer-docs/getting-started/ /docs/building-apps/essentials/network-overview
  /docs/current/developer-docs/getting-started/hello-world /docs/building-apps/developing-canisters/write
  /docs/current/developer-docs/getting-started/identities /docs/building-apps/getting-started/identities
  /docs/current/developer-docs/getting-started/install /docs/building-apps/getting-started/install
  /docs/current/developer-docs/getting-started/juno-quickstart https://juno.build/docs/intro
  /docs/current/developer-docs/getting-started/network-overview /docs/building-apps/essentials/network-overview
  /docs/current/developer-docs/getting-started/overview-of-icp /docs/building-apps/essentials/network-overview
  /docs/current/developer-docs/getting-started/quickstart /docs/building-apps/getting-started/quickstart
  /docs/current/developer-docs/getting-started/react-quickstart /docs/building-apps/getting-started/quickstart
  /docs/current/developer-docs/getting-started/tokens-and-cycles /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/getting-started/write-canister-code /docs/building-apps/developing-canisters/write

  /docs/current/developer-docs/http-compatible-canisters/custom-http-canisters /docs/building-apps/network-features/using-http/http-certification/custom-http-canisters
  /docs/current/developer-docs/http-compatible-canisters/serving-json-over-http /docs/building-apps/network-features/using-http/http-certification/serving-json-over-http
  /docs/current/developer-docs/http-compatible-canisters/serving-static-assets-over-http  /docs/building-apps/network-features/using-http/http-certification/serving-static-assets-over-http
  /docs/current/developer-docs/ic-overview /docs/building-apps/essentials/network-overview

  ## Authentication
  /docs/current/developer-docs/identity/authentication/email-password /docs/building-apps/authentication/overview
  /docs/current/developer-docs/identity/authentication/msq /docs/building-apps/authentication/overview
  /docs/current/developer-docs/identity/authentication/nfid /docs/building-apps/authentication/overview
  /docs/current/developer-docs/identity/authentication/overview /docs/building-apps/authentication/overview
  /docs/current/developer-docs/identity/authentication/siwb /docs/building-apps/authentication/overview
  /docs/current/developer-docs/identity/authentication/siwe /docs/building-apps/authentication/overview
  /docs/current/developer-docs/identity/authentication/siws /docs/building-apps/authentication/overview
  /docs/current/developer-docs/identity/internet-identity/alternative-origins /docs/building-apps/authentication/alternative-origins
  /docs/current/developer-docs/identity/internet-identity/creating-ii /docs/building-apps/authentication/overview
  /docs/current/developer-docs/identity/internet-identity/integrate-internet-identity /docs/building-apps/authentication/integrate-internet-identity
  /docs/current/developer-docs/identity/internet-identity/overview /docs/building-apps/authentication/overview
  /docs/current/developer-docs/identity/verifiable-credentials/how-it-works /docs/building-apps/network-features/verifiable-credentials/how-it-works
  /docs/current/developer-docs/identity/verifiable-credentials/issuer /docs/building-apps/network-features/verifiable-credentials/issuer
  /docs/current/developer-docs/identity/verifiable-credentials/overview /docs/building-apps/network-features/verifiable-credentials/overview
  /docs/current/developer-docs/identity/verifiable-credentials/relying-party /docs/building-apps/network-features/verifiable-credentials/relying-party
  /docs/current/developer-docs/index /docs/building-apps/essentials/network-overview

  ## Integrations
  /docs/current/developer-docs/integrations/bitcoin/bitcoin-how-it-works /docs/references/bitcoin-how-it-works
  /docs/current/developer-docs/integrations/bitcoin/ckbtc-reference /docs/references/ckbtc-reference
  /docs/current/developer-docs/integrations/bitcoin/ckbtc /docs/defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/integrations/bitcoin/ /docs/building-apps/chain-fusion/bitcoin/overview
  /docs/current/developer-docs/integrations/bitcoin/index /docs/building-apps/chain-fusion/bitcoin/overview
  /docs/current/developer-docs/integrations/bitcoin/local-development /docs/building-apps/chain-fusion/bitcoin/using-btc/local-development
  /docs/current/developer-docs/integrations/bitcoin/read-state /docs/building-apps/chain-fusion/bitcoin/using-btc/read-state
  /docs/current/developer-docs/integrations/bitcoin/submit-transactions /docs/building-apps/chain-fusion/bitcoin/using-btc/submit-transactions
  /docs/current/developer-docs/integrations/composite-query /docs/building-apps/interact-with-canisters/query-calls
  /docs/current/developer-docs/integrations /docs/building-apps/essentials/network-overview
  /docs/current/developer-docs/integrations/ethereum/evm-rpc /docs/building-apps/chain-fusion/ethereum/evm-rpc/evm-rpc-canister
  /docs/current/developer-docs/integrations/ethereum/overview /docs/building-apps/chain-fusion/ethereum/overview
  /docs/current/developer-docs/integrations/ethereum/siwe /docs/building-apps/authentication/overview
  /docs/current/developer-docs/integrations/exchange-rate/exchange-rate-canister /docs/references/system-canisters/
  /docs/current/developer-docs/integrations/https-outcalls /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-get /docs/building-apps/network-features/using-http/https-outcalls/get
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-it-works /docs/references/https-outcalls-how-it-works
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-to-use /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-overview /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-post /docs/building-apps/network-features/using-http/https-outcalls/post
  /docs/current/developer-docs/integrations/https-outcalls/index /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/integrations/http_requests/http_requests-how-it-works /docs/references/https-outcalls-how-it-works
  /docs/current/developer-docs/integrations/icrc-1/deploy-new-token /docs/defi/create
  /docs/current/developer-docs/integrations/icrc-1/ /docs/references/icrc1-standard
  /docs/current/developer-docs/integrations/icrc-1/icrc1-index-setup /docs/defi/token-indexes/
  /docs/current/developer-docs/integrations/icrc-1/icrc1-ledger-setup /docs/defi/token-ledgers/setup/icrc1_ledger_setup
  /docs/current/developer-docs/integrations/icrc-1/index /docs/references/icrc1-standard
  /docs/current/developer-docs/integrations/icrc-1/interact-with-ICRC-1-ledger /docs/defi/token-ledgers/usage/icrc1_ledger_usage
  /docs/current/developer-docs/integrations/independently-verifying-ic-signatures /docs/building-apps/network-features/signatures/independently-verifying-ic-signatures
  /docs/current/developer-docs/integrations/index /docs/building-apps/essentials/network-overview
  /docs/current/developer-docs/integrations/internet-identity/alternative-origins /docs/building-apps/authentication/alternative-origins
  /docs/current/developer-docs/integrations/internet-identity/creating-ii /docs/building-apps/authentication/overview
  /docs/current/developer-docs/integrations/internet-identity	/docs/building-apps/authentication/overview
  /docs/current/developer-docs/integrations/internet-identity/integrate-identity /docs/building-apps/authentication/integrate-internet-identity
  /docs/current/developer-docs/integrations/internet-identity/overview  /docs/building-apps/authentication/overview
  /docs/current/developer-docs/integrations/ledger/collecting-dust /docs/defi/account-trimming
  /docs/current/developer-docs/integrations/ledger/deploy-new-token /docs/defi/create
  /docs/current/developer-docs/integrations/ledger/  /docs/defi/overview
  /docs/current/developer-docs/integrations/ledger/icp-index-local-setup /docs/defi/token-indexes/
  /docs/current/developer-docs/integrations/ledger/interact-with-ledger  /docs/defi/token-ledgers/usage/icp_ledger_usage
  /docs/current/developer-docs/integrations/ledger/introduction_and_overview /docs/defi/overview
  /docs/current/developer-docs/integrations/ledger/ledger-local-setup  /docs/defi/token-ledgers/setup/icp_ledger_setup
  /docs/current/developer-docs/integrations/multi-chain/ckbtc-faq /docs/defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/integrations/multi-chain/ckerc20-faq /docs/defi/chain-key-tokens/ckerc20/overview
  /docs/current/developer-docs/integrations/multi-chain/cketh-faq /docs/defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/integrations/multi-chain/signatures-faq /docs/references/t-sigs-how-it-works
  /docs/current/developer-docs/integrations/multi-chain/user-faq /docs/building-apps/chain-fusion/overview
  /docs/current/developer-docs/integrations/rosetta/  /docs/defi/overview
  /docs/current/developer-docs/integrations/rosetta/index  /docs/defi/overview
  /docs/current/developer-docs/integrations/rosetta/staking-support /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/integrations/rosetta/staking-tutorial/ /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/integrations/sns/ /docs/building-apps/governing-apps/overview
  /docs/current/developer-docs/integrations/sns/integrating/ /docs/building-apps/governing-apps/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/frontend-integration /docs/building-apps/governing-apps/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/index-integration /docs/building-apps/governing-apps/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/ledger-integration /docs/building-apps/governing-apps/launching/integrating
  /docs/current/developer-docs/integrations/sns/introduction/dao-alternatives /docs/building-apps/governing-apps/overview
  /docs/current/developer-docs/integrations/sns/introduction/sns-architecture /docs/building-apps/governing-apps/overview
  /docs/current/developer-docs/integrations/sns/introduction/sns-intro-high-level /docs/building-apps/governing-apps/overview
  /docs/current/developer-docs/integrations/sns/introduction/sns-launch /docs/building-apps/governing-apps/overview
  /docs/current/developer-docs/integrations/sns/launching/ /docs/building-apps/governing-apps/launching/
  /docs/current/developer-docs/integrations/sns/launching/launch-steps-1proposal /docs/building-apps/governing-apps/launching/launch-steps-1proposal
  /docs/current/developer-docs/integrations/sns/launching/launch-steps /docs/building-apps/governing-apps/launching/launch-steps-1proposal
  /docs/current/developer-docs/integrations/sns/launching/launch-summary-1proposal  /docs/building-apps/governing-apps/launching/launch-summary-1proposal
  /docs/current/developer-docs/integrations/sns/launching/launch-summary /docs/building-apps/governing-apps/launching/launch-summary-1proposal
  /docs/current/developer-docs/integrations/sns/managing/cycles-usage /docs/building-apps/governing-apps/managing/cycles-usage
  /docs/current/developer-docs/integrations/sns/managing/making-proposals /docs/building-apps/governing-apps/managing/making-proposals
  /docs/current/developer-docs/integrations/sns/managing/manage-sns-intro /docs/building-apps/governing-apps/managing/manage-sns-intro
  /docs/current/developer-docs/integrations/sns/managing/managing-nervous-system-parameters /docs/building-apps/governing-apps/managing/managing-nervous-system-parameters
  /docs/current/developer-docs/integrations/sns/managing/sns-asset-canister /docs/building-apps/governing-apps/managing/sns-asset-canister
  /docs/current/developer-docs/integrations/sns/testing/testing-before-launch /docs/building-apps/governing-apps/testing/testing-before-launch
  /docs/current/developer-docs/integrations/sns/testing/testing-locally /docs/building-apps/governing-apps/testing/testing-locally
  /docs/current/developer-docs/integrations/sns/testing/testing-on-mainnet /docs/building-apps/governing-apps/testing/testing-on-mainnet
  /docs/current/developer-docs/integrations/sns/tokenomics/ /docs/building-apps/governing-apps/tokenomics/
  /docs/current/developer-docs/integrations/sns/tokenomics/predeployment-considerations  /docs/building-apps/governing-apps/tokenomics/predeployment-considerations
  /docs/current/developer-docs/integrations/sns/tokenomics/preparation /docs/building-apps/governing-apps/tokenomics/preparation
  /docs/current/developer-docs/integrations/sns/tokenomics/rewards /docs/building-apps/governing-apps/tokenomics/rewards
  /docs/current/developer-docs/integrations/sns/tokenomics/sns-checklist /docs/building-apps/governing-apps/tokenomics/sns-checklist
  /docs/current/developer-docs/integrations/sns/tokenomics/tokenomics-intro  /docs/building-apps/governing-apps/tokenomics/tokenomics-intro
  /docs/current/developer-docs/integrations/sns/tokenomics/tokenomics /docs/building-apps/governing-apps/tokenomics/tokenomics-intro
  /docs/current/developer-docs/integrations/storage/cost /docs/building-apps/essentials/gas-cost
  /docs/current/developer-docs/integrations/t-ecdsa /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/integrations/t-ecdsa/t-ecdsa-how-it-works /docs/references/t-sigs-how-it-works
  /docs/current/developer-docs/integrations/vetkeys/ /docs/building-apps/network-features/encryption/vetkeys
  /docs/current/developer-docs/integrations/vetkeys/technology-overview /docs/references/vetkeys-overview
  /docs/current/developer-docs/integrations/vetkeys/using-vetkeys /docs/building-apps/network-features/encryption/using-vetkeys
  /docs/current/developer-docs/local-quickstart /docs/building-apps/getting-started/install

  ## Chain Fusion
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc /docs/defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc/making-transactions /docs/defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc/overview /docs/defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc/using-ckbtc-in-dapps /docs/defi/chain-key-tokens/ckbtc/using-ckbtc-in-dapps
  /docs/current/developer-docs/multi-chain/bitcoin/local-development /docs/building-apps/chain-fusion/bitcoin/using-btc/local-development
  /docs/current/developer-docs/multi-chain/bitcoin/overview /docs/building-apps/chain-fusion/bitcoin/overview
  /docs/current/developer-docs/multi-chain/bitcoin/read-state /docs/building-apps/chain-fusion/bitcoin/using-btc/read-state
  /docs/current/developer-docs/multi-chain/bitcoin/submit-transactions /docs/building-apps/chain-fusion/bitcoin/using-btc/submit-transactions
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/btc-comparison /docs/building-apps/chain-fusion/bitcoin/using-btc/btc-comparison
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/btc-dev-workflow /docs/building-apps/chain-fusion/bitcoin/using-btc/btc-dev-workflow
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/create-transactions /docs/building-apps/chain-fusion/bitcoin/using-btc/create-transactions
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/generate-addresses /docs/building-apps/chain-fusion/bitcoin/using-btc/generate-addresses
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/local-development /docs/building-apps/chain-fusion/bitcoin/using-btc/local-development
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/ordinals /docs/building-apps/chain-fusion/bitcoin/using-btc/ordinals
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/read-state /docs/building-apps/chain-fusion/bitcoin/using-btc/read-state
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/runes /docs/building-apps/chain-fusion/bitcoin/using-btc/runes
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/sign-transactions /docs/building-apps/chain-fusion/bitcoin/using-btc/sign-transactions
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/submit-transactions /docs/building-apps/chain-fusion/bitcoin/using-btc/submit-transactions
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/making-transactions /docs/defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/overview /docs/defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/using-ckbtc-in-dapps /docs/defi/chain-key-tokens/ckbtc/using-ckbtc-in-dapps
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckerc20/creating-new-ckerc20 /docs/defi/chain-key-tokens/ckerc20/creating-new-ckerc20
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckerc20/making-transactions /docs/defi/chain-key-tokens/ckerc20/making-transactions
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckerc20/overview /docs/defi/chain-key-tokens/ckerc20/overview
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckerc20/using-ckerc20-in-dapps /docs/defi/chain-key-tokens/ckerc20/using-ckerc20-in-dapps
  /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/making-transactions /docs/defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/overview /docs/defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/using-cketh-in-dapps /docs/defi/chain-key-tokens/cketh/using-cketh-in-dapps
  /docs/current/developer-docs/multi-chain/chain-key-tokens/overview /docs/defi/chain-key-tokens/overview
  /docs/current/developer-docs/multi-chain/ethereum/cketh/making-transactions /docs/defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/ethereum/cketh/overview /docs/defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/ethereum/cketh/using-cketh-in-dapps /docs/defi/chain-key-tokens/cketh/using-cketh-in-dapps
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/costs /docs/building-apps/chain-fusion/ethereum/evm-rpc/costs
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/evm-rpc-canister /docs/building-apps/chain-fusion/ethereum/evm-rpc/evm-rpc-canister
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/how-it-works /docs/building-apps/chain-fusion/ethereum/evm-rpc/how-it-works
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/overview /docs/building-apps/chain-fusion/ethereum/evm-rpc/overview
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/samples /docs/building-apps/chain-fusion/ethereum/evm-rpc/samples
  /docs/current/developer-docs/multi-chain/ethereum/overview /docs/building-apps/chain-fusion/ethereum/overview
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/eth-comparison /docs/building-apps/chain-fusion/ethereum/using-eth/eth-comparison
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/eth-dev-workflow /docs/building-apps/chain-fusion/ethereum/using-eth/eth-dev-workflow
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/generating-addresses /docs/building-apps/chain-fusion/ethereum/using-eth/generating-addresses
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/signing-transactions /docs/building-apps/chain-fusion/ethereum/using-eth/signing-transactions
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/siwe /docs/building-apps/authentication/overview
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/submit-transactions /docs/building-apps/chain-fusion/ethereum/using-eth/submit-transactions
  /docs/current/developer-docs/multi-chain/examples /docs/building-apps/chain-fusion/examples
  /docs/current/developer-docs/multi-chain/faq/ckbtc-faq /docs/defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/faq/ckerc20-faq /docs/defi/chain-key-tokens/ckerc20/overview
  /docs/current/developer-docs/multi-chain/faq/cketh-faq /docs/defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/faq/signatures-faq /docs/references/t-sigs-how-it-works
  /docs/current/developer-docs/multi-chain/faq/user-faq /docs/building-apps/chain-fusion/overview
  /docs/current/developer-docs/multi-chain/overview /docs/building-apps/chain-fusion/overview
  /docs/current/developer-docs/multi-chain/supported-chains /docs/building-apps/chain-fusion/supported-chains
  /docs/current/developer-docs/multi-chain/using-eth/evm-rpc/evm-rpc /docs/building-apps/chain-fusion/ethereum/evm-rpc/evm-rpc-canister
  /docs/current/developer-docs/multichain/ethereum/cketh /docs/defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/overview/ /docs/building-apps/essentials/network-overview

  /docs/current/developer-docs/production/best-practices /docs/building-apps/best-practices/general
  /docs/current/developer-docs/production/canister-history /docs/building-apps/canister-management/history
  /docs/current/developer-docs/production/canister-recovery /docs/building-apps/canister-management/recovery
  /docs/current/developer-docs/production/computation-and-storage-costs /docs/building-apps/essentials/gas-cost
  /docs/current/developer-docs/production/custom-domain/dns-setup /docs/building-apps/frontends/custom-domains/dns-setup
  /docs/current/developer-docs/production/custom-domain/ /docs/building-apps/frontends/custom-domains/using-custom-domains
  /docs/current/developer-docs/production/deploying-and-upgrading /docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/production/instruction-limits /docs/building-apps/canister-management/resource-limits
  /docs/current/developer-docs/production/larger-wasm /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/production/resource-limits /docs/building-apps/canister-management/resource-limits
  /docs/current/developer-docs/production/social-sharing /docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/production/staging-environment /docs/building-apps/developing-canisters/create
  /docs/current/developer-docs/production/storage /docs/building-apps/canister-management/storage
  /docs/current/developer-docs/production/system-canisters /docs/references/system-canisters/
  /docs/current/developer-docs/production/topping-up-canister/ /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/quickstart/cycles-faucet /docs/building-apps/getting-started/tokens-and-cycles

  ## Quickstart
  /docs/current/developer-docs/quickstart/ /docs/tutorials/developer-liftoff/
  /docs/current/developer-docs/quickstart/hello10mins/ /docs/tutorials/developer-liftoff/
  /docs/current/developer-docs/quickstart/windows-wsl /docs/building-apps/getting-started/install

  ## Security
  /docs/current/developer-docs/security /docs/building-apps/best-practices/security/inter-canister-calls
  /docs/current/developer-docs/security/formal-verification /docs/building-apps/best-practices/security/formal-verification
  /docs/current/developer-docs/security/general-security-best-practices /docs/building-apps/best-practices/security/overview
  /docs/current/developer-docs/security/index /docs/building-apps/best-practices/security/inter-canister-calls
  /docs/current/developer-docs/security/rust-canister-development-security-best-practices /docs/building-apps/best-practices/security/inter-canister-calls

  ## Setup
  /docs/current/developer-docs/setup/accounts /docs/building-apps/getting-started/identities
  /docs/current/developer-docs/setup/best-practices/architecture /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/setup/best-practices/general /docs/building-apps/best-practices/general
  /docs/current/developer-docs/setup/best-practices/storage /docs/building-apps/best-practices/storage
  /docs/current/developer-docs/setup/best-practices/troubleshooting /docs/building-apps/best-practices/troubleshooting
  /docs/current/developer-docs/setup/build /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/setup/cycles/converting_icp_tokens_into_cycles /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/setup/cycles/cycles-faucet.md	/docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/setup/cycles/cycles-faucet /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/setup/cycles/cycles-wallet /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/setup/cycles /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/setup/cycles/index /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/setup/default-wallet /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/setup/delete /docs/building-apps/canister-management/delete
  /docs/current/developer-docs/setup/deploy-locally /docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/setup/deploy-mainnet.md	/docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/setup/deploy-mainnet /docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/setup/deploy /docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/setup/development-workflow /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup/first-canister /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/setup/hello-world /docs/building-apps/developing-canisters/write
  /docs/current/developer-docs/setup/ic-admin /docs/home
  /docs/current/developer-docs/setup/index.md	/docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup/index /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup/install/ /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup/install/index.mdx /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup/manage-canisters /docs/building-apps/canister-management/settings
  /docs/current/developer-docs/setup/manage-projects /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/setup/playground /docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/setup/pocket-ic /docs/building-apps/advanced/test/pocket-ic
  /docs/current/developer-docs/setup/pulling-canister-dependencies /docs/building-apps/advanced/using-third-party-canisters
  /docs/current/developer-docs/setup/react-quickstart /docs/building-apps/getting-started/quickstart
  /docs/current/developer-docs/setup/state /docs/building-apps/canister-management/state
  /docs/current/developer-docs/setup/upgrade /docs/building-apps/canister-management/upgrade
  /docs/current/developer-docs/setup/vs-code /docs/building-apps/developer-tools/ide/icp-ninja

  ## Smart contracts
  /docs/current/developer-docs/smart-contracts/advanced-features/async-code /docs/building-apps/interact-with-canisters/advanced-calls
  /docs/current/developer-docs/smart-contracts/advanced-features/composite-query /docs/building-apps/interact-with-canisters/query-calls
  /docs/current/developer-docs/smart-contracts/advanced-features/handling-get-post-requests /docs/building-apps/network-features/using-http/http-certification/gateways
  /docs/current/developer-docs/smart-contracts/advanced-features/http-gateways /docs/building-apps/network-features/using-http/http-certification/gateways
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/ /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-get /docs/building-apps/network-features/using-http/https-outcalls/get
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-how-to-use /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-overview /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-post /docs/building-apps/network-features/using-http/https-outcalls/post
  /docs/current/developer-docs/smart-contracts/advanced-features/management-canister /docs/references/system-canisters/management-canister
  /docs/current/developer-docs/smart-contracts/advanced-features/periodic-tasks /docs/building-apps/network-features/periodic-tasks-timers
  /docs/current/developer-docs/smart-contracts/advanced-features/query-stats /docs/building-apps/interact-with-canisters/query-calls
  /docs/current/developer-docs/smart-contracts/advanced-features/randomness /docs/building-apps/network-features/randomness
  /docs/current/developer-docs/smart-contracts/advanced-features/serving-http-request /docs/building-apps/network-features/using-http/http-certification/gateways
  /docs/current/developer-docs/smart-contracts/advanced-features/simd /docs/building-apps/network-features/simd
  /docs/current/developer-docs/smart-contracts/advanced-features/system-canisters /docs/references/system-canisters/
  /docs/current/developer-docs/smart-contracts/advanced-features/threshold-signing /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/advanced-features/time-and-timestamps /docs/building-apps/network-features/time-and-timestamps
  /docs/current/developer-docs/smart-contracts/best-practices/architecture /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/smart-contracts/best-practices/general /docs/building-apps/best-practices/general
  /docs/current/developer-docs/smart-contracts/best-practices/idempotency /docs/building-apps/best-practices/idempotency
  /docs/current/developer-docs/smart-contracts/best-practices/reproducible-builds /docs/building-apps/best-practices/reproducible-builds
  /docs/current/developer-docs/smart-contracts/best-practices/storage /docs/building-apps/best-practices/storage
  /docs/current/developer-docs/smart-contracts/best-practices/troubleshooting /docs/building-apps/best-practices/troubleshooting
  /docs/current/developer-docs/smart-contracts/call/arguments /docs/building-apps/interact-with-canisters/advanced-calls
  /docs/current/developer-docs/smart-contracts/call/overview /docs/building-apps/interact-with-canisters/advanced-calls
  /docs/current/developer-docs/smart-contracts/candid/candid-concepts /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/smart-contracts/candid/candid-howto /docs/building-apps/interact-with-canisters/candid/using-candid
  /docs/current/developer-docs/smart-contracts/candid/candid-tools /docs/building-apps/interact-with-canisters/candid/candid-tools
  /docs/current/developer-docs/smart-contracts/candid /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/smart-contracts/candid/index	/docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/smart-contracts/compile /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/smart-contracts/create /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/smart-contracts/deploy/custom-networks /docs/building-apps/developing-canisters/create
  /docs/current/developer-docs/smart-contracts/deploy/larger-wasm /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/smart-contracts/deploy/overview /docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/smart-contracts/deploy/sharing /docs/building-apps/developing-canisters/deploy/overview
  /docs/current/developer-docs/smart-contracts/development-workflow /docs/building-apps/getting-started/install
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages-t-schnorr /docs/building-apps/network-features/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages-tecdsa /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/t-ecdsa /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/t-schnorr /docs/building-apps/network-features/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/encryption/using-vetkeys /docs/building-apps/network-features/encryption/using-vetkeys
  /docs/current/developer-docs/smart-contracts/encryption/vetkeys /docs/building-apps/network-features/encryption/vetkeys
  /docs/current/developer-docs/smart-contracts/install /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/smart-contracts/maintain/control /docs/building-apps/canister-management/control
  /docs/current/developer-docs/smart-contracts/maintain/delete /docs/building-apps/canister-management/delete
  /docs/current/developer-docs/smart-contracts/maintain/history /docs/building-apps/canister-management/history
  /docs/current/developer-docs/smart-contracts/maintain/import /docs/building-apps/advanced/using-third-party-canisters
  /docs/current/developer-docs/smart-contracts/maintain/logs /docs/building-apps/canister-management/logs
  /docs/current/developer-docs/smart-contracts/maintain/recovery /docs/building-apps/canister-management/recovery
  /docs/current/developer-docs/smart-contracts/maintain/resource-limits /docs/building-apps/canister-management/resource-limits
  /docs/current/developer-docs/smart-contracts/maintain/settings /docs/building-apps/canister-management/settings
  /docs/current/developer-docs/smart-contracts/maintain/snapshots /docs/building-apps/canister-management/snapshots
  /docs/current/developer-docs/smart-contracts/maintain/state /docs/building-apps/canister-management/state
  /docs/current/developer-docs/smart-contracts/maintain/storage /docs/building-apps/canister-management/storage
  /docs/current/developer-docs/smart-contracts/maintain/trapping /docs/building-apps/canister-management/trapping
  /docs/current/developer-docs/smart-contracts/maintain/upgrade /docs/building-apps/canister-management/upgrade
  /docs/current/developer-docs/smart-contracts/overview/canister-lifecycle /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/overview/development-cycle /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/overview	/docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/overview/inside-canisters /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/overview/introduction /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/signatures/signing-messages-t-ecdsa /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/signatures/signing-messages-t-schnorr /docs/building-apps/network-features/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/signatures/signing-transactions /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/signatures/t-ecdsa /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/signatures/t-schnorr /docs/building-apps/network-features/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/test/benchmarking /docs/building-apps/developer-tools/canbench
  /docs/current/developer-docs/smart-contracts/test/overview /docs/building-apps/advanced/test/overview
  /docs/current/developer-docs/smart-contracts/test/pocket-ic /docs/building-apps/advanced/test/pocket-ic
  /docs/current/developer-docs/smart-contracts/test/reproducible-builds /docs/building-apps/best-practices/reproducible-builds
  /docs/current/developer-docs/smart-contracts/test/staging-environment /docs/building-apps/developing-canisters/create
  /docs/current/developer-docs/smart-contracts/test/troubleshooting /docs/building-apps/getting-started/troubleshooting
  /docs/current/developer-docs/smart-contracts/topping-up/cycles_management_services /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/smart-contracts/topping-up/topping-up-canister /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/smart-contracts/write/auto-scaling-architecture /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/smart-contracts/write/choosing-language /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/smart-contracts/write/default-template /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/smart-contracts/write/overview /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/smart-contracts/write/resources /docs/building-apps/essentials/what-are-canisters
  /docs/current/developer-docs/updates/computation-and-storage-costs /docs/building-apps/essentials/gas-cost
  /docs/current/developer-docs/updates/release-notes/ /docs/other/updates/release-notes/
  /docs/current/developer-docs/use-cases/considerations-for-nft-devs /docs/defi/nft-collections

  ## Frontends
  /docs/current/developer-docs/web-apps/application-frontends/add-stylesheet /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/asset-security /docs/building-apps/frontends/asset-security
  /docs/current/developer-docs/web-apps/application-frontends/bundlers /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/custom-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/default-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/existing-frontend /docs/building-apps/frontends/existing-frontend
  /docs/current/developer-docs/web-apps/application-frontends/overview /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/serving-static-assets /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/webpack-dev-server /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/webpack /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/browser-js/js-frameworks /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/browser-js/js-request-api /docs/building-apps/interact-with-canisters/agents/javascript-agent
  /docs/current/developer-docs/web-apps/custom-domains/dns-setup /docs/building-apps/frontends/custom-domains/dns-setup
  /docs/current/developer-docs/web-apps/custom-domains/using-custom-domains /docs/building-apps/frontends/custom-domains/using-custom-domains
  /docs/current/developer-docs/web-apps/design-dapps /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/web-apps/frameworks/juno https://juno.build/docs/intro
  /docs/current/developer-docs/web-apps/http-compatible-canisters/custom-http-canisters /docs/building-apps/network-features/using-http/http-certification/custom-http-canisters
  /docs/current/developer-docs/web-apps/http-compatible-canisters/serving-json-over-http /docs/building-apps/network-features/using-http/http-certification/serving-json-over-http
  /docs/current/developer-docs/web-apps/http-compatible-canisters/serving-static-assets-over-http /docs/building-apps/network-features/using-http/http-certification/serving-static-assets-over-http
  /docs/current/developer-docs/web-apps/independently-verifying-ic-signatures /docs/building-apps/network-features/signatures/independently-verifying-ic-signatures
  /docs/current/developer-docs/web-apps/obtain-verify-ic-pubkey /docs/building-apps/developer-tools/dfx/dfx-ping
  /docs/current/developer-docs/web-apps/user-login/email-password /docs/building-apps/authentication/overview
  /docs/current/developer-docs/web-apps/user-login/internet-identity/alternative-origins /docs/building-apps/authentication/alternative-origins
  /docs/current/developer-docs/web-apps/user-login/internet-identity/creating-ii /docs/building-apps/authentication/overview
  /docs/current/developer-docs/web-apps/user-login/internet-identity/integrate-identity /docs/building-apps/authentication/integrate-internet-identity
  /docs/current/developer-docs/web-apps/user-login/internet-identity/integrate-internet-identity /docs/building-apps/authentication/integrate-internet-identity
  /docs/current/developer-docs/web-apps/user-login/internet-identity/overview /docs/building-apps/authentication/overview
  /docs/current/developer-docs/web-apps/user-login/nfid /docs/building-apps/authentication/overview

  ## Old: Developer's guide
  /docs/current/tutorials/deploy_sample_app /docs/tutorials/developer-liftoff/
  /docs/defi/icp-tokens/icp-index-local-setup /docs/defi/token-indexes/
  /docs/developer-docs /docs/building-apps/essentials/network-overview
  /docs/developers-guide/about-this-guide /docs/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/basic-syntax-rules /docs/motoko/main/reference/language-manual
  /docs/developers-guide/cli-reference/ /docs/building-apps/developer-tools/dfx/
  /docs/developers-guide/computation-and-storage-costs.html /docs/building-apps/essentials/gas-cost
  /docs/developers-guide/concepts/bitcoin-integration /bitcoin-integration
  /docs/developers-guide/concepts/concepts-intro /docs/building-apps/essentials/network-overview
  /docs/developers-guide/concepts/ /docs/building-apps/essentials/network-overview
  /docs/developers-guide/concepts/what-is-ic /docs/building-apps/essentials/network-overview
  /docs/developers-guide/customize-projects /docs/building-apps/essentials/what-are-canisters
  /docs/developers-guide/default-wallet.html /docs/building-apps/getting-started/tokens-and-cycles
  /docs/developers-guide/default-wallet /docs/building-apps/canister-management/topping-up
  /docs/developers-guide/design-apps /docs/building-apps/essentials/canisters
  /docs/developers-guide/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/glossary /docs/references/glossary
  /docs/developers-guide/install-upgrade-remove /docs/building-apps/getting-started/install
  /docs/developers-guide/lang-service-ide /docs/building-apps/developer-tools/ide/icp-ninja
  /docs/developers-guide/reinstalling-dfx /docs/building-apps/getting-started/install
  /docs/developers-guide/sample-apps /samples
  /docs/developers-guide/sdk-guide.html	/docs/building-apps/getting-started/install
  /docs/developers-guide/sdk-guide /docs/building-apps/getting-started/install
  /docs/developers-guide/troubleshooting /docs/building-apps/getting-started/troubleshooting

  /docs/developers-guide/tutorials-intro /docs/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/tutorials/default-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/developers-guide/tutorials/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/tutorials/my-contacts /docs/building-apps/frontends/using-an-asset-canister
  /docs/developers-guide/webpack-config /docs/building-apps/frontends/using-an-asset-canister
  /docs/developers-guide/work-with-languages /docs/building-apps/essentials/what-are-canisters
  /docs/developers-guide/working-with-canisters.html /docs/building-apps/canister-management/settings
  /docs/developers-guide/working-with-canisters /docs/building-apps/canister-management/settings

  /docs/current/home /docs/home
  /docs /docs/home
  /docs/current/references/ii-spec	/docs/references/ii-spec
  /docs/download /docs/building-apps/getting-started/install
  /docs/eveloper-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-update /docs/building-apps/developer-tools/dfxvm/dfxvm-update
  /docs/http-middleware /docs/home
  /docs/ic-identity-guide/auth-how-to.html /docs/building-apps/authentication/integrate-internet-identity/
  /docs/ic-identity-guide/ /docs/building-apps/authentication/overview
  /docs/ic-interface-spec /docs/references/ic-interface-spec
  /docs/ic-overview  /docs/home
  /docs/integration/ledger-quick-start.html /docs/defi/token-ledgers/setup/icp_ledger_setup
  /docs/integration/ledger-quick-start /docs/defi/token-standards/
  /docs/interface-spec /docs/references/ic-interface-spec
  /docs/introduction/welcome /docs/home
  /docs/language-guide/cycles.html /docs/building-apps/getting-started/tokens-and-cycles
  /docs/language-guide/ /docs/motoko/main/base/
  /docs/language-guide/language-manual.html	/docs/motoko/main/getting-started/motoko-introduction
  /docs/language-guide/motoko.html /docs/motoko/main/getting-started/motoko-introduction
  /docs/languages/languages-overview /docs/building-apps/essentials/what-are-canisters
  /docs/local-quickstart.html /docs/building-apps/getting-started/install
  /docs/network-quickstart.html /docs/building-apps/getting-started/install
  /docs/operators-guide/ops-guide /docs/home

  ## Quickstart
  /docs/quickstart/1-quickstart /docs/building-apps/getting-started/quickstart
  /docs/quickstart/2-quickstart /docs/building-apps/getting-started/quickstart
  /docs/quickstart/3-quickstart /docs/building-apps/getting-started/quickstart
  /docs/quickstart/4-2-convert-icp-to-cycles /docs/building-apps/getting-started/quickstart
  /docs/quickstart/4-quickstart /docs/building-apps/getting-started/quickstart
  /docs/quickstart/5-quickstart /docs/building-apps/getting-started/quickstart
  /docs/quickstart/cycles-faucet /docs/building-apps/getting-started/tokens-and-cycles
  /docs/quickstart/local-quickstart /docs/building-apps/getting-started/quickstart
  /docs/quickstart/network-quickstart /docs/building-apps/getting-started/quickstart
  /docs/quickstart/newcomers /docs/building-apps/getting-started/quickstart
  /docs/quickstart/quickstart-intro /docs/building-apps/getting-started/quickstart

  ## References
  /docs/current/references/cdks /docs/building-apps/developer-tools/cdks/
  /docs/current/references/clang-supported-languages /docs/home
  /docs/current/references/cli-reference/dfx-bootstrap /docs/building-apps/developer-tools/dfx/dfx-bootstrap
  /docs/current/references/cli-reference/dfx-build /docs/building-apps/developer-tools/dfx/dfx-build
  /docs/current/references/cli-reference/dfx-cache /docs/building-apps/developer-tools/dfx/dfx-cache
  /docs/current/references/cli-reference/dfx-canister /docs/building-apps/developer-tools/dfx/dfx-canister
  /docs/current/cli-reference/dfx-deploy /docs/building-apps/developer-tools/dfx/dfx-deploy
  /docs/current/cli-reference/dfx-deps	/docs/building-apps/developer-tools/dfx/dfx-deps
  /docs/current/references/cli-reference/dfx-envars /docs/building-apps/developer-tools/dfx/dfx-envars
  /docs/current/references/cli-reference/dfx-generate /docs/building-apps/developer-tools/dfx/dfx-generate
  /docs/current/references/cli-reference/dfx-help /docs/building-apps/developer-tools/dfx/dfx-help
  /docs/current/references/cli-reference/dfx-identity /docs/building-apps/developer-tools/dfx/dfx-identity
  /docs/current/references/cli-reference/dfx-info /docs/building-apps/developer-tools/dfx/dfx-info
  /docs/current/references/cli-reference/dfx-json-reference /docs/building-apps/developer-tools/dfx-json-reference
  /docs/current/references/cli-reference/dfx-ledger /docs/building-apps/developer-tools/dfx/dfx-ledger
  /docs/current/references/cli-reference/dfx-new /docs/building-apps/developer-tools/dfx/dfx-new
  /docs/current/references/cli-reference/dfx-nns /docs/building-apps/developer-tools/dfx/dfx-nns
  /docs/current/references/cli-reference/dfx-parent /docs/building-apps/developer-tools/dfx/dfx-parent
  /docs/current/references/cli-reference/dfx-ping /docs/building-apps/developer-tools/dfx/dfx-ping
  /docs/current/references/cli-reference/dfx-quickstart /docs/building-apps/developer-tools/dfx/dfx-quickstart
  /docs/current/references/cli-reference/dfx-replica /docs/building-apps/developer-tools/dfx/dfx-replica
  /docs/current/references/cli-reference/dfx-schema /docs/building-apps/developer-tools/dfx/dfx-schema
  /docs/current/references/cli-reference/dfx-sns /docs/building-apps/developer-tools/dfx/dfx-sns
  /docs/current/references/cli-reference/dfx-start /docs/building-apps/developer-tools/dfx/dfx-start
  /docs/current/references/cli-reference/dfx-stop /docs/building-apps/developer-tools/dfx/dfx-stop
  /docs/current/references/cli-reference/dfx-upgrade /docs/building-apps/developer-tools/dfx/dfx-upgrade
  /docs/current/references/cli-reference/dfx-wallet /docs/building-apps/developer-tools/dfx/dfx-wallet
  /docs/current/references/cli-reference/ /docs/building-apps/developer-tools/dfx/
  /docs/current/references/dashboard/overview https://dashboard.internetcomputer.org/
  /docs/current/references/dashboard/using-the-dashboard https://dashboard.internetcomputer.org/
  /docs/current/references/dev-tools-overview /docs/building-apps/developer-tools/dev-tools-overview
  /docs/current/references/dfx-json-reference /docs/building-apps/developer-tools/dfx-json-reference
  /docs/current/references/dfxvm/ /docs/building-apps/developer-tools/dfxvm/
  /docs/current/references/ /docs/references/ic-interface-spec
  /docs/current/references/gitpod /docs/building-apps/developer-tools/ide/icp-ninja
  /docs/current/references/glossary /docs/references/glossary
  /docs/current/references/ic-interface /docs/references/ic-interface-spec
  /docs/current/references/ingress-messages /docs/building-apps/interact-with-canisters/advanced-calls
  /docs/current/references/motoko-ref/ /docs/motoko/main/base/
  /docs/current/references/node-providers/node-metrics https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/references/node-providers/overview https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc-status https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-update-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-withdrawal-address https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/ https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-account-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-claim-neurons https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-generate https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-get-neuron-info https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-get-proposal-info https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-list-neurons https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-list-proposals https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-neuron-manage https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-neuron-stake https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-public-ids https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-qr-code https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-replace-node-provider-id https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-scanner-qr-code https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-send https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/quill-update-node-provider https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-configure-dissolve-delay https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-disburse-maturity https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-disburse https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-follow-neuron https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-get-sale-participation https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-get-swap-refund https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-list-deployed-snses https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-make-proposal https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-make-upgrade-canister-proposal https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-neuron-permission https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-new-sale-ticket https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-pay https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-register-vote https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-split-neuron https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-stake-maturity https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-stake-neuron https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-status https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/quill-cli-reference/sns/quill-sns https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/references/security/ /docs/building-apps/best-practices/security/overview
  /docs/current/references/security/general-security-best-practices/ /docs/building-apps/best-practices/security/inter-canister-calls
  /docs/current/references/security/rust-canister-development-security-best-practices /docs/building-apps/best-practices/security/inter-canister-calls
  /docs/current/references/security/web-app-development-security-best-practices /docs/building-apps/best-practices/security/inter-canister-calls
  /docs/current/references/subnets/overview /docs/building-apps/developing-canisters/create
  /docs/current/references/subnets/subnet-types /docs/building-apps/developing-canisters/create
  /docs/current/references/t-ecdsa-how-it-works /docs/references/t-sigs-how-it-works
  /docs/release-notes/ /docs/other/updates/release-notes/
  /docs/rosetta-api/ledger-local-setup /docs/defi/token-ledgers/setup/icp_ledger_setup
  /docs/rosetta-api/ledger /docs/defi/token-standards/
  /docs/rust-guide/ /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/rust-guide/rust-intro /docs/building-apps/developer-tools/cdks/rust/intro-to-rust

  ## Samples
  /docs/samples/codelabs/data-persistence /samples
  /docs/samples/codelabs/minimalistic-motoko-dapp /samples
  /docs/samples/codelabs/minimalistic-rust-dapp /samples
  /docs/samples/codelabs /samples
  /docs/samples/codelabs/simple-nft /samples
  /docs/samples/codelabs/static-website /samples
  /docs/samples/deploying-your-first-bitcoin-dapp /docs/references/samples/motoko/basic_bitcoin/
  /docs/samples/encrypted-notes/	/docs/references/samples/motoko/encrypted-notes-dapp/
  /docs/samples/ /samples
  /docs/samples/game-of-life /docs/references/samples/motoko/life/
  /docs/samples/host-a-webgame /docs/references/samples/hosting/unity-webgl-template/
  /docs/samples/host-a-website /docs/references/samples/hosting/static-website/
  /docs/samples/internet-identity-sample /docs/references/samples/motoko/internet_identity_integration/
  /docs/samples/nft	/docs/defi/nft-collections
  /docs/search /docs/home
  /docs/security-best-practices/ /docs/building-apps/best-practices/security/inter-canister-calls
  /docs/security-best-practices/introduction /docs/building-apps/best-practices/security/overview
  /docs/support /docs/home
  /docs/token-holders/ /docs/defi/overview
  /docs/token-holders/nns-app-quickstart.html https://internetcomputer.zendesk.com/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/token-holders/seed-donations.html https://wiki.internetcomputer.org/wiki/How-To:_Claim_neurons_for_seed_participants
  /docs/token-holders/self-custody-quickstart.html /docs/defi/overview
  /docs/tokenomics/ /docs/building-apps/governing-apps/overview
  /docs/tokenomics/identity-auth/auth-how-to /docs/building-apps/authentication/overview
  /docs/tokenomics/identity-auth/what-is-ic-identity /docs/building-apps/authentication/overview
  /docs/tokenomics/index /docs/building-apps/governing-apps/overview
  /docs/tokenomics/nns/community-fund https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/tokenomics/nns/neurons-fund https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/tokenomics/nns/nns-intro https://internetcomputer.zendesk.com/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/tokenomics/nns/nns-staking-voting-rewards https://internetcomputer.zendesk.com/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/tokenomics/nns/proposal-requirements https://internetcomputer.zendesk.com/hc/en-us/articles/34084113508500-Proposals
  /docs/tokenomics/sns/ /docs/building-apps/governing-apps/tokenomics/
  /docs/tokenomics/sns/sns-intro-tokens	/docs/building-apps/governing-apps/tokenomics/tokenomics-intro
  /docs/tokenomics/sns/tokenomics /docs/building-apps/governing-apps/tokenomics/
  /docs/tokenomics/token-holders/custody-options-intro /docs/defi/overview
  /docs/tokenomics/token-holders/nns-app-quickstart https://internetcomputer.zendesk.com/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/tokenomics/token-holders/self-custody-quickstart /docs/defi/overview
  /docs/tutorials/ /docs/building-apps/essentials/network-overview
  /docs/tutorials/index /docs/building-apps/essentials/network-overview
  /docs/videos-tutorials /docs/home
  /education /education-hub
  /features /capabilities
  /features/ /capabilities
  /features/green /capabilities/sustainability
  /grants	https://dfinity.org/grants
  /howitworks/ /how-it-works
  /howitworks /how-it-works
  /icp-event /events
  /icp-newsletter /news
  /language-guide/ /docs/tutorials/developer-liftoff/level-0/intro-languages
  /language-guide/index /docs/tutorials/developer-liftoff/level-0/intro-languages
  /language-guide/index /docs/tutorials/developer-liftoff/level-0/intro-languages
  /live-sessions https://dfinity.org/events-and-news/#videos-live-sessions
  /motoko/main/motoko /docs/motoko/main/getting-started/motoko-introduction
  /multichain /chainfusion
  /ois /sns
  /openchat /sns
  /showcase /ecosystem
  /sustainability /capabilities/sustainability
  /videos /news
  `

  .split(/[\r\n]+/)
  .map((line) => line.trim().replace(/^#.*$/, "").trim())
  .filter((l) => l.length > 0)
  .map((l) => l.split(/\s+/));

  function isSplat(redirect) {
    return redirect[0].includes("/*");
  }

  function isExternal(redirect) {
    return redirect[1].startsWith("http");
  }

  function isExactUrl(redirect) {
    return redirect[0].endsWith(".html");
  }

  function ruleToRedirect(rule) {
    const from = rule[0].replace(/(.+)\/$/, "$1");
    const to = rule[1];
    return {
      from,
      to,
    };
  }

  exports.getRedirects = function () {
    return redirects
      .filter((r) => !isSplat(r) && !isExternal(r) && !isExactUrl(r))
      .map(ruleToRedirect)
      .map((r) => ({
        to: r.to.replace(/#.+$/, ""),
        from: r.from,
      }));
  };

  exports.getExternalRedirects = function () {
    return redirects.filter((r) => isExternal(r)).map(ruleToRedirect);
  };

  exports.getExactUrlRedirects = function () {
    return redirects
      .filter((r) => !isExternal(r) && isExactUrl(r))
      .map(ruleToRedirect);
  };

  exports.getSplatRedirects = function (existingUrl) {
    const urls = [];

    for (const redirect of redirects.filter(
      (r) => isSplat(r) && !isExternal(r)
    )) {
      const trimmedSource = redirect[0].replace("/*", "/");

      if (redirect[1].includes(":splat")) {
        const trimmedDestination = redirect[1].replace(":splat", "");
        if (existingUrl.startsWith(trimmedDestination)) {
          const completeSourceUrl = existingUrl.replace(
            trimmedDestination,
            trimmedSource
          );
          urls.push(completeSourceUrl);
        }
      }
    }

    return urls;
  };