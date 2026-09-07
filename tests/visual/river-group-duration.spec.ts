import { test, expect } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

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
