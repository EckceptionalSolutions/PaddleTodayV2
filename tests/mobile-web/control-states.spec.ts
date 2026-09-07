import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
});

test('route disclosure controls expose their expanded state', async ({ page }) => {
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  const safety = page.getByRole('button', { name: 'Expand safety details', exact: true });
  await expect(safety).toHaveAttribute('aria-expanded', 'false');
  await safety.press('Enter');
  const expanded = page.getByRole('button', { name: 'Collapse safety details', exact: true });
  await expect(expanded).toHaveAttribute('aria-expanded', 'true');
  await expanded.press('Enter');
  await expect(safety).toHaveAttribute('aria-expanded', 'false');
});

test('route sections and shorter-trip access choices work by keyboard and announce selection', async ({ page }) => {
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  const access = page.getByRole('button', { name: 'Show Access section', exact: true }).first();
  await expect(access).toHaveAttribute('aria-pressed', 'false');
  await access.press('Space');
  await expect(access).toHaveAttribute('aria-pressed', 'true');
  const putIn = page.getByRole('button', { name: /^Select Put-in, currently / });
  await expect(putIn).toHaveAttribute('aria-expanded', 'false');
  await putIn.press('Space');
  let dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('button', { name: 'Put-in: Peltier Lake boat launch', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await dialog.getByRole('button', { name: 'Put-in: Baldwin Lake carry-in', exact: true }).press('Space');
  await expect(dialog).toBeHidden();
  await expect(putIn).toHaveAccessibleName('Select Put-in, currently Baldwin Lake carry-in');
  await expect.poll(() => new URL(page.url()).searchParams.get('putin')).toBe('baldwin-lake');
  const takeOut = page.getByRole('button', { name: /^Select Take-out, currently / });
  await takeOut.press('Space');
  dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('button', { name: 'Take-out: Peltier Lake boat launch', exact: true })).toHaveCount(0);
  await dialog.getByRole('button', { name: 'Take-out: Old Highway 8 access', exact: true }).press('Space');
  await expect(dialog).toBeHidden();
  await expect(takeOut).toHaveAccessibleName('Select Take-out, currently Old Highway 8 access');
  await expect.poll(() => new URL(page.url()).searchParams.get('takeout')).toBe('old-highway-8');
  await takeOut.press('Space');
  await expect(dialog.getByRole('button', { name: 'Take-out: Old Highway 8 access', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await dialog.getByRole('button', { name: 'Close Take-out selection', exact: true }).press('Space');
  await expect(dialog).toBeHidden();
  await expect(takeOut).toBeFocused();
});

test('Explore exposes search, view, and filter state to keyboard users', async ({ page }) => {
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/explore');
  const search = page.getByRole('textbox', { name: 'Search routes', exact: true });
  await search.fill('Rice Creek');
  await expect(search).toHaveValue('Rice Creek');
  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  await expect(search).toHaveValue('');
  const map = page.getByRole('tab', { name: 'map view', exact: true });
  const list = page.getByRole('tab', { name: 'list view', exact: true });
  await list.press('Enter');
  await expect(list).toHaveAttribute('aria-selected', 'true');
  await expect(map).toHaveAttribute('aria-selected', 'false');
  await map.press('Enter');
  await expect(map).toHaveAttribute('aria-selected', 'true');
  await expect(list).toHaveAttribute('aria-selected', 'false');
  await page.getByRole('button', { name: /^(Filters|\d+ active filters)$/ }).click();
  const dialog = page.getByRole('dialog');
  const preset = dialog.getByRole('button', { name: 'Quick float', exact: true });
  await preset.press('Space');
  await expect(preset).toHaveAttribute('aria-pressed', 'true');
  await dialog.getByRole('button', { name: 'Clear filters', exact: true }).press('Space');
  await expect(preset).toHaveAttribute('aria-pressed', 'false');
  await dialog.getByRole('button', { name: 'Cancel filters', exact: true }).press('Space');
  await expect(dialog).toBeHidden();
});
