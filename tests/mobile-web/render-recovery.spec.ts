import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const activation of ['keyboard', 'double click']) test(`a display error recovers through ${activation}`,  async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    const state = window as unknown as { cacheResets: number };
    state.cacheResets = 0;
    const remove = Storage.prototype.removeItem;
    Storage.prototype.removeItem = function (key) {
      if (key === 'paddletoday-mobile-query-cache') state.cacheResets++;
      return remove.call(this, key);
    };
  });
  let broken = true;
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: broken ? { ...fixture, result: { ...fixture.result, river: { ...fixture.result.river, name: { invalid: true } } } } : fixture }));
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await expect(page.getByRole('heading', { name: 'This screen needs a reset', exact: true })).toBeVisible();
  broken = false;
  const resetsBefore = await page.evaluate(() => (window as unknown as { cacheResets: number }).cacheResets);
  const reload = page.getByRole('button', { name: 'Reload PaddleToday', exact: true });
  if (activation === 'keyboard') await reload.press('Enter');
  else await reload.evaluate((element) => { (element as HTMLElement).click(); (element as HTMLElement).click(); });
  await expect.poll(() => page.evaluate(() => (window as unknown as { cacheResets: number }).cacheResets)).toBe(resetsBefore + 1);
  await expect(page.getByRole('heading', { name: 'This screen needs a reset', exact: true })).toBeHidden();
  await expect(page.getByRole('tab', { name: 'Today', exact: true })).toHaveAttribute('aria-selected', 'true');
});
