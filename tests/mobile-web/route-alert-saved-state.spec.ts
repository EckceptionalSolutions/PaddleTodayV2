import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

const slug = 'rice-creek-peltier-to-long-lake';
const alert = (threshold: 'good' | 'strong', deliveryMethod = 'push', riverSlug = slug) => ({
  riverSlug, threshold, deliveryMethod, updatedAt: '2026-09-08T12:00:00Z',
});

for (const both of [false, true]) {
  test(`route sheet distinguishes saved phone thresholds from email: both=${both}`, async ({ page }) => {
    await page.addInitScript((routeAlerts) => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:alert-preferences', JSON.stringify({ email: 'paddler@example.com', routeAlerts }));
    }, [alert('good'), alert('strong', both ? 'push' : 'email'), alert('strong', 'push', 'another-route')]);
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ json: fixture }));
    await page.goto(`/river/${slug}`);
    await page.getByRole('button', { name: 'Set route alert', exact: true }).click();
    const dialog = page.getByRole('dialog');
    const good = dialog.getByRole('button', { name: 'Phone alert at Good', exact: true });
    const strong = dialog.getByRole('button', { name: 'Phone alert at Strong', exact: true });
    await expect(good).toHaveAttribute('aria-pressed', 'true');
    await expect(strong).toHaveAttribute('aria-pressed', String(both));
    await expect(dialog.getByText(`Saved phone alerts: ${both ? 'Good, Strong' : 'Good'}.`, { exact: true })).toBeVisible();
    await page.screenshot({ path: `tmp/route-alert-saved-${both}-${page.viewportSize()!.width}.png` });
    await strong.click();
    await expect(dialog.getByText('Phone alerts are not available on web.', { exact: true })).toBeVisible();
    await expect(strong).toHaveAttribute('aria-pressed', String(both));
  });
}

test('unreadable preferences can be recovered inside the route alert sheet', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:alert-preferences', '{unfinished');
  });
  let submissions = 0;
  await page.route('**/api/**', route => {
    if (route.request().method() !== 'GET') submissions++;
    return route.fulfill({ status: 503, json: { error: 'offline' } });
  });
  await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ json: fixture }));
  await page.goto(`/river/${slug}`);
  await page.getByRole('button', { name: 'Set route alert', exact: true }).click();
  const dialog = page.getByRole('dialog');
  const retry = dialog.getByRole('button', { name: 'Retry loading local preferences', exact: true });
  await expect(retry).toBeVisible();
  await retry.click();
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:alert-preferences'))).toBe('{unfinished');
  await page.evaluate(record => localStorage.setItem('paddletoday:alert-preferences', JSON.stringify({ email: '', routeAlerts: [record] })), alert('good'));
  await retry.click();
  await expect(retry).toBeHidden();
  await expect(dialog.getByRole('button', { name: 'Phone alert at Good', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(submissions).toBe(0);
});
