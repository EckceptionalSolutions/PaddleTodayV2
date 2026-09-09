import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Today retains sorting after Nearest is denied GPS', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    (window as any).__locationPermissionCalls = 0;
    Object.defineProperty(navigator.permissions, 'query', { configurable: true, value: () => {
      (window as any).__locationPermissionCalls++;
      return new Promise(resolve => { (window as any).__denyLocation = () => resolve({ state: 'denied' }); });
    } });
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{
    ...fixture.result, river: { ...fixture.result.river, difficulty: 'easy' },
    summary: { gaugeNow: 'QA', shortExplanation: 'QA fixture' }, liveData: { overall: 'stale', summary: 'QA' },
  }] } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Nearest', exact: true }).press('Enter');
  await expect(page.getByRole('button', { name: 'Nearest', exact: true })).toHaveAttribute('aria-busy', 'true');
  await page.getByRole('button', { name: 'Nearest', exact: true }).dispatchEvent('click');
  expect(await page.evaluate(() => (window as any).__locationPermissionCalls)).toBe(1);
  await page.evaluate(() => (window as any).__denyLocation());
  const recommended = page.getByRole('button', { name: 'Recommended', exact: true });
  await expect(recommended).toBeVisible();
  await expect(page.getByRole('button', { name: 'Nearest', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Nearest', exact: true })).toBeFocused();
  await recommended.click();
  await expect(recommended).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Evidence first', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Evidence first', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.screenshot({ path: `tmp/today-sort-recovery-${page.viewportSize()!.width}.png` });
});
