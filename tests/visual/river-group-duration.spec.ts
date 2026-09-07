import { test, expect } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

test('failed river comparisons retain static routes without loading or recommendation claims', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/rivers/by-river/rum-river/');
  const list = page.locator('[data-group-route-list]');
  await expect(list.locator('[data-group-initial-score]').first()).toHaveText('No data');
  await expect(list).not.toContainText('Recommended today');
  await expect(list.locator('.route-choice__details-link').first()).toBeVisible();
  await expect(page.locator('.river-route-picker__toolbar')).toBeHidden();
  await expect(list.locator('[data-group-route-select]').first()).toBeDisabled();
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: {
      group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 },
      routes: [fixture.result],
    },
  } }));
  await page.locator('[data-group-refresh]').click();
  await expect(page.locator('.river-route-picker__toolbar')).toBeVisible();
  await expect(list.locator('[data-group-route-select]').first()).toBeEnabled();
  await expect(list.locator('[data-group-initial-score]')).toHaveCount(0);
});

test('river route cards retain mixed units, ranges, decimals, and open bounds', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  const cases = [
    ['2 hr 30 min to 4 hr', 'About 2.5–4 hr'],
    ['30 to 45 minutes', 'About 30–45 min'],
    ['2.5 hours', 'About 2.5 hr'],
    ['About 8 hr to 10+ hr', 'About 8 hr to 10+ hr'],
  ];
  await page.route('**/api/river-groups/rum-river.json*', (route) => route.fulfill({ json: {
    result: {
      group: { riverId: 'rum-river', name: 'Rum River', routeCount: cases.length, stateSummary: 'Minnesota', regionSummary: 'Central Minnesota' },
      routes: cases.map(([label], index) => ({ ...fixture.result, river: {
        ...fixture.result.river, riverId: 'rum-river', slug: `duration-${index}`,
        name: 'Rum River', reach: `Duration case ${index}`, estimatedPaddleTime: label,
        profile: { difficulty: 'easy' },
      } })),
    },
  } }));
  await page.goto('/rivers/by-river/rum-river/');
  for (const [, expected] of cases) {
    await expect(page.locator('[data-group-route-list] .route-choice__fact').filter({ hasText: expected })).toHaveCount(1);
  }
});
