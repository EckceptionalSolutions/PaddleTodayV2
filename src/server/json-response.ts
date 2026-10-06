import { gzip } from 'node:zlib';

const MAX_SERIALIZED_BYTES = 64 * 1024 * 1024;
const MAX_SERIALIZED_ENTRIES = 128;
const MAX_COMPRESSION_BYTES = 64 * 1024 * 1024;
const MAX_COMPRESSION_JOBS = 32;
const COMPRESSION_CONCURRENCY = 2;
const serialized = new Map<object, Buffer>();
let serializedBytes = 0;
let serializedHits = 0;
let serializedMisses = 0;

export type JsonResponseOptions = { immutableFields?: readonly string[] };

/** Opt in only for public values that remain immutable for this process. Metadata stays per request. */
export function serializeJsonResponse(payload: unknown, options: JsonResponseOptions = {}): Buffer {
  if (!options.immutableFields?.length || !payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return Buffer.from(JSON.stringify(payload));
  }
  const immutable = new Set(options.immutableFields);
  const parts: Buffer[] = [Buffer.from('{')];
  let included = false;
  for (const [key, value] of Object.entries(payload)) {
    let body: Buffer | undefined;
    if (immutable.has(key) && value !== null && typeof value === 'object') {
      body = serialized.get(value);
      if (body) {
        serializedHits++;
        serialized.delete(value);
        serialized.set(value, body);
      } else {
        serializedMisses++;
        const json = JSON.stringify(value);
        if (json !== undefined) {
          body = Buffer.from(json);
          if (body.length <= MAX_SERIALIZED_BYTES) {
            while (serialized.size >= MAX_SERIALIZED_ENTRIES || serializedBytes + body.length > MAX_SERIALIZED_BYTES) {
              const oldest = serialized.keys().next().value!;
              serializedBytes -= serialized.get(oldest)!.length;
              serialized.delete(oldest);
            }
            serialized.set(value, body);
            serializedBytes += body.length;
          }
        }
      }
    } else {
      const json = JSON.stringify(value);
      if (json !== undefined) body = Buffer.from(json);
    }
    if (body === undefined) continue;
    parts.push(Buffer.from(`${included ? ',' : ''}${JSON.stringify(key)}:`), body);
    included = true;
  }
  parts.push(Buffer.from('}'));
  return Buffer.concat(parts);
}

type CompressionJob = { body: Buffer; resolve: (value: Buffer | null) => void };

/** A shared queue bounds both zlib work and buffers retained by waiting responses. */
export class JsonCompressionQueue {
  private queue: CompressionJob[] = [];
  private active = 0;
  private retainedBytes = 0;
  private fallbackCount = 0;

  constructor(private concurrency = COMPRESSION_CONCURRENCY, private maxBytes = MAX_COMPRESSION_BYTES,
    private maxJobs = MAX_COMPRESSION_JOBS) {}

  compress(body: Buffer): Promise<Buffer | null> {
    if (this.retainedBytes + body.length > this.maxBytes || this.active + this.queue.length >= this.maxJobs) {
      this.fallbackCount++;
      return Promise.resolve(null);
    }
    this.retainedBytes += body.length;
    return new Promise(resolve => { this.queue.push({ body, resolve }); this.pump(); });
  }

  stats() { return { active: this.active, queued: this.queue.length, retainedBytes: this.retainedBytes, fallbacks: this.fallbackCount }; }

  private pump() {
    while (this.active < this.concurrency && this.queue.length) {
      const job = this.queue.shift()!;
      this.active++;
      // A moderate level reduces CPU work without the much larger payloads produced at level one.
      gzip(job.body, { level: 4 }, (error, result) => {
        this.active--;
        this.retainedBytes -= job.body.length;
        if (error) this.fallbackCount++;
        job.resolve(error ? null : result);
        this.pump();
      });
    }
  }
}

export const jsonCompression = new JsonCompressionQueue();
export function getJsonResponseStats() {
  return { serializedEntries: serialized.size, serializedBytes, serializedHits, serializedMisses, compression: jsonCompression.stats() };
}
