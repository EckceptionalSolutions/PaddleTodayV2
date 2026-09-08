import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';

const fixture = JSON.parse(fs.readFileSync('tests/mobile-web/fixtures/route-detail.json', 'utf8'));
const browser = await chromium.launch();
try {
  for (const width of [320, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    await context.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key.startsWith('paddletoday:trip-draft:') && window.failDraftSave) throw new Error('Test storage full');
        return original.call(this, key, value);
      };
    });
    const page = await context.newPage();
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'Test offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
    const open = async () => {
      await page.getByText('Access', { exact: true }).click();
      await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
    };
    await page.goto(new URL('/river/rice-creek-peltier-to-long-lake', process.argv[2] ?? 'http://127.0.0.1:4391').href);
    await open();
    const dialog = page.getByRole('dialog');
    const note = dialog.getByRole('textbox', { name: 'Note for your group (optional)', exact: true });
    const close = dialog.getByRole('button', { name: 'Close prepare trip', exact: true });
    await expect(note).toBeEditable();
    await note.fill('Meet at the landing, bring two kayaks.');
    await close.click();
    await expect(dialog).toBeHidden();
    await page.reload();
    await open();
    await expect(note).toHaveValue('Meet at the landing, bring two kayaks.');
    await page.evaluate(() => { window.failDraftSave = true; });
    await note.fill('New shuttle details');
    await close.click();
    await expect(dialog.getByText('Your changes could not be saved on this device.', { exact: true })).toBeVisible();
    await expect(note).toHaveValue('New shuttle details');
    const retry = dialog.getByRole('button', { name: 'Retry saving draft', exact: true });
    await retry.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `apps/mobile/.expo/mobile-trip-draft-error-${width}.png` });
    const bounds = await retry.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    await page.evaluate(() => { window.failDraftSave = false; });
    await retry.click();
    await expect(dialog.getByText('Draft saved on this device. Review the dates before sharing.', { exact: true })).toBeVisible();
    await dialog.getByRole('button', { name: 'Start a new draft', exact: true }).click();
    await dialog.getByRole('button', { name: 'Keep this draft', exact: true }).click();
    await expect(note).toHaveValue('New shuttle details');
    await dialog.getByRole('button', { name: 'Start a new draft', exact: true }).click();
    await dialog.getByRole('button', { name: 'Replace trip draft', exact: true }).click();
    await expect(note).toHaveValue('');
    await close.click();
    await expect(dialog).toBeHidden();
    await page.evaluate(() => {
      const key = Object.keys(localStorage).find(key => key.startsWith('paddletoday:trip-draft:'));
      localStorage.setItem(key, '{unreadable');
    });
    await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
    await expect(dialog.getByText('Your saved draft could not be read. It has not been replaced.', { exact: true })).toBeVisible();
    await expect(note).not.toBeEditable();
    await dialog.getByRole('button', { name: 'Replace with a new draft', exact: true }).click();
    await expect(note).toBeEditable();
    await expect(note).toHaveValue('');
    await close.click();
    console.log(`PASS ${width}px: immediate-close save, reload persistence, save failure/retry, reset cancellation/confirmation, unreadable protection and explicit replacement`);
    await context.close();
  }
} finally { await browser.close(); }
