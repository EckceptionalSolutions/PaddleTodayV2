import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLocationRequest } from './location-request';

afterEach(() => vi.useRealTimers());

describe('location request lifetime', () => {
  it('bounds an unresponsive native location provider', async () => {
    vi.useFakeTimers();
    const request = createLocationRequest(100);
    const result = expect(request.run(new Promise(() => {}))).rejects.toThrow('timed out');
    await vi.advanceTimersByTimeAsync(100);
    await result;
    expect(request.signal.aborted).toBe(true);
  });

  it('ignores a late reading after cancellation', async () => {
    let resolve!: (value: string) => void;
    const request = createLocationRequest();
    const result = request.run(new Promise<string>((done) => { resolve = done; }));
    request.cancel();
    resolve('old city');
    await expect(result).rejects.toThrow('cancelled');
  });

  it('observes late provider failures without an unhandled rejection', async () => {
    let reject!: (error: Error) => void;
    const request = createLocationRequest();
    request.cancel();
    await expect(request.run(new Promise((_, fail) => { reject = fail; }))).rejects.toThrow('cancelled');
    reject(new Error('Late native failure'));
    await Promise.resolve();
  });

  it('clears the deadline after a successful request', async () => {
    vi.useFakeTimers();
    const request = createLocationRequest(100);
    await expect(request.run(Promise.resolve('Duluth'))).resolves.toBe('Duluth');
    request.finish();
    await vi.advanceTimersByTimeAsync(100);
    expect(request.signal.aborted).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });
});
