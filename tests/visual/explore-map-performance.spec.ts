import { expect, test, type Page } from '@playwright/test';
import { installMapLibreHarness, mapHarnessState } from './maplibre-harness';

function fixture() {
  const rivers = Array.from({ length: 105 }, (_, index) => [0, 1].map((reach) => {
    const longitude = index < 100 ? -100 + index * 0.001 : -90 + (index - 100) * 0.1;
    return {
      river: {
        riverId: `performance-river-${index}`, slug: `performance-route-${index}-${reach}`,
        name: `Performance River ${String(index).padStart(3, '0')}`, reach: `Reach ${reach}`,
        state: 'Minnesota', region: 'Central Minnesota', latitude: 45, longitude,
        distanceLabel: '8 mi', estimatedPaddleTime: '3–4 hours', difficulty: reach === 0 ? 'easy' : 'moderate', routeType: 'recreational',
        putIn: { name: 'Launch', latitude: 45 + reach * 0.01, longitude },
        takeOut: { name: 'Landing', latitude: 45 + (reach + 1) * 0.01, longitude: longitude + 0.01 },
      },
      score: index < 100 ? 90 : 80, rating: 'Strong',
      confidence: { score: 86, label: 'High' }, sources: [{ label: 'USGS', tone: 'usgs' }],
      gaugeBandLabel: 'Ideal window', explanation: 'Map performance fixture.',
      liveData: {
        overall: 'live', summary: 'Current reads.', gaugeState: 'live', gaugeDetail: 'Current gauge.',
        weatherState: 'live', weatherDetail: 'Current weather.',
      },
      summary: {
        cardText: 'Stable flow.', shortExplanation: 'Ideal level', rawSignalLine: 'Gauge: 620 cfs',
        gaugeNow: '620 cfs', confidenceText: 'High (86/100)', freshnessText: 'Current',
        primaryFactor: 'Ideal flow', secondaryFactor: 'Official guidance',
      },
      generatedAt: '2026-09-05T12:00:00.000Z',
    };
  })).flat();
  return { requestId: 'explore-performance', generatedAt: '2026-09-05T12:00:00.000Z', riverCount: rivers.length, rivers };
}

async function move(page: Page, zoom: number, bounds = [[-101, 44], [-99, 46]]) {
  await page.evaluate(({ zoom, bounds }) => {
    (window as any).__paddleMapInstances[0].move(zoom, bounds);
  }, { zoom, bounds });
  // Exercise the scheduled idle render, including its 180ms timeout path.
  await page.waitForTimeout(300);
}

test('a late overview moves a single-route badge onto its river without closing its popup', async ({ page }) => {
  const payload = fixture();
  payload.rivers = payload.rivers.slice(0, 1);
  payload.riverCount = 1;
  let release: () => void = () => {};
  const pending = new Promise<void>((resolve) => { release = resolve; });
  const anchor = [-99.997, 45.009];
  await installMapLibreHarness(page);
  await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ json: payload }));
  await page.route('**/data/canonical-river-geometries/routes/*.json', (route) => route.fulfill({ status: 503, body: '' }));
  await page.route('**/data/explore-map-overview.json', async (route) => {
    await pending;
    await route.fulfill({ json: { features: [{
      type: 'Feature', properties: { routeId: payload.rivers[0].river.slug, overview: true, anchor },
      bbox: [-100, 45, -99.99, 45.01], geometry: { type: 'LineString', coordinates: [[-100, 45], anchor, [-99.99, 45.01]] },
    }] } });
  });
  await page.goto('/explore/', { waitUntil: 'domcontentloaded' });
  if ((page.viewportSize()?.width || 1280) < 720) {
    await page.locator('[data-summary-map-mobile-view="map"]').evaluate((node: HTMLButtonElement) => node.click());
  }
  const marker = page.locator('[data-summary-map-marker]');
  await expect(marker).toHaveCount(1);
  await marker.evaluate((node: HTMLButtonElement) => node.click());
  await expect(page.locator('.maplibregl-popup')).toBeVisible();
  release();
  await expect.poll(() => page.evaluate(() => (window as any).__paddleMapInstances[0]
    .getSource('explore-score-points').data.features[0].geometry.coordinates)).toEqual(anchor);
  await expect(page.locator('.maplibregl-popup')).toBeVisible();
});

