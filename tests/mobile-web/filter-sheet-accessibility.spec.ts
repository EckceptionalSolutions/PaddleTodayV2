import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('state search explains no matches and cancel discards draft filters', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{ ...fixture.result,
    river: { ...fixture.result.river, difficulty: 'easy', state: 'MN' },
    summary: { gaugeNow: 'QA', shortExplanation: 'QA fixture' }, liveData: { overall: 'stale', summary: 'QA' },
  }] } }));
  await page.goto('/explore?intent=no-call');
  await page.getByRole('button', { name: '1 active filters', exact: true }).click();
  const easy = page.getByRole('button', { name: 'Easy', exact: true });
  expect((await easy.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await easy.click();
  await expect(easy).toHaveAttribute('aria-pressed', 'true');
  await page.screenshot({ path: `tmp/explore-filter-targets-${page.viewportSize()!.width}.png` });
  await page.getByRole('button', { name: 'Choose state', exact: true }).click();
  const search = page.getByRole('textbox', { name: 'Search states', exact: true });
  await search.fill('zzzz');
  await expect(page.getByText('No states match your search. Try another name or clear the search.', { exact: true })).toBeVisible();
  await search.fill('MN');
  await page.getByRole('button', { name: 'MN', exact: true }).click();
  await expect(search).toBeHidden();
  await page.getByRole('button', { name: 'Cancel filters', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Filters', exact: true })).toBeHidden();
  await page.getByRole('button', { name: '1 active filters', exact: true }).click();
  await page.getByRole('button', { name: 'Choose state', exact: true }).click();
  await expect(page.getByRole('button', { name: 'All states', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const close = page.getByRole('button', { name: 'Close state picker', exact: true });
  const bounds = (await close.boundingBox())!;
  expect(bounds.height).toBeGreaterThanOrEqual(44);
  expect(bounds.width).toBeGreaterThanOrEqual(44);
  await close.press('Enter');
  await expect(search).toBeHidden();
  await page.getByRole('button', { name: 'Cancel filters', exact: true }).press('Enter');
  await expect(page.getByRole('button', { name: /^Rice Creek,.*Call unavailable/ })).toBeVisible();
  const routeSearch = page.getByRole('textbox', { name: 'Search routes', exact: true });
  await routeSearch.fill('Rice');
  const clear = page.getByRole('button', { name: 'Clear search', exact: true });
  const clearBounds = (await clear.boundingBox())!;
  expect(clearBounds.width).toBeGreaterThanOrEqual(44);
  expect(clearBounds.height).toBeGreaterThanOrEqual(44);
  await clear.press('Enter');
  await expect(routeSearch).toBeFocused();
  await expect(routeSearch).toHaveValue('');
  await page.screenshot({ path: `tmp/explore-controls-${page.viewportSize()!.width}.png` });
});
