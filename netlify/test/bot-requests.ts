import {
  assertEquals,
  assert,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {
  matchRedirect,
  checkRequest,
  RedirectRule,
} from "../edge-functions/redirects.ts";

Deno.test("matchRedirect tests", () => {
  // bulk to single URL
  assertEquals(matchRedirect(["/*", "/hello", 301], "/test-url"), "/hello");
  assertEquals(matchRedirect(["/*", "/", 301], "/test-url"), "/");

  // bulk splat
  assertEquals(
    matchRedirect(
      ["/downloads/*", "https://download.dfinity.systems/sdk/:splat", 302],
      "/downloads/test-file.txt"
    ),
    "https://download.dfinity.systems/sdk/test-file.txt"
  );

  assertEquals(
    matchRedirect(
      ["/downloads/*", "https://download.dfinity.systems/sdk/:splat", 302],
      "/downloads/subdir/test-file.txt"
    ),
    "https://download.dfinity.systems/sdk/subdir/test-file.txt"
  );

  assertEquals(
    matchRedirect(["/*", "/docs/:splat", 302], "/hello/test-file.txt"),
    "/docs/hello/test-file.txt"
  );

  // single URL redirect
  assertEquals(
    matchRedirect(
      ["/install.sh", "https://download.dfinity.systems/sdk/install.sh", 302],
      "/install.sh"
    ),
    "https://download.dfinity.systems/sdk/install.sh"
  );
  assertEquals(
    matchRedirect(
      ["/eula", "https://association.internetcomputer.org/eula", 302],
      "/eula"
    ),
    "https://association.internetcomputer.org/eula"
  );
  assertEquals(
    matchRedirect(
      [
        "/eula-storage",
        "https://association.internetcomputer.org/eula-storage",
        302,
      ],
      "/eula-storage"
    ),
    "https://association.internetcomputer.org/eula-storage"
  );
  assertEquals(
    matchRedirect(
      [
        "/eula-storage",
        "https://association.internetcomputer.org/eula-storage",
        302,
      ],
      "/eula-storage/123"
    ),
    false
  );
});

Deno.test("Request handler", async () => {
  globalThis.fetch = (url: string | URL | Request) => {
    const response = new Response("mock_fetch", { status: 200 });

    if (url instanceof Request) {
      Object.defineProperty(response, "url", { value: url.url });
    } else if (url instanceof URL) {
      Object.defineProperty(response, "url", { value: url.href });
    } else {
      Object.defineProperty(response, "url", { value: url });
    }

    return Promise.resolve(response);
  };

  const redirects: RedirectRule[] = [
    [`/install.sh`, `https://download.dfinity.systems/sdk/install.sh`, 302],
    [`/downloads/*`, `https://download.dfinity.systems/sdk/:splat`, 302],
    [`/eula`, `https://association.internetcomputer.org/eula`, 301],
  ];

  const assertRedirect = (r: Response | null, status: number, url: string) => {
    assert(r);
    assertEquals(r.status, status);
    assert(r.headers.has("location"));
    assertEquals(r.headers.get("location"), url);
  };

  const assertProxiedResponse = async (r: Response | null, url: string) => {
    assert(r);
    assertEquals(r.status, 200);
    assertEquals(r.url, url);
    assertEquals(await r.text(), "mock_fetch");
  };

  // regular requests aren't modified
  assertEquals(
    await checkRequest(new Request("https://internetcomputer.org/"), [], ""),
    null
  );

  // slackbot can reach the asset canister
  await assertProxiedResponse(
    await checkRequest(
      new Request("https://internetcomputer.org/capabilities", {
        headers: { "user-agent": "Slackbot" },
      }),
      [],
      "hwvjt-wqaaa-aaaam-qadra-cai.raw.ic0.app"
    ),
    "https://hwvjt-wqaaa-aaaam-qadra-cai.raw.ic0.app/capabilities"
  );

  // curl can reach the asset canister
  await assertProxiedResponse(
    await checkRequest(
      new Request("https://internetcomputer.org/capabilities", {
        headers: { "user-agent": "curl/7.79.1" },
      }),
      [],
      "hwvjt-wqaaa-aaaam-qadra-cai.raw.ic0.app"
    ),
    "https://hwvjt-wqaaa-aaaam-qadra-cai.raw.ic0.app/capabilities"
  );

  // install script redirect works
  assertRedirect(
    await checkRequest(
      new Request("https://internetcomputer.org/install.sh"),
      redirects,
      "hwvjt-wqaaa-aaaam-qadra-cai.raw.ic0.app"
    ),
    302,
    "https://download.dfinity.systems/sdk/install.sh"
  );

  // redirect rules apply before bot check
  assertRedirect(
    await checkRequest(
      new Request("https://internetcomputer.org/install.sh", {
        headers: { "user-agent": "curl/7.79.1" },
      }),
      redirects,
      "hwvjt-wqaaa-aaaam-qadra-cai.raw.ic0.app"
    ),
    302,
    "https://download.dfinity.systems/sdk/install.sh"
  );
});
