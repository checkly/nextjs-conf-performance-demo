# Next.js performance demo

This repo is part of the [talk by Tim Nolet at Next.js conf 2021](https://nextjs.org/conf/speakers/timnolet).
Visit the page over at [https://nextjs-conf-demo.checklyhq.com/](https://nextjs-conf-demo.checklyhq.com/)

## Content of the repo

1. A simple Next.js app.
2. A set of Playwright scripts to collect performance and reliability data on that app.
3. A GitHub actions workflow to run a Playwright script on each deploy.

## Usage

Just clone this repo and run the usual installation commands

```
git clone https://github.com/checkly/nextjs-conf-performance-demo.git
cd nextjs-conf-performance-demo
npm install
```

Then run the final version of the E2E test script.

```
npm run e2e-test
```

And you should see output similar to the log below and also find a file named `homepage.jpg` on your local disk

```
Opening target URL: https://nextjs-conf-demo.checklyhq.com/
Failed request: https://thisdoesnotexistimprettysure123yolo.com/
Console error: Failed to load resource: net::ERR_NAME_NOT_RESOLVED - https://thisdoesnotexistimprettysure123yolo.com/ - 0:0
Console error: Something really went wrong here - https://nextjs-conf-demo.checklyhq.com/_next/static/chunks/pages/index-26389e8ef25302584185.js - 0:1290
Snapping a screenshot
Clicking the button
Closing browser
┌──────────────────┬────────┐
│     (index)      │ Values │
├──────────────────┼────────┤
│  requestUpto399  │   11   │
│ requestsAbove399 │   0    │
│  failedRequests  │   1    │
│  consoleErrors   │   2    │
└──────────────────┴────────┘
┌─────────┬────────────────────┐
│ (index) │       Values       │
├─────────┼────────────────────┤
│   FCP   │ 267.90000000596046 │
│   LCP   │       267.9        │
└─────────┴────────────────────┘

```
