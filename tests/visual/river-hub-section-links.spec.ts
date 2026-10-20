import { expect, test } from '@playwright/test';
import { getRiverGroupById } from '../../src/lib/rivers';
import { serializeRiverGroupResult } from '../../src/lib/api-contract';
import { installMapLibreHarness } from './maplibre-harness';

for (const section of ['woonasquatucket-access-zones', 'choose-your-reach']) {
  test(`section ${section} survives hydration until an explicit trip choice`, async ({ page }) => {
    const riverId = 'woonasquatucket-river-rhode-island';
    const group = getRiverGroupById(riverId)!;
    await installMapLibreHarness(page);
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route(`**/api/river-groups/${riverId}.json*`, route => route.fulfill({
      json: { generatedAt: new Date().toISOString(), result: serializeRiverGroupResult({ riverId, routes: [], planningRoutes: group.routes }) },
    }));
    await page.goto(`/rivers/by-river/${riverId}/#${section}`);
    await expect(page.locator('[data-river-group-page]')).toHaveAttribute('data-group-loaded', 'true');
    await expect(page).toHaveURL(new RegExp(`#${section}$`));
    const slug = 'woonasquatucket-river-georgiaville-esmond';
    await page.locator(`[data-group-route-card][data-route-slug="${slug}"] [data-group-route-select]`).click();
    await expect(page).toHaveURL(new RegExp(`#trip-${slug}$`));
    await expect(page.locator(`[data-group-route-card][data-route-slug="${slug}"] [data-group-route-select]`)).toHaveAttribute('aria-pressed', 'true');
  });
}
