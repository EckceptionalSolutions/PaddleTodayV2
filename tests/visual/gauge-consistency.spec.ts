import { expect, test } from '@playwright/test';
import { gaugeCases, gaugeReplay, replayTime } from '../gauge-replay';

test.use({ timezoneId: 'UTC' });
for (const sample of gaugeCases) {
  test(`Today, Explore and detail agree on a ${sample.name} gauge`, async ({ page }) => {
    const { slug, board, detail } = gaugeReplay(sample.name);
    await page.clock.setFixedTime(replayTime);
    await page.addInitScript(() => localStorage.setItem('paddletoday:user-location',
      JSON.stringify({ latitude: 45.15, longitude: -93.15, label: 'Circle Pines, MN' })));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    await page.route('**/api/rivers/{summary,explore}.json*', route => route.fulfill({ json: board }));
    await page.route(`**/api/rivers/${slug}.json*`, route => route.fulfill({ json: detail }));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const home = page.locator('[data-field="featured-signal"]:visible, [data-field="withheld-gauge"]:visible').first();
    await expect(home).toContainText(sample.value);
    if (sample.time) {
      await expect(home).toContainText(sample.time);
      await expect(home).toContainText(sample.freshness);
    }
    await page.goto('/explore/?searchVersion=1&paddleable=false&rating=all&routeType=all', { waitUntil: 'domcontentloaded' });
    const card = page.locator('[data-explore-grid] .river-card').first();
    await card.locator('summary').click();
    const signal = card.locator('[data-field="raw-signal"]');
    await expect(signal).toBeVisible();
    await expect(signal).toContainText(sample.value);
    if (sample.time) {
      await expect(signal).toContainText(sample.time);
      await expect(signal).toContainText(sample.freshness);
    }
    await page.goto(`/rivers/${slug}/`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-field="gauge-now"]').first()).toHaveText(sample.value);
    await expect(page.locator('[data-field="observed-at"]').first()).toContainText(sample.time || 'No reading');
    if (sample.freshness) await expect(page.locator('[data-field="gauge-freshness"]').first()).toContainText(sample.freshness);
    if (sample.name === 'changed unit') await expect(page.locator('[data-field="primary-gauge-label"]').first()).toHaveText('Discharge');
  });
}
