import { chromium } from "playwright";

export default defineEventHandler(async (event) => {
    const { link } = await readBody(event);

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(link);

    const countElement = page.locator('[data-e2e="user-tab-count"]');
    const count = await countElement.evaluate(node => node.innerText)

    await page.evaluate("[...document.getElementsByClassName('screen-mask login-mask-enter-done')].every(el => el?.remove())");

    const buffer = await page.locator('[data-e2e="user-post-list"] > ul').screenshot();

    await browser.close();

    return {
        statusCode: 200,
        statusMessage: "获取快照成功",
        data: {
            count,
            img: 'data:image/png;base64, ' + buffer.toString('base64')
        }
    }

    // return 'xxx'
})
