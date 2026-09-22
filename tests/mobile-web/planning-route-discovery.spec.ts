import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Home search and Explore discover planning routes absent from the scored summary', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  const scored = { ...fixture.result, summary: { gaugeNow: 'Check source', shortExplanation: 'QA fixture.' } };
  const planning = { ...scored, river: { ...scored.river, name: 'Erie Canal', slug: 'erie-canal-fairport', riverId: 'erie-canal', reach: 'Fairport', state: 'NY', scoreEligibility: 'planning' },
    readiness: { status: 'withheld', label: 'Withheld', reason: 'Planning route; check local sources.' } };
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [scored] } }));
  await page.route('**/api/rivers/explore.json', route => route.fulfill({ json: { generatedAt: null, snapshotStatus: 'unavailable', rivers: [scored, planning] } }));
  await page.goto('/');
  await expect(page.getByText('Erie Canal', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Search for a river or route', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('textbox', { name: 'Search rivers and routes', exact: true }).fill('Erie Canal');
  await expect(dialog.getByRole('button', { name: 'View Erie Canal: Fairport', exact: true })).toBeVisible();
  await page.goto('/explore');
  await page.getByRole('textbox', { name: 'Search routes', exact: true }).fill('Erie Canal');
  await page.getByRole('button', { name: 'Show all matching calls', exact: true }).click();
  await expect(page.getByRole('button', { name: /^Erie Canal,/ })).toBeVisible();
});
