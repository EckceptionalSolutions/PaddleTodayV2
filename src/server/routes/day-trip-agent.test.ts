import type { IncomingMessage, ServerResponse } from 'node:http';
import { Readable } from 'node:stream';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import type { DayTripTurn } from '@paddletoday/api-contract';
import { clearRateLimitState } from '../rate-limit';
import { handleDayTripAgent } from './day-trip-agent';
import { issuePlannerGuest, plannerStorage } from '../planner-usage';
import * as accountAuth from '../account-auth';
import { listRivers } from '../../lib/rivers';
import { overnightEvidence, searchOvernights } from '../planner-overnights';
import { explorationAnswer } from '../planner-tools';
import { plannerCard } from '../planner-catalog';
import { requestedPlannerDate } from '../planner-calendar';

const turn: DayTripTurn = { message: 'Our youngest is learning and we have just one vehicle Saturday.', weekday: 2,
  settings: { day: 'Today', hours: 5, driveMinutes: 60, noShuttle: false, easyOnly: false },
  originalRequest: null, shownMatches: [], question: null };
const settings = { ...turn.settings, easyOnly: true, day: 'Saturday' };
const call = (name: string, args: unknown) => ({ type: 'function_call', name, arguments: JSON.stringify(args) });
const travel = { ...turn, message: 'Compare Wisconsin with Minnesota for next summer.',
  exploration: { today: '2026-11-24', exchanges: [], preferences: '', includeAccount: false } };
const scope = (state: string) => ({ state, area: '', text: '', difficulty: 'any', shuttleFree: false, maxHours: 0, period: 'catalog', offset: 0 });
const chippewa = 'chippewa-river-county-d-highway-8';

it('creates cards in advice order and omits retrieved reaches absent from the answer', () => {
  const cards = [chippewa, 'st-croix-river-gordon-dam-riverside', 'black-river-cormican-irving']
    .map(slug => plannerCard(listRivers().find(r => r.slug === slug)!));
  const seen = new Map(cards.map(card => [card.slug, card]));
  const [, primary, alternate] = cards;
  const result = explorationAnswer({
    answer: 'Try [[' + primary.slug + ']]. Choose [[' + alternate.slug + ']] for a shorter trip than [[' + primary.slug + ']].',
    review: [{ slug: chippewa, reason: 'Missing a campsite.' }],
  }, seen, travel.message, travel.exploration);
  expect(result.answer).toBe('Try St. Croix River. Choose Black River for a shorter trip than St. Croix River.');
  expect(result.routes).toEqual([primary, alternate]);
  expect(result.reviewRoutes).toBeUndefined();
});

it('uses the paddler calendar for the draft and makes an unverified route inspectable only', () => {
  const card = plannerCard(listRivers().find(r => r.slug === chippewa)!);
  const result = explorationAnswer({ answer: 'Wait for fresh conditions on [[' + chippewa + ']].', requestedDateText: 'this Saturday',
    date: '2026-08-01', slugs: [chippewa], review: [{ slug: chippewa, reason: 'The forecast is stale.' }] },
    new Map([[chippewa, card]]), 'Would you launch this Saturday?', { ...travel.exploration, today: '2026-11-25' });
  expect(result).toMatchObject({ date: '2026-11-28', routes: [], reviewRoutes: [{ slug: chippewa, reason: 'The forecast is stale.' }] });
  expect(requestedPlannerDate('June', 'Maybe June?', '2026-11-25')).toBeNull();
  expect(requestedPlannerDate('Saturday', 'No idea yet', '2026-11-25')).toBeNull();
  expect(requestedPlannerDate('tomorrow', 'Go tomorrow', '2026-12-31')).toBe('2027-01-01');
  expect(requestedPlannerDate('September 1', 'On September 1', '2026-11-25')).toBe('2027-09-01');
  expect(requestedPlannerDate('February 30', 'February 30', '2026-11-25')).toBeNull();
  expect(requestedPlannerDate('Saturday', 'Saturday or Sunday?', '2026-11-25')).toBeNull();
  expect(requestedPlannerDate('November 28', 'November 28, 2027', '2026-11-25')).toBeNull();
  expect(requestedPlannerDate('Saturday', 'That forecast was last Saturday.', '2026-11-25')).toBeNull();
});
const campingQuery = { originCity: 'Minneapolis', destinationState: '', maxDriveMinutes: 240 };
const minneapolis = { name: 'Minneapolis', admin1: 'Minnesota', country_code: 'US', latitude: 44.97997, longitude: -93.26384, population: 410939 };

