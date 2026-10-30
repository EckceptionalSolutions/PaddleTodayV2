import { test, expect, type Page } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };
import { installMobileBoardFixtures } from './mobile-board-fixtures';

const key = 'paddletoday:paddling-preferences:v1';
const beginner = { version: 1, dismissed: false, preferences: { experience: 'new', waterTypes: ['recreational'] } };
const route = (name: string, difficulty: 'easy' | 'moderate' | 'hard', routeType: 'recreational' | 'whitewater', score: number) => ({
  ...fixture.result,
  river: { ...fixture.result.river, name, slug: name.toLowerCase().replaceAll(' ', '-'), riverId: name, difficulty, routeType },
  score, rating: 'Good', readiness: { status: 'ready', label: 'Ready', reason: '' },
  summary: { gaugeNow: 'QA', shortExplanation: 'Current fixture conditions.' },
  confidence: { score: 90, label: 'High' }, liveData: { overall: 'live', summary: 'QA' }, generatedAt: new Date().toISOString(),
});
const routes = [route('Hard River', 'hard', 'recreational', 99), route('Whitewater River', 'easy', 'whitewater', 90), route('Easy River', 'easy', 'recreational', 75)];

async function setup(page: Page, choices = routes) {
  await page.addInitScript(river => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: river.latitude, longitude: river.longitude, label: 'QA location', source: 'search' }));
    localStorage.setItem('paddletoday:area-notification-onboarding:v1', 'dismissed');
  }, fixture.result.river);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/api/**', request => request.fulfill({ status: 503, json: {} }));
  const fulfill = await installMobileBoardFixtures(page);
  await page.route('**/api/mobile/{summary,explore}.json**', request => fulfill(request, { json: { generatedAt: new Date().toISOString(), rivers: choices } }));
  await page.route('**/api/mobile/weekend.json**', request => fulfill(request, { json: { generatedAt: new Date().toISOString(), rivers: choices.map(item => ({
    ...item, current: { score: item.score, rating: item.rating }, weekend: {
      label: 'Weekend', score: item.score, rating: 'Good', confidence: 'High', explanation: 'QA', summary: 'QA', signalLine: '',
    },
  })) } }));
}
async function configureBeginner(page: Page) {
  await page.getByRole('radio', { name: 'Just starting', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Recreational paddling', exact: true }).click();
  await page.getByRole('button', { name: 'Show my picks', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your paddling', exact: true })).toBeHidden();
}

test('guest setup immediately personalizes Today, persists, and carries across tabs', async ({ page }) => {
  await setup(page);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('button', { name: /^View Hard River:/ }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Set up your paddling preferences', exact: true }).click();
  await configureBeginner(page);
  await expect(page.getByRole('button', { name: /^View Easy River:/ }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: /^View Hard River:/ })).toHaveCount(0);
  await expect(page.getByText('Matches your preferences: Easy difficulty · recreational paddling.', { exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key)).toEqual(beginner);
  await page.screenshot({ path: 'tmp/paddling-today.png' });
  await page.reload();
  await expect(page.getByRole('button', { name: /^View Easy River:/ }).first()).toBeVisible();
  await page.getByRole('tab', { name: 'Weekend', exact: true }).click();
  await expect(page.getByText('Forecast matching your preferences', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Hard River,/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /^Easy River,.*?, score 75$/ })).toHaveCount(1);
  await page.getByRole('button', { name: 'Show all routes', exact: true }).click();
  await expect(page.getByRole('button', { name: /^Hard River,.*?, score 99$/ })).toHaveCount(1);
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key)).toEqual(beginner);
  await page.getByRole('tab', { name: 'More', exact: true }).click();
  await page.getByRole('button', { name: 'Edit your paddling preferences', exact: true }).click();
  await expect(page.getByRole('radio', { name: 'Just starting', exact: true })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Recreational paddling', exact: true })).toBeChecked();
  await page.getByRole('radio', { name: 'Experienced', exact: true }).click();
  await page.getByRole('button', { name: 'Save preferences', exact: true }).click();
  await page.getByRole('tab', { name: 'Today', exact: true }).click();
  await expect(page.getByRole('button', { name: /^View Hard River:/ }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: /^View Whitewater River:/ })).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('Explore stays broad until preferences are explicitly applied; cancel and clear work', async ({ page }) => {
  await setup(page);
  await page.addInitScript(({ key, beginner }) => localStorage.setItem(key, JSON.stringify(beginner)), { key, beginner });
  await page.goto('/explore');
  await page.getByRole('button', { name: 'Filters', exact: true }).click();
  await page.getByRole('button', { name: 'Use my paddling preferences', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Easy', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Rec routes', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Cancel filters', exact: true }).click();
  await page.getByRole('button', { name: 'Filters', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Any difficulty', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Use my paddling preferences', exact: true }).click();
  await page.getByRole('button', { name: /^Show 1 route$/ }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:explore-preferences:v4')!).filters.difficulty)).toBe('easy');
  await page.getByRole('button', { name: '2 active filters', exact: true }).click();
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Any difficulty', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /^Show 3 routes$/ }).click();
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key)).toEqual(beginner);
});

test('no matches exposes explicit broadening on Today and Weekend', async ({ page }) => {
  await setup(page, routes.slice(0, 2));
  await page.addInitScript(({ key, beginner }) => localStorage.setItem(key, JSON.stringify(beginner)), { key, beginner });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'No nearby routes match your paddling preferences' })).toBeVisible();
  await expect(page.getByRole('button', { name: /^View Hard River:/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Browse all nearby routes', exact: true }).click();
  await expect(page.getByRole('button', { name: /^View Hard River:/ }).first()).toBeVisible();
  await page.getByRole('tab', { name: 'Weekend', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'No weekend routes match your paddling preferences' })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Hard River,/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Browse all weekend routes', exact: true }).click();
  await expect(page.getByRole('button', { name: /^Hard River,.*?, score 99$/ })).toHaveCount(1);
});

test('later is remembered, More remains available, and cancel preserves saved choices', async ({ page }) => {
  await setup(page);
  await page.goto('/');
  await page.getByRole('button', { name: 'Set up your paddling preferences', exact: true }).click();
  await page.getByRole('button', { name: 'Maybe later', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: /^View Hard River:/ }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Set up your paddling preferences', exact: true })).toHaveCount(0);
  await page.getByRole('tab', { name: 'More', exact: true }).click();
  await page.getByRole('button', { name: 'Your paddling', exact: true }).click();
  await configureBeginner(page);
  await page.getByRole('button', { name: 'Edit your paddling preferences', exact: true }).click();
  await page.getByRole('radio', { name: 'Experienced', exact: true }).click();
  await page.getByRole('button', { name: 'Close paddling preferences', exact: true }).click();
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key)).toEqual(beginner);
  await page.getByRole('button', { name: 'Edit your paddling preferences', exact: true }).click();
  await page.getByRole('button', { name: 'Reset paddling preferences', exact: true }).click();
  await page.getByRole('tab', { name: 'Today', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Set up your paddling preferences', exact: true })).toBeVisible();
});

test('a failed save keeps the form open and retries the selected answers', async ({ page }) => {
  await setup(page);
  await page.addInitScript(key => {
    const original = Storage.prototype.setItem;
    let failed = false;
    Storage.prototype.setItem = function (name, value) {
      if (name === key && !failed) { failed = true; throw new Error('QA write failure'); }
      return original.call(this, name, value);
    };
  }, key);
  await page.goto('/');
  await page.getByRole('button', { name: 'Set up your paddling preferences', exact: true }).click();
  await page.getByRole('radio', { name: 'Just starting', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Recreational paddling', exact: true }).click();
  await page.getByRole('button', { name: 'Show my picks', exact: true }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'Could not save on this device' })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Just starting', exact: true })).toBeChecked();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
  await page.getByRole('button', { name: 'Show my picks', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your paddling', exact: true })).toBeHidden();
  await expect(page.getByRole('button', { name: /^View Easy River:/ }).first()).toBeVisible();
});

test('a failed read can retry without overwriting saved preferences', async ({ page }) => {
  await setup(page);
  await page.addInitScript(({ key, beginner }) => {
    localStorage.setItem(key, JSON.stringify(beginner));
    const original = Storage.prototype.getItem;
    let failed = false;
    Storage.prototype.getItem = function (name) {
      if (name === key && !failed) { failed = true; throw new Error('QA read failure'); }
      return original.call(this, name);
    };
  }, { key, beginner });
  await page.goto('/');
  await page.getByRole('button', { name: 'Retry preferences', exact: true }).click();
  await expect(page.getByRole('button', { name: /^View Easy River:/ }).first()).toBeVisible();
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key)).toEqual(beginner);
});

test('setup fits a small dark screen and supports multiple water choices', async ({ page }) => {
  await setup(page);
  await page.setViewportSize({ width: 320, height: 568 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/more');
  await page.getByRole('button', { name: 'Set up your paddling preferences', exact: true }).click();
  await page.getByRole('radio', { name: 'Some experience', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Recreational paddling', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Whitewater', exact: true }).click();
  await expect(page.getByRole('checkbox', { name: 'Still figuring it out', exact: true })).not.toBeChecked();
  const save = page.getByRole('button', { name: 'Show my picks', exact: true });
  await expect(save).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  await page.screenshot({ path: 'tmp/paddling-sheet-small-dark.png' });
  await save.click();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key)!).preferences.waterTypes, key)).toEqual(['recreational', 'whitewater']);
});
