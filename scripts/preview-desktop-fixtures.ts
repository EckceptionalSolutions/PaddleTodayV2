import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { desktopBoardFixture, desktopWeekendFixture, type WeekendScenario } from '../tests/visual/desktop-board-fixtures';
import routeFixture from '../tests/mobile-web/fixtures/route-detail.json';

// Build first, then: npx tsx scripts/preview-desktop-fixtures.ts
// Visit /weekend/?fixture=fresh|cautious|stale|unavailable|empty|recovery.
// Add ?apiDelay=8000 to hold data, or set DESKTOP_FIXTURE_NAV_DELAY_MS=8000
// to hold Weekend document navigation. Delays are bounded to 30 seconds.
// DESKTOP_FIXTURE_API_DELAY_MS also covers private pages that omit Referer.
// Synthetic responses are confined to this loopback-only preview, never production.
const root = resolve('dist');
const port = Number(process.env.DESKTOP_FIXTURE_PORT ?? 4325);
const scenarios = new Set(['fresh', 'cautious', 'stale', 'unavailable', 'empty', 'recovery']);
const delayMs = (value: unknown) => Math.min(30000, Math.max(0, Number(value) || 0));
const pause = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
let recoveryRequests = 0;
const types: Record<string, string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://127.0.0.1:${port}`);
    const referer = new URL(req.headers.referer ?? url.href);
    const scenario = url.searchParams.get('fixture') ?? referer.searchParams.get('fixture') ?? 'fresh';
    if (!scenarios.has(scenario)) { res.writeHead(400).end('Unknown fixture'); return; }
    res.setHeader('Cache-Control', 'no-store');
    if (['/api/weekend/summary.json', '/api/rivers/summary.json', '/api/rivers/explore.json'].includes(url.pathname)) {
      await pause(delayMs(referer.searchParams.get('apiDelay') ?? process.env.DESKTOP_FIXTURE_API_DELAY_MS));
      const selected = scenario === 'recovery' ? (recoveryRequests++ === 0 ? 'stale' : 'fresh') : scenario;
      res.setHeader('Content-Type', 'application/json');
      const fixture = url.pathname.includes('/weekend/') ? desktopWeekendFixture : desktopBoardFixture;
      const payload = fixture(selected as WeekendScenario, new Date());
      res.writeHead(selected === 'unavailable' ? 503 : 200).end(JSON.stringify(
        selected === 'unavailable' ? { error: 'Synthetic unavailable fixture' }
          : { ...payload, ...(url.pathname.endsWith('/explore.json') ? { coverage: {
            catalogRevision: 'desktop-fixture', publicRoutes: payload.riverCount,
            scoredRoutes: payload.riverCount, planningRoutes: 0, missingScores: 0, missingScoreStates: [],
          } } : {}) }));
      return;
    }
    if (url.pathname === '/api/rivers/rice-creek-peltier-to-long-lake.json') {
      await pause(delayMs(referer.searchParams.get('apiDelay') ?? process.env.DESKTOP_FIXTURE_API_DELAY_MS));
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(scenario === 'unavailable' ? 503 : 200).end(JSON.stringify(
        scenario === 'unavailable' ? { error: 'Synthetic unavailable fixture' } : routeFixture));
      return;
    }
    if (url.pathname.startsWith('/api/')) { res.writeHead(503).end('{}'); return; }
    if (url.pathname === '/weekend/' && scenario === 'recovery') recoveryRequests = 0;
    let file = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    if (url.pathname === '/weekend/' && extname(file) === '.html') {
      await pause(delayMs(process.env.DESKTOP_FIXTURE_NAV_DELAY_MS));
    }
    res.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
    res.end(await readFile(file));
  } catch { res.writeHead(404).end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Desktop fixture preview: http://127.0.0.1:${port}/weekend/?fixture=fresh`));
