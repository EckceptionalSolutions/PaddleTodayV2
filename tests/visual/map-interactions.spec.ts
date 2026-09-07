import { expect, test } from '@playwright/test';
import type {
  RiverSummaryApiItem,
  RiverSummaryResponse,
  WeekendSummaryResponse,
} from '@paddletoday/api-contract';
import { installMapLibreHarness, mapHarnessState } from './maplibre-harness';

function summaryItem({
  riverId,
  slug,
  name,
  reach,
  latitude,
  longitude,
  score,
  rating,
}: {
  riverId: string;
  slug: string;
  name: string;
  reach: string;
  latitude: number;
  longitude: number;
  score: number;
  rating: RiverSummaryApiItem['rating'];
}): RiverSummaryApiItem {
  return {
    river: {
      riverId,
      slug,
      name,
      reach,
      state: 'Minnesota',
      region: 'Central Minnesota',
      latitude,
      longitude,
      distanceLabel: '8 mi',
      estimatedPaddleTime: '3–4 hours',
      difficulty: 'easy',
      routeType: 'recreational',
      putIn: {
        name: `${name} put-in`,
        latitude: latitude + 0.03,
        longitude: longitude - 0.03,
      },
      takeOut: {
        name: `${name} take-out`,
        latitude: latitude - 0.03,
        longitude: longitude + 0.03,
      },
    },
    sources: [{ label: 'USGS', tone: 'usgs' }],
    score,
    rating,
    gaugeBandLabel: 'Ideal window',
    explanation: `${name} is in a deterministic map-test fixture.`,
    confidence: { score: 86, label: 'High' },
    liveData: {
      overall: 'live',
      summary: 'Gauge and weather reads are current.',
      gaugeState: 'live',
      gaugeDetail: 'Latest gauge reading is 20m old.',
      weatherState: 'live',
      weatherDetail: 'Latest weather reading is 15m old.',
    },
    summary: {
      cardText: 'Ideal window. Stable flow. Light wind.',
      shortExplanation: 'Ideal level • Stable • light wind',
      rawSignalLine: 'Gauge: 620 cfs • Wind: 6 mph • Temp: 72°F',
      gaugeNow: '620 cfs',
      confidenceText: 'High (86/100)',
      freshnessText: 'Gauge 20m old.',
      primaryFactor: 'Two-sided range',
      secondaryFactor: 'Official numeric guidance',
    },
    generatedAt: '2026-07-27T12:00:00.000Z',
  };
}

const summaryFixture: RiverSummaryResponse = {
  requestId: 'map-interaction-contract',
  generatedAt: '2026-07-27T12:00:00.000Z',
  riverCount: 2,
  rivers: [
    summaryItem({
      riverId: 'rum-river',
      slug: 'rum-river-wayside-milaca',
      name: 'Rum River',
      reach: 'Wayside to Milaca',
      latitude: 45.75,
      longitude: -93.65,
      score: 87,
      rating: 'Strong',
    }),
    summaryItem({
      riverId: 'snake-river',
      slug: 'snake-river-canary-cross-lake',
      name: 'Snake River',
      reach: 'Canary Road to Cross Lake',
      latitude: 45.86,
      longitude: -93.12,
      score: 62,
      rating: 'Fair',
    }),
  ],
};

const weekendFixture: WeekendSummaryResponse = {
  requestId: 'weekend-map-interaction-contract',
  generatedAt: summaryFixture.generatedAt,
  label: 'This weekend',
  riverCount: summaryFixture.rivers.length,
  withheldCount: 0,
  rivers: summaryFixture.rivers.map((item) => ({
    river: item.river,
    current: {
      score: item.score,
      rating: item.rating,
      gaugeBandLabel: item.gaugeBandLabel,
    },
    weekend: {
      label: 'This weekend',
      score: item.score,
      rating: item.rating,
      confidence: item.confidence.label,
      explanation: item.explanation,
      summary: item.summary.cardText,
      signalLine: item.summary.rawSignalLine,
    },
    liveData: item.liveData,
    generatedAt: item.generatedAt,
  })),
};

const groupFixture = {
  requestId: 'river-group-map-contract',
  generatedAt: summaryFixture.generatedAt,
  result: {
    group: { riverId: 'rum-river', name: 'Rum River', routeCount: 1, stateSummary: 'Minnesota', regionSummary: 'Central Minnesota' },
    routes: [
      {
        ...summaryFixture.rivers[0],
        river: { ...summaryFixture.rivers[0].river, profile: { difficulty: 'easy' }, gaugeSource: { unit: 'cfs' } },
        gaugeBand: 'ideal',
        gauge: { current: 620, trend: 'stable' },
        weather: { windMph: 6, temperatureF: 72 },
      },
    ],
  },
};

