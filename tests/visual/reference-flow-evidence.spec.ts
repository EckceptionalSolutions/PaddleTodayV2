import { expect, test } from '@playwright/test';
import { getRiverBySlug } from '../../src/lib/rivers';
import { scoreRiverCondition } from '../../src/lib/scoring';
import { serializeDetailResult } from '../../src/lib/api-contract';
import type { GaugeReading, WeatherSnapshot } from '../../src/lib/types';
import { installMapLibreHarness } from './maplibre-harness';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

for (const current of [1000, 3750]) {
  test(`Remmel ${current} cfs: hydrated rating keeps its recreational-floating scope`, async ({ page }) => {
    const river = getRiverBySlug('ouachita-river-remmel-whitewater-park')!;
    const now = new Date('2026-07-25T18:00:00Z');
    const gauge: GaugeReading = {
      sourceId: river.gaugeSource.id, observedAt: now.toISOString(), current, unit: 'cfs',
      trend: 'steady', delta24h: 0, changePercent24h: 0, recentSamples: [],
      gaugeHeightNow: null, dischargeNow: current, waterTempF: 68,
      waterTempObservedAt: now.toISOString(), gaugeSource: 'Synthetic verification observation', waterTempSource: 'Synthetic verification observation',
    };
    const weather = { ...fixture.result.weather, observedAt: now.toISOString() } as unknown as WeatherSnapshot;
    const result = scoreRiverCondition({ river, gauge, weather, now });
    expect(result.gaugeBand).toBe(current === 1000 ? 'too-low' : 'ideal');
    await installMapLibreHarness(page);
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route(`**/api/rivers/${river.slug}.json*`, route => route.fulfill({ json: { generatedAt: now.toISOString(), result: serializeDetailResult(result) } }));
    await page.goto(`/rivers/${river.slug}/`);
    await expect(page.locator('[data-field="flow-band"]').first()).toContainText(result.gaugeBandLabel);
    await expect(page.locator('[data-field="gauge-now"]').first()).toContainText(current === 1000 ? '1,000' : '3,750');
    await expect(page.locator('#trip-decisions')).toContainText('This rating follows recreational floating');
    await expect(page.getByRole('heading', { name: 'Match the rating to recreational floating', exact: true })).toBeVisible();
    await expect(page.locator('#trip-decisions')).toContainText('does not verify how long generation will continue');
    await expect(page.locator('#trip-decisions time')).toHaveAttribute('datetime', '2026-10-20');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}
