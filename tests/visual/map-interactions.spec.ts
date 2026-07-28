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
