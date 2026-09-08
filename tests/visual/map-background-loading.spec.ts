import { expect, test } from '@playwright/test';
import { holdMapBackgroundTiles } from './map-background-fixture';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

for (const surface of ['weekend', 'group', 'state']) {
  test(`${surface} selection stays usable while background tiles are delayed`, async ({ page }) => {
    const release = await holdMapBackgroundTiles(page);
    await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
    await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [] } }));
    await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
      result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1 }, routes: [{ ...fixture.result, score: 74, readiness: { status: 'ready' }, liveData: { overall: 'live' } }] },
    } }));
    await page.route('**/api/weekend/summary.json*', route => route.fulfill({ json: {
      generatedAt: new Date().toISOString(), label: 'This weekend', riverCount: 1, withheldCount: 0,
      rivers: [{ river: fixture.result.river, current: { score: 74, rating: 'Good' },
        weekend: { label: 'This weekend', score: 74, rating: 'Good', confidence: 'High',
          explanation: 'Synthetic map fixture.', summary: 'Synthetic map fixture.', signalLine: '' } }],
    } }));
    try {
      await page.goto(surface === 'state' ? '/states/minnesota/' : surface === 'group' ? '/rivers/by-river/rum-river/' : '/weekend/');
      const prefix = surface === 'weekend' ? 'summary' : surface;
      const map = page.locator(`[data-${prefix}-map]`);
      const status = page.locator(`[data-${prefix}-map-status]`);
      const mapView = page.locator(surface === 'group' ? '[data-group-mobile-view="map"]' : '[data-summary-map-mobile-view="map"]');
      if (await mapView.isVisible()) await mapView.click();
      await map.scrollIntoViewIfNeeded();
      await expect(status).toHaveAttribute('data-map-state', 'ready');
      await expect(status).toContainText('Background map is loading');
      const canvas = await map.locator('canvas').elementHandle();
      if (surface === 'state') {
        await page.getByRole('combobox', { name: 'Filter by river', exact: true }).selectOption('rice-creek');
        await map.locator(`button[data-route-slug="${fixture.result.river.slug}"]`).press('Enter');
      } else await map.locator('button.score-map-marker').first().press('Enter');
      await expect(map.locator('.maplibregl-popup')).toBeVisible();
      await expect(status).toContainText('Background map is loading');
      await page.waitForTimeout(7400);
      await expect(status).toHaveAttribute('data-map-state', 'ready');
      await expect(map.locator('.maplibregl-popup')).toBeVisible();
      expect(await canvas!.evaluate(node => node.isConnected)).toBe(true);
      release();
      await expect(status).not.toContainText('Background map is loading');
      expect(await canvas!.evaluate(node => node.isConnected)).toBe(true);
    } finally { release(); }
  });
}

test('route access and overview stay usable while background tiles are delayed', async ({ page }) => {
  const release = await holdMapBackgroundTiles(page);
  await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', route => route.fulfill({ json: fixture }));
  try {
    await page.goto('/rivers/rice-creek-peltier-to-long-lake/#route-access-map');
    const access = page.locator('[data-detail-map]');
    const status = page.locator('[data-detail-map-status]');
    const heroStatus = page.locator('[data-detail-hero-map-status]');
    await page.locator('[data-detail-hero-map]').scrollIntoViewIfNeeded();
    for (const element of [status, heroStatus]) {
      await expect(element).toHaveAttribute('data-map-state', 'ready');
      await expect(element).toContainText('Background map is loading');
    }
    await expect(access.locator('.detail-access-marker')).toHaveCount(2);
    const canvas = await access.locator('canvas').elementHandle();
    const disclosure = page.locator('.river-access-planner-disclosure');
    if (await disclosure.getAttribute('open') === null) await disclosure.locator('summary').click();
    await page.locator('[data-access-putin]').selectOption('lexington-avenue');
    await expect(status).toContainText('Selected segment');
    await expect(status).toContainText('Background map is loading');
    await page.waitForTimeout(7400);
    for (const element of [status, heroStatus]) await expect(element).toHaveAttribute('data-map-state', 'ready');
    expect(await canvas!.evaluate(node => node.isConnected)).toBe(true);
    release();
    for (const element of [status, heroStatus]) await expect(element).not.toContainText('Background map is loading');
    expect(await canvas!.evaluate(node => node.isConnected)).toBe(true);
    await access.screenshot({ path: test.info().outputPath('route-background-recovered.png') });
  } finally { release(); }
});
