import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const routeCount of [1, 2]) {
  test(`collapsed drawer keeps its summary and ${routeCount}-route actions above navigation`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    const reason = 'Coverage is limited. Check current sources and access conditions before planning this paddle.';
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: Array.from({ length: routeCount }, (_, index) => ({ ...fixture.result,
      river: { ...fixture.result.river, slug: `qa-route-${index}`, difficulty: 'easy' },
      readiness: { status: 'withheld', label: 'Withheld', reason },
      summary: { gaugeNow: 'QA', shortExplanation: reason }, liveData: { overall: 'stale', summary: 'QA' },
    })) } }));
    await page.goto('/explore?intent=no-call');
    await page.getByRole('button', { name: /^Rice Creek,.*Call unavailable/ }).first().press('Enter');
    const summary = page.getByText(reason, { exact: true });
    await expect(summary).toBeVisible();
    const tabs = page.getByRole('tablist').filter({ has: page.getByRole('tab', { name: 'Today', exact: true }) });
    expect((await summary.boundingBox())!.y + (await summary.boundingBox())!.height).toBeLessThanOrEqual((await tabs.boundingBox())!.y);
    if (routeCount === 2) await expect(page.getByRole('button', { name: 'Compare 2 Rice Creek routes', exact: true })).toBeInViewport({ ratio: 1 });
    for (const name of ['Close route drawer', 'Save route']) {
      const box = (await page.getByRole('button', { name, exact: true }).boundingBox())!;
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
    await page.screenshot({ path: `tmp/explore-drawer-${routeCount}-routes-${page.viewportSize()!.width}.png` });
  });
}

test('Explore drawer keeps actions and expanded facts reachable on a short screen', async ({ page }) => {
  await page.setViewportSize({ width: page.viewportSize()!.width, height: 320 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{ ...fixture.result,
    river: { ...fixture.result.river, difficulty: 'easy' },
    summary: { gaugeNow: 'QA', shortExplanation: 'QA fixture' }, liveData: { overall: 'stale', summary: 'QA' },
  }] } }));
  await page.goto('/explore?intent=no-call');
  await page.getByRole('button', { name: /^Rice Creek,.*Call unavailable/ }).press('Enter');
  await page.screenshot({ path: `tmp/explore-short-${page.viewportSize()!.width}.png` });
  const open = page.getByRole('button', { name: /^Open route: Rice Creek/ });
  await expect(open).toBeInViewport({ ratio: 1 });
  const tabs = page.getByRole('tablist').filter({ has: page.getByRole('tab', { name: 'Today', exact: true }) });
  expect((await open.boundingBox())!.y + (await open.boundingBox())!.height).toBeLessThanOrEqual((await tabs.boundingBox())!.y);
  await page.getByRole('button', { name: 'Expand route drawer', exact: true }).last().click();
  const difficulty = page.getByText('Difficulty', { exact: true });
  await difficulty.scrollIntoViewIfNeeded();
  await expect(difficulty).toBeInViewport({ ratio: 1 });
  expect((await difficulty.boundingBox())!.y + (await difficulty.boundingBox())!.height).toBeLessThanOrEqual((await tabs.boundingBox())!.y);
  const value = page.getByText('Easy', { exact: true });
  await value.scrollIntoViewIfNeeded();
  expect((await value.boundingBox())!.y + (await value.boundingBox())!.height).toBeLessThanOrEqual((await tabs.boundingBox())!.y);
  await page.screenshot({ path: `tmp/explore-short-expanded-${page.viewportSize()!.width}.png` });
  await page.getByRole('button', { name: 'Close route drawer', exact: true }).click();
  await expect(open).toBeHidden();
});
