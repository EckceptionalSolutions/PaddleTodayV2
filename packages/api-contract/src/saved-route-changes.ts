import { routeHazardLabels, type RiverSummaryApiItem } from './index';

export interface SavedRouteSnapshot {
  generatedAt: string;
  score: number | null;
  gauge: { value: number; unit: string } | null;
  cautions: string[];
}
export type SavedRouteSnapshots = Record<string, { savedAt: string; snapshot: SavedRouteSnapshot }>;

export function savedRouteSnapshot(item: RiverSummaryApiItem): SavedRouteSnapshot | null {
  if (item.liveData?.overall !== 'live' || !Number.isFinite(Date.parse(item.generatedAt))) return null;
  const reading = item.summary?.gaugeNow?.trim().match(/^(-?\d[\d,]*(?:\.\d+)?)\s*(cfs|ft)$/i);
  const gauge = reading ? { value: Number(reading[1].replaceAll(',', '')), unit: reading[2].toLowerCase() } : null;
  const cautions: string[] = [];
  if (item.readiness && item.readiness.status !== 'ready' && item.readiness.reason) cautions.push(item.readiness.reason);
  for (const hazard of item.river.safetyProfile?.hazards ?? []) {
    if (routeHazardLabels[hazard]) cautions.push(routeHazardLabels[hazard]);
  }
  const score = item.readiness?.status !== 'withheld' && item.river.scoreEligibility !== 'planning' && Number.isFinite(item.score)
    ? item.score : null;
  return { generatedAt: item.generatedAt, score, gauge: gauge && Number.isFinite(gauge.value) ? gauge : null, cautions: [...new Set(cautions)] };
}

export function savedRouteChanges(previous: SavedRouteSnapshot | undefined, current: SavedRouteSnapshot | null): string[] {
  if (!previous || !current || Date.parse(current.generatedAt) <= Date.parse(previous.generatedAt)) return [];
  const changes: string[] = [];
  if (previous.score !== null && current.score !== null && previous.score !== current.score) {
    const delta = current.score - previous.score;
    changes.push(`Score ${delta > 0 ? '+' : ''}${delta} (${previous.score} → ${current.score})`);
  }
  if (previous.gauge && current.gauge && previous.gauge.unit === current.gauge.unit && current.gauge.value > previous.gauge.value) {
    changes.push(`Gauge higher: ${previous.gauge.value} → ${current.gauge.value} ${current.gauge.unit}`);
  }
  for (const caution of current.cautions) {
    if (!previous.cautions.includes(caution)) changes.push(`New caution: ${caution}`);
  }
  return changes;
}

export function parseSavedRouteSnapshots(raw: string | null): SavedRouteSnapshots {
  const result: SavedRouteSnapshots = Object.create(null);
  try {
    const parsed = JSON.parse(raw || 'null');
    if (parsed?.version !== 1 || !parsed.routes || typeof parsed.routes !== 'object') return result;
    for (const [slug, entry] of Object.entries(parsed.routes) as [string, any][]) {
      const snapshot = entry?.snapshot;
      if (typeof entry?.savedAt !== 'string' || !snapshot || !Number.isFinite(Date.parse(snapshot.generatedAt))) continue;
      if (snapshot.score !== null && (typeof snapshot.score !== 'number' || !Number.isFinite(snapshot.score))) continue;
      if (!Array.isArray(snapshot.cautions) || !snapshot.cautions.every((item: unknown) => typeof item === 'string')) continue;
      if (snapshot.gauge !== null && (!snapshot.gauge || typeof snapshot.gauge.value !== 'number' || !Number.isFinite(snapshot.gauge.value) || !['ft', 'cfs'].includes(snapshot.gauge.unit))) continue;
      result[slug] = entry;
    }
  } catch { /* A first visit or corrupt storage has no comparison baseline. */ }
  return result;
}

export function advanceSavedRouteSnapshot(snapshots: SavedRouteSnapshots, slug: string, savedAt: string, snapshot: SavedRouteSnapshot | null) {
  const previous = snapshots[slug];
  if (snapshot && (!previous || previous.savedAt !== savedAt || Date.parse(snapshot.generatedAt) > Date.parse(previous.snapshot.generatedAt))) {
    snapshots[slug] = { savedAt, snapshot };
  }
}
