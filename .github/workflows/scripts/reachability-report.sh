#!/bin/bash

npm install puppeteer sitemapper ts-node

report=$(ts-node .github/workflows/scripts/reachabilityReport.ts)
echo $report | jq .diff
open report

echo "Your package.json file may have been modified. Please ensure you revert changes to package.json and package-lock.json"