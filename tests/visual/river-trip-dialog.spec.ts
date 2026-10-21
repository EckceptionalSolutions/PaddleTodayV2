import { test, expect, type Page } from '@playwright/test';
import { getRiverGroupById } from '../../src/lib/rivers';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };
test.use({ timezoneId: 'America/Chicago' });

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
    if (river.slug === 'cahaba-river-moon-grants-mill') await page.screenshot({ path: `output/complete-trip-modal-${test.info().project.name}.png` });
    if (river.slug.endsWith('highway-280')) await expect(dialog).toContainText('Route line and GPX withheld');
    expect(new URL(page.url()).searchParams.get('details')).toBe(river.slug);
    await expect(dialog.getByRole('button', { name: 'Close trip details' })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(page).toHaveURL(originalUrl);
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
  await dialog.locator('.route-choice__sources').filter({ hasText: 'Sources and route evidence' }).locator('summary').click();
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

test('navigation, saved state and planning actions belong to the open trip', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text: string) => { Reflect.set(window, 'tripCopied', text); } } });
    Object.defineProperty(navigator, 'share', { configurable: true, value: async (payload: unknown) => { Reflect.set(window, 'tripShared', payload); } });
  });
  const group = await openHub(page, 'cahaba-river-alabama');
  const river = group.routes.find(r => r.slug === 'cahaba-river-grants-mill-old-overton')!;
  await page.locator(`[data-route-slug="${river.slug}"] [data-trip-details]`).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('link', { name: 'Open put-in map', exact: true })).toHaveAttribute('href', `https://www.google.com/maps?q=${river.putIn!.latitude},${river.putIn!.longitude}`);
  const directions = new URL((await dialog.getByRole('link', { name: 'Directions to take-out', exact: true }).getAttribute('href'))!);
  expect(directions.searchParams.get('destination')).toBe(`${river.takeOut!.latitude},${river.takeOut!.longitude}`);
  expect(directions.searchParams.get('travelmode')).toBe('driving');
  const plan = new URL((await dialog.getByRole('link', { name: 'Plan this trip', exact: true }).getAttribute('href'))!, page.url());
  expect(plan.searchParams.get('route')).toBe(river.slug);
  expect(plan.searchParams.get('putin')).toContain(river.slug);
  await dialog.getByRole('button', { name: 'Copy put-in coordinates', exact: true }).click();
  expect(await page.evaluate(() => Reflect.get(window, 'tripCopied'))).toBe(`${river.putIn!.latitude},${river.putIn!.longitude}`);
  await dialog.getByRole('button', { name: 'Copy trip link', exact: true }).click();
  const copied = await page.evaluate(() => Reflect.get(window, 'tripCopied'));
  expect(new URL(copied).searchParams.get('details')).toBe(river.slug);
  await dialog.getByRole('button', { name: 'Share trip', exact: true }).click();
  expect((await page.evaluate(() => Reflect.get(window, 'tripShared'))).url).toBe(copied);
  const save = dialog.locator('[data-favorite-button]');
  expect((await save.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await save.click();
  await expect(save).toHaveAttribute('aria-pressed', 'true');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:favorites:v1')!).items);
  expect(saved.find((item: {slug: string}) => item.slug === river.slug).url).toContain(`details=${river.slug}`);
  await page.keyboard.press('Escape');
  await expect(page.locator(`[data-route-slug="${river.slug}"] [data-favorite-button]`)).toHaveAttribute('aria-pressed', 'true');
  await page.goto(copied);
  await expect(page.getByRole('dialog').getByRole('heading', { level: 2 })).toHaveText(river.reach);
  await expect(page.locator(`[data-route-slug="${river.slug}"] [data-group-route-select]`)).toHaveAttribute('aria-pressed', 'true');
  await page.goBack();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.goForward();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('show on map closes the modal and selects the inspected trip', async ({ page }) => {
  await openHub(page, 'cahaba-river-alabama');
  const slug = 'cahaba-river-old-overton-highway-280';
  await page.locator(`[data-route-slug="${slug}"] [data-trip-details]`).click();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Download GPX' })).toHaveCount(0);
  await page.getByRole('dialog').getByRole('button', { name: 'Show this trip on map', exact: true }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('[data-group-selected-summary]')).toContainText('Old Overton Road access to US Highway 280 access');
  await expect(page).toHaveURL(new RegExp(`#trip-${slug}$`));
  expect(new URL(page.url()).searchParams.has('details')).toBe(false);
  await expect(page.locator('[data-group-map]')).toBeFocused();
});

test('calendar export uses chosen local times and the exact trip; invalid order is rejected', async ({ page }) => {
  await openHub(page, 'cahaba-river-alabama');
  const slug = 'cahaba-river-moon-grants-mill';
  let calendarUrl = '';
  await page.route(`**/api/rivers/${slug}/trip.ics?**`, route => {
    calendarUrl = route.request().url();
    return route.fulfill({ contentType: 'text/calendar', headers: { 'content-disposition': 'attachment; filename="trip.ics"' }, body: 'BEGIN:VCALENDAR\r\nEND:VCALENDAR' });
  });
  await page.locator(`[data-route-slug="${slug}"] [data-trip-details]`).click();
  const dialog = page.getByRole('dialog');
  await dialog.locator('[data-modal-calendar] > summary').click();
  await dialog.getByLabel('Launch time', { exact: true }).fill('2026-11-05T09:00');
  await dialog.getByLabel('Expected take-out time', { exact: true }).fill('2026-11-05T08:00');
  await dialog.getByRole('button', { name: 'Download calendar event' }).click();
  await expect(dialog.locator('[data-modal-status]')).toContainText('must be after launch');
  expect(calendarUrl).toBe('');
  await dialog.getByLabel('Expected take-out time', { exact: true }).fill('2026-11-05T13:00');
  const download = page.waitForEvent('download');
  await dialog.getByRole('button', { name: 'Download calendar event' }).click();
  await download;
  const url = new URL(calendarUrl);
  expect(url.pathname).toContain(slug);
  expect(url.searchParams.get('start')).toBe('2026-11-05T15:00:00.000Z');
  expect(url.searchParams.get('end')).toBe('2026-11-05T19:00:00.000Z');
});

test('GPX checks availability and clipboard failure provides manual copying inside the modal', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('blocked'); } } }));
  await openHub(page, 'cahaba-river-alabama');
  const slug = 'cahaba-river-moon-grants-mill';
  await page.route(`**/api/rivers/${slug}/trip.gpx?**`, route => route.fulfill({ status: 409, json: { error: 'geometry_not_found' } }));
  await page.locator(`[data-route-slug="${slug}"] [data-trip-details]`).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('link', { name: 'Download GPX', exact: true }).click();
  await expect(dialog.locator('[data-modal-status]')).toContainText('GPX is unavailable');
  await dialog.getByRole('button', { name: 'Copy trip link', exact: true }).click();
  await expect(dialog.getByRole('textbox', { name: 'Text to copy' })).toBeVisible();
  await expect(dialog.getByRole('textbox', { name: 'Text to copy' })).toHaveValue(new RegExp(`details=${slug}`));
  await expect(dialog.getByRole('textbox', { name: 'Text to copy' })).toBeFocused();
});

test('changing calendar times during an export check keeps the new values', async ({ page }) => {
  await openHub(page, 'cahaba-river-alabama');
  const slug = 'cahaba-river-moon-grants-mill';
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  let requested = false;
  await page.route(`**/api/rivers/${slug}/trip.ics?**`, async route => {
    requested = true; await pending;
    await route.fulfill({ contentType: 'text/calendar', body: '' });
  });
  await page.locator(`[data-route-slug="${slug}"] [data-trip-details]`).click();
  const dialog = page.getByRole('dialog');
  await dialog.locator('[data-modal-calendar] > summary').click();
  await dialog.getByLabel('Launch time', { exact: true }).fill('2026-11-05T09:00');
  await dialog.getByLabel('Expected take-out time', { exact: true }).fill('2026-11-05T13:00');
  await dialog.getByRole('button', { name: 'Download calendar event' }).click();
  await expect.poll(() => requested).toBe(true);
  await dialog.getByLabel('Launch time', { exact: true }).fill('2026-11-05T10:00');
  release();
  await expect(dialog.locator('[data-modal-status]')).toContainText('times changed');
  await expect(dialog.getByLabel('Launch time', { exact: true })).toHaveValue('2026-11-05T10:00');
  await expect(dialog).toBeVisible();
});
