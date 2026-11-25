import { createPaddleTodayApiClient } from '@paddletoday/api-client';
import { callStateForDecision, dayTripEndpoints, distanceMiles, fitsPaddleTimeLimit, hasDocumentedShuttleFreeReturn, plannerSlug, type PlannerExploration } from '@paddletoday/api-contract';
import { listRivers, getRiverBySlug } from '../lib/rivers';
import type { River } from '../lib/types';
import { minnesotaPaddleGuideEntries } from '../data/minnesota-paddle-guide';
import { priorityRouteGuides, priorityRiverGuides } from '../data/priority-paddle-guides';
import { routeGuideReviewByRiverId } from '../data/route-guide-publication-reviews';
import { getRouteGalleryPhotos, getRoutePreviewPhoto } from '../data/route-gallery';
import { accountSyncStorage } from '../lib/account-sync-storage';
import { tripStorage } from '../lib/trip-storage';

export const datasets = ['catalog', 'guide', 'discovery', 'today', 'conditions', 'weekend', 'gauge', 'history', 'group', 'geometry', 'cameras', 'community', 'photo'] as const;
export type Dataset = typeof datasets[number];
export type PlannerCard = PlannerExploration['routes'][number];
// The public API allows twelve seconds for live scoring when a snapshot is missing.
const routeApiTimeoutMs = 14_000;

// Use the same reach snapshot as the mobile route page, including its freshness metadata.
export function plannerConditions(port: number) {
  const client = createPaddleTodayApiClient({ baseUrl: 'http://127.0.0.1:' + port, timeoutMs: routeApiTimeoutMs });
  const cache = new Map<string, Promise<{ status: 'current' | 'stale' | 'unavailable'; noGo?: boolean; date?: string }>>();
  return (slug: string) => {
    const cached = cache.get(slug);
    if (cached) return cached;
    const request = client.getRiverDetail(slug).then(({ result, generatedAt, snapshotStatus }) => {
      if (result.river.slug !== slug || result.river.scoreEligibility === 'planning' || result.readiness?.status === 'withheld'
        || !Number.isFinite(Date.parse(generatedAt)) || !snapshotStatus) return { status: 'unavailable' } as const;
      return { status: snapshotStatus === 'stale' ? 'stale' as const : 'current' as const,
        noGo: result.rating === 'No-go' || result.readiness?.status === 'skip', date: generatedAt.slice(0, 10) };
    }).catch(() => ({ status: 'unavailable' } as const));
    cache.set(slug, request);
    return request;
  };
}

export async function plannerConditionsNote(routes: PlannerCard[], conditions: ReturnType<typeof plannerConditions>) {
  const groups = new Map<string, string[]>();
  const readings = await Promise.all(routes.map(route => conditions(route.slug)));
  for (const [i, reading] of readings.entries()) {
    const { name, reach } = routes[i];
    const label = routes.some((other, j) => j !== i && other.name === name) ? name + ' (' + reach + ')' : name;
    let warning: string;
    if (reading.status === 'current' && reading.noGo) warning = 'currently rated No-go';
    else if (reading.status === 'stale' && reading.noGo) warning = 'last rated No-go on ' + reading.date + ' (stale)';
    else if (reading.status !== 'current') warning = 'current conditions unverified';
    else continue;
    groups.set(warning, [...(groups.get(warning) ?? []), label]);
  }
  if (!groups.size) return '';
  return [...groups].map(([warning, names]) => names.join(' and ') + ': ' + warning + '.').join(' ') + ' Recheck conditions before launch.';
}

