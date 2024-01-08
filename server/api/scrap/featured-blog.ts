import { chromium } from "playwright";

export default defineEventHandler(async (event) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://coolshell.cn/featured");

  const rows = page.locator(".featured-post > li");

  const texts = rows.evaluateAll((list) =>
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

  return texts;
});
