import { test, expect } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';

test('South Carolina starter exposes scoring and correct launch directions', async ({page}) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({json:{rivers:[]}}));
  await page.goto('/states/south-carolina/');
  await expect(page.locator('[data-state-route-item]')).toHaveCount(3);
  await expect(page.locator('[data-state-live-root]')).toHaveCount(1);
  for (const route of await page.locator('[data-state-route-item]').all()) await expect(route).not.toContainText('Planning only');
  await page.goto('/rivers/lynches-river-indigo-wicklow/');
  await expect(page).not.toHaveTitle(/Trip Planning/);
  await expect(page.locator('[data-access-directions-google]').first()).toHaveAttribute('href', /33\.95374434.*33\.92109575/);
  await expect(page.locator('[data-overview-distance]')).toHaveText('About 5 river miles');
  await expect(page.locator('[data-overview-time]')).toHaveText('Allow 2–4 hours');
  await page.screenshot({path:test.info().outputPath('south-carolina-detail.png'),fullPage:true});
});

test('Alabama starter exposes the scored Hatchet Creek reach', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/states/alabama/');
  await expect(page.locator('[data-state-route-item]')).toHaveCount(3);
  await expect(page.locator('[data-state-live-root]')).toHaveCount(1);
  await expect(page.locator('[data-state-route-item]').first()).not.toContainText('Planning only');
  await page.goto('/rivers/hatchet-creek-highway-280-highway-231/');
  await expect(page).not.toHaveTitle(/Trip Planning/);
  await expect(page.locator('[data-access-directions-google]').first()).toHaveAttribute('href', /33\.03596.*32\.94369/);
  await expect(page.locator('[data-overview-distance]')).toHaveText('About 12.8 river miles');
  await expect(page.locator('[data-overview-time]')).toHaveText('Plan a full daylight day');
  await expect(page.locator('[data-overview-time]')).toHaveAttribute('title', 'Plan a full daylight day; allow 6–9 hours with shoal scouting');
  await page.screenshot({ path: test.info().outputPath('alabama-hatchet-detail.png'), fullPage: true });
});

test('Arizona starter exposes the scored Verde River access set', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/states/arizona/');
  await expect(page.locator('[data-state-route-item]')).toHaveCount(3);
  await expect(page.locator('[data-state-live-root]')).toHaveCount(1);
  for (const route of await page.locator('[data-state-route-item]').all()) await expect(route).not.toContainText('Planning only');
  await page.goto('/rivers/verde-river-tuzigoot-89a-bridge/');
  await expect(page).not.toHaveTitle(/Trip Planning/);
  await expect(page.locator('[data-access-directions-google]').first()).toHaveAttribute('href', /34\.7672379.*34\.7224176/);
  await expect(page.locator('[data-overview-distance]')).toHaveText('About 6.5 river miles');
  await page.screenshot({ path: test.info().outputPath('arizona-verde-detail.png'), fullPage: true });
});

test('California starter exposes the scored Lower American access set', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/states/california/');
  await expect(page.locator('[data-state-route-item]')).toHaveCount(3);
  await expect(page.locator('[data-state-live-root]')).toHaveCount(1);
  for (const route of await page.locator('[data-state-route-item]').all()) await expect(route).not.toContainText('Planning only');
  await page.goto('/rivers/american-river-harrington-watt/');
  await expect(page).not.toHaveTitle(/Trip Planning/);
  await expect(page.locator('[data-access-directions-google]').first()).toHaveAttribute('href', /38\.57974.*38\.56692/);
  await expect(page.locator('[data-overview-distance]')).toHaveText('About 4.9 river miles');
  await page.screenshot({ path: test.info().outputPath('california-american-detail.png'), fullPage: true });
});

test('Oregon starter routes are discoverable and link to planning details', async ({page}) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**',route=>route.fulfill({json:{rivers:[]}}));
  await page.goto('/states/oregon/');
  await expect(page.locator('[data-state-route-item]')).toHaveCount(3);
  await expect(page.locator('[data-state-live-root]')).toHaveCount(0);
  await expect(page.locator('a[href="/request-river/?state=Oregon"]').first()).toBeVisible();
  await page.getByRole('searchbox',{name:'Find a river or route'}).fill('Tualatin');
  await expect(page.locator('[data-state-route-item]:visible')).toHaveCount(1);
  await page.screenshot({path:test.info().outputPath('oregon-state.png'),fullPage:true});
  await page.goto('/rivers/tualatin-river-jurgens-community/');
  await expect(page).toHaveTitle(/Trip Planning/);
  await expect(page.locator('[data-access-directions-google]').first()).toHaveAttribute('href',/45\.398225.*45\.386935/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',/no live route score/);
  await page.screenshot({path:test.info().outputPath('oregon-detail.png'),fullPage:true});
});

test('planning-only state exposes routes, map filters and a state-aware request', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/states/florida/');
  const routes = page.locator('[data-state-route-item]');
  await expect(routes).toHaveCount(3);
  await expect(page.locator('[data-state-live-root]')).toHaveCount(0);
  await expect(page.getByText('Live score on route page', { exact: true })).toHaveCount(0);
  for (const route of await routes.all()) await expect(route).toContainText('Planning only');
  await expect(page.locator('a[href="/request-river/?state=Florida"]').first()).toBeVisible();
  const search = page.getByRole('searchbox', { name: 'Find a river or route' });
  await search.fill('Peace River');
  await expect(page.locator('[data-state-route-item]:visible')).toHaveCount(1);
  await search.fill('');
  await expect(page.locator('[data-state-route-item]:visible')).toHaveCount(3);
  await page.screenshot({ path: test.info().outputPath('florida-planning-state.png'), fullPage: true });
});

test('starter detail metadata and FAQ do not promise a live score', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/rivers/santa-fe-river-us27-rum-island/');
  await expect(page).toHaveTitle(/Trip Planning/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /no live route score/);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /no live route score/);
  const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schema.join('\n')).not.toContain('conservative low-water floor');
  expect(schema.join('\n')).not.toContain('use the live score');
  await expect(page.locator('[data-access-directions-google]').first()).toHaveAttribute('href', /29\.8441/);
  await page.screenshot({ path: test.info().outputPath('florida-planning-detail.png'), fullPage: true });
});
