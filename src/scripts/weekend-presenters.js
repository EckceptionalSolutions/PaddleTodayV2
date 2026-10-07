import { SNAPSHOT_MAX_AGE_MS, snapshotFreshnessMetadata } from '@paddletoday/api-contract';

// Use the server's freshness policy for cached responses and open browser tabs.
// Display labels deliberately do not participate in date comparisons.
export function weekendOutlookAvailability(payload, now = Date.now()) {
  const fresh = snapshotFreshnessMetadata({ generatedAt: payload?.generatedAt ?? '' }, now);
  if (!fresh || !Array.isArray(payload?.rivers) || fresh.snapshotStatus === 'stale' || payload?.snapshotStatus === 'stale'
    || payload?.snapshotAgeSeconds > SNAPSHOT_MAX_AGE_MS / 1000) {
    return { available: false, rivers: [], expiresAt: null };
  }
  const today = new Date(now);
  const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const items = Array.isArray(payload?.rivers) ? payload.rivers : [];
  let expiresAt = Date.parse(payload.generatedAt) + SNAPSHOT_MAX_AGE_MS + 1;
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getTime();
  const rivers = items.filter(item => {
    const generatedAt = item?.generatedAt ?? payload.generatedAt;
    if (snapshotFreshnessMetadata({ generatedAt }, now)?.snapshotStatus !== 'fresh') return false;
    const endDate = item?.weekend?.forecastEndDate;
    if (endDate && (!/^\d{4}-\d{2}-\d{2}$/.test(endDate) || endDate < localDate)) return false;
    expiresAt = Math.min(expiresAt, Date.parse(generatedAt) + SNAPSHOT_MAX_AGE_MS + 1);
    if (endDate === localDate) expiresAt = Math.min(expiresAt, midnight);
    return true;
  });
  return { available: items.length === 0 || rivers.length > 0, rivers, expiresAt };
}

export function weekendWeatherVisualState(item) {
  const state = item?.liveData?.weatherState;
  if (state === 'stale' || state === 'unavailable') return 'unknown';
  const explanation = item?.weekend?.explanation || '';
  const signal = item?.weekend?.signalLine || '';
  // The explanation explicitly says whether a storm signal is present. Generic
  // mentions of rain/wind, or "No thunderstorm signal", are not hazard flags.
  const stormRisk = /\bstorm signal is present\b|\bthunderstorm risk (?:shows|is showing)\b/i.test(explanation);
  const rain = Number(signal.match(/Weekend rain:\s*(\d+)%/i)?.[1] ?? NaN);
  const wind = Number(signal.match(/Wind:\s*up to\s*(\d+)\s*mph/i)?.[1] ?? NaN);
  const temperatures = signal.match(/Temps?:\s*(-?\d+)°?\s*-\s*(-?\d+)°?F/i)
    || signal.match(/(?:High|Low):\s*(-?\d+)°?F/i);
  const temperature = temperatures ? Math.min(...temperatures.slice(1).map(Number)) : NaN;
  if (stormRisk) return 'storm';
  if (temperature <= 35) return 'cold';
  if (rain >= 40) return 'rain';
  if (temperature <= 40) return 'cold';
  if (wind >= 14) return 'wind';
  if (!Number.isFinite(rain) || !Number.isFinite(wind)) return 'unknown';
  return 'calm';
}
