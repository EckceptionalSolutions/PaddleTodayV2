import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Full day excludes minute-based and mixed-unit short routes', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  const examples = [
    ['minute-route', 'Minute Creek', '30 to 90 minutes'],
    ['mixed-route', 'Mixed Creek', '2 hr 30 min to 4 hr'],
    ['day-route', 'Day Creek', '5 to 7 hours'],
  ];
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: examples.map(([slug, name, estimatedPaddleTime]) => ({
    ...fixture.result, score: 80, rating: 'Good',
    river: { ...fixture.result.river, slug, riverId: slug, name, estimatedPaddleTime, difficulty: 'easy', logistics: { campingClassification: 'none' } },
    summary: { gaugeNow: 'Check source', shortExplanation: 'QA fixture.' },
    liveData: { overall: 'stale', summary: 'Check current conditions.' },
  })) } }));
  await page.goto('/explore?intent=full-day');
  await expect(page.getByRole('button', { name: /^Day Creek,.*Call unavailable/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Minute Creek,/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /^Mixed Creek,/ })).toHaveCount(0);
});
