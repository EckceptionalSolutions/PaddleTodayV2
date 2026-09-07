import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Explore matches accents and repeated spaces without changing the typed query', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: ['Cañon Creek', 'Other Creek'].map((name, index) => ({
    ...fixture.result, score: 80, rating: 'Good',
    river: { ...fixture.result.river, name, slug: `search-${index}`, riverId: `search-${index}`, difficulty: 'easy' },
    summary: { gaugeNow: 'Check source', shortExplanation: 'QA fixture.' },
    liveData: { overall: 'stale', summary: 'Check current conditions.' },
  })) } }));
  await page.goto('/explore?intent=best-nearby');
  const input = page.getByRole('textbox', { name: 'Search routes', exact: true });
  await expect(page.getByRole('button', { name: /^Cañon Creek,.*score 80/ })).toBeVisible();
  await input.fill('  CANON   creek ');
  await expect(page.getByRole('button', { name: /^Cañon Creek,.*score 80/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Other Creek,/ })).toHaveCount(0);
  await expect(input).toHaveValue('  CANON   creek ');
});
