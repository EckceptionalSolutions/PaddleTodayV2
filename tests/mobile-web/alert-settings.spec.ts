import { test, expect, type Route } from '@playwright/test';
const subscription = { id: 'qa-only', managementToken: 'qa-token', locationLabel: 'Duluth', maxTravelMinutes: 120, todayEnabled: true, weekendEnabled: true, isActive: true };

for (const raw of ['{"unfinished":', '[]', JSON.stringify({ ...subscription, managementToken: '' })]) {
  test(`malformed alert settings preserve storage and recover through retry: ${raw}`, async ({ page }) => {
    await page.addInitScript((raw) => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:area-notification-preferences', raw);
      localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 46.78, longitude: -92.1, label: 'Duluth', source: 'search' }));
    }, raw);
    let writes = 0;
    await page.route('**/api/**', (route) => {
      if (route.request().method() !== 'GET') writes += 1;
      return route.fulfill({ status: 503, json: { error: 'offline' } });
    });
    await page.goto('/notifications');
    const retry = page.getByRole('button', { name: 'Retry loading alert settings', exact: true });
    await expect(retry).toBeVisible();
    await expect(page.getByRole('button', { name: 'Turn on alerts', exact: true })).toHaveCount(0);
    await retry.press('Space');
    await expect(retry).toBeEnabled();
    expect(await page.evaluate(() => localStorage.getItem('paddletoday:area-notification-preferences'))).toBe(raw);
    await page.evaluate((subscription) => localStorage.setItem('paddletoday:area-notification-preferences', JSON.stringify(subscription)), subscription);
    await retry.press('Space');
    await expect(retry).toBeHidden();
    await expect(page.getByRole('switch', { name: 'Today alerts', exact: true })).toBeChecked();
    expect(writes).toBe(0);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:area-notification-preferences')!))).toEqual(subscription);
  });
}

test('unreadable alert preferences recover before offering subscription changes', async ({ page }) => {
  await page.addInitScript((subscription) => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:area-notification-preferences', JSON.stringify(subscription));
    localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 46.78, longitude: -92.1, label: 'Duluth', source: 'search' }));
    const state = window as unknown as { allowAlertRead: boolean };
    state.allowAlertRead = false;
    const get = Storage.prototype.getItem;
    Storage.prototype.getItem = function (key) {
      if (key === 'paddletoday:area-notification-preferences' && !state.allowAlertRead) throw new Error('QA read unavailable');
      return get.call(this, key);
    };
  }, subscription);
  let writes = 0;
  await page.route('**/api/**', (route) => {
    if (route.request().method() !== 'GET') writes += 1;
    return route.fulfill({ status: 503, json: { error: 'offline' } });
  });
  await page.goto('/notifications');
  const retry = page.getByRole('button', { name: 'Retry loading alert settings', exact: true });
  await expect(retry).toBeVisible();
  await expect(page.getByRole('button', { name: 'Turn on alerts', exact: true })).toHaveCount(0);
  await retry.press('Space');
  await expect(retry).toBeEnabled();
  await expect(page.getByText('Alert settings could not load', { exact: true })).toBeVisible();
  await page.evaluate(() => { (window as unknown as { allowAlertRead: boolean }).allowAlertRead = true; });
  await retry.press('Space');
  await expect(retry).toHaveCount(0);
  await expect(page.getByRole('switch', { name: 'Today alerts', exact: true })).toBeChecked();
  await expect(page.getByRole('switch', { name: 'Weekend alerts', exact: true })).toBeChecked();
  expect(writes).toBe(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:area-notification-preferences')!))).toEqual(subscription);
});

