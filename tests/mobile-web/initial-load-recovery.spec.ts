import { test, expect } from '@playwright/test';

for (const path of ['/', '/explore', '/weekend']) {
  test(`initial service failure on ${path} offers clear retry guidance`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    let failed = true;
    await page.route('**/api/**', (route) => route.fulfill(failed
      ? { status: 503, json: { error: 'QA internal diagnostic' } }
      : { json: { rivers: [] } }));
    await page.goto(path);
    await expect(page.getByText('PaddleToday is temporarily unavailable. Please try again shortly.', { exact: true })).toBeVisible();
    await expect(page.getByText(/127\.0\.0\.1|QA internal diagnostic/)).toHaveCount(0);
    failed = false;
    await page.getByRole('button', { name: 'Try again', exact: true }).press('Enter');
    await expect(page.getByText('PaddleToday is temporarily unavailable. Please try again shortly.', { exact: true })).toBeHidden();
    await expect(page.getByRole('tab', { name: path === '/' ? 'Today' : path === '/explore' ? 'Explore' : 'Weekend', exact: true })).toHaveAttribute('aria-selected', 'true');
  });
}