test.describe('product polish interactions', () => {
  test.beforeEach(async ({ page }) => {
    await installMapLibreHarness(page);
    await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
    await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ json: summaryFixture }));
  });

  test('an early location submission waits for homepage hydration', async ({ page }) => {
    let release!: () => void;
    const pending = new Promise<void>((resolve) => { release = resolve; });
    await page.route('**/*summary-board-home*.js*', async (route) => {
      await pending;
      await route.continue();
    });
    let searches = 0;
    await page.route('https://geocoding-api.open-meteo.com/v1/search**', async (route) => {
      searches++;
      await route.fulfill({ json: { results: [{ name: 'Milaca', admin1: 'Minnesota', country: 'United States', latitude: 45.75, longitude: -93.65 }] } });
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const input = page.locator('[data-location-input]');
    await input.fill('Milaca');
    await input.press('Enter');
    await expect(input).toHaveValue('Milaca');
    expect(searches).toBe(0);
    release();
    await expect(input).toHaveValue('Milaca, MN');
    await expect.poll(() => searches).toBe(1);
    await expect(page.locator('[data-home-location-summary]')).toContainText('Milaca');
  });

  test('radius readout and state directory follow their controls', async ({ page }) => {
    await page.goto('/');
    const preferences = page.locator('[data-home-preferences]');
    const slider = page.locator('[data-home-radius-slider]');
    await expect(preferences).toHaveAttribute('open');
    await expect(slider).toBeVisible();
    await expect(slider).toHaveAttribute('data-radius-bound', 'true');
    await slider.fill('3');
    await expect(page.locator('[data-home-radius-value]')).toHaveText('Within 100 miles');
    await page.reload();
    await expect(preferences).toHaveAttribute('open');
    await expect(page.locator('[data-home-radius-value]')).toHaveText('Within 100 miles');
    await preferences.locator('summary').click();
    await expect(preferences).not.toHaveAttribute('open');
    await expect(page.locator('[data-home-preferences-summary]')).toContainText('100 miles');
    await page.goto('/explore/');
    const directory = page.locator('[data-explore-states]');
    await expect(directory).not.toHaveAttribute('open');
    await expect(directory.locator('.explore-state-link').first()).not.toBeVisible();
    await directory.locator('summary').click();
    await expect(directory.locator('.explore-state-link').first()).toBeVisible();
    await directory.locator('summary').press('Enter');
    await expect(directory).not.toHaveAttribute('open');
  });

  test('a route without photos has a neutral preview and a contribution link', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'The home gallery is only displayed on desktop.');
    const route = summaryItem({ riverId: 'photo-test', slug: 'photo-test-route', name: 'Photo test river', reach: 'Upper landing to Lower landing', latitude: 45.75, longitude: -93.65, score: 88, rating: 'Strong' });
    await page.route('**/api/rivers/summary.json*', (request) => request.fulfill({ json: { ...summaryFixture, riverCount: 1, rivers: [route] } }));
    await page.addInitScript(() => localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 45.75, longitude: -93.65, label: 'Milaca, MN', source: 'manual' })));
    await page.goto('/');
    await expect(page.locator('[data-featured-gallery-fallback]')).toBeVisible();
    await expect(page.locator('[data-featured-gallery-image]')).not.toHaveAttribute('src');
    await expect(page.locator('[data-featured-gallery-contribute]')).toHaveAttribute('href', '/contribute/?riverSlug=photo-test-route');
    await page.locator('[data-featured-gallery]').screenshot({ path: test.info().outputPath('neutral-photo-preview.png') });
  });

  test('collapsed filters can be removed by keyboard and stay removed after reload', async ({ page }) => {
    await page.goto('/explore/');
    const advanced = page.locator('[data-explore-advanced]');
    await expect(advanced).not.toHaveAttribute('open');
    await advanced.locator('summary').click();
    await page.locator('[data-filter-state]').selectOption('Minnesota');
    await page.locator('[data-filter-difficulty]').selectOption('easy');
    await advanced.locator('summary').click();
    const removeState = page.getByRole('button', { name: 'Remove Minnesota filter', exact: true });
    await removeState.focus();
    await removeState.press('Enter');
    await expect(removeState).toHaveCount(0);
    await expect(page.locator('[data-filter-state]')).toHaveValue('');
    await expect(page.locator('[data-filter-difficulty]')).toHaveValue('easy');
    await expect(page.locator('[data-filter-pills] button:focus')).toHaveCount(1);
    await page.reload();
    await expect(advanced).not.toHaveAttribute('open');
    await expect(page.getByRole('button', { name: 'Remove Easy filter', exact: true })).toBeVisible();
    await expect(removeState).toHaveCount(0);
    await page.getByRole('button', { name: 'Remove Non-whitewater filter', exact: true }).click();
    await expect(page.locator('[data-filter-route-type]')).toHaveValue('all');
    await page.getByRole('button', { name: 'Remove Paddle routes filter', exact: true }).click();
    await expect(page.locator('[data-filter-rating]')).toHaveValue('all');
    await expect(page.locator('[data-explore-results-count]')).not.toContainText('Updating');
    await page.locator('[data-filter-rating-button=""]').click();
    await expect(page.getByRole('button', { name: 'Remove Paddle routes filter', exact: true })).toBeVisible();
    await expect(page.locator('.river-grid--explore-list .river-card')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: test.info().outputPath('explore-polish.png'), fullPage: true });
  });

  test('shared Explore links override local filters and offer a copy fallback', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('paddletoday:explore-filters:v1', JSON.stringify({ search: 'Wrong river', difficulty: 'hard' }));
      localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 10, longitude: 10, label: 'Wrong place' }));
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Unavailable'); } } });
    });
    await page.goto('/explore/?searchVersion=1&search=Rum&paddleable=false&rating=all&sort=a-z&lat=45.75&lng=-93.65&place=Milaca');
    await expect(page.locator('[data-filter-search]')).toHaveValue('Rum');
    await expect(page.locator('[data-sort-select]')).toHaveValue('a-z');
    await page.locator('[data-explore-share]').click();
    const field = page.locator('[data-explore-share-link]');
    await expect(field).toBeVisible();
    const link = new URL(await field.inputValue());
    expect(link.searchParams.get('search')).toBe('Rum');
    expect(link.searchParams.get('place')).toBe('Milaca');
    expect(link.searchParams.get('difficulty')).toBeNull();
    await page.reload();
    await expect(page.locator('[data-filter-search]')).toHaveValue('Rum');
    await page.goto('/explore/?searchVersion=1');
    await page.locator('[data-explore-share]').click();
    expect(new URL(await field.inputValue()).searchParams.has('lat')).toBe(false);
  });

  test('an early GPS click waits for homepage hydration and runs once', async ({ page }) => {
    let release!: () => void;
    const gate = new Promise<void>((resolve) => { release = resolve; });
    await page.route('**/*summary-board-home*.js*', async (route) => {
      await gate;
      await route.continue();
    });
    await page.addInitScript(() => {
      (window as any).__polishGpsRequests = 0;
      Object.defineProperty(navigator, 'geolocation', { configurable: true, value: {
        getCurrentPosition() { (window as any).__polishGpsRequests += 1; },
      } });
      Object.defineProperty(navigator, 'permissions', { configurable: true, value: { query: async () => ({ state: 'prompt' }) } });
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('[data-location-use]').first().click();
    await page.locator('[data-location-use]').first().click();
    expect(await page.evaluate(() => (window as any).__polishGpsRequests)).toBe(0);
    release();
    await expect.poll(() => page.evaluate(() => (window as any).__polishGpsRequests)).toBe(1);
  });

  for (const path of ['/', '/explore/']) {
    test(`a delayed GPS reading cannot overwrite typed location on ${path}`, async ({ page }, testInfo) => {
      test.skip(path === '/explore/' && testInfo.project.name !== 'desktop-chromium', 'Explore location controls are tested in the desktop workspace.');
      await page.addInitScript(() => {
        Object.defineProperty(navigator, 'geolocation', { configurable: true, value: {
          getCurrentPosition(success: (position: unknown) => void) { (window as any).__resolvePolishGps = success; },
        } });
        Object.defineProperty(navigator, 'permissions', { configurable: true, value: { query: async () => ({ state: 'prompt' }) } });
      });
      await page.route('https://geocoding-api.open-meteo.com/v1/search**', (route) => route.fulfill({ json: { results: [
        { name: 'Milaca', admin1: 'Minnesota', country: 'United States', latitude: 45.75, longitude: -93.65 },
      ] } }));
      await page.route('https://geocoding-api.open-meteo.com/v1/reverse**', (route) => route.fulfill({ json: { results: [
        { name: 'Old city', admin1: 'Wisconsin', country: 'United States' },
      ] } }));
      await page.goto(path);
      await expect(page.locator('[data-location-use]').first()).toHaveAttribute('data-location-bound', 'true');
      await page.locator('[data-location-use]').first().click();
      const input = page.locator('[data-location-input]');
      await input.fill('Milaca');
      await input.press('Enter');
      await expect(input).toHaveValue('Milaca, MN');
      await page.evaluate(async () => { await (window as any).__resolvePolishGps({ coords: { latitude: 43, longitude: -89 } }); });
      await expect(input).toHaveValue('Milaca, MN');
      expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:user-location') || '{}').label)).toBe('Milaca, MN');
    });
  }

  test('removing a saved route offers Undo and restores its exact record', async ({ page }) => {
    const seed = structuredClone(favoriteSeed);
    seed.items[0].url += '?putin=upper&takeout=lower';
    await page.addInitScript((value) => {
      if (!sessionStorage.getItem('favorites-seeded')) {
        localStorage.setItem('paddletoday:favorites:v1', JSON.stringify(value));
        sessionStorage.setItem('favorites-seeded', 'true');
      }
    }, seed);
    await page.goto('/favorites/');
    await page.locator('.favorites-card [data-favorite-button]').click();
    await expect(page.locator('.favorites-card')).toHaveCount(0);
    await expect(page.locator('.action-feedback')).toContainText('removed from Saved routes');
    await expect(page.getByRole('button', { name: 'Undo', exact: true })).toBeFocused();
    await page.getByRole('button', { name: 'Undo', exact: true }).click();
    await expect(page.locator('.favorites-card')).toHaveCount(1);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:favorites:v1')!).items)).toEqual(seed.items);
    await expect(page.locator('.action-feedback')).toContainText('restored');
    const dismiss = page.locator('.action-feedback').getByRole('button', { name: 'Dismiss' });
    await expect(dismiss).toBeFocused();
    await dismiss.click();
    await expect(page.locator('.favorites-card [data-favorite-button]')).toBeFocused();
    await page.reload();
    await expect(page.locator('.favorites-card')).toHaveCount(1);
  });

  test('saved-route storage failures show an error and preserve the saved record', async ({ page }) => {
    await page.addInitScript((seed) => {
      localStorage.setItem('paddletoday:favorites:v1', JSON.stringify(seed));
      const write = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key === 'paddletoday:favorites:v1') throw new DOMException('Storage full', 'QuotaExceededError');
        write.call(this, key, value);
      };
    }, favoriteSeed);
    await page.goto('/favorites/');
    await page.locator('.favorites-card [data-favorite-button]').click();
    await expect(page.locator('.action-feedback')).toContainText('Could not update Saved routes');
    await expect(page.locator('.favorites-card')).toHaveCount(1);
    await expect(page.locator('.favorites-card [data-favorite-button]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: 'Undo', exact: true })).toHaveCount(0);
  });

  test('saved changes compare visits and survive card rerenders', async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem('paddletoday:favorites:v1', JSON.stringify(value)), favoriteSeed);
    await page.goto('/favorites/');
    await expect.poll(() => page.evaluate(() => localStorage.getItem('paddletoday:saved-route-changes:v1'))).toContain('snake-river');
    await expect(page.locator('[data-field="favorite-changes"]')).not.toBeVisible();
    const changed = structuredClone(summaryFixture);
    const river = changed.rivers[1];
    river.generatedAt = '2026-07-28T12:00:00Z';
    river.score += 8;
    river.summary.gaugeNow = '700 cfs';
    river.readiness = { status: 'verify', label: 'Verify', reason: 'Check the takeout.' };
    await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ json: changed }));
    await page.reload();
    const notice = page.locator('[data-field="favorite-changes"]');
    await expect(notice).toContainText('Score +8');
    await expect(notice).toContainText('Gauge higher: 620 → 700 cfs');
    await expect(notice).toContainText('New caution: Check the takeout.');
    await page.locator('.favorites-card [data-favorite-button]').click();
    await page.getByRole('button', { name: 'Undo', exact: true }).click();
    await expect(notice).toContainText('Score +8');
    await page.screenshot({ path: test.info().outputPath('saved-changes.png'), fullPage: true });
    await page.reload();
    await expect(notice).not.toBeVisible();
  });

  test('failed and stale saved responses preserve the previous visit baseline', async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem('paddletoday:favorites:v1', JSON.stringify(value)), favoriteSeed);
    await page.goto('/favorites/');
    await expect.poll(() => page.evaluate(() => localStorage.getItem('paddletoday:saved-route-changes:v1'))).toContain('snake-river');
    const before = await page.evaluate(() => localStorage.getItem('paddletoday:saved-route-changes:v1'));
    await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ status: 503, json: { error: 'Offline' } }));
    await page.reload();
    await expect(page.locator('.favorites-card')).toBeVisible();
    await expect(page.locator('[data-field="favorite-changes"]')).not.toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('paddletoday:saved-route-changes:v1'))).toBe(before);
    const stale = structuredClone(summaryFixture);
    stale.snapshotStatus = 'stale';
    stale.rivers[1].generatedAt = '2026-07-29T12:00:00Z';
    stale.rivers[1].score += 8;
    await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ json: stale }));
    await page.reload();
    await expect(page.locator('[data-field="favorite-score"]')).toHaveText(String(stale.rivers[1].score));
    await expect(page.locator('[data-field="favorite-changes"]')).not.toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('paddletoday:saved-route-changes:v1'))).toBe(before);
  });

  test('route facts stay visible while condition details expand without navigation', async ({ page }) => {
    // Explore uses compact map rows on phones; Saved routes uses the full card on every viewport.
    await page.addInitScript((seed) => localStorage.setItem('paddletoday:favorites:v1', JSON.stringify(seed)), favoriteSeed);
    await page.goto('/favorites/');
    const card = page.locator('.favorites-card').first();
    await expect(card).toBeVisible();
    await expect(card.locator('[data-field="favorite-facts"]')).toBeVisible();
    await expect(card.locator('[data-field="favorite-signal"]')).not.toBeVisible();
    const disclosure = card.locator('.river-card__details');
    await disclosure.locator('summary').click();
    await expect(disclosure).toHaveAttribute('open');
    await expect(card.locator('[data-field="favorite-signal"]')).toBeVisible();
    await expect(page).toHaveURL(/\/favorites\//);
    await card.screenshot({ path: test.info().outputPath('route-card-details.png') });
  });

  test('personal notes save, cancel, clear, and survive removal and Undo', async ({ page }) => {
    await page.addInitScript((seed) => {
      if (!sessionStorage.getItem('notes-seeded')) {
        localStorage.setItem('paddletoday:favorites:v1', JSON.stringify(seed));
        sessionStorage.setItem('notes-seeded', 'true');
      }
    }, favoriteSeed);
    await page.goto('/favorites/');
    const editor = page.getByRole('dialog');
    const note = 'Park by the bridge.\nShuttle bike at the takeout. <b>Private reminder</b>';
    await page.locator('[data-favorite-notes]').click();
    await expect(editor).toBeVisible();
    await editor.getByLabel('Your note', { exact: true }).fill(note);
    await editor.getByRole('button', { name: 'Save note' }).click();
    await expect(editor).not.toBeVisible();
    await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText(note);
    await expect(page.locator('[data-field="favorite-notes-text"] b')).toHaveCount(0);
    await expect(page.locator('[data-favorite-notes]')).toBeFocused();
    await page.reload();
    await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText(note);
    await page.locator('[data-favorite-notes]').click();
    await editor.getByLabel('Your note', { exact: true }).fill('Unsaved draft');
    await editor.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText(note);
    await page.locator('.favorites-card [data-favorite-button]').click();
    await page.getByRole('button', { name: 'Undo', exact: true }).click();
    await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText(note);
    await page.locator('[data-favorite-notes]').click();
    await page.screenshot({ path: test.info().outputPath('personal-notes-editor.png') });
    await editor.getByLabel('Your note', { exact: true }).fill('');
    await editor.getByRole('button', { name: 'Save note' }).click();
    await expect(page.locator('[data-field="favorite-notes-text"]')).not.toBeVisible();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:favorites:v1')!).items[0].savedAt)).toBe(favoriteSeed.items[0].savedAt);
  });

  test('failed note saves retain the draft and original saved note', async ({ page }) => {
    await page.addInitScript((seed) => localStorage.setItem('paddletoday:favorites:v1', JSON.stringify(seed)), favoriteSeed);
    await page.goto('/favorites/');
    await page.locator('[data-favorite-notes]').click();
    await page.getByLabel('Your note', { exact: true }).fill('Keep my draft');
    await page.evaluate(() => {
      const write = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key === 'paddletoday:favorites:v1') throw new Error('Full');
        write.call(this, key, value);
      };
    });
    await page.getByRole('button', { name: 'Save note' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByLabel('Your note', { exact: true })).toHaveValue('Keep my draft');
    await expect(page.locator('[data-notes-status]')).toContainText('Your draft is still here');
  });

  test('Weekend uses a neutral fallback without downloading generic river photos', async ({ page }) => {
    const payload = structuredClone(weekendFixture);
    payload.rivers[0].river.slug = 'no-weekend-photo';
    payload.rivers[0].river.riverId = 'no-weekend-photo';
    const genericRequests: string[] = [];
    page.on('request', (request) => { if (request.url().includes('/gallery/fallbacks/')) genericRequests.push(request.url()); });
    await page.route('**/api/weekend/summary.json*', (route) => route.fulfill({ json: payload }));
    await page.goto('/weekend/');
    await expect(page.locator('[data-weekend-featured-gallery-fallback]')).toBeVisible();
    await expect(page.locator('[data-weekend-featured-gallery-image]')).not.toHaveAttribute('src');
    await expect(page.locator('[data-weekend-featured-gallery-contribute]')).toHaveAttribute('href', '/contribute/?riverSlug=no-weekend-photo');
    expect(genericRequests).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('[data-weekend-featured-gallery]').screenshot({ path: test.info().outputPath('weekend-photo-fallback.png') });
  });

  test('Weekend shows available photography and recovers from a broken image', async ({ page }) => {
    await page.route('**/api/weekend/summary.json*', (route) => route.fulfill({ json: weekendFixture }));
    await page.goto('/weekend/');
    const photo = page.locator('[data-weekend-featured-gallery-image]');
    await expect(photo).toBeVisible();
    await expect(photo).toHaveAttribute('src', /gallery\//);
    await photo.dispatchEvent('error');
    await expect(photo).not.toBeVisible();
    await expect(page.locator('[data-weekend-featured-gallery-fallback]')).toBeVisible();
  });

  test('Explore restores page, map camera, and scroll after visiting a route', async ({ page }) => {
    const rivers = Array.from({ length: 30 }, (_, index) => summaryItem({
      riverId: `return-river-${index}`, slug: `return-route-${index}`, name: `Return river ${String(index).padStart(2, '0')}`,
      reach: 'Upper landing to Lower landing', latitude: 45.5 + index * .005, longitude: -93.5, score: 88, rating: 'Strong',
    }));
    await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ json: { ...summaryFixture, rivers, riverCount: 30 } }));
    await page.route('**/rivers/return-route-*/', (route) => route.fulfill({ contentType: 'text/html', body: '<h1>Route detail</h1>' }));
    await page.goto('/explore/?searchVersion=1&sort=a-z');
    const mobile = (page.viewportSize()?.width ?? 1280) <= 760;
    if (mobile) await page.locator('[data-summary-map-mobile-view="map"]').first().click();
    else await page.locator('[data-explore-next]').click();
    await expect(page.locator('[data-explore-page]')).toContainText(mobile ? '1' : '2');
    await expect.poll(() => page.evaluate(() => (window as any).__paddleMapInstances.length)).toBeGreaterThan(0);
    await page.evaluate(() => {
      const map = (window as any).__paddleMapInstances.find((map: any) => map.container.matches('[data-summary-map]'));
      map.move(8.5, [[-94, 45], [-93, 46]]);
      window.scrollTo({ top: 500, behavior: 'instant' });
      const shell = document.querySelector('[data-explore-shell]')!;
      shell.scrollTop = 160;
    });
    const before = await page.evaluate(() => ({ y: scrollY, list: document.querySelector('[data-explore-shell]')!.scrollTop }));
    // A DOM click keeps the current scroll position while using the actual route link.
    await page.locator('[data-explore-grid] a[href^="/rivers/"]').first().evaluate((link: HTMLAnchorElement) => link.click());
    await expect(page.getByRole('heading', { name: 'Route detail' })).toBeVisible();
    await page.goBack();
    await expect(page.locator('[data-explore-page]')).toContainText(mobile ? '1' : '2');
    if (mobile) await expect(page.locator('[data-summary-map-mobile-view="map"]').first()).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => page.evaluate(() => (window as any).__paddleMapInstances[0]?.getZoom())).toBe(8.5);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeCloseTo(before.y, 0);
    await expect.poll(() => page.evaluate(() => document.querySelector('[data-explore-shell]')!.scrollTop)).toBe(before.list);
    expect(await page.evaluate(() => (window as any).__paddleMapInstances[0].getCenter())).toEqual({ lng: -93.5, lat: 45.5 });
    await page.goto('/explore/?searchVersion=1&search=Return&sort=a-z');
    await expect(page.locator('[data-explore-page]')).toContainText('1');
  });

  test('weekend skeleton resolves and a failed refresh can be retried', async ({ page }) => {
    let release!: () => void;
    const pending = new Promise<void>((resolve) => { release = resolve; });
    let fail = true;
    await page.route('**/api/weekend/summary.json*', async (route) => {
      await pending;
      await route.fulfill(fail ? { status: 503, json: { error: 'Temporarily unavailable' } } : { json: weekendFixture });
    });
    await page.goto('/weekend/');
    const hero = page.locator('.weekend-hero__featured');
    await expect(hero).toHaveAttribute('aria-busy', 'true');
    await expect(page.locator('[data-weekend-snapshot]')).toHaveText('Checking the weekend outlook…');
    await expect(hero).not.toContainText('Loading');
    await expect(page.locator('[data-weekend-featured-link]')).not.toBeVisible();
    await hero.screenshot({ path: test.info().outputPath('weekend-skeleton.png') });
    release();
    await expect(page.locator('[data-weekend-retry]')).toBeVisible();
    await expect(hero).toHaveAttribute('aria-busy', 'false');
    await expect(page.locator('[data-weekend-featured-name]')).toHaveText('Weekend outlook unavailable');
    fail = false;
    await page.locator('[data-weekend-retry]').click();
    await expect(page.locator('[data-weekend-featured-name]')).toHaveText('Rum River');
    await expect(hero).not.toHaveAttribute('aria-hidden');
    await expect(page.locator('[data-weekend-featured-link]')).toBeVisible();
    await expect(page.locator('[data-weekend-retry]')).not.toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: test.info().outputPath('weekend-polish.png'), fullPage: true });
  });

  test('weekend filter changes preserve a pending GPS lookup', async ({ page }) => {
    await page.route('**/api/weekend/summary.json*', (route) => route.fulfill({ json: weekendFixture }));
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'geolocation', { configurable: true, value: {
        getCurrentPosition(success: (position: unknown) => void) { (window as any).__weekendGps = success; },
      } });
    });
    await page.route('https://geocoding-api.open-meteo.com/v1/reverse**', (route) => route.fulfill({ json: { results: [
      { name: 'Milaca', admin1: 'Minnesota', country: 'United States' },
    ] } }));
    await page.goto('/weekend/');
    const useLocation = page.locator('[data-weekend-location-use]');
    await useLocation.click();
    await page.locator('[data-weekend-filter="day-trips"]').click();
    await expect(useLocation).toBeDisabled();
    await expect(useLocation).toHaveText('Finding...');
    await expect(page.locator('[data-weekend-location-hint]')).toHaveText('Finding your location...');
    await page.evaluate(async () => { await (window as any).__weekendGps({ coords: { latitude: 45.75, longitude: -93.65 } }); });
    await expect(page.locator('[data-weekend-location-label]')).toHaveText('Planning from Milaca, MN');
    await expect(useLocation).toBeHidden();
    await page.locator('[data-weekend-location-clear]').click();
    await expect(useLocation).toBeEnabled();
    await expect(useLocation).toHaveText('Use my location');
  });
});

