import { test, expect, type Route } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('supported rivers retry directly and state tabs work by keyboard', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/more');
  const retry = page.getByRole('button', { name: 'Retry supported rivers', exact: true });
  await expect(retry).toBeVisible();
  let pending: Route | null = null;
  let requests = 0;
  await page.route('**/api/rivers/summary.json', (route) => { pending = route; requests += 1; });
  await retry.press('Space');
  await expect(retry).toBeDisabled();
  await expect(retry).toHaveAttribute('aria-busy', 'true');
  await retry.dispatchEvent('click');
  await expect.poll(() => pending !== null).toBe(true);
  expect(requests).toBe(1);
  await pending!.fulfill({ json: { rivers: [fixture.result, {
    ...fixture.result,
    river: { ...fixture.result.river, riverId: 'qa-wisconsin', slug: 'qa-wisconsin', name: 'QA Wisconsin River', state: 'Wisconsin' },
  }] } });
  await expect(retry).toHaveCount(0);
  const minnesota = page.getByRole('tab', { name: 'Minnesota supported rivers', exact: true });
  const wisconsin = page.getByRole('tab', { name: 'Wisconsin supported rivers', exact: true });
  await expect(minnesota).toHaveAttribute('aria-selected', 'true');
  await minnesota.press('ArrowRight');
  await expect(wisconsin).toBeFocused();
  await expect(wisconsin).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('button', { name: /^Open QA Wisconsin River,/ })).toBeVisible();
  await wisconsin.press('Home');
  await expect(minnesota).toBeFocused();
  await expect(page.getByRole('button', { name: /^Open Rice Creek,/ })).toBeVisible();
});
