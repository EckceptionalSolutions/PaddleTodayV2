import { test, expect, type Route } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';

test('state name search combines with filters and resets the full route list', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/states/minnesota/');
  const routes = page.locator('[data-state-route-item]');
  const total = await routes.count();
  const search = page.getByRole('searchbox', { name: 'Find a river or route' });
  await search.fill('RICE creek');
  const visible = page.locator('[data-state-route-item]:visible');
  await expect(visible.first()).toContainText('Rice Creek');
  expect(await visible.count()).toBeLessThan(total);
  await search.fill('no-matching-river-here');
  await expect(visible).toHaveCount(0);
  await expect(page.locator('[data-state-filter-status]')).toContainText('No routes match');
  await page.locator('[data-state-filter-reset]').click();
  await expect(search).toHaveValue('');
  await expect(visible).toHaveCount(total);
});
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

test('state filters keep zero-result lists and map markers aligned and reset by keyboard', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ json: { rivers: [{ ...fixture.result, score: 80, rating: 'Good' }] } }));
  await page.goto('/states/minnesota/');
  const map = page.locator('[data-state-map]');
  await expect(map).toHaveClass(/maplibregl-map/);
  await expect(map.locator('[data-route-slug]:visible').first()).toBeVisible();
  const form = page.getByRole('form', { name: 'Minnesota route filters', exact: true });
  const routeType = form.getByRole('combobox', { name: 'Filter by route type', exact: true });
  const riceCreek = page.locator('[data-state-route-item][href="/rivers/rice-creek-peltier-to-long-lake/"]');
  await routeType.selectOption({ label: 'Flatwater / moving water' });
  await expect(riceCreek).toBeVisible();
  await expect(page.locator('[data-state-route-item][data-route-type="whitewater"]:visible')).toHaveCount(0);
  await routeType.selectOption({ label: 'Whitewater' });
  await expect(riceCreek).toBeHidden();
  await routeType.selectOption('');
  await form.getByRole('combobox', { name: 'Filter by river', exact: true }).selectOption('rice-creek');
  await form.getByRole('combobox', { name: 'Filter by difficulty', exact: true }).selectOption('hard');
  const status = page.locator('[data-state-filter-status]');
  await expect(status).toHaveText('No routes match these filters. Reset or change a filter to see routes.');
  await expect(status).toHaveAttribute('aria-live', 'polite');
  await expect(page.locator('[data-state-route-item]:visible')).toHaveCount(0);
  await expect(map.locator('[data-route-slug]:visible')).toHaveCount(0);
  await expect(page.locator('[data-state-map-status]')).toContainText('No routes match these filters.');
  await form.getByRole('button', { name: 'Reset', exact: true }).press('Space');
  await expect(status).toHaveText(/Showing \d+ of \d+ routes\./);
  await expect(map.locator('[data-route-slug]:visible').first()).toBeVisible();
  await expect(page.locator('[data-state-route-item]:visible').first()).toBeVisible();
  await expect(form.getByRole('combobox', { name: 'Filter by river', exact: true })).toHaveValue('');
});

test('state route links support opening a route in a new tab', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop browser modified-click behavior.');
  await installMapLibreHarness(page);
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/api/**', (route) => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/states/minnesota/');
  await expect(page.locator('[data-state-map]')).toHaveClass(/maplibregl-map/);
  const routeLink = page.locator('[data-state-route-item]').first();
  const target = await routeLink.getAttribute('href');
  const popupPromise = page.context().waitForEvent('page', { timeout: 10_000 });
  await routeLink.click({ modifiers: ['Control'] });
  const popup = await popupPromise;
  await popup.waitForURL(`**${target}`);
  await expect(page).toHaveURL(/\/states\/minnesota\/$/);
  await popup.close();
});

test('state live conditions retry without losing the route directory', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/states/minnesota/');
  const retry = page.getByRole('button', { name: 'Retry live conditions', exact: true });
  await expect(retry).toBeVisible();
  let pending: Route | null = null;
  let requests = 0;
  await page.route('**/api/rivers/summary.json*', (route) => { requests += 1; pending = route; });
  await retry.press('Space');
  await expect(retry).toBeDisabled();
  await expect(retry).toHaveAttribute('aria-busy', 'true');
  await retry.dispatchEvent('click');
  await expect.poll(() => Boolean(pending)).toBe(true);
  expect(requests).toBe(1);
  await expect(page.locator('[data-state-route-item]:visible').first()).toBeVisible();
  await pending!.fulfill({ json: { rivers: [] } });
  await expect(retry).toBeEnabled();
  await expect(page.locator('[data-state-live-list] .state-live-card--static').first()).toBeVisible();
  pending = null;
  await retry.press('Space');
  await expect.poll(() => Boolean(pending)).toBe(true);
  await pending!.fulfill({ json: { rivers: [{ ...fixture.result, score: 80, rating: 'Good' }] } });
  await expect(retry).toBeHidden();
  await expect(page.locator('[data-state-live-status]')).toContainText('Showing the top 1 Minnesota routes');
  await expect(page.locator('[data-state-live-status]')).toBeFocused();
  await expect(page.locator('[data-state-live-list] .state-live-card--static')).toHaveCount(0);
  await expect(page.locator('[data-state-live-list] h3')).toHaveText('Rice Creek');
});

test('state route links navigate when the map library cannot load', async ({ page }) => {
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('https://unpkg.com/maplibre-gl@*/**', (route) => route.abort());
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/states/minnesota/');
  await expect(page.locator('[data-state-map-status]')).toContainText('Interactive map unavailable');
  const link = page.locator('[data-state-route-item]').first();
  const target = await link.getAttribute('href');
  await link.press('Enter');
  await expect(page).toHaveURL(`http://127.0.0.1:4323${target}`);
});


test('state directory stays usable when map readiness times out', async ({ page }) => {
  await installMapLibreHarness(page, { mapReady: false });
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/api/**', (route) => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/states/minnesota/');
  await expect(page.locator('[data-state-map-status]')).toContainText('Interactive map unavailable', { timeout: 15_000 });
  await expect(page.locator('[data-state-map] canvas')).toHaveCount(0);
  const form = page.getByRole('form', { name: 'Minnesota route filters', exact: true });
  await form.getByRole('combobox', { name: 'Filter by river', exact: true }).selectOption('rice-creek');
  const link = page.locator('[data-state-route-item]:visible').first();
  const target = await link.getAttribute('href');
  await link.press('Enter');
  await expect(page).toHaveURL(`http://127.0.0.1:4323${target}`);
});


test('failed state route photos retain a clear fallback and usable route link', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/*', (route) => route.request().resourceType() === 'image' ? route.abort() : route.continue());
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/api/**', (route) => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/states/minnesota/');
  const photoLink = page.locator('.state-route-card__media').first();
  await photoLink.scrollIntoViewIfNeeded();
  await expect(photoLink.getByText('Photo unavailable', { exact: true })).toBeVisible();
  await expect(photoLink.locator('img')).toBeHidden();
  await expect(photoLink).toHaveAccessibleName(/^View .+: .+/);
  const target = await photoLink.getAttribute('href');
  await photoLink.press('Enter');
  await expect(page).toHaveURL(`http://127.0.0.1:4323${target}`);
});
