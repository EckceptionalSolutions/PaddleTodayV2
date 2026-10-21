import { test, expect, type Page } from '@playwright/test';
import { getRiverGroupById } from '../../src/lib/rivers';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

async function openHub(page: Page, riverId: string, offline = false) {
  const group = getRiverGroupById(riverId)!;
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'Offline' } }));
  if (!offline) await page.route(`**/api/river-groups/${riverId}.json*`, route => route.fulfill({ json: { result: {
    group: { ...group, routes: undefined },
    routes: group.routes.map(river => ({ ...fixture.result, river: { ...fixture.result.river, ...river,
      distanceLabel: river.logistics?.distanceLabel, estimatedPaddleTime: river.logistics?.estimatedPaddleTime } })),
  } } }));
  await page.goto(`/rivers/by-river/${riverId}/`);
  await expect(page.locator('[data-river-group-page]')).toHaveAttribute(offline ? 'data-initial-unavailable' : 'data-group-loaded', 'true');
  return group;
}

test('scored and planning cards open the same modal, with their own facts and full guides', async ({ page }) => {
  const group = await openHub(page, 'cahaba-river-alabama');
  const dialog = page.getByRole('dialog');
  const originalUrl = page.url();
  for (const river of group.routes) {
    const button = page.locator(`[data-route-slug="${river.slug}"] [data-trip-details]`);
    await expect(button).toHaveText('View trip details');
    await button.click();
    await expect(dialog).toBeVisible();
    expect(await dialog.locator('[data-trip-dialog-body]').evaluate(el => el.scrollTop)).toBe(0);
    await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(river.reach);
    await expect(dialog).toContainText(river.putIn!.name);
    await expect(dialog).toContainText(river.takeOut!.name);
    await expect(dialog).toContainText(river.logistics!.shuttle);
    await expect(dialog).toContainText(river.gaugeSource.siteName);
    await expect(dialog).toContainText(river.scoreEligibility === 'planning' ? 'No live score' : 'Scored route');
    await expect(dialog.getByRole('link', { name: 'Open full trip guide' })).toHaveAttribute('href', `/rivers/${river.slug}/`);
    const bounds = (await dialog.boundingBox())!;
    expect(bounds.width).toBeLessThanOrEqual(Math.min(680, page.viewportSize()!.width));
    expect(bounds.height).toBeLessThanOrEqual(page.viewportSize()!.height);
    if (river.slug === 'cahaba-river-moon-grants-mill') await page.screenshot({ path: `output/river-trip-modal-${test.info().project.name}.png` });
    if (river.slug.endsWith('highway-280')) await expect(dialog).toContainText('Route line and GPX withheld');
    await expect(page).toHaveURL(originalUrl);
    await expect(dialog.getByRole('button', { name: 'Close trip details' })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(button).toBeFocused();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('a consolidated option opens complete planning notes without a full-guide link', async ({ page }) => {
  await openHub(page, 'saco-river');
  const slug = 'saco-river-fryeburg-brownfield';
  await page.locator(`[data-route-slug="${slug}"] [data-trip-details]`).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Planning route');
  await expect(dialog).toContainText('Canal Bridge');
  await expect(dialog.getByRole('link', { name: 'Open full trip guide' })).toHaveCount(0);
  await dialog.locator('summary').click();
  await expect(dialog.locator('details a').first()).toBeVisible();
  await dialog.getByRole('button', { name: 'Close trip details' }).click();
  await expect(dialog).not.toBeVisible();
});

test('details survive conditions failure and remain available without JavaScript', async ({ page, browser }) => {
  await openHub(page, 'aroostook-river', true);
  await page.locator('[data-group-route-card] [data-trip-details]').first().click();
  await expect(page.getByRole('dialog')).toContainText('Shuttle');
  await expect(page.getByRole('dialog')).toContainText('No live score');
  await page.keyboard.press('Escape');
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: test.info().project.use.baseURL });
  const fallback = await context.newPage();
  await fallback.goto('/rivers/by-river/aroostook-river/');
  const notes = fallback.locator('[data-trip-details-fallback]').first();
  await notes.locator(':scope > summary').click();
  await expect(notes).toContainText('Shuttle');
  await expect(notes.locator('[data-trip-details-content]')).toBeVisible();
  await context.close();
});

test('the selected-map action opens the selected trip; refresh preserves modal and restores focus', async ({ page }) => {
  await openHub(page, 'cahaba-river-alabama');
  const slug = 'cahaba-river-grants-mill-old-overton';
  await page.locator(`[data-route-slug="${slug}"] [data-group-route-select]`).click();
  const action = page.locator('[data-group-selected-summary] [data-trip-details]');
  await action.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText('Grants Mill access to Old Overton Road access');
  await page.evaluate(() => document.querySelector<HTMLButtonElement>('[data-group-refresh]')!.click());
  await expect(page.locator('[data-group-refresh]')).toBeEnabled();
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(action).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('choices beyond the initially featured cards also have published modal details', async ({ page }) => {
  const group = await openHub(page, 'black-creek-mississippi');
  const river = group.routes.find(route => route.slug === 'black-creek-churchwell-cypress')!;
  await page.locator(`[data-route-slug="${river.slug}"] [data-trip-details]`).click();
  await expect(page.getByRole('dialog').getByRole('heading', { level: 2 })).toHaveText(river.reach);
  await expect(page.getByRole('dialog')).toContainText(river.takeOut!.name);
});
