import { test, expect, type Route } from '@playwright/test';

for (const failure of ['incomplete response', 'timeout', 'server error', 'unreadable response', 'network failure']) {
  test(`connection check recovers from ${failure}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    const initialFeed = page.waitForResponse((response) => response.url().includes('/api/rivers/summary.json'));
    await page.goto('/more');
    await initialFeed;
    let pending: Route | null = null;
    let requests = 0;
    await page.route('**/api/rivers/summary.json', (route) => { requests++; pending = route; });
    const check = page.getByRole('button', { name: 'Check connection', exact: true });
    await check.press('Space');
    await expect.poll(() => pending !== null).toBe(true);
    await expect(check).toBeDisabled();
    await expect(check).toHaveAttribute('aria-busy', 'true');
    await check.dispatchEvent('click');
    expect(requests).toBe(1);
    if (failure === 'incomplete response') {
      await pending!.fulfill({ json: { ok: false } });
      await expect(page.getByText('The server responded, but the route feed was missing. Please try again.', { exact: true })).toBeVisible();
    } else if (failure === 'timeout') {
      await expect(page.getByText('The connection check timed out. Please try again.', { exact: true })).toBeVisible({ timeout: 15_000 });
      await pending!.fulfill({ json: { rivers: [] } });
    } else if (failure === 'server error') {
      await pending!.fulfill({ status: 503, json: { error: 'offline' } });
      await expect(page.getByText('PaddleToday could not load routes right now. Please try again shortly.', { exact: true })).toBeVisible();
    } else if (failure === 'unreadable response') {
      await pending!.fulfill({ status: 200, contentType: 'text/html', body: '<html>upstream unavailable</html>' });
      await expect(page.getByText('PaddleToday returned unreadable route information. Please try again shortly.', { exact: true })).toBeVisible();
    } else {
      await pending!.abort();
      await expect(page.getByText('Could not reach PaddleToday. Check your internet connection and try again.', { exact: true })).toBeVisible();
    }
    await expect(check).toBeEnabled();
    pending = null;
    await check.click();
    await expect.poll(() => pending !== null).toBe(true);
    await pending!.fulfill({ json: { rivers: [], riverCount: 999 } });
    await expect(page.getByText('Connected. No routes were returned.', { exact: true })).toBeVisible();
    await expect(check).toBeEnabled();
    expect((await check.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  });
}
