import { test, expect } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

test('river-line activation runs once after its source is rebuilt', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 }, routes: [fixture.result] },
  } }));
  await page.goto('/rivers/by-river/rum-river/');
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
  const mapTab = page.locator('[data-group-mobile-view="map"]');
  if (await mapTab.isVisible()) await mapTab.click();
  const activate = () => page.evaluate(slug => {
    const lib = (window as any).maplibregl;
    const Popup = lib.Popup;
    let count = 0;
    lib.Popup = new Proxy(Popup, { construct(target, args) { count++; return Reflect.construct(target, args); } });
    try {
      const map = (window as any).__paddleMapInstances.find((map: any) => map.container.hasAttribute('data-group-map'));
      map.emit('click', { features: [{ properties: { slug } }], lngLat: { lng: -93.1, lat: 45.1 } });
      return count;
    } finally { lib.Popup = Popup; }
  }, fixture.result.river.slug);
  expect(await activate()).toBe(1);
  await page.keyboard.press('Escape');
  await page.evaluate(() => {
    const map = (window as any).__paddleMapInstances.find((map: any) => map.container.hasAttribute('data-group-map'));
    for (const id of [...map.layers.keys()]) if (id.startsWith('river-group-trip-')) map.removeLayer(id);
    map.removeSource('river-group-trip-lines');
    map.removeSource('river-group-trip-labels');
  });
  await page.locator('[data-group-refresh]').click();
  await expect.poll(() => page.evaluate(() => Boolean((window as any).__paddleMapInstances
    .find((map: any) => map.container.hasAttribute('data-group-map')).getSource('river-group-trip-lines')))).toBe(true);
  expect(await activate()).toBe(1);
  await expect(page.locator('[data-group-map] .maplibregl-popup')).toHaveCount(1);
});

test('switching back to the river list cancels delayed map work', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Desktop keeps both views visible.');
  await installMapLibreHarness(page);
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 }, routes: [fixture.result] },
  } }));
  await page.goto('/rivers/by-river/rum-river/');
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await page.waitForTimeout(300);
  await page.locator('[data-group-mobile-view="list"]').click();
  await page.evaluate(() => {
    const map = (window as any).__paddleMapInstances.find((map: any) => map.container.hasAttribute('data-group-map'));
    (window as any).deferredMapWork = [];
    (window as any).delayedResizes = 0;
    const resize = map.resize.bind(map);
    map.resize = () => { (window as any).delayedResizes++; return resize(); };
    const timeout = window.setTimeout.bind(window);
    window.setTimeout = ((callback: TimerHandler, delay?: number, ...args: any[]) => {
      if (delay === 40 && typeof callback === 'function') {
        (window as any).deferredMapWork.push(() => callback(...args));
        return -1;
      }
      return timeout(callback, delay, ...args);
    }) as typeof window.setTimeout;
  });
  await page.locator('[data-group-mobile-view="map"]').click();
  await page.locator('[data-group-mobile-view="list"]').click();
  await page.evaluate(() => (window as any).deferredMapWork.splice(0).forEach((run: () => void) => run()));
  expect(await page.evaluate(() => (window as any).delayedResizes)).toBe(0);
  await expect(page.locator('[data-group-map]')).toBeHidden();
  await page.locator('[data-group-mobile-view="map"]').click();
  await page.evaluate(() => (window as any).deferredMapWork.splice(0).forEach((run: () => void) => run()));
  await expect.poll(() => page.evaluate(() => (window as any).delayedResizes)).toBeGreaterThan(0);
  await expect(page.locator('[data-group-map]')).toBeVisible();
});

test('river comparison reflows when text size is doubled', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 }, routes: [fixture.result] },
  } }));
  await page.goto('/rivers/by-river/rum-river/');
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const picker = page.locator('.river-route-picker');
  const bounds = (await picker.boundingBox())!;
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
  await expect.poll(() => page.locator('.route-choice').first().evaluate(card => card.scrollWidth - card.clientWidth)).toBeLessThanOrEqual(1);
});

