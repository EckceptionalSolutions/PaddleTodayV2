import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Today route search opens by keyboard, clears queries, and opens a result', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: [{
    ...fixture.result, summary: { cardText: 'Local QA fixture', shortExplanation: 'Conditions withheld', rawSignalLine: '', gaugeNow: '', confidenceText: '', freshnessText: '', primaryFactor: '', secondaryFactor: '' },
  }] } }));
  await page.route('**/gallery/**', (route) => route.abort());
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Search for a river or route', exact: true });
  await open.press('Space');
  const dialog = page.getByRole('dialog');
  const search = dialog.getByRole('textbox', { name: 'Search rivers and routes', exact: true });
  await expect(search).toBeFocused();
  await search.fill('unmatched QA route');
  await expect(dialog.getByText('No route found', { exact: true })).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Open Explore map', exact: true })).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Request a Route', exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Clear search', exact: true }).press('Space');
  await expect(search).toHaveValue('');
  await search.fill('Rice Creek');
  await dialog.getByRole('button', { name: `View Rice Creek: ${fixture.result.river.reach}`, exact: true }).press('Space');
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/\/river\/rice-creek-peltier-to-long-lake/);
});

test('Today searches accented names and keeps other rivers after grouping many matching reaches', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  const rivers = Array.from({ length: 23 }, (_, index) => ({ ...fixture.result,
    river: { ...fixture.result.river, slug: `search-group-${index}`, riverId: index < 22 ? 'many-reaches' : 'another-river',
      name: index < 22 ? 'Rivière' : 'Rivière du nord', reach: `Access ${index}` },
    summary: { shortExplanation: 'QA', gaugeNow: 'QA' },
  }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Search for a river or route', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('textbox', { name: 'Search rivers and routes', exact: true }).fill('RIVIERE');
  await expect(dialog.getByRole('button', { name: /^View Rivière:/ })).toHaveCount(1);
  await expect(dialog.getByRole('button', { name: 'View Rivière du nord: Access 22', exact: true })).toBeVisible();
  await expect(dialog.getByText(/22 routes/)).toHaveCount(1);
});
