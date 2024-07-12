import type { Browser } from "puppeteer";

const puppeteer = require("puppeteer");
const Sitemapper = require("sitemapper");
const path = require("path");
const fs = require("fs");
const os = require("os");

let root = process.argv[2];

if (!root) {
  console.info(
    "A domain was not provided. Using internetcomputer.org instead."
  );
  root = "internetcomputer.org";
}

main().then((file) => {
  console.info(`Full sitemap successfully saved`);
  console.log(file);
  process.exit(0);
});

async function main(): Promise<string> {
  const { sites } = await getSitemap(root);
  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 3000,
  });

  const map: Map<string, Set<string>> = new Map();
  const workingSet = new StackSet<string>();
  const visitedSet = new Set<string>();

  sanitizeLinks(sites, root).forEach((link) => workingSet.push(link));

  while (workingSet.size() > 0) {
    const current = workingSet.pop();
    visitedSet.add(current);

    const links = sanitizeLinks(
      await generateDeepSitemap(current, browser),
      root
    );

    if (links.size > 0) {
      map.set(current, links);
      console.info(`Added ${links.size} links for ${current}`);
    }

    links.forEach((link) => {
      if (!visitedSet.has(link)) {
        workingSet.push(link);
      }
    });
  }

  return writeDeepSitemapToFile(map);
}

function writeDeepSitemapToFile(map: Map<string, Set<string>>) {
  const sitemap = {};

  for (let [key, value] of map) {
    sitemap[key] = Array.from(value);
  }

  const tmpDir = os.tmpdir();
  const tmpFile = path.join(tmpDir, "portal-deep-sitemap.json");
  fs.writeFileSync(tmpFile, JSON.stringify(sitemap, null, 2));

  return tmpFile;
}

async function generateDeepSitemap(
  url: string,
  browser: Browser
): Promise<Array<string>> {
  try {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await delay(500);

    console.info(`Visiting ${url}`);
    await page.goto(url, {});

    const hrefs = await page.$$eval("a", (as) => as.map((a) => a.href));
    const links = new Set<string>(
      hrefs
        .map((href) => {
          try {
            return new URL(href);
          } catch {
            return null;
          }
        })
        .filter(Boolean)
        .map(
          (url) => `${url.protocol}//${url.hostname}${url.port}${url.pathname}`
        )
    );
    return Array.from(links);
  } catch (err) {
    console.error(`Failed to fetch for url ${url} (${err.message})`);
    return [];
  }
}

async function getSitemap(domain: string) {
  const sitemapper = new Sitemapper();
  const protocol = "https:";
  return sitemapper.fetch(`${protocol}//${domain}/sitemap.xml`);
}

function sanitizeLinks(links: Array<string>, domain: string) {
  return new Set<string>(
    links
      .map((href) => {
        try {
          return new URL(href);
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      // filter out anything from a different domain than provided
      .filter((url) => url.hostname === domain)
      .map(
        (url) => `${url.protocol}//${url.hostname}${url.port}${url.pathname}`
      )
      // filter out anything with a filename extension
      .filter((url) => !/\.\w+$/.test(url))
  );
}

class StackSet<T> {
  private set = new Set<T>();

  size() {
    return this.set.size;
  }

  push(value: T) {
    this.set.add(value);
  }

  pop() {
    const array = Array.from(this.set);
    const value = array.pop();
    this.set = new Set(array);
    return value;
  }
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