function provider(output: unknown[], status = 'completed') {
  vi.stubEnv('OPENAI_API_KEY', 'test-only');
  const upstream = vi.fn(async (_url: string, _init: RequestInit) => Response.json({ status, output }));
  vi.stubGlobal('fetch', upstream);
  return upstream;
}

let guest: string;
let directory: string;
beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), 'day-trip-agent-'));
  vi.stubEnv('PADDLETODAY_PLANNER_GUEST_SECRET', 'test-only-guest-key');
  vi.stubEnv('PADDLETODAY_PLANNER_CONTAINER_SAS_URL', '');
  vi.stubEnv('ACCOUNT_DATA_CONTAINER_SAS_URL', '');
  vi.stubEnv('PADDLETODAY_PLANNER_LOCAL_DIR', directory);
  guest = issuePlannerGuest();
});
async function post(body: unknown, headers: Record<string, string> = { 'x-planner-guest': guest }) {
  const stream = Object.assign(Readable.from([JSON.stringify(body)]), { headers, socket: { remoteAddress: 'test' } });
  const response = { writeHead: vi.fn(), end: vi.fn() };
  await handleDayTripAgent(stream as unknown as IncomingMessage, response as unknown as ServerResponse, 'test', true);
  return { status: response.writeHead.mock.calls[0][0], body: JSON.parse(response.end.mock.calls[0][0].toString()) };
}
afterEach(async () => {
  vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); clearRateLimitState();
  await rm(directory, { recursive: true, force: true });
});

it.skipIf(process.env.PADDLETODAY_TEST_LIVE_PLANNER !== '1')('interprets a free-form request and its shuttle follow-up with the configured model', async () => {
  // Live requests must debit the operator's configured planner ledger.
  vi.unstubAllEnvs();
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('Set OPENAI_API_KEY on the API process to run the live planner test.');
  guest = issuePlannerGuest();
  const initial = (await post(turn)).body.action;
  expect(initial).toMatchObject({ settings: { day: 'Saturday', easyOnly: true }, question: 'shuttle' });
  const followUp = (await post({ ...turn, ...initial, originalRequest: turn.message,
    message: 'A friend can fetch the truck at the take-out. We have at most three hours on the water.' })).body.action;
  expect(followUp).toMatchObject({ question: null, settings: { day: 'Saturday', easyOnly: true, noShuttle: false, hours: 3 } });
}, 30_000);

it('asks a typed clarification and discloses only planning context to the provider', async () => {
  const upstream = provider([call('clarify_day_trip', { question: 'shuttle', settings })]);
  expect(await post({ ...turn, latitude: 45, tripNotes: 'private-marker' })).toMatchObject({
    status: 200, body: { action: { settings, question: 'shuttle' } },
  });
  const [url, init] = upstream.mock.calls[0];
  expect(url).toBe('https://api.openai.com/v1/responses');
  expect(JSON.parse(String(init.body))).toMatchObject({ tool_choice: 'required', store: false });
  expect(JSON.parse(JSON.parse(String(init.body)).input)).toEqual(turn);
});

it('searches complete states, compares route evidence and returns only catalog-backed draft targets', async () => {
  const upstream = provider([]);
  upstream.mockImplementation(async (_url, init) => {
    const input = JSON.parse(JSON.parse(String(init.body)).input);
    const observations = input.observations;
    expect(input.exploration.homePicks).toEqual([chippewa, 'namekagon-river-big-bend-trego']);
    if (!observations.length) return Response.json({ status: 'completed', output: [call('search_catalog', { searches: [scope('Wisconsin'), scope('Minnesota')] })] });
    if (observations.length === 1) {
      for (const row of observations[0].result) {
        expect(row.total).toBe(listRivers().filter(r => r.state === row.state).length);
        expect(row.groups.reduce((n: number, g: { routes: number }) => n + g.routes, 0)).toBe(row.total);
        expect(row.nextOffset).toBeGreaterThan(3);
        if (row.state === 'Wisconsin') {
          expect(row.mixedAreas.length).toBeGreaterThanOrEqual(2);
          for (const pair of row.mixedAreas) {
            expect(pair.straightLineMilesBetweenLaunches).toBeLessThanOrEqual(30);
            expect(pair.options[0].difficulty).toBe('easy');
            expect(pair.options[1].water).toBe('whitewater');
            expect(pair.options[0].name).not.toBe(pair.options[1].name);
          }
        }
      }
      return Response.json({ status: 'completed', output: [call('read_routes', { reads: [chippewa, 'namekagon-river-big-bend-trego'].map(slug =>
        ({ slug, dataset: 'catalog', field: 'logistics', offset: 0, days: 7 })) })] });
    }
    expect(observations[1].result).toHaveLength(2);
    expect(observations[1].result[0].excerpt).toContain('shuttle');
    return Response.json({ status: 'completed', output: [call('present_exploration', {
      answer: 'Compare [[' + chippewa + ']] and [[namekagon-river-big-bend-trego]] for their shuttle arrangements.', date: travel.exploration.today,
      requestedDateText: 'next Wednesday', slugs: [chippewa, 'namekagon-river-big-bend-trego'],
    })] });
  });
  const response = await post({ ...travel, exploration: { ...travel.exploration, homePicks: [chippewa, 'namekagon-river-big-bend-trego'] } });
  expect(response).toMatchObject({ status: 200, body: { exploration: { date: null, states: ['Wisconsin', 'Minnesota'], routes: [
    { slug: chippewa, putIn: 'chippewa-county-d', takeOut: 'chippewa-highway-8' },
    { slug: 'namekagon-river-big-bend-trego', putIn: null },
  ] } } });
  const ledger = await plannerStorage().readJson<{ daily: Record<string, number> }>('planner-usage/' + new Date().toISOString().slice(0, 7) + '.json');
  expect(Object.values(ledger!.daily)).toEqual([3, 3]);
});

