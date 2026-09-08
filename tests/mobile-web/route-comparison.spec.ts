import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const stale of [false, true]) {
  test(`${stale ? 'stored' : 'current'} hub shortlist retains selections through filters and supports removal`, async ({ page }) => {
    await page.setViewportSize({ width: page.viewportSize()!.width, height: 600 });
    await page.addInitScript(stale => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      if (!stale) localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 46.78, longitude: -92.1, label: 'Duluth', source: 'search' }));
    }, stale);
    const generatedAt = stale ? '2020-01-01T00:00:00Z' : new Date().toISOString();
    const routes = [1, 2, 3, 4].map(number => ({ ...fixture.result, generatedAt, score: 95, rating: 'Strong',
      readiness: { status: 'ready', label: 'Ready', reason: 'QA fixture' },
      river: { ...fixture.result.river, slug: `comparison-${number}`, reach: `Reach ${number} with a descriptive access name`, distanceLabel: `${number * 3} mi` },
    }));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/river-groups/rice-creek.json', route => route.fulfill({ json: { generatedAt, result: {
      group: { riverId: 'rice-creek', name: 'Rice Creek', routeCount: 4, stateSummary: 'Minnesota', regions: ['Twin Cities'] }, routes,
    } } }));
    await page.route('**/api/rivers/comparison-1.json', route => route.fulfill({ json: { ...fixture, generatedAt, result: routes[0] } }));
    await page.goto('/river-hub/rice-creek');
    const add = (number: number) => page.getByRole('button', { name: `Add to comparison: Reach ${number} with a descriptive access name`, exact: true });
    await add(1).click();
    await expect(page.getByRole('button', { name: 'Compare 1 selected routes', exact: true })).toBeDisabled();
    await add(2).press('Enter');
    await add(3).click();
    await expect(add(4)).toBeDisabled();
    await page.getByRole('button', { name: 'Under 5 mi', exact: true }).click();
    await expect(page.getByText('Showing 1 of 4 routes', { exact: false })).toBeVisible();
    const compare = page.getByRole('button', { name: 'Compare 3 selected routes', exact: true });
    await expect(compare).toBeInViewport({ ratio: 1 });
    await compare.click();
    const sheet = page.getByRole('dialog');
    await expect(sheet).toBeInViewport({ ratio: 1 });
    await expect(page.getByRole('heading', { name: 'Your route comparison', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Reach 2 with a descriptive access name', exact: true })).toBeAttached();
    if (stale) await expect(page.getByText('Set a planning location on Today to include approximate drive estimates.', { exact: true })).toBeVisible();
    else {
      await expect(sheet.getByText(/^Drive estimates from Duluth/)).toBeVisible();
      await expect(sheet.getByText('No drive estimate', { exact: true })).toHaveCount(0);
    }
    if (stale) {
      await expect(page.getByText('Current score unavailable', { exact: true })).toHaveCount(3);
      await expect(page.getByText('Saved conditions need an update. These stored calls are not a current recommendation.', { exact: true })).toBeVisible();
    } else await expect(sheet.getByText('95', { exact: true })).toHaveCount(3);
    await page.screenshot({ path: `tmp/route-comparison-${stale ? 'stored' : 'current'}-${page.viewportSize()!.width}.png` });
    await page.getByRole('button', { name: 'Remove from comparison: Rice Creek: Reach 3 with a descriptive access name', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Reach 3 with a descriptive access name', exact: true })).toHaveCount(0);
    if (stale) await page.keyboard.press('Escape');
    else await page.getByRole('button', { name: 'Close comparison', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Compare 2 selected routes', exact: true })).toBeVisible();
    if (!stale) {
      await page.getByRole('button', { name: 'Compare 2 selected routes', exact: true }).click();
      await page.getByRole('button', { name: 'Open compared route: Rice Creek: Reach 1 with a descriptive access name', exact: true }).click();
      await expect(page).toHaveURL('/river/comparison-1?source=river-hub');
      await page.goBack();
      await expect(page.getByRole('button', { name: 'Compare 2 selected routes', exact: true })).toBeVisible();
      await expect(page.getByText('Showing 1 of 4 routes', { exact: false })).toBeVisible();
    }
    await page.getByRole('button', { name: 'Clear comparison', exact: true }).click();
    await expect(page.getByRole('button', { name: /Compare \d selected routes/ })).toHaveCount(0);
  });
}