test('Explore culls offscreen routes, progressively loads detail and reuses map-drawn scores', async ({ page }) => {
  const payload = fixture();
  const errors: string[] = [];
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  page.on('pageerror', (error) => errors.push(error.message));
  await installMapLibreHarness(page);
  await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ json: payload }));
  await page.route('**/data/explore-map-overview.json', (route) => route.fulfill({
    json: {
      type: 'FeatureCollection',
      features: payload.rivers.map(({ river }) => ({
        type: 'Feature', bbox: [river.longitude, 45, river.longitude + 0.01, 45.02],
        properties: { routeId: river.slug, overview: true, anchor: [river.longitude + 0.005, 45.01] },
        geometry: { type: 'LineString', coordinates: [
          [river.putIn.longitude, river.putIn.latitude], [river.takeOut.longitude, river.takeOut.latitude],
        ] },
      })),
    },
  }));
  await page.route('**/data/canonical-river-geometries/routes/*.json', (route) => {
    const slug = new URL(route.request().url()).pathname.split('/').at(-1)?.replace('.json', '');
    const river = payload.rivers.find((item) => item.river.slug === slug)?.river;
    return route.fulfill({ json: { type: 'Feature', properties: { routeId: slug }, geometry: {
      type: 'LineString', coordinates: [[river!.putIn.longitude, river!.putIn.latitude], [river!.takeOut.longitude, river!.takeOut.latitude]],
    } } });
  });
  await page.goto('/explore/');
  if ((page.viewportSize()?.width || 1280) < 720) {
    await page.locator('[data-summary-map-mobile-view="map"]').evaluate((node: HTMLButtonElement) => node.click());
  }
  await page.locator('[data-explore-preset="all-routes"]').click();
  const rows = page.locator('[data-summary-map-item]');
  const markers = page.locator('[data-summary-map] [data-summary-map-zone-key]');
  await expect(rows).toHaveCount(100);
  await expect(markers).toHaveCount(100);
  expect(requests.some((url) => url.includes('/canonical-river-geometries/'))).toBe(false);
  await move(page, 7);
  await markers.first().evaluate((node: HTMLButtonElement) => node.click());
  await expect(page.locator('.maplibregl-popup')).toBeVisible();
  await page.waitForTimeout(300);

  await page.evaluate(() => {
    (window as any).__retainedRow = document.querySelector('[data-summary-map-item]');
    (window as any).__retainedMarker = document.querySelector('[data-summary-map-zone-key]');
  });
  const before = await mapHarnessState(page);
  for (const zoom of [7.2, 7.6, 7.9]) await move(page, zoom);
  await page.evaluate(() => (window as any).__paddleMapInstances[0].emit('styledata'));
  const after = await mapHarnessState(page);
  expect(after.markersCreated).toBe(before.markersCreated);
  expect(after.markersAdded).toBe(before.markersAdded);
  expect(after.markersRemoved).toBe(before.markersRemoved);
  expect(after.sourceUpdates).toEqual(before.sourceUpdates);
  await expect(page.locator('.maplibregl-popup')).toBeVisible();
  expect(await page.evaluate(() =>
    (window as any).__retainedRow === document.querySelector('[data-summary-map-item]')
    && (window as any).__retainedMarker === document.querySelector('[data-summary-map-zone-key]')
  )).toBe(true);

  await move(page, 8.6);
  await expect(markers).toHaveCount(200);
  const detailed = await mapHarnessState(page);
  expect(detailed.markersCreated).toBe(0);
  expect(await page.evaluate(() => (window as any).__paddleMapInstances[0]
    .getSource('explore-score-points').data.features.length)).toBe(200);
  await move(page, 7.9);
  await expect(markers).toHaveCount(100);
  expect((await mapHarnessState(page)).markersCreated).toBe(detailed.markersCreated);
  expect(await page.evaluate(() => (window as any).__retainedMarker.isConnected)).toBe(true);

  await move(page, 7.9, [[-90.05, 44.9], [-89.95, 45.1]]);
  await expect(rows).toHaveCount(1);
  await expect(markers).toHaveCount(1);
  expect(await page.evaluate(() => (window as any).__retainedMarker.isConnected)).toBe(false);
  await move(page, 7.9);
  await expect(markers).toHaveCount(100);
  expect((await mapHarnessState(page)).markersCreated).toBe(0);

  // Refreshing the same route keys must still replace stale score/popup records.
  for (const route of payload.rivers) route.score = 95;
  await page.locator('[data-board-refresh]').click();
  await expect(markers.first()).toHaveText('95');
  await markers.first().evaluate((node: HTMLButtonElement) => node.click());
  await expect(page.locator('.maplibregl-popup')).toContainText('95');
  await page.locator('.maplibregl-popup-close-button').click();
  await page.evaluate(() => {
    const map = (window as any).__paddleMapInstances[0];
    map.emit('click', { features: [map.getSource('explore-score-points').data.features[0]] });
  });
  await expect(page.locator('.maplibregl-popup')).toContainText('95');
  await page.locator('.maplibregl-popup-close-button').click();
  await markers.first().press('Enter');
  await expect(page.locator('.maplibregl-popup')).toContainText('95');

  // Smaller filtered sets use canonical GeoJSON instead of the overview waterway layer.
  await page.locator('[data-filter-search]').fill('Performance River 000');
  await expect(rows).toHaveCount(1);
  await expect(markers).toHaveCount(1);
  const sourceState = await mapHarnessState(page);
  await page.evaluate(() => (window as any).__paddleMapInstances[0].emit('styledata'));
  expect((await mapHarnessState(page)).sourceUpdates).toEqual(sourceState.sourceUpdates);
  await page.evaluate(() => {
    const map = (window as any).__paddleMapInstances[0];
    map.layers.clear();
    map.sources.delete('summary-supported-rivers-canonical');
    map.sources.delete('summary-river-labels');
    map.emit('styledata');
  });
  expect(await page.evaluate(() => {
    const map = (window as any).__paddleMapInstances[0];
    return map.getSource('summary-supported-rivers-canonical')?.data.features.length;
  })).toBe(2);
  const advanced = page.locator('[data-explore-advanced]');
  if (await advanced.getAttribute('open') === null) await advanced.locator('summary').click();
  await page.locator('[data-filter-difficulty]').selectOption('easy');
  await expect.poll(() => page.evaluate(() =>
    (window as any).__paddleMapInstances[0].getSource('summary-river-labels')?.data.features[0]?.properties.routeCount
  )).toBe(1);
  expect(await page.evaluate(() =>
    (window as any).__paddleMapInstances[0].getSource('summary-supported-rivers-canonical')?.data.features.length
  )).toBe(1);
  await page.locator('[data-filter-difficulty]').selectOption('');
  await expect.poll(() => page.evaluate(() =>
    (window as any).__paddleMapInstances[0].getSource('summary-supported-rivers-canonical')?.data.features.length
  )).toBe(2);
  await page.locator('[data-explore-reset]').click();
  await expect(rows).toHaveCount(100);
  await expect(markers).toHaveCount(100);
  expect(await page.evaluate(() =>
    (window as any).__paddleMapInstances[0].getLayer('summary-supported-rivers')?.source
  )).toBe('summary-supported-rivers-canonical');
  expect(requests.some((url) => url.includes('/canonical-river-geometries/states/'))).toBe(false);
  expect(errors).toEqual([]);
});