test('Home fits nearby picks after a cached refresh and when opening more picks', async ({ page }) => {
  await installMapLibreHarness(page);
  const localRoute = summaryItem({
    riverId: 'chicago-test', slug: 'chicago-test-route', name: 'Chicago test river',
    reach: 'Nearby reach', latitude: 41.9, longitude: -87.7, score: 88, rating: 'Strong',
  });
  const payload = { ...summaryFixture, rivers: [...summaryFixture.rivers, localRoute], riverCount: 3 };
  await page.addInitScript((cached) => {
    localStorage.setItem('paddletoday:user-location', JSON.stringify({
      latitude: 41.88, longitude: -87.63, label: 'Chicago', source: 'manual',
    }));
    localStorage.setItem('paddletoday:api-cache:river-summary:v2', JSON.stringify({
      version: 1, fetchedAt: Date.now(), payload: { ...cached, requestId: 'cached-before-refresh' },
    }));
    // Keep the lazy map asleep until after the cached board refreshes.
    const Observer = window.IntersectionObserver;
    window.IntersectionObserver = class extends Observer {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        super(callback, options);
        this.callback = callback;
      }
      callback: IntersectionObserverCallback;
      observe(target: Element) {
        if (target.matches('[data-summary-map-shell]')) {
          (window as any).openLazySummaryMap = () => this.callback([
            { isIntersecting: true, target } as IntersectionObserverEntry,
          ], this);
        } else {
          super.observe(target);
        }
      }
    };
  }, payload);
  await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ json: payload }));
  await page.route('**/data/canonical-river-geometries/**', (route) => route.fulfill({ status: 404, body: '' }));
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => typeof (window as any).openLazySummaryMap)).toBe('function');
  await expect.poll(() => page.evaluate(() => {
    const cached = JSON.parse(localStorage.getItem('paddletoday:api-cache:river-summary:v2')!);
    return cached.payload.requestId;
  })).toBe(payload.requestId);
  await page.evaluate(() => (window as any).openLazySummaryMap());
  const resultFits = async () => (await mapHarnessState(page)).fitCalls.filter(
    (call: any) => call.bounds?.[0]?.[0] < -87 && call.bounds?.[1]?.[0] > -88,
  );
  await expect.poll(async () => (await resultFits()).length).toBeGreaterThan(0);
  const fit = (await resultFits()).at(-1);
  expect(fit.bounds[0][0]).toBeCloseTo(-87.73);
  expect(fit.bounds[1][0]).toBeCloseTo(-87.67);
  expect(fit.bounds[0][1]).toBeCloseTo(41.87);
  expect(fit.bounds[1][1]).toBeCloseTo(41.93);
  // Mobile already displays the results map and hides the desktop jump link.
  if ((page.viewportSize()?.width ?? 1280) <= 720) {
    await expect(page.locator('.home-featured__jump-link')).toBeHidden();
    return;
  }
  const previousFits = (await resultFits()).length;
  await page.getByRole('link', { name: 'View more top picks' }).click();
  await expect.poll(async () => (await resultFits()).length).toBeGreaterThan(previousFits);
});

