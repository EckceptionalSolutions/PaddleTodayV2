import { test, expect, type Page } from '@playwright/test';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';

const slug = 'little-miami-river-kelley-milford';
async function expectPreviewFits(page: Page) {
  await expect.poll(async () => {
    const [frameHeight, contentHeight] = await Promise.all([
      page.locator('#route-preview').evaluate(el => el.getBoundingClientRect().height),
      page.frameLocator('#route-preview').locator('.route-embed').evaluate(el => el.getBoundingClientRect().height),
    ]);
    return Math.abs(frameHeight - contentHeight);
  }).toBeLessThanOrEqual(1);
}
function payload(now = Date.now()) {
  return { snapshotStatus: 'fresh', result: { river: { slug, scoreEligibility: 'scored', gaugeSource: { unit: 'ft' }, profile: { thresholdModel: 'two-sided', idealMin: 5.5, idealMax: 7.5, tooLow: 4.6, tooHigh: 9 } }, generatedAt: new Date(now).toISOString(),
    score: 76, rating: 'Good', readiness: { status: 'ready', label: 'Ready' }, confidence: { label: 'High' },
    gaugeBand: 'low-shoulder', gaugeBandLabel: 'Below preferred range',
    weather: { timeZone: 'America/New_York', observedAt: new Date(now - 600_000).toISOString(), temperatureF: 68, windMph: 7, next12hWindMphMax: 10, next12hPrecipProbabilityMax: 20, next12hStormRisk: false, weatherCode: 0, conditionLabel: 'Clear',
      todayHourly: Array.from({ length: 8 }, (_, i) => ({
        time: `${new Date(Math.floor(now / 3_600_000) * 3_600_000 + (i - 4) * 3_600_000).toISOString().slice(0, 19)}-04:00`,
        label: '', isDaytime: true, temperatureF: [68, 70, 72, 74, 73, 71, 69, 67][i],
        windMph: [7, 8, 9, 10, 9, 8, 6, 5][i], windGustMph: null, precipProbability: [0, 0, 10, 10, 20, 20, 10, 0][i], precipitationIn: 0,
        weatherCode: i > 2 ? 2 : 0, conditionLabel: i > 2 ? 'Partly cloudy' : 'Clear',
      })),
    },
    liveData: { overall: 'live', gauge: { state: 'live' }, weather: { state: 'live' } }, gauge: {
      current: 5.18, unit: 'ft', delta24h: 0.38, observedAt: new Date(now - 900_000).toISOString(), trend: 'rising',
      recentSamples: Array.from({ length: 13 }, (_, i) => ({ observedAt: new Date(now - 900_000 - (12 - i) * 3_600_000).toISOString(), value: [4.8, 4.81, 4.84, 4.83, 4.86, 4.91, 4.94, 4.93, 5.02, 5.05, 5.08, 5.13, 5.18][i] })),
    } } };
}

test('card retains the main site artwork and wordmark in a compact centered masthead', async ({ page }) => {
  const inspect = () => page.locator('.brand__eyebrow').evaluate(wordmark => {
    const style = getComputedStyle(wordmark);
    return { text: wordmark.textContent, font: style.font, color: style.color, spacing: style.letterSpacing, transform: style.textTransform };
  });
  await page.goto('/');
  const site = await inspect();
  const image = await page.locator('.site-header .brand__logo').evaluate(img => new URL((img as HTMLImageElement).currentSrc).pathname);
  await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ json: payload() }));
  await page.goto(`/embed/routes/${slug}/`);
  await expect(page.locator('[data-score-value]')).toHaveText('76');
  expect(await inspect()).toEqual(site);
  expect(await page.locator('.embed-brand img').evaluate(img => new URL((img as HTMLImageElement).currentSrc).pathname)).toBe(image);
  await expect(page.locator('.embed-masthead .brand__title')).toHaveCount(0);
  for (const width of [420, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.locator('.embed-masthead').evaluate(header => {
      const h = header.getBoundingClientRect();
      const b = header.querySelector('.embed-brand')!.getBoundingClientRect();
      return { height: h.height, offset: Math.abs((h.left + h.width / 2) - (b.left + b.width / 2)) };
    });
    expect(dimensions.height).toBeLessThanOrEqual(60);
    expect(dimensions.offset).toBeLessThanOrEqual(1);
  }
});

