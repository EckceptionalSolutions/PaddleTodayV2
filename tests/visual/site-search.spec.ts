import { expect, test } from '@playwright/test';

const index = [{
  kind: 'river', kindLabel: 'River', title: 'St. Croix River',
  subtitle: 'Minnesota and Wisconsin', meta: 'Three routes',
  href: '/rivers/by-river/st-croix/', searchText: 'St. Croix River Minnesota Wisconsin',
}];

test.beforeEach(async ({ page }) => {
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/search-index.json', (route) => route.fulfill({ json: index }));
});

test('search matches accented names typed without accents', async ({ page }) => {
  await page.route('**/search-index.json', (route) => route.fulfill({ json: [{
    ...index[0], title: 'Cañon Creek', searchText: 'Cañon Creek Colorado',
  }] }));
  await page.goto('/about/');
  await page.locator('[data-site-search-open]').click();
  await page.locator('[data-site-search-input]').fill('  canon   creek ');
  await expect(page.locator('.site-search-dialog__result')).toHaveCount(1);
  await expect(page.locator('.site-search-dialog__result')).toContainText('Cañon Creek');
  await expect(page.locator('[data-site-search-input]')).toHaveValue('  canon   creek ');
});

test('search recovers from a failed download without losing the query', async ({ page }) => {
  let requests = 0;
  await page.route('**/search-index.json', (route) => {
    requests += 1;
    return requests === 1
      ? route.fulfill({ status: 503, body: 'Unavailable' })
      : route.fulfill({ json: index });
  });
  await page.goto('/about/');
  await page.locator('[data-site-search-open]').click();
  await expect(page.locator('[data-site-search-results]')).toContainText('Could not load routes.');
  await page.locator('[data-site-search-input]').fill('Croix');
  await page.locator('[data-site-search-retry]').click();
  await expect(page.locator('.site-search-dialog__result')).toHaveCount(1);
  await expect(page.locator('[data-site-search-input]')).toHaveValue('Croix');
  await expect(page.locator('[data-site-search-input]')).toBeFocused();
  await expect(page.locator('[data-site-search-hint]')).toHaveText('1 match');
  expect(requests).toBe(2);
  await page.locator('[data-site-search-input]').fill('Unmatched river');
  await expect(page.locator('[data-site-search-results]')).toContainText('No matches yet.');
});

test('malformed downloads show retry instead of a false empty result', async ({ page }) => {
  await page.route('**/search-index.json', (route) => route.fulfill({ json: { error: 'bad response' } }));
  await page.goto('/about/');
  await page.locator('[data-site-search-open]').click();
  await expect(page.locator('[data-site-search-retry]')).toBeVisible();
  const panel = await page.locator('#site-search-panel').boundingBox();
  expect(panel!.x).toBeGreaterThanOrEqual(0);
  expect(panel!.x + panel!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  await page.screenshot({ path: test.info().outputPath('search-unavailable.png') });
});

test('keyboard focus stays in search and returns to its trigger on Escape', async ({ page }) => {
  await page.goto('/about/');
  const opener = page.locator('[data-site-search-open]');
  await opener.click();
  await expect(page.locator('[data-site-search-input]')).toBeFocused();
  await expect(page.locator('main')).toHaveAttribute('inert');
  await expect(opener).toHaveAttribute('aria-expanded', 'true');
  await page.locator('.site-search-dialog__result').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('[data-site-search-dismiss]')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('.site-search-dialog__result')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-site-search]')).toBeHidden();
  await expect(page.locator('main')).not.toHaveAttribute('inert');
  await expect(opener).toBeFocused();
  await expect(opener).toHaveAttribute('aria-expanded', 'false');
});

test('closing while the index loads does not reopen search or steal focus', async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route('**/search-index.json', async (route) => {
    await gate;
    await route.fulfill({ json: index });
  });
  await page.goto('/about/');
  const opener = page.locator('[data-site-search-open]');
  await opener.click();
  await page.keyboard.press('Escape');
  release();
  await expect(page.locator('[data-site-search-results]')).toHaveAttribute('aria-busy', 'false');
  await expect(page.locator('[data-site-search]')).toBeHidden();
  await expect(opener).toBeFocused();
});

test('an existing Undo notice is inert during search and usable again after closing', async ({ page }) => {
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ status: 503, json: {} }));
  await page.addInitScript(() => localStorage.setItem('paddletoday:favorites:v1', JSON.stringify({ version: 1, items: [{
    slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier to Long Lake', savedAt: Date.now(),
  }] })));
  await page.goto('/favorites/');
  await page.locator('[data-favorite-button]').first().click();
  const notice = page.locator('.action-feedback');
  await expect(notice.getByRole('button', { name: 'Undo' })).toBeVisible();
  await page.locator('[data-site-search-open]').click();
  await expect(notice).toHaveAttribute('inert');
  await page.keyboard.press('Escape');
  await expect(notice).not.toHaveAttribute('inert');
  await notice.getByRole('button', { name: 'Undo' }).click();
  await expect(page.locator('[data-field="favorite-title-link"]')).toHaveText('Rice Creek');
});
