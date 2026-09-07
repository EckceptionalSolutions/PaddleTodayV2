import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const path of ['/', '/explore']) {
  test(`view choices work when preference storage is unavailable on ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key.includes('board-preferences') || key.includes('explore-preferences')) {
          throw new Error('QA preference storage unavailable');
        }
        return original.call(this, key, value);
      };
    });
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    const river = { ...fixture.result, summary: {
      cardText: 'Local QA fixture', shortExplanation: 'Conditions withheld', rawSignalLine: '',
      gaugeNow: '', confidenceText: '', freshnessText: '', primaryFactor: '', secondaryFactor: '',
    } };
    await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: [river] } }));
    await page.goto(path);
    if (path === '/') {
      const score = page.getByRole('button', { name: 'Score ranking', exact: true });
      await score.press('Space');
      await expect(score).toHaveAttribute('aria-pressed', 'true');
      const evidence = page.getByRole('button', { name: 'Evidence first', exact: true });
      await evidence.press('Space');
      await expect(evidence).toHaveAttribute('aria-pressed', 'true');
      await expect(score).toHaveAttribute('aria-pressed', 'false');
    } else {
      const list = page.getByRole('tab', { name: 'list view', exact: true });
      await list.press('Enter');
      await expect(list).toHaveAttribute('aria-selected', 'true');
      await page.getByRole('textbox', { name: 'Search routes', exact: true }).fill('unmatched QA route');
      await expect(page.getByRole('textbox', { name: 'Search routes', exact: true })).toHaveValue('unmatched QA route');
      await page.getByRole('button', { name: 'Clear search', exact: true }).click();
      await expect(page.getByRole('textbox', { name: 'Search routes', exact: true })).toHaveValue('');
    }
    expect(errors).toEqual([]);
  });
}
