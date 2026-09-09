import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const available of [true, false]) {
  test(`alerts remain discoverable without bookmarks when route details are ${available ? 'available' : 'unavailable'}`, async ({ page }) => {
    await page.addInitScript((includeMissing: boolean) => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:saved-rivers', '[]');
      localStorage.setItem('paddletoday:alert-preferences', JSON.stringify({ email: 'qa@example.test', routeAlerts: [
        { riverSlug: 'rice-creek-peltier-to-long-lake', threshold: 'good', deliveryMethod: 'push', updatedAt: '2026-09-08T12:00:00Z' },
        { riverSlug: 'rice-creek-peltier-to-long-lake', threshold: 'strong', deliveryMethod: 'email', updatedAt: '2026-09-08T12:00:00Z' },
        ...(includeMissing ? [{ riverSlug: 'unlisted-creek', threshold: 'strong', deliveryMethod: 'push', updatedAt: '2026-09-08T12:00:00Z' }] : []),
      ] }));
    }, available);
    let writes = 0;
    await page.route('**/api/**', route => {
      if (route.request().method() !== 'GET') writes++;
      return route.fulfill({ status: 503, json: { error: 'offline' } });
    });
    if (available) await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{ ...fixture.result,
      summary: { gaugeNow: 'QA', shortExplanation: 'QA' },
    }] } }));
    await page.goto('/saved?tab=alerts');
    await expect(page.getByText('Phone alerts: Good · Email alerts: Strong', { exact: true })).toBeVisible();
    await expect(page.getByText('No saved routes yet', { exact: true })).toHaveCount(0);
    if (available) {
      await expect(page.getByRole('button', { name: `Good phone alert for Rice Creek: ${fixture.result.river.reach}`, exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(page.getByText('Phone alerts: Strong', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Open alert route: unlisted creek', exact: true })).toBeVisible();
    } else {
      await expect(page.getByText('Alert routes without current details', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: /^Open alert route:/ })).toBeVisible();
      await expect(page.getByRole('button', { name: /^Good phone alert/ })).toHaveCount(0);
    }
    await page.screenshot({ path: `tmp/unbookmarked-alert-${available}-${page.viewportSize()!.width}.png` });
    expect(writes).toBe(0);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:alert-preferences')!).routeAlerts.length)).toBe(available ? 3 : 2);
  });
}

test('an empty Alerts tab explains how to start without claiming bookmarks are required', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:saved-rivers', '[]');
    localStorage.setItem('paddletoday:alert-preferences', JSON.stringify({ email: '', routeAlerts: [] }));
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/saved?tab=alerts');
  await expect(page.getByText('No route alerts recorded', { exact: true })).toBeVisible();
  await expect(page.getByText('No saved routes yet', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Browse routes for alerts', exact: true }).click();
  await expect(page).toHaveURL(/\/explore$/);
});
