import { test, expect, type Route } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';

test('state map retry preserves filters chosen while the map is unavailable', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.addInitScript(() => {
    (window as any).__retryMapRuntime = (window as any).maplibregl;
    delete (window as any).maplibregl;
    localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now()));
  });
  await page.route('https://unpkg.com/maplibre-gl@*/dist/*', route => route.abort());
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/states/minnesota/');
  const retry = page.getByRole('button', { name: 'Retry map', exact: true });
  await expect(retry).toBeVisible();
  await page.locator('.state-coverage__map-shell').screenshot({ path: test.info().outputPath('state-map-unavailable.png') });
  await page.getByRole('searchbox', { name: 'Find a river or route' }).fill('Rice Creek');
  await expect(page.locator('[data-state-route-item]:visible').first()).toContainText('Rice Creek');
  await page.evaluate(() => { (window as any).maplibregl = (window as any).__retryMapRuntime; });
  await retry.press('Space');
  await expect(retry).toBeHidden();
  await expect(page.locator('[data-state-map] canvas')).toHaveCount(1);
  await expect(page.locator('[data-state-map-status]')).toBeFocused();
  await expect(page.getByRole('searchbox', { name: 'Find a river or route' })).toHaveValue('Rice Creek');
  await expect(page.locator('[data-state-map] [data-route-slug]:visible').first()).toHaveAttribute('data-route-slug', /rice-creek/);
});

test('state filters wait for map readiness and a transient tile error can recover', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await installMapLibreHarness(page, { mapReady: false });
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/states/minnesota/');
  await expect(page.locator('[data-state-map] canvas')).toHaveCount(1);
  await page.evaluate(() => (window as any).__paddleMapInstances[0].emit('error', { error: new Error('A single tile failed') }));
  await page.getByRole('searchbox', { name: 'Find a river or route' }).fill('Rice Creek');
  await expect(page.locator('[data-state-route-item]:visible').first()).toContainText('Rice Creek');
  await expect(page.locator('[data-state-map-status]')).toHaveAttribute('data-map-state', 'loading');
  await page.evaluate(() => {
    const runtime = (window as any).maplibregl.Map;
    runtime.prototype.loaded = () => true;
    runtime.prototype.isStyleLoaded = () => true;
    (window as any).__paddleMapInstances[0].emit('idle');
  });
  await expect(page.locator('[data-state-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await expect(page.locator('[data-state-map] [data-route-slug]:visible').first()).toHaveAttribute('data-route-slug', /rice-creek/);
  expect(errors).toEqual([]);
});

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

for (const renderer of ['harness', 'native']) {
  test(`${renderer} state score markers keep a usable popup through selection`, async ({ page }) => {
    if (renderer === 'harness') await installMapLibreHarness(page);
    await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
    await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [
      { ...fixture.result, score: 74, readiness: { status: 'ready' }, liveData: { overall: 'live' } },
    ] } }));
    await page.goto('/states/minnesota/');
    await page.getByRole('combobox', { name: 'Filter by river', exact: true }).selectOption('rice-creek');
    const marker = page.locator('[data-state-map] .score-map-marker--condition-zone');
    await marker.click();
    const popup = page.locator('.maplibregl-popup');
    await expect(popup).toBeVisible();
    await expect(popup.getByRole('link', { name: /^View route/ })).toHaveAttribute('href', `/rivers/${fixture.result.river.slug}/`);
    await marker.click();
    await expect(popup).toHaveCount(0);
    await marker.press('Enter');
    await expect(popup).toBeVisible();
    await marker.press('Escape');
    await expect(popup).toHaveCount(0);
    await expect(marker).toBeFocused();
  });
}

