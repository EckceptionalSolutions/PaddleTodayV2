import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };
import { installMobileBoardFixtures } from './mobile-board-fixtures';

const preferenceKey = 'paddletoday:appearance:v1';
const darkCanvas = 'rgb(16, 26, 22)';
const lightCanvas = 'rgb(244, 241, 232)';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
});

test('follows device changes, applies manual choices immediately, and remembers the last choice', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/more');
  await expect(page.getByRole('radio', { name: 'System appearance' })).toBeChecked();
  await expect(page.locator('body')).toHaveCSS('background-color', darkCanvas);
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await expect(page.locator('body')).toHaveCSS('background-color', lightCanvas);
  await page.getByRole('radio', { name: 'Dark appearance' }).click();
  await expect(page.locator('body')).toHaveCSS('background-color', darkCanvas);
  await expect(page.getByText('Safety and app help', { exact: true })).toHaveCSS('color', 'rgb(240, 243, 234)');
  await expect.poll(() => page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe('dark');
  await page.reload();
  await expect(page.getByRole('radio', { name: 'Dark appearance' })).toBeChecked();
  await expect(page.locator('body')).toHaveCSS('background-color', darkCanvas);
  await page.screenshot({ path: 'tmp/appearance-dark-more.png' });
  // A manual Light choice stays light even when the OS changes to dark.
  await page.getByRole('radio', { name: 'Light appearance' }).click();
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await expect(page.locator('body')).toHaveCSS('background-color', lightCanvas);
  await page.getByRole('radio', { name: 'System appearance' }).click();
  await expect(page.locator('body')).toHaveCSS('background-color', darkCanvas);
  expect(errors).toEqual([]);
});

test('appearance choices support keyboard selection', async ({ page }) => {
  await page.goto('/more');
  const system = page.getByRole('radio', { name: 'System appearance' });
  const light = page.getByRole('radio', { name: 'Light appearance' });
  const dark = page.getByRole('radio', { name: 'Dark appearance' });
  await system.focus();
  await system.press('ArrowRight');
  await expect(light).toBeFocused();
  await expect(light).toBeChecked();
  await light.press('ArrowDown');
  await expect(dark).toBeFocused();
  await expect(dark).toBeChecked();
  await expect(page.locator('body')).toHaveCSS('background-color', darkCanvas);
  await system.press('Space');
  await expect(system).toBeChecked();
});

for (const [path, heading] of [
  ['/notifications', 'Paddle alerts, your way'], ['/request-route', 'Request a route'],
  ['/privacy', 'Privacy Policy'], ['/terms', 'Terms and Safety'],
]) {
  test(`saved dark appearance applies to ${path}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:appearance:v1', 'dark'));
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(path);
    const title = page.getByRole('heading', { name: heading, exact: true });
    await expect(title).toBeVisible();
    await expect(title).toHaveCSS('color', 'rgb(240, 243, 234)');
    await expect(page.locator('body')).toHaveCSS('background-color', darkCanvas);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
    expect(errors).toEqual([]);
    if (path === '/request-route') await page.screenshot({ path: 'tmp/appearance-dark-form.png' });
  });
}

test('updates an open location sheet and keeps the typed search', async ({ page }) => {
  const fulfill = await installMobileBoardFixtures(page);
  await page.route('**/api/mobile/{summary,explore}.json**', route => fulfill(route, { json: { rivers: [{
    ...fixture.result, summary: { gaugeNow: 'QA', shortExplanation: 'Stored QA fixture' },
    liveData: { overall: 'stale', summary: 'QA' },
  }] } }));
  await page.addInitScript(() => localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 45.15, longitude: -93.15, label: 'Circle Pines, MN' })));
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Change planning location', exact: true }).click();
  const input = page.getByRole('textbox', { name: 'City, state, or ZIP code', exact: true });
  await input.fill('Milaca');
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await expect(input).toHaveValue('Milaca');
  await expect(input).toHaveCSS('color', 'rgb(240, 243, 234)');
  await expect(input.locator('..')).toHaveCSS('background-color', 'rgb(23, 35, 29)');
  await page.screenshot({ path: 'tmp/appearance-dark-location.png' });
  await page.getByRole('button', { name: 'Close location search', exact: true }).click();
  await expect(input).toBeHidden();
  await expect(page.getByRole('button', { name: 'Change planning location', exact: true })).toBeVisible();
  await page.screenshot({ path: 'tmp/appearance-dark-today.png' });
});

test('a preference read failure falls back to the device and allows a new choice', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.getItem;
    let failed = false;
    Storage.prototype.getItem = function (key) {
      if (key === 'paddletoday:appearance:v1' && !failed) { failed = true; throw new Error('QA storage read failure'); }
      return original.call(this, key);
    };
  });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/more');
  await expect(page.locator('body')).toHaveCSS('background-color', darkCanvas);
  await page.getByRole('radio', { name: 'Light appearance' }).click();
  await expect(page.locator('body')).toHaveCSS('background-color', lightCanvas);
  await expect.poll(() => page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe('light');
  await expect(page.getByText(/Your choice works for this session/)).toBeHidden();
});

test('storage write failures keep the session usable and expose a retry', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === 'paddletoday:appearance:v1') throw new Error('QA storage write failure');
      return original.call(this, key, value);
    };
  });
  await page.goto('/more');
  const dark = page.getByRole('radio', { name: 'Dark appearance' });
  await dark.click();
  await expect(dark).toBeChecked();
  await expect(page.locator('body')).toHaveCSS('background-color', darkCanvas);
  await expect(page.getByText(/Your choice works for this session/)).toBeVisible();
});
