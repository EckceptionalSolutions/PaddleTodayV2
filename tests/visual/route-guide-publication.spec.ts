import { expect, test } from '@playwright/test';
import { routeGuidePublicationReviews } from '../../src/data/route-guide-publication-reviews';
import { listRiverGroups } from '../../src/lib/rivers';
import { serializeRiverGroupResult } from '../../src/lib/api-contract';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

for (const review of routeGuidePublicationReviews) {
  test(`${review.riverId}: trip notes and optional guides remain available through the modal`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await installMapLibreHarness(page);
    const group = listRiverGroups().find(group => group.riverId === review.riverId)!;
    const result = review.mode === 'access-planning'
      ? serializeRiverGroupResult({ riverId: group.riverId, routes: [], planningRoutes: group.routes })
      : { group: { ...group, routes: undefined }, routes: group.routes.map(river => ({
          ...fixture.result, river: { ...fixture.result.river, ...river,
            distanceLabel: river.logistics?.distanceLabel, estimatedPaddleTime: river.logistics?.estimatedPaddleTime },
        })) };
    await page.route(`**/api/river-groups/${group.riverId}.json*`, route => route.fulfill({ json: { result } }));
    const slug = review.hubOptions[0] || review.retainedGuides[0];
    if (review.hubOptions.length) {
      await page.route(`https://paddletoday.com/rivers/by-river/${group.riverId}/`, route => route.fulfill({
        status: 302, headers: { location: `${new URL(test.info().project.use.baseURL!).origin}/rivers/by-river/${group.riverId}/#trip-${slug}` },
      }));
      await page.goto(`/rivers/${slug}/`);
    } else await page.goto(`/rivers/by-river/${group.riverId}/#trip-${slug}`);
    await expect(page).toHaveURL(new RegExp(`/by-river/${group.riverId}/#trip-${slug}$`));
    await expect(page.locator('[data-river-group-page]')).toHaveAttribute('data-group-loaded', 'true');
    await expect(page.locator('[data-group-route-card]')).toHaveCount(group.routes.length);
    await expect(page.locator('[data-group-route-list] details')).toHaveCount(0);
    const dialog = page.getByRole('dialog');
    await expect(dialog).not.toBeVisible();
    for (const selected of new Set([slug, review.hubOptions.at(-1), ...review.retainedGuides].filter(Boolean))) {
      const river = group.routes.find(r => r.slug === selected)!;
      await page.locator(`[data-route-slug="${selected}"] [data-trip-details]`).click();
      await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(river.reach);
      await expect(dialog).toContainText(river.logistics!.shuttle);
      await expect(dialog).toContainText(river.gaugeSource.siteName);
      for (const note of [...river.safetyProfile?.safetyNotes ?? [], ...river.logistics?.accessCaveats ?? []]) {
        await expect(dialog).toContainText(note);
      }
      if (river.scoreEligibility === 'planning') await expect(dialog).toContainText('No live score');
      const guide = dialog.getByRole('link', { name: 'Open full trip guide' });
      if (review.retainedGuides.includes(selected!)) await expect(guide).toHaveAttribute('href', `/rivers/${selected}/`);
      else await expect(guide).toHaveCount(0);
      await expect(dialog.locator('[data-modal-sources]')).not.toHaveAttribute('open', '');
      if (review.riverId === 'allagash-river') await expect(dialog).toContainText('Route line and GPX withheld');
      await dialog.getByRole('button', { name: 'Close trip details' }).click();
    }
    if (review.mode === 'access-planning') {
      for (const decision of review.guide.decisions) await expect(page.locator('[data-access-planning-context]')).toContainText(decision.text);
      await expect(page.locator('[data-group-sort], [data-group-refresh], .route-choice__score-compact')).toHaveCount(0);
    }
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
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
  await page.locator(`[data-route-slug="${slug}"] [data-trip-details]`).click();
  await expect(page.getByRole('dialog').getByRole('heading', { level: 2 })).toHaveText(group.routes.find(route => route.slug === slug)!.reach);
  await expect(page.getByRole('dialog')).toContainText('ice-affected');
  await page.keyboard.press('Escape');
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
  await page.locator('[data-group-route-card] [data-trip-details]').first().click();
  await expect(page.getByRole('dialog')).toContainText('Stage the take-out vehicle');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-access-planning-context]')).toContainText('cold water');
  await expect(page.locator('[data-group-refresh], .route-choice__score-compact')).toHaveCount(0);
});
