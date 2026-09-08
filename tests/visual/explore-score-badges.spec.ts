import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

// Use the real renderer: the fake map cannot exercise symbol collision placement.
for (const fontsUnavailable of [false, true]) {
test(`score badges remain legible and selectable ${fontsUnavailable ? 'without remote fonts' : 'with available fonts'}`, async ({ page }) => {
  if (fontsUnavailable) await page.route('**/fonts/**', route => route.fulfill({ status: 503, body: 'Font service unavailable' }));
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/__badge-test/*.js', async (route) => {
    const filename = new URL(route.request().url()).pathname.split('/').at(-1)!;
    await route.fulfill({ contentType: 'text/javascript', body: await readFile(`src/scripts/${filename}`, 'utf8') });
  });
  await page.route('**/__badge-test.html', (route) => route.fulfill({ contentType: 'text/html', body: `
    <html><head><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.css"></head>
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
      element.className = ['score-map-marker--good', 'score-map-marker--marginal', 'score-map-marker--great'][index];
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
  const scorePoint = await page.evaluate(() => (window as any).badgeTest.map.project([-93, 45]));
  await expect.poll(async () => {
    const data = await sharp(await page.locator('#map').screenshot({ scale: 'css' }))
      .extract({ left: Math.round(scorePoint.x) - 9, top: Math.round(scorePoint.y) - 7, width: 18, height: 14 })
      .removeAlpha().raw().toBuffer();
    let white = 0;
    for (let i = 0; i < data.length; i += 3) if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) white++;
    return white;
  }).toBeGreaterThan(12);
  const badgePixels = async () => sharp(await page.locator('#map').screenshot({ scale: 'css' }))
    .extract({ left: Math.round(scorePoint.x) - 12, top: Math.round(scorePoint.y) - 9, width: 24, height: 18 })
    .removeAlpha().raw().toBuffer();
  const originalScore = await badgePixels();
  await page.evaluate(() => {
    const { markers, scores } = (window as any).badgeTest;
    markers[0].getElement().textContent = '100';
    scores.sync();
  });
  await expect.poll(async () => !(await badgePixels()).equals(originalScore)).toBe(true);
  await expect.poll(() => page.evaluate(() => {
    const features = (window as any).badgeTest.map.queryRenderedFeatures({ layers: ['explore-score-points'] });
    return [...new Map(features.map((feature: any) => [feature.id, feature.properties.color])).entries()].sort();
  })).toEqual([[1, '#1c7770'], [3, '#277b4b']]);
  const colors = await page.evaluate(() => [...new Set<string>((window as any).badgeTest.map
    .querySourceFeatures('explore-score-points').map((feature: any) => feature.properties.color))]);
  expect(colors).toHaveLength(3);
  for (const color of colors) {
    const [r, g, b] = color.slice(1).match(/../g)!.map(part => parseInt(part, 16) / 255)
      .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    expect(1.05 / (0.2126 * r + 0.7152 * g + 0.0722 * b + 0.05)).toBeGreaterThanOrEqual(4.5);
  }
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
      .some((feature: any) => feature.id === 2 && feature.properties.color === '#966220');
  })).toBe(true);
  await page.screenshot({ path: test.info().outputPath('crowded-route-dot.png') });
  // Touch users can land within a 44px target around a small visible dot.
  const dotPoint = await page.evaluate(() => (window as any).badgeTest.map.project([-92.92, 45]));
  if (test.info().project.use.isMobile) await page.touchscreen.tap(dotPoint.x + 18, dotPoint.y);
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
  await page.evaluate(() => {
    const { map, scores, markers } = (window as any).badgeTest;
    markers[0].togglePopup();
    scores.destroy();
    map.remove();
    scores.sync();
  });
  await expect(page.getByRole('group', { name: 'Map route scores' })).toHaveCount(0);
  expect(errors).toEqual([]);
});

}