it.skipIf(process.env.PADDLETODAY_TEST_LIVE_PLANNER !== '1')('uses the configured model to compare two Wisconsin reaches using catalog evidence', async () => {
  vi.unstubAllEnvs();
  guest = issuePlannerGuest();
  const result = await post({ ...travel, message:
    'For a future Wisconsin visit, compare the published access and shuttle logistics of chippewa-river-county-d-highway-8 and namekagon-river-big-bend-trego. Show both as draft options.' });
  expect(result.status).toBe(200);
  expect(result.body.exploration.routes.map((r: { slug: string }) => r.slug).sort()).toEqual([chippewa, 'namekagon-river-big-bend-trego']);
}, 65_000);

it('checks the budget again before synthesis and refuses a guest account lookup', async () => {
  vi.stubEnv('PADDLETODAY_PLANNER_MODEL', 'gpt-6-luna');
  const upstream = provider([call('search_catalog', { searches: [scope('Wisconsin')] })]);
  const storage = plannerStorage();
  const month = 'planner-usage/' + new Date().toISOString().slice(0, 7) + '.json';
  await storage.writeJson(month, { charged: 9_995_000, day: '', daily: {}, pending: {} });
  expect(await post(travel)).toMatchObject({ status: 429, body: { error: 'planner_monthly_limit' } });
  expect(upstream).toHaveBeenCalledTimes(1);
  await storage.deleteJson(month);
  upstream.mockResolvedValueOnce(Response.json({ status: 'completed', output: [call('read_my_planning', { kind: 'saved', cursor: '' })] }));
  expect((await post({ ...travel, exploration: { ...travel.exploration, includeAccount: true } })).status).toBe(503);
  expect(JSON.parse(String(upstream.mock.calls[1][1].body)).tools.map((t: { name: string }) => t.name)).not.toContain('read_my_planning');
});