test('builder configures a real iframe, copies portable code, and fits wide and narrow layouts', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  let readingRequests = 0;
  await page.route(`**/api/rivers/${slug}.json`, route => { readingRequests++; return route.fulfill({ json: payload() }); });
  await page.goto('/embed/');
  const card = page.frameLocator('#route-preview');
  await expect(card.locator('[data-reading-value]')).toHaveText('5.18');
  await expect(card.locator('[data-status-text]')).toHaveText('Latest reading');
  await expect(card.locator('[data-score-value]')).toHaveText('76');
  await expect(card.locator('[data-weather-temp]')).toHaveText('68°F');
  await expect(card.locator('[data-weather-wind]')).toHaveText('10 mph');
  await expect(card.locator('[data-weather-rain]')).toHaveText('20%');
  await expect(card.locator('[data-band-status]')).toHaveText('Below preferred range');
  await expect(card.locator('[data-water-band]')).toBeVisible();
  await expect(card.locator('[data-forecast-hours] li')).toHaveCount(8);
  await expect(card.locator('[data-conditions-date]')).toHaveText(/\w{3}, \w{3} \d{1,2}, \d{4}/);
  await expect(card.locator('[data-forecast-zone]')).toHaveText('River time · EDT');
  await expect(card.locator('[data-brand] picture source')).toHaveAttribute('srcset', '/brand/paddle-today-logo-180.webp');
  await card.locator('[data-history] summary').click();
  await expect(card.locator('[data-chart-region]')).toBeVisible();
  await card.locator('[data-history] summary').click();
  await expect(card.getByRole('heading', { name: 'Little Miami River' })).toBeVisible();
  await expect(card.locator('[data-change]')).toHaveText('+0.38 ft in 24h');
  await expect(card.locator('.embed-route-facts')).toContainText('About 1.5–3 hr');
  await page.locator('#advanced-settings summary').click();
  await page.getByLabel('Partner tag').fill('riverbend-campground');
  await page.getByText('Dark', { exact: true }).click();
  await expect(card.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect.poll(() => card.locator('.embed-photo').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expectPreviewFits(page);
  await card.locator('.route-embed').screenshot({ path: `output/route-embed-card-dark-${test.info().project.name}.png` });
  await page.getByLabel('Show Paddle Today credit').uncheck();
  await expect(card.locator('[data-brand]')).toBeHidden();
  await expect(card.getByRole('link', { name: 'Plan this paddle' })).toHaveAttribute('href', /utm_source=riverbend-campground/);
  await page.getByRole('button', { name: 'Copy embed code' }).click();
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toContain('https://paddletoday.com/embed/routes/');
  expect(clipboard).toContain('theme=dark&amp;branding=0&amp;partner=riverbend-campground');
  expect(clipboard).toContain('/embed.js');
  expect(readingRequests).toBe(1);
  const scenicHeight = await card.locator('.route-embed').evaluate(el => el.getBoundingClientRect().height);
  await page.getByText('Compact', { exact: true }).click();
  await expect(card.locator('html')).toHaveAttribute('data-layout', 'compact');
  await expect(card.locator('.embed-photo')).toBeHidden();
  expect(await card.locator('.route-embed').evaluate(el => el.getBoundingClientRect().height)).toBeLessThan(scenicHeight - 35);
  await expectPreviewFits(page);
  await card.locator('.route-embed').screenshot({ path: `output/route-embed-card-compact-${test.info().project.name}.png` });
  await expect(page.locator('#embed-code')).toHaveValue(/layout=compact/);
  await page.getByText('Scenic', { exact: true }).click();
  await page.getByText('Light', { exact: true }).click();
  await page.getByLabel('Show Paddle Today credit').check();
  await expect(card.locator('[data-brand]')).toBeVisible();
  await expect.poll(() => card.locator('.embed-photo').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.locator('#advanced-settings summary').click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expectPreviewFits(page);
  await card.locator('.route-embed').screenshot({ path: `output/route-embed-card-light-${test.info().project.name}.png` });
  await page.screenshot({ path: `output/route-embed-builder-${test.info().project.name}.png`, fullPage: true });
  await page.getByRole('button', { name: 'Narrow', exact: true }).click();
  await expectPreviewFits(page);
  expect(await card.locator('html').evaluate(el => el.scrollWidth <= innerWidth + 1)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.getByRole('button', { name: 'Change river route' }).click();
  await page.getByLabel('Find your river').fill('namekagon');
  await expect(page.locator('#route-count')).toContainText('matching routes');
  const next = await page.locator('#route-results button').first().getAttribute('data-route');
  await page.getByLabel('Find your river').press('ArrowDown');
  await expect(page.locator('#route-results button').first()).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#route-preview')).toHaveAttribute('src', new RegExp(`/embed/routes/${next}/`));
  await page.getByRole('button', { name: 'Change river route' }).click();
  await page.getByLabel('Find your river').fill('zzzz-no-such-river');
  await expect(page.locator('#route-count')).toContainText('No matching routes');
  await page.getByLabel('Find your river').press('Escape');
  await expect(page.getByRole('button', { name: 'Change river route' })).toBeFocused();
});

test('palette contrast, shared configuration and pasted route links work without extra gauge fetches', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  let requests = 0;
  await page.route(`**/api/rivers/${slug}.json`, route => { requests++; return route.fulfill({ json: payload() }); });
  await page.goto('/embed/');
  const frame = page.frameLocator('#route-preview');
  await expect(frame.locator('[data-reading-value]')).toHaveText('5.18');
  for (const theme of ['Light', 'Dark']) {
    await page.getByRole('radio', { name: theme, exact: true }).check();
    for (const accent of ['Forest', 'River', 'Clay']) {
      await page.getByRole('radio', { name: accent, exact: true }).check();
      await expect(frame.locator('html')).toHaveAttribute('data-accent', accent.toLowerCase());
      const contrast = await frame.locator('[data-plan-link]').evaluate(el => {
        const style = getComputedStyle(el);
        const luminance = (color: string) => {
          const rgb = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(v => v / 255)
            .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
          return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
        };
        const a = luminance(style.color), b = luminance(style.backgroundColor);
        return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      });
      expect(contrast).toBeGreaterThanOrEqual(4.5);
    }
  }
  expect(requests).toBe(1);
  await page.getByRole('button', { name: 'Copy configuration link' }).click();
  const link = await page.evaluate(() => navigator.clipboard.readText());
  expect(new URL(link).searchParams.get('accent')).toBe('clay');
  await page.goto(link);
  await expect(frame.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(frame.locator('html')).toHaveAttribute('data-accent', 'clay');
  await expect(page.getByRole('radio', { name: 'Clay', exact: true })).toBeChecked();
  await expectPreviewFits(page);
  await frame.locator('.route-embed').screenshot({ path: `output/route-embed-clay-${test.info().project.name}.png` });
  await page.getByRole('button', { name: 'Change river route' }).click();
  const routeLink = `https://paddletoday.com/rivers/${slug}/`;
  await page.getByLabel('Find your river').fill(routeLink);
  await expect(page.locator('#route-results button')).toHaveCount(1);
  await page.locator('#route-results button').click();
  await page.getByRole('button', { name: 'Change river route' }).click();
  await expect(page.getByLabel('Find your river')).toHaveValue(routeLink);
  await page.keyboard.press('Escape');
  const jump = page.getByRole('navigation', { name: 'Card builder steps' });
  if (await jump.isVisible()) {
    await jump.getByRole('link', { name: 'Preview', exact: true }).click();
    await expect(jump.getByRole('link', { name: 'Preview', exact: true })).toHaveAttribute('aria-current', 'step');
  }
  // Capture the entire standalone card; nested-frame screenshots can be clipped
  // by the parent viewport even after the frame has the correct content height.
  await page.goto(`/embed/routes/${slug}/?theme=dark&accent=clay`);
  await expect(page.locator('[data-reading-value]')).toHaveText('5.18');
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'clay');
  await page.locator('.route-embed').screenshot({ path: `output/route-embed-clay-full-${test.info().project.name}.png` });
});

test('card labels stale observations and keeps route access during an API outage', async ({ page }) => {
  const data = payload(); data.snapshotStatus = 'stale';
  await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ json: data }));
  await page.goto(`/embed/routes/${slug}/`);
  await expect(page.locator('[data-status-text]')).toHaveText('Older reading');
  await expect(page.locator('[data-trend-label]')).toHaveText('Last trend: Rising');
  await expect(page.locator('[data-score-value]')).toHaveText('—');
  await expect(page.locator('[data-weather-status]')).toHaveText('Older weather');
  await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ status: 503, json: {} }));
  await page.reload();
  await expect(page.locator('[data-status-text]')).toHaveText('Reading unavailable');
  await expect(page.locator('[data-chart-region]')).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Little Miami River' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Plan this paddle' })).toHaveAttribute('target', '_blank');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
});

