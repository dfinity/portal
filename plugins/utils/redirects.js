const redirects = `

  # Redirects (from -> to)

  ## Wildcards
  ## Wildcards use a find and replace workflow, replacing the old file path prior to the * with the new file path prior to the :splat
  ## /old/path/* /new/path/:splat
  ##
  ## That means wildcards will only work if the file path and file names after :splat is the same, i.e.:
  ##
  ## /docs/current/motoko/* redirected to /docs/motoko/:splat
  ## will redirect the file
  ## /docs/current/motoko/main/getting-started to /docs/motoko/main/getting-started
  ##
  ## The following will not work to redirect /docs/current/backend/motoko/index to /docs/motoko/overview
  ## /docs/current/backend/motoko/* /docs/motoko/:splat
  ##
  ## Or, redirecting to a single landing page will not work:
  ## /docs/samples/* /ecosystem:splat
  ##
  ## Wildcards cannot be used for external redirects, i.e.
  ## /docs/current/quill/* https://github.com
  ##
  ##
  /docs/current/motoko/* /docs/motoko:splat
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/* /docs/building-apps/developer-tools/dfx:splat
  /docs/current/tutorials/developer-journey/* /docs/tutorials/developer-liftoff/:splat
  /docs/current/tutorials/developer-liftoff/* /docs/tutorials/developer-liftoff/:splat
  /docs/current/developer-docs/security/security-best-practices/* /docs/building-apps/security/:splat
  /docs/building-apps/security/security-best-practices/* /docs/building-apps/security/:splat
  /docs/current/developer-docs/agents/* /docs/building-apps/interact-with-canisters/agents/:splat
  /docs/current/developer-docs/best-practices/* /docs/building-apps/best-practices/:splat
  /docs/current/developer-docs/smart-contracts/best-practices/* /docs/building-apps/best-practices/:splat
  /docs/current/developer-docs/daos/sns/* /docs/building-apps/governing-apps/:splat
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/* /docs/building-apps/developer-tools/dfxvm/:splat
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/* /docs/building-apps/developer-tools/advanced-dfx/:splat
  /docs/current/developer-docs/smart-contracts/maintain/* /docs/building-apps/canister-management/:splat
  /docs/current/tutorials/hackathon-prep-course/* /docs/tutorials/hackathon-prep-course/:splat
  /docs/current/developer-docs/daos/nns/* /docs/building-apps/governing-apps/nns/:splat
  /docs/current/samples/* /docs/references/samples/:splat
  /docs/current/references/samples/* /docs/references/samples/:splat
  /docs/current/references/* /docs/references/:splat
  /docs/current/references/samples/* /docs/references/samples/:splat

  ## Explicit redirects
  ## For files that have changed directories & file names, there will need to be
  ## an explicit redirect from the old file to the new file
  ## I.e.:
  ## /docs/current/developer-docs/hello-world /docs/building-apps/getting-started/quickstart
  ##
  ##

  ## IC spec
  /docs/current/references/ic-interface-spec /docs/references/ic-interface-spec

  ## Candid
  /docs/candid-guide/candid-concepts.html /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/candid-guide/candid-intro /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/candid-guide/candid-ref /docs/references/candid-ref
  /docs/candid-guide/candid-types.html /docs/building-apps/interact-with-canisters/candid/using-candid/
  /docs/candid-guide/candid-types /docs/references/candid-ref
  /docs/candid-guide/candid /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/candid-guide /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/smart-contracts/candid/candid-concepts /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/smart-contracts/candid/candid-howto /docs/building-apps/interact-with-canisters/candid/using-candid
  /docs/current/developer-docs/smart-contracts/candid/candid-tools /docs/building-apps/interact-with-canisters/candid/candid-tools

  ## Concepts
  /docs/concepts/bitcoin-integration /bitcoin-integration
  /docs/concepts/canisters-code /docs/building-apps/essentials/canisters
  /docs/concepts/chain-key-technology/ /docs/building-apps/chain-fusion/overview
  /docs/concepts/concepts-intro.html /docs/building-apps/essentials/network-overview
  /docs/concepts/data-centers /docs/building-apps/essentials/network-overview
  /docs/concepts /docs/building-apps/essentials/network-overview
  /docs/concepts/governance https://learn.internetcomputer.org/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/concepts/index /docs/building-apps/essentials/network-overview
  /docs/concepts/nodes-subnets /docs/building-apps/developing-canisters/create
  /docs/concepts/subnet-types /docs/building-apps/developing-canisters/create
  /docs/concepts/what-is-ic /docs/building-apps/essentials/network-overview

  ## AI
  /docs/current/developer-docs/ai/ai-on-chain /ecosystem
  /docs/current/developer-docs/ai/overview /ecosystem
  /docs/current/developer-docs/ai/inference /ecosystem
  /docs/current/developer-docs/ai/samples /ecosystem
  /docs/current/developer-docs/ai/training-models /ecosystem
  /docs/current/developer-docs/ai/machine-learning-sample /ecosystem

  ## Motoko
  /docs/current/developer-docs/backend/motoko/infrastructure /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/motoko/explore-templates /docs/motoko/main/getting-started/basic-concepts
  /docs/current/developer-docs/backend/motoko/dev-env /docs/motoko/main/getting-started/dev-env
  /docs/current/developer-docs/backend/motoko/at-a-glance /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/motoko/deploying /docs/motoko/main/getting-started/quickstart
  /docs/current/developer-docs/backend/motoko/upgrading /docs/motoko/main/canister-maintenance/upgrades
  /docs/current/developer-docs/backend/motoko/intercanister-calls /docs/motoko/main/writing-motoko/intercanister-calls
  /docs/current/developer-docs/backend/motoko/optimizing /docs/motoko/main/canister-maintenance/optimization
  /docs/current/developer-docs/backend/motoko/phonebook /docs/motoko/main/writing-motoko/modules-and-imports
  /docs/current/developer-docs/backend/motoko/calculator /docs/motoko/main/writing-motoko/integers
  /docs/current/developer-docs/backend/motoko/counter-tutorial /docs/motoko/main/writing-motoko/local-objects-classes
  /docs/current/developer-docs/backend/motoko/hello-location /docs/motoko/main/writing-motoko/arguments
  /docs/current/developer-docs/backend/motoko/simple-cycles /docs/motoko/main/canister-maintenance/cycles
  /docs/current/developer-docs/backend/motoko/define-an-actor /docs/motoko/main/writing-motoko/actors-async
  /docs/current/developer-docs/backend/motoko/multiple-actors /docs/motoko/main/writing-motoko/actor-classes
  /docs/current/developer-docs/backend/motoko/access-control /docs/motoko/main/writing-motoko/caller-id
  /docs/current/developer-docs/backend/motoko/candid-ui /docs/motoko/main/writing-motoko/candid-ui
  /docs/current/developer-docs/backend/motoko/scalability-cancan /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/motoko/sample-apps /samples
  /docs/current/developer-docs/backend/motoko/mo-doc /docs/motoko/main/reference/generating-docs
  /docs/current/developer-docs/backend/motoko/0.11.0-migration-guide /docs/motoko/main/migration-guides/0.11.0-migration-guide
  /docs/current/motoko/main/about-this-guide /docs/motoko/main/getting-started/motoko-introduction
  /motoko/main/motoko /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/main/base/array /docs/motoko/main/base/Array 
  /docs/current/motoko/main/base/buffer /docs/motoko/main/base/Buffer
  /docs/current/motoko/main/base/char /docs/motoko/main/base/Char
  /docs/current/motoko/main/base/experimentalstablememory /docs/motoko/main/base/ExperimentalStableMemory
  /docs/current/motoko/main/base/float /docs/motoko/main/base/Float
  /docs/current/motoko/main/base/hash /docs/motoko/main/base/Hash
  /docs/current/motoko/main/base/hashmap /docs/motoko/main/base/HashMap
  /docs/current/motoko/main/base/list /docs/motoko/main/base/List
  /docs/current/motoko/main/base/option /docs/motoko/main/base/Option
  /docs/current/motoko/main/base/principal /docs/motoko/main/base/Principal
  /docs/current/motoko/main/base/random /docs/motoko/main/base/Random
  /docs/current/motoko/main/base/text /docs/motoko/main/base/Text
  /docs/current/motoko/main/base/time /docs/motoko/main/base/Time
  /docs/current/motoko/main/base/trie /docs/motoko/main/base/Trie
  /docs/current/motoko/main/base/triemap  /docs/motoko/main/base/TrieMap
  /docs/current/motoko/main/language-manual /docs/motoko/main/reference/language-manual
  /docs/current/motoko/main/base/debug /docs/motoko/main/base/Debug
  /docs/current/motoko/main/base/int8 /docs/motoko/main/base/Int8
  /docs/current/motoko/main/base/nat /docs/motoko/main/base/Nat
  /docs/rust/main/motoko-packages/databases /docs/home
  /docs/current/motoko/main/motoko-introduction /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/main/motoko /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/main/basic-concepts /docs/motoko/main/getting-started/basic-concepts
  /docs/current/motoko/main/overview /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/main/language-manual /docs/motoko/main/reference/language-manual
  /docs/current/motoko/main/style /docs/motoko/main/reference/style
  /docs/current/motoko/main/base-intro /docs/motoko/main/writing-motoko/modules-and-imports
  /docs/current/motoko/main/actors-async /docs/motoko/main/writing-motoko/actors-async
  /docs/current/motoko/main/actor-classes /docs/motoko/main/writing-motoko/actor-classes
  /docs/current/motoko/main/caller-id /docs/motoko/main/writing-motoko/caller-id
  /docs/current/motoko/main/compatibility /docs/motoko/main/canister-maintenance/compatibility
  /docs/current/motoko/main/control-flow /docs/motoko/main/writing-motoko/control-flow
  /docs/current/motoko/main/cycles /docs/motoko/main/canister-maintenance/cycles
  /docs/current/motoko/main/errors /docs/motoko/main/writing-motoko/errors
  /docs/current/motoko/main/heartbeats /docs/motoko/main/writing-motoko/heartbeats
  /docs/current/motoko/main/local-objects-classes /docs/motoko/main/writing-motoko/local-objects-classes
  /docs/current/motoko/main/message-inspection /docs/motoko/main/writing-motoko/message-inspection
  /docs/current/motoko/main/modules-and-imports /docs/motoko/main/writing-motoko/modules-and-imports
  /docs/current/motoko/main/mutable-state /docs/motoko/main/writing-motoko/mutable-state
  /docs/current/motoko/main/pattern-matching /docs/motoko/main/writing-motoko/pattern-matching
  /docs/current/motoko/main/pipes /docs/motoko/main/writing-motoko/pipes
  /docs/current/motoko/main/sharing /docs/motoko/main/writing-motoko/sharing
  /docs/current/motoko/main/stable-regions /docs/motoko/main/stable-memory/stable-regions
  /docs/current/motoko/main/stablememory /docs/motoko/main/stable-memory/stablememory
  /docs/current/motoko/main/structural-equality /docs/motoko/main/writing-motoko/structural-equality
  /docs/current/motoko/main/timers /docs/motoko/main/writing-motoko/timers
  /docs/current/motoko/main/upgrades /docs/motoko/main/canister-maintenance/upgrades
  /docs/current/motoko/main/compiler-ref /docs/motoko/main/reference/compiler-ref
  /docs/current/motoko/main/motoko-grammar /docs/motoko/main/reference/motoko-grammar
  /docs/current/developer-docs/developer-tools/off-chain/canpack /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/developer-tools/ide/vs-code /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/developer-tools/ide/playground /docs/building-apps/developer-tools/icp-ninja
  /docs/current/developer-docs/developer-tools/ide/gitpod /docs/building-apps/developer-tools/icp-ninja
  /docs/current/developer-docs/developer-tools/ide/codespaces /docs/building-apps/developer-tools/icp-ninja
  /docs/current/developer-docs/developer-tools/ide/dev-containers /docs/building-apps/developer-tools/icp-ninja
  /docs/current/developer-docs/developer-tools/dev-tools-overview /docs/building-apps/developer-tools/dev-tools-overview 
  /docs/current/developer-docs/getting-started/quickstart/react-quickstart /docs/building-apps/getting-started/quickstart

  ## Rust
  /docs/current/developer-docs/backend/rust/candid /docs/building-apps/developer-tools/cdks/rust/generating-candid
  /docs/current/developer-docs/backend/rust/canister-state /docs/building-apps/developer-tools/cdks/rust/canister-state
  /docs/current/developer-docs/backend/rust/counter /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/deploying /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/dev-env /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/quickstart /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/project-organization /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/generating-candid /docs/building-apps/developer-tools/cdks/rust/generating-candid
  /docs/current/developer-docs/backend/rust/index /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/infrastructure /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/intercanister /docs/building-apps/developer-tools/cdks/rust/intercanister
  /docs/current/developer-docs/backend/rust/message-inspect /docs/building-apps/developer-tools/cdks/rust/message-inspect
  /docs/current/developer-docs/backend/rust/intro-to-rust /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/optimizing /docs/building-apps/advanced/optimize/rust
  /docs/current/developer-docs/backend/rust/stable-structures /docs/building-apps/developer-tools/cdks/rust/stable-structures
  /docs/current/developer-docs/backend/rust/infrastructure /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/upgrading /docs/building-apps/developer-tools/cdks/rust/upgrading
  /docs/current/developer-docs/backend/rust/rust-considerations /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/rust-quickstart /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/samples /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/timers /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/backend/rust/access-control /docs/building-apps/developer-tools/cdks/rust/intro-to-rust

  ## DeFi
  /docs/current/developer-docs/defi/asset-custody/custody-options /docs/defi/overview
  /docs/current/developer-docs/defi/asset-custody/hardware-wallet-cli /docs/defi/overview
  /docs/current/developer-docs/defi/asset-custody/self-custody-quickstart /docs/defi/overview
  /docs/current/developer-docs/defi/cycles/converting_icp_tokens_into_cycles /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/defi/cycles/cycles-ledger /docs/defi/token-ledgers/cycles-ledger
  /docs/current/developer-docs/defi/dex/overview https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/developer-docs/defi/exchange-rate-canister/ /docs/references/system-canisters/
  /docs/current/developer-docs/defi/icp-tokens/overview /docs/defi/token-standards/
  /docs/current/developer-docs/defi/icrc-1/icrc1-index-setup /docs/defi/token-indexes/
  /docs/current/developer-docs/defi/icrc-1/token-quickstart /docs/defi/create
  /docs/current/developer-docs/defi/nfts/considerations-for-nft-devs /docs/defi/overview
  /docs/current/developer-docs/defi/nfts/marketplaces https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/developer-docs/defi/nfts/nft-collections /docs/defi/nft-collections
  /docs/current/developer-docs/defi/nfts/overview https://internetcomputer.zendesk.com/hc/en-us
  /docs/current/developer-docs/defi/overview /docs/defi/overview
  /docs/current/developer-docs/defi/token_integrations/ /docs/defi/overview

  ## Rosetta
  /docs/current/developer-docs/defi/rosetta/overview /docs/defi/rosetta/icp_rosetta/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/ /docs/defi/rosetta/icp_rosetta/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/ /docs/defi/rosetta/icrc_rosetta/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/ /docs/defi/rosetta/icp_rosetta/construction_api/
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
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/voting/ /docs/defi/rosetta/icp_rosetta/construction_api/voting
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/balances /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/ /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/blocks /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/get_pending_proposals /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/get_proposal_info /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/index /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/list_known_neurons /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/network /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/transactions /docs/defi/rosetta/icp_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/index /docs/defi/rosetta/icp_rosetta/
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/ /docs/defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/approve /docs/defi/rosetta/icrc_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/ /docs/defi/rosetta/icrc_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/index /docs/defi/rosetta/icrc_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/transfer /docs/defi/rosetta/icrc_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/index /docs/defi/rosetta/icrc_rosetta/construction_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/balances /docs/defi/rosetta/icrc_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/blocks /docs/defi/rosetta/icrc_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/index /docs/defi/rosetta/icrc_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/network /docs/defi/rosetta/icrc_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/transactions /docs/defi/rosetta/icrc_rosetta/data_api/
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/index /docs/defi/rosetta/icrc_rosetta/
  /docs/current/developer-docs/defi/tokens/asset_flow/ /docs/defi/overview

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
  /docs/current/developer-docs/defi/cycles/cycles-ledger /docs/defi/token-ledgers/cycles-ledger

  ## Quill
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/index https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-parent https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-account-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-ckbtc https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc-status https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-update-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-withdrawal-address https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-claim-neurons https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-generate https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-get-neuron-info https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-get-proposal-info https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-list-neurons https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-list-proposals https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-neuron-manage https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-neuron-stake https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-public-ids https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-qr-code https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-replace-node-provider-id https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-scanner-qr-code https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-send https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-configure-dissolve-delay https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-disburse https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-disburse-maturity https://github.com/dfinity/quill/tree/master/docs/cli-reference
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
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-update-node-provider https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/ https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-account-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/ckbtc/quill-ckbtc https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/ckbtc/quill-ckbtc-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc-status https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/ckbtc/quill-ckbtc-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/ckbtc/quill-ckbtc-update-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/ckbtc/quill-ckbtc-withdrawal-address https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-claim-neurons https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-generate https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-get-neuron-info https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-get-proposal-info https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-list-neurons https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-list-proposals https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-neuron-manage https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-neuron-stake https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-public-ids https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-qr-code https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-replace-node-provider-id https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-scanner-qr-code https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-send https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-balance https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-configure-dissolve-delay https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-disburse https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-disburse-maturity https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-follow-neuron https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-get-sale-participation https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-get-swap-refund https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-list-deployed-snses https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-make-proposal https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-make-upgrade-canister-proposal https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-neuron-permission https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-new-sale-ticket https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-pay https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-register-vote https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-split-neuron https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-stake-maturity https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-stake-neuron https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-status https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/sns/quill-sns-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-transfer https://github.com/dfinity/quill/tree/master/docs/cli-reference
  /docs/references/quill-cli-reference/quill-update-node-provider https://github.com/dfinity/quill/tree/master/docs/cli-reference

  ## Dev tools
  /developers/ /docs/home
  /docs/current/developer-docs/deploy/computation-and-storage-costs /docs/building-apps/essentials/gas-cost
  /docs/current/developer-docs/deploy/custom-domain /docs/building-apps/frontends/custom-domains/using-custom-domains
  /docs/current/developer-docs/developer-tools/cli-tools/dfx-json-reference /docs/building-apps/developer-tools/dfx-json-reference
  /docs/current/developer-docs/developer-tools/cli-tools/dfx-json /docs/building-apps/developer-tools/dfx-json
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm-init/dfxvm-init /docs/building-apps/developer-tools/dfxvm/
  /docs/current/developer-docs/developer-tools/cli-tools/networks-json /docs/building-apps/developer-tools/advanced-dfx/networks-json
  /docs/current/developer-docs/developer-tools/ide/codespaces /docs/building-apps/developer-tools/icp-ninja
  /docs/current/developer-docs/developer-tools/ide/gitpod /docs/building-apps/developer-tools/icp-ninja
  /docs/current/developer-docs/developer-tools/ide/playground /docs/building-apps/developer-tools/icp-ninja
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
  /docs/current/developer-docs/smart-contracts/overview/canister-lifecycle/ /docs/building-apps/developing-canisters/what-are-canisters
  /docs/current/references/subnets/subnet-types/ /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/developer-tools/on-chain/ic-js/ https://github.com/dfinity/ic-js/tree/main
  /docs/current/developer-docs/developer-tools/cli-tools/idl2json https://github.com/dfinity/idl2json/tree/main
  /docs/current/developer-docs/smart-contracts/maintain/recovery /docs/building-apps/canister-management/snapshots
  /docs/current/samples/overview /ecosystem
  /docs/current/references/https-outcalls-how-it-works /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/web-apps/application-frontends/quickstart/react-quickstart /docs/building-apps/getting-started/quickstart
  /docs/current/other/updates/release-notes/ /docs/other/updates/release-notes/
  /docs/current/developer-docs/smart-contracts/overview/trust-in-canisters /docs/building-apps/best-practices/trust-in-canisters
  /docs/current/references/icrc1-standard /docs/defi/overview
  /docs/current/developer-docs/getting-started/troubleshooting /docs/building-apps/best-practices/troubleshooting
  /docs/current/developer-docs/smart-contracts/deploy/custom-testnets /docs/building-apps/developing-canisters/custom-networks
  /docs/current/developer-docs/developer-tools/off-chain/canbench /docs/building-apps/advanced/benchmarking

  ## Getting started
  /docs/current/developer-docs/getting-started/accounts /docs/building-apps/getting-started/identities
  /docs/current/developer-docs/getting-started/cycles/cycles-wallet /docs/building-apps/canister-management/cycles-wallet
  /docs/current/developer-docs/defi/cycles/cycles-wallet /docs/building-apps/canister-management/cycles-wallet
  /docs/current/developer-docs/getting-started/cycles/cycles_management_services /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/getting-started/cycles/overview /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/getting-started/default-template /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/getting-started/deploy/local /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/getting-started/deploy/testnet /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/getting-started/development-workflow /docs/building-apps/getting-started/install
  /docs/current/developer-docs/getting-started/explore-examples /docs/building-apps/developer-tools/icp-ninja
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
  /docs/current/developer-docs/integrations/internet-identity /docs/building-apps/authentication/overview
  /docs/current/developer-docs/integrations/internet-identity/integrate-identity /docs/building-apps/authentication/integrate-internet-identity
  /docs/current/developer-docs/integrations/internet-identity/overview  /docs/building-apps/authentication/overview
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
  /docs/current/developer-docs/integrations/sns/sns-intro/ https://learn.internetcomputer.org/hc/en-us/articles/34084394684564-SNS-Service-Nervous-System
  /docs/current/developer-docs/integrations/sns/ https://learn.internetcomputer.org/hc/en-us/articles/34084394684564-SNS-Service-Nervous-System
  /docs/current/developer-docs/integrations/sns/integrating/ /docs/building-apps/governing-apps/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/frontend-integration /docs/building-apps/governing-apps/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/index-integration /docs/building-apps/governing-apps/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/ledger-integration /docs/building-apps/governing-apps/launching/integrating
  /docs/current/developer-docs/integrations/sns/introduction/dao-alternatives https://learn.internetcomputer.org/hc/en-us/articles/34084394684564-SNS-Service-Nervous-System
  /docs/current/developer-docs/integrations/sns/introduction/sns-architecture https://learn.internetcomputer.org/hc/en-us/articles/34084394684564-SNS-Service-Nervous-System
  /docs/current/developer-docs/integrations/sns/introduction/sns-intro-high-level https://learn.internetcomputer.org/hc/en-us/articles/34084394684564-SNS-Service-Nervous-System
  /docs/current/developer-docs/integrations/sns/introduction/sns-launch https://learn.internetcomputer.org/hc/en-us/articles/34084394684564-SNS-Service-Nervous-System
  /docs/current/developer-docs/daos/overview https://learn.internetcomputer.org/hc/en-us/articles/34084394684564-SNS-Service-Nervous-System
  /docs/current/developer-docs/integrations/sns/launching/ /docs/building-apps/governing-apps/launching/
  /docs/current/developer-docs/integrations/sns/launching/launch-steps-1proposal /docs/building-apps/governing-apps/launching/launch-steps-1proposal
  /docs/current/developer-docs/integrations/sns/launching/launch-steps /docs/building-apps/governing-apps/launching/launch-steps-1proposal
  /docs/current/developer-docs/integrations/sns/launching/launch-summary-1proposal  /docs/building-apps/governing-apps/launching/launch-summary-1proposal
  /docs/current/developer-docs/integrations/sns/launching/launch-summary /docs/building-apps/governing-apps/launching/launch-summary-1proposal
  /docs/current/developer-docs/integrations/sns/managing/cycles-usage /docs/building-apps/governing-apps/managing/cycles-usage
  /docs/current/developer-docs/integrations/sns/managing/making-proposals /docs/building-apps/governing-apps/managing/making-proposals
  /docs/current/developer-docs/integrations/sns/managing/manage-sns-intro /docs/building-apps/governing-apps/managing/manage-sns-intro
  /docs/current/developer-docs/integrations/sns/managing/managing-nervous-system-parameters https://learn.internetcomputer.org/hc/en-us/articles/34142964565396-DAO-Settings
  /docs/current/developer-docs/integrations/sns/managing/sns-asset-canister /docs/building-apps/governing-apps/managing/sns-asset-canister
  /docs/current/developer-docs/integrations/sns/testing/testing-before-launch /docs/building-apps/governing-apps/testing/testing-before-launch
  /docs/current/developer-docs/integrations/sns/testing/testing-locally /docs/building-apps/governing-apps/testing/testing-locally
  /docs/current/developer-docs/integrations/sns/testing/testing-on-mainnet /docs/building-apps/governing-apps/testing/testing-on-mainnet
  /docs/current/developer-docs/integrations/sns/tokenomics/ /docs/building-apps/governing-apps/tokenomics/
  /docs/current/developer-docs/integrations/sns/tokenomics/predeployment-considerations  /docs/building-apps/governing-apps/tokenomics/predeployment-considerations
  /docs/current/developer-docs/integrations/sns/tokenomics/preparation /docs/building-apps/governing-apps/tokenomics/preparation
  /docs/current/developer-docs/integrations/sns/tokenomics/rewards https://learn.internetcomputer.org/hc/en-us/articles/34143058069396-Rewards
  /docs/current/developer-docs/integrations/sns/tokenomics/sns-checklist /docs/building-apps/governing-apps/tokenomics/sns-checklist
  /docs/current/developer-docs/integrations/sns/tokenomics/tokenomics-intro  https://learn.internetcomputer.org/hc/en-us/articles/34088279488660-Tokenomics
  /docs/current/developer-docs/integrations/sns/tokenomics/tokenomics https://learn.internetcomputer.org/hc/en-us/articles/34088279488660-Tokenomics
  /docs/current/developer-docs/integrations/storage/cost /docs/building-apps/essentials/gas-cost
  /docs/current/developer-docs/integrations/t-ecdsa /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/integrations/t-ecdsa/t-ecdsa-how-it-works /docs/references/t-sigs-how-it-works
  /docs/current/developer-docs/integrations/vetkeys/ /docs/building-apps/network-features/encryption/vetkeys
  /docs/current/developer-docs/integrations/vetkeys/technology-overview /docs/references/vetkeys-overview
  /docs/current/developer-docs/integrations/vetkeys/using-vetkeys /docs/building-apps/network-features/encryption/using-vetkeys
  /docs/current/developer-docs/local-quickstart /docs/building-apps/getting-started/install

  ## Chain Fusion
  /docs/current/references/bitcoin-how-it-works /docs/building-apps/chain-fusion/bitcoin/overview
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
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/samples /docs/building-apps/chain-fusion/ethereum/evm-rpc/evm-rpc-canister
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

  ## NNS

  /docs/building-apps/governing-apps/nns/overview https://learn.internetcomputer.org/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/current/developer-docs/daos/nns/overview https://learn.internetcomputer.org/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/building-apps/governing-apps/nns/concepts/neurons/neuron-overview https://learn.internetcomputer.org/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/concepts/neurons/neuron-overview https://learn.internetcomputer.org/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/building-apps/governing-apps/nns/concepts/neurons/neuron-following https://learn.internetcomputer.org/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/concepts/neurons/neuron-following https://learn.internetcomputer.org/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/building-apps/governing-apps/nns/concepts/neurons/staking-voting-rewards https://learn.internetcomputer.org/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/concepts/neurons/staking-voting-rewards https://learn.internetcomputer.org/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/building-apps/governing-apps/nns/concepts/neurons/neuron-management https://learn.internetcomputer.org/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/developer-docs/daos/nns/concepts/neurons/neuron-management https://learn.internetcomputer.org/en-us/articles/34084120668692-NNS-Neurons
  /docs/building-apps/governing-apps/nns/concepts/proposals/proposal-overview https://learn.internetcomputer.org/hc/en-us/articles/34084113508500-Proposals
  /docs/current/developer-docs/daos/nns/concepts/proposals/proposal-overview https://learn.internetcomputer.org/hc/en-us/articles/34084113508500-Proposals
  /docs/building-apps/governing-apps/nns/concepts/proposals/direct-voting https://learn.internetcomputer.org/hc/en-us/articles/34084113508500-Proposals
  /docs/current/developer-docs/daos/nns/concepts/proposals/direct-voting https://learn.internetcomputer.org/hc/en-us/articles/34084113508500-Proposals
  /docs/building-apps/governing-apps/nns/concepts/proposals/proposal-topics https://learn.internetcomputer.org/hc/en-us/articles/34140518658068-Proposal-Topics-and-Types
  /docs/current/developer-docs/daos/nns/concepts/proposals/proposal-topics https://learn.internetcomputer.org/hc/en-us/articles/34140518658068-Proposal-Topics-and-Types
  /docs/building-apps/governing-apps/nns/concepts/neurons-fund https://learn.internetcomputer.org/hc/en-us/articles/34084179554196-Neurons-Fund-NF
  /docs/current/developer-docs/daos/nns/concepts/neurons-fund https://learn.internetcomputer.org/hc/en-us/articles/34084179554196-Neurons-Fund-NF
  /docs/building-apps/governing-apps/overview https://learn.internetcomputer.org/hc/en-us/articles/34084394684564-SNS-Service-Nervous-System
  /docs/current/developer-docs/daos/sns/overview https://learn.internetcomputer.org/hc/en-us/articles/34084394684564-SNS-Service-Nervous-System
  /docs/building-apps/governing-apps/tokenomics/tokenomics-intro https://learn.internetcomputer.org/hc/en-us/articles/34088279488660-Tokenomics
  /docs/current/developer-docs/daos/sns/tokenomics/tokenomics-intro https://learn.internetcomputer.org/hc/en-us/articles/34088279488660-Tokenomics
  /docs/building-apps/governing-apps/tokenomics/rewards https://learn.internetcomputer.org/hc/en-us/articles/34143058069396-Rewards
  /docs/current/developer-docs/daos/sns/tokenomics/rewards https://learn.internetcomputer.org/hc/en-us/articles/34143058069396-Rewards
  /docs/building-apps/governing-apps/managing/managing-nervous-system-parameters https://learn.internetcomputer.org/hc/en-us/articles/34142964565396-DAO-Settings
  /docs/current/developer-docs/daos/sns/managing/managing-nervous-system-parameters https://learn.internetcomputer.org/hc/en-us/articles/34142964565396-DAO-Settings

  ## Security
  /docs/current/developer-docs/security /docs/building-apps/security/inter-canister-calls
  /docs/current/developer-docs/security/formal-verification /docs/building-apps/security/formal-verification
  /docs/current/developer-docs/security/general-security-best-practices /docs/building-apps/security/overview
  /docs/current/developer-docs/security/index /docs/building-apps/security/inter-canister-calls
  /docs/current/developer-docs/security/rust-canister-development-security-best-practices /docs/building-apps/security/inter-canister-calls

  ## Setup
  /docs/current/references/candid-ref /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/setup/accounts /docs/building-apps/getting-started/identities
  /docs/current/developer-docs/setup/best-practices/architecture /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/setup/best-practices/general /docs/building-apps/best-practices/general
  /docs/current/developer-docs/setup/best-practices/storage /docs/building-apps/best-practices/storage
  /docs/current/developer-docs/setup/best-practices/troubleshooting /docs/building-apps/best-practices/troubleshooting
  /docs/current/developer-docs/setup/build /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/setup/cycles/converting_icp_tokens_into_cycles /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/setup/cycles/cycles-faucet.md /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/setup/cycles/cycles-faucet /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/setup/cycles/cycles-wallet /docs/building-apps/canister-management/cycles-wallet
  /docs/current/developer-docs/setup/cycles /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/setup/cycles/index /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/setup/default-wallet /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/setup/delete /docs/building-apps/canister-management/delete
  /docs/current/developer-docs/setup/deploy-locally /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/setup/deploy-mainnet.md /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/setup/deploy-mainnet /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/setup/deploy /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/setup/development-workflow /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup/first-canister /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/setup/hello-world /docs/building-apps/developing-canisters/write
  /docs/current/developer-docs/setup/ic-admin https://github.com/dfinity/ic/releases
  /docs/current/developer-docs/developer-tools/cli-tools/ic-admin https://github.com/dfinity/ic/releases
  /docs/current/developer-docs/setup/index.md /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup/index /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup/install/ /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup/install/index.mdx /docs/building-apps/getting-started/install
  /docs/current/developer-docs/setup/manage-canisters /docs/building-apps/canister-management/settings
  /docs/current/developer-docs/setup/manage-projects /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/setup/playground /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/setup/pocket-ic /docs/building-apps/advanced/test/pocket-ic
  /docs/current/developer-docs/setup/pulling-canister-dependencies /docs/building-apps/advanced/using-third-party-canisters
  /docs/current/developer-docs/setup/react-quickstart /docs/building-apps/getting-started/quickstart
  /docs/current/developer-docs/setup/state /docs/building-apps/canister-management/state
  /docs/current/developer-docs/setup/upgrade /docs/building-apps/canister-management/upgrade
  /docs/current/developer-docs/setup/vs-code /docs/building-apps/developer-tools/icp-ninja

  ## Smart contracts
  /docs/current/developer-docs/smart-contracts/maintain/import /docs/building-apps/advanced/using-third-party-canisters
  /docs/current/developer-docs/smart-contracts/advanced-features/async-code /docs/references/async-code
  /docs/current/developer-docs/smart-contracts/advanced-features/composite-query /docs/building-apps/interact-with-canisters/query-calls
  /docs/current/developer-docs/smart-contracts/advanced-features/handling-get-post-requests /docs/building-apps/network-features/using-http/gateways
  /docs/current/developer-docs/smart-contracts/advanced-features/http-gateways /docs/building-apps/network-features/using-http/gateways
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/ /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-get /docs/building-apps/network-features/using-http/https-outcalls/get
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-how-to-use /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-overview /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-post /docs/building-apps/network-features/using-http/https-outcalls/post
  /docs/current/developer-docs/smart-contracts/advanced-features/management-canister /docs/references/system-canisters/management-canister
  /docs/current/developer-docs/smart-contracts/advanced-features/periodic-tasks /docs/building-apps/network-features/periodic-tasks-timers
  /docs/current/developer-docs/smart-contracts/advanced-features/query-stats /docs/building-apps/interact-with-canisters/query-calls
  /docs/current/developer-docs/smart-contracts/advanced-features/randomness /docs/building-apps/network-features/randomness
  /docs/current/developer-docs/smart-contracts/advanced-features/serving-http-request /docs/building-apps/network-features/using-http/gateways
  /docs/current/developer-docs/smart-contracts/advanced-features/simd /docs/building-apps/network-features/simd
  /docs/current/developer-docs/smart-contracts/advanced-features/system-canisters /docs/references/system-canisters/
  /docs/current/developer-docs/smart-contracts/advanced-features/threshold-signing /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/advanced-features/time-and-timestamps /docs/building-apps/network-features/time-and-timestamps
  /docs/current/developer-docs/smart-contracts/best-practices/architecture /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/best-practices/general /docs/building-apps/best-practices/general
  /docs/current/developer-docs/smart-contracts/best-practices/idempotency /docs/building-apps/best-practices/idempotency
  /docs/current/developer-docs/smart-contracts/best-practices/reproducible-builds /docs/building-apps/best-practices/reproducible-builds
  /docs/current/developer-docs/smart-contracts/best-practices/storage /docs/building-apps/best-practices/storage
  /docs/current/developer-docs/smart-contracts/best-practices/troubleshooting /docs/building-apps/best-practices/troubleshooting
  /docs/current/developer-docs/smart-contracts/call/arguments /docs/building-apps/interact-with-canisters/advanced-calls
  /docs/current/developer-docs/smart-contracts/call/overview /docs/building-apps/essentials/message-execution
  /docs/current/developer-docs/smart-contracts/candid/candid-howto /docs/building-apps/interact-with-canisters/candid/using-candid
  /docs/current/developer-docs/smart-contracts/candid/candid-tools /docs/building-apps/interact-with-canisters/candid/candid-tools
  /docs/current/developer-docs/smart-contracts/candid /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/smart-contracts/candid/index /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/smart-contracts/compile /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/create /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/deploy/custom-networks /docs/building-apps/developing-canisters/create
  /docs/current/developer-docs/smart-contracts/deploy/larger-wasm /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/deploy/overview /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/smart-contracts/deploy/sharing /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/smart-contracts/development-workflow /docs/building-apps/getting-started/install
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages-t-schnorr /docs/building-apps/network-features/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages-tecdsa /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/t-ecdsa /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/t-schnorr /docs/building-apps/network-features/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/encryption/using-vetkeys /docs/building-apps/network-features/encryption/using-vetkeys
  /docs/current/developer-docs/smart-contracts/encryption/vetkeys /docs/building-apps/network-features/encryption/vetkeys
  /docs/current/developer-docs/smart-contracts/install /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/overview/development-cycle /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/overview /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/overview/inside-canisters /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/overview/introduction /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/signatures/signing-messages-t-ecdsa /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/signatures/signing-messages-t-schnorr /docs/building-apps/network-features/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/signatures/signing-transactions /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/signatures/t-ecdsa /docs/building-apps/network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/signatures/t-schnorr /docs/building-apps/network-features/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/test/benchmarking /docs/building-apps/advanced/benchmarking
  /docs/current/developer-docs/smart-contracts/test/overview /docs/building-apps/advanced/test/overview
  /docs/current/developer-docs/smart-contracts/test/pocket-ic /docs/building-apps/advanced/test/pocket-ic
  /docs/current/developer-docs/smart-contracts/test/reproducible-builds /docs/building-apps/best-practices/reproducible-builds
  /docs/current/developer-docs/smart-contracts/test/staging-environment /docs/building-apps/developing-canisters/create
  /docs/current/developer-docs/smart-contracts/test/troubleshooting /docs/building-apps/getting-started/troubleshooting
  /docs/current/developer-docs/smart-contracts/topping-up/cycles_management_services /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/smart-contracts/topping-up/topping-up-canister /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/smart-contracts/write/auto-scaling-architecture /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/write/choosing-language /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/write/default-template /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/write/overview /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/smart-contracts/write/resources /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/updates/computation-and-storage-costs /docs/building-apps/essentials/gas-cost
  /docs/current/developer-docs/updates/release-notes/ /docs/other/updates/release-notes/
  /docs/current/developer-docs/use-cases/considerations-for-nft-devs /docs/defi/nft-collections
  /docs/current/developer-docs/getting-started/deploy-and-manage /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/getting-started/write-smart-contracts /docs/building-apps/developing-canisters/write
  /docs/current/developer-docs/smart-contracts/maintain/import /docs/building-apps/advanced/using-third-party-canisters

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
  /docs/developers-guide/customize-projects /docs/building-apps/essentials/canisters
  /docs/developers-guide/default-wallet.html /docs/building-apps/getting-started/tokens-and-cycles
  /docs/developers-guide/default-wallet /docs/building-apps/canister-management/topping-up
  /docs/developers-guide/design-apps /docs/building-apps/essentials/canisters
  /docs/developers-guide/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/glossary /docs/references/glossary
  /docs/developers-guide/install-upgrade-remove /docs/building-apps/getting-started/install
  /docs/developers-guide/lang-service-ide /docs/building-apps/developer-tools/icp-ninja
  /docs/developers-guide/reinstalling-dfx /docs/building-apps/getting-started/install
  /docs/developers-guide/sample-apps /samples
  /docs/developers-guide/sdk-guide.html /docs/building-apps/getting-started/install
  /docs/developers-guide/sdk-guide /docs/building-apps/getting-started/install
  /docs/developers-guide/troubleshooting /docs/building-apps/getting-started/troubleshooting
  /docs/developers-guide/tutorials-intro /docs/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/tutorials/default-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/developers-guide/tutorials/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/tutorials/my-contacts /docs/building-apps/frontends/using-an-asset-canister
  /docs/developers-guide/webpack-config /docs/building-apps/frontends/using-an-asset-canister
  /docs/developers-guide/work-with-languages /docs/building-apps/essentials/canisters
  /docs/developers-guide/working-with-canisters.html /docs/building-apps/canister-management/settings
  /docs/developers-guide/working-with-canisters /docs/building-apps/canister-management/settings
  /docs/developers-guide/quickstart.html /docs/building-apps/getting-started/quickstart
  /docs/developers-guide/concepts/canisters-code.html /docs/building-apps/essentials/canisters
  /docs/developers-guide/first-app/installation.html /docs/building-apps/getting-started/install


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
  /docs/current/developer-docs/quickstart/ /docs/tutorials/developer-liftoff/
  /docs/current/developer-docs/quickstart/hello10mins/ /docs/tutorials/developer-liftoff/
  /docs/current/developer-docs/quickstart/windows-wsl /docs/building-apps/getting-started/install

  ## Samples
  /docs/samples/codelabs/data-persistence /samples
  /docs/current/developer-docs/daos/nns/ https://learn.internetcomputer.org/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/current/developer-docs/defi/tokens/icrc-1/ /docs/defi/token-standards/
  /docs/current/developer-docs/integrations/http-requests /docs/building-apps/network-features/using-http/https-outcalls/overview
  /docs/current/developer-docs/integrations/nns/nns-app-quickstart https://learn.internetcomputer.org/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/language-guide/compiler-ref.html /docs/motoko/main/reference/language-manual
  /docs/current/motoko/main/motokolimbajul /docs/motoko/main/getting-started/motoko-introduction
  /docs/samples/codelabs/minimalistic-motoko-dapp /samples
  /docs/samples/codelabs/minimalistic-rust-dapp /samples
  /docs/samples/codelabs /samples
  /docs/samples/codelabs/simple-nft /samples
  /docs/samples/codelabs/static-website /samples
  /docs/samples/deploying-your-first-bitcoin-dapp /samples
  /docs/samples/encrypted-notes/ /samples
  /docs/samples/ /samples
  /docs/samples/game-of-life /samples
  /docs/samples/host-a-webgame /samples
  /docs/samples/host-a-website /samples
  /docs/samples/internet-identity-sample /samples
  /docs/samples/nft /samples
  /docs/current/samples/actor-reference /samples
  /docs/current/samples/hello/ /samples
  /docs/current/samples/phonebook /samples
  /docs/current/samples/counter /samples
  /docs/current/samples/dao/ /samples
  /docs/current/samples/dex/ /samples
  /docs/current/samples/pos /samples
  /docs/current/samples/t-ecdsa-sample /samples
  /docs/current/samples/vetkd-encrypted-notes /samples

  ## Misc
  /docs/current/developer-docs/use-cases/ /docs/home
  /BTC /bitcoin-integration
  /chain-fusion /chainfusion
  /docs/current/developer-docs/backend/actors-programming /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/backend/rust/rust-canister-quickstart /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/deploy/cycles /docs/building-apps/essentials/gas-cost
  /docs/current/developer-docs/frontend/candid-ui /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/motoko/main/base/rbtree /docs/motoko/main/base/RBTree
  /docs/defi/chain-key-tokens/ /docs/defi/chain-key-tokens/overview
  /docs/references/ic-interface /docs/references/ic-interface-spec
  /docs/current/tokenomics/token-holders/nns-app-quickstart /docs/building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-staking-a-neuron
  /docs/current/references/cli-reference/dfx-ledger/ /docs/building-apps/developer-tools/dfx/dfx-ledger
  /docs/current/samples/deploying-your-first-bitcoin-dapp /samples
  /docs/current/samples/host-a-website/ /samples
  /features/serve-web-content/ /capabilities
  /docs/tutorials/developer-liftoff/level-0/dev-env /docs/tutorials/developer-liftoff/level-0/intro-canisters
  /docs/tutorials/developer-liftoff/level-0/intro-canisters /docs/tutorials/developer-liftoff/level-0/intro-languages
  /docs/tutorials/developer-liftoff/level-0/intro-languages /docs/tutorials/developer-liftoff/level-0/tooling
  /docs/tutorials/developer-liftoff/level-0/intro-dfx /docs/tutorials/developer-liftoff/level-0/first-dapp
  /docs/tutorials/developer-liftoff/level-1/1.1-live-demo /docs/tutorials/developer-liftoff/level-1/1.1-motoko-lvl1
  /docs/tutorials/developer-liftoff/level-1/1.2-motoko-lvl1 /docs/tutorials/developer-liftoff/level-1/1.2-dev-env
  /docs/tutorials/developer-liftoff/level-1/1.3-first-dapp /docs/tutorials/developer-liftoff/level-1/1.3-intro-dfx
  /docs/building-apps/developer-tools/cdks/rust/candid/ /docs/building-apps/developer-tools/cdks/rust/generating-candid
  /docs/concepts/glossary /docs/references/glossary
  /docs/current/developer-docs/defi/icrc-1/using-icrc1-ledger /docs/defi/token-ledgers/setup/icrc1_ledger_setup
  /docs/current/motoko/main/about-motoko/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/developer-docs/backend/resource-limits /docs/building-apps/canister-management/resource-limits
  /docs/developer-docs/integrations/bitcoin/bitcoin-how-it-works /docs/building-apps/chain-fusion/bitcoin/overview
  /docs/developer-docs/integrations/icrc-1/ /docs/defi/token-ledgers/setup/icrc1_ledger_setup
  /docs/motoko/reference/language-manual /docs/motoko/main/reference/language-manual
  /docs/references/ic-interface /docs/references/ic-interface-spec
  /docs/building-apps/chain-fusion/ethereum/evm-rpc/ /docs/building-apps/chain-fusion/ethereum/evm-rpc/overview
  /docs/building-apps/developing-canisters/creates /docs/building-apps/developing-canisters/create
  /docs/current/developer-docs/setup/download-install /docs/building-apps/getting-started/install
  /docs/current/developer-docs/smart-contracts/candid /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/motoko/version /docs/building-apps/getting-started/install  
  /docs/references/ /docs/references/ic-interface-spec
  /ecosystem.json /ecosystem
  /ethereum /chainfusion
  /img/ /docs/home
  /docs/defi /docs/defi/overview
  /docs/current/tokenomics/nns/nns-staking-voting-rewards/ https://learn.internetcomputer.org/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/download.html /docs/home
  /docs/ic-identity-guide/what-is-ic-identity.html /docs/home
  /docs/language-guide/style.html /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/tutorials/developer-journey/level-5/5.2-icp-eth-tutorial /docs/tutorials/developer-liftoff/level-5/5.2-ICP-ETH-tutorial
  /docs/current/tutorials/developer-journey/level-5/5.4-nft-tutorial /docs/tutorials/developer-liftoff/level-5/5.4-NFT-tutorial
  /docs/current/tutorials/developer-journey/level-5/5.1-vetkeys-tutorial /docs/tutorials/developer-liftoff/level-5/5.1-vetKeys-tutorial
  /docs/current/tutorials/developer-liftoff/level-5/5.1-vetkeys-tutorial /docs/tutorials/developer-liftoff/level-5/5.1-vetKeys-tutorial
  /docs/current/tutorials/developer-liftoff/level-5/5.2-icp-eth-tutorial /docs/tutorials/developer-liftoff/level-5/5.2-ICP-ETH-tutorial
  /docs/current/tutorials/developer-liftoff/level-5/5.4-nft-tutorial /docs/tutorials/developer-liftoff/level-5/5.4-NFT-tutorial
  /docs/introduction/ /docs/home
  /docs/rust/ /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/integrations/bitcoin/btc-address-management /docs/building-apps/chain-fusion/bitcoin/using-btc/generate-addresses
  /docs/rust/main/ /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/getting-started/deploy/mainnet /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/functionality/bitcoin /docs/building-apps/chain-fusion/bitcoin/overview
  /docs/current/developer-docs/build/cdks/azle-demergent-labs https://demergent-labs.github.io/azle/
  /docs/candid-guide/candid-intro.html /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/home /docs/home
  /docs/building /docs/home
  /docs/building-apps/ /docs/home
  /docs/introduction/welcome.html /docs/home
  /docs/rust-guide/rust-quickstart.html /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /install.sh) /docs/building-apps/getting-started/install
  /become-a-member /news
  /docs/agent /docs/building-apps/interact-with-canisters/agents/overview
  /docs/base-libraries/int.html /docs/motoko/main/getting-started/motoko-introduction
  /docs/base-libraries/iter.html /docs/motoko/main/getting-started/motoko-introduction
  /docs/base-libraries/option.html /docs/motoko/main/getting-started/motoko-introduction
  /docs/building-apps/ /docs/building-apps/getting-started/quickstart
  /docs/building-apps/getting-started/ /docs/building-apps/getting-started/quickstart
  /docs/candid-guide/candid-howto /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/building-apps/getting-started/quickstart /docs/building-apps/getting-started/quickstart
  /developers-guide/tutorials/phonebook.html /samples
  /docs/current/tokenomics/identity-auth/auth-how-to /docs/building-apps/authentication/integrate-internet-identity
  /docs/current/tokenomics/identity-auth/ /docs/building-apps/authentication/integrate-internet-identity
  /docs/current/tokenomics/ /how-it-works/tokenomics
  /docs /docs/home
  /docs/current/references/ii-spec /docs/references/ii-spec
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
  /docs/language-guide/language-manual.html /docs/motoko/main/getting-started/motoko-introduction
  /docs/language-guide/motoko.html /docs/motoko/main/getting-started/motoko-introduction
  /docs/languages/languages-overview /docs/building-apps/essentials/canisters
  /docs/local-quickstart.html /docs/building-apps/getting-started/install
  /docs/network-quickstart.html /docs/building-apps/getting-started/install
  /docs/operators-guide/ops-guide /docs/home
  /docs/videos-tutorials /docs/home
  /education /education-hub
  /features /capabilities
  /features/ /capabilities
  /features/green /capabilities/sustainability
  /grants https://dfinity.org/grants
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
  /docs/search /docs/home
  /docs/security-best-practices/ /docs/building-apps/security/inter-canister-calls
  /docs/security-best-practices/introduction /docs/building-apps/security/overview
  /docs/support /docs/home
  /docs/token-holders/ /docs/defi/overview
  /docs/token-holders/nns-app-quickstart.html /docs/building-apps/governing-apps/nns/using-the-nns-dapp/nns-app-quickstart
  /docs/token-holders/seed-donations.html https://wiki.internetcomputer.org/wiki/How-To:_Claim_neurons_for_seed_participants
  /docs/token-holders/self-custody-quickstart.html /docs/defi/overview
  /docs/current/tokenomics/identity-auth/auth-how-to /docs/building-apps/authentication/overview
  /docs/current/tokenomics/identity-auth/what-is-ic-identity /docs/building-apps/authentication/overview
  /docs/current/tokenomics/index https://learn.internetcomputer.org/hc/en-us/articles/34084394684564-SNS-Service-Nervous-System
  /docs/current/tokenomics/nns/community-fund https://learn.internetcomputer.org/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/tokenomics/nns/neurons-fund https://learn.internetcomputer.org/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/tokenomics/nns/nns-intro https://learn.internetcomputer.org/hc/en-us/articles/33692645961236-NNS-Network-Nervous-System
  /docs/current/tokenomics/nns/nns-staking-voting-rewards https://learn.internetcomputer.org/hc/en-us/articles/34084120668692-NNS-Neurons
  /docs/current/tokenomics/nns/proposal-requirements https://learn.internetcomputer.org/hc/en-us/articles/34084113508500-Proposals
  /docs/current/tokenomics/sns/ /docs/building-apps/governing-apps/tokenomics/
  /docs/current/tokenomics/sns/sns-intro-tokens https://learn.internetcomputer.org/hc/en-us/articles/34088279488660-Tokenomics
  /docs/current/tokenomics/sns/tokenomics /docs/building-apps/governing-apps/tokenomics/
  /docs/current/tokenomics/token-holders/custody-options-intro /docs/defi/overview
  /docs/current/tokenomics/token-holders/nns-app-quickstart /docs/building-apps/governing-apps/nns/using-the-nns-dapp/nns-app-quickstart
  /docs/current/tokenomics/token-holders/self-custody-quickstart /docs/defi/overview
  /docs/tutorials/ /docs/building-apps/essentials/network-overview
  /docs/tutorials/index /docs/building-apps/essentials/network-overview
  /docs/current/developer-docs/production/best-practices /docs/building-apps/best-practices/general
  /docs/current/developer-docs/production/canister-history /docs/building-apps/canister-management/history
  /docs/current/developer-docs/production/canister-recovery /docs/building-apps/canister-management/snapshots
  /docs/current/developer-docs/production/computation-and-storage-costs /docs/building-apps/essentials/gas-cost
  /docs/current/developer-docs/production/custom-domain/dns-setup /docs/building-apps/frontends/custom-domains/dns-setup
  /docs/current/developer-docs/production/custom-domain/ /docs/building-apps/frontends/custom-domains/using-custom-domains
  /docs/current/developer-docs/production/deploying-and-upgrading /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/production/instruction-limits /docs/building-apps/canister-management/resource-limits
  /docs/current/developer-docs/production/larger-wasm /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/production/resource-limits /docs/building-apps/canister-management/resource-limits
  /docs/current/developer-docs/production/social-sharing /docs/building-apps/developing-canisters/deploy
  /docs/current/developer-docs/production/staging-environment /docs/building-apps/developing-canisters/create
  /docs/current/developer-docs/production/storage /docs/building-apps/canister-management/storage
  /docs/current/developer-docs/production/system-canisters /docs/references/system-canisters/
  /docs/current/developer-docs/production/topping-up-canister/ /docs/building-apps/canister-management/topping-up
  /docs/current/developer-docs/quickstart/cycles-faucet /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/backend/solidity/ https://docs.bitfinity.network/
  /docs/current/developer-docs/backend/subnet-types /docs/building-apps/developing-canisters/create
  /docs/current/developer-docs/backend/troubleshooting /docs/building-apps/getting-started/troubleshooting
  /docs/current/developer-docs/backend/typescript/ https://demergent-labs.github.io/azle/
  /docs/current/developer-docs/best-practices/considerations-for-nft-devs /docs/defi/overview
  /docs/current/developer-docs/build/backend/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/build/backend/reproducible-builds /docs/building-apps/best-practices/reproducible-builds
  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/  /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/rust-quickstart /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/build/cdks/ /docs/building-apps/developer-tools/cdks/
  /docs/current/developer-docs/build/cdks/motoko-dfinity /docs/building-apps/developer-tools/cdks/
  /docs/current/developer-docs/build/cdks/motoko-dfinity/ /docs/motoko/main/base/
  /docs/current/developer-docs/build/cdks/motoko-dfinity/language-manual /docs/motoko/main/reference/language-manual
  /docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/build/backend/define-an-actor /docs/motoko/main/writing-motoko/actors-async
  /docs/current/developer-docs/build/cdks/motoko-dfinity/actor-classes /docs/motoko/main/writing-motoko/actor-classes
  /docs/current/developer-docs/build/cdks/motoko-dfinity/actors-async /docs/motoko/main/writing-motoko/actors-async
  /docs/current/developer-docs/build/cdks/motoko-dfinity/base/iter/ /docs/motoko/main/base/Iter
  /docs/current/developer-docs/build/cdks/motoko-dfinity/base/itertype/ /docs/motoko/main/base/IterType
  /docs/current/developer-docs/build/cdks/motoko-dfinity/basic-concepts/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/build/cdks/motoko-dfinity/modules-and-imports/ /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/build/cdks/motoko-dfinity/pattern-matching /docs/motoko/main/writing-motoko/pattern-matching
  /docs/current/developer-docs/build/cdks/motoko-dfinity/upgrades/ /docs/motoko/main/canister-maintenance/upgrades
  /docs/current/developer-docs/build/ /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/defi/icp-tokens/ledger-local-setup /docs/defi/token-ledgers/setup/icp_ledger_setup
  /docs/current/developer-docs/defi/icrc-1/icrc1-ledger-setup /docs/defi/token-ledgers/setup/icrc1_ledger_setup
  /docs/current/developer-docs/getting-started/cycles/cycles-faucet /docs/building-apps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/build/frontend/default-frontend /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/build/frontend/webpack-config /docs/building-apps/frontends/using-an-asset-canister
  /docs/current/developer-docs/build/install-upgrade-remove /docs/building-apps/getting-started/install
  /docs/current/developer-docs/build/languages/candid/ /docs/building-apps/interact-with-canisters/candid/candid-concepts
  /docs/current/developer-docs/build/languages/motoko /docs/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/build/languages/motoko/ /docs/motoko/main/base/
  /docs/current/developer-docs/build/languages/other-languages/ /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/build/languages/rust/ /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/build/languages/rust/rust-intro /docs/building-apps/developer-tools/cdks/rust/intro-to-rust
  /docs/current/developer-docs/build/languages/work-with-languages /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/build/project-setup/cycles-wallet /docs/building-apps/canister-management/cycles-wallet
  /docs/current/developer-docs/build/project-setup/design-dapps /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/build/project-setup/manage-canisters /docs/building-apps/canister-management/settings
  /docs/current/developer-docs/build/troubleshooting /docs/building-apps/getting-started/troubleshooting
  /docs/current/developer-docs/build/using-an-agent /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/chain-fusion/ethereum/siwe /docs/building-apps/authentication/overview
  /docs/current/developer-docs/cost-estimations-and-examples /docs/building-apps/essentials/cost-estimations-and-examples
  /docs/current/developer-docs/http-compatible-canisters/custom-http-canisters /docs/building-apps/network-features/using-http/http-certification/custom-http-canisters
  /docs/current/developer-docs/http-compatible-canisters/serving-json-over-http /docs/building-apps/network-features/using-http/http-certification/serving-json-over-http
  /docs/current/developer-docs/http-compatible-canisters/serving-static-assets-over-http  /docs/building-apps/network-features/using-http/http-certification/serving-static-assets-over-http
  /docs/current/developer-docs/ic-overview /docs/building-apps/essentials/network-overview
  /docs/current/developer-docs/backend/arguments /docs/building-apps/interact-with-canisters/advanced-calls
  /docs/current/developer-docs/backend/choosing-language /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/backend/design-dapps /docs/building-apps/essentials/canisters
  /docs/current/developer-docs/backend /docs/building-apps/essentials/network-overview
  /docs/current/developer-docs/backend/eu-subnets /docs/building-apps/developing-canisters/create
  /docs/current/developer-docs/backend/periodic-tasks /docs/building-apps/network-features/periodic-tasks-timers
  /docs/current/developer-docs/backend/python/ https://demergent-labs.github.io/kybra/
  /docs/current/developer-docs/backend/reproducible-builds /docs/building-apps/best-practices/reproducible-builds
  /docs/current/developer-docs/backend/resource-limits /docs/building-apps/canister-management/resource-limits
  /apis/site/proxy /docs/references/http-gateway-protocol-spec
  /base-libraries/ /docs/motoko/main/base/
  /basics /what-is-the-ic
  /bitcoin /bitcoin-integration
  /bootcamp /education-hub
  /docs/current/blog/features/vetkey-primer /docs/references/vetkeys-overview
  /docs/current/references/ingress-messages/ /docs/building-apps/essentials/message-execution

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
      (r) => isSplat(r) && !isExternal(r) && !isExactUrl(r))
    ) {
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
