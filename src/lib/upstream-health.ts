import type { getUpstreamTelemetry } from './http';

export type UpstreamTelemetry = ReturnType<typeof getUpstreamTelemetry>;

export interface UpstreamHealthThresholds {
  minimumOverallRequests: number;
  maximumOverallFailureRate: number;
  minimumProviderRequests: number;
  maximumProviderFailureRate: number;
  maximumProviderConsecutiveFailures: number;
  ignoredProviders?: string[];
}

export interface UpstreamHealthAssessment {
  ok: boolean;
  issues: string[];
  observedProviders: number;
}

export const DEFAULT_UPSTREAM_HEALTH_THRESHOLDS: UpstreamHealthThresholds = {
  minimumOverallRequests: 50,
  maximumOverallFailureRate: 0.35,
  minimumProviderRequests: 10,
  maximumProviderFailureRate: 0.75,
  maximumProviderConsecutiveFailures: 8,
};

export function assessUpstreamHealth(
  telemetry: UpstreamTelemetry,
  thresholds: UpstreamHealthThresholds = DEFAULT_UPSTREAM_HEALTH_THRESHOLDS,
): UpstreamHealthAssessment {
  const issues: string[] = [];

  if (telemetry.requests === 0 || telemetry.providers.length === 0) {
    issues.push('snapshot scoring produced no upstream telemetry');
  }

  if (
    telemetry.requests >= thresholds.minimumOverallRequests
    && telemetry.failureRate >= thresholds.maximumOverallFailureRate
  ) {
    issues.push(
      `overall upstream failure rate ${percent(telemetry.failureRate)} exceeds ${percent(thresholds.maximumOverallFailureRate)}`,
    );
  }

  for (const provider of telemetry.providers) {
    if (thresholds.ignoredProviders?.includes(provider.provider)) {
      continue;
    }

    if (
      provider.requests >= thresholds.minimumProviderRequests
      && provider.failureRate >= thresholds.maximumProviderFailureRate
    ) {
      issues.push(
        `${provider.provider} failure rate ${percent(provider.failureRate)} exceeds ${percent(thresholds.maximumProviderFailureRate)} across ${provider.requests} requests`,
      );
    }

    if (provider.consecutiveFailures >= thresholds.maximumProviderConsecutiveFailures) {
      issues.push(
        `${provider.provider} has ${provider.consecutiveFailures} consecutive failures`,
      );
    }
  }

  return {
    ok: issues.length === 0,
    issues,
    observedProviders: telemetry.providers.length,
  };
}

function percent(value: number) {
  return `${Math.round(value * 1000) / 10}%`;
}
