import { createHash } from 'node:crypto';
import type { River } from '../../src/lib/types';

export const factFields = ['identity', 'access', 'distance', 'difficulty', 'hazards', 'permits', 'seasonality', 'gauge'] as const;
export type FactField = typeof factFields[number];
export interface Review { route: string; field: FactField; fingerprint: string; reviewedAt: string; sourceUrl: string; note: string; verdict: 'supported' | 'conflict' }
export interface Ledger { version: 1; reviews: Review[] }
export interface Finding { id: string; routeId: string; check: string; severity: 'critical' | 'high' | 'medium' | 'low'; message: string; evidence?: string }
export function findingKind(finding: Finding): 'issues' | 'coverage' | 'information' {
  if (finding.severity === 'critical' || finding.severity === 'high') return 'issues';
  if (finding.check.startsWith('evidence:') || finding.check === 'data-deferred' || finding.check === 'source-links') return 'coverage';
  if (finding.check === 'data' && finding.evidence === 'missing-minimum') return 'coverage';
  if (finding.check === 'coordinates' && ['unknown','review'].includes(finding.evidence ?? '')) return 'coverage';
  return finding.severity === 'low' ? 'information' : 'issues';
}
export function factValue(route: River, field: FactField): unknown {
  switch (field) {
    case 'identity': return { name: route.name, reach: route.reach, state: route.state, region: route.region, routeType: route.routeType, aliases: route.aliases, summary: route.summary, statusText: route.statusText, tripSummary: route.logistics?.summary };
    case 'access': return { putIn: route.putIn, takeOut: route.takeOut, accessPoints: route.accessPoints, segmentEdges: route.segmentEdges, continuity: route.continuityStatus, caveats: route.logistics?.accessCaveats };
    case 'distance': return { distance: route.logistics?.distanceLabel, paddleTime: route.logistics?.estimatedPaddleTime, shuttle: route.logistics?.shuttle };
    case 'difficulty': return { difficulty: route.profile.difficulty, notes: route.profile.difficultyNotes };
    case 'hazards': return { safety: route.safetyProfile, watchFor: route.logistics?.watchFor };
    case 'permits': return { permits: route.logistics?.permits, camping: route.logistics?.camping };
    case 'seasonality': return { months: route.profile.seasonMonths, notes: route.profile.seasonNotes };
    case 'gauge': return { source: route.gaugeSource, fallbacks: route.fallbackGaugeSources, model: route.profile.thresholdModel, idealMin: route.profile.idealMin, idealMax: route.profile.idealMax, tooLow: route.profile.tooLow, tooHigh: route.profile.tooHigh, tooHighInclusive: route.profile.tooHighInclusive, thresholdSource: route.profile.thresholdSource, sourceStrength: route.profile.thresholdSourceStrength, confidenceNotes: route.profile.confidenceNotes, rainfallSensitivity: route.profile.rainfallSensitivity };
  }
}
export function fingerprint(route: River, field: FactField) { return createHash('sha256').update(JSON.stringify(factValue(route, field))).digest('hex'); }
export function isSourceUrl(value: string) { try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; } }
export function validateLedger(value: unknown): asserts value is Ledger {
  const ledger = value as Ledger;
  if (ledger?.version !== 1 || !Array.isArray(ledger.reviews)) throw new Error('Invalid route QA ledger.');
  for (const review of ledger.reviews) {
    if (!review || !factFields.includes(review.field) || typeof review.route !== 'string' || !review.route || !/^[a-f0-9]{64}$/.test(review.fingerprint) || !Number.isFinite(Date.parse(review.reviewedAt)) || !isSourceUrl(review.sourceUrl) || !review.note?.trim() || !['supported', 'conflict'].includes(review.verdict)) throw new Error('Invalid route QA review entry.');
  }
}
export function evidenceStatus(route: River, field: FactField, reviews: Review[], now: number) {
  const review = reviews.filter((item) => item.route === route.slug && item.field === field).sort((a, b) => Date.parse(b.reviewedAt) - Date.parse(a.reviewedAt))[0];
  if (!review) return { status: 'missing' as const };
  if (review.fingerprint !== fingerprint(route, field)) return { status: 'changed' as const, review };
  if (review.verdict === 'conflict') return { status: 'conflict' as const, review };
  const age = now - Date.parse(review.reviewedAt);
  if (age < 0 || age > 180 * 86400000) return { status: 'stale' as const, review };
  return { status: 'supported' as const, review };
}
export function makeFinding(routeId: string, check: string, severity: Finding['severity'], message: string, evidence?: string): Finding {
  return { id: createHash('sha256').update(JSON.stringify([routeId, check, message, evidence ?? ''])).digest('hex').slice(0, 24), routeId, check, severity, message, evidence };
}
export function compareFindings(current: Finding[], previous: Finding[], comparableRouteIds: Set<string>) {
  const before = new Set(previous.map((item) => item.id));
  const after = new Set(current.map((item) => item.id));
  return { new: current.filter((item) => !before.has(item.id)).map((item) => item.id), resolved: previous.filter((item) => comparableRouteIds.has(item.routeId) && !after.has(item.id)).map((item) => item.id), remaining: current.filter((item) => before.has(item.id)).map((item) => item.id) };
}
