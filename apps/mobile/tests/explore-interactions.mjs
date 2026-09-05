// Run against a served Expo web export with a populated Minnesota catalog:
// node apps/mobile/tests/explore-interactions.mjs http://127.0.0.1:4391
// This checks shared Explore/drawer behavior, not the native map renderer.
import { chromium, expect } from '@playwright/test';

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:4391';
const browser = await chromium.launch();
try {
  for (const width of [390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    await context.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:explore-preferences:v4', JSON.stringify({
        filters: { sort: 'best', query: '', state: 'Minnesota', difficulty: 'any', routeType: 'all', status: 'any', rating: 'any', distance: 'any', paddleTime: 'any', paddleLength: 'any', camping: 'any' },
        viewMode: 'map',
      }));
    });
    const page = await context.newPage();
    await page.goto(new URL('/explore', baseUrl).href);
    const markers = page.getByRole('button', { name: /, score \d+, \d+ routes?$/ });
    await markers.nth(1).waitFor();
    await expect(page.getByRole('button', { name: 'Center selected route', exact: true })).toHaveCount(0);
    const first = markers.nth(0);
    const second = markers.nth(1);
    const firstHandle = await first.elementHandle();
    const position = await first.boundingBox();
    await first.evaluate((element) => element.click());
    await page.getByRole('button', { name: /Open (best )?route:/ }).waitFor();
    await page.getByRole('button', { name: 'Expand route drawer', exact: true }).last().click();
    // Invoke marker presses directly because the expanded drawer covers part
    // of this projected fallback. Device hit-testing requires a native pass.
    for (const marker of [second, first, second, first]) {
      await marker.evaluate((element) => element.click());
      await expect(page.getByRole('button', { name: /^Contribute photos for / })).toHaveCount(1);
      await expect(page.getByRole('button', { name: 'Collapse route drawer', exact: true }).last()).toBeVisible();
      expect(await firstHandle.evaluate((element) => element.isConnected)).toBe(true);
      expect(await first.boundingBox()).toEqual(position);
    }
    await page.getByRole('button', { name: 'Close route drawer', exact: true }).click();
    expect(await first.boundingBox()).toEqual(position);
    await expect(page.getByRole('button', { name: 'Center selected route', exact: true })).toHaveCount(0);
    const toggle = await page.getByRole('tab', { name: 'list view', exact: true }).boundingBox();
    expect(toggle.height).toBeGreaterThanOrEqual(44);
    await page.getByRole('tab', { name: 'list view', exact: true }).click();
    await expect(page.getByText('Explore routes', { exact: true })).toBeVisible();
    console.log(`PASS ${width}px: repeated selection, single photo, drawer expansion, marker identity/position, dismissal, controls and list switch`);
    await context.close();
  }
} finally {
  await browser.close();
}
