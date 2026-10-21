import { describe, expect, it } from 'vitest';
import { waitForSnapshotExecution } from './snapshot-execution.mjs';
const name = 'snapshot-job-verification', image = 'example.azurecr.io/worker:' + 'a'.repeat(40);
describe('snapshot verification execution', () => {
  it('waits for the exact execution to succeed, including transient observation errors', async () => {
    let calls = 0, time = 0; const observed: string[] = [];
    const result = await waitForSnapshotExecution({ executionName: name, expectedImage: image, now: () => time, sleep: async (ms: number) => { time += ms; }, readExecution: async (handle: string) => {
      observed.push(handle); calls++; if (calls === 1) throw new Error('Transient observation timeout');
      return { name, images: [image], status: calls === 2 ? 'Running' : 'Succeeded' };
    } });
    expect(result.status).toBe('Succeeded'); expect(observed).toEqual([name, name, name]);
  });
  it.each([{ name, images: ['old-image'], status: 'Succeeded' }, { name: 'different-job', images: [image], status: 'Succeeded' }, { name, images: [], status: 'Succeeded' }, { name, images: [image], status: 'Failed' }])('rejects wrong identity or unsuccessful completion: %j', async result => {
    await expect(waitForSnapshotExecution({ executionName: name, expectedImage: image, readExecution: async () => result })).rejects.toThrow();
  });
  it('does not start another execution when observation expires', async () => {
    let time = 0, reads = 0;
    await expect(waitForSnapshotExecution({ executionName: name, expectedImage: image, timeoutMs: 1, now: () => time, sleep: async (ms: number) => { time += ms; }, readExecution: async () => { reads++; return { name, status: 'Running', images: [image] }; } })).rejects.toThrow('Inspect this execution');
    expect(reads).toBe(2);
  });
});
