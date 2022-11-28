import isbot from "https://esm.sh/isbot@3.6.5";
import { Context } from "https://edge.netlify.com/";

export type RedirectRule = [from: string, to: string, status: number];

// prettier-ignore
export const redirects: RedirectRule[] = [
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

export function matchRedirect(
  redirect: RedirectRule,
  pathName: string
): string | false {
  if (redirect[0].endsWith("/*")) {
    // mass redirect
    if (pathName.startsWith(redirect[0].slice(0, -1))) {
      if (redirect[1].endsWith(":splat")) {
        // splat
        const destRoot = redirect[1].slice(0, -6);
        const dest = destRoot + pathName.replace(redirect[0].slice(0, -1), "");
        console.log(`Splat redirect '${pathName}'=>'${dest}'`);
        return dest;
      } else {
        // redirect to single URL
        console.log(`Mass redirect '${pathName}'=>'${redirect[1]}'`);
        return redirect[1];
      }
    }
  } else {
    // single redirect
    if (redirect[0] === pathName) {
      console.log(`Single redirect '${pathName}'=>'${redirect[1]}'`);
      return redirect[1];
    }
  }
  return false;
}

export async function checkRequest(
  request: Request,
  redirects: RedirectRule[],
  rawHostName: string
): Promise<Response | null> {
  const url = new URL(request.url);

  if (
    url.hostname === "internetcomputer.org" ||
    url.hostname === "deploy-preview-856--icportal.netlify.app" // add this for testing, TODO: remove
  ) {
    // production hostname, this has service worker deployed

    // check if request needs to be redirected
    for (const redirect of redirects) {
      const maybeDesitinationUrl = matchRedirect(redirect, url.pathname);
      if (maybeDesitinationUrl !== false) {
        return Response.redirect(maybeDesitinationUrl, redirect[2]);
      }
    }

    // check if it's bot user => proxy content from .raw as response
    const userAgent = request.headers.get("user-agent");

    if (userAgent !== null && isbot(userAgent)) {
      url.hostname = rawHostName;
      const newRequest = new Request(url, request);

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

  return null;
}

export default async (request: Request, context: Context) => {
  const maybeResponse = await checkRequest(
    request,
    redirects,
    "hwvjt-wqaaa-aaaam-qadra-cai.raw.ic0.app"
  );

  if (maybeResponse) {
    return maybeResponse;
  }

  console.log("No redirect", request.url);
  return await context.next();
};
