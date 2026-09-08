import { expect, test } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

for (const [path, region] of [
  ['/favorites/', '.favorites-page__map-frame'],
  ['/states/minnesota/', '.state-coverage__map-shell'],
  ['/rivers/by-river/rum-river/', '.river-group-page__map-shell'],
  ['/rivers/rice-creek-peltier-to-long-lake/', '.detail-map-frame--launch-plan'],
]) {
  test(`keyboard users can bypass map controls on ${path}`, async ({ page }) => {
    await installMapLibreHarness(page);
    await page.addInitScript(() => {
      localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now()));
      localStorage.setItem('paddletoday:favorites:v1', JSON.stringify({ version: 1, items: [{
        slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', savedAt: Date.now(),
      }] }));
    });
    await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [fixture.result] } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', route => route.fulfill({ json: fixture }));
    await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
      result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 }, routes: [fixture.result] },
    } }));
    await page.goto(path);
    const mapView = page.locator('[data-group-mobile-view="map"]');
    if (await mapView.isVisible()) await mapView.click();
    const toggle = page.locator('[data-detail-map-toggle]');
    if (await toggle.isVisible() && await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
    const shell = page.locator(region);
    const skip = shell.getByRole('link', { name: 'Skip map', exact: true });
    await skip.focus();
    await expect(skip).toBeInViewport();
    expect(await skip.evaluate(node => getComputedStyle(node).clipPath)).toBe('none');
    await skip.press('Enter');
    await expect(shell.locator('.map-skip-target')).toBeFocused();
    await page.keyboard.press('Tab');
    expect(await shell.evaluate(node => node.contains(document.activeElement))).toBe(false);
  });
}
