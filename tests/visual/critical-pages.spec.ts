import { test, expect } from '@playwright/test';

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
      await page.goto(p.path, { waitUntil: 'domcontentloaded' });

      // The app can auto-refresh/live-poll, so "networkidle" may never happen.
      // Instead, wait for a page-specific stable selector, then allow a brief settle.
      if (p.path === '/') {
        await page.waitForSelector('[data-summary-list], main', { timeout: 30_000 });
      }
      if (p.path === '/request/' || p.path === '/request') {
        await page.waitForSelector('form', { timeout: 30_000 });
      }

      await page.waitForTimeout(1000);
      await expect(page).toHaveScreenshot(`${p.name}.png`, { fullPage: true, timeout: 30_000 });
    });
  }

  test('page: rice-creek detail (best effort)', async ({ page }) => {
    for (const path of detailCandidates) {
      const res = await page.goto(path, { waitUntil: 'domcontentloaded' });
      if (res && res.ok()) {
        await page.waitForSelector('main', { timeout: 30_000 });

        // Hide likely unstable elements for visual regression stability:
        // live "Updated X min ago" banners, auto-refresh strips, animated charts/maps.
        await page.addStyleTag({
          content: `
            /* common time/refresh copy */
            :is([data-updated-at], [data-refresh], [data-last-updated], .updated, .updated-at, .refresh, .refresh-note) { display:none !important; }
            /* map tiles/canvas can jitter between renders */
            canvas, .maplibregl-map, .maplibregl-canvas, .leaflet-container { visibility:hidden !important; }
          `,
        });

        await page.waitForTimeout(1000);
        await expect(page).toHaveScreenshot('detail-rice-creek.png', { fullPage: true, timeout: 30_000 });
        return;
      }
    }
    test.skip(true, 'Could not load Rice Creek detail page at expected paths');
  });
});
