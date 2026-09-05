import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { listRivers } from '../src/lib/rivers';

// Real MapLibre + real route metadata and geometry, with fixed scores for repeatability.
const template = await readFile('tmp-summary.json', 'utf8')
  .then((text) => JSON.parse(text.replace(/^\uFEFF/, '')).rivers[0])
  .catch(() => ({
    sources: [{ label: 'USGS', tone: 'usgs' }], confidence: { score: 86, label: 'High' },
    gaugeBandLabel: 'Ideal window', explanation: 'Repeatable map profile fixture.',
    liveData: { overall: 'live', gaugeState: 'live', weatherState: 'live' },
    summary: { cardText: 'Stable flow.', shortExplanation: 'Ideal level', confidenceText: 'High', freshnessText: 'Current' },
  }));
const routes = listRivers();
const payload = {
  requestId: 'explore-profile', generatedAt: new Date().toISOString(), riverCount: routes.length,
  rivers: routes.map((river, index) => ({ ...template, river, score: 80 + index % 15, rating: 'Strong' })),
};
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.routeWebSocket('**', (socket) => socket.close());
  await page.addInitScript('window.__name = (fn) => fn;');
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    (window as any).__longTasks = [];
    new PerformanceObserver((list) => {
      (window as any).__longTasks.push(...list.getEntries().map(({ startTime, duration }) => ({ startTime, duration })));
    }).observe({ type: 'longtask', buffered: true });
  });
  await page.route('**/api/rivers/summary.json*', (route) => route.fulfill({ json: payload }));
  await page.route('**/maplibre-gl.js', async (route) => {
    const response = await route.fetch();
    await route.fulfill({ response, body: `${await response.text()}
      window.__profileMaps = [];
      window.maplibregl.Map = new Proxy(window.maplibregl.Map, {
        construct(Target, args) { const map = new Target(...args); window.__profileMaps.push(map); return map; }
      });` });
  });
  await page.goto(process.env.PADDLETODAY_BASE_URL || 'http://127.0.0.1:4323/explore/', { waitUntil: 'domcontentloaded' });
  await page.locator('[data-explore-preset="all-routes"]').click();
  await page.waitForFunction(() => (window as any).__profileMaps?.[0]?.isStyleLoaded(), { timeout: 60000 });
  await page.waitForTimeout(3000);
  const session = await page.context().newCDPSession(page);
  await session.send('Profiler.enable');
  await session.send('Profiler.start');
  const samples = [];
  for (const [label, center, zoom] of [
    ['regional', [-93.5, 45.3], 6.5],
    ['local', [-93.5, 45.3], 9],
    ['pan', [-92.7, 45.6], 9],
    ['regional-return', [-93.5, 45.3], 6.5],
  ] as const) {
    samples.push(await page.evaluate(async ({ label, center, zoom }) => {
      const map = (window as any).__profileMaps[0];
      const frames: number[] = [];
      const start = performance.now();
      let previous = start;
      await new Promise<void>((resolve) => {
        function tick(now: number) {
          frames.push(now - previous);
          previous = now;
          if (now - start < 2000) requestAnimationFrame(tick);
          else resolve();
        }
        requestAnimationFrame(tick);
        map.easeTo({ center, zoom, duration: 800 });
      });
      frames.sort((a, b) => a - b);
      return {
        label, markers: map.getContainer().querySelectorAll('.maplibregl-marker').length,
        p95FrameMs: frames[Math.floor(frames.length * 0.95)], maxFrameMs: Math.max(...frames),
        longTasks: (window as any).__longTasks.filter((entry: any) => entry.startTime >= start),
      };
    }, { label, center, zoom }));
  }
  const { profile } = await session.send('Profiler.stop');
  const hits = new Map<number, number>();
  for (const id of profile.samples || []) hits.set(id, (hits.get(id) || 0) + 1);
  const functions = profile.nodes.map((node: any) => ({
    name: node.callFrame.functionName, url: node.callFrame.url.split('?')[0], hits: hits.get(node.id) || 0,
  })).filter((entry: any) => entry.hits).sort((a: any, b: any) => b.hits - a.hits).slice(0, 25);
  const geometry = await page.evaluate(() => performance.getEntriesByType('resource')
    .filter((entry) => entry.name.includes('/data/canonical-river-geometries') || entry.name.includes('/data/explore-map-overview.json'))
    .map((entry: any) => ({ path: new URL(entry.name).pathname, bytes: entry.decodedBodySize })));
  const mapElement = page.locator('[data-summary-map]');
  await mapElement.scrollIntoViewIfNeeded();
  const point = await page.evaluate(() => {
    const map = (window as any).__profileMaps[0];
    for (const feature of map.queryRenderedFeatures({ layers: ['explore-score-points'] })) {
      const point = map.project(feature.geometry.coordinates);
      if (point.x > 30 && point.y > 30 && point.x < map.getContainer().clientWidth - 30 && point.y < map.getContainer().clientHeight - 30) return point;
    }
    return null;
  });
  const box = await mapElement.boundingBox();
  if (!point || !box) throw new Error('No rendered score available for map-click verification');
  await page.mouse.click(box.x + point.x, box.y + point.y);
  await page.locator('.maplibregl-popup').waitFor({ state: 'visible', timeout: 5000 });
  const result = { routeCount: routes.length, samples, geometry, functions, mapClickVerified: true, errors };
  await page.locator('[data-summary-map]').screenshot({ path: (process.argv[2] || 'docs/audits/explore-map-profile.json').replace('.json', '.png') });
  await writeFile(process.argv[2] || 'docs/audits/explore-map-profile.json', JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ routeCount: routes.length, samples, geometryRequests: geometry.length,
    geometryBytes: geometry.reduce((sum, entry) => sum + entry.bytes, 0), functions: functions.slice(0, 8), errors }));
} finally {
  await browser.close();
}
