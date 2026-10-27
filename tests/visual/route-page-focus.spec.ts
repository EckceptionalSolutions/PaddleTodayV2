import { expect, test } from '@playwright/test';
import { getRiverBySlug } from '../../src/lib/rivers';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

const slug = 'little-miami-river-kelley-milford';

test('route keeps its familiar opening and reveals optional tools on demand', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await installMapLibreHarness(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  const now = new Date().toISOString();
  const river = getRiverBySlug(slug)!;
  const payload = {
    generatedAt: now,
    result: {
      ...fixture.result,
      generatedAt: now,
      river: { ...fixture.result.river, ...river },
      score: 20,
      rating: 'No-go',
      readiness: { status: 'verify', reason: 'The gauge is below the published low-water floor.' },
      explanation: 'Skip today. The gauge is below the published low-water floor. Expect walking in the shallows.',
      gaugeBand: 'too-low',
      gaugeBandLabel: 'Below range',
      gauge: { ...fixture.result.gauge, current: 3.8, gaugeHeightNow: 3.8, observedAt: now },
      weather: { ...fixture.result.weather, observedAt: now },
    },
  };
  await page.route(`**/api/rivers/${slug}.json*`, route => route.fulfill({ json: payload }));
  await page.goto(`/rivers/${slug}/`);
  await expect(page.locator('link[rel="stylesheet"][href*="/styles/route-page.css"]')).toHaveAttribute('href', /route-cleanup-20261027/);
  await expect(page.locator('#route-decision-title')).toHaveText('Today at a glance');
  await expect(page.locator('[data-field="decision"]')).toHaveText('Skip today');
  await expect(page.locator('[data-field="decision"]')).toHaveClass(/decision-pill--skip/);
  await expect(page.locator('.route-today-score__why-label')).toHaveCount(0);
  await expect(page.locator('[data-field="decision-line"]')).toBeVisible();
  await expect(page.locator('[data-field="decision-line"]')).toHaveText('The gauge is below the published low-water floor. Expect walking in the shallows.');
  await expect(page.locator('.route-today-score__breakdown')).not.toHaveAttribute('open');
  await expect(page.locator('#todays-score [data-field="observed-at"]')).toHaveCount(1);
  await expect(page.locator('#todays-score [data-field="generated-at"]')).toHaveCount(1);
  await expect(page.locator('#todays-score .route-decision-dashboard__live-meta')).toContainText('Live Data');
  await expect(page.locator('#todays-score')).not.toContainText('Watch closely');
  await expect(page.locator('.route-critical-hazards')).toBeVisible();
  await expect(page.locator('.route-critical-hazards')).toContainText('Boathouse Rapid');
  await expect(page.locator('.route-critical-hazards')).toContainText('Strainers');
  await expect(page.locator('[data-shuttle-instructions]')).toHaveText(river.logistics!.shuttle!);
  await expect(page.locator('[data-shuttle-instructions]')).toBeVisible();
  await expect(page.locator('[data-field="score"]')).toBeVisible();
  await expect(page.locator('[data-field="rating"]')).toHaveText('out of 100');
  await expect(page.locator('[data-trip-launch]')).toBeHidden();
  await expect(page.locator('[data-route-photo-form]')).toBeHidden();
  await expect(page.locator('[data-route-report-form]')).toBeHidden();
  await expect(page.locator('[data-weather-hourly]')).toBeHidden();
  await expect(page.locator('.route-faq')).toHaveCount(0);
  await expect(page.locator('[data-detail-hero-map]')).toHaveCount(1);
  await expect(page.locator('.route-overview-photo')).toBeVisible();
  await expect(page.locator('.route-overview-primary [data-overview-distance]')).toBeVisible();
  await expect(page.locator('#todays-score a[href="#trip-plan"]')).toHaveCount(0);
  await expect(page.locator('.route-overview-explanation')).toHaveCount(0);
  const contextSrc = await page.locator('.route-overview-photo img').getAttribute('src');
  expect(await page.locator('[data-route-gallery] img').evaluateAll(images => images.map(img => img.getAttribute('src')))).not.toContain(contextSrc);
  await expect(page.locator('.route-discovery a[data-analytics-label="nearby"]')).toHaveCount(1);
  await expect(page.locator('.route-overview-source')).not.toHaveClass(/river-link--wide/);
  for (const kind of ['put-in', 'take-out']) {
    const card = page.locator(`.river-access-card--${kind}`);
    const directions = card.getByRole('link', { name: `Directions to ${kind}` });
    await expect(directions).toBeVisible();
    await expect(directions).toHaveClass(/river-link--primary/);
    await expect(card.getByRole('link', { name: 'Open map', exact: true })).toBeVisible();
    await expect(card.getByRole('link', { name: 'Open map', exact: true })).not.toHaveClass(/river-link--primary/);
    await expect(card.locator('[data-copy-coords]')).toBeVisible();
  }
  await expect(page.locator('[data-access-directions-google]')).toHaveClass(/river-link--primary/);
  await expect(page.locator('[data-access-directions-apple]')).toBeVisible();
  await expect(page.locator('[data-access-directions-apple]')).not.toHaveClass(/river-link--primary/);
  await expect(page.locator('[data-access-openstreetmap]')).toBeVisible();
  await expect(page.locator('[data-access-openstreetmap]')).not.toHaveClass(/river-link--primary/);
  await expect(page.locator('.route-access-more')).toHaveCount(0);
  await expect(page.locator('#route-gallery #share-trip')).toHaveCount(1);
  await expect(page.locator('[data-route-gallery-empty-note]')).toBeVisible();
  await expect(page.locator('[data-route-gallery-viewer]')).toBeHidden();
  const nav = page.locator('[data-detail-nav-link]');
  await expect(nav).toHaveCount(5);
  const order = await page.locator('#todays-score, #route-overview, #conditions, #route-gallery, #why-this-call').evaluateAll(elements => elements.map(el => el.id));
  expect(order).toEqual(['todays-score', 'route-overview', 'conditions', 'route-gallery', 'why-this-call']);
  expect(await page.locator('script[type="application/ld+json"]').allTextContents()).not.toContainEqual(expect.stringContaining('FAQPage'));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.screenshot({ path: `output/route-simplification/${testInfo.project.name}-today.png`, fullPage: true });

  // Scheduling stays at access and shuttle, with its native keyboard control.
  const plan = page.locator('#trip-plan > summary');
  await plan.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#trip-plan')).toHaveAttribute('open', '');
  await expect(plan).toBeFocused();
  await expect(page.locator('[data-trip-launch]')).toBeVisible();
  await expect(page.locator('[data-trip-save-plan]')).toBeVisible();

  const add = page.locator('#share-trip > summary');
  await add.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-route-photo-form]')).toBeVisible();
  await page.locator('[data-route-photo-name]').fill('Local paddler');
  await page.locator('[data-route-contribute-tab="report"]').click();
  await expect(page.locator('[data-route-report-form]')).toBeVisible();
  await add.click();
  await expect(page.locator('[data-route-report-form]')).toBeHidden();
  await add.click();
  await page.locator('[data-route-contribute-tab="photo"]').click();
  await expect(page.locator('[data-route-photo-name]')).toHaveValue('Local paddler');

  await page.locator('.route-weather-details > summary').click();
  await expect(page.locator('[data-weather-hourly]')).toBeVisible();
  await page.locator('[data-detail-nav-link="sources"]').click();
  await page.getByText('Check the source links', { exact: true }).click();
  await expect(page.locator('#why-this-call .source-list')).toBeVisible();
  expect(errors).toEqual([]);
});

test('shared plan links reveal scheduling immediately', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.goto(`/rivers/${slug}/?start=2026-11-01T09%3A00&end=2026-11-01T12%3A00&timeZone=America%2FNew_York#trip-plan`);
  await expect(page.locator('[data-trip-launch]')).toBeVisible();
  await expect(page.locator('[data-trip-launch]')).toHaveValue('2026-11-01T09:00');
});

test('critical hazards and optional controls work without JavaScript', async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  const page = await context.newPage();
  await page.goto(`${testInfo.project.use.baseURL || 'http://127.0.0.1:4323'}/rivers/${slug}/`);
  await expect(page.locator('.route-critical-hazards')).toBeVisible();
  await expect(page.locator('[data-trip-launch]')).toBeHidden();
  await page.locator('#trip-plan > summary').click();
  await expect(page.locator('[data-trip-launch]')).toBeVisible();
  await expect(page.locator('[data-route-photo-form]')).toBeHidden();
  await page.locator('#share-trip > summary').click();
  await expect(page.locator('[data-route-photo-form]')).toBeVisible();
  await context.close();
});
