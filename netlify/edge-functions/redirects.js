import isbot from "https://esm.sh/isbot";

// prettier-ignore
const redirects = [
  [`/install.sh`, `https://download.dfinity.systems/sdk/install.sh`, 302],
  [`/manifest.json`, `https://download.dfinity.systems/sdk/manifest.json`, 302],
  [`/sdk-license-agreement.txt`, `https://download.dfinity.systems/sdk/sdk-license-agreement.txt`, 302],
  [`/tungsten-license-agreement.txt`, `https://download.dfinity.systems/sdk/tungsten-license-agreement.txt`, 302],
  [`/sodium-license-agreement.txt`, `https://download.dfinity.systems/sdk/sodium-license-agreement.txt`, 302],
  [`/downloads/*`, `https://download.dfinity.systems/sdk/:splat`, 302],
  [`/docs/current/concepts/data-centers`,`https://wiki.internetcomputer.org/wiki/Node_Provider_Onboarding`, 301],
  [`/docs/current/tokenomics/token-holders/seed-donations`,`https://wiki.internetcomputer.org/wiki/How-To:_Claim_neurons_for_seed_participants`, 301],
  [`/eula`,`https://association.internetcomputer.org/eula`, 301],
  [`/eula-storage`,`https://association.internetcomputer.org/eula-storage`, 301],
];

export default async (request, context) => {
  const url = new URL(request.url);

  // check if request needs to be redirected
  for (const redirect of redirects) {
    if (redirect[0].endsWith("/*")) {
      // mass redirect
      if (url.pathname.startsWith(redirect[0].slice(0, -1))) {
        if (redirect[1].endsWith(":splat")) {
          // splat
          const destRoot = redirect[1].slice(0, -6);
          const dest =
            destRoot + url.pathname.replace(redirect[0].slice(0, -1), "");
          console.log(`Splat redirect '${url.pathname}'=>'${dest}'`);
          return Response.redirect(dest, redirect[2]);
        } else {
          // redirect to single URL
          console.log(`Mass redirect '${url.pathname}'=>'${redirect[1]}'`);
          return Response.redirect(redirect[1], redirect[2]);
        }
      }
    } else {
      // single redirect
      if (redirect[0] === url.pathname) {
        console.log(`Single redirect '${url.pathname}'=>'${redirect[1]}'`);
        return Response.redirect(redirect[1], redirect[2]);
      }
    }
  }

  if (url.hostname === "internetcomputer.org") {
    // production hostname, this has service worker deployed

    // check if it's bot user => proxy content from .raw as response
    const requestHeaders = Object.fromEntries(request.headers);
    const isBotRequest = isbot(requestHeaders["user-agent"]);

    if (isBotRequest) {
      const newRequest = new Request(
        request.url.replace(
          url.hostname,
          "hwvjt-wqaaa-aaaam-qadra-cai.raw.ic0.app"
        ),
        request
      );

      console.log("Redirect bot to", newRequest.url);
      return await fetch(newRequest);
    }

    //
    // it's a browser request where the SW is not installed yet
    // let this request be handled by the _redirects file of the service worker
    //
  } else {
    //
    // preview deployment, no service worker here, do nothing
    //
  }

  console.log("No redirect", request.url);

  const response = await context.next();

  return response;
};
