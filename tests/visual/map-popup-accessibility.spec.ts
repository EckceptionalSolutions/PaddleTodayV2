import { expect, test } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';

test('page dialogs paint above native map popups', async ({ page }) => {
  await page.route('**/popup-layer-check', route => route.fulfill({ contentType: 'text/html', body: `
    <!doctype html><meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/global.css">
    <div id="map" style="width:min(500px,100vw);height:420px"></div>
    <section class="site-search-dialog" hidden><div class="site-search-dialog__backdrop"></div></section>` }));
  await page.goto('/popup-layer-check');
  await page.evaluate(async () => {
    const url = '/src/scripts/map-runtime.js';
    const { ensureMapLibre, createPaddleMap, bindMapPopup } = await import(/* @vite-ignore */ url);
    const lib = await ensureMapLibre();
    const map = createPaddleMap(lib, { container: 'map', center: [0, 0], zoom: 8,
      style: { version: 8, sources: {}, layers: [] } });
    await new Promise(resolve => map.once('load', resolve));
    const popup = new lib.Popup().setLngLat([0, 0]).setHTML('<article class="score-map-popup"><h3>Map route</h3><a href="/">View route</a></article>');
    bindMapPopup(popup, { map });
    popup.addTo(map);
  });
  await page.waitForTimeout(350);
  await page.locator('.site-search-dialog').evaluate(element => { (element as HTMLElement).hidden = false; });
  expect(await page.locator('.score-map-popup h3').evaluate(element => {
    const rect = element.getBoundingClientRect();
    return Boolean(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)?.closest('.site-search-dialog'));
  })).toBe(true);
});

