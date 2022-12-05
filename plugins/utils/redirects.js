const redirects = `
  /developers-guide/quickstart /docs/current/developer-docs/quickstart/hello10mins
  /docs/base-libraries/* /docs/current/motoko/motoko-ref/:splat
  /docs/release-notes/* /docs/current/developer-docs/updates/release-notes/:splat
  /docs/developers-guide/cli-reference/* /docs/current/references/cli-reference/:splat
  /docs/candid-guide/candid-concepts /docs/current/developer-docs/build/candid/candid-concepts
  /docs/candid-guide/candid-howto /docs/current/developer-docs/build/candid/candid-howto
  /docs/candid-guide/candid-intro /docs/current/developer-docs/build/candid/candid-intro
  /docs/candid-guide/candid-ref /docs/current/references/candid-ref
  /docs/candid-guide/candid-types /docs/current/references/candid-ref  
  /docs/current/developer-docs /docs/current/developer-docs/quickstart/hello10mins
  /docs/current/developer-docs/build/languages/candid/* /docs/current/developer-docs/build/candid/:splat
  /docs/current/developer-docs/build/languages/motoko/ /docs/current/motoko/motoko
  /docs/current/developer-docs/build/languages/motoko/* /docs/current/motoko/:splat
  /docs/current/developer-docs/build/languages/other-languages/* /docs/current/developer-docs/build/agents
  /docs/current/developer-docs/build/languages/rust/* /docs/current/developer-docs/build/cdks/cdk-rs-dfinity
  /docs/current/developer-docs/build/languages/work-with-languages /docs/current/developer-docs/build/agents
  /docs/current/developer-docs/build/languages/other-languages/* /docs/current/developer-docs/build/agents
  /docs/current/developer-docs/build/using-an-agent /docs/current/developer-docs/build/agents
  /docs/current/developer-docs/functionality/ledger/ledger-local-setup /docs/current/developer-docs/integrations/ledger/ledger-local-setup
  /docs/developers-guide/about-this-guide /docs/current/motoko/about-this-guide
  /docs/developers-guide/basic-syntax-rules /docs/current/motoko/language-manual
  /docs/developers-guide/computation-and-storage-costs /docs/current/developer-docs/deploy/computation-and-storage-costs
  /docs/developers-guide/concepts/bitcoin-integration /bitcoin-integration
  /docs/current/concepts/bitcoin-integration /bitcoin-integration
  /docs/developers-guide/concepts/canisters-code /docs/current/concepts/canisters-code
  /docs/developers-guide/concepts/concepts-intro /docs/current/concepts
  /docs/developers-guide/concepts/data-centers /docs/current/concepts/data-centers
  /docs/developers-guide/concepts/governance /docs/current/concepts/governance
  /docs/developers-guide/concepts/nodes-subnets /docs/current/concepts/nodes-subnets
  /docs/developers-guide/concepts/tokens-cycles /docs/current/concepts/tokens-cycles
  /docs/developers-guide/concepts/trust-in-canisters /docs/current/concepts/trust-in-canisters
  /docs/developers-guide/concepts/what-is-ic /docs/current/concepts/what-is-IC
  /docs/developers-guide/customize-projects /docs/current/developer-docs/build/project-setup/manage-projects
  /docs/developers-guide/default-wallet /docs/current/developer-docs/build/project-setup/cycles-wallet
  /docs/current/developer-docs/build/project-setup/default-wallet /docs/current/developer-docs/build/project-setup/cycles-wallet
  /docs/developers-guide/design-apps /docs/current/developer-docs/build/project-setup/design-dapps
  /docs/developers-guide/glossary /docs/current/developer-docs/glossary
  /docs/developers-guide/install-upgrade-remove /docs/current/developer-docs/build/install-upgrade-remove
  /docs/developers-guide/lang-service-ide /docs/current/developer-docs/build/lang-service-ide
  /docs/developers-guide/reinstalling-dfx /docs/current/developer-docs/build/install-upgrade-remove
  /docs/developers-guide/sample-apps /samples/
  /docs/developers-guide/sdk-guide /docs/current/developer-docs/build/install-upgrade-remove
  /docs/developers-guide/troubleshooting /docs/current/developer-docs/build/troubleshooting
  /docs/developers-guide/tutorials-intro /docs/current/developer-docs/build/backend/
  /docs/developers-guide/tutorials/access-control /docs/current/developer-docs/build/backend/access-control
  /docs/developers-guide/tutorials/at-a-glance /docs/current/developer-docs/build/backend/at-a-glance
  /docs/developers-guide/tutorials/calculator /docs/current/developer-docs/build/backend/calculator
  /docs/developers-guide/tutorials/counter-tutorial /docs/current/developer-docs/build/backend/counter-tutorial
  /docs/developers-guide/tutorials/custom-frontend /docs/current/developer-docs/build/frontend/custom-frontend
  /docs/developers-guide/tutorials/define-an-actor /docs/current/developer-docs/build/backend/define-an-actor
  /docs/developers-guide/tutorials/explore-templates /docs/current/developer-docs/build/backend/explore-templates
  /docs/developers-guide/tutorials/hello-location /docs/current/developer-docs/build/backend/hello-location
  /docs/developers-guide/tutorials/intercanister-calls /docs/current/developer-docs/build/backend/intercanister-calls
  /docs/developers-guide/tutorials/multiple-actors /docs/current/developer-docs/build/backend/multiple-actors
  /docs/developers-guide/tutorials/multiple-factorial-actors /docs/current/developer-docs/build/backend/multiple-factorial-actors
  /docs/developers-guide/tutorials/my-contacts /docs/current/developer-docs/build/frontend/my-contacts
  /docs/developers-guide/tutorials/phonebook /docs/current/developer-docs/build/backend/phonebook
  /docs/developers-guide/tutorials/reproducible-builds /docs/current/developer-docs/build/backend/reproducible-builds
  /docs/developers-guide/tutorials/scalability-cancan /docs/current/developer-docs/build/backend/scalability-cancan
  /docs/developers-guide/tutorials/simple-cycles /docs/current/developer-docs/build/backend/simple-cycles
  /docs/developers-guide/webpack-config /docs/current/developer-docs/build/frontend/webpack-config
  /docs/developers-guide/work-with-languages /docs/current/developer-docs/build/agents
  /docs/developers-guide/working-with-canisters /docs/current/developer-docs/build/project-setup/manage-canisters
  /docs/download /docs/current/developer-docs/build/install-upgrade-remove
  /docs/http-middleware /docs/current/developer-docs/ic-overview
  /docs/ic-identity-guide/auth-how-to /docs/current/tokenomics/identity-auth/auth-how-to
  /docs/ic-identity-guide/hello-guide /docs/current/tokenomics/identity-auth/hello-guide
  /docs/ic-identity-guide/what-is-ic-identity /docs/current/tokenomics/identity-auth/what-is-ic-identity
  /docs /docs/current/developer-docs/ic-overview
  /docs/integration/ledger-quick-start /docs/current/developer-docs/integrations/ledger/
  /docs/ic-interface-spec.md /docs/current/references/ic-interface-spec
  /docs/ic-interface-spec /docs/current/references/ic-interface-spec
  /docs/interface-spec /docs/current/references/ic-interface-spec
  /docs/introduction/welcome /docs/current/developer-docs/ic-overview
  /docs/language-guide/about-this-guide /docs/current/motoko/about-this-guide
  /docs/language-guide/actor-classes /docs/current/motoko/actor-classes
  /docs/language-guide/actors-async /docs/current/motoko/actors-async
  /docs/language-guide/advanced-discussion /docs/current/motoko/advanced-discussion
  /docs/language-guide/basic-concepts /docs/current/motoko/basic-concepts
  /docs/language-guide/caller-id /docs/current/motoko/caller-id
  /docs/language-guide/compatibility /docs/current/motoko/compatibility
  /docs/language-guide/compiler-ref /docs/current/motoko/compiler-ref
  /docs/language-guide/control-flow /docs/current/motoko/control-flow
  /docs/language-guide/cycles /docs/current/motoko/cycles
  /docs/language-guide/errors /docs/current/motoko/errors
  /docs/language-guide/extrastuff /docs/current/motoko/extrastuff
  /docs/language-guide/heartbeats /docs/current/motoko/heartbeats
  /docs/language-guide/language-manual /docs/current/motoko/language-manual
  /docs/language-guide/local-objects-classes /docs/current/motoko/local-objects-classes
  /docs/language-guide/modules-and-imports /docs/current/motoko/modules-and-imports
  /docs/language-guide/motoko-grammar /docs/current/motoko/motoko-grammar
  /docs/language-guide/motoko-introduction /docs/current/motoko/motoko-introduction
  /docs/language-guide/motoko /docs/current/motoko/motoko
  /docs/language-guide/mutable-state /docs/current/motoko/mutable-state
  /docs/language-guide/overview /docs/current/motoko/overview
  /docs/language-guide/pattern-matching /docs/current/motoko/pattern-matching
  /docs/language-guide/sharing /docs/current/motoko/sharing
  /docs/language-guide/stablememory /docs/current/motoko/stablememory
  /docs/language-guide/structural-equality /docs/current/motoko/structural-equality
  /docs/language-guide/style /docs/current/motoko/style
  /docs/language-guide/upgrades /docs/current/motoko/upgrades
  /docs/languages/languages-overview /docs/current/developer-docs/build/cdks/
  /docs/operators-guide/ops-guide /docs/current/developer-docs/ic-overview
  /docs/quickstart/1-quickstart /docs/current/developer-docs/quickstart/hello10mins
  /docs/quickstart/2-quickstart /docs/current/developer-docs/quickstart/hello10mins
  /docs/quickstart/3-quickstart /docs/current/developer-docs/quickstart/hello10mins
  /docs/quickstart/4-2-convert-icp-to-cycles /docs/current/developer-docs/quickstart/hello10mins
  /docs/quickstart/4-quickstart /docs/current/developer-docs/quickstart/hello10mins
  /docs/quickstart/5-quickstart /docs/current/developer-docs/quickstart/hello10mins
  /docs/quickstart/cycles-faucet /docs/current/developer-docs/quickstart/cycles-faucet
  /docs/quickstart/local-quickstart /docs/current/developer-docs/quickstart/local-quickstart
  /docs/quickstart/network-quickstart /docs/current/developer-docs/quickstart/network-quickstart
  /docs/quickstart/newcomers /docs/current/developer-docs/ic-overview
  /docs/quickstart/quickstart-intro /docs/current/developer-docs/quickstart/hello10mins
  /docs/rosetta-api/deploy-new-token /docs/current/developer-docs/integrations/ledger/deploy-new-token
  /docs/rosetta-api/ledger-local-setup /docs/current/developer-docs/integrations/ledger/ledger-local-setup
  /docs/rosetta-api/ledger /docs/current/developer-docs/integrations/ledger/
  /docs/rosetta-api/neuron-lifecycle /docs/current/developer-docs/integrations/rosetta/neuron-lifecycle
  /docs/rosetta-api/staking-support /docs/current/developer-docs/integrations/rosetta/staking-support
  /docs/rosetta-api/staking-tutorial /docs/current/developer-docs/integrations/rosetta/staking-tutorial
  /docs/rosetta-api/transfers /docs/current/developer-docs/integrations/rosetta/transfers
  /docs/rust-guide/multiply-dependency /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/multiply-dependency
  /docs/rust-guide/rust-counter /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/rust-counter
  /docs/rust-guide/rust-intro /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/
  /docs/rust-guide/rust-optimize /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/rust-optimize
  /docs/rust-guide/rust-profile /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/rust-profile
  /docs/rust-guide/rust-quickstart /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/rust-quickstart
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
  /docs/samples /samples/
  /docs/samples/nft /docs/current/samples/nft
  /docs/samples/tokentransfer /docs/current/samples/token-transfer
  /docs/samples/token-transfer /docs/current/samples/token-transfer
  /docs/search /developers
  /docs/security-best-practices/general-security-best-practices /docs/current/references/security/general-security-best-practices
  /docs/security-best-practices/introduction /docs/current/references/security/
  /docs/security-best-practices/rust-canister-development-security-best-practices /docs/current/references/security/rust-canister-development-security-best-practices
  /docs/security-best-practices/web-app-development-security-best-practices /docs/current/references/security/web-app-development-security-best-practices
  /docs/support /docs/current/developer-docs/ic-overview
  /docs/token-holders/custody-options-intro /docs/current/tokenomics/token-holders/custody-options-intro
  /docs/token-holders/nns-app-quickstart /docs/current/tokenomics/token-holders/nns-app-quickstart
  /docs/token-holders/self-custody-quickstart /docs/current/tokenomics/token-holders/self-custody-quickstart
  /docs/videos-tutorials /developers
  /docs/current/samples/host-unity-webgl /docs/current/samples/host-a-webgame
  /howitworks /how-it-works
  /howitworks/* /how-it-works/:splat
  /features/green /features/sustainability
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
