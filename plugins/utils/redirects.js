const redirects = `

  # external redirects (/from -> https://.../to/)
  /docs/token-holders/seed-donations.html https://wiki.internetcomputer.org/wiki/How-To:_Claim_neurons_for_seed_participants
  /live-sessions https://dfinity.org/events-and-news

  # .html file internal redirects (/../from.html -> to)
  /docs/developers-guide/working-with-canisters.html /docs/current/developer-docs/setup/manage-canisters

  # regular internal redirects (from -> to)
  /docs/current/references/motoko-ref/* /docs/current/motoko/main/base/:splat
  /features/green /capabilities/sustainability
  /features /capabilities
  /howitworks /how-it-works
  /showcase /ecosystem
  /docs/videos-tutorials /developers
  /docs /docs/current/home
  /docs/current/ /docs/current/home
  /docs/current/concepts/bitcoin-integration /bitcoin-integration
  /docs/current/developer-docs/ic-overview /docs/current/developer-docs/
  /docs/current/developer-docs/production/computation-and-storage-costs /docs/current/developer-docs/gas-cost
  /docs/current/developer-docs/deploy/computation-and-storage-costs /docs/current/developer-docs/gas-cost
  /docs/current/ic-overview  /docs/current/home
  /docs/download /docs/current/developer-docs/setup/install/
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
  /docs/security-best-practices/introduction /docs/current/developer-docs/security/
  /docs/current/developer-docs/setup/default-wallet /docs/current/developer-docs/setup/cycles/
  /docs/current/tokenomics/sns/tokenomics /docs/current/developer-docs/integrations/sns/tokenomics/
  /docs/current/developer-docs/integrations/http_requests/http_requests-how-it-works /docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-it-works
  /docs/current/developer-docs/integrations/sns/tokenomics/sns-intro-tokens /docs/current/developer-docs/integrations/sns/tokenomics/
  /docs/current/developer-docs/integrations/sns/tokenomics/tokenomics /docs/current/developer-docs/integrations/sns/tokenomics/tokenomics-intro
  /docs/rust-guide/rust-intro /docs/current/developer-docs/backend/rust/
  /docs/languages/languages-overview /docs/current/developer-docs/backend/choosing-language
  /docs/current/developer-docs/frontend/my-contacts /docs/current/developer-docs/frontend/add-stylesheet
  /docs/ic-interface-spec /docs/current/references/ic-interface-spec
  /docs/interface-spec /docs/current/references/ic-interface-spec
  /docs/current/developer-docs/updates/computation-and-storage-costs /docs/current/developer-docs/gas-cost
  /docs/current/developer-docs/updates/release-notes/ /docs/current/other/updates/release-notes/
  #/docs/developers-guide/concepts/what-is-ic /what-is-the-ic
  /docs/current/developer-docs/quickstart/local-quickstart /docs/current/developer-docs/setup/install/
  /docs/current/developer-docs/setup/install/index.mdx /docs/current/developer-docs/setup/install/
  
  /docs/candid-guide /docs/current/developer-docs/backend/candid/
  /docs/candid-guide/candid /docs/current/developer-docs/backend/candid/candid-concepts
  /docs/candid-guide/candid-intro /docs/current/developer-docs/backend/candid/
  /docs/candid-guide/candid-ref /docs/current/references/candid-ref
  /docs/candid-guide/candid-types /docs/current/references/candid-ref
  /docs/current/developer-docs/build/candid/candid-intro /docs/current/developer-docs/backend/candid/
  /docs/current/developer-docs/build/candid/candid-howto /docs/current/developer-docs/backend/candid/candid-howto
  
  /docs/current/developer-docs/build/ /docs/current/developer-docs/backend/choosing-language
  /docs/current/developer-docs/build/candid/candid-concepts /docs/current/developer-docs/backend/candid/candid-concepts
  /docs/current/developer-docs/build/languages/other-languages/* /docs/current/developer-docs/backend/choosing-language
  /docs/current/developer-docs/build/languages/work-with-languages /docs/current/developer-docs/backend/choosing-language
  /docs/current/developer-docs/build/using-an-agent /docs/current/developer-docs/backend/choosing-language
  /docs/current/developer-docs/build/backend/reproducible-builds /docs/current/developer-docs/backend/reproducible-builds
  /docs/current/developer-docs/build/cdks/ /docs/current/motoko/main/about-this-guide
  /docs/current/developer-docs/build/frontend/custom-frontend /docs/current/developer-docs/frontend/custom-frontend
  /docs/current/developer-docs/build/frontend/webpack-config /docs/current/developer-docs/frontend/#modifying-the-webpack-configuration
  /docs/current/developer-docs/build/install-upgrade-remove /docs/current/developer-docs/setup/install/
  /docs/current/developer-docs/build/languages/motoko/ /docs/current/motoko/main/motoko-introduction
  /docs/current/developer-docs/build/languages/rust/* /docs/current/developer-docs/backend/rust/
  /docs/current/developer-docs/build/project-setup/cycles-wallet /docs/current/developer-docs/setup/cycles/cycles-wallet
  /docs/current/developer-docs/build/project-setup/manage-canisters /docs/current/developer-docs/setup/manage-canisters
  /docs/current/developer-docs/build/project-setup/design-dapps /docs/current/developer-docs/backend/design-dapps
  /docs/current/developer-docs/build/troubleshooting /docs/current/developer-docs/backend/troubleshooting
  /docs/current/developer-docs/build/agents/ /docs/current/developer-docs/agents/
  /docs/current/developer-docs/build/agents/javascript/javascript-intro /docs/current/developer-docs/agents/javascript-intro
  /docs/current/developer-docs/build/agents/javascript/*  /docs/current/developer-docs/agents/javascript-intro
  /docs/current/developer-docs/build/languages/candid/* /docs/current/developer-docs/backend/candid/:splat
  /docs/current/developer-docs/build/cdks/motoko-dfinity/* /docs/current/motoko/main/:splat
  /docs/current/developer-docs/build/cdks/cdk-rs-dfinity/*  /docs/current/developer-docs/backend/rust/:splat
  /docs/current/developer-docs/build/languages/motoko/* /docs/current/motoko/main/:splat
  
  /docs/developers-guide/ /docs/current/motoko/main/about-this-guide
  /docs/developers-guide/about-this-guide /docs/current/motoko/main/about-this-guide
  /docs/developers-guide/basic-syntax-rules /docs/current/motoko/main/language-manual
  /docs/developers-guide/concepts/bitcoin-integration /bitcoin-integration
  /docs/developers-guide/concepts/concepts-intro /docs/current/concepts/
  /docs/developers-guide/customize-projects /docs/current/developer-docs/setup/manage-projects
  /docs/developers-guide/default-wallet /docs/current/developer-docs/setup/cycles/
  /docs/developers-guide/design-apps /docs/current/developer-docs/backend/design-dapps
  /docs/developers-guide/glossary /docs/current/references/glossary
  /docs/developers-guide/install-upgrade-remove /docs/current/developer-docs/setup/install/
  /docs/developers-guide/lang-service-ide /docs/current/developer-docs/setup/vs-code
  /docs/developers-guide/reinstalling-dfx /docs/current/developer-docs/setup/install/
  /docs/developers-guide/sample-apps /samples
  /docs/developers-guide/sdk-guide /docs/current/developer-docs/setup/install/
  /docs/developers-guide/troubleshooting /docs/current/developer-docs/backend/troubleshooting
  /docs/developers-guide/tutorials-intro /docs/current/developer-docs/backend/motoko/
  /docs/developers-guide/tutorials/custom-frontend /docs/current/developer-docs/frontend/custom-frontend
  /docs/developers-guide/tutorials/my-contacts /docs/current/developer-docs/frontend/add-stylesheet
  /docs/developers-guide/webpack-config /docs/current/developer-docs/frontend/
  /docs/developers-guide/work-with-languages /docs/current/developer-docs/backend/choosing-language
  /docs/developers-guide/working-with-canisters /docs/current/developer-docs/setup/manage-canisters
  
  /docs/quickstart/1-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/2-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/3-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/4-2-convert-icp-to-cycles /docs/current/tutorials/developer-journey/
  /docs/quickstart/4-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/5-quickstart /docs/current/tutorials/developer-journey/
  /docs/quickstart/cycles-faucet /docs/current/developer-docs/setup/cycles/cycles-faucet
  /docs/quickstart/local-quickstart /docs/current/developer-docs/setup/deploy-locally
  /docs/quickstart/network-quickstart /docs/current/developer-docs/setup/deploy-mainnet
  /docs/quickstart/quickstart-intro /docs/current/tutorials/developer-journey/
  /docs/quickstart/newcomers /docs/current/home
  /docs/current/developer-docs/quickstart/* /docs/current/tutorials/developer-journey/
  /developers-guide/quickstart /docs/current/tutorials/developer-journey/
  /docs/current/developer-docs/quickstart/cycles-faucet /docs/current/developer-docs/setup/cycles/cycles-faucet
  /docs/current/developer-docs/quickstart/windows-wsl /docs/current/developer-docs/setup/install/windows-wsl
  /docs/current/developer-docs/quickstart/hello10mins/ /docs/current/tutorials/developer-journey/
  
  /docs/rosetta-api/ledger /docs/current/developer-docs/integrations/ledger/
  /docs/rosetta-api/deploy-new-token /docs/current/developer-docs/integrations/ledger/deploy-new-token
  /docs/rosetta-api/ledger-local-setup /docs/current/developer-docs/integrations/ledger/ledger-local-setup
  /docs/integration/ledger-quick-start /docs/current/developer-docs/integrations/ledger/
  /docs/current/developer-docs/functionality/ledger/* /docs/current/developer-docs/integrations/ledger/ledger-local-setup
  
  /docs/base-libraries/* /docs/current/motoko/main/base/:splat
  /base-libraries/* /docs/current/motoko/main/base/:splat
  /docs/current/developer-docs/best-practices/* /docs/current/developer-docs/use-cases/:splat
  /docs/current/developer-docs/deploy/* /docs/current/developer-docs/production/:splat
  /docs/current/references/security/* /docs/current/developer-docs/security/:splat
  /docs/current/tokenomics/nns/community-fund /docs/current/tokenomics/nns/neurons-fund
  /docs/current/tokenomics/sns/* /docs/current/developer-docs/integrations/sns/tokenomics/:splat
  /docs/developers-guide/cli-reference/* /docs/current/references/cli-reference/:splat
  /docs/developers-guide/concepts/* /docs/current/concepts/:splat
  /docs/developers-guide/tutorials/* /docs/current/developer-docs/backend/motoko/:splat
  /docs/ic-identity-guide/* /docs/current/tokenomics/identity-auth/:splat
  /docs/language-guide/* /docs/current/motoko/main/:splat
  /docs/release-notes/* /docs/current/other/updates/release-notes/:splat
  /docs/rosetta-api/* /docs/current/developer-docs/integrations/rosetta/:splat
  /docs/rust-guide/* /docs/current/developer-docs/backend/rust/:splat
  /docs/security-best-practices/* /docs/current/developer-docs/security/:splat
  /docs/token-holders/* /docs/current/tokenomics/token-holders/:splat
  /features/* /capabilities/:splat
  /howitworks/* /how-it-works/:splat
  /docs/current/developer-docs/build/backend/* /docs/current/developer-docs/backend/motoko/:splat
  /sustainability /capabilities/sustainability
  `
  .split(/[\r\n]+/)
  .map((line) => line.replace(/#.*$/, "").trim())
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
    .map(ruleToRedirect);
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
