import { test, expect, type Route } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('cached route details stay usable during a failed refresh and explicit retry', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  let mode: 'success' | 'offline' | 'pending' = 'success';
  let pending: Route | null = null;
  let retries = 0;
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => {
    if (mode === 'pending') { pending = route; retries += 1; return; }
    return mode === 'success' ? route.fulfill({ json: fixture }) : route.fulfill({ status: 503, json: { error: 'offline' } });
  });
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await expect(page.getByRole('button', { name: 'Share route', exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => {
    const cache = JSON.parse(localStorage.getItem('paddletoday-mobile-query-cache') || 'null');
    return cache?.clientState?.queries?.some((query: { queryKey: string[] }) => query.queryKey[0] === 'river-detail') ?? false;
  })).toBe(true);
  await page.addInitScript(() => {
    const key = 'paddletoday-mobile-query-cache';
    const cache = JSON.parse(localStorage.getItem(key)!);
    for (const query of cache.clientState.queries) query.state.dataUpdatedAt = Date.now() - 30 * 60 * 1000;
    localStorage.setItem(key, JSON.stringify(cache));
  });
  mode = 'offline';
  await page.reload();
  const retry = page.getByRole('button', { name: 'Retry route details', exact: true });
  await expect(retry).toBeVisible();
  await expect(page.getByRole('button', { name: 'Share route', exact: true })).toBeVisible();
  mode = 'pending';
  await retry.click();
  await expect(retry).toBeDisabled();
  await expect(retry).toHaveAttribute('aria-busy', 'true');
  await page.getByRole('button', { name: 'Show Access section', exact: true }).first().click();
  await expect(page.getByRole('button', { name: 'Prepare this trip', exact: true })).toBeVisible();
  await expect.poll(() => retries).toBe(1);
  await pending!.fulfill({ json: fixture });
  await expect(retry).toBeHidden();
  await expect(page.getByRole('button', { name: 'Prepare this trip', exact: true })).toBeVisible();
});
