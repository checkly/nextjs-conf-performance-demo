const { chromium } = require('playwright-chromium')

async function run () {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const targetUrl = process.env.TARGET_URL || 'https://google.com'

  console.log(`Opening target URL: ${targetUrl}`)
  await page.goto(targetUrl)

  console.log('Snapping a screenshot')
  await page.screenshot({ path: 'homepage.jpg' })

  console.log('Closing browser')
  await browser.close()
}

run()