const redirects = `

  # external redirects (/from -> https://.../to/)
  /docs/token-holders/seed-donations.html https://wiki.internetcomputer.org/wiki/How-To:_Claim_neurons_for_seed_participants
  /deck-main https://deck.internetcomputer.org
  /live-sessions https://dfinity.org/events-and-news/#videos-live-sessions

  # .html file internal redirects (/../from.html -> to)
  /docs/developers-guide/working-with-canisters.html /docs/current/developer-docs/smart-contracts/maintain/settings

  # regular internal redirects (from -> to)
  /docs/current/references/motoko-ref/* /docs/current/motoko/main/base/:splat
  /features/green /capabilities/sustainability
  /features /capabilities
  /openchat /sns
  /howitworks /how-it-works
  /showcase /ecosystem
  /multichain /chainfusion
  /basics /what-is-the-ic
  /community https://linktr.ee/icp_hubs_network
  /icp-event /events
  /videos /news
  /icp-newsletter /news
  /ois /sns
  /docs/current/developer-docs/getting-started/overview-of-icp /docs/current/developer-docs/getting-started/network-overview
  /docs/videos-tutorials /docs/current/home
  /docs /docs/current/home
  /docs/current/ /docs/current/home
  /docs/current/concepts/bitcoin-integration /bitcoin-integration
  /docs/current/developer-docs/ic-overview /docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/production/computation-and-storage-costs /docs/current/developer-docs/gas-cost
  /docs/current/developer-docs/deploy/computation-and-storage-costs /docs/current/developer-docs/gas-cost
  /docs/current/ic-overview  /docs/current/home
  /docs/download /docs/current/developer-docs/getting-started/install
  /docs/http-middleware /docs/current/home
  /docs/introduction/welcome /docs/current/home
  /docs/operators-guide/ops-guide /docs/current/home
  /docs/search /docs/current/home
  /docs/support /docs/current/home
  /docs/samples /samples
  /docs/samples/codelabs /samples
  /docs/samples/codelabs/data-persistence /samples
  /docs/samples/codelabs/minimalistic-motoko-dapp /samples
  /docs/samples/codelabs/minimalistic-rust-dapp /samples
  /docs/samples/codelabs/simple-nft /samples
  /docs/samples/codelabs/static-website /samples
  /docs/samples/* /samples
  /docs/security-best-practices/introduction /docs/current/developer-docs/security/security-best-practices/overview
  /docs/current/developer-docs/setup/default-wallet /docs/current/developer-docs/defi/cycles/cycles-wallet
  /docs/current/tokenomics/sns/tokenomics /docs/current/developer-docs/daos/sns/tokenomics/
  /docs/current/developer-docs/integrations/http_requests/http_requests-how-it-works /docs/current/references/https-outcalls-how-it-works
  /docs/current/developer-docs/daos/sns/tokenomics/sns-intro-tokens /docs/current/developer-docs/daos/sns/tokenomics/
  /docs/current/developer-docs/integrations/sns/tokenomics/tokenomics /docs/current/developer-docs/daos/sns/tokenomics/tokenomics-intro
  /docs/rust-guide/rust-intro /docs/current/developer-docs/backend/rust/
  /docs/languages/languages-overview /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/smart-contracts/write/choosing-language /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/frontend/my-contacts /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/ic-interface-spec /docs/current/references/ic-interface-spec
  /docs/interface-spec /docs/current/references/ic-interface-spec
  /docs/current/developer-docs/updates/computation-and-storage-costs /docs/current/developer-docs/gas-cost
  /docs/current/developer-docs/updates/release-notes/ /docs/current/other/updates/release-notes/
  /docs/current/developer-docs/quickstart/local-quickstart /docs/current/developer-docs/getting-started/install
  /docs/current/developer-docs/setup/install/index.mdx /docs/current/developer-docs/getting-started/install

  /docs/candid-guide /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/candid-guide/candid /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/candid-guide/candid-intro /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/candid-guide/candid-ref /docs/current/references/candid-ref
  /docs/candid-guide/candid-types /docs/current/references/candid-ref
  /docs/current/developer-docs/build/candid/candid-intro /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/current/developer-docs/build/candid/candid-howto /docs/current/developer-docs/smart-contracts/candid/candid-howto

  /docs/current/developer-docs/build/ /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/build/candid/candid-concepts /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/current/developer-docs/build/languages/other-languages/* /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/build/languages/work-with-languages /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/build/using-an-agent /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/build/backend/reproducible-builds /docs/current/developer-docs/smart-contracts/best-practices/reproducible-builds
  /docs/current/developer-docs/build/cdks/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/build/frontend/default-frontend /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/build/frontend/webpack-config /docs/current/developer-docs/web-apps/application-frontends/overview#modifying-the-webpack-configuration
  /docs/current/developer-docs/build/install-upgrade-remove /docs/current/developer-docs/getting-started/install
  /docs/current/developer-docs/build/languages/rust/* /docs/current/developer-docs/backend/rust/
  /docs/current/developer-docs/build/project-setup/cycles-wallet /docs/current/developer-docs/defi/cycles/cycles-wallet
  /docs/current/developer-docs/build/project-setup/manage-canisters /docs/current/developer-docs/smart-contracts/maintain/settings
  /docs/current/developer-docs/build/project-setup/design-dapps /docs/current/developer-docs/smart-contracts/overview/introduction
  /docs/current/developer-docs/build/troubleshooting /docs/current/developer-docs/getting-started/troubleshooting
  /docs/current/developer-docs/build/agents/ /docs/current/developer-docs/developer-tools/off-chain/agents/overview
  /docs/current/developer-docs/build/agents/javascript/javascript-intro /docs/current/developer-docs/developer-tools/off-chain/agents/javascript-agent
  /docs/current/developer-docs/build/agents/javascript/*  /docs/current/developer-docs/developer-tools/off-chain/agents/javascript-agent
  /docs/current/developer-docs/build/languages/candid/* /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/current/developer-docs/build/cdks/motoko-dfinity/* /docs/current/motoko/main/:splat
  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/*  /docs/current/developer-docs/backend/rust/:splat
  /docs/current/developer-docs/build/languages/motoko/* /docs/current/motoko/main/:splat

  /docs/developers-guide/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/about-this-guide /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/basic-syntax-rules /docs/current/motoko/main/reference/language-manual
  /docs/developers-guide/concepts/bitcoin-integration /bitcoin-integration
  /docs/developers-guide/concepts/concepts-intro /docs/current/developer-docs/getting-started/network-overview
  /docs/developers-guide/customize-projects /docs/current/developer-docs/smart-contracts/compile
  /docs/developers-guide/default-wallet /docs/current/developer-docs/defi/cycles/cycles-wallet
  /docs/developers-guide/design-apps /docs/current/developer-docs/smart-contracts/overview/introduction
  /docs/developers-guide/glossary /docs/current/references/glossary
  /docs/developers-guide/install-upgrade-remove /docs/current/developer-docs/getting-started/install
  /docs/developers-guide/lang-service-ide /docs/current/developer-docs/developer-tools/ide/vs-code
  /docs/developers-guide/reinstalling-dfx /docs/current/developer-docs/getting-started/install
  /docs/developers-guide/sample-apps /samples
  /docs/developers-guide/sdk-guide /docs/current/developer-docs/getting-started/install
  /docs/developers-guide/troubleshooting /docs/current/developer-docs/getting-started/troubleshooting
  /docs/developers-guide/tutorials-intro /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/tutorials/default-frontend /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/developers-guide/tutorials/my-contacts /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/developers-guide/webpack-config /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/developers-guide/work-with-languages /docs/current/developer-docs/smart-contracts/write/overview
  /docs/developers-guide/working-with-canisters /docs/current/developer-docs/smart-contracts/maintain/settings

  /docs/quickstart/1-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/2-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/3-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/4-2-convert-icp-to-cycles /docs/current/tutorials/developer-journey/
  /docs/quickstart/4-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/5-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/cycles-faucet /docs/current/developer-docs/getting-started/tokens-and-cycles
  /docs/quickstart/local-quickstart /docs/current/developer-docs/getting-started/deploy-and-manage
  /docs/quickstart/network-quickstart /docs/current/developer-docs/getting-started/deploy-and-manage
  /docs/quickstart/quickstart-intro /docs/current/tutorials/developer-journey/
  /docs/quickstart/newcomers /docs/current/home
  /docs/current/developer-docs/quickstart/* /docs/current/tutorials/developer-journey/
  /developers-guide/quickstart /docs/current/tutorials/developer-journey/
  /docs/current/developer-docs/quickstart/cycles-faucet /docs/current/developer-docs/getting-started/tokens-and-cycles
  /docs/current/developer-docs/quickstart/windows-wsl /docs/current/developer-docs/getting-started/install
  /docs/current/developer-docs/quickstart/hello10mins/ /docs/current/tutorials/developer-journey/

  /docs/rosetta-api/ledger /docs/current/developer-docs/defi/tokens/token-standards
  /docs/rosetta-api/ledger-local-setup /docs/current/developer-docs/defi/tokens/ledger/setup/icp_ledger_setup
  /docs/integration/ledger-quick-start /docs/current/developer-docs/defi/tokens/token-standards
  /docs/current/developer-docs/functionality/ledger/* /docs/current/developer-docs/defi/tokens/ledger/setup/icp_ledger_setup

  /docs/base-libraries/* /docs/current/motoko/main/base/:splat
  /base-libraries/* /docs/current/motoko/main/base/:splat
  /docs/current/developer-docs/best-practices/* /docs/current/developer-docs/use-cases/:splat
  /docs/current/developer-docs/deploy/* /docs/current/developer-docs/production/:splat
  /docs/current/references/security/* /docs/current/developer-docs/security/security-best-practices/overview
  /docs/current/tokenomics/nns/community-fund /docs/current/developer-docs/daos/nns/concepts/neurons-fund
  /docs/current/tokenomics/sns/* /docs/current/developer-docs/daos/sns/tokenomics/:splat
  /docs/developers-guide/cli-reference/* /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/:splat
  /docs/developers-guide/concepts/* /docs/current/developer-docs/getting-started/network-overview
  /docs/developers-guide/tutorials/* /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/ic-identity-guide/* /docs/current/tokenomics/identity-auth/:splat
  /docs/language-guide/* /docs/current/motoko/main/:splat
  /docs/release-notes/* /docs/current/other/updates/release-notes/:splat
  /docs/rosetta-api/* /docs/current/developer-docs/integrations/rosetta/:splat
  /docs/rust-guide/* /docs/current/developer-docs/backend/rust/:splat
  /docs/security-best-practices/* /docs/current/developer-docs/security/security-best-practices/inter-canister-calls
  /docs/token-holders/* /docs/current/tokenomics/token-holders/:splat
  /features/* /capabilities/:splat
  /howitworks/* /how-it-works/:splat
  /docs/current/developer-docs/build/backend/* /docs/current/motoko/main/getting-started/motoko-introduction
  /sustainability /capabilities/sustainability
  /docs/current/tutorials/deploy_sample_app /docs/current/tutorials/developer-journey/
  /install.sh)" /docs/current/developer-docs/getting-started/install
  /docs/current/motoko/intro/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/tutorials/create_your_first_app/ /docs/current/tutorials/developer-journey/
  /docs/quickstart/quickstart-intro.html /docs/current/developer-docs/getting-started/install
  /docs/ic-identity-guide/auth-how-to.html /docs/current/developer-docs/identity/internet-identity/integrate-internet-identity/
  /docs/current/developer-docs/build/agents/agent-dfinity	/docs/current/developer-docs/developer-tools/off-chain/agents/overview
  /docs/current/tokenomics/identity-auth/what-is-ic-identity /docs/current/developer-docs/identity/internet-identity/overview
  /docs/quickstart/local-quickstart.html /docs/current/developer-docs/getting-started/install
  /language-guide/ /docs/current/tutorials/developer-journey/level-0/intro-languages
  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/rust-quickstart /docs/current/developer-docs/backend/rust/
  /docs/quickstart/network-quickstart.html /docs/current/developer-docs/getting-started/install
  /docs/token-holders/nns-app-quickstart.html /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-app-quickstart
  /docs/current/developer-docs/daos/nns/nns-app-quickstart /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-app-quickstart
  /developers-guide/quickstart.html /docs/current/tutorials/developer-journey/
  /docs/current/tokenomics/identity-auth/auth-how-to /docs/current/developer-docs/identity/internet-identity/overview
  /docs/developers-guide/tutorials-intro.html /docs/current/tutorials/developer-journey/
  /docs/quickstart/quickstart.html /docs/current/developer-docs/getting-started/install
  /apis/site/proxy /docs/current/references/http-gateway-protocol-spec
  /docs/developers-guide/concepts/what-is-ic /docs/current/developer-docs/getting-started/network-overview
  /language-guide/index /docs/current/tutorials/developer-journey/level-0/intro-languages
  /docs/current/developer-docs/production/instruction-limits /docs/current/developer-docs/smart-contracts/maintain/resource-limits
  /docs/current/developer-docs/backend/resource-limits /docs/current/developer-docs/smart-contracts/maintain/resource-limits
  /docs/current/concepts/data-centers /docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/build/languages/rust/rust-intro /docs/current/developer-docs/backend/rust/
  /docs/current/developer-docs/build/languages/motoko /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/integrations/sns/launching/launch-summary /docs/current/developer-docs/daos/sns/launching/launch-summary-1proposal
  /docs/current/developer-docs/integrations/sns/launching/launch-steps /docs/current/developer-docs/daos/sns/launching/launch-steps-1proposal
  /docs/current/developer-docs/frontend/javascript-frontend /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/frontend/react-frontend /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/frontend/svelte-frontend /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/frontend/vue-frontend /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/setup/cycles/index /docs/current/developer-docs/defi/cycles/cycles-wallet
  /docs/current/developer-docs/setup/cycles /docs/current/developer-docs/defi/cycles/cycles-wallet
  /docs/current/concepts/index /docs/current/developer-docs/getting-started/network-overview
  /docs/current/concepts /docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/backend/candid/index /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/current/developer-docs/integrations/https-outcalls/index /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-how-to-use
  /docs/current/developer-docs/integrations/https-outcalls /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-how-to-use
  /docs/current/developer-docs/security/index /docs/current/developer-docs/security/security-best-practices/inter-canister-calls
  /docs/current/developer-docs/security /docs/current/developer-docs/security/security-best-practices/inter-canister-calls
  /docs/current/developer-docs/integrations/index /docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/integrations /docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/setup/index /docs/current/developer-docs/getting-started/install
  /docs/current/developer-docs/setup /docs/current/developer-docs/getting-started/install
  /docs/current/developer-docs/setup/quickstart /docs/current/developer-docs/getting-started/install
  /docs/current/tutorials/index /docs/current/developer-docs/getting-started/network-overview
  /docs/current/tutorials/ /docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/backend/eu-subnets /docs/current/references/subnets/subnet-types
  /docs/current/samples/* /docs/current/samples/overview
  /docs/current/developer-docs/backend/choosing-language /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/production/deploying-and-upgrading /docs/current/developer-docs/smart-contracts/deploy/overview
  /docs/current/developer-docs/index /docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs /docs/current/developer-docs/getting-started/network-overview
  /docs/current/concepts/what-is-ic /docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/setup/development-workflow /docs/current/developer-docs/smart-contracts/development-workflow
  /docs/current/developer-docs/setup/hello-world /docs/current/developer-docs/getting-started/write-smart-contracts
  /docs/current/developer-docs/setup/install/ /docs/current/developer-docs/getting-started/install
  /docs/current/developer-docs/setup/accounts /docs/current/developer-docs/getting-started/identities
  /docs/current/developer-docs/setup/cycles/cycles-faucet /docs/current/developer-docs/getting-started/tokens-and-cycles
  /docs/current/developer-docs/setup/cycles/cycles-wallet /docs/current/developer-docs/defi/cycles/cycles-wallet
  /docs/current/developer-docs/setup/cycles/converting_icp_tokens_into_cycles /docs/current/developer-docs/defi/cycles/converting_icp_tokens_into_cycles
  /docs/current/developer-docs/setup/first-canister /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/setup/deploy-locally /docs/current/developer-docs/getting-started/deploy-and-manage
  /docs/current/developer-docs/setup/deploy-mainnet /docs/current/developer-docs/getting-started/deploy-and-manage
  /docs/current/developer-docs/production/best-practices /docs/current/developer-docs/smart-contracts/best-practices/general
  /docs/current/references/dev-tools-overview /docs/current/developer-docs/developer-tools/dev-tools-overview
  /docs/current/references/cdks /docs/current/developer-docs/developer-tools/on-chain/cdks
  /docs/current/developer-docs/agents/ /docs/current/developer-docs/developer-tools/off-chain/agents/overview
  /docs/current/developer-docs/agents/javascript-intro /docs/current/developer-docs/developer-tools/off-chain/agents/javascript-agent
  /docs/current/developer-docs/agents/nodejs /docs/current/developer-docs/developer-tools/off-chain/agents/nodejs
  /docs/current/developer-docs/agents/ic-agent-dfinity /docs/current/developer-docs/developer-tools/off-chain/agents/rust-agent
  /docs/current/references/gitpod /docs/current/developer-docs/developer-tools/ide/gitpod
  /docs/current/developer-docs/setup/playground /docs/current/developer-docs/getting-started/deploy-and-manage
  /docs/current/developer-docs/setup/vs-code /docs/current/developer-docs/developer-tools/ide/vs-code
  /docs/current/developer-docs/setup/react-quickstart /docs/current/developer-docs/web-apps/application-frontends/quickstart/react-quickstart
  /docs/current/references/cli-reference/ /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/
  /docs/current/references/cli-reference/dfx-parent /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-parent
  /docs/current/references/cli-reference/dfx-bootstrap /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-bootstrap
  /docs/current/references/cli-reference/dfx-build /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-build
  /docs/current/references/cli-reference/dfx-cache /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-cache
  /docs/current/references/cli-reference/dfx-canister /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-canister
  /docs/current/references/cli-reference/dfx-deploy /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-deploy
  /docs/current/references/cli-reference/dfx-generate /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-generate
  /docs/current/references/cli-reference/dfx-help /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-help
  /docs/current/references/cli-reference/dfx-identity /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-identity
  /docs/current/references/cli-reference/dfx-info /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-info
  /docs/current/references/cli-reference/dfx-ledger /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-ledger
  /docs/current/references/cli-reference/dfx-new /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-new
  /docs/current/references/cli-reference/dfx-nns /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-nns
  /docs/current/references/cli-reference/dfx-ping /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-ping
  /docs/current/references/cli-reference/dfx-quickstart /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-quickstart
  /docs/current/references/cli-reference/dfx-replica /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-replica
  /docs/current/references/cli-reference/dfx-schema /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-schema
  /docs/current/references/cli-reference/dfx-sns /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-sns
  /docs/current/references/cli-reference/dfx-start /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-start
  /docs/current/references/cli-reference/dfx-stop /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-stop
  /docs/current/references/cli-reference/dfx-upgrade /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-upgrade
  /docs/current/references/cli-reference/dfx-wallet /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-wallet
  /docs/current/references/cli-reference/dfx-envars /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-envars
  /docs/current/references/cli-reference/dfx-json-reference /docs/current/developer-docs/developer-tools/cli-tools/dfx-json-reference
  /docs/current/references/dfxvm/ /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfx/
  /docs/current/references/quill-cli-reference/ /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-parent
  /docs/current/references/quill-cli-reference/quill-account-balance /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-account-balance
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-balance /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-balance
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc-status /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc-status
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-transfer /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-transfer
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-update-balance /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-update-balance
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-withdrawal-address /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-withdrawal-address
  /docs/current/references/quill-cli-reference/quill-claim-neurons /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-claim-neurons
  /docs/current/references/quill-cli-reference/quill-generate /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-generate
  /docs/current/references/quill-cli-reference/quill-get-neuron-info /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-get-neuron-info
  /docs/current/references/quill-cli-reference/quill-get-proposal-info /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-get-proposal-info
  /docs/current/references/quill-cli-reference/quill-list-neurons /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-list-neurons
  /docs/current/references/quill-cli-reference/quill-list-proposals /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-list-proposals
  /docs/current/references/quill-cli-reference/quill-neuron-manage /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-neuron-manage
  /docs/current/references/quill-cli-reference/quill-neuron-stake /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-neuron-stake
  /docs/current/references/quill-cli-reference/quill-public-ids /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-public-ids
  /docs/current/references/quill-cli-reference/quill-qr-code /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-qr-code
  /docs/current/references/quill-cli-reference/quill-replace-node-provider-id /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-replace-node-provider-id
  /docs/current/references/quill-cli-reference/quill-scanner-qr-code /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-scanner-qr-code
  /docs/current/references/quill-cli-reference/quill-send /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-send
  /docs/current/references/quill-cli-reference/sns/quill-sns /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns
  /docs/current/references/quill-cli-reference/sns/quill-sns-balance /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-balance
  /docs/current/references/quill-cli-reference/sns/quill-sns-configure-dissolve-delay /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-configure-dissolve-delay
  /docs/current/references/quill-cli-reference/sns/quill-sns-disburse /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-disburse
  /docs/current/references/quill-cli-reference/sns/quill-sns-disburse-maturity /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-disburse-maturity
  /docs/current/references/quill-cli-reference/sns/quill-sns-follow-neuron /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-follow-neuron
  /docs/current/references/quill-cli-reference/sns/quill-sns-get-sale-participation /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-get-sale-participation
  /docs/current/references/quill-cli-reference/sns/quill-sns-get-swap-refund /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-get-swap-refund
  /docs/current/references/quill-cli-reference/sns/quill-sns-list-deployed-snses /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-list-deployed-snses
  /docs/current/references/quill-cli-reference/sns/quill-sns-make-proposal /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-make-proposal
  /docs/current/references/quill-cli-reference/sns/quill-sns-make-upgrade-canister-proposal /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-make-upgrade-canister-proposal
  /docs/current/references/quill-cli-reference/sns/quill-sns-neuron-permission /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-neuron-permission
  /docs/current/references/quill-cli-reference/sns/quill-sns-new-sale-ticket /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-new-sale-ticket
  /docs/current/references/quill-cli-reference/sns/quill-sns-pay /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-pay
  /docs/current/references/quill-cli-reference/sns/quill-sns-register-vote /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-register-vote
  /docs/current/references/quill-cli-reference/sns/quill-sns-split-neuron /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-split-neuron
  /docs/current/references/quill-cli-reference/sns/quill-sns-stake-maturity /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-stake-maturity
  /docs/current/references/quill-cli-reference/sns/quill-sns-stake-neuron /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-stake-neuron
  /docs/current/references/quill-cli-reference/sns/quill-sns-status /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-status
  /docs/current/references/quill-cli-reference/sns/quill-sns-transfer /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-transfer
  /docs/current/references/quill-cli-reference/quill-transfer /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-transfer
  /docs/current/references/quill-cli-reference/quill-update-node-provider /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-update-node-provider
  /docs/current/developer-docs/backend/candid/candid-concepts /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/current/developer-docs/backend/candid/ /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/current/developer-docs/backend/candid/candid-howto /docs/current/developer-docs/smart-contracts/candid/candid-howto
  /docs/current/developer-docs/backend/candid/generating-candid /docs/current/developer-docs/backend/rust/generating-candid
  /docs/current/developer-docs/setup/deploy /docs/current/developer-docs/smart-contracts/deploy/overview
  /docs/current/developer-docs/production/larger-wasm /docs/current/developer-docs/smart-contracts/install
  /docs/current/developer-docs/production/social-sharing /docs/current/developer-docs/smart-contracts/deploy/overview
  /docs/current/developer-docs/setup/delete /docs/current/developer-docs/smart-contracts/maintain/delete
  /docs/current/developer-docs/production/canister-history /docs/current/developer-docs/smart-contracts/maintain/history
  /docs/current/developer-docs/setup/build /docs/current/developer-docs/smart-contracts/compile
  /docs/current/developer-docs/setup/pulling-canister-dependencies /docs/current/developer-docs/smart-contracts/maintain/import
  /docs/current/developer-docs/production/canister-recovery /docs/current/developer-docs/smart-contracts/maintain/recovery
  /docs/current/developer-docs/setup/state /docs/current/developer-docs/smart-contracts/maintain/state
  /docs/current/developer-docs/setup/manage-canisters /docs/current/developer-docs/smart-contracts/maintain/settings
  /docs/current/developer-docs/production/storage /docs/current/developer-docs/smart-contracts/maintain/storage
  /docs/current/developer-docs/setup/upgrade /docs/current/developer-docs/smart-contracts/maintain/upgrade
  /docs/current/developer-docs/production/resource-limits /docs/current/developer-docs/smart-contracts/maintain/resource-limits
  /docs/current/developer-docs/setup/manage-projects /docs/current/developer-docs/smart-contracts/compile
  /docs/current/developer-docs/production/topping-up-canister /docs/current/developer-docs/smart-contracts/topping-up/topping-up-canister
  /docs/current/developer-docs/getting-started/cycles/cycles_management_services /docs/current/developer-docs/smart-contracts/topping-up/cycles_management_services
  /docs/current/developer-docs/setup/pocket-ic /docs/current/developer-docs/smart-contracts/test/pocket-ic
  /docs/current/developer-docs/production/staging-environment /docs/current/developer-docs/smart-contracts/deploy/custom-testnets
  /docs/current/developer-docs/backend/reproducible-builds /docs/current/developer-docs/smart-contracts/best-practices/reproducible-builds
  /docs/current/developer-docs/backend/troubleshooting /docs/current/developer-docs/getting-started/troubleshooting
  /docs/current/developer-docs/integrations/t-ecdsa /docs/current/developer-docs/smart-contracts/signatures/t-ecdsa
  /docs/current/developer-docs/integrations/vetkeys/ /docs/current/developer-docs/smart-contracts/encryption/vetkeys
  /docs/current/developer-docs/integrations/vetkeys/using-vetkeys /docs/current/developer-docs/smart-contracts/encryption/using-vetkeys
  /docs/current/developer-docs/integrations/composite-query /docs/current/developer-docs/smart-contracts/advanced-features/composite-query
  /docs/current/developer-docs/backend/periodic-tasks /docs/current/developer-docs/smart-contracts/advanced-features/periodic-tasks
  /docs/current/developer-docs/setup/best-practices/architecture /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/smart-contracts/best-practices/architecture /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/setup/best-practices/general /docs/current/developer-docs/smart-contracts/best-practices/general
  /docs/current/developer-docs/setup/best-practices/storage /docs/current/developer-docs/smart-contracts/best-practices/storage
  /docs/current/developer-docs/setup/best-practices/troubleshooting /docs/current/developer-docs/smart-contracts/best-practices/troubleshooting
  /docs/current/developer-docs/frontend/ /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/frontend/default-frontend /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/frontend/add-stylesheet /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/frontend/boilerplate-frontend /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/frontend/existing-frontend /docs/current/developer-docs/web-apps/application-frontends/existing-frontend
  /docs/current/developer-docs/production/custom-domain/ /docs/current/developer-docs/web-apps/custom-domains/using-custom-domains
  /docs/current/developer-docs/production/custom-domain/dns-setup /docs/current/developer-docs/web-apps/custom-domains/dns-setup
  /docs/current/developer-docs/backend/design-dapps /docs/current/developer-docs/smart-contracts/overview/introduction
  /docs/current/developer-docs/integrations/independently-verifying-ic-signatures /docs/current/developer-docs/web-apps/independently-verifying-ic-signatures
  /docs/current/developer-docs/integrations/internet-identity/overview  /docs/current/developer-docs/identity/internet-identity/overview
  /docs/current/developer-docs/integrations/internet-identity/creating-ii /docs/current/developer-docs/identity/internet-identity/creating-ii
  /docs/current/developer-docs/integrations/internet-identity/integrate-identity /docs/current/developer-docs/identity/internet-identity/integrate-internet-identity
  /docs/current/developer-docs/integrations/internet-identity/alternative-origins /docs/current/developer-docs/identity/internet-identity/alternative-origins
  /docs/current/developer-docs/http-compatible-canisters/custom-http-canisters /docs/current/developer-docs/web-apps/http-compatible-canisters/custom-http-canisters
  /docs/current/developer-docs/http-compatible-canisters/serving-json-over-http /docs/current/developer-docs/web-apps/http-compatible-canisters/serving-json-over-http
  /docs/current/developer-docs/http-compatible-canisters/serving-static-assets-over-http  /docs/current/developer-docs/web-apps/http-compatible-canisters/serving-static-assets-over-http
  /docs/current/developer-docs/integrations/ledger/introduction_and_overview /docs/current/developer-docs/defi/overview
  /docs/current/developer-docs/integrations/ledger/  /docs/current/developer-docs/defi/overview
  /docs/current/developer-docs/integrations/ledger/ledger-local-setup  /docs/current/developer-docs/defi/tokens/ledger/setup/icp_ledger_setup
  /docs/current/developer-docs/integrations/ledger/interact-with-ledger  /docs/current/developer-docs/defi/tokens/ledger/usage/icp_ledger_usage
  /docs/current/developer-docs/integrations/ledger/icp-index-local-setup /docs/current/developer-docs/defi/tokens/indexes
  /docs/current/developer-docs/integrations/ledger/collecting-dust /docs/current/developer-docs/defi/icp-tokens/account-trimming
  /docs/current/developer-docs/integrations/icrc-1/index /docs/current/references/icrc1-standard
  /docs/current/developer-docs/integrations/icrc-1/ /docs/current/references/icrc1-standard
  /docs/current/developer-docs/integrations/icrc-1/icrc1-ledger-setup /docs/current/developer-docs/defi/tokens/ledger/setup/icrc1_ledger_setup
  /docs/current/developer-docs/integrations/icrc-1/interact-with-ICRC-1-ledger /docs/current/developer-docs/defi/tokens/ledger/usage/icrc1_ledger_usage
  /docs/current/developer-docs/integrations/icrc-1/icrc1-index-setup /docs/current/developer-docs/defi/tokens/indexes
  /docs/current/developer-docs/integrations/exchange-rate/exchange-rate-canister /docs/current/developer-docs/defi/exchange-rate-canister
  /docs/current/developer-docs/integrations/rosetta/index  /docs/current/developer-docs/defi/rosetta/overview
  /docs/current/developer-docs/integrations/rosetta/  /docs/current/developer-docs/defi/rosetta/overview
  /docs/current/tokenomics/token-holders/custody-options-intro /docs/current/developer-docs/defi/wallets/overview
  /docs/current/tokenomics/token-holders/self-custody-quickstart /docs/current/developer-docs/defi/wallets/self-custody/self-custody-quickstart
  /docs/current/developer-docs/use-cases/considerations-for-nft-devs /docs/current/developer-docs/defi/nfts/overview
  /docs/current/developer-docs/integrations/sns/introduction/sns-intro-high-level /docs/current/developer-docs/daos/sns/overview
  /docs/current/developer-docs/integrations/sns/introduction/sns-architecture /docs/current/developer-docs/daos/sns/overview
  /docs/current/developer-docs/integrations/sns/introduction/sns-launch /docs/current/developer-docs/daos/sns/overview
  /docs/current/developer-docs/integrations/sns/introduction/dao-alternatives /docs/current/developer-docs/daos/sns/overview
  /docs/current/developer-docs/integrations/sns/tokenomics/ /docs/current/developer-docs/daos/sns/tokenomics/
  /docs/current/developer-docs/integrations/sns/tokenomics/sns-checklist /docs/current/developer-docs/daos/sns/tokenomics/sns-checklist
  /docs/current/developer-docs/integrations/sns/tokenomics/predeployment-considerations  /docs/current/developer-docs/daos/sns/tokenomics/predeployment-considerations
  /docs/current/developer-docs/integrations/sns/tokenomics/tokenomics-intro  /docs/current/developer-docs/daos/sns/tokenomics/tokenomics-intro
  /docs/current/developer-docs/integrations/sns/tokenomics/rewards /docs/current/developer-docs/daos/sns/tokenomics/rewards
  /docs/current/developer-docs/integrations/sns/tokenomics/preparation /docs/current/developer-docs/daos/sns/tokenomics/preparation
  /docs/current/developer-docs/integrations/sns/integrating/ /docs/current/developer-docs/daos/sns/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/ledger-integration /docs/current/developer-docs/daos/sns/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/index-integration /docs/current/developer-docs/daos/sns/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/frontend-integration /docs/current/developer-docs/daos/sns/launching/integrating
  /docs/current/developer-docs/integrations/sns/testing/testing-before-launch /docs/current/developer-docs/daos/sns/testing/testing-before-launch
  /docs/current/developer-docs/integrations/sns/testing/testing-locally /docs/current/developer-docs/daos/sns/testing/testing-locally
  /docs/current/developer-docs/integrations/sns/testing/testing-on-mainnet /docs/current/developer-docs/daos/sns/testing/testing-on-mainnet
  /docs/current/developer-docs/integrations/sns/launching/ /docs/current/developer-docs/daos/sns/launching/
  /docs/current/developer-docs/integrations/sns/launching/launch-summary-1proposal  /docs/current/developer-docs/daos/sns/launching/launch-summary-1proposal
  /docs/current/developer-docs/integrations/sns/launching/launch-steps-1proposal /docs/current/developer-docs/daos/sns/launching/launch-steps-1proposal
  /docs/current/developer-docs/integrations/sns/managing/manage-sns-intro /docs/current/developer-docs/daos/sns/managing/manage-sns-intro
  /docs/current/developer-docs/integrations/sns/managing/making-proposals /docs/current/developer-docs/daos/sns/managing/making-proposals
  /docs/current/developer-docs/integrations/sns/managing/cycles-usage /docs/current/developer-docs/daos/sns/managing/cycles-usage
  /docs/current/developer-docs/integrations/sns/managing/sns-asset-canister /docs/current/developer-docs/daos/sns/managing/sns-asset-canister
  /docs/current/developer-docs/integrations/sns/managing/managing-nervous-system-parameters /docs/current/developer-docs/daos/sns/managing/managing-nervous-system-parameters
  /docs/current/tokenomics/nns/nns-intro /docs/current/developer-docs/daos/nns/overview
  /docs/current/tokenomics/token-holders/nns-app-quickstart /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-app-quickstart
  /docs/current/tokenomics/nns/neurons-fund /docs/current/developer-docs/daos/nns/concepts/neurons-fund
  /docs/current/tokenomics/nns/nns-staking-voting-rewards /docs/current/developer-docs/daos/nns/concepts/neurons/staking-voting-rewards
  /docs/current/developer-docs/daos/nns/staking-voting-rewards /docs/current/developer-docs/daos/nns/concepts/neurons/staking-voting-rewards
  /docs/current/developer-docs/daos/nns/staking-voting-rewards/ /docs/current/developer-docs/daos/nns/concepts/neurons/staking-voting-rewards
  /docs/current/tokenomics/nns/proposal-requirements /docs/current/developer-docs/daos/nns/concepts/proposal-requirements
  /docs/current/developer-docs/daos/nns/proposal-requirements /docs/current/developer-docs/daos/nns/concepts/proposal-requirements
  /docs/current/tokenomics/index /docs/current/developer-docs/daos/overview
  /docs/current/tokenomics/ /docs/current/developer-docs/daos/overview
  /docs/current/developer-docs/integrations/multi-chain/user-faq /docs/current/developer-docs/multi-chain/overview
  /docs/current/developer-docs/integrations/multi-chain/ckbtc-faq /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/integrations/multi-chain/cketh-faq /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/integrations/multi-chain/ckerc20-faq /docs/current/developer-docs/multi-chain/chain-key-tokens/ckerc20/overview
  /docs/current/developer-docs/integrations/multi-chain/signatures-faq /docs/current/references/t-sigs-how-it-works
  /docs/current/developer-docs/integrations/bitcoin/ /docs/current/developer-docs/multi-chain/bitcoin/overview
  /docs/current/developer-docs/integrations/bitcoin/index /docs/current/developer-docs/multi-chain/bitcoin/overview
  /docs/current/developer-docs/integrations/bitcoin/ckbtc /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/integrations/bitcoin/read-state /docs/current/developer-docs/multi-chain/bitcoin/using-btc/read-state
  /docs/current/developer-docs/integrations/bitcoin/submit-transactions /docs/current/developer-docs/multi-chain/bitcoin/using-btc/submit-transactions
  /docs/current/developer-docs/integrations/bitcoin/local-development /docs/current/developer-docs/multi-chain/bitcoin/using-btc/local-development
  /docs/current/developer-docs/integrations/ethereum/overview /docs/current/developer-docs/multi-chain/ethereum/overview
  /docs/current/developer-docs/integrations/ethereum/evm-rpc /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/evm-rpc-canister
  /docs/current/developer-docs/integrations/ethereum/siwe /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/integrations/bitcoin/bitcoin-how-it-works /docs/current/references/bitcoin-how-it-works
  /docs/current/developer-docs/integrations/bitcoin/ckbtc-reference /docs/current/references/ckbtc-reference
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-it-works /docs/current/references/https-outcalls-how-it-works
  /docs/current/developer-docs/integrations/t-ecdsa/t-ecdsa-how-it-works /docs/current/references/t-sigs-how-it-works
  /docs/current/developer-docs/integrations/vetkeys/technology-overview /docs/current/references/vetkeys-overview
  /docs/current/developer-docs/developer-tools/cli-tools/networks-json /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/networks-json
  /docs/current/developer-docs/production/system-canisters /docs/current/developer-docs/smart-contracts/advanced-features/system-canisters
  /docs/current/developer-docs/backend/arguments /docs/current/developer-docs/smart-contracts/call/overview
  /docs/current/developer-docs/frontend/index /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-get /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-get
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-to-use /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-how-to-use
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-overview /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-overview
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-post /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-post
  /docs/current/developer-docs/setup/ic-admin /docs/current/developer-docs/developer-tools/cli-tools/ic-admin
  /docs/current/developer-docs/backend/subnet-types /docs/current/references/subnets/subnet-types
  /docs/current/references/glossary /docs/current/references/glossary
  /docs/current/samples/host-a-website /docs/current/references/samples/hosting/static-website/
  /docs/current/samples/host-a-webgame /docs/current/references/samples/hosting/unity-webgl-template/
  /docs/current/references/security/general-security-best-practices/ /docs/current/developer-docs/security/security-best-practices/inter-canister-calls
  /docs/current/references/security/rust-canister-development-security-best-practices /docs/current/developer-docs/security/security-best-practices/inter-canister-calls
  /docs/current/references/security/web-app-development-security-best-practices /docs/current/developer-docs/security/security-best-practices/inter-canister-calls
  /docs/current/references/security/ /docs/current/developer-docs/security/security-best-practices/inter-canister-calls
  /docs/current/developer-docs/smart-contracts/overview/development-cycle /docs/current/developer-docs/smart-contracts/overview/canister-lifecycle
  /docs/current/developer-docs/web-apps/user-login/internet-identity/integrate-identity /docs/current/developer-docs/identity/internet-identity/integrate-internet-identity
  /docs/current/developer-docs/multi-chain/ethereum/cketh /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/ethereum/siwe /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/bitcoin/read-state /docs/current/developer-docs/multi-chain/bitcoin/using-btc/read-state
  /docs/current/developer-docs/multi-chain/bitcoin/submit-transactions /docs/current/developer-docs/multi-chain/bitcoin/using-btc/submit-transactions
  /docs/current/developer-docs/multi-chain/bitcoin/local-development /docs/current/developer-docs/multi-chain/bitcoin/using-btc/local-development
  /docs/current/developer-docs/multi-chain/using-eth/evm-rpc/evm-rpc /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/evm-rpc-canister
  /docs/current/developer-docs/backend/motoko/infrastructure /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/motoko/explore-templates /docs/current/motoko/main/getting-started/basic-concepts
  /docs/current/developer-docs/backend/motoko/dev-env /docs/current/motoko/main/getting-started/dev-env
  /docs/current/developer-docs/backend/motoko/at-a-glance /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/motoko/deploying /docs/current/motoko/main/getting-started/quickstart
  /docs/current/developer-docs/backend/motoko/upgrading /docs/current/motoko/main/canister-maintenance/upgrades
  /docs/current/developer-docs/backend/motoko/intercanister-calls /docs/current/motoko/main/writing-motoko/intercanister-calls
  /docs/current/developer-docs/backend/motoko/optimizing /docs/current/motoko/main/canister-maintenance/optimization
  /docs/current/developer-docs/backend/motoko/phonebook /docs/current/motoko/main/writing-motoko/modules-and-imports
  /docs/current/developer-docs/backend/motoko/calculator /docs/current/motoko/main/writing-motoko/integers
  /docs/current/developer-docs/backend/motoko/counter-tutorial /docs/current/motoko/main/writing-motoko/local-objects-classes
  /docs/current/developer-docs/backend/motoko/hello-location /docs/current/motoko/main/writing-motoko/arguments
  /docs/current/developer-docs/backend/motoko/simple-cycles /docs/current/motoko/main/canister-maintenance/cycles
  /docs/current/developer-docs/backend/motoko/define-an-actor /docs/current/motoko/main/writing-motoko/actors-async
  /docs/current/developer-docs/backend/motoko/multiple-actors /docs/current/motoko/main/writing-motoko/actor-classes
  /docs/current/developer-docs/backend/motoko/access-control /docs/current/motoko/main/writing-motoko/caller-id
  /docs/current/developer-docs/backend/motoko/candid-ui /docs/current/motoko/main/writing-motoko/candid-ui
  /docs/current/developer-docs/backend/motoko/scalability-cancan /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/motoko/sample-apps  /docs/current/samples/overview
  /docs/current/developer-docs/backend/motoko/mo-doc /docs/current/motoko/main/reference/generating-docs
  /docs/current/developer-docs/backend/motoko/0.11.0-migration-guide /docs/current/motoko/main/migration-guides/0.11.0-migration-guide
  /docs/current/motoko/main/about-this-guide /docs/current/motoko/main/getting-started/motoko-introduction
  /motoko/main/motoko /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/main/motoko-introduction /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/main/motoko /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/main/basic-concepts /docs/current/motoko/main/getting-started/basic-concepts
  /docs/current/motoko/main/overview /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/main/language-manual /docs/current/motoko/main/reference/language-manual
  /docs/current/motoko/main/style /docs/current/motoko/main/reference/style
  /docs/current/motoko/main/base-intro /docs/current/motoko/main/writing-motoko/modules-and-imports
  /docs/current/motoko/main/actors-async /docs/current/motoko/main/writing-motoko/actors-async
  /docs/current/motoko/main/actor-classes /docs/current/motoko/main/writing-motoko/actor-classes
  /docs/current/motoko/main/caller-id /docs/current/motoko/main/writing-motoko/caller-id
  /docs/current/motoko/main/compatibility /docs/current/motoko/main/canister-maintenance/compatibility
  /docs/current/motoko/main/control-flow /docs/current/motoko/main/writing-motoko/control-flow
  /docs/current/motoko/main/cycles /docs/current/motoko/main/canister-maintenance/cycles
  /docs/current/motoko/main/errors /docs/current/motoko/main/writing-motoko/errors
  /docs/current/motoko/main/heartbeats /docs/current/motoko/main/writing-motoko/heartbeats
  /docs/current/motoko/main/local-objects-classes /docs/current/motoko/main/writing-motoko/local-objects-classes
  /docs/current/motoko/main/message-inspection /docs/current/motoko/main/writing-motoko/message-inspection
  /docs/current/motoko/main/modules-and-imports /docs/current/motoko/main/writing-motoko/modules-and-imports
  /docs/current/motoko/main/mutable-state /docs/current/motoko/main/writing-motoko/mutable-state
  /docs/current/motoko/main/pattern-matching /docs/current/motoko/main/writing-motoko/pattern-matching
  /docs/current/motoko/main/pipes /docs/current/motoko/main/writing-motoko/pipes
  /docs/current/motoko/main/sharing /docs/current/motoko/main/writing-motoko/sharing
  /docs/current/motoko/main/stable-regions /docs/current/motoko/main/stable-memory/stable-regions
  /docs/current/motoko/main/stablememory /docs/current/motoko/main/stable-memory/stablememory
  /docs/current/motoko/main/structural-equality /docs/current/motoko/main/writing-motoko/structural-equality
  /docs/current/motoko/main/timers /docs/current/motoko/main/writing-motoko/timers
  /docs/current/motoko/main/upgrades /docs/current/motoko/main/canister-maintenance/upgrades
  /docs/current/motoko/main/compiler-ref /docs/current/motoko/main/reference/compiler-ref
  /docs/current/motoko/main/motoko-grammar /docs/current/motoko/main/reference/motoko-grammar
  /docs/current/developer-docs/daos/sns/introduction/sns-intro-high-level /docs/current/developer-docs/daos/sns/overview
  /docs/current/developer-docs/daos/sns/introduction/sns-architecture /docs/current/developer-docs/daos/sns/overview
  /docs/current/developer-docs/daos/sns/introduction/sns-launch /docs/current/developer-docs/daos/sns/overview
  /docs/current/developer-docs/daos/sns/introduction/dao-alternatives /docs/current/developer-docs/daos/sns/overview
  /docs/current/developer-docs/daos/sns/integrating/index /docs/current/developer-docs/daos/sns/launching/integrating
  /docs/current/developer-docs/daos/sns/integrating/ledger-integration /docs/current/developer-docs/daos/sns/launching/integrating
  /docs/current/developer-docs/daos/sns/integrating/index-integration /docs/current/developer-docs/daos/sns/launching/integrating
  /docs/current/developer-docs/daos/sns/integrating/frontend-integration /docs/current/developer-docs/daos/sns/launching/integrating
  /docs/current/developer-docs/integrations/sns/ /docs/current/developer-docs/daos/sns/overview
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc/overview /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc/making-transactions /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/making-transactions
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc/using-ckbtc-in-dapps /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/using-ckbtc-in-dapps
  /docs/current/developer-docs/multi-chain/ethereum/cketh/overview /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/ethereum/cketh/making-transactions /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/making-transactions
  /docs/current/developer-docs/multi-chain/ethereum/cketh/using-cketh-in-dapps /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/using-cketh-in-dapps
  /docs/current/developer-docs/web-apps/user-login/internet-identity/overview /docs/current/developer-docs/identity/internet-identity/overview
  /docs/current/developer-docs/web-apps/user-login/internet-identity/creating-ii /docs/current/developer-docs/identity/internet-identity/creating-ii
  /docs/current/developer-docs/web-apps/user-login/internet-identity/integrate-internet-identity /docs/current/developer-docs/identity/internet-identity/integrate-internet-identity
  /docs/current/developer-docs/web-apps/user-login/internet-identity/alternative-origins /docs/current/developer-docs/identity/internet-identity/alternative-origins
  /docs/current/developer-docs/web-apps/user-login/nfid /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/web-apps/user-login/email-password /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/siwe /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/defi/icrc-1/icrc1-index-setup /docs/current/developer-docs/defi/tokens/indexes
  /docs/current/defi/icp-tokens/icp-index-local-setup /docs/current/developer-docs/defi/tokens/indexes
  /docs/current/developer-docs/smart-contracts/signatures/signing-transactions /docs/current/developer-docs/smart-contracts/signatures/signing-messages-t-ecdsa
  /docs/current/developer-docs/defi/icp-tokens/overview /docs/current/developer-docs/defi/tokens/token-standards
  /docs/current/developer-docs/defi/asset-custody/self-custody-quickstart /docs/current/developer-docs/defi/wallets/self-custody/self-custody-quickstart
  /docs/current/developer-docs/defi/asset-custody/hardware-wallet-cli /docs/current/developer-docs/defi/wallets/self-custody/hardware-wallet-cli
  /docs/current/developer-docs/defi/asset-custody/custody-options /docs/current/developer-docs/defi/wallets/overview
  /docs/current/developer-docs/defi/nfts/considerations-for-nft-devs /docs/current/developer-docs/defi/nfts/overview
  /docs/current/developer-docs/defi/icrc-1/token-quickstart /docs/current/developer-docs/defi/tokens/create
  /docs/current/references/ /docs/current/references/ic-interface-spec
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/ /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-overview
  /docs/language-guide/motoko.html /docs/current/motoko/main/getting-started/motoko-introduction
  /education /education-hub
  /docs/current/developer-docs/integrations/ledger/deploy-new-token /docs/current/developer-docs/defi/tokens/create
  /docs/current/samples/deploying-your-first-bitcoin-dapp /docs/current/references/samples/motoko/basic_bitcoin/
  /docs/integration/ledger-quick-start.html /docs/current/developer-docs/defi/tokens/ledger/setup/icp_ledger_setup
  /docs/current/developer-docs/integrations/storage/cost /docs/current/developer-docs/gas-cost
  /docs/token-holders/self-custody-quickstart.html /docs/current/developer-docs/defi/wallets/self-custody/self-custody-quickstart
  /docs/current/developer-docs/overview/ /docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/smart-contracts/overview	/docs/current/developer-docs/smart-contracts/overview/introduction
  /docs/current/references/dfx-json-reference /docs/current/developer-docs/developer-tools/cli-tools/dfx-json-reference
  /docs/language-guide/language-manual.html	/docs/current/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/default-wallet.html /docs/current/developer-docs/getting-started/tokens-and-cycles
  /docs/current/references/ic-interface /docs/current/references/ic-interface-spec
  /docs/current/tokenomics/sns/sns-intro-tokens	/docs/current/developer-docs/daos/sns/tokenomics/tokenomics-intro
  /docs/developers-guide/sdk-guide.html	/docs/current/developer-docs/getting-started/install
  /docs/current/references/cli-reference/dfx-deps	/docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-deps
  /docs/current/samples/internet-identity-sample /docs/current/references/samples/motoko/internet_identity_integration/
  /docs/current/developer-docs/smart-contracts/advanced-features/threshold-signing /docs/current/developer-docs/smart-contracts/signatures/t-ecdsa
  /docs/current/backend/candid/generating-candid /docs/current/developer-docs/backend/rust/generating-candid
  /docs/current/developer-docs/backend/motoko/index.md /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/rust/index /docs/current/developer-docs/backend/rust/
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/index /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/
  /docs/current/developer-docs/integrations/icrc-1/deploy-new-token /docs/current/developer-docs/defi/tokens/create
  /docs/current/developer-docs/setup/cycles/cycles-faucet.md	/docs/current/developer-docs/getting-started/tokens-and-cycles
  /docs/current/developer-docs/setup/deploy-mainnet.md	/docs/current/developer-docs/getting-started/deploy-and-manage
  /docs/current/developer-docs/setup/index.md	/docs/current/developer-docs/getting-started/install
  /docs/current/developer-docs/smart-contracts/candid/index	/docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/current/docs/current/references/ii-spec	/docs/current/references/ii-spec
  /docs/current/motoko/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/getting-started/motoko-introduction /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/main/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/samples/encrypted-notes/	/docs/current/references/samples/motoko/encrypted-notes-dapp/
  /docs/current/samples/nft	/docs/current/developer-docs/defi/nfts/nft-collections
  /docs/language-guide/cycles.html /docs/current/developer-docs/getting-started/tokens-and-cycles
  /grants	https://dfinity.org/grants
  /docs/base-libraries/motoko-base/Text.html	/docs/current/motoko/main/base/Text
  /docs/candid-guide/candid-types.html	/docs/current/developer-docs/smart-contracts/candid/candid-howto/
  /docs/current/developer-docs/deploy/custom-domain	/docs/current/developer-docs/web-apps/custom-domains/using-custom-domains
  /docs/current/developer-docs/integrations/internet-identity	/docs/current/developer-docs/identity/internet-identity/overview
  /bitcoin /bitcoin-integration
  /bootcamp	/education-hub
  /docs/candid-guide/candid-concepts.html	/docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/current/blog/features/vetkey-primer	/blog/features/vetkey-primer
  /docs/current/concepts/chain-key-technology/ /docs/current/developer-docs/multi-chain/overview
  /docs/current/concepts/concepts-intro.html	/docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/backend	/docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/backend/rust/rust-quickstart	/docs/current/developer-docs/backend/rust/
  /docs/current/developer-docs/best-practices/	/docs/current/developer-docs/smart-contracts/best-practices/general
  /docs/current/developer-docs/best-practices/considerations-for-nft-devs /docs/current/developer-docs/defi/nfts/overview
  /docs/current/developer-docs/smart-contracts/test/staging-environment /docs/current/developer-docs/smart-contracts/deploy/custom-testnets
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages /docs/current/developer-docs/smart-contracts/signatures/signing-messages-t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/t-ecdsa /docs/current/developer-docs/smart-contracts/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/t-schnorr /docs/current/developer-docs/smart-contracts/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages-tecdsa /docs/current/developer-docs/smart-contracts/signatures/signing-messages-t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages-t-schnorr /docs/current/developer-docs/smart-contracts/signatures/signing-messages-t-schnorr
  /docs/current/developer-docs/production/topping-up-canister/ /docs/current/developer-docs/smart-contracts/topping-up/topping-up-canister
  /docs/current/developer-docs/build/cdks/motoko-dfinity/language-manual /docs/current/motoko/main/reference/language-manual
  /docs/current/references/t-ecdsa-how-it-works /docs/current/references/t-sigs-how-it-works
  /docs/current/developer-docs/web-apps/application-frontends/bundlers /docs/current/developer-docs/web-apps/application-frontends/webpack
  /docs/current/developer-docs/web-apps/application-frontends/webpack-dev-server /docs/current/developer-docs/web-apps/application-frontends/webpack
  /docs/current/developer-docs/web-apps/application-frontends/serving-static-assets /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/web-apps/application-frontends/custom-frontend /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/security/rust-canister-development-security-best-practices /docs/current/developer-docs/security/security-best-practices/inter-canister-calls
  /docs/developers-guide/computation-and-storage-costs.html /docs/current/developer-docs/gas-cost
  /docs/current/developer-docs/getting-started/ /docs/current/developer-docs/getting-started/network-overview
  /docs/current/developer-docs/defi/wallets/workflow /docs/current/developer-docs/defi/wallets/overview
  /docs/current/developer-docs/backend/rust/infrastructure /docs/current/developer-docs/backend/rust/
  /docs/current/developer-docs/smart-contracts/deploy/larger-wasm /docs/current/developer-docs/smart-contracts/install
  /docs/current/developer-docs/smart-contracts/deploy/sharing /docs/current/developer-docs/smart-contracts/deploy/overview
  /docs/current/developer-docs/integrations/rosetta/staking-support /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/
  /docs/current/developer-docs/smart-contracts/test/benchmarking /docs/current/developer-docs/developer-tools/off-chain/canbench
  /docs/current/developer-docs/smart-contracts/test/reproducible-builds /docs/current/developer-docs/smart-contracts/best-practices/reproducible-builds
  /docs/current/developer-docs/ai/ai-on-chain  /docs/current/developer-docs/ai/samples
  /docs/current/developer-docs/ai/machine-learning-sample /docs/current/developer-docs/ai/samples
  /docs/current/developer-docs/security/general-security-best-practices /docs/current/developer-docs/security/security-best-practices/overview
  /docs/current/samples/game-of-life /docs/current/references/samples/motoko/life/
  /docs/current/concepts/canisters-code /docs/current/developer-docs/smart-contracts/overview/introduction
  /docs/current/concepts/governance /docs/current/developer-docs/daos/nns/overview
  /docs/current/concepts/nodes-subnets /docs/current/references/subnets/overview
  /docs/current/concepts/subnet-types /docs/current/references/subnets/subnet-types
  /docs/current/concepts/glossary /docs/current/references/glossary
  /docs/current/concepts/trust-in-canisters /docs/current/developer-docs/smart-contracts/overview/trust-in-canisters
  /docs/current/developer-docs/multi-chain/faq/user-faq /docs/current/developer-docs/multi-chain/overview
  /docs/current/developer-docs/multi-chain/faq/ckbtc-faq /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/faq/cketh-faq /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/faq/ckerc20-faq /docs/current/developer-docs/multi-chain/chain-key-tokens/ckerc20/overview
  /docs/current/developer-docs/multi-chain/faq/signatures-faq /docs/current/references/t-sigs-how-it-works
  /docs/current/developer-docs/integrations/rosetta/staking-tutorial/ /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/stake_icp
  /docs/current/developer-docs/getting-started/cycles/cycles-wallet /docs/current/developer-docs/defi/cycles/cycles-wallet
  /docs/current/developer-docs/getting-started/quickstart/juno-quickstart /docs/current/developer-docs/web-apps/frameworks/juno
  /docs/current/developer-docs/smart-contracts/write/auto-scaling-architecture /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/smart-contracts/write/resources /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/smart-contracts/call/arguments /docs/current/developer-docs/smart-contracts/call/overview
  /docs/current/developer-docs/smart-contracts/candid/ /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/current/developer-docs/getting-started/development-workflow /docs/current/developer-docs/smart-contracts/development-workflow
  /docs/current/developer-docs/getting-started/default-template /docs/current/developer-docs/smart-contracts/write/overview
  /docs/current/developer-docs/getting-started/hello-world /docs/current/developer-docs/getting-started/write-smart-contracts
  /docs/current/developer-docs/getting-started/cycles/overview /docs/current/developer-docs/getting-started/tokens-and-cycles
  /docs/current/developer-docs/getting-started/accounts /docs/current/developer-docs/getting-started/identities
  /docs/current/developer-docs/getting-started/deploy/local /docs/current/developer-docs/getting-started/deploy-and-manage
  /docs/current/developer-docs/getting-started/deploy/testnet /docs/current/developer-docs/getting-started/deploy-and-manage
  /docs/current/developer-docs/getting-started/deploy-and-manage  /docs/current/developer-docs/getting-started/deploy-and-manage
  /docs/current/developer-docs/smart-contracts/test/troubleshooting /docs/current/developer-docs/getting-started/troubleshooting
  /docs/current/developer-docs/smart-contracts/advanced-features/http-gateways /docs/current/developer-docs/smart-contracts/advanced-features/handling-get-post-requests
  /docs/current/developer-docs/smart-contracts/advanced-features/serving-http-request /docs/current/developer-docs/smart-contracts/advanced-features/handling-get-post-requests
  /docs/current/developer-docs/smart-contracts/write/default-template /docs/current/developer-docs/smart-contracts/write/overview
  /developers /docs/current/home
  /docs/current/developer-docs/identity/authentication/email-password /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/identity/authentication/nfid /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/identity/authentication/siwb /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/identity/authentication/siwe /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/identity/authentication/siws /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/identity/authentication/msq /docs/current/developer-docs/identity/authentication/overview
  /docs/current/developer-docs/web-apps/browser-js/js-request-api /docs/current/developer-docs/developer-tools/off-chain/agents/javascript-agent
  /docs/current/developer-docs/defi/tokens/asset_flow/index /docs/current/developer-docs/defi/overview
  /docs/current/developer-docs/defi/tokens/ledger/overview /docs/current/developer-docs/defi/overview
  /docs/current/developer-docs/defi/tokens/ledger/setup/overview /docs/current/developer-docs/defi/overview
  /docs/current/developer-docs/defi/tokens/ledger/usage/overview /docs/current/developer-docs/defi/overview
  /docs/current/developer-docs/web-apps/obtain-verify-ic-pubkey /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-ping
  /docs/current/developer-docs/web-apps/design-dapps /docs/current/developer-docs/smart-contracts/overview/introduction
  /docs/current/developer-docs/smart-contracts/candid /docs/current/developer-docs/smart-contracts/candid/candid-concepts
  /docs/current/developer-docs/build/cdks/motoko-dfinity/* /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/web-apps/application-frontends/add-stylesheet /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/web-apps/application-frontends/default-frontend /docs/current/developer-docs/web-apps/application-frontends/overview
  /docs/current/developer-docs/getting-started/explore-examples /docs/current/developer-docs/developer-tools/ide/icp-ninja
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
