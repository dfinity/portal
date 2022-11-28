import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { matchRedirect } from "../edge-functions/redirects.ts";

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
