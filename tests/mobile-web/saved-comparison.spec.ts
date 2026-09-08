import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const stale of [false, true]) {
  test(`Saved compares routes across rivers with ${stale ? 'stored' : 'current'} calls`, async ({ page }) => {
    await page.setViewportSize({ width: page.viewportSize()!.width, height: 600 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const generatedAt = stale ? '2020-01-01T00:00:00Z' : new Date().toISOString();
    const routes = [1, 2, 3, 4].map(number => ({ ...fixture.result, generatedAt, score: 95, rating: 'Strong',
      readiness: { status: 'ready', label: 'Ready', reason: 'QA fixture' },
      river: { ...fixture.result.river, slug: `saved-compare-${number}`, riverId: `river-${number}`, name: `River ${number}`, reach: 'Park to bridge', difficulty: 'moderate', ...(number === 4 ? { scoreEligibility: 'planning' } : {}),
        putIn: { ...fixture.result.river.putIn, name: `Launch ${number}` } },
      summary: { gaugeNow: 'QA', shortExplanation: 'QA current route' },
      liveData: { overall: 'live', summary: 'QA', gaugeState: 'live', weatherState: 'live' },
    }));
    await page.addInitScript(routes => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:saved-rivers', JSON.stringify(routes.map(route => ({ ...route, savedAt: '2026-09-08T12:00:00Z' }))));
    }, routes.map(route => ({ slug: route.river.slug, name: route.river.name, reach: route.river.reach })));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { generatedAt, rivers: routes } }));
    let detailRequests = 0;
    await page.route('**/api/rivers/saved-compare-1.json', route => {
      detailRequests++;
      return route.fulfill({ json: { ...fixture, generatedAt, result: { ...routes[0], liveData: fixture.result.liveData } } });
    });
    await page.goto('/saved');
    const start = page.getByRole('button', { name: 'Compare saved routes', exact: true });
    await expect(page.getByRole('checkbox', { name: /^Compare route:/ })).toHaveCount(0);
    await start.click();
    const select = (number: number) => page.getByRole('checkbox', { name: `Compare route: River ${number}: Park to bridge`, exact: true });
    await select(1).click();
    await expect(page.getByRole('button', { name: 'Compare 1 selected saved route', exact: true })).toBeDisabled();
    await select(2).press('Space');
    await select(3).click();
    await expect(select(4)).toBeDisabled();
    const compare = page.getByRole('button', { name: 'Compare 3 selected saved routes', exact: true });
    await expect(compare).toBeInViewport({ ratio: 1 });
    const tabs = page.getByRole('tablist').filter({ has: page.getByRole('tab', { name: 'Today', exact: true }) });
    expect((await compare.boundingBox())!.y + (await compare.boundingBox())!.height).toBeLessThanOrEqual((await tabs.boundingBox())!.y);
    await page.screenshot({ path: `tmp/saved-comparison-selection-${stale}-${page.viewportSize()!.width}.png` });
    await compare.click();
    const sheet = page.getByRole('dialog');
    await expect(sheet.getByText('River 1', { exact: true })).toBeVisible();
    await expect(sheet.getByText('River 2', { exact: true })).toBeAttached();
    await expect(sheet.getByText('Moderate', { exact: true })).toHaveCount(3);
    await expect(sheet.getByText(stale ? 'Current score unavailable' : '95', { exact: true })).toHaveCount(3);
    expect(detailRequests).toBe(0);
    await page.screenshot({ path: `tmp/saved-comparison-${stale}-${page.viewportSize()!.width}.png` });
    await sheet.getByRole('button', { name: 'Remove from comparison: River 3: Park to bridge', exact: true }).click();
    await sheet.getByRole('button', { name: 'Close comparison', exact: true }).click();
    const compareTwo = page.getByRole('button', { name: 'Compare 2 selected saved routes', exact: true });
    await expect(compareTwo).toBeEnabled();
    await expect(select(4)).toBeEnabled();
    if (!stale) {
      await select(4).click();
      await page.getByRole('button', { name: 'Compare 3 selected saved routes', exact: true }).click();
      await expect(sheet.getByText('Current score unavailable', { exact: true })).toHaveCount(1);
      await expect(sheet.getByText('95', { exact: true })).toHaveCount(2);
      await sheet.getByRole('button', { name: 'Remove from comparison: River 4: Park to bridge', exact: true }).click();
      await sheet.getByRole('button', { name: 'Close comparison', exact: true }).click();
      await compareTwo.click();
      await sheet.getByRole('button', { name: 'Open compared route: River 1: Park to bridge', exact: true }).click();
      await expect(page).toHaveURL('/river/saved-compare-1');
      await expect(page.getByRole('heading', { name: 'Park to bridge', exact: true })).toBeVisible();
      await page.goBack();
      await expect(compareTwo).toBeEnabled();
      await expect(select(1)).toBeChecked();
    }
    await page.getByRole('button', { name: 'Remove saved route: River 2: Park to bridge', exact: true }).click();
    await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Compare 1 selected saved route', exact: true })).toBeDisabled();
    await page.getByRole('button', { name: 'Cancel comparison', exact: true }).click();
    await expect(start).toBeFocused();
    await expect(page.getByRole('checkbox', { name: /^Compare route:/ })).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}