export function plannerCard(r: River): PlannerCard {
  const endpoints = dayTripEndpoints(r);
  return { slug: r.slug, name: r.name, reach: r.reach, area: [r.region, r.state].join(', '),
    ...(endpoints && { putInName: endpoints.putIn.name, takeOutName: endpoints.takeOut.name }),
    putIn: endpoints?.putIn.id ?? null, takeOut: endpoints?.takeOut.id ?? null };
}
export async function catalogSearch(args: Record<string, unknown>, seen: Map<string, PlannerCard>, port: number) {
  const { state, area, text, difficulty, shuttleFree, offset, period = 'catalog', maxHours = 0 } = args;
  if (![state, area, text].every(s => typeof s === 'string' && s.length <= 180)
    || !['any', 'easy', 'moderate', 'hard'].includes(String(difficulty)) || typeof shuttleFree !== 'boolean'
    || !['catalog', 'today', 'weekend'].includes(String(period)) || typeof maxHours !== 'number' || maxHours < 0 || maxHours > 48
    || typeof offset !== 'number' || !Number.isSafeInteger(offset) || offset < 0) throw new Error('Invalid catalog search');
  const normalize = (s: string) => s.trim().toLowerCase();
  const [stateName, region, term] = [String(state), String(area), String(text)].map(normalize);
  let matches = listRivers().filter(r => (!stateName || normalize(r.state) === stateName)
    && (!region || normalize(r.region).includes(region))
    && (!term || normalize([r.name, r.reach, r.slug, r.region, r.putIn?.name, r.takeOut?.name, ...(r.aliases ?? [])].join(' ')).includes(term))
    && (difficulty === 'any' || r.profile.difficulty === difficulty)
    && (!maxHours || fitsPaddleTimeLimit(r.logistics?.estimatedPaddleTime ?? '', maxHours))
    && (!shuttleFree || hasDocumentedShuttleFreeReturn(r.logistics?.shuttle)));
  const catalogTotal = matches.length;
  const calls = new Map<string, { rating: string; score: number; start?: string; end?: string }>();
  let generatedAt: string | undefined;
  if (period !== 'catalog' && catalogTotal) {
    const api = createPaddleTodayApiClient({ baseUrl: 'http://127.0.0.1:' + port, timeoutMs: routeApiTimeoutMs });
    const scope = stateName ? { state: matches[0].state } : {};
    try {
      const board = period === 'today' ? await api.getMobileSummary(scope) : await api.getMobileWeekend(scope);
      if (!board.generatedAt || !['live', 'fresh'].includes(board.snapshotStatus ?? '')) throw new Error('Missing current board');
      generatedAt = board.generatedAt;
      for (const row of board.rivers) {
        if ('weekend' in row) {
          const w = row.weekend;
          if (w.forecastStartDate && w.forecastEndDate && (w.rating === 'Good' || w.rating === 'Strong')) {
            calls.set(row.slug, { rating: w.rating, score: w.score, start: w.forecastStartDate, end: w.forecastEndDate });
          }
        } else if (callStateForDecision(row.rating, row.readiness?.status) === 'paddle') {
          calls.set(row.slug, { rating: row.rating, score: row.score });
        }
      }
    } catch {
      return { state, area, period, catalogTotal, unavailable: 'Current conditions unavailable. Use catalog search for planning.' };
    }
    matches = matches.filter(r => r.scoreEligibility !== 'planning' && calls.has(r.slug))
      .sort((a, b) => calls.get(b.slug)!.score - calls.get(a.slug)!.score);
  }
  const groups = new Map<string, { area: string; reaches: River[]; rivers: Set<string>; easy: number; whitewater: number; shuttleFree: number }>();
  for (const r of matches) {
    const key = stateName ? r.region : r.state;
    const g = groups.get(key) ?? { area: key, reaches: [], rivers: new Set<string>(), easy: 0, whitewater: 0, shuttleFree: 0 };
    g.reaches.push(r);
    g.rivers.add(r.riverId || r.name);
    if (r.profile.difficulty === 'easy') g.easy++;
    if (r.routeType === 'whitewater') g.whitewater++;
    if (hasDocumentedShuttleFreeReturn(r.logistics?.shuttle)) g.shuttleFree++;
    groups.set(key, g);
  }
  const areas = [...groups.values()].sort((a, b) => b.reaches.length - a.reaches.length || a.area.localeCompare(b.area));
  // Pair nearby launches rather than implying that two reaches anywhere in a region share a base.
  const mixedAreas = period === 'catalog' && stateName && !offset ? areas.flatMap(({ area, reaches }) => {
    const eligible = reaches.filter(r => r.continuityStatus !== 'condition-family' && r.putIn
      && Number.isFinite(r.putIn.latitude) && Number.isFinite(r.putIn.longitude));
    const relaxed = eligible.filter(r => r.profile.difficulty === 'easy' && r.routeType !== 'whitewater');
    const whitewater = eligible.filter(r => r.profile.difficulty !== 'easy' && r.routeType === 'whitewater');
    const pairs = relaxed.flatMap(a => whitewater.filter(b => b.name !== a.name).map(b => ({
      a, b, miles: distanceMiles(a.putIn!.latitude!, a.putIn!.longitude!, b.putIn!.latitude!, b.putIn!.longitude!),
    }))).filter(pair => pair.miles <= 30).sort((a, b) => a.miles - b.miles);
    return pairs.length ? [{ area, ...pairs[0] }] : [];
  }).slice(0, 3).map(({ area, a, b, miles }) => ({ area, straightLineMilesBetweenLaunches: Math.round(miles),
    options: [a, b].map(r => {
      seen.set(r.slug, plannerCard(r));
      return { slug: r.slug, name: r.name, reach: r.reach, difficulty: r.profile.difficulty, water: r.routeType,
        paddleTime: r.logistics?.estimatedPaddleTime };
    }) })) : [];
  // On an overview page show reaches from different areas. Keep condition-based pages in score order.
  if (period === 'catalog' && areas.length > 1) {
    matches = [];
    for (let i = 0; i < areas[0].reaches.length; i++) {
      for (const area of areas) if (area.reaches[i]) matches.push(area.reaches[i]);
    }
  }
  const routes = matches.slice(offset, offset + 8).map(r => {
    seen.set(r.slug, plannerCard(r));
    return { slug: r.slug, name: r.name, reach: r.reach, area: r.region, difficulty: r.profile.difficulty,
      duration: r.logistics?.estimatedPaddleTime, water: r.routeType ?? 'recreational', call: calls.get(r.slug) };
  });
  return { state: matches[0] && stateName ? matches[0].state : state, area, period, generatedAt, catalogTotal, total: matches.length,
    groups: areas.map(({ reaches, rivers, ...facts }) => ({ ...facts, routes: reaches.length, rivers: rivers.size })),
    routes, ...(mixedAreas.length && { mixedAreas }), nextOffset: offset + routes.length < matches.length ? offset + routes.length : null };
}

