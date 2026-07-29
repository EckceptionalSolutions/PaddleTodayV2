import { execFile } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';
import { enqueue, type RequestKind } from './route-control-plane-queue';

const execFileAsync = promisify(execFile);
const root = process.cwd();
const controlDir = path.join(root, 'automations', 'route-control-plane');
const uiDir = path.join(controlDir, 'ui');
const port = Number(process.env.ROUTE_CONTROL_UI_PORT || 4399);
const host = '127.0.0.1';
const origin = `http://${host}:${port}`;
const actionToken = randomUUID();
const tsxCli = path.join(root, 'node_modules', 'tsx', 'dist', 'cli.mjs');

type JsonRecord = Record<string, unknown>;

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(filePath, 'utf8')) as T;
  } catch {
    return fallback;
  }
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
  const [profiles, state, inbox, preview, current, queue] = await Promise.all([
    readJson<JsonRecord>(path.join(controlDir, 'state-profiles.json'), {}),
    readJson<JsonRecord>(path.join(controlDir, 'state.json'), { claims: [] }),
    readJson<JsonRecord>(path.join(root, 'docs', 'route-lead-inbox.json'), { summary: {}, leads: [] }),
    readJson<JsonRecord | null>(path.join(controlDir, 'next-work-order-preview.json'), null),
    readJson<JsonRecord | null>(path.join(controlDir, 'current-work-order.json'), null),
    readJson<JsonRecord>(path.join(controlDir, 'execution-queue.json'), { requests: [] }),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    profiles,
    state,
    inbox,
    preview,
    current,
    queue,
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

    if (request.method === 'POST' && url.pathname.startsWith('/api/start/')) {
      if (!validActionRequest(request)) {
        json(response, 403, { error: 'This action is not authorized for the current dashboard session.' });
        return;
      }
      const kind = url.pathname.slice('/api/start/'.length) as RequestKind;
      if (!['research', 'implementation'].includes(kind)) {
        json(response, 400, { error: 'Unknown work type.' });
        return;
      }
      if (kind === 'implementation') {
        const status = await statusPayload();
        const summary = status.inbox.summary as JsonRecord | undefined;
        const byLane = summary?.byLane as JsonRecord | undefined;
        if (Number(byLane?.implementation_ready ?? 0) === 0) {
          json(response, 409, { error: 'No route is implementation-ready. Start research first.' });
          return;
        }
      }
      const queued = await enqueue(kind);
      json(response, 200, { ok: true, action: 'start', queued, status: await statusPayload() });
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
