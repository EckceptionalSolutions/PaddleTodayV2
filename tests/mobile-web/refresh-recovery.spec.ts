import { test, expect, type Route } from '@playwright/test';

for (const path of ['/', '/explore', '/weekend']) {
  test(`cached routes remain usable while retrying a failed refresh on ${path}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    let mode: 'success' | 'offline' | 'pending' = 'success';
    let pending: Route | null = null;
    let retryRequests = 0;
    const queryKey = path === '/weekend' ? 'weekend-summary' : 'river-summary';
    const endpoint = path === '/weekend' ? '**/api/weekend/summary.json' : '**/api/rivers/summary.json';
    await page.route(endpoint, async (route) => {
      if (mode === 'pending') {
        retryRequests += 1;
        pending = route;
      } else if (mode === 'offline') {
        await route.fulfill({ status: 503, json: { error: 'offline' } });
      } else {
        await route.fulfill({ json: { rivers: [] } });
      }
    });
    await page.goto(path);
    await expect.poll(() => page.evaluate((queryKey) => {
      const cache = JSON.parse(localStorage.getItem('paddletoday-mobile-query-cache') || 'null');
      return cache?.clientState?.queries?.some((query: { queryKey: string[] }) => query.queryKey[0] === queryKey) ?? false;
    }, queryKey)).toBe(true);
    await page.evaluate(() => {
      const key = 'paddletoday-mobile-query-cache';
      const cache = JSON.parse(localStorage.getItem(key)!);
      for (const query of cache.clientState.queries) query.state.dataUpdatedAt = Date.now() - 30 * 60 * 1000;
      localStorage.setItem(key, JSON.stringify(cache));
    });
    mode = 'offline';
    await page.reload();
    await expect(page.getByText('Could not refresh', { exact: true })).toBeVisible();
    mode = 'pending';
    const retry = page.getByRole('button', { name: 'Retry refresh', exact: true });
    await retry.click();
    await expect.poll(() => pending !== null).toBe(true);
    await expect(retry).toBeDisabled();
    await expect(retry).toHaveAttribute('aria-busy', 'true');
    await expect(retry).toHaveText('Retrying…');
    if (path === '/explore') {
      await page.getByRole('tab', { name: 'list view', exact: true }).click();
      await expect(retry).toBeDisabled();
      await expect(retry).toHaveAttribute('aria-busy', 'true');
    }
    expect(retryRequests).toBe(1);
    await pending!.fulfill({ json: { rivers: [] } });
    await expect(page.getByText('Could not refresh', { exact: true })).toBeHidden();
  });
}
