import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { routeInventory, rivers } from '../src/data/rivers';
import { unavailableGaugeKeys } from '../src/data/route-publication';
import {
  validateGaugeCoverageArtifacts,
  type GaugeInventoryArtifact,
  type GaugeInventoryEntry,
  type GaugeRelationship,
  type GaugeReviewEntry,
  type GaugeReviewLedgerArtifact,
  type GaugeReviewStatus,
} from '../src/lib/gauge-coverage';
import type { River, RiverGaugeSource } from '../src/lib/types';

type CanonicalStateRegistry = {
  canonicalStates: Array<{ id: string; name: string }>;
  aliases: Record<string, string>;
};

type SaturationAudit = {
  state?: string;
  liveGaugeCheck?: {
    checkedAt?: string;
    gauges?: Array<{
      siteId?: string;
      siteName?: string;
      provider?: 'usgs' | 'mn_dnr';
      observedAt?: string;
      dischargeCfs?: number;
      stageFt?: number;
      supportsRoutes?: string[];
    }>;
  };
};

const root = resolve(process.cwd());
const operationsDir = resolve(root, 'docs/operations');
const generatedAt = new Date().toISOString();
const stateRegistry = JSON.parse(await readFile(resolve(operationsDir, 'state-registry.json'), 'utf8')) as CanonicalStateRegistry;
const scoredSlugs = new Set(rivers.map((route) => route.slug));
const routesBySlug = new Map(routeInventory.map((route) => [route.slug, route]));
const inventoryByKey = new Map<string, GaugeInventoryEntry>();
const reviewsByKey = new Map<string, GaugeReviewEntry>();
const stateFips: Record<string, string> = {
  AR: '05', IL: '17', IN: '18', IA: '19', KS: '20', KY: '21', MI: '26', MN: '27',
  MO: '29', NE: '31', ND: '38', OH: '39', PA: '42', SD: '46', TN: '47', TX: '48',
  UT: '49', WI: '55',
};
const refreshProviders = process.argv.includes('--refresh-providers');
const existingArtifacts = await loadExistingArtifacts();
let statesBaselined = refreshProviders ? [] as string[] : existingArtifacts?.inventory.statesBaselined ?? [];

if (!refreshProviders && existingArtifacts) {
  for (const gauge of existingArtifacts.inventory.gauges.filter((entry) => entry.source === 'provider_inventory')) {
    mergeInventory(gauge);
    const review = existingArtifacts.ledger.reviews.find((candidate) => candidate.key === gauge.key);
    if (review) reviewsByKey.set(review.key, review);
  }
}

for (const route of routeInventory) {
  addRouteGauge(route, route.gaugeSource, false);
  for (const fallback of route.fallbackGaugeSources ?? []) addRouteGauge(route, fallback, true);
}

for (const filename of await readdir(operationsDir)) {
  if (!filename.endsWith('-saturation-audit.json')) continue;
  const audit = JSON.parse(await readFile(resolve(operationsDir, filename), 'utf8')) as SaturationAudit;
  const stateId = canonicalStateId(audit.state ?? '');
  for (const gauge of audit.liveGaugeCheck?.gauges ?? []) {
    if (!gauge.siteId || !stateId) continue;
    const provider = gauge.provider ?? 'usgs';
    const key = `${provider}:${gauge.siteId}`;
    mergeInventory({
      key,
      provider,
      siteId: gauge.siteId,
      siteName: gauge.siteName?.trim() || key,
      homeState: stateId,
      coverageStates: [stateId],
      availableMetrics: [
        ...(typeof gauge.dischargeCfs === 'number' ? ['discharge_cfs' as const] : []),
        ...(typeof gauge.stageFt === 'number' ? ['gage_height_ft' as const] : []),
      ],
      source: 'saturation_audit',
      lastObservationAt: gauge.observedAt,
    });

    const routeSlugs = (gauge.supportsRoutes ?? []).filter((slug) => routesBySlug.has(slug));
    const existing = reviewsByKey.get(key);
    if (!existing) {
      reviewsByKey.set(key, {
        key,
        status: 'researching',
        eligibility: routeSlugs.length > 0 ? 'route_capable' : 'unknown',
        relationship: relationshipForRoutes(key, routeSlugs),
        checkedAt: audit.liveGaugeCheck?.checkedAt ?? null,
        decisionReason: 'Live telemetry was checked in a state saturation audit, but no durable gauge disposition was recorded.',
        decisionSource: 'saturation_audit',
        routeSlugs,
        scoredRouteSlugs: routeSlugs.filter((slug) => scoredSlugs.has(slug)),
        routeFamilies: routeFamiliesForSlugs(routeSlugs),
        blockers: [],
        evidence: [`docs/operations/${filename}`],
      });
    } else {
      existing.checkedAt ??= audit.liveGaugeCheck?.checkedAt ?? null;
      existing.evidence = unique([...existing.evidence, `docs/operations/${filename}`]);
    }
  }
}

