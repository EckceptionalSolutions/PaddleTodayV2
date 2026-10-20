import { expect, test } from '@playwright/test';
import { getRiverBySlug } from '../../src/lib/rivers';
import { serializePlanningRoute } from '../../src/lib/api-contract';
import { installMapLibreHarness } from './maplibre-harness';

for (const slug of ['saco-river-route-160-brownfield', 'saco-river-saco-biddeford', 'kennebec-river-sidney-augusta', 'verde-river-beasley-flat-childs', 'baltimore-blueway-canton', 'baltimore-blueway-inner-harbor-heritage', 'woonasquatucket-river-georgiaville-cricket', 'delaware-river-belvidere-phillipsburg', 'delaware-river-bulls-island-lambertville', 'delaware-river-lambertville-firemens-eddy', 'delaware-river-firemens-eddy-trenton']) {
  test(`${slug}: planning evidence stays available after API hydration`, async ({ page }) => {
    const river = getRiverBySlug(slug)!;
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await installMapLibreHarness(page);
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route(`**/api/rivers/${slug}.json*`, route => route.fulfill({
      json: { generatedAt: new Date().toISOString(), result: serializePlanningRoute(river) },
    }));
    await page.goto(`/rivers/${slug}/`);
    await expect(page.locator('[data-field="planning-weather-summary"]')).toContainText('Check the local forecast');
    await expect(page.locator('.route-calibration-callout')).toHaveCount(0);
    await expect(page.locator('[data-confidence-explainer]')).toHaveCount(0);
    await expect(page.locator('#why-this-call')).toHaveCount(0);
    await expect(page.locator('[data-detail-status-banner]')).toHaveCount(0);
    const sources = page.locator('#planning-sources');
    await expect(sources).toBeVisible();
    await page.locator('[data-detail-nav-link="sources"]').click();
    await expect(page).toHaveURL(/#planning-sources$/);
    await sources.getByText('What to know before you go', { exact: true }).click();
    await expect(sources.locator('.factor-list')).toBeVisible();
    await sources.getByText('Check the source links', { exact: true }).click();
    await expect(sources.locator('.source-list')).toBeVisible();
    await expect(sources.locator('.source-list a')).toHaveCount(river.sourceLinks.length);
    await expect(sources).not.toContainText('Known low-water floor');
    if (slug.startsWith('baltimore-blueway-')) {
      await expect(sources).toContainText('One-way distance and return plan');
      await expect(sources).toContainText('four-foot gangway');
      await expect(sources.locator('.source-list a[href="https://cantonkayakclub.com/fells-point/"]')).toHaveCount(1);
      await page.getByRole('link', { name: 'Open access map', exact: true }).click();
      await expect(page.locator('[data-detail-map-line-key]')).toContainText('Generalized shoreline planning line');
    }
    if (slug.startsWith('woonasquatucket-')) {
      await expect(sources).toContainText('75 and 200 cfs observations; no calibrated cutoff');
      await expect(sources).toContainText('separate Manton-to-Atwells');
      await expect(sources.locator('.source-list a[href="https://www.smithfieldri.gov/departments/parks-recreation/parks-facilities-beaches"]')).toHaveCount(1);
    }
    if (slug.startsWith('delaware-river-')) {
      await expect(sources).toContainText('Lower Delaware access context');
      await expect(sources).toContainText('outside Delaware Water Gap');
      await expect(sources).toContainText(river.profile.difficultyNotes!);
      await expect(sources.locator(`.source-list a[href="${river.gaugeSource.detailUrl}"]`)).toHaveCount(1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('Woonasquatucket hub preserves three planning choices and explains held access without live requests', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/rivers/by-river/woonasquatucket-river-rhode-island/');
  await expect(page.locator('[data-group-route-card]')).toHaveCount(3);
  await expect(page.getByRole('heading', { name: 'Plan the upper Woonasquatucket before choosing a launch', exact: true })).toBeVisible();
  await expect(page.locator('#woonasquatucket-access-zones')).toContainText('currently withheld');
  await expect(page.getByRole('heading', { name: 'Match the observation to its section', exact: true })).toBeVisible();
  await expect(page.locator('[data-group-sort]')).toHaveCount(0);
  await expect(page.locator('[data-group-route-card][data-route-slug="woonasquatucket-river-whipple-cricket"]')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('Recommended today');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('planning sources remain usable when live requests fail', async ({ page }) => {
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/rivers/kennebec-river-augusta-hallowell/');
  await page.locator('[data-detail-nav-link="sources"]').click();
  await expect(page).toHaveURL(/#planning-sources$/);
  const sources = page.locator('#planning-sources');
  await sources.getByText('Check the source links', { exact: true }).click();
  await expect(sources.locator('.source-list')).toBeVisible();
  await expect(sources.locator('.source-list a').first()).toHaveAttribute('href', /^https:\/\//);
  await expect(page.locator('.route-calibration-callout')).toHaveCount(0);
});

for (const slug of ['hatchet-creek-highway-280-highway-231']) {
  test(`${slug}: scored minimum-only guidance retains its supported floor`, async ({ page }) => {
    const river = getRiverBySlug(slug)!;
    const floor = river.profile.tooLow ?? river.profile.idealMin;
    await installMapLibreHarness(page);
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.goto(`/rivers/${slug}/`);
    await expect(page.locator('#planning-sources')).toHaveCount(0);
    await expect(page.locator('.route-calibration-callout')).toContainText('Only a low-water floor is known.');
    await expect(page.locator('[data-confidence-explainer]')).toHaveCount(1);
    await expect(page.locator('#why-this-call')).toHaveCount(1);
    const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schema.join('\n')).toContain(
      `${floor!.toLocaleString('en-US')} ${river.gaugeSource.unit}`,
    );
  });
}
