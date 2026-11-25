import { dayTripEndpoints, distanceMiles, estimateTravelMinutes, parsePaddleTimeHours } from '@paddletoday/api-contract';
import { listRivers } from '../lib/rivers';
import type { River } from '../lib/types';
import { createBoardLocationService } from '../scripts/board-location-service.js';
import { chooseBestGeocodeCandidate, matchesStateForGeocodeResult, parseManualLocationQuery } from '../scripts/location-domain.js';
import { plannerCard, type PlannerCard } from './planner-catalog';

function namesPublishedTrip(clause: string, river: River) {
  // Map "County K-to-Whispering Pine trip" to the published landing names.
  const normalize = (name: string) => name.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(road|landing|boat launch|carry in access)\b/g, '').replace(/\bpines\b/g, 'pine').replace(/\s+/g, ' ').trim();
  const start = normalize(river.putIn?.name ?? ''), end = normalize(river.takeOut?.name ?? '');
  return !!start && !!end && (' ' + normalize(clause) + ' ').includes(' along the ' + start + ' to ' + end + ' trip ');
}

// A camping tag can describe the river corridor, a nearby park, or just the take-out.
// Require a positive statement about this reach or a documented interior stop.
export function overnightEvidence(river: River) {
  const notes = river.logistics?.camping?.trim();
  if (!notes || river.continuityStatus === 'condition-family' || !river.sourceLinks.length) return null;
  const affirmative = notes.split(/[.!?;]/).filter(clause =>
    !/\b(no|not|unconfirmed|unknown|elsewhere|off.route|nearby|outside|beyond|broader|separate(?:ly)?|may have|might)\b/i.test(clause));
  const hasFacility = /\b(campgrounds?|campsites?|watercraft camps?|canoe camps?)\b/i;
  if (!affirmative.some(clause => hasFacility.test(clause))) return null;
  const endpoints = dayTripEndpoints(river);
  const stops = (river.accessPoints ?? []).filter(point => endpoints && point.accessPointRole !== 'navigation-waypoint'
    && point.mileFromStart > endpoints.putIn.mileFromStart && point.mileFromStart < endpoints.takeOut.mileFromStart
    && hasFacility.test(point.name + ' ' + (point.note ?? ''))
    && !/\b(no|not|nearby|private|former|closed|context|bailout only|before the .*campsite)\b/i.test(point.name + ' ' + (point.note ?? '')));
  const onReach = affirmative.some(clause => hasFacility.test(clause)
    && (/\b(mid.route|midpoint|along (?:this|the) (trip|reach|route|stretch)|on this (?:riverway )?(reach|stretch)|in this (?:[a-z]+\d+ )?segment|between the (?:put.in|launch) and|before the [\w '-]+ finish)\b/i.test(clause)
      || namesPublishedTrip(clause, river)));
  if (!stops.length && !onReach) return null;
  const relevant = river.sourceLinks.filter(link => /camp|park|trip page|map|water trail|trail guide/i.test(link.label));
  if (!relevant.length) return null;
  const sourceRank = (label: string) => /campground|campsite/i.test(label) && stops.some(p =>
    label.toLowerCase().includes(p.name.split(/ #| County Park| Landing| public water/i)[0].toLowerCase())) ? 3
    : /campground|campsite|trip page/i.test(label) ? 2
    : /county park|river map|section map/i.test(label) ? 1 : 0;
  return { notes, stops: stops.slice(0, 4).map(p => ({ name: p.name, mile: p.mileFromStart })),
    sources: relevant.sort((a, b) => sourceRank(b.label) - sourceRank(a.label)).slice(0, 3) };
}

type City = { name: string; admin1?: string; population?: number; latitude: number; longitude: number; country_code: string };
async function resolveOrigin(query: string) {
  const parsed = parseManualLocationQuery(query);
  const service = createBoardLocationService({ chooseCandidate: chooseBestGeocodeCandidate, timeoutMs: 4000 });
  const results: City[] = await service.searchManualLocation(parsed.city);
  const exact = results.filter(row => row.country_code === 'US' && row.name?.toLowerCase() === parsed.city.toLowerCase()
    && Number.isFinite(row.latitude) && Math.abs(row.latitude) <= 90 && Number.isFinite(row.longitude) && Math.abs(row.longitude) <= 180
    && (!parsed.state || matchesStateForGeocodeResult(row, parsed.state)))
    .sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
  if (exact.length > 1 && (exact[0].population ?? 0) <= 3 * (exact[1].population ?? 0)) return null;
  return exact[0] ?? null;
}

export function continueOvernightSearch(message: string, continuation?: string) {
  if (!continuation) return null;
  const place = /^(?:what about (?:options )?(?:in )?|(?:any )?(?:options|overnights) in )([a-z ]+?)[?.!]*$/i.exec(message.trim())?.[1];
  if (!place) return null;
  const state = listRivers().find(r => r.state.toLowerCase() === place.trim().toLowerCase())?.state;
  if (!state) return null;
  try {
    const entries: unknown = JSON.parse(continuation);
    const last = Array.isArray(entries) && entries.find(e => e?.tool === 'find_overnight_routes');
    if (!last || typeof last.originCity !== 'string' || last.originCity.length > 100 || !Number.isSafeInteger(last.maxDriveMinutes)
      || last.maxDriveMinutes < 0 || last.maxDriveMinutes > 2880) return null;
    return { originCity: last.originCity, maxDriveMinutes: last.maxDriveMinutes, destinationState: state };
  } catch { return null; }
}

export async function searchOvernights(args: Record<string, unknown>, seen: Map<string, PlannerCard>) {
  const { originCity, destinationState, maxDriveMinutes } = args;
  if (typeof originCity !== 'string' || originCity.length > 100 || typeof destinationState !== 'string'
    || destinationState.length > 60 || typeof maxDriveMinutes !== 'number' || !Number.isSafeInteger(maxDriveMinutes)
    || maxDriveMinutes < 0 || maxDriveMinutes > 2880) throw new Error('Invalid overnight search');
  if (!originCity.trim() && (maxDriveMinutes || !destinationState.trim())) return { clarification: 'Ask for a departure city or destination state.', routes: [] };
  let origin: City | null = null;
  if (originCity.trim()) {
    try { origin = await resolveOrigin(originCity.trim()); }
    catch { return { unavailable: 'Departure city lookup unavailable. Could not check the requested driving range.', routes: [] }; }
    if (!origin) return { clarification: 'Ask for the departure city and state to resolve the starting location.', routes: [] };
  }
  const matches = listRivers().flatMap(r => {
    if (destinationState.trim() && r.state.toLowerCase() !== destinationState.trim().toLowerCase()) return [];
    const lat = r.putIn?.latitude, lon = r.putIn?.longitude;
    if (typeof lat !== 'number' || !Number.isFinite(lat) || typeof lon !== 'number' || !Number.isFinite(lon)) return [];
    const driveMinutes = origin ? estimateTravelMinutes(distanceMiles(origin.latitude, origin.longitude, lat, lon)) : null;
    if (maxDriveMinutes && (driveMinutes === null || driveMinutes > maxDriveMinutes)) return [];
    const camping = overnightEvidence(r);
    if (!camping) return [];
    const duration = r.logistics?.estimatedPaddleTime;
    const hours = parsePaddleTimeHours(duration);
    // Favor two manageable paddling days. Keep genuinely short options available when coverage is thin.
    const weekendFit = hours ? Math.min(hours.min, 9) - Math.max(0, hours.max - 12) : 0;
    const twoDayFit = weekendFit >= 6 || (!hours && /full day or overnight|two.day paddle/i.test(duration ?? ''));
    return [{ r, driveMinutes, camping, weekendFit, twoDayFit }];
  }).sort((a, b) => Number(b.twoDayFit) - Number(a.twoDayFit) || b.weekendFit - a.weekendFit || b.camping.stops.length - a.camping.stops.length
    || (a.driveMinutes ?? 0) - (b.driveMinutes ?? 0) || a.r.slug.localeCompare(b.r.slug));
  // Give the model the best qualifying reach in each state before filling the remaining slots.
  const representedStates = new Set<string>();
  const rivers = new Set<string>();
  const selected: typeof matches = [];
  function addMatch(match: typeof matches[number]) {
    const { r } = match;
    const id = r.riverId || r.name;
    if (selected.length >= 5 || rivers.has(id)) return;
    rivers.add(id);
    representedStates.add(r.state);
    selected.push(match);
  }
  for (const match of matches) if (!representedStates.has(match.r.state)) addMatch(match);
  for (const match of matches) addMatch(match);
  const routes = selected.map(({ r, driveMinutes, camping }) => {
    seen.set(r.slug, plannerCard(r));
    return { slug: r.slug, name: r.name, reach: r.reach, state: r.state, driveMinutes,
      distance: r.logistics?.distanceLabel, paddleTime: r.logistics?.estimatedPaddleTime, difficulty: r.profile.difficulty,
      shuttle: r.logistics?.shuttle, camping };
  });
  return { origin: origin && [origin.name, origin.admin1].join(', '), maxDriveMinutes, matchingReaches: matches.length,
    limitations: 'Drive is a rough straight-line estimate to the put-in, not a road ETA. Camping is documented in the catalog; openings, reservations and launch conditions are unverified.', routes };
}