if (refreshProviders) {
  statesBaselined = await addProviderGaugeInventory();
}

const existingManualReviews = existingArtifacts?.ledger.reviews.filter((review) => (
  review.decisionSource === 'manual'
  || review.decisionSource === 'manual_gauge_review'
  || review.decisionSource === 'manual_route_worker_review'
)) ?? [];
for (const manual of existingManualReviews) {
  const derived = reviewsByKey.get(manual.key);
  if (!derived) continue;
  reviewsByKey.set(manual.key, {
    ...derived,
    ...manual,
    routeSlugs: derived.routeSlugs,
    scoredRouteSlugs: derived.scoredRouteSlugs,
    routeFamilies: derived.routeFamilies,
    evidence: unique([...derived.evidence, ...manual.evidence]),
  });
}

for (const key of inventoryByKey.keys()) {
  if (reviewsByKey.has(key)) continue;
  reviewsByKey.set(key, {
    key,
    status: 'unreviewed',
    eligibility: 'unknown',
    relationship: 'none',
    checkedAt: null,
    decisionReason: 'Gauge is known from route or audit evidence but has not been durably adjudicated.',
    decisionSource: 'derived_route_inventory',
    routeSlugs: [],
    scoredRouteSlugs: [],
    routeFamilies: [],
    blockers: [],
    evidence: [],
  });
}

const inventory: GaugeInventoryArtifact = {
  version: 1,
  inventoryId: refreshProviders
    ? `provider-baseline-${generatedAt.replace(/[^0-9]/g, '').slice(0, 12)}`
    : existingArtifacts?.inventory.inventoryId
      ?? `${statesBaselined.length > 0 ? 'provider-baseline' : 'known-evidence'}-${generatedAt.slice(0, 10)}`,
  generatedAt,
  scope: statesBaselined.length > 0 ? 'provider_baseline' : 'known_evidence_seed',
  statesBaselined,
  gauges: [...inventoryByKey.values()].sort((left, right) => left.key.localeCompare(right.key)),
};
const ledger: GaugeReviewLedgerArtifact = {
  version: 1,
  updatedAt: generatedAt,
  reviews: [...reviewsByKey.values()].sort((left, right) => left.key.localeCompare(right.key)),
};

const issues = validateGaugeCoverageArtifacts(inventory, ledger);
if (issues.length > 0) throw new Error(issues.join('\n'));

