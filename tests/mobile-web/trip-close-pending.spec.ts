import { test, expect, type Route } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const format of ['gpx', 'ics'] as const) test(`Close cancels ${format} before waiting for slow draft storage`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    const state = window as any;
    state.opened = [];
    window.open = url => { state.opened.push(String(url)); return null; };
    const original = Storage.prototype.setItem;
    state.holdDraft = true;
    Storage.prototype.setItem = function (key, value) {
      if (!state.holdDraft || !key.startsWith('paddletoday:trip-draft:v1:')) return original.call(this, key, value);
      return new Promise<void>((resolve, reject) => {
        state.releaseDraft = (fail: boolean) => {
          state.holdDraft = false;
          if (fail) reject(new Error('Storage unavailable'));
          else { original.call(this, key, value); resolve(); }
        };
      }) as unknown as void;
    };
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
  let pending: Route | undefined;
  await page.route(`**/trip.${format}?*`, route => { pending = route; });
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByRole('button', { name: 'Show Access section', exact: true }).first().click();
  await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
  const sheet = page.getByRole('dialog');
  const note = sheet.getByRole('textbox', { name: 'Note for your group (optional)', exact: true });
  await note.fill('Keep the shuttle note when storage fails.');
  const action = sheet.getByRole('button', { name: format === 'gpx' ? 'Download GPX' : 'Add to calendar', exact: true });
  await action.click();
  await expect.poll(() => Boolean(pending)).toBe(true);
  const close = sheet.getByRole('button', { name: 'Close prepare trip', exact: true });
  await close.click();
  await expect(close).toBeDisabled();
  await expect(action).toHaveAttribute('aria-busy', 'false');
  await pending!.fulfill({ status: 200, body: '' });
  await expect.poll(() => page.evaluate(() => typeof (window as any).releaseDraft)).toBe('function');
  await page.evaluate(() => (window as any).releaseDraft(true));
  await expect(sheet.getByText('Your changes could not be saved on this device.', { exact: true })).toBeVisible();
  await expect(note).toHaveValue('Keep the shuttle note when storage fails.');
  expect(await page.evaluate(() => (window as any).opened)).toEqual([]);
  pending = undefined;
  await action.click();
  await expect.poll(() => Boolean(pending)).toBe(true);
  await pending!.fulfill({ status: 200, body: '' });
  await expect.poll(() => page.evaluate(() => (window as any).opened.length)).toBe(1);
  await close.click();
  await expect(sheet).toBeHidden();
});
