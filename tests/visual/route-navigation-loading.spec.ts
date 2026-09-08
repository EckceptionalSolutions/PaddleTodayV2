import { expect, test } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

for (const interrupted of [false, true]) {
  test(`route chapter navigation ${interrupted ? 'respects user scrolling' : 'survives delayed route data'}`, async ({ page }) => {
    await installMapLibreHarness(page);
    await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    let release!: () => void;
    const pending = new Promise<void>(resolve => { release = resolve; });
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', async route => {
      await pending;
      await route.fulfill({ json: fixture });
    });
    try {
      await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
      const root = page.locator('[data-river-detail]');
      const overview = page.locator('[data-detail-nav-link="overview"]');
      const section = page.locator('#route-overview');
      await expect(root).toHaveClass(/river-detail--loading/);
      await expect(overview).toHaveAttribute('data-nav-bound', 'true');
      await overview.click();
      await expect(section).toBeFocused();
      await expect.poll(() => section.evaluate(element => Math.round(element.getBoundingClientRect().top))).toBe(22);
      if (interrupted) {
        await page.keyboard.press('PageDown');
        await expect.poll(() => section.evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(-400);
      }
      release();
      await expect(root).not.toHaveClass(/river-detail--loading/);
      if (interrupted) {
        await expect.poll(() => section.evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(0);
      } else {
        await expect.poll(() => section.evaluate(element => Math.round(element.getBoundingClientRect().top))).toBe(22);
        await expect(overview).toHaveClass(/river-detail__section-link--active/);
        await expect(section).toBeFocused();
      }
    } finally { release(); }
  });
}
