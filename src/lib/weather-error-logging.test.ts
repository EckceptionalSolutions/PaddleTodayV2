import { afterEach, describe, expect, it, vi } from 'vitest';
import { createWeatherErrorReporter } from './weather-error-logging';

afterEach(() => { vi.useRealTimers(); });

describe('weather error log bounds', () => {
  it('reduces thousands of location failures to one sample per category and accurate summaries', () => {
    const write = vi.fn();
    const reporter = createWeatherErrorReporter({ write });
    const error = new Error('HTTP 403');
    for (let i = 0; i < 10_000; i++) {
      reporter.report('nws-fetch', `${i},-90`, error);
      reporter.report('unavailable', `${i},-90`);
    }
    expect(write).toHaveBeenCalledTimes(2);
    expect(write.mock.calls[0][1]).toBe('error');
    expect(write.mock.calls[1][1]).toBe('warn');
    reporter.flush();
    expect(write).toHaveBeenCalledTimes(3);
    const summary = JSON.parse(write.mock.calls[2][0].split('failure summary ')[1]);
    expect(summary.failures['nws-fetch']).toEqual({ count: 10_000, suppressed: 9999, reasons: { 'http-403': 10_000 } });
    expect(summary.failures.unavailable.count).toBe(10_000);
    reporter.flush();
    expect(write).toHaveBeenCalledTimes(3);
  });

  it('flushes without another failure and permits new samples in the next window', () => {
    vi.useFakeTimers();
    const write = vi.fn();
    const reporter = createWeatherErrorReporter({ write });
    reporter.report('noaa-precip', '44,-90', new Error('HTTP 503'));
    reporter.report('noaa-precip', '45,-90', new Error('HTTP 403'));
    vi.advanceTimersByTime(60_000);
    expect(write).toHaveBeenCalledTimes(2);
    expect(write.mock.calls[1][0]).toContain('"http-503":1,"http-403":1');
    reporter.report('noaa-precip', '45,-90', new Error('HTTP 503'));
    expect(write).toHaveBeenCalledTimes(3);
    reporter.flush();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('bounds samples and removes URLs, retaining a representative stack', () => {
    const write = vi.fn();
    const reporter = createWeatherErrorReporter({ write });
    const error = new Error(`HTTP 403 https://weather.test/?secret=value ${'x'.repeat(10_000)}`);
    error.stack = Array.from({ length: 1000 }, () => 'at weather.ts:10 ' + 'x'.repeat(300)).join('\n');
    reporter.report('nws-grid', '44,-90', error);
    const sample = JSON.parse(write.mock.calls[0][0].split('failure sample ')[1]);
    expect(sample.message).not.toContain('secret=value');
    expect(sample.message.length).toBeLessThanOrEqual(160);
    expect(sample.stack.length).toBeLessThanOrEqual(1600);
    expect(sample.stack).toContain('weather.ts:10');
    expect(write.mock.calls[0][0].split('\n')).toHaveLength(1);
    reporter.flush();
  });

  it('keeps provider categories independent and classifies unknown failures without message keys', () => {
    const write = vi.fn();
    const reporter = createWeatherErrorReporter({ write });
    reporter.report('nws-fetch', '44,-90', Object.assign(new Error('cancelled'), { name: 'AbortError' }));
    reporter.report('noaa-precip', '44,-90', 'unexpected');
    reporter.report('nws-grid', '44,-90', new Error('different error'));
    reporter.flush();
    expect(write).toHaveBeenCalledTimes(4);
    expect(write.mock.calls[3][0]).toContain('"timeout":1');
    expect(write.mock.calls[3][0]).toContain('"other-error":1');
  });

  it('bounds the reason vocabulary even when every HTTP status is observed', () => {
    const write = vi.fn();
    const reporter = createWeatherErrorReporter({ write });
    for (let status = 100; status < 600; status++) reporter.report('nws-fetch', String(status), new Error(`HTTP ${status}`));
    reporter.flush();
    const summary = JSON.parse(write.mock.calls[1][0].split('failure summary ')[1]);
    expect(summary.failures['nws-fetch'].count).toBe(500);
    expect(Object.keys(summary.failures['nws-fetch'].reasons).length).toBeLessThanOrEqual(12);
    expect(write.mock.calls[1][0].length).toBeLessThan(1000);
  });
});
