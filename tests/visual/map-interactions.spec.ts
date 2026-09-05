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
