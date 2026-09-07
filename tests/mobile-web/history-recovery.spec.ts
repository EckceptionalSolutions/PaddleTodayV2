import { test, expect, type Route } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const hasHistory of [false, true]) {
test(`score history retries into ${hasHistory ? 'an accessible chart' : 'an empty history'} without duplicate requests`, async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  let hold = false;
  let pending: Route | null = null;
  let retries = 0;
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake/history.json?days=7', (route) => {
    if (hold) { pending = route; retries += 1; return; }
    return route.fulfill({ status: 503, json: { error: 'offline' } });
  });
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByRole('button', { name: 'Show More section', exact: true }).first().click();
  const retry = page.getByRole('button', { name: 'Retry score history', exact: true });
  await expect(retry).toBeVisible();
  await expect(page.getByText('Not enough history yet.', { exact: true })).toBeHidden();
  hold = true;
  await retry.click();
  await expect(retry).toBeDisabled();
  await expect(retry).toHaveAttribute('aria-busy', 'true');
  await retry.dispatchEvent('click');
  await expect.poll(() => retries).toBe(1);
  await pending!.fulfill({ json: { requestId: 'qa-history', generatedAt: new Date().toISOString(), result: {
    river: fixture.result.river, latestSnapshotAt: null,
    days: hasHistory ? [{ date: '2026-09-06', avgScore: 72, maxScore: 80, latestRating: 'Good' }, { date: '2026-09-07', avgScore: 88, maxScore: 92, latestRating: 'Strong' }] : [],
    todayHourly: [],
  } } });
  await expect(retry).toBeHidden();
  if (hasHistory) {
    await expect(page.getByRole('img', { name: 'Daily average route scores. September 6, 2026: 72 out of 100. September 7, 2026: 88 out of 100.', exact: true })).toBeVisible();
    await expect(page.getByText('Not enough history yet.', { exact: true })).toBeHidden();
  } else {
    await expect(page.getByText('Not enough history yet.', { exact: true })).toBeVisible();
  }
});
}