test('incomplete alert confirmation preserves manageable settings and supports retry', async ({ page }) => {
  await page.addInitScript((subscription) => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:area-notification-preferences', JSON.stringify(subscription));
  }, subscription);
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  let confirm = false;
  await page.route('**/api/notification-subscriptions/qa-only', (route) => route.fulfill({ json: {
    ok: true,
    subscription: { ...subscription, todayEnabled: false, managementToken: confirm ? subscription.managementToken : '' },
  } }));
  await page.goto('/notifications');
  const today = page.getByRole('switch', { name: 'Today alerts' });
  await today.click();
  await expect(page.getByText('We could not confirm your nearby alert settings. Please try again.', { exact: true })).toBeVisible();
  await expect(today).toBeChecked();
  await expect(today).toBeEnabled();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:area-notification-preferences')!))).toEqual(subscription);
  confirm = true;
  await today.click();
  await expect(today).not.toBeChecked();
  await expect(page.getByText('Nearby alert settings updated.', { exact: true })).toBeVisible();
});
test('alert controls recover after a failed update', async ({ page }) => {
  await page.addInitScript((subscription) => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:area-notification-preferences', JSON.stringify(subscription));
  }, subscription);
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'Offline test' } }));
  let pending: Route | null = null;
  let count = 0;
  await page.route('**/api/notification-subscriptions/qa-only', (route) => { count++; pending = route; });
  await page.goto('/notifications');
  const today = page.getByRole('switch', { name: 'Today alerts' });
  const weekend = page.getByRole('switch', { name: 'Weekend alerts' });
  const turnOff = page.getByRole('button', { name: 'Turn off nearby alerts' });
  await today.press('Space');
  await expect.poll(() => Boolean(pending)).toBe(true);
  await expect(today).toBeDisabled();
  await expect(weekend).toBeDisabled();
  await expect(turnOff).toBeDisabled();
  expect(count).toBe(1);
  await today.dispatchEvent('keydown', { key: ' ' });
  expect(count).toBe(1);
  await pending!.fulfill({ status: 503, json: { error: 'unavailable', message: 'Please retry later.' } });
  await expect(today).toBeEnabled();
  await expect(today).toBeChecked();
  await expect(page.getByText('Please retry later.', { exact: true })).toBeVisible();
  pending = null;
  await today.click();
  await expect.poll(() => Boolean(pending)).toBe(true);
  await pending!.fulfill({ json: { ok: true, requestId: 'qa', created: false, subscription: { ...subscription, todayEnabled: false } } });
  await expect(today).not.toBeChecked();
  await expect(page.getByText('Nearby alert settings updated.', { exact: true })).toBeVisible();
  for (const control of [today, weekend, turnOff]) expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  console.log('Alert updates preserve state on failure, retry successfully, and expose 44px controls.');
});

for (const action of ['toggle', 'turn off']) {
  test(`confirmed alert ${action} can retry device storage without repeating the server update`, async ({ page }) => {
    await page.addInitScript((subscription) => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:area-notification-preferences', JSON.stringify(subscription));
      localStorage.setItem('qa:fail-alert-storage', '1');
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key === 'paddletoday:area-notification-preferences' && localStorage.getItem('qa:fail-alert-storage')) {
          throw new Error('QA device storage unavailable');
        }
        return original.call(this, key, value);
      };
    }, subscription);
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    let requests = 0;
    const updated = action === 'toggle' ? { ...subscription, todayEnabled: false } : { ...subscription, isActive: false };
    await page.route('**/api/notification-subscriptions/qa-only', (route) => {
      requests++;
      return route.fulfill({ json: { ok: true, subscription: updated } });
    });
    await page.goto('/notifications');
    await (action === 'toggle'
      ? page.getByRole('switch', { name: 'Today alerts' })
      : page.getByRole('button', { name: 'Turn off nearby alerts' })).click();
    await expect(page.getByText(action === 'toggle' ? 'Nearby alert settings updated.' : 'Nearby paddle alerts are off.', { exact: true })).toBeVisible();
    if (action === 'toggle') await expect(page.getByRole('switch', { name: 'Today alerts' })).not.toBeChecked();
    else await expect(page.getByRole('switch', { name: 'Today alerts' })).toBeHidden();
    const retry = page.getByRole('button', { name: 'Retry saving alert settings on this device', exact: true });
    await expect(retry).toBeVisible();
    await retry.click();
    await expect(retry).toBeEnabled();
    await expect(page.getByText(/Your alert change was received/)).toBeVisible();
    expect(requests).toBe(1);
    await page.evaluate(() => localStorage.removeItem('qa:fail-alert-storage'));
    await retry.click();
    await expect(retry).toBeHidden();
    await expect(page.getByText('Alert settings saved on this device.', { exact: true })).toBeVisible();
    expect(requests).toBe(1);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:area-notification-preferences')!))).toEqual(updated);
  });
}


