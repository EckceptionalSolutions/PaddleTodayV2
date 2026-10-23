import type { RiverScoreResult } from './types';

export function assertSnapshotQuality(results: Pick<RiverScoreResult, 'liveData'>[]) {
  if (results.length === 0) {
    throw new Error('Snapshot capture returned no river scores.');
  }

  const gaugeUsable = results.filter((result) => result.liveData.gauge.state !== 'unavailable').length;
  const weatherFresh = results.filter((result) => result.liveData.weather.state === 'live').length;
  const gaugeRatio = gaugeUsable / results.length;
  const weatherRatio = weatherFresh / results.length;

  console.log(
    `[snapshots] quality gauge=${gaugeUsable}/${results.length} (${percent(gaugeRatio)}) freshWeather=${weatherFresh}/${results.length} (${percent(weatherRatio)})`,
  );

  if (gaugeRatio < 0.75 || weatherRatio < 0.85) {
    throw new Error(
      `Snapshot quality gate failed: usable gauge ${percent(gaugeRatio)}, fresh weather ${percent(weatherRatio)}. Existing production snapshots were preserved.`,
    );
  }
}

function percent(value: number) {
  return `${Math.round(value * 1000) / 10}%`;
}