it('finds documented overnight stops within driving range and returns an editable route', async () => {
  const upstream = provider([]);
  const slug = 'crow-wing-river-mary-brown-cottingham';
  upstream.mockImplementation(async (url, init) => {
    if (url.startsWith('https://geocoding-api.open-meteo.com/')) return Response.json({ results: [minneapolis] });
    const body = JSON.parse(String(init.body));
    const { observations } = JSON.parse(body.input);
    if (!observations.length) {
      expect(body.tools.map((tool: {name: string}) => tool.name)).toContain('find_overnight_routes');
      return Response.json({ status: 'completed', output: [call('find_overnight_routes', campingQuery)] });
    }
    const { routes, origin } = observations[0].result;
    expect(origin).toBe('Minneapolis, Minnesota');
    expect(routes.every((r: {driveMinutes: number}) => r.driveMinutes <= 240)).toBe(true);
    expect(routes[0]).toMatchObject({ slug, driveMinutes: 175, camping: { notes: expect.stringContaining('Little White Dog') } });
    expect(routes[0].camping.sources[0].label).toContain('Wadena County');
    expect(routes.slice(0, 3).map((r: {state: string}) => r.state)).toEqual(expect.arrayContaining(['Minnesota', 'Wisconsin', 'Iowa']));
    return Response.json({ status: 'completed', output: [call('present_exploration', {
      answer: 'Split the [[' + slug + ']] paddle at Little White Dog.', requestedDateText: null,
    })] });
  });
  const result = await post({ ...travel, message: 'good weekend camping trip within 4 hours of minneapolis' });
  expect(result).toMatchObject({ status: 200, body: { exploration: { routes: [{ slug, putIn: expect.any(String), takeOut: expect.any(String) }] } } });
  const continuation = result.body.exploration.continuation;
  expect(JSON.parse(continuation)).toContainEqual({ tool: 'find_overnight_routes', originCity: 'Minneapolis', maxDriveMinutes: 240 });
  upstream.mockImplementation(async (url, init) => {
    if (url.startsWith('https://geocoding-api.open-meteo.com/')) return Response.json({ results: [minneapolis] });
    const body = JSON.parse(String(init.body));
    expect(body.tools.map((tool: {name: string}) => tool.name)).toEqual(['present_exploration']);
    const { result: scoped } = JSON.parse(body.input).observations[0];
    expect(scoped.origin).toBe('Minneapolis, Minnesota');
    expect(scoped.maxDriveMinutes).toBe(240);
    expect(scoped.routes.length).toBeGreaterThan(1);
    expect(scoped.routes.every((r: {state: string}) => r.state === 'Wisconsin')).toBe(true);
    return Response.json({ status: 'completed', output: [call('present_exploration', {
      answer: scoped.routes.slice(0, 2).map((r: {slug: string}) => '[[' + r.slug + ']]').join(' and ') + ' have documented camping.',
      review: [], requestedDateText: null,
    })] });
  });
  const followup = await post({ ...travel, message: 'What about options in Wisconsin?', exploration: {
    ...travel.exploration, exchanges: [{ message: 'weekend camping', answer: 'Crow Wing.', slugs: [slug], continuation }],
  } });
  expect(followup.status).toBe(200);
  expect(followup.body.exploration.routes).toHaveLength(2);
  for (const card of followup.body.exploration.routes) expect(followup.body.exploration.answer).toContain(card.name);
});

it('uses Minneapolis as the origin for a Wisconsin-only camping follow-up', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ results: [minneapolis] })));
  const result = await searchOvernights({ ...campingQuery, destinationState: 'Wisconsin' }, new Map());
  expect(result.origin).toBe('Minneapolis, Minnesota');
  expect(result.routes.every(r => r.state === 'Wisconsin' && r.driveMinutes !== null && r.driveMinutes <= 240)).toBe(true);
  expect(result.routes.map(r => r.name)).toEqual(expect.arrayContaining(['St. Croix River', 'Black River', 'Namekagon River']));
  const site = result.routes.find(r => r.name === 'Black River')!.camping.stops;
  expect(site.map(s => s.name)).toEqual(['Black River State Forest canoe campsite']);
  const rivers = listRivers();
  expect(overnightEvidence(rivers.find(r => r.slug === 'namekagon-river-county-k-whispering-pines')!)?.notes).toContain('eight campsites');
  for (const slug of ['namekagon-river-hayward-stinnett', 'kickapoo-river-rockton-la-farge', 'south-fork-flambeau-county-w-county-m']) {
    expect(overnightEvidence(rivers.find(r => r.slug === slug)!)).toBeNull();
  }
});

it('does not infer on-route camping from day-trip, basecamp or endpoint evidence', () => {
  const route = listRivers().find(r => r.slug === 'otter-tail-river-wannigan-riverside')!;
  expect(route.logistics?.campingClassification).toBe('on_route_campsite');
  expect(overnightEvidence(route)).toBeNull();
  for (const camping of ['There is a campground at the put-in.', 'There are no campsites along this route.', 'A campground nearby can be booked separately.']) {
    expect(overnightEvidence({ ...route, logistics: { ...route.logistics!, camping } })).toBeNull();
  }
});

it('keeps the geographic constraint when the search finds nothing or the origin is unresolved', async () => {
  const cityLookup = vi.fn().mockResolvedValueOnce(Response.json({ results: [] }))
    .mockResolvedValueOnce(Response.json({ results: [minneapolis] })).mockRejectedValueOnce(new Error('Offline'));
  vi.stubGlobal('fetch', cityLookup);
  expect(await searchOvernights(campingQuery, new Map())).toMatchObject({ clarification: expect.any(String), routes: [] });
  expect(await searchOvernights({ ...campingQuery, maxDriveMinutes: 5 }, new Map())).toMatchObject({ matchingReaches: 0, routes: [] });
  expect(await searchOvernights(campingQuery, new Map())).toMatchObject({ unavailable: expect.any(String), routes: [] });
  expect(await searchOvernights({ ...campingQuery, originCity: '' }, new Map())).toMatchObject({ clarification: expect.any(String), routes: [] });
});

