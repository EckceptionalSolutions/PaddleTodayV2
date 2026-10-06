import { gunzipSync } from 'node:zlib';
import { describe, expect, it, vi } from 'vitest';
import { JsonCompressionQueue, serializeJsonResponse } from './json-response';

describe('reusable public JSON fields', () => {
  it('serializes immutable data once while keeping request IDs and freshness current', () => {
    const toJSON = vi.fn(() => [{ name: 'Rivière', score: 85 }]);
    const rivers = { toJSON };
    const first = { requestId: 'first', rivers, snapshotStatus: 'fresh', snapshotAgeSeconds: 12 };
    const second = { requestId: 'second', rivers, snapshotStatus: 'stale', snapshotAgeSeconds: 1801 };
    expect(JSON.parse(serializeJsonResponse(first, { immutableFields: ['rivers'] }).toString())).toEqual({ ...first, rivers: [{ name: 'Rivière', score: 85 }] });
    expect(JSON.parse(serializeJsonResponse(second, { immutableFields: ['rivers'] }).toString())).toEqual({ ...second, rivers: [{ name: 'Rivière', score: 85 }] });
    expect(toJSON).toHaveBeenCalledTimes(1);
    const replacement = [{ name: 'New generation', score: 40 }];
    expect(JSON.parse(serializeJsonResponse({ ...second, rivers: replacement }, { immutableFields: ['rivers'] }).toString()).rivers).toEqual(replacement);
  });

  it('does not cache ordinary mutable or account payloads', () => {
    const value = { notes: 'First' };
    serializeJsonResponse({ value });
    value.notes = 'Updated';
    expect(JSON.parse(serializeJsonResponse({ value }).toString()).value.notes).toBe('Updated');
  });

  it('preserves omission, escaping and unicode semantics for public fields', () => {
    const payload = { requestId: '"\\', absent: undefined, rivers: [null, 'é'], nothing: null };
    expect(serializeJsonResponse(payload, { immutableFields: ['rivers'] }).toString()).toBe(JSON.stringify(payload));
  });
});

describe('bounded asynchronous JSON compression', () => {
  it('limits jobs and retained bytes and releases capacity after completion', async () => {
    const queue = new JsonCompressionQueue(1, 12000, 2);
    const body = Buffer.from('paddle '.repeat(700));
    const first = queue.compress(body);
    const second = queue.compress(body);
    expect(queue.stats()).toMatchObject({ active: 1, queued: 1, retainedBytes: body.length * 2 });
    expect(await queue.compress(body)).toBeNull();
    for (const compressed of await Promise.all([first, second])) expect(gunzipSync(compressed!)).toEqual(body);
    expect(queue.stats()).toMatchObject({ active: 0, queued: 0, retainedBytes: 0, fallbacks: 1 });
    expect(await new JsonCompressionQueue(1, 10).compress(body)).toBeNull();
    expect(gunzipSync((await queue.compress(body))!)).toEqual(body);
  });
});
