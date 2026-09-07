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
  await expect(page.getByText('Could not find your location. Try again or set a city on Today.', { exact: true })).toBeVisible();
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
