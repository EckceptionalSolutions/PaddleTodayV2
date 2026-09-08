import { test, expect } from '@playwright/test';

test('ambiguous city search waits for a choice and retains the chosen city after reload', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    if (!localStorage.getItem('paddletoday:user-location')) localStorage.setItem('paddletoday:user-location', JSON.stringify({
      latitude: 45.15, longitude: -93.15, label: 'Circle Pines, MN', source: 'search',
    }));
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [] } }));
  await page.route('https://geocoding-api.open-meteo.com/**', route => route.fulfill({ json: { results: [
    { name: 'Springfield', admin1: 'Illinois', latitude: 39.8, longitude: -89.6, population: 100 },
    { name: 'Springfield', admin1: 'Minnesota', latitude: 44.2, longitude: -95, population: 20 },
  ] } }));
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Change planning location', exact: true });
  await open.click();
  const input = page.getByRole('textbox', { name: 'City, state, or ZIP code', exact: true });
  const search = page.getByRole('button', { name: 'Use this location', exact: true });
  await input.fill('Springfield');
  await search.click();
  const minnesota = page.getByRole('button', { name: 'Use Springfield, Minnesota', exact: true });
  await expect(minnesota).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:user-location')!).label)).toBe('Circle Pines, MN');
  await page.getByRole('button', { name: 'Close location search', exact: true }).click();
  await open.click();
  await expect(minnesota).toHaveCount(0);
  await input.fill('Springfield');
  await search.click();
  await expect(minnesota).toBeVisible();
  await page.screenshot({ path: `tmp/location-choices-${page.viewportSize()!.width}.png` });
  await minnesota.press('Enter');
  await expect(input).toBeHidden();
  await expect(page.getByText('Within 100 mi of Springfield, Minnesota', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText('Within 100 mi of Springfield, Minnesota', { exact: true })).toBeVisible();
});
