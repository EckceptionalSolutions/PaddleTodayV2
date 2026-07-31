import { execFile, spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';
import { rivers } from '../src/data/rivers';

const execFileAsync = promisify(execFile);
const root = process.cwd();
const controlDir = path.join(root, 'automations', 'route-control-plane');
const uiDir = path.join(controlDir, 'ui');
const port = Number(process.env.ROUTE_CONTROL_UI_PORT || 4399);
const host = '127.0.0.1';
const origin = `http://${host}:${port}`;
const actionToken = randomUUID();
const tsxCli = path.join(root, 'node_modules', 'tsx', 'dist', 'cli.mjs');
const runsDir = path.join(controlDir, 'runs');
const runnerPath = path.join(controlDir, 'runner', 'runner.py');
// pythonw keeps background Codex jobs from opening a Windows console window.
const runnerPython = path.join(controlDir, 'runner', '.venv', 'Scripts', 'pythonw.exe');

type JsonRecord = Record<string, unknown>;

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(filePath, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

async function readRuns() {
  try {
    const files = (await readdir(runsDir)).filter((file) => file.endsWith('.json'));
    const runs = await Promise.all(files.map((file) => readJson<JsonRecord | null>(path.join(runsDir, file), null)));
    return runs
      .filter((run): run is JsonRecord => Boolean(run))
      .sort((left, right) => String(right.requestedAt).localeCompare(String(left.requestedAt)));
  } catch {
    return [];
  }
}

async function runnerAvailable() {
  try {
    await Promise.all([stat(runnerPython), stat(runnerPath)]);
    return true;
  } catch {
    return false;
  }
}

async function readBody(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > 16_384) throw new Error('Request body is too large.');
    chunks.push(buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') as JsonRecord;
}

function json(response: ServerResponse, status: number, value: unknown) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(value));
}

function safeMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function runScript(script: string, ...args: string[]) {
  return execFileAsync(process.execPath, [tsxCli, script, ...args], {
    cwd: root,
    timeout: 120_000,
    windowsHide: true,
    maxBuffer: 2 * 1024 * 1024,
  });
}

async function runAction(action: 'plan' | 'claim') {
  await runScript(path.join('scripts', 'gather-route-leads.ts'));
  return runScript(path.join('scripts', 'route-control-plane.ts'), action);
}

