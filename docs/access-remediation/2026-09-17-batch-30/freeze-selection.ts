import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { listRivers } from '../../../src/lib/rivers';

type Point = { latitude: number; longitude: number };
type Occurrence = { routeId: string; endpoint: 'putIn' | 'takeOut' | 'accessPoint'; endpointName: string; severity: string };
type QueueSite = Point & {
  state: string;
  name: string;
  distanceFeetToMappedWater: number;
  reasons: string[];
  occurrences: Occurrence[];
};
type ReviewedSite = { name: string; coordinates: Point[]; occurrences: Occurrence[] };

const root = process.cwd();
const batchDir = path.join(root, 'docs', 'access-remediation', '2026-09-17-batch-30');
const audit = JSON.parse(readFileSync(path.join(root, 'docs', 'access-point-quality-audit.json'), 'utf8')) as {
  generatedAt: string;
  auditScope: string;
  routeCount: number;
  endpointCount: number;
  accessReviewQueue: QueueSite[];
};
const publicIds = new Set(listRivers().map(route => route.id));
const prior: ReviewedSite[] = [];
const batchDirs = readdirSync(path.join(root, 'docs', 'access-remediation')).filter(name => name.includes('batch-'));
const controls = JSON.parse(readFileSync(path.join(root, 'src', 'data', 'route-access-official-map-controls.json'), 'utf8')) as {
  providers: Array<{ controls: Array<Point & { name: string; aliases?: string[] }> }>;
};

function closeFeet(a: Point, b: Point) {
  const northFeet = (a.latitude - b.latitude) * 364000;
  const eastFeet = (a.longitude - b.longitude) * 364000 * Math.cos(((a.latitude + b.latitude) / 2) * Math.PI / 180);
  return Math.hypot(northFeet, eastFeet);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function asPoint(value: unknown): Point | null {
  if (Array.isArray(value) && value.length >= 2 && Number.isFinite(value[0]) && Number.isFinite(value[1])) {
    return { latitude: Number(value[0]), longitude: Number(value[1]) };
  }
  if (value && typeof value === 'object') {
    const point = value as Partial<Point>;
    if (Number.isFinite(point.latitude) && Number.isFinite(point.longitude)) return { latitude: point.latitude!, longitude: point.longitude! };
  }
  return null;
}

for (const name of batchDirs) {
  const dir = path.join(root, 'docs', 'access-remediation', name);
  const selectionPath = path.join(dir, 'selection.json');
  if (!name.includes('batch-') || !(() => { try { readFileSync(selectionPath); return true; } catch { return false; } })()) continue;
  const selection = JSON.parse(readFileSync(selectionPath, 'utf8')) as { sites?: Array<Record<string, unknown>> } | Array<Record<string, unknown>>;
  const rawSites = (Array.isArray(selection) ? selection : selection.sites) ?? [];
  let review: unknown;
  try { review = JSON.parse(readFileSync(path.join(dir, 'review.json'), 'utf8')); } catch { continue; }
  const decisions = Array.isArray(review) ? review : (review as { decisions?: unknown[] }).decisions ?? [];
  for (const rawDecision of decisions) {
    if (!rawDecision || typeof rawDecision !== 'object') continue;
    const decision = rawDecision as Record<string, unknown> & { name?: string; site?: string; resolvedSiteName?: string; occurrences?: Occurrence[]; routeIds?: string[]; routes?: string[]; publicRoutes?: string[]; endpoint?: Occurrence['endpoint'] };
    const identity = decision.name ?? decision.site ?? decision.resolvedSiteName;
    const site = rawSites.map(raw => raw as Record<string, unknown> & { name?: string; previousCoordinate?: Point; coordinate?: Point; latitude?: number; longitude?: number; occurrences?: Occurrence[]; routeIds?: string[]; endpoint?: Occurrence['endpoint'] })
      .find(candidate => [candidate.name, candidate.name && decision.resolvedSiteName].includes(identity));
    const name = identity ?? site?.name;
    if (!name) continue;
    const coordinates = [
      asPoint(decision.updatedCoordinate), asPoint(decision.replacementCoordinate), asPoint(decision.coordinate),
      asPoint(site?.previousCoordinate), asPoint(site?.coordinate),
      Number.isFinite(site?.latitude) && Number.isFinite(site?.longitude) ? { latitude: site!.latitude!, longitude: site!.longitude! } : null,
    ].filter((point): point is Point => Boolean(point));
    const endpoint = decision.endpoint ?? site?.endpoint;
    const routeIds = [...(decision.routeIds ?? []), ...(decision.routes ?? []), ...(decision.publicRoutes ?? []), ...(site?.routeIds ?? [])];
    const occurrences = decision.occurrences ?? site?.occurrences ?? (endpoint
      ? [...new Set(routeIds)].map(routeId => ({ routeId, endpoint: endpoint as Occurrence['endpoint'], endpointName: name, severity: 'unknown' }))
      : []);
    prior.push({ name, coordinates, occurrences });
  }
}

const sourceCovered = (site: QueueSite) => controls.providers.some(provider => provider.controls.some(control =>
  [control.name, ...(control.aliases ?? [])].some(name => normalize(name) === normalize(site.name))
  && closeFeet(control, site) <= 40));
const unreviewed = audit.accessReviewQueue.map(site => ({
  ...site,
  occurrences: site.occurrences.filter(occurrence => publicIds.has(occurrence.routeId)),
})).filter(site => site.occurrences.length > 0)
  .filter(site => !sourceCovered(site))
  .filter(site => !prior.some(reviewed => {
    const occurrenceOverlap = reviewed.occurrences.some(oldOccurrence => site.occurrences.some(current => current.routeId === oldOccurrence.routeId && current.endpoint === oldOccurrence.endpoint));
    return occurrenceOverlap && (normalize(reviewed.name) === normalize(site.name) || reviewed.coordinates.some(coordinate => closeFeet(coordinate, site) <= 40));
  }));

const sites = unreviewed.slice(0, 10).map((site, index) => ({
  priority: index + 1,
  state: site.state,
  name: site.name,
  previousCoordinate: { latitude: site.latitude, longitude: site.longitude },
  distanceFeetToMappedWater: site.distanceFeetToMappedWater,
  reasons: site.reasons,
  occurrences: site.occurrences,
}));

const frozen = {
  batch: 30,
  frozenAt: new Date().toISOString(),
  auditGeneratedAt: audit.generatedAt,
  auditScope: audit.auditScope,
  publicRouteCount: listRivers().length,
  publicEndpointCount: audit.endpointCount,
  previouslyReviewedSiteCount: prior.length,
  queueSitesRemaining: unreviewed.length,
  selectionMethod: 'First ten distinct public physical sites in the current access-review queue after matching prior batches by normalized name or by shared route endpoint and a reviewed source coordinate within 40 feet. Frozen before source research; keep every current public occurrence for each selected site.',
  sites,
};
writeFileSync(path.join(batchDir, 'selection.json'), `${JSON.stringify(frozen, null, 2)}\n`);
console.log(JSON.stringify({ batch: frozen.batch, selected: sites.length, queueSitesRemaining: unreviewed.length, sites: sites.map(site => ({ priority: site.priority, name: site.name, distanceFeet: Math.round(site.distanceFeetToMappedWater), occurrences: site.occurrences.length })) }, null, 2));