for (const renderer of ['harness', 'native']) {
  test(`${renderer} river score popups stay open until a stretch is explicitly selected`, async ({ page }) => {
    if (renderer === 'harness') await installMapLibreHarness(page);
    await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
      result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: 2 }, routes: [
        { ...fixture.result, score: 85, readiness: { status: 'ready' }, liveData: { overall: 'live' } },
        { ...fixture.result, score: 74, readiness: { status: 'ready' }, liveData: { overall: 'live' },
          river: { ...fixture.result.river, slug: 'popup-choice', reach: 'Alternate stretch' } },
      ] },
    } }));
    await page.goto('/rivers/by-river/rum-river/');
    await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
    const mapTab = page.locator('[data-group-mobile-view="map"]');
    if (await mapTab.isVisible()) await mapTab.click();
    const marker = page.locator('[data-group-map] .score-map-marker').filter({ hasText: '74' });
    await expect(marker).toHaveAttribute('aria-label', /Alternate stretch: score 74/);
    await marker.click();
    const popup = page.locator('.maplibregl-popup');
    await expect(popup).toBeVisible();
    await expect(popup).toContainText('Alternate stretch');
    await marker.press('Escape');
    await expect(popup).toHaveCount(0);
    await marker.press('Enter');
    await expect(popup).toBeVisible();
    await popup.getByRole('button', { name: 'Select this stretch' }).click();
    await expect(page.locator('[data-group-selected-summary]')).toContainText('Alternate stretch');
    await expect(page.locator('[data-group-route-card][data-route-slug="popup-choice"] [data-group-route-select]')).toBeFocused();
  });
}

test('river line details stay in map view and close with Escape', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 }, routes: [fixture.result] },
  } }));
  await page.goto('/rivers/by-river/rum-river/');
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
  const mapTab = page.locator('[data-group-mobile-view="map"]');
  if (await mapTab.isVisible()) await mapTab.click();
  await page.evaluate(slug => {
    const map = (window as any).__paddleMapInstances.find((map: any) => map.container.hasAttribute('data-group-map'));
    map.getCanvas().tabIndex = 0;
    map.emit('click', { features: [{ properties: { slug } }], lngLat: { lng: -93.1, lat: 45.1 } });
  }, fixture.result.river.slug);
  const popup = page.locator('.maplibregl-popup');
  await expect(popup).toBeVisible();
  await popup.getByRole('link', { name: 'View route' }).focus();
  await page.keyboard.press('Escape');
  await expect(popup).toHaveCount(0);
  await expect(page.locator('[data-group-map] canvas')).toBeFocused();
});

test('geometry arriving during initial loading still fits the first river viewport', async ({ page }) => {
  await installMapLibreHarness(page, { mapReady: false });
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 }, routes: [fixture.result] },
  } }));
  let geometryFinished = false;
  await page.route('**/data/canonical-river-geometries/routes/*.json', async route => {
    await route.fulfill({ status: 404, body: '' });
    geometryFinished = true;
  });
  await page.goto('/rivers/by-river/rum-river/');
  await expect(page.locator('[data-group-map] canvas')).toHaveCount(1);
  await expect.poll(() => geometryFinished).toBe(true);
  // Let the geometry response supersede the still-pending initial map render.
  await page.waitForTimeout(100);
  await page.evaluate(() => {
    (window as any).maplibregl.Map.prototype.loaded = () => true;
    (window as any).maplibregl.Map.prototype.isStyleLoaded = () => true;
    for (const map of (window as any).__paddleMapInstances) map.emit('idle');
  });
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
  expect(await page.evaluate(() => (window as any).__paddleMapHarness.fitCalls.length)).toBeGreaterThan(0);
});

