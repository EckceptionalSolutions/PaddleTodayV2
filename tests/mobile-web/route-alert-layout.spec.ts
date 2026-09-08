import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const longName of [false, true]) {
test(`route alerts keep actions and feedback reachable with ${longName ? 'long' : 'standard'} names`, async ({ page }) => {
  await page.setViewportSize({ width: page.viewportSize()!.width, height: 320 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  const detail = longName ? { ...fixture, result: { ...fixture.result, river: { ...fixture.result.river,
    name: 'South Fork through the regional river recreation area and conservation district',
    reach: 'Regional park public launch to the downstream wildlife refuge carry-out beside the old highway bridge',
  } } } : fixture;
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: detail }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByRole('button', { name: 'Set route alert', exact: true }).click();
  const dialog = page.getByRole('dialog');
  const strong = dialog.getByRole('button', { name: 'Phone alert at Strong', exact: true });
  await strong.scrollIntoViewIfNeeded();
  await expect(strong).toBeInViewport({ ratio: 0.99 });
  expect((await strong.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await strong.click();
  const status = dialog.getByText('Phone alerts are not available on web.', { exact: true });
  await status.evaluate(element => element.scrollIntoView({ block: 'center' }));
  await expect(status).toBeInViewport({ ratio: 0.99 });
  await page.screenshot({ path: `tmp/route-alert-short-${longName ? 'long' : 'standard'}-${page.viewportSize()!.width}.png` });
  const close = dialog.getByRole('button', { name: 'Close route alerts', exact: true });
  await close.scrollIntoViewIfNeeded();
  await expect(close).toBeInViewport({ ratio: 0.99 });
  await close.click();
  await expect(dialog).toBeHidden();
});

}
