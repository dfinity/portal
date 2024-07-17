#!/bin/bash

npm install --global puppeteer sitemapper ts-node
ts-node .github/workflows/scripts/reachabilityReport.ts