async function statusPayload() {
  const [profiles, state, inbox, preview, current, queue, runs, isRunnerAvailable] = await Promise.all([
    readJson<JsonRecord>(path.join(controlDir, 'state-profiles.json'), {}),
    readJson<JsonRecord>(path.join(controlDir, 'state.json'), { claims: [] }),
    readJson<JsonRecord>(path.join(root, 'docs', 'route-lead-inbox.json'), { summary: {}, leads: [] }),
    readJson<JsonRecord | null>(path.join(controlDir, 'next-work-order-preview.json'), null),
    readJson<JsonRecord | null>(path.join(controlDir, 'current-work-order.json'), null),
    readJson<JsonRecord>(path.join(controlDir, 'execution-queue.json'), { requests: [] }),
    readRuns(),
    runnerAvailable(),
  ]);

  const profileStates = Array.isArray(profiles.states) ? profiles.states as JsonRecord[] : [];
  const leads = Array.isArray(inbox.leads) ? inbox.leads as JsonRecord[] : [];
  const claims = Array.isArray(state.claims) ? state.claims as JsonRecord[] : [];
  const stateMetrics = profileStates.map((profile) => {
    const stateName = String(profile.state);
    const stateCode = String(profile.code);
    const matchingLeads = leads.filter(
      (lead) => lead.state === stateName || String(lead.state).toUpperCase() === stateCode.toUpperCase(),
    );
    const stateRuns = runs.filter((run) => run.state === stateName);
    const activeRun = stateRuns.find((run) => ['queued', 'starting', 'running', 'cancelling'].includes(String(run.status)));
    const latestRun = stateRuns[0] ?? null;
    return {
      state: stateName,
      code: stateCode,
      difficulty: profile.difficulty,
      published: rivers.filter((route) => route.state === stateName).length,
      leads: matchingLeads.length,
      needsResearch: matchingLeads.filter((lead) => lead.lane !== 'implementation_ready').length,
      researched: matchingLeads.filter((lead) => Boolean(lead.lastReviewed) || Number(lead.reviewCount ?? 0) > 0).length,
      blocked: matchingLeads.filter((lead) => Boolean(lead.blocker)).length,
      ready: matchingLeads.filter((lead) => lead.lane === 'implementation_ready').length,
      activeClaim: claims.find((claim) => claim.state === stateName && claim.status === 'claimed') ?? null,
      activeRun,
      latestRun,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    profiles,
    state,
    inbox,
    preview,
    current,
    queue,
    stateMetrics,
    runs: runs.slice(0, 30),
    runner: {
      available: isRunnerAvailable,
      activeRun: runs.find((run) => ['queued', 'starting', 'running', 'cancelling'].includes(String(run.status))) ?? null,
    },
  };
}

function validActionRequest(request: IncomingMessage) {
  const requestOrigin = request.headers.origin;
  return (
    request.headers['x-route-control-token'] === actionToken &&
    (!requestOrigin || requestOrigin === origin)
  );
}

async function serveFile(response: ServerResponse, fileName: string, contentType: string) {
  const filePath = path.join(uiDir, fileName);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(uiDir))) {
    response.writeHead(404).end();
    return;
  }
  await stat(resolved);
  response.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
  });
  createReadStream(resolved).pipe(response);
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', origin);

    if (request.method === 'GET' && url.pathname === '/api/status') {
      json(response, 200, await statusPayload());
      return;
    }

    if (request.method === 'POST' && (url.pathname === '/api/plan' || url.pathname === '/api/claim')) {
      if (!validActionRequest(request)) {
        json(response, 403, { error: 'This action is not authorized for the current dashboard session.' });
        return;
      }
      const action = url.pathname === '/api/claim' ? 'claim' : 'plan';
      const result = await runAction(action);
      json(response, 200, {
        ok: true,
        action,
        output: result.stdout.trim(),
        status: await statusPayload(),
      });
      return;
    }

    if (request.method === 'POST' && url.pathname === '/api/run') {
      if (!validActionRequest(request)) {
        json(response, 403, { error: 'This action is not authorized for the current dashboard session.' });
        return;
      }
      if (!(await runnerAvailable())) {
        json(response, 503, { error: 'The local Codex runner is not available.' });
        return;
      }
      const body = await readBody(request);
      const stateName = String(body.state ?? '');
      const mode = String(body.mode ?? '');
      if (!stateName || !['research', 'implementation'].includes(mode)) {
        json(response, 400, { error: 'A valid state and work type are required.' });
        return;
      }
      const status = await statusPayload();
      const stateMetric = (status.stateMetrics as JsonRecord[]).find((metric) => metric.state === stateName);
      if (!stateMetric) {
        json(response, 404, { error: `Unknown state: ${stateName}` });
        return;
      }
      if (status.runner.activeRun) {
        json(response, 409, { error: 'Another route-control run is already active. Finish or cancel it first.' });
        return;
      }
      if (mode === 'implementation' && Number(stateMetric.ready) === 0) {
        json(response, 409, { error: `${stateName} has no implementation-ready routes.` });
        return;
      }

      const requestedAt = new Date().toISOString();
      const runId = `${String(stateMetric.code).toLowerCase()}-${mode}-${requestedAt.replace(/[-:.TZ]/g, '').slice(0, 14)}-${randomUUID().slice(0, 6)}`;
      const run = {
        version: 1,
        id: runId,
        state: stateName,
        stateCode: stateMetric.code,
        mode,
        status: 'queued',
        requestedAt,
        message: `Waiting to start ${mode} for ${stateName}.`,
      };
      await mkdir(runsDir, { recursive: true });
      await writeFile(path.join(runsDir, `${runId}.json`), `${JSON.stringify(run, null, 2)}\n`, 'utf8');
      const child = spawn(runnerPython, [runnerPath, '--run-id', runId, '--state', stateName, '--mode', mode], {
        cwd: root,
        detached: true,
        windowsHide: true,
        stdio: 'ignore',
      });
      child.unref();
      json(response, 202, { ok: true, run, status: await statusPayload() });
      return;
    }

    const cancelMatch = url.pathname.match(/^\/api\/runs\/([^/]+)\/cancel$/);
    if (request.method === 'POST' && cancelMatch) {
      if (!validActionRequest(request)) {
        json(response, 403, { error: 'This action is not authorized for the current dashboard session.' });
        return;
      }
      const runId = decodeURIComponent(cancelMatch[1]);
      const run = await readJson<JsonRecord | null>(path.join(runsDir, `${runId}.json`), null);
      if (!run) {
        json(response, 404, { error: 'Run not found.' });
        return;
      }
      if (!['queued', 'starting', 'running', 'cancelling'].includes(String(run.status))) {
        json(response, 409, { error: `Run is already ${run.status}.` });
        return;
      }
      await writeFile(path.join(runsDir, `${runId}.cancel`), `${new Date().toISOString()}\n`, 'utf8');
      json(response, 202, { ok: true, message: 'Cancellation requested.' });
      return;
    }

    if (request.method === 'GET' && url.pathname === '/ui.css') {
      await serveFile(response, 'ui.css', 'text/css; charset=utf-8');
      return;
    }

    if (request.method === 'GET' && url.pathname === '/ui.js') {
      await serveFile(response, 'ui.js', 'text/javascript; charset=utf-8');
      return;
    }

    if (request.method === 'GET' && url.pathname === '/') {
      const html = (await readFile(path.join(uiDir, 'index.html'), 'utf8'))
        .replaceAll('__ACTION_TOKEN__', actionToken);
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self'",
          "style-src 'self'",
          "img-src 'self' data:",
          "connect-src 'self'",
          "frame-ancestors 'none'",
          "base-uri 'none'",
          "form-action 'self'",
        ].join('; '),
      });
      response.end(html);
      return;
    }

    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  } catch (error) {
    json(response, 500, { error: safeMessage(error) });
  }
});

server.listen(port, host, () => {
  process.stdout.write(`Route control dashboard: ${origin}\n`);
});
