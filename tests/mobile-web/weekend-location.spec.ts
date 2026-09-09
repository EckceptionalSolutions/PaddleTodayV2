import { test, expect } from '@playwright/test';

test('Weekend location supports keyboard retry, pending feedback, and clearing', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    const state = window as unknown as { locationCalls: number; finishLocation: (ok: boolean) => void };
    state.locationCalls = 0;
    Object.defineProperty(navigator.permissions, 'query', { configurable: true, value: async () => ({ state: 'granted' }) });
    Object.defineProperty(navigator.geolocation, 'getCurrentPosition', { configurable: true, value: (success: PositionCallback, failure: PositionErrorCallback) => {
      state.locationCalls += 1;
      state.finishLocation = (ok) => ok ? success({
        coords: { latitude: 45.08, longitude: -93.2, accuracy: 20, altitude: null, altitudeAccuracy: null, heading: null, speed: null },
        timestamp: Date.now(),
      } as GeolocationPosition) : failure({ code: 2, message: 'QA unavailable' } as GeolocationPositionError);
    } });
  });
  await page.route('**/api/**', (route) => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/weekend');
  const use = page.getByRole('button', { name: 'Use location for weekend routes', exact: true });
  await use.press('Space');
  await expect(use).toBeDisabled();
  await expect(use).toHaveAttribute('aria-busy', 'true');
  await use.dispatchEvent('click');
  await expect.poll(() => page.evaluate(() => (window as unknown as { locationCalls: number }).locationCalls)).toBe(1);
  await page.evaluate(() => (window as unknown as { finishLocation: (ok: boolean) => void }).finishLocation(false));
  await expect(page.getByText('Could not find your location. Try again or choose a city below.', { exact: true })).toBeVisible();
  await expect(use).toBeEnabled();
  await use.press('Space');
  await expect.poll(() => page.evaluate(() => (window as unknown as { locationCalls: number }).locationCalls)).toBe(2);
  await page.evaluate(() => (window as unknown as { finishLocation: (ok: boolean) => void }).finishLocation(true));
  const clear = page.getByRole('button', { name: 'Clear weekend planning location', exact: true });
  await expect(clear).toBeVisible();
  expect((await clear.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await expect(page.getByRole('radiogroup', { name: 'Weekend range', exact: true })).toBeVisible();
  await clear.press('Space');
  await expect(use).toBeVisible();
  await expect(page.getByRole('radiogroup', { name: 'Weekend range', exact: true })).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('paddletoday:user-location'))).toBeNull();
});

test('Weekend can plan from a city after GPS permission is denied', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    Object.defineProperty(navigator.permissions, 'query', { configurable: true, value: async () => ({ state: 'denied' }) });
  });
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  await page.route('https://geocoding-api.open-meteo.com/**', route => route.fulfill({ json: { results: [
    { latitude: 45.1, longitude: -93.2, name: 'Circle Pines', admin1: 'Minnesota' },
  ] } }));
  await page.goto('/weekend');
  await page.getByRole('button', { name: 'Use location for weekend routes', exact: true }).click();
  await expect(page.getByText('Location permission was denied. Choose a city below or allow location access and retry.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Choose a city or ZIP', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('textbox', { name: 'City, state, or ZIP code', exact: true }).fill('Circle Pines');
  await dialog.getByRole('button', { name: 'Use this location', exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByText('Planning from Circle Pines, Minnesota', { exact: true })).toBeVisible();
  await expect(page.getByRole('radiogroup', { name: 'Weekend range', exact: true })).toBeVisible();
  await page.screenshot({ path: `tmp/weekend-city-${page.viewportSize()!.width}.png` });
  const saved = await page.evaluate(() => localStorage.getItem('paddletoday:user-location'));
  await page.getByRole('button', { name: 'Change planning city', exact: true }).click();
  await dialog.getByRole('textbox', { name: 'City, state, or ZIP code', exact: true }).fill('Unsent city');
  await dialog.getByRole('button', { name: 'Close location search', exact: true }).click();
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:user-location'))).toBe(saved);
  await page.reload();
  await expect(page.getByText('Planning from Circle Pines, Minnesota', { exact: true })).toBeVisible();
});