test('native keyboard selection keeps one active popup per map', async ({ page }) => {
  await page.route('**/popup-selection-check', route => route.fulfill({ contentType: 'text/html', body: `
    <!doctype html><meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/global.css">
    <div id="first-map" style="width:min(500px,100vw);height:320px"></div>
    <div id="second-map" style="width:min(500px,100vw);height:320px"></div>` }));
  await page.goto('/popup-selection-check');
  await page.evaluate(async () => {
    const url = '/src/scripts/map-runtime.js';
    const { ensureMapLibre, createPaddleMap, createMapMarker } = await import(/* @vite-ignore */ url);
    const lib = await ensureMapLibre();
    for (const [id, labels] of [['first-map', ['A', 'B']], ['second-map', ['C']]] as const) {
      const map = createPaddleMap(lib, { container: id, center: [0, 0], zoom: 8,
        style: { version: 8, sources: {}, layers: [] } });
      await new Promise(resolve => map.once('load', resolve));
      labels.forEach((label, index) => {
        const button = document.createElement('button');
        button.id = `marker-${label}`;
        button.textContent = label;
        createMapMarker({ maplibregl: lib, mapRuntime: map, element: button,
          point: { longitude: index * 0.1, latitude: 0 }, bindPopup: true,
          popupHtml: `<article class="score-map-popup"><h3>Route ${label}</h3><a href="/">View route</a></article>`,
        });
      });
    }
  });
  await page.locator('#marker-A').press('Enter');
  await expect(page.getByRole('dialog', { name: 'Route A', exact: true })).toBeVisible();
  await page.locator('#marker-C').press('Enter');
  await expect(page.getByRole('dialog', { name: 'Route A', exact: true })).toBeVisible();
  await expect(page.getByRole('dialog', { name: 'Route C', exact: true })).toBeVisible();
  await page.locator('#marker-B').press('Enter');
  await expect(page.locator('#first-map .maplibregl-popup')).toHaveCount(1);
  await expect(page.getByRole('dialog', { name: 'Route B', exact: true })).toBeVisible();
  await expect(page.getByRole('dialog', { name: 'Route C', exact: true })).toBeVisible();
  await expect(page.locator('#marker-A')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#marker-B')).toHaveAttribute('aria-pressed', 'true');
});

test('a native popup with deferred content manages keyboard focus', async ({ page }) => {
  await page.route('**/line-popup-check', route => route.fulfill({ contentType: 'text/html', body: `
    <!doctype html><meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/global.css"><div id="map" aria-label="Route access map" style="width:min(500px,100vw);height:280px"></div>` }));
  await page.goto('/line-popup-check');
  await page.evaluate(async () => {
    const url = '/src/scripts/map-runtime.js';
    const { ensureMapLibre, createPaddleMap, bindMapPopup } = await import(/* @vite-ignore */ url);
    const lib = await ensureMapLibre();
    const map = createPaddleMap(lib, { container: 'map', center: [-93, 45], zoom: 8,
      style: { version: 8, sources: {}, layers: [] } });
    await new Promise(resolve => map.once('load', resolve));
    const popup = new lib.Popup({ closeButton: true }).setLngLat([-93, 45]);
    popup.on('open', () => popup.setHTML('<article class="score-map-popup"><h3>River line details</h3><a class="score-map-popup__link--button" href="/">View route</a></article>'));
    bindMapPopup(popup, { map });
    popup.addTo(map);
  });
  const popup = page.locator('.maplibregl-popup');
  await expect(popup).toBeVisible();
  await expect(popup).toHaveRole('dialog');
  await expect(popup).toHaveAccessibleName('River line details');
  await expect(popup.locator('.maplibregl-popup-close-button')).toBeFocused();
  await popup.getByRole('link', { name: 'View route' }).focus();
  await page.keyboard.press('Escape');
  await expect(popup).toHaveCount(0);
  await expect(page.locator('#map canvas')).toBeFocused();
  await expect(page.locator('#map canvas')).toHaveAccessibleName('Route access map');
});

test('map popup can be dismissed by keyboard and returns focus to its marker', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/map-popup-check', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><link rel="stylesheet" href="/global.css"><div id="map" style="width:300px;height:500px"></div>' }));
  await page.goto('/map-popup-check');
  await page.addStyleTag({ content: '.maplibregl-popup-content { position:relative; border-radius:3px; padding:10px; } .maplibregl-popup-close-button { position:absolute; top:0; right:0; border:0; background:transparent; }' });
  await page.evaluate(async () => {
    const { createPaddleMap, createMapMarker } = await import(/* @vite-ignore */ '/src/scripts/map-runtime.js');
    const lib = (window as any).maplibregl;
    const map = createPaddleMap(lib, { container: document.querySelector('#map') });
    const button = document.createElement('button');
    button.id = 'route-marker';
    button.textContent = '87';
    const marker = createMapMarker({ maplibregl: lib, mapRuntime: map, element: button,
      point: { longitude: -93, latitude: 45 }, bindPopup: true,
      popupHtml: '<article class="score-map-popup"><h3>A river with a long route name</h3><a class="score-map-popup__link--button" href="/">View route</a></article>',
    });
    const popup = marker.getPopup().getElement();
    const content = document.createElement('div');
    content.className = 'maplibregl-popup-content';
    content.append(...popup.childNodes);
    popup.append(content);
  });
  const marker = page.locator('#route-marker');
  await marker.focus();
  await marker.press('Enter');
  const popup = page.locator('.maplibregl-popup');
  await expect(popup).toBeVisible();
  await expect(marker).toHaveAttribute('aria-pressed', 'true');
  await popup.getByRole('link', { name: 'View route' }).focus();
  await page.keyboard.press('Escape');
  await expect(popup).toHaveCount(0);
  await expect(marker).toBeFocused();
  await expect(marker).toHaveAttribute('aria-pressed', 'false');
  await marker.press('Space');
  await expect(popup).toBeVisible();
  await expect(popup).toHaveRole('dialog');
  await expect(popup).toHaveAccessibleName('A river with a long route name');
  const close = popup.locator('.maplibregl-popup-close-button');
  const box = await close.boundingBox();
  expect(Math.round(box?.width ?? 0)).toBeGreaterThanOrEqual((page.viewportSize()?.width ?? 1280) <= 760 ? 44 : 36);
  expect(Math.round(box?.height ?? 0)).toBeGreaterThanOrEqual((page.viewportSize()?.width ?? 1280) <= 760 ? 44 : 36);
  expect(await popup.locator('.maplibregl-popup-content').evaluate(node => getComputedStyle(node).borderRadius)).toBe('18px');
  expect(await popup.evaluate(node => {
    const close = node.querySelector('.maplibregl-popup-close-button')!.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(node.querySelector('h3')!);
    return [...range.getClientRects()].every(rect => rect.right <= close.left || rect.top >= close.bottom || rect.bottom <= close.top);
  })).toBe(true);
  await close.click();
  await expect(popup).toHaveCount(0);
  await expect(marker).toBeFocused();
  await marker.click();
  await expect(popup).toBeVisible();
  await marker.click();
  await expect(popup).toHaveCount(0);
  await expect(marker).toHaveAttribute('aria-pressed', 'false');
  await expect(marker).not.toHaveClass(/score-map-marker--selected/);
});

