import { expect, test } from '@playwright/test';

for (const path of ['/', '/explore/', '/weekend/', '/favorites/', '/rivers/rice-creek-peltier-to-long-lake/', '/request-river/', '/contribute/']) {
  test(`hidden controls remain hidden on ${path}`, async ({ page }) => {
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('https://cloud.umami.is/**', (route) => route.abort());
    await page.goto(path);
    const renderedHiddenElements = await page.locator('[hidden]:not([hidden="until-found"])').evaluateAll((elements) =>
      elements.filter((element) => element.getClientRects().length > 0 && getComputedStyle(element).display !== 'none')
        .map((element) => ({ tag: element.tagName, className: element.className, text: element.textContent?.trim().slice(0, 80) })),
    );
    expect(renderedHiddenElements).toEqual([]);
  });
}
