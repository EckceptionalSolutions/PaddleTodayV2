import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/map-loader-check', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Map loader check</title>' }));
  await page.goto('/map-loader-check');
});

for (const failedAsset of ['script', 'stylesheet']) {
  test(`map loader retries a failed ${failedAsset} without duplicating successful assets`, async ({ page }) => {
    let fail = true;
    const requests = { script: 0, stylesheet: 0 };
    await page.route('https://unpkg.com/maplibre-gl@*/dist/*', async route => {
      const type = new URL(route.request().url()).pathname.endsWith('.css') ? 'stylesheet' : 'script';
      requests[type]++;
      if (fail && type === failedAsset) await route.abort();
      else await route.fulfill({ contentType: type === 'script' ? 'text/javascript' : 'text/css', body: type === 'script' ? 'window.maplibregl = { loadedForTest: true };' : '.maplibregl-map { position: relative; }' });
    });
    const load = () => page.evaluate(async () => {
      const { ensureMapLibre } = await import(/* @vite-ignore */ '/src/scripts/map-runtime.js');
      try { await Promise.all([ensureMapLibre(), ensureMapLibre()]); return 'ready'; }
      catch { return 'failed'; }
    });
    expect(await load()).toBe('failed');
    fail = false;
    expect(await load()).toBe('ready');
    expect(requests[failedAsset]).toBe(2);
    expect(requests[failedAsset === 'script' ? 'stylesheet' : 'script']).toBe(1);
    await expect(page.locator('head script[src*="maplibre-gl"]')).toHaveCount(1);
    await expect(page.locator('head link[href*="maplibre-gl"]')).toHaveCount(1);
  });
}

for (const asset of ['script', 'stylesheet']) {
  test(`a stalled map ${asset} download times out and can recover`, async ({ page }) => {
    await page.clock.install();
    let release!: () => void;
    const pending = new Promise<void>(resolve => { release = resolve; });
    const requests = { script: 0, stylesheet: 0 };
    let oldRequestAborted = false;
    await page.route('https://unpkg.com/maplibre-gl@*/dist/*', async route => {
      const type = new URL(route.request().url()).pathname.endsWith('.css') ? 'stylesheet' : 'script';
      if (++requests[type] === 1 && type === asset) {
        await pending;
        // The timed-out request may still be in flight when the user retries.
        await new Promise(resolve => setTimeout(resolve, 200));
        await route.abort();
        oldRequestAborted = true;
      } else {
        await route.fulfill({ contentType: type === 'script' ? 'text/javascript' : 'text/css',
          body: type === 'script' ? 'window.maplibregl = {};' : '.maplibregl-map { position: relative; }' });
      }
    });
    const load = () => page.evaluate(async () => {
      const { ensureMapLibre } = await import(/* @vite-ignore */ '/src/scripts/map-runtime.js');
      await Promise.all([ensureMapLibre(), ensureMapLibre()]);
      return 'ready';
    });
    try {
      await page.evaluate(async () => {
        const { ensureMapLibre } = await import(/* @vite-ignore */ '/src/scripts/map-runtime.js');
        (window as any).mapLoadResult = ensureMapLibre().then(() => 'ready', () => 'failed');
      });
      await expect.poll(() => requests[asset]).toBe(1);
      // Let the successful companion asset finish before advancing both timers.
      await expect.poll(() => page.evaluate(asset => asset === 'script'
        ? Boolean(document.querySelector('link')?.sheet) : Boolean((window as any).maplibregl), asset)).toBe(true);
      await page.clock.fastForward(15001);
      expect(await page.evaluate(() => (window as any).mapLoadResult)).toBe('failed');
      release();
      expect(await load()).toBe('ready');
      await expect.poll(() => oldRequestAborted).toBe(true);
      expect(await load()).toBe('ready');
      expect(requests[asset]).toBe(2);
      expect(requests[asset === 'script' ? 'stylesheet' : 'script']).toBe(1);
      await expect(page.locator('head script[src*="maplibre-gl"]')).toHaveCount(1);
      await expect(page.locator('head link[href*="maplibre-gl"]')).toHaveCount(1);
    } finally { release(); }
  });
}

test('failed WebGL initialization leaves no canvas behind before a retry', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const moduleUrl = '/src/scripts/map-runtime.js';
    const { ensureMapLibre, createPaddleMap } = await import(/* @vite-ignore */ moduleUrl);
    const library = await ensureMapLibre();
    const container = document.createElement('div');
    container.style.cssText = 'width:320px;height:300px';
    const fallback = document.createElement('p');
    fallback.textContent = 'Route links remain available';
    container.append(fallback);
    document.body.append(container);
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: any[]) {
      return type.startsWith('webgl') ? null : (original as any).call(this, type, ...args);
    } as typeof original;
    const options = { container, style: { version: 8, sources: {}, layers: [] } };
    let error = '';
    try { createPaddleMap(library, options); }
    catch (reason) { error = (reason as Error).message; }
    finally { HTMLCanvasElement.prototype.getContext = original; }
    const failed = { error, canvases: container.querySelectorAll('canvas').length,
      fallbackPresent: container.contains(fallback), mapClass: container.classList.contains('maplibregl-map') };
    const map = createPaddleMap(library, options);
    await new Promise(resolve => map.once('load', resolve));
    const retried = { canvases: container.querySelectorAll('canvas').length, ready: map.loaded() };
    map.remove();
    return { failed, retried };
  });
  expect(result.failed).toEqual({ error: 'Failed to initialize WebGL', canvases: 0, fallbackPresent: true, mapClass: false });
  expect(result.retried).toEqual({ canvases: 1, ready: true });
});