test('Weekend keeps nationwide coverage out of nearby recommendation counts', async ({ page }) => {
  await installMapLibreHarness(page);
  const farRoute = structuredClone(weekendFixture.rivers[0]);
  farRoute.river = { ...farRoute.river, slug: 'far-weekend-route', latitude: 32, longitude: -110 };
  await page.route('**/api/weekend/summary.json*', (route) => route.fulfill({ json: {
    ...weekendFixture, withheldCount: 1500, riverCount: 3, rivers: [...weekendFixture.rivers, farRoute],
  } }));
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:user-location', JSON.stringify({
      latitude: 45.75, longitude: -93.65, label: 'Milaca',
    }));
  });
  await page.goto('/weekend/');
  await expect(page.locator('[data-weekend-snapshot]')).toHaveText('1 weekend pick within 300 miles');
  await expect(page.locator('[data-weekend-call-mix]')).not.toContainText('1500');
  await expect(page.locator('[data-weekend-call-mix]')).not.toContainText('Not enough data');
  await page.getByText('About weekend data coverage', { exact: true }).click();
  await expect(page.locator('.weekend-data-note')).toContainText('Across all locations, 1500');
  await page.locator('[data-weekend-distance-option="any"]').click();
  await expect(page.locator('[data-weekend-snapshot]')).toHaveText('2 weekend picks across all locations');
  await expect(page.locator('[data-weekend-strong-count]')).toHaveText('2');
});

