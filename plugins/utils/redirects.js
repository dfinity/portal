const redirects = `
  /developers-guide/quickstart /docs/current/tutorials/deploy_sample_app
  /docs /docs/current/home
  /docs/base-libraries/* /docs/current/motoko/main/base/:splat
  /docs/base-libraries/Debug.html /docs/current/motoko/main/base/Debug
  /docs/base-libraries/stdlib-intro.html /docs/current/motoko/main/about-this-guide
  /docs/base-libraries/Time.html /docs/current/motoko/main/base/Time
  /docs/base-libraries/HashMap.html /docs/current/motoko/main/base/HashMap
  /docs/base-libraries/Option.html /docs/current/motoko/main/base/Option
  /docs/candid-guide /docs/current/developer-docs/backend/candid/
  /docs/candid-guide/candid-concepts /docs/current/developer-docs/backend/candid/candid-concepts
  /docs/candid-guide/candid-concepts.html /docs/current/developer-docs/backend/candid/candid-concepts
  /docs/candid-guide/candid-howto /docs/current/developer-docs/backend/candid/candid-howto
  /docs/candid-guide/candid-intro /docs/current/developer-docs/backend/candid/
  /docs/candid-guide/candid-intro.html /docs/current/developer-docs/backend/candid/
  /docs/current/developer-docs/build/candid/candid-intro /docs/current/developer-docs/backend/candid/
  /docs/candid-guide/candid-ref /docs/current/references/candid-ref
  /docs/candid-guide/candid-types /docs/current/references/candid-ref  
  /docs/candid-guide/candid-types.html /docs/current/references/candid-ref
  /docs/current/ /docs/current/home
  /docs/current/concepts/bitcoin-integration /bitcoin-integration
  /docs/current/developer-docs/best-practices/considerations-for-nft-devs /docs/current/developer-docs/use-cases/considerations-for-nft-devs
  /docs/current/developer-docs/best-practices/considerations-for-nft-devs/ /docs/current/developer-docs/use-cases/considerations-for-nft-devs
  /docs/current/developer-docs/build/ /docs/current/developer-docs/backend/choosing-language
  /docs/current/developer-docs/build/backend/candid-ui /docs/current/developer-docs/backend/candid/
  /docs/current/developer-docs/build/backend/intercanister-calls /docs/current/developer-docs/backend/backend-tutorials/intercanister-calls
  /docs/current/developer-docs/build/backend/reproducible-builds /docs/current/developer-docs/backend/reproducible-builds
  /docs/current/developer-docs/build/candid/candid-howto /docs/current/developer-docs/backend/candid/candid-howto
  /docs/current/developer-docs/build/cdks/motoko-dfinity/about-this-guide /docs/current/motoko/main/about-this-guide
  /docs/current/developer-docs/build/cdks/motoko-dfinity/base /docs/current/motoko/main/base/
  /docs/current/developer-docs/build/cdks/motoko-dfinity/base/Array /docs/current/motoko/main/base/Array
  /docs/current/developer-docs/build/cdks/motoko-dfinity/language-manual /docs/current/developer-docs/backend/backend-tutorials/
  /docs/current/developer-docs/build/cdks/motoko-dfinity/motoko /docs/current/motoko/intro
  /docs/current/developer-docs/build/cdks/motoko-dfinity/motoko-grammar/ /docs/current/motoko/main/motoko-grammar
  /docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/ /docs/current/motoko/main/motoko-introduction
  /docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/* /docs/current/motoko/main/:splat
  /docs/current/developer-docs/build/cdks/motoko-dfinity/overview /docs/current/motoko/intro
  /docs/current/developer-docs/build/cdks/motoko-dfinity/timers /docs/current/motoko/main/base/Timer
  /docs/current/developer-docs/build/cdks/motoko-dfinity/basic-concepts /docs/current/motoko/main/basic-concepts
  /docs/current/developer-docs/build/cdks/motoko-dfinity/actors-async /docs/current/motoko/main/actors-async
  /docs/current/developer-docs/build/cdks/motoko-dfinity/control-flow /docs/current/motoko/main/control-flow
  /docs/current/developer-docs/build/cdks/motoko-dfinity/upgrades/ /docs/current/motoko/main/upgrades
  /docs/current/developer-docs/build/cdks/motoko-dfinity/caller-id /docs/current/motoko/main/caller-id
  /docs/current/developer-docs/build/cdks/motoko-dfinity/cycles /docs/current/motoko/main/cycles
  /docs/current/developer-docs/build/cdks/motoko-dfinity/modules-and-imports /docs/current/motoko/main/modules-and-imports
  /docs/current/developer-docs/build/cdks/motoko-dfinity/style /docs/current/motoko/main/style
  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/rust-quickstart /docs/current/developer-docs/backend/rust/rust-quickstart
  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/  /docs/current/developer-docs/backend/rust
  /docs/current/developer-docs/build/frontend/custom-frontend /docs/current/developer-docs/frontend/custom-frontend
  /docs/current/developer-docs/build/install-upgrade-remove /docs/current/developer-docs/setup/install/
  /docs/current/developer-docs/build/languages/candid/* /docs/current/developer-docs/backend/candid/:splat
  /docs/current/developer-docs/build/languages/motoko/ /docs/current/motoko/main/motoko-introduction
  /docs/current/developer-docs/build/languages/motoko/* /docs/current/motoko/main/:splat
  /docs/current/developer-docs/build/languages/other-languages/* /docs/current/developer-docs/backend/choosing-language
  /docs/current/developer-docs/build/languages/other-languages/* /docs/current/developer-docs/backend/choosing-language
  /docs/current/developer-docs/build/languages/rust/* /docs/current/developer-docs/backend/rust/
  /docs/current/developer-docs/build/languages/work-with-languages /docs/current/developer-docs/backend/choosing-language
  /docs/current/developer-docs/build/project-setup/cycles-wallet /docs/current/developer-docs/setup/cycles/cycles-wallet
  /docs/current/developer-docs/build/project-setup/manage-canisters /docs/current/developer-docs/setup/manage-canisters
  /docs/current/developer-docs/build/troubleshooting /docs/current/developer-docs/backend/troubleshooting
  /docs/current/developer-docs/build/using-an-agent /docs/current/developer-docs/backend/choosing-language
  /docs/current/developer-docs/deploy/deploying-and-upgrading /docs/current/developer-docs/production/deploying-and-upgrading
  /docs/current/developer-docs/deploy/deploying-and-upgrading/ /docs/current/developer-docs/production/deploying-and-upgrading
  /docs/current/developer-docs/deploy/computation-and-storage-costs /docs/current/developer-docs/production/computation-and-storage-costs
  /docs/current/developer-docs/deploy/custom-domain /docs/current/developer-docs/production/custom-domain
  /docs/current/developer-docs/deploy/larger-wasm /docs/current/developer-docs/production/larger-wasm
  /docs/current/developer-docs/deploy/computation-and-storage-costs/ /docs/current/developer-docs/production/computation-and-storage-costs
  /docs/current/developer-docs/functionality/ledger/ledger-local-setup /docs/current/developer-docs/integrations/ledger/ledger-local-setup
  /docs/current/developer-docs/functionality/ledger/ /docs/current/developer-docs/integrations/ledger/ledger-local-setup
  /docs/current/developer-docs/ic-overview /docs/current/developer-docs
  /docs/current/developer-docs/quickstart/cycles-faucet /docs/current/developer-docs/setup/cycles/cycles-faucet
  /docs/current/developer-docs/quickstart/hello10mins /docs/current/tutorials/deploy_sample_app
  /docs/current/developer-docs/quickstart/hello10mins/ /docs/current/tutorials/deploy_sample_app
  /docs/current/developer-docs/quickstart/local-quickstart /docs/current/tutorials/deploy_sample_app
  /docs/current/developer-docs/quickstart/network-quickstart /docs/current/tutorials/deploy_sample_app
  /docs/current/developer-docs/quickstart/windows-wsl /docs/current/developer-docs/setup/install/windows-wsl
  /docs/current/developer-docs/setup/default-wallet /docs/current/developer-docs/setup/cycles/
  /docs/current/developer-docs/updates/computation-and-storage-costs /docs/current/developer-docs/production/computation-and-storage-costs
  /docs/current/developer-docs/updates/release-notes/ /docs/current/other/updates/release-notes/
  /docs/current/developer-docs/build/agents/ /docs/current/developer-docs/agents
  /docs/current/developer-docs/build/agents/javascript/javascript-intro  /docs/current/developer-docs/agents/javascript-intro
  /docs/current/developer-docs/build/backend/ /docs/current/developer-docs/backend/
  /docs/current/ic-overview  /docs/current/home
  /docs/current/references/security/general-security-best-practices /docs/current/developer-docs/security/general-security-best-practices
  /docs/current/references/security/rust-canister-development-security-best-practices /docs/current/developer-docs/security/rust-canister-development-security-best-practices
  /docs/current/references/security/ /docs/current/developer-docs/security
  /docs/current/samples/host-unity-webgl /docs/current/samples/host-a-webgame
  /docs/current/tokenomics/sns/rewards /docs/current/developer-docs/integrations/sns/tokenomics/rewards
  /docs/current/tokenomics/sns/sns-intro-tokens /docs/current/developer-docs/integrations/sns/tokenomics/sns-intro-tokens
  /docs/current/tokenomics/sns/tokenomics /docs/current/developer-docs/integrations/sns/tokenomics/sns-intro-tokens
  /docs/developers-guide/about-this-guide /docs/current/motoko/main/about-this-guide
  /docs/developers-guide/basic-syntax-rules /docs/current/motoko/main/language-manual
  /docs/developers-guide/cli-reference.html /docs/current/references/cli-reference/
  /docs/developers-guide/cli-reference/* /docs/current/references/cli-reference/:splat
  /docs/developers-guide/computation-and-storage-costs /docs/current/developer-docs/production/computation-and-storage-costs
  /docs/developers-guide/computation-and-storage-costs.html /docs/current/developer-docs/production/computation-and-storage-costs
  /docs/developers-guide/concepts/bitcoin-integration /bitcoin-integration
  /docs/developers-guide/concepts/canisters-code /docs/current/concepts/canisters-code
  /docs/developers-guide/concepts/canisters-code.html /docs/current/developer-docs
  /docs/developers-guide/concepts/concepts-intro /docs/current/concepts
  /docs/developers-guide/concepts/data-centers /docs/current/concepts/data-centers
  /docs/developers-guide/concepts/governance /docs/current/concepts/governance
  /docs/developers-guide/concepts/nodes-subnets /docs/current/concepts/nodes-subnets
  /docs/developers-guide/concepts/tokens-cycles /docs/current/concepts/tokens-cycles
  /docs/developers-guide/concepts/trust-in-canisters /docs/current/concepts/trust-in-canisters
  /docs/developers-guide/concepts/what-is-ic /docs/current/concepts/what-is-IC
  /docs/developers-guide/customize-projects /docs/current/developer-docs/setup/manage-projects
  /docs/developers-guide/default-wallet /docs/current/developer-docs/setup/cycles/
  /docs/developers-guide/design-apps /docs/current/developer-docs/backend/design-dapps
  /docs/developers-guide/glossary /docs/current/references/glossary
  /docs/developers-guide/install-upgrade-remove /docs/current/developer-docs/setup/install/
  /docs/developers-guide/lang-service-ide /docs/current/developer-docs/setup/vs-code
  /docs/developers-guide/reinstalling-dfx /docs/current/developer-docs/setup/install/
  /docs/developers-guide/sample-apps /samples/
  /docs/developers-guide/sdk-guide /docs/current/developer-docs/setup/install/
  /docs/developers-guide/troubleshooting /docs/current/developer-docs/backend/troubleshooting
  /docs/developers-guide/tutorials-intro /docs/current/developer-docs/backend/backend-tutorials/
  /docs/developers-guide/tutorials/access-control /docs/current/developer-docs/backend/backend-tutorials/access-control
  /docs/developers-guide/tutorials/at-a-glance /docs/current/developer-docs/backend/backend-tutorials/at-a-glance
  /docs/developers-guide/tutorials/calculator /docs/current/developer-docs/backend/backend-tutorials/calculator
  /docs/developers-guide/tutorials/counter-tutorial /docs/current/developer-docs/backend/backend-tutorials/counter-tutorial
  /docs/developers-guide/tutorials/custom-frontend /docs/current/developer-docs/frontend/custom-frontend
  /docs/developers-guide/tutorials/define-an-actor /docs/current/developer-docs/backend/backend-tutorials/define-an-actor
  /docs/developers-guide/tutorials/explore-templates /docs/current/developer-docs/backend/backend-tutorials/explore-templates
  /docs/developers-guide/tutorials/hello-location /docs/current/developer-docs/backend/backend-tutorials/hello-location
  /docs/developers-guide/tutorials/intercanister-calls /docs/current/developer-docs/backend/backend-tutorials/intercanister-calls
  /docs/developers-guide/tutorials/intercanister-calls.html /docs/current/developer-docs/backend/backend-tutorials/intercanister-calls
  /docs/developers-guide/tutorials/multiple-actors /docs/current/developer-docs/backend/backend-tutorials/multiple-actors
  /docs/developers-guide/tutorials/multiple-factorial-actors /docs/current/developer-docs/backend/backend-tutorials/multiple-factorial-actors
  /docs/developers-guide/tutorials/my-contacts /docs/current/developer-docs/frontend/my-contacts
  /docs/developers-guide/tutorials/phonebook /docs/current/developer-docs/backend/backend-tutorials/phonebook
  /docs/developers-guide/tutorials/reproducible-builds /docs/current/developer-docs/backend/reproducible-builds
  /docs/developers-guide/tutorials/scalability-cancan /docs/current/developer-docs/backend/backend-tutorials/scalability-cancan
  /docs/developers-guide/tutorials/simple-cycles /docs/current/developer-docs/backend/backend-tutorials/simple-cycles
  /docs/developers-guide/webpack-config /docs/current/developer-docs/frontend/
  /docs/current/developer-docs/build/frontend/webpack-config /docs/current/developer-docs/frontend/#modifying-the-webpack-configuration
  /docs/developers-guide/webpack-config.html /docs/current/developer-docs/frontend/#modifying-the-webpack-configuration
  /docs/developers-guide/work-with-languages /docs/current/developer-docs/backend/choosing-language
  /docs/developers-guide/working-with-canisters /docs/current/developer-docs/setup/manage-canisters
  /docs/download /docs/current/developer-docs/setup/install/
  /docs/download.html /docs/current/developer-docs/setup/install/
  /docs/http-middleware /docs/current/home
  /docs/ic-identity-guide/auth-how-to /docs/current/tokenomics/identity-auth/auth-how-to
  /docs/ic-identity-guide/auth-how-to.html /docs/current/developer-docs/integrations/internet-identity/integrate-identity
  /docs/ic-identity-guide/hello-guide /docs/current/tokenomics/identity-auth/hello-guide
  /docs/ic-identity-guide/what-is-ic-identity /docs/current/tokenomics/identity-auth/what-is-ic-identity
  /docs/ic-interface-spec /docs/current/references/ic-interface-spec
  /docs/ic-interface-spec.md /docs/current/references/ic-interface-spec
  /docs/integration/ledger-quick-start /docs/current/developer-docs/integrations/ledger/
  /docs/interface-spec /docs/current/references/ic-interface-spec
  /docs/introduction/welcome /docs/current/home
  /docs/introduction/welcome.html /docs/current/home
  /docs/language-guide/about-this-guide /docs/current/motoko/main/about-this-guide
  /docs/language-guide/actor-classes /docs/current/motoko/main/actor-classes
  /docs/language-guide/actor-classes.html /docs/current/motoko/main/actor-classes
  /docs/language-guide/actors-async /docs/current/motoko/main/actors-async
  /docs/language-guide/advanced-discussion /docs/current/motoko/main/advanced-discussion
  /docs/language-guide/basic-concepts /docs/current/motoko/main/basic-concepts
  /docs/language-guide/caller-id /docs/current/motoko/main/caller-id
  /docs/language-guide/compatibility /docs/current/motoko/main/compatibility
  /docs/language-guide/compiler-ref /docs/current/motoko/main/compiler-ref
  /docs/language-guide/control-flow /docs/current/motoko/main/control-flow
  /docs/language-guide/cycles /docs/current/motoko/main/cycles
  /docs/language-guide/errors /docs/current/motoko/main/errors
  /docs/language-guide/extrastuff /docs/current/motoko/main/extrastuff
  /docs/language-guide/heartbeats /docs/current/motoko/main/heartbeats
  /docs/language-guide/language-manual /docs/current/motoko/main/language-manual
  /docs/language-guide/language-manual.html /docs/current/motoko/main/language-manual
  /docs/language-guide/local-objects-classes /docs/current/motoko/main/local-objects-classes
  /docs/language-guide/modules-and-imports /docs/current/motoko/main/modules-and-imports
  /docs/language-guide/motoko /docs/current/motoko/main/motoko
  /docs/language-guide/motoko-grammar /docs/current/motoko/main/motoko-grammar
  /docs/language-guide/motoko-introduction /docs/current/motoko/main/motoko-introduction
  /docs/language-guide/motoko.html /docs/current/motoko/main/about-this-guide
  /docs/language-guide/mutable-state /docs/current/motoko/main/mutable-state
  /docs/language-guide/overview /docs/current/motoko/main/overview
  /docs/language-guide/pattern-matching /docs/current/motoko/main/pattern-matching
  /docs/language-guide/sharing /docs/current/motoko/main/sharing
  /docs/language-guide/stablememory /docs/current/motoko/main/stablememory
  /docs/language-guide/structural-equality /docs/current/motoko/main/structural-equality
  /docs/language-guide/style /docs/current/motoko/main/style
  /docs/language-guide/style.html /docs/current/motoko/main/style
  /docs/language-guide/upgrades /docs/current/motoko/main/upgrades
  /docs/language-guide/upgrades.html /docs/current/motoko/main/upgrades
  /docs/languages/languages-overview /docs/current/developer-docs/backend/choosing-language
  /docs/operators-guide/ops-guide /docs/current/home
  /docs/quickstart/1-quickstart /docs/current/tutorials/deploy_sample_app
  /docs/quickstart/2-quickstart /docs/current/tutorials/deploy_sample_app
  /docs/quickstart/3-quickstart /docs/current/tutorials/deploy_sample_app
  /docs/quickstart/4-2-convert-icp-to-cycles /docs/current/tutorials/deploy_sample_app
  /docs/quickstart/4-quickstart /docs/current/tutorials/deploy_sample_app
  /docs/quickstart/5-quickstart /docs/current/tutorials/deploy_sample_app
  /docs/quickstart/cycles-faucet /docs/current/developer-docs/setup/cycles/cycles-faucet
  /docs/quickstart/local-quickstart /docs/current/developer-docs/setup/deploy-locally
  /docs/quickstart/local-quickstart.html /docs/current/developer-docs/setup/deploy-locally
  /docs/quickstart/network-quickstart /docs/current/developer-docs/setup/deploy-mainnet
  /docs/quickstart/newcomers /docs/current/home
  /docs/quickstart/quickstart-intro /docs/current/tutorials/deploy_sample_app
  /docs/quickstart/quickstart-intro.html /docs/current/tutorials/deploy_sample_app
  /docs/quickstart/quickstart.html /docs/current/tutorials/deploy_sample_app
  /docs/release-notes/* /docs/current/other/updates/release-notes/:splat
  /docs/rosetta-api/deploy-new-token /docs/current/developer-docs/integrations/ledger/deploy-new-token
  /docs/rosetta-api/ledger /docs/current/developer-docs/integrations/ledger/
  /docs/rosetta-api/ledger-local-setup /docs/current/developer-docs/integrations/ledger/ledger-local-setup
  /docs/rosetta-api/neuron-lifecycle /docs/current/developer-docs/integrations/rosetta/neuron-lifecycle
  /docs/rosetta-api/staking-support /docs/current/developer-docs/integrations/rosetta/staking-support
  /docs/rosetta-api/staking-tutorial /docs/current/developer-docs/integrations/rosetta/staking-tutorial
  /docs/rosetta-api/transfers /docs/current/developer-docs/integrations/rosetta/transfers
  /docs/rust-guide/multiply-dependency /docs/current/developer-docs/backend/rust/multiply-dependency
  /docs/rust-guide/rust-counter /docs/current/developer-docs/backend/rust/rust-counter
  /docs/rust-guide/rust-intro /docs/current/developer-docs/backend/rust/
  /docs/rust-guide/rust-optimize /docs/current/developer-docs/backend/rust/rust-optimize
  /docs/rust-guide/rust-profile /docs/current/developer-docs/backend/rust/rust-profile
  /docs/rust-guide/rust-quickstart /docs/current/developer-docs/backend/rust/rust-quickstart
  /docs/samples /samples/
  /docs/samples/codelabs /samples/
  /docs/samples/codelabs/data-persistence /samples/
  /docs/samples/codelabs/minimalistic-motoko-dapp /samples/
  /docs/samples/codelabs/minimalistic-rust-dapp /samples/
  /docs/samples/codelabs/simple-nft /samples/
  /docs/samples/codelabs/static-website /samples/
  /docs/samples/dao /docs/current/samples/dao
  /docs/samples/dex /docs/current/samples/dex
  /docs/samples/encrypted-notes /docs/current/samples/encrypted-notes
  /docs/samples/hackathon-projects /docs/current/samples/hackathon-projects
  /docs/samples/hello /docs/current/samples/hello
  /docs/samples/host-a-website /docs/current/samples/host-a-website
  /docs/samples/ios-integration /docs/current/samples/ios-integration
  /docs/samples/nft /docs/current/samples/nft
  /docs/samples/token-transfer /docs/current/samples/token-transfer
  /docs/samples/tokentransfer /docs/current/samples/token-transfer
  /docs/search /developers
  /docs/security-best-practices/general-security-best-practices /docs/current/developer-docs/security/general-security-best-practices
  /docs/security-best-practices/introduction /docs/current/developer-docs/security/
  /docs/security-best-practices/rust-canister-development-security-best-practices /docs/current/developer-docs/security/rust-canister-development-security-best-practices
  /docs/security-best-practices/web-app-development-security-best-practices /docs/current/developer-docs/security/web-app-development-security-best-practices
  /docs/support /docs/current/home
  /docs/token-holders/custody-options-intro /docs/current/tokenomics/token-holders/custody-options-intro
  /docs/token-holders/nns-app-quickstart /docs/current/tokenomics/token-holders/nns-app-quickstart
  /docs/token-holders/self-custody-quickstart /docs/current/tokenomics/token-holders/self-custody-quickstart
  /docs/token-holders/nns-app-quickstart.html /docs/current/tokenomics/token-holders/nns-app-quickstart
  /docs/token-holders/seed-donations.html /docs/current/tokenomics
  /docs/videos-tutorials /developers
  /features/green /features/sustainability
  /howitworks /how-it-works
  /howitworks/* /how-it-works/:splat
  /showcase /ecosystem


  `
  .split(/[\r\n]+/)
  .map((line) => line.replace(/#.*$/, "").trim())
  .filter((l) => l.length > 0)
  .map((l) => l.split(/\s+/));

function isSplat(redirect) {
  return redirect[0].includes("/*");
}

exports.getRedirects = function () {
  return redirects
    .filter((r) => !isSplat(r))
    .map((r) => {
      const from = r[0].replace(/(.+)\/$/, "$1");
      const to = r[1];
      return {
        from,
        to,
      };
    });
};

exports.getSplatRedirects = function (existingUrl) {
  for (const redirect of redirects.filter(isSplat)) {
    const trimmedSource = redirect[0].replace("/*", "/");

    if (redirect[1].includes(":splat")) {
      const trimmedDestination = redirect[1].replace(":splat", "");
      if (existingUrl.startsWith(trimmedDestination)) {
        const completeSourceUrl = existingUrl.replace(
          trimmedDestination,
          trimmedSource
        );
        return completeSourceUrl;
      }
    } else {
    }
  }
};