// The socket's listening port comes from Node. The model supplies only a catalog slug and an enumerated dataset.
export async function routeEvidence(port: number, slug: string, dataset: Dataset, days: number) {
  const r = plannerSlug(slug) && getRiverBySlug(slug);
  if (!r) return { unavailable: 'Unknown public route' };
  if (dataset === 'catalog') {
    return { name: r.name, reach: r.reach, summary: r.summary, state: r.state, region: r.region, profile: r.profile,
      logistics: r.logistics, safety: r.safetyProfile, access: r.accessPoints, putIn: r.putIn, takeOut: r.takeOut,
      segments: r.segmentEdges, continuity: r.continuityStatus, scoreEligibility: r.scoreEligibility,
      sourceLinks: r.sourceLinks, evidenceNotes: r.evidenceNotes, gauge: r.gaugeSource, statusText: r.statusText,
      latitude: r.latitude, longitude: r.longitude, routeType: r.routeType };
  }
  if (dataset === 'guide') return { reach: priorityRouteGuides[slug] ?? null,
    river: routeGuideReviewByRiverId.get(r.riverId ?? '')?.guide ?? priorityRiverGuides[r.riverId ?? ''] ?? null,
    editorial: minnesotaPaddleGuideEntries.filter(g => g.trackedSlug === slug) };
  if (dataset === 'photo') return { preview: getRoutePreviewPhoto(r), gallery: getRouteGalleryPhotos(r) };
  const baseUrl = 'http://127.0.0.1:' + port;
  const api = createPaddleTodayApiClient({ baseUrl, timeoutMs: routeApiTimeoutMs });
  switch (dataset) {
    case 'discovery': return api.getMobileExplore({ slugs: [slug] });
    case 'today': return api.getMobileSummary({ slugs: [slug] });
    case 'conditions': return api.getRiverDetail(slug);
    case 'weekend': return api.getMobileWeekend({ slugs: [slug] }).then(({ generatedAt, snapshotStatus, rivers }) => ({ generatedAt, snapshotStatus, rivers }));
    case 'gauge': return api.getRiverGaugeContext(slug);
    case 'history': return api.getRiverHistory(slug, { days: days || Number.MAX_SAFE_INTEGER });
    case 'group': return api.getRiverGroup(r.riverId || slug);
    case 'geometry': return api.getRiverGeometry(slug);
    case 'cameras': return api.getRiverCameras(slug);
    case 'community': return api.getRouteCommunity(slug);
  }
}

