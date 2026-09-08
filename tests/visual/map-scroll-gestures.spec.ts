import { expect, test } from '@playwright/test';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

test('Home page scrolling stays separate from deliberate map gestures', async ({ page, isMobile }) => {
  await page.routeWebSocket(url => ['localhost', '127.0.0.1'].includes(url.hostname) && url.searchParams.has('token'),
    socket => socket.send(JSON.stringify({ type: 'connected' })));
  await page.addInitScript(() => {
    localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now()));
    let library: any;
    Object.defineProperty(window, 'maplibregl', { configurable: true, get: () => library, set: value => {
      library = value;
      library.Map = new Proxy(value.Map, { construct(target, args) {
        const map = Reflect.construct(target, args);
        ((window as any).__nativeMaps ??= []).push(map);
        return map;
      } });
    } });
  });
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: {
    generatedAt: new Date().toISOString(), riverCount: 1,
    rivers: [{ ...fixture.result, score: 74, rating: 'Good', readiness: { status: 'ready' }, liveData: { overall: 'live' } }],
  } }));
  await page.goto('/');
  const map = page.locator('[data-summary-map]');
  await map.scrollIntoViewIfNeeded();
  await expect(page.locator('[data-summary-map-status]')).toHaveAttribute('data-map-state', 'ready', { timeout: 15_000 });
  const read = () => page.evaluate(() => {
    const map = (window as any).__nativeMaps.find((map: any) => map.getContainer().hasAttribute('data-summary-map'));
    return { scroll: scrollY, zoom: map.getZoom(), latitude: map.getCenter().lat };
  });
  await map.evaluate(element => window.scrollTo({ top: scrollY + element.getBoundingClientRect().top - 120, behavior: 'instant' }));
  await page.waitForTimeout(350);
  const before = await read();
  if (isMobile) {
    const session = await page.context().newCDPSession(page);
    const drag = async (fingers: number) => {
      const bounds = (await map.boundingBox())!;
      const points = Array.from({ length: fingers }, (_, id) => ({ id, x: bounds.x + bounds.width / 2 + id * 45, y: bounds.y + bounds.height * 0.7 }));
      await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: points });
      for (let step = 1; step <= 5; step++) {
        await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: points.map(point => ({ ...point, y: point.y - step * 15 })) });
        await page.waitForTimeout(25);
      }
      await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    };
    await drag(1);
    await expect.poll(async () => (await read()).scroll).toBeGreaterThan(before.scroll + 20);
    expect((await read()).zoom).toBeCloseTo(before.zoom, 3);
    expect((await read()).latitude).toBeCloseTo(before.latitude, 3);
    // Finish page-scroll momentum before starting an independent map gesture.
    await page.waitForTimeout(900);
    await map.evaluate(element => window.scrollTo({ top: scrollY + element.getBoundingClientRect().top - 120, behavior: 'instant' }));
    await page.waitForTimeout(200);
    const panStart = await read();
    await drag(2);
    await expect.poll(async () => Math.abs((await read()).latitude - panStart.latitude)).toBeGreaterThan(0.001);
  } else {
    const bounds = (await map.boundingBox())!;
    await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
    await page.mouse.wheel(0, 300);
    await expect.poll(async () => (await read()).scroll).toBeGreaterThan(before.scroll + 100);
    expect((await read()).zoom).toBeCloseTo(before.zoom, 3);
    await map.evaluate(element => window.scrollTo({ top: scrollY + element.getBoundingClientRect().top - 120, behavior: 'instant' }));
    const zoomBounds = (await map.boundingBox())!;
    await page.mouse.move(zoomBounds.x + zoomBounds.width / 2, zoomBounds.y + zoomBounds.height / 2);
    await page.keyboard.down('Control');
    try { await page.mouse.wheel(0, -150); }
    finally { await page.keyboard.up('Control'); }
    await expect.poll(async () => (await read()).zoom).toBeGreaterThan(before.zoom + 0.1);
  }
  const zoom = (await read()).zoom;
  await map.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await expect.poll(async () => (await read()).zoom).toBeGreaterThan(zoom + 0.5);
});
