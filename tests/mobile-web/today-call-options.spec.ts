import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Today omits the no-call tile while keeping the other call shortcuts', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{
    ...fixture.result, summary: { gaugeNow: 'Unavailable', shortExplanation: 'Fixture' },
    liveData: { overall: 'offline', summary: 'Unavailable' },
  }] } }));
  await page.goto('/');
  await expect(page.getByRole('button', { name: /^0 Paddle routes$/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^0 Watch routes$/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^0 Skip routes$/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /[0-9]+ No call routes?$/ })).toHaveCount(0);
});
