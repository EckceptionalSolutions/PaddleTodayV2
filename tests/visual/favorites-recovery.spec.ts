import { expect, test } from '@playwright/test';
import sharp from 'sharp';
import { holdMapBackgroundTiles } from './map-background-fixture';
import routeFixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };
import { installMapLibreHarness } from './maplibre-harness';

test.beforeEach(async ({ page }) => {
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ status: 503, json: { error: 'Offline' } }));
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:favorites:v1', JSON.stringify({ version: 1, items: [{
      slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier to Long Lake',
      savedAt: Date.now(), notes: 'Bring the blue kayak',
    }] }));
  });
});

test('native saved routes stay usable while background tiles are delayed', async ({ page }) => {
  const release = await holdMapBackgroundTiles(page);
  await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [routeFixture.result] } }));
  try {
    await page.goto('/favorites/');
    const status = page.locator('[data-favorites-map-status]');
    await expect(status).toHaveAttribute('data-map-state', 'ready');
    await expect(status).toContainText('Background map is loading');
    const canvas = await page.locator('[data-favorites-map] canvas').elementHandle();
    await page.locator('[data-favorites-map] .score-map-marker').click();
    await expect(page.locator('.maplibregl-popup')).toBeVisible();
    await page.waitForTimeout(7400);
    await expect(status).toHaveAttribute('data-map-state', 'ready');
    await expect(page.locator('.maplibregl-popup')).toBeVisible();
    expect(await canvas!.evaluate(node => node.isConnected)).toBe(true);
    release();
    await expect(status).toHaveText('Showing 1 saved route.');
    expect(await canvas!.evaluate(node => node.isConnected)).toBe(true);
    await page.waitForTimeout(400);
    const pixels = await sharp(await page.locator('[data-favorites-map] canvas').screenshot()).removeAlpha().raw().toBuffer();
    let colored = 0;
    for (let i = 0; i < pixels.length; i += 3) if (Math.abs(pixels[i] - 101) < 5 && Math.abs(pixels[i+1] - 150) < 5 && Math.abs(pixels[i+2] - 166) < 5) colored++;
    expect(colored).toBeGreaterThan(1000);
    await page.locator('[data-favorites-map]').screenshot({ path: test.info().outputPath('delayed-map-background.png') });
  } finally { release(); }
});

for (const action of ['note save', 'condition refresh']) {
test(`saved map keeps its viewport through ${action}`, async ({ page }) => {
  await installMapLibreHarness(page);
  await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
  const result = structuredClone(routeFixture.result);
  result.score = 74;
  result.readiness = { status: 'ready', label: 'Ready', reason: 'Synthetic current call.' };
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [result] } }));
  await page.goto('/favorites/');
  await expect(page.locator('[data-favorites-map-status]')).toHaveAttribute('data-map-state', 'ready');
  const marker = page.locator('[data-favorites-map] .score-map-marker');
  await marker.press('Enter');
  const originalMarker = await marker.elementHandle();
  const popup = page.locator('.maplibregl-popup');
  await expect(popup).toBeVisible();
  const originalPopup = await popup.elementHandle();
  const fits = await page.evaluate(() => (window as any).__paddleMapHarness.fitCalls.length);
  if (action === 'note save') {
    await page.locator('[data-favorite-notes]').click();
    const editor = page.locator('[data-favorite-notes-dialog]');
    await editor.locator('textarea').fill('Leave the shuttle bike at the takeout.');
    await editor.getByRole('button', { name: 'Save note' }).click();
    await expect(page.locator('[data-field="favorite-notes-text"]')).toContainText('shuttle bike');
  } else {
    result.score = 75;
    await page.locator('[data-favorites-refresh]').click();
    await expect(marker).toHaveText('75');
  }
  await expect(page.locator('[data-favorites-map-status]')).toHaveAttribute('data-map-state', 'ready');
  expect(await page.evaluate(() => (window as any).__paddleMapHarness.fitCalls.length)).toBe(fits);
  expect(await originalMarker!.evaluate(element => element.isConnected)).toBe(true);
  expect(await originalPopup!.evaluate(element => element.isConnected)).toBe(true);
  await expect(popup).toBeVisible();
  if (action === 'condition refresh') {
    await expect(popup).toContainText('Score 75');
    await popup.getByRole('link', { name: 'View route' }).focus();
    result.score = 76;
    await page.locator('[data-favorites-refresh]').evaluate(button => (button as HTMLButtonElement).click());
    await expect(popup).toContainText('Score 76');
    await expect(popup.getByRole('link', { name: 'View route' })).toBeFocused();
    await popup.getByRole('link', { name: 'View route' }).press('Escape');
    await expect(marker).toBeFocused();
    result.score = 77;
    await page.locator('[data-favorites-refresh]').click();
    await expect(marker).toHaveText('77');
    await marker.press('Enter');
    await expect(popup).toContainText('Score 77');
  }
});
}

