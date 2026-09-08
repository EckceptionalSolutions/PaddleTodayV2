import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('planning location remains usable in a short viewport and retains failed searches', async ({ page }) => {
  await page.setViewportSize({ width: page.viewportSize()!.width, height: 320 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 45.15, longitude: -93.15, label: 'Circle Pines, MN' }));
  });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{ ...fixture.result,
    summary: { gaugeNow: 'QA', shortExplanation: 'Stored QA fixture' }, liveData: { overall: 'stale', summary: 'QA' },
  }] } }));
  let found = false;
  await page.route('https://geocoding-api.open-meteo.com/**', route => route.fulfill({ json: { results: found ? [
    { name: 'Milaca', admin1: 'Minnesota', latitude: 45.755, longitude: -93.654, population: 3000 },
  ] : [] } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Change planning location', exact: true }).click();
  const input = page.getByRole('textbox', { name: 'City, state, or ZIP code', exact: true });
  await expect(input).toBeFocused();
  await input.fill('Milaca');
  const submit = page.getByRole('button', { name: 'Use this location', exact: true });
  await submit.scrollIntoViewIfNeeded();
  await expect(submit).toBeInViewport({ ratio: 1 });
  await submit.click();
  await expect(page.getByText("We couldn't find that city or ZIP code.", { exact: true })).toBeVisible();
  await expect(input).toHaveValue('Milaca');
  await page.screenshot({ path: `tmp/location-picker-short-${page.viewportSize()!.width}.png` });
  found = true;
  await submit.click();
  await expect(input).toBeHidden();
  await expect(page.getByText('Within 100 mi of Milaca, Minnesota', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Change planning location', exact: true }).click();
  const close = page.getByRole('button', { name: 'Close location search', exact: true });
  await expect(close).toHaveCount(1);
  await close.scrollIntoViewIfNeeded();
  await expect(close).toBeInViewport({ ratio: 1 });
  const bounds = (await close.boundingBox())!;
  expect(bounds.width).toBeGreaterThanOrEqual(44);
  expect(bounds.height).toBeGreaterThanOrEqual(44);
  await close.press('Enter');
  await expect(input).toBeHidden();
  expect(errors).toEqual([]);
});
