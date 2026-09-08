import { hasValidLocationCoordinates, type StoredLocation } from './location';
import { isRecord } from './storage';

export function locationCandidates(payload: unknown): StoredLocation[] {
  if (!isRecord(payload) || !Array.isArray(payload.results)) return [];
  const candidates = payload.results.flatMap(value => {
    if (!isRecord(value) || typeof value.name !== 'string' || !value.name.trim()) return [];
    const coordinates = { latitude: value.latitude, longitude: value.longitude };
    if (!hasValidLocationCoordinates(coordinates)) return [];
    const region = typeof value.admin1 === 'string' ? value.admin1 : typeof value.country === 'string' ? value.country : '';
    return [{ ...coordinates,
      label: region ? `${value.name}, ${region}` : value.name,
      county: typeof value.admin2 === 'string' ? value.admin2 : '',
      population: typeof value.population === 'number' && Number.isFinite(value.population) ? value.population : 0 }];
  }).sort((a, b) => b.population - a.population);
  const seen = new Set<string>();
  return candidates.flatMap(candidate => {
    const key = `${candidate.latitude},${candidate.longitude}`;
    if (seen.has(key)) return [];
    seen.add(key);
    const duplicateName = candidates.some(other => other !== candidate && other.label === candidate.label
      && (other.latitude !== candidate.latitude || other.longitude !== candidate.longitude));
    const duplicateCounty = candidates.some(other => other !== candidate && other.label === candidate.label && other.county === candidate.county
      && (other.latitude !== candidate.latitude || other.longitude !== candidate.longitude));
    const qualifier = candidate.county && !duplicateCounty ? candidate.county : [candidate.county, key].filter(Boolean).join(' · ');
    const label = duplicateName ? `${candidate.label} · ${qualifier}` : candidate.label;
    return [{ latitude: candidate.latitude, longitude: candidate.longitude, label, source: 'search' as const }];
  });
}
