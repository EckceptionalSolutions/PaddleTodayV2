import { open, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

type RequestKind = 'research' | 'implementation';
type RequestStatus = 'queued' | 'running' | 'completed' | 'failed';

interface ExecutionRequest {
  id: string;
  kind: RequestKind;
  status: RequestStatus;
  requestedAt: string;
  startedAt?: string;
  finishedAt?: string;
  summary?: string;
}

interface ExecutionQueue {
  version: 1;
  updatedAt: string | null;
  requests: ExecutionRequest[];
}

const root = process.cwd();
const controlDir = path.join(root, 'automations', 'route-control-plane');
const queuePath = path.join(controlDir, 'execution-queue.json');
const lockPath = path.join(controlDir, '.queue-lock');

async function readQueue(): Promise<ExecutionQueue> {
  try {
    return JSON.parse(await readFile(queuePath, 'utf8')) as ExecutionQueue;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { version: 1, updatedAt: null, requests: [] };
    }
    throw error;
  }
}

async function writeQueue(queue: ExecutionQueue) {
  const temporaryPath = `${queuePath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, queuePath);
}

async function withLock<T>(operation: () => Promise<T>) {
  let handle;
  try {
    handle = await open(lockPath, 'wx');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
      throw new Error('The execution queue is already being updated. Retry in a moment.');
    }
    throw error;
  }
  try {
    return await operation();
  } finally {
    await handle.close();
    await rm(lockPath, { force: true });
  }
}

function requestId(kind: RequestKind, now: Date) {
  const stamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  return `${kind}-${stamp}-${process.pid}`;
}

export async function enqueue(kind: RequestKind) {
  return withLock(async () => {
    const queue = await readQueue();
    const duplicate = queue.requests.find((request) => request.kind === kind && request.status === 'queued');
    if (duplicate) return duplicate;

    const now = new Date();
    const request: ExecutionRequest = {
      id: requestId(kind, now),
      kind,
      status: 'queued',
      requestedAt: now.toISOString(),
    };
    queue.requests.push(request);
    queue.updatedAt = now.toISOString();
    await writeQueue(queue);
    return request;
  });
}

async function takeNext() {
  return withLock(async () => {
    const queue = await readQueue();
    if (queue.requests.some((entry) => entry.status === 'running')) {
      return null;
    }
    const request = queue.requests.find((entry) => entry.status === 'queued');
    if (!request) return null;
    request.status = 'running';
    request.startedAt = new Date().toISOString();
    queue.updatedAt = request.startedAt;
    await writeQueue(queue);
    return request;
  });
}

async function finish(id: string, status: 'completed' | 'failed', summary: string) {
  return withLock(async () => {
    const queue = await readQueue();
    const request = queue.requests.find((entry) => entry.id === id);
    if (!request) throw new Error(`Unknown execution request: ${id}`);
    request.status = status;
    request.finishedAt = new Date().toISOString();
    request.summary = summary;
    queue.updatedAt = request.finishedAt;
    await writeQueue(queue);
    return request;
  });
}

async function main() {
  const command = process.argv[2] ?? 'list';
  if (command === 'list') {
    process.stdout.write(`${JSON.stringify(await readQueue(), null, 2)}\n`);
    return;
  }
  if (command === 'enqueue') {
    const kind = process.argv[3] as RequestKind;
    if (!['research', 'implementation'].includes(kind)) {
      throw new Error('Usage: route-control-plane-queue.ts enqueue [research|implementation]');
    }
    process.stdout.write(`${JSON.stringify(await enqueue(kind))}\n`);
    return;
  }
  if (command === 'take') {
    process.stdout.write(`${JSON.stringify(await takeNext())}\n`);
    return;
  }
  if (command === 'complete' || command === 'fail') {
    const id = process.argv[3];
    if (!id) throw new Error(`Usage: route-control-plane-queue.ts ${command} <request-id> [summary]`);
    const summary = process.argv.slice(4).join(' ') || (command === 'complete' ? 'Completed.' : 'Failed.');
    process.stdout.write(`${JSON.stringify(await finish(id, command === 'complete' ? 'completed' : 'failed', summary))}\n`);
    return;
  }
  throw new Error('Usage: route-control-plane-queue.ts [list|enqueue|take|complete|fail]');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}

export type { ExecutionQueue, ExecutionRequest, RequestKind };
