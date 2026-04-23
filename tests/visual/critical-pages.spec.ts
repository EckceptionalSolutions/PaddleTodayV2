import { test, expect } from '@playwright/test';

async function stabilizeForScreenshot(page: any) {
  // Freeze time to reduce "Updated X min ago" / relative time diffs.
  await page.addInitScript(() => {
    const fixed = new Date('2026-01-01T12:00:00Z').valueOf();
    // @ts-ignore
    Date.now = () => fixed;
  });
}

async function maskLiveUi(page: any) {
  // Hide likely unstable UI elements (relative times, refresh labels, charts, maps).
  await page.addStyleTag({
    content: `
      :is(time, [data-time], [data-updated], [data-updated-at], [data-last-updated], [data-refresh], [data-request-id], [data-run-id]) { visibility: hidden !important; }
      :is(.updated, .updated-at, .refresh, .refresh-note, .request-id, .run-id) { visibility: hidden !important; }
      canvas, svg[data-chart], .maplibregl-map, .maplibregl-canvas, .leaflet-container { visibility: hidden !important; }
      :is(.spinner, [aria-busy="true"], [data-loading]) { visibility: hidden !important; }
    `,
  });
}

const pages: Array<{ name: string; path: string }> = [
  { name: 'summary', path: '/' },
  { name: 'about', path: '/about/' },
  { name: 'request', path: '/request/' },
];

// Add one representative river detail page. We pick Rice Creek because it's a key
// MN example and typically present in seeds.
const detailCandidates = ['/rivers/rice-creek/', '/rivers/rice-creek'];

test.describe('critical pages (visual)', () => {
  for (const p of pages) {
    test(`page: ${p.name}`, async ({ page }) => {
      await stabilizeForScreenshot(page);
      // Production can occasionally be slow; give navigation more breathing room.
      page.setDefaultNavigationTimeout(120_000);
      await page.goto(p.path, { waitUntil: 'domcontentloaded' });

      // The app can auto-refresh/live-poll, so "networkidle" may never happen.
      // Instead, wait for a page-specific stable selector, then allow a brief settle.
      if (p.path === '/') {
        await page.waitForSelector('main', { timeout: 30_000 });
      }
      if (p.path === '/request/' || p.path === '/request') {
        await page.waitForSelector('form', { timeout: 30_000 });
      }

      await maskLiveUi(page);
      await page.waitForTimeout(750);
      await expect(page.locator('main')).toHaveScreenshot(`${p.name}.png`, { timeout: 30_000 });
    });
  }

  test('page: rice-creek detail (best effort)', async ({ page }) => {
    await stabilizeForScreenshot(page);
    for (const path of detailCandidates) {
      const res = await page.goto(path, { waitUntil: 'domcontentloaded' });
      if (res && res.ok()) {
        await page.waitForSelector('main', { timeout: 30_000 });
        await maskLiveUi(page);
        await page.waitForTimeout(750);
        await expect(page.locator('main')).toHaveScreenshot('detail-rice-creek.png', { timeout: 30_000 });
        return;
      }
    }
    test.skip(true, 'Could not load Rice Creek detail page at expected paths');
  });
});
