import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const status of ['offline', 'withheld', 'ready'] as const) {
  test(`welcome distinguishes an illustration from a current route when ${status}`, async ({ page }) => {
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    if (status !== 'offline') {
      const generatedAt = new Date().toISOString();
      await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { generatedAt, rivers: [{
        ...fixture.result, generatedAt, river: { ...fixture.result.river, name: 'QA Current Route' },
        score: 95, rating: 'Strong', readiness: { status, label: status, reason: 'QA fixture.' },
        summary: { shortExplanation: 'QA fixture.', cardText: 'QA fixture.', gaugeNow: 'Fixture reading',
          confidenceText: 'Fixture confidence', freshnessText: 'Fixture update', rawSignalLine: '', primaryFactor: '', secondaryFactor: '' },
        liveData: { overall: 'live', summary: 'Fixture', gaugeState: 'live', weatherState: 'live' },
      }] } }));
    }
    await page.goto('/welcome');
    const first = page.getByTestId('welcome-slide-1');
    if (status === 'ready') {
      await expect(first.getByText('CURRENT ROUTE PREVIEW', { exact: true })).toBeVisible();
      await expect(first.getByText('QA Current Route', { exact: true })).toBeVisible();
    } else {
      await expect(first.getByText('ILLUSTRATIVE EXAMPLE', { exact: true })).toBeVisible();
      await expect(first.getByText('Sample values · not current conditions', { exact: true })).toBeVisible();
      await expect(first.getByText('QA Current Route', { exact: true })).toHaveCount(0);
    }
    await page.getByRole('button', { name: 'Next welcome page', exact: true }).click();
    const second = page.getByTestId('welcome-slide-2');
    await expect(second.getByText(status === 'ready' ? 'EXAMPLE FROM TODAY' : 'ILLUSTRATIVE EXAMPLE', { exact: true })).toBeVisible();
    await expect(second.getByText('Checking today’s routes', { exact: true })).toHaveCount(0);
    await expect(second.getByText('Loading current conditions', { exact: true })).toHaveCount(0);
    await expect(second.getByText(status === 'ready' ? '95' : '82', { exact: true })).toBeVisible();
  });
}
