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