test('state route geometry retries after a transient failure without flooding requests', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [] } }));
  let requests = 0;
  const river = fixture.result.river;
  await page.route('**/data/canonical-river-geometries/states/minnesota.json', async route => {
    requests++;
    if (requests === 1) { await route.fulfill({ status: 503, json: {} }); return; }
    await route.fulfill({ json: { features: [{ type: 'Feature', properties: { routeId: river.slug },
      geometry: { type: 'LineString', coordinates: [
        [river.putIn.longitude, river.putIn.latitude], [river.takeOut.longitude, river.takeOut.latitude],
      ] } }] } });
  });
  await page.goto('/states/minnesota/');
  await expect.poll(() => requests).toBe(1);
  const filter = page.getByRole('combobox', { name: 'Filter by river', exact: true });
  await filter.selectOption('rice-creek');
  expect(requests).toBe(1);
  await page.evaluate(() => { const now = Date.now(); Date.now = () => now + 31000; });
  await filter.selectOption('');
  await expect.poll(() => requests).toBe(2);
  await expect.poll(() => page.evaluate(() => (window as any).__paddleMapInstances
    .find((map: any) => map.container.hasAttribute('data-state-map'))
    ?.getSource('state-supported-rivers-canonical')?.data.features.length)).toBeGreaterThan(0);
  await filter.selectOption('rice-creek');
  expect(requests).toBe(2);
});

test('state route cards and map agree when a current call is withheld', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [fixture.result] } }));
  await page.goto('/states/minnesota/');
  const card = page.locator('[data-state-live-list] .state-live-card');
  await expect(card).toHaveCount(1);
  await expect(card.locator('.state-live-card__score')).toHaveAccessibleName('Current call unavailable');
  await expect(card.locator('.state-live-card__score span').first()).toHaveText('--');
  await expect(card).toContainText('No call');
  await expect(card).not.toContainText('confidence');
  await expect(card.getByRole('link', { name: /^View route/ })).toBeVisible();
  await expect(page.locator('[data-state-live-status]')).toContainText('Current calls are unavailable');
  await expect(page.locator('[data-state-map] .score-map-marker--condition-zone')).toHaveCount(0);
  await card.screenshot({ path: test.info().outputPath('state-call-unavailable.png') });
});

test('state filters keep zero-result lists and map markers aligned and reset by keyboard', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ json: { rivers: [{ ...fixture.result, score: 80, rating: 'Good', readiness: { status: 'ready' } }] } }));
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

for (const activation of ['pointer', 'keyboard']) {
  test(`state directory route links navigate with ${activation} activation`, async ({ page }) => {
    await installMapLibreHarness(page);
    await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
    await page.goto('/states/minnesota/');
    await expect(page.locator('[data-state-map-status]')).toHaveAttribute('data-map-state', 'ready');
    const link = page.locator('[data-state-route-item]').first();
    const target = await link.getAttribute('href');
    await page.route(`**${target}`, route => route.fulfill({ contentType: 'text/html', body: '<h1>Route details</h1>' }));
    if (activation === 'keyboard') await link.press('Enter');
    else await link.click();
    await expect(page).toHaveURL(new RegExp(`${target}$`));
    await expect(page.getByRole('heading', { name: 'Route details' })).toBeVisible();
  });
}

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
  await pending!.fulfill({ json: { rivers: [{ ...fixture.result, score: 80, rating: 'Good', readiness: { status: 'ready' } }] } });
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

test('state live picks reflow without pushing text outside the cards', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [
    { ...fixture.result, score: 74, readiness: { status: 'ready' }, liveData: { overall: 'live' } },
  ] } }));
  await page.goto('/states/minnesota/');
  const card = page.locator('.state-live-card').first();
  await expect(card).toBeVisible();
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect(await card.evaluate(card => {
    const bounds = card.getBoundingClientRect();
    return [...card.querySelectorAll('.state-live-card__body > *')].every(child => {
      const rect = child.getBoundingClientRect();
      return rect.right <= bounds.right && rect.left >= bounds.left && child.scrollWidth <= child.clientWidth + 1;
    });
  })).toBe(true);
});
