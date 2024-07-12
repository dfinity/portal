#!/bin/bash

npm install puppeteer sitemapper ts-node

sitemap=$(ts-node .github/workflows/scripts/generateDeepSitemap.ts)
badLinks=$(ts-node .github/workflows/scripts/generateReachabilityReport.ts $sitemap)
open badLinks

echo "Your package.json file may have been modified. Please ensure you revert changes to package.json and package-lock.json"