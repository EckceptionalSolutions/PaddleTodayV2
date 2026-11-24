import { expect, test } from '@playwright/test';
import { desktopBoardFixture, FIXTURE_NOW } from './desktop-board-fixtures';

test('Today restores an oversized nearby snapshot on a failed reload and isolates a different area', async ({ page }) => {
  const board = desktopBoardFixture('fresh');
  await page.clock.install({ time: FIXTURE_NOW });
  await page.addInitScript(() => {
    localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now()));
    if (!localStorage.getItem('paddletoday:user-location')) localStorage.setItem('paddletoday:user-location',
      JSON.stringify({ latitude: 45.15, longitude: -93.15, label: 'Circle Pines, MN' }));
  });
  let offline = false;
  const scopes: URLSearchParams[] = [];
  await page.route('**/api/rivers/summary.json*', route => {
    const query = new URL(route.request().url()).searchParams;
    scopes.push(query);
    if (offline) return route.fulfill({ status: 503, json: {} });
    return route.fulfill({ json: { ...board, padding: 'x'.repeat(5_500_000), scope: {
      kind: 'nearby', latitude: Number(query.get('latitude')), longitude: Number(query.get('longitude')),
      radiusMiles: Number(query.get('radiusMiles')), returnedRoutes: board.rivers.length, totalRoutes: 2000,
    } } });
  });
  await page.goto('/');
  const pick = page.locator('[data-home-featured]').getByRole('link', { name: 'View best route' });
  await expect(pick).toBeVisible();
  expect(scopes[0].get('latitude')).toBe('45');
  await expect.poll(() => page.evaluate(async () => Boolean(await caches.match('/__home-cache/nearby')))).toBe(true);
  offline = true;
  await page.reload();
  await expect(pick).toBeVisible();
  await expect(page.locator('[data-home-freshness]').first()).toContainText('Showing latest available data');
  await page.evaluate(() => localStorage.setItem('paddletoday:user-location',
    JSON.stringify({ latitude: 33.45, longitude: -112.07, label: 'Phoenix, AZ' })));
  await page.reload();
  await expect(page.getByText('Live board could not load.', { exact: false }).first()).toBeVisible();
  await expect(pick).toHaveCount(0);
});

test('Home explains stale calls and lets paddlers reveal hidden skip routes', async ({ page }) => {
  await page.clock.install({ time: FIXTURE_NOW });
  await page.addInitScript(() => {
    localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now()));
    localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 45.08, longitude: -93.2, label: 'Test city', source: 'manual' }));
  });
  const payload = desktopBoardFixture('stale');
  const skip = structuredClone(desktopBoardFixture('fresh').rivers[0]);
  skip.river.slug = 'fixture-skip-route';
  skip.river.riverId = 'fixture-skip-river';
  skip.river.name = 'Fixture Skip River';
  skip.rating = 'No-go';
  skip.score = 10;
  skip.readiness = { status: 'skip', label: 'Skip', reason: 'Current conditions are outside the runnable band.' };
  payload.rivers.push(skip);
  payload.riverCount = payload.rivers.length;
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.route(/\/api\/rivers\/(?:summary|explore)\.json(?:\?|$)/, route => route.fulfill({ json: payload }));
  await page.goto('/');
  const notice = page.locator('[data-home-unavailable-state]');
  await expect(notice).toBeVisible();
  await expect(notice).toContainText('out of date');
  await expect(page.locator('[data-best-near-label]')).toHaveText('Route to explore · call unavailable');
  await page.getByRole('button', { name: 'Show 1 hidden “Skip today” route', exact: true }).click();
  await expect(notice).toBeHidden();
  await expect(page.getByRole('button', { name: /Fixture Skip River/ })).toBeVisible();
});
