import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Explore drawer follows reduced motion changes without reloading', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{
    ...fixture.result,
    river: { ...fixture.result.river, difficulty: 'easy' },
    summary: { gaugeNow: 'QA', shortExplanation: 'QA fixture' },
    liveData: { overall: 'stale', summary: 'Check current conditions.' },
  }] } }));
  await page.goto('/explore?intent=no-call');
  await page.getByRole('button', { name: /^Rice Creek,.*Call unavailable/ }).press('Enter');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const expand = page.getByRole('button', { name: 'Expand route drawer', exact: true }).first();
  const firstHeight = await expand.evaluate(async element => {
    const sheet = element.closest('[style*="height:"]')!;
    (element as HTMLElement).click();
    await new Promise(resolve => requestAnimationFrame(resolve));
    return sheet.getBoundingClientRect().height;
  });
  expect(firstHeight).toBeCloseTo(430, 0);
  const collapse = page.getByRole('button', { name: 'Collapse route drawer', exact: true }).first();
  const collapsedHeight = await collapse.evaluate(async element => {
    const sheet = element.closest('[style*="height:"]')!;
    (element as HTMLElement).click();
    await new Promise(resolve => requestAnimationFrame(resolve));
    return sheet.getBoundingClientRect().height;
  });
  expect(collapsedHeight).toBeCloseTo(304, 0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const animatedHeight = await expand.evaluate(async element => {
    const sheet = element.closest('[style*="height:"]')!;
    (element as HTMLElement).click();
    await new Promise(resolve => requestAnimationFrame(resolve));
    return sheet.getBoundingClientRect().height;
  });
  expect(animatedHeight).toBeLessThan(430);
  await expect.poll(() => collapse.evaluate(element => element.closest('[style*="height:"]')!.getBoundingClientRect().height)).toBeCloseTo(430, 0);
});
