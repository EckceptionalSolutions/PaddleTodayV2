import { expect, test } from '@playwright/test';
import { installMobileBoardFixtures } from './mobile-board-fixtures';
import { gaugeCases, gaugeReplay, replayTime } from '../gauge-replay';

test.use({ timezoneId: 'UTC' });
for (const sample of gaugeCases) {
  test(`Today, Explore and detail agree on a ${sample.name} gauge`, async ({ page }) => {
    const { slug, board, detail } = gaugeReplay(sample.name);
    await page.clock.setFixedTime(replayTime);
    await page.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 45.15, longitude: -93.15, label: 'Circle Pines', source: 'search' }));
    });
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    const fulfill = await installMobileBoardFixtures(page);
    await page.route('**/api/mobile/{summary,explore}.json**', route => fulfill(route, { json: board }));
    await page.route(`**/api/rivers/${slug}.json*`, route => route.fulfill({ json: detail }));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const home = page.getByText(`Gauge: ${sample.value}`, { exact: false }).first();
    await expect(home).toBeVisible();
    if (sample.time) {
      await expect(home).toContainText(sample.time);
      await expect(home).toContainText(sample.freshness);
    }
    await page.goto('/explore?intent=best-nearby', { waitUntil: 'domcontentloaded' });
    await page.getByRole('tab', { name: 'List view' }).click();
    const card = page.getByRole('button', { name: /^Open route: Rice Creek,/ });
    await expect(card.getByText(sample.value, { exact: true })).toBeVisible();
    if (sample.time) {
      await expect(card).toContainText(sample.time);
      await expect(card).toContainText(sample.freshness);
    }
    await card.click();
    await expect(page).toHaveURL(new RegExp('/river/' + slug));
    await expect(page.getByText(sample.value, { exact: true }).filter({ visible: true }).first()).toBeVisible();
    if (sample.time) await expect(page.getByText(new RegExp(sample.freshness + '.*' + sample.time)).filter({ visible: true }).first()).toBeVisible();
    if (sample.name === 'changed unit') await expect(page.getByText('Discharge', { exact: true }).filter({ visible: true }).first()).toBeVisible();
  });
}