await mkdir(operationsDir, { recursive: true });
await writeFile(resolve(operationsDir, 'gauge-inventory.json'), `${JSON.stringify(inventory, null, 2)}\n`, 'utf8');
await writeFile(resolve(operationsDir, 'gauge-review-ledger.json'), `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({
  inventoryId: inventory.inventoryId,
  scope: inventory.scope,
  gauges: inventory.gauges.length,
  covered: ledger.reviews.filter((review) => review.status === 'covered').length,
  blocked: ledger.reviews.filter((review) => review.status === 'blocked').length,
  researching: ledger.reviews.filter((review) => review.status === 'researching').length,
  baselineCompleteStates: inventory.statesBaselined.length,
}, null, 2));

function addRouteGauge(route: River, source: RiverGaugeSource, fallback: boolean) {
  const stateId = canonicalStateId(route.state);
  const key = `${source.provider}:${source.siteId}`;
  mergeInventory({
    key,
    provider: source.provider,
    siteId: source.siteId,
    siteName: source.siteName,
    homeState: stateId,
    coverageStates: [stateId],
    availableMetrics: [source.metric],
    source: 'route_inventory',
  });

  const existing = reviewsByKey.get(key);
  const routeSlugs = unique([...(existing?.routeSlugs ?? []), route.slug]);
  const scoredRouteSlugs = routeSlugs.filter((slug) => scoredSlugs.has(slug) && isPrimaryDirectGauge(routesBySlug.get(slug), key));
  const relationships = new Set<GaugeRelationship>([
    ...(existing ? [existing.relationship] : []),
    fallback ? 'proxy' : source.kind,
  ]);
  relationships.delete('none');
  const relationship: GaugeRelationship = relationships.size > 1 ? 'mixed' : [...relationships][0] ?? 'none';
  const stale = unavailableGaugeKeys.has(key);
  const status: GaugeReviewStatus = scoredRouteSlugs.length > 0
    ? 'covered'
    : stale
      ? 'stale_or_unsupported'
      : fallback && !existing
        ? 'unreviewed'
        : 'blocked';
  const eligibility = fallback && !existing ? 'unknown' as const : 'route_capable' as const;

  reviewsByKey.set(key, {
    key,
    status: strongerStatus(existing?.status, status),
    eligibility: existing?.eligibility === 'route_capable' ? 'route_capable' : eligibility,
    relationship,
    checkedAt: existing?.checkedAt ?? (status === 'unreviewed' ? null : generatedAt),
    decisionReason: status === 'covered'
      ? 'At least one scored route uses this gauge directly.'
      : stale
        ? 'The gauge is explicitly recorded as stale, inapplicable, or unavailable to the product.'
        : fallback
          ? 'The gauge appears only as fallback or proxy evidence and needs a direct-corridor disposition.'
          : 'A route candidate references this gauge but does not clear scored-route publication.',
    decisionSource: 'derived_route_inventory',
    routeSlugs,
    scoredRouteSlugs,
    routeFamilies: routeFamiliesForSlugs(routeSlugs),
    blockers: status === 'blocked' ? [source.kind === 'proxy' || fallback ? 'proxy_only' : 'publication_gate'] : [],
    evidence: unique([...(existing?.evidence ?? []), routeSourcePath(route)]),
  });
}

function mergeInventory(entry: GaugeInventoryEntry) {
  const existing = inventoryByKey.get(entry.key);
  if (!existing) {
    inventoryByKey.set(entry.key, entry);
    return;
  }
  inventoryByKey.set(entry.key, {
    ...existing,
    homeState: entry.source === 'provider_inventory' ? entry.homeState : existing.homeState,
    siteName: existing.siteName || entry.siteName,
    coverageStates: unique([...existing.coverageStates, ...entry.coverageStates]),
    availableMetrics: unique([...existing.availableMetrics, ...entry.availableMetrics]),
    source: existing.source === 'provider_inventory' || entry.source === 'provider_inventory'
      ? 'provider_inventory'
      : existing.source === 'route_inventory' || entry.source === 'route_inventory'
        ? 'route_inventory'
        : 'saturation_audit',
    lastObservationAt: laterDate(existing.lastObservationAt, entry.lastObservationAt),
  });
}

function routeFamiliesForSlugs(slugs: string[]) {
  return unique(slugs.map((slug) => {
    const route = routesBySlug.get(slug);
    return route?.riverId ?? route?.name ?? slug;
  }));
}

function relationshipForRoutes(key: string, slugs: string[]): GaugeRelationship {
  const relationships = new Set(slugs.map((slug) => {
    const route = routesBySlug.get(slug);
    return isPrimaryDirectGauge(route, key) ? 'direct' : 'proxy';
  }));
  return relationships.size > 1 ? 'mixed' : [...relationships][0] ?? 'none';
}

function isPrimaryDirectGauge(route: River | undefined, key: string) {
  return Boolean(route && route.gaugeSource.kind === 'direct' && `${route.gaugeSource.provider}:${route.gaugeSource.siteId}` === key);
}

function strongerStatus(left: GaugeReviewStatus | undefined, right: GaugeReviewStatus) {
  const rank: Record<GaugeReviewStatus, number> = {
    unreviewed: 0,
    researching: 1,
    blocked: 2,
    stale_or_unsupported: 3,
    screened_out: 4,
    covered: 5,
  };
  return left && rank[left] > rank[right] ? left : right;
}

function canonicalStateId(value: string) {
  const normalized = value.trim();
  if (!normalized) return '';
  return stateRegistry.canonicalStates.some((state) => state.id === normalized)
    ? normalized
    : stateRegistry.aliases[normalized] ?? normalized.toUpperCase();
}

function routeSourcePath(route: River) {
  const stateId = canonicalStateId(route.state).toLowerCase();
  const names: Record<string, string> = { nd: 'north-dakota', sd: 'south-dakota' };
  return `src/data/routes/${names[stateId] ?? route.state.toLowerCase().replaceAll(' ', '-')}.ts`;
}

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function laterDate(left?: string, right?: string) {
  if (!left) return right;
  if (!right) return left;
  return Date.parse(left) >= Date.parse(right) ? left : right;
}

async function loadExistingArtifacts() {
  try {
    const inventory = JSON.parse(await readFile(resolve(operationsDir, 'gauge-inventory.json'), 'utf8')) as GaugeInventoryArtifact;
    const ledger = JSON.parse(await readFile(resolve(operationsDir, 'gauge-review-ledger.json'), 'utf8')) as GaugeReviewLedgerArtifact;
    return { inventory, ledger };
  } catch {
    return null;
  }
}

type OgcFeature = {
  properties?: {
    monitoring_location_id?: string;
    monitoring_location_number?: string;
    monitoring_location_name?: string;
    parameter_code?: string;
    time?: string;
  };
};

type OgcFeatureCollection = {
  features?: OgcFeature[];
  links?: Array<{ rel?: string; href?: string }>;
};

async function addProviderGaugeInventory() {
  const completedStates: string[] = [];
  for (const state of stateRegistry.canonicalStates) {
    const fips = stateFips[state.id];
    if (!fips) continue;
    const latestBySite = new Map<string, { metrics: Array<'discharge_cfs' | 'gage_height_ft'>; observedAt?: string }>();
    for (const [parameter, metric] of [['00060', 'discharge_cfs'], ['00065', 'gage_height_ft']] as const) {
      const url = new URL('https://api.waterdata.usgs.gov/ogcapi/v0/collections/latest-continuous/items');
      url.searchParams.set('f', 'json');
      url.searchParams.set('limit', '10000');
      url.searchParams.set('state_code', fips);
      url.searchParams.set('parameter_code', parameter);
      for (const feature of await fetchOgcFeatures(url.toString())) {
        const id = feature.properties?.monitoring_location_id?.replace(/^USGS-/, '');
        const observedAt = feature.properties?.time;
        if (!id || !isFreshObservation(observedAt)) continue;
        const existing = latestBySite.get(id) ?? { metrics: [] };
        existing.metrics = unique([...existing.metrics, metric]);
        existing.observedAt = laterDate(existing.observedAt, observedAt);
        latestBySite.set(id, existing);
      }
    }

    const locationsUrl = new URL('https://api.waterdata.usgs.gov/ogcapi/v0/collections/monitoring-locations/items');
    locationsUrl.searchParams.set('f', 'json');
    locationsUrl.searchParams.set('limit', '10000');
    locationsUrl.searchParams.set('state_code', fips);
    locationsUrl.searchParams.set('agency_code', 'USGS');
    locationsUrl.searchParams.set('site_type_code', 'ST');
    const locations = await fetchOgcFeatures(locationsUrl.toString());
    for (const feature of locations) {
      const siteId = feature.properties?.monitoring_location_number;
      const latest = siteId ? latestBySite.get(siteId) : null;
      if (!siteId || !latest) continue;
      mergeInventory({
        key: `usgs:${siteId}`,
        provider: 'usgs',
        siteId,
        siteName: feature.properties?.monitoring_location_name?.trim() || `USGS ${siteId}`,
        homeState: state.id,
        coverageStates: [state.id],
        availableMetrics: latest.metrics,
        source: 'provider_inventory',
        lastObservationAt: latest.observedAt,
      });
    }
    completedStates.push(state.id);
    console.log(`USGS provider baseline ${state.id}: ${latestBySite.size} fresh telemetry sites, ${locations.length} stream locations checked.`);
  }

  await addMnDnrProviderInventory();
  return completedStates;
}

async function addMnDnrProviderInventory() {
  const response = await fetch('https://maps.dnr.state.mn.us/pat/river_levels/lib/river_level_sites.json');
  if (!response.ok) throw new Error(`MN DNR inventory request failed: ${response.status}`);
  const data = await response.json() as {
    sites?: Array<{ id?: number; name?: string; variable?: number; tstamp?: string; age?: number }>;
  };
  for (const site of data.sites ?? []) {
    if (typeof site.id !== 'number' || !isFreshMnDnrSite(site)) continue;
    const metric = site.variable === 262 ? 'discharge_cfs' : site.variable === 232 ? 'gage_height_ft' : null;
    if (!metric) continue;
    mergeInventory({
      key: `mn_dnr:${site.id}`,
      provider: 'mn_dnr',
      siteId: String(site.id),
      siteName: site.name?.trim() || `MN DNR ${site.id}`,
      homeState: 'MN',
      coverageStates: ['MN'],
      availableMetrics: [metric],
      source: 'provider_inventory',
    });
  }
}

async function fetchOgcFeatures(initialUrl: string) {
  const features: OgcFeature[] = [];
  let url: string | undefined = initialUrl;
  while (url) {
    const response = await fetch(url, { headers: { Accept: 'application/geo+json, application/json' } });
    if (!response.ok) throw new Error(`USGS inventory request failed: ${response.status} ${url}`);
    const data = await response.json() as OgcFeatureCollection;
    features.push(...(data.features ?? []));
    url = data.links?.find((link) => link.rel === 'next')?.href;
  }
  return features;
}

function isFreshObservation(value?: string) {
  const timestamp = value ? Date.parse(value) : Number.NaN;
  return Number.isFinite(timestamp) && timestamp >= Date.now() - 30 * 24 * 60 * 60 * 1000;
}

function isFreshMnDnrSite(site: { tstamp?: string; age?: number }) {
  if (typeof site.age === 'number') return site.age <= 30 * 24;
  return Boolean(site.tstamp);
}
