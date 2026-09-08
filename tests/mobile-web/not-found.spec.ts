import { test, expect } from '@playwright/test';

for (const [label, path] of [["Go to today's routes", '/'], ['Explore routes', '/explore'], ['Open saved routes', '/saved']]) {
  test(`missing screen recovers by keyboard to ${path} without retaining the dead end`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.goto('/missing-screen-for-qa');
    await expect(page.getByRole('heading', { name: 'Page not found', exact: true })).toBeVisible();
    const historyLength = await page.evaluate(() => history.length);
    const link = page.getByRole('link', { name: label, exact: true });
    await expect(link).toBeVisible();
    await link.press('Enter');
    await expect(page).toHaveURL(path);
    await expect(page.getByRole('heading', { name: 'Page not found', exact: true })).toBeHidden();
    expect(await page.evaluate(() => history.length)).toBe(historyLength);
  });
}


test('missing route has an Explore recovery action without repeated requests', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  let requests = 0;
  await page.route('**/api/rivers/missing-river.json', (route) => { requests++; return route.fulfill({ status: 404, json: { error: 'not_found' } }); });
  await page.goto('/river/missing-river');
  await expect(page.getByRole('heading', { name: 'Route not found', exact: true })).toBeVisible();
  expect(requests).toBe(1);
  await expect(page.getByText('Check your connection, then try again.', { exact: true })).toBeHidden();
  await page.getByRole('button', { name: 'Explore routes', exact: true }).press('Enter');
  await expect(page).toHaveURL('/explore');
});
