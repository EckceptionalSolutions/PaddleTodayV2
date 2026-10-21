import { test, expect, type Page } from '@playwright/test';
import { getRiverBySlug, getRiverGroupById } from '../../src/lib/rivers';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };
import { tripActionLinks } from '../../src/lib/trip-actions';

async function prepare(page: Page, slug: string, offline = false) {
  const river = getRiverBySlug(slug)!;
  await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'Offline' } }));
  if (!offline) await page.route(`**/api/rivers/${slug}.json*`, route => route.fulfill({ json: { ...fixture, result: { ...fixture.result, river: { ...fixture.result.river, ...river, distanceLabel: river.logistics?.distanceLabel, estimatedPaddleTime: river.logistics?.estimatedPaddleTime } } } }));
  return river;
}

for (const [slug, indexable, planning] of [
  ['cahaba-river-moon-grants-mill', true, false],
  ['edisto-river-mars-oldfield-messervy', false, false],
  ['cahaba-river-grants-mill-old-overton', true, true],
  ['saco-river-fryeburg-brownfield', false, true],
] as const) test(`${slug}: same trip page and tools with independent indexing`, async ({ page, browser }) => {
  const river = await prepare(page, slug);
  const response = await page.goto(`/rivers/${slug}/`);
  expect(response?.status()).toBe(200);
  await expect(page.locator('[data-river-detail]')).toHaveAttribute('data-river-slug', slug);
  await expect(page.locator('h1')).toContainText(river.name);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://paddletoday.com/rivers/${slug}/`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', indexable ? 'index, follow' : 'noindex, follow');
  await expect(page.locator('[data-plan-account]').first()).toHaveAttribute('href', '#trip-plan');
  await expect(page.locator('[data-access-putin-directions]')).toHaveAttribute('href', new RegExp(encodeURIComponent(`${river.putIn!.latitude},${river.putIn!.longitude}`)));
  await expect(page.locator('[data-access-takeout-directions]')).toHaveAttribute('href', new RegExp(encodeURIComponent(`${river.takeOut!.latitude},${river.takeOut!.longitude}`)));
  await expect(page.locator('[data-trip-gpx]')).toHaveCount(1);
  await expect(page.locator('[data-trip-ics]')).toHaveCount(1);
  await expect(page.locator('[data-share-copy]')).toHaveCount(1);
  if (planning) {
    await expect(page.locator('#planning-sources')).toHaveCount(1);
    await expect(page.locator('#why-this-call')).toHaveCount(0);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: test.info().project.use.baseURL });
  const fallback = await context.newPage();
  await fallback.goto(`/rivers/${slug}/`);
  await expect(fallback.locator('[data-river-detail]')).toContainText(river.putIn!.name);
  await expect(fallback.locator('[data-river-detail]')).toContainText(river.takeOut!.name);
  await expect(fallback.locator('[data-plan-account]').first()).toHaveAttribute('href', '#trip-plan');
  await context.close();
});

test('hub cards and selected map trip use ordinary page links, including during API failure', async ({ page }) => {
  await prepare(page, 'saco-river-fryeburg-brownfield', true);
  await page.goto('/rivers/by-river/saco-river/');
  await expect(page.locator('[data-trip-details-dialog]')).toHaveCount(0);
  for (const river of getRiverGroupById('saco-river')!.routes) {
    await expect(page.locator(`[data-route-slug="${river.slug}"] [data-trip-page-link]`)).toHaveAttribute('href', `/rivers/${river.slug}/`);
  }
  await page.locator('[data-route-slug="saco-river-fryeburg-brownfield"] [data-trip-page-link]').click();
  await expect(page).toHaveURL(/\/rivers\/saco-river-fryeburg-brownfield\/$/);
  await expect(page.locator('[data-river-detail]')).toContainText('Canal Bridge');
});

test('old shared modal URLs reopen the trip page and preserve planner context', async ({ page }) => {
  const slug = 'saco-river-fryeburg-brownfield';
  await prepare(page, slug);
  await page.goto(`/rivers/by-river/saco-river/?details=${slug}&putin=canal-bridge&takeout=brownfield&date=2026-11-05#trip-${slug}`);
  await expect(page).toHaveURL(new RegExp(`/rivers/${slug}/\\?putin=canal-bridge&takeout=brownfield&date=2026-11-05$`));
});

test('extra hub choices have static page links without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: test.info().project.use.baseURL });
  const page = await context.newPage();
  await page.goto('/rivers/by-river/black-creek-mississippi/');
  const extra = page.locator('details').filter({ hasText: 'All trip details' });
  await extra.locator('summary').click();
  await expect(extra.getByRole('link', { name: getRiverBySlug('black-creek-churchwell-cypress')!.reach, exact: true })).toHaveAttribute('href', '/rivers/black-creek-churchwell-cypress/');
  await context.close();
});

test('held routes keep their detail pages and suppress GPX tools', async ({ page }) => {
  const slug = 'cahaba-river-old-overton-highway-280';
  await prepare(page, slug, true);
  await page.goto(`/rivers/${slug}/`);
  await expect(page.locator('[data-river-detail]')).toHaveAttribute('data-river-slug', slug);
  await expect(page.locator('[data-trip-gpx]')).toHaveCount(0);
  await expect(page.locator('[data-geometry-review-notice]')).toContainText('Route line and GPX withheld');
  await page.locator('#access-plan').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `output/consistent-trip-pages-${test.info().project.name}.png` });
});

test('conditions failure preserves exact access IDs in planning and export links', async ({ page }) => {
  const slug = 'saco-river-fryeburg-brownfield';
  const river = await prepare(page, slug, true);
  const expected = tripActionLinks(river);
  await page.goto(`/rivers/${slug}/`);
  await expect(page.locator('[data-detail-fetch-banner]')).toBeVisible();
  for (const selector of ['[data-trip-gpx]']) {
    const params = new URL((await page.locator(selector).first().getAttribute('href'))!, page.url()).searchParams;
    expect(params.get('putin')).toBe(expected.putInId);
    expect(params.get('takeout')).toBe(expected.takeOutId);
  }
});
