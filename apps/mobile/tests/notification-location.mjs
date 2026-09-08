// Shared dialog/settings regression against a local Expo export. All geocoding
// and subscription writes are intercepted; no real alerts are changed.
import { chromium, expect } from '@playwright/test';

const browser = await chromium.launch();
try {
  for (const width of [320, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    await context.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:area-notification-preferences', JSON.stringify({
        id: 'test-subscription', managementToken: 'test-token', locationLabel: 'Old town',
        maxTravelMinutes: 120, todayEnabled: true, weekendEnabled: false, isActive: true,
      }));
    });
    const page = await context.newPage();
    const patches = [];
    await page.route('**/api/**', async route => {
      if (route.request().method() === 'GET') return route.continue();
      const input = route.request().postDataJSON();
      patches.push(input);
      if (patches.length === 1) return route.fulfill({ status: 503, json: { message: 'Test update unavailable' } });
      await route.fulfill({ json: { ok: true, created: false, requestId: 'test-request', subscription: {
        id: 'test-subscription', managementToken: 'test-token', locationLabel: input.locationLabel,
        maxTravelMinutes: 120, todayEnabled: true, weekendEnabled: false, isActive: true,
      } } });
    });
    await page.route('https://geocoding-api.open-meteo.com/**', route => route.fulfill({ json: { results: [
      { name: 'Milaca', admin1: 'Minnesota', latitude: 45.755, longitude: -93.654, population: 3000 },
    ] } }));
    await page.goto(new URL('/notifications', process.argv[2] ?? 'http://127.0.0.1:4391').href);
    await page.getByRole('button', { name: 'Choose city or ZIP', exact: true }).click();
    const input = page.getByRole('textbox', { name: 'City, state, or ZIP code', exact: true });
    await expect(input).toBeFocused();
    await input.fill('Milaca');
    await page.screenshot({ path: `apps/mobile/.expo/mobile-location-dialog-${width}.png` });
    await page.getByRole('button', { name: 'Use this location', exact: true }).click();
    await expect(input).toHaveCount(0);
    await expect(page.getByText('Could not update the alert area. Alerts still use Old town.', { exact: true })).toBeVisible();
    const errorBounds = await page.getByText('Could not update the alert area. Alerts still use Old town.', { exact: true }).boundingBox();
    expect(errorBounds.x + errorBounds.width).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await expect(page.getByText(/hours of Old town/)).toBeVisible();
    await page.waitForTimeout(300);
    expect(patches).toHaveLength(1);
    await page.screenshot({ path: `apps/mobile/.expo/mobile-alert-retry-${width}.png` });
    await page.getByRole('button', { name: 'Retry alert area update', exact: true }).click();
    await expect(page.getByText(/hours of Milaca, Minnesota/)).toBeVisible();
    expect(patches).toHaveLength(2);
    expect(patches[1]).toMatchObject({ latitude: 45.755, longitude: -93.654, locationLabel: 'Milaca, Minnesota' });
    expect(patches[1]).not.toHaveProperty('todayEnabled');
    expect(patches[1]).not.toHaveProperty('weekendEnabled');
    await page.reload();
    await expect(page.getByText(/hours of Milaca, Minnesota/)).toBeVisible();
    await page.getByRole('button', { name: 'Change planning location', exact: true }).click();
    await expect(input).toHaveValue('');
    await page.getByRole('button', { name: 'Close location search', exact: true }).click();
    await expect(input).toHaveCount(0);
    await page.screenshot({ path: `apps/mobile/.expo/mobile-notifications-${width}.png` });
    console.log(`PASS ${width}px: manual location, failed area sync retains saved area, deliberate retry, preference preservation, persistence and dismissal`);
    await context.close();
  }
} finally { await browser.close(); }
