import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('postal state searches work in Today, Saved, Explore and the state picker', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const rivers = ['New Jersey', 'Ohio'].map((state, index) => ({ ...fixture.result,
    river: { ...fixture.result.river, state, slug: `state-search-${index}`, riverId: `state-search-${index}`, name: `River ${index}`, reach: 'Park to bridge', difficulty: 'easy' },
    summary: { gaugeNow: 'QA', shortExplanation: 'QA route' },
    liveData: { overall: 'stale', summary: 'QA' },
  }));
  await page.addInitScript(records => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:saved-rivers', JSON.stringify(records));
  }, rivers.map(route => ({ slug: route.river.slug, name: route.river.name, reach: route.river.reach, savedAt: new Date().toISOString() })));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Search for a river or route', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('textbox', { name: 'Search rivers and routes', exact: true }).fill('nj');
  await expect(dialog.getByRole('button', { name: 'View River 0: Park to bridge', exact: true })).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'View River 1: Park to bridge', exact: true })).toHaveCount(0);
  await page.goto('/saved');
  await page.getByRole('textbox', { name: 'Search saved routes', exact: true }).fill('NJ');
  await expect(page.getByText('Showing 1 of 2 saved routes.', { exact: true })).toBeVisible();
  await expect(page.getByText('River 0', { exact: true })).toBeVisible();
  await page.goto('/explore?intent=no-call');
  await page.getByRole('tab', { name: 'list view', exact: true }).click();
  await page.getByRole('textbox', { name: 'Search routes', exact: true }).fill('NJ');
  await expect(page.getByRole('button', { name: /^Open route: River 0,/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Open route: River 1,/ })).toHaveCount(0);
  await page.getByRole('button', { name: /active filters/ }).click();
  await page.getByRole('button', { name: 'Choose state', exact: true }).click();
  await page.getByRole('textbox', { name: 'Search states', exact: true }).fill('NJ');
  await expect(page.getByRole('button', { name: 'New Jersey', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ohio', exact: true })).toHaveCount(0);
  expect(errors).toEqual([]);
});
