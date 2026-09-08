import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('shortened Explore route directions target the selected launch', async ({ page }) => {
  const start = { ...fixture.result.river.accessPoints[0], mileFromStart: 0 };
  const launch = { ...fixture.result.river.accessPoints[3], mileFromStart: 10 };
  const end = { ...fixture.result.river.accessPoints.at(-1)!, mileFromStart: 13 };
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    const state = window as unknown as { openedDirections: string[] };
    state.openedDirections = [];
    window.open = ((url: string | URL) => { state.openedDirections.push(String(url)); return null; }) as typeof window.open;
  });
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: [{
    ...fixture.result,
    score: 80, rating: 'Good',
    river: { ...fixture.result.river, difficulty: 'easy', distanceLabel: '13 mi', estimatedPaddleTime: '6 hours',
      putIn: start, takeOut: end, accessPoints: [start, launch, end],
      segmentEdges: [{ fromId: start.id, toId: launch.id, status: 'verified' }, { fromId: launch.id, toId: end.id, status: 'verified' }],
    },
    summary: { gaugeNow: 'Check source', shortExplanation: 'QA fixture.' },
    liveData: { overall: 'stale', summary: 'Check current conditions.' },
  }] } }));
  await page.goto('/explore?intent=quick-float');
  await page.getByRole('button', { name: /^Rice Creek,.*Call unavailable/ }).press('Enter');
  const directions = page.getByRole('button', { name: `Directions to ${launch.name} put-in`, exact: true });
  await expect(directions).toBeVisible();
  await directions.press('Space');
  await expect.poll(() => page.evaluate(() => (window as unknown as { openedDirections: string[] }).openedDirections.length)).toBe(1);
  const url = await page.evaluate(() => (window as unknown as { openedDirections: string[] }).openedDirections[0]);
  expect(new URL(url).searchParams.get('query')).toBe(`${launch.latitude},${launch.longitude}`);
  expect(new URL(url).searchParams.get('query')).not.toBe(`${start.latitude},${start.longitude}`);
  const expand = page.getByRole('button', { name: 'Expand route drawer', exact: true }).first();
  await expect(expand).toHaveAttribute('aria-expanded', 'false');
  await expand.press('Space');
  await expect(page.getByRole('button', { name: 'Collapse route drawer', exact: true }).first()).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Selected distance', { exact: true })).toBeVisible();
  await expect(page.getByText('3.0 mi', { exact: true })).toBeVisible();
  await expect(page.getByText('Selected paddle time', { exact: true })).toBeVisible();
  await expect(page.getByText('About 1 hr to 1.5 hr', { exact: true })).toBeVisible();
  await expect(page.getByText('13 mi', { exact: true })).toHaveCount(0);
  await expect(page.getByText('6 hours', { exact: true })).toHaveCount(0);
});
