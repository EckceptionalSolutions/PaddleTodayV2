import { test, expect, type Page } from '@playwright/test';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };
import { installMapLibreHarness } from './maplibre-harness';

function choice(slug: string, score: number, status: string, options: { planning?: boolean; offline?: boolean; rating?: string } = {}) {
  return {
    ...fixture.result,
    score,
    rating: options.rating ?? 'Strong',
    readiness: { status, label: status, reason: `Test ${status} gate` },
    liveData: { ...fixture.result.liveData, overall: options.offline ? 'offline' : 'live' },
    river: {
      ...fixture.result.river, slug, riverId: 'rum-river', name: 'Rum River', reach: slug,
      scoreEligibility: options.planning ? 'planning' : 'scored',
    },
  };
}

async function openChoices(page: Page, routes: ReturnType<typeof choice>[]) {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/river-groups/rum-river.json*', route => route.fulfill({ json: {
    result: { group: { riverId: 'rum-river', name: 'Rum River', routeCount: routes.length }, routes },
  } }));
  await page.goto('/rivers/by-river/rum-river/');
  await expect(page.locator('[data-group-route-list] [data-group-route-card]')).toHaveCount(routes.length);
}

test('high-scoring skip, watch and unavailable routes receive no recommendation', async ({ page }) => {
  await openChoices(page, [choice('skip-route', 95, 'skip'), choice('watch-route', 90, 'verify'), choice('unavailable-route', 99, 'withheld')]);
  await expect(page.locator('[data-group-route-list]')).toContainText('Skip today');
  await expect(page.locator('.route-choice__recommended')).toHaveCount(0);
  await expect(page.locator('[data-group-route-list] [data-route-slug]').first()).toHaveAttribute('data-route-slug', 'watch-route');
});

test('the paddle call outranks a higher raw skip score and gets the only recommendation', async ({ page }) => {
  await openChoices(page, [choice('skip-route', 95, 'skip'), choice('ready-route', 65, 'ready', { rating: 'Good' }), choice('watch-route', 90, 'verify')]);
  await expect(page.locator('[data-group-route-list] [data-route-slug]').first()).toHaveAttribute('data-route-slug', 'ready-route');
  await expect(page.locator('[data-route-slug="ready-route"] .route-choice__recommended')).toHaveText('Recommended today');
  await expect(page.locator('.route-choice__recommended')).toHaveCount(1);
  await expect(page.locator('[data-route-slug="ready-route"]')).toHaveClass(/route-choice--active/);
});

test('planning and offline choices cannot inherit a recommendation from numeric scores', async ({ page }) => {
  await openChoices(page, [choice('planning-route', 99, 'ready', { planning: true }), choice('offline-route', 98, 'ready', { offline: true })]);
  await expect(page.locator('[data-group-route-list]')).toContainText('Planning route');
  await expect(page.locator('.route-choice__recommended')).toHaveCount(0);
});

test('a planning-only hub makes no live recommendation', async ({ page }) => {
  await openChoices(page, [choice('planning-one', 99, 'ready', { planning: true }), choice('planning-two', 95, 'ready', { planning: true })]);
  await expect(page.locator('[data-group-route-list]')).toContainText('Planning route');
  await expect(page.getByText('2 planning routes · no live scores', { exact: true })).toBeVisible();
  await expect(page.locator('.route-choice__recommended')).toHaveCount(0);
});

test('explicit filters and sort modes do not claim a global best trip', async ({ page }) => {
  await openChoices(page, [choice('ready-route', 85, 'ready')]);
  await expect(page.locator('.route-choice__recommended')).toHaveCount(1);
  await page.locator('[data-group-sort]').selectOption('shortest');
  await expect(page.locator('.route-choice__recommended')).toHaveCount(0);
});
