import {
  access,
  constants,
  writeFile,
  readFile,
  readdir,
  rm,
} from 'node:fs/promises'
import { resolve } from 'node:path'
import { Buffer } from 'node:buffer'
import { chromium } from 'playwright'
import type { HTMLAnchorElement, HTMLSpanElement } from 'happy-dom'

export default defineEventHandler(async () => {
  const today = new Date().toISOString().split('T')[0]
  const assertDirectory = 'public/chenhao-recommend-blog/'
  const jsonPath = `${assertDirectory}${today}.json`

  const files = await readdir(assertDirectory)
  const latestNFiles = useAppConfig().latestNFiles || 1
  const cachedFiles = files.slice(-latestNFiles)

  /**
   *! cache latest N files
   **/
  if (files.length > latestNFiles) {
    for (const iterator of files) {
      if (!cachedFiles.includes(iterator)) {
        await rm(`${assertDirectory}${iterator}`).catch((e) => {
          throw new Error('No such file: ' + e.message)
        })
      }
    }
  }

  try {
    await access(jsonPath, constants.F_OK)

    const content = await readFile(resolve(jsonPath), { encoding: 'utf-8' })

    return {
      data: JSON.parse(content) || [],
      updateDate: today,
    }
  }
  catch {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://coolshell.cn/featured')

    const rows = page.locator('.featured-post > li')

    const texts = await rows.evaluateAll(list =>
      list.map((element) => {
        const [dateEl, aLink, views] = [...element.children]

        return {
          date: (dateEl as HTMLSpanElement).innerText,
          link: (aLink as HTMLAnchorElement).href,
          title: (aLink as HTMLAnchorElement).innerText,
          views: (views as HTMLSpanElement).innerText,
        }
      }),
    )

    const controller = new AbortController()
    const { signal } = controller

    await writeFile(jsonPath, Buffer.from(JSON.stringify(texts)), {
      signal,
    })

    controller.abort()

    return {
      data: texts,
      updateDate: today,
    }
  }
})
