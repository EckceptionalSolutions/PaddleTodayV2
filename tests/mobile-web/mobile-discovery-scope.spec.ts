import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };
import { installMobileBoardFixtures } from './mobile-board-fixtures';

test('nearby discovery crosses state borders and nationwide search finds distant routes', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 45, longitude: -92.8, label: 'Border city', source: 'search' }));
    localStorage.setItem('paddletoday:explore-preferences:v4', JSON.stringify({ viewMode: 'list', filters: {
      sort: 'best', query: '', state: '', difficulty: 'any', routeType: 'all', status: 'any',
      rating: 'any', distance: 'any', paddleTime: 'any', paddleLength: 'any', camping: 'any',
    } }));
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  const fulfillMobile = await installMobileBoardFixtures(page);
  const scopes: URLSearchParams[] = [];
  const rivers = [
    ['Minnesota Border', 'Minnesota', 45, -92.9],
    ['Wisconsin Border', 'Wisconsin', 45, -92.7],
    ['Distant Canyon', 'Arizona', 35, -112],
  ].map(([name, state, latitude, longitude], index) => ({ ...fixture.result,
    river: { ...fixture.result.river, slug: `scope-${index}`, riverId: `scope-${index}`, name, state, latitude, longitude, difficulty: 'easy' },
    summary: { gaugeNow: 'QA reading', shortExplanation: 'QA fixture.' },
    liveData: { overall: 'stale', summary: 'Check current conditions.' },
  }));
  await page.route('**/api/mobile/explore.json**', route => {
    scopes.push(new URL(route.request().url()).searchParams);
    return fulfillMobile(route, { json: { rivers } } as Parameters<typeof fulfillMobile>[1]);
  });
  await page.goto('/explore');
  await expect(page.getByRole('button', { name: /^Open route: Minnesota Border,/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Open route: Wisconsin Border,/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Open route: Distant Canyon,/ })).toHaveCount(0);
  expect(scopes[0].get('radiusMiles')).toBe('300');
  expect(scopes[0].has('state')).toBe(false);
  const search = page.getByRole('textbox', { name: 'Search routes', exact: true });
  await search.fill('Distant Canyon');
  await expect(page.getByRole('button', { name: /^Open route: Distant Canyon,/ })).toBeVisible();
  expect(scopes.at(-1)!.toString()).toBe('');
  await search.fill('');
  await page.getByRole('button', { name: 'Within 300 mi · Search nationwide', exact: true }).click();
  await expect(page.getByRole('button', { name: /^Open route: Distant Canyon,/ })).toBeVisible();
  await page.getByRole('button', { name: 'Show nearby routes', exact: true }).click();
  await expect(page.getByRole('button', { name: /^Open route: Distant Canyon,/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /^Open route: Wisconsin Border,/ })).toBeVisible();
});