// Each page carries its parent record's timestamp/status, including when requesting a nested field.
export function evidencePage(raw: unknown, field: string, offset: number, size = 1400) {
  const root = raw as Record<string, unknown> | null;
  let value: unknown = raw;
  for (const key of field.split('.').filter(Boolean)) {
    if (!value || typeof value !== 'object' || !Object.hasOwn(value, key)) return { unavailable: 'Field unavailable' };
    value = (value as Record<string, unknown>)[key];
  }
  const content = JSON.stringify(value ?? null);
  const detail = root?.result as { readiness?: unknown; rating?: string; liveData?: { overall?: string } } | undefined;
  return { generatedAt: root?.generatedAt, snapshotStatus: root?.snapshotStatus, readiness: detail?.readiness,
    rating: detail?.rating, liveData: detail?.liveData?.overall, field,
    keys: value && typeof value === 'object' && !Array.isArray(value) ? Object.keys(value).slice(0, 60) : undefined,
    excerpt: content.slice(offset, offset + size), nextOffset: offset + size < content.length ? offset + size : null };
}

export async function accountEvidence(uid: string, kind: string, cursor: string) {
  const storage = accountSyncStorage();
  if (await storage.isDeleted(uid)) throw new Error('Account unavailable');
  if (kind === 'saved' || kind === 'drafts') {
    const { document } = await storage.read(uid);
    const rows = kind === 'saved' ? Object.values(document.routes).flatMap(r => r.value ? [{ slug: r.value.slug, name: r.value.name, reach: r.value.reach }] : [])
      : Object.values(document.drafts).flatMap(d => d.value ? [{ slug: d.value.target.routeSlug, target: d.value.target, launch: d.value.draft.launch }] : []);
    const start = /^\d+$/.test(cursor) ? Number(cursor) : 0;
    return { rows: rows.slice(start, start + 8), total: rows.length, nextCursor: start + 8 < rows.length ? String(start + 8) : null };
  }
  const page = await tripStorage().list(uid, cursor);
  const records = [
    ...page.trips.map(t => ({ key: 't:' + t.id, kind: 'trip', slug: t.route.slug, title: t.title, date: t.date, route: t.route, status: t.status })),
    ...page.logs.map(l => ({ key: 'l:' + l.id, kind: 'paddle log', slug: l.route.slug, route: l.route, date: l.date, paddleAgain: l.paddleAgain })),
  ].sort((a, b) => a.key < b.key ? -1 : 1);
  return { rows: records.slice(0, 8).map(({ key, ...details }) => details), nextCursor: records.length > 8 ? records[7].key : page.nextCursor };
}
