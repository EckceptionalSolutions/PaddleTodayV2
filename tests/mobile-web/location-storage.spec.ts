import { test, expect } from '@playwright/test';

test('location write and clear failures are visible and retry locally without another search', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    if (!localStorage.getItem('qa:location-seeded')) {
      localStorage.setItem('qa:location-seeded', '1');
      localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 45, longitude: -93, label: 'Old city', source: 'search' }));
    }
    const state = window as unknown as { failLocationWrite: boolean; failLocationClear: boolean };
    state.failLocationWrite = true;
    state.failLocationClear = true;
    const set = Storage.prototype.setItem, remove = Storage.prototype.removeItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === 'paddletoday:user-location' && state.failLocationWrite) throw Error('QA storage unavailable');
      return set.call(this, key, value);
    };
    Storage.prototype.removeItem = function (key) {
      if (key === 'paddletoday:user-location' && state.failLocationClear) throw Error('QA removal unavailable');
      return remove.call(this, key);
    };
  });
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  let searches = 0;
  await page.route('https://geocoding-api.open-meteo.com/**', route => {
    searches++;
    return route.fulfill({ json: { results: [{ name: 'Milaca', admin1: 'Minnesota', latitude: 45.755, longitude: -93.654 }] } });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Change planning location', exact: true }).click();
  await page.getByRole('textbox', { name: 'City, state, or ZIP code', exact: true }).fill('Milaca');
  await page.getByRole('button', { name: 'Use this location', exact: true }).click();
  const failedSave = page.getByText('Milaca, Minnesota is in use, but could not be saved on this device. It may be lost after restarting.', { exact: true });
  await expect(failedSave).toBeVisible();
  await failedSave.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `tmp/location-storage-${page.viewportSize()!.width}.png` });
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:user-location')!).label)).toBe('Old city');
  await page.evaluate(() => { (window as unknown as { failLocationWrite: boolean }).failLocationWrite = false; });
  await page.getByRole('button', { name: 'Retry saving location', exact: true }).click();
  await expect(failedSave).toBeHidden();
  expect(searches).toBe(1);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:user-location')!).label)).toBe('Milaca, Minnesota');
  await page.getByRole('tab', { name: 'Weekend', exact: true }).click();
  await page.getByRole('button', { name: 'Clear weekend planning location', exact: true }).click();
  const failedClear = page.getByText('The location is cleared for this session, but could not be removed from this device. It may return after restarting.', { exact: true }).filter({ visible: true });
  await expect(failedClear).toBeVisible();
  await page.evaluate(() => { (window as unknown as { failLocationClear: boolean }).failLocationClear = false; });
  await page.getByRole('button', { name: 'Retry saving location', exact: true }).click();
  await expect(failedClear).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:user-location'))).toBeNull();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Use location for weekend routes', exact: true })).toBeVisible();
});
