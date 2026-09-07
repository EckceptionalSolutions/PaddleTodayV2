import { test, expect } from '@playwright/test';

for (const outcome of ['success', 'failure', 'leave']) {
  test(`Best nearby waits for location and handles ${outcome}`, async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 145, longitude: -93, label: 'Corrupt saved location', source: 'search' }));
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
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: [] } }));
    await page.goto('/');
    await page.getByRole('button', { name: 'Best nearby', exact: true }).click();
    const finding = page.getByRole('button', { name: 'Finding nearby', exact: true });
    await expect(finding).toBeDisabled();
    await expect(finding).toHaveAttribute('aria-busy', 'true');
    await expect(page).toHaveURL(/\/$/);
    await finding.dispatchEvent('click');
    await expect.poll(() => page.evaluate(() => (window as unknown as { locationCalls: number }).locationCalls)).toBe(1);
    if (outcome === 'leave') await page.getByRole('tab', { name: 'More', exact: true }).click();
    await page.evaluate((ok) => (window as unknown as { finishLocation: (ok: boolean) => void }).finishLocation(ok), outcome !== 'failure');
    if (outcome === 'success') {
      await expect(page).toHaveURL(/\/explore\?.*intent=best-nearby/);
    } else if (outcome === 'failure') {
      await expect(page.getByText('Could not find your location. Try again or set a city or ZIP code above.', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Best nearby', exact: true })).toBeEnabled();
      await expect(page).toHaveURL(/\/$/);
    } else {
      await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:user-location') || 'null')?.latitude)).toBe(45.08);
      await expect(page).toHaveURL(/\/more$/);
    }
  });
}