test('native saved map popups keep their river name visible on opening', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [routeFixture.result] } }));
  await page.goto('/favorites/');
  await page.locator('[data-favorites-map] .score-map-marker').click();
  const popup = page.locator('.maplibregl-popup');
  await expect(popup).toHaveAttribute('style', /--map-popup-max-height/);
  await page.waitForTimeout(500);
  await expect(popup.locator('h3')).toBeInViewport({ ratio: 0.95 });
  expect(await popup.evaluate(node => {
    if (!node.querySelector('.maplibregl-popup-content--scrollable')) return true;
    const heading = node.querySelector('h3')!.getBoundingClientRect();
    const close = node.querySelector('.maplibregl-popup-close-button')!.getBoundingClientRect();
    return heading.top >= close.bottom;
  })).toBe(true);
  const link = popup.getByRole('link', { name: 'View route' });
  await link.focus();
  await expect(link).toBeInViewport({ ratio: 0.95 });
});

test('unavailable saved calls use neutral styling and their current limitation', async ({ page }) => {
  await installMapLibreHarness(page);
  const result = structuredClone(routeFixture.result);
  result.readiness.reason = 'Gauge read is stale; check the source.';
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [result] } }));
  await page.goto('/favorites/');
  const card = page.locator('.favorites-card');
  await expect(card.locator('[data-field="favorite-summary"]')).toHaveText(result.readiness.reason);
  await expect(card.locator('[data-field="favorite-weather"]')).toBeHidden();
  await expect(card.locator('.score-orb')).not.toHaveClass(/score-orb--(great|good)/);
  await expect(card.locator('[data-field="favorite-facts"]')).not.toContainText('High data confidence');
  await expect(card.locator('[data-field="favorite-verdict"]')).toHaveText('Call unavailable');
  const marker = page.locator('[data-favorites-map] .score-map-marker');
  await expect(marker).toHaveClass(/score-map-marker--pending/);
  await expect(marker).toHaveText('--');
  await marker.press('Enter');
  const popup = page.locator('[data-favorites-map] .score-map-popup');
  await expect(popup.locator('.score-map-popup__verdict')).toHaveText('Call unavailable');
  await expect(popup).toContainText(result.readiness.reason);
  await expect(popup.locator('.score-map-popup__meta')).not.toContainText('Score');
  result.readiness = { status: 'ready', label: 'Ready', reason: 'Synthetic current call.' };
  result.explanation = 'Synthetic current call.';
  await page.locator('[data-favorites-refresh]').click();
  await expect(card.locator('[data-field="favorite-summary"]')).toHaveText('Synthetic current call.');
  await expect(card.locator('[data-field="favorite-weather"]')).toBeVisible();
  await expect(card.locator('.score-orb')).toHaveClass(/score-orb--good/);
  await expect(marker).toHaveClass(/score-map-marker--good/);
  await expect(marker).toHaveText(String(result.score));
});

test('saved routes survive a failed load and can retry without a reload', async ({ page }) => {
  await page.goto('/favorites/');
  await expect(page.locator('[data-favorites-summary]')).toContainText('Could not refresh');
  await expect(page.locator('[data-favorites-summary]')).not.toContainText('Updated recently');
  await expect(page.locator('[data-field="favorite-title-link"]')).toHaveText('Rice Creek');
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring the blue kayak');
  await expect(page.locator('[data-field="favorite-title-link"]')).toHaveAttribute('href', '/rivers/rice-creek-peltier-to-long-lake/');
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: [], snapshotStatus: 'fresh' } }));
  await page.locator('[data-favorites-refresh]').click();
  await expect(page.locator('[data-favorites-summary]')).not.toContainText('Could not refresh');
  await expect(page.locator('[data-favorites-refresh]')).toHaveText('Refresh calls');
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring the blue kayak');
});

test('editing a note does not erase the failed-refresh notice', async ({ page }) => {
  await page.goto('/favorites/');
  await expect(page.locator('[data-favorites-refresh]')).toHaveText('Try again');
  await page.locator('[data-favorite-notes]').click();
  await page.locator('[data-favorite-notes-dialog] textarea').fill('Bring two paddles');
  await page.locator('[data-favorite-notes-dialog] button[type="submit"]').click();
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring two paddles');
  await expect(page.locator('[data-favorites-summary]')).toContainText('Could not refresh');
  await expect(page.locator('[data-favorite-notes]')).toBeFocused();
});

