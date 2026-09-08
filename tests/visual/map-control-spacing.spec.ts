import { expect, test } from '@playwright/test';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };
import { holdMapBackgroundTiles } from './map-background-fixture';

for (const path of ['/', '/weekend/']) for (const diagonal of ['northeast', 'northwest']) {
  test(`${path} initial markers stay clear of controls for ${diagonal} routes`, async ({ page }) => {
    const release = await holdMapBackgroundTiles(page);
    release();
    const rivers = [0, 1].map(index => ({ ...structuredClone(fixture.result), score: 74, rating: 'Good',
      readiness: { status: 'ready' }, liveData: { ...fixture.result.liveData, overall: 'live' },
      river: { ...structuredClone(fixture.result.river), slug: `spacing-fixture-${index}`, riverId: `spacing-${index}`,
        conditionZoneId: `spacing-${index}`, name: `Spacing River ${index}` },
    }));
    await page.addInitScript(() => {
      localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now()));
      let library: any;
      Object.defineProperty(window, 'maplibregl', { configurable: true, get: () => library, set: value => {
        library = value;
        library.Map = new Proxy(value.Map, { construct(target, args) {
          const map = Reflect.construct(target, args);
          (window as any).spacingMap = map;
          return map;
        } });
      } });
    });
    await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers } }));
    await page.route('**/api/weekend/summary.json*', route => route.fulfill({ json: {
      label: 'This weekend', generatedAt: new Date().toISOString(), riverCount: rivers.length, withheldCount: 0,
      rivers: rivers.map(item => ({ river: item.river, current: { score: item.score, rating: 'Good' },
        weekend: { score: item.score, rating: 'Good', confidence: 'High', label: 'This weekend',
          summary: 'Synthetic map fixture.', explanation: 'Synthetic map fixture.', signalLine: '' } })),
    } }));
    const openMap = async () => {
      const view = page.locator('[data-summary-map-mobile-view="map"]');
      if (await view.isVisible()) await view.click();
      await page.locator('[data-summary-map]').scrollIntoViewIfNeeded();
      await expect(page.locator('[data-summary-map-status]')).toHaveAttribute('data-map-state', 'ready');
      await expect.poll(() => page.evaluate(() => (window as any).spacingMap?.loaded())).toBe(true);
    };
    await page.goto(path);
    await openMap();
    const corners = await page.evaluate(diagonal => {
      const map = (window as any).spacingMap;
      const { clientWidth: width, clientHeight: height } = map.getContainer();
      const points = diagonal === 'northeast' ? [[width - 24, 24], [24, height - 24]] : [[24, 24], [width - 24, height - 24]];
      return points.map(point => map.unproject(point).toArray());
    }, diagonal);
    rivers.forEach((item, index) => {
      const [longitude, latitude] = corners[index];
      item.score = 75;
      Object.assign(item.river, { longitude, latitude });
      Object.assign(item.river.putIn, { longitude: longitude - 0.001, latitude: latitude + 0.001 });
      Object.assign(item.river.takeOut, { longitude: longitude + 0.001, latitude: latitude - 0.001 });
    });
    await page.evaluate(() => {
      for (const key of Object.keys(localStorage)) if (key.startsWith('paddletoday:api-cache:')) localStorage.removeItem(key);
    });
    await page.reload();
    await openMap();
    const map = page.locator('[data-summary-map]');
    await expect(map.locator('button.score-map-marker')).toHaveText(['75', '75']);
    await expect.poll(() => map.evaluate(node => {
      const controls = [...node.querySelectorAll('.maplibregl-ctrl')].map(element => element.getBoundingClientRect());
      return [...node.querySelectorAll('button.score-map-marker')].every(marker => {
        const rect = marker.getBoundingClientRect();
        return controls.every(control => rect.right <= control.left || rect.left >= control.right
          || rect.bottom <= control.top || rect.top >= control.bottom);
      });
    })).toBe(true);
  });
}

for (const diagonal of ['northeast', 'northwest']) {
test(`saved route markers remain clear of map controls after fitting ${diagonal} routes`, async ({ page }) => {
  const release = await holdMapBackgroundTiles(page);
  release();
  const rivers = [0, 1].map(index => ({ ...structuredClone(fixture.result),
    river: { ...structuredClone(fixture.result.river), slug: `spacing-fixture-${index}` },
  }));
  await page.addInitScript(slugs => {
    localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now()));
    localStorage.setItem('paddletoday:favorites:v1', JSON.stringify({ version: 1, items:
      slugs.map(slug => ({ slug, name: 'Synthetic route', reach: 'Control spacing', savedAt: Date.now(), notes: '' })),
    }));
    let library: any;
    Object.defineProperty(window, 'maplibregl', { configurable: true, get: () => library, set: value => {
      library = value;
      library.Map = new Proxy(value.Map, { construct(target, args) {
        const map = Reflect.construct(target, args);
        (window as any).spacingMap = map;
        return map;
      } });
    } });
  }, rivers.map(item => item.river.slug));
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers } }));
  await page.goto('/favorites/');
  const map = page.locator('[data-favorites-map]');
  await expect(page.locator('[data-favorites-map-status]')).toHaveAttribute('data-map-state', 'ready');
  await expect.poll(() => page.evaluate(() => (window as any).spacingMap.loaded())).toBe(true);
  const corners = await page.evaluate(diagonal => {
    const map = (window as any).spacingMap;
    const { clientWidth: width, clientHeight: height } = map.getContainer();
    const points = diagonal === 'northeast' ? [[width - 24, 24], [24, height - 24]] : [[24, 24], [width - 24, height - 24]];
    return points.map(point => map.unproject(point).toArray());
  }, diagonal);
  rivers.forEach((item, index) => {
    item.river.longitude = corners[index][0];
    item.river.latitude = corners[index][1];
  });
  await page.locator('[data-favorites-refresh]').click();
  await expect(page.locator('[data-favorites-refresh]')).toHaveText('Refresh calls');
  await page.waitForTimeout(800);
  await map.scrollIntoViewIfNeeded();
  await expect.poll(() => map.evaluate(node => {
    const controls = [...node.querySelectorAll('.maplibregl-ctrl')].map(element => element.getBoundingClientRect());
    return [...node.querySelectorAll('.score-map-marker')].every(marker => {
      const rect = marker.getBoundingClientRect();
      return controls.every(control => rect.right <= control.left || rect.left >= control.right
        || rect.bottom <= control.top || rect.top >= control.bottom);
    });
  })).toBe(true);
  await map.screenshot({ path: test.info().outputPath('saved-marker-control-spacing.png') });
});

}
