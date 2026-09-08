import { expect, test } from '@playwright/test';

for (const sourceKind of ['vector', 'geojson']) {
  test(`native ${sourceKind} map labels recover from a temporary font failure`, async ({ page }) => {
    let failedUrl = '';
    let recovered = false;
    page.on('response', response => { if (response.url() === failedUrl && response.ok()) recovered = true; });
    await page.route('**/fonts/**', route => {
      if (!failedUrl) {
        failedUrl = route.request().url();
        return route.fulfill({ status: 503, body: 'Temporary font outage' });
      }
      return route.continue();
    });
    await page.route('**/__map-font-recovery', route => route.fulfill({ contentType: 'text/html', body:
      '<meta name="viewport" content="width=device-width,initial-scale=1"><div id="map" style="width:min(600px,100vw);height:400px"></div>' }));
    await page.goto('/__map-font-recovery');
    await page.evaluate(async sourceKind => {
      const url = '/src/scripts/map-runtime.js';
      const { ensureMapLibre, createPaddleMap, createMapMarker } = await import(/* @vite-ignore */ url);
      const lib = await ensureMapLibre();
      const style = sourceKind === 'geojson' ? { version: 8,
        glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf', sources: {},
        layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#e8eef1' } }] } : undefined;
      const map = createPaddleMap(lib, { container: 'map', center: [-93, 45], zoom: 8, ...(style ? { style } : {}) });
      (window as any).fontRecoveryMap = map;
      await new Promise(resolve => map.once('load', resolve));
      map.addSource('reference', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-93, 45] } } });
      map.addLayer({ id: 'reference', type: 'circle', source: 'reference', paint: { 'circle-radius': 5, 'circle-color': '#226e8c' } });
      (window as any).referenceSource = map.getSource('reference');
      if (sourceKind === 'geojson') {
        map.addSource('labels', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-93.1, 45.1] } } });
        map.addLayer({ id: 'labels', type: 'symbol', source: 'labels', layout: { 'text-field': 'Reference point', 'text-font': ['Noto Sans Regular'] } });
      }
      const button = document.createElement('button');
      button.textContent = 'Selected route';
      button.setAttribute('aria-label', 'Selected route');
      button.setAttribute('aria-pressed', 'true');
      createMapMarker({ maplibregl: lib, mapRuntime: map, element: button, point: { longitude: -93, latitude: 45 } });
    }, sourceKind);
    await expect.poll(() => failedUrl).not.toBe('');
    await expect.poll(() => recovered, { timeout: 15000 }).toBe(true);
    await expect.poll(() => page.evaluate(sourceKind => {
      const map = (window as any).fontRecoveryMap;
      return map.queryRenderedFeatures().some((feature: any) => feature.source === (sourceKind === 'vector' ? 'openmaptiles' : 'labels'));
    }, sourceKind)).toBe(true);
    expect(await page.evaluate(() => {
      const map = (window as any).fontRecoveryMap;
      return { sameReference: map.getSource('reference') === (window as any).referenceSource, layer: Boolean(map.getLayer('reference')), center: map.getCenter(), zoom: map.getZoom() };
    })).toEqual({ sameReference: true, layer: true, center: { lng: -93, lat: 45 }, zoom: 8 });
    await expect(page.getByRole('button', { name: 'Selected route' })).toHaveAttribute('aria-pressed', 'true');
  });
}
