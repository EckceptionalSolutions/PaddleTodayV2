import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
const fixture = JSON.parse(fs.readFileSync('tests/mobile-web/fixtures/route-detail.json', 'utf8'));
const base = process.argv[2] ?? 'http://127.0.0.1:4391';
const browser = await chromium.launch();
try {
  for (const width of [320, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 844 } });
    await context.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      const remove = Storage.prototype.removeItem;
      Storage.prototype.removeItem = function (key) {
        if (key.startsWith('paddletoday:trip-draft:') && window.failDraftRemove) throw new Error('Test delete unavailable');
        return remove.call(this, key);
      };
    });
    const page = await context.newPage();
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [] } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
    await page.goto(new URL('/river/rice-creek-peltier-to-long-lake', base).href);
    await page.getByText('Access', { exact: true }).click();
    await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
    const dialog = page.getByRole('dialog');
    const note = dialog.getByRole('textbox', { name: 'Note for your group (optional)', exact: true });
    await note.fill('Bring the red kayak.');
    await dialog.getByRole('button', { name: 'Close prepare trip', exact: true }).click();
    await page.goto(new URL('/saved', base).href);
    const resume = page.getByRole('button', { name: 'Resume trip draft for Rice Creek: Peltier Lake boat launch to Long Lake Regional Park', exact: true });
    await expect(resume).toBeEnabled();
    await expect(page.getByText('Peltier Lake boat launch to Long Lake Regional Park', { exact: true })).toBeVisible();
    await page.screenshot({ path: `apps/mobile/.expo/mobile-saved-drafts-${width}.png` });
    const box = await resume.boundingBox();
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    await resume.evaluate(element => { element.click(); element.click(); });
    await expect(note).toHaveValue('Bring the red kayak.');
    await dialog.getByRole('button', { name: 'Close prepare trip', exact: true }).click();
    await page.goBack();
    await expect(page).toHaveURL(/\/saved$/);
    await expect(resume).toBeEnabled();
    const remove = page.getByRole('button', { name: 'Remove trip draft for Rice Creek: Peltier Lake boat launch to Long Lake Regional Park', exact: true });
    await remove.click();
    await page.getByRole('button', { name: 'Keep draft', exact: true }).click();
    await expect(resume).toBeVisible();
    await page.evaluate(() => { window.failDraftRemove = true; });
    await remove.click();
    await page.getByRole('button', { name: 'Remove this draft', exact: true }).click();
    await expect(page.getByText('Could not remove this draft. It is still saved; please try again.', { exact: true })).toBeVisible();
    await page.evaluate(() => { window.failDraftRemove = false; });
    await page.getByRole('button', { name: 'Remove this draft', exact: true }).click();
    await expect(resume).toBeHidden();
    await page.reload();
    await expect(resume).toBeHidden();
    await page.evaluate(() => {
      const target = { routeSlug: 'rice-creek-peltier-to-long-lake', putInId: 'removed-launch', takeOutId: 'removed-landing', routeName: 'Changed access draft' };
      localStorage.setItem(`paddletoday:trip-draft:v1:${JSON.stringify([target.routeSlug, target.putInId, target.takeOutId])}`, JSON.stringify({ version: 1, target,
        draft: { launch: '2030-06-15 09:00', expected: '2030-06-15 12:00', checkIn: '', groupSize: '', boat: '', vehicle: '', note: 'Keep this older segment' }, savedAt: new Date().toISOString() }));
    });
    await page.reload();
    await page.getByRole('button', { name: 'Resume trip draft for Changed access draft', exact: true }).click();
    await expect(page.getByText('This draft’s access points are no longer available on the route. The draft is still saved. Review the access points before starting a new plan.', { exact: true })).toBeVisible();
    await expect(dialog).toBeHidden();
    expect(await page.evaluate(() => Object.keys(localStorage).filter(key => key.startsWith('paddletoday:trip-draft:')).length)).toBe(1);
    console.log(`PASS ${width}px: discover draft, exact resume, duplicate-tap guard, Back, removal cancellation/failure/retry/persistence, missing-access protection`);
    await context.close();
  }
} finally { await browser.close(); }