test('keyboard focus reveals offscreen markers without scrolling the map container', async ({ page }) => {
  await page.route('**/marker-focus-check', route => route.fulfill({ contentType: 'text/html', body: `
    <!doctype html><meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/global.css">
    <div id="map" style="width:min(500px,100vw);height:320px;margin-top:40px"></div>` }));
  await page.goto('/marker-focus-check');
  await page.evaluate(async () => {
    const url = '/src/scripts/map-runtime.js';
    const { ensureMapLibre, createPaddleMap, createMapMarker } = await import(/* @vite-ignore */ url);
    const lib = await ensureMapLibre();
    const map = createPaddleMap(lib, { container: 'map', center: [0, 0], zoom: 8,
      style: { version: 8, sources: {}, layers: [] } });
    (window as any).__focusMap = map;
    await new Promise(resolve => map.once('load', resolve));
    for (const [name, longitude] of [['near', 0], ['far', 10]] as const) {
      const element = document.createElement('button');
      element.id = `marker-${name}`;
      element.className = 'score-map-marker';
      element.textContent = name === 'near' ? '80' : '70';
      createMapMarker({ maplibregl: lib, mapRuntime: map, element,
        point: { longitude, latitude: 0 }, bindPopup: true,
        popupHtml: `<article class="score-map-popup"><h3>${name} river</h3><a href="/">View route</a></article>` });
    }
  });
  await page.locator('#marker-near').focus();
  await page.keyboard.press('Tab');
  const marker = page.locator('#marker-far');
  await expect(marker).toBeFocused();
  await expect.poll(() => marker.evaluate(element => {
    const map = document.querySelector('#map')!;
    const bounds = map.getBoundingClientRect();
    const target = element.getBoundingClientRect();
    return target.left >= bounds.left && target.right <= bounds.right
      && target.top >= bounds.top && target.bottom <= bounds.bottom
      && map.scrollLeft === 0 && map.scrollTop === 0;
  })).toBe(true);
  await expect(page.locator('.maplibregl-popup')).toHaveCount(0);
  await marker.press('Enter');
  await expect(page.getByRole('dialog', { name: 'far river', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(marker).toBeFocused();
  await page.evaluate(async () => {
    const url = '/src/scripts/map-runtime.js';
    const { createMapMarker } = await import(/* @vite-ignore */ url);
    const map = (window as any).__focusMap;
    const point = map.unproject([map.getContainer().clientWidth - 8, 160]);
    const element = document.createElement('button');
    element.id = 'marker-edge';
    element.className = 'score-map-marker';
    element.textContent = '64';
    createMapMarker({ maplibregl: (window as any).maplibregl, mapRuntime: map, element,
      point: { longitude: point.lng, latitude: point.lat }, bindPopup: true,
      popupHtml: '<article class="score-map-popup"><h3>Edge river</h3><a href="/">View route</a></article>' });
  });
  await page.locator('#marker-edge').click();
  await expect(page.getByRole('dialog', { name: 'Edge river', exact: true })).toBeVisible();
});
