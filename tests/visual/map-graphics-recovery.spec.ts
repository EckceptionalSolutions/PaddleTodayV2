import { expect, test } from '@playwright/test';
import sharp from 'sharp';

test('native maps repaint route lines and score badges after graphics recovery', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/__map-context', route => route.fulfill({ contentType: 'text/html', body:
    '<meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles/map-markers.css"><style>body{margin:0}</style><div id="map" style="width:100vw;height:400px"></div>' }));
  await page.goto('/__map-context');
  await page.evaluate(async () => {
    const runtimeUrl = '/src/scripts/map-runtime.js';
    const scoreUrl = '/src/scripts/explore-score-layer.js';
    const { ensureMapLibre, createPaddleMap, syncGeoJsonOverlay } = await import(/* @vite-ignore */ runtimeUrl);
    const { createExploreScoreLayer } = await import(/* @vite-ignore */ scoreUrl);
    const lib = await ensureMapLibre();
    const map = createPaddleMap(lib, { container: 'map', center: [-93, 45], zoom: 8, fadeDuration: 0,
      style: { version: 8, glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf', sources: {},
        layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#e8eef1' } }] } });
    await new Promise(resolve => map.once('load', resolve));
    syncGeoJsonOverlay(map, { sourceId: 'route-reference', data: { type: 'FeatureCollection', features: [{
      type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[-93.1, 45.02], [-92.9, 45.02]] },
    }] }, layers: [{ id: 'route-reference', type: 'line', paint: { 'line-color': '#226e8c', 'line-width': 5 } }] });
    const scores = createExploreScoreLayer(map);
    const button = document.createElement('button');
    button.textContent = '87';
    button.className = 'score-map-marker--good score-map-marker--selected';
    button.setAttribute('aria-label', 'Selected route');
    const marker = new scores.Marker({ element: button }).setLngLat([-93, 45]).setPopup(new lib.Popup().setText('Selected route details')).addTo(map);
    marker.togglePopup();
    scores.sync();
    const gl = map.getCanvas().getContext('webgl2') || map.getCanvas().getContext('webgl');
    Object.assign(window, { graphicsTest: { map, marker, extension: gl.getExtension('WEBGL_lose_context'), lost: 0, restored: 0 } });
    map.on('webglcontextlost', () => (window as any).graphicsTest.lost++);
    map.on('webglcontextrestored', () => {
      const revision = ++(window as any).graphicsTest.restored;
      scores.sync();
      syncGeoJsonOverlay(map, { sourceId: 'route-reference', data: { type: 'FeatureCollection', features: [{
        type: 'Feature', properties: { revision }, geometry: { type: 'LineString', coordinates: [[-93.1, 45.02], [-92.9, 45.02]] },
      }] }, updateLayerStyle: true, layers: [{ id: 'route-reference', type: 'line',
        filter: ['==', ['get', 'revision'], revision],
        paint: { 'line-color': revision === 1 ? '#ad752c' : '#2c8a54', 'line-width': 7 },
      }] });
    });
  });
  const painted = async () => {
    return [...await sharp(await page.locator('#map').screenshot())
      .extract({ left: 20, top: 60, width: 1, height: 1 })
      .removeAlpha().raw().toBuffer()];
  };
  await expect.poll(painted).toEqual([232, 238, 241]);
  for (let cycle = 1; cycle <= 2; cycle++) {
    await page.evaluate(() => (window as any).graphicsTest.extension.loseContext());
    await expect.poll(() => page.evaluate(() => (window as any).graphicsTest.lost)).toBe(cycle);
    await page.evaluate(() => (window as any).graphicsTest.map.fire('idle'));
    await expect(page.locator('.map-graphics-status')).toHaveText('Restoring map display…');
    if (cycle === 1) await page.locator('#map').screenshot({ path: test.info().outputPath('graphics-recovery-status.png') });
    await page.evaluate(() => (window as any).graphicsTest.extension.restoreContext());
    await expect.poll(() => page.evaluate(() => (window as any).graphicsTest.restored)).toBe(cycle);
    await expect.poll(painted).toEqual([232, 238, 241]);
    await expect(page.locator('.map-graphics-status')).toBeEmpty();
    await expect.poll(() => page.evaluate(() => (window as any).graphicsTest.map.getStyle().sources['route-reference'].data.features[0].properties.revision)).toBe(cycle);
    expect(await page.evaluate(() => {
      const map = (window as any).graphicsTest.map;
      return { color: map.getPaintProperty('route-reference', 'line-color'), width: map.getPaintProperty('route-reference', 'line-width'), filter: map.getFilter('route-reference') };
    })).toEqual({ color: cycle === 1 ? '#ad752c' : '#2c8a54', width: 7, filter: ['==', ['get', 'revision'], cycle] });
    await expect.poll(() => page.evaluate(() => {
      const { map } = (window as any).graphicsTest;
      return map.queryRenderedFeatures({ layers: ['explore-score-points', 'route-reference'] }).map((feature: any) => feature.layer.id);
    })).toEqual(expect.arrayContaining(['explore-score-points', 'route-reference']));
    expect(await page.evaluate(() => {
      const { map, marker } = (window as any).graphicsTest;
      return { center: map.getCenter(), zoom: map.getZoom(), selected: marker.getElement().classList.contains('score-map-marker--selected'), connected: marker.getElement().isConnected, popupOpen: marker.getPopup().isOpen() };
    })).toEqual({ center: { lng: -93, lat: 45 }, zoom: 8, selected: true, connected: true, popupOpen: true });
  }
  expect(errors).toEqual([]);
});
