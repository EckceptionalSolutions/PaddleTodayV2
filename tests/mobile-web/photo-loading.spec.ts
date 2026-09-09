import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const path of ['/river/rice-creek-peltier-to-long-lake', '/saved', '/weekend']) {
  for (const scenicAvailable of [false, true]) {
  test(`failed route photos have a ${scenicAvailable ? 'scenic' : 'clear offline'} fallback on ${path}`, async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{
        slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier Lake to Long Lake', savedAt: '2026-09-06T12:00:00.000Z',
      }]));
    });
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
    await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: [{
      ...fixture.result,
      summary: { gaugeNow: 'Check source', shortExplanation: 'QA fixture.' },
      liveData: { overall: 'stale', summary: 'Check current conditions.' },
    }] } }));
    await page.route('**/api/weekend/summary.json', (route) => route.fulfill({ json: { rivers: [{
      river: { ...fixture.result.river, difficulty: 'easy' },
      current: { score: 80, rating: 'Good', gaugeBandLabel: 'QA fixture' },
      weekend: { label: 'Weekend', score: 80, rating: 'Good', confidence: 'High', explanation: 'QA fixture.', summary: 'QA fixture.', signalLine: '' },
      liveData: { overall: 'stale', summary: 'Check current conditions.' },
      generatedAt: new Date().toISOString(),
    }] } }));
    let imagesRequested = 0;
    await page.route('**/gallery/**', (route) => {
      imagesRequested += 1;
      return scenicAvailable && route.request().url().includes('/fallbacks/')
        ? route.fulfill({ path: 'public/gallery/fallbacks/river-fallback-stream.jpg', contentType: 'image/jpeg' }) : route.abort();
    });
    await page.goto(path);
    if (scenicAvailable) {
      const label = page.getByText('Illustrative photo', { exact: true }).first();
      await expect(label).toBeVisible();
      await expect.poll(() => page.locator('img').evaluateAll(images => images.some(image => image.src.includes('/fallbacks/') && image.complete && image.naturalWidth > 0))).toBe(true);
      await expect(page.getByText('Photo unavailable', { exact: true })).toBeHidden();
      await label.scrollIntoViewIfNeeded();
      await page.screenshot({ path: `tmp/scenic-fallback-${path.split('/')[1]}-${page.viewportSize()!.width}.png` });
      if (path.startsWith('/river/')) {
        const badge = (await label.boundingBox())!;
        const action = (await page.getByRole('button', { name: 'Add a photo of Peltier Lake to Long Lake', exact: true }).boundingBox())!;
        expect(badge.x + badge.width <= action.x || badge.y + badge.height <= action.y).toBe(true);
      }
      return;
    }
    await expect(page.getByText('Photo unavailable', { exact: true }).first()).toBeVisible();
    expect(imagesRequested).toBeGreaterThan(0);
    await expect(page.getByText('No photo yet', { exact: true })).toBeHidden();
    if (path === '/saved') {
      await expect(page.getByRole('button', { name: 'Open route: Rice Creek, Peltier Lake to Long Lake', exact: true })).toBeVisible();
    } else if (path === '/weekend') {
      await page.getByRole('button', { name: /^Rice Creek,.*?, score 80$/ }).press('Enter');
      await expect(page).toHaveURL(/river\/rice-creek-peltier-to-long-lake/);
    } else {
      const label = (await page.getByText('Photo unavailable', { exact: true }).first().boundingBox())!;
      const action = (await page.getByRole('button', { name: 'Add a photo of Peltier Lake to Long Lake', exact: true }).boundingBox())!;
      expect(label.y + label.height <= action.y || label.x + label.width <= action.x).toBe(true);
      await page.getByRole('button', { name: 'Add a photo of Peltier Lake to Long Lake', exact: true }).click();
      await expect(page).toHaveURL(/contribute-photo\/rice-creek-peltier-to-long-lake/);
    }
  });
  }
}
