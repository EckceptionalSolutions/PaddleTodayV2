import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

function weekendRoute(name: string, rating: 'Good' | 'Fair' | 'No-go', camping = false) {
  return {
    river: {
      ...fixture.result.river, difficulty: 'easy', name, slug: name.toLowerCase().replaceAll(' ', '-'),
      logistics: { campingClassification: camping ? 'nearby_basecamp' : 'unknown' },
    },
    current: { score: 70, rating, gaugeBandLabel: 'QA fixture' },
    weekend: {
      label: 'Weekend', score: rating === 'Good' ? 80 : rating === 'Fair' ? 55 : 20,
      rating, confidence: 'High', explanation: 'QA fixture.', summary: 'QA fixture.', signalLine: '',
    },
    liveData: { overall: 'stale', summary: 'QA fixture; check current conditions.' },
    generatedAt: new Date().toISOString(),
  };
}

for (const located of [false, true]) {
  test(`Weekend categories retain top camping and Watch routes ${located ? 'with' : 'without'} a location`, async ({ page }) => {
    await page.addInitScript(({ located, river }) => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      if (located) localStorage.setItem('paddletoday:user-location', JSON.stringify({
        latitude: river.latitude, longitude: river.longitude, label: 'QA location', source: 'search',
      }));
    }, { located, river: fixture.result.river });
    await page.route('**/api/**', (route) => route.fulfill({ json: {
      rivers: [weekendRoute('Camping Pick', 'Good', true), weekendRoute('Watch Pick', 'Fair'), weekendRoute('Skip Pick', 'No-go')],
    } }));
    await page.goto('/weekend');
    const campingRoute = page.getByRole('button', { name: /^Camping Pick,.*?, score 80$/ });
    const watchRoute = page.getByRole('button', { name: /^Watch Pick,.*?, score 55$/ });
    await expect(campingRoute).toHaveCount(1);
    await expect(watchRoute).toHaveCount(1);
    await expect(page.getByRole('tab', { name: 'All, 3 routes', exact: true })).toBeVisible();
    await page.getByRole('tab', { name: 'Camping, 1 routes', exact: true }).press('Space');
    await expect(campingRoute).toBeVisible();
    await expect(watchRoute).toHaveCount(0);
    await page.getByRole('tab', { name: 'Watch, 1 routes', exact: true }).press('Space');
    await expect(watchRoute).toBeVisible();
    await expect(campingRoute).toHaveCount(0);
    await page.getByRole('tab', { name: 'All, 3 routes', exact: true }).press('Space');
    await expect(campingRoute).toHaveCount(1);
    await expect(watchRoute).toHaveCount(1);
    await page.getByRole('tab', { name: 'All, 3 routes', exact: true }).press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Day trips, 1 routes', exact: true })).toBeFocused();
    await expect(page.getByRole('tab', { name: 'Day trips, 1 routes', exact: true })).toHaveAttribute('aria-selected', 'true');
    await expect(watchRoute).toHaveCount(0);
  });
}

test('Watch filter counts nearby routes when no Paddle options exist', async ({ page }) => {
  await page.addInitScript((river) => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:user-location', JSON.stringify({
      latitude: river.latitude, longitude: river.longitude, label: 'QA location', source: 'search',
    }));
  }, fixture.result.river);
  await page.route('**/api/**', (route) => route.fulfill({ json: { rivers: [weekendRoute('Watch Pick', 'Fair')] } }));
  await page.goto('/weekend');
  await page.getByRole('tab', { name: 'Watch, 1 routes', exact: true }).press('Space');
  await expect(page.getByRole('button', { name: /^Watch Pick,.*?, score 55$/ })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'All, 1 routes', exact: true })).toBeVisible();
  await expect(page.getByText('No weekend routes are in the maybe range right now.', { exact: true })).toHaveCount(0);
  await page.getByRole('tab', { name: 'Camping, 0 routes', exact: true }).press('Space');
  await expect(page.getByText('No camping-friendly routes', { exact: true })).toBeVisible();
  await expect(page.getByText('No routes match this weekend category within your range. Choose All or increase the range above.', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'All, 1 routes', exact: true }).press('Space');
  await expect(page.getByText('No camping-friendly routes', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /^Watch Pick,.*?, score 55$/ })).toBeVisible();
});
