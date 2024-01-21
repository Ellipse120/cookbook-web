import { chromium } from "playwright";
import { access, constants, writeFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Buffer } from "node:buffer";

export default defineEventHandler(async () => {
  const today = new Date().toISOString().split("T")[0];
  const jsonPath = `public/chenhao-recommend-blog/${today}.json`;

  try {
    await access(jsonPath, constants.F_OK);

    const content = await readFile(resolve(jsonPath), { encoding: "utf-8" });

    return {
      data: JSON.parse(content) || [],
      updateDate: today,
    };
  } catch (error) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://coolshell.cn/featured");

    const rows = page.locator(".featured-post > li");

    const texts = await rows.evaluateAll((list) =>
      list.map((element) => {
        const [dateEl, aLink, views] = [...element.children];

        return {
          date: (dateEl as HTMLSpanElement).innerText,
          link: (aLink as HTMLAnchorElement).href,
          title: (aLink as HTMLAnchorElement).innerText,
          views: (views as HTMLSpanElement).innerText,
        };
      })
    );

    const controller = new AbortController();
    const { signal } = controller;

    await writeFile(jsonPath, Buffer.from(JSON.stringify(texts)), {
      signal,
    });

    controller.abort();

    return {
      data: texts,
      updateDate: today,
    };
  }
});
