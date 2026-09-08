import { test, expect } from '@playwright/test';

for (const mode of ['analytics', 'progress']) {
  test(`welcome recovers from ${mode} storage failure`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript((mode) => {
      localStorage.setItem('qa:fail-storage', '1');
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        const target = mode === 'analytics' ? 'first-route-open-pending' : 'welcome-completed';
        if (localStorage.getItem('qa:fail-storage') === '1' && key.includes(target)) {
          throw new Error('QA storage unavailable');
        }
        return original.call(this, key, value);
      };
    }, mode);
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline', message: 'Offline test' } }));
    await page.goto('/welcome');
    const proceed = page.getByRole('button', { name: "Skip to today's best routes" });
    await proceed.click();
    if (mode === 'progress') {
      await expect(page.getByText("Couldn't save your progress. Please try again.")).toBeVisible();
      await expect(proceed).toBeEnabled();
      await page.evaluate(() => localStorage.removeItem('qa:fail-storage'));
      await proceed.click();
    }
    await expect(page).toHaveURL('/');
    expect(errors).toEqual([]);
  });
}
