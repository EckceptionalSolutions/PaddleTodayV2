import { expect, test } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

for (const nextAction of ['change landing', 'copy again']) {
  test(`coordinate-copy feedback ignores an older request after ${nextAction}`, async ({ page }) => {
    await installMapLibreHarness(page);
    await page.addInitScript(() => {
      localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now()));
      (window as any).coordinateWrites = [];
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
        writeText: (value: string) => new Promise((resolve, reject) => {
          (window as any).coordinateWrites.push({ value, resolve, reject });
        }),
      } });
    });
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', route => route.fulfill({ json: fixture }));
    await page.goto('/rivers/rice-creek-peltier-to-long-lake/#route-access-map');
    await expect(page.locator('[data-detail-map-status]')).toHaveAttribute('data-map-state', 'ready');
    const disclosure = page.locator('.river-access-planner-disclosure');
    if (await disclosure.getAttribute('open') === null) await disclosure.locator('summary').click();
    const button = page.locator('[data-field="active-putin-copy"]');
    const value = await button.getAttribute('data-copy-value');
    await button.click();
    await expect.poll(() => page.evaluate(() => (window as any).coordinateWrites.length)).toBe(1);
    if (nextAction === 'change landing') {
      await page.locator('[data-access-putin]').selectOption('lexington-avenue');
      await expect(button).not.toHaveAttribute('data-copy-value', value!);
    } else {
      await button.click();
      await expect.poll(() => page.evaluate(() => (window as any).coordinateWrites.length)).toBe(2);
      await page.evaluate(() => (window as any).coordinateWrites[1].reject(new Error('Synthetic clipboard denial')));
      await expect(button).toHaveText('Copy failed');
    }
    await page.evaluate(async () => {
      (window as any).coordinateWrites[0].resolve();
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(await button.textContent()).toBe(nextAction === 'change landing' ? 'Copy coordinates' : 'Copy failed');
  });
}

test('route overview and access map reflow with enlarged text', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', route => route.fulfill({ json: fixture }));
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#route-access-map');
  await expect(page.locator('[data-detail-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  for (const selector of ['[data-detail-map-shell]', '.route-decision-dashboard', '.river-call-panel__statement', '.route-decision-dashboard__heading h2', '.route-decision-dashboard__live-meta time', '.route-decision-dashboard__freshness strong']) {
    const bounds = await page.locator(selector).first().boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  }
});

test('access connections are distinct from the loaded river path', async ({ page }) => {
  await installMapLibreHarness(page);
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', route => route.fulfill({ json: fixture }));
  await page.route('**/data/canonical-river-geometries/routes/*.json', async route => {
    await pending;
    await route.continue();
  });
  const dash = () => page.evaluate(() => {
    const map = (window as any).__paddleMapInstances.find((map: any) => map.container.hasAttribute('data-detail-map'));
    return map?.getLayer('detail-route-line')?.paint?.['line-dasharray'];
  });
  try {
    await page.goto('/rivers/rice-creek-peltier-to-long-lake/#route-access-map');
    await expect(page.locator('[data-detail-map-status]')).toHaveAttribute('data-map-state', 'ready');
    await expect.poll(dash).toEqual([2, 2]);
    await expect(page.locator('[data-detail-map-line-key]')).toContainText('Dashed');
    release();
    await expect.poll(dash).toEqual([1, 0]);
    await expect(page.locator('[data-detail-map-line-key]')).toContainText('Solid');
  } finally { release(); }
});

for (const width of [null, 320]) {
  test(`native access markers remain clear of controls at ${width ?? 'device'} width`, async ({ page }) => {
    if (width) await page.setViewportSize({ width, height: 844 });
    await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', route => route.fulfill({ json: fixture }));
    await page.goto('/rivers/rice-creek-peltier-to-long-lake/#route-access-map');
    await expect(page.locator('[data-detail-map-status]')).toHaveAttribute('data-map-state', 'ready');
    await page.waitForTimeout(600);
    await expect.poll(() => page.locator('[data-detail-map]').evaluate(map => {
      const controls = [...map.querySelectorAll('.maplibregl-ctrl')].map(node => node.getBoundingClientRect());
      const markers = [...map.querySelectorAll('.detail-access-marker')];
      return markers.length === 2 && markers.every(marker => {
        const rect = marker.getBoundingClientRect();
        return controls.every(control => rect.right <= control.left || rect.left >= control.right
          || rect.bottom <= control.top || rect.top >= control.bottom);
      });
    })).toBe(true);
  });
}

