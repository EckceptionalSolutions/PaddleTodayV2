import { expect, test } from '@playwright/test';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

test('state access connections become solid only when traced geometry arrives', async ({ page, isMobile }) => {
  await page.routeWebSocket(url => ['localhost', '127.0.0.1'].includes(url.hostname) && url.searchParams.has('token'),
    socket => socket.send(JSON.stringify({ type: 'connected' })));
  await page.addInitScript(() => {
    localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now()));
    let library: any;
    Object.defineProperty(window, 'maplibregl', { configurable: true, get: () => library, set: value => {
      library = value;
      library.Map = new Proxy(value.Map, { construct(target, args) {
        const map = Reflect.construct(target, args);
        (window as any).stateLineMap = map;
        return map;
      } });
    } });
  });
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [] } }));
  await page.route('https://tiles.openfreemap.org/styles/liberty', route => route.fulfill({ json: {
    version: 8, glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf', sources: {},
    layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#e8eef1' } }],
  } }));
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/data/canonical-river-geometries/states/minnesota.json', async route => {
    await pending;
    const river = fixture.result.river;
    await route.fulfill({ json: { features: [{ type: 'Feature', properties: { routeId: river.slug },
      geometry: { type: 'LineString', coordinates: [
        [river.putIn.longitude, river.putIn.latitude], [river.takeOut.longitude, river.takeOut.latitude],
      ] } }] } });
  });
  const rendered = () => page.evaluate(() => {
    const map = (window as any).stateLineMap;
    return ['state-route-lines-highlight', 'state-route-lines-highlight-connections'].map(id =>
      map.queryRenderedFeatures({ layers: [id] }).length > 0);
  });
  try {
    await page.goto('/states/minnesota/');
    await expect(page.locator('[data-state-map-status]')).toHaveAttribute('data-map-state', 'ready', { timeout: 15000 });
    await page.getByRole('combobox', { name: 'Filter by river', exact: true }).selectOption('rice-creek');
    await page.locator(`[data-state-map] button[data-route-slug="${fixture.result.river.slug}"]`).click();
    await expect.poll(rendered).toEqual([false, true]);
    await expect(page.locator('[data-state-map-status]')).toContainText('access coordinates');
    await page.locator('.maplibregl-popup-close-button').click();
    const point = await page.evaluate(() => {
      const map = (window as any).stateLineMap;
      const coordinates = map.getStyle().sources['state-route-lines'].data.features[0].geometry.coordinates;
      const left = coordinates[0], right = coordinates[1];
      const point = map.project([(left[0] + right[0]) / 2, (left[1] + right[1]) / 2]);
      const bounds = map.getContainer().getBoundingClientRect();
      return { x: bounds.left + point.x, y: bounds.top + point.y };
    });
    if (isMobile) await page.touchscreen.tap(point.x, point.y);
    else await page.mouse.click(point.x, point.y);
    await expect(page.locator('.maplibregl-popup')).toBeVisible();
    release();
    await expect.poll(rendered).toEqual([true, false]);
    await expect(page.locator('[data-state-map-status]')).toContainText('along the river line');
    await page.locator('[data-state-map]').screenshot({ path: test.info().outputPath('traced-state-reach.png') });
  } finally { release(); }
});
