import { test, expect, type Route } from '@playwright/test';

for (const outcome of ['selection change', 'timeout']) {
  test(`GPX availability recovers after ${outcome}`, async ({ page }) => {
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    let pending: Route | null = null;
    let checks = 0;
    let downloads = 0;
    await page.route('**/trip.gpx?*', (route) => {
      if (route.request().method() === 'HEAD') { checks++; pending = route; }
      else { downloads++; return route.fulfill({ status: 503, body: '' }); }
    });
    const loaded = page.waitForResponse((response) => response.url().includes('/api/rivers/rice-creek-peltier-to-long-lake.json'));
    await page.goto('/rivers/rice-creek-peltier-to-long-lake/#access-plan');
    await loaded;
    if (outcome === 'selection change') await page.locator('.river-access-planner-disclosure > summary').click();
    const gpx = page.locator('[data-trip-gpx]');
    const status = page.locator('[data-trip-status]');
    await gpx.click();
    await expect.poll(() => pending !== null).toBe(true);
    await expect(gpx).toHaveAttribute('aria-busy', 'true');
    await expect(gpx).toHaveAttribute('aria-disabled', 'true');
    await gpx.dispatchEvent('click');
    expect(checks).toBe(1);
    if (outcome === 'selection change') {
      await page.locator('[data-access-putin]').selectOption('baldwin-lake');
      await expect(status).toHaveText('Route selection changed. Check GPX availability again.');
    } else {
      await expect(status).toHaveText('The GPX check timed out. Please try again.', { timeout: 20_000 });
    }
    await pending!.fulfill({ status: 200, body: '' });
    await expect(gpx).toHaveAttribute('aria-busy', 'false');
    await expect(gpx).toHaveAttribute('aria-disabled', 'false');
    pending = null;
    await gpx.click();
    await expect.poll(() => pending !== null).toBe(true);
    expect(checks).toBe(2);
    if (outcome === 'selection change') expect(new URL(pending!.request().url()).searchParams.get('putin')).toBe('baldwin-lake');
    await pending!.fulfill({ status: 503, body: '' });
    await expect(status).toHaveText('GPX is not available for this route yet.');
    await expect(gpx).toHaveAttribute('aria-disabled', 'false');
    pending = null;
    await gpx.click();
    await expect.poll(() => pending !== null).toBe(true);
    await pending!.fulfill({ status: 400, body: '' });
    await expect(status).toHaveText('These access points are no longer available. Refresh the route and choose your put-in and take-out again.');
    await expect(gpx).toHaveAttribute('aria-disabled', 'false');
    expect(downloads).toBe(0);
  });
}
