import { expect, test } from '@playwright/test';
import { desktopBoardFixture, FIXTURE_NOW } from './desktop-board-fixtures';

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
