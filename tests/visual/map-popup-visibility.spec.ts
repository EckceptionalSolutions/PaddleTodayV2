import { expect, test } from '@playwright/test';

for (const placement of ['short', 'partly visible', 'reserved footer', 'narrow', 'larger text']) {
  test(`long popup actions remain reachable in a ${placement} map`, async ({ page }) => {
    await page.route('**/__short-map', route => route.fulfill({ contentType: 'text/html', body: `
      <meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/global.css"><div id="map" style="width:min(700px,100vw);height:420px"></div>` }));
    await page.goto('/__short-map');
    await page.evaluate(async () => {
      const url = '/src/scripts/map-runtime.js';
      const { ensureMapLibre, createMapMarker } = await import(/* @vite-ignore */ url);
      const lib = await ensureMapLibre();
      const map = new lib.Map({ container: 'map', center: [-93, 45], zoom: 8,
        style: { version: 8, sources: {}, layers: [] } });
      (window as any).shortPopupMap = map;
      await new Promise(resolve => map.once('load', resolve));
      const button = document.createElement('button');
      button.textContent = 'IN';
      const marker = createMapMarker({ maplibregl: lib, mapRuntime: map, element: button,
        point: { longitude: -93, latitude: 45 }, bindPopup: true,
        popupHtml: `<article class="score-map-popup"><p class="score-map-popup__state">Put-in | Minnesota</p>
          <h3>Mississippi River public access at the regional park landing</h3>
          <p class="score-map-popup__reach">Mississippi River | Regional park to the downstream public landing and boat launch</p>
          <p class="score-map-popup__summary">Access reference only. Confirm parking and access rules before you launch. Review the route page for current information about this landing.</p>
          <a class="score-map-popup__link score-map-popup__link--button" href="/">View route</a></article>` });
      marker.togglePopup();
    });
    await page.waitForTimeout(350);
    await page.evaluate((placement) => {
      const container = document.getElementById('map')!;
      if (placement === 'short' || placement === 'narrow') container.style.height = '250px';
      else if (placement === 'reserved footer') {
        document.documentElement.style.scrollPaddingBottom = '180px';
        container.style.marginTop = `${innerHeight - 430}px`;
      }
      else container.style.marginTop = `${innerHeight - 250}px`;
      if (placement === 'narrow') container.style.width = '220px';
      if (placement === 'larger text') {
        document.documentElement.style.fontSize = '200%';
        container.style.width = '320px';
        container.style.marginTop = '0';
      }
      (window as any).shortPopupMap.resize();
    }, placement);
    await expect.poll(() => page.evaluate(() => {
      const map = document.getElementById('map')!.getBoundingClientRect();
      const popup = document.querySelector('.maplibregl-popup')!.getBoundingClientRect();
      const bottomInset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingBottom) || 0;
      return popup.top >= Math.max(map.top, 0) && popup.bottom <= Math.min(map.bottom, innerHeight - bottomInset)
        && popup.left >= map.left + 19 && popup.right <= map.right - 19;
    })).toBe(true);
    await expect.poll(() => page.locator('.maplibregl-popup-content').evaluate(element =>
      element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
    await expect(page.locator('.score-map-popup h3')).toBeInViewport({ ratio: 0.95 });
    const action = page.getByRole('link', { name: 'View route', exact: true });
    await action.focus();
    const box = (await action.boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(0);
    const bottom = placement === 'short' || placement === 'narrow' ? 250 : await page.evaluate(() => innerHeight
      - (Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingBottom) || 0));
    expect(box.y + box.height).toBeLessThanOrEqual(bottom);
    const close = page.locator('.maplibregl-popup-close-button');
    const closeBox = (await close.boundingBox())!;
    expect(closeBox.y).toBeGreaterThanOrEqual(0);
    expect(closeBox.y + closeBox.height).toBeLessThanOrEqual(bottom);
    await page.locator('#map').screenshot({ path: test.info().outputPath('short-map-popup.png') });
    await close.click();
    await expect(page.locator('.maplibregl-popup')).toHaveCount(0);
  });
}

test('an edge popup pans just far enough to keep its content inside the map', async ({ page }) => {
  await page.route('**/__popup-visibility', route => route.fulfill({ contentType: 'text/html', body: `
    <html><head><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/global.css"></head>
    <body style="margin:0"><div id="map" style="width:min(800px,100vw);height:420px;margin-top:20px"></div></body></html>` }));
  await page.goto('/__popup-visibility');
  await page.evaluate(async () => {
    const moduleUrl = '/src/scripts/map-runtime.js';
    const { ensureMapLibre, bindMarkerPopup } = await import(/* @vite-ignore */ moduleUrl);
    const lib = await ensureMapLibre();
    const map = new lib.Map({ container: 'map', center: [-93, 45], zoom: 8, fadeDuration: 0,
      style: { version: 8, sources: {}, layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#e8eef1' } }] } });
    await new Promise(resolve => map.once('load', resolve));
    const button = document.createElement('button');
    button.textContent = '87';
    button.className = 'score-map-marker score-map-marker--great';
    button.setAttribute('aria-label', 'Edge route');
    const marker = new lib.Marker({ element: button }).setLngLat(map.unproject([30, 60]))
      .setPopup(new lib.Popup({ anchor: 'bottom', offset: 18, maxWidth: '240px' }).setHTML(`
        <article class="score-map-popup"><p class="score-map-popup__state">Minnesota</p><h3>Edge route</h3>
        <p class="score-map-popup__summary">Check the route details and landing information before planning your paddle.</p>
        <a class="score-map-popup__link score-map-popup__link--button" href="/">View route</a></article>`)).addTo(map);
    bindMarkerPopup(marker, button, { map });
    marker.togglePopup();
    const popupRect = marker.getPopup().getElement().getBoundingClientRect();
    const mapRect = map.getContainer().getBoundingClientRect();
    (window as any).popupVisibility = { map, marker, initialPoint: map.project(marker.getLngLat()),
      horizontalOverflow: Math.max(0, mapRect.left + 20 - popupRect.left),
      verticalOverflow: Math.max(0, mapRect.top + 20 - popupRect.top) };
  });
  await expect.poll(() => page.evaluate(() => {
    const map = document.getElementById('map')!.getBoundingClientRect();
    const popup = document.querySelector('.maplibregl-popup')!.getBoundingClientRect();
    return popup.left >= map.left + 18 && popup.top >= map.top + 18
      && popup.right <= map.right - 18 && popup.bottom <= map.bottom - 18;
  })).toBe(true);
  await page.waitForTimeout(600);
  const movement = await page.evaluate(() => {
    const { map, marker, initialPoint, horizontalOverflow, verticalOverflow } = (window as any).popupVisibility;
    const point = map.project(marker.getLngLat());
    return { x: point.x - initialPoint.x, y: point.y - initialPoint.y, horizontalOverflow, verticalOverflow };
  });
  expect(movement.x).toBeLessThanOrEqual(movement.horizontalOverflow + 3);
  expect(movement.y).toBeLessThanOrEqual(movement.verticalOverflow + 3);
  await page.screenshot({ path: test.info().outputPath('edge-popup.png') });
});
