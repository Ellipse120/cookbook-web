import { chromium } from "playwright";

export default defineEventHandler(async (event) => {
  const { link } = await readBody(event);

  if (!link) {
    return {
      statusCode: 200,
      statusMessage: "Must have link param",
    };
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(link);

  const buffer = await page.screenshot();

  return buffer;
});
