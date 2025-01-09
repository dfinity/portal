const redirects = `

  # external redirects (/from -> https://.../to/)
  /docs/token-holders/seed-donations.html https://wiki.internetcomputer.org/wiki/How-To:_Claim_neurons_for_seed_participants
  /deck-main https://deck.internetcomputer.org
  /live-sessions https://dfinity.org/events-and-news/#videos-live-sessions
  /docs/current/developer-docs/web-apps/frameworks/juno https://juno.build/docs/intro
  /docs/current/developer-docs/getting-started/quickstart/juno-quickstart https://juno.build/docs/intro
  /docs/current/references/dashboard/overview https://dashboard.internetcomputer.org/
  /docs/current/references/dashboard/using-the-dashboard https://dashboard.internetcomputer.org/

  # .html file internal redirects (/../from.html -> to)
  /docs/developers-guide/working-with-canisters.html /docs/current/building-dapps/managing-dapps/settings

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
  /docs/current/developer-docs/getting-started/overview-of-icp /docs/current/developer-education/developer-concepts/network-overview
  /docs/videos-tutorials /docs/current/home
  /docs /docs/current/home
  /docs/current/ /docs/current/home
  /docs/current/concepts/bitcoin-integration /bitcoin-integration
  /docs/current/developer-docs/ic-overview /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/production/computation-and-storage-costs /docs/current/developer-education/developer-concepts/gas-cost
  /docs/current/developer-docs/deploy/computation-and-storage-costs /docs/current/developer-education/developer-concepts/gas-cost
  /docs/current/ic-overview  /docs/current/home
  /docs/download /docs/current/building-dapps/getting-started/install
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
  /docs/security-best-practices/introduction /docs/current/developer-education/security/overview
  /docs/current/developer-docs/setup/default-wallet /docs/current/rosetta-defi/cycles/cycles-wallet
  /docs/current/tokenomics/sns/tokenomics /docs/current/building-dapps/governing-dapps/tokenomics/
  /docs/current/developer-docs/integrations/http_requests/http_requests-how-it-works /docs/current/references/https-outcalls-how-it-works
  /docs/current/building-dapps/governing-dapps/tokenomics/sns-intro-tokens /docs/current/building-dapps/governing-dapps/tokenomics/
  /docs/current/developer-docs/integrations/sns/tokenomics/tokenomics /docs/current/building-dapps/governing-dapps/tokenomics/tokenomics-intro
  /docs/rust-guide/rust-intro /docs/current/building-dapps/developer-tools/cdks/rust/
  /docs/languages/languages-overview /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/smart-contracts/write/choosing-language /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/frontend/my-contacts /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/ic-interface-spec /docs/current/references/ic-interface-spec
  /docs/interface-spec /docs/current/references/ic-interface-spec
  /docs/current/developer-docs/updates/computation-and-storage-costs /docs/current/developer-education/developer-concepts/gas-cost
  /docs/current/developer-docs/updates/release-notes/ /docs/current/other/updates/release-notes/
  /docs/current/developer-docs/quickstart/local-quickstart /docs/current/building-dapps/getting-started/install
  /docs/current/developer-docs/setup/install/index.mdx /docs/current/building-dapps/getting-started/install

  /docs/candid-guide /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/candid-guide/candid /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/candid-guide/candid-intro /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/candid-guide/candid-ref /docs/current/references/candid-ref
  /docs/candid-guide/candid-types /docs/current/references/candid-ref
  /docs/current/developer-docs/build/candid/candid-intro /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/developer-docs/build/candid/candid-howto /docs/current/building-dapps/interacting-with-dapps/candid/using-candid

  /docs/current/developer-docs/build/ /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/build/candid/candid-concepts /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/developer-docs/build/languages/other-languages/* /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/build/languages/work-with-languages /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/build/using-an-agent /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/build/backend/reproducible-builds /docs/current/developer-education/developer-playbook/developer-best-practices/reproducible-builds
  /docs/current/developer-docs/build/cdks/ /docs/current/building-dapps/developer-tools/cdks/index
  /docs/current/developer-docs/build/frontend/default-frontend /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/build/frontend/webpack-config /docs/current/building-dapps/dapp-frontends/using-an-asset-canister#modifying-the-webpack-configuration
  /docs/current/developer-docs/build/install-upgrade-remove /docs/current/building-dapps/getting-started/install
  /docs/current/developer-docs/build/languages/rust/* /docs/current/building-dapps/developer-tools/cdks/rust/
  /docs/current/developer-docs/build/project-setup/cycles-wallet /docs/current/rosetta-defi/cycles/cycles-wallet
  /docs/current/developer-docs/build/project-setup/manage-canisters /docs/current/building-dapps/managing-dapps/settings
  /docs/current/developer-docs/build/project-setup/design-dapps /docs/current/developer-education/developer-concepts/what-are-canisters
  /docs/current/developer-docs/build/troubleshooting /docs/current/building-dapps/getting-started/troubleshooting
  /docs/current/developer-docs/build/agents/ /docs/current/building-dapps/interacting-with-dapps/agents/overview
  /docs/current/developer-docs/build/agents/javascript/javascript-intro /docs/current/building-dapps/interacting-with-dapps/agents/javascript-agent
  /docs/current/developer-docs/build/agents/javascript/*  /docs/current/building-dapps/interacting-with-dapps/agents/javascript-agent
  /docs/current/developer-docs/build/languages/candid/* /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/developer-docs/build/cdks/motoko-dfinity/* /docs/current/motoko/main/:splat
  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/*  /docs/current/building-dapps/developer-tools/cdks/rust/:splat
  /docs/current/developer-docs/build/languages/motoko/* /docs/current/motoko/main/:splat

  /docs/developers-guide/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/about-this-guide /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/basic-syntax-rules /docs/current/motoko/main/reference/language-manual
  /docs/developers-guide/concepts/bitcoin-integration /bitcoin-integration
  /docs/developers-guide/concepts/concepts-intro /docs/current/developer-education/developer-concepts/network-overview
  /docs/developers-guide/customize-projects /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/developers-guide/default-wallet /docs/current/rosetta-defi/cycles/cycles-wallet
  /docs/developers-guide/design-apps /docs/current/developer-education/developer-concepts/what-are-canisters
  /docs/developers-guide/glossary /docs/current/developer-education/glossary/index
  /docs/developers-guide/install-upgrade-remove /docs/current/building-dapps/getting-started/install
  /docs/developers-guide/lang-service-ide /docs/current/building-dapps/developer-tools/ide/vs-code
  /docs/developers-guide/reinstalling-dfx /docs/current/building-dapps/getting-started/install
  /docs/developers-guide/sample-apps /samples
  /docs/developers-guide/sdk-guide /docs/current/building-dapps/getting-started/install
  /docs/developers-guide/troubleshooting /docs/current/building-dapps/getting-started/troubleshooting
  /docs/developers-guide/tutorials-intro /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/tutorials/default-frontend /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/developers-guide/tutorials/my-contacts /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/developers-guide/webpack-config /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/developers-guide/work-with-languages /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/developers-guide/working-with-canisters /docs/current/building-dapps/managing-dapps/settings

  /docs/quickstart/1-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/2-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/3-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/4-2-convert-icp-to-cycles /docs/current/tutorials/developer-journey/
  /docs/quickstart/4-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/5-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/cycles-faucet /docs/current/building-dapps/getting-started/tokens-and-cycles
  /docs/quickstart/local-quickstart /docs/current/building-dapps/getting-started/deploy-and-manage
  /docs/quickstart/network-quickstart /docs/current/building-dapps/getting-started/deploy-and-manage
  /docs/quickstart/quickstart-intro /docs/current/tutorials/developer-journey/
  /docs/quickstart/newcomers /docs/current/home
  /docs/current/developer-docs/quickstart/* /docs/current/tutorials/developer-journey/
  /developers-guide/quickstart /docs/current/tutorials/developer-journey/
  /docs/current/developer-docs/quickstart/cycles-faucet /docs/current/building-dapps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/quickstart/windows-wsl /docs/current/building-dapps/getting-started/install
  /docs/current/developer-docs/quickstart/hello10mins/ /docs/current/tutorials/developer-journey/

  /docs/rosetta-api/ledger /docs/current/rosetta-defi/tokens/token-standards
  /docs/rosetta-api/ledger-local-setup /docs/current/rosetta-defi/token-ledgers/setup/icp_ledger_setup
  /docs/integration/ledger-quick-start /docs/current/rosetta-defi/tokens/token-standards
  /docs/current/developer-docs/functionality/ledger/* /docs/current/rosetta-defi/token-ledgers/setup/icp_ledger_setup

  /docs/base-libraries/* /docs/current/motoko/main/base/:splat
  /base-libraries/* /docs/current/motoko/main/base/:splat
  /docs/current/developer-docs/best-practices/* /docs/current/developer-docs/use-cases/:splat
  /docs/current/developer-docs/deploy/* /docs/current/developer-docs/production/:splat
  /docs/current/references/security/* /docs/current/developer-education/security/overview
  /docs/current/tokenomics/nns/community-fund /docs/current/move-to-learnhub/nns/concepts/neurons-fund
  /docs/current/tokenomics/sns/* /docs/current/building-dapps/governing-dapps/tokenomics/:splat
  /docs/developers-guide/cli-reference/* /docs/current/building-dapps/developer-tools/dfx/:splat
  /docs/developers-guide/concepts/* /docs/current/developer-education/developer-concepts/network-overview
  /docs/developers-guide/tutorials/* /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/ic-identity-guide/* /docs/current/tokenomics/identity-auth/:splat
  /docs/language-guide/* /docs/current/motoko/main/:splat
  /docs/release-notes/* /docs/current/other/updates/release-notes/:splat
  /docs/rosetta-api/* /docs/current/developer-docs/integrations/rosetta/:splat
  /docs/rust-guide/* /docs/current/building-dapps/developer-tools/cdks/rust/:splat
  /docs/security-best-practices/* /docs/current/developer-education/security/inter-canister-calls
  /docs/token-holders/* /docs/current/tokenomics/token-holders/:splat
  /features/* /capabilities/:splat
  /howitworks/* /how-it-works/:splat
  /docs/current/developer-docs/build/backend/* /docs/current/motoko/main/getting-started/motoko-introduction
  /sustainability /capabilities/sustainability
  /docs/current/tutorials/deploy_sample_app /docs/current/tutorials/developer-journey/
  /install.sh)" /docs/current/building-dapps/getting-started/install
  /docs/current/motoko/intro/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/tutorials/create_your_first_app/ /docs/current/tutorials/developer-journey/
  /docs/quickstart/quickstart-intro.html /docs/current/building-dapps/getting-started/install
  /docs/ic-identity-guide/auth-how-to.html /docs/current/building-dapps/using-network-features/authentication/integrate-internet-identity/
  /docs/current/developer-docs/build/agents/agent-dfinity	/docs/current/building-dapps/interacting-with-dapps/agents/overview
  /docs/current/tokenomics/identity-auth/what-is-ic-identity /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/quickstart/local-quickstart.html /docs/current/building-dapps/getting-started/install
  /language-guide/ /docs/current/tutorials/developer-journey/level-0/intro-languages
  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/rust-quickstart /docs/current/building-dapps/developer-tools/cdks/rust/
  /docs/quickstart/network-quickstart.html /docs/current/building-dapps/getting-started/install
  /docs/token-holders/nns-app-quickstart.html /docs/current/move-to-learnhub/nns/using-the-nns-dapp/nns-app-quickstart
  /docs/current/move-to-learnhub/nns/nns-app-quickstart /docs/current/move-to-learnhub/nns/using-the-nns-dapp/nns-app-quickstart
  /developers-guide/quickstart.html /docs/current/tutorials/developer-journey/
  /docs/current/tokenomics/identity-auth/auth-how-to /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/developers-guide/tutorials-intro.html /docs/current/tutorials/developer-journey/
  /docs/quickstart/quickstart.html /docs/current/building-dapps/getting-started/install
  /apis/site/proxy /docs/current/references/http-gateway-protocol-spec
  /docs/developers-guide/concepts/what-is-ic /docs/current/developer-education/developer-concepts/network-overview
  /language-guide/index /docs/current/tutorials/developer-journey/level-0/intro-languages
  /docs/current/developer-docs/production/instruction-limits /docs/current/building-dapps/launching-a-dapp/resource-limits
  /docs/current/developer-docs/backend/resource-limits /docs/current/building-dapps/launching-a-dapp/resource-limits
  /docs/current/concepts/data-centers /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/build/languages/rust/rust-intro /docs/current/building-dapps/developer-tools/cdks/rust/
  /docs/current/developer-docs/build/languages/motoko /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/integrations/sns/launching/launch-summary /docs/current/building-dapps/governing-dapps/launching/launch-summary-1proposal
  /docs/current/developer-docs/integrations/sns/launching/launch-steps /docs/current/building-dapps/governing-dapps/launching/launch-steps-1proposal
  /docs/current/developer-docs/frontend/javascript-frontend /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/react-frontend /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/svelte-frontend /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/vue-frontend /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/setup/cycles/index /docs/current/rosetta-defi/cycles/cycles-wallet
  /docs/current/developer-docs/setup/cycles /docs/current/rosetta-defi/cycles/cycles-wallet
  /docs/current/concepts/index /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/concepts /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/backend/candid/index /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/developer-docs/integrations/https-outcalls/index /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/overview
  /docs/current/developer-docs/integrations/https-outcalls /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/overview
  /docs/current/developer-docs/security/index /docs/current/developer-education/security/inter-canister-calls
  /docs/current/developer-docs/security /docs/current/developer-education/security/inter-canister-calls
  /docs/current/developer-docs/integrations/index /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/integrations /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/setup/index /docs/current/building-dapps/getting-started/install
  /docs/current/developer-docs/setup /docs/current/building-dapps/getting-started/install
  /docs/current/developer-docs/setup/quickstart /docs/current/building-dapps/getting-started/install
  /docs/current/tutorials/index /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/tutorials/ /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/backend/eu-subnets /docs/current/building-dapps/launching-dapps/subnets/subnet-types
  /docs/current/samples/* /docs/current/samples/overview
  /docs/current/developer-docs/backend/choosing-language /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/production/deploying-and-upgrading /docs/current/building-dapps/launching-a-dapp/deploy/overview
  /docs/current/developer-docs/index /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/concepts/what-is-ic /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/setup/development-workflow /docs/current/developer-education/developer-playbook/development-workflow
  /docs/current/developer-docs/setup/hello-world /docs/current/building-dapps/getting-started/write-smart-contracts
  /docs/current/developer-docs/setup/install/ /docs/current/building-dapps/getting-started/install
  /docs/current/developer-docs/setup/accounts /docs/current/building-dapps/getting-started/identities
  /docs/current/developer-docs/setup/cycles/cycles-faucet /docs/current/building-dapps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/setup/cycles/cycles-wallet /docs/current/rosetta-defi/cycles/cycles-wallet
  /docs/current/developer-docs/setup/cycles/converting_icp_tokens_into_cycles /docs/current/rosetta-defi/cycles/converting_icp_tokens_into_cycles
  /docs/current/developer-docs/setup/first-canister /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/setup/deploy-locally /docs/current/building-dapps/getting-started/deploy-and-manage
  /docs/current/developer-docs/setup/deploy-mainnet /docs/current/building-dapps/getting-started/deploy-and-manage
  /docs/current/developer-docs/production/best-practices /docs/current/developer-education/developer-playbook/developer-best-practices/general
  /docs/current/references/dev-tools-overview /docs/current/building-dapps/developer-tools/dev-tools-overview
  /docs/current/references/cdks /docs/current/building-dapps/developer-tools/cdks/index
  /docs/current/developer-docs/agents/ /docs/current/building-dapps/interacting-with-dapps/agents/overview
  /docs/current/developer-docs/agents/javascript-intro /docs/current/building-dapps/interacting-with-dapps/agents/javascript-agent
  /docs/current/developer-docs/agents/nodejs /docs/current/building-dapps/interacting-with-dapps/agents/nodejs
  /docs/current/developer-docs/agents/ic-agent-dfinity /docs/current/building-dapps/interacting-with-dapps/agents/rust-agent
  /docs/current/references/gitpod /docs/current/building-dapps/developer-tools/ide/gitpod
  /docs/current/developer-docs/setup/playground /docs/current/building-dapps/getting-started/deploy-and-manage
  /docs/current/developer-docs/setup/vs-code /docs/current/building-dapps/developer-tools/ide/vs-code
  /docs/current/developer-docs/setup/react-quickstart /docs/current/building-dapps/getting-started/quickstart/first-web-app
  /docs/current/references/cli-reference/ /docs/current/building-dapps/developer-tools/dfx/
  /docs/current/references/cli-reference/dfx-parent /docs/current/building-dapps/developer-tools/dfx/dfx-parent
  /docs/current/references/cli-reference/dfx-bootstrap /docs/current/building-dapps/developer-tools/dfx/dfx-bootstrap
  /docs/current/references/cli-reference/dfx-build /docs/current/building-dapps/developer-tools/dfx/dfx-build
  /docs/current/references/cli-reference/dfx-cache /docs/current/building-dapps/developer-tools/dfx/dfx-cache
  /docs/current/references/cli-reference/dfx-canister /docs/current/building-dapps/developer-tools/dfx/dfx-canister
  /docs/current/references/cli-reference/dfx-deploy /docs/current/building-dapps/developer-tools/dfx/dfx-deploy
  /docs/current/references/cli-reference/dfx-generate /docs/current/building-dapps/developer-tools/dfx/dfx-generate
  /docs/current/references/cli-reference/dfx-help /docs/current/building-dapps/developer-tools/dfx/dfx-help
  /docs/current/references/cli-reference/dfx-identity /docs/current/building-dapps/developer-tools/dfx/dfx-identity
  /docs/current/references/cli-reference/dfx-info /docs/current/building-dapps/developer-tools/dfx/dfx-info
  /docs/current/references/cli-reference/dfx-ledger /docs/current/building-dapps/developer-tools/dfx/dfx-ledger
  /docs/current/references/cli-reference/dfx-new /docs/current/building-dapps/developer-tools/dfx/dfx-new
  /docs/current/references/cli-reference/dfx-nns /docs/current/building-dapps/developer-tools/dfx/dfx-nns
  /docs/current/references/cli-reference/dfx-ping /docs/current/building-dapps/developer-tools/dfx/dfx-ping
  /docs/current/references/cli-reference/dfx-quickstart /docs/current/building-dapps/developer-tools/dfx/dfx-quickstart
  /docs/current/references/cli-reference/dfx-replica /docs/current/building-dapps/developer-tools/dfx/dfx-replica
  /docs/current/references/cli-reference/dfx-schema /docs/current/building-dapps/developer-tools/dfx/dfx-schema
  /docs/current/references/cli-reference/dfx-sns /docs/current/building-dapps/developer-tools/dfx/dfx-sns
  /docs/current/references/cli-reference/dfx-start /docs/current/building-dapps/developer-tools/dfx/dfx-start
  /docs/current/references/cli-reference/dfx-stop /docs/current/building-dapps/developer-tools/dfx/dfx-stop
  /docs/current/references/cli-reference/dfx-upgrade /docs/current/building-dapps/developer-tools/dfx/dfx-upgrade
  /docs/current/references/cli-reference/dfx-wallet /docs/current/building-dapps/developer-tools/dfx/dfx-wallet
  /docs/current/references/cli-reference/dfx-envars /docs/current/building-dapps/developer-tools/dfx/dfx-envars
  /docs/current/references/cli-reference/dfx-json-reference /docs/current/building-dapps/developer-tools/dfx-json-reference
  /docs/current/references/dfxvm/ /docs/current/building-dapps/developer-tools/dfxvm/dfx/
  /docs/current/references/quill-cli-reference/ /docs/current/building-dapps/developer-tools/quill/quill-parent
  /docs/current/references/quill-cli-reference/quill-account-balance /docs/current/building-dapps/developer-tools/quill/quill-account-balance
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc /docs/current/building-dapps/developer-tools/quill/ckbtc/quill-ckbtc
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-balance /docs/current/building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-balance
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc /docs/current/building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-retrieve-btc
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc-status /docs/current/building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-retrieve-btc-status
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-transfer /docs/current/building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-transfer
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-update-balance /docs/current/building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-update-balance
  /docs/current/references/quill-cli-reference/ckbtc/quill-ckbtc-withdrawal-address /docs/current/building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-withdrawal-address
  /docs/current/references/quill-cli-reference/quill-claim-neurons /docs/current/building-dapps/developer-tools/quill/quill-claim-neurons
  /docs/current/references/quill-cli-reference/quill-generate /docs/current/building-dapps/developer-tools/quill/quill-generate
  /docs/current/references/quill-cli-reference/quill-get-neuron-info /docs/current/building-dapps/developer-tools/quill/quill-get-neuron-info
  /docs/current/references/quill-cli-reference/quill-get-proposal-info /docs/current/building-dapps/developer-tools/quill/quill-get-proposal-info
  /docs/current/references/quill-cli-reference/quill-list-neurons /docs/current/building-dapps/developer-tools/quill/quill-list-neurons
  /docs/current/references/quill-cli-reference/quill-list-proposals /docs/current/building-dapps/developer-tools/quill/quill-list-proposals
  /docs/current/references/quill-cli-reference/quill-neuron-manage /docs/current/building-dapps/developer-tools/quill/quill-neuron-manage
  /docs/current/references/quill-cli-reference/quill-neuron-stake /docs/current/building-dapps/developer-tools/quill/quill-neuron-stake
  /docs/current/references/quill-cli-reference/quill-public-ids /docs/current/building-dapps/developer-tools/quill/quill-public-ids
  /docs/current/references/quill-cli-reference/quill-qr-code /docs/current/building-dapps/developer-tools/quill/quill-qr-code
  /docs/current/references/quill-cli-reference/quill-replace-node-provider-id /docs/current/building-dapps/developer-tools/quill/quill-replace-node-provider-id
  /docs/current/references/quill-cli-reference/quill-scanner-qr-code /docs/current/building-dapps/developer-tools/quill/quill-scanner-qr-code
  /docs/current/references/quill-cli-reference/quill-send /docs/current/building-dapps/developer-tools/quill/quill-send
  /docs/current/references/quill-cli-reference/sns/quill-sns /docs/current/building-dapps/developer-tools/quill/sns/quill-sns
  /docs/current/references/quill-cli-reference/sns/quill-sns-balance /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-balance
  /docs/current/references/quill-cli-reference/sns/quill-sns-configure-dissolve-delay /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-configure-dissolve-delay
  /docs/current/references/quill-cli-reference/sns/quill-sns-disburse /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-disburse
  /docs/current/references/quill-cli-reference/sns/quill-sns-disburse-maturity /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-disburse-maturity
  /docs/current/references/quill-cli-reference/sns/quill-sns-follow-neuron /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-follow-neuron
  /docs/current/references/quill-cli-reference/sns/quill-sns-get-sale-participation /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-get-sale-participation
  /docs/current/references/quill-cli-reference/sns/quill-sns-get-swap-refund /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-get-swap-refund
  /docs/current/references/quill-cli-reference/sns/quill-sns-list-deployed-snses /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-list-deployed-snses
  /docs/current/references/quill-cli-reference/sns/quill-sns-make-proposal /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-make-proposal
  /docs/current/references/quill-cli-reference/sns/quill-sns-make-upgrade-canister-proposal /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-make-upgrade-canister-proposal
  /docs/current/references/quill-cli-reference/sns/quill-sns-neuron-permission /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-neuron-permission
  /docs/current/references/quill-cli-reference/sns/quill-sns-new-sale-ticket /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-new-sale-ticket
  /docs/current/references/quill-cli-reference/sns/quill-sns-pay /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-pay
  /docs/current/references/quill-cli-reference/sns/quill-sns-register-vote /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-register-vote
  /docs/current/references/quill-cli-reference/sns/quill-sns-split-neuron /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-split-neuron
  /docs/current/references/quill-cli-reference/sns/quill-sns-stake-maturity /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-stake-maturity
  /docs/current/references/quill-cli-reference/sns/quill-sns-stake-neuron /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-stake-neuron
  /docs/current/references/quill-cli-reference/sns/quill-sns-status /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-status
  /docs/current/references/quill-cli-reference/sns/quill-sns-transfer /docs/current/building-dapps/developer-tools/quill/sns/quill-sns-transfer
  /docs/current/references/quill-cli-reference/quill-transfer /docs/current/building-dapps/developer-tools/quill/quill-transfer
  /docs/current/references/quill-cli-reference/quill-update-node-provider /docs/current/building-dapps/developer-tools/quill/quill-update-node-provider
  /docs/current/developer-docs/backend/candid/candid-concepts /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/developer-docs/backend/candid/ /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/developer-docs/backend/candid/candid-howto /docs/current/building-dapps/interacting-with-dapps/candid/using-candid
  /docs/current/developer-docs/backend/candid/generating-candid /docs/current/building-dapps/developer-tools/cdks/rust/generating-candid
  /docs/current/developer-docs/setup/deploy /docs/current/building-dapps/launching-a-dapp/deploy/overview
  /docs/current/developer-docs/production/larger-wasm /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/production/social-sharing /docs/current/building-dapps/launching-a-dapp/deploy/overview
  /docs/current/developer-docs/setup/delete /docs/current/building-dapps/managing-dapps/delete
  /docs/current/developer-docs/production/canister-history /docs/current/building-dapps/managing-dapps/history
  /docs/current/developer-docs/setup/build /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/setup/pulling-canister-dependencies /docs/current/building-dapps/interacting-with-dapps/using-third-party-canisters
  /docs/current/developer-docs/production/canister-recovery /docs/current/building-dapps/managing-dapps/recovery
  /docs/current/developer-docs/setup/state /docs/current/building-dapps/managing-dapps/state
  /docs/current/developer-docs/setup/manage-canisters /docs/current/building-dapps/managing-dapps/settings
  /docs/current/developer-docs/production/storage /docs/current/building-dapps/managing-dapps/storage
  /docs/current/developer-docs/setup/upgrade /docs/current/building-dapps/managing-dapps/upgrade
  /docs/current/developer-docs/production/resource-limits /docs/current/building-dapps/launching-a-dapp/resource-limits
  /docs/current/developer-docs/setup/manage-projects /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/production/topping-up-canister /docs/current/building-dapps/managing-dapps/topping-up
  /docs/current/developer-docs/getting-started/cycles/cycles_management_services /docs/current/building-dapps/managing-dapps/topping-up
  /docs/current/developer-docs/setup/pocket-ic /docs/current/building-dapps/launching-dapps/test/pocket-ic
  /docs/current/developer-docs/production/staging-environment /docs/current/building-dapps/launching-a-dapp/deploy/custom-testnets
  /docs/current/developer-docs/backend/reproducible-builds /docs/current/developer-education/developer-playbook/developer-best-practices/reproducible-builds
  /docs/current/developer-docs/backend/troubleshooting /docs/current/building-dapps/getting-started/troubleshooting
  /docs/current/developer-docs/integrations/t-ecdsa /docs/current/building-dapps/using-network-features/signatures/t-ecdsa
  /docs/current/developer-docs/integrations/vetkeys/ /docs/current/building-dapps/using-network-features/encryption/vetkeys
  /docs/current/developer-docs/integrations/vetkeys/using-vetkeys /docs/current/building-dapps/using-network-features/encryption/using-vetkeys
  /docs/current/developer-docs/integrations/composite-query /docs/current/building-dapps/interacting-with-dapps/query-calls
  /docs/current/developer-docs/backend/periodic-tasks /docs/current/building-dapps/using-network-features/periodic-tasks-timers
  /docs/current/developer-docs/setup/best-practices/architecture /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/smart-contracts/best-practices/architecture /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/setup/best-practices/general /docs/current/developer-education/developer-playbook/developer-best-practices/general
  /docs/current/developer-docs/setup/best-practices/storage /docs/current/developer-education/developer-playbook/developer-best-practices/storage
  /docs/current/developer-docs/setup/best-practices/troubleshooting /docs/current/developer-education/developer-playbook/developer-best-practices/troubleshooting
  /docs/current/developer-docs/frontend/ /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/default-frontend /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/add-stylesheet /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/boilerplate-frontend /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/frontend/existing-frontend /docs/current/building-dapps/dapp-frontends/existing-frontend
  /docs/current/developer-docs/production/custom-domain/ /docs/current/building-dapps/dapp-frontends/custom-domains/using-custom-domains
  /docs/current/developer-docs/production/custom-domain/dns-setup /docs/current/building-dapps/dapp-frontends/custom-domains/dns-setup
  /docs/current/developer-docs/backend/design-dapps /docs/current/developer-education/developer-concepts/what-are-canisters
  /docs/current/developer-docs/integrations/independently-verifying-ic-signatures /docs/current/building-dapps/using-network-features/signatures/independently-verifying-ic-signatures
  /docs/current/developer-docs/integrations/internet-identity/overview  /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/integrations/internet-identity/creating-ii /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/integrations/internet-identity/integrate-identity /docs/current/building-dapps/using-network-features/authentication/integrate-internet-identity
  /docs/current/developer-docs/integrations/internet-identity/alternative-origins /docs/current/building-dapps/using-network-features/authentication/alternative-origins
  /docs/current/developer-docs/http-compatible-canisters/custom-http-canisters /docs/current/building-dapps/dapp-frontends/http-gateways-certification/custom-http-canisters
  /docs/current/developer-docs/http-compatible-canisters/serving-json-over-http /docs/current/building-dapps/dapp-frontends/http-gateways-certification/serving-json-over-http
  /docs/current/developer-docs/http-compatible-canisters/serving-static-assets-over-http  /docs/current/building-dapps/dapp-frontends/http-gateways-certification/serving-static-assets-over-http
  /docs/current/developer-docs/integrations/ledger/introduction_and_overview /docs/current/rosetta-defi/overview
  /docs/current/developer-docs/integrations/ledger/  /docs/current/rosetta-defi/overview
  /docs/current/developer-docs/integrations/ledger/ledger-local-setup  /docs/current/rosetta-defi/token-ledgers/setup/icp_ledger_setup
  /docs/current/developer-docs/integrations/ledger/interact-with-ledger  /docs/current/rosetta-defi/token-ledgers/usage/icp_ledger_usage
  /docs/current/developer-docs/integrations/ledger/icp-index-local-setup /docs/current/rosetta-defi/tokens/indexes
  /docs/current/developer-docs/integrations/ledger/collecting-dust /docs/current/rosetta-defi/icp-tokens/account-trimming
  /docs/current/developer-docs/integrations/icrc-1/index /docs/current/references/icrc1-standard
  /docs/current/developer-docs/integrations/icrc-1/ /docs/current/references/icrc1-standard
  /docs/current/developer-docs/integrations/icrc-1/icrc1-ledger-setup /docs/current/rosetta-defi/token-ledgers/setup/icrc1_ledger_setup
  /docs/current/developer-docs/integrations/icrc-1/interact-with-ICRC-1-ledger /docs/current/rosetta-defi/token-ledgers/usage/icrc1_ledger_usage
  /docs/current/developer-docs/integrations/icrc-1/icrc1-index-setup /docs/current/rosetta-defi/tokens/indexes
  /docs/current/developer-docs/integrations/exchange-rate/exchange-rate-canister /docs/current/rosetta-defi/exchange-rate-canister
  /docs/current/developer-docs/integrations/rosetta/index  /docs/current/rosetta-defi/rosetta/overview
  /docs/current/developer-docs/integrations/rosetta/  /docs/current/rosetta-defi/rosetta/overview
  /docs/current/tokenomics/token-holders/custody-options-intro /docs/current/rosetta-defi/wallets/overview
  /docs/current/tokenomics/token-holders/self-custody-quickstart /docs/current/rosetta-defi/wallets/self-custody/self-custody-quickstart
  /docs/current/developer-docs/use-cases/considerations-for-nft-devs /docs/current/rosetta-defi/nfts/overview
  /docs/current/developer-docs/integrations/sns/introduction/sns-intro-high-level /docs/current/building-dapps/governing-dapps/overview
  /docs/current/developer-docs/integrations/sns/introduction/sns-architecture /docs/current/building-dapps/governing-dapps/overview
  /docs/current/developer-docs/integrations/sns/introduction/sns-launch /docs/current/building-dapps/governing-dapps/overview
  /docs/current/developer-docs/integrations/sns/introduction/dao-alternatives /docs/current/building-dapps/governing-dapps/overview
  /docs/current/developer-docs/integrations/sns/tokenomics/ /docs/current/building-dapps/governing-dapps/tokenomics/
  /docs/current/developer-docs/integrations/sns/tokenomics/sns-checklist /docs/current/building-dapps/governing-dapps/tokenomics/sns-checklist
  /docs/current/developer-docs/integrations/sns/tokenomics/predeployment-considerations  /docs/current/building-dapps/governing-dapps/tokenomics/predeployment-considerations
  /docs/current/developer-docs/integrations/sns/tokenomics/tokenomics-intro  /docs/current/building-dapps/governing-dapps/tokenomics/tokenomics-intro
  /docs/current/developer-docs/integrations/sns/tokenomics/rewards /docs/current/building-dapps/governing-dapps/tokenomics/rewards
  /docs/current/developer-docs/integrations/sns/tokenomics/preparation /docs/current/building-dapps/governing-dapps/tokenomics/preparation
  /docs/current/developer-docs/integrations/sns/integrating/ /docs/current/building-dapps/governing-dapps/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/ledger-integration /docs/current/building-dapps/governing-dapps/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/index-integration /docs/current/building-dapps/governing-dapps/launching/integrating
  /docs/current/developer-docs/integrations/sns/integrating/frontend-integration /docs/current/building-dapps/governing-dapps/launching/integrating
  /docs/current/developer-docs/integrations/sns/testing/testing-before-launch /docs/current/building-dapps/governing-dapps/testing/testing-before-launch
  /docs/current/developer-docs/integrations/sns/testing/testing-locally /docs/current/building-dapps/governing-dapps/testing/testing-locally
  /docs/current/developer-docs/integrations/sns/testing/testing-on-mainnet /docs/current/building-dapps/governing-dapps/testing/testing-on-mainnet
  /docs/current/developer-docs/integrations/sns/launching/ /docs/current/building-dapps/governing-dapps/launching/
  /docs/current/developer-docs/integrations/sns/launching/launch-summary-1proposal  /docs/current/building-dapps/governing-dapps/launching/launch-summary-1proposal
  /docs/current/developer-docs/integrations/sns/launching/launch-steps-1proposal /docs/current/building-dapps/governing-dapps/launching/launch-steps-1proposal
  /docs/current/developer-docs/integrations/sns/managing/manage-sns-intro /docs/current/building-dapps/governing-dapps/managing/manage-sns-intro
  /docs/current/developer-docs/integrations/sns/managing/making-proposals /docs/current/building-dapps/governing-dapps/managing/making-proposals
  /docs/current/developer-docs/integrations/sns/managing/cycles-usage /docs/current/building-dapps/governing-dapps/managing/cycles-usage
  /docs/current/developer-docs/integrations/sns/managing/sns-asset-canister /docs/current/building-dapps/governing-dapps/managing/sns-asset-canister
  /docs/current/developer-docs/integrations/sns/managing/managing-nervous-system-parameters /docs/current/building-dapps/governing-dapps/managing/managing-nervous-system-parameters
  /docs/current/tokenomics/nns/nns-intro /docs/current/move-to-learnhub/nns/overview
  /docs/current/tokenomics/token-holders/nns-app-quickstart /docs/current/move-to-learnhub/nns/using-the-nns-dapp/nns-app-quickstart
  /docs/current/tokenomics/nns/neurons-fund /docs/current/move-to-learnhub/nns/concepts/neurons-fund
  /docs/current/tokenomics/nns/nns-staking-voting-rewards /docs/current/move-to-learnhub/nns/concepts/neurons/staking-voting-rewards
  /docs/current/move-to-learnhub/nns/staking-voting-rewards /docs/current/move-to-learnhub/nns/concepts/neurons/staking-voting-rewards
  /docs/current/move-to-learnhub/nns/staking-voting-rewards/ /docs/current/move-to-learnhub/nns/concepts/neurons/staking-voting-rewards
  /docs/current/tokenomics/nns/proposal-requirements /docs/current/move-to-learnhub/nns/concepts/proposal-requirements
  /docs/current/move-to-learnhub/nns/proposal-requirements /docs/current/move-to-learnhub/nns/concepts/proposal-requirements
  /docs/current/tokenomics/index /docs/current/developer-docs/daos/overview
  /docs/current/tokenomics/ /docs/current/developer-docs/daos/overview
  /docs/current/developer-docs/integrations/multi-chain/user-faq /docs/current/building-dapps/chain-fusion/overview
  /docs/current/developer-docs/integrations/multi-chain/ckbtc-faq /docs/current/rosetta-defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/integrations/multi-chain/cketh-faq /docs/current/rosetta-defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/integrations/multi-chain/ckerc20-faq /docs/current/rosetta-defi/chain-key-tokens/ckerc20/overview
  /docs/current/developer-docs/integrations/multi-chain/signatures-faq /docs/current/references/t-sigs-how-it-works
  /docs/current/developer-docs/integrations/bitcoin/ /docs/current/building-dapps/chain-fusion/bitcoin/overview
  /docs/current/developer-docs/integrations/bitcoin/index /docs/current/building-dapps/chain-fusion/bitcoin/overview
  /docs/current/developer-docs/integrations/bitcoin/ckbtc /docs/current/rosetta-defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/integrations/bitcoin/read-state /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/read-state
  /docs/current/developer-docs/integrations/bitcoin/submit-transactions /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/submit-transactions
  /docs/current/developer-docs/integrations/bitcoin/local-development /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/local-development
  /docs/current/developer-docs/integrations/ethereum/overview /docs/current/building-dapps/chain-fusion/ethereum/overview
  /docs/current/developer-docs/integrations/ethereum/evm-rpc /docs/current/building-dapps/chain-fusion/ethereum/evm-rpc/evm-rpc-canister
  /docs/current/developer-docs/integrations/ethereum/siwe /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/integrations/bitcoin/bitcoin-how-it-works /docs/current/references/bitcoin-how-it-works
  /docs/current/developer-docs/integrations/bitcoin/ckbtc-reference /docs/current/references/ckbtc-reference
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-it-works /docs/current/references/https-outcalls-how-it-works
  /docs/current/developer-docs/integrations/t-ecdsa/t-ecdsa-how-it-works /docs/current/references/t-sigs-how-it-works
  /docs/current/developer-docs/integrations/vetkeys/technology-overview /docs/current/references/vetkeys-overview
  /docs/current/building-dapps/developer-tools/cli-tools/networks-json /docs/current/building-dapps/developer-tools/advanced-dfx/networks-json
  /docs/current/developer-docs/production/system-canisters /docs/current/developer-education/system-canisters/index
  /docs/current/developer-docs/backend/arguments /docs/current/developer-education/message-execution/types-of-canister-calls
  /docs/current/developer-docs/frontend/index /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-get /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/get
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-to-use /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/overview
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-overview /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/overview
  /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-post /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/post
  /docs/current/developer-docs/setup/ic-admin /docs/current/building-dapps/developer-tools/ic-admin
  /docs/current/developer-docs/backend/subnet-types /docs/current/building-dapps/launching-dapps/subnets/subnet-types
  /docs/current/references/glossary /docs/current/developer-education/glossary/index
  /docs/current/samples/host-a-website /docs/current/references/samples/hosting/static-website/
  /docs/current/samples/host-a-webgame /docs/current/references/samples/hosting/unity-webgl-template/
  /docs/current/references/security/general-security-best-practices/ /docs/current/developer-education/security/inter-canister-calls
  /docs/current/references/security/rust-canister-development-security-best-practices /docs/current/developer-education/security/inter-canister-calls
  /docs/current/references/security/web-app-development-security-best-practices /docs/current/developer-education/security/inter-canister-calls
  /docs/current/references/security/ /docs/current/developer-education/security/inter-canister-calls
  /docs/current/developer-docs/smart-contracts/overview/development-cycle /docs/current/developer-education/developer-playbook/canister-lifecycle
  /docs/current/developer-docs/web-apps/user-login/internet-identity/integrate-identity /docs/current/building-dapps/using-network-features/authentication/integrate-internet-identity
  /docs/current/developer-docs/multichain/ethereum/cketh /docs/current/rosetta-defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/chain-fusion/ethereum/siwe /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc /docs/current/rosetta-defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/bitcoin/read-state /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/read-state
  /docs/current/developer-docs/multi-chain/bitcoin/submit-transactions /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/submit-transactions
  /docs/current/developer-docs/multi-chain/bitcoin/local-development /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/local-development
  /docs/current/developer-docs/multi-chain/using-eth/evm-rpc/evm-rpc /docs/current/building-dapps/chain-fusion/ethereum/evm-rpc/evm-rpc-canister
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
  /docs/current/building-dapps/governing-dapps/introduction/sns-intro-high-level /docs/current/building-dapps/governing-dapps/overview
  /docs/current/building-dapps/governing-dapps/introduction/sns-architecture /docs/current/building-dapps/governing-dapps/overview
  /docs/current/building-dapps/governing-dapps/introduction/sns-launch /docs/current/building-dapps/governing-dapps/overview
  /docs/current/building-dapps/governing-dapps/introduction/dao-alternatives /docs/current/building-dapps/governing-dapps/overview
  /docs/current/building-dapps/governing-dapps/integrating/index /docs/current/building-dapps/governing-dapps/launching/integrating
  /docs/current/building-dapps/governing-dapps/integrating/ledger-integration /docs/current/building-dapps/governing-dapps/launching/integrating
  /docs/current/building-dapps/governing-dapps/integrating/index-integration /docs/current/building-dapps/governing-dapps/launching/integrating
  /docs/current/building-dapps/governing-dapps/integrating/frontend-integration /docs/current/building-dapps/governing-dapps/launching/integrating
  /docs/current/developer-docs/integrations/sns/ /docs/current/building-dapps/governing-dapps/overview
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc/overview /docs/current/rosetta-defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc/making-transactions /docs/current/rosetta-defi/chain-key-tokens/ckbtc/making-transactions
  /docs/current/developer-docs/multi-chain/bitcoin/ckbtc/using-ckbtc-in-dapps /docs/current/rosetta-defi/chain-key-tokens/ckbtc/using-ckbtc-in-dapps
  /docs/current/developer-docs/multi-chain/ethereum/cketh/overview /docs/current/rosetta-defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/ethereum/cketh/making-transactions /docs/current/rosetta-defi/chain-key-tokens/cketh/making-transactions
  /docs/current/developer-docs/multi-chain/ethereum/cketh/using-cketh-in-dapps /docs/current/rosetta-defi/chain-key-tokens/cketh/using-cketh-in-dapps
  /docs/current/developer-docs/web-apps/user-login/internet-identity/overview /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/web-apps/user-login/internet-identity/creating-ii /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/web-apps/user-login/internet-identity/integrate-internet-identity /docs/current/building-dapps/using-network-features/authentication/integrate-internet-identity
  /docs/current/developer-docs/web-apps/user-login/internet-identity/alternative-origins /docs/current/building-dapps/using-network-features/authentication/alternative-origins
  /docs/current/developer-docs/web-apps/user-login/nfid /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/web-apps/user-login/email-password /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/siwe /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/defi/icrc-1/icrc1-index-setup /docs/current/rosetta-defi/tokens/indexes
  /docs/current/defi/icp-tokens/icp-index-local-setup /docs/current/rosetta-defi/tokens/indexes
  /docs/current/developer-docs/smart-contracts/signatures/signing-transactions /docs/current/building-dapps/using-network-features/signatures/t-ecdsa
  /docs/current/developer-docs/defi/icp-tokens/overview /docs/current/rosetta-defi/tokens/token-standards
  /docs/current/developer-docs/defi/asset-custody/self-custody-quickstart /docs/current/rosetta-defi/wallets/self-custody/self-custody-quickstart
  /docs/current/developer-docs/defi/asset-custody/hardware-wallet-cli /docs/current/rosetta-defi/wallets/self-custody/hardware-wallet-cli
  /docs/current/developer-docs/defi/asset-custody/custody-options /docs/current/rosetta-defi/wallets/overview
  /docs/current/developer-docs/defi/nfts/considerations-for-nft-devs /docs/current/rosetta-defi/nfts/overview
  /docs/current/developer-docs/defi/icrc-1/token-quickstart /docs/current/rosetta-defi/tokens/create
  /docs/current/references/ /docs/current/references/ic-interface-spec
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/ /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/overview
  /docs/language-guide/motoko.html /docs/current/motoko/main/getting-started/motoko-introduction
  /education /education-hub
  /docs/current/developer-docs/integrations/ledger/deploy-new-token /docs/current/rosetta-defi/tokens/create
  /docs/current/samples/deploying-your-first-bitcoin-dapp /docs/current/references/samples/motoko/basic_bitcoin/
  /docs/integration/ledger-quick-start.html /docs/current/rosetta-defi/token-ledgers/setup/icp_ledger_setup
  /docs/current/developer-docs/integrations/storage/cost /docs/current/developer-education/developer-concepts/gas-cost
  /docs/token-holders/self-custody-quickstart.html /docs/current/rosetta-defi/wallets/self-custody/self-custody-quickstart
  /docs/current/developer-docs/overview/ /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/smart-contracts/overview	/docs/current/developer-education/developer-concepts/what-are-canisters
  /docs/current/references/dfx-json-reference /docs/current/building-dapps/developer-tools/dfx-json-reference
  /docs/language-guide/language-manual.html	/docs/current/motoko/main/getting-started/motoko-introduction
  /docs/developers-guide/default-wallet.html /docs/current/building-dapps/getting-started/tokens-and-cycles
  /docs/current/references/ic-interface /docs/current/references/ic-interface-spec
  /docs/current/tokenomics/sns/sns-intro-tokens	/docs/current/building-dapps/governing-dapps/tokenomics/tokenomics-intro
  /docs/developers-guide/sdk-guide.html	/docs/current/building-dapps/getting-started/install
  /docs/current/references/cli-reference/dfx-deps	/docs/current/building-dapps/developer-tools/dfx/dfx-deps
  /docs/current/samples/internet-identity-sample /docs/current/references/samples/motoko/internet_identity_integration/
  /docs/current/developer-docs/smart-contracts/advanced-features/threshold-signing /docs/current/building-dapps/using-network-features/signatures/t-ecdsa
  /docs/current/backend/candid/generating-candid /docs/current/building-dapps/developer-tools/cdks/rust/generating-candid
  /docs/current/developer-docs/backend/motoko/index.md /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/developer-docs/backend/rust/index /docs/current/building-dapps/developer-tools/cdks/rust/
  /docs/current/building-dapps/developer-tools/cli-tools/cli-reference/index /docs/current/building-dapps/developer-tools/dfx/
  /docs/current/developer-docs/integrations/icrc-1/deploy-new-token /docs/current/rosetta-defi/tokens/create
  /docs/current/developer-docs/setup/cycles/cycles-faucet.md	/docs/current/building-dapps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/setup/deploy-mainnet.md	/docs/current/building-dapps/getting-started/deploy-and-manage
  /docs/current/developer-docs/setup/index.md	/docs/current/building-dapps/getting-started/install
  /docs/current/developer-docs/smart-contracts/candid/index	/docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/docs/current/references/ii-spec	/docs/current/references/ii-spec
  /docs/current/motoko/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/getting-started/motoko-introduction /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/motoko/main/ /docs/current/motoko/main/getting-started/motoko-introduction
  /docs/current/samples/encrypted-notes/	/docs/current/references/samples/motoko/encrypted-notes-dapp/
  /docs/current/samples/nft	/docs/current/rosetta-defi/nfts/nft-collections
  /docs/language-guide/cycles.html /docs/current/building-dapps/getting-started/tokens-and-cycles
  /grants	https://dfinity.org/grants
  /docs/base-libraries/motoko-base/Text.html	/docs/current/motoko/main/base/Text
  /docs/candid-guide/candid-types.html	/docs/current/building-dapps/interacting-with-dapps/candid/using-candid/
  /docs/current/developer-docs/deploy/custom-domain	/docs/current/building-dapps/dapp-frontends/custom-domains/using-custom-domains
  /docs/current/developer-docs/integrations/internet-identity	/docs/current/building-dapps/using-network-features/authentication/overview
  /bitcoin /bitcoin-integration
  /bootcamp	/education-hub
  /docs/candid-guide/candid-concepts.html	/docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/blog/features/vetkey-primer	/blog/features/vetkey-primer
  /docs/current/concepts/chain-key-technology/ /docs/current/building-dapps/chain-fusion/overview
  /docs/current/concepts/concepts-intro.html	/docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/backend	/docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/backend/rust/rust-quickstart	/docs/current/building-dapps/developer-tools/cdks/rust/
  /docs/current/developer-docs/best-practices/	/docs/current/developer-education/developer-playbook/developer-best-practices/general
  /docs/current/developer-docs/best-practices/considerations-for-nft-devs /docs/current/rosetta-defi/nfts/overview
  /docs/current/developer-docs/smart-contracts/test/staging-environment /docs/current/building-dapps/launching-a-dapp/deploy/custom-testnets
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages /docs/current/building-dapps/using-network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/t-ecdsa /docs/current/building-dapps/using-network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/t-schnorr /docs/current/building-dapps/using-network-features/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages-tecdsa /docs/current/building-dapps/using-network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/encryption/signing-messages-t-schnorr /docs/current/building-dapps/using-network-features/signatures/t-schnorr
  /docs/current/developer-docs/production/topping-up-canister/ /docs/current/building-dapps/managing-dapps/topping-up
  /docs/current/developer-docs/build/cdks/motoko-dfinity/language-manual /docs/current/motoko/main/reference/language-manual
  /docs/current/references/t-ecdsa-how-it-works /docs/current/references/t-sigs-how-it-works
  /docs/current/developer-docs/web-apps/application-frontends/bundlers /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/webpack-dev-server /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/serving-static-assets /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/custom-frontend /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/security/rust-canister-development-security-best-practices /docs/current/developer-education/security/inter-canister-calls
  /docs/developers-guide/computation-and-storage-costs.html /docs/current/developer-education/developer-concepts/gas-cost
  /docs/current/developer-docs/getting-started/ /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/defi/wallets/workflow /docs/current/rosetta-defi/wallets/overview
  /docs/current/developer-docs/backend/rust/infrastructure /docs/current/building-dapps/developer-tools/cdks/rust/
  /docs/current/developer-docs/smart-contracts/deploy/larger-wasm /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/smart-contracts/deploy/sharing /docs/current/building-dapps/launching-a-dapp/deploy/overview
  /docs/current/developer-docs/integrations/rosetta/staking-support /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking/
  /docs/current/developer-docs/smart-contracts/test/benchmarking /docs/current/building-dapps/developer-tools/canbench
  /docs/current/developer-docs/smart-contracts/test/reproducible-builds /docs/current/developer-education/developer-playbook/developer-best-practices/reproducible-builds
  /docs/current/developer-docs/ai/ai-on-chain  /ecosystem
  /docs/current/developer-docs/ai/machine-learning-sample /ecosystem
  /docs/current/developer-docs/security/general-security-best-practices /docs/current/developer-education/security/overview
  /docs/current/samples/game-of-life /docs/current/references/samples/motoko/life/
  /docs/current/concepts/canisters-code /docs/current/developer-education/developer-concepts/what-are-canisters
  /docs/current/concepts/governance /docs/current/move-to-learnhub/nns/overview
  /docs/current/concepts/nodes-subnets /docs/current/building-dapps/launching-dapps/subnets/overview
  /docs/current/concepts/subnet-types /docs/current/building-dapps/launching-dapps/subnets/subnet-types
  /docs/current/concepts/glossary /docs/current/developer-education/glossary/index
  /docs/current/concepts/trust-in-canisters /docs/current/developer-docs/smart-contracts/overview/trust-in-canisters
  /docs/current/developer-docs/multi-chain/faq/user-faq /docs/current/building-dapps/chain-fusion/overview
  /docs/current/developer-docs/multi-chain/faq/ckbtc-faq /docs/current/rosetta-defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/faq/cketh-faq /docs/current/rosetta-defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/faq/ckerc20-faq /docs/current/rosetta-defi/chain-key-tokens/ckerc20/overview
  /docs/current/developer-docs/multi-chain/faq/signatures-faq /docs/current/references/t-sigs-how-it-works
  /docs/current/developer-docs/integrations/rosetta/staking-tutorial/ /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking/stake_icp
  /docs/current/developer-docs/getting-started/cycles/cycles-wallet /docs/current/rosetta-defi/cycles/cycles-wallet
  /docs/current/developer-docs/smart-contracts/write/auto-scaling-architecture /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/smart-contracts/write/resources /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/smart-contracts/call/arguments /docs/current/developer-education/message-execution/types-of-canister-calls
  /docs/current/developer-docs/smart-contracts/candid/ /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/developer-docs/getting-started/development-workflow /docs/current/developer-education/developer-playbook/development-workflow
  /docs/current/developer-docs/getting-started/default-template /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/getting-started/hello-world /docs/current/building-dapps/getting-started/write-smart-contracts
  /docs/current/developer-docs/getting-started/cycles/overview /docs/current/building-dapps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/getting-started/accounts /docs/current/building-dapps/getting-started/identities
  /docs/current/developer-docs/getting-started/deploy/local /docs/current/building-dapps/getting-started/deploy-and-manage
  /docs/current/developer-docs/getting-started/deploy/testnet /docs/current/building-dapps/getting-started/deploy-and-manage
  /docs/current/developer-docs/getting-started/deploy-and-manage  /docs/current/building-dapps/getting-started/deploy-and-manage
  /docs/current/developer-docs/smart-contracts/test/troubleshooting /docs/current/building-dapps/getting-started/troubleshooting
  /docs/current/developer-docs/smart-contracts/advanced-features/http-gateways /docs/current/building-dapps/using-network-features/using-external-data/http-gateways-certification/gateways
  /docs/current/developer-docs/smart-contracts/advanced-features/serving-http-request /docs/current/building-dapps/using-network-features/using-external-data/http-gateways-certification/gateways
  /docs/current/developer-docs/smart-contracts/write/default-template /docs/current/building-dapps/launching-a-dapp/create-and-install
  /developers /docs/current/home
  /docs/current/developer-docs/identity/authentication/email-password /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/identity/authentication/nfid /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/identity/authentication/siwb /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/identity/authentication/siwe /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/identity/authentication/siws /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/identity/authentication/msq /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/web-apps/browser-js/js-request-api /docs/current/building-dapps/interacting-with-dapps/agents/javascript-agent
  /docs/current/developer-docs/defi/tokens/asset_flow/index /docs/current/rosetta-defi/overview
  /docs/current/developer-docs/defi/tokens/ledger/overview /docs/current/rosetta-defi/overview
  /docs/current/developer-docs/defi/tokens/ledger/setup/overview /docs/current/rosetta-defi/overview
  /docs/current/developer-docs/defi/tokens/ledger/usage/overview /docs/current/rosetta-defi/overview
  /docs/current/developer-docs/web-apps/obtain-verify-ic-pubkey /docs/current/building-dapps/developer-tools/dfx/dfx-ping
  /docs/current/developer-docs/web-apps/design-dapps /docs/current/developer-education/developer-concepts/what-are-canisters
  /docs/current/developer-docs/smart-contracts/candid /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/developer-docs/build/cdks/motoko-dfinity /docs/current/building-dapps/developer-tools/cdks/index
  /docs/current/developer-docs/web-apps/application-frontends/add-stylesheet /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/default-frontend /docs/current/building-dapps/dapp-frontends/using-an-asset-canister

  /docs/current/developer-docs/getting-started/network-overview /docs/current/developer-education/developer-concepts/network-overview
  /docs/current/developer-docs/smart-contracts/overview/introduction /docs/current/developer-education/developer-concepts/what-are-canisters
  /docs/current/developer-docs/gas-cost /docs/current/developer-education/developer-concepts/gas-cost
  /docs/current/developer-docs/cost-estimations-and-examples /docs/current/developer-education/developer-concepts/cost-estimations-and-examples

  /docs/current/developer-docs/smart-contracts/development-workflow /docs/current/developer-education/developer-playbook/developer-workflow
  /docs/current/building-dapps/launching-a-dapp/create-and-install /docs/current/developer-education/developer-playbook/application-architectures
  /docs/current/developer-docs/smart-contracts/overview/inside-canisters /docs/current/developer-education/developer-playbook/inside-canisters
  /docs/current/developer-docs/smart-contracts/overview/canister-lifecycle /docs/current/developer-education/developer-playbook/canister-lifecycle

  /docs/current/developer-docs/smart-contracts/best-practices/general /docs/current/developer-education/developer-playbook/developer-best-practices/general
  /docs/current/developer-docs/smart-contracts/best-practices/reproducible-builds /docs/current/developer-education/developer-playbook/developer-best-practices/reproducible-builds
  /docs/current/developer-docs/smart-contracts/best-practices/storage /docs/current/developer-education/developer-playbook/developer-best-practices/storage
  /docs/current/developer-docs/smart-contracts/best-practices/troubleshooting /docs/current/developer-education/developer-playbook/developer-best-practices/troubleshooting
  /docs/current/developer-docs/smart-contracts/best-practices/idempotency /docs/current/developer-education/developer-playbook/developer-best-practices/idempotency

  /docs/current/developer-docs/smart-contracts/call/overview /docs/current/developer-education/message-execution/types-of-canister-calls
  /docs/current/references/execution-errors /docs/current/developer-education/message-execution/execution-errors
  /docs/current/references/ingress-messages /docs/current/developer-education/message-execution/ingress-messages
  /docs/current/developer-docs/smart-contracts/advanced-features/system-canisters /docs/current/developer-education/system-canisters/index
  /docs/current/developer-docs/smart-contracts/advanced-features/management-canister /docs/current/developer-education/system-canisters/management-canister
  /docs/current/developer-docs/security/formal-verification /docs/current/developer-education/security/formal-verification
  /docs/current/developer-docs/defi/exchange-rate-canister/ /docs/current/developer-education/system-canisters/exchange-rate-canister

  /docs/current/developer-docs/security/security-best-practices/inter-canister-calls /docs/current/developer-education/security/inter-canister-calls
  /docs/current/developer-docs/security/security-best-practices/iam /docs/current/developer-education/security/iam
  /docs/current/developer-docs/security/security-best-practices/decentralization /docs/current/developer-education/security/decentralization
  /docs/current/developer-docs/security/security-best-practices/data-integrity-and-authenticity /docs/current/developer-education/security/data-integrity-and-authenticity
  /docs/current/developer-docs/security/security-best-practices/data-storage /docs/current/developer-education/security/data-storage
  /docs/current/developer-docs/security/security-best-practices/https-outcalls /docs/current/developer-education/security/https-outcalls
  /docs/current/developer-docs/security/security-best-practices/dos /docs/current/developer-education/security/dos
  /docs/current/developer-docs/security/security-best-practices/canister-upgrades /docs/current/developer-education/security/canister-upgrades
  /docs/current/developer-docs/security/security-best-practices/observability-and-monitoring /docs/current/developer-education/security/observability-and-monitoring
  /docs/current/developer-docs/security/security-best-practices/misc /docs/current/developer-education/security/misc
  /docs/current/developer-docs/security/security-best-practices/resources /docs/current/developer-education/security/resources

  /docs/current/references/glossary /docs/current/developer-education/glossary/index

  /docs/current/developer-docs/getting-started/explore-examples /docs/current/building-dapps/getting-started/explore-examples
  /docs/current/developer-docs/getting-started/install /docs/current/building-dapps/getting-started/install
  /docs/current/developer-docs/getting-started/identities /docs/current/building-dapps/getting-started/identities
  /docs/current/developer-docs/getting-started/tokens-and-cycles /docs/current/building-dapps/getting-started/tokens-and-cycles
  /docs/current/developer-docs/getting-started/write-smart-contracts /docs/current/building-dapps/getting-started/write-smart-contracts
  /docs/current/developer-docs/getting-started/deploy-and-manage /docs/current/building-dapps/getting-started/deploy-and-manage
  /docs/current/developer-docs/getting-started/quickstart/first-smart-contract /docs/current/building-dapps/getting-started/quickstart/first-smart-contract
  /docs/current/developer-docs/getting-started/quickstart/react-quickstart /docs/current/building-dapps/getting-started/quickstart/first-web-app

  /docs/current/developer-docs/developer-tools/on-chain/cdks /docs/current/building-dapps/developer-tools/cdks/index

  /docs/current/developer-docs/backend/rust/index /docs/current/building-dapps/developer-tools/cdks/rust
  /docs/current/developer-docs/backend/rust/quickstart /docs/current/building-dapps/developer-tools/cdks/rust/quickstart
  /docs/current/developer-docs/backend/rust/dev-env /docs/current/building-dapps/developer-tools/cdks/rust/dev-env
  /docs/current/developer-docs/backend/rust/project-organization /docs/current/building-dapps/developer-tools/cdks/rust/project-organization
  /docs/current/developer-docs/backend/rust/deploying /docs/current/building-dapps/developer-tools/cdks/rust/deploying
  /docs/current/developer-docs/backend/rust/access-control /docs/current/building-dapps/developer-tools/cdks/rust/access-control
  /docs/current/developer-docs/backend/rust/searching-records /docs/current/building-dapps/developer-tools/cdks/rust/searching-records
  /docs/current/developer-docs/backend/rust/counter /docs/current/building-dapps/developer-tools/cdks/rust/counter
  /docs/current/developer-docs/backend/rust/rust-considerations /docs/current/building-dapps/developer-tools/cdks/rust/rust-considerations
  /docs/current/developer-docs/backend/rust/timers /docs/current/building-dapps/developer-tools/cdks/rust/timers
  /docs/current/developer-docs/backend/rust/stable-structures /docs/current/building-dapps/developer-tools/cdks/rust/stable-structures
  /docs/current/developer-docs/backend/rust/rust-limitations /docs/current/building-dapps/developer-tools/cdks/rust/rust-limitations
  /docs/current/developer-docs/backend/rust/samples /docs/current/building-dapps/developer-tools/cdks/rust/samples
  /docs/current/developer-docs/backend/rust/intercanister /docs/current/building-dapps/developer-tools/cdks/rust/intercanister
  /docs/current/developer-docs/backend/rust/message-inspect /docs/current/building-dapps/developer-tools/cdks/rust/message-inspect
  /docs/current/developer-docs/backend/rust/optimizing /docs/current/building-dapps/developer-tools/cdks/rust/optimizing
  /docs/current/developer-docs/backend/rust/upgrading /docs/current/building-dapps/developer-tools/cdks/rust/upgrading
  /docs/current/developer-docs/backend/rust/candid /docs/current/building-dapps/developer-tools/cdks/rust/candid
  /docs/current/developer-docs/backend/rust/generating-candid /docs/current/building-dapps/developer-tools/cdks/rust/generating-candid

  /docs/current/developer-docs/developer-tools/ide/playground /docs/current/building-dapps/developer-tools/ide/icp-ninja
  /docs/current/developer-docs/developer-tools/ide/gitpod /docs/current/building-dapps/developer-tools/ide/icp-ninja
  /docs/current/developer-docs/developer-tools/ide/codespaces /docs/current/building-dapps/developer-tools/ide/icp-ninja

  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-parent /docs/current/building-dapps/developer-tools/dfx/dfx-parent
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-bootstrap /docs/current/building-dapps/developer-tools/dfx/dfx-bootstrap
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-build /docs/current/building-dapps/developer-tools/dfx/dfx-build
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-cache /docs/current/building-dapps/developer-tools/dfx/dfx-cache
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-canister /docs/current/building-dapps/developer-tools/dfx/dfx-canister
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-completion /docs/current/building-dapps/developer-tools/dfx/dfx-completion
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-cycles /docs/current/building-dapps/developer-tools/dfx/dfx-cycles
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-deploy /docs/current/building-dapps/developer-tools/dfx/dfx-deploy
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-deps /docs/current/building-dapps/developer-tools/dfx/dfx-deps
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-generate /docs/current/building-dapps/developer-tools/dfx/dfx-generate
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-help /docs/current/building-dapps/developer-tools/dfx/dfx-help
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-identity /docs/current/building-dapps/developer-tools/dfx/dfx-identity
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-info /docs/current/building-dapps/developer-tools/dfx/dfx-info
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-stop /docs/current/building-dapps/developer-tools/dfx/dfx-stop
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-ledger /docs/current/building-dapps/developer-tools/dfx/dfx-ledger
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-new /docs/current/building-dapps/developer-tools/dfx/dfx-new
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-nns /docs/current/building-dapps/developer-tools/dfx/dfx-nns
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-ping /docs/current/building-dapps/developer-tools/dfx/dfx-ping
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-quickstart /docs/current/building-dapps/developer-tools/dfx/dfx-quickstart
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-replica /docs/current/building-dapps/developer-tools/dfx/dfx-replica
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-schema /docs/current/building-dapps/developer-tools/dfx/dfx-schema
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-sns /docs/current/building-dapps/developer-tools/dfx/dfx-sns
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-start /docs/current/building-dapps/developer-tools/dfx/dfx-start
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-stop /docs/current/building-dapps/developer-tools/dfx/dfx-stop
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-upgrade /docs/current/building-dapps/developer-tools/dfx/dfx-upgrade
  /docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-wallet /docs/current/building-dapps/developer-tools/dfx/dfx-wallet

  /docs/current/developer-docs/developer-tools/cli-tools/dfx-json /docs/current/building-dapps/developer-tools/dfx-json
  /docs/current/developer-docs/developer-tools/cli-tools/dfx-json-reference /docs/current/building-dapps/developer-tools/dfx-json-reference
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/check-chunk-store /docs/current/building-dapps/developer-tools/advanced-dfx/check-chunk-store
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/dfx-migration /docs/current/building-dapps/developer-tools/advanced-dfx/dfx-migration
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/init-args /docs/current/building-dapps/developer-tools/advanced-dfx/init-args
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/networks-json /docs/current/building-dapps/developer-tools/advanced-dfx/networks-json
  /docs/current/developer-docs/developer-tools/cli-tools/advanced-dfx/specifying-replica-version /docs/current/building-dapps/developer-tools/advanced-dfx/specifying-replica-version

  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-default /docs/current/building-dapps/developer-tools/dfxvm/dfxvm-default
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-install /docs/current/building-dapps/developer-tools/dfxvm/dfxvm-install
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm-init/dfxvm-init /docs/current/building-dapps/developer-tools/dfxvm/dfxvm-init
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-list /docs/current/building-dapps/developer-tools/dfxvm/dfxvm-list
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-self-uninstall /docs/current/building-dapps/developer-tools/dfxvm/dfxvm-self-uninstal
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-self-update /docs/current/building-dapps/developer-tools/dfxvm/dfxvm-self-update
  /docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-uninstall /docs/current/building-dapps/developer-tools/dfxvm/dfxvm-uninstall
  /docs/current/eveloper-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfxvm/dfxvm-update /docs/current/building-dapps/developer-tools/dfxvm/dfxvm-update

  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/index /docs/current/developer-tools/quill/index
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-parent /docs/current/developer-tools/quill/quill-parent
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-account-balance /docs/current/developer-tools/quill/quill-account-balance
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-ckbtc /docs/current/developer-tools/quill/ckbtc/quill-ckbtc
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-balance /docs/current/developer-tools/quill/ckbtc/quill-ckbtc-balance
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc /docs/current/developer-tools/quill/ckbtc/quill-ckbtc-retrieve-btc
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc-status /docs/current/developer-tools/quill/ckbtc/quill-ckbtc-retrieve-btc-status
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-transfer /docs/current/developer-tools/quill/ckbtc/quill-ckbtc-transfer
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-update-balance /docs/current/developer-tools/quill/ckbtc/quill-ckbtc-update-balance
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/ckbtc/quill-ckbtc-withdrawal-address /docs/current/developer-tools/quill/ckbtc/quill-ckbtc-withdrawal-address
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-claim-neurons /docs/current/developer-tools/quill/quill-claim-neurons
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-generate /docs/current/developer-tools/quill/quill-generatd
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-get-neuron-info /docs/current/developer-tools/quill/quill-get-neuron-info
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-get-proposal-info /docs/current/developer-tools/quill/quill-get-proposal-info
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-list-neurons /docs/current/developer-tools/quill/quill-list-neurons
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-list-proposals /docs/current/developer-tools/quill/quill-list-proposal
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-neuron-manage /docs/current/developer-tools/quill/quill-neuron-manage
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-neuron-stake /docs/current/developer-tools/quill/quill-neuron-stake
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-public-ids /docs/current/developer-tools/quill/quill-public-ids
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-qr-code /docs/current/developer-tools/quill/quill-qr-code
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-replace-node-provider-id /docs/current/developer-tools/quill/quill-replace-node-provider-id
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-scanner-qr-code /docs/current/developer-tools/quill/quill-scanner-qr-code
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-send /docs/current/developer-tools/quill/quill-send
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns /docs/current/developer-tools/quill/sns/quill-sns
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-balance /docs/current/developer-tools/quill/sns/quill-sns-balance
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-configure-dissolve-delay /docs/current/developer-tools/quill/sns/quill-sns-configure-dissolve-dela
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-disburse /docs/current/developer-tools/quill/sns/quill-sns-disburse
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-disburse-maturity /docs/current/developer-tools/quill/sns/quill-sns-disburse-maturity
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-follow-neuron /docs/current/developer-tools/quill/sns/quill-sns-follow-neuron
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-get-sale-participation /docs/current/developer-tools/quill/sns/quill-sns-get-sale-participation
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-get-swap-refund /docs/current/developer-tools/quill/sns/quill-sns-get-swap-refund
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-list-deployed-snses /docs/current/developer-tools/quill/sns/quill-sns-list-deployed-snses
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-make-proposal /docs/current/developer-tools/quill/sns/quill-sns-make-proposal
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-make-upgrade-canister-proposal /docs/current/developer-tools/quill/sns/quill-sns-make-upgrade-canister-proposal
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-neuron-permission /docs/current/developer-tools/quill/sns/quill-sns-neuron-permission
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-new-sale-ticket /docs/current/developer-tools/quill/sns/quill-sns-new-sale-ticket
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-pay /docs/current/developer-tools/quill/sns/quill-sns-pay
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-register-vote /docs/current/developer-tools/quill/sns/quill-sns-register-vote
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-split-neuron /docs/current/developer-tools/quill/sns/quill-sns-split-neuron
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-stake-maturity /docs/current/developer-tools/quill/sns/quill-sns-stake-maturity
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-stake-neuron /docs/current/developer-tools/quill/sns/quill-sns-stake-neuron
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-status /docs/current/developer-tools/quill/sns/quill-sns-status
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/sns/quill-sns-transfer /docs/current/developer-tools/quill/sns/quill-sns-transfer
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-transfer /docs/current/developer-tools/quill/quill-transfer
  /docs/current/developer-docs/developer-tools/cli-tools/quill-cli-reference/quill-update-node-provider /docs/current/developer-tools/quill/quill-update-node-provider

  /docs/current/developer-docs/smart-contracts/create /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/smart-contracts/write/overview /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/smart-contracts/compile /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/smart-contracts/install /docs/current/building-dapps/launching-a-dapp/create-and-install
  /docs/current/developer-docs/smart-contracts/deploy/overview /docs/current/building-dapps/launching-a-dapp/deploy/overview
  /docs/current/developer-docs/smart-contracts/deploy/custom-testnets /docs/current/building-dapps/launching-a-dapp/deploy/custom-testnets

  /docs/current/developer-docs/web-apps/application-frontends/webpack /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/browser-js/js-frameworks /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/overview /docs/current/building-dapps/dapp-frontends/using-an-asset-canister
  /docs/current/developer-docs/web-apps/application-frontends/existing-frontend /docs/current/building-dapps/dapp-frontends/existing-frontend
  /docs/current/developer-docs/web-apps/application-frontends/asset-security /docs/current/building-dapps/dapp-frontends/asset-security
  /docs/current/developer-docs/web-apps/custom-domains/using-custom-domains /docs/current/building-dapps/dapp-frontends/custom-domains/using-custom-domains
  /docs/current/developer-docs/web-apps/custom-domains/dns-setup /docs/current/building-dapps/dapp-frontends/custom-domains/dns-setup

  /docs/current/developer-docs/smart-contracts/candid/candid-concepts /docs/current/building-dapps/interacting-with-dapps/candid/candid-concepts
  /docs/current/developer-docs/smart-contracts/candid/candid-howto /docs/current/building-dapps/interacting-with-dapps/candid/using-candid
  /docs/current/developer-docs/smart-contracts/candid/candid-tools /docs/current/building-dapps/interacting-with-dapps/candid/candid-tools
  /docs/current/developer-docs/smart-contracts/advanced-features/async-code /docs/current/developer-education/message-execution/async-code
  /docs/current/developer-docs/smart-contracts/advanced-features/composite-query /docs/current/building-dapps/interacting-with-dapps/query-calls
  /docs/current/developer-docs/smart-contracts/advanced-features/query-stats /docs/current/building-dapps/interacting-with-dapps/query-calls

  /docs/current/developer-docs/developer-tools/off-chain/agents/overview /docs/current/building-dapps/interacting-with-dapps/agents/overview
  /docs/current/developer-docs/developer-tools/off-chain/agents/javascript-agent /docs/current/building-dapps/interacting-with-dapps/agents/javascript-agent
  /docs/current/developer-docs/developer-tools/off-chain/agents/nodejs /docs/current/building-dapps/interacting-with-dapps/agents/nodejs
  /docs/current/developer-docs/developer-tools/off-chain/agents/rust-agent /docs/current/building-dapps/interacting-with-dapps/agents/rust-agent

  /docs/current/developer-docs/smart-contracts/maintain/import /docs/current/building-dapps/interacting-with-dapps/using-third-party-canisters
  /docs/current/developer-docs/smart-contracts/maintain/control /docs/current/building-dapps/managing-dapps/control
  /docs/current/developer-docs/smart-contracts/maintain/delete /docs/current/building-dapps/managing-dapps/delete
  /docs/current/developer-docs/smart-contracts/maintain/history /docs/current/building-dapps/managing-dapps/history
  /docs/current/developer-docs/smart-contracts/maintain/logs /docs/current/building-dapps/managing-dapps/logs
  /docs/current/developer-docs/smart-contracts/maintain/recovery /docs/current/building-dapps/managing-dapps/recovery
  /docs/current/developer-docs/smart-contracts/maintain/resource-limits /docs/current/building-dapps/launching-a-dapp/resource-limits
  /docs/current/developer-docs/smart-contracts/maintain/snapshots /docs/current/building-dapps/managing-dapps/snapshots
  /docs/current/developer-docs/smart-contracts/maintain/state /docs/current/building-dapps/managing-dapps/state
  /docs/current/developer-docs/smart-contracts/maintain/settings /docs/current/building-dapps/managing-dapps/settings
  /docs/current/developer-docs/smart-contracts/maintain/storage /docs/current/building-dapps/managing-dapps/storage
  /docs/current/developer-docs/smart-contracts/maintain/trapping /docs/current/building-dapps/managing-dapps/trapping
  /docs/current/developer-docs/smart-contracts/maintain/upgrade /docs/current/building-dapps/managing-dapps/upgrade
  /docs/current/developer-docs/smart-contracts/topping-up/topping-up-canister /docs/current/building-dapps/managing-dapps/topping-up
  /docs/current/developer-docs/smart-contracts/topping-up/cycles_management_services /docs/current/building-dapps/managing-dapps/topping-up

  /docs/current/developer-docs/web-apps/http-compatible-canisters/custom-http-canisters /docs/current/building-dapps/using-network-features/using-external-data/http-gateways-certification/custom-http-canisters
  /docs/current/developer-docs/web-apps/http-compatible-canisters/serving-json-over-http /docs/current/building-dapps/using-network-features/using-external-data/http-gateways-certification/serving-json-over-http
  /docs/current/developer-docs/web-apps/http-compatible-canisters/serving-static-assets-over-http /docs/current/building-dapps/using-network-features/using-external-data/http-gateways-certification/serving-static-assets-over-http

  /docs/current/developer-docs/smart-contracts/signatures/t-ecdsa /docs/current/building-dapps/using-network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/signatures/t-schnorr /docs/current/building-dapps/using-network-features/signatures/t-schnorr
  /docs/current/developer-docs/smart-contracts/signatures/signing-messages-t-ecdsa /docs/current/building-dapps/using-network-features/signatures/t-ecdsa
  /docs/current/developer-docs/smart-contracts/signatures/signing-messages-t-schnorr /docs/current/building-dapps/using-network-features/signatures/t-schnorr
  /docs/current/developer-docs/web-apps/independently-verifying-ic-signatures /docs/current/building-dapps/using-network-features/signatures/independently-verifying-ic-signatures

  /docs/current/developer-docs/smart-contracts/encryption/vetkeys /docs/current/building-dapps/using-network-features/encryption/vetkeys
  /docs/current/developer-docs/smart-contracts/encryption/using-vetkeys /docs/current/building-dapps/using-network-features/encryption/using-vetkeys

  /docs/current/developer-docs/smart-contracts/advanced-features/handling-get-post-requests /docs/current/building-dapps/using-network-features/using-external-data/http-gateways-certification/gateways
  /docs/current/developer-docs/smart-contracts/advanced-features/periodic-tasks /docs/current/building-dapps/using-network-features/periodic-tasks-timers
  /docs/current/developer-docs/smart-contracts/advanced-features/randomness /docs/current/building-dapps/using-network-features/randomness
  /docs/current/developer-docs/smart-contracts/advanced-features/simd /docs/current/building-dapps/using-network-features/simd
  /docs/current/developer-docs/smart-contracts/advanced-features/time-and-timestamps /docs/current/building-dapps/using-network-features/time-and-timestamps

  /docs/current/developer-docs/identity/authentication/overview /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/identity/internet-identity/overview /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/identity/internet-identity/creating-ii /docs/current/building-dapps/using-network-features/authentication/overview
  /docs/current/developer-docs/identity/internet-identity/integrate-internet-identity /docs/current/building-dapps/using-network-features/authentication/integrate-internet-identity
  /docs/current/developer-docs/identity/internet-identity/alternative-origins /docs/current/building-dapps/using-network-features/authentication/alternative-origins
  /docs/current/developer-docs/identity/verifiable-credentials/overview /docs/current/building-dapps/using-network-features/verifiable-credentials/overview
  /docs/current/developer-docs/identity/verifiable-credentials/how-it-works /docs/current/building-dapps/using-network-features/verifiable-credentials/how-it-works
  /docs/current/developer-docs/identity/verifiable-credentials/issuer /docs/current/building-dapps/using-network-features/verifiable-credentials/issuer
  /docs/current/developer-docs/identity/verifiable-credentials/relying-party /docs/current/building-dapps/using-network-features/verifiable-credentials/relying-party

  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-overview /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/overview
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-how-to-use /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/overview
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-get /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/get
  /docs/current/developer-docs/smart-contracts/advanced-features/https-outcalls/https-outcalls-post /docs/current/building-dapps/using-network-features/using-external-data/https-outcalls/post

  /docs/current/developer-docs/multi-chain/overview /docs/current/building-dapps/chain-fusion/overview
  /docs/current/developer-docs/multi-chain/supported-chains /docs/current/building-dapps/chain-fusion/supported-chains
  /docs/current/developer-docs/multi-chain/bitcoin/overview /docs/current/building-dapps/chain-fusion/bitcoin/overview
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/btc-comparison /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/btc-comparison
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/btc-dev-workflow /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/btc-dev-workflow
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/generate-addresses /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/generate-addresses
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/create-transactions /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/create-transactions
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/sign-transactions /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/sign-transactions
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/submit-transactions /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/submit-transactions
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/read-state /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/read-state
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/ordinals /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/ordinals
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/runes /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/runes
  /docs/current/developer-docs/multi-chain/bitcoin/using-btc/local-development /docs/current/building-dapps/chain-fusion/bitcoin/using-btc/local-development

  /docs/current/developer-docs/multi-chain/ethereum/overview /docs/current/building-dapps/chain-fusion/ethereum/overview
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/eth-comparison /docs/current/building-dapps/chain-fusion/ethereum/using-eth/eth-comparison
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/eth-dev-workflow /docs/current/building-dapps/chain-fusion/ethereum/using-eth/eth-dev-workflow
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/generating-addresses /docs/current/building-dapps/chain-fusion/ethereum/using-eth/generating-addresses
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/signing-transactions /docs/current/building-dapps/chain-fusion/ethereum/using-eth/signing-transactions
  /docs/current/developer-docs/multi-chain/ethereum/using-eth/submit-transactions /docs/current/building-dapps/chain-fusion/ethereum/using-eth/submit-transactions
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/overview /docs/current/building-dapps/chain-fusion/ethereum/evm-rpc/overview
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/how-it-works /docs/current/building-dapps/chain-fusion/ethereum/evm-rpc/how-it-works
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/evm-rpc-canister /docs/current/building-dapps/chain-fusion/ethereum/evm-rpc/evm-rpc-canister
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/costs /docs/current/building-dapps/chain-fusion/ethereum/evm-rpc/costs
  /docs/current/developer-docs/multi-chain/ethereum/evm-rpc/samples /docs/current/building-dapps/chain-fusion/ethereum/evm-rpc/samples
  /docs/current/developer-docs/multi-chain/examples /docs/current/building-dapps/chain-fusion/examples

  /docs/current/developer-docs/daos/sns/overview /docs/current/building-dapps/governing-dapps/overview
  /docs/current/developer-docs/daos/sns/tokenomics/index /docs/current/building-dapps/governing-dapps/tokenomics/index
  /docs/current/developer-docs/daos/sns/tokenomics/predeployment-considerations /docs/current/building-dapps/governing-dapps/tokenomics/predeployment-considerations
  /docs/current/developer-docs/daos/sns/tokenomics/tokenomics-intro /docs/current/building-dapps/governing-dapps/tokenomics/tokenomics-intro
  /docs/current/developer-docs/daos/sns/tokenomics/rewards /docs/current/building-dapps/governing-dapps/tokenomics/rewards
  /docs/current/developer-docs/daos/sns/tokenomics/preparation /docs/current/building-dapps/governing-dapps/tokenomics/preparation
  /docs/current/developer-docs/daos/sns/tokenomics/sns-checklist /docs/current/building-dapps/governing-dapps/tokenomics/sns-checklist
  /docs/current/developer-docs/daos/sns/launching/index /docs/current/building-dapps/governing-dapps/launching/index
  /docs/current/developer-docs/daos/sns/launching/launch-summary-1proposal /docs/current/building-dapps/governing-dapps/launching/launch-summary-1proposal
  /docs/current/developer-docs/daos/sns/launching/launch-steps-1proposal /docs/current/building-dapps/governing-dapps/launching/launch-steps-1proposal
  /docs/current/developer-docs/daos/sns/launching/integrating /docs/current/building-dapps/governing-dapps/launching/integrating
  /docs/current/developer-docs/daos/sns/testing/testing-before-launch /docs/current/building-dapps/governing-dapps/testing/testing-before-launch
  /docs/current/developer-docs/daos/sns/testing/testing-locally /docs/current/building-dapps/governing-dapps/testing/testing-locally
  /docs/current/developer-docs/daos/sns/testing/testing-on-mainnet /docs/current/building-dapps/governing-dapps/testing/testing-on-mainnet
  /docs/current/developer-docs/daos/sns/managing/manage-sns-intro /docs/current/building-dapps/governing-dapps/managing/manage-sns-intro
  /docs/current/developer-docs/daos/sns/managing/making-proposals /docs/current/building-dapps/governing-dapps/managing/making-proposals
  /docs/current/developer-docs/daos/sns/managing/cycles-usage /docs/current/building-dapps/governing-dapps/managing/cycles-usage
  /docs/current/developer-docs/daos/sns/managing/sns-asset-canister /docs/current/building-dapps/governing-dapps/managing/sns-asset-canister
  /docs/current/developer-docs/daos/sns/managing/managing-nervous-system-parameters /docs/current/building-dapps/governing-dapps/managing/managing-nervous-system-parameters

  /docs/current/developer-docs/defi/overview /docs/current/rosetta-defi/overview
  /docs/current/developer-docs/defi/tokens/token-standards /docs/current/rosetta-defi/tokens/token-standards
  /docs/current/developer-docs/defi/tokens/ledger/setup/icp_ledger_setup /docs/current/rosetta-defi/token-ledgers/setup/icp_ledger_setup
  /docs/current/developer-docs/defi/tokens/ledger/setup/icrc1_ledger_setup /docs/current/rosetta-defi/token-ledgers/setup/icrc1_ledger_setup
  /docs/current/developer-docs/defi/tokens/ledger/usage/icp_ledger_usage /docs/current/rosetta-defi/token-ledgers/usage/icp_ledger_usage
  /docs/current/developer-docs/defi/tokens/ledger/usage/icrc1_ledger_usage /docs/current/rosetta-defi/token-ledgers/usage/icrc1_ledger_usage
  /docs/current/developer-docs/defi/tokens/advanced/direct_integration /docs/current/rosetta-defi/tokens/advanced/direct_integration
  /docs/current/developer-docs/defi/tokens/indexes /docs/current/rosetta-defi/tokens/indexes
  /docs/current/developer-docs/defi/icp-tokens/account-trimming /docs/current/rosetta-defi/icp-tokens/account-trimming
  /docs/current/developer-docs/defi/tokens/create /docs/current/rosetta-defi/tokens/create
  /docs/current/developer-docs/defi/cycles/cycles-ledger /docs/current/rosetta-defi/token-ledgers/cycles-ledger
  /docs/current/developer-docs/defi/cycles/cycles-wallet /docs/current/rosetta-defi/cycles/cycles-wallet
  /docs/current/developer-docs/defi/cycles/converting_icp_tokens_into_cycles /docs/current/rosetta-defi/cycles/converting_icp_tokens_into_cycles

  /docs/current/developer-docs/defi/rosetta/icp_rosetta/index /docs/current/rosetta-defi/rosetta/icp_rosetta/index
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/index /docs/current/rosetta-defi/rosetta/icp_rosetta/data_api/index
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/network /docs/current/rosetta-defi/rosetta/icp_rosetta/data_api/network
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/balances /docs/current/rosetta-defi/rosetta/icp_rosetta/data_api/balances
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/blocks /docs/current/rosetta-defi/rosetta/icp_rosetta/data_api/blocks
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/transactions /docs/current/rosetta-defi/rosetta/icp_rosetta/data_api/transactions
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/list_known_neurons /docs/current/rosetta-defi/rosetta/icp_rosetta/data_api/list_known_neurons
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/get_pending_proposals /docs/current/rosetta-defi/rosetta/icp_rosetta/data_api/get_pending_proposals
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/data_api/get_proposal_info /docs/current/rosetta-defi/rosetta/icp_rosetta/data_api/get_proposal_info

  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/index /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/index
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/index /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/derive /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/preprocess /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/metadata /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/payloads /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/combine /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/operations-flow
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/submit /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/ooperations-flow

  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/index /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking/index
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/neuron_info /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/derive_neuron_id /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/stake_icp /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/lock_neuron /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/dissolve /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/stake_maturity /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/change_auto_stake_maturity /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/spawn /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/disburse /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/staking

  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/voting/index /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/voting
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/voting/vote /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/voting
  /docs/current/developer-docs/defi/rosetta/icp_rosetta/construction_api/voting/follow /docs/current/rosetta-defi/rosetta/icp_rosetta/construction_api/voting

  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/index /docs/current/rosetta-defi/rosetta/icrc_rosetta/index

  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/index /docs/current/rosetta-defi/rosetta/icrc_rosetta/data_api/index
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/network /docs/current/rosetta-defi/rosetta/icrc_rosetta/data_api/index
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/balances /docs/current/rosetta-defi/rosetta/icrc_rosetta/data_api/index
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/blocks /docs/current/rosetta-defi/rosetta/icrc_rosetta/data_api/index
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/data_api/transactions /docs/current/rosetta-defi/rosetta/icrc_rosetta/data_api/index

  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/index /docs/current/rosetta-defi/rosetta/icrc_rosetta/construction_api/index
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/index /docs/current/rosetta-defi/rosetta/icrc_rosetta/construction_api/index
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/transfer /docs/current/rosetta-defi/rosetta/icrc_rosetta/construction_api/index
  /docs/current/developer-docs/defi/rosetta/icrc_rosetta/construction_api/asset_transfer/approve /docs/current/rosetta-defi/rosetta/icrc_rosetta/construction_api/index

  /docs/current/developer-docs/multi-chain/chain-key-tokens/overview /docs/current/rosetta-defi/chain-key-tokens/overview
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/overview /docs/current/rosetta-defi/chain-key-tokens/ckbtc/overview
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/making-transactions /docs/current/rosetta-defi/chain-key-tokens/ckbtc/making-transactions
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckbtc/using-ckbtc-in-dapps /docs/current/rosetta-defi/chain-key-tokens/ckbtc/using-ckbtc-in-dapps
  /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/overview /docs/current/rosetta-defi/chain-key-tokens/cketh/overview
  /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/making-transactions /docs/current/rosetta-defi/chain-key-tokens/cketh/making-transactions
  /docs/current/developer-docs/multi-chain/chain-key-tokens/cketh/using-cketh-in-dapps /docs/current/rosetta-defi/chain-key-tokens/cketh/using-cketh-in-dapps
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckerc20/overview /docs/current/rosetta-defi/chain-key-tokens/ckerc20/overview
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckerc20/making-transactions /docs/current/rosetta-defi/chain-key-tokens/ckerc20/making-transactions
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckerc20/using-ckerc20-in-dapps /docs/current/rosetta-defi/chain-key-tokens/ckerc20/using-ckerc20-in-dapps
  /docs/current/developer-docs/multi-chain/chain-key-tokens/ckerc20/creating-new-ckerc20 /docs/current/rosetta-defi/chain-key-tokens/ckerc20/creating-new-ckerc20

  /docs/current/developer-docs/defi/nfts/nft-collections /docs/current/rosetta-defi/nft-collections

  /docs/current/references/subnets/overview /docs/current/building-dapps/launching-dapps/subnets/overview
  /docs/current/references/subnets/subnet-types /docs/current/building-dapps/launching-dapps/subnets/subnet-types
  /docs/current/developer-docs/smart-contracts/test/overview /docs/current/building-dapps/launching-dapps/test/overview
  /docs/current/developer-docs/smart-contracts/test/pocket-ic /docs/current/building-dapps/launching-dapps/test/pocket-ic

  /docs/current/developer-docs/ai/overview /ecosystem
  /docs/current/developer-docs/ai/inference /ecosystem
  /docs/current/developer-docs/ai/samples /ecosystem
  /docs/current/developer-docs/ai/training-models /ecosystem
  /docs/current/developer-docs/ai/machine-learning-sample /ecosystem

  /docs/current/developer-docs/defi/dex/overview /docs/current/home
  /docs/current/developer-docs/defi/nfts/overview /docs/current/home
  /docs/current/developer-docs/defi/nfts/marketplaces /docs/current/home

  /docs/current/developer-docs/daos/nns/overview /docs/current/home
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-app-quickstart /docs/current/home
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-send-and-receive-tokens /docs/current/home
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-importing-tokens /docs/current/home
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-staking-a-neuron /docs/current/home
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-voting-on-proposals /docs/current/home
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-following-other-neurons /docs/current/home
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-advanced-neuron-operations /docs/current/home
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-making-neurons-public /docs/current/home
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-manage-quill-neurons /docs/current/home
  /docs/current/developer-docs/daos/nns/using-the-nns-dapp/nns-dapp-additional-features /docs/current/home

  /docs/current/developer-docs/daos/nns/concepts/neurons/neuron-overview /docs/current/home
  /docs/current/developer-docs/daos/nns/concepts/neurons/neuron-following /docs/current/home
  /docs/current/developer-docs/daos/nns/concepts/neurons/staking-voting-rewards /docs/current/home
  /docs/current/developer-docs/daos/nns/concepts/neurons/neuron-management /docs/current/home
  /docs/current/developer-docs/daos/nns/concepts/neurons/becoming-a-known-neuron /docs/current/home

  /docs/current/developer-docs/daos/nns/concepts/proposals/proposal-overview /docs/current/home
  /docs/current/developer-docs/daos/nns/concepts/proposals/direct-voting /docs/current/home
  /docs/current/developer-docs/daos/nns/concepts/proposals/proposal-topics /docs/current/home
  /docs/current/developer-docs/daos/nns/concepts/proposals/verify-proposals /docs/current/home
  /docs/current/developer-docs/daos/nns/concepts/proposals/proposal-submit /docs/current/home
  /docs/current/developer-docs/daos/nns/concepts/neurons-fund /docs/current/home
  /docs/current/references/node-providers/overview /docs/current/home
  /docs/current/references/node-providers/node-metrics /docs/current/home
  /docs/current/developer-docs/defi/wallets/overview /docs/current/home
  /docs/current/developer-docs/defi/wallets/self-custody/self-custody-quickstart /docs/current/home
  /docs/current/developer-docs/defi/wallets/self-custody/hardware-wallet-cli /docs/current/home
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
