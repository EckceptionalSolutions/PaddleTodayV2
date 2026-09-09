import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('closed report drafts are discoverable and protected when leaving the route', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:alert-preferences', JSON.stringify({ email: 'saved@example.test', routeAlerts: [] }));
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  const back = page.getByRole('link', { name: 'Go back', exact: true });
  await back.click();
  await expect(page).not.toHaveURL(/\/river\//);
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByRole('button', { name: 'Show Reports section', exact: true }).first().click();
  await page.getByRole('button', { name: 'Send route report', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('textbox', { name: 'Route report', exact: true }).fill('Unsent notes about the landing.');
  await dialog.getByRole('button', { name: 'Close route report', exact: true }).click();
  await expect(page.getByText('Your unsent report', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Continue route report', exact: true }).click();
  await expect(dialog.getByRole('textbox', { name: 'Route report', exact: true })).toHaveValue('Unsent notes about the landing.');
  await dialog.getByRole('button', { name: 'Close route report', exact: true }).click();
  await back.click();
  await expect(dialog.getByText('Leave this unsent report?', { exact: true })).toBeVisible();
  await page.screenshot({ path: `tmp/report-exit-${page.viewportSize()!.width}.png` });
  await dialog.getByRole('button', { name: 'Keep report', exact: true }).click();
  await page.getByRole('button', { name: 'Continue route report', exact: true }).click();
  await expect(dialog.getByRole('textbox', { name: 'Route report', exact: true })).toHaveValue('Unsent notes about the landing.');
  await dialog.getByRole('button', { name: 'Close route report', exact: true }).click();
  await back.click();
  await dialog.getByRole('button', { name: 'Discard changes', exact: true }).click();
  await expect(page).not.toHaveURL(/\/river\//);
});
