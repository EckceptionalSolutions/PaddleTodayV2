import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('river card navigation follows live reduced-motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    const original = Element.prototype.scroll;
    (window as any).__scrollBehaviors = [];
    Element.prototype.scroll = function (...args: any[]) {
      if (typeof args[0] === 'object') (window as any).__scrollBehaviors.push(args[0].behavior);
      return original.apply(this, args as [number, number]);
    };
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/river-groups/rice-creek.json', route => route.fulfill({ json: {
    generatedAt: new Date().toISOString(), result: {
      group: { riverId: 'rice-creek', name: 'Rice Creek', routeCount: 1, regions: ['Twin Cities'] },
      routes: [fixture.result],
    },
  } }));
  await page.goto('/river-hub/rice-creek');
  const view = page.getByRole('button', { name: /^View card for / });
  await expect(view).toBeVisible();
  for (const reduced of [true, false, true]) {
    await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await view.evaluate(element => {
      (window as any).__scrollBehaviors = [];
      (element as HTMLElement).click();
    });
    await expect.poll(() => page.evaluate(() => (window as any).__scrollBehaviors.length)).toBeGreaterThan(0);
    const behaviors = await page.evaluate(() => (window as any).__scrollBehaviors as string[]);
    if (reduced) expect(behaviors).not.toContain('smooth');
    else expect(behaviors).toContain('smooth');
  }
});
