import { test, expect, type Route } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('community reports distinguish unavailable from empty and retry without duplicate requests', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  let pending: Route | null = null;
  let hold = false;
  let retries = 0;
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake/community.json', (route) => {
    if (hold) { retries += 1; pending = route; return; }
    return route.fulfill({ status: 503, json: { error: 'offline' } });
  });
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByRole('button', { name: 'Show Reports section', exact: true }).first().click();
  const retry = page.getByRole('button', { name: 'Retry community reports', exact: true });
  await expect(retry).toBeVisible();
  await expect(page.getByText('No approved reports yet.', { exact: true })).toBeHidden();
  hold = true;
  await retry.click();
  await expect(retry).toBeDisabled();
  await expect(retry).toHaveAttribute('aria-busy', 'true');
  await retry.dispatchEvent('click');
  await expect.poll(() => retries).toBe(1);
  await pending!.fulfill({ json: { requestId: 'qa-community', riverSlug: fixture.result.river.slug, photos: [], reports: [] } });
  await expect(retry).toBeHidden();
  await expect(page.getByText('No approved reports yet.', { exact: true })).toBeVisible();
});
