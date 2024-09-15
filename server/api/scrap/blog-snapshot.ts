import { access, constants } from 'node:fs/promises'
import { chromium } from 'playwright'

export default defineEventHandler(async (event) => {
  const { link } = await readBody(event)
  const appConfig = useAppConfig()

  if (!link) {
    return {
      statusCode: 500,
      statusMessage: 'Must have link param',
      data: ''
    }
  }

  const linkURL = new URL(link)
  const screenshotUrl = `${appConfig.chenhaoBlogDir}/${linkURL.pathname}.png`

  try {
    await access(screenshotUrl, constants.F_OK)
  }
  catch (error) {
    if (error) {
      throw createError({
        statusCode: 422,
        message: error.toString()
      })
    }

    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto(link, {
      timeout: 0
    })

    await page.evaluate('document.getElementById(\'masthead\').remove()')

    await page.locator('.post-content').screenshot({
      path: screenshotUrl
    })

    await browser.close()
  }

  return {
    statusCode: 200,
    statusMessage: '获取快照成功',
    data: screenshotUrl.replace('public', '')
  }
})
