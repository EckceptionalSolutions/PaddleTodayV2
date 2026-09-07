import { test, expect, type Route } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

function hubResponse(empty = false) {
  return { requestId: 'qa-river-hub', generatedAt: new Date().toISOString(), result: {
    group: { riverId: 'rice-creek', name: 'Rice Creek', routeCount: empty ? 0 : 1, stateSummary: 'Minnesota', regionSummary: 'Twin Cities', regions: ['Twin Cities'] },
    routes: empty ? [] : [fixture.result],
  } };
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
});

test('an empty river hub renders without claiming filters removed its routes', async ({ page }) => {
  await page.route('**/api/river-groups/rice-creek.json', (route) => route.fulfill({ json: hubResponse(true) }));
  await page.goto('/river-hub/rice-creek');
  await expect(page.getByText('No routes available', { exact: true })).toBeVisible();
  await expect(page.getByText('Clear a filter to see more of this river.', { exact: true })).toBeHidden();
});

test('cached river hub routes and filtering survive a failed refresh and retry', async ({ page }) => {
  let mode: 'success' | 'offline' | 'pending' = 'success';
  let pending: Route | null = null;
  await page.route('**/api/river-groups/rice-creek.json', (route) => {
    if (mode === 'pending') { pending = route; return; }
    return mode === 'success' ? route.fulfill({ json: hubResponse() }) : route.fulfill({ status: 503, json: { error: 'offline' } });
  });
  await page.goto('/river-hub/rice-creek');
  await expect.poll(() => page.evaluate(() => {
    const cache = JSON.parse(localStorage.getItem('paddletoday-mobile-query-cache') || 'null');
    return cache?.clientState?.queries?.some((query: { queryKey: string[] }) => query.queryKey[0] === 'river-group') ?? false;
  })).toBe(true);
  await page.addInitScript(() => {
    const key = 'paddletoday-mobile-query-cache';
    const cache = JSON.parse(localStorage.getItem(key)!);
    for (const query of cache.clientState.queries) query.state.dataUpdatedAt = Date.now() - 30 * 60 * 1000;
    localStorage.setItem(key, JSON.stringify(cache));
  });
  mode = 'offline';
  await page.reload();
  const retry = page.getByRole('button', { name: 'Retry river hub', exact: true });
  await expect(retry).toBeVisible();
  mode = 'pending';
  await retry.click();
  await expect(retry).toBeDisabled();
  await expect(retry).toHaveAttribute('aria-busy', 'true');
  await page.getByRole('button', { name: 'Under 5 mi', exact: true }).click();
  await expect(page.getByText('No routes match', { exact: true })).toBeVisible();
  await expect.poll(() => pending !== null).toBe(true);
  await pending!.fulfill({ json: hubResponse() });
  await expect(retry).toBeHidden();
  await expect(page.getByText('No routes match', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Clear', exact: true }).click();
  await expect(page.getByText('No routes match', { exact: true })).toBeHidden();
});

test('hub sorting, filters, and score disclosure expose keyboard state', async ({ page }) => {
  await page.route('**/api/river-groups/rice-creek.json', (route) => route.fulfill({ json: hubResponse() }));
  await page.goto('/river-hub/rice-creek');
  const sorts = page.getByRole('radiogroup', { name: 'Sort river routes', exact: true });
  const best = sorts.getByRole('radio', { name: 'Best', exact: true });
  const shortest = sorts.getByRole('radio', { name: 'Shortest', exact: true });
  await expect(best).toHaveAttribute('aria-checked', 'true');
  await best.press('ArrowRight');
  await expect(shortest).toBeFocused();
  await expect(shortest).toHaveAttribute('aria-checked', 'true');
  const filters = page.getByRole('button', { name: 'More river filters', exact: true });
  await expect(filters).toHaveAttribute('aria-expanded', 'false');
  await filters.press('Space');
  await expect(filters).toHaveAttribute('aria-expanded', 'true');
  const easy = page.getByRole('button', { name: 'Easy', exact: true });
  await easy.press('Space');
  await expect(easy).toHaveAttribute('aria-pressed', 'true');
  const details = page.getByRole('button', { name: `Score details: ${fixture.result.river.reach}`, exact: true });
  await details.press('Space');
  await expect(details).toHaveAttribute('aria-expanded', 'true');
  await details.press('Space');
  await expect(details).toHaveAttribute('aria-expanded', 'false');
});

test('planning details open the route instead of toggling an absent score panel', async ({ page }) => {
  const response = hubResponse();
  await page.route('**/api/river-groups/rice-creek.json', (route) => route.fulfill({ json: {
    ...response, result: { ...response.result, routes: [{ ...fixture.result, river: { ...fixture.result.river, scoreEligibility: 'planning' } }] },
  } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.goto('/river-hub/rice-creek');
  await page.getByRole('button', { name: `View planning details: ${fixture.result.river.reach}`, exact: true }).press('Space');
  await expect(page).toHaveURL(/\/river\/rice-creek-peltier-to-long-lake/);
});


test('a missing river hub offers Explore without repeating its request', async ({ page }) => {
  let requests = 0;
  await page.route('**/api/river-groups/missing-river.json', (route) => { requests++; return route.fulfill({ status: 404, json: { error: 'not_found' } }); });
  await page.goto('/river-hub/missing-river');
  await expect(page.getByRole('heading', { name: 'River not found', exact: true })).toBeVisible();
  expect(requests).toBe(1);
  await expect(page.getByRole('button', { name: 'Retry', exact: true })).toBeHidden();
  await page.getByRole('button', { name: 'Explore routes', exact: true }).press('Enter');
  await expect(page).toHaveURL('http://127.0.0.1:8082/explore');
});
