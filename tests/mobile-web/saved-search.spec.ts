import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Saved search matches local notes and areas while retaining comparison selections', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const generatedAt = new Date().toISOString();
  const routes = ['Rivière calme', 'Pine Creek'].map((name, index) => ({ ...fixture.result, generatedAt,
    summary: { gaugeNow: 'QA', shortExplanation: 'QA route' },
    liveData: { overall: 'live', summary: 'QA', gaugeState: 'live', weatherState: 'live' },
    river: { ...fixture.result.river, slug: `search-${index}`, name, reach: 'Park to bridge', state: index ? 'Wisconsin' : 'Minnesota', region: 'North woods' },
  }));
  await page.addInitScript(records => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:saved-rivers', JSON.stringify(records));
  }, [...routes.map((route, index) => ({ slug: route.river.slug, name: route.river.name, reach: route.river.reach,
    notes: index ? 'Easy parking by bridge' : 'Quiet picnic stop', savedAt: generatedAt })),
    { slug: 'offline-route', name: 'Hidden Brook', reach: 'Old mill', notes: 'Bring the blue boat', savedAt: generatedAt }]);
  let requests = 0;
  await page.route('**/api/**', route => { requests++; return route.fulfill({ status: 503, json: { error: 'offline' } }); });
  await page.route('**/api/rivers/summary.json', route => { requests++; return route.fulfill({ json: { generatedAt, rivers: routes } }); });
  await page.goto('/saved');
  const search = page.getByRole('textbox', { name: 'Search saved routes', exact: true });
  await expect(page.getByRole('button', { name: 'Compare saved routes', exact: true })).toBeVisible();
  const initialRequests = requests;
  await search.fill('RIVIERE');
  await expect(page.getByText('Showing 1 of 3 saved routes.', { exact: true })).toBeVisible();
  await expect(page.getByText('Rivière calme', { exact: true })).toBeVisible();
  await expect(page.getByText('Pine Creek', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Compare saved routes', exact: true }).click();
  const first = page.getByRole('checkbox', { name: 'Compare route: Rivière calme: Park to bridge', exact: true });
  await first.click();
  await search.fill('parking bridge');
  await page.getByRole('checkbox', { name: 'Compare route: Pine Creek: Park to bridge', exact: true }).click();
  await page.getByRole('button', { name: 'Compare 2 selected saved routes', exact: true }).click();
  const sheet = page.getByRole('dialog');
  await expect(sheet.getByText('Rivière calme', { exact: true })).toBeVisible();
  await expect(sheet.getByText('Pine Creek', { exact: true })).toBeAttached();
  await sheet.getByRole('button', { name: 'Close comparison', exact: true }).click();
  await search.fill('Minnesota north');
  await expect(first).toBeChecked();
  await search.fill('blue boat');
  await expect(page.getByRole('link', { name: 'Open Hidden Brook: Old mill', exact: true })).toBeVisible();
  await expect(page.getByText('Showing 1 of 3 saved routes.', { exact: true })).toBeVisible();
  await page.screenshot({ path: `tmp/saved-search-${page.viewportSize()!.width}.png` });
  await search.fill('nonexistent');
  await expect(page.getByText('No saved routes match', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Show all saved routes', exact: true }).click();
  await expect(search).toHaveValue('');
  await expect(first).toBeChecked();
  await search.fill('pine');
  await page.getByRole('button', { name: 'Clear saved route search', exact: true }).click();
  await expect(search).toBeFocused();
  await expect(search).toHaveValue('');
  expect(requests).toBe(initialRequests);
  expect(errors).toEqual([]);
});
