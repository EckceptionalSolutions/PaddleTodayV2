import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('short access selector keeps long names and dismissal reachable', async ({ page }) => {
  await page.setViewportSize({ width: page.viewportSize()!.width, height: 320 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  const name = 'Baldwin Lake public carry-in beside the regional trail and south parking area';
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: { ...fixture, result: { ...fixture.result,
    river: { ...fixture.result.river, accessPoints: fixture.result.river.accessPoints.map(point => point.id === 'baldwin-lake' ? { ...point, name } : point) },
  } } }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByRole('button', { name: 'Show Access section', exact: true }).first().click();
  const trigger = page.getByRole('button', { name: /^Select Put-in, currently / });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('heading', { name: 'Put-in', exact: true }).click();
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole('button', { name: 'Close Put-in selection', exact: true });
  expect((await close.boundingBox())!.width).toBeGreaterThanOrEqual(44);
  expect((await close.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  const choice = dialog.getByRole('button', { name: `Put-in: ${name}`, exact: true });
  await choice.scrollIntoViewIfNeeded();
  await expect(choice).toBeInViewport({ ratio: 0.99 });
  await page.screenshot({ path: `tmp/access-selector-short-${page.viewportSize()!.width}.png` });
  await choice.click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toHaveAccessibleName(`Select Put-in, currently ${name}`);
  await trigger.click();
  await close.focus();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('a take-out access note follows the selected landing from the picker to directions', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  const river = fixture.result.river;
  const takeOut = river.accessPoints.find(point => point.name.includes('Wargo'))!;
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.route(`**/api/rivers/${river.slug}.json`, route => route.fulfill({ json: fixture }));
  await page.goto(`/river/${river.slug}`);
  await page.getByRole('button', { name: 'Show Access section' }).first().press('Enter');
  await page.getByRole('button', { name: /^Select Take-out,/ }).press('Enter');
  const option = page.getByRole('dialog').getByRole('button', { name: `Take-out: ${takeOut.name}`, exact: true });
  await expect(option).toHaveAccessibleDescription(takeOut.note);
  await expect(option.getByText(takeOut.note, { exact: true })).toBeVisible();
  await option.press('Enter');
  for (const point of [river.accessPoints[0]!, takeOut]) {
    const directions = page.getByRole('button', { name: `Open ${point.name} in maps`, exact: true });
    await expect(directions.locator('..').getByText(point.note, { exact: true })).toBeVisible();
  }
});