test('an open card retains its dated reading and drops live status when refresh fails', async ({ page }) => {
  await page.clock.install();
  await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ json: payload() }));
  await page.goto(`/embed/routes/${slug}/`);
  await expect(page.locator('[data-status-text]')).toHaveText('Latest reading');
  await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ status: 503, json: {} }));
  await page.clock.fastForward(5 * 60_000 + 1);
  await expect(page.locator('[data-status-text]')).toHaveText('Refresh unavailable');
  await expect(page.locator('[data-reading-value]')).toHaveText('5.18');
  await expect(page.locator('[data-trend-label]')).toHaveText('Last trend: Rising');
  await expect(page.locator('[data-score-value]')).toHaveText('—');
});

test('a planning route includes weather without implying a calibrated gauge or score', async ({ page }) => {
  let requests = 0;
  const data = payload(); data.result.river.slug = 'namekagon-river-big-bend-trego'; data.result.river.scoreEligibility = 'planning';
  await page.route('**/api/**', route => { requests++; return route.fulfill({ json: data }); });
  await page.goto('/embed/routes/namekagon-river-big-bend-trego/');
  await expect(page.locator('[data-status-text]')).toHaveText('Planning route');
  await expect(page.locator('[data-reading-value]')).toHaveText('Trip guide');
  await expect(page.locator('[data-observed]')).toContainText('No calibrated gauge reading');
  await expect(page.getByRole('link', { name: 'Plan this paddle' })).toBeVisible();
  await expect(page.locator('[data-weather-temp]')).toHaveText('68°F');
  await expect(page.locator('[data-score-value]')).toHaveText('—');
  await expect(page.locator('[data-water-band]')).toBeHidden();
  expect(requests).toBe(1);
});

