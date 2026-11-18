import { installMobileBoardFixtures } from './mobile-board-fixtures';
import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Explore switches from Minnesota to GPS and then to a new planning city across reloads', async ({ page, context }) => {
  const location = { latitude: 46.78, longitude: -92.1, label: 'Duluth', source: 'search' };
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation({ latitude: 33.45, longitude: -112.07 });
  await page.addInitScript((location) => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    if (!localStorage.getItem('paddletoday:user-location')) localStorage.setItem('paddletoday:user-location', JSON.stringify(location));
  }, location);
  await page.route('**/v1/search?**', route => {
    expect(new URL(route.request().url()).searchParams.get('name')).toBe('Tucson');
    return route.fulfill({ json: { results: [
      { name: 'Tucson', admin1: 'Arizona', latitude: 32.22, longitude: -110.97 },
      { name: 'Tucson', admin1: 'Ohio', latitude: 39.24, longitude: -82.84 },
    ] } });
  });
  const generatedAt = new Date().toISOString();
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  const fulfillMobile = await installMobileBoardFixtures(page);
  const readyRoute = {
    ...fixture.result, generatedAt, readiness: { status: 'ready', label: 'Ready', reason: 'QA fixture' },
    summary: { shortExplanation: 'QA fixture', gaugeNow: 'QA reading' },
    liveData: { overall: 'live', summary: 'Fixture', gaugeState: 'live', weatherState: 'live' },
  };
  await page.route('**/api/mobile/{summary,explore}.json**', route => fulfillMobile(route, { json: { generatedAt, rivers: [readyRoute, {
    ...readyRoute, river: { ...readyRoute.river, slug: 'salt-arizona', riverId: 'salt-river', name: 'Salt River', state: 'Arizona', latitude: 33.5, longitude: -111.5 },
  }] } }));
  await page.goto('/explore?state=Minnesota');
  await expect(page.getByRole('button', { name: 'Change city · Duluth' })).toBeVisible();
  await page.getByRole('button', { name: 'Focus nearest rivers' }).press('Space');
  const savedLocation = () => page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:user-location')!));
  expect(await savedLocation()).toEqual(location);
  await page.getByRole('button', { name: 'Use current location' }).click();
  await expect.poll(savedLocation).toMatchObject({ source: 'device', latitude: 33.45, longitude: -112.07 });
  await expect(page.getByRole('button', { name: /^Salt River,/ }).first()).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: /^Salt River,/ }).first()).toBeVisible();
  await expect(page.getByText('Minneapolis', { exact: true })).toHaveCount(0);

  await page.getByRole('tab', { name: 'list view' }).click();
  await page.getByRole('button', { name: /^Change city/ }).click();
  await page.getByRole('textbox', { name: 'City, state, or ZIP code' }).fill('Tucson, AZ');
  await page.getByRole('button', { name: 'Use this location' }).click();
  const tucson = page.getByRole('button', { name: 'Change city · Tucson, Arizona' });
  await expect(tucson).toBeVisible();
  await page.reload();
  await expect(tucson).toBeVisible();
  await expect(page.getByRole('tab', { name: 'list view' })).toHaveAttribute('aria-selected', 'true');
  expect(await savedLocation()).toMatchObject({ source: 'search', latitude: 32.22, longitude: -110.97 });
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
  const fulfillMobile = await installMobileBoardFixtures(page);
  await page.route('**/api/mobile/{summary,explore}.json**', route => fulfillMobile(route, { json: { generatedAt, rivers: [{
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
  await page.getByRole('button', { name: 'Location unavailable · Retry', exact: true }).press('Space');
  await expect.poll(() => page.evaluate(() => (window as unknown as { gpsCalls: number }).gpsCalls)).toBe(2);
  await page.evaluate(() => (window as unknown as { failGps: () => void }).failGps());
});
