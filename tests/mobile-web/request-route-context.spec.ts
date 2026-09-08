import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('requesting an unfound route carries over the search without submitting it', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  let submissions = 0;
  await page.route('**/api/**', route => {
    if (route.request().method() === 'POST') submissions++;
    return route.fulfill({ status: 503, json: { error: 'offline' } });
  });
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{ ...fixture.result,
    summary: { gaugeNow: 'QA', shortExplanation: 'QA' },
  }] } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Search for a river or route', exact: true }).click();
  await page.getByRole('dialog').getByRole('textbox', { name: 'Search rivers and routes', exact: true }).fill('Unlisted fork & bridge');
  await page.getByRole('dialog').getByRole('button', { name: 'Request a Route', exact: true }).click();
  await expect(page).toHaveURL(/\/request-route\?name=/);
  const name = page.getByRole('textbox', { name: 'River name', exact: true });
  await expect(name).toHaveValue('Unlisted fork & bridge');
  await name.fill('Corrected creek name');
  await page.getByRole('textbox', { name: 'City, state, or general area', exact: true }).fill('NY');
  await expect(name).toHaveValue('Corrected creek name');
  expect(submissions).toBe(0);
});

test('direct request links and pasted notes respect the visible input limits', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  let submitted: Record<string, string> | undefined;
  await page.route('**/api/route-request', route => {
    submitted = route.request().postDataJSON();
    return route.fulfill({ json: { ok: true, stored: true } });
  });
  await page.goto(`/request-route?name=${'R'.repeat(250)}`);
  const name = page.getByRole('textbox', { name: 'River name', exact: true });
  await expect(name).toHaveValue('R'.repeat(240));
  await expect(page.getByText('240/240 characters · Limit reached', { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'City, state, or general area', exact: true }).fill('NJ');
  const notes = page.getByRole('textbox', { name: 'Notes', exact: true });
  await notes.fill('x'.repeat(4001));
  await expect(notes).toHaveValue('x'.repeat(4000));
  await expect(page.getByText('4000/4000 characters · Limit reached', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Send request', exact: true }).click();
  await expect(page.getByText('Request received. Thanks for the lead.', { exact: true })).toBeVisible();
  await expect(name).toHaveValue('');
  expect(submitted?.notes).toBe('x'.repeat(4000));
  expect(submitted?.routeName).toBe('R'.repeat(240));
  expect(errors).toEqual([]);
});