test('the standalone card shows high water, zero scores and minimum-only guidance honestly', async ({ page }) => {
  const data = payload();
  data.result.gauge.current = 10; data.result.gaugeBand = 'too-high';
  data.result.score = 0; data.result.rating = 'No-go'; data.result.readiness.status = 'skip';
  await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ json: data }));
  await page.goto(`/embed/routes/${slug}/?layout=compact`);
  await expect(page.locator('[data-score-value]')).toHaveText('0');
  await expect(page.locator('[data-score-label]')).toHaveText('Skip today');
  await expect(page.locator('[data-band-status]')).toHaveText('Too high');
  await expect(page.locator('[data-water-band]')).toHaveAttribute('data-tone', 'skip');
  data.result.gauge.current = 5.18; data.result.river.profile.thresholdModel = 'minimum-only';
  data.result.gaugeBand = 'minimum-met';
  await page.reload();
  await expect(page.locator('[data-band-high]')).toHaveText('Upper limit unknown');
  await expect(page.locator('[data-water-band]')).toHaveAttribute('aria-label', /No upper paddling limit established/);
  data.result.liveData.weather.state = 'unavailable'; data.result.liveData.overall = 'offline';
  await page.reload();
  await expect(page.locator('[data-weather-temp]')).toHaveText('—');
  await expect(page.locator('[data-score-value]')).toHaveText('—');
  await expect(page.locator('[data-score-label]')).toHaveText('Score unavailable');
});

