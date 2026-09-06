import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

// Use the real renderer: the fake map cannot exercise symbol collision placement.
test('score badges avoid collisions, prioritize selection and stay above late route layers', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/__badge-test/*.js', async (route) => {
    const filename = new URL(route.request().url()).pathname.split('/').at(-1)!;
    await route.fulfill({ contentType: 'text/javascript', body: await readFile(`src/scripts/${filename}`, 'utf8') });
  });
  await page.route('**/__badge-test.html', (route) => route.fulfill({ contentType: 'text/html', body: `
    <html><head><link rel="stylesheet" href="https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.css"></head>
    <body style="margin:0"><div id="map" style="width:100vw;height:600px"></div></body></html>` }));
  await page.goto('/__badge-test.html');
  await page.addScriptTag({ url: 'https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.js' });
  await page.evaluate(async () => {
    const moduleUrl = '/__badge-test/explore-score-layer.js';
    const { createExploreScoreLayer } = await import(/* @vite-ignore */ moduleUrl);
    const lib = (window as any).maplibregl;
    const style = { version: 8, glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
      sources: {}, layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#e8eef1' } }] };
    const map = new lib.Map({ container: 'map', style, center: [-93, 45], zoom: 8, fadeDuration: 0 });
    map.on('error', (event: any) => { throw event.error; });
    await new Promise((resolve) => map.once('load', resolve));
    const scores = createExploreScoreLayer(map);
    const markers = [-93, -92.999, -92.7].map((lng, index) => {
      const element = document.createElement('button');
      element.textContent = ['76', '45', '98'][index];
      element.setAttribute('aria-label', `Route ${index + 1}`);
      const marker = new scores.Marker({ element }).setLngLat([lng, 45])
        .setPopup(new lib.Popup().setText(`Route ${index + 1}`)).addTo(map);
      return marker;
    });
    scores.sync();
    Object.assign(window, { badgeTest: { map, scores, markers, style } });
  });
  const visible = () => page.evaluate(() => [...new Set((window as any).badgeTest.map
    .queryRenderedFeatures({ layers: ['explore-score-points'] }).map((feature: any) => feature.id))].sort());
  await expect.poll(visible).toEqual([1, 3]);
  await page.evaluate(() => {
    const { scores, markers } = (window as any).badgeTest;
    markers[0].getElement().classList.add('score-map-marker--selected');
    scores.sync();
  });
  // Keyboard focus can reveal an alternative even when a neighboring route is selected.
  await page.getByRole('button', { name: 'Route 2', exact: true }).focus();
  await expect.poll(visible).toEqual([2, 3]);
  await page.getByRole('button', { name: 'Route 2', exact: true }).press('Enter');
  await expect(page.locator('.maplibregl-popup')).toContainText('Route 2');
  await page.evaluate(() => {
    const { map, scores, markers } = (window as any).badgeTest;
    markers[0].getElement().classList.remove('score-map-marker--selected');
    markers[1].getElement().classList.add('score-map-marker--selected');
    markers[1].getPopup().remove();
    scores.sync();
    map.addSource('selected-route', { type: 'geojson', data: { type: 'Feature', properties: {},
      geometry: { type: 'LineString', coordinates: [[-94, 45], [-92, 45]] } } });
    map.addLayer({ id: 'selected-route', type: 'line', source: 'selected-route',
      paint: { 'line-color': '#2563eb', 'line-width': 12 } });
  });
  await expect.poll(() => page.evaluate(() => (window as any).badgeTest.map.getLayersOrder().at(-1)))
    .toBe('explore-score-points');
  await expect.poll(visible).toEqual([2, 3]);
  await page.screenshot({ path: test.info().outputPath('badges-above-route.png') });
  const point = await page.evaluate(() => (window as any).badgeTest.map.project([-92.999, 45]));
  await page.mouse.click(point.x, point.y);
  await expect(page.locator('.maplibregl-popup')).toContainText('Route 2');
  // Reloading the style removes both sprites and layers. Unchanged scores must restore both.
  await page.evaluate(async () => {
    const { map, scores, style } = (window as any).badgeTest;
    map.setStyle(style, { diff: false });
    await new Promise((resolve) => map.once('style.load', resolve));
    scores.sync();
  });
  await expect.poll(visible).toEqual([2, 3]);
  // Leave enough room for a dot, but not two full badges. Keep all three
  // routes onscreen at both zooms on desktop and mobile.
  await page.evaluate(() => {
    const { map, scores, markers } = (window as any).badgeTest;
    markers[1].getPopup().remove();
    for (const marker of markers) {
      marker.getElement().classList.remove('score-map-marker--selected');
      marker.getElement().blur();
    }
    markers[1].setLngLat([-92.92, 45]);
    markers[1].getElement().classList.add('score-map-marker--marginal');
    markers[2].setLngLat([-93.15, 45]);
    map.jumpTo({ center: [-93, 45], zoom: 8 });
    scores.sync();
  });
  await expect.poll(visible).toEqual([1, 3]);
  await expect.poll(() => page.evaluate(() => {
    const { map } = (window as any).badgeTest;
    const point = map.project([-92.92, 45]);
    return map.queryRenderedFeatures(point, { layers: ['explore-score-points-dots'] })
      .some((feature: any) => feature.id === 2 && feature.properties.color === '#ad752c');
  })).toBe(true);
  await page.screenshot({ path: test.info().outputPath('crowded-route-dot.png') });
  // Use an actual touch on mobile, slightly outside the tiny visible dot.
  const dotPoint = await page.evaluate(() => (window as any).badgeTest.map.project([-92.92, 45]));
  if (test.info().project.use.isMobile) await page.touchscreen.tap(dotPoint.x + 7, dotPoint.y);
  else await page.mouse.click(dotPoint.x + 7, dotPoint.y);
  await expect(page.locator('.maplibregl-popup')).toContainText('Route 2');
  await expect.poll(visible).toContain(2);
  await page.evaluate(() => {
    const { map, scores, markers } = (window as any).badgeTest;
    markers[1].getPopup().remove();
    scores.sync();
    map.jumpTo({ zoom: 9 });
  });
  await expect.poll(visible).toEqual([1, 2, 3]);
  expect(errors).toEqual([]);
});
