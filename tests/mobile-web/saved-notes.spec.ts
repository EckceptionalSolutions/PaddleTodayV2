import { test, expect } from '@playwright/test';

test('personal notes retain the draft on storage failure, survive reload, and can be removed', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    if (!localStorage.getItem('qa:notes-seeded')) {
      localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{
        slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier to Long Lake',
        savedAt: '2026-09-06T12:00:00.000Z', notes: 'Original parking note.',
      }, {
        slug: 'rice-creek-other-reach', name: 'Rice Creek', reach: 'Other reach',
        savedAt: '2026-09-05T12:00:00.000Z', notes: 'Keep this other reach note.',
      }]));
      localStorage.setItem('qa:notes-seeded', '1');
      localStorage.setItem('qa:fail-note-storage', '1');
    }
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === 'paddletoday:saved-rivers' && localStorage.getItem('qa:fail-note-storage')) {
        original.call(this, 'qa:note-write-attempts', String(Number(localStorage.getItem('qa:note-write-attempts') || '0') + 1));
        throw new Error('QA note storage unavailable');
      }
      return original.call(this, key, value);
    };
  });
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/saved');
  const edit = page.getByRole('button', { name: 'Edit personal note: Rice Creek, Peltier to Long Lake', exact: true });
  await expect(page.getByRole('button', { name: 'Edit personal note: Rice Creek, Other reach', exact: true })).toBeVisible();
  await edit.click();
  const dialog = page.getByRole('dialog');
  const input = dialog.getByRole('textbox', { name: 'Your note', exact: true });
  await expect(input).toHaveValue('Original parking note.');
  await input.fill('Unsaved parking instructions');
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(dialog.getByRole('heading', { name: 'Discard your unsaved changes?', exact: true })).toBeVisible();
  await expect(dialog).toBeInViewport({ ratio: 1 });
  await page.screenshot({ path: `tmp/note-discard-${page.viewportSize()!.width}.png` });
  await dialog.getByRole('button', { name: 'Keep editing', exact: true }).click();
  await expect(input).toHaveValue('Unsaved parking instructions');
  await expect(input).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog.getByRole('heading', { name: 'Discard your unsaved changes?', exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Discard changes', exact: true }).click();
  await expect(dialog).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem('qa:note-write-attempts'))).toBeNull();
  await edit.click();
  await expect(input).toHaveValue('Original parking note.');
  const note = 'Meet at 9:00 — bring the spare paddle.\nShuttle: café parking lot.';
  await input.fill(note);
  const save = dialog.getByRole('button', { name: 'Save note', exact: true });
  await save.evaluate((button: HTMLElement) => { button.click(); button.click(); });
  await expect(dialog.getByText('Could not save your note. Your draft is still here. Please try again.', { exact: true })).toBeVisible();
  await expect(input).toHaveValue(note);
  await expect(save).toBeEnabled();
  expect(await page.evaluate(() => localStorage.getItem('qa:note-write-attempts'))).toBe('1');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:saved-rivers')!)[0].notes)).toBe('Original parking note.');
  await page.evaluate(() => localStorage.removeItem('qa:fail-note-storage'));
  await save.click();
  await expect(dialog).toBeHidden();
  await page.reload();
  await edit.click();
  await expect(input).toHaveValue(note);
  await input.fill('');
  await save.click();
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('button', { name: 'Add personal note: Rice Creek, Peltier to Long Lake', exact: true })).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:saved-rivers')!)[0].notes)).toBeUndefined();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:saved-rivers')!).find((route: { slug: string }) => route.slug === 'rice-creek-other-reach').notes)).toBe('Keep this other reach note.');
});
