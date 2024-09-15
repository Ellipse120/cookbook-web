import { access, constants } from 'node:fs/promises'
import { chromium } from 'playwright'

export default defineEventHandler(async () => {
  const appConfig = useAppConfig()

  const today = new Date().toISOString().split('T')[0]

  const screenshotUrl = `${appConfig.jiuzhaigouChartDir}/${today}.png`

  try {
    await access(screenshotUrl, constants.F_OK)
  }
  catch {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto(appConfig.jiuzhaigouPageUrl, {
      timeout: 0
    })

    await page.screenshot({
      path: screenshotUrl,
      fullPage: true
    })

    browser.close()
  }

  return {
    statusCode: 200,
    statusMessage: '获取快照成功',
    data: screenshotUrl.replace('public', '')
  }
})
