import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('local alert preferences preserve corrupt data and recover after a readable retry', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:alert-preferences', '{"unfinished":');
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/saved');
  await expect(page.getByRole('heading', { name: 'Local alert preferences unavailable' })).toBeVisible();
  const retry = page.getByRole('button', { name: 'Retry loading local preferences', exact: true });
  await retry.press('Enter');
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:alert-preferences'))).toBe('{"unfinished":');
  await page.evaluate(() => localStorage.setItem('paddletoday:alert-preferences', JSON.stringify({ email: 'restored@example.test', routeAlerts: [] })));
  await retry.click();
  await expect(retry).toHaveCount(0);
});

test('a successful contribution can retry local email storage without resubmitting', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:alert-preferences', JSON.stringify({ email: '', routeAlerts: [] }));
    const original = Storage.prototype.setItem;
    (window as unknown as { allowPreferenceSave: boolean }).allowPreferenceSave = false;
    Storage.prototype.setItem = function(key, value) {
      if (key === 'paddletoday:alert-preferences' && !(window as unknown as { allowPreferenceSave: boolean }).allowPreferenceSave) throw new Error('QA storage failure');
      return original.call(this, key, value);
    };
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/qa-route.json', route => route.fulfill({ json: { ...fixture, result: {
    ...fixture.result, river: { ...fixture.result.river, slug: 'qa-route', name: 'QA route', reach: 'QA' },
  } } }));
  let submissions = 0;
  await page.route('**/api/route-contributions', route => { submissions++; return route.fulfill({ json: { ok: true, stored: true } }); });
  await page.goto('/contribute-photo/qa-route');
  const chooser = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Upload photos', exact: true }).click();
  await (await chooser).setFiles({ name: 'qa.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a6ioAAAAASUVORK5CYII=', 'base64') });
  await expect(page.getByText('1/4 attached', { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Name or paddling handle', exact: true }).fill('QA Paddler');
  await page.getByRole('textbox', { name: 'Email for follow-up questions', exact: true }).fill('latest@example.test');
  for (const control of await page.getByRole('checkbox').all()) await control.check();
  await page.getByRole('button', { name: 'Submit photos', exact: true }).click();
  await expect(page.getByText('Thank you. Your photos were sent for review.', { exact: true })).toBeVisible();
  const retry = page.getByRole('button', { name: 'Retry saving local preferences', exact: true });
  await retry.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `tmp/alert-preference-save-retry-${page.viewportSize()!.width}.png` });
  await retry.click();
  await expect(retry).toBeEnabled();
  expect(submissions).toBe(1);
  await page.evaluate(() => { (window as unknown as { allowPreferenceSave: boolean }).allowPreferenceSave = true; });
  await retry.press('Enter');
  await expect(retry).toHaveCount(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:alert-preferences')!).email)).toBe('latest@example.test');
  expect(submissions).toBe(1);
});
