import { test, expect } from '@playwright/test';

for (const [path, heading] of [
  ['/notifications', 'Paddle alerts, your way'], ['/request-route', 'Request a route'],
  ['/privacy', 'Privacy Policy'], ['/terms', 'Terms and Safety'], ['/more', 'Safety and app help'],
]) {
  test(`${path} opens directly without a hydration error or horizontal overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.goto(path);
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    await page.screenshot({ path: `tmp/mobile-direct-${path.slice(1)}-${page.viewportSize()!.width}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
    expect(errors).toEqual([]);
  });
}
