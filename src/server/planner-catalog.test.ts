import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, expect, it, vi } from 'vitest';
import { catalogSearch, datasets, evidencePage, plannerCard, plannerConditions, plannerConditionsNote, routeEvidence, type PlannerCard } from './planner-catalog';
import { readPlannerTool } from './planner-tools';
import { getRiverBySlug, listRivers } from '../lib/rivers';
import * as accountStore from '../lib/account-sync-storage';

const chippewa = 'chippewa-river-county-d-highway-8';
const base = { state: 'Wisconsin', area: '', text: '', difficulty: 'any', shuttleFree: false, offset: 0 };
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it('distinguishes fresh, stale and unavailable route calls and reuses overnight evidence in the final answer', async () => {
  const cards = [chippewa, 'black-river-cormican-irving', 'st-croix-river-gordon-dam-riverside'].map(slug => plannerCard(getRiverBySlug(slug)!));
  const fetch = vi.fn(async (url: URL) => {
    const index = cards.findIndex(card => url.pathname.endsWith('/' + card.slug + '.json'));
    if (index === 2) return new Response(null, { status: 503 });
    return Response.json({ result: { river: { slug: cards[index].slug }, rating: 'No-go' },
      generatedAt: '2026-11-25T12:00:00Z', snapshotStatus: index ? 'stale' : 'live' });
  });
  vi.stubGlobal('fetch', fetch);
  const conditions = plannerConditions(14322);
  await conditions(chippewa);
  const note = await plannerConditionsNote(cards, conditions);
  expect(note).toContain('Chippewa River: currently rated No-go.');
  expect(note).toContain('Black River: last rated No-go on 2026-11-25 (stale).');
  expect(note).toContain('St. Croix River: current conditions unverified.');
  expect(fetch).toHaveBeenCalledTimes(3);
});

it('uses only the public route API for dynamic data and preserves source timestamps for individual fields', async () => {
  const paths: string[] = [];
  const stamp = '2026-11-24T16:00:00Z';
  const server = createServer((req, res) => {
    paths.push(req.url!);
    expect(req.method).toBe('GET');
    expect(req.headers.authorization).toBeUndefined();
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ result: { weather: { wind: 7 }, readiness: { status: 'verify' } },
      generatedAt: stamp, snapshotStatus: 'stale', rivers: [], photos: [], reports: [] }));
  });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const port = (server.address() as AddressInfo).port;
    for (const source of datasets) expect(await routeEvidence(port, chippewa, source, 7)).toBeDefined();
    expect(paths.length).toBe(datasets.length - 3);
    expect(paths.every(p => p.startsWith('/api/') && !p.includes('/account'))).toBe(true);
    const result = await routeEvidence(port, chippewa, 'conditions', 7);
    expect(evidencePage(result, 'result.weather', 0)).toMatchObject({ excerpt: '{"wind":7}', generatedAt: stamp,
      snapshotStatus: 'stale', readiness: { status: 'verify' } });
    expect(await catalogSearch({ ...base, period: 'today' }, new Map(), port)).toHaveProperty('unavailable');
    const before = paths.length;
    expect(await routeEvidence(port, '../account', 'conditions', 7)).toHaveProperty('unavailable');
    expect(paths).toHaveLength(before);
  } finally {
    await new Promise<void>((resolve, reject) => server.close(err => err ? reject(err) : resolve()));
  }
});

it('ranks every eligible reach before paging and withholds stale or unfavorable calls', async () => {
  const routes = listRivers().filter(r => r.state === 'Wisconsin' && r.scoreEligibility !== 'planning');
  const beyondFirstPage = routes.at(-1)!;
  const seen = new Map<string, PlannerCard>();
  vi.stubGlobal('fetch', vi.fn(async () => Response.json({ generatedAt: '2026-11-24T12:00:00Z', snapshotStatus: 'fresh', rivers: [
    { slug: routes[0].slug, score: 99, rating: 'Strong', readiness: { status: 'withheld' } },
    { slug: routes[1].slug, score: 78, rating: 'Good', readiness: { status: 'ready' } },
    { slug: beyondFirstPage.slug, score: 90, rating: 'Strong', readiness: { status: 'ready' } },
  ] })));
  const result = await catalogSearch({ ...base, period: 'today' }, seen, 4322);
  expect(result.routes?.map(r => r.slug)).toEqual([beyondFirstPage.slug, routes[1].slug]);
  expect(seen.has(routes[0].slug)).toBe(false);
  expect(getRiverBySlug(chippewa)).toBeDefined();
  await expect(readPlannerTool('read_my_planning', { kind: 'saved', cursor: '', uid: 'client-supplied' }, seen, 4322)).rejects.toThrow();
});

it('reads saved route summaries for the verified owner and keeps private notes out of the evidence', async () => {
  const store = accountStore.accountSyncStorage();
  vi.spyOn(store, 'isDeleted').mockResolvedValue(false);
  const read = vi.spyOn(store, 'read').mockResolvedValue({ document: { routes: {
    [chippewa]: { value: { slug: chippewa, name: 'Chippewa River', reach: 'County D', notes: 'private note' } },
  } } } as Awaited<ReturnType<typeof store.read>>);
  const seen = new Map<string, PlannerCard>();
  const result = await readPlannerTool('read_my_planning', { kind: 'saved', cursor: '', uid: 'ignored' }, seen, 4322, 'verified-owner');
  expect(read).toHaveBeenCalledWith('verified-owner');
  expect(JSON.stringify(result)).not.toContain('private note');
  expect(seen.get(chippewa)?.putIn).toBe('chippewa-county-d');
});
