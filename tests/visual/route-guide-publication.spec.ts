import { expect, test } from '@playwright/test';
import { routeGuidePublicationReviews } from '../../src/data/route-guide-publication-reviews';
import { listRiverGroups } from '../../src/lib/rivers';
import { serializeRiverGroupResult } from '../../src/lib/api-contract';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };
import { sharedAccessPlanNotes, specificAccessPlanNotes } from '../../src/lib/access-plan-presentation';

for (const review of routeGuidePublicationReviews) {
  test(`${review.riverId}: retired URL preserves selected trip and notes after hydration`, async ({ page }) => {
    const pageErrors: string[] = [];
    await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
    page.on('pageerror', error => { pageErrors.push(error.message); console.error('Pilot browser error:', error.message); });
    await installMapLibreHarness(page);
    const group = listRiverGroups().find(group => group.riverId === review.riverId)!;
    const result = review.mode === 'access-planning'
      ? serializeRiverGroupResult({ riverId: group.riverId, routes: [], planningRoutes: group.routes })
      : {
          group: { ...group, routes: undefined },
          routes: group.routes.map(route => ({
            ...fixture.result,
            river: { ...fixture.result.river, ...route, distanceLabel: route.logistics?.distanceLabel, estimatedPaddleTime: route.logistics?.estimatedPaddleTime },
          })),
        };
    await page.route(`**/api/river-groups/${group.riverId}.json*`, route => route.fulfill({ json: { generatedAt: new Date().toISOString(), result } }));
    const selectedSlug = review.hubOptions[0];
    // The deployed emitter uses production-origin URLs. Follow its emitted target
    // on this loopback preview so the test never navigates production.
    await page.route(`https://paddletoday.com/rivers/by-river/${group.riverId}/`, route => route.fulfill({
      status: 302, headers: { location: `${new URL(test.info().project.use.baseURL!).origin}/rivers/by-river/${group.riverId}/#trip-${selectedSlug}` },
    }));
    await page.goto(`/rivers/${selectedSlug}/`, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(new RegExp(`/by-river/${group.riverId}/#trip-${selectedSlug}$`));
    await expect(page.locator('[data-river-group-page]')).toHaveAttribute('data-group-loaded', 'true');
    await expect(page.locator('#choose-your-reach')).toBeVisible();
    await expect(page.locator('[data-group-route-card]')).toHaveCount(group.routes.length);
    const selected = page.locator(`[data-group-route-card][data-route-slug="${selectedSlug}"]`);
    await expect(selected).toHaveClass(/route-choice--active/);
    await expect(selected.locator('[data-group-route-select]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-group-route-list] details')).toHaveCount(0);
    if (review.riverId === 'aroostook-river') {
      await page.locator('.river-route-picker').screenshot({ path: `output/picker-layout/${test.info().project.name}-collapsed.png` });
    }
    if (review.mode !== 'access-planning') await selected.locator('[data-group-trip-details]').click();
    else if (await page.locator('[data-group-mobile-view="map"]').isVisible()) await page.locator('[data-group-mobile-view="map"]').click();
    const detailsSection = page.locator('[data-group-selected-notes]');
    const planning = review.mode === 'access-planning';
    const notes = detailsSection.locator(planning ? '.access-plan-facts' : '.route-choice__trip-notes--selected');
    if (!planning) await expect(notes).toHaveAttribute('open', '');
    else await expect(notes).toBeVisible();
    await expect(detailsSection.locator('h3')).toHaveText(group.routes.find(route => route.slug === selectedSlug)!.reach);
    const pickerBox = await page.locator('.river-route-picker__layout').boundingBox();
    const detailsBox = await detailsSection.boundingBox();
    const mapBox = await page.locator('[data-group-map]').boundingBox();
    expect(detailsBox!.width).toBeGreaterThan(pickerBox!.width * 0.9);
    expect(detailsBox!.y).toBeGreaterThanOrEqual(mapBox!.y + mapBox!.height);
    expect(await notes.locator(planning ? ':scope' : '.route-choice__trip-notes-panel').evaluate(element => parseFloat(getComputedStyle(element.querySelector('p')!).fontSize))).toBeGreaterThanOrEqual(14);
    await expect(notes).toContainText(group.routes.find(route => route.slug === selectedSlug)!.logistics!.shuttle);
    const commonNotes = planning ? page.locator('[data-access-planning-context]') : notes;
    await expect(planning ? page.locator('.access-planning-context__guidance') : notes).toContainText(planning ? group.routes.find(route => route.slug === selectedSlug)!.gaugeSource.siteId : group.routes.find(route => route.slug === selectedSlug)!.gaugeSource.siteName);
    const firstSafety = group.routes.find(route => route.slug === selectedSlug)!.safetyProfile!.safetyNotes[0];
    await expect(planning && !sharedAccessPlanNotes(group.routes).safety.includes(firstSafety) ? notes : commonNotes).toContainText(firstSafety);
    if (review.riverId === 'piscataquis-river') await expect(notes).not.toContainText('same-river proxy');
    if (review.mode === 'reach-guides') {
      const route = group.routes.find(route => route.slug === selectedSlug)!;
      await expect(notes).toContainText(`Published planning floor: ${route.profile.idealMin ?? route.profile.tooLow} ${route.gaugeSource.unit}`);
    }
    await expect(notes.locator('.route-choice__sources')).not.toHaveAttribute('open', '');
    if (review.riverId === 'aroostook-river') {
      await detailsSection.screenshot({ path: `output/picker-layout/${test.info().project.name}-expanded.png` });
      if (test.info().project.name === 'desktop-chromium') {
        await page.setViewportSize({ width: 900, height: 900 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
        const narrowPicker = await page.locator('.river-route-picker__layout').boundingBox();
        const narrowDetails = await detailsSection.boundingBox();
        expect(narrowDetails!.width).toBeGreaterThan(narrowPicker!.width * 0.9);
        await detailsSection.screenshot({ path: 'output/picker-layout/tablet-expanded.png' });
        await page.setViewportSize({ width: 1280, height: 800 });
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    for (const slug of review.retainedGuides) {
      // Access-planning cards select a plan. Independent guides are linked from
      // editorial guidance and may also appear in existing section navigation.
      const guideLinks = planning
        ? page.locator(`main a[href="/rivers/${slug}/"]`)
        : page.locator(`[data-group-route-card][data-route-slug="${slug}"] a[href="/rivers/${slug}/"]`);
      if (planning) await expect(guideLinks.first()).toBeVisible();
      else await expect(guideLinks).toHaveCount(1);
    }
    if (review.mode === 'access-planning') {
      if (group.routes.length === 1) {
        await expect(page.locator('[data-group-results-summary]')).toContainText('1 access plan ·');
        await expect(page.locator('.river-group-page__hero-facts')).not.toContainText('14–14');
      }
      for (const decision of review.guide.decisions) await expect(commonNotes).toContainText(decision.text);
      if (review.riverId === 'bitterroot-river-montana') {
        const sharedGuidance = commonNotes.locator('.access-planning-context__notes');
        await sharedGuidance.locator('summary').click();
        await expect(sharedGuidance).toContainText('no year or reopening date');
        await expect(sharedGuidance).toContainText('neither total establishes a validated valley-wide trip');
      }
      await expect(page.getByRole('heading', { name: 'Explore access plans', exact: true })).toBeVisible();
      await expect(page.locator('[data-group-sort], [data-group-refresh], .river-route-picker__toolbar, .route-choice__score-compact, .river-route-picker__selected-decision, .river-route-picker__nearby')).toHaveCount(0);
      await expect(page.locator('.river-hub-map-legend')).not.toContainText('Strong conditions');
      const firstHazard = group.routes[0].logistics!.watchFor![0];
      await expect(sharedAccessPlanNotes(group.routes).hazards.includes(firstHazard) ? page.locator('.access-planning-context__cautions') : notes).toContainText(firstHazard);
    }
    const secondSlug = review.hubOptions.at(-1)!;
    const listSwitch = page.locator('[data-group-mobile-view="list"]');
    if (await listSwitch.isVisible()) await listSwitch.click();
    await page.locator(`[data-group-route-card][data-route-slug="${secondSlug}"] [data-group-route-select]`).click();
    expect(pageErrors).toEqual([]);
    await expect(page).toHaveURL(new RegExp(`#trip-${secondSlug}$`));
    await expect(detailsSection.locator('h3')).toHaveText(group.routes.find(route => route.slug === secondSlug)!.reach);
    await expect(notes).toContainText(group.routes.find(route => route.slug === secondSlug)!.logistics!.shuttle);
    if (planning) {
      const route = group.routes.find(route => route.slug === secondSlug)!;
      const unique = specificAccessPlanNotes(route, sharedAccessPlanNotes(group.routes));
      for (const warning of [...unique.hazards, ...unique.safety, ...unique.access]) await expect(notes).toContainText(warning);
      for (const warning of sharedAccessPlanNotes(group.routes).hazards) await expect(notes).not.toContainText(warning);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.locator('#choose-your-reach').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `output/seo-structure-2026-10-19/${group.riverId}-${test.info().project.name}.png` });
  });
}

for (const review of routeGuidePublicationReviews) for (const notice of review.underReview ?? []) {
  test(`${notice.slug}: old path opens its review explanation without becoming a trip`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
    await installMapLibreHarness(page);
    const group = listRiverGroups().find(g => g.riverId === review.riverId)!;
    await page.route(`**/api/river-groups/${group.riverId}.json*`, route => route.fulfill({ json: { result: serializeRiverGroupResult({ riverId: group.riverId, routes: [], planningRoutes: group.routes }) } }));
    await page.route(`https://paddletoday.com/rivers/by-river/${group.riverId}/`, route => route.fulfill({ status:302,headers:{location:`${new URL(test.info().project.use.baseURL!).origin}/rivers/by-river/${group.riverId}/#review-${notice.slug}`} }));
    await page.goto(`/rivers/${notice.slug}/`);
    await expect(page.locator('[data-river-group-page]')).toHaveAttribute('data-group-loaded','true');
    await expect(page).toHaveURL(new RegExp(`#review-${notice.slug}$`));
    await expect(page.locator(`#review-${notice.slug}`)).toContainText(notice.explanation);
    await expect(page.locator(`[data-group-route-card][data-route-slug="${notice.slug}"]`)).toHaveCount(0);
    await expect(page.locator('[data-group-route-card]')).toHaveCount(group.routes.length);
    expect((await page.request.get(`/api/rivers/${notice.slug}.json`)).status()).toBe(404);
  });
}

test('access plans ignore retired filters and do not poll conditions', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
  await page.clock.install();
  await installMapLibreHarness(page);
  const group = listRiverGroups().find(group => group.riverId === 'aroostook-river')!;
  let requests = 0;
  await page.route(`**/api/river-groups/${group.riverId}.json*`, route => {
    requests += 1;
    return route.fulfill({ json: { result: serializeRiverGroupResult({ riverId: group.riverId, routes: [], planningRoutes: group.routes }) } });
  });
  const slug = 'aroostook-river-washburn-fort-fairfield';
  await page.goto(`/rivers/by-river/${group.riverId}/?distance=short&sort=confidence&difficulty=easy#trip-${slug}`);
  await expect(page.locator('[data-river-group-page]')).toHaveAttribute('data-group-loaded', 'true');
  await expect(page.locator('[data-group-route-card]')).toHaveCount(group.routes.length);
  await expect(page.locator('[data-group-selected-notes] h3')).toHaveText(group.routes.find(route => route.slug === slug)!.reach);
  await expect(page.locator('[data-group-selected-notes]')).toContainText('ice-affected');
  expect(new URL(page.url()).searchParams.has('distance')).toBe(false);
  expect(new URL(page.url()).searchParams.has('sort')).toBe(false);
  await page.clock.fastForward(5 * 60 * 1000 + 1000);
  expect(requests).toBe(1);
});

test('access details remain readable when the interactive plan request fails', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
  await installMapLibreHarness(page);
  await page.route('**/api/river-groups/aroostook-river.json*', route => route.fulfill({ status: 503, json: { error: 'Unavailable' } }));
  await page.goto('/rivers/by-river/aroostook-river/');
  await expect(page.locator('[data-group-results-summary]')).toContainText('Interactive access map unavailable');
  const fallback = page.locator('[data-group-route-card]').first().locator('details').first();
  await fallback.locator('summary').first().click();
  await expect(fallback.locator('.access-plan-facts')).toBeVisible();
  await expect(fallback).toContainText('Stage the take-out vehicle');
  await expect(page.locator('[data-access-planning-context]')).toContainText('cold water');
  await expect(page.locator('[data-group-refresh], .route-choice__score-compact')).toHaveCount(0);
});
