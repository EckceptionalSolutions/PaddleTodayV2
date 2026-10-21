import { test, expect } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';

for (const slug of ['little-miami-river-kelley-milford', 'saco-river-fryeburg-brownfield']) {
  test(`${slug}: reading order matches the layout and trip facts work with a keyboard`, async ({ page }) => {
    await installMapLibreHarness(page);
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    await page.goto(`/rivers/${slug}/`);
    const sections = ['#quick-facts', '#access-plan', '#route-gallery'];
    const positions = [];
    for (const selector of sections) {
      positions.push(await page.locator(selector).evaluate(el => ({ top: el.getBoundingClientRect().top, order: getComputedStyle(el).order })));
    }
    expect(positions.every(p => p.order === '0')).toBe(true);
    expect(positions[0].top).toBeLessThan(positions[1].top);
    expect(positions[1].top).toBeLessThan(positions[2].top);
    const details = page.locator('#quick-facts details');
    await expect(details).not.toHaveAttribute('open');
    await details.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(details).toHaveAttribute('open', '');
    await expect(details.getByText('On-water distance', { exact: true })).toBeVisible();
    await expect(page.locator('[data-access-putin-directions]')).toHaveAttribute('href', /destination=/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.locator('[data-plan-account]').click();
    await expect(page).toHaveURL(/#trip-plan$/);
    await expect(page.locator('[data-trip-save-plan]')).toBeVisible();
  });
}

for (const riverId of ['cahaba-river-alabama', 'saco-river', 'housatonic-river-massachusetts']) {
  test(`${riverId}: trips come before long guides and all trips have a detail link`, async ({ page }) => {
    await installMapLibreHarness(page);
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    await page.goto(`/rivers/by-river/${riverId}/`);
    await expect(page.locator('[data-app-download-prompt]')).toHaveCount(0);
    await page.getByRole('link', { name: 'Compare trips', exact: true }).click();
    await expect(page).toHaveURL(/#river-trips$/);
    expect(await page.locator('#river-trips').evaluate(el => !!(el.compareDocumentPosition(document.querySelector('#river-hub-context-title')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
    const cards = page.locator('[data-group-route-card]');
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(page.locator('[data-river-group-page]')).toHaveAttribute('data-initial-unavailable', 'true');
    const listBox = await page.locator('[data-group-route-list]').boundingBox();
    const panelBox = await page.locator('#river-trips').boundingBox();
    expect(listBox!.width).toBeGreaterThan(panelBox!.width * .85);
    await expect(page.locator('[data-group-route-card] [data-trip-page-link]')).toHaveCount(await cards.count());
    await expect(page.locator('main')).not.toContainText('do not have separate route pages');
    if (riverId === 'cahaba-river-alabama') {
      await expect(cards.first().locator('.route-choice__fact--time')).toHaveText('About 4–6 hr');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.screenshot({ path: `output/river-reading-${riverId}-${test.info().project.name}.png` });
  });
}