it('rejects invented route cards even if supplied in conversation history', async () => {
  const upstream = provider([call('present_exploration', { answer: 'Try [[fictional]].', requestedDateText: null })]);
  upstream.mockResolvedValueOnce(Response.json({ status: 'completed', output: [call('search_catalog', { searches: [scope('Wisconsin')] })] }));
  expect((await post({ ...travel, exploration: { ...travel.exploration, exchanges: [
    { message: 'What about this one?', answer: 'A claim from a client', slugs: ['fictional'] },
  ] } })).status).toBe(503);
});

it('returns search settings even if the provider also emits prose about a fictional route', async () => {
  provider([{ type: 'message', content: 'Fictional route is safe' }, call('find_day_trips', settings)]);
  expect((await post(turn)).body).toEqual({ requestId: 'test', action: { settings, question: null } });
});

it.each([
  [call('find_day_trips', { ...settings, hours: 90 })],
  [call('find_day_trips', { ...settings, slug: 'fictional' })],
  [call('unrecognized_tool', settings)],
  [call('find_day_trips', settings), call('find_day_trips', settings)],
  [],
])('rejects invalid or ambiguous model actions', async (...output) => {
  provider(output);
  expect(await post(turn)).toMatchObject({ status: 503, body: { error: 'planner_unavailable' } });
});

it('handles malformed inputs, provider errors, absent credentials and rate limits', async () => {
  const upstream = provider([]);
  expect((await post({ ...turn, message: '  ' })).status).toBe(400);
  expect(upstream).not.toHaveBeenCalled();
  clearRateLimitState();
  vi.stubEnv('RATE_LIMIT_DAY_TRIP_AGENT_MAX', '1');
  upstream.mockRejectedValueOnce(new Error('provider unavailable'));
  expect((await post(turn)).status).toBe(503);
  expect((await post(turn)).status).toBe(429);
  vi.stubEnv('OPENAI_API_KEY', '');
  expect((await post(turn)).status).toBe(503);
  expect(upstream).toHaveBeenCalledTimes(1);
});

it('keeps simple requests local without credentials, quotas or provider access', async () => {
  const upstream = provider([]);
  vi.stubEnv('PADDLETODAY_PLANNER_AI_DISABLED', '1');
  expect(await post({ ...turn, message: 'Saturday, five hours, one car' }, {})).toMatchObject({
    status: 200, body: { action: { question: 'shuttle', settings: { day: 'Saturday', hours: 5 } } },
  });
  expect((await post(turn)).status).toBe(503);
  expect(upstream).not.toHaveBeenCalled();
});

it('blocks paid dispatch at the shared cap while still answering local refinements', async () => {
  const upstream = provider([]);
  const month = new Date().toISOString().slice(0, 7);
  await plannerStorage().writeJson('planner-usage/' + month + '.json', {
    charged: 10_000_000, day: '', daily: {}, pending: {},
  });
  expect(await post(turn)).toMatchObject({ status: 429, body: { error: 'planner_monthly_limit' } });
  expect(await post({ ...turn, message: 'easy routes only' })).toMatchObject({
    status: 200, body: { action: { settings: { easyOnly: true } } },
  });
  expect(upstream).not.toHaveBeenCalled();
});

it('rejects unverified identities and applies the verified tier before calling the provider', async () => {
  const upstream = provider([call('find_day_trips', settings)]);
  vi.stubEnv('RATE_LIMIT_DAY_TRIP_AGENT_MAX', '100');
  expect((await post(turn, {})).status).toBe(401);
  expect((await post(turn, { 'x-planner-guest': guest.slice(1) })).status).toBe(401);
  expect((await post(turn, { authorization: 'Bearer fake', 'x-planner-guest': guest })).status).toBe(401);
  for (let i = 0; i < 10; i++) expect((await post(turn)).status).toBe(200);
  expect(await post(turn)).toMatchObject({ status: 429, body: { error: 'planner_guest_limit' } });
  vi.spyOn(accountAuth, 'verifyAccountIdToken').mockResolvedValue({
    uid: 'test-account', firebase: { sign_in_provider: 'password' },
  } as NonNullable<Awaited<ReturnType<typeof accountAuth.verifyAccountIdToken>>>);
  const account = { authorization: 'Bearer verified-by-test' };
  for (let i = 0; i < 30; i++) expect((await post(turn, account)).status).toBe(200);
  expect(await post(turn, account)).toMatchObject({ status: 429, body: { error: 'planner_account_limit' } });
  expect(upstream).toHaveBeenCalledTimes(40);
});
