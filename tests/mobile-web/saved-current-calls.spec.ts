import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const scenario of ['ready', 'withheld', 'planning', 'expired'] as const) {
  test(`Saved current-call count respects ${scenario} data`, async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{ slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier to Long Lake', savedAt: '2026-09-06T12:00:00Z' }]));
      localStorage.setItem('paddletoday:alert-preferences', 'unreadable');
    });
    const generatedAt = scenario === 'expired' ? '2020-01-01T00:00:00Z' : new Date().toISOString();
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { generatedAt, rivers: [{
      ...fixture.result, generatedAt, score: 95, rating: 'Strong',
      river: { ...fixture.result.river, scoreEligibility: scenario === 'planning' ? 'planning' : 'scored' },
      readiness: { status: scenario === 'withheld' ? 'withheld' : 'ready', label: 'QA', reason: 'QA source coverage.' },
      summary: { gaugeNow: 'QA', shortExplanation: 'QA fixture' }, liveData: { overall: 'live', summary: 'QA' },
    }] } }));
    await page.goto('/saved');
    await expect(page.getByLabel(`Current calls: ${scenario === 'ready' ? 1 : 0}/1`, { exact: true })).toBeVisible();
    await expect(page.getByLabel('Alerts: Unknown', { exact: true })).toBeVisible();
    const paddle = page.getByRole('heading', { name: 'Paddle today', exact: true });
    if (scenario === 'ready') await expect(paddle).toBeVisible();
    else await expect(paddle).toHaveCount(0);
    if (scenario === 'planning') await expect(page.getByText('Planning only', { exact: true }).first()).toBeVisible();
  });
}
