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
  await expect(page.getByRole('button', { name: /^Browse QA Wisconsin River:/ })).toBeVisible();
  await wisconsin.press('Home');
  await expect(minnesota).toBeFocused();
  await expect(page.getByRole('button', { name: /^Browse Rice Creek:/ })).toBeVisible();
});

test('the river directory shows full names and route counts without implying a river-wide condition score', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  const name = 'A very long northern branch of the wandering Minnesota River';
  const generatedAt = '2020-01-01T00:00:00Z';
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { generatedAt, rivers: [1, 2].map(number => ({
    ...fixture.result, generatedAt, score: 95, rating: 'Strong',
    river: { ...fixture.result.river, name, riverId: 'directory-test', slug: `directory-${number}` },
  })) } }));
  await page.goto('/more');
  const row = page.getByRole('button', { name: `Browse ${name}: 2 routes`, exact: true });
  await row.scrollIntoViewIfNeeded();
  await expect(row).toBeVisible();
  await expect(row).toContainText('2 routes');
  await expect(row).not.toContainText('95');
  await expect(row).not.toContainText('Strong');
  const title = row.getByText(name, { exact: true });
  expect(await title.evaluate(element => element.scrollHeight <= element.clientHeight + 1)).toBe(true);
  await page.screenshot({ path: `tmp/support-directory-${page.viewportSize()!.width}.png` });
  await row.press('Enter');
  await expect(page).toHaveURL('/river-hub/directory-test');
});
