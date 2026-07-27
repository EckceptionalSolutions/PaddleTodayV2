import { describe, expect, it } from 'vitest';
import { assessUpstreamHealth, type UpstreamTelemetry } from './upstream-health';

function telemetry(overrides: Partial<UpstreamTelemetry> = {}): UpstreamTelemetry {
  return {
    since: '2026-07-27T00:00:00.000Z',
    requests: 100,
    successes: 95,
    failures: 5,
    failureRate: 0.05,
    attempts: 105,
    retries: 5,
    rateLimitedResponses: 0,
    serverErrorResponses: 0,
    timeouts: 0,
    providers: [
      {
        provider: 'waterservices.usgs.gov',
        requests: 100,
        successes: 95,
        failures: 5,
        failureRate: 0.05,
        attempts: 105,
        failedAttempts: 5,
        retries: 5,
        rateLimitedResponses: 0,
        serverErrorResponses: 0,
        timeouts: 0,
        consecutiveFailures: 0,
        averageDurationMs: 220,
        maxDurationMs: 900,
        lastAttemptAt: '2026-07-27T00:10:00.000Z',
        lastSuccessAt: '2026-07-27T00:10:00.000Z',
        lastFailureAt: '2026-07-27T00:09:00.000Z',
        lastFailureKind: 'network_error',
      },
    ],
    ...overrides,
  };
}

describe('upstream health assessment', () => {
  it('accepts a healthy scoring run', () => {
    expect(assessUpstreamHealth(telemetry())).toEqual({
      ok: true,
      issues: [],
      observedProviders: 1,
    });
  });

  it('rejects missing telemetry and broad failure spikes', () => {
    const missing = assessUpstreamHealth(telemetry({ requests: 0, providers: [] }));
    expect(missing.ok).toBe(false);
    expect(missing.issues).toContain('snapshot scoring produced no upstream telemetry');

    const failing = assessUpstreamHealth(telemetry({ failures: 40, failureRate: 0.4 }));
    expect(failing.ok).toBe(false);
    expect(failing.issues[0]).toContain('overall upstream failure rate');
  });

  it('rejects a failed provider even when aggregate fallback results look healthy', () => {
    const base = telemetry();
    const provider = {
      ...base.providers[0]!,
      failures: 9,
      successes: 1,
      requests: 10,
      failureRate: 0.9,
      consecutiveFailures: 9,
    };
    const assessment = assessUpstreamHealth(telemetry({ providers: [provider] }));

    expect(assessment.ok).toBe(false);
    expect(assessment.issues).toEqual([
      expect.stringContaining('failure rate'),
      expect.stringContaining('consecutive failures'),
    ]);
  });

  it('does not turn a tiny sample into an outage alert', () => {
    const base = telemetry();
    const provider = {
      ...base.providers[0]!,
      failures: 2,
      successes: 0,
      requests: 2,
      failureRate: 1,
      consecutiveFailures: 2,
    };

    expect(assessUpstreamHealth(telemetry({
      requests: 2,
      successes: 0,
      failures: 2,
      failureRate: 1,
      providers: [provider],
    })).ok).toBe(true);
  });
});
