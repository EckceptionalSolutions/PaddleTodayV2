import { test, expect } from '@playwright/test';

test('long personal notes have a compact preview while full text stays searchable and editable', async ({ page }) => {
  const note = 'Parking details near the launch.\nBring the spare paddle.\nMeet before sunrise.\nHidden unicorn landing instructions.\n' + 'More shuttle details. '.repeat(55);
  await page.addInitScript(note => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([
      { slug: 'qa-creek', name: 'QA Creek', reach: 'Long reach', savedAt: '2026-09-08T12:00:00Z', notes: note },
      { slug: 'other-creek', name: 'Other Creek', reach: 'Short reach', savedAt: '2026-09-07T12:00:00Z', notes: 'Short parking reminder.' },
    ]));
  }, note);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/saved');
  const expand = page.getByRole('button', { name: 'Show full personal note: QA Creek, Long reach', exact: true });
  await expect(expand).toHaveAttribute('aria-expanded', 'false');
  expect((await expand.locator('..').locator('..').boundingBox())!.height).toBeLessThan(270);
  await expect(page.getByText(note, { exact: true })).toHaveCount(0);
  await expand.click();
  const collapse = page.getByRole('button', { name: 'Show less personal note: QA Creek, Long reach', exact: true });
  await expect(collapse).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText(note, { exact: true })).toBeVisible();
  await collapse.click();
  await page.getByRole('textbox', { name: 'Search saved routes', exact: true }).fill('unicorn');
  await expect(page.getByText('Showing 1 of 2 saved routes.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Edit personal note: QA Creek, Long reach', exact: true }).click();
  await expect(page.getByRole('dialog').getByRole('textbox', { name: 'Your note', exact: true })).toHaveValue(note);
  await page.getByRole('dialog').getByRole('button', { name: 'Cancel', exact: true }).click();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:saved-rivers')!)[0].notes)).toBe(note);
  await expand.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `tmp/saved-note-preview-${page.viewportSize()!.width}.png` });
});
