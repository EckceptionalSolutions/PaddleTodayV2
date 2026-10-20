import { expect, test } from '@playwright/test';
import { getRiverBySlug } from '../../src/lib/rivers';
import { serializePlanningRoute } from '../../src/lib/api-contract';
import { installMapLibreHarness } from './maplibre-harness';

for(const slug of ['lower-potomac-purse-mallows-bay','nanjemoy-creek-friendship-farm-park']){
  test(`${slug} keeps source limits and a qualified map after hydration`,async({page})=>{
    const river=getRiverBySlug(slug)!;
    await page.addInitScript(()=>localStorage.setItem('paddleTodayAppPromptDismissedAt',String(Date.now())));
    await installMapLibreHarness(page);
    await page.route('**/api/**',route=>route.fulfill({status:503,json:{error:'offline'}}));
    await page.route(`**/api/rivers/${slug}.json*`,route=>route.fulfill({json:{generatedAt:new Date().toISOString(),result:serializePlanningRoute(river)}}));
    await page.goto(`/rivers/${slug}/`);
    await expect(page.locator('main')).toContainText('2014 second edition');
    await expect(page.locator('main')).not.toContainText('High route-shape confidence');
    if(slug.startsWith('lower')){
      await expect(page.locator('main')).toContainText('one-way vehicle shuttle');
      await expect(page.locator('main')).toContainText('half-mile portage');
    }else{
      await expect(page.locator('main')).toContainText('not cumulative');
      await expect(page.locator('main')).toContainText('does not locate a two-mile turnaround');
    }
    const mapToggle=page.locator('[data-detail-map-toggle]');
    await page.locator('[data-detail-map-shell]').scrollIntoViewIfNeeded();
    if(await mapToggle.isVisible() && await mapToggle.getAttribute('aria-expanded')==='false')await mapToggle.click();
    await expect(page.locator('[data-detail-map-status]')).toHaveAttribute('data-map-state','ready');
    const key=page.locator('[data-detail-map-line-key]');
    await expect(key).toContainText(slug.startsWith('nanjemoy')?'no marked turnaround':'not a surveyed navigation track');
    await expect(key).toBeVisible();
  });
}
