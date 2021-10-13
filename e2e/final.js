const { chromium } = require('playwright-chromium')
const path = require("path");

async function run () {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const report = {
    requestUpto399: 0,
    requestsAbove399: 0,
    failedRequests: 0,
    consoleErrors: 0
  }

  page.on('requestfailed', request => {
    console.info(`Failed request: ${request.url()}`)
    report.failedRequests++
  })

  page.on('response', response => {
    if (response.status() > 399) {
      console.info(`Response with a status higher than 399: ${response.url()}`)
      report.responseAbove399++
    } else {
      report.requestUpto399++
    }
  })

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const location = msg.location()
      console.info(`Console error: ${msg.text()} - ${location.url} - ${location.lineNumber}:${location.columnNumber}`)
      report.consoleErrors++
    }
  })

  const webVitalsMeasurements = {
    FCP: null,
    LCP: null
  }

  await page.addInitScript({path: path.join(__dirname, '../node_modules/web-vitals/dist/web-vitals.umd.js')})

  await page.exposeFunction('__reportVitals__', (data) => {
    const measurement = JSON.parse(data)
    webVitalsMeasurements[measurement.name] = measurement.value
  })

  await page.addInitScript(() => {
    const reportVitals = (measurement) => window.__reportVitals__(JSON.stringify(measurement))

    window.addEventListener('DOMContentLoaded', () => {
      webVitals.getFCP(reportVitals)
      webVitals.getLCP(reportVitals, true)
    })
  })

  const targetUrl = process.env.TARGET_URL || 'https://nextjs-conf-demo.checklyhq.com/'

  console.log(`Opening target URL: ${targetUrl}`)
  await page.goto(targetUrl)

  console.log('Snapping a screenshot')
  await page.screenshot({ path: 'homepage.jpg' })

  console.log('Clicking the button')
  await page.click('[data-test-id=button]')

  console.log('Closing browser')
  await browser.close()

  console.table(report)
  console.table(webVitalsMeasurements)
}

run()
