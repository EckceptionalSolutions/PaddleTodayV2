import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('Today search keeps close, full route names and empty-result actions reachable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  const name = 'Long northern branch of the wandering river';
  const reach = 'Historic county park landing to the downstream nature preserve';
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{ ...fixture.result,
    river: { ...fixture.result.river, name, reach },
    summary: { shortExplanation: 'QA', gaugeNow: 'QA' },
  }] } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Search for a river or route', exact: true }).click();
  const dialog = page.getByRole('dialog');
  const close = dialog.getByRole('button', { name: 'Close route search', exact: true });
  await expect(close).toBeInViewport({ ratio: 1 });
  expect((await close.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  const search = dialog.getByRole('textbox', { name: 'Search rivers and routes', exact: true });
  await search.fill('wandering');
  const result = dialog.getByRole('button', { name: `View ${name}: ${reach}`, exact: true });
  for (const text of [name, reach]) {
    const label = result.getByText(text, { exact: true });
    expect(await label.evaluate(element => element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1)).toBe(true);
  }
  await expect(result).not.toContainText('Ideal window');
  await page.screenshot({ path: `tmp/home-search-layout-${page.viewportSize()!.width}.png` });
  const clear = dialog.getByRole('button', { name: 'Clear search', exact: true });
  expect((await clear.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await clear.click();
  await expect(search).toBeFocused();
  const state = dialog.getByRole('button', { name: 'Browse Minnesota routes', exact: true });
  expect((await state.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await search.fill('unmatched qa');
  for (const name of ['Open Explore map', 'Request a Route']) {
    expect((await dialog.getByRole('button', { name, exact: true }).boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  await close.click();
  await expect(dialog).toBeHidden();
});
