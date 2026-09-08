import { chromium, expect } from '@playwright/test';
const browser = await chromium.launch();
try {
  for (const width of [320, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 844 } });
    await context.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      if (!localStorage.getItem('paddletoday:user-location')) localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 45.15, longitude: -93.15, label: 'Circle Pines, MN' }));
    });
    const page = await context.newPage();
    await page.route('**/api/**', route => route.request().method() === 'GET' ? route.continue() : route.fulfill({ status: 503, json: {} }));
    await page.route('https://geocoding-api.open-meteo.com/**', route => route.fulfill({ json: { results: [
      { name: 'Milaca', admin1: 'Minnesota', latitude: 45.755, longitude: -93.654, population: 3000 },
    ] } }));
    await page.goto(new URL('/', process.argv[2] ?? 'http://127.0.0.1:4391').href);
    await expect(page.getByText('Within 100 mi of Circle Pines, MN', { exact: true })).toBeVisible();
    const badge = page.getByText(/\d+ routes to paddle/, { exact: true });
    const bounds = await badge.boundingBox();
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `apps/mobile/.expo/mobile-home-location-after-${width}.png` });
    const change = page.getByRole('button', { name: 'Change planning location', exact: true });
    await change.click();
    const input = page.getByRole('textbox', { name: 'City, state, or ZIP code', exact: true });
    await expect(input).toBeFocused();
    await input.fill('Milaca');
    await page.getByRole('button', { name: 'Use this location', exact: true }).click();
    await expect(input).toBeHidden();
    await expect(page.getByText('Within 100 mi of Milaca, Minnesota', { exact: true })).toBeVisible();
    await page.reload();
    await expect(page.getByText('Within 100 mi of Milaca, Minnesota', { exact: true })).toBeVisible();
    await change.click();
    await page.getByRole('button', { name: 'Close location search', exact: true }).click();
    await expect(input).toBeHidden();
    console.log(`PASS ${width}px: hero badge fits, existing location remains changeable, manual change persists, reopen/cancel works`);
    await context.close();
  }
} finally { await browser.close(); }
