import { installMobileBoardFixtures } from './mobile-board-fixtures';
import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Today recovers from denied GPS with a planning city and working sort controls', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    (window as any).__locationPermissionCalls = 0;
    Object.defineProperty(navigator.permissions, 'query', { configurable: true, value: () => {
      (window as any).__locationPermissionCalls++;
      return new Promise(resolve => { (window as any).__denyLocation = () => resolve({ state: 'denied' }); });
    } });
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  const fulfillMobile = await installMobileBoardFixtures(page);
  await page.route('**/api/mobile/{summary,explore}.json**', route => fulfillMobile(route, { json: { rivers: [{
    ...fixture.result, river: { ...fixture.result.river, difficulty: 'easy' },
    summary: { gaugeNow: 'QA', shortExplanation: 'QA fixture' }, liveData: { overall: 'stale', summary: 'QA' },
  }] } }));
  await page.route('https://geocoding-api.open-meteo.com/**', route => route.fulfill({ json: { results: [
    { latitude: fixture.result.river.latitude, longitude: fixture.result.river.longitude, name: 'Circle Pines', admin1: 'Minnesota' },
  ] } }));
  await page.goto('/');
  const useLocation = page.getByRole('button', { name: 'Use my location', exact: true });
  await useLocation.press('Enter');
  await expect(useLocation).toHaveAttribute('aria-busy', 'true');
  await useLocation.dispatchEvent('click');
  expect(await page.evaluate(() => (window as any).__locationPermissionCalls)).toBe(1);
  await page.evaluate(() => (window as any).__denyLocation());
  await expect(page.getByText(/^Location access is off\. Choose a city or ZIP to set your starting point\./)).toBeVisible();
  await page.getByRole('button', { name: 'Choose a city or ZIP', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('textbox', { name: 'City, state, or ZIP code', exact: true }).fill('Circle Pines');
  await dialog.getByRole('button', { name: 'Use this location', exact: true }).click();
  await expect(dialog).toBeHidden();
  const recommended = page.getByRole('button', { name: 'Recommended', exact: true });
  await expect(recommended).toBeVisible();
  const closest = page.getByRole('button', { name: 'Closest', exact: true });
  await closest.press('Enter');
  await expect(closest).toHaveAttribute('aria-pressed', 'true');
  await expect(closest).toBeFocused();
  await recommended.click();
  await expect(recommended).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Evidence first', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Evidence first', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.screenshot({ path: `tmp/today-sort-recovery-${page.viewportSize()!.width}.png` });
});