test('the card keeps river-local dates across midnight and exposes all forecast hours at 320px', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, timezoneId: 'Asia/Tokyo', viewport: { width: 420, height: 900 } });
  try {
    const page = await context.newPage();
    const now = Date.parse('2026-10-22T03:30:00Z');
    const data = payload(now);
    data.result.weather.todayHourly.forEach(hour => { hour.isDaytime = false; });
    await page.clock.install({ time: new Date(now) });
    await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ json: data }));
    await page.goto(`/embed/routes/${slug}/`);
    await expect(page.locator('[data-conditions-date]')).toHaveText('Wed, Oct 21, 2026');
    await expect(page.locator('[data-forecast-dates]')).toHaveText('Oct 21 – Oct 22');
    await expect(page.locator('[data-forecast-hours] li')).toHaveCount(8);
    await expect(page.locator('[data-forecast-hours] time').nth(1)).toHaveText('Oct 22 · 12 AM');
    await expect(page.locator('[data-forecast-hours] [data-weather-icon]').first()).toHaveAttribute('data-weather-icon', 'night');
    await expect(page.locator('[data-observed]')).toHaveText('Observed 11:15 PM');
    for (const width of [420, 320]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.locator('.route-embed').evaluate(el => el.getBoundingClientRect().height)).toBeLessThan(840);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await page.locator('.embed-masthead').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      await page.locator('.route-embed').screenshot({ path: `output/route-embed-forecast-${width}-${test.info().project.name}.png` });
    }
    const forecast = page.locator('.embed-forecast-scroll');
    await expect(page.getByRole('button', { name: 'Earlier forecast hours' })).toBeDisabled();
    await page.getByRole('button', { name: 'Later forecast hours' }).click();
    await expect.poll(() => forecast.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
    await page.getByRole('button', { name: 'Earlier forecast hours' }).click();
    await expect.poll(() => forecast.evaluate(el => el.scrollLeft)).toBe(0);
    await forecast.focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => forecast.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  } finally {
    await context.close();
  }
});

test('actual cross-origin partner embed resizes and ignores untrusted resize messages', async ({ page, baseURL }) => {
  await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ json: payload() }));
  const server = createServer((_request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.end(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="background:#efe9de;margin:0;padding:20px"><h1>Riverbend Campground</h1><iframe data-paddletoday-route src="${baseURL}/embed/routes/${slug}/?partner=riverbend" title="Our river" width="100%" height="660" style="border:0;max-width:420px"></iframe><script src="${baseURL}/embed.js" defer></script></body></html>`);
  });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    await page.goto(`http://127.0.0.1:${(server.address() as AddressInfo).port}/`);
    const frame = page.frameLocator('iframe');
    await expect(frame.locator('[data-reading-value]')).toHaveText('5.18');
    const iframe = page.locator('iframe');
    await expect.poll(async () => iframe.evaluate(el => parseFloat((el as HTMLElement).style.height))).toBeGreaterThan(400);
    const height = await iframe.evaluate(el => (el as HTMLElement).style.height);
    await page.evaluate(() => window.postMessage({ type: 'paddletoday:embed:resize', height: 9999 }, '*'));
    await expect(iframe).toHaveCSS('height', height);
    await frame.getByText('About the photo').click();
    await expect.poll(async () => iframe.evaluate(el => parseFloat((el as HTMLElement).style.height))).toBeGreaterThan(parseFloat(height));
    await page.screenshot({ path: `output/route-embed-partner-${test.info().project.name}.png`, fullPage: true });
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
