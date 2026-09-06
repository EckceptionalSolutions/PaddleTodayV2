import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dependencyChecks } from './lib/environment.mjs';
import { apiHealth, isPortFree, isMatchingFrontend } from './lib/dev-services.mjs';

const checks = dependencyChecks();
checks.push({ name: 'Local configuration', status: 'ok', detail: existsSync('.env.local') || existsSync('.env') ? 'Environment file present. dev:all loads .env then .env.local; shell variables take precedence. Values are never printed.' : 'No environment file. Basic local browsing works with public providers; cloud writes and telemetry need separate configuration.' });
const api = await apiHealth(4322);
checks.push({ name: 'API :4322', status: api ? 'ok' : await isPortFree(4322) ? 'ok' : 'warn', detail: api ? 'PaddleToday API responds.' : await isPortFree(4322) ? 'Available for dev:all.' : 'Occupied by an unrecognized or unhealthy service; choose --api-port.' });
for (const port of [4321, 4323]) checks.push({ name: `Frontend :${port}`, status: 'ok', detail: await isPortFree(port) ? 'Port available.' : await isMatchingFrontend(port, api) ? 'Matching Astro frontend can be reused.' : 'Occupied; dev:all will leave it alone.' });
const gh = spawnSync('gh', ['auth', 'status'], { encoding: 'utf8', timeout: 15000, windowsHide: true });
checks.push({ name: 'GitHub', status: gh.status === 0 ? 'ok' : 'warn', detail: gh.status === 0 ? 'Authenticated gh CLI available.' : 'Run gh auth login for CI reporting; local development does not require it.' });
for (const check of checks) console.log(`${check.status.toUpperCase().padEnd(4)} ${check.name}: ${check.detail}`);
if (checks.some(check => check.status === 'fail')) process.exitCode = 1;