const favoriteSeed = {
  version: 1,
  items: [
    {
      slug: 'snake-river-canary-cross-lake',
      name: 'Snake River',
      reach: 'Canary Road to Cross Lake / Pine City',
      state: 'MN',
      region: 'East Central Minnesota',
      url: '/rivers/snake-river-canary-cross-lake/',
      savedAt: 1_767_000_000_000,
    },
  ],
};

const mapSurfaces = [
  { name: 'Home', path: '/', selector: '[data-summary-map]' },
  { name: 'Explore', path: '/explore/', selector: '[data-summary-map]' },
  { name: 'State', path: '/states/minnesota/', selector: '[data-state-map]' },
  { name: 'River Group', path: '/rivers/by-river/rum-river/', selector: '[data-group-map]' },
  {
    name: 'River Detail',
    path: '/rivers/rum-river-wayside-milaca/',
    selector: '[data-detail-hero-map]',
  },
  { name: 'Favorites', path: '/favorites/', selector: '[data-favorites-map]' },
  { name: 'Weekend', path: '/weekend/', selector: '[data-summary-map]' },
];

test.describe('shared web map interaction contract', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'desktop-chromium',
      'The cross-surface contract runs once in desktop Chromium.'
    );
    await installMapLibreHarness(page);
    await page.route('**/api/rivers/summary.json*', async (route) => {
      await route.fulfill({ json: summaryFixture });
    });
    await page.route('**/api/weekend/summary.json*', async (route) => {
      await route.fulfill({ json: weekendFixture });
    });
    await page.route('**/api/river-groups/rum-river.json*', (route) => route.fulfill({ json: groupFixture }));
    await page.addInitScript((seed) => {
      window.localStorage.setItem('paddletoday:favorites:v1', JSON.stringify(seed));
    }, favoriteSeed);
  });

  for (const surface of mapSurfaces) {
    test(`${surface.name} initializes through the shared adapter`, async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));

      const response = await page.goto(surface.path, { waitUntil: 'domcontentloaded' });
      expect(response?.ok()).toBe(true);
      const map = page.locator(surface.selector);
      await map.scrollIntoViewIfNeeded();
      await expect(map).toHaveClass(/maplibregl-map/, {
        timeout: 45_000,
      });

      await expect.poll(
        async () => (await mapHarnessState(page)).maps.length,
        { timeout: 15_000 }
      ).toBeGreaterThan(0);
      await expect.poll(
        async () => {
          const state = await mapHarnessState(page);
          return state.fitCalls.length + state.cameraCalls.length + state.markersAdded;
        },
        { timeout: 15_000 }
      ).toBeGreaterThan(0);

      const state = await mapHarnessState(page);
      expect(state.maps.length).toBeGreaterThan(0);
      expect(
        state.fitCalls.length + state.cameraCalls.length + state.markersAdded
      ).toBeGreaterThan(0);
      expect(pageErrors).toEqual([]);
    });
  }

  test('Explore keeps marker and result selection synchronized', async ({ page }) => {
    await page.goto('/explore/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-summary-map]')).toHaveClass(/maplibregl-map/, {
      timeout: 45_000,
    });

    const marker = page.locator('[data-summary-map] button.score-map-marker').first();
    await expect(marker).toBeAttached({ timeout: 20_000 });
    await marker.evaluate((element: HTMLButtonElement) => element.click());
    await expect(marker).toHaveAttribute('aria-pressed', 'true');

    const selectedKey = await marker.getAttribute('data-summary-map-marker');
    if (selectedKey) {
      await expect(
        page.locator(`[data-summary-map-item="${selectedKey}"]`)
      ).toHaveAttribute('aria-pressed', 'true');
    }
  });

  test('Home keeps marker and result selection synchronized', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const map = page.locator('[data-summary-map]');
    await map.scrollIntoViewIfNeeded();
    await expect(map).toHaveClass(/maplibregl-map/, {
      timeout: 45_000,
    });

    const marker = page.locator('[data-summary-map] button.score-map-marker').first();
    await expect(marker).toBeAttached({ timeout: 20_000 });
    await marker.evaluate((element: HTMLButtonElement) => element.click());
    await expect(marker).toHaveAttribute('aria-pressed', 'true');

    const selectedKey = await marker.getAttribute('data-summary-map-marker');
    if (selectedKey) {
      await expect(
        page.locator(`[data-summary-map-item="${selectedKey}"]`)
      ).toHaveAttribute('aria-pressed', 'true');
    }
  });

  for (const surface of [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore/' },
  ]) {
    test(`${surface.name} uses the shared results viewport policy`, async ({ page }) => {
      await page.goto(surface.path, { waitUntil: 'domcontentloaded' });
      const map = page.locator('[data-summary-map]');
      await map.scrollIntoViewIfNeeded();
      await expect(map).toHaveClass(/maplibregl-map/, {
        timeout: 45_000,
      });
      const mapLabel = await map.getAttribute('aria-label');

      await expect.poll(async () => {
        const state = await mapHarnessState(page);
        return state.fitCalls.findLast(
          (call: { label: string }) => call.label === mapLabel
        )?.options;
      }, { timeout: 15_000 }).toMatchObject({
        padding: { top: 52, right: 52, bottom: 52, left: 52 },
        maxZoom: 8.2,
        duration: 0,
      });
    });
  }

  test('Weekend uses the shared weekend-results viewport policy', async ({ page }) => {
    await page.goto('/weekend/', { waitUntil: 'domcontentloaded' });
    const map = page.locator('[data-summary-map]');
    await map.scrollIntoViewIfNeeded();
    await expect(map).toHaveClass(/maplibregl-map/, {
      timeout: 45_000,
    });
    const mapLabel = await map.getAttribute('aria-label');

    await expect.poll(async () => {
      const state = await mapHarnessState(page);
      return state.fitCalls.findLast(
        (call: { label: string }) => call.label === mapLabel
      )?.options;
    }, { timeout: 15_000 }).toMatchObject({
      padding: { top: 52, right: 52, bottom: 52, left: 52 },
      maxZoom: 8.4,
      duration: 0,
    });
  });

  test('Explore reveals all scores and reset restores the default map set', async ({ page }) => {
    await page.goto('/explore/', { waitUntil: 'domcontentloaded' });
    const map = page.locator('[data-summary-map]');
    await expect(map).toHaveClass(/maplibregl-map/, {
      timeout: 45_000,
    });

    const results = page.locator('[data-summary-map-item]');
    await expect(results).toHaveCount(1, { timeout: 20_000 });

    await page.locator('[data-filter-rating]').selectOption('all');
    await expect(results).toHaveCount(2);
    await expect(page.locator('[data-filter-rating]')).toHaveValue('all');

    await page.locator('[data-explore-reset]').click();
    await expect(page.locator('[data-filter-rating]')).toHaveValue('');
    await expect(results).toHaveCount(1);
    await expect(page.locator('[data-summary-map] button.score-map-marker')).toHaveCount(1);
  });

  test('Explore restores saved filters after reload and reset clears them', async ({ page }) => {
    await page.goto('/explore/', { waitUntil: 'domcontentloaded' });

    await page.locator('[data-explore-advanced] > summary').click();
    await page.locator('[data-filter-search]').fill('Rice Creek');
    await page.locator('[data-filter-state]').selectOption('Minnesota');
    await page.locator('[data-filter-difficulty]').selectOption('easy');
    await page.locator('[data-filter-camping]').selectOption('any-support');
    await page.locator('[data-filter-paddle-time]').selectOption('up-to-3');
    await page.reload({ waitUntil: 'domcontentloaded' });

    await expect(page.locator('[data-filter-search]')).toHaveValue('Rice Creek');
    await expect(page.locator('[data-filter-state]')).toHaveValue('Minnesota');
    await expect(page.locator('[data-filter-difficulty]')).toHaveValue('easy');
    await expect(page.locator('[data-filter-camping]')).toHaveValue('any-support');
    await expect(page.locator('[data-filter-paddle-time]')).toHaveValue('up-to-3');

    await page.locator('[data-explore-reset]').click();
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-filter-search]')).toHaveValue('');
    await expect(page.locator('[data-filter-state]')).toHaveValue('');
    await expect(page.locator('[data-filter-difficulty]')).toHaveValue('');
    await expect(page.locator('[data-filter-camping]')).toHaveValue('');
    await expect(page.locator('[data-filter-paddle-time]')).toHaveValue('');
  });

  test('Explore refresh preserves the current map viewport', async ({ page }) => {
    await page.goto('/explore/', { waitUntil: 'domcontentloaded' });
    const map = page.locator('[data-summary-map]');
    await map.scrollIntoViewIfNeeded();
    await expect(map).toHaveClass(/maplibregl-map/, {
      timeout: 45_000,
    });
    const mapLabel = await map.getAttribute('aria-label');
    const summaryFitCount = async () =>
      (await mapHarnessState(page)).fitCalls.filter(
        (call: { label: string }) => call.label === mapLabel
      ).length;
    await expect.poll(summaryFitCount, { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => {
      const calls = (await mapHarnessState(page)).fitCalls.filter(
        (call: { label: string }) => call.label === mapLabel
      );
      return Date.now() - calls.at(-1).at;
    }, { timeout: 15_000 }).toBeGreaterThan(750);
    const initialFitCount = await summaryFitCount();

    const refreshResponse = page.waitForResponse((response) =>
      response.url().includes('/api/rivers/summary')
      && response.request().method() === 'GET'
    );
    await page.locator('[data-board-refresh]').click();
    await refreshResponse;
    await expect(page.locator('[data-board-refresh]')).toBeEnabled({ timeout: 45_000 });
    await page.waitForTimeout(250);

    expect(await summaryFitCount()).toBe(initialFitCount);
  });

  for (const surface of [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore/' },
  ]) {
    test(`${surface.name} applies manual location search through the shared service`, async ({ page }) => {
      await page.route('https://geocoding-api.open-meteo.com/v1/search**', async (route) => {
        await route.fulfill({
          json: {
            results: [{
              name: 'Milaca',
              admin1: 'Minnesota',
              country: 'United States',
              latitude: 45.75,
              longitude: -93.65,
            }],
          },
        });
      });
      await page.goto(surface.path, { waitUntil: 'domcontentloaded' });

      const input = page.locator('[data-location-input]');
      await input.fill('Milaca');
      await input.press('Enter');

      await expect(input).toHaveValue('Milaca, MN');
      await expect.poll(async () => page.evaluate(() => {
        const stored = window.localStorage.getItem('paddletoday:user-location');
        return stored ? JSON.parse(stored) : null;
      })).toEqual({
        latitude: 45.75,
        longitude: -93.65,
        label: 'Milaca, MN',
        source: 'manual',
      });

      if (surface.name === 'Home') {
        const featuredMap = page.locator('[data-featured-map]');
        await expect(featuredMap).toHaveClass(/maplibregl-map/, {
          timeout: 20_000,
        });
        await expect(featuredMap.locator('.detail-access-marker')).toHaveCount(2);
        await expect(page.locator('[data-featured-map-status]')).toHaveText(
          'MINNESOTA / CENTRAL MINNESOTA',
        );
      }
    });
  }
});
