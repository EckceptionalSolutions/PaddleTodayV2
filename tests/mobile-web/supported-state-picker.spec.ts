import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('a compact directory chooser searches postal aliases and keeps state selection on close', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  const states = ['Arkansas', 'Colorado', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Michigan', 'Minnesota', 'Missouri', 'Nebraska', 'North Carolina', 'North Dakota', 'Ohio', 'Pennsylvania', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Virginia', 'West Virginia', 'Wisconsin'];
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  let requests = 0;
  await page.route('**/api/rivers/summary.json', route => {
    requests++;
    return route.fulfill({ json: { rivers: states.map(state => ({ ...fixture.result, river: {
      ...fixture.result.river, state, name: `${state} River`, riverId: state, slug: state.toLowerCase().replaceAll(' ', '-'),
    } })) } });
  });
  await page.goto('/more');
  const trigger = page.getByRole('button', { name: /^Choose supported state,/ });
  await trigger.scrollIntoViewIfNeeded();
  expect((await trigger.boundingBox())!.height).toBeGreaterThanOrEqual(56);
  await expect(page.getByRole('tablist', { name: 'Supported river states' })).toHaveCount(0);
  await page.screenshot({ path: `tmp/supported-states-after-${page.viewportSize()!.width}.png` });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  const search = dialog.getByRole('textbox', { name: 'Search supported states', exact: true });
  await search.fill('IN');
  await expect(dialog.getByRole('button', { name: /^Use / })).toHaveCount(1);
  await expect(dialog.getByRole('button', { name: 'Use Indiana, 1 river', exact: true })).toBeVisible();
  await search.fill('OR');
  await expect(dialog.getByRole('button', { name: /^Use / })).toHaveCount(0);
  await expect(dialog.getByText(/No supported states match/)).toBeVisible();
  await search.fill('WV');
  const westVirginia = dialog.getByRole('button', { name: 'Use West Virginia, 1 river', exact: true });
  await expect(westVirginia).toBeVisible();
  expect((await westVirginia.boundingBox())!.height).toBeGreaterThanOrEqual(56);
  await expect(dialog.getByRole('button', { name: /^Use / })).toHaveCount(1);
  await westVirginia.click();
  await expect(trigger).toHaveAccessibleName('Choose supported state, West Virginia');
  await expect(page.getByRole('button', { name: 'Browse West Virginia River: 1 route', exact: true })).toBeVisible();
  await trigger.click();
  await expect(search).toHaveValue('');
  await search.fill('no such state');
  await expect(dialog.getByText(/No supported states match/)).toBeVisible();
  await dialog.getByRole('button', { name: 'Clear state search', exact: true }).click();
  await expect(search).toBeFocused();
  await expect(dialog.getByRole('button', { name: /^Use / })).toHaveCount(22);
  await dialog.getByRole('button', { name: 'Close state chooser', exact: true }).click();
  await expect(trigger).toHaveAccessibleName('Choose supported state, West Virginia');
  await expect(trigger).toBeFocused();
  if (page.viewportSize()!.width === 320) await page.setViewportSize({ width: 320, height: 320 });
  await trigger.click();
  const last = dialog.getByRole('button', { name: 'Use Wisconsin, 1 river', exact: true });
  await last.scrollIntoViewIfNeeded();
  await expect(last).toBeInViewport();
  await expect(dialog.getByRole('button', { name: 'Close state chooser', exact: true })).toBeInViewport();
  await page.screenshot({ path: `tmp/supported-state-picker-${page.viewportSize()!.width}.png` });
  await last.click();
  await expect(trigger).toHaveAccessibleName('Choose supported state, Wisconsin');
  expect(requests).toBe(1);
});
