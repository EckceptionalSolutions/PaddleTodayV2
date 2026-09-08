import { expect, test } from '@playwright/test';

for (const failure of ['offline', 'temporary server failure']) {
test(`native maps recover from ${failure} without replacing route overlays`, async ({ page, context }) => {
  const returnedTiles = new Set<string>();
  let reconnecting = false;
  page.on('response', response => {
    if (reconnecting && response.ok() && /\/10\/\d+\/\d+\.pbf/.test(response.url())) returnedTiles.add(response.url());
  });
  if (failure === 'temporary server failure') {
    const failedOnce = new Set<string>();
    await page.route('**/planet/**', route => {
      const url = route.request().url();
      if (/\/10\/\d+\/\d+\.pbf/.test(url) && !failedOnce.has(url)) {
        failedOnce.add(url);
        return route.fulfill({ status: 503, body: 'Temporary tile failure' });
      }
      return route.continue();
    });
  }
  await page.route('**/__map-online' , route => route.fulfill({ contentType: 'text/html', body: `
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <div id="map" style="width:min(600px,100vw);height:360px"></div>` }));
  await page.goto('/__map-online');
  await page.evaluate(async () => {
    const url = '/src/scripts/map-runtime.js';
    const { ensureMapLibre, createPaddleMap, createMapMarker } = await import(/* @vite-ignore */ url);
    const lib = await ensureMapLibre();
    const map = createPaddleMap(lib, { container: 'map', center: [-93.6, 45.7], zoom: 8.5 });
    (window as any).reconnectMap = map;
    (window as any).offlineTileUrls = new Set<string>();
    map.on('error', (event: any) => {
      if (navigator.onLine && event.error?.status !== 503) return;
      const url = event.error?.message?.match(/https?:\/\/[^\s)]+\.pbf/)?.[0];
      if (url && /\/10\/\d+\/\d+\.pbf/.test(url)) (window as any).offlineTileUrls.add(url);
    });
    await new Promise(resolve => map.once('load', resolve));
    map.addSource('route-reference', { type: 'geojson', data: { type: 'FeatureCollection', features: [{
      type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[-91.41, 47.5], [-91.39, 47.5]] },
    }] } });
    map.addLayer({ id: 'route-reference', type: 'line', source: 'route-reference', paint: { 'line-color': '#226e8c', 'line-width': 4 } });
    (window as any).routeReference = map.getSource('route-reference');
    const button = document.createElement('button');
    button.textContent = '87';
    button.setAttribute('aria-pressed', 'true');
    (window as any).routeMarker = button;
    createMapMarker({ maplibregl: lib, mapRuntime: map, element: button, point: { longitude: -91.4, latitude: 47.5 } });
  });
  try {
    if (failure === 'offline') await context.setOffline(true);
    await page.evaluate(() => (window as any).reconnectMap.jumpTo({ center: [-91.4, 47.5], zoom: 10 }));
    await expect.poll(() => page.evaluate(() => (window as any).offlineTileUrls.size)).toBeGreaterThan(0);
    // Allow all visible detailed tiles to report their failures.
    await page.waitForTimeout(500);
    const failedTiles: string[] = await page.evaluate(() => [...(window as any).offlineTileUrls]);
    reconnecting = true;
    await context.setOffline(false);
    await expect.poll(() => failedTiles.every(url => returnedTiles.has(url)), { timeout: 15000 }).toBe(true);
    await expect.poll(() => page.evaluate(() => (window as any).reconnectMap.loaded())).toBe(true);
    const state = await page.evaluate(() => {
      const map = (window as any).reconnectMap;
      return {
        center: map.getCenter(), zoom: map.getZoom(),
        sameRouteSource: map.getSource('route-reference') === (window as any).routeReference,
        routeLayer: Boolean(map.getLayer('route-reference')),
        markerConnected: (window as any).routeMarker.isConnected,
        markerSelected: (window as any).routeMarker.getAttribute('aria-pressed'),
      };
    });
    expect(state).toEqual({ center: { lng: -91.4, lat: 47.5 }, zoom: 10,
      sameRouteSource: true, routeLayer: true, markerConnected: true, markerSelected: 'true' });
  } finally {
    await context.setOffline(false);
  }
});
}