test('late river geometry preserves an open score popup and its marker', async ({ page }) => {
  await installMapLibreHarness(page);
  const result = { ...fixture.result, score: 74, readiness: { status: 'ready' }, liveData: { overall: 'live' } };
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 }, routes: [result] },
  } }));
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/data/canonical-river-geometries/routes/*.json', async route => {
    await pending;
    const river = result.river;
    await route.fulfill({ json: { type: 'Feature', properties: { routeId: river.slug, lateGeometry: true },
      geometry: { type: 'LineString', coordinates: [
        [river.putIn.longitude, river.putIn.latitude], [river.takeOut.longitude, river.takeOut.latitude],
      ] } } });
  });
  await page.goto('/rivers/by-river/rum-river/');
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
  const mapTab = page.locator('[data-group-mobile-view="map"]');
  if (await mapTab.isVisible()) await mapTab.click();
  const marker = page.locator('[data-group-map] .score-map-marker');
  await marker.click();
  await marker.evaluate(node => { (window as any).__retainedScoreMarker = node; });
  release();
  await expect.poll(() => page.evaluate(() => (window as any).__paddleMapInstances
    .find((map: any) => map.container.hasAttribute('data-group-map'))
    ?.getSource('river-group-trip-lines')?.data.features[0]?.properties.lateGeometry)).toBe(true);
  await expect(page.locator('.maplibregl-popup')).toBeVisible();
  expect(await marker.evaluate(node => node === (window as any).__retainedScoreMarker)).toBe(true);
});

test('refresh retries failed river geometry and replaces the fallback line', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 }, routes: [fixture.result] },
  } }));
  let requests = 0;
  const river = fixture.result.river;
  await page.route(`**/data/canonical-river-geometries/routes/${river.slug}.json`, async route => {
    requests++;
    if (requests === 1) { await route.fulfill({ status: 503, json: {} }); return; }
    await route.fulfill({ json: { type: 'Feature', properties: { routeId: river.slug, recoveryCheck: true },
      geometry: { type: 'LineString', coordinates: [
        [river.putIn.longitude, river.putIn.latitude], [river.takeOut.longitude, river.takeOut.latitude],
      ] } } });
  });
  await page.goto('/rivers/by-river/rum-river/');
  await expect.poll(() => requests).toBe(1);
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await page.locator('[data-group-refresh]').click();
  await expect.poll(() => requests).toBe(2);
  await expect.poll(() => page.evaluate(() => (window as any).__paddleMapInstances
    .find((map: any) => map.container.hasAttribute('data-group-map'))
    ?.getSource('river-group-trip-lines')?.data.features[0]?.properties.recoveryCheck)).toBe(true);
});

test('river map score markers exclude withheld measurements', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: {
      group: { riverId: 'rum-river', name: 'Rum River', routeCount: 2 },
      routes: [
        { ...fixture.result, score: 74, readiness: { status: 'ready' }, liveData: { overall: 'live' } },
        { ...fixture.result, score: 88, readiness: { status: 'withheld', reason: 'Current reads unavailable.' },
          river: { ...fixture.result.river, slug: 'withheld-map-route', reach: 'Unavailable readings' } },
      ],
    },
  } }));
  await page.goto('/rivers/by-river/rum-river/');
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
  const scores = page.locator('[data-group-map] .score-map-marker--condition-zone');
  await expect(scores).toHaveCount(1);
  await expect(scores).toHaveText('74');
  await expect(page.locator('[data-group-route-list]')).toContainText('Unavailable readings');
  const unavailableCard = page.locator('[data-group-route-list] .route-choice').filter({ hasText: 'Unavailable readings' });
  await expect(unavailableCard).toContainText('Call unavailable');
  await expect(unavailableCard).not.toContainText('Recommended today');
  await expect(unavailableCard.locator('.route-choice__score-compact strong')).toHaveText('—');
  await unavailableCard.locator('[data-group-route-select]').click();
  await expect(page.locator('[data-group-selected-summary]')).toContainText('Call unavailable');
});

test('a stalled river trip map can retry while route details remain available', async ({ page }) => {
  await installMapLibreHarness(page, { mapReady: false });
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: {
      group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 },
      routes: [{ ...fixture.result, river: { ...fixture.result.river, distanceLabel: '3 mi' } }],
    },
  } }));
  await page.goto('/rivers/by-river/rum-river/');
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'unavailable', { timeout: 12000 });
  const mapTab = page.locator('[data-group-mobile-view="map"]');
  if (await mapTab.isVisible()) await mapTab.click();
  const retry = page.locator('[data-group-map-retry]');
  await expect(retry).toBeVisible();
  await expect(page.locator('[data-group-map]')).toBeHidden();
  expect((await retry.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await page.locator('.river-group-page__map-shell').screenshot({ path: test.info().outputPath('river-trip-map-failed.png') });
  await page.evaluate(() => {
    const runtime = (window as any).maplibregl.Map;
    runtime.prototype.loaded = () => true;
    runtime.prototype.isStyleLoaded = () => true;
  });
  await retry.click();
  await expect(retry).toBeHidden();
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await expect(page.locator('[data-group-map-status]')).toBeFocused();
  await expect(page.locator('[data-group-map] canvas')).toHaveCount(1);
  await expect(page.locator('[data-group-map] .river-route-endpoint')).toHaveCount(2);
});

test('failed river comparisons retain static routes without loading or recommendation claims', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/rivers/by-river/rum-river/');
  const list = page.locator('[data-group-route-list]');
  await expect(list.locator('[data-group-initial-score]').first()).toHaveText('No data');
  await expect(list).not.toContainText('Recommended today');
  await expect(list.locator('.route-choice__details-link').first()).toBeVisible();
  await expect(page.locator('.river-route-picker__toolbar')).toBeHidden();
  await expect(list.locator('[data-group-route-select]').first()).toBeDisabled();
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: {
      group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 },
      routes: [fixture.result],
    },
  } }));
  await page.locator('[data-group-refresh]').click();
  await expect(page.locator('.river-route-picker__toolbar')).toBeVisible();
  await expect(list.locator('[data-group-route-select]').first()).toBeEnabled();
  await expect(list.locator('[data-group-initial-score]')).toHaveCount(0);
});

test('river route cards retain mixed units, ranges, decimals, and open bounds', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  const cases = [
    ['2 hr 30 min to 4 hr', 'About 2.5–4 hr'],
    ['30 to 45 minutes', 'About 30–45 min'],
    ['2.5 hours', 'About 2.5 hr'],
    ['About 8 hr to 10+ hr', 'About 8 hr to 10+ hr'],
  ];
  await page.route('**/api/river-groups/rum-river.json*', (route) => route.fulfill({ json: {
    result: {
      group: { riverId: 'rum-river', name: 'Rum River', routeCount: cases.length, stateSummary: 'Minnesota', regionSummary: 'Central Minnesota' },
      routes: cases.map(([label], index) => ({ ...fixture.result, river: {
        ...fixture.result.river, riverId: 'rum-river', slug: `duration-${index}`,
        name: 'Rum River', reach: `Duration case ${index}`, estimatedPaddleTime: label,
        profile: { difficulty: 'easy' },
      } })),
    },
  } }));
  await page.goto('/rivers/by-river/rum-river/');
  for (const [, expected] of cases) {
    await expect(page.locator('[data-group-route-list] .route-choice__fact').filter({ hasText: expected })).toHaveCount(1);
  }
});

test('filtering out all river routes during map loading leaves no stale markers', async ({ page }) => {
  await installMapLibreHarness(page, { mapReady: false });
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: {
      group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 },
      routes: [{ ...fixture.result, river: { ...fixture.result.river, distanceLabel: '3 mi' } }],
    },
  } }));
  await page.goto('/rivers/by-river/rum-river/');
  await expect(page.locator('[data-group-map] canvas')).toHaveCount(1);
  await page.locator('[data-group-distance-filter="long"]').click();
  await expect(page.locator('[data-group-results-summary]')).toContainText('Showing 0 of 1 trips');
  await page.evaluate(() => {
    (window as any).maplibregl.Map.prototype.loaded = () => true;
    (window as any).maplibregl.Map.prototype.isStyleLoaded = () => true;
    for (const map of (window as any).__paddleMapInstances) map.emit('idle');
  });
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'empty');
  await expect(page.locator('[data-group-map] :is(.river-route-endpoint, .river-route-notice, .score-map-marker)')).toHaveCount(0);
  await page.locator('[data-group-distance-filter="all"]').click();
  await expect(page.locator('[data-group-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await expect(page.locator('[data-group-results-summary]')).toContainText('Showing 1 of 1 trips');
  await expect(page.locator('[data-group-map] .river-route-endpoint')).toHaveCount(2);
});
