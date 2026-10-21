import { test, expect, type Page } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';
test.use({ timezoneId: 'America/Chicago' });
const slug = 'saco-river-fryeburg-brownfield';
async function openPlan(page: Page) {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'Offline' } }));
  await page.goto(`/rivers/${slug}/`);
  await page.locator('[data-plan-account]').click();
  await expect(page).toHaveURL(/#trip-plan$/);
}
async function times(page: Page, start = '2026-11-05T09:00', end = '2026-11-05T13:00') {
  await page.locator('[data-trip-launch]').fill(start);
  await page.locator('[data-trip-end]').fill(end);
  await page.locator('[data-trip-zone]').selectOption('America/Chicago');
}

test('production planning works without account features, with practical information first', async ({ page }) => {
  await openPlan(page);
  await expect(page.locator('.account-menu__trigger')).toHaveCount(0);
  await expect(page.locator('[data-trip-launch]')).toHaveValue('');
  await expect(page.locator('[data-trip-end]')).toHaveValue('');
  expect(await page.locator('[data-detail-map-shell]').evaluate(map => !!(map.compareDocumentPosition(document.querySelector('.river-access-grid')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  expect(await page.locator('#access-plan').evaluate(access => !!(access.compareDocumentPosition(document.querySelector('#river-conditions')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  await times(page);
  await page.locator('[data-trip-save-plan]').click();
  await expect(page.locator('[data-trip-status]')).toContainText('Plan saved in this browser');
  await page.reload();
  await expect(page.locator('[data-trip-launch]')).toHaveValue('2026-11-05T09:00');
  await page.getByRole('link', { name: 'Browser plans', exact: true }).click();
  await expect(page.locator('[data-guest-trip-list] a')).toHaveCount(1);
  await page.locator('[data-guest-trip-list] a').click();
  await expect(page.locator('[data-trip-end]')).toHaveValue('2026-11-05T13:00');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.screenshot({ path: `output/guest-trip-planning-${test.info().project.name}.png` });
});

test('legacy planning links preserve route, access and explicit time zone', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.goto(`/trips/?route=${slug}&putin=${slug}-put-in&takeout=${slug}-take-out&date=2026-11-05&launch=09:00&expected=13:00&timeZone=America%2FNew_York`);
  await expect(page).toHaveURL(new RegExp(`/rivers/${slug}/.*#trip-plan$`));
  await expect(page.locator('[data-trip-launch]')).toHaveValue('2026-11-05T09:00');
  await expect(page.locator('[data-trip-zone]')).toHaveValue('America/New_York');
});

test('calendar and float plan use chosen overnight dates in the selected zone', async ({ page }) => {
  await openPlan(page);
  await times(page, '2026-11-05T23:00', '2026-11-06T09:00');
  let exported = '';
  await page.route(`**/api/rivers/${slug}/trip.ics?*`, route => {
    exported = route.request().url();
    return route.fulfill({ headers: { 'content-type': 'text/calendar', 'content-disposition': 'attachment; filename=trip.ics' }, body: 'BEGIN:VCALENDAR\r\nEND:VCALENDAR' });
  });
  const download = page.waitForEvent('download');
  await page.locator('[data-trip-ics]').click();
  await download;
  const params = new URL(exported).searchParams;
  expect(params.get('start')).toBe('2026-11-06T05:00:00.000Z');
  expect(params.get('end')).toBe('2026-11-06T15:00:00.000Z');
  expect(params.get('putin')).toBe(`${slug}-put-in`);
  await page.evaluate(() => { Object.defineProperty(navigator, 'share', { configurable: true, value: undefined }); Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error(); } } }); document.execCommand = () => false; });
  await page.locator('[data-trip-share]').click();
  const copy = page.locator('[data-trip-manual-copy]');
  await expect(copy).toBeVisible();
  await expect(copy).toHaveValue(/Thu, Nov 5.*11:00 PM/);
  await expect(copy).toHaveValue(/Fri, Nov 6.*9:00 AM/);
  await expect(copy).toHaveValue(new RegExp(`/rivers/${slug}/\\?putin=`));
});

test('invalid schedules and DST ambiguity do not share or export', async ({ page }) => {
  await openPlan(page);
  let shares = 0;
  await page.exposeFunction('countTripShare', () => { shares++; });
  await page.evaluate(() => Object.defineProperty(navigator, 'share', { configurable: true, value: async () => { await (window as any).countTripShare(); } }));
  await times(page, '2026-11-05T13:00', '2026-11-05T09:00');
  await page.locator('[data-trip-share]').click();
  await expect(page.locator('[data-trip-status]')).toContainText('after launch');
  await times(page, '2026-11-01T01:30', '2026-11-01T04:00');
  await page.locator('[data-trip-share]').click();
  await expect(page.locator('[data-trip-status]')).toContainText('clock change');
  expect(shares).toBe(0);
});

test('failed or stale calendar checks keep the edited schedule', async ({ page }) => {
  await openPlan(page);
  await times(page);
  await page.locator('[data-trip-ics]').click();
  await expect(page.locator('[data-trip-status]')).toContainText('Calendar export is unavailable');
  await expect(page.locator('[data-trip-launch]')).toHaveValue('2026-11-05T09:00');
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  let downloads = 0; page.on('download', () => downloads++);
  await page.route(`**/api/rivers/${slug}/trip.ics?*`, async route => { await gate; await route.fulfill({ contentType: 'text/calendar', body: '' }); });
  const pending = page.waitForRequest(request => request.url().includes('trip.ics'));
  await page.locator('[data-trip-ics]').click(); await pending;
  await page.locator('[data-trip-launch]').fill('2026-11-05T10:00'); release();
  await expect(page.locator('[data-trip-ics]')).toBeEnabled();
  await expect(page.locator('[data-trip-launch]')).toHaveValue('2026-11-05T10:00');
  expect(downloads).toBe(0);
});

test('unreadable saved data is preserved when saving a new plan', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:route-plans:v1', '{unfinished'));
  await openPlan(page); await times(page);
  await page.locator('[data-trip-save-plan]').click();
  await expect(page.locator('[data-trip-status]')).toContainText('Existing browser data was kept');
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:route-plans:v1'))).toBe('{unfinished');
});

test('an invalid shared time zone requires an explicit replacement', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.goto(`/rivers/${slug}/?start=2026-11-05T09:00&end=2026-11-05T13:00&timeZone=Invalid%2FZone#trip-plan`);
  await expect(page.locator('[data-trip-zone]')).toHaveValue('');
  await page.locator('[data-trip-save-plan]').click();
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:route-plans:v1'))).toBeNull();
  await page.locator('[data-trip-zone]').selectOption('America/New_York');
  await page.locator('[data-trip-save-plan]').click();
  await expect(page.locator('[data-trip-status]')).toContainText('Plan saved in this browser');
});

test('requesting another access pair does not restore the default pair schedule', async ({ page }) => {
  await openPlan(page); await times(page);
  await page.locator('[data-trip-save-plan]').click();
  await expect(page.locator('[data-trip-status]')).toContainText('Plan saved in this browser');
  await page.goto(`/rivers/${slug}/?putin=another-put-in&takeout=another-take-out#trip-plan`);
  await expect(page.locator('[data-trip-launch]')).toHaveValue('');
  await expect(page.locator('[data-trip-end]')).toHaveValue('');
});