for (const entry of ['overview link', 'direct map link']) {
  test(`${entry} opens the route access map on phones and desktop`, async ({ page }) => {
    await installMapLibreHarness(page);
    await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', route => route.fulfill({ json: fixture }));
    await page.goto(`/rivers/rice-creek-peltier-to-long-lake/${entry === 'direct map link' ? '#route-access-map' : ''}`);
    if (entry === 'overview link') await page.getByRole('link', { name: 'Open access map', exact: true }).click();
    await expect(page).toHaveURL(/#route-access-map$/);
    await expect(page.locator('[data-detail-map-toggle]')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('[data-detail-map]')).toBeVisible();
    await expect(page.locator('[data-detail-map]')).toBeInViewport();
    await expect(page.locator('[data-detail-map-status]')).toHaveAttribute('data-map-state', 'ready');
  });
}

test('access popups do not present withheld measurements as today’s score', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', route => route.fulfill({ json: fixture }));
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
  const toggle = page.locator('[data-detail-map-toggle]');
  if (await toggle.isVisible() && await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
  const map = page.locator('[data-detail-map]');
  await map.scrollIntoViewIfNeeded();
  await expect(page.locator('[data-detail-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await map.locator('.detail-access-marker').first().click();
  const popup = page.locator('.score-map-popup').last();
  await expect(popup).toContainText('Access reference only');
  await expect(popup).not.toContainText("Today's score");
  await expect(popup.getByRole('link', { name: 'Open in Google Maps' })).toBeVisible();
});

test('a failed access map retries without changing the selected landings', async ({ page }) => {
  await installMapLibreHarness(page, { mapReady: false });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
  const toggle = page.locator('[data-detail-map-toggle]');
  if (await toggle.isVisible() && await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
  const disclosure = page.locator('.river-access-planner-disclosure');
  if (await disclosure.getAttribute('open') === null) await disclosure.locator('summary').click();
  await page.locator('[data-access-putin]').selectOption('lexington-avenue');
  await page.locator('[data-detail-map-shell]').scrollIntoViewIfNeeded();
  const retry = page.locator('[data-detail-map-retry]');
  await expect(retry).toBeVisible({ timeout: 12000 });
  await expect(page.locator('[data-detail-map]')).toBeHidden();
  expect((await retry.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await page.locator('[data-detail-map-shell]').screenshot({ path: test.info().outputPath('access-map-failed.png') });
  await page.evaluate(() => {
    const runtime = (window as any).maplibregl.Map;
    runtime.prototype.loaded = () => true;
    runtime.prototype.isStyleLoaded = () => true;
  });
  await retry.click();
  await expect(retry).toBeHidden();
  await expect(page.locator('[data-detail-map-status]')).toBeFocused();
  await expect(page.locator('[data-access-putin]')).toHaveValue('lexington-avenue');
  await expect(page.locator('[data-detail-map] canvas')).toHaveCount(1);
  await expect(page.locator('[data-detail-map] .detail-access-marker')).toHaveCount(2);
});

test('changing access points during map loading keeps the latest landing markers', async ({ page }) => {
  await installMapLibreHarness(page, { mapReady: false });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
  const accessMap = page.locator('[data-detail-map]');
  const toggle = page.locator('[data-detail-map-toggle]');
  if (await toggle.isVisible() && await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
  await accessMap.scrollIntoViewIfNeeded();
  await expect(accessMap.locator('canvas')).toHaveCount(1);
  const disclosure = page.locator('.river-access-planner-disclosure');
  if (await disclosure.getAttribute('open') === null) await disclosure.locator('summary').click();
  await page.locator('[data-access-putin]').selectOption('lexington-avenue');
  await expect(page.locator('[data-access-takeout]')).toHaveValue('long-lake');
  await expect.poll(() => page.evaluate(() => {
    const map = (window as any).__paddleMapInstances.find((map: any) => map.container.hasAttribute('data-detail-map'));
    return map?.listeners.get('load')?.size ?? 0;
  })).toBeGreaterThanOrEqual(2);
  await page.evaluate(() => {
    const runtime = (window as any).maplibregl.Map;
    runtime.prototype.loaded = () => true;
    runtime.prototype.isStyleLoaded = () => true;
    for (const map of (window as any).__paddleMapInstances) map.emit('idle');
  });
  await expect(page.locator('[data-detail-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await expect(accessMap.getByRole('button', { name: 'Put-in: Lexington Avenue access', exact: true })).toBeVisible();
  await expect(accessMap.getByRole('button', { name: /Put-in: Peltier/ })).toHaveCount(0);
  await expect(accessMap.locator('.detail-access-marker')).toHaveCount(2);
});
