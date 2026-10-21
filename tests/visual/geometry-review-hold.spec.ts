import { expect, test } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';

for (const slug of ['cahaba-river-old-overton-highway-280', 'saco-river-route-160-brownfield']) {
  test(`${slug}: held traces are explained before export and keep facility maps`, async ({ page }) => {
    await installMapLibreHarness(page);
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.goto(`/rivers/${slug}/`);
    await expect(page.locator('[data-geometry-review-notice]')).toContainText('route line and GPX download are unavailable');
    await expect(page.locator('[data-trip-gpx]')).toHaveCount(0);
    await expect(page.locator('[data-trip-pack]')).not.toContainText('download the route');
    await page.getByRole('link', { name: 'Open access map', exact: true }).click();
    await expect(page.locator('[data-detail-map-line-key]')).toContainText('route line and GPX download are unavailable');
    await expect(page.locator('[data-detail-map-line-key]')).not.toContainText('Dashed line');
    if (slug.startsWith('cahaba')) {
      await expect(page.locator('#access-plan')).toContainText('US Highway 280 Blueway access reference above the dam');
      await expect(page.locator('#access-plan a[href*="maps?q=33.43202%2C-86.713973"]')).toHaveCount(1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}

test('unheld Remmel guide retains its GPX download', async ({ page }) => {
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/rivers/ouachita-river-remmel-whitewater-park/');
  await expect(page.locator('[data-trip-gpx]')).toHaveCount(1);
  await expect(page.locator('[data-geometry-review-notice]')).toHaveCount(0);
});
