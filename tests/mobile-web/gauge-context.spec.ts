import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };
import context from './fixtures/gauge-context.json' with { type: 'json' };

for (const available of [true, false]) {
  test(`supplementary gauge context ${available ? 'shows dated observations and seasonal context' : 'fails without disrupting gauge details'}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
    let requests = 0;
    await page.route('**/api/rivers/*/gauge-context.json', route => {
      requests++;
      return route.fulfill(available ? { json: context } : { status: 503, json: { error: 'unavailable' } });
    });
    await page.goto('/river/rice-creek-peltier-to-long-lake');
    const more = page.getByRole('button', { name: 'Show More section', exact: true }).first();
    await expect(more).toBeVisible();
    expect(requests).toBe(0);
    await more.click();
    const response = page.waitForResponse('**/api/rivers/*/gauge-context.json');
    await page.getByText('Score history', { exact: true }).scrollIntoViewIfNeeded();
    await response;
    await expect.poll(() => requests).toBe(1);
    if (!available) {
      await expect(page.getByText('USGS gauge context', { exact: true })).toBeHidden();
      await expect(page.getByText('Recent gauge trend', { exact: true })).toBeAttached();
      return;
    }
    await expect(page.getByText('Provisional · Estimated', { exact: true })).toBeVisible();
    await expect(page.getByText('+10 cfs', { exact: true })).toBeVisible();
    await expect(page.getByText('55 °F', { exact: true })).toBeVisible();
    await expect(page.getByText('12 FNU', { exact: true })).toBeVisible();
    await expect(page.getByText('above typical for Jan 1', { exact: true })).toBeVisible();
    await expect(page.getByText(/Older observation · Daily mean for 2020-01-01/)).toBeVisible();
  });
}