test('a save action cannot replace unreadable stored routes', async ({ page }) => {
  await page.goto('/favorites/');
  const remove = page.getByRole('button', { name: /^Remove saved route: Rice Creek/ });
  await expect(remove).toBeVisible();
  const original = await page.evaluate(() => localStorage.getItem('paddletoday:favorites:v1'));
  await page.evaluate(() => localStorage.setItem('paddletoday:favorites:v1', '{"unfinished":'));
  await remove.click();
  await expect(page.locator('.action-feedback')).toContainText('Could not update Saved routes');
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:favorites:v1'))).toBe('{"unfinished":');
  await page.evaluate((raw) => localStorage.setItem('paddletoday:favorites:v1', raw!), original);
  await remove.click();
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await expect(remove).toBeVisible();
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring the blue kayak');
});

test('unreadable saved storage shows retry instead of an empty list', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.getItem;
    Storage.prototype.getItem = function (key) {
      if (key === 'paddletoday:favorites:v1' && !localStorage.getItem('qa:allow-saved-read')) throw new Error('QA unavailable');
      return original.call(this, key);
    };
  });
  await page.goto('/favorites/');
  const retry = page.getByRole('button', { name: 'Retry loading saved routes', exact: true });
  await expect(retry).toBeVisible();
  await expect(page.locator('[data-favorites-summary]')).toContainText('Your stored list has not been changed');
  await expect(page.locator('[data-favorites-empty]')).toBeHidden();
  await retry.press('Enter');
  await expect(retry).toBeEnabled();
  await page.evaluate(() => localStorage.setItem('qa:allow-saved-read', '1'));
  await retry.press('Enter');
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring the blue kayak');
  await expect(page.locator('[data-favorites-summary]')).toContainText('Could not refresh');
});

test('clearing browser data in another tab refreshes the saved list', async ({ page, context }) => {
  await page.goto('/favorites/');
  await expect(page.locator('[data-field="favorite-title-link"]')).toHaveText('Rice Creek');
  const otherTab = await context.newPage();
  try {
    await otherTab.goto('/about/');
    await otherTab.evaluate(() => localStorage.clear());
    await expect(page.locator('[data-favorites-empty]')).toBeVisible();
    await expect(page.locator('[data-favorites-grid]')).toBeHidden();
    await expect(page.locator('[data-favorites-summary]')).toHaveText('No routes saved on this device yet.');
  } finally {
    await otherTab.close();
  }
});

test('the saved list is usable while current calls are still loading', async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route('**/api/rivers/summary.json', async (route) => {
    await gate;
    await route.fulfill({ json: { rivers: [] } });
  });
  await page.goto('/favorites/');
  await expect(page.locator('[data-field="favorite-title-link"]')).toHaveText('Rice Creek');
  await expect(page.locator('[data-favorites-summary]')).toContainText('Checking current calls');
  await expect(page.locator('[data-favorites-refresh]')).toBeDisabled();
  release();
  await expect(page.locator('[data-favorites-refresh]')).toBeEnabled();
});

test('saved map retries a failed download without losing routes or notes', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.addInitScript(() => {
    (window as any).__savedMapLibrary = (window as any).maplibregl;
    delete (window as any).maplibregl;
  });
  await page.route('https://unpkg.com/**', route => route.abort());
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [routeFixture.result] } }));
  await page.goto('/favorites/');
  const retry = page.locator('[data-favorites-map-retry]');
  await expect(retry).toBeVisible();
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring the blue kayak');
  await page.evaluate(() => { (window as any).maplibregl = (window as any).__savedMapLibrary; });
  await retry.click();
  const status = page.locator('[data-favorites-map-status]');
  await expect(status).toHaveAttribute('data-map-state', 'ready');
  await expect(retry).toBeHidden();
  await expect(status).toBeFocused();
  await expect(page.locator('[data-favorites-map] .score-map-marker')).toHaveCount(1);
});

test('removing a saved route during map loading cannot restore its marker', async ({ page }) => {
  await installMapLibreHarness(page, { mapReady: false });
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [routeFixture.result] } }));
  await page.goto('/favorites/');
  await expect(page.locator('[data-favorites-map] canvas')).toHaveCount(1);
  await page.getByRole('button', { name: /^Remove saved route: Rice Creek/ }).click();
  await page.evaluate(() => {
    (window as any).maplibregl.Map.prototype.loaded = () => true;
    (window as any).maplibregl.Map.prototype.isStyleLoaded = () => true;
    for (const map of (window as any).__paddleMapInstances) map.emit('idle');
  });
  await expect(page.locator('[data-favorites-map-shell]')).toBeHidden();
  await expect(page.locator('[data-favorites-map] .score-map-marker')).toHaveCount(0);
  await expect(page.locator('[data-favorites-empty]')).toBeVisible();
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await expect(page.locator('[data-favorites-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await expect(page.locator('[data-favorites-map] .score-map-marker')).toHaveCount(1);
});
