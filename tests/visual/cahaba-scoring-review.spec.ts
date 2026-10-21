import { expect, test } from '@playwright/test';
import { getRiverBySlug } from '../../src/lib/rivers';
import { serializePlanningRoute } from '../../src/lib/api-contract';
import { installMapLibreHarness } from './maplibre-harness';

test('Moon River explains the published minimum without a full target range', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/rivers/cahaba-river-moon-grants-mill/');
  await expect(page.locator('.route-calibration-callout')).toContainText('Only a low-water floor is known.');
  await expect(page.locator('#trip-decisions')).toContainText('Treat 100 cfs as a floor');
  await expect(page.locator('#trip-decisions time')).toHaveAttribute('datetime', '2026-10-20');
  expect((await page.locator('script[type="application/ld+json"]').allTextContents()).join(' ')).toContain('100 cfs');
});

for (const slug of ['cahaba-river-grants-mill-old-overton', 'cahaba-river-old-overton-highway-280']) {
  test(`${slug}: planning evidence survives API hydration without a borrowed score`, async ({ page }) => {
    await installMapLibreHarness(page);
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route(`**/api/rivers/${slug}.json*`, route => route.fulfill({ json: { generatedAt: new Date().toISOString(), result: serializePlanningRoute(getRiverBySlug(slug)!) } }));
    await page.goto(`/rivers/${slug}/`);
    await expect(page.locator('[data-field="planning-weather-summary"]')).toContainText('Check the local forecast');
    await expect(page.locator('.river-detail__planning-banner')).toContainText('Use the linked gauge as reference information');
    await expect(page.locator('.route-calibration-callout')).toHaveCount(0);
    await expect(page.locator('#trip-decisions')).toBeVisible();
    await expect(page.locator('#planning-sources')).toBeVisible();
    await expect(page.locator('.route-faq')).toContainText('This planning route has no live Paddle Today score.');
    if (slug.endsWith('highway-280')) {
      await expect(page.locator('[data-geometry-review-notice]')).toContainText('Route line and GPX withheld');
      await expect(page.locator('[data-trip-gpx]')).toHaveCount(0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}

test('Cahaba hub links all three guides and explains the scoring distinction', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/rivers/by-river/cahaba-river-alabama/');
  await expect(page.getByRole('heading', { name: 'Choose a Cahaba trip before using the gauge', exact: true })).toBeVisible();
  await expect(page.locator('[data-group-route-card]')).toHaveCount(3);
  await expect(page.getByRole('link', { name: 'Read the Highway 280 guide', exact: true })).toBeVisible();
  await expect(page.locator('main')).toContainText('downstream choices remain unscored plans');
  await expect(page.locator('main')).not.toContainText('including longer combinations');
});
