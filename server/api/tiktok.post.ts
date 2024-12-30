import { chromium } from 'playwright'
import random from 'lodash/random'

const uaList = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
]
const oneMinute = 60 * 1000

export default defineEventHandler(async (event) => {
  const { link } = await readBody(event)

  const browser = await chromium.launch()
  const context = await browser.newContext({
    userAgent: uaList[random(0, uaList.length - 1)],
  })

  context.setDefaultTimeout(oneMinute)
  const page = await context.newPage()

  await page.goto(link)

  const countElement = page.locator('[data-e2e="user-tab-count"]')
  const count = await countElement.evaluate(node => node.innerText)

  await page.evaluate('[...document.getElementsByClassName(\'screen-mask login-mask-enter-done\')].every(el => el?.remove())')

  const buffer = await page.locator('[data-e2e="user-post-list"] > ul').screenshot()

  await browser.close()

  return {
    statusCode: 200,
    statusMessage: '获取快照成功',
    data: {
      count,
      img: 'data:image/png;base64, ' + buffer.toString('base64'),
    },
  }

  // return 'xxx'
})
