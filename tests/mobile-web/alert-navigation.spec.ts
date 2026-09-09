import { test, expect } from '@playwright/test';

for (const saved of [false, true]) {
  test(`alert settings link to the correct Saved tab with ${saved ? 'a saved route' : 'no saved routes'}`, async ({ page }) => {
    await page.addInitScript(saved => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      if (saved) localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{ slug: 'rice-creek', name: 'Rice Creek', reach: 'QA reach', savedAt: new Date().toISOString() }]));
    }, saved);
    let writes = 0;
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(`${page.url()}: ${error.message}`));
    await page.route('**/api/**', route => {
      if (route.request().method() !== 'GET') writes++;
      return route.fulfill({ status: 503, json: { error: 'offline' } });
    });
    await page.goto('/notifications');
    await page.getByRole('button', { name: 'Manage route alerts', exact: true }).press('Enter');
    await expect(page).toHaveURL('/saved?tab=alerts');
    const alerts = page.getByRole('tab', { name: 'Alerts', exact: true });
    await expect(alerts).toHaveAttribute('aria-selected', 'true');
    await page.getByRole('button', { name: 'Open notification settings', exact: true }).press('Enter');
    await expect(page).toHaveURL('/notifications');
    await page.getByRole('button', { name: 'Manage route alerts', exact: true }).click();
    await page.reload();
    await expect(alerts).toHaveAttribute('aria-selected', 'true');
    await alerts.press('ArrowLeft');
    await expect(page.getByRole('tablist', { name: 'Saved route sections' }).getByRole('tab', { name: 'Saved routes', exact: true })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('button', { name: 'Open notification settings', exact: true })).toHaveCount(0);
    expect(writes).toBe(0);
    expect(errors).toEqual([]);
  });
}
