import { expect, test } from '@playwright/test';
import { routeGuidePublicationReviews } from '../../src/data/route-guide-publication-reviews';
import { listRiverGroups } from '../../src/lib/rivers';
import { serializeRiverGroupResult } from '../../src/lib/api-contract';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

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
    await expect(page.locator('[data-group-refresh-note]')).toContainText('Last refresh');
    await expect(page.locator('#choose-your-reach')).toBeVisible();
    await expect(page.locator('[data-group-route-card]')).toHaveCount(group.routes.length);
    const selected = page.locator(`[data-group-route-card][data-route-slug="${selectedSlug}"]`);
    await expect(selected).toHaveClass(/route-choice--active/);
    await expect(selected.locator('[data-group-route-select]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-group-route-list] details')).toHaveCount(0);
    if (review.riverId === 'aroostook-river') {
      await page.locator('.river-route-picker').screenshot({ path: `output/picker-layout/${test.info().project.name}-collapsed.png` });
    }
    await selected.locator('[data-group-trip-details]').click();
    const detailsSection = page.locator('[data-group-selected-notes]');
    const notes = detailsSection.locator('.route-choice__trip-notes--selected');
    await expect(notes).toHaveAttribute('open', '');
    await expect(detailsSection.locator('h3')).toHaveText(group.routes.find(route => route.slug === selectedSlug)!.reach);
    const pickerBox = await page.locator('.river-route-picker__layout').boundingBox();
    const detailsBox = await detailsSection.boundingBox();
    const mapBox = await page.locator('[data-group-map]').boundingBox();
    expect(detailsBox!.width).toBeGreaterThan(pickerBox!.width * 0.9);
    expect(detailsBox!.y).toBeGreaterThanOrEqual(mapBox!.y + mapBox!.height);
    expect(await notes.locator('.route-choice__trip-notes-panel').evaluate(element => parseFloat(getComputedStyle(element.querySelector('p')!).fontSize))).toBeGreaterThanOrEqual(14);
    await expect(notes).toContainText(group.routes.find(route => route.slug === selectedSlug)!.logistics!.shuttle);
    await expect(notes).toContainText(group.routes.find(route => route.slug === selectedSlug)!.gaugeSource.siteName);
    await expect(notes).toContainText(group.routes.find(route => route.slug === selectedSlug)!.safetyProfile!.safetyNotes[0]);
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
      await expect(page.locator(`[data-group-route-card][data-route-slug="${slug}"] a[href="/rivers/${slug}/"]`)).toHaveCount(1);
    }
    if (review.mode === 'access-planning') {
      await expect(page.getByRole('heading', { name: 'Compare access plans', exact: true })).toBeVisible();
      await expect(page.locator('#choose-your-reach')).toContainText(/no live paddle score|has a live paddle score/);
      await expect(page.locator('[data-group-sort] option[value="recommended"]')).toHaveText('Default order');
    }
    const secondSlug = review.hubOptions.at(-1)!;
    const listSwitch = page.locator('[data-group-mobile-view="list"]');
    if (await listSwitch.isVisible()) await listSwitch.click();
    await page.locator(`[data-group-route-card][data-route-slug="${secondSlug}"] [data-group-route-select]`).click();
    expect(pageErrors).toEqual([]);
    await expect(page).toHaveURL(new RegExp(`#trip-${secondSlug}$`));
    await expect(detailsSection.locator('h3')).toHaveText(group.routes.find(route => route.slug === secondSlug)!.reach);
    await expect(notes).toContainText(group.routes.find(route => route.slug === secondSlug)!.logistics!.shuttle);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.locator('#choose-your-reach').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `output/seo-structure-2026-10-19/${group.riverId}-${test.info().project.name}.png` });
  });
}
