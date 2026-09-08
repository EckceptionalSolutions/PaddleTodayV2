import { expect, test } from '@playwright/test';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

test('Weekend distinguishes traced river paths from access connections in the native renderer', async ({ page }) => {
  const rivers = [0, 1].map(index => {
    const river = structuredClone(fixture.result.river);
    river.slug = `weekend-line-test-${index}`;
    river.riverId = river.slug;
    river.longitude += index * 0.25;
    river.putIn.longitude += index * 0.25;
    river.takeOut.longitude += index * 0.25;
    return { river, current: { score: 74, rating: 'Good' },
      weekend: { label: 'This weekend', score: 74, rating: 'Good', confidence: 'High',
        explanation: 'Synthetic map fixture.', summary: 'Synthetic map fixture.', signalLine: '' } };
  });
  await page.routeWebSocket(url => ['localhost', '127.0.0.1'].includes(url.hostname) && url.searchParams.has('token'),
    socket => socket.send(JSON.stringify({ type: 'connected' })));
  await page.addInitScript(() => {
    localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now()));
    let library: any;
    Object.defineProperty(window, 'maplibregl', { configurable: true, get: () => library, set: value => {
      library = value;
      library.Map = new Proxy(value.Map, { construct(target, args) {
        const map = Reflect.construct(target, args);
        (window as any).weekendLineMap = map;
        return map;
      } });
    } });
  });
  await page.route('**/api/weekend/summary.json*', route => route.fulfill({ json: {
    generatedAt: new Date().toISOString(), label: 'This weekend', riverCount: 2, withheldCount: 0, rivers,
  } }));
  await page.route('**/data/canonical-river-geometries/routes/*.json', route => {
    if (!route.request().url().includes('weekend-line-test-0')) return route.fulfill({ status: 404, json: {} });
    const { putIn, takeOut } = rivers[0].river;
    return route.fulfill({ json: { type: 'Feature', properties: { routeId: rivers[0].river.slug },
      geometry: { type: 'LineString', coordinates: [
        [putIn.longitude, putIn.latitude],
        [(putIn.longitude + takeOut.longitude) / 2 + 0.015, (putIn.latitude + takeOut.latitude) / 2],
        [takeOut.longitude, takeOut.latitude],
      ] } } });
  });
  await page.goto('/weekend/');
  const map = page.locator('[data-summary-map]');
  const mapView = page.locator('[data-summary-map-mobile-view="map"]');
  if (await mapView.isVisible()) await mapView.click();
  await map.scrollIntoViewIfNeeded();
  await expect(page.locator('[data-summary-map-status]')).toHaveAttribute('data-map-state', 'ready', { timeout: 15000 });
  await expect.poll(() => page.evaluate(() => {
    const map = (window as any).weekendLineMap;
    return ['weekend-route-spans', 'weekend-route-spans-connections'].map(id =>
      [...new Set(map.queryRenderedFeatures({ layers: [id] }).map((feature: any) => feature.properties.traced))]);
  })).toEqual([[true], [false]]);
  expect(await page.evaluate(() => (window as any).weekendLineMap.getPaintProperty('weekend-route-spans-connections', 'line-dasharray'))).toEqual([2, 2]);
  await expect(page.locator('.weekend-map-line-key')).toBeVisible();
  await page.locator('.summary-map-frame').screenshot({ path: test.info().outputPath('traced-and-fallback-lines.png') });
});
