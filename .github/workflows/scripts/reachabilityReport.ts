import type { Browser, Page } from "puppeteer";

const puppeteer = require("puppeteer");
const Sitemapper = require("sitemapper");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { spawn } = require("child_process");

let root = process.argv[2];

if (!root) {
  console.info("Running reachability report");
  console.debug("No domain provided. Using internetcomputer.org.");
  root = "internetcomputer.org";
}

main().then(({ file, result }) => {
  console.info(`Reachability report successfully saved:`);
  console.log(file);

  console.info(
    `Found ${result.diff.length} links in site content that do not appear in sitemap:`
  );
  result.diff.forEach((entry) => console.log(entry));

  spawn("open", [file]);
  process.exit(0);
});

async function main(): Promise<{
  file: string;
  result: Record<string, string[]>;
}> {
  const { hyperLinks, sitemap } = await collectHyperLinks(root);

  // gather all the links that are present throughout site content that DO NOT
  // appear in the sitemap. only include urls that start with the
  // provided domain (e.g. https://internetcomputer.org)
  const diff = hyperLinks
    .filter((x) => !sitemap.includes(x))
    .filter((x) => new RegExp(`^https?:\/\/${root}\/`).test(x));

  const result = {
    hyperLinks,
    sitemap,
    diff,
  };

  const tmpDir = os.tmpdir();
  const tmpFile = path.join(tmpDir, "internet-computer-reachability.json");
  fs.writeFileSync(tmpFile, JSON.stringify(result, null, 2));

  return { file: tmpFile, result };
}

async function getSitemap(domain: string, protocol: string = "https") {
  return new Sitemapper().fetch(`${protocol}//${domain}/sitemap.xml`);
}

async function collectHyperLinks(root: string) {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 0,
    defaultViewport: null,
  });

  const { sites: urls } = await getSitemap(root);
  const hrefs = new Set<string>();

  for (const url of urls) {
    const page: Page = await browser.newPage();
    await page.setJavaScriptEnabled(false);

    try {
      await page.goto(url);
      await page.waitForNetworkIdle();

      const hrefsOnPage = await page.$$eval("a", (anchors) =>
        anchors.map((a) => a.href).filter(Boolean)
      );
      console.info(`Collected ${hrefsOnPage.length} links on ${url}`);

      hrefsOnPage.forEach((href) => {
        try {
          hrefs.add(sanitizeHyperLink(href));
        } catch (err) {
          console.error(`Failed to add url to set: ${href}`);
        }
      });
    } catch (err) {
      console.error(err.message);
    } finally {
      await page.close();
    }
  }

  return {
    hyperLinks: Array.from(hrefs),
    sitemap: urls.map(sanitizeHyperLink) as Array<string>,
  };
}

function sanitizeHyperLink(href: string): string {
  const url = new URL(href);
  return `${url.protocol}//${url.hostname}${url.port}${url.pathname}${url.search}`;
}
