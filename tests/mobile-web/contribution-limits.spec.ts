import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
});

test('photo captions show their retained length and clear the counter after shortening', async ({ page }) => {
  await page.goto('/contribute-photo/rice-creek-peltier-to-long-lake');
  const caption = page.getByRole('textbox', { name: 'Photo caption (optional)', exact: true });
  await caption.fill('c'.repeat(1201));
  await expect(caption).toHaveValue('c'.repeat(1200));
  await expect(page.getByText('1200/1200 characters · Limit reached', { exact: true })).toBeVisible();
  await caption.fill('A shorter caption.');
  await expect(page.getByText(/1200 characters/)).toHaveCount(0);
  const name = page.getByRole('textbox', { name: 'Name or paddling handle', exact: true });
  await name.fill('n'.repeat(121));
  await expect(name).toHaveValue('n'.repeat(120));
  await expect(page.getByText('120/120 characters · Limit reached', { exact: true })).toBeVisible();
});

test('route report limits match the exact text submitted to the server', async ({ page }) => {
  let submitted: Record<string, string> | undefined;
  await page.route('**/api/route-contributions', route => {
    submitted = route.request().postDataJSON();
    return route.fulfill({ json: { ok: true, stored: true } });
  });
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByText('Reports', { exact: true }).click();
  await page.getByText('Report', { exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('textbox', { name: 'Contributor name or paddling handle', exact: true }).fill('QA Paddler');
  await dialog.getByRole('textbox', { name: 'Email address', exact: true }).fill('qa@example.test');
  const report = dialog.getByRole('textbox', { name: 'Route report', exact: true });
  await report.fill('r'.repeat(1801));
  await expect(report).toHaveValue('r'.repeat(1800));
  await expect(dialog.getByText('1800/1800 characters · Limit reached', { exact: true })).toBeVisible();
  const notes = dialog.getByRole('textbox', { name: 'Extra notes, optional', exact: true });
  await notes.fill('n'.repeat(1201));
  await expect(notes).toHaveValue('n'.repeat(1200));
  await expect(dialog.getByText('1200/1200 characters · Limit reached', { exact: true })).toBeVisible();
  await page.screenshot({ path: `tmp/contribution-limits-${page.viewportSize()!.width}.png` });
  await dialog.getByRole('button', { name: 'Observed water level: Ideal', exact: true }).click();
  await dialog.getByRole('button', { name: 'Trip outcome: Completed', exact: true }).click();
  await dialog.getByRole('button', { name: 'Overall verdict: Good', exact: true }).click();
  await dialog.getByRole('checkbox', { name: 'I agree to follow-up questions.', exact: true }).check();
  await dialog.getByRole('button', { name: 'Send report', exact: true }).click();
  await expect(dialog.getByText('Thank you. Your report was sent for review.', { exact: true })).toBeVisible();
  expect(submitted?.tripReport).toBe('r'.repeat(1800));
  expect(submitted?.notes).toBe('n'.repeat(1200));
  await expect(dialog.getByText(/Limit reached/)).toHaveCount(0);
});
