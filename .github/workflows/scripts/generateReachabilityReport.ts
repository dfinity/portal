import os from "os";
import path from "path";
import type { Browser } from "puppeteer";

const fs = require("fs");
const puppeteer = require("puppeteer");

let siteMapFile = process.argv[2];
if (!siteMapFile) {
  throw new Error("No siteMapFile provided");
}

let reachabilitySelector =
  process.argv[3] ?? "main[class*='docMainContainer_']";

let filterPrefix =
  process.argv[4] ?? "https://internetcomputer.org/docs/current/";

fs.readFile(siteMapFile, "utf8", async (err, data) => {
  const siteMapData = JSON.parse(data);
  const reachability = {};
  const badLinks = new Set<string>();
  const visited = new Set<string>();

  const browser: Browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 0,
  });

  for (let key in siteMapData) {
    for (const url of siteMapData[key]) {
      if (!visited.has(url) && url.startsWith(filterPrefix)) {
        console.info(`Visiting ${url}`);

        const page = await browser.newPage();
        await page.setJavaScriptEnabled(false);
        await page.goto(url);

        let reachable = false;
        try {
          // if the following selector is found on the page, it is a valid link
          await page.waitForSelector(reachabilitySelector, {
            timeout: 500,
          });
          reachable = true;
        } catch (err) {
          console.log(err.message);
          console.log(`Found link without reachable content: ${url}`);
          badLinks.add(url);
        } finally {
          reachability[key] ||= [];
          reachability[key].push({ url, reachable });
          visited.add(url);
        }
      }
    }
  }

  const tmpDir = os.tmpdir();
  const tmpFileReachability = path.join(
    tmpDir,
    "portal-reachability-report.json"
  );
  fs.writeFileSync(tmpFileReachability, JSON.stringify(reachability, null, 2));
  console.info("Saved reachability report.");
  console.log(tmpFileReachability);

  const tmpFileBadLinks = path.join(tmpDir, "portal-bad-links.json");
  fs.writeFileSync(
    tmpFileBadLinks,
    JSON.stringify(Array.from(badLinks), null, 2)
  );
  console.info("Saved bad links report.");
  console.log(tmpFileBadLinks);

  process.exit(0);
});
