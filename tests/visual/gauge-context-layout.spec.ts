import { expect, test } from '@playwright/test';
import fixture from '../mobile-web/fixtures/gauge-context.json' with { type: 'json' };
import { installMapLibreHarness } from './maplibre-harness';

const slug = 'little-miami-river-kelley-milford';

test('USGS measurements align as compact rows and retain observation caveats', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  const payload = { ...fixture, context: {
    ...structuredClone(fixture.context),
    fetchedAt: new Date().toISOString(),
    turbidity: { ...fixture.context.turbidity, qualifiers: ['ice'] },
    unavailable: ['No recent dissolved-oxygen measurement'],
  } };
  await page.route(`**/api/rivers/${slug}/gauge-context.json`, route => route.fulfill({ json: payload }));
  await page.goto(`/rivers/${slug}/`);
  await page.locator('.route-station-details > summary').click();
  const panel = page.getByRole('region', { name: 'USGS gauge context' });
  await page.locator('[data-gauge-context]').scrollIntoViewIfNeeded();
  await expect(panel).toBeVisible();
  const rows = panel.locator('.gauge-context__row');
  await expect(rows).toHaveCount(5);
  await expect(rows.filter({ hasText: 'Gauge reading quality' })).toContainText('Provisional · Estimated');
  await expect(rows.filter({ hasText: 'Water temperature' })).toContainText('55 °F');
  await expect(rows.filter({ hasText: 'Turbidity' })).toContainText('12 FNU');
  await expect(rows.filter({ hasText: 'Turbidity' })).toContainText('Ice-affected');
  await expect(rows.filter({ hasText: 'Turbidity' }).locator('time')).toContainText('Older');
  await expect(rows.filter({ hasText: 'Seasonal flow context' }).locator('time')).toContainText('Daily mean');
  await expect(panel.locator('[data-context-coverage]')).toBeVisible();
  await expect(panel.locator('[data-context-source]')).toHaveAttribute('href', payload.context.sourceUrl);
  await expect(panel.locator('.gauge-context__notes')).not.toHaveAttribute('open');
  await expect(panel.locator('[data-context-notes]')).toBeHidden();
  const bounds = await rows.first().evaluate(row => ({
    label: row.querySelector('dt')!.getBoundingClientRect().right,
    value: row.querySelector('.gauge-context__reading')!.getBoundingClientRect().left,
  }));
  expect(bounds.value).toBeGreaterThan(bounds.label);
  expect(await panel.evaluate(el => el.getBoundingClientRect().height)).toBeLessThan(650);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await panel.screenshot({ path: `output/route-simplification/measurements-${testInfo.project.name}.png` });
  await panel.locator('.gauge-context__notes > summary').focus();
  await page.keyboard.press('Enter');
  await expect(panel.locator('[data-context-notes]')).toBeVisible();
  await expect(panel.locator('[data-context-notes]')).toContainText('historical middle 50%');
  await expect(panel.locator('[data-context-notes]')).toContainText('No recent dissolved-oxygen measurement');
  expect(errors).toEqual([]);
});

test('absent supplementary data does not show an empty measurements card', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.route(`**/api/rivers/${slug}/gauge-context.json`, route => route.fulfill({ json: { context: null } }));
  await page.goto(`/rivers/${slug}/`);
  await page.locator('.route-station-details > summary').click();
  await page.locator('[data-gauge-context]').scrollIntoViewIfNeeded();
  await expect(page.locator('.gauge-context')).toBeHidden();
});
