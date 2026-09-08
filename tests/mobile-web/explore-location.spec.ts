import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Explore focuses a saved planning city without replacing it with GPS', async ({ page }) => {
  const location = { latitude: 46.78, longitude: -92.1, label: 'Duluth', source: 'search' };
  await page.addInitScript((location) => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:user-location', JSON.stringify(location));
    (window as unknown as { gpsCalls: number }).gpsCalls = 0;
    Object.defineProperty(navigator.permissions, 'query', { configurable: true, value: async () => ({ state: 'granted' }) });
    Object.defineProperty(navigator.geolocation, 'getCurrentPosition', { configurable: true, value: () => {
      (window as unknown as { gpsCalls: number }).gpsCalls += 1;
    } });
  }, location);
  const generatedAt = new Date().toISOString();
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { generatedAt, rivers: [{
    ...fixture.result, generatedAt, readiness: { status: 'ready', label: 'Ready', reason: 'QA fixture' },
    summary: { shortExplanation: 'QA fixture', gaugeNow: 'QA reading' },
    liveData: { overall: 'live', summary: 'Fixture', gaugeState: 'live', weatherState: 'live' },
  }] } }));
  await page.goto('/explore');
  const controls = page.getByRole('button', { name: 'Focus nearest rivers', exact: true });
  await expect(controls).toHaveCount(2);
  await controls.first().press('Space');
  await controls.last().press('Space');
  expect(await page.evaluate(() => (window as unknown as { gpsCalls: number }).gpsCalls)).toBe(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:user-location')!))).toEqual(location);
});

test('Explore location controls share pending state and expose failed retry', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    const state = window as unknown as { gpsCalls: number; failGps: () => void };
    state.gpsCalls = 0;
    Object.defineProperty(navigator.permissions, 'query', { configurable: true, value: async () => ({ state: 'granted' }) });
    Object.defineProperty(navigator.geolocation, 'getCurrentPosition', { configurable: true, value: (_success: PositionCallback, failure: PositionErrorCallback) => {
      state.gpsCalls += 1;
      state.failGps = () => failure({ code: 2, message: 'QA unavailable' } as GeolocationPositionError);
    } });
  });
  const generatedAt = new Date().toISOString();
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { generatedAt, rivers: [{
    ...fixture.result, generatedAt, readiness: { status: 'ready', label: 'Ready', reason: 'QA fixture' },
    summary: { shortExplanation: 'QA fixture', gaugeNow: 'QA reading' },
    liveData: { overall: 'live', summary: 'Fixture', gaugeState: 'live', weatherState: 'live' },
  }] } }));
  await page.goto('/explore');
  const focus = page.getByRole('button', { name: 'Focus nearest rivers', exact: true });
  await focus.press('Space');
  const finding = page.getByRole('button', { name: 'Finding location', exact: true });
  await expect(finding).toBeDisabled();
  await expect(focus).toBeDisabled();
  await expect(focus).toHaveAttribute('aria-busy', 'true');
  await finding.dispatchEvent('click');
  await expect.poll(() => page.evaluate(() => (window as unknown as { gpsCalls: number }).gpsCalls)).toBe(1);
  await page.evaluate(() => (window as unknown as { failGps: () => void }).failGps());
  await expect(page.getByText('Location unavailable · Retry', { exact: true })).toBeVisible();
  await expect(focus).toBeEnabled();
  await page.getByRole('button', { name: 'Use location', exact: true }).press('Space');
  await expect.poll(() => page.evaluate(() => (window as unknown as { gpsCalls: number }).gpsCalls)).toBe(2);
  await page.evaluate(() => (window as unknown as { failGps: () => void }).failGps());
});
