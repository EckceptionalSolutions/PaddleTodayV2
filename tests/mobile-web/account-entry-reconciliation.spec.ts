import { expect, test } from '@playwright/test';

test('first-run guest entry explains automatic backup and keeps existing device data', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 480 });
  const saved = [{ slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier to Long Lake',
    savedAt: '2026-10-01T12:00:00Z', notes: 'Keep the launch note.' }];
  await page.addInitScript(saved => localStorage.setItem('paddletoday:saved-rivers', JSON.stringify(saved)), saved);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/welcome');
  await expect(page.getByText('Signing in adds this device’s saved routes, notes, and trip plans to your account backup.', { exact: true })).toBeVisible();
  const guest = page.getByRole('button', { name: 'Explore PaddleToday', exact: true });
  await guest.scrollIntoViewIfNeeded();
  await expect(guest).toBeInViewport();
  await guest.press('Enter');
  await expect(page).toHaveURL('/');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:saved-rivers')!))).toEqual(saved);
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:welcome-choice:v1'))).toBe('guest');
});

test('offline status follows device connectivity without clearing saved plans', async ({ page, context }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{ slug: 'rice-creek-peltier-to-long-lake',
      name: 'Rice Creek', reach: 'Peltier to Long Lake', savedAt: '2026-10-01T12:00:00Z', notes: 'Keep the launch note.' }]));
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/saved');
  const notice = page.getByText('You’re offline. Saved plans stay on this device; backup and river data refresh when you reconnect.', { exact: true });
  await expect(notice).toBeHidden();
  await context.setOffline(true);
  await expect(notice).toBeVisible();
  await expect(page.getByRole('button', { name: /^Remove saved route: Rice Creek/ })).toBeEnabled();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:saved-rivers')!)[0].notes)).toBe('Keep the launch note.');
  await page.screenshot({ path: test.info().outputPath('offline-saved-plans.png') });
  await context.setOffline(false);
  await expect(notice).toBeHidden();
});
