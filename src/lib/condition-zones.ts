type ConditionZoneInput = {
  riverId?: string;
  name: string;
  gaugeSource: {
    provider: string;
    siteId: string;
    metric: string;
  };
  profile: {
    thresholdModel: string;
    idealMin?: number;
    idealMax?: number;
    tooLow?: number;
    tooHigh?: number;
    rainfallSensitivity: string;
    windSensitivity?: number;
    rainSensitivity?: number;
    tempSensitivity?: number;
    seasonMonths: number[];
  };
};

/**
 * Stable discovery key for routes that currently share the same water-
 * condition model. This is deliberately narrower than riverId: a long river
 * can have multiple gauges, threshold models, or hydrologic zones.
 */
export function conditionZoneIdForRiver(river: ConditionZoneInput) {
  const source = river.gaugeSource;
  const profile = river.profile;
  const riverKey = river.riverId || river.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const threshold = [
    profile.thresholdModel,
    profile.idealMin,
    profile.idealMax,
    profile.tooLow,
    profile.tooHigh,
    profile.rainfallSensitivity,
    profile.windSensitivity,
    profile.rainSensitivity,
    profile.tempSensitivity,
    profile.seasonMonths.join(','),
  ].map((value) => value ?? '').join(':');

  return `${riverKey}::${source.provider}:${source.siteId}:${source.metric}:${threshold}`;
}
