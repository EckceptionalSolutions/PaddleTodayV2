import { expect, test } from '@playwright/test';
import { routeGuidePublicationReviews } from '../../src/data/route-guide-publication-reviews';
import { listRiverGroups } from '../../src/lib/rivers';
import { serializeRiverGroupResult } from '../../src/lib/api-contract';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

for (const review of routeGuidePublicationReviews) {
  test(`${review.riverId}: retired URL preserves selected trip and notes after hydration`, async ({ page }) => {
    const pageErrors: string[] = [];
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
    const notes = selected.locator('details');
    await notes.locator('summary').click();
    await expect(notes).toContainText(group.routes.find(route => route.slug === selectedSlug)!.logistics!.shuttle);
    await expect(notes).toContainText(group.routes.find(route => route.slug === selectedSlug)!.gaugeSource.siteName);
    await expect(notes).toContainText(group.routes.find(route => route.slug === selectedSlug)!.safetyProfile!.safetyNotes[0]);
    if (review.riverId === 'piscataquis-river') await expect(notes).not.toContainText('same-river proxy');
    if (review.mode === 'reach-guides') {
      const route = group.routes.find(route => route.slug === selectedSlug)!;
      await expect(notes).toContainText(`Published planning floor: ${route.profile.idealMin ?? route.profile.tooLow} ${route.gaugeSource.unit}`);
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
    await page.locator(`[data-group-route-card][data-route-slug="${secondSlug}"] [data-group-route-select]`).click();
    expect(pageErrors).toEqual([]);
    await expect(page).toHaveURL(new RegExp(`#trip-${secondSlug}$`));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.locator('#choose-your-reach').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `output/seo-structure-2026-10-19/${group.riverId}-${test.info().project.name}.png` });
  });
}
