import { test, expect, type Route } from '@playwright/test';

for (const failure of ['incomplete response', 'timeout']) {
  test(`connection check recovers from ${failure}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    const initialFeed = page.waitForResponse((response) => response.url().includes('/api/rivers/summary.json'));
    await page.goto('/more');
    await initialFeed;
    let pending: Route | null = null;
    await page.route('**/api/rivers/summary.json', (route) => { pending = route; });
    const check = page.getByRole('button', { name: 'Check connection', exact: true });
    await check.press('Space');
    await expect.poll(() => pending !== null).toBe(true);
    await expect(check).toBeDisabled();
    await expect(check).toHaveAttribute('aria-busy', 'true');
    if (failure === 'incomplete response') {
      await pending!.fulfill({ json: { ok: false } });
      await expect(page.getByText('The server responded, but the route feed was missing. Please try again.', { exact: true })).toBeVisible();
    } else {
      await expect(page.getByText('The connection check timed out. Please try again.', { exact: true })).toBeVisible({ timeout: 15_000 });
      await pending!.fulfill({ json: { rivers: [] } });
    }
    await expect(check).toBeEnabled();
    pending = null;
    await check.click();
    await expect.poll(() => pending !== null).toBe(true);
    await pending!.fulfill({ json: { rivers: [], riverCount: 999 } });
    await expect(page.getByText(/Connected in \d+ms\. Routes: 0\./)).toBeVisible();
    await expect(check).toBeEnabled();
    expect((await check.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  });
}
